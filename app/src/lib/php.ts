/* ─────────────────────────────────────────────────────────────
   A real PHP 8 interpreter, running inside the browser tab.

   No server, no account, no XAMPP install. The engine is fetched
   once (then cached by the browser) and kept alive for the whole
   session, so a `CREATE TABLE` in one lesson is still there in
   the next one.
   ───────────────────────────────────────────────────────────── */

import shimSource from './runtime/mysqli-shim.php?raw'
import seedSource from './runtime/seed.php?raw'

const PHP_VERSION = '8.0'
const DOCROOT = '/www'
const SHIM_PATH = '/wdsp/mysqli-shim.php'
const PRELUDE = `<?php require_once '${SHIM_PATH}'; ?>`

export type PhpStatus =
  | { phase: 'idle' }
  | { phase: 'loading'; loaded: number; total: number }
  | { phase: 'ready' }
  | { phase: 'failed'; message: string }

export interface PhpResult {
  /** Everything the script printed — this is what a browser would receive. */
  output: string
  /** Warnings, notices and fatal errors, cleaned up for a beginner. */
  errors: string
  exitCode: number
  ms: number
  /** True when the output looks like markup and is worth rendering. */
  looksLikeHtml: boolean
}

type Listener = (s: PhpStatus) => void

let php: any = null
let booting: Promise<any> | null = null
let status: PhpStatus = { phase: 'idle' }
const listeners = new Set<Listener>()

function setStatus(s: PhpStatus) {
  status = s
  listeners.forEach((l) => l(s))
}

export function phpStatus() {
  return status
}

export function onPhpStatus(l: Listener) {
  listeners.add(l)
  l(status)
  return () => {
    listeners.delete(l)
  }
}

/** Kick the download off early (e.g. when a PHP lesson opens) without blocking. */
export function warmPhp() {
  if (!php && !booting) void getPhp().catch(() => {})
}

export async function getPhp(): Promise<any> {
  if (php) return php
  if (booting) return booting

  booting = (async () => {
    setStatus({ phase: 'loading', loaded: 0, total: 0 })
    try {
      const [{ loadWebRuntime }, { PHP }] = await Promise.all([
        import('@php-wasm/web'),
        import('@php-wasm/universal'),
      ])

      /* Fetch the engine ourselves so the student sees a real progress
         bar instead of a frozen button. Emscripten then reuses the bytes
         via `wasmBinary` — nothing is downloaded twice. */
      const wasmBinary = await prefetchEngine()

      const id = await loadWebRuntime(PHP_VERSION as never, {
        emscriptenOptions: wasmBinary ? { wasmBinary } : {},
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any)

      const instance = new PHP(id)

      instance.mkdir('/wdsp')
      instance.mkdir(DOCROOT)
      instance.mkdir('/wdsp-db')
      instance.writeFile(SHIM_PATH, shimSource)

      /* Errors are part of learning — show them, don't swallow them. */
      await instance.run({
        code: `<?php
          ini_set('display_errors', '1');
          ini_set('display_startup_errors', '1');
          ini_set('html_errors', '0');
          error_reporting(E_ALL);
          date_default_timezone_set('Asia/Colombo');
        ?>`,
      })

      php = instance
      await seedDatabases()
      setStatus({ phase: 'ready' })
      return instance
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e)
      setStatus({ phase: 'failed', message })
      booting = null
      throw e
    }
  })()

  return booting
}

/** Stream the .wasm down with progress; fall back silently if anything
 *  about the host makes that impossible (no Content-Length, CORS, …). */
async function prefetchEngine(): Promise<ArrayBuffer | undefined> {
  try {
    const pkg = await import('@php-wasm/web-8-0')
    const loader = (await pkg.getPHPLoaderModule()) as { dependencyFilename?: string; dependenciesTotalSize?: number }
    const url = loader?.dependencyFilename
    if (!url) return undefined

    const res = await fetch(url)
    if (!res.ok || !res.body) return undefined

    const declared = Number(res.headers.get('content-length') ?? 0)
    const total = declared || loader.dependenciesTotalSize || 0
    const reader = res.body.getReader()
    const chunks: Uint8Array[] = []
    let loaded = 0
    for (;;) {
      const { done, value } = await reader.read()
      if (done) break
      chunks.push(value)
      loaded += value.byteLength
      setStatus({ phase: 'loading', loaded, total })
    }
    const out = new Uint8Array(loaded)
    let at = 0
    for (const c of chunks) {
      out.set(c, at)
      at += c.byteLength
    }
    setStatus({ phase: 'loading', loaded, total: loaded })
    return out.buffer
  } catch {
    return undefined
  }
}

/** Recreate every sample database exactly as the course expects it. */
export async function seedDatabases() {
  const instance = php ?? (await getPhp())
  await instance.run({ code: PRELUDE + seedSource })
}

/* ── Making the syllabus' mysqli code run against a real engine ──
   `mysqli` is compiled into this PHP build but can only talk to a
   MySQL server over a socket, which a browser tab does not have.
   So the identifiers are pointed at the shim instead. Students see
   and type the real thing; only the wiring behind it differs. */
export function bridgeMysqli(code: string): string {
  return code
    .replace(/\bnew\s+mysqli\s*\(/g, 'new __wdsp_mysqli(')
    .replace(/\bnew\s+\\\s*mysqli\s*\(/g, 'new __wdsp_mysqli(')
    .replace(/(?<!_)\bmysqli_([a-z_]+)\s*\(/g, '__wdsp_mysqli_$1(')
    .replace(/\bmysqli::/g, '__wdsp_mysqli::')
}

const FATAL = /(Fatal error|Parse error|Warning|Notice|Deprecated|Uncaught)/

function splitErrors(text: string) {
  /* php-wasm prints diagnostics into the body. Lift them out so the
     lesson can show "your page" and "what PHP complained about"
     side by side, the way a real error log does. */
  const lines = text.split('\n')
  const body: string[] = []
  const errs: string[] = []
  for (const line of lines) {
    if (FATAL.test(line) && /on line \d+|in .*\.php/.test(line)) errs.push(line.trim())
    else body.push(line)
  }
  return { body: body.join('\n'), errs: errs.join('\n') }
}

function tidyErrors(raw: string) {
  return raw
    .split('\n')
    .map((l) =>
      l
        .replace(/ in \/www\/[A-Za-z0-9_.-]+\.php/g, '')
        .replace(/^PHP /, '')
        .trim(),
    )
    .filter((l) => l && !/^Stack trace:|^#\d+ /.test(l))
    .join('\n')
}

export interface RunOptions {
  /** Extra files to place next to the script (name → contents). */
  files?: Record<string, string>
  /** Query-string values, as if the form used method="get". */
  get?: Record<string, string | string[]>
  /** Body values, as if the form used method="post". */
  post?: Record<string, string | string[]>
  /** Which file to execute; defaults to the code you passed. */
  scriptName?: string
}

function encodePairs(data: Record<string, string | string[]>) {
  const parts: string[] = []
  for (const [k, v] of Object.entries(data)) {
    if (Array.isArray(v)) v.forEach((one) => parts.push(`${encodeURIComponent(k)}=${encodeURIComponent(one)}`))
    else parts.push(`${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
  }
  return parts.join('&')
}

/* One interpreter, many labs on a page. Runs are queued so that writing a
   script file and executing it can never be interleaved by another lab. */
let queue: Promise<unknown> = Promise.resolve()

export function runPhp(code: string, opts: RunOptions = {}): Promise<PhpResult> {
  const next = queue.then(
    () => runPhpNow(code, opts),
    () => runPhpNow(code, opts),
  )
  queue = next.catch(() => undefined)
  return next
}

async function runPhpNow(code: string, opts: RunOptions = {}): Promise<PhpResult> {
  const instance = await getPhp()
  const started = performance.now()

  const scriptName = opts.scriptName ?? 'index.php'
  const scriptPath = `${DOCROOT}/${scriptName}`

  for (const [name, contents] of Object.entries(opts.files ?? {})) {
    instance.writeFile(`${DOCROOT}/${name}`, PRELUDE + bridgeMysqli(contents))
  }
  instance.writeFile(scriptPath, PRELUDE + bridgeMysqli(code))

  const query = opts.get && Object.keys(opts.get).length ? encodePairs(opts.get) : ''
  const body = opts.post && Object.keys(opts.post).length ? encodePairs(opts.post) : ''
  const method = body ? 'POST' : 'GET'

  let response: { text: string; errors: string; exitCode: number }
  try {
    response = await instance.run({
      scriptPath,
      relativeUri: `/${scriptName}${query ? `?${query}` : ''}`,
      method,
      headers: body
        ? { 'content-type': 'application/x-www-form-urlencoded', 'content-length': String(body.length) }
        : {},
      body: body || undefined,
      $_SERVER: {
        REQUEST_METHOD: method,
        SCRIPT_NAME: `/${scriptName}`,
        PHP_SELF: `/${scriptName}`,
        SERVER_NAME: 'localhost',
        HTTP_HOST: 'localhost',
        QUERY_STRING: query,
        SERVER_SOFTWARE: 'Study Partner (PHP 8.0 · WebAssembly)',
        HTTP_USER_AGENT: navigator.userAgent,
        REQUEST_URI: `/${scriptName}${query ? `?${query}` : ''}`,
        DOCUMENT_ROOT: DOCROOT,
      },
    })
  } catch (e) {
    return {
      output: '',
      errors: e instanceof Error ? e.message : String(e),
      exitCode: 255,
      ms: performance.now() - started,
      looksLikeHtml: false,
    }
  }

  const stdout = response.text ?? ''
  const { body: cleanBody, errs } = splitErrors(stdout)
  const stderr = tidyErrors([errs, response.errors ?? ''].filter(Boolean).join('\n'))

  return {
    output: cleanBody.replace(/^\n+/, ''),
    errors: stderr,
    exitCode: response.exitCode ?? 0,
    ms: performance.now() - started,
    looksLikeHtml: /<[a-z!/][\s\S]*>/i.test(cleanBody),
  }
}

/** Run a SQL script through PHP's engine and hand back a result grid. */
export interface SqlOutcome {
  statement: string
  columns: string[]
  rows: string[][]
  affected: number
  error?: string
  kind: 'select' | 'write' | 'error'
}

export async function runSqlViaPhp(sql: string, database = 'publications'): Promise<SqlOutcome[]> {
  const escaped = JSON.stringify(sql)
  const dbEscaped = JSON.stringify(database)
  const code = `<?php
$__wdsp_conn = new __wdsp_mysqli('localhost', 'root', '', ${dbEscaped});
$__wdsp_out = array();
$__wdsp_sql = ${escaped};
foreach (wdsp_split_statements($__wdsp_sql) as $__wdsp_one) {
    $__wdsp_r = $__wdsp_conn->query($__wdsp_one);
    if ($__wdsp_r === false) {
        $__wdsp_out[] = array('statement' => $__wdsp_one, 'kind' => 'error', 'error' => $__wdsp_conn->error, 'columns' => array(), 'rows' => array(), 'affected' => 0);
    } elseif ($__wdsp_r instanceof __wdsp_mysqli_result) {
        $__wdsp_cols = array(); $__wdsp_rows = array();
        while (($__wdsp_row = $__wdsp_r->fetch_assoc()) !== null) {
            if (!$__wdsp_cols) { $__wdsp_cols = array_keys($__wdsp_row); }
            $__wdsp_cells = array();
            foreach ($__wdsp_row as $__wdsp_v) { $__wdsp_cells[] = $__wdsp_v === null ? 'NULL' : (string) $__wdsp_v; }
            $__wdsp_rows[] = $__wdsp_cells;
        }
        $__wdsp_out[] = array('statement' => $__wdsp_one, 'kind' => 'select', 'columns' => $__wdsp_cols, 'rows' => $__wdsp_rows, 'affected' => count($__wdsp_rows));
    } else {
        $__wdsp_out[] = array('statement' => $__wdsp_one, 'kind' => 'write', 'columns' => array(), 'rows' => array(), 'affected' => $__wdsp_conn->affected_rows);
    }
}
echo json_encode($__wdsp_out);

function wdsp_split_statements($sql) {
    $out = array(); $buf = ''; $q = null; $len = strlen($sql);
    for ($i = 0; $i < $len; $i++) {
        $ch = $sql[$i];
        if ($q !== null) {
            $buf .= $ch;
            if ($ch === $q && ($i === 0 || $sql[$i - 1] !== '\\\\')) { $q = null; }
            continue;
        }
        if ($ch === "'" || $ch === '"') { $q = $ch; $buf .= $ch; continue; }
        if ($ch === '-' && $i + 1 < $len && $sql[$i + 1] === '-') {
            while ($i < $len && $sql[$i] !== "\\n") { $i++; }
            continue;
        }
        if ($ch === ';') { if (trim($buf) !== '') { $out[] = trim($buf); } $buf = ''; continue; }
        $buf .= $ch;
    }
    if (trim($buf) !== '') { $out[] = trim($buf); }
    return $out;
}
?>`

  const result = await runPhp(code, { scriptName: 'sql-runner.php' })
  try {
    const parsed = JSON.parse(result.output.trim()) as SqlOutcome[]
    return parsed
  } catch {
    return [
      {
        statement: sql,
        kind: 'error',
        error: result.errors || result.output || 'The SQL engine did not answer.',
        columns: [],
        rows: [],
        affected: 0,
      },
    ]
  }
}

/** Tables available in a database, for the schema sidebar. */
export async function describeDatabase(database: string) {
  const outcome = await runSqlViaPhp('SHOW TABLES', database)
  const tables = outcome[0]?.rows.map((r) => r[0]) ?? []
  const schema: { table: string; columns: { name: string; type: string; key: string }[] }[] = []
  for (const t of tables) {
    const d = await runSqlViaPhp(`DESCRIBE ${t}`, database)
    schema.push({
      table: t,
      columns:
        d[0]?.rows.map((r) => ({ name: r[0], type: r[1], key: r[3] ?? '' })) ?? [],
    })
  }
  return schema
}

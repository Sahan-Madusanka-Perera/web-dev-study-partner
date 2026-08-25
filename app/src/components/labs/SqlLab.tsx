import { useCallback, useEffect, useRef, useState } from 'react'
import { Database, Play, RefreshCw, Table2, TriangleAlert } from 'lucide-react'
import { describeDatabase, runSqlViaPhp, seedDatabases, type SqlOutcome } from '../../lib/php'
import { Editor } from '../blocks/Editor'
import { useResetKey } from '../../lib/reset'
import { Button, Spinner } from '../ui'
import { LabFrame } from './LabFrame'
import { PhpEngineGate, usePhpStatus } from './PhpEngine'
import { PhpLab } from './PhpLab'
import { cn } from '../../lib/cn'

export const SAMPLE_DATABASES = [
  { name: 'publications', about: 'classics, customers — the resource book example' },
  { name: 'StudentDB', about: 'StInfo — student records' },
  { name: 'mydb', about: 'users, employees — form and CRUD examples' },
  { name: 'school', about: 'students — the edit-record example' },
  { name: 'demo', about: 'persons — the insert.php walkthrough' },
  { name: 'practice', about: 'empty — build your own tables here' },
]

type Schema = { table: string; columns: { name: string; type: string; key: string }[] }[]

export function SqlLab({
  sql: initial,
  database: initialDb = 'publications',
  height = 200,
  title,
  note,
  allowDbSwitch = true,
}: {
  sql: string
  database?: string
  height?: number
  title?: string
  note?: string
  allowDbSwitch?: boolean
}) {
  const [sql, setSql] = useState(initial)
  const [resetKey, remountPanes] = useResetKey()
  const [db, setDb] = useState(initialDb)
  const [out, setOut] = useState<SqlOutcome[] | null>(null)
  const [busy, setBusy] = useState(false)
  const [reseeding, setReseeding] = useState(false)
  const status = usePhpStatus()
  const [schema, setSchema] = useState<Schema>([])
  const schemaToken = useRef(0)

  const refreshSchema = useCallback(async (name: string) => {
    const token = ++schemaToken.current
    const next = await describeDatabase(name)
    if (token === schemaToken.current) setSchema(next)
  }, [])

  useEffect(() => {
    if (status.phase === 'ready') void refreshSchema(db)
  }, [status.phase, db, refreshSchema])

  const run = useCallback(async () => {
    setBusy(true)
    try {
      const result = await runSqlViaPhp(sql, db)
      setOut(result)
      await refreshSchema(db)
    } finally {
      setBusy(false)
    }
  }, [sql, db, refreshSchema])

  return (
    <LabFrame
      title={title ?? 'Run SQL against a real database'}
      note={note}
      onReset={() => {
        setSql(initial)
        remountPanes()
        setOut(null)
      }}
      toolbar={
        <>
          {allowDbSwitch && (
            <label className="flex items-center gap-1.5">
              <span className="sr-only">Database</span>
              <span className="flex items-center gap-1.5 rounded-lg border border-rule bg-surface py-1 pr-1 pl-2">
                <Database className="size-3.5 text-ink-3" strokeWidth={1.9} />
                <select
                  value={db}
                  onChange={(e) => {
                    setDb(e.target.value)
                    setOut(null)
                  }}
                  className="cursor-pointer bg-transparent font-mono text-[0.75rem] text-ink outline-none"
                >
                  {SAMPLE_DATABASES.map((d) => (
                    <option key={d.name} value={d.name}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </span>
            </label>
          )}
          <Button
            size="sm"
            variant="ghost"
            title="Restore every sample database to its original rows"
            disabled={reseeding || status.phase !== 'ready'}
            onClick={async () => {
              setReseeding(true)
              try {
                await seedDatabases()
                await refreshSchema(db)
                setOut(null)
              } finally {
                setReseeding(false)
              }
            }}
          >
            {reseeding ? <Spinner className="size-3.5" /> : <RefreshCw className="size-3.5" strokeWidth={2} />}
            Reset data
          </Button>
          <Button size="sm" variant="primary" onClick={() => void run()} disabled={busy}>
            {busy ? <Spinner className="size-3.5" /> : <Play className="size-3.5" strokeWidth={2.4} />}
            Run
          </Button>
        </>
      }
    >
      <PhpEngineGate>
        <div className="grid lg:grid-cols-[minmax(0,1fr)_15rem]">
          <div className="order-2 min-w-0 lg:order-1">
            <div
              onKeyDown={(e) => {
                if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
                  e.preventDefault()
                  void run()
                }
              }}
            >
              <Editor key={resetKey} value={sql} onChange={setSql} lang="sql" height={height} />
            </div>
            <ResultGrids out={out} busy={busy} />
          </div>
          <SchemaPanel
            db={db}
            schema={schema}
            className="order-1 border-b border-rule lg:order-2 lg:border-b-0 lg:border-l"
            onPick={(text) => setSql((s) => (s.trim() ? `${s}\n${text}` : text))}
          />
        </div>
      </PhpEngineGate>
    </LabFrame>
  )
}

function ResultGrids({ out, busy }: { out: SqlOutcome[] | null; busy: boolean }) {
  if (busy && !out)
    return (
      <div className="grid place-items-center border-t border-rule py-8">
        <Spinner className="text-ink-3" />
      </div>
    )
  if (!out)
    return (
      <p className="border-t border-rule px-4 py-6 text-center text-[0.85rem] text-ink-3">
        Press Run — or ⌘/Ctrl + Enter — to send this SQL to the engine.
      </p>
    )

  return (
    <div className="divide-y divide-rule border-t border-rule">
      {out.map((o, i) => (
        <div key={i} className="min-w-0">
          <div className="flex flex-wrap items-baseline gap-2 px-4 pt-2.5 pb-1.5">
            <code className="min-w-0 flex-1 truncate font-mono text-[0.72rem] text-ink-3">
              {o.statement}
            </code>
            <span
              className={cn(
                'font-mono text-[0.7rem] tabular-nums',
                o.kind === 'error' ? 'text-bad' : 'text-ink-3',
              )}
            >
              {o.kind === 'select'
                ? `${o.rows.length} row${o.rows.length === 1 ? '' : 's'}`
                : o.kind === 'write'
                  ? `${o.affected} row${o.affected === 1 ? '' : 's'} affected`
                  : 'error'}
            </span>
          </div>

          {o.kind === 'error' ? (
            <div className="mx-4 mb-3 flex items-start gap-2 rounded-lg bg-bad-tint px-3 py-2">
              <TriangleAlert className="mt-0.5 size-4 shrink-0 text-bad" strokeWidth={2} />
              <p className="font-mono text-[0.76rem] leading-relaxed text-bad">{o.error}</p>
            </div>
          ) : o.kind === 'select' ? (
            o.rows.length ? (
              <div className="overflow-x-auto px-4 pb-3">
                <table className="w-full min-w-max border-collapse text-left">
                  <thead>
                    <tr>
                      {o.columns.map((c) => (
                        <th
                          key={c}
                          className="border-b border-rule-strong px-2.5 py-1.5 font-mono text-[0.72rem] font-semibold tracking-wide text-ink-2 uppercase"
                        >
                          {c}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {o.rows.map((r, ri) => (
                      <tr key={ri} className="odd:bg-surface-sunk/50">
                        {r.map((cell, ci) => (
                          <td
                            key={ci}
                            className="border-b border-rule px-2.5 py-1.5 font-mono text-[0.78rem] text-ink tabular-nums"
                          >
                            {cell === 'NULL' ? <span className="text-ink-3 italic">NULL</span> : cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="px-4 pb-3 text-[0.82rem] text-ink-3">
                Empty set — the query was valid, nothing matched.
              </p>
            )
          ) : (
            <p className="px-4 pb-3 text-[0.82rem] text-ok">Query OK.</p>
          )}
        </div>
      ))}
    </div>
  )
}

export function SchemaPanel({
  db,
  schema,
  className,
  onPick,
}: {
  db: string
  schema: Schema
  className?: string
  onPick?: (sql: string) => void
}) {
  return (
    <aside className={cn('min-w-0 bg-surface-sunk/40 px-3 py-3', className)}>
      <p className="mb-2 flex items-center gap-1.5 font-mono text-[0.68rem] tracking-[0.1em] text-ink-3 uppercase">
        <Database className="size-3.5" strokeWidth={1.9} />
        {db}
      </p>
      {schema.length === 0 ? (
        <p className="text-[0.78rem] text-ink-3">
          No tables yet. A <code className="font-mono">CREATE TABLE</code> statement will put one
          here.
        </p>
      ) : (
        <ul className="space-y-2.5">
          {schema.map((t) => (
            <li key={t.table}>
              <button
                onClick={() => onPick?.(`SELECT * FROM ${t.table};`)}
                disabled={!onPick}
                className="group flex w-full items-center gap-1.5 text-left font-mono text-[0.78rem] font-medium text-ink enabled:hover:text-accent"
              >
                <Table2 className="size-3.5 shrink-0 text-ink-3" strokeWidth={1.9} />
                <span className="truncate">{t.table}</span>
              </button>
              <ul className="mt-0.5 ml-[1.3rem] space-y-px">
                {t.columns.map((c) => (
                  <li key={c.name} className="flex items-baseline gap-1.5 font-mono text-[0.7rem]">
                    <span className={cn('truncate', c.key === 'PRI' ? 'text-accent' : 'text-ink-2')}>
                      {c.name}
                    </span>
                    <span className="truncate text-ink-3">{c.type}</span>
                    {c.key === 'PRI' && (
                      <span className="text-[0.62rem] tracking-wide text-accent uppercase">pk</span>
                    )}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </aside>
  )
}

/** A PHP lab that also shows the live schema — for the mysqli lessons. */
export function PhpDbLab({
  database = 'mydb',
  ...rest
}: {
  code: string
  height?: number
  title?: string
  note?: string
  database?: string
}) {
  const status = usePhpStatus()
  const [schema, setSchema] = useState<Schema>([])

  const reread = useCallback(() => {
    void describeDatabase(database).then(setSchema)
  }, [database])

  useEffect(() => {
    if (status.phase === 'ready') reread()
  }, [status.phase, reread])

  return (
    <>
      <PhpLab {...rest} onResult={reread} />
      {status.phase === 'ready' && schema.length > 0 && (
        <figure className="not-prose bleed -mt-4 mb-8">
          <div className="overflow-hidden rounded-xl border border-rule bg-surface">
            <p className="border-b border-rule bg-surface-sunk px-4 py-2 font-mono text-[0.7rem] tracking-[0.12em] text-ink-3 uppercase">
              The database right now
            </p>
            <SchemaPanel db={database} schema={schema} />
          </div>
        </figure>
      )}
    </>
  )
}

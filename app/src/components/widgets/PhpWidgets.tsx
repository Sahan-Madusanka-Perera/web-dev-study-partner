import { useEffect, useRef, useState } from 'react'
import { Eye, Laptop, Play, RotateCcw, Server } from 'lucide-react'
import { WidgetFrame } from './WidgetFrame'
import { CodeView } from '../blocks/CodePanel'
import { Button } from '../ui'
import { cn } from '../../lib/cn'
import { rich } from '../../lib/rich'

/* ── Where the code actually runs ──────────────────────────── */

const SOURCE = `<html>
<body>
  <h2>Marks</h2>
  <?php
    $marks = 72;
    echo "<p>You scored $marks</p>";
    if ($marks >= 65) {
      echo "<p>Grade: B</p>";
    }
  ?>
</body>
</html>`

const SENT = `<html>
<body>
  <h2>Marks</h2>
  <p>You scored 72</p>
  <p>Grade: B</p>
</body>
</html>`

const STAGES = [
  { at: 'client', title: 'The browser asks for marks.php', body: 'It has no idea PHP is involved. It just wants a page.' },
  { at: 'server', title: 'The server sees the .php extension', body: 'So it hands the file to the PHP interpreter instead of sending it as-is.' },
  { at: 'server', title: 'PHP runs the code', body: 'Variables, conditions, database queries — all of it happens here, on the server.' },
  { at: 'server', title: 'PHP produces plain HTML', body: 'Every echo becomes text. The PHP itself is consumed, not forwarded.' },
  { at: 'wire', title: 'The server sends the HTML back', body: 'What crosses the network is ordinary HTML. Nothing else.' },
  { at: 'client', title: 'The browser renders it', body: 'View Source in the browser shows the HTML — never your PHP.' },
] as const

export function PhpFlowWidget() {
  const [step, setStep] = useState(-1)
  const [playing, setPlaying] = useState(false)
  const timer = useRef<number | null>(null)

  useEffect(() => {
    if (!playing) return
    if (step >= STAGES.length - 1) {
      setPlaying(false)
      return
    }
    timer.current = window.setTimeout(() => setStep((s) => s + 1), step < 0 ? 250 : 1400)
    return () => {
      if (timer.current) window.clearTimeout(timer.current)
    }
  }, [playing, step])

  const where = step >= 0 ? STAGES[step].at : null
  const delivered = step >= 4

  return (
    <WidgetFrame
      title="Server-side, and why it matters"
      hint="HTML and CSS run on the **client's** computer. PHP runs on the **server's**, before anything is sent. That single fact explains why a visitor can never read your database password, and why you cannot test PHP by double-clicking the file."
      toolbar={
        <>
          {step >= 0 && (
            <Button size="sm" variant="ghost" onClick={() => { setPlaying(false); setStep(-1) }}>
              <RotateCcw className="size-3.5" strokeWidth={2} />
              Reset
            </Button>
          )}
          <Button size="sm" variant="primary" disabled={playing} onClick={() => { setStep(-1); setPlaying(true) }}>
            <Play className="size-3.5" strokeWidth={2.4} />
            {step >= 0 ? 'Play again' : 'Request the page'}
          </Button>
        </>
      }
    >
      <div className="grid gap-0 lg:grid-cols-2 lg:divide-x lg:divide-rule">
        <div className="px-4 py-4 sm:px-5">
          <div className="mb-3 flex items-center gap-3">
            <Box lit={where === 'client'} icon={Laptop} label="Browser" />
            <div className="h-px flex-1 bg-rule-strong" />
            <Box lit={where === 'server' || where === 'wire'} icon={Server} label="Server + PHP" />
          </div>

          <ol className="space-y-1">
            {STAGES.map((s, i) => (
              <li
                key={i}
                className={cn(
                  'flex gap-2.5 rounded-lg px-2.5 py-1.5 transition-all duration-300',
                  i === step ? 'bg-brand-tint' : i < step ? 'opacity-55' : 'opacity-35',
                )}
              >
                <span
                  className={cn(
                    'mt-[2px] grid size-[18px] shrink-0 place-items-center rounded font-mono text-[0.62rem] font-semibold tabular-nums',
                    i === step ? 'bg-accent text-accent-on' : 'bg-surface-sunk text-ink-3',
                  )}
                >
                  {i + 1}
                </span>
                <span className="min-w-0">
                  <span className="block text-[0.86rem] font-medium text-ink">{s.title}</span>
                  <span className="block text-[0.8rem] text-ink-2">{s.body}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>

        <div className="border-t border-rule lg:border-t-0">
          <p className="flex items-center gap-2 border-b border-rule px-3.5 py-1.5 font-mono text-[0.68rem] tracking-[0.1em] text-ink-3 uppercase">
            marks.php — on the server
          </p>
          <div className="bg-[var(--code-bg)]">
            <CodeView code={SOURCE} lang="php" lineNumbers={false} />
          </div>
          <p className="flex items-center gap-2 border-y border-rule px-3.5 py-1.5 font-mono text-[0.68rem] tracking-[0.1em] uppercase">
            <Eye className="size-3.5" strokeWidth={2} />
            <span className={delivered ? 'text-ok' : 'text-ink-3'}>
              View Source in the browser
            </span>
          </p>
          <div className={cn('bg-[var(--code-bg)] transition-opacity duration-500', delivered ? 'opacity-100' : 'opacity-25')}>
            {delivered ? (
              <CodeView code={SENT} lang="html" lineNumbers={false} />
            ) : (
              <p className="px-4 py-6 text-center font-mono text-[0.78rem] text-[var(--code-dim)]">
                nothing has been delivered yet
              </p>
            )}
          </div>
        </div>
      </div>
    </WidgetFrame>
  )
}

function Box({ lit, icon: Icon, label }: { lit: boolean; icon: typeof Laptop; label: string }) {
  return (
    <span
      className={cn(
        'flex items-center gap-2 rounded-lg border px-3 py-2 transition-all duration-300',
        lit ? 'border-accent bg-accent-tint' : 'border-rule bg-surface',
      )}
    >
      <Icon className={cn('size-4', lit ? 'text-accent' : 'text-ink-3')} strokeWidth={1.8} />
      <span className="text-[0.82rem] font-medium text-ink">{label}</span>
    </span>
  )
}

/* ── GET or POST ───────────────────────────────────────────── */

const ROWS: [string, string, string][] = [
  ['Main purpose', 'Retrieve or read data from a server', 'Send, create or change data on a server'],
  ['Typical use', 'Search boxes, filters, links', 'Login, registration, file upload'],
  ['Data location', 'URL query string', 'Request body'],
  ['Visible in the URL', 'Yes', 'No'],
  ['Browser history', 'Stored', 'Usually not stored'],
  ['Caching', 'Can be cached', 'Usually not cached'],
  ['Bookmarkable', 'Yes', 'No'],
  ['Sensitive data', 'Not safe — visible in history and server logs', 'Safer, but still needs HTTPS'],
  ['Data size limit', 'Limited by URL length (about 2000 characters)', 'No practical limit'],
  ['File upload', 'No', 'Yes'],
  ['Refresh risk', 'May simply repeat the action', 'Browser warns before resubmitting'],
  ['Collected with', '$_GET', '$_POST'],
]

export function GetVsPostWidget() {
  const [method, setMethod] = useState<'GET' | 'POST'>('GET')
  const [name, setName] = useState('Nimali')
  const [pass, setPass] = useState('secret123')

  const query = `uname=${encodeURIComponent(name)}&pass=${encodeURIComponent(pass)}`

  return (
    <WidgetFrame
      title="GET or POST — where does the data travel?"
      hint="Type a password into the box and switch the method. With **GET** it is sitting in the address bar, in the browser history and in the server log. With **POST** it travels inside the request body instead. Neither is encrypted — that is what HTTPS is for."
      toolbar={
        <span className="flex overflow-hidden rounded-lg border border-rule">
          {(['GET', 'POST'] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMethod(m)}
              className={cn(
                'px-3 py-1 font-mono text-[0.74rem] transition-colors',
                method === m ? 'bg-brand text-brand-on' : 'bg-surface text-ink-2 hover:text-ink',
              )}
            >
              {m}
            </button>
          ))}
        </span>
      }
    >
      <div>
        <div className="px-4 py-4 sm:px-5 md:grid md:grid-cols-2 md:items-start md:gap-6">
          <div className="space-y-2.5">
            <label className="block">
              <span className="mb-1 block font-mono text-[0.72rem] text-ink-3">name="uname"</span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg border border-rule-strong bg-surface px-3 py-1.5 text-[0.9rem] text-ink outline-none focus:border-accent"
              />
            </label>
            <label className="block">
              <span className="mb-1 block font-mono text-[0.72rem] text-ink-3">name="pass"</span>
              <input
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                className="w-full rounded-lg border border-rule-strong bg-surface px-3 py-1.5 text-[0.9rem] text-ink outline-none focus:border-accent"
              />
            </label>
          </div>

          <div className="mt-4 md:mt-0">
            <p className="font-mono text-[0.68rem] tracking-[0.1em] text-ink-3 uppercase">
            What the browser sends
          </p>
          <div className="mt-1.5 space-y-1.5 rounded-lg bg-[var(--code-bg)] px-3.5 py-3 font-mono text-[0.78rem]">
            <p className="text-[var(--syn-kw)]">
              {method}{' '}
              <span className="text-[var(--syn-string)]">
                /process.php{method === 'GET' ? `?${query}` : ''}
              </span>{' '}
              <span className="text-[var(--code-dim)]">HTTP/1.1</span>
            </p>
            <p className="text-[var(--code-dim)]">Host: localhost</p>
            {method === 'POST' && (
              <>
                <p className="text-[var(--code-dim)]">
                  Content-Type: application/x-www-form-urlencoded
                </p>
                <p className="pt-2 text-[var(--syn-string)]">{query}</p>
              </>
            )}
          </div>

          <p
            className={cn(
              'mt-3 rounded-lg px-3.5 py-2.5 text-[0.83rem] leading-relaxed',
              method === 'GET' ? 'bg-warn-tint text-ink-2' : 'bg-ok-tint text-ink-2',
            )}
          >
            {rich(
              method === 'GET'
                ? `Anyone glancing at the screen reads **${pass || '(empty)'}** straight off the address bar — and so does the browser history.`
                : 'The values are inside the request body, so they never reach the address bar or the history.',
            )}
            </p>
          </div>
        </div>

        <div className="overflow-x-auto border-t border-rule">
          <table className="w-full min-w-max border-collapse text-left">
            <thead>
              <tr className="bg-surface-sunk">
                <th className="border-b border-rule px-3 py-2 font-mono text-[0.66rem] tracking-wide text-ink-3 uppercase">
                  Feature
                </th>
                {(['GET', 'POST'] as const).map((m) => (
                  <th
                    key={m}
                    className={cn(
                      'border-b border-rule px-3 py-2 font-mono text-[0.66rem] tracking-wide uppercase transition-colors',
                      method === m ? 'text-accent' : 'text-ink-3',
                    )}
                  >
                    {m}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map(([feature, get, post]) => (
                <tr key={feature}>
                  <td className="border-b border-rule px-3 py-1.5 text-[0.8rem] font-medium text-ink">
                    {feature}
                  </td>
                  <td
                    className={cn(
                      'border-b border-rule px-3 py-1.5 text-[0.8rem] transition-colors',
                      method === 'GET' ? 'bg-accent-tint/40 text-ink' : 'text-ink-3',
                    )}
                  >
                    {get}
                  </td>
                  <td
                    className={cn(
                      'border-b border-rule px-3 py-1.5 text-[0.8rem] transition-colors',
                      method === 'POST' ? 'bg-accent-tint/40 text-ink' : 'text-ink-3',
                    )}
                  >
                    {post}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </WidgetFrame>
  )
}

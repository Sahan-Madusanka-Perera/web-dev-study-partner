import { useEffect, useRef, useState } from 'react'
import { FileCode2, Film, Image, Laptop, Music, Play, RotateCcw, Server, Sheet } from 'lucide-react'
import { WidgetFrame } from './WidgetFrame'
import { Button } from '../ui'
import { cn } from '../../lib/cn'
import { rich } from '../../lib/rich'

/* ── Who does what ─────────────────────────────────────────── */

const ROLES = [
  {
    key: 'client',
    name: 'Client',
    icon: Laptop,
    lines: [
      'Your phone, laptop or lab PC.',
      'Runs a **web browser**.',
      'Sends a **request** and waits.',
      'Renders whatever comes back.',
    ],
  },
  {
    key: 'server',
    name: 'Web server',
    icon: Server,
    lines: [
      'A computer that is always on.',
      'Stores the website’s files.',
      'Answers with a **response**.',
      'Never sends anything unasked.',
    ],
  },
] as const

export function ClientServerWidget() {
  const [active, setActive] = useState<'client' | 'server'>('client')
  return (
    <WidgetFrame
      title="Two computers, two jobs"
      hint="Every single page load in this course is one of these two boxes talking to the other. Tap either to see its job."
    >
      <div className="grid gap-px bg-rule sm:grid-cols-2">
        {ROLES.map((role) => {
          const Icon = role.icon
          const on = active === role.key
          return (
            <button
              key={role.key}
              onMouseEnter={() => setActive(role.key)}
              onFocus={() => setActive(role.key)}
              onClick={() => setActive(role.key)}
              className={cn(
                'group px-5 py-5 text-left transition-colors duration-200',
                on ? 'bg-brand text-brand-on' : 'bg-surface hover:bg-surface-sunk',
              )}
            >
              <span className="flex items-center gap-2.5">
                <Icon
                  className={cn('size-5', on ? 'text-[var(--accent-bright)]' : 'text-ink-3')}
                  strokeWidth={1.8}
                />
                <span
                  className={cn(
                    'font-display text-[1.1rem] font-semibold',
                    on ? 'text-brand-on' : 'text-ink',
                  )}
                >
                  {role.name}
                </span>
              </span>
              <ul className="mt-3 space-y-1.5">
                {role.lines.map((l, i) => (
                  <li
                    key={i}
                    className={cn(
                      'flex gap-2 text-[0.88rem] leading-relaxed',
                      on ? 'text-brand-on/85' : 'text-ink-2',
                    )}
                  >
                    <span
                      className={cn(
                        'mt-[0.62em] size-1 shrink-0 rounded-full',
                        on ? 'bg-[var(--accent-bright)]' : 'bg-ink-3',
                      )}
                      aria-hidden
                    />
                    <span>{rich(l)}</span>
                  </li>
                ))}
              </ul>
            </button>
          )
        })}
      </div>
    </WidgetFrame>
  )
}

/* ── The round trip, animated ──────────────────────────────── */

const TRIP = [
  { at: 'client', label: 'You type an address and press Enter', detail: 'The browser works out which server to talk to.' },
  { at: 'wire-out', label: 'The browser sends a request', detail: 'GET /index.html — "please send me this page".' },
  { at: 'server', label: 'The server finds the file', detail: 'It looks up index.html in its own storage.' },
  { at: 'wire-back', label: 'The server sends a response', detail: 'The HTML travels back across the Internet.' },
  { at: 'client', label: 'The browser renders the page', detail: 'Tags become headings, paragraphs and images on screen.' },
] as const

export function RequestResponseWidget() {
  const [step, setStep] = useState(-1)
  const [playing, setPlaying] = useState(false)
  const timer = useRef<number | null>(null)

  useEffect(() => {
    if (!playing) return
    if (step >= TRIP.length - 1) {
      setPlaying(false)
      return
    }
    timer.current = window.setTimeout(() => setStep((s) => s + 1), step < 0 ? 250 : 1350)
    return () => {
      if (timer.current) window.clearTimeout(timer.current)
    }
  }, [playing, step])

  const phase = step >= 0 ? TRIP[step].at : null

  return (
    <WidgetFrame
      title="One page load, step by step"
      hint="The Web is **on demand**: nothing crosses the wire until the browser asks. Play it through, then read the five steps back in your own words."
      toolbar={
        <>
          {step >= 0 && (
            <Button
              size="sm"
              variant="ghost"
              onClick={() => {
                setPlaying(false)
                setStep(-1)
              }}
            >
              <RotateCcw className="size-3.5" strokeWidth={2} />
              Reset
            </Button>
          )}
          <Button
            size="sm"
            variant="primary"
            onClick={() => {
              setStep(-1)
              setPlaying(true)
            }}
            disabled={playing}
          >
            <Play className="size-3.5" strokeWidth={2.4} />
            {step >= 0 ? 'Play again' : 'Send the request'}
          </Button>
        </>
      }
    >
      <div className="px-4 py-6 sm:px-6">
        <div className="flex items-center gap-3 sm:gap-5">
          <Node icon={Laptop} label="Browser" sub="client" lit={phase === 'client'} />

          <div className="relative min-w-0 flex-1">
            <div className="h-px w-full bg-rule-strong" />
            <div className="absolute inset-x-0 top-0 -translate-y-1/2">
              {/* out */}
              <Packet
                show={phase === 'wire-out'}
                direction="out"
                label="GET /index.html"
                tone="accent"
              />
              <Packet
                show={phase === 'wire-back'}
                direction="back"
                label="200 OK · text/html"
                tone="ok"
              />
            </div>
            <p className="mt-3 text-center font-mono text-[0.66rem] tracking-[0.1em] text-ink-3 uppercase">
              the Internet
            </p>
          </div>

          <Node icon={Server} label="Web server" sub="always on" lit={phase === 'server'} />
        </div>

        <ol className="mt-6 space-y-1.5">
          {TRIP.map((t, i) => (
            <li
              key={i}
              className={cn(
                'flex gap-3 rounded-lg px-3 py-2 transition-all duration-300',
                i === step ? 'bg-brand-tint' : i < step ? 'opacity-55' : 'opacity-35',
              )}
            >
              <span
                className={cn(
                  'mt-[1px] grid size-[20px] shrink-0 place-items-center rounded-md font-mono text-[0.66rem] font-semibold tabular-nums',
                  i === step ? 'bg-accent text-accent-on' : 'bg-surface-sunk text-ink-3',
                )}
              >
                {i + 1}
              </span>
              <span className="min-w-0">
                <span className="block text-[0.9rem] font-medium text-ink">{t.label}</span>
                <span className="block text-[0.84rem] text-ink-2">{t.detail}</span>
              </span>
            </li>
          ))}
        </ol>
      </div>
    </WidgetFrame>
  )
}

function Node({
  icon: Icon,
  label,
  sub,
  lit,
}: {
  icon: typeof Laptop
  label: string
  sub: string
  lit: boolean
}) {
  return (
    <div
      className={cn(
        'grid w-[5.5rem] shrink-0 place-items-center rounded-xl border px-2 py-3 text-center transition-all duration-300 sm:w-28',
        lit ? 'border-accent bg-accent-tint shadow-md' : 'border-rule bg-surface',
      )}
      style={lit ? { animation: 'pulse-ring 1.2s var(--ease-out-quint)' } : undefined}
    >
      <Icon
        className={cn('size-6 transition-colors', lit ? 'text-accent' : 'text-ink-3')}
        strokeWidth={1.6}
      />
      <span className="mt-1.5 text-[0.8rem] font-semibold text-ink">{label}</span>
      <span className="font-mono text-[0.62rem] text-ink-3">{sub}</span>
    </div>
  )
}

function Packet({
  show,
  direction,
  label,
  tone,
}: {
  show: boolean
  direction: 'out' | 'back'
  label: string
  tone: 'accent' | 'ok'
}) {
  return (
    <div
      className={cn(
        'absolute top-0 whitespace-nowrap rounded-full border px-2.5 py-1 font-mono text-[0.66rem] shadow-sm transition-all ease-[var(--ease-out-quint)]',
        tone === 'accent' ? 'border-accent bg-accent-tint text-accent' : 'border-ok bg-ok-tint text-ok',
        show ? 'opacity-100 duration-[1200ms]' : 'opacity-0 duration-200',
      )}
      style={{
        left: show ? (direction === 'out' ? 'calc(100% - 9rem)' : '0.25rem') : direction === 'out' ? '0.25rem' : 'calc(100% - 9rem)',
        transform: 'translateY(-50%)',
      }}
      aria-hidden={!show}
    >
      {direction === 'out' ? '→ ' : '← '}
      {label}
    </div>
  )
}

/* ── n + 1 objects ─────────────────────────────────────────── */

const OBJECT_KINDS = [
  { key: 'img', name: 'logo.png', icon: Image, note: 'image file' },
  { key: 'css', name: 'style.css', icon: Sheet, note: 'stylesheet' },
  { key: 'video', name: 'intro.mp4', icon: Film, note: 'video clip' },
  { key: 'audio', name: 'anthem.mp3', icon: Music, note: 'audio file' },
  { key: 'img2', name: 'photo.jpg', icon: Image, note: 'image file' },
]

export function WebObjectsWidget() {
  const [n, setN] = useState(2)
  const objects = OBJECT_KINDS.slice(0, n)

  return (
    <WidgetFrame
      title="Counting the objects on a page"
      hint="A page is a **bundle**. Add or remove embedded objects and watch the total requests change — it is always **n + 1**, because the base HTML file counts too."
      toolbar={
        <span className="flex items-center gap-2">
          <label htmlFor="obj-count" className="font-mono text-[0.7rem] text-ink-3">
            objects
          </label>
          <input
            id="obj-count"
            type="range"
            min={0}
            max={5}
            value={n}
            onChange={(e) => setN(Number(e.target.value))}
            className="w-28 accent-[var(--accent)]"
          />
          <span className="w-4 font-mono text-[0.8rem] text-ink tabular-nums">{n}</span>
        </span>
      }
    >
      <div className="px-4 py-5 sm:px-6">
        <ul className="space-y-1.5">
          <li className="flex items-center gap-3 rounded-lg border border-accent bg-accent-tint px-3 py-2">
            <FileCode2 className="size-4 shrink-0 text-accent" strokeWidth={1.9} />
            <span className="min-w-0 flex-1">
              <span className="block font-mono text-[0.84rem] text-ink">index.html</span>
              <span className="block text-[0.78rem] text-ink-2">
                the base HTML file — always request number 1
              </span>
            </span>
            <span className="font-mono text-[0.7rem] text-accent tabular-nums">request 1</span>
          </li>

          {objects.map((o, i) => {
            const Icon = o.icon
            return (
              <li
                key={o.key}
                className="anim-rise flex items-center gap-3 rounded-lg border border-rule bg-surface px-3 py-2"
                style={{ animationDelay: `${i * 45}ms` }}
              >
                <Icon className="size-4 shrink-0 text-ink-3" strokeWidth={1.9} />
                <span className="min-w-0 flex-1">
                  <span className="block font-mono text-[0.84rem] text-ink">{o.name}</span>
                  <span className="block text-[0.78rem] text-ink-2">
                    {o.note} — referenced by its own URL
                  </span>
                </span>
                <span className="font-mono text-[0.7rem] text-ink-3 tabular-nums">
                  request {i + 2}
                </span>
              </li>
            )
          })}

          {n === 0 && (
            <li className="rounded-lg border border-dashed border-rule px-3 py-3 text-center text-[0.85rem] text-ink-3">
              No embedded objects — a page of pure text needs exactly one request.
            </li>
          )}
        </ul>

        <p className="mt-4 rounded-xl bg-surface-sunk px-4 py-3 text-center font-mono text-[0.88rem] text-ink">
          n = {n} embedded object{n === 1 ? '' : 's'}
          <span className="text-ink-3"> → total = n + 1 = </span>
          <span className="font-semibold text-accent">{n + 1}</span>
          <span className="text-ink-3"> object{n + 1 === 1 ? '' : 's'} fetched</span>
        </p>
      </div>
    </WidgetFrame>
  )
}

/* ── Dissecting a URL ──────────────────────────────────────── */

const URL_PRESETS = [
  'https://www.nie.lk/curriculum/ict.html',
  'http://localhost/mywebsite/index.php',
  'https://www.w3schools.com/html/html_tables.asp',
]

export function UrlAnatomyWidget() {
  const [value, setValue] = useState(URL_PRESETS[0])
  const parts = splitUrl(value)

  return (
    <WidgetFrame
      title="Take a URL apart"
      hint="Type any address — including a broken one — and watch the three parts separate. This is the same split you make every time you decide between an absolute and a relative link."
    >
      <div className="px-4 py-5 sm:px-6">
        <label className="block">
          <span className="sr-only">Web address</span>
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            spellCheck={false}
            className="w-full rounded-lg border border-rule-strong bg-surface px-3.5 py-2.5 font-mono text-[0.88rem] text-ink outline-none focus:border-accent"
          />
        </label>

        <div className="mt-4 overflow-x-auto rounded-xl bg-[var(--code-bg)] px-4 py-4">
          <p className="font-mono text-[0.95rem] whitespace-nowrap">
            <Seg text={parts.protocol} colour="var(--syn-tag)" />
            <Seg text={parts.domain} colour="var(--syn-attr)" />
            <Seg text={parts.path} colour="var(--syn-string)" />
            {!parts.protocol && !parts.domain && !parts.path && (
              <span className="text-[var(--code-dim)]">type an address above</span>
            )}
          </p>
        </div>

        <dl className="mt-4 grid gap-2 sm:grid-cols-3">
          <PartCard
            colour="var(--syn-tag)"
            name="Protocol"
            value={parts.protocol || '—'}
            what="The rules the browser and server follow to send and retrieve information."
          />
          <PartCard
            colour="var(--syn-attr)"
            name="Domain name"
            value={parts.domain || '—'}
            what="The unique, readable name identifying the site, used in place of an IP address."
          />
          <PartCard
            colour="var(--syn-string)"
            name="Path"
            value={parts.path || '—'}
            what="Directs the browser to the specific page or location inside the website."
          />
        </dl>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {URL_PRESETS.map((p) => (
            <button
              key={p}
              onClick={() => setValue(p)}
              className={cn(
                'rounded-full border px-2.5 py-1 font-mono text-[0.7rem] transition-colors',
                value === p
                  ? 'border-accent bg-accent-tint text-accent'
                  : 'border-rule text-ink-3 hover:border-rule-strong hover:text-ink-2',
              )}
            >
              {p.replace(/^https?:\/\//, '').slice(0, 28)}
            </button>
          ))}
        </div>
      </div>
    </WidgetFrame>
  )
}

function Seg({ text, colour }: { text: string; colour: string }) {
  if (!text) return null
  return (
    <span
      className="rounded-[3px] px-0.5 py-0.5"
      style={{ color: colour, background: `color-mix(in oklab, ${colour} 14%, transparent)` }}
    >
      {text}
    </span>
  )
}

function PartCard({
  colour,
  name,
  value,
  what,
}: {
  colour: string
  name: string
  value: string
  what: string
}) {
  return (
    <div className="rounded-xl border border-rule bg-surface px-3.5 py-3">
      <dt className="flex items-center gap-2 text-[0.82rem] font-semibold text-ink">
        <span className="size-2 rounded-full" style={{ background: colour }} aria-hidden />
        {name}
      </dt>
      <dd className="mt-1 truncate font-mono text-[0.8rem] text-ink-2">{value}</dd>
      <dd className="mt-1.5 text-[0.8rem] leading-relaxed text-ink-3">{what}</dd>
    </div>
  )
}

function splitUrl(raw: string) {
  const m = /^([a-zA-Z][a-zA-Z0-9+.-]*:\/\/)?([^/?#]*)?([/?#].*)?$/.exec(raw.trim())
  return {
    protocol: m?.[1] ?? '',
    domain: m?.[2] ?? '',
    path: m?.[3] ?? '',
  }
}

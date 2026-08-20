import { useEffect, useMemo, useRef, useState } from 'react'
import { WidgetFrame } from './WidgetFrame'
import { CodeView } from '../blocks/CodePanel'
import { Preview, type PreviewHandle } from '../blocks/Preview'
import { cn } from '../../lib/cn'

/* ── The box model ─────────────────────────────────────────── */

export function BoxModelWidget() {
  const [content, setContent] = useState({ w: 200, h: 70 })
  const [padding, setPadding] = useState(16)
  const [border, setBorder] = useState(4)
  const [margin, setMargin] = useState(20)
  const [radius, setRadius] = useState(6)

  const totalW = content.w + padding * 2 + border * 2 + margin * 2
  const totalH = content.h + padding * 2 + border * 2 + margin * 2

  const css = `div {
  width: ${content.w}px;
  height: ${content.h}px;
  padding: ${padding}px;
  border: ${border}px solid black;
  margin: ${margin}px;
  border-radius: ${radius}px;
}`

  return (
    <WidgetFrame
      title="The box model, layer by layer"
      hint="Every element is four nested rectangles: **content**, **padding**, **border**, **margin**. Drag the sliders and watch the space each layer claims — and notice that the space an element really occupies is much larger than its `width`."
    >
      <div className="grid gap-0 lg:grid-cols-[19rem_minmax(0,1fr)] lg:divide-x lg:divide-rule">
        <div className="space-y-3 px-4 py-5 sm:px-5">
          <Slide label="width" value={content.w} min={60} max={280} onChange={(v) => setContent((c) => ({ ...c, w: v }))} />
          <Slide label="height" value={content.h} min={40} max={140} onChange={(v) => setContent((c) => ({ ...c, h: v }))} />
          <Slide label="padding" value={padding} min={0} max={40} onChange={setPadding} tint="#5aa46b" />
          <Slide label="border" value={border} min={0} max={16} onChange={setBorder} tint="#4b86f0" />
          <Slide label="margin" value={margin} min={0} max={40} onChange={setMargin} tint="#d9973c" />
          <Slide label="border-radius" value={radius} min={0} max={40} onChange={setRadius} tint="#8b7ef0" />

          <div className="rounded-lg bg-[var(--code-bg)] pt-1 pb-1">
            <CodeView code={css} lang="css" lineNumbers={false} />
          </div>

          <p className="rounded-lg bg-surface-sunk px-3.5 py-2.5 text-[0.82rem] leading-relaxed text-ink-2">
            Space actually taken:{' '}
            <span className="font-mono text-ink">
              {totalW} × {totalH} px
            </span>
            <br />
            <span className="text-ink-3">
              = content + padding×2 + border×2 + margin×2 on each axis.
            </span>
          </p>
        </div>

        <div className="grid place-items-center overflow-auto border-t border-rule bg-[repeating-linear-gradient(45deg,var(--surface-sunk)_0_8px,transparent_8px_16px)] p-6 lg:border-t-0">
          <div
            className="relative bg-[#f0c88a]/45 transition-all duration-200"
            style={{ padding: margin }}
          >
            <Tag text={`margin ${margin}px`} colour="#a86a12" pos="-top-[9px] left-1" />
            <div
              className="relative bg-[#6ba4f5]/40 transition-all duration-200"
              style={{ padding: border, borderRadius: radius }}
            >
              <Tag text={`border ${border}px`} colour="#1e5bb8" pos="-top-[9px] right-1" />
              <div
                className="relative bg-[#7fc79a]/45 transition-all duration-200"
                style={{ padding, borderRadius: Math.max(radius - border, 0) }}
              >
                <Tag text={`padding ${padding}px`} colour="#1d7a45" pos="-bottom-[9px] left-1" />
                <div
                  className="grid place-items-center bg-surface font-mono text-[0.76rem] text-ink transition-all duration-200"
                  style={{
                    width: content.w,
                    height: content.h,
                    borderRadius: Math.max(radius - border - padding, 0),
                  }}
                >
                  content
                  <br />
                  {content.w} × {content.h}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </WidgetFrame>
  )
}

function Tag({ text, colour, pos }: { text: string; colour: string; pos: string }) {
  return (
    <span
      className={cn('absolute rounded px-1 py-px font-mono text-[0.6rem] whitespace-nowrap', pos)}
      style={{ background: colour, color: '#fff' }}
    >
      {text}
    </span>
  )
}

function Slide({
  label,
  value,
  min,
  max,
  onChange,
  tint = 'var(--accent)',
}: {
  label: string
  value: number
  min: number
  max: number
  onChange: (v: number) => void
  tint?: string
}) {
  return (
    <label className="block">
      <span className="mb-0.5 flex items-baseline justify-between">
        <span className="font-mono text-[0.76rem] text-ink-2">{label}</span>
        <span className="font-mono text-[0.76rem] text-ink tabular-nums">{value}px</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full"
        style={{ accentColor: tint }}
      />
    </label>
  )
}

/* ── Selectors: what matches what ──────────────────────────── */

const SEL_HTML = `<div id="header">
  <h1 class="highlight">Vidya College</h1>
  <p>Serving students since 1974</p>
</div>

<h2>Notices</h2>
<p class="highlight">Sports meet on Friday.</p>
<p>Library closes at 4 pm.</p>

<div class="card highlight">
  <p>Grade 13 parents meeting</p>
</div>`

const SELECTORS = [
  { sel: 'p', name: 'Element selector', note: 'Targets every element of that type.' },
  { sel: '#header', name: 'ID selector', note: 'One element only — an id is meant to be unique on a page.' },
  { sel: '.highlight', name: 'Class selector', note: 'Any number of elements, of any type, that carry the class.' },
  { sel: '*', name: 'Universal selector', note: 'Every element in the document.' },
  { sel: 'h1, h2', name: 'Group selector', note: 'Comma-separated — one rule applied to several selectors.' },
  { sel: 'p.highlight', name: 'Compound selector', note: 'No space: a <p> that ALSO has class highlight. Not every .highlight.' },
]

export function SelectorWidget() {
  const [active, setActive] = useState(2)
  const previewRef = useRef<PreviewHandle>(null)
  const [count, setCount] = useState(0)
  const sel = SELECTORS[active]

  const css = `${sel.sel} {
  background: #ffe9a8;
  outline: 2px solid #c2831c;
}`

  useEffect(() => {
    const id = setTimeout(() => {
      const doc = previewRef.current?.doc()
      if (!doc) return
      try {
        setCount(doc.querySelectorAll(sel.sel).length)
      } catch {
        setCount(0)
      }
    }, 90)
    return () => clearTimeout(id)
  }, [sel.sel])

  return (
    <WidgetFrame
      title="Which elements does this selector reach?"
      hint="A selector is a question you ask the page: *which elements do I mean?* Switch between them and watch the highlight move. Pay attention to the last two — a comma means **or**, and no space means **and**."
    >
      <div className="grid gap-0 lg:grid-cols-[16.5rem_minmax(0,1fr)] lg:divide-x lg:divide-rule">
        <ul className="divide-y divide-rule">
          {SELECTORS.map((s, i) => (
            <li key={s.sel}>
              <button
                onClick={() => setActive(i)}
                className={cn(
                  'w-full px-4 py-2.5 text-left transition-colors',
                  i === active ? 'bg-brand text-brand-on' : 'hover:bg-surface-sunk',
                )}
              >
                <code
                  className={cn(
                    'font-mono text-[0.84rem]',
                    i === active ? 'text-[var(--accent-bright)]' : 'text-[var(--lang-css)]',
                  )}
                >
                  {s.sel}
                </code>
                <span
                  className={cn(
                    'mt-0.5 block text-[0.78rem]',
                    i === active ? 'text-brand-on/80' : 'text-ink-3',
                  )}
                >
                  {s.name}
                </span>
              </button>
            </li>
          ))}
        </ul>

        <div className="min-w-0 border-t border-rule lg:border-t-0">
          <div className="flex items-baseline gap-2 border-b border-rule px-4 py-2">
            <span className="text-[0.85rem] text-ink-2">{sel.note}</span>
            <span className="ml-auto shrink-0 font-mono text-[0.74rem] text-accent tabular-nums">
              {count} match{count === 1 ? '' : 'es'}
            </span>
          </div>
          <div className="grid md:grid-cols-2 md:divide-x md:divide-rule">
            <div className="bg-[var(--code-bg)]">
              <CodeView code={css} lang="css" lineNumbers={false} />
              <div className="border-t border-[var(--code-rule)]">
                <CodeView code={SEL_HTML} lang="html" lineNumbers={false} />
              </div>
            </div>
            <div className="border-t border-rule bg-white md:border-t-0">
              <Preview ref={previewRef} html={SEL_HTML} css={css} minHeight={260} />
            </div>
          </div>
        </div>
      </div>
    </WidgetFrame>
  )
}

/* ── The cascade, decided live ─────────────────────────────── */

const LAYERS = [
  { key: 'browser', label: 'Browser default', colour: 'black', rank: 0, code: '(no CSS written — the browser decides)' },
  { key: 'external', label: 'External stylesheet', colour: 'teal', rank: 1, code: '/* main.css */\np { color: teal; }' },
  { key: 'internal', label: 'Internal <style>', colour: 'blue', rank: 2, code: '<style>\n  p { color: blue; }\n</style>' },
  { key: 'inline', label: 'Inline style attribute', colour: 'green', rank: 3, code: '<p style="color: green">' },
  { key: 'important', label: '!important in the external file', colour: 'red', rank: 4, code: '/* main.css */\np { color: red !important; }' },
] as const

export function CascadeWidget() {
  const [on, setOn] = useState<Record<string, boolean>>({ external: true, internal: true })

  const winner = useMemo(() => {
    const active = LAYERS.filter((l) => (l.key === 'browser' ? true : on[l.key]))
    return active.reduce((best, l) => (l.rank >= best.rank ? l : best), LAYERS[0])
  }, [on])

  return (
    <WidgetFrame
      title="Which rule wins?"
      hint="Switch the layers on and off. **Inline beats internal and external; internal and external are equal, so the one written last wins; the browser default loses to everything — and `!important` beats them all.**"
    >
      <div className="grid gap-0 md:grid-cols-[minmax(0,1fr)_15rem] md:divide-x md:divide-rule">
        <ul className="divide-y divide-rule">
          {LAYERS.map((l) => {
            const isOn = l.key === 'browser' ? true : !!on[l.key]
            const isWinner = winner.key === l.key
            return (
              <li key={l.key} className="flex items-start gap-3 px-4 py-2.5">
                <button
                  role="switch"
                  aria-checked={isOn}
                  aria-label={l.label}
                  disabled={l.key === 'browser'}
                  onClick={() => setOn((s) => ({ ...s, [l.key]: !s[l.key] }))}
                  className={cn(
                    'mt-1 h-5 w-9 shrink-0 rounded-full p-0.5 transition-colors disabled:opacity-40',
                    isOn ? 'bg-accent' : 'bg-rule-strong',
                  )}
                >
                  <span
                    className={cn(
                      'block size-4 rounded-full bg-white shadow-sm transition-transform',
                      isOn && 'translate-x-4',
                    )}
                  />
                </button>
                <div className="min-w-0 flex-1">
                  <p className="flex flex-wrap items-center gap-2">
                    <span className={cn('text-[0.9rem] font-medium', isOn ? 'text-ink' : 'text-ink-3')}>
                      {l.label}
                    </span>
                    {isWinner && (
                      <span className="rounded-full bg-ok-tint px-2 py-px font-mono text-[0.62rem] tracking-wide text-ok uppercase">
                        wins
                      </span>
                    )}
                  </p>
                  <pre
                    className={cn(
                      'mt-1 overflow-x-auto font-mono text-[0.74rem] leading-relaxed whitespace-pre-wrap',
                      isOn ? 'text-ink-2' : 'text-ink-3/60',
                    )}
                  >
                    {l.code}
                  </pre>
                </div>
              </li>
            )
          })}
        </ul>

        <div className="grid place-items-center border-t border-rule bg-white p-6 md:border-t-0">
          <p
            className="text-center text-[1.15rem] transition-colors duration-300"
            style={{ color: winner.colour, fontFamily: '"Times New Roman", serif' }}
          >
            This paragraph is
            <br />
            <strong>{winner.colour}</strong>
          </p>
        </div>
      </div>
    </WidgetFrame>
  )
}

/* ── Measuring units ───────────────────────────────────────── */

const UNITS = [
  { u: '%', kind: 'relative', what: 'Percentage of the parent’s value' },
  { u: 'em', kind: 'relative', what: 'Relative to the element’s own font size' },
  { u: 'rem', kind: 'relative', what: 'Relative to the root <html> font size' },
  { u: 'vw', kind: 'relative', what: '1% of the viewport width' },
  { u: 'vh', kind: 'relative', what: '1% of the viewport height' },
  { u: 'px', kind: 'absolute', what: 'Pixels — a single dot on the screen' },
  { u: 'cm', kind: 'absolute', what: 'Centimetres — for print' },
  { u: 'in', kind: 'absolute', what: 'Inches. 1in = 96px' },
  { u: 'pt', kind: 'absolute', what: 'Points. 1pt = 1/72 inch' },
] as const

export function UnitsWidget() {
  const [unit, setUnit] = useState<(typeof UNITS)[number]['u']>('rem')
  const [n, setN] = useState(2)
  const [rootPx, setRootPx] = useState(16)
  const [parentPx, setParentPx] = useState(20)

  const box = useRef<HTMLDivElement>(null)
  const [measured, setMeasured] = useState(0)

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      if (box.current) setMeasured(Math.round(box.current.getBoundingClientRect().width))
    })
    return () => cancelAnimationFrame(id)
  }, [unit, n, rootPx, parentPx])

  const info = UNITS.find((u) => u.u === unit)!

  return (
    <WidgetFrame
      title="Relative and absolute units"
      hint="A **relative** unit changes meaning depending on its context; an **absolute** unit does not. Change the root and parent font sizes and watch which units move."
    >
      <div className="grid gap-0 md:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] md:divide-x md:divide-rule">
        <div className="space-y-3.5 px-4 py-5 sm:px-5">
          <div className="flex flex-wrap gap-1">
            {UNITS.map((u) => (
              <button
                key={u.u}
                onClick={() => setUnit(u.u)}
                className={cn(
                  'rounded-lg border px-2.5 py-1 font-mono text-[0.78rem] transition-colors',
                  unit === u.u
                    ? 'border-ink bg-brand text-brand-on'
                    : u.kind === 'relative'
                      ? 'border-rule bg-surface text-ink-2 hover:border-rule-strong'
                      : 'border-rule bg-surface-sunk text-ink-3 hover:border-rule-strong',
                )}
              >
                {u.u}
              </button>
            ))}
          </div>
          <p className="text-[0.85rem] text-ink-2">
            <span
              className={cn(
                'mr-1.5 rounded-full px-2 py-px font-mono text-[0.64rem] tracking-wide uppercase',
                info.kind === 'relative' ? 'bg-accent-tint text-accent' : 'bg-surface-sunk text-ink-3',
              )}
            >
              {info.kind}
            </span>
            {info.what}
          </p>

          <Slide label={`value (${unit})`} value={n} min={1} max={unit === 'px' ? 300 : unit === '%' ? 100 : 20} onChange={setN} />
          <Slide label="html font-size" value={rootPx} min={10} max={28} onChange={setRootPx} tint="#8b7ef0" />
          <Slide label="parent font-size" value={parentPx} min={10} max={40} onChange={setParentPx} tint="#4b86f0" />

          <p className="rounded-lg bg-surface-sunk px-3.5 py-2.5 font-mono text-[0.8rem] text-ink">
            width: {n}
            {unit}
            <span className="text-ink-3"> → measured </span>
            <span className="text-accent">{measured}px</span>
          </p>
        </div>

        <div className="border-t border-rule px-4 py-6 md:border-t-0">
          <div
            style={{ fontSize: `${parentPx}px`, ['--root' as string]: `${rootPx}px` }}
            className="rounded-lg border border-dashed border-rule px-3 py-3"
          >
            <p className="mb-2 font-mono text-[0.7rem] text-ink-3">
              parent — font-size: {parentPx}px
            </p>
            <div
              ref={box}
              className="grid h-12 place-items-center rounded-md bg-accent-tint font-mono text-[0.75rem] text-accent transition-all duration-200"
              style={{
                width:
                  unit === 'rem'
                    ? `calc(${n} * ${rootPx}px)`
                    : `${n}${unit}`,
                maxWidth: '100%',
              }}
            >
              {n}
              {unit}
            </div>
          </div>
        </div>
      </div>
    </WidgetFrame>
  )
}

/* ── Link states, in LVHA order ────────────────────────────── */

const STATES = [
  { sel: 'a:link', when: 'Not visited yet', colour: 'blue', extra: '' },
  { sel: 'a:visited', when: 'Already opened by this browser', colour: 'purple', extra: '' },
  { sel: 'a:hover', when: 'The mouse pointer is over it', colour: 'red', extra: 'text-decoration: underline;' },
  { sel: 'a:active', when: 'The mouse button is held down on it', colour: 'green', extra: '' },
  { sel: 'a:focus', when: 'Reached by keyboard, using Tab', colour: 'blue', extra: 'outline: 2px solid orange;' },
]

export function LinkStatesWidget() {
  return (
    <WidgetFrame
      title="The five link states"
      hint="Hover the sample links, then press Tab to reach one with the keyboard. Order matters: write them **L V H A** — `:link`, `:visited`, `:hover`, `:active` — or later rules will silently cancel earlier ones."
    >
      <div className="grid gap-0 md:grid-cols-2 md:divide-x md:divide-rule">
        <ul className="divide-y divide-rule">
          {STATES.map((s) => (
            <li key={s.sel} className="flex items-baseline gap-3 px-4 py-2.5">
              <code className="w-[5.6rem] shrink-0 font-mono text-[0.82rem] text-[var(--lang-css)]">
                {s.sel}
              </code>
              <span className="min-w-0 flex-1 text-[0.86rem] text-ink-2">{s.when}</span>
              <span
                className="size-3 shrink-0 rounded-full"
                style={{ background: s.colour }}
                aria-hidden
              />
            </li>
          ))}
        </ul>

        <div className="border-t border-rule bg-white p-5 md:border-t-0">
          <Preview
            minHeight={190}
            html={`<p><a href="#a">A link you have not visited</a></p>
<p><a href="#b" id="v">A link styled as visited</a></p>
<p>Hover any of them, or press Tab to focus.</p>`}
            css={`a:link { color: blue; }
a#v { color: purple; }
a:hover { color: red; text-decoration: underline; }
a:active { color: green; }
a:focus { outline: 2px solid orange; }`}
          />
        </div>
      </div>
    </WidgetFrame>
  )
}

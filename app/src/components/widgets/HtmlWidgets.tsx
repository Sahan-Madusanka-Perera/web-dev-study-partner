import { useMemo, useState } from 'react'
import { File, Folder, Search } from 'lucide-react'
import { WidgetFrame } from './WidgetFrame'
import { Preview } from '../blocks/Preview'
import { CodeView } from '../blocks/CodePanel'
import { cn } from '../../lib/cn'
import { Button } from '../ui'

/* ── Colour, three ways ────────────────────────────────────── */

const NAMED: { name: string; rgb: [number, number, number] }[] = [
  { name: 'black', rgb: [0, 0, 0] },
  { name: 'white', rgb: [255, 255, 255] },
  { name: 'red', rgb: [255, 0, 0] },
  { name: 'lime', rgb: [0, 255, 0] },
  { name: 'blue', rgb: [0, 0, 255] },
  { name: 'green', rgb: [0, 128, 0] },
  { name: 'navy', rgb: [0, 0, 128] },
  { name: 'maroon', rgb: [128, 0, 0] },
  { name: 'yellow', rgb: [255, 255, 0] },
  { name: 'orange', rgb: [255, 165, 0] },
  { name: 'purple', rgb: [128, 0, 128] },
  { name: 'teal', rgb: [0, 128, 128] },
  { name: 'gray', rgb: [128, 128, 128] },
  { name: 'silver', rgb: [192, 192, 192] },
  { name: 'crimson', rgb: [220, 20, 60] },
  { name: 'lightblue', rgb: [173, 216, 230] },
  { name: 'lavender', rgb: [230, 230, 250] },
]

function hex2(n: number) {
  return n.toString(16).padStart(2, '0').toUpperCase()
}

export function ColourMixerWidget() {
  const [rgb, setRgb] = useState<[number, number, number]>([230, 230, 250])
  const hex = `#${hex2(rgb[0])}${hex2(rgb[1])}${hex2(rgb[2])}`
  const nearest = useMemo(() => {
    let best = NAMED[0]
    let bestD = Infinity
    for (const c of NAMED) {
      const d =
        (c.rgb[0] - rgb[0]) ** 2 + (c.rgb[1] - rgb[1]) ** 2 + (c.rgb[2] - rgb[2]) ** 2
      if (d < bestD) {
        bestD = d
        best = c
      }
    }
    return { ...best, exact: bestD === 0 }
  }, [rgb])
  const light = rgb[0] * 0.299 + rgb[1] * 0.587 + rgb[2] * 0.114 > 150

  const CHANNELS: { label: string; i: 0 | 1 | 2; tint: string }[] = [
    { label: 'RR — red', i: 0, tint: '#e2603b' },
    { label: 'GG — green', i: 1, tint: '#2f9e56' },
    { label: 'BB — blue', i: 2, tint: '#4b86f0' },
  ]

  return (
    <WidgetFrame
      title="One colour, three notations"
      hint="HTML accepts a **colour name**, a **hex code** or an **rgb() value** anywhere a colour is wanted. Move the sliders and watch all three change together — they are the same colour written three ways."
    >
      <div className="grid gap-0 md:grid-cols-[minmax(0,1fr)_16rem]">
        <div className="px-4 py-5 sm:px-6">
          {CHANNELS.map((ch) => (
            <label key={ch.i} className="mb-3.5 block last:mb-0">
              <span className="mb-1 flex items-baseline justify-between">
                <span className="font-mono text-[0.78rem] text-ink-2">{ch.label}</span>
                <span className="font-mono text-[0.78rem] text-ink tabular-nums">
                  {rgb[ch.i]} <span className="text-ink-3">= {hex2(rgb[ch.i])}</span>
                </span>
              </span>
              <input
                type="range"
                min={0}
                max={255}
                value={rgb[ch.i]}
                onChange={(e) => {
                  const next = [...rgb] as [number, number, number]
                  next[ch.i] = Number(e.target.value)
                  setRgb(next)
                }}
                className="w-full"
                style={{ accentColor: ch.tint }}
              />
            </label>
          ))}

          <dl className="mt-5 space-y-1.5">
            <Row k="Hex" v={hex} />
            <Row k="RGB" v={`rgb(${rgb.join(', ')})`} />
            <Row k="Nearest name" v={nearest.exact ? nearest.name : `${nearest.name} (closest)`} />
          </dl>

          <p className="mt-4 rounded-lg bg-surface-sunk px-3.5 py-2.5 text-[0.82rem] leading-relaxed text-ink-2">
            Each channel holds 256 values, so 256 × 256 × 256 =
            <span className="font-mono text-ink"> 16,777,216</span> colours can be written this way
            — the "16.7 million colours" the notes mention.
          </p>
        </div>

        <div
          className="grid min-h-[13rem] place-items-center border-t border-rule p-5 md:border-t-0 md:border-l"
          style={{ background: hex }}
        >
          <div className={cn('text-center', light ? 'text-black' : 'text-white')}>
            <p className="font-mono text-[1.05rem] font-semibold">{hex}</p>
            <p className="mt-1 font-mono text-[0.76rem] opacity-80">rgb({rgb.join(', ')})</p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 border-t border-rule px-4 py-3 sm:px-6">
        {NAMED.slice(2).map((c) => (
          <button
            key={c.name}
            onClick={() => setRgb(c.rgb)}
            title={c.name}
            className="size-6 rounded-md border border-rule transition-transform hover:scale-110"
            style={{ background: `rgb(${c.rgb.join(',')})` }}
            aria-label={c.name}
          />
        ))}
      </div>
    </WidgetFrame>
  )
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-baseline gap-3">
      <dt className="w-[7rem] shrink-0 text-[0.82rem] text-ink-3">{k}</dt>
      <dd className="font-mono text-[0.86rem] text-ink">{v}</dd>
    </div>
  )
}

/* ── colspan and rowspan, made visible ─────────────────────── */

type CellState = { label: string; colspan: number; rowspan: number; gone: boolean }

function freshGrid(): CellState[][] {
  const letters = [
    ['A', 'B', 'C'],
    ['D', 'E', 'F'],
    ['G', 'H', 'I'],
  ]
  return letters.map((row) => row.map((label) => ({ label, colspan: 1, rowspan: 1, gone: false })))
}

export function TableSpansWidget() {
  const [grid, setGrid] = useState<CellState[][]>(freshGrid)
  const [sel, setSel] = useState<[number, number]>([0, 0])
  const [r, c] = sel
  const cell = grid[r][c]

  function apply(colspan: number, rowspan: number) {
    const next = freshGrid()
    // Re-apply every existing span except the selected cell's, then the new one.
    grid.forEach((row, ri) =>
      row.forEach((cl, ci) => {
        if (ri === r && ci === c) return
        if (cl.gone) return
        next[ri][ci].colspan = cl.colspan
        next[ri][ci].rowspan = cl.rowspan
      }),
    )
    next[r][c].colspan = colspan
    next[r][c].rowspan = rowspan
    // Mark every cell swallowed by a span as gone.
    next.forEach((row, ri) =>
      row.forEach((cl, ci) => {
        if (cl.gone) return
        for (let dr = 0; dr < cl.rowspan; dr++) {
          for (let dc = 0; dc < cl.colspan; dc++) {
            if (dr === 0 && dc === 0) continue
            if (next[ri + dr]?.[ci + dc]) next[ri + dr][ci + dc].gone = true
          }
        }
      }),
    )
    setGrid(next)
  }

  const html = useMemo(() => {
    const lines = ['<table border="1">']
    grid.forEach((row) => {
      lines.push('  <tr>')
      row.forEach((cl) => {
        if (cl.gone) return
        const attrs = [
          cl.colspan > 1 ? ` colspan="${cl.colspan}"` : '',
          cl.rowspan > 1 ? ` rowspan="${cl.rowspan}"` : '',
        ].join('')
        lines.push(`    <td${attrs}>${cl.label}</td>`)
      })
      lines.push('  </tr>')
    })
    lines.push('</table>')
    return lines.join('\n')
  }, [grid])

  const swallowed = grid.flat().filter((x) => x.gone).map((x) => x.label)

  return (
    <WidgetFrame
      title="Merging cells with colspan and rowspan"
      hint="Pick a cell, give it a span, and watch which neighbours get **deleted from the markup**. That deletion is the part students forget — a merged cell replaces the cells it covers, it does not sit on top of them."
      toolbar={
        <Button
          size="sm"
          variant="ghost"
          onClick={() => {
            setGrid(freshGrid())
            setSel([0, 0])
          }}
        >
          Reset table
        </Button>
      }
    >
      <div className="grid gap-0 lg:grid-cols-2 lg:divide-x lg:divide-rule">
        <div className="px-4 py-5 sm:px-6">
          <p className="mb-2.5 font-mono text-[0.68rem] tracking-[0.1em] text-ink-3 uppercase">
            Click a cell
          </p>
          <div className="inline-grid grid-cols-3 gap-1">
            {grid.flat().map((cl, i) => {
              const ri = Math.floor(i / 3)
              const ci = i % 3
              const on = ri === r && ci === c
              return (
                <button
                  key={i}
                  onClick={() => setSel([ri, ci])}
                  disabled={cl.gone}
                  className={cn(
                    'grid size-14 place-items-center rounded-lg border-2 font-mono text-[0.9rem] font-semibold transition-all',
                    cl.gone
                      ? 'border-dashed border-rule bg-transparent text-ink-3/50 line-through'
                      : on
                        ? 'border-accent bg-accent-tint text-ink'
                        : 'border-rule bg-surface text-ink hover:border-rule-strong',
                  )}
                >
                  {cl.label}
                </button>
              )
            })}
          </div>

          {!cell.gone && (
            <div className="mt-5 space-y-3">
              <SpanControl
                label="colspan"
                help="how many columns this cell covers"
                value={cell.colspan}
                max={3 - c}
                onChange={(v) => apply(v, cell.rowspan)}
              />
              <SpanControl
                label="rowspan"
                help="how many rows this cell covers"
                value={cell.rowspan}
                max={3 - r}
                onChange={(v) => apply(cell.colspan, v)}
              />
            </div>
          )}

          {swallowed.length > 0 && (
            <p className="mt-4 rounded-lg bg-warn-tint px-3.5 py-2.5 text-[0.84rem] text-ink-2">
              <span className="font-semibold text-ink">
                {swallowed.join(', ')}
              </span>{' '}
              {swallowed.length === 1 ? 'has' : 'have'} been removed from the HTML — the span now
              occupies that space.
            </p>
          )}
        </div>

        <div className="border-t border-rule lg:border-t-0">
          <p className="border-b border-rule px-3.5 py-1.5 font-mono text-[0.68rem] tracking-[0.1em] text-ink-3 uppercase">
            The markup
          </p>
          <div className="bg-[var(--code-bg)]">
            <CodeView code={html} lang="html" lineNumbers={false} />
          </div>
          <p className="border-y border-rule px-3.5 py-1.5 font-mono text-[0.68rem] tracking-[0.1em] text-ink-3 uppercase">
            Rendered
          </p>
          <div className="bg-white">
            <Preview html={html} minHeight={130} />
          </div>
        </div>
      </div>
    </WidgetFrame>
  )
}

function SpanControl({
  label,
  help,
  value,
  max,
  onChange,
}: {
  label: string
  help: string
  value: number
  max: number
  onChange: (v: number) => void
}) {
  return (
    <div>
      <p className="mb-1 flex items-baseline gap-2">
        <code className="font-mono text-[0.82rem] text-[var(--lang-css)]">{label}</code>
        <span className="text-[0.78rem] text-ink-3">{help}</span>
      </p>
      <div className="flex gap-1">
        {[1, 2, 3].map((v) => (
          <button
            key={v}
            disabled={v > max}
            onClick={() => onChange(v)}
            className={cn(
              'h-8 w-10 rounded-lg border font-mono text-[0.82rem] transition-colors disabled:opacity-30',
              v === value
                ? 'border-ink bg-brand text-brand-on'
                : 'border-rule bg-surface text-ink-2 enabled:hover:border-rule-strong',
            )}
          >
            {v}
          </button>
        ))}
      </div>
    </div>
  )
}

/* ── Absolute vs relative paths ────────────────────────────── */

const TREE = [
  { path: 'C:/mysite/index.html', kind: 'file' },
  { path: 'C:/mysite/about.html', kind: 'file' },
  { path: 'C:/mysite/images/logo.png', kind: 'file' },
  { path: 'C:/mysite/images/team/kasun.jpg', kind: 'file' },
  { path: 'C:/mysite/pages/contact.html', kind: 'file' },
  { path: 'C:/mysite/media/song.mp3', kind: 'file' },
] as const

export function PathExplorerWidget() {
  const [from, setFrom] = useState('C:/mysite/index.html')
  const [to, setTo] = useState('C:/mysite/images/logo.png')

  const relative = relativePath(from, to)

  return (
    <WidgetFrame
      title="Absolute and relative paths"
      hint="Pick the page you are writing **in**, then the file you want to reach. The relative path is what you actually type into `href` or `src` — it is read from where your page sits, not from the top of the disk."
    >
      <div className="grid gap-0 md:grid-cols-2 md:divide-x md:divide-rule">
        <PathPicker label="I am writing this page" value={from} onChange={setFrom} only="html" />
        <PathPicker label="I want to link to" value={to} onChange={setTo} />
      </div>

      <div className="space-y-3 border-t border-rule px-4 py-4 sm:px-6">
        <div>
          <p className="font-mono text-[0.68rem] tracking-[0.1em] text-ink-3 uppercase">
            Relative path — usually what you want
          </p>
          <code className="mt-1 block rounded-lg bg-[var(--code-bg)] px-3.5 py-2.5 font-mono text-[0.86rem] text-[var(--syn-string)]">
            {from === to ? '(that is the page you are already on)' : relative}
          </code>
          <p className="mt-1.5 text-[0.84rem] leading-relaxed text-ink-2">
            Shows the location of the file <em>with respect to the current folder</em>. It does not
            start from the root, it is shorter, and it keeps working when you upload the site to a
            web server.
          </p>
        </div>
        <div>
          <p className="font-mono text-[0.68rem] tracking-[0.1em] text-ink-3 uppercase">
            Absolute path — the complete address
          </p>
          <code className="mt-1 block rounded-lg bg-[var(--code-bg)] px-3.5 py-2.5 font-mono text-[0.86rem] text-[var(--syn-attr)]">
            {to}
          </code>
          <p className="mt-1.5 text-[0.84rem] leading-relaxed text-ink-2">
            Starts from the root — <code className="font-mono">C:</code> on Windows,{' '}
            <code className="font-mono">/</code> on Linux and macOS — and names every folder along
            the way. Correct on your machine, and broken on everybody else's.
          </p>
        </div>
      </div>
    </WidgetFrame>
  )
}

function PathPicker({
  label,
  value,
  onChange,
  only,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  only?: 'html'
}) {
  const items = only ? TREE.filter((t) => t.path.endsWith('.html')) : TREE
  return (
    <div className="px-4 py-4 sm:px-5">
      <p className="mb-2 font-mono text-[0.68rem] tracking-[0.1em] text-ink-3 uppercase">{label}</p>
      <ul className="space-y-0.5">
        {items.map((t) => {
          const depth = t.path.split('/').length - 2
          const on = t.path === value
          return (
            <li key={t.path}>
              <button
                onClick={() => onChange(t.path)}
                className={cn(
                  'flex w-full items-center gap-1.5 rounded-md px-2 py-1 text-left font-mono text-[0.78rem] transition-colors',
                  on ? 'bg-brand text-brand-on' : 'text-ink-2 hover:bg-surface-sunk hover:text-ink',
                )}
                style={{ paddingLeft: `${0.5 + depth * 0.85}rem` }}
              >
                {t.path.endsWith('/') ? (
                  <Folder className="size-3.5 shrink-0" strokeWidth={1.9} />
                ) : (
                  <File className="size-3.5 shrink-0 opacity-70" strokeWidth={1.9} />
                )}
                <span className="truncate">{t.path.split('/').slice(1).join('/')}</span>
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

function relativePath(from: string, to: string) {
  const a = from.split('/').slice(0, -1)
  const b = to.split('/')
  let i = 0
  while (i < a.length && i < b.length - 1 && a[i] === b[i]) i++
  const up = a.length - i
  return [...Array(up).fill('..'), ...b.slice(i)].join('/')
}

/* ── Every tag in the syllabus, searchable ─────────────────── */

interface TagInfo {
  tag: string
  group: string
  what: string
  demo: string
}

const TAGS: TagInfo[] = [
  { tag: '<h1>–<h6>', group: 'Structure', what: 'Six levels of heading, most to least important.', demo: '<h1>Heading 1</h1><h3>Heading 3</h3><h6>Heading 6</h6>' },
  { tag: '<p>', group: 'Structure', what: 'A paragraph — a block of text with space before and after.', demo: '<p>First paragraph.</p><p>Second paragraph.</p>' },
  { tag: '<br>', group: 'Structure', what: 'A single line break. An empty tag — no closing tag.', demo: 'Line one<br>Line two' },
  { tag: '<hr>', group: 'Structure', what: 'A horizontal rule marking a thematic break.', demo: 'Above<hr>Below' },
  { tag: '<div>', group: 'Structure', what: 'A block-level container used to group and organise other elements.', demo: '<div style="border:1px solid #999;padding:6px">A div wraps this.</div>' },
  { tag: '<span>', group: 'Structure', what: 'An inline wrapper for styling part of a line without changing layout.', demo: '<p>This is <span style="color:red">important</span> text.</p>' },
  { tag: '<pre>', group: 'Structure', what: 'Preformatted text — spaces and line breaks are kept exactly.', demo: '<pre>Line 1\n    Line 2 (indented)\nLine 3</pre>' },
  { tag: '<b>', group: 'Text', what: 'Bold, for highlighting keywords.', demo: 'Normal <b>bold</b>' },
  { tag: '<strong>', group: 'Text', what: 'Like <b>, but adds the meaning that the text is important.', demo: 'Normal <strong>strong</strong>' },
  { tag: '<i>', group: 'Text', what: 'Italics, often for titles, quotes or foreign words.', demo: 'Normal <i>italic</i>' },
  { tag: '<em>', group: 'Text', what: 'Emphasis — italic, with meaning attached.', demo: 'Normal <em>emphasis</em>' },
  { tag: '<u>', group: 'Text', what: 'Underlines text to draw attention.', demo: 'Normal <u>underlined</u>' },
  { tag: '<ins>', group: 'Text', what: 'Inserted text; usually shown underlined.', demo: 'Price: <ins>Rs. 500</ins>' },
  { tag: '<del>', group: 'Text', what: 'Deleted content.', demo: 'Price: <del>Rs. 800</del> Rs. 500' },
  { tag: '<s>', group: 'Text', what: 'A line through the middle, for something no longer accurate.', demo: '<s>Sold out</s> Back in stock' },
  { tag: '<big>', group: 'Text', what: 'Increases the font size of the text.', demo: 'Normal <big>bigger</big>' },
  { tag: '<small>', group: 'Text', what: 'Decreases the font size of the text.', demo: 'Normal <small>smaller</small>' },
  { tag: '<sup>', group: 'Text', what: 'Superscript, for exponents and ordinals.', demo: 'X<sup>2</sup> + X + 2' },
  { tag: '<sub>', group: 'Text', what: 'Subscript, for chemical formulas and indices.', demo: 'C<sub>2</sub>H<sub>5</sub>OH' },
  { tag: '<mark>', group: 'Text', what: 'Highlights text — yellow background by default.', demo: 'Read the <mark>highlighted</mark> part' },
  { tag: '<font>', group: 'Text', what: 'Sets face, size and colour. Deprecated in HTML5 — CSS does this now.', demo: '<font color="blue" face="Arial" size="4">Styled text</font>' },
  { tag: '<ul> <li>', group: 'Lists', what: 'An unordered list — order does not matter, bullets by default.', demo: '<ul><li>Tomatoes</li><li>Onion</li><li>Garlic</li></ul>' },
  { tag: '<ol> <li>', group: 'Lists', what: 'An ordered list — numbering matters.', demo: '<ol><li>Pull mask down</li><li>Place over face</li><li>Pull strings tight</li></ol>' },
  { tag: '<dl> <dt> <dd>', group: 'Lists', what: 'A description list: terms and their descriptions.', demo: '<dl><dt>SQL</dt><dd>A query based language</dd></dl>' },
  { tag: '<table>', group: 'Tables', what: 'The outermost element holding all table content.', demo: '<table border="1"><tr><th>Name</th><th>Ext</th></tr><tr><td>Pat</td><td>x394</td></tr></table>' },
  { tag: '<caption>', group: 'Tables', what: 'A title or description for the table.', demo: '<table border="1"><caption>Marks</caption><tr><td>A</td><td>B</td></tr></table>' },
  { tag: '<tr>', group: 'Tables', what: 'One table row, holding <td> or <th> cells.', demo: '<table border="1"><tr><td>row 1</td></tr><tr><td>row 2</td></tr></table>' },
  { tag: '<td>', group: 'Tables', what: 'A table data cell — one cell of content.', demo: '<table border="1"><tr><td>plain cell</td></tr></table>' },
  { tag: '<th>', group: 'Tables', what: 'A header cell — bold and centred by default.', demo: '<table border="1"><tr><th>header</th><td>data</td></tr></table>' },
  { tag: '<thead> <tbody> <tfoot>', group: 'Tables', what: 'Header, body and footer regions of a structured table.', demo: '<table border="1"><thead><tr><th>Region</th><th>Amount</th></tr></thead><tbody><tr><td>North</td><td>$3,000</td></tr></tbody><tfoot><tr><th>Total</th><th>$6,500</th></tr></tfoot></table>' },
  { tag: '<a>', group: 'Links', what: 'The anchor tag — creates a hyperlink via href.', demo: '<a href="https://www.nie.lk" target="_blank">National Institute of Education</a>' },
  { tag: '<img>', group: 'Media', what: 'Embeds an image. Self-closing; src and alt are required.', demo: '<img src="media/bird.jpg" alt="A blue bird on a branch" width="220">' },
  { tag: '<audio>', group: 'Media', what: 'Embeds sound. Add controls so the visitor can play it.', demo: '<audio src="media/sample.mp3" controls></audio>' },
  { tag: '<video>', group: 'Media', what: 'Embeds video, with controls, autoplay, loop and muted.', demo: '<video src="media/sample.mp4" controls width="240"></video>' },
  { tag: '<embed>', group: 'Media', what: 'Embeds external content such as a PDF or media file.', demo: '<embed src="media/sample.mp4" width="240" height="140">' },
  { tag: '<center>', group: 'Deprecated', what: 'Centres content horizontally. Deprecated in HTML5 — replaced by CSS.', demo: '<center><b>Centred</b><br>everything inside</center>' },
  { tag: '<marquee>', group: 'Deprecated', what: 'Scrolls content across the page. Deprecated, but still in the syllabus.', demo: '<marquee>Scrolling text</marquee>' },
]

export function TagExplorerWidget() {
  const [q, setQ] = useState('')
  const [openTag, setOpenTag] = useState<string | null>('<h1>–<h6>')

  const groups = useMemo(() => {
    const needle = q.trim().toLowerCase()
    const filtered = needle
      ? TAGS.filter(
          (t) => t.tag.toLowerCase().includes(needle) || t.what.toLowerCase().includes(needle) || t.group.toLowerCase().includes(needle),
        )
      : TAGS
    const map = new Map<string, TagInfo[]>()
    filtered.forEach((t) => {
      map.set(t.group, [...(map.get(t.group) ?? []), t])
    })
    return [...map.entries()]
  }, [q])

  return (
    <WidgetFrame
      title="Every tag in the syllabus"
      hint="Search by tag or by what it does, then open one to see it render. Keep this open while you work through Module 3 and 4."
      toolbar={
        <span className="flex items-center gap-1.5 rounded-lg border border-rule bg-surface px-2 py-1">
          <Search className="size-3.5 text-ink-3" strokeWidth={2} />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="search tags…"
            className="w-32 bg-transparent font-mono text-[0.75rem] text-ink outline-none placeholder:text-ink-3"
          />
        </span>
      }
    >
      <div className="max-h-[30rem] overflow-y-auto">
        {groups.length === 0 && (
          <p className="px-5 py-8 text-center text-[0.9rem] text-ink-3">
            No tag matches “{q}”.
          </p>
        )}
        {groups.map(([group, items]) => (
          <section key={group}>
            <p className="sticky top-0 z-10 border-y border-rule bg-surface-sunk px-4 py-1.5 font-mono text-[0.68rem] tracking-[0.12em] text-ink-3 uppercase">
              {group}
            </p>
            <ul className="divide-y divide-rule">
              {items.map((t) => {
                const open = openTag === t.tag
                return (
                  <li key={t.tag}>
                    <button
                      onClick={() => setOpenTag(open ? null : t.tag)}
                      className="flex w-full items-baseline gap-3 px-4 py-2.5 text-left transition-colors hover:bg-surface-sunk/60"
                    >
                      <code className="shrink-0 font-mono text-[0.82rem] text-[var(--lang-html)]">
                        {t.tag}
                      </code>
                      <span className="min-w-0 flex-1 text-[0.88rem] text-ink-2">{t.what}</span>
                    </button>
                    {open && (
                      <div className="anim-fade grid gap-px bg-rule md:grid-cols-2">
                        <div className="bg-[var(--code-bg)]">
                          <CodeView code={t.demo} lang="html" lineNumbers={false} />
                        </div>
                        <div className="bg-white">
                          <Preview html={t.demo} minHeight={70} />
                        </div>
                      </div>
                    )}
                  </li>
                )
              })}
            </ul>
          </section>
        ))}
      </div>
    </WidgetFrame>
  )
}

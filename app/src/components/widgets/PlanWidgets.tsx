import { useState } from 'react'
import { WidgetFrame } from './WidgetFrame'
import { cn } from '../../lib/cn'
import { rich } from '../../lib/rich'

interface Structure {
  key: string
  name: string
  when: string
  risk: string
  nodes: { id: string; label: string; x: number; y: number }[]
  edges: [string, string][]
}

const STRUCTURES: Structure[] = [
  {
    key: 'linear',
    name: 'Linear',
    when: 'The visitor must go through the pages **in order** — a tutorial, a registration flow, a set of exam instructions.',
    risk: 'Frustrating if a visitor only wants page four; there is no way to jump.',
    nodes: [
      { id: 'a', label: 'Step 1', x: 8, y: 50 },
      { id: 'b', label: 'Step 2', x: 33, y: 50 },
      { id: 'c', label: 'Step 3', x: 58, y: 50 },
      { id: 'd', label: 'Done', x: 83, y: 50 },
    ],
    edges: [
      ['a', 'b'],
      ['b', 'c'],
      ['c', 'd'],
    ],
  },
  {
    key: 'hierarchical',
    name: 'Hierarchical',
    when: 'The site has **sections with sub-pages** — a school site with Academics → Grade 13 → Timetable. This is the usual shape.',
    risk: 'Bury a page three levels down and nobody finds it. Keep important pages near the top.',
    nodes: [
      { id: 'home', label: 'Home', x: 46, y: 12 },
      { id: 'about', label: 'About', x: 12, y: 52 },
      { id: 'acad', label: 'Academics', x: 46, y: 52 },
      { id: 'contact', label: 'Contact', x: 80, y: 52 },
      { id: 'g12', label: 'Grade 12', x: 30, y: 88 },
      { id: 'g13', label: 'Grade 13', x: 63, y: 88 },
    ],
    edges: [
      ['home', 'about'],
      ['home', 'acad'],
      ['home', 'contact'],
      ['acad', 'g12'],
      ['acad', 'g13'],
    ],
  },
  {
    key: 'hub',
    name: 'Hub and spoke',
    when: 'Every page links back to a **single home page** and nowhere else. Small sites of three or four pages.',
    risk: 'Visitors must return home to move sideways, which adds a click to every journey.',
    nodes: [
      { id: 'home', label: 'Home', x: 46, y: 50 },
      { id: 'p1', label: 'Services', x: 12, y: 20 },
      { id: 'p2', label: 'Products', x: 80, y: 20 },
      { id: 'p3', label: 'Gallery', x: 12, y: 80 },
      { id: 'p4', label: 'Contact', x: 80, y: 80 },
    ],
    edges: [
      ['home', 'p1'],
      ['home', 'p2'],
      ['home', 'p3'],
      ['home', 'p4'],
    ],
  },
  {
    key: 'network',
    name: 'Networked',
    when: 'Pages link **freely to each other** — an encyclopaedia, a wiki, a large news site.',
    risk: 'Easy to get lost. Needs a persistent navigation menu and breadcrumbs to stay usable.',
    nodes: [
      { id: 'a', label: 'Home', x: 46, y: 15 },
      { id: 'b', label: 'Topics', x: 14, y: 52 },
      { id: 'c', label: 'Articles', x: 78, y: 52 },
      { id: 'd', label: 'Authors', x: 30, y: 88 },
      { id: 'e', label: 'Search', x: 66, y: 88 },
    ],
    edges: [
      ['a', 'b'],
      ['a', 'c'],
      ['b', 'c'],
      ['b', 'd'],
      ['c', 'e'],
      ['d', 'e'],
      ['a', 'e'],
    ],
  },
]

export function SitePlannerWidget() {
  const [active, setActive] = useState(1)
  const s = STRUCTURES[active]

  return (
    <WidgetFrame
      title="Navigation structures"
      hint="Deciding the shape of a site **before** writing any HTML is what the syllabus means by planning the layout and navigation pattern. Pick the shape that matches how visitors actually move, not the one that is easiest to draw."
    >
      <div className="flex flex-wrap gap-1 border-b border-rule px-4 py-2.5">
        {STRUCTURES.map((st, i) => (
          <button
            key={st.key}
            onClick={() => setActive(i)}
            className={cn(
              'rounded-lg border px-3 py-1.5 text-[0.84rem] font-medium transition-colors',
              i === active
                ? 'border-ink bg-brand text-brand-on'
                : 'border-rule bg-surface text-ink-2 hover:border-rule-strong hover:text-ink',
            )}
          >
            {st.name}
          </button>
        ))}
      </div>

      <div className="grid gap-0 md:grid-cols-[minmax(0,1fr)_18rem] md:divide-x md:divide-rule">
        <div className="p-4">
          <div className="relative h-[15rem] w-full rounded-xl bg-surface-sunk/60">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 size-full">
              {s.edges.map(([from, to], i) => {
                const a = s.nodes.find((n) => n.id === from)!
                const b = s.nodes.find((n) => n.id === to)!
                return (
                  <line
                    key={i}
                    x1={a.x + 7}
                    y1={a.y + 5}
                    x2={b.x + 7}
                    y2={b.y + 5}
                    stroke="var(--rule-strong)"
                    strokeWidth="0.5"
                    vectorEffect="non-scaling-stroke"
                  />
                )
              })}
            </svg>
            {s.nodes.map((n, i) => (
              <span
                key={n.id}
                className="anim-pop absolute rounded-lg border border-rule bg-surface px-2.5 py-1.5 font-mono text-[0.72rem] whitespace-nowrap text-ink shadow-sm"
                style={{
                  left: `${n.x}%`,
                  top: `${n.y}%`,
                  animationDelay: `${i * 50}ms`,
                }}
              >
                {n.label}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-3 border-t border-rule px-4 py-4 md:border-t-0">
          <div>
            <p className="font-mono text-[0.68rem] tracking-[0.1em] text-ink-3 uppercase">Use it when</p>
            <p className="mt-1 text-[0.88rem] leading-relaxed text-ink-2">{rich(s.when)}</p>
          </div>
          <div>
            <p className="font-mono text-[0.68rem] tracking-[0.1em] text-ink-3 uppercase">Watch out for</p>
            <p className="mt-1 text-[0.88rem] leading-relaxed text-ink-2">{rich(s.risk)}</p>
          </div>
          <p className="rounded-lg bg-surface-sunk px-3 py-2 text-[0.82rem] text-ink-2">
            The <strong className="text-ink">home page</strong> is the starting point of any site and
            carries the navigational links to everywhere else.
          </p>
        </div>
      </div>
    </WidgetFrame>
  )
}

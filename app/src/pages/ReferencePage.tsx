import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { TagExplorerWidget } from '../components/widgets/HtmlWidgets'
import { cssReference, glossary, phpReference, sqlReference, type RefEntry } from '../data/reference'
import { ThemeToggle } from '../components/layout/Shell'
import { CodeView } from '../components/blocks/CodePanel'
import type { Lang } from '../types/content'
import { cn } from '../lib/cn'

const TABS = [
  { key: 'html', label: 'HTML tags', accent: 'var(--lang-html)' },
  { key: 'css', label: 'CSS properties', accent: 'var(--lang-css)' },
  { key: 'php', label: 'PHP functions', accent: 'var(--lang-php)' },
  { key: 'sql', label: 'SQL statements', accent: 'var(--lang-sql)' },
  { key: 'glossary', label: 'Glossary', accent: 'var(--accent)' },
] as const

const DATA: Record<string, { entries: RefEntry[]; lang: Lang }> = {
  css: { entries: cssReference, lang: 'css' },
  php: { entries: phpReference, lang: 'php' },
  sql: { entries: sqlReference, lang: 'sql' },
  glossary: { entries: glossary, lang: 'text' },
}

export function ReferencePage() {
  const [tab, setTab] = useState<(typeof TABS)[number]['key']>('html')

  return (
    <div className="mx-auto max-w-[62rem] px-5 pt-8 pb-24 sm:px-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-[2rem] leading-tight font-semibold text-ink sm:text-[2.5rem]">
            Reference
          </h1>
          <p className="mt-2 max-w-[64ch] text-[1.02rem] leading-relaxed text-ink-2">
            Every tag, property, function and statement the syllabus asks for, in one searchable
            place. Keep it open beside your work.
          </p>
        </div>
        <span className="hidden lg:block">
          <ThemeToggle />
        </span>
      </div>

      <div className="mt-7 flex flex-wrap gap-1.5 border-b border-rule pb-3">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={cn(
              'flex items-center gap-2 rounded-lg border px-3.5 py-2 text-[0.88rem] font-medium transition-colors',
              tab === t.key
                ? 'border-ink bg-brand text-brand-on'
                : 'border-rule bg-surface text-ink-2 hover:border-rule-strong hover:text-ink',
            )}
          >
            <span className="size-2 rounded-full" style={{ background: t.accent }} aria-hidden />
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'html' ? (
        <TagExplorerWidget />
      ) : (
        <RefTable entries={DATA[tab].entries} lang={DATA[tab].lang} key={tab} />
      )}
    </div>
  )
}

function RefTable({ entries, lang }: { entries: RefEntry[]; lang: Lang }) {
  const [q, setQ] = useState('')

  const groups = useMemo(() => {
    const needle = q.trim().toLowerCase()
    const filtered = needle
      ? entries.filter(
          (e) =>
            e.name.toLowerCase().includes(needle) ||
            e.what.toLowerCase().includes(needle) ||
            e.group.toLowerCase().includes(needle) ||
            (e.example ?? '').toLowerCase().includes(needle),
        )
      : entries
    const map = new Map<string, RefEntry[]>()
    filtered.forEach((e) => map.set(e.group, [...(map.get(e.group) ?? []), e]))
    return [...map.entries()]
  }, [entries, q])

  const total = groups.reduce((n, [, list]) => n + list.length, 0)

  return (
    <div className="mt-6">
      <label className="flex items-center gap-2 rounded-lg border border-rule bg-surface px-3 py-2">
        <Search className="size-4 shrink-0 text-ink-3" strokeWidth={2} />
        <span className="sr-only">Search the reference</span>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search by name or by what it does…"
          className="min-w-0 flex-1 bg-transparent text-[0.92rem] text-ink outline-none placeholder:text-ink-3"
        />
        <span className="shrink-0 font-mono text-[0.72rem] text-ink-3 tabular-nums">{total}</span>
      </label>

      {groups.length === 0 && (
        <p className="mt-8 text-center text-[0.92rem] text-ink-3">Nothing matches “{q}”.</p>
      )}

      {groups.map(([group, items]) => (
        <section key={group} className="mt-7">
          <h2 className="mb-2 font-mono text-[0.7rem] tracking-[0.12em] text-ink-3 uppercase">
            {group}
          </h2>
          <ul className="divide-y divide-rule overflow-hidden rounded-xl border border-rule bg-surface">
            {items.map((e) => (
              <li key={e.name} className="px-4 py-3">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <code className="shrink-0 font-mono text-[0.85rem] font-medium text-ink">
                    {e.name}
                  </code>
                  <span className="min-w-0 flex-1 text-[0.9rem] leading-relaxed text-ink-2">
                    {e.what}
                  </span>
                </div>
                {e.example && (
                  <div className="mt-2 overflow-hidden rounded-lg bg-[var(--code-bg)]">
                    <CodeView code={e.example} lang={lang} lineNumbers={false} />
                  </div>
                )}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}

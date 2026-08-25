import { Fragment } from 'react'
import { BookMarked, CircleAlert, Clock, Info, Lightbulb, ListChecks, ScrollText } from 'lucide-react'
import type { Block, Lang } from '../../types/content'
import { rich } from '../../lib/rich'
import { cn } from '../../lib/cn'
import { CodePanel, CodeView, CopyButton } from './CodePanel'
import { Preview } from './Preview'
import { Quiz } from '../quiz/Quiz'
import { Challenge } from '../quiz/Challenge'
import { HtmlLab, CssLab } from '../labs/MarkupLab'
import { PhpLab } from '../labs/PhpLab'
import { FormLab } from '../labs/FormLab'
import { SqlLab, PhpDbLab } from '../labs/SqlLab'
import { Widget } from '../widgets/Widget'

export function Blocks({ blocks, lessonId }: { blocks: Block[]; lessonId: string }) {
  return (
    <>
      {blocks.map((b, i) => (
        /* Keyed by lesson as well as position: two lessons often carry the
           same kind of block at the same index, and a bare index key lets
           React reuse the instance, so a lab keeps the previous lesson's
           code. Including the lesson id remounts blocks on navigation. */
        <Fragment key={`${lessonId}:${i}`}>
          <BlockView block={b} lessonId={lessonId} index={i} />
        </Fragment>
      ))}
    </>
  )
}

function BlockView({ block: b, lessonId, index }: { block: Block; lessonId: string; index: number }) {
  switch (b.b) {
    case 'h2':
      return (
        <h2
          id={slug(b.text)}
          className="scroll-mt-24 pt-6 font-display text-[1.62rem] leading-[1.2] font-semibold text-ink first:pt-0 sm:text-[1.85rem]"
        >
          {b.text}
        </h2>
      )

    case 'h3':
      return (
        <h3
          id={slug(b.text)}
          className="scroll-mt-24 pt-3 font-sans text-[1.06rem] font-semibold tracking-normal text-ink"
        >
          {b.text}
        </h3>
      )

    case 'lead':
      return (
        <p className="text-[1.12rem] leading-[1.65] text-ink-2 sm:text-[1.18rem]">{rich(b.text)}</p>
      )

    case 'p':
      return <p className="leading-[1.72] text-ink-2">{rich(b.text)}</p>

    case 'ul':
      return (
        <ul className={cn('space-y-2 pl-1', b.tight && 'space-y-1')}>
          {b.items.map((item, i) => (
            <li key={i} className="flex gap-2.5 leading-[1.65] text-ink-2">
              <span className="mt-[0.62em] size-[5px] shrink-0 rounded-full bg-accent" aria-hidden />
              <span className="min-w-0">{rich(item)}</span>
            </li>
          ))}
        </ul>
      )

    case 'ol':
      return (
        <ol className="space-y-2.5" start={b.start}>
          {b.items.map((item, i) => (
            <li key={i} className="flex gap-3 leading-[1.65] text-ink-2">
              <span className="mt-[0.15em] grid size-[21px] shrink-0 place-items-center rounded-md bg-surface-sunk font-mono text-[0.7rem] font-semibold text-ink-2 tabular-nums">
                {(b.start ?? 1) + i}
              </span>
              <span className="min-w-0">{rich(item)}</span>
            </li>
          ))}
        </ol>
      )

    case 'dl':
      return (
        <dl className="divide-y divide-rule overflow-hidden rounded-xl border border-rule bg-surface">
          {b.items.map((item, i) => (
            <div key={i} className="grid gap-1 px-4 py-3 sm:grid-cols-[10.5rem_minmax(0,1fr)] sm:gap-4">
              <dt className="font-semibold text-ink">{item.term}</dt>
              <dd className="text-[0.95rem] leading-relaxed text-ink-2">{rich(item.desc)}</dd>
            </div>
          ))}
        </dl>
      )

    case 'code':
      return (
        <figure className="my-1">
          <CodePanel
            title={b.filename}
            lang={b.lang}
            actions={<CopyButton text={b.code} />}
          >
            <CodeView code={b.code} lang={b.lang} highlightLines={b.highlight} />
          </CodePanel>
          {b.caption && (
            <figcaption className="mt-2 px-1 text-[0.86rem] text-ink-3">{rich(b.caption)}</figcaption>
          )}
        </figure>
      )

    case 'result':
      return (
        <figure className="my-1">
          <div className="overflow-hidden rounded-xl border border-rule bg-surface">
            <p className="border-b border-rule bg-surface-sunk px-3.5 py-1.5 font-mono text-[0.68rem] tracking-[0.1em] text-ink-3 uppercase">
              {b.label ?? 'What the browser shows'}
            </p>
            {b.html ? (
              <Preview html={b.html} minHeight={60} />
            ) : (
              <pre className="overflow-x-auto px-4 py-3 font-mono text-[0.82rem] leading-relaxed whitespace-pre-wrap text-ink">
                {b.text}
              </pre>
            )}
          </div>
          {b.caption && (
            <figcaption className="mt-2 px-1 text-[0.86rem] text-ink-3">{rich(b.caption)}</figcaption>
          )}
        </figure>
      )

    case 'codeResult':
      return (
        <figure className="my-1 overflow-hidden rounded-xl border border-rule">
          <CodePanel
            title={b.filename}
            lang={b.lang}
            actions={<CopyButton text={b.code} />}
            className="rounded-none border-0 shadow-none"
          >
            <CodeView code={b.code} lang={b.lang} />
          </CodePanel>
          <div className="border-t border-rule bg-surface">
            <p className="border-b border-rule bg-surface-sunk px-3.5 py-1.5 font-mono text-[0.68rem] tracking-[0.1em] text-ink-3 uppercase">
              {b.resultHtml ? 'What the browser shows' : 'Output'}
            </p>
            {b.resultHtml ? (
              <Preview html={b.resultHtml} minHeight={54} />
            ) : (
              <pre className="overflow-x-auto px-4 py-3 font-mono text-[0.82rem] leading-relaxed whitespace-pre-wrap text-ink">
                {b.resultText}
              </pre>
            )}
          </div>
          {b.caption && (
            <figcaption className="border-t border-rule bg-surface px-4 py-2 text-[0.86rem] text-ink-3">
              {rich(b.caption)}
            </figcaption>
          )}
        </figure>
      )

    case 'note':
      return <Note tone={b.tone} title={b.title} text={b.text} />

    case 'table':
      return (
        <figure className="bleed my-1">
          <div className="overflow-x-auto rounded-xl border border-rule bg-surface">
            <table className="w-full min-w-max border-collapse text-left">
              <thead>
                <tr className="bg-surface-sunk">
                  {b.head.map((h, i) => (
                    <th
                      key={i}
                      className="border-b border-rule px-3.5 py-2.5 font-mono text-[0.7rem] font-semibold tracking-[0.08em] text-ink-2 uppercase"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {b.rows.map((row, ri) => (
                  <tr key={ri} className="align-top">
                    {row.map((cell, ci) => (
                      <td
                        key={ci}
                        className={cn(
                          'border-b border-rule px-3.5 leading-relaxed',
                          b.compact ? 'py-1.5 text-[0.85rem]' : 'py-2.5 text-[0.92rem]',
                          b.firstColHead && ci === 0
                            ? 'font-semibold text-ink'
                            : 'text-ink-2',
                        )}
                      >
                        {rich(cell)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {b.caption && (
            <figcaption className="mt-2 px-1 text-[0.86rem] text-ink-3">{rich(b.caption)}</figcaption>
          )}
        </figure>
      )

    case 'compare':
      return (
        <div className="my-1 grid gap-3 sm:grid-cols-2">
          {[b.left, b.right].map((side, i) => (
            <div key={i} className="rounded-xl border border-rule bg-surface p-4">
              <p className="mb-2.5 flex items-center gap-2 font-display text-[1.02rem] font-semibold text-ink">
                <span
                  className={cn('size-2 rounded-full', i === 0 ? 'bg-accent' : 'bg-[var(--lang-css)]')}
                  aria-hidden
                />
                {side.title}
              </p>
              <ul className="space-y-1.5">
                {side.items.map((item, j) => (
                  <li key={j} className="flex gap-2 text-[0.9rem] leading-relaxed text-ink-2">
                    <span className="mt-[0.6em] size-1 shrink-0 rounded-full bg-ink-3" aria-hidden />
                    <span className="min-w-0">{rich(item)}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )

    case 'steps':
      return (
        <ol className="my-1 space-y-4">
          {b.items.map((s, i) => (
            <li key={i} className="relative pl-9">
              <span className="absolute top-0 left-0 grid size-[26px] place-items-center rounded-lg bg-brand font-mono text-[0.72rem] font-semibold text-brand-on tabular-nums">
                {i + 1}
              </span>
              {i < b.items.length - 1 && (
                <span
                  className="absolute top-[30px] bottom-[-1rem] left-[12px] w-px bg-rule"
                  aria-hidden
                />
              )}
              <p className="font-semibold text-ink">{s.title}</p>
              <p className="mt-0.5 leading-relaxed text-ink-2">{rich(s.text)}</p>
              {s.code && (
                <div className="mt-2.5">
                  <CodePanel lang={s.lang ?? 'text'} actions={<CopyButton text={s.code} />}>
                    <CodeView code={s.code} lang={s.lang ?? 'text'} lineNumbers={false} />
                  </CodePanel>
                </div>
              )}
            </li>
          ))}
        </ol>
      )

    case 'tagref':
      return (
        <div className="my-1 divide-y divide-rule overflow-hidden rounded-xl border border-rule bg-surface">
          {b.items.map((t, i) => (
            <div key={i} className="px-4 py-3">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <code className="rounded-md bg-[var(--code-bg)] px-2 py-0.5 font-mono text-[0.84rem] text-[var(--syn-tag)]">
                  {t.tag}
                </code>
                <span className="min-w-0 flex-1 text-[0.93rem] leading-relaxed text-ink-2">
                  {rich(t.what)}
                </span>
              </div>
              {t.attrs && t.attrs.length > 0 && (
                <ul className="mt-2 ml-1 space-y-1 border-l border-rule pl-3">
                  {t.attrs.map((a, j) => (
                    <li key={j} className="flex flex-wrap gap-x-2 text-[0.86rem] text-ink-2">
                      <code className="font-mono text-[0.82rem] text-[var(--lang-css)]">{a.name}</code>
                      <span className="min-w-0 flex-1">{rich(a.what)}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )

    case 'keyvals':
      return (
        <div className="my-1 overflow-hidden rounded-xl border border-rule bg-surface">
          {b.title && (
            <p className="border-b border-rule bg-surface-sunk px-4 py-2 font-mono text-[0.7rem] tracking-[0.1em] text-ink-3 uppercase">
              {b.title}
            </p>
          )}
          <dl className="divide-y divide-rule">
            {b.items.map((kv, i) => (
              <div key={i} className="grid gap-0.5 px-4 py-2.5 sm:grid-cols-[minmax(0,13rem)_minmax(0,1fr)] sm:gap-4">
                <dt className="font-mono text-[0.84rem] text-ink">{kv.k}</dt>
                <dd className="text-[0.9rem] leading-relaxed text-ink-2">{rich(kv.v)}</dd>
              </div>
            ))}
          </dl>
        </div>
      )

    case 'lab':
      return <LabBlock spec={b.spec} />

    case 'widget':
      return <Widget spec={b.spec} />

    case 'quiz':
      return <Quiz id={`${lessonId}:quiz:${index}`} title={b.title} questions={b.questions} />

    case 'challenge':
      return <Challenge spec={b.spec} />

    case 'recap':
      return (
        <aside className="my-8 rounded-2xl border border-rule bg-brand-tint/60 px-4 py-4 sm:px-5">
          <p className="mb-2.5 flex items-center gap-2 font-mono text-[0.7rem] tracking-[0.12em] text-ink-2 uppercase">
            <ListChecks className="size-3.5" strokeWidth={2.2} />
            Worth remembering
          </p>
          <ul className="space-y-1.5">
            {b.items.map((item, i) => (
              <li key={i} className="flex gap-2.5 text-[0.93rem] leading-relaxed text-ink-2">
                <span className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                <span className="min-w-0">{rich(item)}</span>
              </li>
            ))}
          </ul>
        </aside>
      )

    case 'divider':
      return <hr className="my-9 border-t border-rule" />
  }
}

function LabBlock({ spec }: { spec: Extract<Block, { b: 'lab' }>['spec'] }) {
  switch (spec.lab) {
    case 'html':
      return <HtmlLab html={spec.html} height={spec.height} title={spec.title} note={spec.note} />
    case 'css':
      return (
        <CssLab
          html={spec.html}
          css={spec.css}
          height={spec.height}
          title={spec.title}
          note={spec.note}
          hideHtml={spec.hideHtml}
        />
      )
    case 'php':
      return (
        <PhpLab
          code={spec.code}
          height={spec.height}
          title={spec.title}
          note={spec.note}
          autoRun={spec.autoRun ?? true}
        />
      )
    case 'form':
      return (
        <FormLab
          formHtml={spec.formHtml}
          handler={spec.handler}
          method={spec.method}
          height={spec.height}
          title={spec.title}
          note={spec.note}
        />
      )
    case 'sql':
      return <SqlLab sql={spec.sql} database={spec.seed} height={spec.height} title={spec.title} note={spec.note} />
    case 'phpdb':
      return <PhpDbLab code={spec.code} height={spec.height} title={spec.title} note={spec.note} />
  }
}

const TONES: Record<
  string,
  { icon: typeof Info; ring: string; bg: string; ink: string; label: string }
> = {
  note: { icon: Info, ring: 'border-rule-strong', bg: 'bg-surface', ink: 'text-ink-2', label: 'Note' },
  tip: { icon: Lightbulb, ring: 'border-accent/40', bg: 'bg-accent-tint/60', ink: 'text-ink-2', label: 'Tip' },
  warn: { icon: CircleAlert, ring: 'border-warn/40', bg: 'bg-warn-tint/70', ink: 'text-ink-2', label: 'Careful' },
  exam: { icon: ScrollText, ring: 'border-ok/40', bg: 'bg-ok-tint/70', ink: 'text-ink-2', label: 'In the exam' },
  syllabus: { icon: BookMarked, ring: 'border-rule-strong', bg: 'bg-surface-sunk', ink: 'text-ink-2', label: 'Syllabus' },
  history: { icon: Clock, ring: 'border-rule-strong', bg: 'bg-surface-sunk', ink: 'text-ink-2', label: 'History' },
}

function Note({ tone, title, text }: { tone: string; title?: string; text: string }) {
  const t = TONES[tone] ?? TONES.note
  const Icon = t.icon
  return (
    <aside className={cn('my-1 flex gap-3 rounded-xl border px-4 py-3.5', t.ring, t.bg)}>
      <Icon className="mt-[3px] size-[18px] shrink-0 text-ink-2" strokeWidth={1.9} />
      <div className="min-w-0">
        <p className="font-semibold text-ink">{title ?? t.label}</p>
        <p className={cn('mt-0.5 text-[0.93rem] leading-relaxed', t.ink)}>{rich(text)}</p>
      </div>
    </aside>
  )
}

export function slug(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export type { Lang }

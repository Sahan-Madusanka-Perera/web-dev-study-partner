import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, PenLine, RefreshCw, Shuffle } from 'lucide-react'
import { modules } from '../data/course'
import { drawPaper, questionPool, structuredQuestions } from '../data/exam'
import { Quiz } from '../components/quiz/Quiz'
import { Button } from '../components/ui'
import { ThemeToggle } from '../components/layout/Shell'
import { rich } from '../lib/rich'
import { cn } from '../lib/cn'

const LENGTHS = [
  { n: 10, label: 'Quick round', about: 'about 5 minutes' },
  { n: 25, label: 'Half paper', about: 'about 15 minutes' },
  { n: 40, label: 'Full mock', about: 'about 25 minutes' },
]

export function PracticePage() {
  const [picked, setPicked] = useState<string[]>([])
  const [length, setLength] = useState(10)
  const [seed, setSeed] = useState(1)
  const [running, setRunning] = useState(false)
  const [tab, setTab] = useState<'mcq' | 'structured'>('mcq')

  const eligible = useMemo(
    () => (picked.length ? questionPool.filter((p) => picked.includes(p.moduleId)) : questionPool),
    [picked],
  )
  const paper = useMemo(() => drawPaper(length, picked.length ? picked : null, seed), [length, picked, seed])

  function toggle(id: string) {
    setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]))
    setRunning(false)
  }

  return (
    <div className="mx-auto max-w-[62rem] px-5 pt-8 pb-24 sm:px-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-[2rem] leading-tight font-semibold text-ink sm:text-[2.5rem]">
            Exam practice
          </h1>
          <p className="mt-2 max-w-[64ch] text-[1.02rem] leading-relaxed text-ink-2">
            Every question in the course, drawn into a paper. Choose which competency levels to be
            tested on, or take the whole thing.
          </p>
        </div>
        <span className="hidden lg:block">
          <ThemeToggle />
        </span>
      </div>

      <div className="mt-7 flex gap-1.5 border-b border-rule pb-3">
        {(
          [
            ['mcq', 'Multiple choice', `${questionPool.length} questions`],
            ['structured', 'Structured questions', `${structuredQuestions.length} with model answers`],
          ] as const
        ).map(([key, label, count]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={cn(
              'rounded-lg border px-3.5 py-2 text-left transition-colors',
              tab === key
                ? 'border-ink bg-brand text-brand-on'
                : 'border-rule bg-surface text-ink-2 hover:border-rule-strong hover:text-ink',
            )}
          >
            <span className="block text-[0.9rem] font-medium">{label}</span>
            <span
              className={cn(
                'block font-mono text-[0.68rem]',
                tab === key ? 'text-brand-on/70' : 'text-ink-3',
              )}
            >
              {count}
            </span>
          </button>
        ))}
      </div>

      {tab === 'mcq' ? (
        <>
          <section className="mt-8">
            <p className="mb-3 font-mono text-[0.7rem] tracking-[0.12em] text-ink-3 uppercase">
              Competency levels
            </p>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => {
                  setPicked([])
                  setRunning(false)
                }}
                className={cn(
                  'rounded-lg border px-3 py-1.5 text-[0.85rem] transition-colors',
                  picked.length === 0
                    ? 'border-ink bg-brand text-brand-on'
                    : 'border-rule bg-surface text-ink-2 hover:border-rule-strong',
                )}
              >
                Everything
              </button>
              {modules.map((m) => {
                const on = picked.includes(m.id)
                const n = questionPool.filter((p) => p.moduleId === m.id).length
                return (
                  <button
                    key={m.id}
                    onClick={() => toggle(m.id)}
                    className={cn(
                      'rounded-lg border px-3 py-1.5 text-[0.85rem] transition-colors',
                      on
                        ? 'border-ink bg-brand text-brand-on'
                        : 'border-rule bg-surface text-ink-2 hover:border-rule-strong hover:text-ink',
                    )}
                    title={`${n} questions`}
                  >
                    <span className="font-mono text-[0.75rem]">{m.competency}</span>{' '}
                    <span className="hidden sm:inline">{m.title}</span>
                  </button>
                )
              })}
            </div>
          </section>

          <section className="mt-6">
            <p className="mb-3 font-mono text-[0.7rem] tracking-[0.12em] text-ink-3 uppercase">
              Paper length
            </p>
            <div className="flex flex-wrap gap-1.5">
              {LENGTHS.map((l) => (
                <button
                  key={l.n}
                  onClick={() => {
                    setLength(l.n)
                    setRunning(false)
                  }}
                  disabled={eligible.length < 5}
                  className={cn(
                    'rounded-lg border px-3.5 py-2 text-left transition-colors disabled:opacity-50',
                    length === l.n
                      ? 'border-ink bg-brand text-brand-on'
                      : 'border-rule bg-surface text-ink-2 hover:border-rule-strong hover:text-ink',
                  )}
                >
                  <span className="block text-[0.88rem] font-medium">
                    {Math.min(l.n, eligible.length)} questions
                  </span>
                  <span
                    className={cn(
                      'block font-mono text-[0.68rem]',
                      length === l.n ? 'text-brand-on/70' : 'text-ink-3',
                    )}
                  >
                    {l.label} · {l.about}
                  </span>
                </button>
              ))}
            </div>
          </section>

          <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-rule pt-5">
            <Button
              variant="primary"
              onClick={() => {
                setSeed((s) => s + 1)
                setRunning(true)
              }}
            >
              <PenLine className="size-4" strokeWidth={2} />
              {running ? 'Start a new paper' : 'Start the paper'}
            </Button>
            {running && (
              <Button variant="secondary" onClick={() => setSeed((s) => s + 1)}>
                <Shuffle className="size-4" strokeWidth={2} />
                Reshuffle
              </Button>
            )}
            <span className="ml-auto font-mono text-[0.74rem] text-ink-3 tabular-nums">
              drawing from {eligible.length} questions
            </span>
          </div>

          {running ? (
            <div key={`${seed}-${length}-${picked.join()}`} className="mt-2">
              <Quiz
                id={`exam:${picked.join('+') || 'all'}:${length}`}
                title={`Practice paper — ${paper.length} questions`}
                questions={paper.map((p) => p.q)}
              />
              <details className="mt-2 rounded-xl border border-rule bg-surface px-4 py-3">
                <summary className="cursor-pointer text-[0.86rem] text-ink-2 select-none hover:text-ink">
                  Where these questions came from
                </summary>
                <ul className="mt-3 space-y-1">
                  {paper.map((p, i) => (
                    <li key={i} className="flex gap-2 text-[0.82rem] text-ink-2">
                      <span className="w-5 shrink-0 font-mono text-[0.72rem] text-ink-3 tabular-nums">
                        {i + 1}
                      </span>
                      <Link
                        to={`/m/${p.moduleSlug}/${p.lessonSlug}`}
                        className="min-w-0 hover:text-accent"
                      >
                        <span className="font-mono text-[0.72rem] text-ink-3">{p.competency}</span>{' '}
                        {p.lessonTitle}
                      </Link>
                    </li>
                  ))}
                </ul>
              </details>
            </div>
          ) : (
            <div className="mt-8 rounded-2xl border border-dashed border-rule px-6 py-10 text-center">
              <p className="text-[0.95rem] text-ink-2">
                Pick your levels and a length, then press <b className="text-ink">Start the paper</b>.
              </p>
              <p className="mt-1.5 text-[0.86rem] text-ink-3">
                Questions are spread across the levels you chose, so one big module cannot dominate.
              </p>
            </div>
          )}
        </>
      ) : (
        <StructuredList />
      )}
    </div>
  )
}

function StructuredList() {
  const [open, setOpen] = useState<string | null>(null)

  return (
    <section className="mt-8">
      <p className="max-w-[64ch] text-[0.95rem] leading-relaxed text-ink-2">
        Paper II asks for written answers, which no computer can mark. Write yours out on paper
        first, then reveal the model answer and mark yourself against it honestly.
      </p>

      <ul className="mt-6 space-y-3">
        {structuredQuestions.map((s) => {
          const showing = open === s.id
          return (
            <li key={s.id} className="overflow-hidden rounded-xl border border-rule bg-surface">
              <div className="px-4 py-3.5 sm:px-5">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="font-mono text-[0.7rem] text-ink-3">
                    Competency {s.competency}
                  </span>
                  <span className="ml-auto rounded-full bg-surface-sunk px-2.5 py-0.5 font-mono text-[0.68rem] text-ink-2">
                    {s.marks} marks
                  </span>
                </div>
                <p className="mt-2 text-[0.98rem] leading-relaxed text-ink">{s.question}</p>

                <Button
                  size="sm"
                  variant={showing ? 'ghost' : 'secondary'}
                  className="mt-3"
                  onClick={() => setOpen(showing ? null : s.id)}
                >
                  {showing ? (
                    <>
                      <RefreshCw className="size-3.5" strokeWidth={2} />
                      Hide the answer
                    </>
                  ) : (
                    <>
                      Show a model answer
                      <ArrowRight className="size-3.5" strokeWidth={2.2} />
                    </>
                  )}
                </Button>
              </div>

              {showing && (
                <div className="anim-rise border-t border-rule bg-ok-tint/40 px-4 py-3.5 sm:px-5">
                  <p className="mb-2 font-mono text-[0.68rem] tracking-[0.12em] text-ink-2 uppercase">
                    What a marker is looking for
                  </p>
                  <ul className="space-y-1.5">
                    {s.answer.map((line, i) => (
                      <li key={i} className="flex gap-2.5 text-[0.92rem] leading-relaxed text-ink-2">
                        <span
                          className="mt-[0.62em] size-1.5 shrink-0 rounded-full bg-ok"
                          aria-hidden
                        />
                        <span className="min-w-0">{rich(line)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          )
        })}
      </ul>
    </section>
  )
}

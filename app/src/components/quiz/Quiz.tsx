import { useEffect, useMemo, useState } from 'react'
import { ArrowDown, ArrowUp, Check, ChevronRight, RotateCcw, X } from 'lucide-react'
import type { Question } from '../../types/content'
import { rich } from '../../lib/rich'
import { cn } from '../../lib/cn'
import { Button } from '../ui'
import { CodeView } from '../blocks/CodePanel'
import { progress, useProgress } from '../../lib/progress'

type Answer = number[] | boolean | string | string[] | Record<string, string> | null

export function Quiz({
  id,
  title = 'Check yourself',
  questions,
}: {
  id: string
  title?: string
  questions: Question[]
}) {
  const [at, setAt] = useState(0)
  const [answer, setAnswer] = useState<Answer>(null)
  const [checked, setChecked] = useState(false)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)
  const saved = useProgress().quiz[id]

  const q = questions[at]
  const correct = useMemo(() => (checked ? isCorrect(q, answer) : false), [checked, q, answer])

  /* An ordering question needs a starting arrangement to drag from. */
  useEffect(() => {
    setAnswer(q.kind === 'order' ? shuffleStable(q.items) : null)
    setChecked(false)
  }, [at, q])

  function check() {
    if (answer === null) return
    setChecked(true)
    if (isCorrect(q, answer)) setScore((s) => s + 1)
  }

  function next() {
    if (at + 1 >= questions.length) {
      const finalScore = score
      progress.recordQuiz(id, finalScore, questions.length)
      setFinished(true)
      return
    }
    setAt(at + 1)
  }

  function restart() {
    setAt(0)
    setAnswer(questions[0].kind === 'order' ? shuffleStable(questions[0].items) : null)
    setChecked(false)
    setScore(0)
    setFinished(false)
  }

  if (finished) {
    const pct = Math.round((score / questions.length) * 100)
    return (
      <section className="not-prose bleed my-8 overflow-hidden rounded-2xl border border-rule bg-surface">
        <div className="px-6 py-8 text-center">
          <div
            className={cn(
              'anim-pop mx-auto grid size-14 place-items-center rounded-full',
              pct >= 80 ? 'bg-ok-tint text-ok' : pct >= 50 ? 'bg-accent-tint text-accent' : 'bg-bad-tint text-bad',
            )}
          >
            <span className="font-mono text-lg font-semibold tabular-nums">{pct}</span>
          </div>
          <p className="mt-3 font-display text-xl font-semibold text-ink">
            {score} out of {questions.length}
          </p>
          <p className="mt-1 text-[0.9rem] text-ink-2">
            {pct === 100
              ? 'Every one. Move on with confidence.'
              : pct >= 70
                ? 'Solid. Reread the ones you missed and try again.'
                : 'Worth another pass through the lesson before you continue.'}
          </p>
          <Button className="mt-4" variant="secondary" onClick={restart}>
            <RotateCcw className="size-4" strokeWidth={2} />
            Try again
          </Button>
        </div>
      </section>
    )
  }

  return (
    <section className="not-prose bleed my-8 overflow-hidden rounded-2xl border border-rule bg-surface shadow-sm">
      <header className="flex items-center gap-3 border-b border-rule bg-surface-sunk px-4 py-2.5">
        <span className="font-mono text-[0.7rem] tracking-[0.12em] text-ink-3 uppercase">
          {title}
        </span>
        <span className="ml-auto flex items-center gap-1.5">
          {questions.map((_, i) => (
            <span
              key={i}
              className={cn(
                'h-1.5 rounded-full transition-all duration-300',
                i === at ? 'w-5 bg-accent' : i < at ? 'w-1.5 bg-ink-3' : 'w-1.5 bg-rule-strong',
              )}
            />
          ))}
          {saved && (
            <span className="ml-2 font-mono text-[0.68rem] text-ink-3 tabular-nums">
              best {saved.score}/{saved.total}
            </span>
          )}
        </span>
      </header>

      <div key={at} className="anim-fade px-4 py-5 sm:px-6">
        <p className="text-[1.02rem] leading-relaxed font-medium text-ink">{rich(q.q)}</p>

        {'code' in q && q.code && (
          <div className="mt-3 overflow-hidden rounded-lg border border-[var(--code-rule)] bg-[var(--code-bg)]">
            <CodeView code={q.code} lang={q.codeLang ?? 'php'} lineNumbers={false} />
          </div>
        )}

        <div className="mt-4">
          <QuestionBody q={q} answer={answer} setAnswer={setAnswer} checked={checked} />
        </div>

        {checked && (
          <div
            className={cn(
              'anim-rise mt-4 flex items-start gap-2.5 rounded-xl px-3.5 py-3',
              correct ? 'bg-ok-tint' : 'bg-bad-tint',
            )}
          >
            <span
              className={cn(
                'mt-0.5 grid size-5 shrink-0 place-items-center rounded-full',
                correct ? 'bg-ok text-white' : 'bg-bad text-white',
              )}
            >
              {correct ? <Check className="size-3" strokeWidth={3.2} /> : <X className="size-3" strokeWidth={3.2} />}
            </span>
            <div className="min-w-0">
              <p className={cn('text-[0.88rem] font-semibold', correct ? 'text-ok' : 'text-bad')}>
                {correct ? 'Correct' : 'Not quite'}
              </p>
              <p className="mt-0.5 text-[0.88rem] leading-relaxed text-ink-2">{rich(q.why)}</p>
            </div>
          </div>
        )}

        <div className="mt-5 flex items-center gap-2">
          {!checked ? (
            <Button variant="primary" onClick={check} disabled={!hasAnswer(answer)}>
              Check answer
            </Button>
          ) : (
            <Button variant="primary" onClick={next}>
              {at + 1 >= questions.length ? 'See result' : 'Next question'}
              <ChevronRight className="size-4" strokeWidth={2.2} />
            </Button>
          )}
          <span className="ml-auto font-mono text-[0.72rem] text-ink-3 tabular-nums">
            {at + 1} / {questions.length}
          </span>
        </div>
      </div>
    </section>
  )
}

function hasAnswer(a: Answer) {
  if (a === null) return false
  if (Array.isArray(a)) return a.length > 0
  if (typeof a === 'string') return a.trim().length > 0
  if (typeof a === 'object') return Object.keys(a).length > 0
  return true
}

function isCorrect(q: Question, a: Answer): boolean {
  switch (q.kind) {
    case 'mcq':
      return Array.isArray(a) && a[0] === q.answer
    case 'multi': {
      if (!Array.isArray(a)) return false
      const picked = [...(a as number[])].sort()
      const want = [...q.answers].sort()
      return picked.length === want.length && picked.every((v, i) => v === want[i])
    }
    case 'tf':
      return a === q.answer
    case 'fill':
      return (
        typeof a === 'string' &&
        q.accept.some((x) => x.trim().toLowerCase() === a.trim().toLowerCase().replace(/\s+/g, ' '))
      )
    case 'order':
      return Array.isArray(a) && (a as string[]).every((v, i) => v === q.items[i])
    case 'match':
      return (
        !!a &&
        typeof a === 'object' &&
        !Array.isArray(a) &&
        q.pairs.every((p) => (a as Record<string, string>)[p.left] === p.right)
      )
  }
}

function QuestionBody({
  q,
  answer,
  setAnswer,
  checked,
}: {
  q: Question
  answer: Answer
  setAnswer: (a: Answer) => void
  checked: boolean
}) {
  switch (q.kind) {
    case 'mcq':
      return (
        <ul className="space-y-2">
          {q.options.map((opt, i) => {
            const picked = Array.isArray(answer) && (answer as number[])[0] === i
            const showRight = checked && i === q.answer
            const showWrong = checked && picked && i !== q.answer
            return (
              <li key={i}>
                <button
                  disabled={checked}
                  onClick={() => setAnswer([i])}
                  className={optionClass(picked, showRight, showWrong)}
                >
                  <Marker picked={picked} right={showRight} wrong={showWrong} shape="circle" />
                  <span className="min-w-0 flex-1">{rich(opt)}</span>
                </button>
              </li>
            )
          })}
        </ul>
      )

    case 'multi':
      return (
        <>
          <p className="mb-2 font-mono text-[0.7rem] text-ink-3">Select every correct option.</p>
          <ul className="space-y-2">
            {q.options.map((opt, i) => {
              const list = (Array.isArray(answer) ? (answer as number[]) : []) ?? []
              const picked = list.includes(i)
              const showRight = checked && q.answers.includes(i)
              const showWrong = checked && picked && !q.answers.includes(i)
              return (
                <li key={i}>
                  <button
                    disabled={checked}
                    onClick={() =>
                      setAnswer(picked ? list.filter((x) => x !== i) : [...list, i])
                    }
                    className={optionClass(picked, showRight, showWrong)}
                  >
                    <Marker picked={picked} right={showRight} wrong={showWrong} shape="square" />
                    <span className="min-w-0 flex-1">{rich(opt)}</span>
                  </button>
                </li>
              )
            })}
          </ul>
        </>
      )

    case 'tf':
      return (
        <div className="flex gap-2">
          {[true, false].map((v) => {
            const picked = answer === v
            const showRight = checked && v === q.answer
            const showWrong = checked && picked && v !== q.answer
            return (
              <button
                key={String(v)}
                disabled={checked}
                onClick={() => setAnswer(v)}
                className={cn(
                  optionClass(picked, showRight, showWrong),
                  'flex-1 justify-center font-medium',
                )}
              >
                {v ? 'True' : 'False'}
              </button>
            )
          })}
        </div>
      )

    case 'fill':
      return (
        <div className="flex flex-wrap items-center gap-2">
          {q.before && <span className="font-mono text-[0.9rem] text-ink-2">{q.before}</span>}
          <input
            value={typeof answer === 'string' ? answer : ''}
            disabled={checked}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder={q.placeholder ?? 'your answer'}
            spellCheck={false}
            autoComplete="off"
            className={cn(
              'min-w-[10rem] flex-1 rounded-lg border px-3 py-2 font-mono text-[0.9rem] text-ink transition-colors outline-none placeholder:text-ink-3',
              checked
                ? isCorrect(q, answer)
                  ? 'border-ok bg-ok-tint'
                  : 'border-bad bg-bad-tint'
                : 'border-rule-strong bg-surface focus:border-accent',
            )}
          />
          {q.after && <span className="font-mono text-[0.9rem] text-ink-2">{q.after}</span>}
          {checked && !isCorrect(q, answer) && (
            <span className="w-full font-mono text-[0.8rem] text-ink-2">
              Expected: <span className="text-ok">{q.accept[0]}</span>
            </span>
          )}
        </div>
      )

    case 'order': {
      const list = (Array.isArray(answer) ? (answer as string[]) : null) ?? q.items
      const move = (i: number, d: number) => {
        const next = [...list]
        const j = i + d
        if (j < 0 || j >= next.length) return
        ;[next[i], next[j]] = [next[j], next[i]]
        setAnswer(next)
      }
      return (
        <ol className="space-y-1.5">
          {list.map((item, i) => {
            const right = checked && q.items[i] === item
            return (
              <li
                key={item}
                className={cn(
                  'flex items-center gap-2 rounded-lg border px-3 py-2 text-[0.9rem] transition-colors',
                  checked
                    ? right
                      ? 'border-ok bg-ok-tint'
                      : 'border-bad bg-bad-tint'
                    : 'border-rule bg-surface',
                )}
              >
                <span className="w-4 shrink-0 font-mono text-[0.72rem] text-ink-3 tabular-nums">
                  {i + 1}
                </span>
                <span className="min-w-0 flex-1 text-ink">{item}</span>
                {!checked && (
                  <span className="flex shrink-0 gap-0.5">
                    <button
                      onClick={() => move(i, -1)}
                      disabled={i === 0}
                      aria-label="Move up"
                      className="grid size-7 place-items-center rounded-md text-ink-3 hover:bg-surface-sunk hover:text-ink disabled:opacity-30"
                    >
                      <ArrowUp className="size-3.5" strokeWidth={2.2} />
                    </button>
                    <button
                      onClick={() => move(i, 1)}
                      disabled={i === list.length - 1}
                      aria-label="Move down"
                      className="grid size-7 place-items-center rounded-md text-ink-3 hover:bg-surface-sunk hover:text-ink disabled:opacity-30"
                    >
                      <ArrowDown className="size-3.5" strokeWidth={2.2} />
                    </button>
                  </span>
                )}
              </li>
            )
          })}
        </ol>
      )
    }

    case 'match': {
      const map = (answer && typeof answer === 'object' && !Array.isArray(answer)
        ? (answer as Record<string, string>)
        : {}) as Record<string, string>
      const rights = shuffleStable(q.pairs.map((p) => p.right).filter((v, i, a) => a.indexOf(v) === i))
      return (
        <div className="space-y-2">
          {q.pairs.map((p) => {
            const chosen = map[p.left]
            const right = checked && chosen === p.right
            return (
              <div
                key={p.left}
                className={cn(
                  'flex flex-wrap items-center gap-2 rounded-lg border px-3 py-2',
                  checked ? (right ? 'border-ok bg-ok-tint' : 'border-bad bg-bad-tint') : 'border-rule bg-surface',
                )}
              >
                <span className="min-w-[7rem] flex-1 text-[0.9rem] font-medium text-ink">
                  {p.left}
                </span>
                <select
                  disabled={checked}
                  value={chosen ?? ''}
                  onChange={(e) => setAnswer({ ...map, [p.left]: e.target.value })}
                  className="rounded-md border border-rule-strong bg-surface px-2 py-1 text-[0.85rem] text-ink outline-none focus:border-accent"
                >
                  <option value="">choose…</option>
                  {rights.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
                {checked && !right && (
                  <span className="font-mono text-[0.75rem] text-ok">→ {p.right}</span>
                )}
              </div>
            )
          })}
        </div>
      )
    }
  }
}

function optionClass(picked: boolean, right: boolean, wrong: boolean) {
  return cn(
    'flex w-full items-start gap-2.5 rounded-xl border px-3.5 py-2.5 text-left text-[0.92rem] leading-relaxed transition-all duration-150',
    right
      ? 'border-ok bg-ok-tint text-ink'
      : wrong
        ? 'border-bad bg-bad-tint text-ink'
        : picked
          ? 'border-ink-3 bg-brand-tint text-ink'
          : 'border-rule bg-surface text-ink-2 hover:border-rule-strong hover:text-ink',
  )
}

function Marker({
  picked,
  right,
  wrong,
  shape,
}: {
  picked: boolean
  right: boolean
  wrong: boolean
  shape: 'circle' | 'square'
}) {
  return (
    <span
      className={cn(
        'mt-[3px] grid size-[17px] shrink-0 place-items-center border-2 transition-colors',
        shape === 'circle' ? 'rounded-full' : 'rounded-[5px]',
        right
          ? 'border-ok bg-ok text-white'
          : wrong
            ? 'border-bad bg-bad text-white'
            : picked
              ? 'border-ink bg-ink text-paper'
              : 'border-rule-strong',
      )}
    >
      {(picked || right) && <Check className="size-2.5" strokeWidth={3.6} />}
    </span>
  )
}

/** Deterministic shuffle: the same list always comes out the same way,
 *  so a re-render never silently reorders the options under the cursor. */
function shuffleStable<T>(items: T[]): T[] {
  const out = [...items]
  let seed = items.length * 9301 + 49297
  for (let i = out.length - 1; i > 0; i--) {
    seed = (seed * 9301 + 49297) % 233280
    const j = Math.floor((seed / 233280) * (i + 1))
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Check, Download, Flame, TriangleAlert, Upload } from 'lucide-react'
import { modules } from '../data/course'
import { allLessons, lessonPath, totalLessons } from '../lib/course'
import { progress, streakOf, useProgress } from '../lib/progress'
import { Button } from '../components/ui'
import { ThemeToggle } from '../components/layout/Shell'
import { cn } from '../lib/cn'

export function ProgressPage() {
  const state = useProgress()
  const doneCount = allLessons.filter((r) => state.done[r.lesson.id]).length
  const pct = Math.round((doneCount / totalLessons) * 100)
  const streak = streakOf(state.days)
  const fileInput = useRef<HTMLInputElement>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [confirming, setConfirming] = useState(false)

  const quizzes = Object.entries(state.quiz)
  const quizScore = quizzes.reduce((sum, [, q]) => sum + q.score, 0)
  const quizTotal = quizzes.reduce((sum, [, q]) => sum + q.total, 0)
  const solved = Object.keys(state.solved).length

  function download() {
    const blob = new Blob([progress.exportJSON()], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `study-partner-progress-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
    setMessage('Saved. Keep that file somewhere safe.')
  }

  return (
    <div className="mx-auto max-w-[62rem] px-5 pt-8 pb-24 sm:px-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-[2rem] leading-tight font-semibold text-ink sm:text-[2.5rem]">
            Your progress
          </h1>
          <p className="mt-2 max-w-[64ch] text-[1.02rem] leading-relaxed text-ink-2">
            Everything below lives in this browser only. Clearing your browsing data will clear it,
            so export a copy before you do.
          </p>
        </div>
        <span className="hidden lg:block">
          <ThemeToggle />
        </span>
      </div>

      <div className="mt-8 rounded-2xl border border-rule bg-surface p-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-[0.7rem] tracking-[0.12em] text-ink-3 uppercase">
              Lessons completed
            </p>
            <p className="mt-1 font-display text-[2.6rem] leading-none font-semibold text-ink tabular-nums">
              {doneCount}
              <span className="text-[1.4rem] text-ink-3">/{totalLessons}</span>
            </p>
          </div>
          <div className="flex flex-wrap gap-6 font-mono text-[0.78rem]">
            {streak > 0 && (
              <span>
                <span className="block text-[0.7rem] tracking-[0.1em] text-ink-3 uppercase">
                  streak
                </span>
                <span className="mt-0.5 flex items-center gap-1.5 text-[1.05rem] text-accent tabular-nums">
                  <Flame className="size-4" strokeWidth={2} />
                  {streak} day{streak === 1 ? '' : 's'}
                </span>
              </span>
            )}
            <span>
              <span className="block text-[0.7rem] tracking-[0.1em] text-ink-3 uppercase">
                quiz marks
              </span>
              <span className="mt-0.5 block text-[1.05rem] text-ink tabular-nums">
                {quizTotal ? `${quizScore}/${quizTotal}` : '—'}
              </span>
            </span>
            <span>
              <span className="block text-[0.7rem] tracking-[0.1em] text-ink-3 uppercase">
                challenges solved
              </span>
              <span className="mt-0.5 block text-[1.05rem] text-ink tabular-nums">{solved}</span>
            </span>
          </div>
        </div>

        <div className="mt-5 h-2.5 overflow-hidden rounded-full bg-surface-sunk">
          <div
            className="h-full rounded-full bg-accent transition-[width] duration-700"
            style={{ width: `${pct}%`, transitionTimingFunction: 'var(--ease-out-quint)' }}
          />
        </div>
      </div>

      <section className="mt-10">
        <h2 className="font-display text-[1.4rem] font-semibold text-ink">By module</h2>
        <ul className="mt-4 space-y-2">
          {modules.map((m) => {
            const done = m.lessons.filter((l) => state.done[l.id]).length
            const p = Math.round((done / m.lessons.length) * 100)
            return (
              <li key={m.id}>
                <Link
                  to={`/m/${m.slug}`}
                  className="group flex items-center gap-4 rounded-xl border border-rule bg-surface px-4 py-3 transition-colors hover:border-rule-strong"
                >
                  <span
                    className={cn(
                      'grid size-8 shrink-0 place-items-center rounded-lg font-mono text-[0.72rem] font-semibold tabular-nums',
                      done === m.lessons.length
                        ? 'bg-ok text-white'
                        : 'bg-surface-sunk text-ink-3',
                    )}
                  >
                    {done === m.lessons.length ? <Check className="size-4" strokeWidth={3} /> : m.competency}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-medium text-ink group-hover:text-accent">
                      {m.title}
                    </span>
                    <span className="mt-1.5 block h-1.5 w-full overflow-hidden rounded-full bg-surface-sunk">
                      <span
                        className="block h-full rounded-full bg-accent transition-[width] duration-700"
                        style={{ width: `${p}%` }}
                      />
                    </span>
                  </span>
                  <span className="shrink-0 font-mono text-[0.74rem] text-ink-3 tabular-nums">
                    {done}/{m.lessons.length}
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
      </section>

      {doneCount > 0 && (
        <section className="mt-10">
          <h2 className="font-display text-[1.4rem] font-semibold text-ink">Recently finished</h2>
          <ul className="mt-3 divide-y divide-rule rounded-xl border border-rule bg-surface">
            {allLessons
              .filter((r) => state.done[r.lesson.id])
              .sort((a, b) => state.done[b.lesson.id] - state.done[a.lesson.id])
              .slice(0, 6)
              .map((r) => (
                <li key={r.lesson.id}>
                  <Link
                    to={lessonPath(r)}
                    className="flex items-center gap-3 px-4 py-2.5 transition-colors hover:bg-surface-sunk/60"
                  >
                    <Check className="size-4 shrink-0 text-ok" strokeWidth={2.6} />
                    <span className="min-w-0 flex-1 truncate text-[0.92rem] text-ink">
                      {r.lesson.title}
                    </span>
                    <span className="shrink-0 font-mono text-[0.7rem] text-ink-3">
                      {new Date(state.done[r.lesson.id]).toLocaleDateString()}
                    </span>
                  </Link>
                </li>
              ))}
          </ul>
        </section>
      )}

      <section className="mt-10 rounded-2xl border border-rule bg-surface p-6">
        <h2 className="font-display text-[1.3rem] font-semibold text-ink">Move or clear it</h2>
        <p className="mt-2 max-w-[64ch] text-[0.95rem] leading-relaxed text-ink-2">
          Export writes a small JSON file. Import it on another device — the school computer, a
          friend's laptop — and your ticks come with you.
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          <Button variant="secondary" onClick={download}>
            <Download className="size-4" strokeWidth={2} />
            Export progress
          </Button>
          <Button variant="secondary" onClick={() => fileInput.current?.click()}>
            <Upload className="size-4" strokeWidth={2} />
            Import a file
          </Button>
          <input
            ref={fileInput}
            type="file"
            accept="application/json,.json"
            hidden
            onChange={async (e) => {
              const file = e.target.files?.[0]
              if (!file) return
              try {
                progress.importJSON(await file.text())
                setMessage('Imported. Your ticks are back.')
              } catch {
                setMessage('That file could not be read as progress data.')
              }
              e.target.value = ''
            }}
          />
          {!confirming ? (
            <Button variant="ghost" className="ml-auto text-bad" onClick={() => setConfirming(true)}>
              Clear everything
            </Button>
          ) : (
            <span className="ml-auto flex items-center gap-2">
              <span className="flex items-center gap-1.5 text-[0.85rem] text-bad">
                <TriangleAlert className="size-4" strokeWidth={2} />
                This cannot be undone.
              </span>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => {
                  progress.reset()
                  setConfirming(false)
                  setMessage('Progress cleared.')
                }}
              >
                Yes, clear it
              </Button>
              <Button size="sm" variant="ghost" onClick={() => setConfirming(false)}>
                Cancel
              </Button>
            </span>
          )}
        </div>

        {message && (
          <p className="anim-fade mt-3 rounded-lg bg-surface-sunk px-3.5 py-2 text-[0.88rem] text-ink-2">
            {message}
          </p>
        )}
      </section>
    </div>
  )
}

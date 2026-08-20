import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowRight, Check, Clock } from 'lucide-react'
import { findModule } from '../lib/course'
import { lessonPath, moduleMinutes } from '../lib/course'
import { useProgress } from '../lib/progress'
import { Crumb, ThemeToggle } from '../components/layout/Shell'
import { LinkButton } from '../components/ui'
import { cn } from '../lib/cn'

const KINDS: Record<string, string> = {
  lab: 'lab',
  widget: 'explorer',
  quiz: 'quiz',
  challenge: 'challenge',
}

export function ModulePage() {
  const { moduleSlug = '' } = useParams()
  const module = findModule(moduleSlug)
  const { done } = useProgress()

  if (!module) return <Navigate to="/" replace />

  const doneCount = module.lessons.filter((l) => done[l.id]).length
  const first = module.lessons.find((l) => !done[l.id]) ?? module.lessons[0]

  return (
    <div className="mx-auto max-w-[62rem] px-5 pt-6 pb-24 sm:px-8">
      <div className="flex items-center gap-3">
        <Crumb items={[{ label: 'Course home', to: '/' }, { label: `Competency ${module.competency}` }]} />
        <span className="ml-auto hidden lg:block">
          <ThemeToggle />
        </span>
      </div>

      <header className="mt-8">
        <h1 className="max-w-[20ch] font-display text-[2.2rem] leading-[1.08] font-semibold text-ink sm:text-[3rem]">
          {module.title}
        </h1>
        <p className="mt-4 max-w-[64ch] text-[1.08rem] leading-relaxed text-ink-2">
          {module.blurb}
        </p>

        <div className="mt-5 rounded-xl border border-rule bg-surface px-4 py-3.5">
          <p className="font-mono text-[0.68rem] tracking-[0.12em] text-ink-3 uppercase">
            By the end you can
          </p>
          <p className="mt-1 text-[0.98rem] leading-relaxed text-ink">{module.promise}</p>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-4">
          <LinkButton
            to={lessonPath({ module, lesson: first })}
            variant="primary"
            className="gap-2"
          >
            {doneCount > 0 && doneCount < module.lessons.length
              ? 'Continue this module'
              : doneCount === module.lessons.length
                ? 'Review this module'
                : 'Start this module'}
            <ArrowRight className="size-4" strokeWidth={2.2} />
          </LinkButton>
          <span className="flex items-center gap-2 font-mono text-[0.76rem] text-ink-3">
            <Clock className="size-3.5" strokeWidth={2} />
            {module.lessons.length} lessons · {moduleMinutes(module)} min · {doneCount} done
          </span>
        </div>
      </header>

      <ol className="mt-12">
        {module.lessons.map((lesson, i) => {
          const isDone = !!done[lesson.id]
          const kinds = [
            ...new Set(
              lesson.blocks
                .map((b) => KINDS[b.b])
                .filter(Boolean),
            ),
          ]
          return (
            <li key={lesson.id} className="border-t border-rule last:border-b">
              <Link
                to={lessonPath({ module, lesson })}
                className="group grid gap-x-4 gap-y-2 py-5 sm:grid-cols-[2.5rem_minmax(0,1fr)_auto]"
              >
                <span
                  className={cn(
                    'grid size-8 place-items-center rounded-lg font-mono text-[0.76rem] font-semibold tabular-nums transition-colors',
                    isDone
                      ? 'bg-ok text-white'
                      : 'bg-surface-sunk text-ink-3 group-hover:bg-brand group-hover:text-brand-on',
                  )}
                >
                  {isDone ? <Check className="size-4" strokeWidth={3} /> : i + 1}
                </span>

                <span className="min-w-0">
                  <span className="block font-display text-[1.14rem] leading-snug font-semibold text-ink transition-colors group-hover:text-accent">
                    {lesson.title}
                  </span>
                  <span className="mt-1 block max-w-[64ch] text-[0.93rem] leading-relaxed text-ink-2">
                    {lesson.summary}
                  </span>
                  <span className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[0.7rem] text-ink-3">
                    <span>{lesson.minutes} min</span>
                    {kinds.map((k) => (
                      <span key={k} className="rounded-full bg-surface-sunk px-2 py-0.5">
                        {k}
                      </span>
                    ))}
                  </span>
                </span>

                <ArrowRight
                  className="hidden size-4 self-center text-ink-3 transition-all group-hover:translate-x-1 group-hover:text-accent sm:block"
                  strokeWidth={1.9}
                />
              </Link>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

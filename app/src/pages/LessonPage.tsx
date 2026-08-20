import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Check, Clock, Target } from 'lucide-react'
import { findLesson, lessonPath, neighbours } from '../lib/course'
import { Blocks, slug } from '../components/blocks/Blocks'
import { Crumb, ThemeToggle } from '../components/layout/Shell'
import { Button, LinkButton } from '../components/ui'
import { progress, useProgress } from '../lib/progress'
import { warmPhp } from '../lib/php'
import { cn } from '../lib/cn'

export function LessonPage() {
  const { moduleSlug = '', lessonSlug = '' } = useParams()
  const ref = findLesson(moduleSlug, lessonSlug)
  const { done } = useProgress()
  const [ratio, setRatio] = useState(0)
  const article = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!ref) return
    progress.visit(ref.lesson.id)
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
    // A PHP lesson will need the engine; start fetching it while they read.
    if (ref.module.lang === 'php' || ref.module.competency === '10.7') warmPhp()
  }, [ref])

  useEffect(() => {
    const onScroll = () => {
      const el = article.current
      if (!el) return
      const top = el.offsetTop
      const height = el.scrollHeight - window.innerHeight + 120
      const seen = window.scrollY - top + 120
      setRatio(Math.max(0, Math.min(1, height > 0 ? seen / height : 1)))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [ref])

  const headings = useMemo(
    () =>
      ref?.lesson.blocks
        .filter((b): b is { b: 'h2'; text: string } => b.b === 'h2')
        .map((b) => ({ id: slug(b.text), text: b.text })) ?? [],
    [ref],
  )

  if (!ref) return <Navigate to="/" replace />

  const { module, lesson } = ref
  const showRail = headings.length > 1
  const { prev, next } = neighbours(ref)
  const isDone = !!done[lesson.id]

  return (
    <>
      <div className="sticky top-0 z-30 border-b border-rule bg-paper/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-[92rem] items-center gap-3 px-5 py-2.5 sm:px-8">
          <Crumb
            items={[
              { label: `Competency ${module.competency}`, to: `/m/${module.slug}` },
              { label: module.title, to: `/m/${module.slug}` },
              { label: `Lesson ${module.lessons.indexOf(lesson) + 1}` },
            ]}
          />
          <span className="ml-auto hidden lg:block">
            <ThemeToggle />
          </span>
        </div>
        <div
          className="h-[2px] origin-left bg-accent transition-transform duration-150"
          style={{ transform: `scaleX(${ratio})` }}
          aria-hidden
        />
      </div>

      <div className="mx-auto flex max-w-[84rem] gap-10 px-5 pt-10 pb-20 sm:px-8">
        <article
          ref={article}
          className={cn(
            'min-w-0 flex-1',
            !showRail && 'min-[1400px]:mx-auto min-[1400px]:max-w-[66rem]',
          )}
        >
          <header className="reading">
            <h1 className="font-display text-[2.1rem] leading-[1.12] font-semibold text-ink sm:text-[2.65rem]">
              {lesson.title}
            </h1>
            <p className="mt-3 text-[1.08rem] leading-relaxed text-ink-2">{lesson.summary}</p>

            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[0.72rem] text-ink-3">
              <span className="flex items-center gap-1.5">
                <Clock className="size-3.5" strokeWidth={2} />
                about {lesson.minutes} min
              </span>
              <span className="flex items-center gap-1.5">
                <Target className="size-3.5" strokeWidth={2} />
                {lesson.outcomes.length} learning outcome
                {lesson.outcomes.length === 1 ? '' : 's'}
              </span>
            </div>

            <details className="group mt-5 rounded-xl border border-rule bg-surface">
              <summary className="cursor-pointer list-none px-4 py-2.5 text-[0.86rem] font-medium text-ink-2 transition-colors select-none hover:text-ink">
                <span className="flex items-center gap-2">
                  <span className="grid size-4 place-items-center rounded-[4px] border border-rule-strong text-[0.6rem] transition-transform group-open:rotate-45">
                    +
                  </span>
                  What this lesson covers, straight from the syllabus
                </span>
              </summary>
              <ul className="space-y-1.5 border-t border-rule px-4 py-3">
                {lesson.outcomes.map((o, i) => (
                  <li key={i} className="flex gap-2.5 text-[0.88rem] leading-relaxed text-ink-2">
                    <span className="mt-[0.62em] size-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                    {o}
                  </li>
                ))}
              </ul>
            </details>
          </header>

          <div className="lesson-grid mt-9 gap-y-5 [&>figure]:my-0 [&>h2]:mt-4 [&>h3]:mt-2">
            <Blocks blocks={lesson.blocks} lessonId={lesson.id} />
          </div>

          <footer className="reading mt-12 border-t border-rule pt-7">
            <div className="flex flex-wrap items-center gap-3">
              <Button
                variant={isDone ? 'secondary' : 'primary'}
                onClick={() => (isDone ? progress.clearDone(lesson.id) : progress.markDone(lesson.id))}
              >
                <span
                  className={cn(
                    'grid size-4 place-items-center rounded-full border-2 transition-colors',
                    isDone ? 'border-ok bg-ok text-white' : 'border-current',
                  )}
                >
                  {isDone && <Check className="size-2.5" strokeWidth={4} />}
                </span>
                {isDone ? 'Completed' : 'Mark as complete'}
              </Button>
              {next && (
                <LinkButton
                  to={lessonPath(next)}
                  variant={isDone ? 'primary' : 'secondary'}
                  onClick={() => progress.markDone(lesson.id)}
                  className="ml-auto gap-2"
                >
                  Next lesson
                  <ArrowRight className="size-4" strokeWidth={2.2} />
                </LinkButton>
              )}
            </div>

            <nav className="mt-6 grid gap-3 sm:grid-cols-2">
              {prev ? (
                <Link
                  to={lessonPath(prev)}
                  className="group rounded-xl border border-rule bg-surface px-4 py-3 transition-colors hover:border-rule-strong"
                >
                  <span className="flex items-center gap-1.5 font-mono text-[0.68rem] tracking-[0.1em] text-ink-3 uppercase">
                    <ArrowLeft className="size-3" strokeWidth={2.4} />
                    Previous
                  </span>
                  <span className="mt-1 block font-medium text-ink group-hover:text-accent">
                    {prev.lesson.title}
                  </span>
                </Link>
              ) : (
                <span />
              )}
              {next && (
                <Link
                  to={lessonPath(next)}
                  className="group rounded-xl border border-rule bg-surface px-4 py-3 text-right transition-colors hover:border-rule-strong sm:col-start-2"
                >
                  <span className="flex items-center justify-end gap-1.5 font-mono text-[0.68rem] tracking-[0.1em] text-ink-3 uppercase">
                    Next
                    <ArrowRight className="size-3" strokeWidth={2.4} />
                  </span>
                  <span className="mt-1 block font-medium text-ink group-hover:text-accent">
                    {next.lesson.title}
                  </span>
                </Link>
              )}
            </nav>
          </footer>
        </article>

        {showRail && (
          <aside className="sticky top-24 hidden h-fit w-56 shrink-0 min-[1400px]:block">
            <p className="mb-2 font-mono text-[0.66rem] tracking-[0.12em] text-ink-3 uppercase">
              On this page
            </p>
            <ul className="space-y-0.5 border-l border-rule">
              {headings.map((h) => (
                <li key={h.id}>
                  <a
                    href={`#${h.id}`}
                    className="block border-l-2 border-transparent py-1 pl-3 text-[0.82rem] leading-snug text-ink-3 transition-colors hover:border-accent hover:text-ink"
                  >
                    {h.text}
                  </a>
                </li>
              ))}
            </ul>
          </aside>
        )}
      </div>
    </>
  )
}

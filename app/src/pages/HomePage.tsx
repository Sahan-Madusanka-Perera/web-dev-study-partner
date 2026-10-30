import { useMemo, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  BookOpenText,
  Check,
  ChartNoAxesColumn,
  Clock,
  Code,
  Database,
  Flame,
  ListChecks,
  Palette,
  Server,
  Sparkles,
  Timer,
  Trophy,
} from 'lucide-react'
import type { Module } from '../types/content'
import { modules } from '../data/course'
import { allLessons, lessonPath, moduleMinutes, totalLessons, type LessonRef } from '../lib/course'
import { useProgress, streakOf, type ProgressState } from '../lib/progress'
import { Ring } from '../components/ui'
import { HtmlLab } from '../components/labs/MarkupLab'
import { cn } from '../lib/cn'

const DEMO_HTML = `<h1>My first web page</h1>

<p>Written in <b>Colombo</b>, rendered
   right here — no software to install.</p>

<ul>
  <li>Change a word</li>
  <li>Add a &lt;li&gt; of your own</li>
  <li>Watch the page keep up</li>
</ul>`

const PROOFS = [
  {
    title: 'PHP 8 runs in this tab',
    body: 'A complete interpreter, compiled to WebAssembly. Change a loop, press Run, and read the output PHP actually produced.',
  },
  {
    title: 'A real database, seeded',
    body: 'SELECT, INSERT, ALTER, GROUP BY and JOIN all execute against a live engine already holding the resource book’s tables.',
  },
  {
    title: 'Forms that really submit',
    body: 'Press submit and watch the request leave — then see precisely what landed in $_GET or $_POST.',
  },
  {
    title: 'Checked, not just read',
    body: 'Challenges inspect the page you built and tell you which requirement is still missing.',
  },
]

const SUBJECTS = [
  { label: 'HTML', to: '/m/html', icon: Code, color: 'var(--lang-html)' },
  { label: 'CSS', to: '/m/css', icon: Palette, color: 'var(--lang-css)' },
  { label: 'PHP', to: '/m/php-mysql', icon: Server, color: 'var(--lang-php)' },
  { label: 'SQL', to: '/playground', icon: Database, color: 'var(--lang-sql)' },
]

const LANG_ICON: Record<string, typeof Code> = {
  html: Code,
  css: Palette,
  php: Server,
  sql: Database,
}

const CHIP_TONES = [
  'bg-accent-bright text-accent-on',
  'bg-violet text-white',
  'bg-[#ffd36b] text-[#3b2a00]',
]

/* ── Dates ────────────────────────────────────────────────────
   Completions are bucketed by the student's local calendar day. */
function dayKey(d: Date) {
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
}
function startOfDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate())
}
function addDays(d: Date, n: number) {
  const x = new Date(d)
  x.setDate(x.getDate() + n)
  return x
}
function mondayOf(d: Date) {
  const x = startOfDay(d)
  return addDays(x, -((x.getDay() + 6) % 7))
}
/** `progress.visit` records days as UTC ISO dates; noon local lands on the same one. */
function visitKey(d: Date) {
  const noon = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 12)
  return noon.toISOString().slice(0, 10)
}

interface Bucket {
  label: string
  title: string
  lessons: number
  minutes: number
  current: boolean
}

function buildActivity(state: ProgressState, mode: 'week' | 'month'): Bucket[] {
  const byDay = new Map<string, { lessons: number; minutes: number }>()
  for (const r of allLessons) {
    const at = state.done[r.lesson.id]
    if (!at) continue
    const k = dayKey(new Date(at))
    const cur = byDay.get(k) ?? { lessons: 0, minutes: 0 }
    cur.lessons++
    cur.minutes += r.lesson.minutes
    byDay.set(k, cur)
  }
  const today = startOfDay(new Date())

  if (mode === 'week') {
    return Array.from({ length: 7 }, (_, i) => {
      const d = addDays(today, i - 6)
      const v = byDay.get(dayKey(d)) ?? { lessons: 0, minutes: 0 }
      return {
        label: d.toLocaleDateString(undefined, { weekday: 'short' }),
        title: d.toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'short' }),
        current: i === 6,
        ...v,
      }
    })
  }

  const thisWeek = mondayOf(today)
  return Array.from({ length: 5 }, (_, i) => {
    const start = addDays(thisWeek, (i - 4) * 7)
    let lessons = 0
    let minutes = 0
    for (let j = 0; j < 7; j++) {
      const v = byDay.get(dayKey(addDays(start, j)))
      if (v) {
        lessons += v.lessons
        minutes += v.minutes
      }
    }
    const short = start.toLocaleDateString(undefined, { day: 'numeric', month: 'short' })
    return { label: short, title: `Week of ${short}`, current: i === 4, lessons, minutes }
  })
}

function formatTime(minutes: number) {
  if (minutes < 60) return { n: String(minutes), unit: 'min' }
  const h = minutes / 60
  return { n: h >= 10 ? String(Math.round(h)) : h.toFixed(1).replace(/\.0$/, ''), unit: h === 1 ? 'hour' : 'hours' }
}

export function HomePage() {
  const state = useProgress()
  const doneRefs = allLessons.filter((r) => state.done[r.lesson.id])
  const doneCount = doneRefs.length
  const doneMinutes = doneRefs.reduce((n, r) => n + r.lesson.minutes, 0)
  const pct = totalLessons ? doneCount / totalLessons : 0
  const streak = streakOf(state.days)
  const resume =
    allLessons.find((r) => r.lesson.id === state.lastLesson && !state.done[r.lesson.id]) ??
    allLessons.find((r) => !state.done[r.lesson.id]) ??
    allLessons[0]
  const started = doneCount > 0 || !!state.lastLesson

  const labCount = allLessons.reduce(
    (n, r) => n + r.lesson.blocks.filter((b) => b.b === 'lab' || b.b === 'widget').length,
    0,
  )
  const quizzes = Object.values(state.quiz)
  const quizScore = quizzes.reduce((s, q) => s + q.score, 0)
  const quizTotal = quizzes.reduce((s, q) => s + q.total, 0)

  const upNext = allLessons.slice(resume.n - 1).filter((r) => !state.done[r.lesson.id]).slice(0, 3)
  const time = formatTime(doneMinutes)

  return (
    <div className="mx-auto max-w-[84rem] px-4 pt-5 pb-16 sm:px-6 lg:pt-6">
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] xl:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)_minmax(0,0.88fr)]">
        {/* ── Left column ───────────────────────────────────── */}
        <div className="flex min-w-0 flex-col gap-5">
          <Hero to={lessonPath(resume)} started={started} pct={pct} />

          <div className="grid grid-cols-2 gap-4">
            <StatTile
              icon={ListChecks}
              label="Lessons"
              value={String(doneCount)}
              sub={`of ${totalLessons} finished`}
              tone="orange"
            />
            <StatTile
              icon={Timer}
              label={time.unit === 'min' ? 'Minutes' : 'Hours'}
              value={time.n}
              sub="of study completed"
              tone="violet"
            />
          </div>

          <ul className="grid grid-cols-2 gap-2.5 sm:grid-cols-4" aria-label="Subjects">
            {SUBJECTS.map(({ label, to, icon: Icon, color }) => (
              <li key={label}>
                <Link
                  to={to}
                  className="flex items-center gap-2.5 rounded-full bg-surface py-1.5 pr-4 pl-1.5 font-display text-[1rem] font-medium text-ink shadow-sm ring-1 ring-rule transition-all hover:-translate-y-0.5 hover:shadow-md"
                >
                  <span
                    className="grid size-8 place-items-center rounded-full"
                    style={{ background: `color-mix(in oklab, ${color} 16%, transparent)`, color }}
                  >
                    <Icon className="size-4" strokeWidth={2.2} />
                  </span>
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          <FeatureCard
            dark
            to="/playground"
            eyebrow="The playground"
            title="Run real PHP & SQL right in this tab"
            footer={
              <span className="flex items-center gap-3">
                <span className="flex -space-x-2.5">
                  {(['html', 'css', 'php', 'sql'] as const).map((l) => {
                    const Icon = LANG_ICON[l]
                    return (
                      <span
                        key={l}
                        className="grid size-9 place-items-center rounded-full border-2 border-chrome text-white"
                        style={{ background: `var(--lang-${l})` }}
                      >
                        <Icon className="size-4" strokeWidth={2.2} />
                      </span>
                    )
                  })}
                </span>
                <span className="font-display text-[0.95rem] font-medium text-chrome-ink">
                  +{labCount} labs
                </span>
              </span>
            }
          />

          <FeatureCard
            to="/practice"
            eyebrow="Exam practice"
            title="Paper-style questions, marked as you go"
            footer={
              <span className="font-mono text-[0.72rem] text-violet-ink">
                MCQ · structured · model answers
              </span>
            }
          />
        </div>

        {/* ── Centre column ─────────────────────────────────── */}
        <section className="flex min-w-0 flex-col gap-4 rounded-[2rem] bg-surface-sunk/70 p-4 sm:p-5">
          <ActivityCard state={state} />

          <div className="flex items-center gap-4 rounded-full bg-surface py-2.5 pr-5 pl-2.5 shadow-sm">
            <span className="grid size-12 shrink-0 place-items-center rounded-full bg-[#ffd36b] text-[#7a4a00] ring-4 ring-[#ffd36b]/35">
              <Flame className="size-5 fill-current" strokeWidth={2} />
            </span>
            <span className="min-w-0 flex-1 leading-tight">
              <span className="block font-display text-[1.05rem] font-semibold text-ink">
                {streak > 0 ? `${streak}-day streak` : 'Start a streak today'}
              </span>
              <span className="mt-0.5 block truncate text-[0.82rem] text-ink-3">
                Open a lesson each day to keep it alive
              </span>
            </span>
            <Link
              to="/progress"
              className="shrink-0 rounded-full bg-surface-sunk px-3 py-1.5 font-mono text-[0.72rem] text-ink-2 tabular-nums transition-colors hover:text-ink"
            >
              quiz {quizTotal ? `${quizScore}/${quizTotal}` : '—'}
            </Link>
          </div>

          <div>
            <h2 className="px-1 pt-1 pb-2 font-display text-[1.15rem] font-semibold text-ink">
              {doneCount === totalLessons ? 'Course complete' : 'Up next'}
            </h2>
            <ul className="space-y-2.5">
              {upNext.map((r, i) => (
                <UpNext key={r.lesson.id} r={r} tone={CHIP_TONES[i % CHIP_TONES.length]} />
              ))}
              {upNext.length === 0 && (
                <li className="rounded-full bg-surface px-5 py-4 text-[0.92rem] text-ink-2 shadow-sm">
                  Every lesson is ticked. Try a full paper in exam practice.
                </li>
              )}
            </ul>
          </div>
        </section>

        {/* ── Right column ──────────────────────────────────── */}
        <div className="grid min-w-0 content-start gap-5 lg:col-span-2 lg:grid-cols-2 xl:col-span-1 xl:grid-cols-1">
          <TodayCard state={state} resume={resume} />
          <ModulePerformance state={state} />
          <RoutineBanner streak={streak} />
          <Recommended resume={resume} />
        </div>
      </div>

      {/* ── Try it ────────────────────────────────────────────── */}
      <section className="mt-12 rounded-[2rem] bg-surface p-5 shadow-sm ring-1 ring-rule sm:p-8">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="font-mono text-[0.7rem] tracking-[0.14em] text-accent uppercase">
              No XAMPP · no account
            </p>
            <h2 className="mt-1 max-w-[24ch] font-display text-[1.7rem] leading-tight font-semibold text-ink sm:text-[2.1rem]">
              Edit this — the page beside it is a real browser
            </h2>
          </div>
        </div>
        <div className="mt-5">
          <HtmlLab title="Go on — edit this" html={DEMO_HTML} height={210} />
        </div>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {PROOFS.map((p, i) => (
            <li key={p.title} className="rounded-3xl bg-surface-sunk/70 p-4">
              <span className={cn('grid size-8 place-items-center rounded-full', CHIP_TONES[i % 3])}>
                <Sparkles className="size-4" strokeWidth={2} />
              </span>
              <p className="mt-3 font-display text-[1.05rem] font-semibold text-ink">{p.title}</p>
              <p className="mt-1 text-[0.88rem] leading-relaxed text-ink-2">{p.body}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* ── The syllabus ──────────────────────────────────────── */}
      <section className="mt-12">
        <div className="flex flex-wrap items-baseline justify-between gap-3 px-1">
          <h2 className="font-display text-[1.7rem] font-semibold text-ink sm:text-[2.1rem]">
            The eight competency levels
          </h2>
          <p className="font-mono text-[0.74rem] text-ink-3">10.1 — 10.8 · in syllabus order</p>
        </div>
        <ol className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {modules.map((m) => (
            <li key={m.id}>
              <ModuleCard m={m} state={state} />
            </li>
          ))}
        </ol>
      </section>
    </div>
  )
}

/* ── Pieces ───────────────────────────────────────────────────── */

function Hero({ to, started, pct }: { to: string; started: boolean; pct: number }) {
  return (
    <section className="anim-rise relative isolate overflow-hidden rounded-[2rem] bg-violet p-6 text-white shadow-[inset_0_-10px_0_rgb(0_0_0/0.08)] sm:p-7">
      <HeroArt className="pointer-events-none absolute -right-8 -bottom-6 -z-10 w-[46%] max-w-[13rem] sm:-right-2" />
      <h1 className="max-w-[12ch] font-display text-[2.1rem] leading-[1.02] font-semibold tracking-[-0.02em] sm:text-[2.55rem]">
        Learn web dev by running it
      </h1>
      <p className="mt-3 max-w-[min(30ch,58%)] text-[0.95rem] leading-snug text-white/85">
        HTML, CSS, <span className="font-semibold text-[#ffc59e]">PHP and MySQL</span> for A/L ICT —
        every example genuinely executed.
      </p>
      <Link
        to={to}
        className="group mt-6 inline-flex items-center gap-3"
        aria-label={started ? 'Continue where you left off' : 'Start the course'}
      >
        <Ring value={pct} size={68} stroke={3} track="rgb(255 255 255 / 0.25)" fill="#ffffff">
          <span className="grid size-[54px] place-items-center rounded-full bg-chrome text-white transition-transform group-hover:scale-105">
            <ArrowRight className="size-5" strokeWidth={2.2} />
          </span>
        </Ring>
        <span className="font-display text-[1rem] font-medium">
          {started ? 'Continue' : 'Start the course'}
        </span>
      </Link>
    </section>
  )
}

/** A browser window holding a tag, on a little plinth, with sparkles —
 *  the course's answer to a trophy. */
function HeroArt({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 220 220" className={className} aria-hidden>
      <g fill="#ffd36b">
        <path d="M184 30l3 8 8 3-8 3-3 8-3-8-8-3 8-3z" />
        <path d="M40 46l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" />
        <path d="M196 132l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" />
      </g>
      <g transform="rotate(-10 110 100)">
        <rect x="42" y="44" width="136" height="104" rx="18" fill="#ffffff" />
        <rect x="42" y="44" width="136" height="28" rx="18" fill="#ffd36b" />
        <rect x="42" y="60" width="136" height="12" fill="#ffd36b" />
        <circle cx="60" cy="58" r="4" fill="#ff8a4c" />
        <circle cx="74" cy="58" r="4" fill="#7d80e8" />
        <circle cx="88" cy="58" r="4" fill="#ffffff" />
        <path d="M92 92l-16 16 16 16M128 92l16 16-16 16" fill="none" stroke="#7d80e8" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M116 88l-12 40" stroke="#ff8a4c" strokeWidth="8" strokeLinecap="round" />
      </g>
      <path d="M96 160h40l8 26H88z" fill="#ff9b5e" />
      <rect x="76" y="184" width="80" height="16" rx="8" fill="#ff8a4c" />
    </svg>
  )
}

function StatTile({
  icon: Icon,
  label,
  value,
  sub,
  tone,
}: {
  icon: typeof Code
  label: string
  value: string
  sub: string
  tone: 'orange' | 'violet'
}) {
  return (
    <Link
      to="/progress"
      className={cn(
        'relative overflow-hidden rounded-[1.75rem] border-2 bg-surface px-4 pt-4 pb-4 transition-transform hover:-translate-y-0.5',
        tone === 'orange' ? 'border-accent-bright' : 'border-violet',
      )}
    >
      <span
        className={cn(
          'absolute -top-3 -left-3 grid size-14 place-items-center rounded-full pt-2 pl-2',
          tone === 'orange' ? 'bg-accent-bright text-accent-on' : 'bg-violet text-white',
        )}
      >
        <Icon className="size-4" strokeWidth={2.2} />
      </span>
      <span className="block pl-10 font-display text-[0.92rem] text-ink-2">{label}</span>
      <span className="mt-2 block text-center font-display text-[2.6rem] leading-none font-semibold text-ink tabular-nums">
        {value}
      </span>
      <span className="mt-1.5 block text-center text-[0.76rem] text-ink-3">{sub}</span>
    </Link>
  )
}

function FeatureCard({
  to,
  eyebrow,
  title,
  footer,
  dark,
}: {
  to: string
  eyebrow: string
  title: string
  footer: ReactNode
  dark?: boolean
}) {
  return (
    <Link
      to={to}
      className={cn(
        'group relative isolate block overflow-hidden rounded-[2rem] p-5 transition-transform hover:-translate-y-0.5 sm:p-6',
        dark ? 'bg-chrome text-chrome-ink' : 'bg-violet-soft/70 text-ink dark:bg-violet-tint',
      )}
    >
      <svg
        viewBox="0 0 200 120"
        className={cn('pointer-events-none absolute -right-6 -bottom-6 -z-10 w-64', dark ? 'text-chrome-2' : 'text-white/45 dark:text-white/5')}
        aria-hidden
      >
        <path d="M10 110C40 20 90 10 110 50s-30 60-10 40 60-80 90-60" fill="none" stroke="currentColor" strokeWidth="18" strokeLinecap="round" />
      </svg>
      <div className="flex items-start justify-between gap-3">
        <span
          className={cn(
            'grid size-12 place-items-center rounded-full',
            dark ? 'bg-chrome-2 text-accent-bright' : 'bg-violet-tint text-violet-ink dark:bg-violet-soft dark:text-white',
          )}
        >
          {dark ? <ChartNoAxesColumn className="size-5" strokeWidth={2.2} /> : <BookOpen className="size-5" strokeWidth={2.2} />}
        </span>
        <span
          className={cn(
            'grid size-10 place-items-center rounded-full transition-transform group-hover:rotate-45',
            dark ? 'bg-chrome-2 text-chrome-ink' : 'bg-chrome text-white',
          )}
        >
          <ArrowUpRight className="size-4.5" strokeWidth={2.2} />
        </span>
      </div>
      <p
        className={cn(
          'mt-5 font-mono text-[0.68rem] tracking-[0.12em] uppercase',
          dark ? 'text-accent-bright' : 'text-violet-ink',
        )}
      >
        {eyebrow}
      </p>
      <p className="mt-1 max-w-[20ch] font-display text-[1.35rem] leading-tight font-semibold">{title}</p>
      <div className="mt-5">{footer}</div>
    </Link>
  )
}

function ActivityCard({ state }: { state: ProgressState }) {
  const [mode, setMode] = useState<'week' | 'month'>('week')
  const buckets = useMemo(() => buildActivity(state, mode), [state, mode])
  const lessons = buckets.reduce((n, b) => n + b.lessons, 0)
  const time = formatTime(buckets.reduce((n, b) => n + b.minutes, 0))
  const max = Math.max(1, ...buckets.map((b) => b.lessons))

  return (
    <div className="relative isolate overflow-hidden rounded-[1.75rem] bg-accent-bright p-5 text-accent-on sm:p-6">
      <svg viewBox="0 0 300 300" className="pointer-events-none absolute -top-10 -right-16 -z-10 w-80 text-white/20" aria-hidden>
        <path d="M30 280C40 140 140 60 210 90s-10 120-40 80 40-140 120-120" fill="none" stroke="currentColor" strokeWidth="26" strokeLinecap="round" />
      </svg>

      <div className="flex items-center justify-between gap-3">
        <span className="grid size-12 place-items-center rounded-full bg-chrome text-white">
          <ChartNoAxesColumn className="size-5" strokeWidth={2.4} />
        </span>
        <div className="flex rounded-full bg-black/10 p-1" role="group" aria-label="Period">
          {(['week', 'month'] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              aria-pressed={mode === m}
              className={cn(
                'rounded-full px-3.5 py-1.5 font-display text-[0.88rem] font-medium transition-colors',
                mode === m ? 'bg-chrome text-white' : 'text-accent-on/80 hover:text-accent-on',
              )}
            >
              {m === 'week' ? 'Weekly' : 'Monthly'}
            </button>
          ))}
        </div>
      </div>

      <h2 className="sr-only">Your activity</h2>
      <p className="mt-5 flex flex-wrap items-baseline gap-x-5 gap-y-1 font-display">
        <span>
          <span className="text-[2.6rem] leading-none font-semibold tabular-nums">{lessons}</span>{' '}
          <span className="text-[1.35rem]">{lessons === 1 ? 'lesson' : 'lessons'}</span>
        </span>
        <span className="hidden h-9 w-px self-center bg-accent-on/20 sm:block" aria-hidden />
        <span>
          <span className="text-[2.6rem] leading-none font-semibold tabular-nums">{time.n}</span>{' '}
          <span className="text-[1.35rem]">{time.unit}</span>
        </span>
      </p>

      <ol className="mt-5 grid h-48 gap-1" style={{ gridTemplateColumns: `repeat(${buckets.length}, minmax(0, 1fr))` }}>
        {buckets.map((b, i) => {
          const h = b.lessons ? 26 + (b.lessons / max) * 74 : 22
          return (
            <li
              key={i}
              className="relative flex flex-col items-center justify-end border-x border-dashed border-accent-on/10 first:border-l-0 last:border-r-0"
              title={`${b.title}: ${b.lessons} ${b.lessons === 1 ? 'lesson' : 'lessons'}, ${b.minutes} min`}
            >
              <span className="sr-only">
                {b.title}: {b.lessons} lessons, {b.minutes} minutes
              </span>
              <span
                className={cn(
                  'relative flex w-[min(3.1rem,82%)] flex-col items-center rounded-full transition-[height] duration-700',
                  b.lessons ? 'bg-[color-mix(in_oklab,var(--accent-on)_22%,transparent)]' : 'bg-white/25',
                  b.current && b.lessons > 0 && 'hatch text-accent-on',
                )}
                style={{ height: `${h}%`, transitionTimingFunction: 'var(--ease-out-quint)' }}
                aria-hidden
              >
                {b.lessons > 0 && (
                  <span className="mt-1 grid aspect-square w-[calc(100%-0.5rem)] max-w-10 place-items-center rounded-full bg-chrome font-mono text-[0.72rem] font-semibold text-white tabular-nums">
                    {b.lessons}
                  </span>
                )}
              </span>
              <span
                className={cn(
                  'mt-2 truncate text-[0.74rem]',
                  b.current ? 'font-semibold text-accent-on' : 'text-accent-on/75',
                )}
                aria-hidden
              >
                {b.label}
              </span>
            </li>
          )
        })}
      </ol>
      {lessons === 0 && (
        <p className="mt-3 text-center text-[0.82rem] text-accent-on/80">
          Finish a lesson and it lands on this chart.
        </p>
      )}
    </div>
  )
}

function UpNext({ r, tone }: { r: LessonRef; tone: string }) {
  const Icon = LANG_ICON[r.module.lang] ?? BookOpen
  return (
    <li>
      <Link
        to={lessonPath(r)}
        className="group flex items-center gap-4 rounded-full bg-surface py-2 pr-5 pl-2 shadow-sm transition-all hover:shadow-md"
      >
        <span className={cn('grid size-14 shrink-0 place-items-center rounded-full', tone)}>
          <Icon className="size-5.5" strokeWidth={2.1} />
        </span>
        <span className="min-w-0 flex-1 leading-tight">
          <span className="block truncate font-display text-[1.02rem] font-semibold text-ink group-hover:text-violet-ink">
            {r.lesson.title}
          </span>
          <span className="mt-1 block truncate text-[0.8rem] text-ink-3">
            {r.module.competency} · {r.module.title}
          </span>
        </span>
        <span className="flex shrink-0 items-center gap-1.5 font-display text-[0.95rem] font-medium text-ink-2 tabular-nums">
          <Clock className="size-4 text-violet" strokeWidth={2.2} />
          {r.lesson.minutes} min
        </span>
      </Link>
    </li>
  )
}

function TodayCard({ state, resume }: { state: ProgressState; resume: LessonRef }) {
  const today = startOfDay(new Date())
  const monday = mondayOf(today)
  const visited = new Set(state.days)
  const days = Array.from({ length: 7 }, (_, i) => addDays(monday, i))

  return (
    <section className="min-w-0">
      <h2 className="flex items-start gap-2 font-display text-[1.75rem] leading-[1.08] font-semibold text-ink">
        Today’s study is ready
        <BookOpenText className="mt-1 size-6 shrink-0 text-violet" strokeWidth={2.1} />
      </h2>
      <Link
        to={lessonPath(resume)}
        className="mt-2 inline-flex items-center gap-1.5 font-display text-[0.98rem] font-medium text-accent hover:underline"
      >
        <span className="grid size-5 place-items-center rounded-md bg-accent-tint">
          <ArrowRight className="size-3" strokeWidth={2.6} />
        </span>
        {resume.lesson.title}
      </Link>

      <ol className="mt-4 grid grid-cols-7 gap-1.5">
        {days.map((d) => {
          const isToday = d.getTime() === today.getTime()
          const future = d > today
          const went = visited.has(visitKey(d))
          return (
            <li
              key={d.toISOString()}
              className={cn(
                'flex flex-col items-center rounded-2xl py-2 text-center',
                isToday ? 'bg-violet text-white' : 'bg-surface-sunk/70 text-ink',
              )}
            >
              <span className={cn('text-[0.7rem]', isToday ? 'text-white/80' : 'text-ink-3')}>
                {d.toLocaleDateString(undefined, { weekday: 'short' })}
              </span>
              <span className="font-display text-[1.15rem] leading-tight font-semibold tabular-nums">
                {d.getDate()}
              </span>
              <span
                className={cn(
                  'mt-1 grid size-4 place-items-center rounded-full',
                  went
                    ? 'bg-ok text-white'
                    : future
                      ? 'border border-dashed border-current opacity-40'
                      : 'bg-current/15',
                )}
                title={went ? 'Studied' : future ? 'Still to come' : 'No study'}
              >
                {went && <Check className="size-2.5" strokeWidth={4} />}
                <span className="sr-only">{went ? 'studied' : future ? 'upcoming' : 'missed'}</span>
              </span>
            </li>
          )
        })}
      </ol>
    </section>
  )
}

function ModulePerformance({ state }: { state: ProgressState }) {
  const rows = modules.map((m) => {
    const done = m.lessons.filter((l) => state.done[l.id]).length
    return { m, done, pct: done / m.lessons.length }
  })
  const complete = rows.filter((r) => r.pct === 1).length

  return (
    <section className="rounded-[1.75rem] bg-surface-sunk/70 p-5">
      <div className="flex items-baseline justify-between gap-2">
        <h2 className="font-display text-[1.15rem] font-semibold text-ink">Module performance</h2>
        <span className="font-mono text-[0.7rem] text-ink-3 tabular-nums">{complete}/8 done</span>
      </div>
      <ol className="mt-4 grid h-32 grid-cols-8 gap-1.5">
        {rows.map(({ m, done, pct }) => (
          <li key={m.id} className="flex flex-col items-center">
            <Link
              to={`/m/${m.slug}`}
              className="hatch relative flex w-full flex-1 items-end overflow-hidden rounded-full bg-surface text-rule-strong"
              title={`${m.competency} ${m.title}: ${done}/${m.lessons.length} lessons`}
            >
              <span className="sr-only">
                {m.competency} {m.title}: {done} of {m.lessons.length} lessons
              </span>
              <span
                className={cn(
                  'block w-full rounded-full transition-[height] duration-700',
                  pct === 1 ? 'bg-violet' : 'bg-accent-bright',
                )}
                style={{ height: pct ? `max(${pct * 100}%, 0.9rem)` : 0 }}
              />
            </Link>
            <span className="mt-1.5 font-mono text-[0.62rem] text-ink-3 tabular-nums">
              {m.competency}
            </span>
          </li>
        ))}
      </ol>
      <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[0.74rem] text-ink-3">
        <span className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-accent-bright" /> in progress
        </span>
        <span className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-violet" /> complete
        </span>
      </p>
    </section>
  )
}

function RoutineBanner({ streak }: { streak: number }) {
  return (
    <Link
      to="/progress"
      className="relative isolate flex items-center gap-4 overflow-hidden rounded-full bg-violet py-3 pr-6 pl-3 text-white transition-transform hover:-translate-y-0.5"
    >
      <svg viewBox="0 0 80 64" className="w-20 shrink-0 -rotate-6" aria-hidden>
        <rect x="6" y="10" width="62" height="46" rx="6" fill="#ffffff" />
        <rect x="10" y="6" width="62" height="46" rx="6" fill="#f7a8e0" />
        <rect x="24" y="18" width="34" height="8" rx="4" fill="#ffd36b" />
        <rect x="24" y="30" width="24" height="8" rx="4" fill="#ffd36b" />
        <path d="M60 4v20l-5-4-5 4V4z" fill="#ff8a4c" />
      </svg>
      <span className="min-w-0 leading-tight">
        <span className="block font-display text-[1.02rem] font-semibold">
          A little every day beats a lot at once
        </span>
        <span className="mt-1 flex items-center gap-1 text-[0.8rem] text-white/80">
          <Trophy className="size-3.5 text-[#ffd36b]" strokeWidth={2.2} />
          {streak > 0 ? `Studying ${streak} ${streak === 1 ? 'day' : 'days'} in a row` : 'Your streak starts with one lesson'}
        </span>
      </span>
    </Link>
  )
}

function Recommended({ resume }: { resume: LessonRef }) {
  const covers = [
    {
      to: `/m/${resume.module.slug}`,
      kicker: `Competency ${resume.module.competency}`,
      title: resume.module.title,
      bg: 'bg-[#f7e2c4] text-[#4a2c0a]',
      art: 'orange',
    },
    {
      to: '/reference',
      kicker: 'Look it up',
      title: 'Every tag & property',
      bg: 'bg-[#1f4f9a] text-white',
      art: 'blue',
    },
    {
      to: '/practice',
      kicker: 'Test yourself',
      title: 'A full exam paper',
      bg: 'bg-[#ffd36b] text-[#3b2a00]',
      art: 'violet',
    },
  ] as const

  return (
    <section className="min-w-0 rounded-[1.75rem] bg-surface-sunk/70 p-5 lg:col-span-2 xl:col-span-1">
      <h2 className="font-display text-[1.15rem] font-semibold text-ink">Recommended for you</h2>
      <ul className="no-scrollbar -mx-5 mt-4 flex snap-x gap-3 overflow-x-auto px-5 pb-1">
        {covers.map((c) => (
          <li key={c.to} className="w-[9.5rem] shrink-0 snap-start">
            <Link
              to={c.to}
              className={cn(
                'relative isolate flex aspect-[3/4] flex-col overflow-hidden rounded-2xl p-3.5 transition-transform hover:-translate-y-1',
                c.bg,
              )}
            >
              <CoverArt tone={c.art} />
              <span className="font-mono text-[0.58rem] tracking-[0.12em] uppercase opacity-75">{c.kicker}</span>
              <span className="mt-1 font-display text-[1.05rem] leading-[1.08] font-bold uppercase">{c.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

function CoverArt({ tone }: { tone: 'orange' | 'blue' | 'violet' }) {
  const a = tone === 'orange' ? '#ff8a4c' : tone === 'blue' ? '#ffd36b' : '#7d80e8'
  const b = tone === 'orange' ? '#7d80e8' : tone === 'blue' ? '#ff8a4c' : '#ffffff'
  return (
    <svg viewBox="0 0 120 120" className="pointer-events-none absolute -right-4 -bottom-4 -z-10 w-[85%]" aria-hidden>
      <circle cx="74" cy="78" r="38" fill={a} />
      <path d="M44 62l-14 14 14 14M92 62l14 14-14 14" fill="none" stroke={b} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M22 30l2 6 6 2-6 2-2 6-2-6-6-2 6-2z" fill={b} />
    </svg>
  )
}

function ModuleCard({ m, state }: { m: Module; state: ProgressState }) {
  const done = m.lessons.filter((l) => state.done[l.id]).length
  const pct = Math.round((done / m.lessons.length) * 100)
  const complete = done === m.lessons.length
  return (
    <Link
      to={`/m/${m.slug}`}
      className="group flex h-full flex-col rounded-[1.75rem] bg-surface p-5 shadow-sm ring-1 ring-rule transition-all hover:-translate-y-0.5 hover:shadow-md"
    >
      <span className="flex items-center justify-between">
        <span
          className={cn(
            'grid size-11 place-items-center rounded-full font-mono text-[0.8rem] font-semibold tabular-nums transition-colors',
            complete
              ? 'bg-ok text-white'
              : done > 0
                ? 'bg-accent-bright text-accent-on'
                : 'bg-violet-tint text-violet-ink group-hover:bg-violet group-hover:text-white',
          )}
        >
          {complete ? <Check className="size-5" strokeWidth={3} /> : m.competency}
        </span>
        <ArrowUpRight
          className="size-5 text-ink-3 transition-all group-hover:rotate-45 group-hover:text-ink"
          strokeWidth={2}
        />
      </span>
      <span className="mt-4 block font-display text-[1.2rem] leading-snug font-semibold text-ink">
        {m.title}
      </span>
      <span className="mt-1.5 line-clamp-3 flex-1 text-[0.88rem] leading-relaxed text-ink-2">
        {m.promise}
      </span>
      <span className="mt-4 flex items-center gap-3">
        <span className="h-2 flex-1 overflow-hidden rounded-full bg-surface-sunk">
          <span
            className="block h-full rounded-full bg-accent-bright transition-[width] duration-700"
            style={{ width: `${pct}%` }}
          />
        </span>
        <span className="font-mono text-[0.7rem] text-ink-3 tabular-nums">
          {done}/{m.lessons.length} · {moduleMinutes(m)}m
        </span>
      </span>
    </Link>
  )
}

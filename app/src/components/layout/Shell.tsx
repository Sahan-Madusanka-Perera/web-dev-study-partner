import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import {
  BookOpen,
  ChartNoAxesColumn,
  Check,
  ChevronRight,
  FlaskConical,
  LayoutGrid,
  Menu,
  Moon,
  PenLine,
  Sun,
  X,
  Zap,
} from 'lucide-react'
import { modules } from '../../data/course'
import { allLessons, lessonPath, totalLessons } from '../../lib/course'
import { useProgress } from '../../lib/progress'
import { theme, useTheme } from '../../lib/theme'
import { cn } from '../../lib/cn'
import { Ring } from '../ui'
import { Wordmark } from './Wordmark'
import { MadeBy } from './MadeBy'

const TOOLS = [
  { to: '/', label: 'Dashboard', icon: LayoutGrid, end: true },
  { to: '/playground', label: 'Playground', icon: FlaskConical, end: false },
  { to: '/reference', label: 'Reference', icon: BookOpen, end: false },
  { to: '/practice', label: 'Exam practice', icon: PenLine, end: false },
  { to: '/progress', label: 'Progress', icon: ChartNoAxesColumn, end: false },
]

export function Shell() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  /* The lesson tree only earns its column inside the course itself;
     everywhere else the top bar is navigation enough. */
  const inCourse = location.pathname.startsWith('/m/')

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : ''
    return () => {
      document.documentElement.style.overflow = ''
    }
  }, [open])

  return (
    <div className="min-h-dvh bg-chrome">
      <a
        href="#lesson-main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-violet focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>

      <TopBar onMenu={() => setOpen(true)} />

      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/45 backdrop-blur-[2px] lg:hidden"
          onClick={() => setOpen(false)}
          aria-hidden
        />
      )}

      <div className="flex min-h-[calc(100dvh-var(--header-h))] overflow-clip rounded-t-[1.75rem] bg-paper sm:mx-2 sm:rounded-t-[2.25rem] lg:mx-3">
        <aside
          className={cn(
            'fixed inset-y-0 left-0 z-50 flex w-[min(20rem,86vw)] flex-col bg-paper transition-transform duration-300',
            'lg:sticky lg:top-[var(--header-h)] lg:z-20 lg:h-[calc(100dvh-var(--header-h))] lg:w-[var(--sidebar-w)] lg:shrink-0 lg:translate-x-0 lg:bg-transparent lg:p-3 lg:pr-0',
            open ? 'translate-x-0 shadow-lg' : '-translate-x-full',
            !inCourse && 'lg:hidden',
          )}
          style={{ transitionTimingFunction: 'var(--ease-out-quint)' }}
        >
          <div className="flex items-center gap-2 bg-chrome px-5 py-4 lg:hidden">
            <Link to="/" className="min-w-0 flex-1">
              <Wordmark />
            </Link>
            <button
              onClick={() => setOpen(false)}
              className="grid size-9 place-items-center rounded-full text-chrome-dim hover:text-chrome-ink"
              aria-label="Close menu"
            >
              <X className="size-[18px]" />
            </button>
          </div>

          <div className="flex min-h-0 flex-1 flex-col lg:rounded-[1.75rem] lg:bg-surface-sunk/70">
            <CourseNav />

            <div className="px-4 pt-2 pb-3">
              <ProgressBar />
              <MadeBy />
            </div>
          </div>
        </aside>

        <main id="lesson-main" className="relative z-10 min-w-0 flex-1">
          <Outlet />
          {!inCourse && (
            <footer className="mx-auto max-w-[84rem] px-5 pb-8 sm:px-8">
              <MadeBy />
            </footer>
          )}
        </main>
      </div>
    </div>
  )
}

function TopBar({ onMenu }: { onMenu: () => void }) {
  const { done } = useProgress()
  const count = allLessons.filter((r) => done[r.lesson.id]).length
  const pct = totalLessons ? Math.round((count / totalLessons) * 100) : 0

  return (
    <header className="sticky top-0 z-40 flex h-[var(--header-h)] items-center gap-3 bg-chrome px-4 text-chrome-ink sm:px-6 lg:px-7">
      <button
        onClick={onMenu}
        className="grid size-10 place-items-center rounded-full bg-chrome-2 text-chrome-dim transition-colors hover:text-chrome-ink lg:hidden"
        aria-label="Open course menu"
      >
        <Menu className="size-[18px]" />
      </button>

      <Link to="/" className="min-w-0 lg:w-[calc(var(--sidebar-w)-1.75rem)]">
        <Wordmark compact />
      </Link>

      <nav aria-label="Main" className="mx-auto hidden md:block">
        <ul className="flex items-center gap-1 rounded-full bg-chrome-2 p-1.5">
          {TOOLS.map(({ to, label, icon: Icon, end }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={end}
                title={label}
                className={({ isActive }) =>
                  cn(
                    'flex h-10 items-center gap-2 rounded-full font-display text-[0.95rem] font-medium transition-all duration-200',
                    isActive
                      ? 'bg-[#141519] px-4 text-chrome-ink'
                      : 'w-11 justify-center text-chrome-dim hover:bg-white/5 hover:text-chrome-ink xl:w-auto xl:px-3.5',
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      className={cn('size-[18px] shrink-0', isActive && 'text-violet-soft')}
                      strokeWidth={2.1}
                    />
                    <span className={cn(!isActive && 'sr-only xl:not-sr-only')}>{label}</span>
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="ml-auto flex items-center gap-3 md:ml-0">
        <Link to="/progress" className="hidden items-center gap-3 sm:flex" title="Your progress">
          <span className="text-right leading-tight">
            <span className="block font-display text-[1.05rem] font-semibold">
              {count === 0 ? 'Welcome' : 'Keep going'}
            </span>
            <span className="mt-0.5 flex items-center justify-end gap-1 text-[0.8rem] text-chrome-dim">
              <Zap className="size-3.5 fill-violet-soft text-violet-soft" strokeWidth={2} />
              Progress: <span className="tnum text-chrome-ink">{pct}%</span>
            </span>
          </span>
          <Ring value={pct / 100} size={46} stroke={3.5}>
            <span className="grid size-[34px] place-items-center rounded-full bg-violet font-display text-[0.8rem] font-semibold text-white tabular-nums">
              {count}
            </span>
          </Ring>
        </Link>
        <ThemeToggle />
      </div>
    </header>
  )
}

function CourseNav() {
  const location = useLocation()
  const { done } = useProgress()
  const activeModule = modules.find((m) =>
    location.pathname.startsWith(`/m/${m.slug}`),
  )

  return (
    <nav className="no-scrollbar flex-1 overflow-y-auto overscroll-contain px-3 py-4">
      <ul className="space-y-0.5 lg:hidden">
        {TOOLS.map(({ to, label, icon: Icon, end }) => (
          <li key={to}>
            <NavLink
              to={to}
              end={end}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-2.5 rounded-full px-3.5 py-2 font-display text-[0.95rem] transition-colors',
                  isActive
                    ? 'bg-brand font-medium text-brand-on'
                    : 'text-ink-2 hover:bg-violet-tint hover:text-ink',
                )
              }
            >
              <Icon className="size-4 shrink-0" strokeWidth={1.9} />
              {label}
            </NavLink>
          </li>
        ))}
      </ul>

      <p className="mt-6 mb-2 px-3 font-mono lg:mt-1 text-[0.68rem] tracking-[0.14em] text-ink-3 uppercase">
        Competency 10
      </p>

      <ul className="space-y-px">
        {modules.map((m) => {
          const isOpen = activeModule?.id === m.id
          const doneCount = m.lessons.filter((l) => done[l.id]).length
          const complete = doneCount === m.lessons.length
          return (
            <li key={m.id}>
              <NavLink
                to={`/m/${m.slug}`}
                className={({ isActive }) =>
                  cn(
                    'group flex items-start gap-3 rounded-2xl px-3 py-2.5 transition-colors',
                    isActive || isOpen
                      ? 'bg-surface text-ink shadow-sm'
                      : 'text-ink-2 hover:bg-surface/70 hover:text-ink',
                  )
                }
              >
                <span
                  className={cn(
                    'grid size-7 shrink-0 place-items-center rounded-full font-mono text-[0.66rem] font-semibold tabular-nums transition-colors',
                    complete
                      ? 'bg-ok text-white'
                      : isOpen
                        ? 'bg-violet text-white'
                        : 'bg-surface text-ink-3 group-hover:text-ink-2',
                  )}
                >
                  {complete ? <Check className="size-3" strokeWidth={3} /> : m.competency.split('.')[1]}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-display text-[0.97rem] leading-snug font-medium">{m.title}</span>
                  <span className="mt-0.5 block font-mono text-[0.68rem] text-ink-3 tabular-nums">
                    {doneCount}/{m.lessons.length} lessons
                  </span>
                </span>
              </NavLink>

              {isOpen && (
                <ul className="mt-1 mb-2 ml-[1.6rem] space-y-px border-l-2 border-violet-tint pl-2">
                  {m.lessons.map((l, i) => (
                    <li key={l.id}>
                      <NavLink
                        to={lessonPath({ module: m, lesson: l })}
                        className={({ isActive }) =>
                          cn(
                            'flex items-start gap-2 rounded-xl py-1.5 pr-2 pl-2.5 text-[0.84rem] leading-snug transition-colors',
                            isActive
                              ? 'bg-violet font-medium text-white'
                              : 'text-ink-2 hover:bg-surface/70 hover:text-ink',
                          )
                        }
                      >
                        <span className="mt-[2px] w-3.5 shrink-0 font-mono text-[0.68rem] text-ink-3 tabular-nums">
                          {done[l.id] ? (
                            <Check className="size-3 text-ok in-[.bg-violet]:text-white" strokeWidth={3} />
                          ) : (
                            i + 1
                          )}
                        </span>
                        <span className="min-w-0">{l.title}</span>
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

function ProgressBar() {
  const { done } = useProgress()
  const count = allLessons.filter((r) => done[r.lesson.id]).length
  const pct = totalLessons ? Math.round((count / totalLessons) * 100) : 0
  return (
    <Link
      to="/progress"
      className="group block rounded-2xl bg-surface px-3.5 py-2.5 shadow-sm transition-colors hover:bg-violet-tint"
    >
      <div className="flex items-baseline justify-between gap-2">
        <span className="font-display text-[0.86rem] font-medium text-ink-2 group-hover:text-ink">
          Your progress
        </span>
        <span className="font-mono text-[0.72rem] text-ink-3 tabular-nums">
          {count}/{totalLessons}
        </span>
      </div>
      <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-surface-sunk">
        <div
          className="h-full rounded-full bg-accent-bright transition-[width] duration-700"
          style={{ width: `${pct}%`, transitionTimingFunction: 'var(--ease-out-quint)' }}
        />
      </div>
    </Link>
  )
}

export function ThemeToggle() {
  const current = useTheme()
  return (
    <button
      onClick={() => theme.toggle()}
      className="grid size-11 place-items-center rounded-full border border-chrome-2 text-chrome-dim transition-colors hover:bg-chrome-2 hover:text-chrome-ink"
      aria-label={current === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      title={current === 'dark' ? 'Light mode' : 'Dark mode'}
    >
      {current === 'dark' ? (
        <Sun className="size-[17px]" strokeWidth={1.9} />
      ) : (
        <Moon className="size-[17px]" strokeWidth={1.9} />
      )}
    </button>
  )
}

export function Crumb({ items }: { items: { label: string; to?: string }[] }) {
  return (
    <nav className="flex flex-wrap items-center gap-1 font-mono text-[0.72rem] text-ink-3">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1">
          {i > 0 && <ChevronRight className="size-3 text-ink-3/60" />}
          {item.to ? (
            <Link to={item.to} className="transition-colors hover:text-ink">
              {item.label}
            </Link>
          ) : (
            <span className="text-ink-2">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}

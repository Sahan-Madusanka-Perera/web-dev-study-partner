import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import {
  BookOpen,
  Check,
  ChevronRight,
  Compass,
  FlaskConical,
  Menu,
  Moon,
  PenLine,
  Sun,
  X,
} from 'lucide-react'
import { modules } from '../../data/course'
import { allLessons, lessonPath, totalLessons } from '../../lib/course'
import { useProgress } from '../../lib/progress'
import { theme, useTheme } from '../../lib/theme'
import { cn } from '../../lib/cn'
import { Wordmark } from './Wordmark'
import { MadeBy } from './MadeBy'

const TOOLS = [
  { to: '/', label: 'Course home', icon: Compass, end: true },
  { to: '/playground', label: 'Playground', icon: FlaskConical, end: false },
  { to: '/reference', label: 'Reference', icon: BookOpen, end: false },
  { to: '/practice', label: 'Exam practice', icon: PenLine, end: false },
]

export function Shell() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

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
    <div className="grain min-h-dvh bg-paper">
      <a
        href="#lesson-main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-brand focus:px-4 focus:py-2 focus:text-brand-on"
      >
        Skip to content
      </a>

      {/* Mobile bar */}
      <div className="sticky top-0 z-40 flex items-center gap-3 border-b border-rule bg-paper/90 px-4 py-3 backdrop-blur-md lg:hidden">
        <button
          onClick={() => setOpen(true)}
          className="grid size-9 place-items-center rounded-lg border border-rule bg-surface text-ink-2 transition-colors hover:text-ink"
          aria-label="Open course menu"
        >
          <Menu className="size-[18px]" />
        </button>
        <Link to="/" className="min-w-0">
          <Wordmark compact />
        </Link>
        <div className="ml-auto">
          <ThemeToggle />
        </div>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-40 bg-ink/40 backdrop-blur-[2px] lg:hidden"
          onClick={() => setOpen(false)}
          aria-hidden
        />
      )}

      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex w-[min(20rem,86vw)] flex-col border-r border-rule bg-paper-edge transition-transform duration-300 lg:z-30 lg:w-[var(--sidebar-w)] lg:translate-x-0',
          open ? 'translate-x-0 shadow-lg' : '-translate-x-full',
        )}
        style={{ transitionTimingFunction: 'var(--ease-out-quint)' }}
      >
        <div className="flex items-center gap-2 border-b border-rule px-5 py-4">
          <Link to="/" className="min-w-0 flex-1">
            <Wordmark />
          </Link>
          <button
            onClick={() => setOpen(false)}
            className="grid size-8 place-items-center rounded-lg text-ink-3 hover:text-ink lg:hidden"
            aria-label="Close menu"
          >
            <X className="size-[18px]" />
          </button>
        </div>

        <CourseNav />

        <div className="border-t border-rule px-4 py-3">
          <div className="flex items-center gap-2">
            <ProgressBar />
            <div className="hidden lg:block">
              <ThemeToggle />
            </div>
          </div>
          <MadeBy />
        </div>
      </aside>

      <div className="lg:pl-[var(--sidebar-w)]">
        <main id="lesson-main" className="relative z-10 min-h-dvh">
          <Outlet />
        </main>
      </div>
    </div>
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
      <ul className="space-y-0.5">
        {TOOLS.map(({ to, label, icon: Icon, end }) => (
          <li key={to}>
            <NavLink
              to={to}
              end={end}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-2.5 rounded-lg px-3 py-2 text-[0.9rem] transition-colors',
                  isActive
                    ? 'bg-brand-tint font-medium text-ink'
                    : 'text-ink-2 hover:bg-brand-tint/60 hover:text-ink',
                )
              }
            >
              <Icon className="size-4 shrink-0" strokeWidth={1.9} />
              {label}
            </NavLink>
          </li>
        ))}
      </ul>

      <p className="mt-6 mb-2 px-3 font-mono text-[0.68rem] tracking-[0.14em] text-ink-3 uppercase">
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
                    'group flex items-start gap-2.5 rounded-lg px-3 py-2 transition-colors',
                    isActive || isOpen
                      ? 'bg-brand-tint text-ink'
                      : 'text-ink-2 hover:bg-brand-tint/60 hover:text-ink',
                  )
                }
              >
                <span
                  className={cn(
                    'mt-[3px] grid size-[18px] shrink-0 place-items-center rounded-[5px] font-mono text-[0.6rem] font-semibold tabular-nums transition-colors',
                    complete
                      ? 'bg-ok text-white'
                      : isOpen
                        ? 'bg-brand text-brand-on'
                        : 'bg-surface-sunk text-ink-3 group-hover:text-ink-2',
                  )}
                >
                  {complete ? <Check className="size-3" strokeWidth={3} /> : m.competency.split('.')[1]}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[0.9rem] leading-snug font-medium">{m.title}</span>
                  <span className="mt-0.5 block font-mono text-[0.68rem] text-ink-3 tabular-nums">
                    {doneCount}/{m.lessons.length} lessons
                  </span>
                </span>
              </NavLink>

              {isOpen && (
                <ul className="mt-0.5 mb-1.5 ml-[1.55rem] space-y-px border-l border-rule pl-2">
                  {m.lessons.map((l, i) => (
                    <li key={l.id}>
                      <NavLink
                        to={lessonPath({ module: m, lesson: l })}
                        className={({ isActive }) =>
                          cn(
                            'flex items-start gap-2 rounded-md py-1.5 pr-2 pl-2 text-[0.83rem] leading-snug transition-colors',
                            isActive
                              ? 'bg-surface font-medium text-ink shadow-sm'
                              : 'text-ink-2 hover:text-ink',
                          )
                        }
                      >
                        <span className="mt-[2px] w-3.5 shrink-0 font-mono text-[0.68rem] text-ink-3 tabular-nums">
                          {done[l.id] ? (
                            <Check className="size-3 text-ok" strokeWidth={3} />
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
      className="group min-w-0 flex-1 rounded-lg px-2 py-1.5 transition-colors hover:bg-brand-tint/60"
    >
      <div className="flex items-baseline justify-between gap-2">
        <span className="text-[0.78rem] font-medium text-ink-2 group-hover:text-ink">
          Your progress
        </span>
        <span className="font-mono text-[0.72rem] text-ink-3 tabular-nums">
          {count}/{totalLessons}
        </span>
      </div>
      <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-surface-sunk">
        <div
          className="h-full rounded-full bg-accent transition-[width] duration-700"
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
      className="grid size-9 place-items-center rounded-lg border border-rule bg-surface text-ink-2 transition-colors hover:text-ink"
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

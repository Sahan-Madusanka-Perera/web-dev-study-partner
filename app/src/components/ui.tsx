import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '../lib/cn'

type Variant = 'primary' | 'secondary' | 'ghost' | 'dark' | 'accent' | 'violet'
type Size = 'sm' | 'md'

const VARIANT: Record<Variant, string> = {
  primary:
    'bg-brand text-brand-on hover:bg-brand-hover disabled:bg-rule-strong disabled:text-ink-3',
  violet:
    'bg-violet text-violet-on hover:brightness-105 disabled:bg-rule-strong disabled:text-ink-3',
  accent:
    'bg-accent-bright text-accent-on hover:brightness-105 disabled:bg-rule-strong disabled:text-ink-3',
  secondary:
    'border border-rule-strong bg-surface text-ink hover:border-ink-3 hover:bg-surface-sunk disabled:text-ink-3',
  ghost: 'text-ink-2 hover:bg-brand-tint hover:text-ink disabled:text-ink-3',
  dark: 'border border-[var(--code-rule)] bg-[var(--code-bg-2)] text-[var(--code-ink)] hover:border-[var(--code-dim)] disabled:text-[var(--code-dim)]',
}

const SIZE: Record<Size, string> = {
  sm: 'h-8 gap-1.5 px-3 text-[0.8rem]',
  md: 'h-10 gap-2 px-4.5 text-[0.92rem]',
}

export function Button({
  variant = 'secondary',
  size = 'md',
  className,
  children,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; size?: Size }) {
  return (
    <button
      {...rest}
      className={cn(BASE, VARIANT[variant], SIZE[size], className)}
    >
      {children}
    </button>
  )
}

const BASE =
  'inline-flex shrink-0 items-center justify-center rounded-full font-display font-medium whitespace-nowrap transition-all duration-150 select-none active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70'

/** A router link that looks and behaves like a button. */
export function LinkButton({
  to,
  variant = 'secondary',
  size = 'md',
  className,
  children,
  onClick,
  ...rest
}: AnchorHTMLAttributes<HTMLAnchorElement> & {
  to: string
  variant?: Variant
  size?: Size
}) {
  return (
    <Link to={to} onClick={onClick} {...rest} className={cn(BASE, VARIANT[variant], SIZE[size], className)}>
      {children}
    </Link>
  )
}

export function Card({
  children,
  className,
  as: As = 'div',
}: {
  children: ReactNode
  className?: string
  as?: 'div' | 'section' | 'article' | 'li'
}) {
  return (
    <As className={cn('rounded-3xl border border-rule bg-surface', className)}>{children}</As>
  )
}

export function Pill({
  children,
  tone = 'neutral',
  className,
}: {
  children: ReactNode
  tone?: 'neutral' | 'ok' | 'warn' | 'bad' | 'accent'
  className?: string
}) {
  const tones = {
    neutral: 'bg-surface-sunk text-ink-2',
    ok: 'bg-ok-tint text-ok',
    warn: 'bg-warn-tint text-warn',
    bad: 'bg-bad-tint text-bad',
    accent: 'bg-accent-tint text-accent',
  }
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 font-mono text-[0.68rem] tracking-wide',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}

/** Section rule used between major parts of a lesson. */
export function Rule({ label }: { label?: string }) {
  if (!label) return <hr className="my-10 border-t border-rule" />
  return (
    <div className="my-10 flex items-center gap-3">
      <hr className="flex-1 border-t border-rule" />
      <span className="font-mono text-[0.68rem] tracking-[0.14em] text-ink-3 uppercase">
        {label}
      </span>
      <hr className="flex-1 border-t border-rule" />
    </div>
  )
}

export function Spinner({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'inline-block size-4 animate-spin rounded-full border-2 border-current border-r-transparent',
        className,
      )}
      role="status"
      aria-label="Working"
    />
  )
}

/** A thin progress ring, for the header badge and the hero's start button. */
export function Ring({
  value,
  size = 44,
  stroke = 3,
  track = 'var(--chrome-2)',
  fill = 'var(--accent-bright)',
  className,
  children,
}: {
  /** 0 to 1 */
  value: number
  size?: number
  stroke?: number
  track?: string
  fill?: string
  className?: string
  children?: ReactNode
}) {
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  return (
    <span className={cn('relative inline-grid shrink-0 place-items-center', className)} style={{ width: size, height: size }}>
      <svg viewBox={`0 0 ${size} ${size}`} className="absolute inset-0 -rotate-90" aria-hidden>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={track} strokeWidth={stroke} />
        {value > 0 && <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={fill}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - Math.max(0, Math.min(1, value)))}
          className="transition-[stroke-dashoffset] duration-700"
          style={{ transitionTimingFunction: 'var(--ease-out-quint)' }}
        />}
      </svg>
      {children}
    </span>
  )
}

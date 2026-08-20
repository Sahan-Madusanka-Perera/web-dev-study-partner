import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'
import { rich } from '../../lib/rich'

export function WidgetFrame({
  title,
  hint,
  toolbar,
  children,
  className,
  bleed = true,
}: {
  title: string
  hint?: string
  toolbar?: ReactNode
  children: ReactNode
  className?: string
  bleed?: boolean
}) {
  return (
    <figure className={cn('not-prose my-8', bleed && 'bleed')}>
      <div className="overflow-hidden rounded-2xl border border-rule bg-surface shadow-sm">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 border-b border-rule bg-surface-sunk px-4 py-2.5">
          <span className="flex items-center gap-2 font-mono text-[0.7rem] tracking-[0.12em] text-ink-3 uppercase">
            <ExploreGlyph />
            {title}
          </span>
          {toolbar && <span className="ml-auto flex items-center gap-1.5">{toolbar}</span>}
        </div>
        <div className={className}>{children}</div>
      </div>
      {hint && (
        <figcaption className="mt-2.5 px-1 text-[0.86rem] leading-relaxed text-ink-2">
          {rich(hint)}
        </figcaption>
      )}
    </figure>
  )
}

function ExploreGlyph() {
  return (
    <svg viewBox="0 0 14 14" className="size-3.5 text-accent" aria-hidden>
      <circle cx="6.2" cy="6.2" r="4.2" fill="none" stroke="currentColor" strokeWidth="1.3" />
      <path d="M9.4 9.4 12.2 12.2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  )
}

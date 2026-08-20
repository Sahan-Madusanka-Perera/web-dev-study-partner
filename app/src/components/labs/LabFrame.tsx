import { useState, type ReactNode } from 'react'
import { RotateCcw } from 'lucide-react'
import { cn } from '../../lib/cn'
import { rich } from '../../lib/rich'
import { Button } from '../ui'

/**
 * The shared chrome for every runnable surface in the course.
 * Labs break out of the reading column — editing is a two-hand job and
 * deserves the width.
 */
export function LabFrame({
  title,
  note,
  toolbar,
  onReset,
  children,
  panes,
  className,
}: {
  title?: string
  note?: string
  toolbar?: ReactNode
  onReset?: () => void
  children?: ReactNode
  panes?: { label: string; content: ReactNode; grow?: boolean }[]
  className?: string
}) {
  return (
    <figure className={cn('not-prose bleed my-8', className)}>
      <div className="overflow-hidden rounded-2xl border border-rule bg-surface shadow-md">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 border-b border-rule bg-surface-sunk px-4 py-2.5">
          <span className="flex items-center gap-2 font-mono text-[0.7rem] tracking-[0.12em] text-ink-3 uppercase">
            <LabGlyph />
            {title ?? 'Try it'}
          </span>
          <span className="ml-auto flex flex-wrap items-center gap-1.5">
            {toolbar}
            {onReset && (
              <Button size="sm" variant="ghost" onClick={onReset} title="Restore the starting code">
                <RotateCcw className="size-3.5" strokeWidth={2} />
                Reset
              </Button>
            )}
          </span>
        </div>

        {panes ? <PaneSplit panes={panes} /> : children}
      </div>
      {note && (
        <figcaption className="mt-2.5 px-1 text-[0.86rem] leading-relaxed text-ink-2">
          {rich(note)}
        </figcaption>
      )}
    </figure>
  )
}

function LabGlyph() {
  return (
    <svg viewBox="0 0 14 14" className="size-3.5 text-accent" aria-hidden>
      <path
        d="M5.5 1.5h3M6 1.5v3.2L2.6 11a1.2 1.2 0 0 0 1 1.9h6.8a1.2 1.2 0 0 0 1-1.9L8 4.7V1.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/** Side by side where there is room; tabbed where there isn't. */
function PaneSplit({ panes }: { panes: { label: string; content: ReactNode; grow?: boolean }[] }) {
  const [active, setActive] = useState(0)
  return (
    <>
      <div className="flex border-b border-rule bg-surface-sunk/60 md:hidden">
        {panes.map((p, i) => (
          <button
            key={p.label}
            onClick={() => setActive(i)}
            className={cn(
              'flex-1 border-b-2 px-3 py-2 font-mono text-[0.7rem] tracking-wide uppercase transition-colors',
              i === active
                ? 'border-accent text-ink'
                : 'border-transparent text-ink-3 hover:text-ink-2',
            )}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="md:flex md:items-stretch md:divide-x md:divide-rule">
        {panes.map((p, i) => (
          <div
            key={p.label}
            className={cn(
              'min-w-0 md:block',
              i === active ? 'block' : 'hidden',
              p.grow ? 'md:flex-[1.15]' : 'md:flex-1',
            )}
          >
            <div className="hidden items-center gap-2 border-b border-rule px-3.5 py-1.5 md:flex">
              <span className="font-mono text-[0.68rem] tracking-[0.1em] text-ink-3 uppercase">
                {p.label}
              </span>
            </div>
            {p.content}
          </div>
        ))}
      </div>
    </>
  )
}

export function LabStatus({
  tone,
  children,
}: {
  tone: 'ok' | 'bad' | 'muted' | 'run'
  children: ReactNode
}) {
  const tones = {
    ok: 'text-ok',
    bad: 'text-bad',
    muted: 'text-ink-3',
    run: 'text-accent',
  }
  return (
    <span className={cn('font-mono text-[0.7rem] tabular-nums', tones[tone])}>{children}</span>
  )
}

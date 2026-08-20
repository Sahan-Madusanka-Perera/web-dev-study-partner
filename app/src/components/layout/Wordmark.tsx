import { cn } from '../../lib/cn'

/** The mark: angle brackets closing around a slash — markup and a
 *  study tick in one shape. Drawn, not typed, so it holds at 20px. */
export function Wordmark({ compact = false }: { compact?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <span className="grid size-8 shrink-0 place-items-center rounded-[9px] bg-brand text-brand-on">
        <svg viewBox="0 0 32 32" className="size-[19px]" aria-hidden>
          <path
            d="M11 11 6.5 16 11 21"
            fill="none"
            stroke="var(--accent-bright)"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M21 11 25.5 16 21 21"
            fill="none"
            stroke="var(--accent-bright)"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M18.5 8.5 13.5 23.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <span className={cn('min-w-0 leading-tight', compact && 'sr-only sm:not-sr-only')}>
        <span className="block truncate font-display text-[1.02rem] font-semibold tracking-[-0.02em] text-ink">
          Study Partner
        </span>
        <span className="block truncate font-mono text-[0.62rem] tracking-[0.13em] text-ink-3 uppercase">
          A/L ICT · Web Development
        </span>
      </span>
    </span>
  )
}

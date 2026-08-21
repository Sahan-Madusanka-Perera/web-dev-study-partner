import { Heart } from 'lucide-react'

/* lucide dropped its brand marks in v1, so the three glyphs below are drawn
   here in the same 24-grid stroke style as the rest of the icon set. */
const SOCIALS = [
  {
    label: 'GitHub',
    href: 'https://github.com/Sahan-Madusanka-Perera',
    paths: [
      'M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4',
      'M9 18c-4.51 2-5-2-7-2',
    ],
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/sahan-perera-64183b204/',
    paths: [
      'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z',
      'M2 9h4v12H2z',
      'M4 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4z',
    ],
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/sahan._perera/',
    paths: [
      'M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5z',
      'M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z',
      'M17.5 6.5h.01',
    ],
  },
]

export function MadeBy() {
  return (
    <div className="mt-3 flex flex-wrap items-center justify-between gap-x-2 gap-y-1.5 border-t border-rule px-2 pt-3">
      <p className="font-mono text-[0.68rem] leading-snug text-ink-3">
        Made with{' '}
        <Heart
          className="inline-block size-3 translate-y-[1px] fill-accent text-accent"
          strokeWidth={2}
          aria-label="love"
        />{' '}
        by <span className="text-ink-2">Sahan Perera</span>
      </p>

      <ul className="flex items-center gap-0.5">
        {SOCIALS.map(({ label, href, paths }) => (
          <li key={label}>
            <a
              href={href}
              target="_blank"
              rel="noreferrer noopener"
              title={label}
              aria-label={`Sahan Perera on ${label}`}
              className="grid size-7 place-items-center rounded-md text-ink-3 transition-colors hover:bg-brand-tint hover:text-ink"
            >
              <svg
                viewBox="0 0 24 24"
                className="size-[15px]"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.9}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                {paths.map((d) => (
                  <path key={d} d={d} />
                ))}
              </svg>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

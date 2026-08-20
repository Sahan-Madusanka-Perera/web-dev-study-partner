import { Fragment, type ReactNode } from 'react'

/**
 * A deliberately tiny inline formatter for lesson prose.
 * Supports  **bold**  *italic*  `code`  ~~strike~~  ==mark==  [label](href)
 * Nothing else — lesson text should stay prose, not markup.
 */
const TOKEN =
  /(\*\*[^*]+\*\*|\*[^*\n]+\*|`[^`]+`|~~[^~]+~~|==[^=]+==|\[[^\]]+\]\([^)]+\))/g

export function rich(text: string): ReactNode {
  const parts = text.split(TOKEN)
  return parts.map((part, i) => {
    if (!part) return null
    if (part.startsWith('**') && part.endsWith('**'))
      return (
        <strong key={i} className="font-semibold text-ink">
          {part.slice(2, -2)}
        </strong>
      )
    if (part.startsWith('~~') && part.endsWith('~~'))
      return (
        <s key={i} className="text-ink-3">
          {part.slice(2, -2)}
        </s>
      )
    if (part.startsWith('==') && part.endsWith('=='))
      return (
        <mark
          key={i}
          className="rounded-[3px] bg-accent-tint px-1 py-px text-ink decoration-clone"
        >
          {part.slice(2, -2)}
        </mark>
      )
    if (part.startsWith('`') && part.endsWith('`'))
      return <InlineCode key={i}>{part.slice(1, -1)}</InlineCode>
    if (part.startsWith('*') && part.endsWith('*'))
      return <em key={i}>{part.slice(1, -1)}</em>
    const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(part)
    if (link) {
      const external = /^https?:/.test(link[2])
      return (
        <a
          key={i}
          href={link[2]}
          target={external ? '_blank' : undefined}
          rel={external ? 'noreferrer noopener' : undefined}
          className="font-medium text-ink underline decoration-accent decoration-2 underline-offset-[3px] transition-colors hover:text-accent"
        >
          {link[1]}
        </a>
      )
    }
    return <Fragment key={i}>{part}</Fragment>
  })
}

export function InlineCode({ children }: { children: ReactNode }) {
  return (
    <code className="rounded-[4px] border border-rule bg-surface-sunk px-[0.34em] py-[0.12em] text-[0.86em] font-medium text-ink">
      {children}
    </code>
  )
}

import { useState, type ReactNode } from 'react'
import { Check, Copy } from 'lucide-react'
import { highlight, TOK_CLASS } from '../../lib/highlight'
import type { Lang } from '../../types/content'
import { cn } from '../../lib/cn'

export const LANG_LABEL: Record<Lang, string> = {
  html: 'HTML',
  css: 'CSS',
  php: 'PHP',
  sql: 'SQL',
  js: 'JavaScript',
  text: 'Output',
}

export const LANG_COLOR: Record<Lang, string> = {
  html: 'var(--lang-html)',
  css: 'var(--lang-css)',
  php: 'var(--lang-php)',
  sql: 'var(--lang-sql)',
  js: 'var(--lang-js)',
  text: 'var(--code-dim)',
}

export function LangChip({ lang }: { lang: Lang }) {
  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-[0.66rem] tracking-[0.1em] text-[var(--code-dim)] uppercase">
      <span
        className="size-[7px] rounded-full"
        style={{ background: LANG_COLOR[lang] }}
        aria-hidden
      />
      {LANG_LABEL[lang]}
    </span>
  )
}

export function CodeView({
  code,
  lang,
  lineNumbers = true,
  highlightLines,
  className,
}: {
  code: string
  lang: Lang
  lineNumbers?: boolean
  highlightLines?: number[]
  className?: string
}) {
  const lines = code.replace(/\n$/, '').split('\n')
  const marked = new Set(highlightLines ?? [])

  // Tokenise the whole block once, then slice tokens back into lines so
  // multi-line constructs (comments, strings) stay correctly coloured.
  const toks = highlight(code.replace(/\n$/, ''), lang)
  const perLine: { t: string; c: keyof typeof TOK_CLASS }[][] = [[]]
  for (const tok of toks) {
    const pieces = tok.t.split('\n')
    pieces.forEach((piece, i) => {
      if (i > 0) perLine.push([])
      if (piece) perLine[perLine.length - 1].push({ t: piece, c: tok.c })
    })
  }

  return (
    <pre
      className={cn(
        'overflow-x-auto py-3 font-mono text-[0.815rem] leading-[1.75] text-[var(--code-ink)]',
        className,
      )}
    >
      <code className="block min-w-max">
        {lines.map((_, i) => (
          <span
            key={i}
            className={cn(
              'flex px-4',
              marked.has(i + 1) &&
                'bg-[color-mix(in_oklab,var(--accent-bright)_13%,transparent)] shadow-[inset_2px_0_0_var(--accent-bright)]',
            )}
          >
            {lineNumbers && (
              <span
                className="mr-4 inline-block w-[2ch] shrink-0 text-right text-[var(--code-gutter)] select-none"
                aria-hidden
              >
                {i + 1}
              </span>
            )}
            <span className="min-w-0 whitespace-pre">
              {(perLine[i] ?? []).map((tok, j) => (
                <span key={j} className={TOK_CLASS[tok.c]}>
                  {tok.t}
                </span>
              ))}
              {!(perLine[i] ?? []).length && ' '}
            </span>
          </span>
        ))}
      </code>
    </pre>
  )
}

export function CopyButton({ text, label = 'Copy' }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text)
          setCopied(true)
          setTimeout(() => setCopied(false), 1600)
        } catch {
          /* clipboard blocked — the code is still selectable */
        }
      }}
      className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 font-mono text-[0.68rem] tracking-wide text-[var(--code-dim)] uppercase transition-colors hover:bg-white/5 hover:text-[var(--code-ink)]"
    >
      {copied ? (
        <>
          <Check className="size-3" strokeWidth={2.6} />
          Copied
        </>
      ) : (
        <>
          <Copy className="size-3" strokeWidth={2.2} />
          {label}
        </>
      )}
    </button>
  )
}

/** The ink-navy panel every runnable or readable code surface sits in. */
export function CodePanel({
  title,
  lang,
  actions,
  children,
  className,
  flush = false,
}: {
  title?: ReactNode
  lang?: Lang
  actions?: ReactNode
  children: ReactNode
  className?: string
  flush?: boolean
}) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-xl border border-[var(--code-rule)] bg-[var(--code-bg)] shadow-md',
        className,
      )}
    >
      {(title || lang || actions) && (
        <div className="flex items-center gap-3 border-b border-[var(--code-rule)] bg-[var(--code-bg-2)] py-1.5 pr-1.5 pl-3.5">
          {title ? (
            <span className="truncate font-mono text-[0.72rem] text-[var(--code-ink)]">{title}</span>
          ) : null}
          {lang && !title ? <LangChip lang={lang} /> : null}
          <span className="ml-auto flex items-center gap-1">
            {lang && title ? <LangChip lang={lang} /> : null}
            {actions}
          </span>
        </div>
      )}
      <div className={flush ? '' : 'min-w-0'}>{children}</div>
    </div>
  )
}

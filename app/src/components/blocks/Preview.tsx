import { useEffect, useImperativeHandle, useRef, useState, type Ref } from 'react'
import { cn } from '../../lib/cn'

export interface PreviewHandle {
  /** The rendered document, for auto-checking a challenge. */
  doc: () => Document | null
}

/**
 * A real browser rendering of the student's markup.
 *
 * Deliberately unstyled: the frame paints on white with the browser's own
 * default stylesheet, because half of learning HTML is learning what a
 * plain `<h1>` or `<ul>` actually looks like before CSS touches it.
 * Scripts stay off — nothing in this syllabus needs them, and it keeps a
 * stray `<script>` from reaching the student's own saved progress.
 */
export function Preview({
  html,
  css,
  minHeight = 120,
  maxHeight,
  className,
  title = 'Live preview',
  ref,
  onRender,
}: {
  html: string
  css?: string
  minHeight?: number
  maxHeight?: number
  className?: string
  title?: string
  ref?: Ref<PreviewHandle>
  onRender?: (doc: Document) => void
}) {
  const frame = useRef<HTMLIFrameElement>(null)
  const [height, setHeight] = useState(minHeight)

  useImperativeHandle(ref, () => ({
    doc: () => frame.current?.contentDocument ?? null,
  }))

  const doc = buildDoc(html, css)

  useEffect(() => {
    const el = frame.current
    if (!el) return
    let observer: ResizeObserver | undefined

    const measure = () => {
      const d = el.contentDocument
      if (!d?.body) return
      const h = Math.max(
        d.body.scrollHeight,
        d.documentElement.scrollHeight,
        d.body.offsetHeight,
      )
      const next = Math.max(minHeight, maxHeight ? Math.min(h + 2, maxHeight) : h + 2)
      setHeight((prev) => (Math.abs(prev - next) > 1 ? next : prev))
    }

    const onLoad = () => {
      const d = el.contentDocument
      if (!d) return
      measure()
      onRender?.(d)
      observer?.disconnect()
      observer = new ResizeObserver(measure)
      if (d.body) observer.observe(d.body)
      // Images and fonts land after load; re-measure once they do.
      d.querySelectorAll('img').forEach((img) => img.addEventListener('load', measure))
      setTimeout(measure, 60)
      setTimeout(measure, 300)
    }

    el.addEventListener('load', onLoad)
    if (el.contentDocument?.readyState === 'complete') onLoad()
    return () => {
      el.removeEventListener('load', onLoad)
      observer?.disconnect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [doc, minHeight, maxHeight])

  return (
    <iframe
      ref={frame}
      title={title}
      srcDoc={doc}
      sandbox="allow-same-origin allow-forms allow-popups"
      className={cn('w-full border-0 bg-white', className)}
      style={{ height, colorScheme: 'light' }}
    />
  )
}

export function buildDoc(html: string, css?: string) {
  const looksComplete = /<html[\s>]/i.test(html)
  const style = css
    ? `<style>\n${css}\n</style>`
    : ''
  // A base href, so the relative paths students write (media/bird.jpg)
  // resolve the same way they would on a real site.
  const base = `<base href="${typeof document !== 'undefined' ? document.baseURI : '/'}">`
  const reset = `<style>
    html { background: #fff; color: #000; color-scheme: light; }
    body { margin: 8px; font-family: "Times New Roman", Times, serif; }
    ::selection { background: #b4d5fe; }
  </style>`

  if (looksComplete) {
    // Respect the student's own document, but still force a light ground
    // so a dark host theme does not bleed into "what the browser shows".
    if (/<head(\s[^>]*)?>/i.test(html))
      return html.replace(/<head(\s[^>]*)?>/i, (m) => `${m}${base}${reset}${style}`)
    if (/<body(\s[^>]*)?>/i.test(html))
      return html.replace(/<body(\s[^>]*)?>/i, (m) => `${base}${reset}${style}${m}`)
    return `${base}${reset}${style}${html}`
  }
  return `<!doctype html><html><head><meta charset="utf-8">${base}${reset}${style}</head><body>${html}</body></html>`
}

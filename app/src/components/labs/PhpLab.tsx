import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { Play, TriangleAlert } from 'lucide-react'
import { runPhp, type PhpResult } from '../../lib/php'
import { Editor } from '../blocks/Editor'
import { Preview } from '../blocks/Preview'
import { CopyButton } from '../blocks/CodePanel'
import { Button, Spinner } from '../ui'
import { LabFrame, LabStatus } from './LabFrame'
import { PhpEngineGate, usePhpStatus } from './PhpEngine'
import { cn } from '../../lib/cn'

export function PhpLab({
  code: initial,
  height = 300,
  title,
  note,
  autoRun = true,
  filename = 'index.php',
  showBrowserToggle = true,
  onResult,
}: {
  code: string
  height?: number
  title?: string
  note?: string
  autoRun?: boolean
  filename?: string
  showBrowserToggle?: boolean
  onResult?: (result: PhpResult) => void
}) {
  const [code, setCode] = useState(initial)
  const [result, setResult] = useState<PhpResult | null>(null)
  const [busy, setBusy] = useState(false)
  const status = usePhpStatus()
  const ranOnce = useRef(false)
  const frame = useRef<HTMLDivElement>(null)
  const [seen, setSeen] = useState(false)

  /* The displayed filename is for the student; the path on the virtual disk
     has to be unique, or two labs on one page overwrite each other. */
  const slot = useId().replace(/[^a-zA-Z0-9]/g, '')
  const scriptPath = `lab-${slot}-${filename}`

  const run = useCallback(
    async (source: string) => {
      setBusy(true)
      try {
        const next = await runPhp(source, { scriptName: scriptPath })
        setResult(next)
        onResult?.(next)
      } finally {
        setBusy(false)
      }
    },
    [scriptPath, onResult],
  )

  /* Only run a lab once the student has actually scrolled to it — a lesson
     with eight labs should not fire eight scripts the moment it opens. */
  useEffect(() => {
    const el = frame.current
    if (!el || seen) return
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setSeen(true)
          io.disconnect()
        }
      },
      { rootMargin: '200px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [seen])

  useEffect(() => {
    if (autoRun && seen && status.phase === 'ready' && !ranOnce.current) {
      ranOnce.current = true
      void run(initial)
    }
  }, [autoRun, seen, status.phase, initial, run])

  return (
    <div ref={frame}>
    <LabFrame
      title={title ?? 'Run real PHP'}
      note={note}
      onReset={() => {
        setCode(initial)
        void run(initial)
      }}
      toolbar={
        <>
          <span className="text-[var(--code-dim)]">
            <CopyButton text={code} />
          </span>
          <Button
            size="sm"
            variant="primary"
            onClick={() => void run(code)}
            disabled={busy || status.phase === 'loading'}
          >
            {busy ? <Spinner className="size-3.5" /> : <Play className="size-3.5" strokeWidth={2.4} />}
            Run
          </Button>
        </>
      }
      panes={[
        {
          label: filename,
          content: (
            <div
              onKeyDown={(e) => {
                if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
                  e.preventDefault()
                  void run(code)
                }
              }}
            >
              <Editor value={code} onChange={setCode} lang="php" height={height} />
            </div>
          ),
        },
        {
          label: 'Output',
          grow: true,
          content: (
            <PhpEngineGate>
              <PhpOutput result={result} busy={busy} minHeight={height} showBrowserToggle={showBrowserToggle} />
            </PhpEngineGate>
          ),
        },
      ]}
    />
    </div>
  )
}

export function PhpOutput({
  result,
  busy,
  minHeight = 240,
  showBrowserToggle = true,
}: {
  result: PhpResult | null
  busy?: boolean
  minHeight?: number
  showBrowserToggle?: boolean
}) {
  const [view, setView] = useState<'browser' | 'raw'>('browser')
  const canRender = showBrowserToggle && !!result?.looksLikeHtml

  if (!result)
    return (
      <div
        className="grid place-items-center px-6 text-center text-[0.85rem] text-ink-3"
        style={{ minHeight }}
      >
        {busy ? <Spinner className="text-ink-3" /> : 'Press Run to execute this script.'}
      </div>
    )

  return (
    <div className="flex flex-col" style={{ minHeight }}>
      {canRender && (
        <div className="flex items-center gap-1 border-b border-rule bg-surface-sunk/50 px-2 py-1">
          {(['browser', 'raw'] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={cn(
                'rounded-md px-2 py-1 font-mono text-[0.68rem] tracking-wide uppercase transition-colors',
                view === v ? 'bg-surface text-ink shadow-sm' : 'text-ink-3 hover:text-ink-2',
              )}
            >
              {v === 'browser' ? 'What the visitor sees' : 'What PHP sent'}
            </button>
          ))}
          <span className="ml-auto pr-1">
            <LabStatus tone="muted">{result.ms.toFixed(0)} ms</LabStatus>
          </span>
        </div>
      )}

      {result.errors && (
        <div className="flex items-start gap-2 border-b border-bad/25 bg-bad-tint px-3.5 py-2.5">
          <TriangleAlert className="mt-0.5 size-4 shrink-0 text-bad" strokeWidth={2} />
          <pre className="min-w-0 flex-1 overflow-x-auto font-mono text-[0.76rem] leading-relaxed break-words whitespace-pre-wrap text-bad">
            {result.errors}
          </pre>
        </div>
      )}

      <div className="min-h-0 flex-1">
        {canRender && view === 'browser' ? (
          <Preview html={result.output} minHeight={Math.max(minHeight - 40, 80)} />
        ) : (
          <pre className="overflow-x-auto px-4 py-3 font-mono text-[0.8rem] leading-relaxed whitespace-pre-wrap text-ink">
            {result.output.trim() ? (
              result.output
            ) : (
              <span className="text-ink-3">
                {result.errors ? '(nothing was printed)' : 'The script ran and printed nothing.'}
              </span>
            )}
          </pre>
        )}
      </div>
    </div>
  )
}

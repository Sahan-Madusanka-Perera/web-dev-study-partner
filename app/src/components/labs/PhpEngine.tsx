import { useEffect, useState } from 'react'
import { AlertTriangle, Download, Play } from 'lucide-react'
import { getPhp, onPhpStatus, type PhpStatus } from '../../lib/php'
import { Button, Spinner } from '../ui'

export function usePhpStatus() {
  const [status, setStatus] = useState<PhpStatus>({ phase: 'idle' })
  useEffect(() => onPhpStatus(setStatus), [])
  return status
}

function mb(bytes: number) {
  return (bytes / 1024 / 1024).toFixed(1)
}

/**
 * PHP is a server language, so the course ships a server: a real PHP 8
 * interpreter compiled to WebAssembly. It is a one-time download, and
 * the student deserves to be told that rather than left watching a
 * button do nothing.
 */
export function PhpEngineGate({ children }: { children: React.ReactNode }) {
  const status = usePhpStatus()

  if (status.phase === 'ready') return <>{children}</>

  if (status.phase === 'loading') {
    const pct = status.total ? Math.round((status.loaded / status.total) * 100) : 0
    return (
      <div className="px-5 py-8">
        <div className="mx-auto max-w-md text-center">
          <p className="font-display text-lg font-semibold text-ink">Starting the PHP engine</p>
          <p className="mt-1.5 text-[0.88rem] text-ink-2">
            {status.total
              ? `${mb(status.loaded)} of ${mb(status.total)} MB — this happens once, then it is cached.`
              : 'Unpacking PHP 8.0…'}
          </p>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-surface-sunk">
            <div
              className="h-full rounded-full bg-accent-bright transition-[width] duration-300"
              style={{ width: `${Math.max(pct, 3)}%` }}
            />
          </div>
          <p className="mt-2 font-mono text-[0.7rem] text-ink-3 tabular-nums">{pct}%</p>
        </div>
      </div>
    )
  }

  if (status.phase === 'failed') {
    return (
      <div className="flex items-start gap-3 px-5 py-6">
        <AlertTriangle className="mt-0.5 size-5 shrink-0 text-bad" strokeWidth={1.9} />
        <div>
          <p className="font-medium text-ink">The PHP engine could not start</p>
          <p className="mt-1 text-[0.88rem] text-ink-2">{status.message}</p>
          <Button className="mt-3" size="sm" onClick={() => void getPhp().catch(() => {})}>
            Try again
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="px-5 py-8">
      <div className="mx-auto max-w-md text-center">
        <span className="mx-auto grid size-11 place-items-center rounded-xl bg-brand-tint text-ink">
          <Download className="size-5" strokeWidth={1.8} />
        </span>
        <p className="mt-3 font-display text-lg font-semibold text-ink">
          This lesson runs real PHP
        </p>
        <p className="mt-1.5 text-[0.88rem] leading-relaxed text-ink-2">
          A complete PHP 8 interpreter and SQL engine load into this tab — about 14 MB, once per
          device. After that everything runs offline, with no XAMPP to install.
        </p>
        <Button
          className="mt-4"
          variant="primary"
          onClick={() => void getPhp().catch(() => {})}
        >
          <Play className="size-4" strokeWidth={2.2} />
          Start the engine
        </Button>
      </div>
    </div>
  )
}

export function EngineBadge() {
  const status = usePhpStatus()
  if (status.phase === 'ready')
    return (
      <span className="inline-flex items-center gap-1.5 font-mono text-[0.68rem] text-ok">
        <span className="size-1.5 rounded-full bg-ok" aria-hidden />
        PHP 8.0
      </span>
    )
  if (status.phase === 'loading')
    return (
      <span className="inline-flex items-center gap-1.5 font-mono text-[0.68rem] text-ink-3">
        <Spinner className="size-3" />
        loading
      </span>
    )
  return null
}

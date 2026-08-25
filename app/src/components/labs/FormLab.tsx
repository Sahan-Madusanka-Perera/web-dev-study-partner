import { useCallback, useId, useRef, useState } from 'react'
import { ArrowRight, Play } from 'lucide-react'
import { runPhp, type PhpResult } from '../../lib/php'
import { Editor, useEditorReset } from '../blocks/Editor'
import { Preview } from '../blocks/Preview'
import { LabFrame } from './LabFrame'
import { PhpEngineGate } from './PhpEngine'
import { PhpOutput } from './PhpLab'
import { Pill } from '../ui'
import { cn } from '../../lib/cn'

type Entries = Record<string, string | string[]>

/**
 * The full round trip, on one screen.
 *
 * The student edits the form, fills it in, presses the real submit
 * button, and watches the exact request leave and the exact PHP output
 * come back. No mock data — `$_POST` really is populated by the browser's
 * own FormData, encoded the way a browser encodes it.
 */
export function FormLab({
  formHtml: initialForm,
  handler: initialHandler,
  method: fixedMethod,
  title,
  note,
  height = 220,
}: {
  formHtml: string
  handler: string
  method?: 'GET' | 'POST'
  title?: string
  note?: string
  height?: number
}) {
  const [formHtml, setFormHtml] = useState(initialForm)
  const [handler, setHandler] = useState(initialHandler)
  const [editorKey, remountEditors] = useEditorReset()
  const [result, setResult] = useState<PhpResult | null>(null)
  const [request, setRequest] = useState<{ method: string; entries: Entries } | null>(null)
  const [busy, setBusy] = useState(false)
  const handlerRef = useRef(handler)
  handlerRef.current = handler
  const slot = useId().replace(/[^a-zA-Z0-9]/g, '')

  const submit = useCallback(
    async (method: string, entries: Entries) => {
      setRequest({ method, entries })
      setBusy(true)
      try {
        setResult(
          await runPhp(handlerRef.current, {
            scriptName: `form-${slot}-process.php`,
            ...(method === 'POST' ? { post: entries } : { get: entries }),
          }),
        )
      } finally {
        setBusy(false)
      }
    },
    [slot],
  )

  const wire = useCallback(
    (doc: Document) => {
      doc.querySelectorAll('form').forEach((form) => {
        form.addEventListener('submit', (event) => {
          event.preventDefault()
          const submitter = (event as SubmitEvent).submitter as HTMLElement | null
          const data = new FormData(
            form,
            submitter instanceof HTMLButtonElement || submitter instanceof HTMLInputElement
              ? submitter
              : undefined,
          )
          const entries: Entries = {}
          for (const [rawKey, value] of data.entries()) {
            if (typeof value !== 'string') continue
            const key = rawKey
            if (key.endsWith('[]')) {
              const base = key.slice(0, -2)
              const list = (entries[base] as string[] | undefined) ?? []
              entries[base] = [...list, value]
            } else if (key in entries) {
              const prev = entries[key]
              entries[key] = Array.isArray(prev) ? [...prev, value] : [prev as string, value]
            } else {
              entries[key] = value
            }
          }
          const method = (
            fixedMethod ??
            (form.getAttribute('method') ?? 'GET')
          ).toUpperCase()
          void submit(method === 'POST' ? 'POST' : 'GET', entries)
        })
      })
    },
    [fixedMethod, submit],
  )

  return (
    <LabFrame
      title={title ?? 'Fill the form in, press submit, watch the request'}
      note={note}
      onReset={() => {
        setFormHtml(initialForm)
        setHandler(initialHandler)
        remountEditors()
        setResult(null)
        setRequest(null)
      }}
    >
      <div className="grid divide-y divide-rule lg:grid-cols-2 lg:divide-x lg:divide-y-0">
        <LabPane label="form.html">
          <Editor key={editorKey} value={formHtml} onChange={setFormHtml} lang="html" height={height} />
        </LabPane>
        <LabPane label="process.php">
          <Editor key={editorKey} value={handler} onChange={setHandler} lang="php" height={height} />
        </LabPane>
      </div>

      <div className="grid border-t border-rule lg:grid-cols-2 lg:divide-x lg:divide-rule">
        <LabPane label="The form in the browser" className="border-b border-rule lg:border-b-0">
          <div className="bg-white">
            <Preview
              html={formHtml}
              minHeight={170}
              onRender={wire}
              title="Interactive form preview"
            />
          </div>
        </LabPane>

        <LabPane label="What the server received, and sent back">
          <PhpEngineGate>
            {request ? (
              <>
                <RequestReadout method={request.method} entries={request.entries} />
                <PhpOutput result={result} busy={busy} minHeight={150} />
              </>
            ) : (
              <div className="grid place-items-center px-6 py-10 text-center">
                <div className="max-w-xs">
                  <span className="mx-auto flex size-9 items-center justify-center rounded-lg bg-brand-tint text-ink">
                    <Play className="size-4" strokeWidth={2} />
                  </span>
                  <p className="mt-2.5 text-[0.88rem] text-ink-2">
                    Fill in the form on the left and press its submit button. The request will
                    appear here, exactly as PHP sees it.
                  </p>
                </div>
              </div>
            )}
          </PhpEngineGate>
        </LabPane>
      </div>
    </LabFrame>
  )
}

function LabPane({
  label,
  children,
  className,
}: {
  label: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn('min-w-0', className)}>
      <div className="flex items-center gap-2 border-b border-rule px-3.5 py-1.5">
        <span className="font-mono text-[0.68rem] tracking-[0.1em] text-ink-3 uppercase">
          {label}
        </span>
      </div>
      {children}
    </div>
  )
}

function RequestReadout({ method, entries }: { method: string; entries: Entries }) {
  const pairs = Object.entries(entries)
  const query = pairs
    .flatMap(([k, v]) =>
      (Array.isArray(v) ? v : [v]).map(
        (one) => `${encodeURIComponent(k)}${Array.isArray(v) ? '[]' : ''}=${encodeURIComponent(one)}`,
      ),
    )
    .join('&')
  const isGet = method === 'GET'

  return (
    <div className="border-b border-rule bg-surface-sunk/60 px-3.5 py-3">
      <div className="flex flex-wrap items-center gap-2">
        <Pill tone={isGet ? 'accent' : 'ok'}>{method}</Pill>
        <ArrowRight className="size-3.5 text-ink-3" />
        <code className="min-w-0 truncate font-mono text-[0.76rem] text-ink-2">
          {isGet ? `process.php${query ? `?${query}` : ''}` : 'process.php'}
        </code>
      </div>

      {!isGet && (
        <p className="mt-2 font-mono text-[0.72rem] text-ink-3">
          Request body: <span className="text-ink-2">{query || '(empty)'}</span>
        </p>
      )}

      <p className="mt-2.5 mb-1 font-mono text-[0.68rem] tracking-[0.1em] text-ink-3 uppercase">
        {isGet ? '$_GET' : '$_POST'} now contains
      </p>
      {pairs.length ? (
        <ul className="space-y-0.5">
          {pairs.map(([k, v]) => (
            <li key={k} className="font-mono text-[0.76rem]">
              <span className="text-[var(--lang-php)]">
                {isGet ? '$_GET' : '$_POST'}['{k}']
              </span>
              <span className="text-ink-3"> = </span>
              <span className="text-ink">
                {Array.isArray(v) ? `[ ${v.map((x) => `"${x}"`).join(', ')} ]` : `"${v}"`}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="font-mono text-[0.76rem] text-ink-3">
          nothing — no field had a <span className="text-ink-2">name</span> attribute with a value
        </p>
      )}
    </div>
  )
}

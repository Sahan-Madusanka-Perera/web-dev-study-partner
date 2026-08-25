import { useCallback, useId, useRef, useState } from 'react'
import { Check, Lightbulb, Sparkles, Target, X } from 'lucide-react'
import type { Check as CheckSpec, ChallengeSpec } from '../../types/content'
import { Editor } from '../blocks/Editor'
import { useResetKey } from '../../lib/reset'
import { Preview, type PreviewHandle } from '../blocks/Preview'
import { Button, Spinner } from '../ui'
import { rich } from '../../lib/rich'
import { cn } from '../../lib/cn'
import { progress, useProgress } from '../../lib/progress'
import { runPhp, runSqlViaPhp } from '../../lib/php'
import { PhpEngineGate } from '../labs/PhpEngine'
import { PhpOutput } from '../labs/PhpLab'
import type { PhpResult } from '../../lib/php'

type Verdict = { label: string; ok: boolean }

export function Challenge({ spec }: { spec: ChallengeSpec }) {
  const [code, setCode] = useState(spec.starter)
  const [css, setCss] = useState(spec.starterCss ?? '')
  const [resetKey, remountPanes] = useResetKey()
  const [verdicts, setVerdicts] = useState<Verdict[] | null>(null)
  const [hintsShown, setHintsShown] = useState(0)
  const [solved, setSolved] = useState(false)
  const [busy, setBusy] = useState(false)
  const [phpResult, setPhpResult] = useState<PhpResult | null>(null)
  const previewRef = useRef<PreviewHandle>(null)
  const slot = useId().replace(/[^a-zA-Z0-9]/g, '')
  const alreadySolved = !!useProgress().solved[spec.id]

  const isMarkup = spec.lang === 'html' || spec.lang === 'css'

  const check = useCallback(async () => {
    setBusy(true)
    try {
      const results: Verdict[] = []
      if (isMarkup) {
        const doc = previewRef.current?.doc()
        for (const c of spec.checks) {
          results.push({ label: c.label, ok: runDomCheck(c, doc ?? null, spec.lang === 'css' ? css : code) })
        }
      } else if (spec.lang === 'php') {
        const result = await runPhp(code, { scriptName: `challenge-${slot}.php`, post: spec.post })
        setPhpResult(result)
        for (const c of spec.checks) {
          results.push({ label: c.label, ok: runOutputCheck(c, result.output, code) })
        }
      } else if (spec.lang === 'sql') {
        const out = await runSqlViaPhp(code, 'practice')
        const last = out.filter((o) => o.kind === 'select').pop() ?? out[out.length - 1]
        for (const c of spec.checks) {
          results.push({ label: c.label, ok: runSqlCheck(c, last, code) })
        }
      }
      setVerdicts(results)
      if (results.length && results.every((r) => r.ok)) {
        setSolved(true)
        progress.markSolved(spec.id)
      } else {
        setSolved(false)
      }
    } finally {
      setBusy(false)
    }
  }, [code, css, isMarkup, spec, slot])

  const passed = verdicts?.filter((v) => v.ok).length ?? 0

  return (
    <section className="not-prose bleed my-9 overflow-hidden rounded-2xl border-2 border-rule-strong bg-surface shadow-md">
      <header className="flex flex-wrap items-center gap-3 border-b border-rule bg-brand px-4 py-3 text-brand-on">
        <Target className="size-4 shrink-0" strokeWidth={2.2} />
        <span className="font-display text-[1.02rem] font-semibold">{spec.title}</span>
        {(solved || alreadySolved) && (
          <span className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-[color-mix(in_oklab,var(--ok)_35%,transparent)] px-2.5 py-0.5 font-mono text-[0.68rem] tracking-wide uppercase">
            <Check className="size-3" strokeWidth={3} />
            Solved
          </span>
        )}
      </header>

      <div className="border-b border-rule px-4 py-3.5 sm:px-5">
        <p className="text-[0.95rem] leading-relaxed text-ink-2">{rich(spec.brief)}</p>
      </div>

      <div className={cn('grid', isMarkup && 'lg:grid-cols-2 lg:divide-x lg:divide-rule')}>
        <div className="min-w-0">
          {spec.lang === 'css' && (
            <>
              <PaneLabel>index.html — read only</PaneLabel>
              <Editor key={`html-${resetKey}`} value={code} lang="html" height={140} readOnly />
              <PaneLabel>style.css — your work</PaneLabel>
              <Editor key={`css-${resetKey}`} value={css} onChange={setCss} lang="css" height={200} />
            </>
          )}
          {spec.lang !== 'css' && (
            <>
              <PaneLabel>
                {spec.lang === 'php' ? 'solution.php' : spec.lang === 'sql' ? 'query.sql' : 'index.html'}
              </PaneLabel>
              <Editor key={resetKey} value={code} onChange={setCode} lang={spec.lang} height={280} />
            </>
          )}
        </div>

        {isMarkup && (
          <div className="min-w-0 border-t border-rule lg:border-t-0">
            <PaneLabel>Your page</PaneLabel>
            <div className="bg-white">
              <Preview
                key={resetKey}
                ref={previewRef}
                html={spec.lang === 'css' ? code : code}
                css={spec.lang === 'css' ? css : undefined}
                minHeight={340}
              />
            </div>
          </div>
        )}
      </div>

      {!isMarkup && phpResult && (
        <div className="border-t border-rule">
          <PaneLabel>Output</PaneLabel>
          <PhpEngineGate>
            <PhpOutput result={phpResult} minHeight={120} />
          </PhpEngineGate>
        </div>
      )}

      {verdicts && (
        <ul className="anim-rise divide-y divide-rule border-t border-rule">
          {verdicts.map((v, i) => (
            <li key={i} className="flex items-start gap-2.5 px-4 py-2.5 sm:px-5">
              <span
                className={cn(
                  'mt-0.5 grid size-[18px] shrink-0 place-items-center rounded-full',
                  v.ok ? 'bg-ok text-white' : 'bg-bad-tint text-bad',
                )}
              >
                {v.ok ? <Check className="size-3" strokeWidth={3.4} /> : <X className="size-3" strokeWidth={3.4} />}
              </span>
              <span className={cn('text-[0.9rem]', v.ok ? 'text-ink-2' : 'text-ink')}>{v.label}</span>
            </li>
          ))}
        </ul>
      )}

      {solved && (
        <div className="anim-rise flex items-center gap-2.5 border-t border-ok/30 bg-ok-tint px-4 py-3 sm:px-5">
          <Sparkles className="size-4 shrink-0 text-ok" strokeWidth={2.2} />
          <p className="text-[0.92rem] font-medium text-ok">
            All checks pass. That is exactly the markup the question wanted.
          </p>
        </div>
      )}

      {hintsShown > 0 && (
        <ul className="space-y-2 border-t border-rule bg-accent-tint/50 px-4 py-3 sm:px-5">
          {spec.hints.slice(0, hintsShown).map((h, i) => (
            <li key={i} className="flex items-start gap-2.5 text-[0.9rem] leading-relaxed text-ink-2">
              <Lightbulb className="mt-0.5 size-4 shrink-0 text-accent" strokeWidth={2} />
              <span>{rich(h)}</span>
            </li>
          ))}
        </ul>
      )}

      <footer className="flex flex-wrap items-center gap-2 border-t border-rule bg-surface-sunk px-4 py-3 sm:px-5">
        <Button variant="primary" onClick={() => void check()} disabled={busy}>
          {busy ? <Spinner className="size-4" /> : <Check className="size-4" strokeWidth={2.4} />}
          Check my work
        </Button>
        {hintsShown < spec.hints.length && (
          <Button variant="secondary" onClick={() => setHintsShown((n) => n + 1)}>
            <Lightbulb className="size-4" strokeWidth={2} />
            {hintsShown === 0 ? 'Need a hint?' : 'Another hint'}
          </Button>
        )}
        {verdicts && !solved && (
          <Button
            variant="ghost"
            onClick={() => {
              setCode(spec.solution)
              if (spec.solutionCss) setCss(spec.solutionCss)
              remountPanes()
              setVerdicts(null)
            }}
          >
            Show one solution
          </Button>
        )}
        <span className="ml-auto font-mono text-[0.72rem] text-ink-3 tabular-nums">
          {verdicts ? `${passed} / ${verdicts.length} checks` : `${spec.checks.length} checks`}
        </span>
      </footer>
    </section>
  )
}

function PaneLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="border-b border-rule px-3.5 py-1.5 font-mono text-[0.68rem] tracking-[0.1em] text-ink-3 uppercase">
      {children}
    </p>
  )
}

/* ── Check runners ─────────────────────────────────────────── */

function norm(s: string | null | undefined) {
  return (s ?? '').replace(/\s+/g, ' ').trim().toLowerCase()
}

function runDomCheck(c: CheckSpec, doc: Document | null, source: string): boolean {
  if (c.kind === 'source') {
    const re = new RegExp(c.pattern, c.flags ?? 'i')
    const hit = re.test(source)
    return c.not ? !hit : hit
  }
  if (!doc) return false
  try {
    switch (c.kind) {
      case 'selector': {
        const n = doc.querySelectorAll(c.selector).length
        if (c.min !== undefined && n < c.min) return false
        if (c.max !== undefined && n > c.max) return false
        if (c.min === undefined && c.max === undefined && n === 0) return false
        return true
      }
      case 'text': {
        const el = doc.querySelector(c.selector)
        if (!el) return false
        const t = norm(el.textContent)
        if (c.equals !== undefined) return t === norm(c.equals)
        if (c.contains !== undefined) return t.includes(norm(c.contains))
        return t.length > 0
      }
      case 'attr': {
        const el = doc.querySelector(c.selector)
        if (!el) return false
        const v = el.getAttribute(c.attr)
        if (v === null) return false
        if (c.equals !== undefined) return norm(v) === norm(c.equals)
        if (c.contains !== undefined) return norm(v).includes(norm(c.contains))
        return true
      }
      case 'style': {
        const el = doc.querySelector(c.selector)
        if (!el) return false
        const view = doc.defaultView
        if (!view) return false
        const v = view.getComputedStyle(el).getPropertyValue(c.prop)
        if (c.equals !== undefined) return norm(v) === norm(c.equals)
        if (c.contains !== undefined) return norm(v).includes(norm(c.contains))
        return norm(v).length > 0
      }
      default:
        return false
    }
  } catch {
    return false
  }
}

function runOutputCheck(c: CheckSpec, output: string, source: string): boolean {
  if (c.kind === 'source') {
    const re = new RegExp(c.pattern, c.flags ?? 'i')
    const hit = re.test(source)
    return c.not ? !hit : hit
  }
  if (c.kind === 'output') {
    const plain = output.replace(/<[^>]*>/g, ' ')
    let hit = true
    if (c.contains !== undefined) hit = norm(plain).includes(norm(c.contains))
    if (c.pattern !== undefined) hit = new RegExp(c.pattern, c.flags ?? 'i').test(output)
    return c.not ? !hit : hit
  }
  return false
}

function runSqlCheck(
  c: CheckSpec,
  outcome: { columns: string[]; rows: string[][]; kind: string } | undefined,
  source: string,
): boolean {
  if (c.kind === 'source') {
    const re = new RegExp(c.pattern, c.flags ?? 'i')
    const hit = re.test(source)
    return c.not ? !hit : hit
  }
  if (c.kind === 'rows') {
    if (!outcome) return false
    if (c.count !== undefined && outcome.rows.length !== c.count) return false
    if (c.minCount !== undefined && outcome.rows.length < c.minCount) return false
    if (c.hasColumns && !c.hasColumns.every((col) => outcome.columns.some((x) => norm(x) === norm(col))))
      return false
    if (c.cellEquals) {
      const ci = outcome.columns.findIndex((x) => norm(x) === norm(c.cellEquals!.col))
      if (ci === -1) return false
      const cell = outcome.rows[c.cellEquals.row]?.[ci]
      if (norm(cell) !== norm(c.cellEquals.value)) return false
    }
    return true
  }
  return false
}

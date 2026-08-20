import { useEffect, useRef, useState } from 'react'
import { Globe, Play, RotateCcw } from 'lucide-react'
import { WidgetFrame } from './WidgetFrame'
import { Button } from '../ui'
import { cn } from '../../lib/cn'
import { rich } from '../../lib/rich'

const FLOW = [
  {
    title: 'The user enters a domain name',
    detail: 'They type `vidyacollege.lk` into the browser. That name is the unique address used to locate the site.',
    wire: 'vidyacollege.lk',
  },
  {
    title: 'DNS resolves the domain name',
    detail: 'The browser asks the **Domain Name System** to translate the name into the IP address of the server that holds the site.',
    wire: '→ 203.0.113.42',
  },
  {
    title: 'The browser sends an HTTP/HTTPS request',
    detail: 'Now that it has an IP address it can ask the server directly. HTTPS encrypts the conversation on the way.',
    wire: 'GET / HTTP/1.1',
  },
  {
    title: 'The web server processes the request',
    detail: 'It retrieves the required files — or, for a dynamic site, runs PHP and queries the database to **generate** the content.',
    wire: 'index.php → PHP → MySQL',
  },
  {
    title: 'The content is sent back',
    detail: 'Once processing is complete the server sends the finished content back as a response.',
    wire: '200 OK · text/html',
  },
  {
    title: 'The browser renders the website',
    detail: 'It interprets the received data and displays the page in a readable, interactive form.',
    wire: 'painted on screen',
  },
]

export function HostingFlowWidget() {
  const [step, setStep] = useState(-1)
  const [playing, setPlaying] = useState(false)
  const timer = useRef<number | null>(null)

  useEffect(() => {
    if (!playing) return
    if (step >= FLOW.length - 1) {
      setPlaying(false)
      return
    }
    timer.current = window.setTimeout(() => setStep((s) => s + 1), step < 0 ? 250 : 1300)
    return () => {
      if (timer.current) window.clearTimeout(timer.current)
    }
  }, [playing, step])

  return (
    <WidgetFrame
      title="From typed name to painted page"
      hint="This is the whole logical flow of web hosting. Every one of the six steps is examinable — and every one of them is a place a slow site can go wrong."
      toolbar={
        <>
          {step >= 0 && (
            <Button size="sm" variant="ghost" onClick={() => { setPlaying(false); setStep(-1) }}>
              <RotateCcw className="size-3.5" strokeWidth={2} />
              Reset
            </Button>
          )}
          <Button size="sm" variant="primary" disabled={playing} onClick={() => { setStep(-1); setPlaying(true) }}>
            <Play className="size-3.5" strokeWidth={2.4} />
            {step >= 0 ? 'Play again' : 'Visit the site'}
          </Button>
        </>
      }
    >
      <div className="px-4 py-5 sm:px-6">
        <div className="mb-5 flex items-center gap-2 rounded-xl border border-rule bg-surface-sunk px-3.5 py-2.5">
          <Globe className="size-4 shrink-0 text-ink-3" strokeWidth={1.9} />
          <code className="min-w-0 flex-1 truncate font-mono text-[0.84rem] text-ink">
            {step >= 0 ? FLOW[step].wire : 'https://vidyacollege.lk'}
          </code>
          {step >= 0 && (
            <span className="shrink-0 font-mono text-[0.68rem] text-accent tabular-nums">
              step {step + 1} of {FLOW.length}
            </span>
          )}
        </div>

        <ol className="space-y-1.5">
          {FLOW.map((f, i) => (
            <li
              key={i}
              className={cn(
                'flex gap-3 rounded-lg px-3 py-2.5 transition-all duration-300',
                i === step ? 'bg-brand-tint' : i < step ? 'opacity-55' : 'opacity-35',
              )}
            >
              <span
                className={cn(
                  'mt-[1px] grid size-[22px] shrink-0 place-items-center rounded-md font-mono text-[0.68rem] font-semibold tabular-nums',
                  i === step ? 'bg-accent text-accent-on' : 'bg-surface-sunk text-ink-3',
                )}
              >
                {i + 1}
              </span>
              <span className="min-w-0">
                <span className="block text-[0.92rem] font-medium text-ink">{f.title}</span>
                <span className="block text-[0.85rem] leading-relaxed text-ink-2">
                  {rich(f.detail)}
                </span>
              </span>
            </li>
          ))}
        </ol>
      </div>
    </WidgetFrame>
  )
}

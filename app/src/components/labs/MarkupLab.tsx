import { useState } from 'react'
import { Editor } from '../blocks/Editor'
import { Preview } from '../blocks/Preview'
import { CopyButton } from '../blocks/CodePanel'
import { LabFrame } from './LabFrame'

/** HTML on the left, the browser's honest rendering on the right. */
export function HtmlLab({
  html: initial,
  height = 260,
  title,
  note,
}: {
  html: string
  height?: number
  title?: string
  note?: string
}) {
  const [code, setCode] = useState(initial)
  return (
    <LabFrame
      title={title ?? 'Edit the HTML — the page updates as you type'}
      note={note}
      onReset={() => setCode(initial)}
      toolbar={
        <span className="text-[var(--code-dim)]">
          <CopyButton text={code} />
        </span>
      }
      panes={[
        {
          label: 'index.html',
          content: <Editor value={code} onChange={setCode} lang="html" height={height} />,
        },
        {
          label: 'What the browser shows',
          content: (
            <div className="h-full bg-white" style={{ minHeight: height }}>
              <Preview html={code} minHeight={height} />
            </div>
          ),
        },
      ]}
    />
  )
}

/** Markup and stylesheet as separate files, because that is how CSS is taught. */
export function CssLab({
  html: initialHtml,
  css: initialCss,
  height = 260,
  title,
  note,
  hideHtml = false,
}: {
  html: string
  css: string
  height?: number
  title?: string
  note?: string
  hideHtml?: boolean
}) {
  const [html, setHtml] = useState(initialHtml)
  const [css, setCss] = useState(initialCss)

  const panes = [
    ...(hideHtml
      ? []
      : [
          {
            label: 'index.html',
            content: <Editor value={html} onChange={setHtml} lang="html" height={height} />,
          },
        ]),
    {
      label: 'style.css',
      content: <Editor value={css} onChange={setCss} lang="css" height={height} />,
    },
    {
      label: 'Result',
      grow: true,
      content: (
        <div className="h-full bg-white" style={{ minHeight: height }}>
          <Preview html={html} css={css} minHeight={height} />
        </div>
      ),
    },
  ]

  return (
    <LabFrame
      title={title ?? 'Change the CSS and watch the page respond'}
      note={note}
      onReset={() => {
        setHtml(initialHtml)
        setCss(initialCss)
      }}
      toolbar={
        <span className="text-[var(--code-dim)]">
          <CopyButton text={css} label="Copy CSS" />
        </span>
      }
      panes={panes}
    />
  )
}

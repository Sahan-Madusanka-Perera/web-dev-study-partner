import { useCallback, useMemo, useState } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { EditorView } from '@codemirror/view'
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language'
import { tags as t } from '@lezer/highlight'
import { html } from '@codemirror/lang-html'
import { css } from '@codemirror/lang-css'
import { php } from '@codemirror/lang-php'
import { sql, MySQL } from '@codemirror/lang-sql'
import { javascript } from '@codemirror/lang-javascript'
import type { Lang } from '../../types/content'

/* One highlight style, driven by the same CSS variables the static code
   blocks use, so a sample and the editor beside it never disagree. */
const studioHighlight = HighlightStyle.define([
  { tag: [t.comment, t.lineComment, t.blockComment], color: 'var(--syn-comment)', fontStyle: 'italic' },
  { tag: [t.string, t.special(t.string), t.attributeValue], color: 'var(--syn-string)' },
  { tag: [t.number, t.bool, t.null, t.color], color: 'var(--syn-number)' },
  { tag: [t.keyword, t.controlKeyword, t.moduleKeyword, t.operatorKeyword], color: 'var(--syn-kw)' },
  { tag: [t.tagName, t.standard(t.tagName), t.angleBracket], color: 'var(--syn-tag)' },
  { tag: [t.attributeName, t.propertyName, t.definition(t.propertyName)], color: 'var(--syn-attr)' },
  { tag: [t.variableName, t.special(t.variableName)], color: 'var(--syn-var)' },
  { tag: [t.function(t.variableName), t.function(t.propertyName), t.labelName], color: 'var(--syn-fn)' },
  { tag: [t.className, t.typeName, t.namespace], color: 'var(--syn-fn)' },
  { tag: [t.operator, t.punctuation, t.separator, t.bracket], color: 'var(--syn-punct)' },
  { tag: [t.atom, t.constant(t.variableName)], color: 'var(--syn-number)' },
  { tag: t.invalid, color: '#ff8080' },
])

const baseTheme = EditorView.theme({
  '&': { backgroundColor: 'var(--code-bg)', color: 'var(--code-ink)' },
  '.cm-content': { fontFamily: 'var(--font-mono)' },
})

function extensionsFor(lang: Lang) {
  switch (lang) {
    case 'html':
      return [html({ matchClosingTags: true, autoCloseTags: true })]
    case 'css':
      return [css()]
    case 'php':
      return [php({ plain: false })]
    case 'sql':
      return [sql({ dialect: MySQL, upperCaseKeywords: true })]
    case 'js':
      return [javascript()]
    default:
      return []
  }
}

/**
 * A remount key for an editor whose code is replaced programmatically —
 * Reset, or "Show one solution".
 *
 * CodeMirror is controlled through its `value` prop, but the wrapper defers
 * external value changes while the student is mid-keystroke. Press Reset in
 * the second after typing and the change is swallowed: React state holds the
 * starting code while the editor still shows the edit, and because the state
 * is already correct no later render re-syncs them — every further press of
 * Reset does nothing. Bumping the key rebuilds the document outright.
 */
export function useEditorReset() {
  const [key, setKey] = useState(0)
  return [key, useCallback(() => setKey((n) => n + 1), [])] as const
}

export function Editor({
  value,
  onChange,
  lang,
  height,
  readOnly = false,
  ariaLabel,
}: {
  value: string
  onChange?: (next: string) => void
  lang: Lang
  height?: number | string
  readOnly?: boolean
  ariaLabel?: string
}) {
  const extensions = useMemo(
    () => [
      ...extensionsFor(lang),
      syntaxHighlighting(studioHighlight),
      baseTheme,
      EditorView.lineWrapping,
    ],
    [lang],
  )

  return (
    <CodeMirror
      value={value}
      onChange={onChange}
      extensions={extensions}
      readOnly={readOnly}
      height={typeof height === 'number' ? `${height}px` : height}
      basicSetup={{
        lineNumbers: true,
        foldGutter: false,
        highlightActiveLine: !readOnly,
        highlightActiveLineGutter: !readOnly,
        autocompletion: false,
        searchKeymap: false,
        bracketMatching: true,
        closeBrackets: true,
        indentOnInput: true,
        tabSize: 2,
      }}
      aria-label={ariaLabel ?? `${lang} editor`}
      theme="none"
    />
  )
}

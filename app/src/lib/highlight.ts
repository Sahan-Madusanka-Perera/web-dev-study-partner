/* A small, dependency-free tokenizer for the five languages this
   course teaches. Lessons contain hundreds of static code samples;
   spinning up an editor for each one would be wasteful, and a full
   grammar would be overkill. This is scoped exactly to the syllabus. */

import type { Lang } from '../types/content'

export type Tok = { t: string; c: Cls }
export type Cls =
  | 'plain'
  | 'comment'
  | 'tag'
  | 'attr'
  | 'string'
  | 'number'
  | 'kw'
  | 'fn'
  | 'var'
  | 'punct'
  | 'prop'
  | 'sel'
  | 'entity'

type Rule = [RegExp, Cls | ((m: RegExpExecArray) => Tok[])]

function scan(src: string, rules: Rule[]): Tok[] {
  const out: Tok[] = []
  let i = 0
  let buf = ''
  outer: while (i < src.length) {
    for (const [re, cls] of rules) {
      re.lastIndex = i
      const m = re.exec(src)
      if (m && m.index === i && m[0].length) {
        if (buf) {
          out.push({ t: buf, c: 'plain' })
          buf = ''
        }
        if (typeof cls === 'function') out.push(...cls(m))
        else out.push({ t: m[0], c: cls })
        i += m[0].length
        continue outer
      }
    }
    buf += src[i]
    i++
  }
  if (buf) out.push({ t: buf, c: 'plain' })
  return out
}

const HTML_ATTR = /([a-zA-Z-:]+)(\s*=\s*)("[^"]*"|'[^']*'|[^\s>]+)?/y

function htmlTagInner(inner: string): Tok[] {
  const out: Tok[] = []
  let i = 0
  while (i < inner.length) {
    HTML_ATTR.lastIndex = i
    const m = HTML_ATTR.exec(inner)
    if (m && m.index === i) {
      out.push({ t: m[1], c: 'attr' })
      if (m[2]) out.push({ t: m[2], c: 'punct' })
      if (m[3]) out.push({ t: m[3], c: 'string' })
      i += m[0].length
      continue
    }
    out.push({ t: inner[i], c: 'plain' })
    i++
  }
  return out
}

const htmlRules: Rule[] = [
  [/<!--[\s\S]*?-->/y, 'comment'],
  [/<!DOCTYPE[^>]*>/iy, 'kw'],
  [
    /(<\/?)([a-zA-Z][\w-]*)([^>]*?)(\/?>)/y,
    (m) => [
      { t: m[1], c: 'punct' as Cls },
      { t: m[2], c: 'tag' as Cls },
      ...htmlTagInner(m[3]),
      { t: m[4], c: 'punct' as Cls },
    ],
  ],
  [/&[a-zA-Z]+;|&#\d+;/y, 'entity'],
]

const CSS_KW = /@[a-zA-Z-]+/y
const cssRules: Rule[] = [
  [/\/\*[\s\S]*?\*\//y, 'comment'],
  [CSS_KW, 'kw'],
  [/"[^"]*"|'[^']*'/y, 'string'],
  [
    /([-a-zA-Z]+)(\s*:\s*)/y,
    (m) => [
      { t: m[1], c: 'prop' as Cls },
      { t: m[2], c: 'punct' as Cls },
    ],
  ],
  [/#[0-9a-fA-F]{3,8}\b/y, 'number'],
  [/\b\d+(\.\d+)?(px|rem|em|%|vh|vw|vmin|vmax|ch|ex|cm|mm|in|pt|pc|s|ms|deg|fr)?\b/y, 'number'],
  [/[{};,]/y, 'punct'],
  [/\b(url|rgb|rgba|hsl|hsla|calc|var)(?=\()/y, 'fn'],
]

/** Selectors only make sense at the start of a rule, so pre-split on braces. */
function highlightCss(src: string): Tok[] {
  const out: Tok[] = []
  let rest = src
  while (rest.length) {
    const brace = rest.indexOf('{')
    if (brace === -1) {
      out.push(...scan(rest, cssRules))
      break
    }
    const head = rest.slice(0, brace)
    const commentSafe = /\/\*/.test(head)
    if (commentSafe) out.push(...scan(head, cssRules))
    else {
      const at = head.match(/^\s*@/)
      out.push(...(at ? scan(head, cssRules) : [{ t: head, c: 'sel' as Cls }]))
    }
    const close = rest.indexOf('}', brace)
    const bodyEnd = close === -1 ? rest.length : close + 1
    out.push({ t: '{', c: 'punct' })
    out.push(...scan(rest.slice(brace + 1, bodyEnd - 1), cssRules))
    if (close !== -1) out.push({ t: '}', c: 'punct' })
    rest = rest.slice(bodyEnd)
  }
  return out
}

const PHP_KEYWORDS =
  /\b(abstract|and|array|as|break|callable|case|catch|class|clone|const|continue|declare|default|do|echo|else|elseif|empty|enddeclare|endfor|endforeach|endif|endswitch|endwhile|enum|extends|final|finally|fn|for|foreach|function|global|goto|if|implements|include|include_once|instanceof|insteadof|interface|isset|list|match|namespace|new|or|print|private|protected|public|readonly|require|require_once|return|static|switch|throw|trait|try|unset|use|var|while|xor|yield|true|false|null|TRUE|FALSE|NULL|int|string|bool|float)\b/y

const phpInnerRules: Rule[] = [
  [/\/\*[\s\S]*?\*\//y, 'comment'],
  [/\/\/[^\n]*/y, 'comment'],
  [/#[^\n]*/y, 'comment'],
  [/"(\\.|[^"\\])*"/y, 'string'],
  [/'(\\.|[^'\\])*'/y, 'string'],
  [/\$[a-zA-Z_]\w*/y, 'var'],
  [PHP_KEYWORDS, 'kw'],
  [/\b[a-zA-Z_]\w*(?=\s*\()/y, 'fn'],
  [/\b\d+(\.\d+)?\b/y, 'number'],
  [/(->|=>|::|[+\-*/%.=<>!&|?:;,(){}[\]])/y, 'punct'],
]

function highlightPhp(src: string): Tok[] {
  const out: Tok[] = []
  let i = 0
  while (i < src.length) {
    const open = src.indexOf('<?php', i)
    const openShort = src.indexOf('<?=', i)
    const start = open === -1 ? openShort : openShort === -1 ? open : Math.min(open, openShort)
    if (start === -1) {
      out.push(...scan(src.slice(i), htmlRules))
      break
    }
    if (start > i) out.push(...scan(src.slice(i, start), htmlRules))
    const tagLen = src.startsWith('<?php', start) ? 5 : 3
    out.push({ t: src.slice(start, start + tagLen), c: 'kw' })
    const close = src.indexOf('?>', start + tagLen)
    const end = close === -1 ? src.length : close
    out.push(...scan(src.slice(start + tagLen, end), phpInnerRules))
    if (close !== -1) {
      out.push({ t: '?>', c: 'kw' })
      i = close + 2
    } else break
  }
  return out
}

const SQL_KW =
  /\b(SELECT|FROM|WHERE|INSERT|INTO|VALUES|UPDATE|SET|DELETE|CREATE|TABLE|DATABASE|DROP|ALTER|ADD|MODIFY|RENAME|INDEX|PRIMARY|KEY|FOREIGN|REFERENCES|NOT|NULL|DEFAULT|AUTO_INCREMENT|UNSIGNED|ORDER|BY|GROUP|HAVING|LIMIT|OFFSET|JOIN|INNER|LEFT|RIGHT|OUTER|ON|AS|AND|OR|IN|LIKE|BETWEEN|IS|DISTINCT|COUNT|SUM|AVG|MIN|MAX|ASC|DESC|USE|SHOW|TABLES|DATABASES|DESCRIBE|DESC|UNIQUE|IF|EXISTS|VARCHAR|CHAR|INT|INTEGER|SMALLINT|BIGINT|TINYINT|DECIMAL|FLOAT|DOUBLE|DATE|DATETIME|TIME|TEXT|BLOB|BOOLEAN|BINARY|VARBINARY)\b/iy

const sqlRules: Rule[] = [
  [/--[^\n]*/y, 'comment'],
  [/\/\*[\s\S]*?\*\//y, 'comment'],
  [/'(\\.|[^'\\])*'/y, 'string'],
  [/"(\\.|[^"\\])*"/y, 'string'],
  [/`[^`]*`/y, 'attr'],
  [SQL_KW, 'kw'],
  [/\b\d+(\.\d+)?\b/y, 'number'],
  [/[(),;*=<>!]/y, 'punct'],
]

const jsRules: Rule[] = [
  [/\/\*[\s\S]*?\*\//y, 'comment'],
  [/\/\/[^\n]*/y, 'comment'],
  [/"(\\.|[^"\\])*"|'(\\.|[^'\\])*'|`(\\.|[^`\\])*`/y, 'string'],
  [
    /\b(const|let|var|function|return|if|else|for|while|of|in|new|class|extends|import|from|export|default|async|await|try|catch|typeof|true|false|null|undefined)\b/y,
    'kw',
  ],
  [/\b[a-zA-Z_$][\w$]*(?=\s*\()/y, 'fn'],
  [/\b\d+(\.\d+)?\b/y, 'number'],
  [/(=>|[+\-*/%.=<>!&|?:;,(){}[\]])/y, 'punct'],
]

export function highlight(code: string, lang: Lang): Tok[] {
  switch (lang) {
    case 'html':
      return scan(code, htmlRules)
    case 'css':
      return highlightCss(code)
    case 'php':
      return highlightPhp(code)
    case 'sql':
      return scan(code, sqlRules)
    case 'js':
      return scan(code, jsRules)
    default:
      return [{ t: code, c: 'plain' }]
  }
}

export const TOK_CLASS: Record<Cls, string> = {
  plain: 'text-[var(--code-ink)]',
  comment: 'text-[var(--syn-comment)] italic',
  tag: 'text-[var(--syn-tag)]',
  attr: 'text-[var(--syn-attr)]',
  string: 'text-[var(--syn-string)]',
  number: 'text-[var(--syn-number)]',
  kw: 'text-[var(--syn-kw)]',
  fn: 'text-[var(--syn-fn)]',
  var: 'text-[var(--syn-var)]',
  punct: 'text-[var(--syn-punct)]',
  prop: 'text-[var(--syn-attr)]',
  sel: 'text-[var(--syn-tag)]',
  entity: 'text-[var(--syn-number)]',
}

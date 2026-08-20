/* ─────────────────────────────────────────────────────────────
   The course content model.

   Lessons are data, not markup. Every lesson is an array of
   blocks; every block knows how to render and, where relevant,
   how to run. That keeps 60+ lessons consistent and lets one
   change to a block improve the whole course at once.
   ───────────────────────────────────────────────────────────── */

export type Lang = 'html' | 'css' | 'php' | 'sql' | 'js' | 'text'

/** Very small inline markup used inside prose strings:
 *  **bold**  *italic*  `code`  [label](href)  ~~strike~~  ==mark== */
export type RichText = string

// ── Quiz ──────────────────────────────────────────────────────

export type Question =
  | { kind: 'mcq'; q: RichText; code?: string; codeLang?: Lang; options: RichText[]; answer: number; why: RichText }
  | { kind: 'multi'; q: RichText; code?: string; codeLang?: Lang; options: RichText[]; answers: number[]; why: RichText }
  | { kind: 'tf'; q: RichText; answer: boolean; why: RichText }
  | { kind: 'fill'; q: RichText; before?: string; after?: string; accept: string[]; why: RichText; placeholder?: string }
  | { kind: 'order'; q: RichText; items: string[]; why: RichText }
  | { kind: 'match'; q: RichText; pairs: { left: string; right: string }[]; why: RichText }

// ── Auto-checked coding challenges ────────────────────────────

export type Check =
  /** Rendered document must contain N elements matching a CSS selector. */
  | { kind: 'selector'; selector: string; min?: number; max?: number; label: string }
  /** Text content of the first match (trimmed, case-insensitive) must equal / contain. */
  | { kind: 'text'; selector: string; equals?: string; contains?: string; label: string }
  /** An attribute of the first match must equal / contain / exist. */
  | { kind: 'attr'; selector: string; attr: string; equals?: string; contains?: string; label: string }
  /** Computed style of the first match. */
  | { kind: 'style'; selector: string; prop: string; equals?: string; contains?: string; label: string }
  /** Raw source must match a regular expression. */
  | { kind: 'source'; pattern: string; flags?: string; label: string; not?: boolean }
  /** Program output (PHP) must contain / match. */
  | { kind: 'output'; contains?: string; pattern?: string; flags?: string; label: string; not?: boolean }
  /** SQL result-set shape check. */
  | { kind: 'rows'; count?: number; minCount?: number; hasColumns?: string[]; cellEquals?: { row: number; col: string; value: string }; label: string }

export interface ChallengeSpec {
  id: string
  title: string
  brief: RichText
  lang: Lang
  /** For html/css challenges the css pane is separate. */
  starter: string
  starterCss?: string
  /** For php challenges that post to themselves. */
  post?: Record<string, string>
  hints: RichText[]
  solution: string
  solutionCss?: string
  checks: Check[]
}

// ── Labs (live, editable, runnable surfaces) ──────────────────

export type LabSpec =
  | { lab: 'html'; html: string; height?: number; title?: string; note?: RichText }
  | { lab: 'css'; html: string; css: string; height?: number; title?: string; note?: RichText; hideHtml?: boolean }
  | { lab: 'php'; code: string; height?: number; title?: string; note?: RichText; autoRun?: boolean }
  | { lab: 'form'; formHtml: string; handler: string; height?: number; title?: string; note?: RichText; method?: 'GET' | 'POST' }
  | { lab: 'sql'; sql: string; seed?: string; height?: number; title?: string; note?: RichText }
  | { lab: 'phpdb'; code: string; height?: number; title?: string; note?: RichText }

// ── Purpose-built explainers ──────────────────────────────────

export type WidgetName =
  | 'client-server'
  | 'request-response'
  | 'web-objects'
  | 'url-anatomy'
  | 'site-planner'
  | 'tag-explorer'
  | 'colour-mixer'
  | 'table-spans'
  | 'path-explorer'
  | 'box-model'
  | 'selector-lab'
  | 'cascade-lab'
  | 'units-lab'
  | 'link-states'
  | 'get-vs-post'
  | 'php-flow'
  | 'hosting-flow'

export interface WidgetSpec {
  widget: WidgetName
}

// ── Blocks ────────────────────────────────────────────────────

export type Block =
  | { b: 'h2'; text: string }
  | { b: 'h3'; text: string }
  | { b: 'p'; text: RichText }
  | { b: 'lead'; text: RichText }
  | { b: 'ul'; items: RichText[]; tight?: boolean }
  | { b: 'ol'; items: RichText[]; start?: number }
  | { b: 'dl'; items: { term: string; desc: RichText }[] }
  | { b: 'code'; lang: Lang; code: string; filename?: string; caption?: RichText; highlight?: number[] }
  | { b: 'result'; html?: string; text?: string; caption?: RichText; label?: string }
  | { b: 'codeResult'; lang: Lang; code: string; filename?: string; resultHtml?: string; resultText?: string; caption?: RichText }
  | { b: 'note'; tone: 'note' | 'tip' | 'warn' | 'exam' | 'syllabus' | 'history'; title?: string; text: RichText }
  | { b: 'table'; head: string[]; rows: RichText[][]; caption?: RichText; compact?: boolean; firstColHead?: boolean }
  | { b: 'compare'; left: { title: string; items: RichText[] }; right: { title: string; items: RichText[] } }
  | { b: 'steps'; items: { title: string; text: RichText; code?: string; lang?: Lang }[] }
  | { b: 'tagref'; items: { tag: string; what: RichText; attrs?: { name: string; what: RichText }[] }[] }
  | { b: 'keyvals'; title?: string; items: { k: string; v: RichText }[] }
  | { b: 'lab'; spec: LabSpec }
  | { b: 'widget'; spec: WidgetSpec }
  | { b: 'quiz'; title?: string; questions: Question[] }
  | { b: 'challenge'; spec: ChallengeSpec }
  | { b: 'recap'; items: RichText[] }
  | { b: 'divider' }

// ── Lessons & modules ─────────────────────────────────────────

export interface Lesson {
  id: string
  slug: string
  title: string
  /** One sentence shown in listings and at the top of the lesson. */
  summary: string
  /** Learning outcomes, straight from the NIE competency levels. */
  outcomes: string[]
  minutes: number
  blocks: Block[]
}

export interface Module {
  id: string
  slug: string
  /** e.g. "10.3" */
  competency: string
  index: number
  title: string
  /** What the student can do at the end. */
  promise: string
  blurb: string
  lang: Lang | 'mixed'
  lessons: Lesson[]
}

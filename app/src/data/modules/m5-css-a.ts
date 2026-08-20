import type { Lesson } from '../../types/content'

export const m5LessonsA: Lesson[] = [
  // ── 5.1 ──────────────────────────────────────────────────────
  {
    id: 'm5l1',
    slug: 'why-css-exists',
    title: 'Why CSS exists',
    summary:
      'HTML alone gives you a page that works and looks like 1994. CSS is the layer that separates how a page looks from what it says.',
    minutes: 10,
    outcomes: ['Briefly explains style sheet and its usage'],
    blocks: [
      {
        b: 'lead',
        text: '**CSS — Cascading Style Sheets** — is a stylesheet language used to control the visual presentation of web pages. It defines how HTML elements are displayed across different devices and media. **CSS focuses on presentation, while HTML is responsible for structure and content.**',
      },

      { b: 'h2', text: 'The problem CSS solved' },
      {
        b: 'p',
        text: 'In early web development, HTML was used for **both structure and styling**, through presentational attributes such as `bgcolor`, `align` and the `<font>` tag. That made pages harder and harder to manage as they grew.',
      },
      {
        b: 'p',
        text: 'Think about what that meant in practice. A site with fifty pages, all using `<font color="navy" face="Arial">` on every heading. The principal asks for the colour to change. You now open fifty files and edit hundreds of tags — and miss some.',
      },
      {
        b: 'compare',
        left: {
          title: 'HTML alone',
          items: [
            'Styling repeated on every element, on every page',
            'One change means editing every file',
            'Visually plain and repetitive',
            'Structure and appearance tangled together',
          ],
        },
        right: {
          title: 'HTML + CSS',
          items: [
            'Styling written once, in one place',
            'One change updates the whole site instantly',
            'Full control of colour, spacing, layout and effects',
            'Content stays readable; presentation lives separately',
          ],
        },
      },
      {
        b: 'lab',
        spec: {
          lab: 'css',
          title: 'The same markup, twice',
          html: `<h1>Vidya College</h1>
<p class="lead">Serving students since 1974.</p>
<ul>
  <li>Sports meet on Friday</li>
  <li>Library closes at 4 pm</li>
</ul>`,
          css: `/* Delete everything in this pane and watch the page
   fall back to the browser's own default styling.
   Then press Reset to bring it back. */

body {
  font-family: Georgia, serif;
  margin: 24px;
  color: #2b2b2b;
}

h1 {
  color: #232842;
  border-bottom: 3px solid #c2831c;
  padding-bottom: 6px;
}

.lead {
  font-style: italic;
  color: #6b6b6b;
}

li {
  margin-bottom: 6px;
}`,
          height: 300,
          note: 'The HTML pane never changes. Every difference you see comes from the CSS — that is the separation the whole language exists to provide.',
        },
      },

      { b: 'h2', text: 'What CSS manages' },
      {
        b: 'ul',
        items: [
          'Text and background colours',
          'Fonts and typography',
          'Spacing, alignment and layout',
          'Element sizing and positioning',
          'Visual effects such as borders and shadows',
          'Responsive behaviour for different devices',
        ],
      },
      {
        b: 'p',
        text: 'And crucially, it **maintains consistent styling across multiple pages of a website** — the reason external stylesheets, three lessons from now, are what professionals actually use.',
      },

      { b: 'h2', text: 'A short history' },
      {
        b: 'note',
        tone: 'history',
        title: 'The dates the syllabus mentions',
        text: '**1994** — Håkon Wium Lie proposes CSS. **1996** — the W3C releases **CSS1**: basic styling of colours, fonts and spacing. **1998** — **CSS2** adds media types (screen, print), positioning, and the **box model**. **2004** — **CSS2.1** clarifies and fixes CSS2, becoming the widely adopted standard. **2011** — **CSS3** takes a modular approach with advanced layout and interactivity. **After 2011** — modern CSS brings Flexbox, Grid, responsive layouts and CSS variables.',
      },
      {
        b: 'p',
        text: 'You are only examined on the earlier parts of that story, but it explains why CSS feels like several languages layered on top of one another — because it is.',
      },

      {
        b: 'quiz',
        questions: [
          {
            kind: 'mcq',
            q: 'What is the division of responsibility between HTML and CSS?',
            options: [
              'HTML handles presentation, CSS handles structure',
              'HTML handles structure and content, CSS handles presentation',
              'They both do the same job, but CSS is newer',
              'HTML is for text and CSS is for images',
            ],
            answer: 1,
            why: 'HTML says *what things are*; CSS says *how they look*. Keeping them apart is the reason a site-wide restyle is one file instead of fifty.',
          },
          {
            kind: 'mcq',
            q: 'Who proposed CSS, and in which year?',
            options: [
              'Tim Berners-Lee, 1989',
              'Håkon Wium Lie, 1994',
              'Rasmus Lerdorf, 1994',
              'The W3C, 1996',
            ],
            answer: 1,
            why: 'Håkon Wium Lie proposed it in 1994; the W3C released CSS1 in 1996. Tim Berners-Lee invented the WWW; Rasmus Lerdorf created PHP.',
          },
          {
            kind: 'mcq',
            q: 'Which CSS version introduced the box model and positioning?',
            options: ['CSS1', 'CSS2', 'CSS2.1', 'CSS3'],
            answer: 1,
            why: 'CSS2, in 1998, brought media types, positioning and the box model. CSS2.1 later clarified and fixed CSS2 rather than adding to it.',
          },
          {
            kind: 'tf',
            q: 'A page with no CSS at all will fail to display.',
            answer: false,
            why: 'It displays perfectly well — using the **browser’s own default stylesheet**. It just looks plain. That default is what you saw when you emptied the CSS pane above.',
          },
        ],
      },

      {
        b: 'recap',
        items: [
          'CSS controls presentation; HTML controls structure and content.',
          'Before CSS, styling attributes were repeated across every page and were unmaintainable.',
          'CSS manages colour, typography, spacing, sizing, effects and responsiveness — consistently across a whole site.',
          '1994 proposed by Håkon Wium Lie → CSS1 1996 → CSS2 1998 (box model) → CSS2.1 2004 → CSS3 2011.',
        ],
      },
    ],
  },

  // ── 5.2 ──────────────────────────────────────────────────────
  {
    id: 'm5l2',
    slug: 'three-ways-to-add-css',
    title: 'Three ways to add CSS',
    summary:
      'Inline, internal and external — what each looks like, and why professionals reach for the third.',
    minutes: 14,
    outcomes: ['Inserts CSS in HTML web pages to improve the appearance'],
    blocks: [
      {
        b: 'lead',
        text: 'CSS rules can be integrated into an HTML page in three ways. All three do the same job; they differ in **how much they cover** and **how easy they are to maintain**.',
      },

      { b: 'h2', text: '1. Inline CSS' },
      {
        b: 'p',
        text: 'Styles are applied directly to individual elements using the **`style` attribute**. Inline styles override external and internal CSS, but they are discouraged for maintainability.',
      },
      {
        b: 'codeResult',
        lang: 'html',
        code: `<h1 style="color: red;">Important Message Ahead</h1>

<p style="color: navy; font-size: 18px;">
  Two declarations, separated by a semicolon.
</p>`,
        resultHtml: `<h1 style="color: red;">Important Message Ahead</h1><p style="color: navy; font-size: 18px;">Two declarations, separated by a semicolon.</p>`,
      },
      {
        b: 'note',
        tone: 'warn',
        title: 'Why it is discouraged',
        text: 'Inline styling puts presentation back inside the markup — the exact problem CSS was invented to fix. Every element needs its own copy, and changing the colour of all headings means editing every heading again.',
      },

      { b: 'h2', text: '2. Internal (embedded) CSS' },
      {
        b: 'p',
        text: 'CSS rules are included **within the HTML document**, inside a `<style>` tag located in the `<head>` section. Useful for a single page, or when the styles are specific to that one page.',
      },
      {
        b: 'code',
        lang: 'html',
        code: `<head>
  <style type="text/css">
    body {
      background-color: white;
    }
    p {
      font-size: 10px;
      color: navy;
    }
  </style>
</head>
<body>
  <p>This paragraph is navy and 10 pixels.</p>
</body>`,
      },

      { b: 'h2', text: '3. External CSS' },
      {
        b: 'p',
        text: 'Styles are defined in a **separate `.css` file**, which is linked to the HTML document with a `<link>` element in the `<head>`. This is what real websites use.',
      },
      {
        b: 'code',
        lang: 'html',
        filename: 'index.html',
        code: `<head>
  <link rel="stylesheet"
        type="text/css"
        href="styles/main.css">
</head>`,
      },
      {
        b: 'keyvals',
        title: 'The <link> attributes',
        items: [
          { k: '`<link>`', v: 'Specifies a link to an external resource.' },
          { k: 'rel="stylesheet"', v: 'Defines the **relationship** of the HTML page to the linked file. The two possible values are `stylesheet` and `alternate stylesheet`.' },
          { k: 'type="text/css"', v: 'Specifies the type of the linked resource. Optional in modern HTML, but common in older versions — and expected in the exam.' },
          { k: 'href="location/filename.css"', v: 'Specifies **where** the CSS file is. A relative path, exactly as in Module 4.' },
        ],
      },
      {
        b: 'p',
        text: 'External style sheets have the tremendous advantage of being able to **affect multiple HTML pages simultaneously**. Change any rule, save the file, publish it, and every visitor to every associated page sees the modification at once. That is why they are widely used across the industry.',
      },

      { b: 'h3', text: 'The @import alternative' },
      {
        b: 'p',
        text: 'An external stylesheet can also be pulled in with an `@import` directive inside a `<style>` tag.',
      },
      {
        b: 'code',
        lang: 'html',
        code: `<style>
  @import url("styles/main.css");
</style>`,
      },
      {
        b: 'ul',
        items: [
          '`@import` is a **CSS rule** with a single URL property, written somewhat differently from a standard CSS declaration.',
          'When used with an HTML page, it **must be inside a `<style>` tag**.',
          '`url("styles/main.css")` specifies the folder and the file to be imported.',
          'It can also be used inside one stylesheet to pull in another.',
        ],
      },

      { b: 'h2', text: 'Which to use when' },
      {
        b: 'table',
        head: ['Method', 'Written in', 'Affects', 'Use it when'],
        rows: [
          ['Inline', 'The `style` attribute on one tag', 'That one element', 'Almost never — a one-off override while testing'],
          ['Internal', 'A `<style>` tag in the `<head>`', 'That one page', 'A single page with styling nothing else shares'],
          ['External', 'A separate `.css` file', 'Every page that links it', 'Practically always'],
        ],
      },
      {
        b: 'lab',
        spec: {
          lab: 'html',
          title: 'All three, competing on one page',
          html: `<head>
  <style>
    /* Internal CSS */
    p { color: blue; }
    .special { color: green; }
  </style>
</head>
<body>

  <p>This paragraph is styled by the internal rule.</p>

  <p class="special">This one matches a more specific rule.</p>

  <p style="color: red;">
    This one has an inline style, which wins.
  </p>

</body>`,
          height: 300,
          note: 'Three paragraphs, three sources of styling. Change the inline `red` to `orange` and only that paragraph moves — which is both the appeal and the problem of inline CSS.',
        },
      },

      {
        b: 'challenge',
        spec: {
          id: 'm5c1',
          title: 'Link an external stylesheet correctly',
          brief:
            'Complete the `<head>` so it links an external stylesheet stored at `styles/main.css`. Include the `rel` and `type` attributes as well as `href`.',
          lang: 'html',
          starter: `<!DOCTYPE html>
<html>
<head>
  <title>Vidya College</title>
  <!-- Add the link element here -->

</head>
<body>
  <h1>Vidya College</h1>
</body>
</html>`,
          hints: [
            '`<link>` is an empty tag — no closing partner.',
            'The relationship value for a stylesheet is exactly `stylesheet`.',
            'The type of a CSS file is `text/css`.',
          ],
          solution: `<!DOCTYPE html>
<html>
<head>
  <title>Vidya College</title>
  <link rel="stylesheet" type="text/css" href="styles/main.css">
</head>
<body>
  <h1>Vidya College</h1>
</body>
</html>`,
          checks: [
            { kind: 'source', pattern: '<link[^>]*>', label: 'There is a <link> element' },
            { kind: 'source', pattern: '<link[^>]*rel="stylesheet"', label: 'It carries rel="stylesheet"' },
            { kind: 'source', pattern: '<link[^>]*type="text/css"', label: 'It carries type="text/css"' },
            { kind: 'source', pattern: '<link[^>]*href="styles/main\\.css"', label: 'It points at styles/main.css' },
            { kind: 'source', pattern: '<head[\\s\\S]*<link[\\s\\S]*</head>', label: 'The link is inside the <head>' },
          ],
        },
      },

      {
        b: 'quiz',
        questions: [
          {
            kind: 'mcq',
            q: 'Which method lets one change update the styling of an entire website at once?',
            options: ['Inline CSS', 'Internal CSS', 'External CSS', 'All three equally'],
            answer: 2,
            why: 'An external stylesheet is linked by many pages, so editing it changes all of them at once. Internal CSS affects one page; inline affects one element.',
          },
          {
            kind: 'mcq',
            q: 'Where must a `<style>` tag be placed?',
            options: ['In the <body>', 'In the <head>', 'Before the <!DOCTYPE>', 'Inside the tag it styles'],
            answer: 1,
            why: 'Internal CSS goes in a `<style>` tag inside the `<head>` section.',
          },
          {
            kind: 'mcq',
            q: 'What does `rel="stylesheet"` tell the browser?',
            options: [
              'Where the CSS file is stored',
              'The relationship between the HTML page and the linked file',
              'The type of the linked resource',
              'Which elements to style',
            ],
            answer: 1,
            why: '`rel` defines the **relationship**. `href` gives the location and `type` gives the resource type.',
          },
          {
            kind: 'fill',
            q: 'Which attribute is used to apply inline CSS to an element?',
            accept: ['style'],
            why: 'The `style` attribute: `<h1 style="color: red;">`.',
            placeholder: 'attribute name',
          },
          {
            kind: 'tf',
            q: '`@import` can be written anywhere in an HTML document.',
            answer: false,
            why: 'When used with an HTML page, `@import` must be inside a `<style>` tag.',
          },
        ],
      },

      {
        b: 'recap',
        items: [
          'Inline — the `style` attribute, one element, discouraged.',
          'Internal — a `<style>` tag in the `<head>`, one page.',
          'External — a `.css` file linked with `<link rel="stylesheet" type="text/css" href="…">`, every page.',
          '`@import url("file.css")` inside a `<style>` tag is the alternative way to include an external file.',
        ],
      },
    ],
  },

  // ── 5.3 ──────────────────────────────────────────────────────
  {
    id: 'm5l3',
    slug: 'the-cascade',
    title: 'The cascade: which rule wins',
    summary:
      'When two rules both apply, one has to lose. The order of priority is fixed, short, and examined.',
    minutes: 12,
    outcomes: ['Briefly explains style sheet and its usage'],
    blocks: [
      {
        b: 'lead',
        text: 'The **cascading** part of Cascading Style Sheets describes how elements on a page are affected when more than one rule targets them. CSS follows a **priority system** to decide which style is applied.',
      },

      { b: 'h2', text: 'The order of priority' },
      {
        b: 'ol',
        items: [
          '**Inline CSS** has the highest priority, because the style is written directly inside the HTML element.',
          '**Internal and external CSS have the same level of priority.** When both are used, the style declared **last in the HTML document** takes precedence.',
          '**Browser default styles** have the lowest priority, and apply only when no other CSS rule is defined.',
        ],
      },
      {
        b: 'note',
        tone: 'exam',
        title: 'The detail students miss',
        text: 'Internal and external are **equal**. Which one wins depends purely on which appears **later** in the `<head>`. Put your `<link>` after your `<style>` block and the external file wins; put it before and the internal block wins.',
      },

      { b: 'widget', spec: { widget: 'cascade-lab' } },

      { b: 'h2', text: 'Specificity beats source order' },
      {
        b: 'p',
        text: 'There is a second rule underneath the first. Even though inline styles have the highest priority, **more specific selectors** can override less specific ones within the same source. An ID selector is more specific than a class selector, which is more specific than an element selector.',
      },
      {
        b: 'lab',
        spec: {
          lab: 'css',
          title: 'Element, class, ID',
          html: `<p>A plain paragraph.</p>
<p class="note">A paragraph with a class.</p>
<p class="note" id="warning">A paragraph with a class AND an id.</p>`,
          css: `p        { color: black; }
.note    { color: blue; }
#warning { color: red; }

/* All three rules match the last paragraph.
   The ID selector is the most specific, so red wins.
   Try commenting out the #warning rule and see
   what the paragraph becomes. */`,
          height: 260,
        },
      },

      { b: 'h2', text: '!important' },
      {
        b: 'p',
        text: 'The `!important` rule gives a declaration higher priority, making it override other styles **even if those styles have higher specificity or come from a higher-priority source**, including inline CSS.',
      },
      {
        b: 'code',
        lang: 'css',
        code: `selector {
  property: value !important;
}

/* For example */
p {
  color: red !important;
}`,
      },
      {
        b: 'p',
        text: 'Even if other rules try to change the colour of the paragraph, the `!important` declaration keeps it red — unless another rule *also* uses `!important` and has higher specificity.',
      },
      {
        b: 'note',
        tone: 'warn',
        title: 'A tool of last resort',
        text: '`!important` wins by shouting rather than by being right. Once two rules both use it, you are back where you started with a harder problem. Reach for it only when you cannot change the stylesheet that is fighting you.',
      },

      { b: 'h2', text: 'Reading a conflict' },
      {
        b: 'p',
        text: 'When a style is not applying, work down this list in order. The answer is almost always in the first three.',
      },
      {
        b: 'steps',
        items: [
          { title: 'Does the selector actually match?', text: 'A typo in a class name, or `.Note` instead of `.note`, matches nothing at all. Class and id names are case sensitive.' },
          { title: 'Is another rule more specific?', text: 'An `#id` rule beats a `.class` rule beats an element rule, whatever the order.' },
          { title: 'Is another rule later?', text: 'Between two rules of equal specificity, the later one wins.' },
          { title: 'Is there an inline style?', text: 'It sits above everything except `!important`.' },
          { title: 'Is there an !important anywhere?', text: 'It overrides all of the above.' },
        ],
      },

      {
        b: 'quiz',
        questions: [
          {
            kind: 'order',
            q: 'Put these in order from **highest** priority to **lowest**.',
            items: [
              '!important declaration',
              'Inline style attribute',
              'Internal or external CSS, whichever comes last',
              'Browser default styles',
            ],
            why: '`!important` overrides everything; inline comes next; internal and external are equal and settled by order; the browser default only applies when nothing else does.',
          },
          {
            kind: 'mcq',
            q: 'A page has an internal `<style>` block *before* a `<link>` to an external stylesheet. Both set `p { color: … }`. Which wins?',
            options: [
              'The internal block, because internal always beats external',
              'The external file, because it comes last',
              'Neither — the browser default applies',
              'Both, alternating',
            ],
            answer: 1,
            why: 'They have equal priority, so the one declared **last in the document** wins — here, the external file.',
          },
          {
            kind: 'mcq',
            q: 'Which selector is the most specific?',
            options: ['p', '.note', '#warning', 'They are equal'],
            answer: 2,
            why: 'ID beats class beats element. That is why an id should be used sparingly — it is hard to override later.',
          },
          {
            kind: 'tf',
            q: '`!important` can override an inline style.',
            answer: true,
            why: 'It overrides all CSS rules regardless of their origin or specificity — which is exactly why it should be used sparingly.',
          },
        ],
      },

      {
        b: 'recap',
        items: [
          'Priority: `!important` → inline → internal/external (last one wins) → browser default.',
          'Internal and external are equal; source order decides between them.',
          'Within one source, specificity decides: id > class > element.',
          'Class and id names are case sensitive — `.note` and `.Note` are different.',
        ],
      },
    ],
  },

  // ── 5.4 ──────────────────────────────────────────────────────
  {
    id: 'm5l4',
    slug: 'css-syntax-and-selectors',
    title: 'Syntax and selectors',
    summary:
      'A rule has three parts. A selector is a question you ask the page — and there are six kinds in the syllabus.',
    minutes: 16,
    outcomes: [
      'Uses the comments and correct syntax in CSS',
      'Uses appropriate selectors to select elements in CSS',
    ],
    blocks: [
      {
        b: 'lead',
        text: 'Every CSS rule has the same three parts: a **selector**, a **property**, and a **value**. Once you can name those three in any rule, the language stops looking like punctuation soup.',
      },

      { b: 'h2', text: 'The syntax' },
      {
        b: 'code',
        lang: 'css',
        code: `selector {
  property: value;
}

/* For example */
p {
  color: blue;
  font-size: 16px;
}`,
      },
      {
        b: 'dl',
        items: [
          { term: 'Selector', desc: 'Specifies the HTML element or elements the rule applies to.' },
          { term: 'Declaration block', desc: 'Enclosed in curly braces `{ }`, it contains one or more declarations.' },
          {
            term: 'Declaration',
            desc: 'A property and its value, separated by a **colon** `:` and ending with a **semicolon** `;`. Several declarations can sit in one block.',
          },
        ],
      },
      {
        b: 'note',
        tone: 'exam',
        title: 'This syntax is not used for inline CSS',
        text: 'The `selector { … }` form belongs to internal and external CSS only. Inline CSS has no selector — the element *is* the selector — so you write just the declarations: `style="color: blue; font-size: 16px;"`.',
      },

      { b: 'h2', text: 'CSS comments' },
      {
        b: 'p',
        text: 'CSS comments begin with `/*` and end with `*/`. They are ignored by browsers and are used to annotate code or temporarily disable specific styles during development.',
      },
      {
        b: 'code',
        lang: 'css',
        code: `/* This is a single-line comment */

/*
  This is a multi-line comment.
  It can span multiple lines.
*/

p {
  color: navy;
  /* font-size: 20px;  ← disabled while testing */
}`,
      },
      {
        b: 'note',
        tone: 'tip',
        title: 'Different from HTML',
        text: 'HTML uses `<!-- … -->`. CSS uses `/* … */`. PHP, in Module 7, uses `//`, `#` **and** `/* … */`. Mixing them up produces silent failures, because a comment in the wrong syntax becomes content.',
      },

      { b: 'h2', text: 'The six selectors' },
      {
        b: 'p',
        text: 'Selectors specify which HTML elements you want to style. The syllabus covers six kinds.',
      },

      { b: 'widget', spec: { widget: 'selector-lab' } },

      { b: 'h3', text: '1. Element selector' },
      {
        b: 'p',
        text: 'Targets **all HTML elements of a specific type**. When an HTML tag such as `<p>` is defined as a selector, all `<p>` tags are immediately affected unless another CSS style overrules it.',
      },
      {
        b: 'code',
        lang: 'css',
        code: `p {
  font-size: 20px;
  color: red;
}`,
      },

      { b: 'h3', text: '2. ID selector' },
      {
        b: 'p',
        text: 'The **id concept** is used to separate elements from each other even if they are of the same type. Defined with a leading **hash `#`**, and applied in HTML with the `id` attribute. Typically used **once per page**.',
      },
      {
        b: 'code',
        lang: 'css',
        code: `#header {
  font-size: 24px;
  color: crimson;
}`,
      },
      {
        b: 'code',
        lang: 'html',
        code: `<h1 id="header">Affected by the ID selector</h1>
<h1>Not affected</h1>`,
      },

      { b: 'h3', text: '3. Class selector' },
      {
        b: 'p',
        text: 'The **class concept** tells the computer that several tags belong to the same class, even if they are not the same kind of tag. Defined with a leading **dot `.`**, and applied with the `class` attribute. It can be used as many times as needed.',
      },
      {
        b: 'code',
        lang: 'css',
        code: `.highlight {
  background-color: yellow;
  font-weight: bold;
}`,
      },
      {
        b: 'code',
        lang: 'html',
        code: `<h1 class="highlight">A heading</h1>
<p class="highlight">A paragraph — different tag, same class</p>`,
      },

      { b: 'h3', text: '4. Universal selector' },
      {
        b: 'p',
        text: 'Targets **all elements** in the document, using `*`. Used to apply general styles — most commonly a reset that strips the browser’s default margins and padding.',
      },
      {
        b: 'code',
        lang: 'css',
        code: `* {
  margin: 0;
  padding: 0;
}`,
      },

      { b: 'h3', text: '5. Group selector' },
      {
        b: 'p',
        text: 'Applies the same style to **multiple elements** by combining their selectors, **separated by commas**. Each selector can be an element, a class or an id.',
      },
      {
        b: 'code',
        lang: 'css',
        code: `h1, p, .highlight, #unique {
  color: blue;
}`,
        caption:
          'This one rule applies to every `<h1>`, every `<p>`, any element with class `highlight`, and the element with id `unique`.',
      },

      { b: 'h3', text: '6. Compound selector' },
      {
        b: 'p',
        text: 'Combines two or more simple selectors to target a **single** element. Different from a group selector — there are **no spaces and no commas** between the parts.',
      },
      {
        b: 'table',
        head: ['Form', 'Example', 'Selects'],
        rows: [
          ['Element + class', '`p.highlight`', 'A `<p>` that *also* has class `highlight` — **not** every `.highlight`'],
          ['Element + ID', '`h1#title`', 'The `<h1>` whose id is `title`'],
          ['Multiple classes', '`.btn.primary`', 'Elements that have **both** classes'],
        ],
      },
      {
        b: 'lab',
        spec: {
          lab: 'css',
          title: 'Group versus compound',
          html: `<p class="highlight">A paragraph with the class</p>
<div class="highlight">A div with the same class</div>
<p>A paragraph without it</p>`,
          css: /* one comma changes everything */ `/* COMPOUND — no comma. Only a <p> that also
   has class="highlight". */
p.highlight {
  color: red;
}

/* Now add a comma to make it a GROUP selector:
   p, .highlight { color: red; }
   …and watch the div turn red too. */`,
          height: 280,
          note: 'One comma is the whole difference. A comma means **or**; no space and no comma means **and**.',
        },
      },
      {
        b: 'note',
        tone: 'syllabus',
        title: 'Beyond the syllabus: attribute selectors',
        text: 'CSS can also target elements by their attributes — `[title]` selects anything with a title attribute, `[href^="https"]` selects links whose href *starts with* https, and `[src$=".png"]` selects images whose src *ends with* .png. Useful to recognise, not required for the paper.',
      },

      {
        b: 'challenge',
        spec: {
          id: 'm5c2',
          title: 'Style with three kinds of selector',
          brief:
            'Using the HTML shown, write CSS that makes: every `<p>` **navy**; any element with class `warning` have a **yellow background**; and the element with id `title` have a **font-size of 30px**. Use one rule per requirement.',
          lang: 'css',
          starter: `<h1 id="title">Notices</h1>
<p>The sports meet is on Friday.</p>
<p class="warning">The library will be closed.</p>
<div class="warning">Assembly moved to 8 a.m.</div>`,
          starterCss: `/* Write your three rules here */

`,
          hints: [
            'An element selector is just the tag name: `p { … }`.',
            'A class selector starts with a dot: `.warning { … }`.',
            'An id selector starts with a hash: `#title { … }`.',
            'The properties you need are `color`, `background-color` and `font-size`.',
          ],
          solution: `<h1 id="title">Notices</h1>
<p>The sports meet is on Friday.</p>
<p class="warning">The library will be closed.</p>
<div class="warning">Assembly moved to 8 a.m.</div>`,
          solutionCss: `p {
  color: navy;
}

.warning {
  background-color: yellow;
}

#title {
  font-size: 30px;
}`,
          checks: [
            { kind: 'source', pattern: '(^|\\})\\s*p\\s*\\{', label: 'There is an element selector for p' },
            { kind: 'source', pattern: '\\.warning\\s*\\{', label: 'There is a class selector for .warning' },
            { kind: 'source', pattern: '#title\\s*\\{', label: 'There is an ID selector for #title' },
            { kind: 'style', selector: 'p', prop: 'color', contains: 'rgb(0, 0, 128)', label: 'Paragraphs are navy' },
            { kind: 'style', selector: '.warning', prop: 'background-color', contains: 'rgb(255, 255, 0)', label: 'The warning class has a yellow background' },
            { kind: 'style', selector: '#title', prop: 'font-size', equals: '30px', label: 'The title is 30px' },
            { kind: 'style', selector: 'div.warning', prop: 'background-color', contains: 'rgb(255, 255, 0)', label: 'The class works on the div too, not just the paragraph' },
          ],
        },
      },

      {
        b: 'quiz',
        questions: [
          {
            kind: 'mcq',
            q: 'What does `p.highlight` select?',
            options: [
              'Every <p> and every element with class highlight',
              'Only a <p> that also has class="highlight"',
              'Any element inside a <p> with class highlight',
              'Nothing — that syntax is invalid',
            ],
            answer: 1,
            why: 'No space and no comma means **compound**: the element must satisfy both conditions. Adding a comma would make it a group selector meaning *either*.',
          },
          {
            kind: 'mcq',
            q: 'Which symbol begins a class selector?',
            options: ['#', '.', '*', '@'],
            answer: 1,
            why: 'A dot for class, a hash for id, an asterisk for universal. `@` begins at-rules such as `@import`.',
          },
          {
            kind: 'mcq',
            q: 'What is `* { margin: 0; padding: 0; }` for?',
            options: [
              'Styling elements with an asterisk in their name',
              'Removing the browser’s default margins and padding from every element',
              'Hiding all elements',
              'Marking a comment',
            ],
            answer: 1,
            why: 'The universal selector targets every element. This particular rule is the classic “reset”, wiping the browser’s built-in spacing so you start from zero.',
          },
          {
            kind: 'fill',
            q: 'Write the CSS comment markers, opening and closing, separated by a space.',
            accept: ['/* */', '/*  */', '/* and */'],
            why: 'CSS comments are `/*` … `*/`. HTML uses `<!-- -->` instead.',
            placeholder: 'e.g. <!-- -->',
          },
          {
            kind: 'match',
            q: 'Match each selector to what it targets.',
            pairs: [
              { left: 'h1', right: 'Every <h1> on the page' },
              { left: '#menu', right: 'The one element whose id is menu' },
              { left: '.card', right: 'Every element with class card' },
              { left: 'h1, h2', right: 'Every <h1> and every <h2>' },
            ],
            why: 'Element, id, class, group. Add a compound like `h1.card` and it would mean an `<h1>` that also has class card.',
          },
        ],
      },

      {
        b: 'recap',
        items: [
          '`selector { property: value; }` — colon between property and value, semicolon after each declaration.',
          'CSS comments are `/* … */`, not `<!-- … -->`.',
          'Six selectors: element, id (`#`), class (`.`), universal (`*`), group (commas), compound (no spaces).',
          'A comma means **or**; no space and no comma means **and**.',
        ],
      },
    ],
  },
]

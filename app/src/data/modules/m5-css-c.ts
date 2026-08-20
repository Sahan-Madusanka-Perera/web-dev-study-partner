import type { Lesson } from '../../types/content'

export const m5LessonsC: Lesson[] = [
  // ── 5.9 ──────────────────────────────────────────────────────
  {
    id: 'm5l9',
    slug: 'borders-and-tables',
    title: 'Borders and table styling',
    summary:
      'Eight border styles, four sides, and the one property that turns a double-lined table into a clean grid.',
    minutes: 14,
    outcomes: ['Applies various CSS formatting in HTML web pages to improve the appearance'],
    blocks: [
      {
        b: 'lead',
        text: 'Borders define the boundary or outline around an element. They have three parts — **width**, **style** and **colour** — and each can be set separately or together.',
      },

      { b: 'h2', text: 'The three border parts' },
      {
        b: 'keyvals',
        items: [
          {
            k: 'border-width',
            v: 'The thickness. Keywords `thin`, `medium`, `thick`, or specific values such as `2px` or `0.2em`.',
          },
          {
            k: 'border-style',
            v: '`none` (the default), `solid`, `dashed`, `dotted`, `double`, and the four 3-D styles `groove`, `ridge`, `inset`, `outset`.',
          },
          { k: 'border-color', v: 'A named colour, hex, RGB or HSL value.' },
          { k: 'border-radius', v: 'Rounded corners for the border.' },
        ],
      },
      {
        b: 'note',
        tone: 'exam',
        title: 'Without a style, there is no border',
        text: '`border-style` defaults to `none`. Set `border-width: 5px; border-color: red;` on their own and **nothing appears**. This is the most common reason a student’s border does not show.',
      },
      {
        b: 'p',
        text: 'The `border` shorthand sets all three in one declaration, in the order **width style colour**.',
      },
      {
        b: 'code',
        lang: 'css',
        code: `border: 2px solid black;`,
      },
      {
        b: 'lab',
        spec: {
          lab: 'css',
          title: 'Every border style',
          html: `<div class="solid">solid</div>
<div class="dashed">dashed</div>
<div class="dotted">dotted</div>
<div class="double">double</div>
<div class="groove">groove</div>
<div class="ridge">ridge</div>
<div class="inset">inset</div>
<div class="outset">outset</div>`,
          css: `div {
  border-width: 6px;
  border-color: #6b8fb5;
  padding: 8px 12px;
  margin-bottom: 8px;
  font-family: Arial, sans-serif;
  width: 180px;
}

.solid  { border-style: solid;  }
.dashed { border-style: dashed; }
.dotted { border-style: dotted; }
.double { border-style: double; }
.groove { border-style: groove; }
.ridge  { border-style: ridge;  }
.inset  { border-style: inset;  }
.outset { border-style: outset; }`,
          height: 420,
        },
      },

      { b: 'h2', text: 'Individual sides' },
      {
        b: 'p',
        text: 'Borders can be applied to each side separately, each with its own width, style and colour.',
      },
      {
        b: 'code',
        lang: 'css',
        code: `border-top:    4px solid green;
border-right:  2px dotted red;
border-bottom: 5px dashed blue;
border-left:   1px double black;`,
      },
      {
        b: 'p',
        text: 'There is also `border-image`, which uses an image as the border. Its syntax is `border-image: source slice width outset repeat;` — where *source* is the image URL, *slice* defines how the image is divided (top, right, bottom, left), *width* sets the border width, *outset* says how far the image extends beyond the border box, and *repeat* controls whether the image is `stretch`ed, `repeat`ed or `round`ed.',
      },

      { b: 'h2', text: 'Styling tables' },
      {
        b: 'p',
        text: 'CSS replaces every table attribute you met in Module 3 — and does the job better.',
      },
      {
        b: 'table',
        head: ['CSS property', 'Replaces', 'What it does'],
        rows: [
          ['`width` / `height`', '`width` / `height` attributes', 'Sets the dimensions of the table or its cells'],
          ['`border`', '`border` attribute', 'Adds borders to the table or to individual cells'],
          ['`border-collapse`', '(no attribute)', '`collapse` merges adjacent borders into one; `separate` (default) keeps them apart'],
          ['`border-spacing`', '`cellspacing`', 'The space between cells when borders are separate'],
          ['`padding`', '`cellpadding`', 'Space inside a cell, between content and border'],
          ['`text-align`', '`align`', 'Horizontal alignment inside cells'],
          ['`vertical-align`', '`valign`', 'Vertical alignment: `top`, `middle`, `bottom`'],
          ['`caption-side`', '`align` on `<caption>`', 'Positions the caption: `top` (default) or `bottom`'],
          ['`background-color`', '`bgcolor`', 'Background colour of a table, row or cell'],
        ],
      },
      {
        b: 'h3',
        text: 'border-collapse — the one that matters',
      },
      {
        b: 'p',
        text: 'By default, a table cell and its neighbour each draw their own border, so you see a **double line** between them. `border-collapse: collapse;` merges those adjacent borders into a single line.',
      },
      {
        b: 'lab',
        spec: {
          lab: 'css',
          title: 'separate versus collapse',
          html: `<p>border-collapse: separate (the default)</p>
<table class="sep">
  <tr><th>Name</th><th>Marks</th></tr>
  <tr><td>Nimali</td><td>78</td></tr>
  <tr><td>Kasun</td><td>65</td></tr>
</table>

<p>border-collapse: collapse</p>
<table class="col">
  <tr><th>Name</th><th>Marks</th></tr>
  <tr><td>Nimali</td><td>78</td></tr>
  <tr><td>Kasun</td><td>65</td></tr>
</table>`,
          css: `table { font-family: Arial, sans-serif; margin-bottom: 20px; }

table, th, td {
  border: 1px solid black;
}

th, td {
  padding: 8px 14px;
  text-align: left;
}

.sep { border-collapse: separate; border-spacing: 4px; }
.col { border-collapse: collapse; }

/* Change border-spacing on .sep to 0 and to 12px
   and watch the gap between the cells open and close. */`,
          height: 460,
          note: 'Look closely at the lines between the cells. In the first table each cell draws its own, so the lines are doubled. In the second they merge into one.',
        },
      },
      {
        b: 'note',
        tone: 'tip',
        title: 'The three-selector trick',
        text: '`table, th, td { border: 1px solid black; }` is a **group selector**. Without it, a border on `table` alone draws only around the outside, and the cells stay unlined.',
      },
      {
        b: 'lab',
        spec: {
          lab: 'css',
          title: 'A table that looks designed',
          html: `<table>
  <caption>Grade 13 ICT — term test marks</caption>
  <tr><th>Name</th><th>Theory</th><th>Practical</th></tr>
  <tr><td>Nimali Perera</td><td>78</td><td>85</td></tr>
  <tr><td>Kasun Silva</td><td>65</td><td>71</td></tr>
  <tr><td>Dilki Fernando</td><td>82</td><td>79</td></tr>
</table>`,
          css: `table {
  width: 100%;
  border-collapse: collapse;
  font-family: Arial, Helvetica, sans-serif;
}

caption {
  caption-side: bottom;
  padding-top: 10px;
  font-style: italic;
  color: #6b6b6b;
}

th, td {
  border: 1px solid #d8d0c2;
  padding: 10px 14px;
  text-align: left;
  vertical-align: middle;
}

th {
  background-color: #232842;
  color: white;
}

tr:nth-child(even) td {
  background-color: #faf7f2;
}`,
          height: 420,
          note: 'Try `caption-side: top;` to move the caption back above the table. The `nth-child(even)` rule is beyond the syllabus, but it is how striped tables are made.',
        },
      },

      {
        b: 'challenge',
        spec: {
          id: 'm5c6',
          title: 'Style the results table',
          brief:
            'Give the table **collapsed borders**. Every `<th>` and `<td>` needs a **1px solid black border** and **10px of padding**. The header cells must have a **lightgrey background**. Content in every cell should be **left aligned**.',
          lang: 'css',
          starter: `<table>
  <tr><th>Subject</th><th>Marks</th></tr>
  <tr><td>ICT</td><td>78</td></tr>
  <tr><td>Maths</td><td>65</td></tr>
</table>`,
          starterCss: `table {
  font-family: Arial, sans-serif;
  /* collapse the borders */
}

/* border and padding for th and td */

/* background for th */
`,
          hints: [
            'Merging the double lines is `border-collapse: collapse;` on the table.',
            'Use a group selector so one rule covers both cell types: `th, td { … }`.',
            'The header background is a separate rule: `th { background-color: lightgrey; }`.',
          ],
          solution: `<table>
  <tr><th>Subject</th><th>Marks</th></tr>
  <tr><td>ICT</td><td>78</td></tr>
  <tr><td>Maths</td><td>65</td></tr>
</table>`,
          solutionCss: `table {
  font-family: Arial, sans-serif;
  border-collapse: collapse;
}

th, td {
  border: 1px solid black;
  padding: 10px;
  text-align: left;
}

th {
  background-color: lightgrey;
}`,
          checks: [
            { kind: 'style', selector: 'table', prop: 'border-collapse', equals: 'collapse', label: 'The table borders are collapsed' },
            { kind: 'style', selector: 'td', prop: 'border-top-width', equals: '1px', label: 'Data cells have a 1px border' },
            { kind: 'style', selector: 'th', prop: 'border-top-style', equals: 'solid', label: 'Header cells have a solid border' },
            { kind: 'style', selector: 'td', prop: 'padding-top', equals: '10px', label: 'Cells have 10px of padding' },
            { kind: 'style', selector: 'th', prop: 'background-color', contains: 'rgb(211, 211, 211)', label: 'Header cells have a lightgrey background' },
            { kind: 'style', selector: 'th', prop: 'text-align', equals: 'left', label: 'Header text is left aligned' },
          ],
        },
      },

      {
        b: 'quiz',
        questions: [
          {
            kind: 'mcq',
            q: 'A student writes `border-width: 4px; border-color: red;` and no border appears. Why?',
            options: [
              'The colour red is not allowed',
              '`border-style` defaults to `none`, so there is nothing to draw',
              'Borders need a `border-radius` first',
              'The width must be in em, not px',
            ],
            answer: 1,
            why: 'Without a style there is no border. `border: 4px solid red;` sets all three at once and always works.',
          },
          {
            kind: 'mcq',
            q: 'Which property removes the double line between adjacent table cells?',
            options: ['border-spacing: 0', 'border-collapse: collapse', 'border-style: none', 'cellpadding: 0'],
            answer: 1,
            why: '`border-collapse: collapse;` merges each pair of adjacent borders into one. `border-spacing: 0` closes the gap but still leaves two lines.',
          },
          {
            kind: 'mcq',
            q: 'Which CSS property replaces the old `cellpadding` attribute?',
            options: ['margin', 'padding', 'border-spacing', 'text-indent'],
            answer: 1,
            why: '`padding` on `th, td` is the space inside a cell. `border-spacing` replaces `cellspacing`, the gap *between* cells.',
          },
          {
            kind: 'multi',
            q: 'Which are valid values of `border-style`?',
            options: ['solid', 'dotted', 'collapse', 'groove', 'double'],
            answers: [0, 1, 3, 4],
            why: '`collapse` is a value of `border-collapse`, not of `border-style`.',
          },
          {
            kind: 'fill',
            q: 'Write the shorthand for a 2px solid black border.',
            accept: ['border: 2px solid black', 'border:2px solid black', 'border: 2px solid black;'],
            why: 'The order is always **width style colour**.',
            placeholder: 'property: value',
          },
        ],
      },

      {
        b: 'recap',
        items: [
          '`border: width style colour;` — without a style, nothing is drawn.',
          'Styles: none, solid, dashed, dotted, double, groove, ridge, inset, outset.',
          'Each side can be set separately with `border-top`, `border-right`, and so on.',
          '`border-collapse: collapse` merges doubled table lines; `border-spacing` replaces `cellspacing`; `padding` replaces `cellpadding`.',
          '`table, th, td { border: … }` — a group selector, or only the outside gets a line.',
        ],
      },
    ],
  },

  // ── 5.10 ─────────────────────────────────────────────────────
  {
    id: 'm5l10',
    slug: 'units-and-validation',
    title: 'Measuring units, shorthand and validation',
    summary:
      'Relative units bend to their context; absolute ones do not. Plus the W3C service that checks your CSS for you.',
    minutes: 13,
    outcomes: [
      'Uses the comments and correct syntax in CSS',
      'Applies various CSS formatting in HTML web pages to improve the appearance',
    ],
    blocks: [
      {
        b: 'lead',
        text: 'CSS provides a variety of measuring units to define sizes, distances and positions. They divide cleanly into two families, and choosing the wrong family is what makes a layout break on a phone.',
      },

      { b: 'widget', spec: { widget: 'units-lab' } },

      { b: 'h2', text: 'Relative units' },
      {
        b: 'p',
        text: 'Relative units are **flexible and depend on the context** of their parent element, the viewport, or a font size. They are ideal for responsive design, and they make layouts more flexible.',
      },
      {
        b: 'table',
        head: ['Unit', 'Relative to'],
        compact: true,
        rows: [
          ['`%`', 'A percentage of the parent’s value'],
          ['`em`', 'The element’s **own** font size'],
          ['`rem`', 'The **root** (`<html>`) font size'],
          ['`vw`', '1% of the viewport **width**'],
          ['`vh`', '1% of the viewport **height**'],
          ['`vmin`', 'The **smaller** of `vw` or `vh`'],
          ['`vmax`', 'The **larger** of `vw` or `vh`'],
          ['`ch`', 'The width of the “0” character'],
          ['`ex`', 'The height of a lowercase “x”'],
          ['`cap`', 'The height of a capital letter'],
          ['`ic`', 'The size of the “水” character, for East Asian text'],
        ],
      },
      {
        b: 'note',
        tone: 'tip',
        title: 'em versus rem',
        text: '`em` compounds. Nest three elements each set to `1.2em` and the innermost is 1.2 × 1.2 × 1.2 = 1.73 times the base — usually not what you wanted. `rem` always measures from the root, so it never compounds. Prefer `rem` for sizing and `em` only when you deliberately want something to scale with its own text.',
      },

      { b: 'h2', text: 'Absolute units' },
      {
        b: 'p',
        text: 'Absolute units are **fixed and not affected** by other elements or screen sizes. Use them for print or fixed layouts where precision is essential.',
      },
      {
        b: 'table',
        head: ['Unit', 'Meaning'],
        compact: true,
        rows: [
          ['`px`', 'Pixels — a single dot on the screen'],
          ['`cm`', 'Centimetres — used for print'],
          ['`mm`', 'Millimetres — smaller than a centimetre'],
          ['`in`', 'Inches. **1in = 96px**'],
          ['`pt`', 'Points. **1pt = 1/72 inch**'],
          ['`pc`', 'Picas. 1pc = 12pt'],
        ],
      },
      {
        b: 'lab',
        spec: {
          lab: 'css',
          title: 'The same number, five units',
          html: `<div class="px">width: 200px</div>
<div class="pc">width: 60%</div>
<div class="rem">width: 12rem</div>
<div class="vw">width: 40vw</div>
<div class="cm">width: 5cm</div>`,
          css: `div {
  background: #f2ece2;
  border: 1px solid #c2831c;
  padding: 8px 12px;
  margin-bottom: 8px;
  font-family: Arial, sans-serif;
  font-size: 14px;
}

.px  { width: 200px; }
.pc  { width: 60%;   }
.rem { width: 12rem; }
.vw  { width: 40vw;  }
.cm  { width: 5cm;   }

/* Drag the divider between the two panes to make the
   preview narrower. Watch which bars change length
   and which stay exactly where they are. */`,
          height: 340,
          note: 'The `%` and `vw` bars move with the width of the preview. The `px`, `rem` and `cm` bars do not. That difference is the entire argument for relative units.',
        },
      },

      { b: 'h2', text: 'Shorthand properties' },
      {
        b: 'p',
        text: 'Shorthand properties let you write several related declarations in a single line. You have already met five of them.',
      },
      {
        b: 'table',
        head: ['Shorthand', 'Order of values'],
        rows: [
          ['`border`', 'width · style · colour'],
          ['`margin` / `padding`', 'top · right · bottom · left, clockwise'],
          ['`background`', 'colour · image · position / size · repeat · attachment · origin'],
          ['`list-style`', 'type · position · image'],
          ['`text-decoration`', 'line · style · colour · thickness'],
        ],
      },
      {
        b: 'note',
        tone: 'exam',
        title: 'The shorthand rule, once more',
        text: 'You **can skip** values — the ones you leave out revert to their defaults. You **cannot change the order**. Both halves of that sentence are examinable.',
      },
      {
        b: 'code',
        lang: 'css',
        code: `/* Shorthand */
p {
  text-decoration: underline dotted red 2px;
}

/* The equivalent longhand */
p {
  text-decoration-line: underline;
  text-decoration-style: dotted;
  text-decoration-color: red;
  text-decoration-thickness: 2px;
}`,
      },

      { b: 'h2', text: 'Validating your CSS' },
      {
        b: 'p',
        text: 'It is essential to ensure the page you designed is error-free and that the CSS is free of syntax errors. **CSS validators** check that the CSS is accurate and has no unsupported selectors, properties or values.',
      },
      {
        b: 'p',
        text: 'The W3C hosts a CSS validation service at [jigsaw.w3.org/css-validator](http://jigsaw.w3.org/css-validator). Paste in your CSS, or give it a URL, and it lists every problem with a line number.',
      },
      {
        b: 'note',
        tone: 'tip',
        title: 'Why validation matters more in CSS than in HTML',
        text: 'A browser **ignores errors** — it does not tell you when a declaration is invalid, it simply skips it. So a misspelled `colour: red;` produces no warning and no colour. A validator is the only thing that will tell you.',
      },
      {
        b: 'p',
        text: 'The most common errors it finds are the boring ones: a missing semicolon, a missing closing brace, a British spelling of `color`, or a unit left off a number.',
      },
      {
        b: 'lab',
        spec: {
          lab: 'css',
          title: 'Four broken declarations',
          html: `<h2>Can you spot the four mistakes?</h2>
<p class="one">Should be red</p>
<p class="two">Should be 20px</p>
<p class="three">Should be centred</p>
<p class="four">Should have a blue background</p>`,
          css: `.one {
  colour: red;
}

.two {
  font-size: 20
}

.three {
  text-align: centre;
}

.four {
  background-color: blue
  color: white;
}

/* Fix them one at a time and watch each
   paragraph come right. Nothing warns you —
   that is exactly why validators exist. */`,
          height: 420,
          note: 'The mistakes are: `colour` instead of `color`; a missing unit on `20`; `centre` instead of `center`; and a missing semicolon that swallows the next declaration.',
        },
      },

      {
        b: 'quiz',
        questions: [
          {
            kind: 'mcq',
            q: 'Which unit is relative to the **root** font size?',
            options: ['em', 'rem', 'px', 'vh'],
            answer: 1,
            why: '`rem` measures from the root `<html>` font size and never compounds. `em` measures from the element’s own font size and does compound.',
          },
          {
            kind: 'mcq',
            q: 'What does `50vw` mean?',
            options: [
              '50 pixels wide',
              '50% of the parent element’s width',
              '50% of the viewport width',
              '50 times the root font size',
            ],
            answer: 2,
            why: '`vw` is 1% of the viewport width, so `50vw` is half the width of the browser window.',
          },
          {
            kind: 'multi',
            q: 'Which of these are **absolute** units?',
            options: ['px', 'em', 'cm', 'vh', 'pt'],
            answers: [0, 2, 4],
            why: '`em` and `vh` depend on context, so they are relative. `px`, `cm` and `pt` are fixed.',
          },
          {
            kind: 'mcq',
            q: 'Where is the W3C CSS validation service hosted?',
            options: [
              'validator.w3.org/html',
              'jigsaw.w3.org/css-validator',
              'w3schools.com/css/validate',
              'css.w3.org/check',
            ],
            answer: 1,
            why: 'jigsaw.w3.org/css-validator. The HTML validator is a separate service at validator.w3.org.',
          },
          {
            kind: 'tf',
            q: 'A browser will show an error message if a CSS property is misspelled.',
            answer: false,
            why: 'It silently ignores the declaration. That silence is precisely why a validator is worth running.',
          },
        ],
      },

      {
        b: 'recap',
        items: [
          'Relative: `%`, `em`, `rem`, `vw`, `vh`, `vmin`, `vmax`, `ch`, `ex`, `cap`, `ic`.',
          'Absolute: `px`, `cm`, `mm`, `in` (= 96px), `pt` (= 1/72 in), `pc`.',
          '`em` compounds through nesting; `rem` does not.',
          'Shorthands: skip values freely, never reorder them.',
          'Browsers ignore CSS errors silently — validate at jigsaw.w3.org/css-validator.',
        ],
      },
    ],
  },

  // ── 5.11 ─────────────────────────────────────────────────────
  {
    id: 'm5l11',
    slug: 'css-project',
    title: 'Project: style the whole page',
    summary:
      'Take a plain HTML page and make it look designed — using only the properties in this module.',
    minutes: 25,
    outcomes: [
      'Inserts CSS in HTML web pages to improve the appearance',
      'Applies various CSS formatting in HTML web pages to improve the appearance',
    ],
    blocks: [
      {
        b: 'lead',
        text: 'This is the page you built in Module 3, unchanged. Everything that follows happens in the stylesheet — which is the point of the whole module.',
      },

      { b: 'h2', text: 'How a stylesheet is usually ordered' },
      {
        b: 'p',
        text: 'There is no rule about this, but almost every professional stylesheet follows roughly the same order. Working top-down like this stops you from fighting your own rules.',
      },
      {
        b: 'steps',
        items: [
          { title: 'Reset', text: 'Strip the browser defaults you do not want: `* { margin: 0; padding: 0; }`.' },
          { title: 'Body', text: 'Set the font family, base size, line height, colour and background once. Everything inherits from here.' },
          { title: 'Typography', text: 'Headings, paragraphs, links, lists — the elements, in the order they appear on the page.' },
          { title: 'Components', text: 'Classes for the repeated pieces: `.notice`, `.card`, `.nav`.' },
          { title: 'One-offs', text: 'Ids for the genuinely unique: `#header`, `#footer`.' },
        ],
      },

      {
        b: 'challenge',
        spec: {
          id: 'm5project',
          title: 'Style the school page',
          brief:
            'Write a stylesheet for the page shown. It must: set a **sans-serif font family on `body`**; make the `<h1>` **centred** with a **bottom border**; give `.notice` a **background colour and padding**; **collapse** the table borders and give `th, td` a **border and padding**; and remove the **underline** from links, restoring it on **hover**.',
          lang: 'css',
          starter: `<h1>Vidya College</h1>

<p class="notice">The sports meet is on Friday at 8 a.m.</p>

<h2>Term test results</h2>
<table>
  <tr><th>Subject</th><th>Marks</th></tr>
  <tr><td>ICT</td><td>78</td></tr>
  <tr><td>Maths</td><td>65</td></tr>
</table>

<h2>Links</h2>
<ul class="nav">
  <li><a href="index.html">Home</a></li>
  <li><a href="contact.html">Contact</a></li>
</ul>`,
          starterCss: `/* 1. Body — font family for the whole page */


/* 2. h1 — centred, with a bottom border */


/* 3. .notice — background colour and padding */


/* 4. table — collapsed borders; th and td — border and padding */


/* 5. links — no underline, underlined on hover */
`,
          hints: [
            'Start with `body { font-family: Arial, Helvetica, sans-serif; }` — everything else inherits it.',
            'A bottom border only is `border-bottom: 3px solid #c2831c;`.',
            '`border-collapse: collapse;` goes on `table`; the border and padding go on `th, td` together.',
            'For links: `a { text-decoration: none; }` then `a:hover { text-decoration: underline; }`.',
          ],
          solution: `<h1>Vidya College</h1>

<p class="notice">The sports meet is on Friday at 8 a.m.</p>

<h2>Term test results</h2>
<table>
  <tr><th>Subject</th><th>Marks</th></tr>
  <tr><td>ICT</td><td>78</td></tr>
  <tr><td>Maths</td><td>65</td></tr>
</table>

<h2>Links</h2>
<ul class="nav">
  <li><a href="index.html">Home</a></li>
  <li><a href="contact.html">Contact</a></li>
</ul>`,
          solutionCss: `body {
  font-family: Arial, Helvetica, sans-serif;
  line-height: 1.6;
  color: #2b2b2b;
  margin: 24px;
}

h1 {
  text-align: center;
  border-bottom: 3px solid #c2831c;
  padding-bottom: 10px;
}

.notice {
  background-color: #fbf0d9;
  padding: 14px 18px;
  border-radius: 6px;
}

table {
  border-collapse: collapse;
  width: 100%;
}

th, td {
  border: 1px solid #999999;
  padding: 10px 14px;
  text-align: left;
}

th {
  background-color: #232842;
  color: white;
}

.nav {
  list-style: none;
  padding: 0;
}

.nav li {
  display: inline-block;
  margin-right: 16px;
}

a {
  color: #232842;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
  color: #c2831c;
}`,
          checks: [
            { kind: 'style', selector: 'body', prop: 'font-family', contains: 'arial', label: 'body has a sans-serif font family' },
            { kind: 'style', selector: 'h1', prop: 'text-align', equals: 'center', label: 'The h1 is centred' },
            { kind: 'style', selector: 'h1', prop: 'border-bottom-style', equals: 'solid', label: 'The h1 has a bottom border' },
            { kind: 'style', selector: '.notice', prop: 'padding-top', contains: 'px', label: 'The notice has padding' },
            { kind: 'source', pattern: '\\.notice[\\s\\S]{0,180}background', label: 'The notice has a background colour' },
            { kind: 'style', selector: 'table', prop: 'border-collapse', equals: 'collapse', label: 'The table borders are collapsed' },
            { kind: 'style', selector: 'td', prop: 'border-top-style', equals: 'solid', label: 'Cells have a border' },
            { kind: 'style', selector: 'td', prop: 'padding-top', contains: 'px', label: 'Cells have padding' },
            { kind: 'style', selector: 'a', prop: 'text-decoration-line', equals: 'none', label: 'Links have no underline' },
            { kind: 'source', pattern: 'a:hover[\\s\\S]{0,120}text-decoration\\s*:\\s*underline', label: 'Hovering restores the underline' },
          ],
        },
      },

      { b: 'h2', text: 'Then do it for real' },
      {
        b: 'p',
        text: 'Take the four-page site you built in Module 4. Create one file, `styles/main.css`, paste your stylesheet into it, and add this line to the `<head>` of all four pages:',
      },
      {
        b: 'code',
        lang: 'html',
        code: `<link rel="stylesheet" type="text/css" href="styles/main.css">`,
      },
      {
        b: 'p',
        text: 'Now change one colour in that file and refresh any page. All four update. That moment — one edit, four pages — is what this entire module was building towards, and it is the answer to “why not just use `<font>`?”',
      },

      {
        b: 'recap',
        items: [
          'Order a stylesheet: reset → body → typography → components → one-offs.',
          'Set inherited properties once on `body` and override only what differs.',
          'One external stylesheet linked from every page is the whole point of CSS.',
          'Validate before you call it finished — the browser will not tell you what it ignored.',
        ],
      },
    ],
  },
]

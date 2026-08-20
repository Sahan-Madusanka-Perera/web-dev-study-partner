import type { Lesson } from '../../types/content'

export const m5LessonsB: Lesson[] = [
  // ── 5.5 ──────────────────────────────────────────────────────
  {
    id: 'm5l5',
    slug: 'text-and-fonts',
    title: 'Styling text',
    summary:
      'Font family, size, weight, alignment, transformation, indentation, decoration and shadow — the properties that carry most of a design.',
    minutes: 17,
    outcomes: ['Applies various CSS formatting in HTML web pages to improve the appearance'],
    blocks: [
      {
        b: 'lead',
        text: 'Most of what makes a page look designed is typography. These properties are also the most heavily examined part of CSS, so it is worth being able to write each one from memory.',
      },

      { b: 'h2', text: 'Font properties' },
      {
        b: 'keyvals',
        items: [
          {
            k: 'font-family',
            v: 'Defines the font type. Lists **several fonts as fallbacks**, so if the first is unavailable the browser tries the next: `font-family: Arial, Helvetica, sans-serif;`',
          },
          { k: 'font-size', v: 'Sets the size of the font — `16px`, `1.5rem`, `120%`, `1.2em`, or a named value such as `large` or `x-large`.' },
          { k: 'font-style', v: 'Defines italic or oblique text: `normal`, `italic`, `oblique`.' },
          { k: 'font-weight', v: 'Sets the thickness: `normal`, `bold`, `lighter`, or a number from `100` to `900`.' },
          { k: 'font-variant', v: 'Defines the use of small-caps text: `font-variant: small-caps;`' },
          { k: 'line-height', v: 'The vertical space each line occupies. `1.6` (unitless) is a good default for body text.' },
        ],
      },
      {
        b: 'note',
        tone: 'exam',
        title: 'Why font-family lists several fonts',
        text: '`font-family: Arial, Helvetica, sans-serif;` makes the browser first look for **Arial**; if it is not available on that computer, it looks for **Helvetica**; and if that too is missing, it falls back to any **sans-serif** face. The last item should always be a generic family — `serif`, `sans-serif` or `monospace` — so there is always something that works.',
      },
      {
        b: 'lab',
        spec: {
          lab: 'css',
          title: 'Font properties, live',
          html: `<h1>Vidya College</h1>
<p class="lead">Serving students since 1974.</p>
<p>Ordinary body text, set for comfortable reading over
   several lines so that line-height has something to do.</p>`,
          css: `body {
  font-family: Georgia, "Times New Roman", serif;
  margin: 20px;
}

h1 {
  font-size: 32px;
  font-weight: 700;
  font-variant: small-caps;
}

.lead {
  font-style: italic;
  font-size: 18px;
  color: #6b6b6b;
}

p {
  line-height: 1.6;
}

/* Try: change body font-family to
   Arial, Helvetica, sans-serif
   and watch every element follow, because
   font properties are inherited by children. */`,
          height: 320,
        },
      },
      {
        b: 'note',
        tone: 'tip',
        title: 'Inheritance',
        text: 'Font and colour properties are **inherited**: set them on `body` and every element inside inherits them unless it says otherwise. That is why professional stylesheets start with a `body` rule and then override only what needs to differ.',
      },

      { b: 'h2', text: 'Colour and alignment' },
      {
        b: 'keyvals',
        items: [
          { k: 'color', v: 'Sets the colour of the **text**: `color: #333333;` — a name, a hex code, `rgb()` or `rgba()`.' },
          { k: 'text-align', v: 'Horizontal alignment: `left`, `right`, `center`, `justify`.' },
          {
            k: 'text-transform',
            v: 'Changes capitalisation: `none` (default), `capitalize` (first letter of each word), `uppercase`, `lowercase`.',
          },
          { k: 'text-indent', v: 'Indents the **first line** of a block. Takes a length or a percentage.' },
        ],
      },
      {
        b: 'lab',
        spec: {
          lab: 'css',
          title: 'Transformation and indentation',
          html: `<p class="a">this heading is written in lowercase</p>
<p class="b">this heading is written in lowercase</p>
<p class="c">this heading is written in lowercase</p>
<p class="d">An indented first line, for a paragraph long enough
   that the second line shows the difference clearly.</p>`,
          css: `.a { text-transform: uppercase; }
.b { text-transform: capitalize; }
.c { text-transform: none; }

.d {
  text-indent: 40px;
  text-align: justify;
}`,
          height: 300,
          note: 'Notice that `text-transform` changes only what is **displayed** — the underlying HTML still says lowercase. That matters if the text is copied or read by a screen reader.',
        },
      },

      { b: 'h2', text: 'Text decoration' },
      {
        b: 'p',
        text: '`text-decoration` is a family of four properties that control lines drawn through text.',
      },
      {
        b: 'table',
        head: ['Property', 'Values', 'Effect'],
        rows: [
          ['`text-decoration-line`', '`none`, `underline`, `overline`, `line-through`', 'Which line to draw. Multiple values can be combined: `underline overline`.'],
          ['`text-decoration-color`', 'any colour', 'The colour of the line — it does not have to match the text.'],
          ['`text-decoration-style`', '`solid`, `double`, `dotted`, `dashed`, `wavy`', 'The style of the line.'],
          ['`text-decoration-thickness`', 'a length, or `auto`', 'How thick the line is. `auto` adjusts to the font size.'],
        ],
      },
      {
        b: 'p',
        text: 'All four can be written in one **shorthand** declaration, in this order: line, style, colour, thickness.',
      },
      {
        b: 'lab',
        spec: {
          lab: 'css',
          title: 'Decoration lines',
          html: `<p class="a">Underlined</p>
<p class="b">Overlined</p>
<p class="c">Struck through</p>
<p class="d">Underlined and overlined together</p>
<p class="e">A dotted red underline, 2px thick — written shorthand</p>`,
          css: `.a { text-decoration: underline; }
.b { text-decoration: overline; }
.c { text-decoration: line-through; }
.d { text-decoration: underline overline; }

/* Shorthand: line  style  colour  thickness */
.e { text-decoration: underline dotted red 2px; }`,
          height: 300,
        },
      },

      { b: 'h2', text: 'Text shadow' },
      {
        b: 'p',
        text: '`text-shadow` adds a shadow effect to text. It takes up to four values.',
      },
      {
        b: 'code',
        lang: 'css',
        code: `text-shadow: <h-offset> <v-offset> <blur> <color>;

/* Positive h-offset  → shadow moves right
   Negative h-offset  → shadow moves left
   Positive v-offset  → shadow moves down
   Negative v-offset  → shadow moves up
   blur (optional)    → how blurry, default 0
   color              → the shadow colour        */

h2 {
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
}`,
      },
      {
        b: 'lab',
        spec: {
          lab: 'css',
          title: 'Move the shadow around',
          html: `<h2 class="a">Down and right</h2>
<h2 class="b">Up and left</h2>
<h2 class="c">No blur — a hard shadow</h2>`,
          css: `h2 { font-family: Georgia, serif; font-size: 30px; }

.a { text-shadow:  3px  3px 5px rgba(0,0,0,0.5); }
.b { text-shadow: -3px -3px 5px rgba(0,0,0,0.5); }
.c { text-shadow:  3px  3px 0   #c2831c; }

/* Change the third number — the blur — to 0 and then
   to 12 and watch the shadow harden and soften. */`,
          height: 300,
        },
      },

      { b: 'h2', text: 'Spacing essentials' },
      {
        b: 'keyvals',
        items: [
          { k: 'letter-spacing', v: 'Changes the space between individual characters.' },
          { k: 'word-spacing', v: 'Controls the space between words.' },
          { k: 'line-height', v: 'Line spacing — the vertical gap between lines.' },
          { k: 'text-indent', v: 'Indentation of the first line.' },
          { k: 'white-space', v: 'Controls how whitespace is handled. `nowrap` prevents text from wrapping onto a second line.' },
          { k: 'border-spacing', v: 'The space between table cells — covered with tables, later in this module.' },
        ],
      },

      {
        b: 'challenge',
        spec: {
          id: 'm5c3',
          title: 'Typeset a notice',
          brief:
            'Style the notice so that: the `<body>` uses **Arial with Helvetica and sans-serif as fallbacks**; the `<h1>` is **centred** and **uppercase**; and the paragraph has a **line-height of 1.8** and is **justified**.',
          lang: 'css',
          starter: `<h1>School notice</h1>
<p>All Grade 13 students should report to the main hall
   at 8 a.m. on Monday for the term test briefing. Bring
   your admission card and a blue pen.</p>`,
          starterCss: `body {
  margin: 20px;
}

/* Add your rules below */
`,
          hints: [
            'A font fallback list is comma-separated and ends with a generic family: `Arial, Helvetica, sans-serif`.',
            'Centring text is `text-align: center;` and uppercase is `text-transform: uppercase;` — both on the h1.',
            '`line-height: 1.8;` takes no unit. Justified text is `text-align: justify;`.',
          ],
          solution: `<h1>School notice</h1>
<p>All Grade 13 students should report to the main hall
   at 8 a.m. on Monday for the term test briefing. Bring
   your admission card and a blue pen.</p>`,
          solutionCss: `body {
  margin: 20px;
  font-family: Arial, Helvetica, sans-serif;
}

h1 {
  text-align: center;
  text-transform: uppercase;
}

p {
  line-height: 1.8;
  text-align: justify;
}`,
          checks: [
            { kind: 'source', pattern: 'font-family\\s*:\\s*Arial\\s*,\\s*Helvetica\\s*,\\s*sans-serif', label: 'body uses the Arial, Helvetica, sans-serif fallback list' },
            { kind: 'style', selector: 'h1', prop: 'text-align', equals: 'center', label: 'The heading is centred' },
            { kind: 'style', selector: 'h1', prop: 'text-transform', equals: 'uppercase', label: 'The heading is uppercase' },
            { kind: 'style', selector: 'p', prop: 'text-align', equals: 'justify', label: 'The paragraph is justified' },
            { kind: 'source', pattern: 'line-height\\s*:\\s*1\\.8', label: 'The paragraph has line-height 1.8' },
          ],
        },
      },

      {
        b: 'quiz',
        questions: [
          {
            kind: 'mcq',
            q: 'In `font-family: Arial, Helvetica, sans-serif;`, what happens if Arial is not installed?',
            options: [
              'No text is displayed',
              'The browser tries Helvetica, then any sans-serif font',
              'The browser downloads Arial automatically',
              'It falls back to Times New Roman',
            ],
            answer: 1,
            why: 'The list is tried in order, left to right. Ending with a generic family guarantees something usable.',
          },
          {
            kind: 'mcq',
            q: 'Which property makes the first letter of every word a capital?',
            options: ['font-variant: small-caps', 'text-transform: uppercase', 'text-transform: capitalize', 'font-weight: bold'],
            answer: 2,
            why: '`capitalize` raises the first letter of each word. `uppercase` raises every letter.',
          },
          {
            kind: 'mcq',
            q: 'In `text-shadow: -3px 4px 6px grey;`, where does the shadow sit?',
            options: ['Right and up', 'Left and down', 'Left and up', 'Right and down'],
            answer: 1,
            why: 'A negative horizontal offset moves it **left**; a positive vertical offset moves it **down**. The third value is the blur.',
          },
          {
            kind: 'multi',
            q: 'Which values are valid for `text-decoration-line`?',
            options: ['underline', 'overline', 'italic', 'line-through', 'none'],
            answers: [0, 1, 3, 4],
            why: '`italic` belongs to `font-style`, not to text decoration.',
          },
          {
            kind: 'fill',
            q: 'Which property prevents a line of text from wrapping onto a second line?',
            accept: ['white-space', 'white space', 'white-space: nowrap', 'nowrap'],
            why: '`white-space: nowrap;` keeps the text on one line, however narrow the container.',
            placeholder: 'property name',
          },
        ],
      },

      {
        b: 'recap',
        items: [
          '`font-family` lists fallbacks and ends with a generic family.',
          '`font-size`, `font-style`, `font-weight`, `font-variant`, `line-height` cover the rest of the font.',
          '`color`, `text-align`, `text-transform`, `text-indent` shape the block.',
          '`text-decoration` = line + style + colour + thickness; `text-shadow` = h-offset, v-offset, blur, colour.',
          'Font and colour properties are inherited — set them once on `body`.',
        ],
      },
    ],
  },

  // ── 5.6 ──────────────────────────────────────────────────────
  {
    id: 'm5l6',
    slug: 'colours-and-backgrounds',
    title: 'Colours and backgrounds',
    summary:
      'The `background` shorthand has seven parts in a fixed order — and `none` is a value worth respecting.',
    minutes: 12,
    outcomes: ['Applies various CSS formatting in HTML web pages to improve the appearance'],
    blocks: [
      {
        b: 'lead',
        text: 'Everything you learned about colour notation in Module 3 applies unchanged — names, hex and `rgb()`. CSS simply adds a fourth form and a great deal more control over where colour goes.',
      },

      { b: 'h2', text: 'rgba and transparency' },
      {
        b: 'p',
        text: '`rgba()` adds a fourth value, **alpha**, between `0` (fully transparent) and `1` (fully opaque). It is what lets a colour sit over something else without hiding it.',
      },
      {
        b: 'lab',
        spec: {
          lab: 'css',
          title: 'The alpha channel',
          html: `<div class="strip">
  <span class="box a">1.0</span>
  <span class="box b">0.6</span>
  <span class="box c">0.3</span>
</div>`,
          css: `.strip {
  background: #c2831c;
  padding: 16px;
}

.box {
  display: inline-block;
  padding: 20px 24px;
  color: white;
  font-family: Arial, sans-serif;
}

.a { background: rgba(35, 40, 66, 1);   }
.b { background: rgba(35, 40, 66, 0.6); }
.c { background: rgba(35, 40, 66, 0.3); }`,
          height: 220,
        },
      },

      { b: 'h2', text: 'The background properties' },
      {
        b: 'keyvals',
        items: [
          { k: 'background-color', v: 'Sets the background colour.' },
          { k: 'background-image', v: 'Specifies an image: `background-image: url("bg.jpg");`' },
          { k: 'background-position', v: 'The starting position of the image — `left top`, `center`, `50% 50%`, and so on.' },
          { k: 'background-size', v: 'The size of the image — `cover`, `contain`, or explicit lengths.' },
          { k: 'background-repeat', v: 'How or whether the image repeats: `repeat`, `repeat-x`, `repeat-y`, `no-repeat`.' },
          { k: 'background-attachment', v: 'Whether the background is `fixed` in place or `scroll`s with the page.' },
          { k: 'background-origin', v: 'The positioning area for the background image.' },
        ],
      },
      {
        b: 'p',
        text: 'All of them can be written in one **shorthand** — and the order matters.',
      },
      {
        b: 'code',
        lang: 'css',
        code: `background: [color] [image] [position] / [size]
            [repeat] [attachment] [origin];

/* For example */
body {
  background: #f5f0e6 url("paper.jpg") center / cover
              no-repeat fixed;
}`,
      },
      {
        b: 'note',
        tone: 'exam',
        title: 'The rule for every shorthand',
        text: 'You may **skip** values you do not need — omitted ones fall back to their defaults. You may **not change the order**. That rule holds for `background`, `border`, `font`, `list-style` and `text-decoration` alike.',
      },
      {
        b: 'lab',
        spec: {
          lab: 'css',
          title: 'A background that behaves',
          html: `<div class="hero">
  <h1>Vidya College</h1>
</div>

<div class="tile">Tiled, repeating background</div>`,
          css: `.hero {
  background: #232842 url("media/beach.jpg") center / cover no-repeat;
  color: white;
  padding: 48px 20px;
  text-align: center;
  font-family: Georgia, serif;
}

.tile {
  background: url("media/logo.png") repeat;
  padding: 40px;
  color: #232842;
  font-family: Arial, sans-serif;
  font-weight: bold;
}

/* Change "cover" to "contain", then "no-repeat"
   to "repeat", and watch each one take effect. */`,
          height: 340,
        },
      },

      { b: 'h2', text: 'The value of `none`' },
      {
        b: 'p',
        text: '`none` looks like it does nothing, and it is one of the most useful values in CSS.',
      },
      {
        b: 'ul',
        items: [
          '**It removes a default style.** The classic case is `text-decoration: none;` to take the underline off links.',
          '**It removes styles added elsewhere** — an internal or external rule you cannot edit.',
          '**It improves clarity.** Writing `none` explicitly says the style was *intentionally removed*, not forgotten.',
        ],
      },
      {
        b: 'lab',
        spec: {
          lab: 'css',
          title: 'Removing what the browser assumed',
          html: `<ul class="plain">
  <li><a href="#">Home</a></li>
  <li><a href="#">About</a></li>
  <li><a href="#">Contact</a></li>
</ul>`,
          css: `.plain {
  list-style: none;   /* removes the bullets   */
  padding: 0;         /* removes the indent    */
  margin: 0;
}

.plain a {
  text-decoration: none;  /* removes the underline */
  color: #232842;
  font-family: Arial, sans-serif;
}

.plain li {
  display: inline-block;
  margin-right: 16px;
}

/* Delete the three "none" values one at a time
   to see exactly what each one was hiding. */`,
          height: 240,
          note: 'Those four lines are how a bulleted list becomes a navigation bar — and it is the single most common piece of CSS on the web.',
        },
      },

      {
        b: 'quiz',
        questions: [
          {
            kind: 'mcq',
            q: 'What does the `a` in `rgba(0, 0, 0, 0.5)` control?',
            options: ['The amount of amber', 'The alpha — how transparent the colour is', 'The angle of a gradient', 'The area it covers'],
            answer: 1,
            why: 'Alpha runs from 0 (fully transparent) to 1 (fully opaque). 0.5 is half see-through.',
          },
          {
            kind: 'mcq',
            q: 'Which value stops a background image from tiling?',
            options: ['background-repeat: none', 'background-repeat: no-repeat', 'background-image: none', 'background-attachment: fixed'],
            answer: 1,
            why: 'The value is `no-repeat`. `background-image: none` would remove the image altogether.',
          },
          {
            kind: 'tf',
            q: 'In a shorthand property you may leave out values you do not need, but you may not change their order.',
            answer: true,
            why: 'Omitted values fall back to their defaults; reordering them breaks the declaration. This applies to every CSS shorthand.',
          },
          {
            kind: 'fill',
            q: 'Which declaration removes the underline from a link?',
            accept: ['text-decoration: none', 'text-decoration:none', 'text-decoration: none;'],
            why: '`text-decoration: none;` — the most-used `none` in CSS.',
            placeholder: 'property: value',
          },
        ],
      },

      {
        b: 'recap',
        items: [
          '`rgba()` adds an alpha channel from 0 to 1.',
          'Background parts: colour, image, position, size, repeat, attachment, origin — and one shorthand in that order.',
          'Shorthands let you skip values but never reorder them.',
          '`none` deliberately removes a default: `list-style: none`, `text-decoration: none`.',
        ],
      },
    ],
  },

  // ── 5.7 ──────────────────────────────────────────────────────
  {
    id: 'm5l7',
    slug: 'links-and-lists',
    title: 'Styling links and lists',
    summary:
      'Five link states in one fixed order, and the three list-style properties that turn bullets into anything you like.',
    minutes: 13,
    outcomes: ['Applies various CSS formatting in HTML web pages to improve the appearance'],
    blocks: [
      {
        b: 'lead',
        text: 'Links change appearance depending on what the user is doing with them. CSS calls those situations **states**, and there are five worth styling.',
      },

      { b: 'widget', spec: { widget: 'link-states' } },

      { b: 'h2', text: 'The five states' },
      {
        b: 'keyvals',
        items: [
          { k: 'a:link', v: 'The default appearance of an **unvisited** link. Blue by default.' },
          { k: 'a:visited', v: 'A link the user has **already opened**. Purple by default.' },
          { k: 'a:hover', v: 'While the **mouse pointer is over** the link.' },
          { k: 'a:active', v: 'While the link is **being clicked** — the mouse button is held down.' },
          { k: 'a:focus', v: 'When the link **gains focus**, usually from keyboard navigation with the Tab key.' },
        ],
      },
      {
        b: 'code',
        lang: 'css',
        code: `a:link    { color: blue; }
a:visited { color: purple; }
a:hover   { color: red; text-decoration: underline; }
a:active  { color: green; }
a:focus   { outline: 2px solid orange; }`,
      },

      { b: 'h2', text: 'LVHA — the order that matters' },
      {
        b: 'note',
        tone: 'exam',
        title: 'Write them in this order',
        text: '**L — :link · V — :visited · H — :hover · A — :active.** CSS applies styles based on specificity **and order**. If the link states are not written in the correct order, some styles will silently fail to work — a `:link` rule written after `:hover` will override the hover, so hovering appears to do nothing.',
      },
      {
        b: 'lab',
        spec: {
          lab: 'css',
          title: 'Break the order on purpose',
          html: `<p><a href="#one">Hover over me</a></p>
<p><a href="#two">And me</a></p>`,
          css: `/* CORRECT — L V H A */
a:link    { color: blue; }
a:visited { color: purple; }
a:hover   { color: red; }
a:active  { color: green; }

/* Now move the a:link rule to the BOTTOM of this
   pane and hover again. The hover stops working,
   because :link comes later and wins. */`,
          height: 240,
        },
      },
      {
        b: 'h3',
        text: 'Removing the default look',
      },
      {
        b: 'p',
        text: 'Links have default styles — a blue colour and an underline. `text-decoration` and `color` are used to remove them.',
      },
      {
        b: 'code',
        lang: 'css',
        code: `a {
  text-decoration: none;
  color: #232842;
}`,
      },
      {
        b: 'note',
        tone: 'warn',
        title: 'If you remove the underline, replace the signal',
        text: 'The underline is how a reader knows a word is clickable. Strip it and you must give the link some other distinguishing mark — a different colour, a weight change, an underline on hover. A link that looks exactly like body text is not a link as far as the reader is concerned.',
      },
      {
        b: 'p',
        text: 'The same applies to `:focus`. It is what a keyboard user relies on to know where they are on the page. Style it — never remove it with `outline: none` and nothing in its place.',
      },

      { b: 'h2', text: 'List style properties' },
      {
        b: 'h3',
        text: 'list-style-type',
      },
      {
        b: 'p',
        text: 'Specifies the type of marker — bullet, number or character — used for list items.',
      },
      {
        b: 'table',
        head: ['For `<ul>`', 'For `<ol>`', 'Produces'],
        rows: [
          ['`disc` (default)', '`decimal` (default)', '● · 1. 2. 3.'],
          ['`circle`', '`decimal-leading-zero`', '○ · 01. 02. 03.'],
          ['`square`', '`lower-roman` / `upper-roman`', '▪ · i. ii. iii. / I. II. III.'],
          ['`none`', '`lower-alpha` / `upper-alpha`', '(no marker) · a. b. c. / A. B. C.'],
          ['', '`lower-greek`', 'α. β. γ.'],
        ],
      },
      {
        b: 'h3',
        text: 'list-style-position',
      },
      {
        b: 'p',
        text: 'Defines whether the marker appears **inside** or **outside** the content box of the list item.',
      },
      {
        b: 'compare',
        left: {
          title: 'outside (default)',
          items: ['The marker sits outside the text block', 'Wrapped lines align under the text, not under the marker', 'The usual, tidy look'],
        },
        right: {
          title: 'inside',
          items: ['The marker sits inside the text block', 'Wrapped lines align under the marker', 'Useful when you need a flush left edge'],
        },
      },
      {
        b: 'h3',
        text: 'list-style-image',
      },
      {
        b: 'p',
        text: 'Allows a **custom image** as the marker: `list-style-image: url("bullet.png");` The default is `none`.',
      },
      {
        b: 'h3',
        text: 'The list-style shorthand',
      },
      {
        b: 'code',
        lang: 'css',
        code: `list-style: <type> <position> <image>;

ul {
  list-style: square inside url("bullet.png");
}

/* And the classic reset */
ul, ol {
  list-style: none;
  padding: 0;
  margin: 0;
}`,
      },
      {
        b: 'lab',
        spec: {
          lab: 'css',
          title: 'Every marker style',
          html: `<ol class="roman"><li>Item</li><li>Item</li><li>Item</li></ol>
<ol class="alpha"><li>Item</li><li>Item</li><li>Item</li></ol>
<ol class="greek"><li>Item</li><li>Item</li><li>Item</li></ol>
<ul class="sq"><li>Item</li><li>Item</li></ul>
<ul class="none"><li>Item</li><li>Item</li></ul>`,
          css: `.roman { list-style-type: upper-roman; }
.alpha { list-style-type: lower-alpha; }
.greek { list-style-type: lower-greek; }
.sq    { list-style-type: square; }
.none  { list-style: none; padding-left: 0; }

li { margin-bottom: 4px; font-family: Arial, sans-serif; }`,
          height: 400,
        },
      },

      {
        b: 'challenge',
        spec: {
          id: 'm5c4',
          title: 'Build a horizontal navigation bar',
          brief:
            'Turn the list into a navigation bar: **no bullets**, **no left padding**, items **side by side**, links with **no underline**, and a **red** colour on hover. Write the link states in LVHA order.',
          lang: 'css',
          starter: `<ul class="nav">
  <li><a href="index.html">Home</a></li>
  <li><a href="about.html">About</a></li>
  <li><a href="contact.html">Contact</a></li>
</ul>`,
          starterCss: `.nav {
  /* remove the bullets and the indent */
}

/* put the items side by side */

/* style the links */
`,
          hints: [
            'Bullets go with `list-style: none;` and the indent with `padding: 0;`.',
            'Items sit side by side with `display: inline-block;` on the `<li>`.',
            'The hover state is `.nav a:hover { color: red; }` — and it must come after `:link` and `:visited`.',
          ],
          solution: `<ul class="nav">
  <li><a href="index.html">Home</a></li>
  <li><a href="about.html">About</a></li>
  <li><a href="contact.html">Contact</a></li>
</ul>`,
          solutionCss: `.nav {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav li {
  display: inline-block;
  margin-right: 18px;
}

.nav a:link    { color: #232842; text-decoration: none; }
.nav a:visited { color: #232842; }
.nav a:hover   { color: red; }
.nav a:active  { color: green; }`,
          checks: [
            { kind: 'style', selector: '.nav', prop: 'list-style-type', equals: 'none', label: 'The bullets are removed' },
            { kind: 'style', selector: '.nav', prop: 'padding-left', equals: '0px', label: 'The left indent is removed' },
            { kind: 'style', selector: '.nav li', prop: 'display', contains: 'inline', label: 'The items sit side by side' },
            { kind: 'style', selector: '.nav a', prop: 'text-decoration-line', equals: 'none', label: 'The links have no underline' },
            { kind: 'source', pattern: 'a:hover[\\s\\S]*color\\s*:\\s*red', label: 'Hovering turns a link red' },
            { kind: 'source', pattern: 'a:link[\\s\\S]*a:hover', label: 'The :link rule is written before the :hover rule (LVHA order)' },
          ],
        },
      },

      {
        b: 'quiz',
        questions: [
          {
            kind: 'order',
            q: 'Put the link states into the correct writing order.',
            items: ['a:link', 'a:visited', 'a:hover', 'a:active'],
            why: '**L V H A** — link, visited, hover, active. Out of order, later rules cancel earlier ones and hovering appears broken.',
          },
          {
            kind: 'mcq',
            q: 'Which state applies when a link is reached with the Tab key?',
            options: ['a:hover', 'a:active', 'a:focus', 'a:visited'],
            answer: 2,
            why: '`:focus` is keyboard focus. Removing it without a replacement makes a site unusable without a mouse.',
          },
          {
            kind: 'mcq',
            q: 'What does `list-style-position: inside` change?',
            options: [
              'The colour of the marker',
              'Whether the marker sits inside or outside the list item’s content box',
              'Whether the list is ordered',
              'The indentation of the whole list',
            ],
            answer: 1,
            why: 'With `inside`, wrapped lines align under the marker; with `outside` (the default) they align under the text.',
          },
          {
            kind: 'fill',
            q: 'Write the shorthand declaration that removes list markers entirely.',
            accept: ['list-style: none', 'list-style:none', 'list-style: none;', 'list-style-type: none'],
            why: '`list-style: none;` — usually paired with `padding: 0` to remove the indent as well.',
            placeholder: 'property: value',
          },
        ],
      },

      {
        b: 'recap',
        items: [
          'Five link states: `:link`, `:visited`, `:hover`, `:active`, `:focus`.',
          'Write them **L V H A**, or later rules cancel earlier ones.',
          'Removing the underline means providing another signal that the text is a link.',
          '`list-style-type`, `list-style-position`, `list-style-image` — and the `list-style` shorthand in that order.',
        ],
      },
    ],
  },

  // ── 5.8 ──────────────────────────────────────────────────────
  {
    id: 'm5l8',
    slug: 'the-box-model',
    title: 'The box model',
    summary:
      'Every element is four nested rectangles. Understand them and layout stops being guesswork.',
    minutes: 15,
    outcomes: ['Applies various CSS formatting in HTML web pages to improve the appearance'],
    blocks: [
      {
        b: 'lead',
        text: 'The **CSS Box Model** describes the rectangular boxes generated for elements on a web page. Introduced in CSS2, it is the single idea that explains why elements sit where they do.',
      },

      { b: 'widget', spec: { widget: 'box-model' } },

      { b: 'h2', text: 'The four areas' },
      {
        b: 'dl',
        items: [
          {
            term: 'Content',
            desc: 'The innermost part — the actual text or image. `width` and `height` define the size of **this area**, not of the whole box.',
          },
          {
            term: 'Padding',
            desc: 'The space **between the content and the border**. It clears the area around the content. Set with `padding`.',
          },
          {
            term: 'Border',
            desc: 'A border that wraps around the padding (or the content, if there is no padding). Its width, style and colour are controlled with `border`.',
          },
          {
            term: 'Margin',
            desc: 'The space **outside the border** that separates the element from other elements. Set with `margin`.',
          },
        ],
      },
      {
        b: 'note',
        tone: 'exam',
        title: 'Padding is inside, margin is outside',
        text: 'The one-line answer: **padding pushes the content away from its own border; margin pushes other elements away from this one.** Padding takes the background colour with it; margin is always transparent.',
      },

      { b: 'h2', text: 'Working out the real size' },
      {
        b: 'p',
        text: 'By default, `width` sets only the **content** width. Everything else is added on top.',
      },
      {
        b: 'code',
        lang: 'css',
        code: `div {
  width: 200px;
  height: 100px;
  padding: 10px;
  border: 2px solid black;
  margin: 20px;
}

/* Space actually occupied, horizontally:
     200  content
   +  20   padding  (10 left + 10 right)
   +   4   border   (2 left + 2 right)
   +  40   margin   (20 left + 20 right)
   = 264px  */`,
      },
      {
        b: 'note',
        tone: 'tip',
        title: 'The exam calculation',
        text: 'Total width = **content + (padding × 2) + (border × 2) + (margin × 2)**. Questions that give you four numbers and ask for the space occupied are asking for exactly this sum.',
      },

      { b: 'h2', text: 'Writing the values' },
      {
        b: 'p',
        text: 'Both `padding` and `margin` accept one, two, three or four values.',
      },
      {
        b: 'table',
        head: ['Written as', 'Means'],
        compact: true,
        rows: [
          ['`padding: 10px;`', 'All four sides 10px'],
          ['`padding: 10px 20px;`', 'Top and bottom 10px, left and right 20px'],
          ['`padding: 10px 20px 5px;`', 'Top 10px, left and right 20px, bottom 5px'],
          ['`padding: 10px 20px 5px 15px;`', 'Top, right, bottom, left — **clockwise from the top**'],
        ],
      },
      {
        b: 'p',
        text: 'The individual properties also exist: `padding-top`, `margin-left`, and so on.',
      },
      {
        b: 'lab',
        spec: {
          lab: 'css',
          title: 'Four values, clockwise',
          html: `<div class="a">One value</div>
<div class="b">Two values</div>
<div class="c">Four values, clockwise from the top</div>`,
          css: `div {
  background: #f2ece2;
  border: 2px solid #232842;
  margin-bottom: 10px;
  font-family: Arial, sans-serif;
}

.a { padding: 10px; }
.b { padding: 10px 40px; }
.c { padding: 30px 5px 10px 60px; }

/* Remember TRBL — Top, Right, Bottom, Left.
   Some people remember it as "TRouBLe". */`,
          height: 320,
        },
      },

      { b: 'h2', text: 'Rounding and shadowing the box' },
      {
        b: 'keyvals',
        items: [
          { k: 'border-radius', v: 'Curves the four corners of the border. `border-radius: 8px;` — or `50%` to make a square into a circle.' },
          { k: 'box-shadow', v: 'Applies a shadow to the box, taking the same values as `text-shadow`: h-offset, v-offset, blur, colour.' },
        ],
      },
      {
        b: 'lab',
        spec: {
          lab: 'css',
          title: 'Radius and shadow',
          html: `<div class="card">A card with rounded corners and a shadow</div>
<div class="circle">50%</div>`,
          css: `.card {
  width: 260px;
  padding: 20px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 2px 4px 12px rgba(0, 0, 0, 0.18);
  font-family: Arial, sans-serif;
  margin-bottom: 20px;
}

.circle {
  width: 80px;
  height: 80px;
  background: #c2831c;
  color: white;
  border-radius: 50%;
  text-align: center;
  line-height: 80px;
  font-family: Arial, sans-serif;
}`,
          height: 330,
        },
      },

      {
        b: 'challenge',
        spec: {
          id: 'm5c5',
          title: 'Build a notice box',
          brief:
            'Style `.notice` so it has **20px of padding on all sides**, a **3px solid navy border**, a **border-radius of 8px**, and **30px of margin** below it. Then state, in the box below, the total horizontal space it occupies if its content width is 300px.',
          lang: 'css',
          starter: `<div class="notice">
  All Grade 13 students should report to the main hall at 8 a.m.
</div>
<p>The paragraph after it, to show the margin.</p>`,
          starterCss: `.notice {
  width: 300px;
  background: #fbf0d9;
  font-family: Arial, sans-serif;
  /* add padding, border, border-radius and margin-bottom */
}
`,
          hints: [
            'One value applies padding to all four sides: `padding: 20px;`.',
            'The border shorthand is `border: width style colour;` — so `border: 3px solid navy;`.',
            'Only the bottom margin is asked for: `margin-bottom: 30px;`.',
          ],
          solution: `<div class="notice">
  All Grade 13 students should report to the main hall at 8 a.m.
</div>
<p>The paragraph after it, to show the margin.</p>`,
          solutionCss: `.notice {
  width: 300px;
  background: #fbf0d9;
  font-family: Arial, sans-serif;
  padding: 20px;
  border: 3px solid navy;
  border-radius: 8px;
  margin-bottom: 30px;
}`,
          checks: [
            { kind: 'style', selector: '.notice', prop: 'padding-top', equals: '20px', label: 'Padding is 20px on all sides' },
            { kind: 'style', selector: '.notice', prop: 'border-top-width', equals: '3px', label: 'The border is 3px wide' },
            { kind: 'style', selector: '.notice', prop: 'border-top-style', equals: 'solid', label: 'The border style is solid' },
            { kind: 'style', selector: '.notice', prop: 'border-top-color', contains: 'rgb(0, 0, 128)', label: 'The border colour is navy' },
            { kind: 'style', selector: '.notice', prop: 'border-top-left-radius', equals: '8px', label: 'The corners are rounded by 8px' },
            { kind: 'style', selector: '.notice', prop: 'margin-bottom', equals: '30px', label: 'There is 30px of margin below' },
          ],
        },
      },

      {
        b: 'quiz',
        questions: [
          {
            kind: 'mcq',
            q: 'An element has `width: 300px; padding: 20px; border: 5px solid black; margin: 10px;`. How much horizontal space does it occupy in total?',
            options: ['300px', '350px', '370px', '390px'],
            answer: 2,
            why: '300 + (20 × 2) + (5 × 2) + (10 × 2) = 300 + 40 + 10 + 20 = **370px**.',
          },
          {
            kind: 'mcq',
            q: 'Which area of the box model takes on the element’s background colour?',
            options: ['Margin only', 'Content and padding', 'Margin and border', 'None of them'],
            answer: 1,
            why: 'The background extends through the content and padding, up to the border. Margin is always transparent.',
          },
          {
            kind: 'mcq',
            q: 'What does `padding: 10px 20px 5px 15px;` mean?',
            options: [
              'Left 10, top 20, right 5, bottom 15',
              'Top 10, right 20, bottom 5, left 15',
              'Top 10, bottom 20, left 5, right 15',
              'All four sides get the average',
            ],
            answer: 1,
            why: 'Four values run **clockwise from the top**: top, right, bottom, left.',
          },
          {
            kind: 'order',
            q: 'Order the box model areas from the innermost outwards.',
            items: ['Content', 'Padding', 'Border', 'Margin'],
            why: 'Content sits inside padding, inside border, inside margin.',
          },
          {
            kind: 'tf',
            q: '`margin` creates space between an element and its own border.',
            answer: false,
            why: 'That is **padding**. Margin creates space *outside* the border, between this element and its neighbours.',
          },
        ],
      },

      {
        b: 'recap',
        items: [
          'Content → padding → border → margin, innermost to outermost.',
          'Total size = content + padding×2 + border×2 + margin×2.',
          'Padding is inside the border and takes the background; margin is outside and is transparent.',
          'One, two, three or four values — four run clockwise from the top (TRBL).',
          '`border-radius` rounds the corners; `box-shadow` takes the same values as `text-shadow`.',
        ],
      },
    ],
  },
]

import type { Lesson } from '../../types/content'

export const m3LessonsA: Lesson[] = [
  // ── 3.1 ──────────────────────────────────────────────────────
  {
    id: 'm3l1',
    slug: 'your-first-page',
    title: 'Your first web page',
    summary:
      'The five tags every HTML document is built from, and the rules the browser plays by.',
    minutes: 14,
    outcomes: [
      'Explains hypertext markup language',
      'Saves the source document with suitable extensions',
      'Creates a simple web page',
    ],
    blocks: [
      {
        b: 'lead',
        text: '**HTML — HyperText Markup Language** — is a markup language used to write instructions for web browsers about how to display a website’s content, including its structure, text and media. It is not a programming language: it has no variables, no loops and no decisions. It describes, and the browser draws.',
      },

      { b: 'h2', text: 'Write, save, open' },
      {
        b: 'p',
        text: 'The entire workflow is three steps, and it has not changed in thirty years.',
      },
      {
        b: 'steps',
        items: [
          {
            title: 'Write the code in a text editor',
            text: 'Notepad is enough. A **code editor** such as VS Code adds syntax highlighting and auto-completion, which makes mistakes easier to spot. Never use a word processor — it inserts hidden formatting that breaks the file.',
          },
          {
            title: 'Save it with a .html extension',
            text: 'For example `example.html`. The extension is what tells the operating system, and later the web server, that this is a web page. `.htm` also works and means the same thing.',
          },
          {
            title: 'Open it in a web browser',
            text: 'Double-click the file. The browser reads the code and renders the page. Change the file, save, refresh the browser — that loop is how every page in this course gets built.',
          },
        ],
      },
      {
        b: 'note',
        tone: 'tip',
        title: 'On this platform',
        text: 'Every lab below runs that loop for you: type in the left pane and the right pane re-renders instantly. What you see there is a genuine browser rendering of your code, with the browser’s own default styles — not a picture of one.',
      },

      { b: 'h2', text: 'The skeleton' },
      {
        b: 'p',
        text: 'Every HTML page starts from the same five-part frame. Learn to type it from memory; you will need it in the practical.',
      },
      {
        b: 'code',
        lang: 'html',
        filename: 'index.html',
        code: `<!DOCTYPE html>
<html>
<head>
  <title>My First HTML Page</title>
</head>
<body>
  Content
</body>
</html>`,
      },
      {
        b: 'tagref',
        items: [
          {
            tag: '<!DOCTYPE html>',
            what: 'Declares the version of HTML in use. For modern pages it is always exactly this, and it means **HTML5**. Because the browser then knows the document type, it can present the page faster.',
          },
          {
            tag: '<html>',
            what: 'The **root element**. Everything else is nested inside it. All content presented to the browser for rendering must sit between `<html>` and `</html>`.',
          },
          {
            tag: '<head>',
            what: 'Holds **metadata** — information *about* the document rather than content shown in the page: the title, keywords and descriptions, author details, copyright statements, links to stylesheets.',
          },
          {
            tag: '<title>',
            what: 'The title of the document, shown on the browser tab and in the topmost bar. Search engines use it too.',
          },
          {
            tag: '<body>',
            what: 'All the content that gets rendered: text, images, links, tables and forms. Everything the visitor actually sees lives here.',
          },
        ],
      },

      {
        b: 'lab',
        spec: {
          lab: 'html',
          title: 'The skeleton, running',
          html: `<!DOCTYPE html>
<html>
<head>
  <title>My First HTML Page</title>
</head>
<body>
  Hello! This text is inside the body.
</body>
</html>`,
          height: 220,
          note: 'Try deleting the `<title>` line, then try putting text inside `<head>` instead of `<body>`. Both teach you something about where content belongs.',
        },
      },
      {
        b: 'note',
        tone: 'exam',
        title: 'Why an empty page shows nothing',
        text: 'The resource book makes a point of this: a document with the skeleton but no content **produces no output**, because there is nothing to display. If your page is blank, check that your content is inside `<body>`.',
      },

      { b: 'h2', text: 'The rules the browser plays by' },
      {
        b: 'p',
        text: 'HTML has a handful of behaviours that surprise beginners. Knowing them saves hours.',
      },
      {
        b: 'dl',
        items: [
          {
            term: 'Not case sensitive',
            desc: '`<BODY>`, `<body>` and `<Body>` are the same tag. Convention is lowercase, and you should follow it, but the browser does not care.',
          },
          {
            term: 'Errors are ignored',
            desc: 'The browser does not stop on a mistake. It guesses and carries on rendering. That is convenient and dangerous — a missing `</p>` produces no error message, just a slightly wrong page.',
          },
          {
            term: 'Extra spaces and line breaks are ignored',
            desc: 'Ten spaces render as one. Pressing Enter in your code does not break the line on screen. To force a line break you need the `<br>` tag.',
          },
          {
            term: 'The structure is hierarchical',
            desc: 'Tags nest inside tags, like boxes inside boxes. They must close in the reverse order they opened.',
          },
          {
            term: 'Files end in .html or .htm',
            desc: 'Anything else and the browser will offer to download the file instead of displaying it.',
          },
        ],
      },

      {
        b: 'lab',
        spec: {
          lab: 'html',
          title: 'Watch whitespace disappear',
          html: `<p>These          extra
spaces          and
line breaks          are all collapsed.</p>

<p>Use a br tag<br>to break a line properly.</p>`,
          height: 170,
          note: 'Add more spaces and more line breaks in the first paragraph. The rendering never changes — HTML collapses every run of whitespace into a single space.',
        },
      },

      { b: 'h2', text: 'Nesting, and how it goes wrong' },
      {
        b: 'p',
        text: 'Tags must close in the reverse of the order they opened — first opened, last closed. Think of them as brackets in maths.',
      },
      {
        b: 'compare',
        left: {
          title: 'Correct nesting',
          items: [
            '`<p><b>Bold text</b></p>`',
            '`<div><p>A paragraph</p></div>`',
            'Inner tag closes before the outer one',
          ],
        },
        right: {
          title: 'Crossed nesting',
          items: [
            '`<p><b>Bold text</p></b>`',
            'The `<b>` opened last but closed last as well',
            'Browsers will guess — and different browsers guess differently',
          ],
        },
      },

      {
        b: 'challenge',
        spec: {
          id: 'm3c1',
          title: 'Build a complete page from the skeleton',
          brief:
            'Write a full HTML5 document with all five parts of the skeleton. Give it the title **My Study Page**, and put a heading reading **Web Development** inside the body, followed by any paragraph you like.',
          lang: 'html',
          starter: `<!-- Start from scratch. Type the whole document. -->
`,
          hints: [
            'Start with `<!DOCTYPE html>` on its own line — it goes before `<html>`.',
            'Inside `<html>` you need two children: `<head>` and `<body>`.',
            'The title tag goes inside the head; the heading and the paragraph go inside the body.',
            'A first-level heading is `<h1>Web Development</h1>`.',
          ],
          solution: `<!DOCTYPE html>
<html>
<head>
  <title>My Study Page</title>
</head>
<body>
  <h1>Web Development</h1>
  <p>This is the first page I have written from memory.</p>
</body>
</html>`,
          checks: [
            { kind: 'source', pattern: '<!DOCTYPE\\s+html>', label: 'The document starts with the HTML5 doctype' },
            { kind: 'source', pattern: '<html[\\s>][\\s\\S]*</html>', label: 'There is an <html> element wrapping everything' },
            { kind: 'source', pattern: '<head[\\s>][\\s\\S]*</head>', label: 'There is a <head> section' },
            { kind: 'source', pattern: '<title>\\s*My Study Page\\s*</title>', label: 'The title is exactly "My Study Page"' },
            { kind: 'source', pattern: '<body[\\s>][\\s\\S]*</body>', label: 'There is a <body> section' },
            { kind: 'text', selector: 'h1', contains: 'web development', label: 'A heading reads "Web Development"' },
            { kind: 'selector', selector: 'p', min: 1, label: 'There is at least one paragraph' },
          ],
        },
      },

      {
        b: 'quiz',
        questions: [
          {
            kind: 'mcq',
            q: 'Which section holds the `<title>` tag?',
            options: ['<body>', '<head>', '<html> directly', '<!DOCTYPE html>'],
            answer: 1,
            why: 'The title is metadata — information about the document — so it belongs in the `<head>`. It appears on the browser tab, not in the page.',
          },
          {
            kind: 'mcq',
            q: 'A student writes `<p>Hello   there</p>` with three spaces. What appears on screen?',
            options: [
              'Hello   there, with three spaces',
              'Hello there, with one space',
              'Hellothere, with no space',
              'An error message',
            ],
            answer: 1,
            why: 'HTML collapses every run of whitespace — spaces, tabs and newlines — into a single space.',
          },
          {
            kind: 'multi',
            q: 'Which statements about HTML are true?',
            options: [
              'It is not case sensitive',
              'The browser stops rendering when it finds an error',
              'Files must be saved with a .html or .htm extension',
              'It is a programming language with loops and variables',
              'Its structure is hierarchical',
            ],
            answers: [0, 2, 4],
            why: 'Browsers ignore errors and carry on, and HTML is a **markup** language — it has no loops or variables. That is what PHP is for, in Module 7.',
          },
          {
            kind: 'fill',
            q: 'What does the abbreviation HTML stand for? (Write it in full.)',
            accept: ['hypertext markup language', 'hyper text markup language'],
            why: 'HyperText Markup Language. Hypertext because of the links; markup because tags mark up plain text.',
            placeholder: 'four words',
          },
          {
            kind: 'tf',
            q: '`<!DOCTYPE html>` is a normal HTML tag with a closing partner.',
            answer: false,
            why: 'It is a declaration, not a tag. It has no closing partner and no content — it simply tells the browser which version of HTML follows.',
          },
        ],
      },

      {
        b: 'recap',
        items: [
          'HTML describes structure; the browser decides how to draw it.',
          'Skeleton: `<!DOCTYPE html>` → `<html>` → `<head>` (with `<title>`) → `<body>`.',
          'Save as `.html`, open in a browser, edit, refresh.',
          'Not case sensitive · errors ignored · whitespace collapsed · hierarchical · tags close in reverse order.',
        ],
      },
    ],
  },

  // ── 3.2 ──────────────────────────────────────────────────────
  {
    id: 'm3l2',
    slug: 'tags-and-attributes',
    title: 'Tags, elements and attributes',
    summary:
      'Container tags, empty tags, character entities — and the key–value pairs that customise them.',
    minutes: 13,
    outcomes: [
      'Identifies appropriate HTML tags to design a single web page',
      'Analyses the arrangement of contents of a web page',
    ],
    blocks: [
      {
        b: 'lead',
        text: '**Tags** are the building blocks of an HTML document. They are enclosed in angle brackets — `<tagname>` — and they define the structure and content of a page. The combination of a tag and the content it encapsulates is called an **element**.',
      },
      {
        b: 'code',
        lang: 'html',
        code: `<p>Hello World</p>
 │      │       │
 │      │       └── closing tag
 │      └── content
 └── opening tag

  the whole thing = one ELEMENT`,
      },

      { b: 'h2', text: 'Three kinds of tag' },

      { b: 'h3', text: '1. Container tags' },
      {
        b: 'p',
        text: 'Elements that **wrap content** and typically require both an opening and a closing tag. They group elements together and give the page structure.',
      },
      {
        b: 'code',
        lang: 'html',
        code: `<div>
  <p>
    Hello World
  </p>
</div>`,
      },

      { b: 'h3', text: '2. Empty tags (self-closing)' },
      {
        b: 'p',
        text: 'Elements that do **not** require a closing tag. They are self-closing and are often used for inserting media and line breaks. There is nothing to wrap, so there is nothing to close.',
      },
      {
        b: 'code',
        lang: 'html',
        code: `<img src="image.jpg" alt="A sample image">

<input type="text" placeholder="Enter your name">

<link rel="stylesheet" href="styles.css">

<meta charset="UTF-8">

<br>
<hr>`,
      },
      {
        b: 'note',
        tone: 'exam',
        title: 'The empty tags to remember',
        text: '`<br>` `<hr>` `<img>` `<input>` `<link>` `<meta>`. If a question asks you to name an empty tag, any of these earns the mark. `<br>` is the one the resource book names explicitly: *it is referred to as an empty tag since it does not have an ending tag*.',
      },

      { b: 'h3', text: '3. Character entity tags' },
      {
        b: 'p',
        text: 'Used to represent special characters that cannot be typed directly in HTML code — symbols, punctuation marks, or characters that are reserved in HTML such as `<`, `>` and `&`. They are written as `&name;` or `&#code;`, where *name* is the entity name and *code* is the numerical code for the character.',
      },
      {
        b: 'table',
        head: ['Entity', 'Numeric form', 'Produces', 'Why you need it'],
        compact: true,
        rows: [
          ['`&lt;`', '`&#60;`', '<', 'A literal < that must not start a tag'],
          ['`&gt;`', '`&#62;`', '>', 'A literal >'],
          ['`&amp;`', '`&#38;`', '&', 'An ampersand — & starts every entity, so it needs escaping itself'],
          ['`&quot;`', '`&#34;`', '"', 'A double quotation mark inside an attribute value'],
          ['`&apos;`', '`&#39;`', '’', 'An apostrophe. Not supported in older HTML versions'],
          ['`&copy;`', '`&#169;`', '©', 'The copyright symbol, for footers'],
          ['`&reg;`', '`&#174;`', '®', 'The registered trademark symbol'],
          ['`&nbsp;`', '`&#160;`', '(space)', 'A non-breaking space — prevents a line break between words and creates extra space where normal spaces would shrink'],
        ],
      },
      {
        b: 'lab',
        spec: {
          lab: 'html',
          title: 'Entities in action',
          html: `<p>To write a tag on screen you need &lt;p&gt; and not <p>.</p>

<p>Fish &amp; chips &copy; 2026 &reg;</p>

<p>Ten&nbsp;&nbsp;&nbsp;&nbsp;spaces&nbsp;&nbsp;&nbsp;&nbsp;held&nbsp;&nbsp;&nbsp;&nbsp;open.</p>

<p>Ten    ordinary    spaces    collapse.</p>`,
          height: 200,
          note: 'Look at what happened to the first paragraph: the literal `<p>` inside it was read as a **tag**, not as text. That is exactly the problem entities solve.',
        },
      },

      { b: 'h2', text: 'Attributes' },
      {
        b: 'p',
        text: 'Attributes provide additional information about a tag and enable dynamic control over content, behaviour, appearance or functionality. They are **key–value pairs added inside the opening tag**.',
      },
      {
        b: 'code',
        lang: 'html',
        code: `<font color="blue" size="4">Styled text</font>
       └─┬──┘ └┬─┘
    attribute  attribute
      name      value`,
      },
      {
        b: 'p',
        text: 'Each attribute consists of two parts: the **attribute name** — the specific property to be set, such as `color` or `size` — and the **attribute value**, assigned to the property and enclosed in quotation marks.',
      },
      {
        b: 'p',
        text: 'This splits every tag into two families. **Predefined tags** are basic tags usable without attributes; they have default behaviour that needs no further customisation unless styled externally. **Customisable tags** support attributes.',
      },
      {
        b: 'compare',
        left: {
          title: 'Used without attributes',
          items: ['`<p>` a paragraph', '`<b>` bold', '`<h1>` a heading', '`<br>` a line break', '`<ul>` a list'],
        },
        right: {
          title: 'Commonly given attributes',
          items: [
            '`<img src="…" alt="…">`',
            '`<a href="…" target="…">`',
            '`<table border="1">`',
            '`<td colspan="2">`',
            '`<body bgcolor="lightblue">`',
          ],
        },
      },

      { b: 'h2', text: 'The two attributes on almost every tag' },
      {
        b: 'p',
        text: 'Two attributes are worth meeting now because they run through the rest of the course, especially once CSS arrives in Module 5.',
      },
      {
        b: 'dl',
        items: [
          {
            term: 'id',
            desc: 'A **unique** identifier for one element on the page: `<div id="header">`. Used for bookmarks within a page, for labelling form fields, and as a CSS selector. An id should appear only once per page.',
          },
          {
            term: 'class',
            desc: 'A label that can be shared by **many** elements of any type: `<p class="highlight">`. It tells the computer that several tags belong to the same group even if they are not the same kind of tag.',
          },
        ],
      },
      {
        b: 'note',
        tone: 'note',
        title: 'Naming rules',
        text: 'Names of classes and ids must **begin with a letter**, must not contain white space or special characters, and are **case sensitive** — `.firstParagraph` is not the same as `.FirstParagraph`.',
      },
      {
        b: 'p',
        text: 'The `<body>` tag accepts an id too: `<body id="home">`. A page with a distinctive id on the body can then be targeted for page-specific styling — a trick you will use in Module 5.',
      },

      { b: 'h2', text: 'Comments' },
      {
        b: 'p',
        text: 'HTML comments are notes in the source code that are **not displayed in the browser**. They are written between `<!--` and `-->`.',
      },
      {
        b: 'code',
        lang: 'html',
        code: `<!-- This is a comment. The browser ignores it. -->

<p>This paragraph is visible.</p>

<!--
<p>This one is commented out, so it will not appear.</p>
-->`,
      },
      {
        b: 'ul',
        items: [
          '**To explain code** — say why something is there, not what it obviously is.',
          '**To temporarily disable code** — wrap a section in a comment instead of deleting it while you experiment.',
          '**To improve readability** — mark where the header ends and the main content begins on a long page.',
        ],
      },
      {
        b: 'note',
        tone: 'warn',
        title: 'A comment is not a secret',
        text: 'Anyone can read your comments with View Source. Never write a password, an exam answer or anything private in an HTML comment.',
      },

      { b: 'h2', text: 'Every tag in the syllabus' },
      {
        b: 'p',
        text: 'You will meet these one at a time over the next lessons, but it helps to see the whole set once, and to know where to come back to when you are revising.',
      },
      { b: 'widget', spec: { widget: 'tag-explorer' } },

      {
        b: 'quiz',
        questions: [
          {
            kind: 'mcq',
            q: 'Which of these is an empty (self-closing) tag?',
            options: ['<p>', '<div>', '<br>', '<span>'],
            answer: 2,
            why: '`<br>` inserts a single line break. It has no content to wrap, so it has no closing tag.',
          },
          {
            kind: 'mcq',
            q: 'You want the text `5 < 10 & rising` to appear on screen. What must you write?',
            options: [
              '5 < 10 & rising',
              '5 &lt; 10 &amp; rising',
              '5 &gt; 10 &amp; rising',
              '5 \\< 10 \\& rising',
            ],
            answer: 1,
            why: '`<` would be read as the start of a tag and `&` as the start of an entity, so both must be escaped: `&lt;` and `&amp;`.',
          },
          {
            kind: 'mcq',
            q: 'In `<img src="bird.jpg" alt="A bird">`, what is `src`?',
            options: ['A tag', 'An attribute value', 'An attribute name', 'An element'],
            answer: 2,
            why: '`src` is the attribute **name**; `"bird.jpg"` is the attribute **value**. Together they are one key–value pair.',
          },
          {
            kind: 'tf',
            q: 'The same id can be used on several elements of a page as long as they are different kinds of tag.',
            answer: false,
            why: 'An id is meant to be **unique per page**. When you need to label several elements, that is what `class` is for.',
          },
          {
            kind: 'fill',
            q: 'Write the character entity that produces the copyright symbol ©.',
            accept: ['&copy;', '&copy', '&#169;', '&#169'],
            why: 'Either `&copy;` by name or `&#169;` by numeric code. Both produce ©.',
            placeholder: 'e.g. &xyz;',
          },
        ],
      },

      {
        b: 'recap',
        items: [
          'Tag + content = element. Container tags wrap; empty tags do not.',
          'Character entities let you write reserved characters: `&lt;` `&gt;` `&amp;` `&quot;` `&nbsp;` `&copy;`.',
          'Attributes are key–value pairs inside the opening tag: `name="value"`.',
          'An `id` is unique to one element; a `class` can be shared by many.',
          'Comments `<!-- … -->` are ignored by the browser but readable by anyone.',
        ],
      },
    ],
  },

  // ── 3.3 ──────────────────────────────────────────────────────
  {
    id: 'm3l3',
    slug: 'formatting-text',
    title: 'Formatting text',
    summary:
      'Bold, italics, underline, superscript, highlight — and the difference between looking important and being important.',
    minutes: 15,
    outcomes: ['Identifies appropriate HTML tags to design a single web page'],
    blocks: [
      {
        b: 'lead',
        text: 'The text formatting tags are the easiest marks in the paper and the fastest way to make a page look intentional. There are fifteen of them, and they fall into three groups: **weight and slant**, **size and position**, and **edits and highlights**.',
      },

      { b: 'h2', text: 'Weight and slant' },
      {
        b: 'tagref',
        items: [
          { tag: '<b>', what: 'Makes the text **bold**. Useful for highlighting keywords or important information.' },
          { tag: '<strong>', what: 'Similar to `<b>`, but adds **semantic meaning** — it says the text *is* important, not just that it looks heavy. Screen readers announce it differently.' },
          { tag: '<i>', what: 'Italicises the text. Often used for titles, quotes, or foreign words.' },
          { tag: '<em>', what: 'Adds **emphasis**, rendering the text in italics with semantic meaning attached.' },
          { tag: '<u>', what: 'Underlines the text to draw attention or emphasise it.' },
        ],
      },
      {
        b: 'note',
        tone: 'exam',
        title: 'The b/strong and i/em distinction',
        text: 'On screen `<b>` and `<strong>` look identical, and so do `<i>` and `<em>`. The difference is **meaning**: `<b>` and `<i>` are purely visual, while `<strong>` and `<em>` carry importance and emphasis. Questions asking you to distinguish them want the word *semantic*.',
      },

      { b: 'h2', text: 'Edits: inserted and deleted text' },
      {
        b: 'tagref',
        items: [
          { tag: '<ins>', what: 'Represents text that has been **inserted**; usually displayed underlined.' },
          { tag: '<del>', what: 'Represents **deleted** content within a webpage.' },
          { tag: '<s>', what: 'Renders the text with a line through it, often for marking deletions or something no longer accurate.' },
          { tag: '<strike>', what: 'Similar to `<s>`, but considered **outdated**. Do not write new code with it; do recognise it in a question.' },
        ],
      },
      {
        b: 'lab',
        spec: {
          lab: 'html',
          title: 'Showing a price change',
          html: `<p>
  Special offer:
  <del>Rs. 800</del>
  <ins>Rs. 500</ins>
</p>

<p>Normal, <b>bold</b>, <strong>strong</strong>,
   <i>italic</i>, <em>emphasis</em>, <u>underlined</u>,
   <s>struck through</s>.</p>`,
          height: 190,
          note: 'The price example is why `<del>` and `<ins>` exist as a pair: the old value stays visible, and the reader can see the change rather than being told about it.',
        },
      },

      { b: 'h2', text: 'Size and position' },
      {
        b: 'tagref',
        items: [
          { tag: '<big>', what: 'Increases the font size of the text.' },
          { tag: '<small>', what: 'Decreases the font size of the text. Good for footnotes and fine print.' },
          { tag: '<sup>', what: 'Superscript — used for exponents and ordinal numbers. `X<sup>2</sup>` gives X².' },
          { tag: '<sub>', what: 'Subscript — used in chemical formulas and indices. `C<sub>2</sub>H<sub>5</sub>OH` gives C₂H₅OH.' },
          { tag: '<mark>', what: 'Highlights text, indicating its relevance or importance. Displayed with a **yellow background** by default.' },
        ],
      },
      {
        b: 'lab',
        spec: {
          lab: 'html',
          title: 'Formulas and highlights',
          html: `<p>The area of a circle is &pi;r<sup>2</sup>.</p>

<p>Ethanol is C<sub>2</sub>H<sub>5</sub>OH.</p>

<p>The <mark>most important sentence</mark> on the page.</p>

<p><big>Bigger text</big> and <small>smaller text</small>.</p>`,
          height: 210,
          note: 'Change `sup` to `sub` in the first line and watch the 2 drop below the baseline. These two tags are examined almost every year.',
        },
      },

      { b: 'h2', text: 'Line breaks and preformatted text' },
      {
        b: 'p',
        text: 'Because HTML collapses whitespace, you need explicit tags when the spacing itself carries meaning.',
      },
      {
        b: 'tagref',
        items: [
          { tag: '<br>', what: 'Adds a **line break** to start text on a new line. An empty tag with no closing partner. Used to break a sentence into separate lines, including between paragraphs.' },
          {
            tag: '<pre>',
            what: 'Defines **preformatted text**. Content inside `<pre>` is displayed exactly as written in the HTML document — every space and every line break is preserved — and it is shown in a **monospaced font**.',
          },
        ],
      },
      {
        b: 'lab',
        spec: {
          lab: 'html',
          title: '<pre> keeps every space',
          html: `<pre>
Line 1
    Line 2 (indented)
Line 3
</pre>

<p>
Line 1
    Line 2 (indented)
Line 3
</p>`,
          height: 230,
          note: 'The same three lines, twice. `<pre>` keeps the shape; `<p>` flattens it. That is why code samples and ASCII art live inside `<pre>`.',
        },
      },
      {
        b: 'note',
        tone: 'note',
        title: 'Three kinds of typeface',
        text: 'A **monospaced** font gives every character the same width, which is why it suits code and aligned text. A **serif** font has small decorative strokes at the ends of letters, giving books and newspapers a traditional look. A **sans** font has no such strokes — clean and modern, which is why it dominates screens.',
      },

      { b: 'h2', text: 'The <font> tag' },
      {
        b: 'p',
        text: '`<font>` changes the appearance of text using three attributes. It is **deprecated in HTML5** — CSS replaced it — but it is in the syllabus and it does still render, so you must be able to read and write it.',
      },
      {
        b: 'code',
        lang: 'html',
        code: `<font color="blue" face="Arial" size="4">
  This is an example of styled text.
</font>`,
      },
      {
        b: 'keyvals',
        title: 'Attributes of <font>',
        items: [
          { k: 'color', v: 'The colour of the text. A predefined name (`red`), a hex code (`#FF0000`) or an RGB value (`rgb(255,0,0)`).' },
          { k: 'face', v: 'The font family, such as `Arial` or `Verdana`. Multiple fonts can be listed, separated by commas, in case the first is unavailable: `face="Arial, Helvetica, sans-serif"`.' },
          { k: 'size', v: 'A number from **1 to 7**, where 3 is the normal size. Similar in effect to how `<h1>`–`<h6>` set heading sizes.' },
        ],
      },
      {
        b: 'lab',
        spec: {
          lab: 'html',
          title: 'font size 1 to 7',
          html: `<font size="1" color="red">Size 1</font><br>
<font size="2" color="blue">Size 2</font><br>
<font size="3">Size 3 — the default</font><br>
<font size="4" color="green">Size 4</font><br>
<font size="7" face="Verdana">Size 7 in Verdana</font>`,
          height: 210,
          note: 'Try `size="8"`. Nothing happens — the scale stops at 7. Try `face="Comic Sans MS, cursive"` to see the fallback list in action.',
        },
      },
      {
        b: 'note',
        tone: 'warn',
        title: 'Deprecated, but still examinable',
        text: 'The resource book is explicit: *this facility for setting background colour is available in previous versions of HTML and, in HTML5, these will come under CSS.* The same is true of `<font>`, `<center>` and `align`. Learn them for the paper; use CSS for real work.',
      },

      {
        b: 'challenge',
        spec: {
          id: 'm3c2',
          title: 'Typeset a chemistry note',
          brief:
            'Produce a single paragraph that reads: **Water is H₂O** — with *Water* in bold, the 2 as a subscript — followed by a second paragraph containing the highlighted phrase *learn this formula*.',
          lang: 'html',
          starter: `<p>Water is H2O</p>

<p>learn this formula</p>`,
          hints: [
            'Bold is `<b>` … `</b>` (or `<strong>`).',
            'A subscript is `<sub>2</sub>` — it wraps only the character that should drop down.',
            'Highlighting is `<mark>` … `</mark>`, which paints a yellow background by default.',
          ],
          solution: `<p><b>Water</b> is H<sub>2</sub>O</p>

<p><mark>learn this formula</mark></p>`,
          checks: [
            { kind: 'selector', selector: 'b, strong', min: 1, label: 'Something is bold' },
            { kind: 'text', selector: 'b, strong', contains: 'water', label: 'The bold text is the word "Water"' },
            { kind: 'selector', selector: 'sub', min: 1, label: 'A <sub> element is present' },
            { kind: 'text', selector: 'sub', equals: '2', label: 'The subscript contains exactly 2' },
            { kind: 'selector', selector: 'mark', min: 1, label: 'A <mark> element is present' },
            { kind: 'text', selector: 'mark', contains: 'learn this formula', label: 'The highlighted phrase is "learn this formula"' },
          ],
        },
      },

      {
        b: 'quiz',
        questions: [
          {
            kind: 'mcq',
            q: 'Which pair of tags would you use to write H₂SO₄?',
            options: ['<sup> and <b>', '<sub> only', '<small> and <sub>', '<sup> only'],
            answer: 1,
            why: 'Both the 2 and the 4 sit **below** the baseline, so both need `<sub>`. `<sup>` raises characters — that is for exponents like x².',
          },
          {
            kind: 'mcq',
            q: 'What is the difference between `<b>` and `<strong>`?',
            options: [
              '<strong> makes text heavier than <b>',
              'They look the same, but <strong> adds the semantic meaning that the text is important',
              '<b> works only in older browsers',
              '<strong> also italicises the text',
            ],
            answer: 1,
            why: 'Visually identical; semantically different. `<strong>` says the content *is* important, which matters to screen readers and search engines.',
          },
          {
            kind: 'mcq',
            q: 'Which tag preserves the spaces and line breaks exactly as typed?',
            options: ['<p>', '<pre>', '<br>', '<mark>'],
            answer: 1,
            why: '`<pre>` is preformatted text — every space and newline survives, and it renders in a monospaced font.',
            code: undefined,
          },
          {
            kind: 'fill',
            q: 'Complete the tag that highlights text with a yellow background: `<____>important</____>`',
            accept: ['mark'],
            why: '`<mark>` — the highlighter pen of HTML.',
            placeholder: 'tag name only',
          },
          {
            kind: 'multi',
            q: 'Which of these are deprecated in HTML5 but still appear in the syllabus?',
            options: ['<font>', '<strong>', '<center>', '<marquee>', '<mark>'],
            answers: [0, 2, 3],
            why: '`<font>`, `<center>` and `<marquee>` were all replaced by CSS. `<strong>` and `<mark>` are current HTML5 tags.',
          },
        ],
      },

      {
        b: 'recap',
        items: [
          'Visual: `<b>` `<i>` `<u>` `<big>` `<small>` `<s>`. Semantic: `<strong>` `<em>` `<ins>` `<del>` `<mark>`.',
          '`<sup>` raises (x²), `<sub>` lowers (H₂O).',
          '`<br>` forces one line break; `<pre>` preserves all spacing in a monospaced font.',
          '`<font color face size>` — size runs 1 to 7, deprecated in HTML5 but examinable.',
        ],
      },
    ],
  },

  // ── 3.4 ──────────────────────────────────────────────────────
  {
    id: 'm3l4',
    slug: 'colour-in-html',
    title: 'Colour in HTML',
    summary:
      'Names, hex codes and RGB — three ways to write the same colour, and where each one is accepted.',
    minutes: 11,
    outcomes: ['Identifies appropriate HTML tags to design a single web page'],
    blocks: [
      {
        b: 'lead',
        text: 'Anywhere HTML or CSS asks for a colour, it will accept three different notations. They are interchangeable — `red`, `#FF0000` and `rgb(255,0,0)` are the same colour written three ways.',
      },

      { b: 'h2', text: 'Colour names' },
      {
        b: 'p',
        text: 'The simplest form. There are **140 standard colour names**, supported by all browsers: `red`, `blue`, `green`, `crimson`, `lightblue`, `lavender`, and so on.',
      },
      {
        b: 'code',
        lang: 'html',
        code: `<font color="red">Red Text</font>`,
      },

      { b: 'h2', text: 'Hexadecimal codes' },
      {
        b: 'p',
        text: 'A **6-digit code** specifying how much red, green and blue to mix, written as `#RRGGBB`. Each pair is a number from `00` to `FF` in hexadecimal — `00` means none of that colour and `FF` means the maximum.',
      },
      {
        b: 'ul',
        items: [
          'Increase **RR** → more red',
          'Increase **GG** → greener',
          'Increase **BB** → bluer',
          'Increase all three together → brighter',
          'Keep all three equal → a shade of grey',
        ],
      },
      {
        b: 'p',
        text: 'Each channel has 256 possible values, so **256 × 256 × 256 = 16,777,216** colours can be written this way. That is the "16.7 million colours" figure the notes quote.',
      },

      { b: 'h2', text: 'RGB values' },
      {
        b: 'p',
        text: 'The same three channels, written in decimal instead of hexadecimal: `rgb(255, 0, 0)`. Hex and RGB represent exactly the same colours, just written differently.',
      },

      { b: 'widget', spec: { widget: 'colour-mixer' } },

      { b: 'h2', text: 'Where colour goes' },
      {
        b: 'p',
        text: 'In the HTML-only style the syllabus teaches first, two attributes carry colour.',
      },
      {
        b: 'keyvals',
        items: [
          { k: 'color (on `<font>`)', v: 'Sets the colour of the text: `<font color="#FF0000">Red Text</font>`' },
          { k: 'bgcolor (on `<body>`)', v: 'Sets the background colour of the whole page: `<body bgcolor="#E6E6FA">`. The syntax is `bgcolor="color_name | hex_number | rgb_number"`.' },
          { k: 'bgcolor (on `<table>`)', v: 'Sets the background colour of a table: `<table bgcolor="lightblue">`' },
        ],
      },
      {
        b: 'lab',
        spec: {
          lab: 'html',
          title: 'A page with its own colours',
          html: `<body bgcolor="#E6E6FA">

  <font color="navy" size="6" face="Georgia">
    Vidya College
  </font>

  <p>
    <font color="rgb(120,40,40)">
      This paragraph is a dark red, written in rgb().
    </font>
  </p>

  <p>
    <font color="#0A6E3D">And this one is hex green.</font>
  </p>

</body>`,
          height: 260,
          note: 'Change `bgcolor` to a named colour such as `lightyellow`, then to `#000000`. Notice that black text on a black page is still there — it is just invisible. Contrast is a design decision, not an accident.',
        },
      },
      {
        b: 'note',
        tone: 'warn',
        title: 'Contrast matters more than colour',
        text: 'A page whose text nearly matches its background is unreadable for everyone and impossible for a visitor with low vision. Keep dark text on light backgrounds, or light text on dark ones — never mid-grey on mid-grey.',
      },
      {
        b: 'note',
        tone: 'syllabus',
        title: 'Where this is heading',
        text: 'The resource book notes that setting the background colour this way *is available in previous versions of HTML and, in HTML5, these will come under CSS.* From Module 5 onward you will write `background-color:` and `color:` instead — but the three notations for colour stay exactly the same.',
      },

      {
        b: 'quiz',
        questions: [
          {
            kind: 'mcq',
            q: 'What colour is `#00FF00`?',
            options: ['Red', 'Pure green', 'Blue', 'White'],
            answer: 1,
            why: 'The pairs are RR GG BB. Here red is `00`, green is `FF` (maximum) and blue is `00` — pure green.',
          },
          {
            kind: 'mcq',
            q: 'Which hex code produces a shade of grey?',
            options: ['#FF0000', '#8A8A8A', '#00A0FF', '#FFEE00'],
            answer: 1,
            why: 'When all three channels are **equal**, the result is grey — from `#000000` black through `#FFFFFF` white.',
          },
          {
            kind: 'fill',
            q: 'How many different colours can a 6-digit hex code express? (Write the number in digits.)',
            accept: ['16777216', '16,777,216'],
            why: '256 × 256 × 256 = 16,777,216 — the 16.7 million colours figure.',
            placeholder: 'a number',
          },
          {
            kind: 'tf',
            q: '`rgb(255,255,255)` and `#FFFFFF` are the same colour.',
            answer: true,
            why: 'Both mean maximum red, green and blue — white. Hex and RGB are two notations for the same three channels.',
          },
          {
            kind: 'mcq',
            q: 'Which attribute sets the background colour of a whole page?',
            options: ['color on <font>', 'bgcolor on <body>', 'background on <html>', 'fill on <page>'],
            answer: 1,
            why: '`<body bgcolor="…">`. The `color` attribute on `<font>` sets *text* colour, and the other two options do not exist.',
          },
        ],
      },

      {
        b: 'recap',
        items: [
          'Three notations, one colour: name, `#RRGGBB`, `rgb(r,g,b)`.',
          '140 named colours; 16,777,216 hex colours; `00` is none of a channel and `FF` is all of it.',
          'Equal channels make grey; raising all three makes it brighter.',
          '`color` on `<font>` sets text; `bgcolor` on `<body>` or `<table>` sets background. Both move to CSS later.',
        ],
      },
    ],
  },

  // ── 3.5 ──────────────────────────────────────────────────────
  {
    id: 'm3l5',
    slug: 'headings-paragraphs-rules',
    title: 'Headings, paragraphs and rules',
    summary:
      'Six levels of heading, the paragraph tag, and the horizontal rule — plus why headings matter to search engines.',
    minutes: 12,
    outcomes: [
      'Analyses the organization of contents in a web page',
      'Identifies appropriate HTML tags to design a single web page',
    ],
    blocks: [
      {
        b: 'lead',
        text: 'Headings are how a reader — and a search engine — works out the shape of a page without reading every word. Getting them right is half of good structure.',
      },

      { b: 'h2', text: 'The six heading levels' },
      {
        b: 'p',
        text: 'HTML heading tags define headings on a webpage. They range from `<h1>` to `<h6>`, where **`<h1>` is the most important** level and **`<h6>` the least**. Headings separate and introduce major divisions within a page.',
      },
      {
        b: 'lab',
        spec: {
          lab: 'html',
          title: 'All six levels',
          html: `<h1>This is Heading 1</h1>
<h2>This is Heading 2</h2>
<h3>This is Heading 3</h3>
<h4>This is Heading 4</h4>
<h5>This is Heading 5</h5>
<h6>This is Heading 6</h6>`,
          height: 260,
          note: 'Notice the browser adds space above and below each heading, and makes each one bold, without being asked. That is the browser’s **default stylesheet** — the thing CSS later overrides.',
        },
      },
      {
        b: 'note',
        tone: 'tip',
        title: 'Levels are about rank, not size',
        text: 'Do not choose `<h4>` because you want smaller text — choose it because it is a sub-sub-sub-heading. If you want a smaller `<h1>`, change its size in CSS. Using headings for size is the single most common structural mistake in student work.',
      },

      { b: 'h2', text: 'Headings and SEO' },
      {
        b: 'p',
        text: '**SEO — Search Engine Optimization** — is the practice of optimising a website so search engines can understand, index and rank it higher in search results. Heading tags help search engines understand the structure and main topics of a page.',
      },
      {
        b: 'ul',
        items: [
          '**Web crawlers** use headings to identify important content and keywords.',
          '`<h1>` shows the main topic of the page and carries **high SEO importance**.',
          '`<h2>`–`<h6>` represent subtopics and improve content understanding.',
          'Keywords placed in headings help accurate indexing.',
          '**Proper heading order** improves crawl efficiency and ranking — do not jump from `<h1>` straight to `<h4>`.',
        ],
      },

      { b: 'h2', text: 'Paragraphs' },
      {
        b: 'p',
        text: 'The `<p>` tag defines a paragraph, used to structure and display text as separate blocks with **automatic new lines before and after**. Text inside `<p>` … `</p>` is displayed as plain text.',
      },
      {
        b: 'keyvals',
        title: 'Attribute of <p>',
        items: [
          {
            k: 'align',
            v: 'Specifies text alignment — `left`, `right`, `center` or `justify`. **Deprecated in HTML5**, where `text-align` in CSS replaces it, but still in the syllabus.',
          },
        ],
      },
      {
        b: 'lab',
        spec: {
          lab: 'html',
          title: 'Paragraph alignment',
          html: `<p align="left">Left aligned — the default.</p>
<p align="center">Centred.</p>
<p align="right">Right aligned.</p>
<p align="justify">Justified text stretches each line so that both
edges line up, which is why this paragraph needs to be long enough
to wrap onto several lines before you can see the effect at all.</p>`,
          height: 240,
        },
      },

      { b: 'h2', text: 'Horizontal rules' },
      {
        b: 'p',
        text: 'The `<hr>` tag creates a horizontal rule — a line signifying a **thematic break** or separation between sections of content. It is self-closing and does not require an end tag.',
      },
      {
        b: 'keyvals',
        title: 'Attributes of <hr>',
        items: [
          { k: 'align', v: 'Aligns the rule: `left`, `right` or `center`.' },
          { k: 'color', v: 'Specifies the colour of the line.' },
          { k: 'size', v: 'Defines the thickness of the line.' },
          { k: 'width', v: 'Sets the width of the line, in pixels or as a percentage.' },
        ],
      },
      {
        b: 'lab',
        spec: {
          lab: 'html',
          title: 'Rules of different weights',
          html: `<h2>Section one</h2>
<p>Some content.</p>

<hr>

<h2>Section two</h2>
<p>More content.</p>

<hr width="50%" size="3" color="navy">

<h2>Section three</h2>
<p>The last of it.</p>

<hr id="line1" class="styled-line"
    style="height: 3px; background-color: blue; width: 50%;">`,
          height: 320,
          note: 'The last rule uses `style="…"` — inline CSS, the modern replacement for those attributes. You will meet it properly in Module 5.',
        },
      },

      { b: 'h2', text: 'Putting structure together' },
      {
        b: 'p',
        text: 'A well-structured page reads like an outline: one `<h1>` naming the page, `<h2>`s for its sections, paragraphs inside them, and rules only where a real break happens.',
      },
      {
        b: 'codeResult',
        lang: 'html',
        filename: 'notices.html',
        code: `<h1>Vidya College</h1>
<p>Serving students since 1974.</p>

<hr>

<h2>Notices</h2>
<p>The sports meet will be held on Friday.</p>

<h3>Athletics</h3>
<p>Field events begin at 8 a.m.</p>

<h3>Swimming</h3>
<p>The pool closes for practice on Thursday.</p>

<h2>Contact</h2>
<p>Telephone the office on 081-2234567.</p>`,
        resultHtml: `<h1>Vidya College</h1>
<p>Serving students since 1974.</p>
<hr>
<h2>Notices</h2>
<p>The sports meet will be held on Friday.</p>
<h3>Athletics</h3>
<p>Field events begin at 8 a.m.</p>
<h3>Swimming</h3>
<p>The pool closes for practice on Thursday.</p>
<h2>Contact</h2>
<p>Telephone the office on 081-2234567.</p>`,
        caption:
          'One `<h1>` for the page, `<h2>` for each section, `<h3>` for subsections. A crawler can rebuild the whole outline from that.',
      },

      {
        b: 'challenge',
        spec: {
          id: 'm3c3',
          title: 'Structure a page properly',
          brief:
            'Build a page about a subject you study. It needs **exactly one `<h1>`**, at least **two `<h2>` sections**, at least **three paragraphs**, and **one `<hr>`** separating the introduction from the rest.',
          lang: 'html',
          starter: `<h1>Combined Mathematics</h1>

<!-- Add an introductory paragraph, a rule,
     then two sections each with a heading and a paragraph. -->`,
          hints: [
            'One `<h1>` only — it names the whole page, so a second one would claim there are two pages here.',
            '`<hr>` is an empty tag: no closing partner.',
            'Each `<h2>` should be followed by at least one `<p>`.',
          ],
          solution: `<h1>Combined Mathematics</h1>
<p>Combined Maths is taken alongside Physics and Chemistry in the
   physical science stream.</p>

<hr>

<h2>Pure Mathematics</h2>
<p>Algebra, trigonometry, calculus and coordinate geometry.</p>

<h2>Applied Mathematics</h2>
<p>Statics, dynamics and probability, with a strong mechanics focus.</p>`,
          checks: [
            { kind: 'selector', selector: 'h1', min: 1, max: 1, label: 'There is exactly one <h1>' },
            { kind: 'selector', selector: 'h2', min: 2, label: 'There are at least two <h2> section headings' },
            { kind: 'selector', selector: 'p', min: 3, label: 'There are at least three paragraphs' },
            { kind: 'selector', selector: 'hr', min: 1, label: 'A horizontal rule separates the sections' },
            { kind: 'source', pattern: '</hr>', not: true, label: '<hr> is written as an empty tag, with no closing tag' },
          ],
        },
      },

      {
        b: 'quiz',
        questions: [
          {
            kind: 'mcq',
            q: 'Which heading tag carries the highest SEO importance?',
            options: ['<h6>', '<h1>', '<title>', '<h3>'],
            answer: 1,
            why: '`<h1>` shows the main topic of the page. `<title>` matters too, but it is not a heading tag — it lives in the `<head>`.',
          },
          {
            kind: 'mcq',
            q: 'A student wants smaller text, so writes `<h5>` instead of `<h2>` for a major section. What is wrong with that?',
            options: [
              'Nothing — heading tags are only about size',
              '<h5> is not valid HTML',
              'Heading level signals rank, so the page structure becomes wrong for readers and crawlers',
              'The text will not appear at all',
            ],
            answer: 2,
            why: 'Levels communicate hierarchy. Choose the level by rank, then change the size with CSS if you want it smaller.',
          },
          {
            kind: 'multi',
            q: 'Which attributes can be used on `<hr>`?',
            options: ['align', 'color', 'href', 'size', 'width'],
            answers: [0, 1, 3, 4],
            why: '`href` belongs to `<a>`. The rule accepts align, color, size and width.',
          },
          {
            kind: 'tf',
            q: '`<p>` adds space before and after its text automatically.',
            answer: true,
            why: 'Paragraphs are block elements displayed with automatic new lines before and after — that is what makes them separate blocks.',
          },
          {
            kind: 'order',
            q: 'Put these headings into a correct, properly ordered page structure.',
            items: [
              '<h1>Sri Lanka</h1>',
              '<h2>Provinces</h2>',
              '<h3>Central Province</h3>',
              '<h3>Southern Province</h3>',
              '<h2>Climate</h2>',
            ],
            why: 'One h1 names the page; each h2 opens a section; h3s sit inside the section they belong to. Never skip a level on the way down.',
          },
        ],
      },

      {
        b: 'recap',
        items: [
          '`<h1>`–`<h6>`: six levels, most to least important. Choose by rank, not by size.',
          'Crawlers read headings to understand a page — proper order improves indexing and ranking.',
          '`<p>` makes a block with automatic spacing; `align` is deprecated but examinable.',
          '`<hr>` is an empty tag marking a thematic break, with align, color, size and width.',
        ],
      },
    ],
  },
]

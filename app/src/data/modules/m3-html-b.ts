import type { Lesson } from '../../types/content'

export const m3LessonsB: Lesson[] = [
  // ── 3.6 ──────────────────────────────────────────────────────
  {
    id: 'm3l6',
    slug: 'lists',
    title: 'Lists',
    summary:
      'Unordered, ordered and description lists — with the numbering styles and the nesting that examiners love.',
    minutes: 16,
    outcomes: ['Organizes data using lists and tables in the web page'],
    blocks: [
      {
        b: 'lead',
        text: 'Lists are a common text element on the web, used to break up a page and highlight key points. HTML gives you three kinds, and the choice between them is about **meaning**, not appearance.',
      },

      { b: 'h2', text: 'Unordered lists' },
      {
        b: 'p',
        text: 'Used when the order of the items **does not matter**. Items are displayed with bullets. An unordered list is composed of two tags: `<ul>`, the outermost structure that declares the list, and a series of `<li>` tags inside it that create the items.',
      },
      {
        b: 'codeResult',
        lang: 'html',
        code: `<ul>
  <li>Tomatoes</li>
  <li>Onion</li>
  <li>Garlic</li>
</ul>`,
        resultHtml: '<ul><li>Tomatoes</li><li>Onion</li><li>Garlic</li></ul>',
      },
      {
        b: 'p',
        text: 'The `type` attribute defines the style of the bullet points.',
      },
      {
        b: 'keyvals',
        title: 'type values for <ul>',
        items: [
          { k: 'disc', v: 'A solid circle — **the default**.' },
          { k: 'circle', v: 'An empty circle.' },
          { k: 'square', v: 'A square bullet.' },
        ],
      },
      {
        b: 'lab',
        spec: {
          lab: 'html',
          title: 'The three bullet styles',
          html: `<ul type="disc">
  <li>Apple</li><li>Banana</li><li>Cherry</li>
</ul>

<ul type="circle">
  <li>Apple</li><li>Banana</li><li>Cherry</li>
</ul>

<ul type="square">
  <li>Apple</li><li>Banana</li><li>Cherry</li>
</ul>`,
          height: 280,
          note: 'The `<li>` tag can hold anything from a single word to several lines of text — even other lists, as you will see below.',
        },
      },

      { b: 'h2', text: 'Ordered lists' },
      {
        b: 'p',
        text: 'Used when the **sequence or order is important**. Items are displayed with numbers, letters or Roman numerals. The outer tag is `<ol>`; the item tag is still `<li>`.',
      },
      {
        b: 'codeResult',
        lang: 'html',
        code: `<ol>
  <li>Pull mask from overhead bin</li>
  <li>Place mask over face</li>
  <li>Pull strings tight</li>
</ol>`,
        resultHtml:
          '<ol><li>Pull mask from overhead bin</li><li>Place mask over face</li><li>Pull strings tight</li></ol>',
        caption: 'Steps in a safety procedure are the perfect ordered list: doing them out of order would be wrong.',
      },
      {
        b: 'p',
        text: 'Two attributes control the numbering.',
      },
      {
        b: 'table',
        head: ['Attribute', 'Values', 'Effect'],
        rows: [
          ['`type`', '`1` `A` `a` `I` `i`', 'Decimal numbers, uppercase letters, lowercase letters, uppercase Roman, lowercase Roman'],
          ['`start`', 'any number', 'The value the list begins counting from — `<ol start="100">` numbers items 100, 101, 102, …'],
        ],
      },
      {
        b: 'lab',
        spec: {
          lab: 'html',
          title: 'Five numbering styles',
          html: `<ol type="1" start="10">
  <li>Item 1</li><li>Item 2</li><li>Item 3</li>
</ol>

<ol type="A" start="2">
  <li>Introduction</li><li>Body</li><li>Conclusion</li>
</ol>

<ol type="a" start="6">
  <li>Introduction</li><li>Body</li><li>Conclusion</li>
</ol>

<ol type="I">
  <li>Item 1</li><li>Item 2</li><li>Item 3</li>
</ol>

<ol type="i" start="4">
  <li>Introduction</li><li>Body</li><li>Conclusion</li>
</ol>`,
          height: 380,
          note: 'The second list starts at **B**, not 2 — `start` counts positions, and position 2 of the alphabet is B. Same for the Roman lists. This catches people out in exams.',
        },
      },
      {
        b: 'note',
        tone: 'exam',
        title: 'The classic start trap',
        text: '`<ol type="A" start="2">` produces **B, C, D** — not 2, 3, 4, and not A, B, C. The `start` value is a *number* naming the position; the `type` decides how that position is drawn.',
      },

      { b: 'h2', text: 'Nested lists' },
      {
        b: 'p',
        text: 'Lists can be nested to any depth, and unordered and ordered lists can be combined in any sequence by nesting one within the other. A nested list goes **inside an `<li>`**, not between two `<li>`s.',
      },
      {
        b: 'codeResult',
        lang: 'html',
        code: `<ol>
  <li>Installation
    <ol>
      <li>Computer set up</li>
      <li>Monitor set up
        <ol>
          <li>Model XYZ</li>
          <li>Model ABC</li>
        </ol>
      </li>
    </ol>
  </li>
  <li>Maintenance</li>
  <li>Use</li>
</ol>`,
        resultHtml: `<ol>
  <li>Installation
    <ol><li>Computer set up</li>
    <li>Monitor set up
      <ol><li>Model XYZ</li><li>Model ABC</li></ol>
    </li></ol>
  </li>
  <li>Maintenance</li>
  <li>Use</li>
</ol>`,
        caption:
          'Each nested level restarts its numbering. Look carefully at where the inner `</ol>` and the outer `</li>` sit — that order is what makes the nesting valid.',
      },
      {
        b: 'note',
        tone: 'tip',
        title: 'How to nest without getting lost',
        text: 'Write the outer list first and check it renders. Only then open a nested list inside one `<li>`, and close it **before** closing that `<li>`. Indenting your code by one level per nesting depth makes the mistake visible.',
      },

      { b: 'h2', text: 'Description lists' },
      {
        b: 'p',
        text: 'Used to define **terms and their corresponding descriptions** — a glossary, a set of definitions, a specification sheet. Three tags work together.',
      },
      {
        b: 'tagref',
        items: [
          { tag: '<dl>', what: 'Defines the start of the description list.' },
          { tag: '<dt>', what: 'Defines a heading or topic — the *term* being described.' },
          { tag: '<dd>', what: 'Defines the description or value for that topic. Browsers indent it.' },
        ],
      },
      {
        b: 'codeResult',
        lang: 'html',
        code: `<dl>
  <dt>Python</dt>
  <dd>A general purpose programming language</dd>

  <dt>Java</dt>
  <dd>An object oriented programming language</dd>

  <dt>SQL</dt>
  <dd>A query based language</dd>
</dl>`,
        resultHtml: `<dl><dt>Python</dt><dd>A general purpose programming language</dd><dt>Java</dt><dd>An object oriented programming language</dd><dt>SQL</dt><dd>A query based language</dd></dl>`,
      },

      { b: 'h2', text: 'Choosing the right list' },
      {
        b: 'table',
        head: ['If the content is…', 'Use', 'Because'],
        rows: [
          ['A shopping list, a set of features, a menu', '`<ul>`', 'Order carries no meaning'],
          ['Steps, rankings, an exam procedure', '`<ol>`', 'Doing them out of order would be wrong'],
          ['Terms with explanations, a glossary', '`<dl>`', 'Each item is a pair, not a single value'],
          ['Rows and columns of data', '`<table>`', 'A list cannot express two dimensions — that is the next lesson'],
        ],
      },

      {
        b: 'challenge',
        spec: {
          id: 'm3c4',
          title: 'A nested revision plan',
          brief:
            'Build an **ordered list** of three subjects. Inside the *first* subject, nest an **unordered list** of two topics. So: an `<ol>` with three `<li>`, and a `<ul>` with two `<li>` living inside the first of them.',
          lang: 'html',
          starter: `<h2>Revision plan</h2>

<ol>
  <li>ICT</li>
  <li>Combined Maths</li>
  <li>Physics</li>
</ol>`,
          hints: [
            'The nested `<ul>` goes **inside** the first `<li>`, after its text.',
            'Close the `</ul>` before you close that `</li>`.',
            'The finished shape is: `<li>ICT <ul><li>…</li><li>…</li></ul> </li>`',
          ],
          solution: `<h2>Revision plan</h2>

<ol>
  <li>ICT
    <ul>
      <li>Web development</li>
      <li>Database management</li>
    </ul>
  </li>
  <li>Combined Maths</li>
  <li>Physics</li>
</ol>`,
          checks: [
            { kind: 'selector', selector: 'ol', min: 1, label: 'There is an ordered list' },
            { kind: 'selector', selector: 'ol > li', min: 3, max: 3, label: 'The ordered list has exactly three items' },
            { kind: 'selector', selector: 'ol > li:first-child ul', min: 1, label: 'An unordered list is nested inside the FIRST item' },
            { kind: 'selector', selector: 'ol > li:first-child ul > li', min: 2, label: 'That nested list has at least two items' },
          ],
        },
      },

      {
        b: 'quiz',
        questions: [
          {
            kind: 'mcq',
            q: 'What does `<ol type="A" start="3">` produce for its first three items?',
            options: ['3, 4, 5', 'A, B, C', 'C, D, E', 'iii, iv, v'],
            answer: 2,
            why: '`start="3"` means begin at the third position, and `type="A"` draws positions as uppercase letters — so C, D, E.',
          },
          {
            kind: 'mcq',
            q: 'Which tag pair defines a term and its description?',
            options: ['<ul> and <li>', '<dt> and <dd>', '<ol> and <li>', '<dl> and <li>'],
            answer: 1,
            why: 'Inside a `<dl>`, `<dt>` is the term and `<dd>` is its description.',
          },
          {
            kind: 'mcq',
            q: 'Where must a nested list be placed?',
            options: [
              'Between two <li> elements',
              'Inside an <li> element, before its closing tag',
              'After the closing </ul>',
              'Inside the <ul> tag itself as an attribute',
            ],
            answer: 1,
            why: 'A nested list belongs to the item it expands, so it goes inside that `<li>` and closes before `</li>` does.',
          },
          {
            kind: 'match',
            q: 'Match each content type to the right list.',
            pairs: [
              { left: 'Steps of a procedure', right: '<ol>' },
              { left: 'Ingredients for a recipe', right: '<ul>' },
              { left: 'A glossary of terms', right: '<dl>' },
            ],
            why: 'Order matters → ol. Order does not → ul. Term–description pairs → dl.',
          },
          {
            kind: 'fill',
            q: 'Which attribute makes an unordered list use square bullets? Write the whole attribute, e.g. `name="value"`.',
            accept: ['type="square"', "type='square'", 'type=square'],
            why: '`<ul type="square">`. The three values are disc (default), circle and square.',
            placeholder: 'name="value"',
          },
        ],
      },

      {
        b: 'recap',
        items: [
          '`<ul>` for unordered (disc, circle, square); `<ol>` for ordered (1, A, a, I, i, plus `start`); `<dl>`/`<dt>`/`<dd>` for terms and descriptions.',
          '`start` names a *position*, so `type="A" start="2"` gives B.',
          'Nested lists go inside an `<li>` and close before it does.',
          'Pick the list by meaning, not by how the bullets look.',
        ],
      },
    ],
  },

  // ── 3.7 ──────────────────────────────────────────────────────
  {
    id: 'm3l7',
    slug: 'tables',
    title: 'Tables',
    summary:
      'Three tags make a table, four more structure it, and two attributes merge cells. This lesson is examined every year.',
    minutes: 20,
    outcomes: ['Organizes data using lists and tables in the web page'],
    blocks: [
      {
        b: 'lead',
        text: 'Tables display data in a **tabular format** — rows and columns of related values. Everything about them follows from three tags, so start there and add the rest once those are automatic.',
      },

      { b: 'h2', text: 'The three tags that make a table' },
      {
        b: 'tagref',
        items: [
          { tag: '<table>', what: 'The outermost element. It contains everything else and all content.' },
          { tag: '<tr>', what: '**Table row.** Defines a single row and holds `<td>` or `<th>` elements.' },
          { tag: '<td>', what: '**Table data** — one cell. Any content displayed in the table is placed between the opening and closing `<td>` tags.' },
        ],
      },
      {
        b: 'codeResult',
        lang: 'html',
        code: `<table>
  <tr>
    <td>First name</td>
    <td>Last name</td>
    <td>Extension</td>
  </tr>
  <tr>
    <td>Pat</td>
    <td>Peterson</td>
    <td>x394</td>
  </tr>
</table>`,
        resultHtml: `<table>
  <tr><td>First name</td><td>Last name</td><td>Extension</td></tr>
  <tr><td>Pat</td><td>Peterson</td><td>x394</td></tr>
</table>`,
        caption: 'Three columns and two rows. Without a `border` attribute the table has no visible lines at all.',
      },
      {
        b: 'note',
        tone: 'tip',
        title: 'Count rows, then cells',
        text: 'The number of `<tr>` elements is the number of **rows**. The number of `<td>` elements inside one `<tr>` is the number of **columns**. If a table looks wrong, count those two numbers first.',
      },

      { b: 'h2', text: 'Header cells' },
      {
        b: 'p',
        text: 'A `<th>` is a **table header cell**. Its content is **bold and centred by default**, and it tells assistive technology and search engines what the column or row means.',
      },
      {
        b: 'code',
        lang: 'html',
        code: `<table border="1">
  <tr>
    <th>First name</th>
    <th>Last name</th>
    <th>Extension</th>
  </tr>
  <tr>
    <td>Pat</td>
    <td>Peterson</td>
    <td>x394</td>
  </tr>
</table>`,
      },
      {
        b: 'note',
        tone: 'exam',
        title: 'A mnemonic from the class notes',
        text: '`<th>` = `<b>` + `<td>` + `<center>`. It behaves like a data cell that is already bold and already centred. That single line answers most `<th>` versus `<td>` questions.',
      },

      { b: 'h2', text: 'Giving the table a title' },
      {
        b: 'p',
        text: '`<caption>` provides a title or description for the table. It goes immediately after the opening `<table>` tag, and its `align` attribute places it `top` (the default) or `bottom`.',
      },
      {
        b: 'lab',
        spec: {
          lab: 'html',
          title: 'Caption, headers and border',
          html: `<table border="1">
  <caption>Grade 13 ICT — term test marks</caption>
  <tr>
    <th>Name</th>
    <th>Theory</th>
    <th>Practical</th>
  </tr>
  <tr>
    <td>Nimali</td><td>78</td><td>85</td>
  </tr>
  <tr>
    <td>Kasun</td><td>65</td><td>71</td>
  </tr>
</table>`,
          height: 250,
          note: 'Remove `border="1"` and the lines vanish. Add `align="bottom"` to the caption and it moves under the table.',
        },
      },

      { b: 'h2', text: 'Attributes of <table>' },
      {
        b: 'keyvals',
        items: [
          { k: 'border', v: 'The border size around the table and its cells: `<table border="1">`. Without it, no lines are drawn.' },
          { k: 'bgcolor', v: 'The background colour of the table: `<table bgcolor="lightblue">`' },
          { k: 'align', v: 'Aligns the whole table horizontally — `left`, `center` or `right`.' },
          { k: 'cellpadding', v: 'Space between a cell’s content and its own border. More padding, more breathing room.' },
          { k: 'cellspacing', v: 'The gap **between** the borders of adjacent cells.' },
          { k: 'width', v: 'The width of the table, in pixels or as a percentage: `<table width="100%">`' },
          { k: 'height', v: 'The height of the table: `<table height="200px">`' },
        ],
      },
      {
        b: 'lab',
        spec: {
          lab: 'html',
          title: 'cellpadding vs cellspacing',
          html: `<p>cellpadding="10" cellspacing="0"</p>
<table border="1" cellpadding="10" cellspacing="0">
  <tr><td>A</td><td>B</td></tr>
  <tr><td>C</td><td>D</td></tr>
</table>

<p>cellpadding="0" cellspacing="10"</p>
<table border="1" cellpadding="0" cellspacing="10">
  <tr><td>A</td><td>B</td></tr>
  <tr><td>C</td><td>D</td></tr>
</table>`,
          height: 320,
          note: '**Padding is inside** a cell, pushing content away from its own border. **Spacing is between** cells, pushing the cells apart. Swap the numbers and watch which gap moves.',
        },
      },

      { b: 'h2', text: 'Attributes of <th> and <td>' },
      {
        b: 'keyvals',
        items: [
          { k: 'align', v: 'Aligns content horizontally: `left`, `center`, `right`.' },
          { k: 'valign', v: 'Aligns content vertically: `top`, `middle`, `bottom`.' },
          { k: 'colspan', v: 'Merges multiple **columns** into one cell.' },
          { k: 'rowspan', v: 'Merges multiple **rows** into one cell.' },
        ],
      },
      {
        b: 'table',
        head: ['Attribute', '`<table>`', '`<tr>`', '`<td>` / `<th>`'],
        compact: true,
        rows: [
          ['border', '✓', '—', '—'],
          ['bgcolor', '✓', '✓', '✓'],
          ['align', '✓', '✓', '✓'],
          ['width', '✓', '—', '✓'],
          ['height', '✓', '✓', '✗'],
          ['colspan', '—', '—', '✓'],
          ['rowspan', '—', '—', '✓'],
        ],
        caption: 'Which attribute is allowed where. `colspan` and `rowspan` belong only to cells.',
      },

      { b: 'h2', text: 'Merging cells' },
      {
        b: 'p',
        text: '`colspan` and `rowspan` both take a **number** defining how many columns or rows will be spanned. The crucial consequence: when a cell spans two columns, the cell it swallows must be **deleted from the markup**. A merged cell replaces its neighbours — it does not sit on top of them.',
      },

      { b: 'widget', spec: { widget: 'table-spans' } },

      {
        b: 'codeResult',
        lang: 'html',
        code: `<table border="2">
  <tr>
    <th colspan="2">Atlantic Division</th>
    <th colspan="2">Pacific Division</th>
  </tr>
  <tr>
    <td>New York</td>
    <td>Boston</td>
    <td>San Francisco</td>
    <td>Los Angeles</td>
  </tr>
</table>`,
        resultHtml: `<table border="2" style="width:340px">
  <tr><th colspan="2">Atlantic Division</th><th colspan="2">Pacific Division</th></tr>
  <tr><td>New York</td><td>Boston</td><td>San Francisco</td><td>Los Angeles</td></tr>
</table>`,
        caption:
          'Row one has only **two** `<th>` cells for **four** columns, because each one spans two. The headers are centred over the columns they cover.',
      },
      {
        b: 'codeResult',
        lang: 'html',
        code: `<table border="2">
  <tr>
    <th rowspan="2">Atlantic Division</th>
    <td>New York</td>
  </tr>
  <tr>
    <td>Boston</td>
  </tr>
  <tr>
    <th rowspan="2">Pacific Division</th>
    <td>San Francisco</td>
  </tr>
  <tr>
    <td>Los Angeles</td>
  </tr>
</table>`,
        resultHtml: `<table border="2">
  <tr><th rowspan="2">Atlantic Division</th><td>New York</td></tr>
  <tr><td>Boston</td></tr>
  <tr><th rowspan="2">Pacific Division</th><td>San Francisco</td></tr>
  <tr><td>Los Angeles</td></tr>
</table>`,
        caption:
          '`rowspan` needs a different shape: the second and fourth rows contain only **one** cell each, because the row above reaches down into them.',
      },
      {
        b: 'note',
        tone: 'exam',
        title: 'The rule that earns the mark',
        text: 'For `colspan="n"`, delete **n − 1 cells to the right** in the same row. For `rowspan="n"`, delete **n − 1 cells below** in the following rows. Forgetting to delete them is why a student’s table suddenly has an extra column sticking out.',
      },

      { b: 'h2', text: 'Structured tables' },
      {
        b: 'p',
        text: 'For larger tables, HTML offers three region tags that group rows: `<thead>` for the header region, `<tbody>` for the data, and `<tfoot>` for a footer such as a totals row. They make long tables easier to read and to style.',
      },
      {
        b: 'lab',
        spec: {
          lab: 'html',
          title: 'thead, tbody and tfoot',
          html: `<table border="1" cellpadding="6">
  <thead>
    <tr>
      <th>Region</th>
      <th>Sales</th>
      <th>Amount</th>
    </tr>
  </thead>
  <tfoot>
    <tr>
      <th>Total</th>
      <th>&nbsp;</th>
      <th>$6,500</th>
    </tr>
  </tfoot>
  <tbody>
    <tr><td>North</td><td>Peterson</td><td>$3,000</td></tr>
    <tr><td>South</td><td>Kattrell</td><td>$3,500</td></tr>
  </tbody>
</table>`,
          height: 280,
          note: 'Notice the `<tfoot>` is written **before** `<tbody>` in the source, yet renders at the bottom. That is deliberate — it lets a browser print the footer on every page of a long printed table.',
        },
      },

      {
        b: 'challenge',
        spec: {
          id: 'm3c5',
          title: 'A timetable with a spanning header',
          brief:
            'Build a table with a visible border. The first row must be a **single header cell spanning three columns** reading *Monday*. The second row must hold three header cells: *Period 1*, *Period 2*, *Period 3*. The third row holds three data cells with any subjects you like.',
          lang: 'html',
          starter: `<table border="1">

</table>`,
          hints: [
            'The first row needs exactly one `<th>`, carrying `colspan="3"`.',
            'The second row needs three separate `<th>` cells.',
            'The third row needs three `<td>` cells.',
          ],
          solution: `<table border="1" cellpadding="6">
  <tr>
    <th colspan="3">Monday</th>
  </tr>
  <tr>
    <th>Period 1</th>
    <th>Period 2</th>
    <th>Period 3</th>
  </tr>
  <tr>
    <td>ICT</td>
    <td>Maths</td>
    <td>Physics</td>
  </tr>
</table>`,
          checks: [
            { kind: 'selector', selector: 'table', min: 1, label: 'There is a table' },
            { kind: 'attr', selector: 'table', attr: 'border', label: 'The table has a border attribute' },
            { kind: 'selector', selector: 'tr', min: 3, label: 'There are at least three rows' },
            { kind: 'attr', selector: 'tr:first-child th', attr: 'colspan', equals: '3', label: 'The first row has a header cell with colspan="3"' },
            { kind: 'selector', selector: 'tr:first-child th', min: 1, max: 1, label: 'The first row contains exactly one cell — the others were deleted' },
            { kind: 'text', selector: 'tr:first-child th', contains: 'monday', label: 'That spanning header reads Monday' },
            { kind: 'selector', selector: 'tr:nth-child(2) th', min: 3, max: 3, label: 'The second row has three header cells' },
            { kind: 'selector', selector: 'tr:nth-child(3) td', min: 3, max: 3, label: 'The third row has three data cells' },
          ],
        },
      },

      {
        b: 'quiz',
        questions: [
          {
            kind: 'mcq',
            q: 'A table has 3 columns. You give the first cell of a row `colspan="3"`. How many cells should that row now contain in the markup?',
            options: ['3', '2', '1', '4'],
            answer: 2,
            why: 'One cell now covers all three columns, so the two cells to its right must be deleted from the markup. The row contains exactly one cell.',
          },
          {
            kind: 'mcq',
            q: 'Which statement about `<th>` is correct?',
            options: [
              'It creates a new row',
              'Its content is bold and centred by default',
              'It can only appear in the first row',
              'It is required in every table',
            ],
            answer: 1,
            why: '`<th>` = `<b>` + `<td>` + `<center>`. It can appear in any row — a row-header column uses `<th>` down the left side.',
          },
          {
            kind: 'mcq',
            q: 'What is the difference between cellpadding and cellspacing?',
            options: [
              'Padding is between cells; spacing is inside them',
              'Padding is inside a cell between content and border; spacing is the gap between cells',
              'They are two names for the same thing',
              'Padding applies to rows, spacing to columns',
            ],
            answer: 1,
            why: 'Padding is *inside* — content to its own border. Spacing is *between* the borders of neighbouring cells.',
          },
          {
            kind: 'fill',
            q: 'Write the attribute that merges a cell down across two rows.',
            accept: ['rowspan="2"', "rowspan='2'", 'rowspan=2', 'rowspan'],
            why: '`rowspan="2"` — and remember to delete the cell directly below it.',
            placeholder: 'name="value"',
          },
          {
            kind: 'multi',
            q: 'Which tags can legally appear directly inside `<table>`?',
            options: ['<caption>', '<tr>', '<td>', '<thead>', '<tbody>'],
            answers: [0, 1, 3, 4],
            why: '`<td>` must live inside a `<tr>`, never directly inside `<table>`. The others are all valid children of `<table>`.',
          },
        ],
      },

      {
        b: 'recap',
        items: [
          '`<table>` holds `<tr>` rows, which hold `<td>` data cells or `<th>` header cells.',
          '`<th>` = bold + centred + data cell. `<caption>` titles the table.',
          '`border`, `bgcolor`, `align`, `width`, `height`, `cellpadding`, `cellspacing` on the table; `align`, `valign`, `colspan`, `rowspan` on cells.',
          'colspan="n" deletes n−1 cells to the right; rowspan="n" deletes n−1 cells below.',
          '`<thead>`, `<tbody>` and `<tfoot>` group rows in larger tables.',
        ],
      },
    ],
  },

  // ── 3.8 ──────────────────────────────────────────────────────
  {
    id: 'm3l8',
    slug: 'div-span-and-deprecated',
    title: 'Grouping, and the deprecated crowd',
    summary:
      '`<div>` and `<span>` carry no meaning of their own — which is exactly why they are so useful. Plus `<center>` and `<marquee>`.',
    minutes: 12,
    outcomes: ['Analyses the arrangement of contents of a web page'],
    blocks: [
      {
        b: 'lead',
        text: 'Two tags in HTML do nothing at all on their own. That is their job: they exist so that CSS and JavaScript have something to grab hold of.',
      },

      { b: 'h2', text: '<div> — the block container' },
      {
        b: 'p',
        text: 'A **block-level container element** used to group and organise other HTML elements. It has no inherent styling or functionality, but it is commonly used with CSS and JavaScript to structure, style and manipulate sections of a webpage.',
      },
      {
        b: 'code',
        lang: 'html',
        code: `<div id="header">
  <h1>Vidya College</h1>
  <p>Serving students since 1974</p>
</div>

<div class="notice">
  <!-- Content goes here -->
</div>`,
      },
      {
        b: 'p',
        text: 'Being **block-level** means it starts on a new line and takes the full width available. That is why divs stack down the page rather than sitting side by side.',
      },

      { b: 'h2', text: '<span> — the inline container' },
      {
        b: 'p',
        text: 'Used to wrap text so you can style **part of a line** without changing how the content is displayed. It is inline, so it does not force a line break.',
      },
      {
        b: 'lab',
        spec: {
          lab: 'html',
          title: 'Block versus inline',
          html: `<p>This is <span style="color:red">important</span> text —
   the span changed the colour without breaking the line.</p>

<div style="border:1px solid #999; padding:6px">
  A div is block level, so it takes the whole width…
</div>
<div style="border:1px solid #999; padding:6px">
  …and the next one starts on a new line.
</div>`,
          height: 250,
          note: 'Change the `<span>` to a `<div>` in the first paragraph and watch the sentence break apart. That is the whole difference between inline and block.',
        },
      },

      { b: 'h2', text: 'The title attribute' },
      {
        b: 'p',
        text: 'Almost every element accepts a `title` attribute, which provides additional information shown as a **tooltip when the mouse hovers** over it.',
      },
      {
        b: 'lab',
        spec: {
          lab: 'html',
          title: 'Hover over these',
          html: `<div title="This is a tooltip.">
  Hover your mouse here and wait a moment.
</div>

<p>
  <a href="https://info.cern.ch"
     title="The first website ever published, at CERN">
    The first website
  </a>
</p>`,
          height: 170,
          note: 'Tooltips appear only on hover, so they are invisible on a phone. Never put essential information in a `title` attribute alone.',
        },
      },

      { b: 'h2', text: '<center> — deprecated' },
      {
        b: 'p',
        text: 'Used to centre **any type of content** horizontally on a web page. It works on everything inside it. It is **deprecated in HTML5** and replaced by CSS, but the syllabus still expects you to recognise it.',
      },
      {
        b: 'codeResult',
        lang: 'html',
        code: `<center>
  <h2>Title</h2>
  <p>This content is centred.</p>
</center>`,
        resultHtml: '<center><h2>Title</h2><p>This content is centred.</p></center>',
        caption: 'The modern equivalent is `text-align: center` in CSS, which you meet in Module 5.',
      },

      { b: 'h2', text: '<marquee> — also deprecated' },
      {
        b: 'p',
        text: 'Creates automatic scrolling animations. It can scroll text, links, or any inline content. Deprecated, and genuinely annoying to read — but it is in the syllabus, and it is memorable, so it gets examined.',
      },
      {
        b: 'keyvals',
        title: 'Attributes of <marquee>',
        items: [
          { k: 'direction', v: 'Controls movement direction: `left`, `right`, `up`, `down`.' },
          { k: 'behavior', v: '`scroll` — continuous movement; `slide` — moves once and stops; `alternate` — bounces back and forth.' },
          { k: 'scrollamount', v: 'Controls speed. Higher is faster.' },
          { k: 'scrolldelay', v: 'Controls the delay between movements, in milliseconds.' },
          { k: 'loop', v: 'How many times it repeats: `<marquee loop="3">`' },
          { k: 'width / height', v: 'Sets the size of the marquee area: `<marquee width="300" height="50">`' },
        ],
      },
      {
        b: 'lab',
        spec: {
          lab: 'html',
          title: 'Three marquee behaviours',
          html: `<marquee>Scrolling text — the default</marquee>

<marquee behavior="alternate" scrollamount="6"
         style="background:#eee">
  Bouncing back and forth
</marquee>

<marquee direction="right" behavior="slide">
  Slides once, then stops
</marquee>`,
          height: 200,
          note: 'Change `scrollamount` to 20 and then to 1. Then ask yourself honestly whether any real website should do this.',
        },
      },
      {
        b: 'note',
        tone: 'warn',
        title: 'Deprecated means "do not use in new work"',
        text: 'A deprecated tag still works in today’s browsers, but it is no longer part of the standard and may stop working. Recognise `<font>`, `<center>`, `<marquee>` and `align` in a question; write CSS in your own projects.',
      },

      {
        b: 'quiz',
        questions: [
          {
            kind: 'mcq',
            q: 'What is the difference between `<div>` and `<span>`?',
            options: [
              '<div> is for text and <span> is for images',
              '<div> is block-level and starts a new line; <span> is inline and does not',
              '<span> is deprecated',
              'There is no difference',
            ],
            answer: 1,
            why: 'Block versus inline. A div occupies the full width and stacks; a span sits inside a line of text without breaking it.',
          },
          {
            kind: 'multi',
            q: 'Which of these are deprecated in HTML5?',
            options: ['<center>', '<div>', '<marquee>', '<span>', '<font>'],
            answers: [0, 2, 4],
            why: '`<div>` and `<span>` are current and essential. The other three were replaced by CSS.',
          },
          {
            kind: 'mcq',
            q: 'Which marquee behaviour makes the content bounce back and forth?',
            options: ['scroll', 'slide', 'alternate', 'bounce'],
            answer: 2,
            why: '`behavior="alternate"`. `scroll` is continuous movement and `slide` moves once and stops.',
          },
          {
            kind: 'tf',
            q: 'Important instructions can safely be placed in a `title` attribute, because every visitor will see the tooltip.',
            answer: false,
            why: 'Tooltips only appear on hover, so touch-screen users never see them. Anything essential must be in the page content itself.',
          },
        ],
      },

      {
        b: 'recap',
        items: [
          '`<div>` groups block content; `<span>` wraps inline content. Neither has styling of its own.',
          'The `title` attribute shows a hover tooltip — never the only place for important text.',
          '`<center>` centres everything inside it; `<marquee>` scrolls it. Both deprecated, both examinable.',
          'Deprecated ≠ broken. Recognise them; write CSS instead.',
        ],
      },
    ],
  },

  // ── 3.9 ──────────────────────────────────────────────────────
  {
    id: 'm3l9',
    slug: 'html-project',
    title: 'Project: a page that uses everything',
    summary:
      'One page, built from scratch, using headings, formatting, lists and a table — the shape of a practical question.',
    minutes: 25,
    outcomes: [
      'Creates a simple web page',
      'Organizes data using lists and tables in the web page',
    ],
    blocks: [
      {
        b: 'lead',
        text: 'Everything in Module 3 exists to be combined. This project is deliberately the shape of a practical exam question: a specification in prose, a page to build, and checks that either pass or do not.',
      },

      { b: 'h2', text: 'The brief' },
      {
        b: 'note',
        tone: 'note',
        title: 'The task',
        text: '*Create a single web page for a school subject profile. It must be a complete HTML5 document with a title. It needs a main heading, an introductory paragraph containing at least one piece of bold or emphasised text, a subheading, an unordered list of at least three topics, a second subheading, and a table of at least three rows with a header row and a visible border.*',
      },

      { b: 'h2', text: 'How to approach it' },
      {
        b: 'steps',
        items: [
          {
            title: 'Skeleton first',
            text: 'Doctype, html, head with a title, body. Get a blank page rendering before you write any content.',
          },
          {
            title: 'Headings next, as an outline',
            text: 'One `<h1>` and two `<h2>`s, nothing else. Now the page has a shape you can fill.',
          },
          {
            title: 'Fill each section',
            text: 'Paragraph under the h1, list under the first h2, table under the second. Check the render after each one.',
          },
          {
            title: 'Format last',
            text: 'Bold, emphasis, borders, padding. Doing this first is how pages end up structurally wrong but pretty.',
          },
        ],
      },

      {
        b: 'challenge',
        spec: {
          id: 'm3project',
          title: 'Build the subject profile page',
          brief:
            'Work through the brief above. The checks below are the marking scheme — press **Check my work** as often as you like, and use the hints if you get stuck. Everything you need was covered in lessons 1 to 8.',
          lang: 'html',
          starter: `<!DOCTYPE html>
<html>
<head>
  <title>Information & Communication Technology</title>
</head>
<body>

  <!-- 1. Main heading -->

  <!-- 2. Introductory paragraph, with something bold or emphasised -->

  <!-- 3. Subheading, then an unordered list of topics -->

  <!-- 4. Subheading, then a bordered table with a header row -->

</body>
</html>`,
          hints: [
            'The main heading is `<h1>`; the two subheadings are `<h2>`.',
            'Bold is `<b>`, emphasis is `<em>` or `<strong>` — any of them satisfies the check.',
            'The unordered list is `<ul>` with `<li>` items inside it.',
            'The table needs `border="1"`, one row of `<th>` cells, and two more rows of `<td>` cells.',
          ],
          solution: `<!DOCTYPE html>
<html>
<head>
  <title>Information &amp; Communication Technology</title>
</head>
<body>

  <h1>Information &amp; Communication Technology</h1>

  <p>ICT is a <strong>practical subject</strong>: half of the marks come
     from things you build rather than things you recall.</p>

  <h2>Main topics</h2>
  <ul>
    <li>Web development</li>
    <li>Database management</li>
    <li>Programming with Python</li>
    <li>Systems analysis and design</li>
  </ul>

  <h2>Paper structure</h2>
  <table border="1" cellpadding="6">
    <caption>Marks by paper</caption>
    <tr>
      <th>Paper</th>
      <th>Type</th>
      <th>Marks</th>
    </tr>
    <tr>
      <td>Paper I</td>
      <td>Multiple choice</td>
      <td>50</td>
    </tr>
    <tr>
      <td>Paper II</td>
      <td>Structured &amp; essay</td>
      <td>100</td>
    </tr>
  </table>

</body>
</html>`,
          checks: [
            { kind: 'source', pattern: '<!DOCTYPE\\s+html>', label: 'The document begins with the HTML5 doctype' },
            { kind: 'source', pattern: '<title>[^<]{3,}</title>', label: 'The head contains a non-empty <title>' },
            { kind: 'selector', selector: 'h1', min: 1, max: 1, label: 'Exactly one main heading (<h1>)' },
            { kind: 'selector', selector: 'h2', min: 2, label: 'At least two subheadings (<h2>)' },
            { kind: 'selector', selector: 'p', min: 1, label: 'There is an introductory paragraph' },
            { kind: 'selector', selector: 'p b, p strong, p em, p i', min: 1, label: 'The paragraph contains bold or emphasised text' },
            { kind: 'selector', selector: 'ul', min: 1, label: 'There is an unordered list' },
            { kind: 'selector', selector: 'ul li', min: 3, label: 'The list has at least three items' },
            { kind: 'selector', selector: 'table', min: 1, label: 'There is a table' },
            { kind: 'attr', selector: 'table', attr: 'border', label: 'The table has a visible border' },
            { kind: 'selector', selector: 'table th', min: 2, label: 'The table has a header row using <th>' },
            { kind: 'selector', selector: 'table tr', min: 3, label: 'The table has at least three rows' },
          ],
        },
      },

      { b: 'h2', text: 'Marking yourself honestly' },
      {
        b: 'p',
        text: 'The automatic checks confirm the structure. They cannot tell you whether the page is any *good*. Read your finished page and ask:',
      },
      {
        b: 'ul',
        items: [
          'Could a stranger understand what this page is about from the `<h1>` alone?',
          'Does every heading level match its actual rank, or did you pick one for its size?',
          'Is the list genuinely unordered — would shuffling it change the meaning?',
          'Does the table hold *data*, or are you using it to position things on the page? (Using tables for layout is an old habit CSS replaced.)',
          'If you view the source, is it indented so that a teacher could read it?',
        ],
      },

      {
        b: 'recap',
        items: [
          'Build in order: skeleton → headings → content → formatting.',
          'Check the render after every step. Small mistakes are easy to find; big ones are not.',
          'Structure is marked separately from appearance — get the structure right first.',
          'Indent your source. It costs nothing and it is the difference between readable and unreadable work.',
        ],
      },
    ],
  },
]

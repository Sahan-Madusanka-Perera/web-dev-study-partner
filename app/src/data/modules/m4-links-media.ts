import type { Module } from '../../types/content'

export const m4: Module = {
  id: 'm4',
  slug: 'links-and-media',
  competency: '10.4',
  index: 4,
  title: 'Links and Multimedia',
  promise:
    'Join pages into a website with hyperlinks, address any file with the right kind of path, and embed images, audio and video correctly.',
  blurb:
    'A single page is not a website. This level is about the anchor tag, the paths that make links work, and the media tags that put pictures and sound on a page.',
  lang: 'html',
  lessons: [
    // ── 4.1 ────────────────────────────────────────────────────
    {
      id: 'm4l1',
      slug: 'the-anchor-tag',
      title: 'The anchor tag',
      summary:
        'One tag, three attributes, and the whole idea of hypertext: `<a href target title>`.',
      minutes: 13,
      outcomes: ['Links pages and multimedia objects to the web page'],
      blocks: [
        {
          b: 'lead',
          text: 'Hyperlinks connect one resource to another. They let users navigate easily from one web page to another, or even within the same page — and they are the reason the Web is a *web* rather than a pile of documents.',
        },

        { b: 'h2', text: 'The tag' },
        {
          b: 'p',
          text: 'The `<a>` tag — the **anchor tag** — defines a hyperlink. The text or image enclosed by `<a>` anchors one side of the link to the current page, and the **`href` attribute** (short for *hypertext reference*) specifies the other side: the destination.',
        },
        {
          b: 'code',
          lang: 'html',
          code: `<a href="home.html">Home</a>
   └┬─┘ └────┬────┘ └┬─┘
 attribute  where it  what the
   name     goes      user clicks`,
        },
        {
          b: 'p',
          text: 'When the user clicks the word *Home*, the browser jumps to the `home.html` page. When you hover over a hyperlink the cursor changes to a **hand icon (pointer)**, telling the user the element is clickable — a small visual cue that does a lot of work.',
        },

        { b: 'h2', text: 'The three attributes' },
        {
          b: 'tagref',
          items: [
            { tag: 'href', what: 'Indicates the link’s **destination**. Without it, `<a>` is not a link at all — just text.' },
            {
              tag: 'target',
              what: 'Determines **where** to open the linked document.',
              attrs: [
                { name: '_self', what: 'The **default**. Opens in the same window or tab where the link was clicked.' },
                { name: '_blank', what: 'Opens in a new window or tab. Useful for **external** links, so the visitor keeps your page open.' },
              ],
            },
            { tag: 'title', what: 'Provides additional information about the link, displayed as a **tooltip on hover**.' },
          ],
        },
        {
          b: 'lab',
          spec: {
            lab: 'html',
            title: 'href, target and title',
            html: `<p>
  <a href="https://info.cern.ch"
     title="The first website ever published, at CERN">
    Hover over me, then click
  </a>
</p>

<p>
  <a href="https://www.nie.lk" target="_blank">
    Opens in a new tab (_blank)
  </a>
</p>

<p>
  <a href="https://www.nie.lk" target="_self">
    Opens in this frame (_self — the default)
  </a>
</p>`,
            height: 220,
            note: 'Hover over the first link and wait — the tooltip is the `title` attribute. The default underline and blue colour come from the browser, not from you; Module 5 shows how to change them.',
          },
        },

        { b: 'h2', text: 'External links' },
        {
          b: 'p',
          text: 'External links point to resources **outside your own machine** — other websites, or specific URLs on the internet. When another site on the web needs to be linked, an **absolute URL** must be specified.',
        },
        {
          b: 'code',
          lang: 'html',
          code: `<!-- Link to a domain (a whole website) -->
<a href="https://www.abc.com">Visit External Site</a>

<!-- Link to one specific file on another site -->
<a href="https://www.abc.com/video.mp4">Watch External Video</a>

<!-- The example from the resource book -->
<a href="http://www.nie.lk/index.htm">National Institute of Education</a>`,
        },

        { b: 'h2', text: 'Internal links' },
        {
          b: 'p',
          text: 'Internal links point to files or resources located on the **same device** as the HTML file — other pages of your site, or local images, audio, video and documents. When pages within the same site are linked, **document-relative URLs** can be used.',
        },
        {
          b: 'code',
          lang: 'html',
          code: `<a href="home.html">Home</a>
<a href="services.html">Services</a>
<a href="products.html">Products</a>`,
          caption: 'Three pages in the same folder as the page containing these links.',
        },

        { b: 'h2', text: 'Things other than text can be links' },
        {
          b: 'p',
          text: 'Whatever sits between `<a>` and `</a>` becomes clickable. That includes an image, and it includes a button.',
        },
        {
          b: 'lab',
          spec: {
            lab: 'html',
            title: 'An image link and a button link',
            html: `<p>An image as a link:</p>
<a href="https://info.cern.ch">
  <img src="media/bird.jpg" alt="A blue bird on a branch" width="180">
</a>

<p>A button as a link:</p>
<a href="https://info.cern.ch">
  <button>Click Me</button>
</a>`,
            height: 320,
            note: 'The whole image is clickable, and so is the whole button. Notice the browser draws a border around a linked image by default — `border="0"` used to be the fix; CSS is the modern one.',
          },
        },

        {
          b: 'challenge',
          spec: {
            id: 'm4c1',
            title: 'Three links, three behaviours',
            brief:
              'Write three links in one paragraph each. The first goes to `about.html` in the same folder. The second goes to `https://www.nie.lk` and must open in a **new tab**. The third goes to `https://www.nie.lk` and must show the tooltip **National Institute of Education** on hover.',
            lang: 'html',
            starter: `<h2>Useful links</h2>

`,
            hints: [
              'A relative link is just the filename: `href="about.html"`.',
              'Opening in a new tab is `target="_blank"`.',
              'A tooltip is the `title` attribute — its value is the text that appears on hover.',
            ],
            solution: `<h2>Useful links</h2>

<p><a href="about.html">About this school</a></p>

<p><a href="https://www.nie.lk" target="_blank">NIE (new tab)</a></p>

<p><a href="https://www.nie.lk" title="National Institute of Education">NIE</a></p>`,
            checks: [
              { kind: 'selector', selector: 'a', min: 3, label: 'There are at least three links' },
              { kind: 'selector', selector: 'a[href="about.html"]', min: 1, label: 'One link points to about.html' },
              { kind: 'selector', selector: 'a[target="_blank"]', min: 1, label: 'One link opens in a new tab' },
              { kind: 'attr', selector: 'a[title]', attr: 'title', contains: 'national institute of education', label: 'One link has the tooltip "National Institute of Education"' },
            ],
          },
        },

        {
          b: 'quiz',
          questions: [
            {
              kind: 'mcq',
              q: 'What does the `href` attribute specify?',
              options: [
                'The text the user clicks',
                'The destination of the link',
                'Whether the link opens in a new tab',
                'The tooltip shown on hover',
              ],
              answer: 1,
              why: '`href` — hypertext reference — is the destination. The clickable text is the content between the tags.',
            },
            {
              kind: 'mcq',
              q: 'Which value of `target` opens the linked page in a new tab?',
              options: ['_self', '_blank', '_new', '_top'],
              answer: 1,
              why: '`_blank`. `_self` is the default, opening in the same window or tab.',
            },
            {
              kind: 'tf',
              q: 'Only text can be placed inside an `<a>` element.',
              answer: false,
              why: 'Images and buttons are commonly wrapped in an anchor. Whatever sits between the tags becomes clickable.',
            },
            {
              kind: 'fill',
              q: 'Complete the link so it opens the NIE site in a new tab: `<a href="https://www.nie.lk" ______="_blank">NIE</a>`',
              accept: ['target'],
              why: 'The `target` attribute decides where the document opens.',
              placeholder: 'attribute name',
            },
          ],
        },

        {
          b: 'recap',
          items: [
            '`<a href="destination">clickable content</a>` is the whole of hypertext.',
            '`target="_blank"` opens a new tab; `_self` (the default) reuses the current one.',
            '`title` gives a hover tooltip — helpful, never essential.',
            'External links use absolute URLs; pages within a site use relative ones.',
          ],
        },
      ],
    },

    // ── 4.2 ────────────────────────────────────────────────────
    {
      id: 'm4l2',
      slug: 'paths',
      title: 'Absolute and relative paths',
      summary:
        'Why `C:\\mysite\\images\\logo.png` breaks the moment you upload, and what to write instead.',
      minutes: 14,
      outcomes: ['Links pages and multimedia objects to the web page'],
      blocks: [
        {
          b: 'lead',
          text: 'A **file pathname** is the complete address that specifies the location of a file or directory in a file system. Getting the path wrong is the single most common reason a student’s image does not appear.',
        },

        { b: 'h2', text: 'Absolute paths' },
        {
          b: 'p',
          text: 'An absolute path shows the **complete directory path starting from the root directory**. It begins at the root — `/` on Unix-like systems, `C:` on Windows — and includes every folder up to the file.',
        },
        {
          b: 'code',
          lang: 'text',
          code: `/home/user/Documents/report.txt      ← Linux or macOS

C:\\mysite\\images\\cheems.jpg          ← Windows`,
        },
        {
          b: 'note',
          tone: 'warn',
          title: 'Why absolute paths break',
          text: 'An absolute path is correct **on your computer only**. Upload the site to a web server and `C:\\mysite\\images\\logo.png` means nothing — the server has no C: drive and no `mysite` folder. Every image silently disappears. This is a classic exam question and a classic real-world mistake.',
        },

        { b: 'h2', text: 'Relative paths' },
        {
          b: 'p',
          text: 'A relative path shows the location of a file **with respect to the current working directory** — the folder the page you are writing lives in. It does not start from the root and it is usually shorter.',
        },
        {
          b: 'table',
          head: ['Situation', 'What to write', 'Reads as'],
          rows: [
            ['`xyz.jpg` is in the same folder as `abc.html`', '`xyz.jpg`', '“in my own folder”'],
            ['`cheems.jpg` is inside an `images` folder', '`images/cheems.jpg`', '“go into images, then take the file”'],
            ['The file is one folder up', '`../style.css`', '“go up one level, then take the file”'],
            ['Up one level, then into another folder', '`../media/song.mp3`', '“up one, into media, then the file”'],
          ],
        },

        { b: 'widget', spec: { widget: 'path-explorer' } },

        { b: 'h2', text: 'The rule to memorise' },
        {
          b: 'ul',
          items: [
            '`file.html` — same folder as the current page.',
            '`folder/file.html` — down into a subfolder.',
            '`../file.html` — up one level.',
            '`../../file.html` — up two levels.',
            '`/file.html` — from the **root of the website** (not the root of the disk). Works once the site is hosted.',
          ],
        },
        {
          b: 'note',
          tone: 'tip',
          title: 'Slashes',
          text: 'On the web, always use forward slashes `/`, even on Windows. `images\\logo.png` with a backslash works when you double-click a local file and fails on every real web server.',
        },

        { b: 'h2', text: 'Linking to local media' },
        {
          b: 'p',
          text: 'Internal links can point at any file on the same device, not only web pages — images, audio files, video and documents.',
        },
        {
          b: 'code',
          lang: 'html',
          code: `<!-- Video file -->
<a href="films/The_Matrix.mp4">Click here to watch The Matrix</a>

<!-- Audio file -->
<a href="music/Song.mp3">Click here to listen to a song</a>

<!-- Image file -->
<a href="images/bird.jpg">Picture of a Bird</a>`,
          caption:
            'Linking to media opens or downloads it. Embedding it — with `<img>`, `<audio>` or `<video>` — puts it inside the page. Two different jobs.',
        },

        {
          b: 'challenge',
          spec: {
            id: 'm4c2',
            title: 'Write the right relative paths',
            brief:
              'You are writing `pages/contact.html`. The site’s folders are: `index.html` at the top, an `images/` folder holding `logo.png`, and a `pages/` folder holding this file. Add **two links**: one back to the home page, and one image showing the logo. Both must use **relative** paths — no `C:` and no `http`.',
            lang: 'html',
            starter: `<h1>Contact us</h1>

<!-- A link back to index.html, which is one folder UP -->


<!-- The logo, which is up one folder then inside images/ -->
`,
            hints: [
              '`..` means “go up one folder”. From `pages/`, that lands you at the top of the site.',
              'The home page link is therefore `../index.html`.',
              'The logo is up one level and then inside images: `../images/logo.png`.',
            ],
            solution: `<h1>Contact us</h1>

<p><a href="../index.html">Back to home</a></p>

<img src="../images/logo.png" alt="School crest" width="120">`,
            checks: [
              { kind: 'selector', selector: 'a[href="../index.html"]', min: 1, label: 'A link points to ../index.html' },
              { kind: 'selector', selector: 'img', min: 1, label: 'There is an image' },
              { kind: 'attr', selector: 'img', attr: 'src', equals: '../images/logo.png', label: 'The image src is ../images/logo.png' },
              { kind: 'source', pattern: '(?:[A-Z]:\\\\|file://)', not: true, label: 'No absolute disk path is used' },
              { kind: 'source', pattern: 'https?://', not: true, label: 'No absolute web URL is used' },
            ],
          },
        },

        {
          b: 'quiz',
          questions: [
            {
              kind: 'mcq',
              q: 'Your page is `pages/about.html`. The image is at `images/team.jpg`, where `images` sits beside `pages`. What is the correct `src`?',
              options: ['images/team.jpg', '../images/team.jpg', '/images/team.jpg', 'pages/images/team.jpg'],
              answer: 1,
              why: 'From inside `pages/` you must go **up one level** with `..` before entering `images/`.',
            },
            {
              kind: 'mcq',
              q: 'Why should you avoid `C:\\mysite\\images\\logo.png` in a web page?',
              options: [
                'It is too long to type',
                'Windows does not allow it',
                'It only works on your own computer — it breaks as soon as the site is uploaded',
                'Browsers cannot display .png files from C:',
              ],
              answer: 2,
              why: 'An absolute disk path is meaningful only on the machine that has that disk and those folders. A web server has neither.',
            },
            {
              kind: 'fill',
              q: 'What do two dots `..` mean at the start of a relative path?',
              accept: ['go up one folder', 'up one folder', 'up one level', 'parent folder', 'the parent directory', 'go up one level', 'one folder up', 'previous folder'],
              why: '`..` moves up one level to the parent folder. `../..` moves up two.',
              placeholder: 'in your own words',
            },
            {
              kind: 'tf',
              q: 'Backslashes and forward slashes work equally well in web paths.',
              answer: false,
              why: 'The web uses forward slashes only. A backslash may work when you open a local file directly but fails on a real web server.',
            },
          ],
        },

        {
          b: 'recap',
          items: [
            'Absolute path: from the root of the disk. Correct locally, broken once uploaded.',
            'Relative path: from the folder the current page lives in. Shorter and portable.',
            '`file` · `folder/file` · `../file` · `../../file` — four patterns cover almost everything.',
            'Forward slashes always, on every operating system.',
          ],
        },
      ],
    },

    // ── 4.3 ────────────────────────────────────────────────────
    {
      id: 'm4l3',
      slug: 'linking-a-site',
      title: 'Linking a whole site, and bookmarks',
      summary:
        'Turn separate pages into a website, then learn to jump to a spot **within** one page.',
      minutes: 13,
      outcomes: [
        'Links pages and multimedia objects to the web page',
        'Uses HTML to create linked web pages',
      ],
      blocks: [
        {
          b: 'lead',
          text: 'When a number of web pages are developed and linked together, it is called a **website**. Enterprises have more information than one page can hold, so it is classified across multiple pages that are then linked with hyperlinks so visitors can navigate back and forth.',
        },

        { b: 'h2', text: 'Two pages, two links' },
        {
          b: 'p',
          text: 'The smallest possible website is two pages that point at each other. Every larger site is this idea repeated.',
        },
        {
          b: 'code',
          lang: 'html',
          filename: 'home.html',
          code: `<h3>This is the home page</h3>

<a href="contact.html">Go to Contact Us</a>`,
        },
        {
          b: 'code',
          lang: 'html',
          filename: 'contact.html',
          code: `<h3>This is the contact us page</h3>

<a href="home.html">Go to Home</a>`,
        },
        {
          b: 'p',
          text: 'Click *Go to Contact Us* and that page opens. Click *Go to Home* and the user is redirected back. The **home page** is the main page of the site: the assumed starting point, and the page that provides the navigational links to everywhere else.',
        },
        {
          b: 'note',
          tone: 'tip',
          title: 'Give every page the same menu',
          text: 'Rather than one link per page, put the whole navigation list on every page. A visitor should be able to reach any section from anywhere, without pressing Back.',
        },
        {
          b: 'lab',
          spec: {
            lab: 'html',
            title: 'A navigation bar every page can share',
            html: `<h1>Vidya College</h1>

<p>
  <a href="index.html">Home</a> |
  <a href="about.html">About</a> |
  <a href="academics.html">Academics</a> |
  <a href="results.html">Results</a> |
  <a href="contact.html">Contact</a>
</p>

<hr>

<h2>Welcome</h2>
<p>Paste this same block at the top of every page of the site.</p>`,
            height: 250,
            note: 'The links will not open anything here, because those files do not exist in this preview — but the markup is exactly what you would save into each page.',
          },
        },

        { b: 'h2', text: 'Bookmarks: jumping within a page' },
        {
          b: 'p',
          text: 'Bookmarks let users jump to a **specific section on the same webpage**. It takes two steps: mark the destination with an `id`, then link to that id with a `#`.',
        },
        {
          b: 'steps',
          items: [
            {
              title: 'Create the anchor',
              text: 'Assign an `id` to the element you want to reach — a heading or a section.',
              code: '<h2 id="section1">Section 1</h2>',
              lang: 'html',
            },
            {
              title: 'Link to it',
              text: 'Use the anchor tag with a **URL fragment identifier**, which starts with `#` and names the id.',
              code: '<a href="#section1">Go to Section 1</a>',
              lang: 'html',
            },
          ],
        },
        {
          b: 'lab',
          spec: {
            lab: 'html',
            title: 'A page with working bookmarks',
            html: `<h1>Page Navigation</h1>

<p><a href="#section1">Go to Section 1</a></p>
<p><a href="#section2">Go to Section 2</a></p>
<p><a href="#section3">Go to Section 3</a></p>

<h2 id="section1">Section 1</h2>
<p>Content for section one.<br><br><br><br><br><br></p>

<h2 id="section2">Section 2</h2>
<p>Content for section two.<br><br><br><br><br><br></p>

<h2 id="section3">Section 3</h2>
<p>Content for section three.</p>`,
            height: 380,
            note: 'Click a link and the preview scrolls to that heading. This is how long documents, FAQ pages and terms-and-conditions pages give readers a way in.',
          },
        },
        {
          b: 'note',
          tone: 'exam',
          title: 'The two halves must match exactly',
          text: '`href="#section1"` finds `id="section1"`. The `#` appears **only in the link**, never in the id. And ids are case sensitive — `#Section1` will not find `id="section1"`.',
        },
        {
          b: 'p',
          text: 'You can combine the two ideas: `href="about.html#history"` opens another page **and** jumps to the section with `id="history"` on it.',
        },

        {
          b: 'challenge',
          spec: {
            id: 'm4c3',
            title: 'Build a contents list with bookmarks',
            brief:
              'Add a contents list at the top of this page with **three links**, each jumping to one of the three headings below. Give each heading an `id` and point the matching link at it with `#`.',
            lang: 'html',
            starter: `<h1>Study notes</h1>

<!-- Add your three bookmark links here -->


<h2>Hardware</h2>
<p>Processor, memory, storage.<br><br><br></p>

<h2>Software</h2>
<p>System software and application software.<br><br><br></p>

<h2>Networks</h2>
<p>LAN, WAN and the Internet.</p>`,
            hints: [
              'Give the first heading `id="hardware"`, and so on for the other two.',
              'The link that reaches it is `<a href="#hardware">Hardware</a>` — note the `#` on the link only.',
              'Put the three links inside a `<ul>` if you want a tidy contents list.',
            ],
            solution: `<h1>Study notes</h1>

<ul>
  <li><a href="#hardware">Hardware</a></li>
  <li><a href="#software">Software</a></li>
  <li><a href="#networks">Networks</a></li>
</ul>

<h2 id="hardware">Hardware</h2>
<p>Processor, memory, storage.<br><br><br></p>

<h2 id="software">Software</h2>
<p>System software and application software.<br><br><br></p>

<h2 id="networks">Networks</h2>
<p>LAN, WAN and the Internet.</p>`,
            checks: [
              { kind: 'selector', selector: 'a[href^="#"]', min: 3, label: 'There are three links beginning with #' },
              { kind: 'selector', selector: 'h2[id]', min: 3, label: 'All three headings carry an id' },
              { kind: 'selector', selector: 'h2#hardware, h2#software, h2#networks', min: 3, label: 'The ids are hardware, software and networks' },
              { kind: 'selector', selector: 'a[href="#hardware"]', min: 1, label: 'A link points at #hardware' },
              { kind: 'selector', selector: 'a[href="#networks"]', min: 1, label: 'A link points at #networks' },
            ],
          },
        },

        {
          b: 'quiz',
          questions: [
            {
              kind: 'mcq',
              q: 'Which attribute marks a destination for a bookmark link?',
              options: ['name', 'href', 'id', 'target'],
              answer: 2,
              why: 'The destination element carries `id="something"`, and the link points at it with `href="#something"`.',
            },
            {
              kind: 'mcq',
              q: 'What does `<a href="about.html#history">` do?',
              options: [
                'Opens about.html from the beginning',
                'Opens about.html and jumps to the element with id="history"',
                'Searches about.html for the word history',
                'Nothing — you cannot combine a file and a fragment',
              ],
              answer: 1,
              why: 'A path and a fragment can be combined: load that page, then scroll to that id.',
            },
            {
              kind: 'tf',
              q: 'The `#` should be written in both the link and the id, like `id="#section1"`.',
              answer: false,
              why: 'The `#` belongs only in the `href`. The id itself is written without it: `id="section1"`.',
            },
            {
              kind: 'fill',
              q: 'What is the main page of a website called?',
              accept: ['home page', 'homepage', 'the home page'],
              why: 'The home page — the assumed starting point, carrying the navigational links to the rest of the site.',
              placeholder: 'two words',
            },
          ],
        },

        {
          b: 'recap',
          items: [
            'A website is pages linked together; the home page is the starting point and carries the navigation.',
            'Put the same navigation block on every page.',
            'Bookmarks: `id="x"` on the destination, `href="#x"` on the link.',
            '`page.html#section` opens a page and jumps to a spot in one go.',
          ],
        },
      ],
    },

    // ── 4.4 ────────────────────────────────────────────────────
    {
      id: 'm4l4',
      slug: 'images',
      title: 'Images',
      summary:
        '`<img>` needs two attributes to be correct and two more to be well-behaved. Alt text is not optional.',
      minutes: 13,
      outcomes: [
        'Designs the web page by inserting appropriate multimedia objects according to user requirements',
      ],
      blocks: [
        {
          b: 'lead',
          text: 'The `<img>` tag embeds an image in an HTML document. It is a **self-closing tag** — there is no content to wrap, so there is no `</img>`.',
        },
        {
          b: 'code',
          lang: 'html',
          code: `<img src="image.jpg"
     alt="Description of the image"
     width="500"
     height="300">`,
        },

        { b: 'h2', text: 'The two required attributes' },
        {
          b: 'dl',
          items: [
            {
              term: 'src',
              desc: 'Specifies the **path to the image file**. The value can be a *relative* URL (a file in your own folders) or an *absolute* URL such as `https://example.com/photo.jpg`.',
            },
            {
              term: 'alt',
              desc: 'Provides **alternative text** for the image, which is displayed if the image cannot load. It is also what a screen reader announces to a blind visitor, and what a search engine reads.',
            },
          ],
        },
        {
          b: 'lab',
          spec: {
            lab: 'html',
            title: 'What alt text is for',
            html: `<p>An image that loads:</p>
<img src="media/bird.jpg" alt="A blue bird sitting on a branch" width="200">

<p>The same tag, with a filename that does not exist:</p>
<img src="media/missing.jpg" alt="A blue bird sitting on a branch" width="200">

<p>And with no alt text at all:</p>
<img src="media/missing.jpg" width="200">`,
            height: 400,
            note: 'The middle image failed, but the reader still learns what was meant to be there. The third failed silently and told the reader nothing. That difference is the entire argument for `alt`.',
          },
        },
        {
          b: 'note',
          tone: 'exam',
          title: 'Writing good alt text',
          text: 'Describe **what the image shows**, not that it is an image. “A blue bird on a branch” is useful; “image” or “bird.jpg” is not. If a picture is purely decorative, `alt=""` is correct — it tells a screen reader to skip it.',
        },

        { b: 'h2', text: 'Sizing' },
        {
          b: 'keyvals',
          items: [
            { k: 'width', v: 'Sets the width of the image, in pixels.' },
            { k: 'height', v: 'Sets the height of the image, in pixels.' },
            { k: 'title', v: 'Extra information, shown as a tooltip on hover.' },
            { k: 'border', v: 'Adds a border around the image by specifying its thickness. Deprecated — CSS does this now.' },
          ],
        },
        {
          b: 'note',
          tone: 'warn',
          title: 'Do not set both width and height carelessly',
          text: 'Changing both can **distort** the image. Maintain the aspect ratio, or set only one dimension and let the browser work out the other.',
        },
        {
          b: 'lab',
          spec: {
            lab: 'html',
            title: 'Aspect ratio, kept and broken',
            html: `<p>Width only — the height follows automatically:</p>
<img src="media/beach.jpg" alt="A palm tree beside a calm sea" width="240">

<p>Both set, badly — the picture is squashed:</p>
<img src="media/beach.jpg" alt="A palm tree beside a calm sea" width="240" height="80">`,
            height: 420,
            note: 'Delete the `height="80"` from the second image and it snaps back to its proper shape.',
          },
        },

        { b: 'h2', text: 'Images that are also links' },
        {
          b: 'p',
          text: 'Wrap the `<img>` in an `<a>` and the whole picture becomes clickable — the pattern behind every logo that returns you to the home page.',
        },
        {
          b: 'code',
          lang: 'html',
          code: `<a href="index.html">
  <img src="images/logo.png" alt="Vidya College — home" width="120">
</a>`,
        },

        {
          b: 'challenge',
          spec: {
            id: 'm4c4',
            title: 'A properly written image',
            brief:
              'Insert the bird photograph at `media/bird.jpg`. It must have **meaningful alt text**, a `width` of exactly **200**, and **no height attribute** (so the aspect ratio survives). Then wrap it in a link to `gallery.html`.',
            lang: 'html',
            starter: `<h2>Gallery</h2>

<!-- Add the linked image here -->
`,
            hints: [
              'Start with the image on its own and get it showing: `<img src="media/bird.jpg" alt="…" width="200">`.',
              'Meaningful alt text describes what is in the picture — more than one word.',
              'Then wrap the whole `<img>` tag inside `<a href="gallery.html">` … `</a>`.',
            ],
            solution: `<h2>Gallery</h2>

<a href="gallery.html">
  <img src="media/bird.jpg" alt="A blue bird sitting on a branch" width="200">
</a>`,
            checks: [
              { kind: 'selector', selector: 'img', min: 1, label: 'There is an image' },
              { kind: 'attr', selector: 'img', attr: 'src', contains: 'bird.jpg', label: 'The src points at media/bird.jpg' },
              { kind: 'attr', selector: 'img', attr: 'width', equals: '200', label: 'The width is exactly 200' },
              { kind: 'source', pattern: '<img[^>]*height=', not: true, label: 'No height attribute, so the aspect ratio is preserved' },
              { kind: 'source', pattern: 'alt="[^"]{8,}"', label: 'The alt text is a real description, not a word or two' },
              { kind: 'selector', selector: 'a[href="gallery.html"] img', min: 1, label: 'The image is inside a link to gallery.html' },
            ],
          },
        },

        {
          b: 'quiz',
          questions: [
            {
              kind: 'multi',
              q: 'Which attributes of `<img>` does the syllabus treat as **required**?',
              options: ['src', 'width', 'alt', 'height', 'border'],
              answers: [0, 2],
              why: '`src` says where the file is; `alt` says what it shows. Width, height and border are optional.',
            },
            {
              kind: 'mcq',
              q: 'When is the `alt` text displayed?',
              options: [
                'Always, underneath the image',
                'When the image cannot be loaded',
                'Only when the mouse hovers over the image',
                'Only in print',
              ],
              answer: 1,
              why: 'It replaces the image when it cannot load, and it is what a screen reader announces. The hover tooltip is `title`, not `alt`.',
            },
            {
              kind: 'mcq',
              q: 'What happens if you set both `width="300"` and `height="50"` on a square photograph?',
              options: [
                'The browser refuses to display it',
                'It is cropped to fit',
                'It is distorted — squashed out of its aspect ratio',
                'It scales to 300×300 anyway',
              ],
              answer: 2,
              why: 'The browser obeys you exactly and stretches the picture. Set one dimension, or keep the ratio yourself.',
            },
            {
              kind: 'tf',
              q: '`<img>` requires a closing `</img>` tag.',
              answer: false,
              why: 'It is a self-closing (empty) tag, like `<br>` and `<hr>`.',
            },
          ],
        },

        {
          b: 'recap',
          items: [
            '`<img src="…" alt="…">` — src and alt are the two that matter; the tag is self-closing.',
            'Alt text describes the picture, is read aloud by screen readers, and shows when loading fails.',
            'Set width **or** height, not both carelessly, or the image distorts.',
            'Wrap an image in `<a>` to make it a link.',
          ],
        },
      ],
    },

    // ── 4.5 ────────────────────────────────────────────────────
    {
      id: 'm4l5',
      slug: 'audio-video-embed',
      title: 'Audio, video and embed',
      summary:
        'HTML5 plays media without a plug-in. Two ways to give a source, and the attributes that decide how it behaves.',
      minutes: 14,
      outcomes: [
        'Designs the web page by inserting appropriate multimedia objects according to user requirements',
        'Identifies the standards of HTML',
      ],
      blocks: [
        {
          b: 'lead',
          text: 'HTML5 is the latest version of HTML, and one of its headline features is the ability to **play built-in videos and animations without downloading an additional add-on** — something earlier versions could not do.',
        },

        { b: 'h2', text: '<audio>' },
        {
          b: 'p',
          text: 'Used to embed sound content — music or audio files — into a web page. There are two ways to tell it where the sound is.',
        },
        {
          b: 'h3',
          text: 'Method 1 — the src attribute',
        },
        {
          b: 'code',
          lang: 'html',
          code: `<audio src="audio.mp3" controls></audio>`,
        },
        { b: 'h3', text: 'Method 2 — nested <source> tags' },
        {
          b: 'code',
          lang: 'html',
          code: `<audio controls>
  <source src="audio.mp3" type="audio/mp3">
  <source src="audio.ogg" type="audio/ogg">
</audio>`,
        },
        {
          b: 'p',
          text: 'The second form **ensures compatibility across different browsers** by providing multiple formats. The browser picks the **first compatible format** and ignores the rest. Each `<source>` needs a `src` (mandatory) and a `type` giving the MIME type.',
        },
        {
          b: 'keyvals',
          title: 'Attributes for <audio> and <video>',
          items: [
            { k: 'src', v: 'The location of the media file.' },
            { k: 'controls', v: 'Adds playback controls — play, pause, volume — for the user. Without it, the visitor has no way to start the file.' },
            { k: 'autoplay', v: 'Automatically starts playing when the page loads. Most browsers now block this unless the media is also muted.' },
            { k: 'loop', v: 'Repeats the media indefinitely.' },
            { k: 'muted', v: 'Mutes the audio by default.' },
            { k: 'preload', v: 'How much the browser should load in advance: `auto` (the whole file), `metadata` (just details such as duration), or `none`.' },
            { k: 'width / height', v: 'For `<video>` only — the size of the player.' },
          ],
        },
        {
          b: 'lab',
          spec: {
            lab: 'html',
            title: 'A real audio player',
            html: `<p>With controls — the visitor can play it:</p>
<audio src="media/sample.mp3" controls></audio>

<p>Without controls — nothing to click:</p>
<audio src="media/sample.mp3"></audio>

<p>With multiple sources, for browser compatibility:</p>
<audio controls>
  <source src="media/sample.mp3" type="audio/mp3">
  <source src="media/sample.ogg" type="audio/ogg">
</audio>`,
            height: 320,
            note: 'The second player is genuinely there — it is simply invisible, because without `controls` there is nothing to draw. That is the most common reason a student’s audio “does not work”.',
          },
        },

        { b: 'h2', text: '<video>' },
        {
          b: 'p',
          text: 'Used to embed video content. It works exactly like `<audio>` — the same two methods for the source, and the same attributes plus `width` and `height`.',
        },
        {
          b: 'lab',
          spec: {
            lab: 'html',
            title: 'A real video player',
            html: `<video src="media/sample.mp4" controls width="320"></video>

<p>Or with nested sources:</p>

<video controls width="320">
  <source src="media/sample.mp4" type="video/mp4">
  <source src="media/sample.webm" type="video/webm">
</video>`,
            height: 480,
            note: 'Add `loop` to the first tag and it will repeat forever. Add `muted autoplay` and it will start on its own — which is exactly why browsers require `muted` before they allow `autoplay`.',
          },
        },
        {
          b: 'note',
          tone: 'warn',
          title: 'Autoplay is a design decision, not a feature',
          text: 'Sound starting by itself is the fastest way to make a visitor close a tab. If you use `autoplay`, use `muted` with it — and give the visitor `controls` so they can choose.',
        },

        { b: 'h2', text: '<embed>' },
        {
          b: 'p',
          text: 'Used to embed **external content** — multimedia, interactive applications, or other resources such as a PDF — into a webpage.',
        },
        {
          b: 'keyvals',
          items: [
            { k: 'src (mandatory)', v: 'The path to the resource or media file. Can be a local or absolute URL.' },
            { k: 'width', v: 'The width of the embedded area.' },
            { k: 'height', v: 'The height of the embedded area.' },
          ],
        },
        {
          b: 'code',
          lang: 'html',
          code: `<embed src="video.mp4" width="500" height="300">

<embed src="file.pdf" width="500" height="400">

<embed src="image.jpg" width="300" height="200">`,
        },
        {
          b: 'note',
          tone: 'note',
          title: 'When to use which',
          text: 'Use `<img>` for pictures, `<audio>` for sound and `<video>` for video — they are purpose-built and give the browser the most to work with. Reach for `<embed>` only when the content does not fit those three, such as a PDF.',
        },

        {
          b: 'challenge',
          spec: {
            id: 'm4c5',
            title: 'A video the visitor can actually play',
            brief:
              'Embed `media/sample.mp4` as a **video** that is **320 pixels wide**, has **visible controls**, and **loops**. Use the nested `<source>` form rather than the `src` attribute, so the page could offer a second format later.',
            lang: 'html',
            starter: `<h2>School anthem</h2>

<video>

</video>`,
            hints: [
              'Attributes such as `controls` and `loop` are written on the `<video>` tag itself, with no value.',
              'The nested form is `<video controls><source src="…" type="video/mp4"></video>`.',
              'The MIME type for an .mp4 file is `video/mp4`.',
            ],
            solution: `<h2>School anthem</h2>

<video controls loop width="320">
  <source src="media/sample.mp4" type="video/mp4">
</video>`,
            checks: [
              { kind: 'selector', selector: 'video', min: 1, label: 'There is a <video> element' },
              { kind: 'selector', selector: 'video[controls]', min: 1, label: 'It has the controls attribute' },
              { kind: 'selector', selector: 'video[loop]', min: 1, label: 'It has the loop attribute' },
              { kind: 'attr', selector: 'video', attr: 'width', equals: '320', label: 'Its width is 320' },
              { kind: 'selector', selector: 'video source', min: 1, label: 'It uses a nested <source> tag' },
              { kind: 'attr', selector: 'video source', attr: 'type', equals: 'video/mp4', label: 'The source declares type="video/mp4"' },
              { kind: 'source', pattern: '<video[^>]*\\ssrc=', not: true, label: 'The src attribute is not used on <video> itself' },
            ],
          },
        },

        {
          b: 'quiz',
          questions: [
            {
              kind: 'mcq',
              q: 'Why would you use nested `<source>` tags instead of a single `src` attribute?',
              options: [
                'It makes the file load faster',
                'To provide several formats, so the browser can pick one it supports',
                'It is required in HTML5',
                'To play several files one after another',
              ],
              answer: 1,
              why: 'The browser selects the **first compatible format** and ignores the rest — that is how you cover browsers with different codec support.',
            },
            {
              kind: 'mcq',
              q: 'A student embeds an audio file, and nothing appears on the page. What is the most likely cause?',
              options: [
                'The file is too large',
                'The `controls` attribute is missing',
                '`<audio>` only works in Chrome',
                'Audio must be inside a <div>',
              ],
              answer: 1,
              why: 'Without `controls` there is no player to draw, so the element is invisible even though it is present.',
            },
            {
              kind: 'multi',
              q: 'Which attributes are valid on `<video>`?',
              options: ['controls', 'autoplay', 'alt', 'loop', 'muted'],
              answers: [0, 1, 3, 4],
              why: '`alt` belongs to `<img>`. Video takes controls, autoplay, loop, muted, preload, width and height.',
            },
            {
              kind: 'fill',
              q: 'Which attribute on a `<source>` tag gives the MIME type of the file?',
              accept: ['type'],
              why: '`type="video/mp4"` or `type="audio/mp3"` tells the browser what the file is before it downloads it.',
              placeholder: 'attribute name',
            },
          ],
        },

        {
          b: 'recap',
          items: [
            'HTML5 plays audio and video natively — no plug-in needed.',
            'Two ways to give a source: the `src` attribute, or nested `<source type="…">` tags for compatibility.',
            'Without `controls` there is nothing for the visitor to press.',
            '`autoplay` needs `muted` in modern browsers, and needs a good reason in any browser.',
            '`<embed src width height>` covers everything else, such as a PDF.',
          ],
        },
      ],
    },

    // ── 4.6 ────────────────────────────────────────────────────
    {
      id: 'm4l6',
      slug: 'multipage-project',
      title: 'Project: a small website',
      summary:
        'Four pages, one shared navigation, images and media — the practical task in miniature.',
      minutes: 22,
      outcomes: [
        'Uses HTML to create linked web pages',
        'Links pages and multimedia objects to the web page',
      ],
      blocks: [
        {
          b: 'lead',
          text: 'You now have every tag you need to build a real, if plain, website. This project puts them together the way a practical question would.',
        },

        { b: 'h2', text: 'The plan' },
        {
          b: 'p',
          text: 'Four pages, in one folder, with an `images` folder and a `media` folder beside them.',
        },
        {
          b: 'code',
          lang: 'text',
          code: `mysite/
├── index.html      the home page
├── about.html      history and staff
├── gallery.html    photographs
├── contact.html    address and telephone
├── images/
│   ├── logo.png
│   └── bird.jpg
└── media/
    └── sample.mp3`,
        },
        {
          b: 'note',
          tone: 'exam',
          title: 'Why the home page is called index.html',
          text: 'Web servers look for `index.html` (or `index.php`) automatically when a visitor asks for a folder rather than a file. Name your home page anything else and `www.yoursite.lk` will show a directory listing or an error. Module 8 returns to this.',
        },

        { b: 'h2', text: 'The shared navigation' },
        {
          b: 'p',
          text: 'Write this once, then paste it near the top of all four pages. Every page reaches every other page, so the visitor never has to press Back.',
        },
        {
          b: 'code',
          lang: 'html',
          code: `<p>
  <a href="index.html">Home</a> |
  <a href="about.html">About</a> |
  <a href="gallery.html">Gallery</a> |
  <a href="contact.html">Contact</a>
</p>`,
        },

        { b: 'h2', text: 'Build the gallery page' },
        {
          b: 'p',
          text: 'The gallery is the page that exercises the most of this module: relative paths, images, alt text, a bookmark, and an embedded media file. Build it here, then write the other three the same way in your own editor.',
        },

        {
          b: 'challenge',
          spec: {
            id: 'm4project',
            title: 'Build gallery.html',
            brief:
              'Produce a complete gallery page. It needs: the four-link navigation bar; an `<h1>`; **two images** from `media/` with real alt text; a **bookmark link** to a section further down the page; and an `<audio>` player with controls. Use relative paths throughout.',
            lang: 'html',
            starter: `<!DOCTYPE html>
<html>
<head>
  <title>Gallery — Vidya College</title>
</head>
<body>

  <!-- 1. Navigation bar with four links -->

  <!-- 2. Main heading -->

  <!-- 3. A link that jumps to the sounds section below -->

  <!-- 4. Two images with alt text -->

  <!-- 5. A heading with id="sounds", then an audio player -->

</body>
</html>`,
            hints: [
              'The two pictures available here are `media/bird.jpg` and `media/beach.jpg`.',
              'The bookmark needs `id="sounds"` on the heading and `href="#sounds"` on the link.',
              'The audio file is `media/sample.mp3`, and it needs the `controls` attribute to be visible.',
              'Set only `width` on each image so the aspect ratio survives.',
            ],
            solution: `<!DOCTYPE html>
<html>
<head>
  <title>Gallery — Vidya College</title>
</head>
<body>

  <p>
    <a href="index.html">Home</a> |
    <a href="about.html">About</a> |
    <a href="gallery.html">Gallery</a> |
    <a href="contact.html">Contact</a>
  </p>

  <h1>Gallery</h1>

  <p><a href="#sounds">Jump to the sound recordings</a></p>

  <img src="media/bird.jpg" alt="A blue bird sitting on a branch" width="220">
  <img src="media/beach.jpg" alt="A palm tree beside a calm sea at sunset" width="220">

  <h2 id="sounds">Sound recordings</h2>
  <audio src="media/sample.mp3" controls></audio>

</body>
</html>`,
            checks: [
              { kind: 'source', pattern: '<!DOCTYPE\\s+html>', label: 'It is a complete HTML5 document' },
              { kind: 'selector', selector: 'a[href="index.html"]', min: 1, label: 'The navigation links to index.html' },
              { kind: 'selector', selector: 'a[href="about.html"]', min: 1, label: 'The navigation links to about.html' },
              { kind: 'selector', selector: 'a[href="contact.html"]', min: 1, label: 'The navigation links to contact.html' },
              { kind: 'selector', selector: 'h1', min: 1, max: 1, label: 'There is exactly one <h1>' },
              { kind: 'selector', selector: 'img', min: 2, label: 'There are two images' },
              { kind: 'source', pattern: '<img(?:(?!alt=)[^>])*>', not: true, label: 'Every image has an alt attribute' },
              { kind: 'selector', selector: 'a[href^="#"]', min: 1, label: 'There is a bookmark link starting with #' },
              { kind: 'selector', selector: '[id="sounds"]', min: 1, label: 'An element carries id="sounds"' },
              { kind: 'selector', selector: 'audio[controls]', min: 1, label: 'There is an audio player with controls' },
              { kind: 'source', pattern: '[A-Z]:\\\\', not: true, label: 'No absolute disk paths are used' },
            ],
          },
        },

        { b: 'h2', text: 'Finishing the site yourself' },
        {
          b: 'p',
          text: 'Copy your gallery page three times in a text editor, rename the copies, and change the heading and content on each. That is genuinely how a small static site gets built — and it is also why external CSS, coming next, is such a relief: one stylesheet instead of four copies of the same styling.',
        },
        {
          b: 'ul',
          items: [
            '`index.html` — a welcome, the latest notices, and links onward.',
            '`about.html` — history, the principal’s message, a photograph.',
            '`contact.html` — address, telephone, and a link back home.',
            'Check every link on every page by clicking it. A site with one broken link looks careless; a site with five looks abandoned.',
          ],
        },

        {
          b: 'recap',
          items: [
            'A website is a folder of pages plus folders for images and media.',
            'Name the home page `index.html` so servers find it automatically.',
            'The same navigation block goes on every page.',
            'Relative paths only — the site must survive being uploaded.',
            'Click every link before you call it finished.',
          ],
        },
      ],
    },
  ],
}

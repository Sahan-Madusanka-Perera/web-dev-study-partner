import type { Module } from '../../types/content'

export const m2: Module = {
  id: 'm2',
  slug: 'planning',
  competency: '10.2',
  index: 2,
  title: 'Planning a Website',
  promise:
    'Turn a vague “we need a website” into a written set of objectives, audiences, requirements and a navigation plan you could hand to a developer.',
  blurb:
    'Every mark in this competency level is for thinking done before any code is written. Objectives, goals, audiences, requirements, layout and navigation — the paperwork that decides whether the site is any good.',
  lang: 'text',
  lessons: [
    // ── 2.1 ────────────────────────────────────────────────────
    {
      id: 'm2l1',
      slug: 'objectives-and-goals',
      title: 'Objectives and goals',
      summary:
        'Why does this website exist? Answer that badly and everything built on top of it is guesswork.',
      minutes: 11,
      outcomes: [
        'Defines the objectives of a website',
        'Distinguishes objectives from measurable goals',
      ],
      blocks: [
        {
          b: 'lead',
          text: 'The syllabus is blunt about this: **objectives of a website should be defined well to build a great website.** Good objectives help the designer identify the users’ requirements, define them, and satisfy them — and a set of well-defined objectives with usable solutions increases the user experience and keeps people coming back.',
        },

        { b: 'h2', text: 'The seven questions' },
        {
          b: 'p',
          text: 'Before design begins, the client and the designer answer these together. They are worth memorising as a checklist, because a question asking you to "state the objectives of a proposed website" is really asking you to work through this list for the scenario given.',
        },
        {
          b: 'ol',
          items: [
            'Why do you need a new website?',
            'What outcomes do you want to achieve?',
            'Do you have an existing website? Are there any problems with it?',
            'How do you plan to improve the user experience — speed, content, clarity?',
            'What are you trying to boost through the new website?',
            'Are you going to inform people about new opportunities in your organisation?',
            'Are you planning to expand your business?',
          ],
        },
        {
          b: 'note',
          tone: 'exam',
          title: 'How this is asked',
          text: 'Exam scenarios usually describe an organisation — a school, a hotel, a bookshop — and ask for objectives. Do not answer "to have a website". Answer with **outcomes**: to reduce phone enquiries, to publish results within an hour, to reach parents in other districts.',
        },

        { b: 'h2', text: 'Objectives become goals' },
        {
          b: 'p',
          text: 'An **objective** is the reason the site exists. A **goal** is the measurable target that tells you whether the objective is being met. The syllabus gives two examples for an online shopping site: *increasing the number of inquiries to the website*, and *increasing online sales*.',
        },
        {
          b: 'compare',
          left: {
            title: 'Objective — the direction',
            items: [
              'Reduce the number of phone calls to the school office',
              'Let parents in other districts follow school events',
              'Sell books outside Colombo',
            ],
          },
          right: {
            title: 'Goal — the measurement',
            items: [
              'Cut office calls about term dates by half within one term',
              '200 unique visitors to the events page each month',
              '30 online orders per month by December',
            ],
          },
        },
        {
          b: 'p',
          text: 'Notice the pattern: a goal has **a number and a deadline**. Without one you cannot tell success from wishful thinking, and you cannot decide, six months later, whether the site needs changing.',
        },

        { b: 'h2', text: 'A worked scenario' },
        {
          b: 'p',
          text: 'Read this the way you would read an exam scenario, then check your answer against the one below it.',
        },
        {
          b: 'note',
          tone: 'note',
          title: 'The scenario',
          text: '*Vidya College has 1,800 students. The office answers the same questions by phone all day: term dates, exam timetables, uniform rules. Results are posted on a noticeboard, so parents outside Kandy cannot see them. The principal wants a website.*',
        },
        {
          b: 'keyvals',
          title: 'One good answer',
          items: [
            { k: 'Objective 1', v: 'Publish the information the office repeats by phone, so parents can find it themselves at any hour.' },
            { k: 'Objective 2', v: 'Make results and timetables reachable by parents who cannot come to the noticeboard.' },
            { k: 'Objective 3', v: 'Present the school properly to families choosing a school for next year.' },
            { k: 'Goal 1', v: 'Reduce routine office calls by 50% within one term.' },
            { k: 'Goal 2', v: 'Every term-test result published online within 24 hours of release.' },
            { k: 'Goal 3', v: '150 visits to the admissions page in the month before applications open.' },
          ],
        },

        {
          b: 'quiz',
          questions: [
            {
              kind: 'mcq',
              q: 'Which of these is a **goal** rather than an objective?',
              options: [
                'To let parents see results without visiting the school',
                'To present the school well to new families',
                'To reduce routine office calls by 50% within one term',
                'To modernise the school’s image',
              ],
              answer: 2,
              why: 'A goal is measurable and has a target. The other three describe direction, which makes them objectives.',
            },
            {
              kind: 'multi',
              q: 'Which questions belong in the list used to define website objectives?',
              options: [
                'Why do you need a new website?',
                'Which font should the headings use?',
                'Do you have an existing website, and are there problems with it?',
                'How do you plan to improve the user experience?',
                'Which hosting company is cheapest?',
              ],
              answers: [0, 2, 3],
              why: 'Fonts and hosting are decisions made **later**, once the objectives are known. Objective questions are about purpose and outcome.',
            },
            {
              kind: 'tf',
              q: 'Once objectives are written down at the start of a project, they should not be revisited.',
              answer: false,
              why: 'Requirements — and the objectives behind them — **change over time**, and the syllabus expects the designer to keep the site updated as they do.',
            },
            {
              kind: 'fill',
              q: 'A goal must be measurable. Complete the rule: a good goal has a number and a ______.',
              accept: ['deadline', 'date', 'time frame', 'timeframe'],
              why: 'A number and a deadline. "More visitors" is a wish; "200 visitors a month by June" is a goal.',
              placeholder: 'one word',
            },
          ],
        },

        {
          b: 'recap',
          items: [
            'Objectives are defined first, and they drive every later decision.',
            'The seven objective questions are examinable — learn them as a checklist.',
            'An objective gives direction; a goal attaches a number and a deadline to it.',
            'Objectives change over time, so the website has to be kept up to date with them.',
          ],
        },
      ],
    },

    // ── 2.2 ────────────────────────────────────────────────────
    {
      id: 'm2l2',
      slug: 'audiences-and-requirements',
      title: 'Audiences and requirements',
      summary:
        'Who is this for, and what must the site actually do? Six requirement headings cover the whole syllabus.',
      minutes: 12,
      outcomes: [
        'Identifies the key audiences of a website and prioritises them',
        'Analyses user requirements including multimedia contents',
      ],
      blocks: [
        {
          b: 'lead',
          text: 'A website cannot be equally good for everybody. Deciding **who it is mainly for** is what turns a list of pages into a design.',
        },

        { b: 'h2', text: 'Identifying key audiences' },
        {
          b: 'p',
          text: 'You identify the key audiences you must appeal to in order to reach your objectives. For a business that set may include **potential customers** and **your own employees**. For a school it may be current parents, prospective parents, students and old boys.',
        },
        {
          b: 'p',
          text: 'Then — and this is the step students skip — you **list those audiences in priority order**. The syllabus says so plainly: doing this helps you plan the design layout and the navigation design of the website.',
        },
        {
          b: 'note',
          tone: 'tip',
          title: 'Why priority order matters',
          text: 'The top-priority audience gets the shortest path. If prospective parents come first, "Admissions" belongs in the main menu and on the home page. If current students come first, the timetable does. The same site, ordered differently, becomes a different site.',
        },

        { b: 'h2', text: 'What user requirements are' },
        {
          b: 'p',
          text: 'User requirements describe **the needs of users, the functionalities the website should perform, and the goals of the website**. The designer defines, documents and describes them — and keeps the site updated as they change over time.',
        },
        {
          b: 'p',
          text: 'The syllabus lists six headings to collect before design begins. Answer all six for any scenario you are given and you have covered the question.',
        },
        {
          b: 'dl',
          items: [
            {
              term: 'Content',
              desc: 'Determining what content the site needs, and what will need updating. An essential part of the design — a beautiful page with nothing to say is a failure.',
            },
            {
              term: 'Layout & navigation',
              desc: 'What appears in the layout, and how the user moves from the home page to the other pages.',
            },
            {
              term: 'Usability',
              desc: 'The accessibility requirements — can it be used on a phone, on a slow connection, by someone with poor eyesight, by someone using a keyboard only?',
            },
            {
              term: 'Security',
              desc: 'What must be protected. Does the site take passwords, payments or personal data? Then it needs HTTPS, validation and access control.',
            },
            {
              term: 'Loading times',
              desc: 'How fast it must be, given the kind of service it provides. A results page checked by thousands at once has different needs from a brochure.',
            },
            {
              term: 'Legal',
              desc: 'The legal implications the website must adhere to — copyright on images, privacy of student data, terms of sale.',
            },
          ],
        },

        { b: 'h2', text: 'Multimedia requirements' },
        {
          b: 'p',
          text: 'Competency level 10.2 is titled *analyses user requirements (multimedia contents)*, so the media a site needs is part of the requirement-gathering, not an afterthought. For each item, record **what it is, who supplies it, and what it costs in loading time**.',
        },
        {
          b: 'table',
          head: ['Media', 'Typical use', 'What to check before promising it'],
          rows: [
            ['Images', 'Photos of events, products, staff', 'Who owns the copyright? Are they compressed? Is there alt text for each?'],
            ['Audio', 'School anthem, pronunciation guides, podcasts', 'File size, format support, whether it should autoplay (it should not)'],
            ['Video', 'Prize-giving, product demonstrations, tutorials', 'Bandwidth cost, whether to host it yourself or embed it'],
            ['Animation', 'Explaining a process, drawing attention', 'Does it add meaning, or only weight and distraction?'],
            ['Forms', 'Enquiries, registration, feedback', 'Which fields are required, where the data goes, who reads it'],
          ],
        },
        {
          b: 'note',
          tone: 'warn',
          title: 'The trade-off to state in an answer',
          text: 'Every piece of media improves the message and worsens the loading time. A good requirements document says which way that trade-off is being made and why — *large photographs are acceptable on the gallery page but not on the home page*, for instance.',
        },

        {
          b: 'quiz',
          questions: [
            {
              kind: 'match',
              q: 'Match each requirement to its heading.',
              pairs: [
                { left: 'The site must work on a 3G phone', right: 'Usability' },
                { left: 'Student marks must not be publicly readable', right: 'Security' },
                { left: 'Photographs must be licensed for use', right: 'Legal' },
                { left: 'The results page must open in under 3 seconds', right: 'Loading times' },
              ],
              why: 'These four headings, plus **content** and **layout & navigation**, make up the six the syllabus lists.',
            },
            {
              kind: 'mcq',
              q: 'Why does the syllabus say to list key audiences in priority order?',
              options: [
                'To decide how many pages the site will have',
                'Because it helps in planning the design layout and the navigation design',
                'To calculate the hosting cost',
                'Because search engines rank sites by audience',
              ],
              answer: 1,
              why: 'Priority order drives layout and navigation — the highest-priority audience gets the shortest route to what it came for.',
            },
            {
              kind: 'tf',
              q: 'User requirements are written once and stay fixed for the life of the website.',
              answer: false,
              why: 'They **change over time**, and designers are expected to keep the website updated based on the changing requirements.',
            },
            {
              kind: 'multi',
              q: 'A hotel wants an online booking website. Which of these are genuine requirements to record?',
              options: [
                'Payment details must be handled over HTTPS',
                'The room gallery needs 20 compressed photographs supplied by the hotel',
                'The developer prefers the colour blue',
                'Cancellation terms must appear before payment, for legal reasons',
                'The booking page should load in under 3 seconds on mobile data',
              ],
              answers: [0, 1, 3, 4],
              why: 'A developer’s colour preference is taste, not a requirement. The other four map onto security, content, legal and loading times.',
            },
          ],
        },

        {
          b: 'recap',
          items: [
            'Identify the key audiences, then put them in priority order — that order shapes layout and navigation.',
            'Six requirement headings: content, layout & navigation, usability, security, loading times, legal.',
            'Multimedia is a requirement with a cost: every image and video trades message against speed.',
            'Requirements are documented, then revisited as they change.',
          ],
        },
      ],
    },

    // ── 2.3 ────────────────────────────────────────────────────
    {
      id: 'm2l3',
      slug: 'layout-and-navigation',
      title: 'Layout, pages and navigation',
      summary:
        'Decide the pages, decide what is on each one, and decide how visitors move between them — on paper, before any HTML.',
      minutes: 13,
      outcomes: [
        'Creates effective and appropriate information layout of a website',
        'Identifies the web pages of a website',
        'Identifies the contents of a web page',
        'Identifies navigation structure',
      ],
      blocks: [
        {
          b: 'lead',
          text: 'Three decisions turn requirements into something buildable: **which pages exist**, **what goes on each page**, and **how a visitor gets from one to another**. Do them in that order.',
        },

        { b: 'h2', text: 'Deciding the pages' },
        {
          b: 'p',
          text: 'A **website** is a number of interconnected web pages linked together with hyperlinks. The main page is the **home page** — the starting point from which the user begins navigating, and which carries the navigational links to the other pages.',
        },
        {
          b: 'p',
          text: 'To list the pages, take each objective and ask what page would satisfy it. Group anything left over. A five-page site that answers every objective beats a fifteen-page site that answers none.',
        },
        {
          b: 'table',
          head: ['Page', 'Exists because', 'Main content'],
          rows: [
            ['Home', 'Every visitor arrives somewhere, and needs pointing', 'Welcome text, latest notices, links to everything else'],
            ['About', 'New families want to know who the school is', 'History, principal’s message, photographs'],
            ['Academics', 'Current students and parents need term information', 'Subjects, timetables, term dates'],
            ['Results', 'The top objective — publishing results quickly', 'Table of results, download links'],
            ['Contact', 'Enquiries have to reach a human somehow', 'Address, phone, map, enquiry form'],
          ],
          caption: 'A page inventory for the Vidya College scenario. Notice that every row names the objective it serves.',
        },

        { b: 'h2', text: 'Deciding what is on a page' },
        {
          b: 'p',
          text: 'For each page, list its elements before styling any of them. Web pages can contain text (headings and paragraphs), images, graphics and animations, video and audio, hyperlinks, forms and buttons, a navigation menu and footer, tables, lists, icons, search bars, slideshows and chat widgets.',
        },
        {
          b: 'p',
          text: 'A useful layout sketch names five regions and puts the page elements into them.',
        },
        {
          b: 'code',
          lang: 'text',
          code: `┌──────────────────────────────────────────────┐
│  HEADER      school crest · name · tagline   │
├──────────────────────────────────────────────┤
│  NAVIGATION  Home · About · Academics ·      │
│              Results · Contact               │
├───────────────────────────────┬──────────────┤
│  MAIN CONTENT                 │  SIDEBAR     │
│  heading                      │  notices     │
│  paragraphs                   │  quick links │
│  table of term dates          │              │
├───────────────────────────────┴──────────────┤
│  FOOTER      address · phone · © 2026        │
└──────────────────────────────────────────────┘`,
          caption: 'Header, navigation, main content, sidebar, footer. Sketch this on paper first — it costs nothing to change.',
        },
        {
          b: 'note',
          tone: 'tip',
          title: 'Consistency is the whole point',
          text: 'The header, navigation and footer should be **the same on every page**. A visitor who learns where the menu is on the home page should never have to learn it again. That consistency is also the reason external CSS exists — one file, every page.',
        },

        { b: 'h2', text: 'Deciding the navigation' },
        {
          b: 'p',
          text: 'Navigation is the shape of the links between pages. Four shapes cover almost everything you will be asked to design.',
        },

        { b: 'widget', spec: { widget: 'site-planner' } },

        {
          b: 'p',
          text: 'Whichever shape you choose, two rules hold. Every page carries a link **back to the home page**, and no useful page is more than two or three clicks from the start.',
        },

        { b: 'h2', text: 'Writing it down' },
        {
          b: 'p',
          text: 'The deliverable of all this planning is a short document. If you can hand somebody the four things below and they could build the site without asking you a question, the planning is done.',
        },
        {
          b: 'steps',
          items: [
            {
              title: 'Objectives and goals',
              text: 'Why the site exists, and the numbers that prove it is working.',
            },
            {
              title: 'Audiences, in priority order',
              text: 'Who it is for, most important first.',
            },
            {
              title: 'Page inventory with contents',
              text: 'Every page, the objective it serves, and the elements it holds.',
            },
            {
              title: 'Navigation diagram',
              text: 'The pages as boxes, the links as arrows. One picture, no ambiguity.',
            },
          ],
        },

        {
          b: 'challenge',
          spec: {
            id: 'm2c1',
            title: 'Build the navigation menu from your plan',
            brief:
              'A plan is only worth something if it survives contact with markup. Build the navigation bar for the five-page school site: an **unordered list** containing exactly **five links**, in the order Home, About, Academics, Results, Contact. The first link must point to `index.html`.',
            lang: 'html',
            starter: `<h1>Vidya College</h1>

<!-- Build the navigation list below -->
<ul>

</ul>`,
            hints: [
              'An unordered list is `<ul>` … `</ul>`, and each item inside it is `<li>` … `</li>`.',
              'A link is `<a href="page.html">Label</a>`. Put one inside each `<li>`.',
              'The five files are index.html, about.html, academics.html, results.html and contact.html.',
            ],
            solution: `<h1>Vidya College</h1>

<ul>
  <li><a href="index.html">Home</a></li>
  <li><a href="about.html">About</a></li>
  <li><a href="academics.html">Academics</a></li>
  <li><a href="results.html">Results</a></li>
  <li><a href="contact.html">Contact</a></li>
</ul>`,
            checks: [
              { kind: 'selector', selector: 'ul', min: 1, label: 'There is an unordered list on the page' },
              { kind: 'selector', selector: 'ul li', min: 5, max: 5, label: 'The list has exactly five items' },
              { kind: 'selector', selector: 'ul li a', min: 5, label: 'Every list item contains a link' },
              { kind: 'attr', selector: 'ul li:first-child a', attr: 'href', equals: 'index.html', label: 'The first link points to index.html' },
              { kind: 'text', selector: 'ul li:first-child a', contains: 'home', label: 'The first link is labelled Home' },
              { kind: 'text', selector: 'ul li:last-child a', contains: 'contact', label: 'The last link is labelled Contact' },
            ],
          },
        },

        {
          b: 'quiz',
          questions: [
            {
              kind: 'mcq',
              q: 'A tutorial site takes the visitor through ten steps that must be followed in order. Which navigation structure fits best?',
              options: ['Hub and spoke', 'Linear', 'Networked', 'Hierarchical'],
              answer: 1,
              why: 'Linear navigation moves the visitor through pages in a fixed sequence — exactly what a step-by-step tutorial needs.',
            },
            {
              kind: 'mcq',
              q: 'What is the home page of a website?',
              options: [
                'The page with the most content',
                'The page that loads fastest',
                'The main page, the starting point, which provides navigation links to other pages',
                'Any page named index.html',
              ],
              answer: 2,
              why: 'The home page is the assumed starting point of the site and carries the navigational links to everywhere else. It is usually *named* index.html, but the name is not what makes it the home page.',
            },
            {
              kind: 'order',
              q: 'Put the planning steps in the order the syllabus expects.',
              items: [
                'Define the objectives of the website',
                'Identify and prioritise the key audiences',
                'Gather the user requirements',
                'Decide the pages and what goes on each',
                'Draw the navigation structure',
              ],
              why: 'Objectives first — everything after them is a consequence. Navigation last, because you cannot draw links between pages you have not decided on yet.',
            },
            {
              kind: 'tf',
              q: 'The navigation menu should be placed differently on each page to keep the design interesting.',
              answer: false,
              why: 'Consistency is the point. A visitor should learn the navigation once. Moving it around each page makes the site harder to use, not more interesting.',
            },
          ],
        },

        {
          b: 'recap',
          items: [
            'Pages come from objectives: every page should name the objective it serves.',
            'A page layout has five familiar regions — header, navigation, main content, sidebar, footer.',
            'Header, navigation and footer stay identical across the whole site.',
            'Four navigation shapes: linear, hierarchical, hub and spoke, networked.',
            'The plan is finished when someone else could build the site from it without asking you anything.',
          ],
        },
      ],
    },
  ],
}

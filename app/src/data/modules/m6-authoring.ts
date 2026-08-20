import type { Module } from '../../types/content'

export const m6: Module = {
  id: 'm6',
  slug: 'authoring-tools',
  competency: '10.6',
  index: 6,
  title: 'Web Authoring Tools',
  promise:
    'Name the categories of web authoring tool, give an example of each, and argue for hand-coding or a tool depending on the job.',
  blurb:
    'The shortest competency level, and pure recall. Two lessons cover what an authoring tool is, the twelve categories the syllabus lists, and the trade-off against writing code by hand.',
  lang: 'text',
  lessons: [
    // ── 6.1 ────────────────────────────────────────────────────
    {
      id: 'm6l1',
      slug: 'what-authoring-tools-are',
      title: 'What a web authoring tool is',
      summary:
        'Software that produces web content for other people to use — and the four reasons anyone reaches for one.',
      minutes: 9,
      outcomes: ['Briefly explains web authoring tools'],
      blocks: [
        {
          b: 'lead',
          text: '**Any software, or collection of software components, that authors can use to create or modify web content for use by other people is called an authoring tool.** That definition is broader than most students expect — it includes the plain text editor you have been using all along.',
        },

        { b: 'h2', text: 'The idea' },
        {
          b: 'p',
          text: '**Web authoring** is the practice of creating web documents using modern web authoring software and tools. Web authoring software is a type of desktop publishing tool that lets users navigate the tricky environment of HTML and web coding by offering a **different kind of graphical user interface**.',
        },
        {
          b: 'p',
          text: 'Instead of typing HTML, CSS and JavaScript by hand, these tools provide **visual interfaces** — drag-and-drop editors, property panels, templates — and generate the underlying code for you.',
        },

        { b: 'h2', text: 'Why they exist' },
        {
          b: 'dl',
          items: [
            {
              term: 'Simplify website creation',
              desc: 'They eliminate the need to know programming languages such as HTML and CSS, making website creation accessible to people who are not developers.',
            },
            {
              term: 'Speed up development',
              desc: 'Visual editors and templates let you build pages and whole sites much faster than hand-coding from scratch.',
            },
            {
              term: 'Reduce errors',
              desc: 'Because the software generates code automatically, common syntax mistakes — a missing closing tag, a mistyped property — simply do not occur.',
            },
            {
              term: 'Provide professional results',
              desc: 'Modern tools offer responsive layouts, SEO features and analytics that were once only possible with expert help.',
            },
            {
              term: 'Support collaboration',
              desc: 'Many now include team editing, version control and workflow features so several people can work on one site.',
            },
          ],
        },

        { b: 'h2', text: 'The trade-off' },
        {
          b: 'p',
          text: 'Nothing is free. What you gain in speed you lose in control, and this is the comparison an exam question is really after.',
        },
        {
          b: 'compare',
          left: {
            title: 'Hand-coding',
            items: [
              'Complete control over every tag and rule',
              'Clean, small, readable output',
              'You must know the language',
              'Slower to produce a first version',
              'Easy to debug — you wrote every line',
            ],
          },
          right: {
            title: 'An authoring tool',
            items: [
              'Fast to a working page, with no language knowledge',
              'Generated code is often bulky and hard to read',
              'Limited to what the tool can express',
              'Templates keep a site visually consistent',
              'Harder to debug — you did not write the output',
            ],
          },
        },
        {
          b: 'note',
          tone: 'exam',
          title: 'Answering "which is better"',
          text: 'Neither. The honest answer names the situation: **a tool** for a small business that needs a site next week and has nobody technical; **hand-coding** where performance, precision or unusual requirements matter. An answer that says one is simply superior is missing the mark.',
        },
        {
          b: 'note',
          tone: 'tip',
          title: 'Why you are learning to hand-code anyway',
          text: 'Every authoring tool eventually produces something you did not ask for, and then somebody has to open the HTML and fix it. That person needs everything in Modules 3, 4 and 5 — which is exactly why the syllabus teaches the code first and the tools afterwards.',
        },

        {
          b: 'quiz',
          questions: [
            {
              kind: 'mcq',
              q: 'Which definition matches "authoring tool" as the syllabus uses it?',
              options: [
                'Any software used to browse the web',
                'Any software authors can use to create or modify web content for use by other people',
                'Software that hosts a website on the internet',
                'A programming language for the web',
              ],
              answer: 1,
              why: 'The definition is deliberately broad — it covers everything from Notepad to a full content management system.',
            },
            {
              kind: 'multi',
              q: 'Which are genuine advantages of using a web authoring tool?',
              options: [
                'It removes the need to know HTML and CSS',
                'It always produces smaller, faster pages than hand-coding',
                'It speeds up development with templates and visual editors',
                'It reduces common syntax errors',
                'It gives more precise control than writing code',
              ],
              answers: [0, 2, 3],
              why: 'Generated code is usually **bulkier**, not smaller, and hand-coding gives more precise control. The other three are real advantages.',
            },
            {
              kind: 'tf',
              q: 'Notepad counts as a web authoring tool under the syllabus definition.',
              answer: true,
              why: 'It is software an author uses to create web content for other people. The definition covers source-code editing as one of the categories.',
            },
          ],
        },

        {
          b: 'recap',
          items: [
            'An authoring tool is any software used to create or modify web content for others.',
            'Web authoring software offers a visual interface and generates the code underneath.',
            'Benefits: simpler, faster, fewer errors, professional features, collaboration.',
            'Cost: bulkier output, less control, harder to debug.',
          ],
        },
      ],
    },

    // ── 6.2 ────────────────────────────────────────────────────
    {
      id: 'm6l2',
      slug: 'categories-of-tool',
      title: 'The categories of authoring tool',
      summary:
        'Twelve categories, each with an example — the list the syllabus asks you to reproduce.',
      minutes: 11,
      outcomes: ['Briefly explains web authoring tools', 'Creates web pages using a web authoring tool'],
      blocks: [
        {
          b: 'lead',
          text: 'The syllabus lists the kinds of software that count as authoring tools. Learn the category names first — an example each is easy to attach once the category is in your head.',
        },

        { b: 'h2', text: 'The twelve categories' },
        {
          b: 'table',
          head: ['Category', 'What it does', 'Examples'],
          rows: [
            [
              '**WYSIWYG HTML editors**',
              'Visual tools for designing pages without writing code. WYSIWYG = *What You See Is What You Get*.',
              'Google Web Designer, Adobe Dreamweaver',
            ],
            [
              '**Source-code editors**',
              'Software for directly editing HTML or markup by hand.',
              'Visual Studio Code, Sublime Text, Atom, Notepad++',
            ],
            [
              '**Converters**',
              'Software for converting other formats to web content — the "Save as HTML" feature in office suites.',
              'MS Word, Markdown-to-HTML tools, HTTrack Website Copier',
            ],
            [
              '**Integrated development environments**',
              'Comprehensive platforms for web application development.',
              'Eclipse for Web Developers, NetBeans',
            ],
            [
              '**Template and wizard generators**',
              'Software that generates web content from templates, scripts, command-line input or wizard-type processes.',
              'Static site generators, site wizards',
            ],
            [
              '**Content management systems**',
              'Software for generating and managing entire websites, including courseware tools and content aggregators.',
              'WordPress, Drupal, Joomla, Tilda',
            ],
            [
              '**Email clients**',
              'Applications that send messages formatted in web content technologies.',
              'Postbox, Campaign Monitor',
            ],
            [
              '**Multimedia authoring tools**',
              'Software for creating the audio, video and animated content a page embeds.',
              'Adobe Animate, Unity WebGL Export',
            ],
            [
              '**Debugging tools**',
              'Applications for testing and fixing web content.',
              'Visual Studio Debugger, Lighthouse, Charles Proxy',
            ],
            [
              '**Mobile web application software**',
              'Tools for building web applications aimed at phones and tablets.',
              'Ionic Framework',
            ],
            [
              '**Scripting libraries**',
              'Reusable resources for building web functionality.',
              'jQuery, and the many JavaScript libraries after it',
            ],
            [
              '**Frameworks and SDKs**',
              'Web application frameworks, IDEs and software development kits.',
              'Laravel, React, Angular',
            ],
          ],
        },
        {
          b: 'note',
          tone: 'exam',
          title: 'What WYSIWYG stands for',
          text: '**What You See Is What You Get** — the screen shows the page as it will appear, rather than showing you code. Being asked to expand the abbreviation is a standard one-mark question.',
        },

        { b: 'h2', text: 'Popular tools' },
        {
          b: 'ul',
          items: [
            '**WordPress**, with a visual page builder — by far the most widely used CMS.',
            '**Google Web Designer** — a WYSIWYG editor aimed at interactive content and advertising.',
            '**Traditional code editors** such as VS Code and Sublime Text — still what most professionals use.',
            '**Wix** and **Squarespace** — hosted builders that combine the tool and the hosting.',
          ],
        },

        { b: 'h2', text: 'Choosing one' },
        {
          b: 'p',
          text: 'Match the tool to the situation rather than to fashion. Three questions decide it.',
        },
        {
          b: 'steps',
          items: [
            {
              title: 'Who will maintain it?',
              text: 'If the answer is a school clerk rather than a developer, a CMS is the right choice — content can be updated without touching code.',
            },
            {
              title: 'How unusual are the requirements?',
              text: 'A standard brochure site fits a template comfortably. Anything with unusual behaviour will fight the tool, and hand-coding becomes faster.',
            },
            {
              title: 'How much does performance matter?',
              text: 'Generated code carries weight the page does not need. Where load time is critical — Module 8 lists it as a performance factor — hand-written code wins.',
            },
          ],
        },

        {
          b: 'quiz',
          questions: [
            {
              kind: 'fill',
              q: 'What does WYSIWYG stand for? Write it in full.',
              accept: [
                'what you see is what you get',
                'what-you-see-is-what-you-get',
              ],
              why: 'What You See Is What You Get — the editor shows the finished appearance rather than the code.',
              placeholder: 'seven words',
            },
            {
              kind: 'match',
              q: 'Match each tool to its category.',
              pairs: [
                { left: 'WordPress', right: 'Content management system' },
                { left: 'Visual Studio Code', right: 'Source-code editor' },
                { left: 'Lighthouse', right: 'Debugging tool' },
                { left: 'Adobe Animate', right: 'Multimedia authoring tool' },
              ],
              why: 'The category is decided by what the tool is *for*, not by who makes it.',
            },
            {
              kind: 'mcq',
              q: 'A small hotel needs a website its receptionist can update weekly with no technical help. Which category fits best?',
              options: [
                'A source-code editor',
                'A content management system',
                'A debugging tool',
                'A scripting library',
              ],
              answer: 1,
              why: 'A CMS separates content from code, so a non-technical person can publish updates safely.',
            },
            {
              kind: 'multi',
              q: 'Which of these are listed as categories of authoring tool in the syllabus?',
              options: [
                'Email clients that send messages in web content technologies',
                'Web browsers',
                'Multimedia authoring tools',
                'Scripting libraries',
                'Search engines',
              ],
              answers: [0, 2, 3],
              why: 'Browsers and search engines *consume* web content; they do not author it.',
            },
          ],
        },

        {
          b: 'recap',
          items: [
            'WYSIWYG editors, source-code editors, converters, IDEs, generators, CMSs, email clients, multimedia tools, debugging tools, mobile web tools, scripting libraries, frameworks and SDKs.',
            'WYSIWYG = What You See Is What You Get.',
            'Choose by who maintains the site, how unusual it is, and how much performance matters.',
          ],
        },
      ],
    },
  ],
}

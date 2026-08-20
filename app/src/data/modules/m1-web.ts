import type { Module } from '../../types/content'

export const m1: Module = {
  id: 'm1',
  slug: 'the-web',
  competency: '10.1',
  index: 1,
  title: 'The Web and the WWW',
  promise: 'Explain what the Web is, how a page travels from a server to your screen, and read any URL with confidence.',
  blurb:
    'Before you write a single tag, get the map straight: what the Internet is, what the World Wide Web adds on top of it, and what actually happens in the two seconds after you press Enter.',
  lang: 'text',
  lessons: [
    // ── 1.1 ────────────────────────────────────────────────────
    {
      id: 'm1l1',
      slug: 'internet-and-networks',
      title: 'Networks and the Internet',
      summary:
        'A network is devices sharing data. The Internet is the biggest one there is — and nobody owns it.',
      minutes: 12,
      outcomes: ['Describes a computer network', 'Describes the Internet and how it is organised'],
      blocks: [
        {
          b: 'lead',
          text: 'Everything in this course sits on top of one simple idea: **two computers that can send each other data**. Get that idea firmly in place and the rest of Competency 10 stops feeling like vocabulary and starts feeling like plumbing you can see.',
        },

        { b: 'h2', text: 'What a network is' },
        {
          b: 'p',
          text: 'A **network** is a group of connected devices that share data and resources. That is the whole definition. Two laptops sharing a printer in the school lab is a network. So is a bank with branches in every district.',
        },
        {
          b: 'p',
          text: 'Devices connect using **communication media** — physical cable, or Wi-Fi through the air. Between them sit **networking devices** whose job is to pass traffic along: a *hub* (repeats everything to everyone), a *switch* (sends each message only to the device it is addressed to), and a *router* (joins one network to another).',
        },
        {
          b: 'note',
          tone: 'exam',
          title: 'Worth memorising',
          text: 'Network = **devices + communication media + networking devices**. Examiners like the three-part answer, not just "computers connected together".',
        },

        { b: 'h2', text: 'The Internet' },
        {
          b: 'p',
          text: 'The **Internet** is the worldwide network of connected computers and devices that lets people share information and communicate with each other.',
        },
        {
          b: 'p',
          text: 'Two things about it surprise people. First, it began around **1960**, decades before most of what you use on it. Second, ==it is not owned by any single person or organisation==. It is many small networks — a university here, an ISP there, an undersea cable between them — that have agreed to speak the same language and pass each other\'s traffic.',
        },
        {
          b: 'p',
          text: 'That agreement is a **protocol**: a set of rules and standards devices follow to communicate. The Internet\'s core protocols are **TCP/IP**. No committee runs the Internet; the protocols do.',
        },

        {
          b: 'note',
          tone: 'tip',
          title: 'The road analogy',
          text: 'Think of the Internet as the **road system** — tar, bridges, rules about which side to drive on. The World Wide Web is one particular kind of **traffic** on those roads. Email is another. Online games are another. Roads are not the same thing as the buses that use them.',
        },

        { b: 'h2', text: 'Who is who' },
        {
          b: 'p',
          text: 'Five words appear again and again in this chapter, and papers do ask you to distinguish them. Learn them as a cast of characters rather than as a list.',
        },
        {
          b: 'dl',
          items: [
            {
              term: 'User',
              desc: 'A person who interacts with a website or web application through a device such as a computer or smartphone.',
            },
            {
              term: 'Developer',
              desc: 'A person who writes the code that creates and structures websites, giving instructions to browsers about how to render content.',
            },
            {
              term: 'Web server',
              desc: 'A computer that stores website content and serves it to users’ browsers over the Internet. It stays on, waiting.',
            },
            {
              term: 'Web browser',
              desc: 'The software a user runs to request, view and interact with web content.',
            },
            {
              term: 'Web request',
              desc: 'A message sent by the browser to the web server, asking for one specific resource or webpage.',
            },
            {
              term: 'Web response',
              desc: 'The server’s reply — the content itself, plus HTML instructions telling the browser how to display it.',
            },
          ],
        },

        { b: 'widget', spec: { widget: 'client-server' } },

        {
          b: 'quiz',
          title: 'Check yourself',
          questions: [
            {
              kind: 'mcq',
              q: 'Which statement about the Internet is correct?',
              options: [
                'It is owned and operated by the W3C.',
                'It is made up of many smaller networks that agreed to use the same protocols.',
                'It was created in 1989 by Tim Berners-Lee.',
                'It is another name for the World Wide Web.',
              ],
              answer: 1,
              why: 'No single body owns the Internet — it is a network of networks held together by shared protocols such as TCP/IP. 1989 and Tim Berners-Lee belong to the **WWW**, not the Internet, and the W3C sets *web* standards.',
            },
            {
              kind: 'mcq',
              q: 'A message is sent to every device on the network rather than only to its destination. Which device is doing this?',
              options: ['Router', 'Switch', 'Hub', 'Web server'],
              answer: 2,
              why: 'A **hub** repeats incoming data to every port. A **switch** is the smarter version that sends data only to the intended device.',
            },
            {
              kind: 'tf',
              q: 'A protocol is a piece of hardware that joins two networks together.',
              answer: false,
              why: 'A protocol is a *set of rules and standards* for communication — it is not hardware. The device that joins two networks is a **router**.',
            },
            {
              kind: 'fill',
              q: 'Complete the definition: a network is a group of connected devices that share ______ and resources.',
              accept: ['data'],
              why: 'The standard phrasing is "share data and resources".',
              placeholder: 'one word',
            },
          ],
        },

        {
          b: 'recap',
          items: [
            'A network = connected devices + communication media + networking devices (hub, switch, router).',
            'The Internet started around 1960, is owned by nobody, and is held together by protocols such as TCP/IP.',
            'The Internet is the road; the Web is one kind of traffic on it.',
            'Server, browser, request, response — four words that describe every page you will ever load.',
          ],
        },
      ],
    },

    // ── 1.2 ────────────────────────────────────────────────────
    {
      id: 'm1l2',
      slug: 'world-wide-web',
      title: 'The World Wide Web',
      summary:
        'One researcher, one problem — sharing papers between labs — and the invention that changed how the world reads.',
      minutes: 14,
      outcomes: ['Describes www', 'Explains the features of the WWW', 'Distinguishes the WWW from the Internet'],
      blocks: [
        {
          b: 'lead',
          text: 'The World Wide Web is an **information system in which documents and other web resources are identified by URLs, may be interlinked by hypertext, and are accessible over the Internet.** That definition is worth learning word for word — but it makes far more sense once you know why it was built.',
        },

        { b: 'h2', text: 'Where it came from' },
        {
          b: 'p',
          text: 'In **1989**, at **CERN** — the European Council for Nuclear Research, in Switzerland — a British computer scientist named **Tim Berners-Lee** had a problem. Thousands of researchers were producing documents on incompatible machines, and finding the right paper meant emailing a colleague and hoping.',
        },
        {
          b: 'p',
          text: 'His project aimed to help researchers **collaborate effectively** by linking documents to one another so that finding related information became a click rather than a conversation. The **World Wide Web Consortium (W3C)** was established later to advance web development, creating the standards and guidelines that keep the web interoperable.',
        },
        {
          b: 'note',
          tone: 'history',
          title: 'Four dates that get examined',
          text: '**1960** — the Internet begins. **1989** — Berners-Lee invents the WWW at CERN. **1994** — the W3C is founded, and Håkon Wium Lie proposes CSS. **1996** — CSS1 is published.',
        },

        { b: 'h2', text: 'Hypertext: the idea that made it work' },
        {
          b: 'p',
          text: '**Hypertext** is text that contains links to other text. Any word in a hypertext document can be made a pointer to a different document, where more information about that word lives. Those pointers are **hyperlinks**.',
        },
        {
          b: 'p',
          text: 'Users move through the Web by following these interconnected links — clicking a word or phrase to reach related information on another page, or another site entirely, anywhere in the world.',
        },
        {
          b: 'lab',
          spec: {
            lab: 'html',
            title: 'Hypertext, in one line of HTML',
            html: '<p>\n  The Web was invented at\n  <a href="https://home.cern">CERN</a>,\n  a physics laboratory near Geneva.\n</p>',
            height: 130,
            note: 'That `<a>` tag is the whole idea. Change the word between the tags and the link text changes; change the `href` and the destination changes. You will meet this tag properly in Module 4.',
          },
        },

        { b: 'h2', text: 'What makes the Web special' },
        {
          b: 'ul',
          items: [
            '**It is open.** Anyone with a computer and an Internet connection can publish, at very low cost. Nobody grants permission.',
            '**It is distributed.** The system is spread across millions of separate websites; there is no central library.',
            '**It is a hypertext information system.** Documents point at one another.',
            '**It is cross-platform.** The same page works on Windows, macOS, Linux, Android and iOS.',
            '**One interface, many services.** A single browser reaches email, video, banking, government forms and school portals.',
            '**It is dynamic, interactive and still evolving.**',
            '**It works on demand.** Nothing is pushed at you — the browser asks for a page and the server sends it.',
          ],
        },
        {
          b: 'p',
          text: 'That last point is the one students skip. The Web is a **request/response** system: web servers sit switched on, doing nothing, until a client asks. The whole of Module 7 depends on understanding that the server only ever runs your PHP *because somebody asked it to*.',
        },

        { b: 'h2', text: 'What sits on top of it' },
        {
          b: 'p',
          text: 'The Web is a platform, and the applications built on it are what most people actually mean when they say "the Internet": search engines such as **Google**, mail such as **Gmail**, social media such as **Facebook**, video streaming such as **YouTube**, and photo sharing such as **Flickr**.',
        },

        { b: 'h2', text: 'WWW is not the Internet' },
        {
          b: 'p',
          text: 'This distinction is a favourite of examiners because it is easy to state and easy to get wrong.',
        },
        {
          b: 'table',
          head: ['', 'World Wide Web', 'Internet'],
          firstColHead: true,
          rows: [
            ['Started', '1989', '1960'],
            [
              'What it is',
              'An interconnected network of websites and documents accessed via the Internet',
              'A global network connecting one computer with another',
            ],
            ['Protocols', 'HTTP / HTTPS', 'TCP/IP'],
            ['Based on', 'Software', 'Hardware'],
            [
              'Relationship',
              'A **service contained inside** an infrastructure',
              'The **entire infrastructure** itself',
            ],
          ],
          caption: 'The Web is one service riding on the Internet — not a synonym for it.',
        },

        {
          b: 'quiz',
          questions: [
            {
              kind: 'mcq',
              q: 'Who invented the World Wide Web, where, and in which year?',
              options: [
                'Håkon Wium Lie, at the W3C, in 1994',
                'Tim Berners-Lee, at CERN, in 1989',
                'Rasmus Lerdorf, at CERN, in 1994',
                'Tim Berners-Lee, at the W3C, in 1960',
              ],
              answer: 1,
              why: 'Tim Berners-Lee, at CERN (the European Council for Nuclear Research), in 1989. Håkon Wium Lie proposed CSS; Rasmus Lerdorf created PHP.',
            },
            {
              kind: 'multi',
              q: 'Which of these are features of the WWW? (Choose all that apply.)',
              options: [
                'It is a distributed system',
                'It is cross-platform',
                'It is owned by the W3C',
                'It is a hypertext information system',
                'It pushes new pages to users automatically',
              ],
              answers: [0, 1, 3],
              why: 'The Web is distributed, cross-platform and hypertext-based. The W3C writes standards but owns nothing, and the Web works **on demand** — the client must request a page before anything is sent.',
            },
            {
              kind: 'match',
              q: 'Match each item to where it belongs.',
              pairs: [
                { left: 'HTTP', right: 'World Wide Web' },
                { left: 'TCP/IP', right: 'Internet' },
                { left: 'Based on software', right: 'World Wide Web' },
                { left: 'Based on hardware', right: 'Internet' },
              ],
              why: 'The Web is a software service that speaks HTTP; the Internet is the hardware infrastructure that speaks TCP/IP.',
            },
            {
              kind: 'fill',
              q: 'Text that contains links to other text is called ______.',
              accept: ['hypertext', 'hyper text'],
              why: 'Hypertext — the "HT" in both HTTP and HTML.',
              placeholder: 'one word',
            },
          ],
        },

        {
          b: 'recap',
          items: [
            'WWW: invented by Tim Berners-Lee at CERN in 1989 to help researchers collaborate.',
            'Documents are identified by URLs, interlinked by hypertext, and reached over the Internet.',
            'Open, distributed, cross-platform, hypertext-based, on-demand.',
            'The W3C sets standards. It does not own the Web.',
          ],
        },
      ],
    },

    // ── 1.3 ────────────────────────────────────────────────────
    {
      id: 'm1l3',
      slug: 'how-a-page-arrives',
      title: 'How a page reaches your screen',
      summary:
        'Clients ask, servers answer — and a single page is almost never a single file.',
      minutes: 14,
      outcomes: [
        'Analyses the systematic arrangement of contents and structure of a web',
        'Identifies the contents of a web page',
      ],
      blocks: [
        {
          b: 'lead',
          text: 'Press Enter on a web address and a great deal happens in under a second. Most of it is one pattern repeated: **ask, receive, ask again**.',
        },

        { b: 'h2', text: 'Clients and servers' },
        {
          b: 'p',
          text: 'Some computers on the Internet are set up to **serve** web pages. These are **web servers**: always-on machines, ready to hand out pages at any hour. The computers that *ask* for pages are **client computers** — your phone, the lab PC, a smart TV.',
        },
        {
          b: 'p',
          text: 'The Web operates **on demand**. Users request pages from web servers whenever they want them and receive them in reply. A server never decides on its own to send you a page.',
        },

        { b: 'widget', spec: { widget: 'request-response' } },

        { b: 'h2', text: 'A page is a bundle, not a file' },
        {
          b: 'p',
          text: 'Here is the part that trips people up. When you open a page, the browser does **not** receive one thing. It receives a **base HTML file**, reads it, discovers that the file refers to other things, and then goes back and asks for each of those too.',
        },
        {
          b: 'p',
          text: 'Those other things are called **web objects**: an image file such as a JPEG, an audio file, a video clip, a stylesheet, a Java applet. Each embedded object is referred to using its own **URL**.',
        },
        {
          b: 'note',
          tone: 'exam',
          title: 'The (n + 1) rule',
          text: 'If a web page refers to **n** other objects, the browser must fetch a total of **n + 1** objects — the *n* objects plus the base HTML file itself. This exact wording appears in past papers; be ready to compute it both ways.',
        },

        { b: 'widget', spec: { widget: 'web-objects' } },

        { b: 'h2', text: 'What can be inside a page' },
        {
          b: 'p',
          text: 'A web page can carry far more than paragraphs. The syllabus expects you to be able to list its contents:',
        },
        {
          b: 'ul',
          tight: true,
          items: [
            'Text — headings and paragraphs',
            'Images, graphics and animations',
            'Video and audio',
            'Hyperlinks to other pages',
            'Forms and buttons, for user input',
            'A navigation menu and a footer',
            'Tables and lists',
            'Icons, search bars, slideshows, chat widgets',
          ],
        },
        {
          b: 'p',
          text: 'Formatted text, multimedia, graphics, forms and applets are all part of the WWW and all reachable by client computers — and every one of them is a separate object with its own address.',
        },

        {
          b: 'quiz',
          questions: [
            {
              kind: 'mcq',
              q: 'A web page contains 3 images, 1 stylesheet and 1 video, all embedded in the base HTML file. How many objects must the browser fetch in total?',
              options: ['5', '6', '4', '1'],
              answer: 1,
              why: 'n = 5 embedded objects, so the total is **n + 1 = 6** — the five objects plus the base HTML file.',
            },
            {
              kind: 'tf',
              q: 'A web server may send a page to a client without the client asking for it.',
              answer: false,
              why: 'The WWW operates **on demand**: the client requests, the server responds. Nothing is sent unrequested.',
            },
            {
              kind: 'order',
              q: 'Put the steps of loading a page in the right order.',
              items: [
                'The user types an address and presses Enter',
                'The browser sends a request to the web server',
                'The server sends back the base HTML file',
                'The browser reads the HTML and finds embedded objects',
                'The browser requests each embedded object',
                'The browser renders the finished page',
              ],
              why: 'The base HTML always arrives first, because until the browser has read it, it does not know which other objects exist.',
            },
            {
              kind: 'fill',
              q: 'The always-on computers that store and deliver web pages are called web ______.',
              accept: ['servers', 'server'],
              why: 'Web servers. The machines that ask for pages are clients.',
              placeholder: 'one word',
            },
          ],
        },

        {
          b: 'recap',
          items: [
            'Servers wait; clients ask. Nothing moves until a request is made.',
            'A page = 1 base HTML file + n embedded objects = n + 1 objects in total.',
            'Every embedded object is referenced by its own URL.',
          ],
        },
      ],
    },

    // ── 1.4 ────────────────────────────────────────────────────
    {
      id: 'm1l4',
      slug: 'reading-a-url',
      title: 'Reading a URL',
      summary: 'Three parts, one line — protocol, domain name, path. Learn to see them separately.',
      minutes: 10,
      outcomes: ['Describes the components of a URL', 'Explains how a resource is addressed on the web'],
      blocks: [
        {
          b: 'lead',
          text: 'A **URL — Uniform Resource Locator** — is the address of a web page on the Internet. It is what lets a browser find and open a particular resource among billions. Every embedded object on a page has one too.',
        },

        { b: 'widget', spec: { widget: 'url-anatomy' } },

        { b: 'h2', text: 'The three parts' },
        {
          b: 'dl',
          items: [
            {
              term: 'Protocol',
              desc: 'Such as `https:` — the set of rules and standards devices follow to communicate over a network. It tells the browser **how** to talk to the site’s server in order to send and retrieve information.',
            },
            {
              term: 'Domain name',
              desc: 'Such as `www.nie.lk` — a unique, human-readable name identifying a website. It is used instead of a numerical IP address, which is what the machines actually use.',
            },
            {
              term: 'Path',
              desc: 'Such as `/index.htm` — it directs the browser to a **specific page or location** within the website.',
            },
          ],
        },

        {
          b: 'code',
          lang: 'text',
          code: 'https://www.nie.lk/curriculum/ict.html\n└─┬─┘   └────┬────┘ └───────┬───────┘\nprotocol  domain name        path',
          caption: 'The same three parts, whatever the site.',
        },

        {
          b: 'note',
          tone: 'note',
          title: 'Why domain names exist',
          text: 'Servers are found by **IP address** — a number. Domain names are the human-readable stand-in, so you can type `nie.lk` instead of memorising digits. Translating one to the other is the job of the **DNS**, which you will meet again in Module 8.',
        },

        { b: 'h2', text: 'Where you will use this' },
        {
          b: 'p',
          text: 'You will write URLs constantly from Module 4 onwards — inside `href` for links, inside `src` for images and video. Sometimes you will write the whole thing (an **absolute URL**, for another site) and sometimes just the last part (a **relative URL**, for a file in your own folder). Both are addresses; they differ only in how much of the address you have to spell out.',
        },
        {
          b: 'lab',
          spec: {
            lab: 'html',
            title: 'Absolute and relative, side by side',
            html: '<p>\n  <a href="https://www.nie.lk">An absolute URL — the whole address</a>\n</p>\n\n<p>\n  <a href="contact.html">A relative URL — same folder as this page</a>\n</p>',
            height: 150,
            note: 'The second link will not go anywhere here, because `contact.html` does not exist in this preview — which is itself a useful thing to see happen.',
          },
        },

        {
          b: 'quiz',
          questions: [
            {
              kind: 'mcq',
              q: 'In `https://www.school.lk/students/grade13.html`, which part is the path?',
              options: ['https://', 'www.school.lk', '/students/grade13.html', 'school.lk'],
              answer: 2,
              why: 'The path is everything that locates a page *inside* the site: `/students/grade13.html`.',
            },
            {
              kind: 'mcq',
              q: 'What does the protocol part of a URL tell the browser?',
              options: [
                'Which page to open',
                'The rules to follow when communicating with the server',
                'The IP address of the server',
                'Which company owns the site',
              ],
              answer: 1,
              why: 'The protocol is the agreed set of rules for sending and retrieving information — HTTP or HTTPS for the Web.',
            },
            {
              kind: 'fill',
              q: 'URL stands for Uniform Resource ______.',
              accept: ['locator'],
              why: 'Uniform Resource **Locator** — it locates a resource.',
              placeholder: 'one word',
            },
            {
              kind: 'tf',
              q: 'Only the base HTML file of a page has a URL; embedded images do not.',
              answer: false,
              why: 'Every embedded object is referred to **using its URL** — that is exactly how the browser knows where to go and fetch it.',
            },
          ],
        },

        {
          b: 'recap',
          items: [
            'URL = Uniform Resource Locator: protocol + domain name + path.',
            'The protocol says how to talk; the domain name says which server; the path says which page.',
            'Domain names are the readable stand-in for IP addresses.',
          ],
        },
      ],
    },

    // ── 1.5 ────────────────────────────────────────────────────
    {
      id: 'm1l5',
      slug: 'browsers-and-websites',
      title: 'Browsers, search engines and kinds of website',
      summary:
        'The software that turns your tags into a page — and the seven categories of site the syllabus asks you to name.',
      minutes: 12,
      outcomes: [
        'Identifies web browsers and their role',
        'Classifies websites by purpose',
        'Explains why HTML should be tested in several browsers',
      ],
      blocks: [
        {
          b: 'lead',
          text: 'A browser is the only piece of software that ever reads your HTML in anger. It is worth knowing what it does with it — and why two browsers can disagree about the same file.',
        },

        { b: 'h2', text: 'What a browser does' },
        {
          b: 'p',
          text: 'A **web browser** is a software application used to access, view and navigate websites on the Internet. It retrieves web pages from web servers and displays them. **Google Chrome**, **Mozilla Firefox**, **Microsoft Edge**, **Safari** and **Opera** are the common ones.',
        },
        {
          b: 'p',
          text: 'Web pages are written in **HTML**. The **markup facility** of HTML lets the browser take plain text combined with tags and *render* it as readable, visually attractive content. **HTML tags** are symbols that define the visual elements of a page — a heading, for instance — and control properties such as size and colour.',
        },
        {
          b: 'note',
          tone: 'warn',
          title: 'Browsers disagree — quietly',
          text: 'Each browser can render the same HTML **slightly differently**. Default margins, form controls and font sizes all vary. That is why the syllabus says HTML code should be tested in each browser to ensure completeness and consistency — and why professionals still do exactly that.',
        },

        { b: 'h2', text: 'Search engines' },
        {
          b: 'p',
          text: 'A **search engine** helps users find websites and information by scanning and storing content from the web, then returning results based on keywords. **Google**, **Bing**, **Yahoo**, **DuckDuckGo** and **Ecosia** are examples.',
        },
        {
          b: 'p',
          text: 'The programs that do the scanning are **web crawlers**. They read your headings to work out what a page is about — which is why heading tags matter for more than looks. You will meet that again in Module 3.',
        },

        { b: 'h2', text: 'The seven kinds of website' },
        {
          b: 'p',
          text: 'Websites are grouped by **purpose**. Learn one example for each; a question asking you to "give an example" is free marks.',
        },
        {
          b: 'table',
          head: ['Type', 'Purpose', 'Examples'],
          rows: [
            ['News and information', 'Updates on current events, trends and general knowledge for a wide audience', 'BBC, CNN, New York Times'],
            ['Personal', 'Individuals sharing personal information, blogs, portfolios or opinions', 'WordPress blogs, Medium'],
            ['Educational', 'Learning materials, courses, tutorials and academic resources', 'Khan Academy, Coursera, university sites'],
            ['Business', 'Promoting products or services and providing company information', 'Microsoft, Apple'],
            ['Research', 'Sharing academic studies, research papers and scientific findings', 'ResearchGate, PubMed'],
            ['Entertainment', 'Movies, music, games and other entertainment content', 'YouTube, Netflix, Spotify'],
            ['E-commerce', 'Allowing users to buy and sell products or services online', 'Amazon, Daraz, eBay'],
          ],
        },
        {
          b: 'note',
          tone: 'tip',
          text: 'The category is decided by **why the site exists**, not by what it contains. YouTube shows educational videos, but its purpose is entertainment and sharing — so it is filed under entertainment.',
        },

        { b: 'h2', text: 'The tools you will write with' },
        {
          b: 'p',
          text: 'HTML is plain text, so almost anything can produce it. The syllabus distinguishes three kinds of **editing software**:',
        },
        {
          b: 'dl',
          items: [
            {
              term: 'Text editors',
              desc: 'Simple programs for creating and editing plain text files: **Notepad**, TextEdit, Gedit, Nano. Enough for learning, and what the syllabus assumes.',
            },
            {
              term: 'Code editors',
              desc: 'Specialised text editors built for writing code, with syntax highlighting and auto-completion: **Visual Studio Code**, Sublime Text, Atom, Notepad++, Brackets, Vim.',
            },
            {
              term: 'Word processors',
              desc: 'MS Word, Google Docs, LibreOffice. Designed to produce formatted, printable documents — they ==do not offer the features needed for efficient coding== and add hidden formatting that breaks HTML.',
            },
          ],
        },
        {
          b: 'p',
          text: 'The **viewing software** is the browser. Write in one, view in the other — that is the entire workflow, and it is the workflow this platform gives you on a single screen.',
        },

        {
          b: 'quiz',
          questions: [
            {
              kind: 'mcq',
              q: 'Why does the syllabus warn against using a word processor to write HTML?',
              options: [
                'Word processors cannot save files.',
                'They do not offer the features needed for efficient coding.',
                'Browsers cannot open files made by word processors.',
                'HTML must be written in uppercase, which word processors prevent.',
              ],
              answer: 1,
              why: 'Word processors are built to produce formatted printable documents, not code — they lack syntax highlighting, and their formatting gets in the way.',
            },
            {
              kind: 'mcq',
              q: 'Daraz.lk, where you buy and sell goods, is best classified as which type of website?',
              options: ['Business', 'E-commerce', 'Entertainment', 'Information'],
              answer: 1,
              why: 'A site whose purpose is buying and selling is **e-commerce**. A business site promotes a company and its products but does not necessarily sell through the site.',
            },
            {
              kind: 'multi',
              q: 'Which of these are web browsers?',
              options: ['Safari', 'Ecosia', 'Opera', 'Sublime Text', 'Microsoft Edge'],
              answers: [0, 2, 4],
              why: 'Ecosia is a search *engine*; Sublime Text is a code *editor*. Safari, Opera and Edge are browsers.',
            },
            {
              kind: 'tf',
              q: 'The same HTML file will always look pixel-identical in every browser.',
              answer: false,
              why: 'Each browser renders HTML slightly differently — which is exactly why you test your pages in more than one.',
            },
          ],
        },

        {
          b: 'recap',
          items: [
            'A browser requests, retrieves and renders pages; each one renders slightly differently, so test in several.',
            'A search engine scans and stores web content, then answers keyword queries. Crawlers read your headings.',
            'Seven site types: news, personal, educational, business, research, entertainment, e-commerce.',
            'Write with a text or code editor — never a word processor.',
          ],
        },
      ],
    },
  ],
}

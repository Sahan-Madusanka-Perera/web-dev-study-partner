import type { Module } from '../../types/content'

export const m8: Module = {
  id: 'm8',
  slug: 'publishing',
  competency: '10.8',
  index: 8,
  title: 'Publishing and Maintaining',
  promise:
    'Test a site locally, choose and buy hosting, upload it so the world can reach it, and keep it fast, current and backed up afterwards.',
  blurb:
    'A website nobody can reach is a folder. Three lessons cover local publishing, real hosting and the maintenance and performance work that starts the day a site goes live.',
  lang: 'text',
  lessons: [
    // ── 8.1 ────────────────────────────────────────────────────
    {
      id: 'm8l1',
      slug: 'local-publishing',
      title: 'Publishing locally',
      summary:
        'Test on your own machine first — and understand what it would take to serve the site from it.',
      minutes: 12,
      outcomes: ['Publishes the developed website locally'],
      blocks: [
        {
          b: 'lead',
          text: '**Local publishing** is the process of creating and viewing a website on your own computer before making it available on the internet. Web developers build and test locally, and only then upload.',
        },

        { b: 'h2', text: 'Using a local server' },
        {
          b: 'p',
          text: 'It usually requires software such as **XAMPP**, **WAMP** or **MAMP**, which **simulate a real web server on your computer**. Websites served this way can only be viewed on that computer and are not accessible to other users.',
        },
        {
          b: 'steps',
          items: [
            { title: 'Download and install a local server package', text: 'XAMPP is the usual choice, because it runs on Windows, macOS and Linux.' },
            { title: 'Start the server', text: 'Open the control panel and start **Apache** — and **MySQL** too, if the site uses a database.' },
            {
              title: 'Create a project folder',
              text: 'Go to the XAMPP installation folder, open **htdocs**, and create a new folder for your website.',
              code: 'C:\\xampp\\htdocs\\mywebsite\\',
              lang: 'text',
            },
            { title: 'Add your website files to that folder', text: 'All the HTML, CSS, images and PHP files go here, keeping the folder structure you designed in Module 4.' },
            {
              title: 'Open it in a browser',
              text: 'Type the localhost address. Your website should appear.',
              code: 'http://localhost/mywebsite',
              lang: 'text',
            },
            {
              title: 'Test it',
              text: 'Check the design, check every link, check every form, and look for anything that could be faster.',
            },
          ],
        },
        {
          b: 'note',
          tone: 'exam',
          title: 'index.html or index.php',
          text: 'Name your home page `index.html` or `index.php`. A web server looks for those automatically when a visitor asks for a **folder** rather than a file, so `http://localhost/mywebsite` finds it without the filename. Call it `home.html` and the visitor gets a directory listing or an error.',
        },
        {
          b: 'p',
          text: 'Local publishing is where you catch the mistakes that are embarrassing in public: the image with an absolute `C:\\` path that only works on your machine, the link to a page you renamed, the form that posts to a script you never wrote.',
        },
        {
          b: 'note',
          tone: 'tip',
          title: 'The absolute-path trap, one more time',
          text: 'A page with `<img src="C:\\Users\\me\\photo.jpg">` looks perfect locally and shows a broken image to everyone else. Local testing only catches this if you test through `http://localhost/…` rather than by double-clicking the file.',
        },

        { b: 'h2', text: 'Serving the site from your own computer' },
        {
          b: 'p',
          text: 'The syllabus also describes publishing a site **from your own machine to the internet**. It is possible, and it involves a great deal from the user’s side.',
        },
        {
          b: 'ol',
          items: [
            'Your organisation needs a **good internet connection**.',
            'You must obtain a **static IP address** from your ISP, so the address does not change.',
            'Your **router must be set** to forward traffic to **port 80**.',
            '**Windows Firewall** must be configured to allow your web server to communicate on port 80.',
            'Set up the **Apache** web server on your machine.',
            'Test the web server from your own computer.',
            'Once everything works, replace the server’s default home page with the home page you designed.',
          ],
        },
        {
          b: 'compare',
          left: {
            title: 'Hosting it yourself',
            items: [
              'Complete control over the server',
              'No monthly hosting fee',
              'The machine must stay on, always',
              'You handle security, backups and updates',
              'A power cut takes your site offline',
            ],
          },
          right: {
            title: 'Using a hosting company',
            items: [
              'Uptime and connectivity are somebody else’s problem',
              'Professional security and regular backups',
              'A monthly or yearly cost',
              'Less control over the server configuration',
              'Support to call when something breaks',
            ],
          },
        },
        {
          b: 'p',
          text: 'Getting help from a hosting company **relieves you of the hassle** of maintaining web servers, ensuring uninterrupted connectivity, and keeping the website secure. For almost every real site, that is the right trade.',
        },

        {
          b: 'quiz',
          questions: [
            {
              kind: 'mcq',
              q: 'Which folder do you place your project in when using XAMPP?',
              options: ['www', 'htdocs', 'public_html', 'localhost'],
              answer: 1,
              why: '`htdocs` for XAMPP; `www` for WAMP; `public_html` is what you will meet on a **hosting** account in the next lesson.',
            },
            {
              kind: 'mcq',
              q: 'Why must you obtain a **static** IP address to serve a site from your own machine?',
              options: [
                'Static IP addresses are faster',
                'So the address does not change, and the domain name keeps pointing at the right machine',
                'Because Apache requires one',
                'To reduce the electricity bill',
              ],
              answer: 1,
              why: 'A dynamic IP changes periodically. Every time it did, the domain name would point at nothing.',
            },
            {
              kind: 'multi',
              q: 'What is required to publish a website from your own computer?',
              options: [
                'A static IP address from the ISP',
                'Port 80 forwarding on the router',
                'A firewall configured to allow the web server',
                'A domain registered with GoDaddy',
                'Apache installed and running',
              ],
              answers: [0, 1, 2, 4],
              why: 'A domain name is useful, but the four technical prerequisites are the static IP, port forwarding, the firewall rule and the web server itself.',
            },
            {
              kind: 'tf',
              q: 'A website published locally with XAMPP can be visited by anyone on the internet.',
              answer: false,
              why: 'It can only be viewed on that computer. Making it public requires the static IP, port forwarding and firewall work — or a hosting company.',
            },
          ],
        },

        {
          b: 'recap',
          items: [
            'Local publishing means building and testing on your own machine before uploading.',
            'XAMPP/WAMP/MAMP simulate a real server; files go in `htdocs` or `www`, viewed at `http://localhost/…`.',
            'Name the home page `index.html` or `index.php`.',
            'Serving from your own machine needs a static IP, port 80 forwarding, a firewall rule and Apache.',
          ],
        },
      ],
    },

    // ── 8.2 ────────────────────────────────────────────────────
    {
      id: 'm8l2',
      slug: 'web-hosting',
      title: 'Web hosting and going live',
      summary:
        'What hosting actually provides, the four kinds you can buy, and the ten steps from folder to live website.',
      minutes: 16,
      outcomes: [
        'Identifies free web hosting sites from the Internet',
        'Publishes the developed website through a free web hosting site',
      ],
      blocks: [
        {
          b: 'lead',
          text: '**Web hosting** is a service that provides the infrastructure to store, manage and deliver a website’s data over the internet, making the website accessible to users via a web browser.',
        },

        { b: 'h2', text: 'The five core components' },
        {
          b: 'dl',
          items: [
            { term: 'Website', desc: 'The collection of web pages and resources that users see in their browser.' },
            { term: 'Web server', desc: 'A computer, and its software, that stores the website and delivers it to users.' },
            { term: 'Hosting provider', desc: 'The company that maintains web servers and rents space on them.' },
            { term: 'Domain name', desc: 'A human-readable address that maps to a server’s IP address.' },
            {
              term: '24/7 power and uninterrupted connectivity',
              desc: 'Ensures websites remain accessible, stable and consistently available to users at all times.',
            },
          ],
        },

        { b: 'h2', text: 'What happens when somebody visits' },
        { b: 'widget', spec: { widget: 'hosting-flow' } },

        { b: 'h2', text: 'The resources you are buying' },
        {
          b: 'p',
          text: 'A hosting plan is a bundle of **system resources** provided to store, manage and deliver a website efficiently. Four of them decide what a plan costs.',
        },
        {
          b: 'keyvals',
          items: [
            {
              k: 'Disk space',
              v: 'Used to store website files — pages, images, video, databases. The amount required depends on the size of the website.',
            },
            {
              k: 'Bandwidth',
              v: 'The amount of data transferred between the server and users. Higher bandwidth lets more visitors reach the site without performance problems.',
            },
            { k: 'CPU', v: 'Processing power to handle requests. Adequate CPU improves website speed and performance.' },
            {
              k: 'RAM',
              v: 'Helps the server manage active processes and multiple users at the same time. More RAM supports smoother performance during high traffic.',
            },
          ],
        },

        { b: 'h2', text: 'The four types of hosting' },
        {
          b: 'table',
          head: ['Type', 'How it works', 'Trade-off'],
          rows: [
            [
              '**Shared hosting**',
              'Multiple websites share a single server and its resources.',
              'Low cost, but limited performance and resources — a busy neighbour slows you down.',
            ],
            [
              '**VPS hosting**',
              'A server is divided into **virtual private servers**, each with its own guaranteed slice.',
              'Better performance and control than shared, at a higher price.',
            ],
            [
              '**Dedicated hosting**',
              'A single website uses an **entire physical server**.',
              'High performance, maximum control and improved security — and the highest cost.',
            ],
            [
              '**Cloud hosting**',
              'Websites are distributed **across multiple servers**.',
              'Reliability and high availability; you can scale up on demand and pay for what you use.',
            ],
          ],
        },
        {
          b: 'note',
          tone: 'exam',
          title: 'Choosing in an exam answer',
          text: 'Match the type to the **scale and budget** in the scenario. A school notice board or a small shop → **shared**. A growing business site → **VPS**. A bank or a national exam results site → **dedicated** or **cloud**. Say *why*, not just *which*.',
        },

        { b: 'h2', text: 'Advantages of using a hosting service' },
        {
          b: 'ul',
          items: [
            '**Accessibility** — the website is available 24/7 from anywhere in the world.',
            '**Reliability** — providers ensure stable servers and high uptime, reducing downtime.',
            '**Resources** — the disk space, CPU and RAM needed to store and run websites efficiently.',
            '**Security** — providers include security measures and protection.',
            '**Technical support** — somebody to resolve server and website issues.',
            '**Scalability** — resources can be increased easily as traffic grows.',
            '**Backups** — regular backups protect data and enable recovery after a failure.',
            '**Maintenance** — the provider handles server maintenance, updates and security, reducing your technical workload.',
          ],
        },

        { b: 'h2', text: 'Static versus dynamic hosting' },
        {
          b: 'table',
          head: ['Feature', 'Static hosting', 'Dynamic hosting'],
          firstColHead: true,
          rows: [
            ['Website content', 'Fixed content that does not change automatically', 'Content changes based on user input or data'],
            ['Technologies', 'HTML, CSS, basic JavaScript', 'PHP, Python, Node.js, ASP.NET'],
            ['Databases', 'Does not use databases', 'Uses databases such as MySQL'],
            ['Performance', 'Very fast — simple file delivery', 'Slightly slower, because of processing'],
            ['Security', 'More secure — fewer moving parts', 'Requires stronger security'],
            ['Cost', 'Low', 'Higher, because of resource usage'],
            ['Maintenance', 'Easy to maintain', 'Requires regular updates and maintenance'],
            ['Scalability', 'Limited functionality', 'Highly scalable and flexible'],
            ['Typical use', 'Portfolio websites, landing pages', 'Shops, portals, information systems'],
          ],
        },

        { b: 'h2', text: 'Publishing to the internet' },
        {
          b: 'p',
          text: 'Ten steps take a tested folder on your machine to a live website. **GoDaddy** is a popular hosting provider, and there are many others — including free tiers suitable for a student project.',
        },
        {
          b: 'ol',
          items: [
            '**Create and fully test your website** on your computer, making sure all pages, links, images and forms work properly.',
            '**Register a domain name** that people will use to reach your website.',
            '**Purchase a web hosting plan** from a reliable provider to store your files.',
            '**Log in to your hosting account** and open the control panel — usually **cPanel** or a similar dashboard.',
            'Click **File Manager** to manage your files.',
            'Locate and open the **`public_html`** folder — the main folder from which your website is served.',
            '**Upload all your website files** — HTML, CSS, JavaScript, images — into it.',
            'Ensure your homepage file is named **`index.html`** or **`index.php`**, so it loads automatically when someone visits your domain.',
            'If your website requires a database, **create the database** in the control panel, **import your database file**, and **update your configuration file** with the correct credentials.',
            '**Type your domain name into a browser** to check that the site is live and working.',
          ],
        },
        {
          b: 'note',
          tone: 'warn',
          title: 'Step 9 is where projects break',
          text: 'Your local PHP connects as `root` with **no password**. Your host will give you a different database name, username and password. Every `new mysqli(...)` line must be updated, or the live site shows "Connection failed" on every page. Keep those credentials in **one file** that the others include, so there is one place to change.',
        },
        {
          b: 'note',
          tone: 'tip',
          title: 'Free hosting for a school project',
          text: 'Providers such as InfinityFree, 000webhost and GitHub Pages cost nothing. GitHub Pages serves **static** sites only — perfect for Modules 3 to 5, useless for Module 7, because it will not run PHP. Read what a free plan actually supports before you commit your project to it.',
        },

        {
          b: 'quiz',
          questions: [
            {
              kind: 'mcq',
              q: 'Which folder do you upload your website into on a typical cPanel hosting account?',
              options: ['htdocs', 'www', 'public_html', 'wwwroot'],
              answer: 2,
              why: '`public_html` on hosting; `htdocs` in XAMPP; `www` in WAMP. Three names for the same idea — the document root.',
            },
            {
              kind: 'mcq',
              q: 'A busy neighbouring site slows yours down. Which hosting type are you almost certainly on?',
              options: ['Dedicated', 'Cloud', 'Shared', 'VPS'],
              answer: 2,
              why: 'Shared hosting means multiple websites share one server **and its resources**. That is the cost of the low price.',
            },
            {
              kind: 'mcq',
              q: 'What is bandwidth, in a hosting plan?',
              options: [
                'The storage space for files',
                'The amount of data transferred between the server and users',
                'The processing power of the server',
                'The number of domain names allowed',
              ],
              answer: 1,
              why: 'Bandwidth is transfer. Storage is disk space; processing power is CPU.',
            },
            {
              kind: 'order',
              q: 'Put the publishing steps into order.',
              items: [
                'Create and fully test the website locally',
                'Register a domain name',
                'Purchase a hosting plan',
                'Open the control panel and the File Manager',
                'Upload the files into public_html',
                'Type the domain name into a browser to check it is live',
              ],
              why: 'Test first — uploading a broken site simply makes it broken in public.',
            },
            {
              kind: 'mcq',
              q: 'Why can a GitHub Pages account not host your Module 7 project?',
              options: [
                'It has no disk space',
                'It serves static files only and will not run PHP',
                'It does not allow HTML',
                'It requires a paid domain',
              ],
              answer: 1,
              why: 'Static hosting delivers files as they are. PHP needs an interpreter on the server, which static hosting does not provide.',
            },
          ],
        },

        {
          b: 'recap',
          items: [
            'Hosting = website + web server + provider + domain name + 24/7 power and connectivity.',
            'Resources: disk space, bandwidth, CPU, RAM.',
            'Types: shared (cheap, limited) · VPS (partitioned) · dedicated (whole server) · cloud (distributed).',
            'Upload into `public_html`, name the home page `index.html`/`index.php`, then fix the database credentials.',
            'Static hosting cannot run PHP.',
          ],
        },
      ],
    },

    // ── 8.3 ────────────────────────────────────────────────────
    {
      id: 'm8l3',
      slug: 'maintenance-and-performance',
      title: 'Maintenance and performance',
      summary:
        'A website is not finished when it launches — and fourteen things decide how fast it feels.',
      minutes: 14,
      outcomes: [
        'Investigates factors affecting performance of website',
        'Publishes and maintains web sites',
      ],
      blocks: [
        {
          b: 'lead',
          text: 'Websites **must be maintained regularly** if you want yours to be a successful one. Launch day is the beginning of the work, not the end of it.',
        },

        { b: 'h2', text: 'Why maintenance matters' },
        {
          b: 'ul',
          items: [
            '**Visitors return** when a site gives them updated, fresh information rather than last year’s notices.',
            '**Parts of the site stay working** — regular attention keeps links and pages unbroken.',
            '**Backups** ensure you always have the latest copy, so you cannot lose the site.',
            '**Security** — regular maintenance keeps the site from being hacked, and visitors do not return to sites that have been.',
            '**Software updates** — the software used to create a website is regularly updated to fix bugs and add security measures. When a release is available, update.',
            '**Statistics** — collecting site statistics tells you how many potential visitors you have and how popular the site is.',
          ],
        },
        {
          b: 'note',
          tone: 'tip',
          title: 'A maintenance routine worth writing down',
          text: '**Weekly**: publish new content, check the newest pages. **Monthly**: click every link, take a backup, read the statistics. **Each term**: update the software, review the security, remove anything out of date. A schedule that exists is worth more than good intentions.',
        },

        { b: 'h2', text: 'Factors affecting website performance' },
        {
          b: 'p',
          text: 'The syllabus lists fourteen factors. They group naturally into three families, which makes them far easier to recall under exam pressure: things about the **server**, things about the **site itself**, and things about the **connection**.',
        },

        { b: 'h3', text: 'The server' },
        {
          b: 'keyvals',
          items: [
            { k: 'Web hosting quality', v: 'Poor or shared hosting servers can reduce speed and reliability.' },
            { k: 'Server speed — CPU and RAM', v: 'Low processing power makes the server respond slowly.' },
            { k: 'Server response time', v: 'The time taken for the server to respond to a request from a browser.' },
            { k: 'Server location', v: 'Servers located far from users increase loading time.' },
            { k: 'Traffic volume', v: 'A high number of visitors at the same time can overload the server.' },
            { k: 'Database queries', v: 'Slow or poorly structured queries delay dynamic pages.' },
          ],
        },

        { b: 'h3', text: 'The site itself' },
        {
          b: 'keyvals',
          items: [
            { k: 'Website file size', v: 'Large images, videos and heavy graphics increase load time.' },
            { k: 'Number of HTTP requests', v: 'More scripts, images and stylesheets mean more requests, which slows loading. Remember the **n + 1** rule from Module 1.' },
            { k: 'Unoptimised images', v: 'Images that are not compressed properly reduce performance.' },
            { k: 'Poor coding practices', v: 'Inefficient HTML, CSS or JavaScript can slow the website down.' },
            { k: 'Too many plugins or external scripts', v: 'Excessive plugins, especially in CMS platforms, affect speed.' },
            { k: 'Lack of caching', v: 'Without caching, data reloads completely every time a user visits.' },
          ],
        },

        { b: 'h3', text: 'The connection' },
        {
          b: 'keyvals',
          items: [
            { k: 'Bandwidth', v: 'The amount of data that can be transferred at one time. Low bandwidth slows downloading, especially with many users.' },
            { k: 'Network latency', v: 'Delay caused by the long physical distance between the server and the user.' },
            { k: 'User’s internet speed', v: 'A slow connection affects how quickly the site loads, whatever you do at your end.' },
          ],
        },
        {
          b: 'note',
          tone: 'exam',
          title: 'Answering a performance question well',
          text: 'A question asking why a site is slow wants **more than one family**. Name a server factor, a site factor and a connection factor, and say what you would do about each. "The images are too big" alone is one mark; "the images are unoptimised, the hosting is shared, and users in the north face high latency" is a full answer.',
        },

        { b: 'h2', text: 'What you can actually change' },
        {
          b: 'compare',
          left: {
            title: 'In your control',
            items: [
              'Compress images before uploading them',
              'Combine or remove unnecessary files to cut HTTP requests',
              'Write efficient HTML, CSS and SQL',
              'Remove plugins you are not using',
              'Turn on caching',
              'Choose a better hosting plan',
            ],
          },
          right: {
            title: 'Outside your control',
            items: [
              'The visitor’s internet speed',
              'Network latency across long distances',
              'How many people arrive at once',
              'The device they are browsing on',
            ],
          },
        },
        {
          b: 'p',
          text: 'The practical consequence is a design rule: because you cannot fix the visitor’s connection, **make the page small enough that a poor connection still works**. A page that loads quickly in Colombo on fibre and never loads in Anuradhapura on mobile data has failed the audience it was built for.',
        },

        { b: 'h2', text: 'You have finished the competency' },
        {
          b: 'p',
          text: 'Look back at where this started: a network is a group of connected devices that share data. Between there and here you have written HTML, styled it with CSS, made it dynamic with PHP, stored data in MySQL, and put the result on the internet. That is the whole of Competency 10, and it is also, genuinely, how the web works.',
        },
        {
          b: 'note',
          tone: 'tip',
          title: 'What to do next',
          text: 'Rebuild the four-page site from Module 4, with the stylesheet from Module 5 and a working enquiry form from Module 7 that writes to a database. One project touching every competency level is worth more revision than rereading any of them.',
        },

        {
          b: 'quiz',
          questions: [
            {
              kind: 'mcq',
              q: 'Which factor is **outside** a developer’s control?',
              options: [
                'Image compression',
                'The user’s internet speed',
                'The number of plugins installed',
                'Database query efficiency',
              ],
              answer: 1,
              why: 'You cannot change a visitor’s connection — which is exactly why keeping the page small matters.',
            },
            {
              kind: 'mcq',
              q: 'What is network latency?',
              options: [
                'The amount of data transferable at one time',
                'Delay caused by the long physical distance between the server and the user',
                'The time the server spends processing PHP',
                'The number of visitors at once',
              ],
              answer: 1,
              why: 'Latency is distance-related delay. Capacity is **bandwidth**, and processing time is **server response time**.',
            },
            {
              kind: 'multi',
              q: 'Which are genuine reasons to maintain a website regularly?',
              options: [
                'It keeps links and pages unbroken',
                'Regular backups protect against loss',
                'It prevents the domain name from expiring',
                'Software updates fix bugs and add security measures',
                'Fresh content keeps regular visitors returning',
              ],
              answers: [0, 1, 3, 4],
              why: 'A domain expires on its registration date regardless of maintenance — you renew it separately. The other four are all listed in the syllabus.',
            },
            {
              kind: 'mcq',
              q: 'A page embeds 40 small icons as separate image files. Which performance factor does that hurt most?',
              options: [
                'Server location',
                'The number of HTTP requests',
                'The user’s internet speed',
                'Database queries',
              ],
              answer: 1,
              why: '40 icons means 40 extra requests on top of the base HTML — the n + 1 rule from Module 1, working against you.',
            },
            {
              kind: 'fill',
              q: 'Which practice stops data being reloaded completely every time a user visits?',
              accept: ['caching', 'cache', 'browser caching'],
              why: 'Caching stores a copy so it does not have to be fetched again. Its absence is listed as a performance factor.',
            },
          ],
        },

        {
          b: 'recap',
          items: [
            'Maintenance: fresh content, unbroken links, backups, security, software updates, statistics.',
            'Server factors: hosting quality, CPU/RAM, response time, location, traffic, database queries.',
            'Site factors: file size, HTTP requests, unoptimised images, poor coding, too many plugins, no caching.',
            'Connection factors: bandwidth, latency, the user’s own internet speed.',
            'You cannot fix the visitor’s connection — so make the page small enough that it does not matter.',
          ],
        },
      ],
    },
  ],
}

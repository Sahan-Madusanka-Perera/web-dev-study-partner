# Web Dev Study Partner

An interactive course covering the whole of **G.C.E. A/L ICT Competency 10 —
Develops websites incorporating multi-media technologies (HTML 5)**, for Sri
Lankan Advanced Level students.

Everything in it runs. A real PHP 8 interpreter and a real SQL engine are
compiled to WebAssembly and load into the browser tab, so `echo`, `$_POST`,
`mysqli_connect` and `SELECT … GROUP BY` are genuinely executed — not
simulated, not pre-recorded. There is nothing to install and no account to
create; progress lives in the browser.

```bash
cd app
npm install
npm run dev        # http://localhost:5173
npm run build      # static site in app/dist
```

---

## What is in it

| | |
|---|---|
| **57 lessons** | across the eight competency levels, 10.1 to 10.8 |
| **240 quiz questions** | six formats: multiple choice, multi-select, true/false, fill-in, ordering, matching |
| **34 coding challenges** | auto-marked against the rendered page, the PHP output, or the SQL result set |
| **12 structured questions** | Paper II style, with model answers and mark allocations |
| **120 runnable labs** | HTML, CSS, PHP, forms, SQL and PHP + MySQL |
| **17 explainers** | animated request/response, box model, colspan builder, cascade lab, GET vs POST, and more |

### The eight modules

1. **10.1 The Web and the WWW** — networks, the Internet, hypertext, URLs, browsers, kinds of website
2. **10.2 Planning a Website** — objectives, goals, audiences, requirements, layout and navigation
3. **10.3 HTML Foundations** — the document skeleton, tags and attributes, text, colour, headings, lists, tables
4. **10.4 Links and Multimedia** — the anchor tag, paths, bookmarks, images, audio, video, `<embed>`
5. **10.5 Styling with CSS** — the three insertion methods, the cascade, selectors, text, backgrounds, the box model, tables, units
6. **10.6 Web Authoring Tools** — what they are, twelve categories, and when to hand-code instead
7. **10.7 Dynamic Web: PHP & MySQL** — syntax to CRUD, in eighteen lessons, ending with the resource book's five exercises
8. **10.8 Publishing and Maintaining** — local publishing, hosting, going live, maintenance and performance

---

## How the runtimes work

**PHP.** `@php-wasm/web` provides PHP 8.0 compiled to WebAssembly. It is fetched
with a visible progress bar (about 14 MB, once per device, then cached), and the
same interpreter instance is kept alive for the whole session — so a
`CREATE TABLE` in one lesson is still there in the next. Runs are queued, and
each lab writes to its own path on the virtual filesystem, so labs on one page
cannot overwrite each other.

**MySQL.** `mysqli` is compiled into that PHP build but can only speak to a
MySQL server over a socket, which a browser tab does not have. So
`src/lib/runtime/mysqli-shim.php` reimplements the mysqli API on top of
**PDO/SQLite**, which *is* in the build, and `bridgeMysqli()` rewrites
`new mysqli` / `mysqli_*` onto it before the script runs. The student writes the
exact code the syllabus teaches. Behind it, the shim translates MySQL dialect to
SQLite — `AUTO_INCREMENT`, `DESCRIBE`, `ALTER TABLE … MODIFY`, index prefix
lengths — and rephrases SQLite's errors as MySQL's, so
`Table 'x' doesn't exist` reads the way it would on a real server.

Six databases are seeded from `src/lib/runtime/seed.php`, holding the resource
book's own tables: `publications.classics`, `StudentDB.StInfo`, `mydb.users`,
`school.students`, `demo.persons`, and an empty `practice`.

**Forms.** The form preview is a real iframe. Submitting it collects a genuine
`FormData`, encodes it the way a browser does, and hands it to PHP as `$_GET` or
`$_POST` — so unticked checkboxes really are absent, `name="x[]"` really does
arrive as an array, and a field with no `name` really is never sent.

---

## Layout

```
app/
├── src/
│   ├── data/
│   │   ├── course.ts           the module registry
│   │   ├── modules/            all 57 lessons, as typed data
│   │   ├── exam.ts             question pool + structured questions
│   │   └── reference.ts        CSS, PHP, SQL and glossary reference
│   ├── types/content.ts        the block model every lesson is built from
│   ├── lib/
│   │   ├── php.ts              the PHP runtime, queue and SQL bridge
│   │   ├── runtime/*.php       the mysqli shim and the database seed
│   │   ├── highlight.ts        syntax highlighting for static code blocks
│   │   └── progress.ts         localStorage progress, with export/import
│   ├── components/
│   │   ├── blocks/             the block renderer, editor and preview
│   │   ├── labs/               HTML, CSS, PHP, form and SQL labs
│   │   ├── quiz/               quiz engine and challenge checker
│   │   ├── widgets/            the 17 explainers
│   │   └── layout/             shell, sidebar, wordmark
│   └── pages/                  home, module, lesson, playground, practice, reference, progress
├── public/fonts/               self-hosted Newsreader, IBM Plex Sans, JetBrains Mono
├── public/media/               sample image, audio and video for the media lessons
└── tools/                      screenshot, e2e and content-audit scripts
```

Lessons are **data, not markup**: each is an array of typed blocks, so one
improvement to a block type improves every lesson at once. See
`src/types/content.ts`.

---

## Checks

```bash
node tools/check-templates.mjs    # stray backticks inside lab code samples
npx tsc --noEmit -p tsconfig.app.json
npm run build

npx vite preview --port 5200
node tools/e2e.mjs http://localhost:5200        # 11 end-to-end checks
node tools/audit-challenges.mjs                 # every challenge solution vs its own checks
node tools/shot.mjs "name|url|width|height|theme|full"   # screenshots
```

`audit-challenges.mjs` is the one worth running after editing content: it opens
every challenge, reveals its model solution, and confirms that solution passes
the challenge's own checks. If it does not, a student following the hints
correctly would be told they had failed.

---

## Deploying

The build is a static site — hash routing, relative asset paths — so it works
from any folder, a school intranet, GitHub Pages, Netlify, or a USB stick.

```bash
cd app && npm run build      # → app/dist
```

`dist` is around 29 MB, of which 27 MB is the two PHP WebAssembly binaries.
Only **one** is ever downloaded by a given browser (JSPI where supported,
asyncify elsewhere), and it compresses to roughly 4 MB over the wire. Serve with
compression enabled and a long cache lifetime on `assets/`.

---

## Sources

Content follows the NIE resource book for Competency 10 and the two class-note
PDFs in `notes/`, extracted to `docs/source-notes-*.txt`. The full topic map is
in `docs/COURSE-BLUEPRINT.md`. Anything the notes mark *not in the syllabus* is
included but flagged as beyond syllabus.

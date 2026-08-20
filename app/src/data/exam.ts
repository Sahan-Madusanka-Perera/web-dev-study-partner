import type { Question } from '../types/content'
import { modules } from './course'

export interface PoolQuestion {
  q: Question
  moduleId: string
  moduleTitle: string
  competency: string
  lessonTitle: string
  lessonSlug: string
  moduleSlug: string
}

/** Every quiz question in the course, tagged with where it came from. */
export const questionPool: PoolQuestion[] = modules.flatMap((m) =>
  m.lessons.flatMap((lesson) =>
    lesson.blocks.flatMap((b) =>
      b.b === 'quiz'
        ? b.questions.map((q) => ({
            q,
            moduleId: m.id,
            moduleTitle: m.title,
            competency: m.competency,
            lessonTitle: lesson.title,
            lessonSlug: lesson.slug,
            moduleSlug: m.slug,
          }))
        : [],
    ),
  ),
)

/** Deterministic shuffle seeded by a number, so a paper can be reproduced. */
export function shuffleWith<T>(items: T[], seed: number): T[] {
  const out = [...items]
  let s = seed || 1
  for (let i = out.length - 1; i > 0; i--) {
    s = (s * 1103515245 + 12345) % 2147483648
    const j = Math.floor((s / 2147483648) * (i + 1))
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

/** Draw a paper, spread as evenly as possible across the chosen modules. */
export function drawPaper(count: number, moduleIds: string[] | null, seed: number): PoolQuestion[] {
  const eligible = moduleIds?.length
    ? questionPool.filter((p) => moduleIds.includes(p.moduleId))
    : questionPool

  if (eligible.length <= count) return shuffleWith(eligible, seed)

  // Round-robin across modules so one big module cannot dominate the paper.
  const byModule = new Map<string, PoolQuestion[]>()
  for (const p of eligible) {
    byModule.set(p.moduleId, [...(byModule.get(p.moduleId) ?? []), p])
  }
  const buckets = [...byModule.values()].map((list, i) => shuffleWith(list, seed + i * 97))

  const picked: PoolQuestion[] = []
  let round = 0
  while (picked.length < count) {
    let addedThisRound = false
    for (const bucket of buckets) {
      if (picked.length >= count) break
      if (bucket[round]) {
        picked.push(bucket[round])
        addedThisRound = true
      }
    }
    if (!addedThisRound) break
    round++
  }
  return shuffleWith(picked, seed + 7)
}

/* ── Structured questions ─────────────────────────────────────
   A/L Paper II asks for written answers, which no auto-marker can
   grade. These give the prompt, the marks, and a model answer the
   student reveals and marks themselves against. */

export interface Structured {
  id: string
  competency: string
  marks: number
  question: string
  /** Bullet points a marker would be looking for. */
  answer: string[]
}

export const structuredQuestions: Structured[] = [
  {
    id: 's1',
    competency: '10.1',
    marks: 4,
    question:
      'Distinguish between the Internet and the World Wide Web, giving two differences.',
    answer: [
      'The **Internet** is the worldwide network of connected computers and devices; it originated around **1960** and is based on **hardware**.',
      'The **WWW** is an interconnected system of websites and documents accessed *via* the Internet; it originated in **1989** and is based on **software**.',
      'The Internet uses protocols such as **TCP/IP**; the WWW uses **HTTP/HTTPS**.',
      'The WWW is a **service contained inside** the Internet’s infrastructure, not a synonym for it.',
    ],
  },
  {
    id: 's2',
    competency: '10.1',
    marks: 3,
    question:
      'A web page contains a base HTML file, 4 images, 1 stylesheet and 1 video clip. State how many objects the browser must fetch, and explain your answer.',
    answer: [
      '**7 objects.**',
      'The page refers to **n = 6** embedded objects: 4 images + 1 stylesheet + 1 video.',
      'The browser must also fetch the **base HTML file** itself, giving a total of **n + 1 = 7**.',
      'Each embedded object is referenced by its own **URL** and requested separately.',
    ],
  },
  {
    id: 's3',
    competency: '10.2',
    marks: 6,
    question:
      'A school wants a new website. State three objectives it might have, and for each one give a measurable goal.',
    answer: [
      'Objective: **publish information the office repeats by phone.** Goal: reduce routine office calls by 50% within one term.',
      'Objective: **make results reachable by parents outside the town.** Goal: publish every term-test result online within 24 hours of release.',
      'Objective: **present the school to prospective families.** Goal: 150 visits to the admissions page in the month before applications open.',
      'A goal must carry **a number and a deadline**; an objective states direction only.',
    ],
  },
  {
    id: 's4',
    competency: '10.3',
    marks: 5,
    question:
      'Write the HTML needed to produce a table with two columns, a header row reading Subject and Marks, and two data rows. The table must have a visible border.',
    answer: [
      '`<table border="1">`',
      '`  <tr><th>Subject</th><th>Marks</th></tr>`',
      '`  <tr><td>ICT</td><td>78</td></tr>`',
      '`  <tr><td>Maths</td><td>65</td></tr>`',
      '`</table>`',
      'Marks are for: the `border` attribute, `<tr>` for each row, `<th>` for the header cells, `<td>` for the data cells, and correct nesting.',
    ],
  },
  {
    id: 's5',
    competency: '10.3',
    marks: 4,
    question:
      'Explain the difference between `colspan` and `rowspan`, and state what else must change in the markup when either is used.',
    answer: [
      '`colspan="n"` merges **n columns** into a single cell — the cell stretches sideways.',
      '`rowspan="n"` merges **n rows** into a single cell — the cell stretches downwards.',
      'Both are written on a `<td>` or `<th>`, never on `<tr>` or `<table>`.',
      'The cells that the span covers must be **deleted from the markup**: n − 1 cells to the right for colspan, and n − 1 cells below for rowspan.',
    ],
  },
  {
    id: 's6',
    competency: '10.4',
    marks: 4,
    question:
      'Explain the difference between an absolute path and a relative path, and state which should be used when linking pages within the same website. Give a reason.',
    answer: [
      'An **absolute path** shows the complete directory path starting from the root — for example `C:\\mysite\\images\\logo.png` or `/home/user/report.txt`.',
      'A **relative path** shows the location with respect to the current folder — for example `images/logo.png` or `../index.html`.',
      'For pages within the same site, use a **relative path**.',
      'Reason: an absolute path is only valid on the machine that has those folders, so the links **break as soon as the site is uploaded** to a web server.',
    ],
  },
  {
    id: 's7',
    competency: '10.5',
    marks: 6,
    question:
      'Describe the three ways CSS can be inserted into an HTML page, and state the order of priority when more than one rule applies to the same element.',
    answer: [
      '**Inline** — the `style` attribute on a single element. Affects that element only; discouraged for maintainability.',
      '**Internal (embedded)** — a `<style>` tag inside the `<head>`. Affects that one page.',
      '**External** — a separate `.css` file linked with `<link rel="stylesheet" type="text/css" href="…">`. Affects every page that links it.',
      'Priority: **inline** is highest, then **internal and external which are equal** — the one declared last in the document wins — and **browser default styles** are lowest.',
      '`!important` overrides all of them, regardless of origin or specificity.',
    ],
  },
  {
    id: 's8',
    competency: '10.5',
    marks: 5,
    question:
      'An element has `width: 200px; padding: 15px; border: 5px solid black; margin: 10px;`. Calculate the total horizontal space it occupies, showing your working. Name the four areas of the box model.',
    answer: [
      'Content **200** + padding **15 × 2 = 30** + border **5 × 2 = 10** + margin **10 × 2 = 20**.',
      'Total = **260 px**.',
      'The four areas, innermost outwards: **content**, **padding**, **border**, **margin**.',
      'Padding is inside the border and carries the background; margin is outside the border and is transparent.',
    ],
  },
  {
    id: 's9',
    competency: '10.7',
    marks: 6,
    question:
      'Compare the GET and POST methods of submitting form data, giving three differences, and state which superglobal collects each.',
    answer: [
      '**Data location** — GET appends data to the **URL** as a query string; POST sends it in the **request body**.',
      '**Visibility** — GET data is visible in the URL, browser history and server logs; POST data is not.',
      '**Size** — GET is limited by URL length (about 2000 characters); POST has no practical limit and supports file upload.',
      'GET data is collected with **`$_GET`**; POST data with **`$_POST`**.',
      'GET is for **retrieving** data; POST is for **sending or changing** it.',
    ],
  },
  {
    id: 's10',
    competency: '10.7',
    marks: 8,
    question:
      'Write a PHP script that connects to a MySQL database named `school` on localhost as user `root` with no password, retrieves all rows from a table named `students`, and displays the name of each student. Include error handling.',
    answer: [
      '`$conn = new mysqli("localhost", "root", "", "school");`',
      '`if ($conn->connect_error) { die("Connection failed: " . $conn->connect_error); }`',
      '`$result = $conn->query("SELECT * FROM students");`',
      '`if ($result->num_rows > 0) {`',
      '`    while ($row = $result->fetch_assoc()) { echo $row["name"] . "<br>"; }`',
      '`} else { echo "0 results"; }`',
      '`$conn->close();`',
      'Marks are for: the four connection credentials, the **`connect_error`** check (not `if (!$conn)`), the SELECT query, the `num_rows` check, the `while` + `fetch_assoc` loop, and closing the connection.',
    ],
  },
  {
    id: 's11',
    competency: '10.7',
    marks: 5,
    question:
      'Explain why form data should be sanitised before being used in an SQL query, and name the PHP function used for this. What kind of attack does it prevent?',
    answer: [
      'User input may contain **special characters or malicious input** that changes the meaning of the SQL statement.',
      'Sanitising ensures the input is treated as **literal data rather than executable code**.',
      'The function is **`mysqli_real_escape_string($conn, $value)`**, which escapes special characters in the string.',
      'It prevents **SQL injection**, where an attacker submits SQL fragments that the database then executes.',
      'Even ordinary data needs it — an apostrophe in a surname such as O’Brien would otherwise break the query.',
    ],
  },
  {
    id: 's12',
    competency: '10.8',
    marks: 6,
    question:
      'A school website is slow to load. Suggest three possible causes and a remedy for each.',
    answer: [
      '**Large, unoptimised images** increase the website file size → compress images before uploading them.',
      '**Too many HTTP requests** from many separate scripts, stylesheets and icons → combine or remove unnecessary files.',
      '**Poor hosting quality** — a shared server with low CPU and RAM → upgrade to VPS or a better plan.',
      '**Server location** far from users increases latency → choose a server geographically closer to the audience.',
      '**No caching**, so everything reloads on every visit → enable caching.',
      'A full answer names causes from more than one family: the **server**, the **site** and the **connection**.',
    ],
  },
]

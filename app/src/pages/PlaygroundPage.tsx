import { useState } from 'react'
import { Code2, Database, FileCode2, SendHorizonal } from 'lucide-react'
import { CssLab } from '../components/labs/MarkupLab'
import { PhpLab } from '../components/labs/PhpLab'
import { SqlLab } from '../components/labs/SqlLab'
import { FormLab } from '../components/labs/FormLab'
import { ThemeToggle } from '../components/layout/Shell'
import { cn } from '../lib/cn'

const TABS = [
  { key: 'web', label: 'HTML + CSS', icon: Code2, hint: 'Type markup and styles, see the page.' },
  { key: 'php', label: 'PHP', icon: FileCode2, hint: 'A real PHP 8 interpreter.' },
  { key: 'sql', label: 'SQL', icon: Database, hint: 'Query the sample databases.' },
  { key: 'form', label: 'Form + handler', icon: SendHorizonal, hint: 'Submit a form to a PHP script.' },
] as const

const START_HTML = `<h1>Vidya College</h1>
<p class="lead">Serving students since 1974.</p>

<h2>Notices</h2>
<ul>
  <li>Sports meet on Friday</li>
  <li>Library closes at 4 pm</li>
</ul>

<table border="1">
  <tr><th>Subject</th><th>Teacher</th></tr>
  <tr><td>ICT</td><td>Mr Perera</td></tr>
  <tr><td>Maths</td><td>Mrs Silva</td></tr>
</table>`

const START_CSS = `body {
  font-family: Arial, Helvetica, sans-serif;
  margin: 24px;
  color: #16192b;
}

h1 {
  color: #232842;
  border-bottom: 3px solid #e0a63c;
  padding-bottom: 8px;
}

.lead {
  font-style: italic;
  color: #4d5266;
}

table {
  border-collapse: collapse;
}

th, td {
  padding: 8px 14px;
  text-align: left;
}

th {
  background: #f2ece2;
}`

const START_PHP = `<?php
// Anything you can write in the exam, you can run here.

$subjects = array("ICT", "Combined Maths", "Physics");
$marks    = array(78, 65, 54);

echo "<h2>Results</h2>";
echo "<table border='1' cellpadding='6'>";
echo "<tr><th>Subject</th><th>Marks</th><th>Grade</th></tr>";

for ($i = 0; $i < count($subjects); $i++) {
    $m = $marks[$i];

    if ($m >= 75)      { $grade = "A"; }
    elseif ($m >= 65)  { $grade = "B"; }
    elseif ($m >= 55)  { $grade = "C"; }
    elseif ($m >= 35)  { $grade = "S"; }
    else               { $grade = "F"; }

    echo "<tr><td>$subjects[$i]</td><td>$m</td><td>$grade</td></tr>";
}

echo "</table>";
?>`

const START_SQL = `-- The publications database from the resource book.
SELECT author, title, year
FROM classics
WHERE category = 'Fiction'
ORDER BY year;

SELECT category, COUNT(author)
FROM classics
GROUP BY category;`

const START_FORM = `<h3>Data entry form</h3>

<form method="post" action="process.php">
  <p>
    <label for="uname">Username:</label>
    <input type="text" name="uname" id="uname">
  </p>
  <p>
    <label for="age">Age:</label>
    <input type="number" name="age" id="age" min="14" max="65">
  </p>
  <p>
    <input type="radio" name="gender" value="Male"> Male
    <input type="radio" name="gender" value="Female"> Female
  </p>
  <p>
    <input type="checkbox" name="agree" value="yes"> I agree
  </p>
  <input type="submit" value="Show data">
</form>`

const START_HANDLER = `<?php
$name   = $_POST['uname']  ?? '(not entered)';
$age    = $_POST['age']    ?? '(not entered)';
$gender = $_POST['gender'] ?? 'Not selected';

echo "<p>Your name is <b>$name</b>.</p>";
echo "<p>Your age is $age.</p>";
echo "<p>Your gender is $gender.</p>";

if (isset($_POST['agree'])) {
    echo "<p>You ticked the agree box.</p>";
} else {
    echo "<p>You did not tick the agree box.</p>";
}
?>`

export function PlaygroundPage() {
  const [tab, setTab] = useState<(typeof TABS)[number]['key']>('web')
  const active = TABS.find((t) => t.key === tab)!

  return (
    <div className="mx-auto max-w-[92rem] px-5 pt-8 pb-20 sm:px-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-[2rem] leading-tight font-semibold text-ink sm:text-[2.5rem]">
            Playground
          </h1>
          <p className="mt-2 max-w-[64ch] text-[1.02rem] leading-relaxed text-ink-2">
            A blank workbench. Nothing here is marked or checked — try an idea, break it, and see
            what the browser or the server does about it.
          </p>
        </div>
        <span className="hidden lg:block">
          <ThemeToggle />
        </span>
      </div>

      <div className="mt-7 flex flex-wrap gap-1.5 border-b border-rule pb-3">
        {TABS.map((t) => {
          const Icon = t.icon
          return (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={cn(
                'flex items-center gap-2 rounded-lg border px-3.5 py-2 text-[0.9rem] font-medium transition-colors',
                tab === t.key
                  ? 'border-ink bg-brand text-brand-on'
                  : 'border-rule bg-surface text-ink-2 hover:border-rule-strong hover:text-ink',
              )}
            >
              <Icon className="size-4" strokeWidth={2} />
              {t.label}
            </button>
          )
        })}
        <span className="ml-auto self-center font-mono text-[0.74rem] text-ink-3">
          {active.hint}
        </span>
      </div>

      <div className="mt-2">
        {tab === 'web' && (
          <CssLab
            html={START_HTML}
            css={START_CSS}
            height={520}
            title="index.html and style.css"
            note="Whatever you type here renders exactly the way a browser would render the same file on disk."
          />
        )}
        {tab === 'php' && (
          <PhpLab
            code={START_PHP}
            height={520}
            title="index.php"
            note="Press ⌘/Ctrl + Enter to run. Errors and warnings appear above the output, the way they would on a real server with display_errors on."
          />
        )}
        {tab === 'sql' && (
          <SqlLab
            sql={START_SQL}
            height={300}
            title="query.sql"
            note="Six sample databases are already loaded. Reset data puts every table back to how it started."
          />
        )}
        {tab === 'form' && (
          <FormLab
            formHtml={START_FORM}
            handler={START_HANDLER}
            height={300}
            title="A form and the script that receives it"
            note="Change method=&quot;post&quot; to method=&quot;get&quot; in the form and submit again — then look at what the request line becomes."
          />
        )}
      </div>
    </div>
  )
}

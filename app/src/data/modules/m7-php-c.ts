import type { Lesson } from '../../types/content'

export const m7LessonsC: Lesson[] = [
  // ── 7.11 ─────────────────────────────────────────────────────
  {
    id: 'm7l11',
    slug: 'built-in-functions',
    title: 'Built-in functions',
    summary:
      'The string, maths and utility functions the syllabus names — and the two that stop a page crashing.',
    minutes: 14,
    outcomes: ['Creates PHP code to save/retrieve data to and from MySQL'],
    blocks: [
      {
        b: 'lead',
        text: 'PHP ships with thousands of functions. The syllabus names a specific set, and they are worth knowing cold — a question asking you to reverse a string or round a number expects the function name, not a hand-written loop.',
      },

      { b: 'h2', text: 'String functions' },
      {
        b: 'keyvals',
        items: [
          { k: 'strlen($s)', v: 'Returns the **length** of a string. `strlen("Hello")` → 5' },
          { k: 'str_replace($find, $replace, $subject)', v: 'Replaces all occurrences of a search string with a replacement.' },
          { k: 'substr($s, $start, $length)', v: 'Returns a **portion** of a string. `substr("Hello world!", 6, 5)` → `world`' },
          { k: 'strtoupper / strtolower', v: 'Converts a string to upper or lower case.' },
          { k: 'trim($s)', v: 'Removes whitespace from both ends of a string — essential when handling form input.' },
        ],
      },
      {
        b: 'lab',
        spec: {
          lab: 'php',
          title: 'String functions in action',
          code: `<?php
echo strlen("Hello");                              // 5
echo "<br>";

$txt = "Hello world!";
echo str_replace("Hello", "Hi", $txt);             // Hi world!
echo "<br>";

echo substr("Hello world!", 6, 5);                 // world
echo "<br>";

echo strtoupper("vidya college");
echo "<br>";
echo strtolower("VIDYA COLLEGE");
echo "<br>";

echo "[" . trim("   spaces around me   ") . "]";
?>`,
          height: 330,
          note: '`substr` counts from **zero**, so position 6 of "Hello world!" is the `w`. Change the 6 to 0 and the 5 to 5 to get "Hello".',
        },
      },

      { b: 'h2', text: 'The string operators' },
      {
        b: 'p',
        text: 'Two operators manipulate strings, and both use the **full stop**.',
      },
      {
        b: 'lab',
        spec: {
          lab: 'php',
          title: 'Concatenation, two ways',
          code: `<?php
$firstName = "John";
$lastName  = "Hamilton";

// The . operator joins two strings
$fullName = $firstName . $lastName;
echo "Full Name is $fullName";        // JohnHamilton — no space!
echo "<br>";

$fullName = $firstName . " " . $lastName;
echo "Full Name is $fullName";        // John Hamilton
echo "<hr>";

// .= appends to an existing string
$sentence = "PHP";
$sentence .= " runs";
$sentence .= " on the server";
echo $sentence;
?>`,
          height: 300,
          note: 'The first example is the classic mistake: `.` joins exactly what you give it, so the space has to be joined in too.',
        },
      },

      { b: 'h2', text: 'Mathematical functions' },
      {
        b: 'keyvals',
        items: [
          { k: 'abs($n)', v: 'The **absolute** value — the size of a number, ignoring its sign. `abs(-4.2)` → 4.2' },
          { k: 'round($n, $places)', v: 'Rounds a floating-point number. `round(3.6)` → 4' },
          { k: 'sqrt($n)', v: 'The **square root**. `sqrt(16)` → 4' },
          { k: 'rand($min, $max)', v: 'Generates a **random integer** between two values, inclusive.' },
        ],
      },
      {
        b: 'lab',
        spec: {
          lab: 'php',
          title: 'Maths functions',
          code: `<?php
echo abs(-4.2);        // 4.2
echo "<br>";
echo round(3.6);       // 4
echo "<br>";
echo round(3.14159, 2); // 3.14
echo "<br>";
echo sqrt(16);         // 4
echo "<br>";
echo rand(1, 100);     // a different number each run
echo "<br>";
echo rand(1, 6);       // a dice roll
?>`,
          height: 300,
          note: 'Press Run several times. Only the `rand()` lines change — everything else is deterministic. `rand(1, 100)` is exactly what the number-guessing exercise needs.',
        },
      },

      { b: 'h2', text: 'The two that prevent crashes' },
      {
        b: 'p',
        text: 'These two matter more than any of the above, because they are how you handle data that might not be there — which is every piece of data that comes from a form.',
      },
      {
        b: 'dl',
        items: [
          {
            term: 'isset($var)',
            desc: 'Determines whether a variable is **set and is not NULL**. Returns `true` if the variable exists and is not NULL, `false` if it does not exist or is NULL.',
          },
          {
            term: 'empty($var)',
            desc: 'Determines whether a variable is **empty**. An empty string, `0`, `"0"`, NULL, `false` and an empty array all count as empty.',
          },
        ],
      },
      {
        b: 'lab',
        spec: {
          lab: 'php',
          title: 'isset and empty are not the same',
          code: `<?php
$variable = "Hello, World!";

if (isset($variable)) {
    echo "Variable is set<br>";
} else {
    echo "Variable is not set<br>";
}

echo "<hr>";

$a = "text";
$b = "";
$c = 0;
$d = null;

echo "isset:  ";
var_dump(isset($a), isset($b), isset($c), isset($d));

echo "empty:  ";
var_dump(empty($a), empty($b), empty($c), empty($d));
?>`,
          height: 380,
          note: 'Look carefully at `$c = 0`. It **is set**, but it **is empty**. That difference matters when a form field legitimately contains a zero.',
        },
      },
      {
        b: 'note',
        tone: 'exam',
        title: 'Why isset matters for forms',
        text: 'An unticked checkbox sends **nothing at all**, so `$_POST[\'agree\']` does not exist and reading it produces a warning. `if (isset($_POST[\'agree\']))` is how you check safely — and it appears in almost every form-handling answer.',
      },

      { b: 'h2', text: 'Other useful functions' },
      {
        b: 'keyvals',
        items: [
          { k: 'print_r($var)', v: 'Prints human-readable information about a variable — especially arrays.' },
          { k: 'die($msg) / exit($msg)', v: 'Outputs a message and **terminates the current script immediately**. Used when a database connection fails.' },
          { k: 'htmlspecialchars($s)', v: 'Converts `<`, `>`, `&` and quotes into entities, so user text cannot inject HTML into your page.' },
          { k: 'date($format)', v: 'Formats the current date and time.' },
        ],
      },
      {
        b: 'lab',
        spec: {
          lab: 'php',
          title: 'die() stops everything',
          code: `<?php
echo "This line runs.<br>";

$connected = false;

if (!$connected) {
    die("Connection failed — script terminated.");
}

echo "This line will never run.";
?>`,
          height: 240,
          note: 'Change `$connected` to `true` and the last line appears. `die()` is not a polite request — nothing after it executes at all.',
        },
      },

      {
        b: 'challenge',
        spec: {
          id: 'm7c9',
          title: 'Clean up a messy name',
          brief:
            'The variable holds `"   nimali perera   "` with stray spaces and no capitals. Produce **Nimali Perera**, trimmed and capitalised, and also print its **length after trimming**.',
          lang: 'php',
          starter: `<?php
$name = "   nimali perera   ";

// Trim it, capitalise it, print it, then print its length.

?>`,
          hints: [
            '`trim()` removes the spaces at both ends.',
            '`ucwords()` capitalises the first letter of each word. (`strtoupper` would shout the whole thing.)',
            '`strlen()` on the trimmed string gives 13.',
          ],
          solution: `<?php
$name = "   nimali perera   ";

$clean = ucwords(trim($name));

echo $clean;
echo "<br>";
echo strlen($clean);
?>`,
          checks: [
            { kind: 'source', pattern: 'trim\\s*\\(', label: 'trim() is used' },
            { kind: 'output', contains: 'Nimali Perera', label: 'The output shows "Nimali Perera" capitalised' },
            { kind: 'source', pattern: 'strlen\\s*\\(', label: 'strlen() is used' },
            { kind: 'output', contains: '13', label: 'The trimmed length, 13, is printed' },
          ],
        },
      },

      {
        b: 'quiz',
        questions: [
          {
            kind: 'mcq',
            q: 'What does `substr("Hello world!", 6, 5)` return?',
            options: ['Hello', 'world', ' worl', 'o wor'],
            answer: 1,
            why: 'Counting from zero, position 6 is the `w`. Taking 5 characters from there gives `world`.',
          },
          {
            kind: 'mcq',
            q: '`$x = 0;` — what do `isset($x)` and `empty($x)` return?',
            options: [
              'isset: true, empty: true',
              'isset: true, empty: false',
              'isset: false, empty: true',
              'isset: false, empty: false',
            ],
            answer: 0,
            why: 'The variable exists, so `isset` is true. But `0` counts as empty, so `empty` is **also** true. This catches people out with numeric form fields.',
          },
          {
            kind: 'mcq',
            q: 'Which function would you use to generate a number between 1 and 100 for a guessing game?',
            options: ['round(1, 100)', 'rand(1, 100)', 'abs(1, 100)', 'sqrt(100)'],
            answer: 1,
            why: '`rand(1, 100)` returns a random integer between the two values, inclusive.',
          },
          {
            kind: 'mcq',
            q: 'What does `$a .= " world";` do when `$a` is `"Hello"`?',
            options: [
              'Sets $a to " world"',
              'Appends " world", making $a "Hello world"',
              'Compares the two strings',
              'Causes an error — .= is not a PHP operator',
            ],
            answer: 1,
            why: '`.=` is concatenation assignment — the string equivalent of `+=`.',
          },
          {
            kind: 'fill',
            q: 'Which function prints a message and terminates the script immediately?',
            accept: ['die', 'die()', 'exit', 'exit()', 'die or exit'],
            why: '`die()` — or `exit()`, which is identical. Used when a database connection fails.',
            placeholder: 'function name',
          },
        ],
      },

      {
        b: 'recap',
        items: [
          'Strings: `strlen`, `str_replace`, `substr`, `strtoupper`, `strtolower`, `trim`; `.` joins and `.=` appends.',
          'Maths: `abs`, `round`, `sqrt`, `rand`.',
          '`isset()` — does it exist and is it not NULL? `empty()` — is it "" , 0, null or false?',
          '`print_r` for arrays, `die()`/`exit()` to stop, `htmlspecialchars()` to make user text safe.',
        ],
      },
    ],
  },

  // ── 7.12 ─────────────────────────────────────────────────────
  {
    id: 'm7l12',
    slug: 'html-forms',
    title: 'HTML forms',
    summary:
      'The tags that collect input, the fifteen input types, and the one attribute without which nothing is sent.',
    minutes: 18,
    outcomes: ['Creates data source and enters data', 'Develop simple web based information systems'],
    blocks: [
      {
        b: 'lead',
        text: 'HTML forms collect user input and submit it to a server for processing. They are the main way a website user interacts with PHP and MySQL, and they are essential for login pages, search boxes and any data entry.',
      },

      { b: 'h2', text: 'Why forms rather than direct access' },
      {
        b: 'ul',
        items: [
          '**Access control** — forms act as an intermediary, preventing users from interacting with the database directly. This reduces the risk of unauthorised access and malicious activity such as **SQL injection**.',
          '**Validation** — forms and server-side scripts can validate and sanitise input before it reaches the database, keeping harmful data out.',
          '**Consistent data entry** — a form can enforce specific formats, so what arrives is structured correctly.',
          '**Immediate feedback** — the user is told about incorrect or incomplete data before it is stored.',
          '**User experience** — dropdowns, checkboxes and other input types make entering data simpler and less error-prone.',
          '**Controlled data flow** — the developer decides what happens next: log the submission, send a confirmation email, redirect.',
        ],
      },

      { b: 'h2', text: 'What a form needs' },
      {
        b: 'p',
        text: 'To build a form you must have at least four things.',
      },
      {
        b: 'ol',
        items: [
          'An opening `<form>` and closing `</form>` tag',
          'A submission type specifying either a **Get** or **Post** method',
          'One or more **input fields**',
          'The **destination URL** to which the form data is to be submitted',
        ],
      },
      {
        b: 'code',
        lang: 'html',
        code: `<form action="submit.php" method="post" autocomplete="on">
  <!-- Form elements go here -->
</form>`,
      },
      {
        b: 'keyvals',
        title: 'Attributes of <form>',
        items: [
          { k: 'action', v: 'The **URL where the form data is sent** — the location of the server-side script that will process it.' },
          { k: 'method', v: 'The HTTP method used: `get` or `post`. Covered fully in the next lesson.' },
          { k: 'autocomplete', v: 'Whether the browser should offer previously entered values: `on` or `off`.' },
        ],
      },

      { b: 'h2', text: 'The name attribute' },
      {
        b: 'p',
        text: 'This is the attribute the whole system turns on. When a form is submitted, the browser sends the data as **key–value pairs**. The **`name` attribute of each form element acts as the key**; the value the user entered is the value.',
      },
      {
        b: 'note',
        tone: 'exam',
        title: 'No name, no data',
        text: 'A field without a `name` attribute is **not submitted at all** — the browser simply leaves it out. `id` is for labels and CSS; `name` is what reaches the server. Mixing them up is the most common form bug there is.',
      },
      {
        b: 'lab',
        spec: {
          lab: 'form',
          title: 'Delete a name attribute and watch the field vanish',
          formHtml: `<form method="post" action="process.php">
  <p>
    <label for="a">Has a name:</label>
    <input type="text" name="withName" id="a" value="I arrive">
  </p>
  <p>
    <label for="b">Has only an id:</label>
    <input type="text" id="b" value="I do not arrive">
  </p>
  <input type="submit" value="Submit">
</form>`,
          handler: `<?php
echo "<p>PHP received " . count($_POST) . " field(s):</p>";
echo "<pre>";
print_r($_POST);
echo "</pre>";
?>`,
          height: 210,
          note: 'Press Submit. Only the first field arrives — the second has an `id` but no `name`, so the browser never sends it.',
        },
      },

      { b: 'h2', text: 'The <input> tag' },
      {
        b: 'p',
        text: 'The most widely used form element, supporting many input types.',
      },
      {
        b: 'keyvals',
        title: 'Attributes of <input>',
        items: [
          { k: 'type', v: 'The kind of input — text, password, email, radio, checkbox, submit, and more.' },
          { k: 'name', v: 'The key under which the value is submitted. Required for the data to arrive.' },
          { k: 'id', v: 'A unique identifier, used to connect a `<label>` and to target the field with CSS.' },
          { k: 'value', v: 'The initial value of the input.' },
          { k: 'placeholder', v: 'A hint shown inside the empty field about what to enter.' },
          { k: 'required', v: 'The input must be filled in before the form can be submitted.' },
          { k: 'readonly', v: 'The field can be read but not edited.' },
          { k: 'disabled', v: 'The field is disabled — and disabled fields are **not submitted**.' },
        ],
      },

      { b: 'h2', text: 'Labels, fieldsets and legends' },
      {
        b: 'dl',
        items: [
          {
            term: '<label>',
            desc: 'Defines a label for an input. Clicking the label **focuses or selects** the corresponding input — which makes small checkboxes far easier to hit. The `for` attribute binds it by referring to the input’s `id`.',
          },
          {
            term: '<fieldset>',
            desc: 'Creates a **grouping** of form elements, organising a long form into logical sections.',
          },
          {
            term: '<legend>',
            desc: 'Provides a caption or title for a `<fieldset>`. It must be the **first element inside** it.',
          },
        ],
      },
      {
        b: 'lab',
        spec: {
          lab: 'html',
          title: 'Labels make targets bigger',
          html: `<form>
  <fieldset>
    <legend>Personal Information</legend>

    <p>
      <label for="name">Name:</label>
      <input type="text" id="name" name="name">
    </p>
    <p>
      <label for="email">Email:</label>
      <input type="email" id="email" name="email">
    </p>
    <p>
      <label><input type="checkbox" name="ok"> Click these words, not just the box</label>
    </p>
  </fieldset>

  <fieldset>
    <legend>Account Details</legend>
    <p>
      <label for="u">Username:</label>
      <input type="text" id="u" name="username">
    </p>
    <p>
      <label for="p">Password:</label>
      <input type="password" id="p" name="password">
    </p>
  </fieldset>
</form>`,
          height: 400,
          note: 'Click the words next to the checkbox rather than the box itself — it still ticks, because the label is bound to it. That is a real accessibility gain for one attribute.',
        },
      },

      { b: 'h2', text: 'The input types' },
      {
        b: 'table',
        head: ['Type', 'What it is for'],
        compact: true,
        rows: [
          ['`text`', 'Single-line text input'],
          ['`password`', 'Password input — the characters are hidden'],
          ['`email`', 'Email input, with built-in validation'],
          ['`number`', 'Numeric input, with validation and `min` / `max`'],
          ['`date`', 'Date input, with a date picker'],
          ['`time`', 'Time input, with a time picker'],
          ['`checkbox`', 'Select **multiple** options from a set'],
          ['`radio`', 'Select **one** option from a group'],
          ['`file`', 'File uploads'],
          ['`hidden`', 'Data not visible to the user but sent with the form'],
          ['`submit`', 'Submits the form data'],
          ['`reset`', 'Resets the form to its initial values'],
          ['`color`', 'Colour input, with a colour picker'],
          ['`range`', 'Numeric input within a range, as a slider'],
          ['`url`', 'URL input, with validation'],
        ],
      },
      {
        b: 'lab',
        spec: {
          lab: 'html',
          title: 'Every input type, live',
          html: `<form>
  <p>text <input type="text" name="a" placeholder="type here"></p>
  <p>password <input type="password" name="b" value="secret"></p>
  <p>email <input type="email" name="c" placeholder="you@school.lk"></p>
  <p>number <input type="number" name="d" min="14" max="65" value="17"></p>
  <p>date <input type="date" name="e"></p>
  <p>time <input type="time" name="f"></p>
  <p>color <input type="color" name="g" value="#232842"></p>
  <p>range <input type="range" name="h" min="0" max="100" value="40"></p>
  <p>url <input type="url" name="i" placeholder="https://"></p>
  <p>file <input type="file" name="j"></p>
  <p>
    <input type="submit" value="Submit">
    <input type="reset" value="Reset">
  </p>
</form>`,
          height: 480,
          note: 'These are the browser’s own controls — no JavaScript involved. Type letters into the number field, or a bad address into the email field, and press Submit to see the built-in validation.',
        },
      },

      { b: 'h2', text: 'Checkboxes and radio buttons' },
      {
        b: 'compare',
        left: {
          title: 'Checkbox — many',
          items: [
            'Users can select **multiple** options',
            'Each operates independently, even sharing a name',
            'Use `name="preferences[]"` to collect them as an **array**',
            'An unticked box sends **nothing**',
          ],
        },
        right: {
          title: 'Radio — one',
          items: [
            'Users can select only **one** option',
            'Buttons with the **same name** are grouped together',
            'Only the selected value is submitted',
            'No array needed — there is only ever one value',
          ],
        },
      },
      {
        b: 'lab',
        spec: {
          lab: 'form',
          title: 'Checkbox arrays and radio groups',
          formHtml: `<form method="post" action="process.php">
  <p><b>Preferences</b> — tick any (name ends with [])</p>
  <label><input type="checkbox" name="preferences[]" value="newsletter"> Newsletter</label><br>
  <label><input type="checkbox" name="preferences[]" value="updates"> Updates</label><br>
  <label><input type="checkbox" name="preferences[]" value="offers"> Special offers</label>

  <p><b>Gender</b> — pick one (all share one name)</p>
  <label><input type="radio" name="gender" value="male"> Male</label>
  <label><input type="radio" name="gender" value="female"> Female</label>
  <label><input type="radio" name="gender" value="other"> Other</label>

  <p><button type="submit">Submit</button></p>
</form>`,
          handler: `<?php
$preferences = $_POST['preferences'] ?? [];

echo "<p>You chose " . count($preferences) . " preference(s):</p><ul>";
foreach ($preferences as $preference) {
    echo "<li>" . htmlspecialchars($preference) . "</li>";
}
echo "</ul>";

$gender = $_POST['gender'] ?? "Not selected";
echo "<p>Selected gender: " . htmlspecialchars($gender) . "</p>";
?>`,
          height: 260,
          note: 'Tick two boxes and submit. The `[]` on the name makes PHP collect them into an **array**, which the `foreach` then walks. Submit with nothing ticked and the array is simply empty — no error.',
        },
      },

      { b: 'h2', text: 'select, option and textarea' },
      {
        b: 'p',
        text: 'The `<select>` tag creates a **drop-down list**; `<option>` defines each item in it. `<textarea>` creates a **multi-line** text input.',
      },
      {
        b: 'keyvals',
        title: 'Attributes',
        items: [
          { k: '`<select name size multiple>`', v: '`size` sets how many options are visible; `multiple` allows more than one selection.' },
          { k: '`<option value selected disabled>`', v: '`value` is what is sent to the server (if omitted, the text content is sent); `selected` pre-selects it; `disabled` prevents selection.' },
          { k: '`<textarea rows cols>`', v: '`rows` is the visible height in lines; `cols` the visible width in characters. Default text goes **between** the tags.' },
        ],
      },
      {
        b: 'lab',
        spec: {
          lab: 'html',
          title: 'Drop-downs and text areas',
          html: `<form>
  <p>
    <label for="vehicle-select">Choose a vehicle:</label>
    <select name="vehicle" id="vehicle-select" required>
      <option value="" disabled selected>Select your option</option>
      <option value="car">Car</option>
      <option value="bike">Bike</option>
      <option value="boat">Boat</option>
      <option value="plane" disabled>Plane (Unavailable)</option>
    </select>
  </p>

  <p>
    <label for="veg">Vegetables:</label>
    <select name="veg" id="veg" size="1">
      <option value="Peas">Peas</option>
      <option value="Beans" selected>Beans</option>
      <option value="Carrots">Carrots</option>
      <option value="Cabbage">Cabbage</option>
    </select>
  </p>

  <p>
    <label for="message">Message:</label><br>
    <textarea id="message" name="message" rows="5" cols="30">This is some default text.</textarea>
  </p>
</form>`,
          height: 420,
          note: 'The first option is `disabled selected` — a common trick that shows a prompt without letting the user submit it. The second list opens on **Beans**, because that option carries `selected`.',
        },
      },

      {
        b: 'challenge',
        spec: {
          id: 'm7c10',
          title: 'Build a registration form',
          brief:
            'Build a form that posts to `register.php`. It needs a **text** field named `fullname`, an **email** field named `email`, a **number** field named `age` with `min="14"`, a **radio group** named `gender` with two options, and a **submit** button. Every field must be wrapped in or bound to a `<label>`.',
          lang: 'html',
          starter: `<form>

</form>`,
          hints: [
            'The opening tag needs both `action="register.php"` and `method="post"`.',
            'Bind a label with `<label for="x">` and `<input id="x">` — the `for` and the `id` must match.',
            'Both radio buttons must share `name="gender"` but have different `value`s.',
          ],
          solution: `<form action="register.php" method="post">
  <p>
    <label for="fullname">Full name:</label>
    <input type="text" id="fullname" name="fullname" required>
  </p>
  <p>
    <label for="email">Email:</label>
    <input type="email" id="email" name="email" required>
  </p>
  <p>
    <label for="age">Age:</label>
    <input type="number" id="age" name="age" min="14" max="65">
  </p>
  <p>
    <label><input type="radio" name="gender" value="Male"> Male</label>
    <label><input type="radio" name="gender" value="Female"> Female</label>
  </p>
  <input type="submit" value="Register">
</form>`,
          checks: [
            { kind: 'attr', selector: 'form', attr: 'action', equals: 'register.php', label: 'The form posts to register.php' },
            { kind: 'attr', selector: 'form', attr: 'method', contains: 'post', label: 'The method is post' },
            { kind: 'selector', selector: 'input[type="text"][name="fullname"]', min: 1, label: 'There is a text input named fullname' },
            { kind: 'selector', selector: 'input[type="email"][name="email"]', min: 1, label: 'There is an email input named email' },
            { kind: 'attr', selector: 'input[type="number"][name="age"]', attr: 'min', equals: '14', label: 'The age field is a number with min="14"' },
            { kind: 'selector', selector: 'input[type="radio"][name="gender"]', min: 2, label: 'There are two radio buttons sharing name="gender"' },
            { kind: 'selector', selector: 'input[type="submit"], button[type="submit"]', min: 1, label: 'There is a submit button' },
            { kind: 'selector', selector: 'label', min: 3, label: 'Labels are used' },
          ],
        },
      },

      {
        b: 'quiz',
        questions: [
          {
            kind: 'mcq',
            q: 'A text field has an `id` but no `name`. What arrives at the server?',
            options: [
              'The value, keyed by the id',
              'Nothing — the field is not submitted',
              'An empty string keyed by the id',
              'An error',
            ],
            answer: 1,
            why: 'The `name` attribute is the key in the key–value pair. Without it the browser does not send the field at all.',
          },
          {
            kind: 'mcq',
            q: 'Why is a checkbox often named `preferences[]` rather than `preferences`?',
            options: [
              'To make it required',
              'So several ticked boxes arrive as an array rather than overwriting one another',
              'Because checkboxes cannot have plain names',
              'To group it with the radio buttons',
            ],
            answer: 1,
            why: 'The `[]` tells PHP to collect every submitted value under that name into an array, so the user can tick more than one.',
          },
          {
            kind: 'mcq',
            q: 'What does the `for` attribute of a `<label>` refer to?',
            options: [
              'The name attribute of an input',
              'The id attribute of an input',
              'The action of the form',
              'The type of the input',
            ],
            answer: 1,
            why: '`for` matches an input’s **`id`**. That binding is what makes clicking the label select the field.',
          },
          {
            kind: 'multi',
            q: 'Which are required parts of a working form?',
            options: [
              'An opening and closing <form> tag',
              'A method — get or post',
              'A <fieldset>',
              'One or more input fields',
              'A destination URL in action',
            ],
            answers: [0, 1, 3, 4],
            why: '`<fieldset>` is useful for grouping but entirely optional. The other four are the minimum.',
          },
          {
            kind: 'tf',
            q: 'Radio buttons in the same group must have different `name` attributes.',
            answer: false,
            why: 'The opposite — they must share the **same** name. That shared name is what groups them so only one can be chosen.',
          },
        ],
      },

      {
        b: 'recap',
        items: [
          'A form needs `<form>`, a method, input fields, and an `action` URL.',
          '`name` is the key that reaches the server. No name, no data. `id` is for labels and CSS.',
          '`<label for="id">` makes the text clickable; `<fieldset>` and `<legend>` group and caption.',
          'Fifteen input types, from text to range. Checkboxes allow many (use `name[]`); radios allow one (share a name).',
          '`<select>` with `<option>` makes a drop-down; `<textarea rows cols>` takes multi-line text.',
        ],
      },
    ],
  },

  // ── 7.13 ─────────────────────────────────────────────────────
  {
    id: 'm7l13',
    slug: 'get-post-superglobals',
    title: 'GET, POST and superglobals',
    summary:
      'Where form data travels, how PHP picks it up, and why a password must never go in the URL.',
    minutes: 17,
    outcomes: ['Creates PHP code to save/retrieve data', 'Develop simple web based information systems'],
    blocks: [
      {
        b: 'lead',
        text: 'When a form is submitted, the data can be sent using either the **GET** or the **POST** method. Each has its own characteristics and its own use cases — and the difference is examined every year.',
      },

      { b: 'widget', spec: { widget: 'get-vs-post' } },

      { b: 'h2', text: 'GET' },
      {
        b: 'ul',
        items: [
          'Data is appended to the **URL as query parameters**, making it visible and shareable.',
          'The length of a URL is limited, so GET suits **small amounts** of data — around **2000 characters**.',
          'Requests **can be cached** by browsers, and can be **bookmarked**.',
          'Repeated requests — refreshing the page — have the **same effect** every time.',
        ],
      },

      { b: 'h2', text: 'POST' },
      {
        b: 'ul',
        items: [
          'Data is sent in the **body of the HTTP request**, and is not visible in the URL.',
          'POST can handle **larger amounts** of data than GET.',
          'Requests are **not cached** by default and **cannot be bookmarked**, because the data is not in the URL.',
          'Repeated requests can have **different effects** — which is why the browser warns before resubmitting.',
        ],
      },
      {
        b: 'table',
        head: ['Feature', 'GET', 'POST'],
        firstColHead: true,
        rows: [
          ['Main purpose', 'Retrieve or read data from a server', 'Send, create or change data on a server'],
          ['Typical use', 'Search, filters, links', 'Login, registration, form submission, file upload'],
          ['Data location', 'URL query string', 'Request body'],
          ['Visible in URL', 'Yes', 'No'],
          ['Browser history', 'Stored', 'Usually not stored'],
          ['Caching', 'Can be cached', 'Usually not cached'],
          ['Bookmarkable', 'Yes', 'No'],
          ['Sensitive data', 'Not safe — exposed in history and server logs', 'Safer, but HTTPS is still required'],
          ['Data size limit', 'Limited by URL length', 'No practical limit'],
          ['File upload', 'No', 'Yes'],
          ['Modifies server data', 'Should not', 'Intended to'],
          ['Refresh risk', 'May repeat the action', 'Browser usually warns before resubmission'],
          ['SEO friendly', 'Yes', 'No'],
          ['HTML syntax', '`method="GET"`', '`method="POST"`'],
        ],
      },
      {
        b: 'note',
        tone: 'warn',
        title: 'POST is not encryption',
        text: 'POST hides data from the address bar and the browser history — that is all. Anyone watching the network still sees it in plain text. **Use HTTPS** to encrypt data in transit, and never put sensitive data in a GET request, where it is exposed in browser history and server logs.',
      },

      { b: 'h2', text: 'Superglobal variables' },
      {
        b: 'p',
        text: 'Superglobals are **built-in global arrays that are always accessible**, regardless of scope. You can reach them from any function, class or file without doing anything special — including without the `global` keyword.',
      },
      {
        b: 'table',
        head: ['Superglobal', 'Contains'],
        rows: [
          ['`$GLOBALS`', 'A reference to every variable currently available in the global scope.'],
          ['`$_SERVER`', 'Information about headers, paths and script locations. Filled by the web server.'],
          ['`$_GET`', 'Variables passed to the current script via **URL parameters** — a form using `method="get"`.'],
          ['`$_POST`', 'Variables passed via the **HTTP POST method** — a form using `method="post"`.'],
          ['`$_COOKIE`', 'Variables passed via HTTP cookies. *(Named in the syllabus, not studied.)*'],
          ['`$_SESSION`', 'Session variables. *(Named, not studied.)*'],
          ['`$_REQUEST`', 'The contents of `$_GET`, `$_POST` and `$_COOKIE` combined. *(Named, not studied.)*'],
        ],
      },
      {
        b: 'p',
        text: '`$_GET` and `$_POST` are **associative arrays**. The **keys** are the values of the `name` attributes on your form fields, and the **values** are the data the user entered. That single sentence is the whole mechanism.',
      },

      { b: 'h2', text: 'Seeing it happen' },
      {
        b: 'lab',
        spec: {
          lab: 'form',
          title: 'The real round trip — change the method and compare',
          formHtml: `<!-- Change method="get" to method="post" and submit again.
     Watch the request line above the result. -->

<form method="get" action="process.php">
  <legend>Data entry form</legend>

  <p>
    <label for="userName">Username: </label>
    <input type="text" name="uname" id="userName" value="Nimali">
  </p>
  <p>
    <label for="email">Email: </label>
    <input type="email" name="email" id="email" value="nimali@school.lk">
  </p>
  <p>
    <label for="age">Age: </label>
    <input type="number" name="age" id="age" min="14" max="65" value="17">
  </p>
  <p>
    <input type="radio" name="gender" value="Male"> Male
    <input type="radio" name="gender" value="Female" checked> Female
  </p>
  <p>
    <input type="checkbox" name="agree" value="yes"> I agree!
  </p>
  <input type="submit" value="Show data">
</form>`,
          handler: `<?php
// The form uses GET, so the data arrives in $_GET.
// Switch the form to method="post" and change these to $_POST.

$uname  = $_GET['uname']  ?? '(not entered)';
$email  = $_GET['email']  ?? '(not entered)';
$age    = $_GET['age']    ?? '(not entered)';
$gender = $_GET['gender'] ?? 'Not selected';

echo "Your name is $uname. <br>";
echo "Your email is $email. <br>";
echo "Your age is $age. <br>";
echo "Your gender is $gender. <br>";

if (isset($_GET['agree'])) {
    echo "You have checked the agreed button";
} else {
    echo "You have not checked the agreed button";
}
?>`,
          height: 300,
          note: 'This is the resource book’s own example, running. Submit it as GET and look at the request line. Then change **both** `method="get"` and `$_GET` to POST and submit again — the output is identical, but the request is completely different.',
        },
      },
      {
        b: 'note',
        tone: 'exam',
        title: 'Changing the method means changing two things',
        text: 'The resource book says it plainly: *if we set the method attribute to post, we have to change the `$_GET` to `$_POST` in order to collect the data. There is no change in anything else.* Change one without the other and the form silently returns nothing.',
      },

      { b: 'h2', text: '$_SERVER' },
      {
        b: 'p',
        text: '`$_SERVER` holds information about the request and the environment, filled in by the web server itself.',
      },
      {
        b: 'lab',
        spec: {
          lab: 'php',
          title: 'What the server knows about this request',
          code: `<?php
echo "Script: "        . $_SERVER['PHP_SELF']        . "<br>";
echo "Method: "        . $_SERVER['REQUEST_METHOD']  . "<br>";
echo "Server name: "   . $_SERVER['SERVER_NAME']     . "<br>";
echo "Host header: "   . $_SERVER['HTTP_HOST']       . "<br>";
echo "Query string: "  . $_SERVER['QUERY_STRING']    . "<br>";
echo "Server software: " . $_SERVER['SERVER_SOFTWARE'] . "<br>";

echo "<hr>";
echo "<b>Everything in \\$_SERVER:</b>";
echo "<pre>";
print_r($_SERVER);
echo "</pre>";
?>`,
          height: 340,
          note: 'The four the notes list are `PHP_SELF` (the filename of the currently executing script), `REQUEST_METHOD`, `SERVER_NAME` and `HTTP_HOST`, plus `HTTP_USER_AGENT` for the browser’s identity string.',
        },
      },

      { b: 'h2', text: 'Validating what arrives' },
      {
        b: 'p',
        text: 'Always **validate and sanitise** form data. Everything a user types is untrusted until you check it — that is the guard against SQL injection and cross-site scripting.',
      },
      {
        b: 'lab',
        spec: {
          lab: 'form',
          title: 'A handler that checks before it trusts',
          formHtml: `<form method="post" action="process.php">
  <p>
    <label for="n">Name (required):</label>
    <input type="text" name="name" id="n">
  </p>
  <p>
    <label for="a">Age (14–65):</label>
    <input type="text" name="age" id="a">
  </p>
  <p>Try submitting it empty, then with an age of 200,
     then with a name of &lt;b&gt;bold&lt;/b&gt;.</p>
  <input type="submit" value="Submit">
</form>`,
          handler: `<?php
$errors = [];

// 1. Is it there at all?
if (!isset($_POST['name']) || trim($_POST['name']) === '') {
    $errors[] = "Name is required.";
}

// 2. Is it the right kind of thing?
$age = $_POST['age'] ?? '';
if (!is_numeric($age)) {
    $errors[] = "Age must be a number.";
} elseif ($age < 14 || $age > 65) {
    $errors[] = "Age must be between 14 and 65.";
}

if ($errors) {
    echo "<p style='color:#b02525'><b>Please fix:</b></p><ul>";
    foreach ($errors as $e) { echo "<li>$e</li>"; }
    echo "</ul>";
} else {
    // 3. Escape it before showing it back
    $safe = htmlspecialchars($_POST['name']);
    echo "<p style='color:#146c43'>Thank you, <b>$safe</b>, age $age.</p>";
}
?>`,
          height: 240,
          note: 'Enter `<b>bold</b>` as the name. `htmlspecialchars()` prints the tags as **text** instead of letting them become markup — which is exactly how you stop a visitor injecting HTML into your page.',
        },
      },

      {
        b: 'quiz',
        questions: [
          {
            kind: 'mcq',
            q: 'A form uses `method="post"`. Which superglobal collects the data?',
            options: ['$_GET', '$_POST', '$_SERVER', '$_REQUEST only'],
            answer: 1,
            why: '`$_POST` collects data from a form using the POST method. `$_REQUEST` would also work but is not the direct answer.',
          },
          {
            kind: 'mcq',
            q: 'Which is the strongest reason **not** to use GET for a login form?',
            options: [
              'GET is slower than POST',
              'The password appears in the URL, browser history and server logs',
              'GET cannot send text fields',
              'GET forms cannot have a submit button',
            ],
            answer: 1,
            why: 'GET puts the data in the URL, where it is visible on screen, saved in history and written into server logs.',
          },
          {
            kind: 'mcq',
            q: 'In `$_POST[\'email\']`, where does the key `email` come from?',
            options: [
              'The id attribute of the input',
              'The name attribute of the input',
              'The label text',
              'The type attribute',
            ],
            answer: 1,
            why: 'The **name** attribute becomes the key. That is why a field without a name never arrives.',
          },
          {
            kind: 'multi',
            q: 'Which statements about POST are true?',
            options: [
              'Data travels in the request body',
              'It encrypts the data',
              'It can handle file uploads',
              'It has no practical size limit',
              'Requests can be bookmarked',
            ],
            answers: [0, 2, 3],
            why: 'POST does **not** encrypt — that is HTTPS. And it cannot be bookmarked, because the data is not in the URL.',
          },
          {
            kind: 'fill',
            q: 'Which superglobal contains information about headers, paths and script locations, filled in by the web server?',
            accept: ['$_server', '_server', '$_SERVER'],
            why: '`$_SERVER` — it holds `REQUEST_METHOD`, `PHP_SELF`, `HTTP_HOST` and much more.',
            placeholder: 'e.g. $_XXXX',
          },
        ],
      },

      {
        b: 'recap',
        items: [
          'GET puts data in the URL: visible, bookmarkable, cacheable, size-limited. For reading.',
          'POST puts data in the request body: hidden from the URL, unlimited, allows file upload. For changing.',
          '`$_GET` and `$_POST` are associative arrays keyed by the `name` attributes of your fields.',
          'Change the form’s method and you must change the superglobal to match — nothing else.',
          'Validate and sanitise everything; POST is not encryption, HTTPS is.',
        ],
      },
    ],
  },

  // ── 7.14 ─────────────────────────────────────────────────────
  {
    id: 'm7l14',
    slug: 'databases-and-mysql',
    title: 'Databases and MySQL basics',
    summary:
      'Tables, rows and fields — plus CREATE, DESCRIBE, data types, indexes and primary keys.',
    minutes: 18,
    outcomes: ['Creates data source and enters data'],
    blocks: [
      {
        b: 'lead',
        text: 'A **database** is a structured collection of records or data, stored in a computer system and organised so it can be quickly searched and rapidly retrieved. **MySQL** is probably the most popular database management system for web servers, and the combination of PHP and MySQL works well on any operating system.',
      },

      { b: 'h2', text: 'The vocabulary' },
      {
        b: 'p',
        text: 'The **SQL** in MySQL stands for **Structured Query Language**. A **database query** is a question or request sent to the database to obtain particular information or a record.',
      },
      {
        b: 'dl',
        items: [
          { term: 'Database', desc: 'A container holding one or more tables — for example `publications`.' },
          { term: 'Table', desc: 'A grid of related data — for example `classics`, holding books.' },
          { term: 'Record / row', desc: 'One complete entry — one whole book.' },
          { term: 'Field / column', desc: 'One attribute shared by every record — the author, or the year.' },
          { term: 'Field name', desc: 'The heading at the top of a column.' },
        ],
      },
      {
        b: 'table',
        head: ['Author', 'Title', 'Type', 'Year'],
        rows: [
          ['Mark Twain', 'The Adventures of Tom Sawyer', 'Fiction', '1876'],
          ['Jane Austen', 'Pride and Prejudice', 'Fiction', '1811'],
          ['Charles Darwin', 'The Origin of Species', 'Non-Fiction', '1856'],
          ['Charles Dickens', 'The Old Curiosity Shop', 'Fiction', '1841'],
          ['William Shakespeare', 'Romeo and Juliet', 'Play', '1594'],
        ],
        caption:
          'The `classics` table, inside the `publications` database. Four field names across the top; five records down the side. This exact table is loaded and ready in every SQL lab in this course.',
      },

      { b: 'h2', text: 'Creating a database and a table' },
      {
        b: 'code',
        lang: 'sql',
        code: `CREATE DATABASE publications;

USE publications;

CREATE TABLE table_name (
    column1 datatype,
    column2 datatype,
    column3 datatype
);`,
      },
      {
        b: 'p',
        text: '`CREATE DATABASE` makes the database; `USE` selects it so later statements know where to work; `CREATE TABLE` defines a table’s columns and their types.',
      },
      {
        b: 'lab',
        spec: {
          lab: 'sql',
          title: 'Create the classics table yourself',
          seed: 'practice',
          sql: `CREATE TABLE classics (
    author VARCHAR(128),
    title  VARCHAR(128),
    type   VARCHAR(16),
    year   CHAR(4)
);

DESCRIBE classics;`,
          height: 240,
          note: 'This runs against the empty `practice` database. Press Run, then look at the schema panel on the right — the table really is there. Press **Reset data** to clear it and start again.',
        },
      },

      { b: 'h2', text: 'DESCRIBE' },
      {
        b: 'p',
        text: '`DESCRIBE classics;` confirms that a table was created without problems, and reminds you of the field names and their data types.',
      },
      {
        b: 'keyvals',
        title: 'What each column of DESCRIBE means',
        items: [
          { k: 'Field', v: 'The name of each field or column within the table.' },
          { k: 'Type', v: 'The type of data being stored in the field.' },
          { k: 'Null', v: 'Whether the field is allowed to contain a value of NULL.' },
          { k: 'Key', v: 'What type of key or index, if any, has been applied. Keys are quick ways to look up and search for data.' },
          { k: 'Default', v: 'The value assigned to the field if none is specified when a new row is created.' },
          { k: 'Extra', v: 'Additional information — such as whether a field is set to auto-increment.' },
        ],
      },

      { b: 'h2', text: 'Data types' },
      {
        b: 'p',
        text: 'Data types tell MySQL what kind of data each field holds — which controls how much space it takes and what can be stored in it.',
      },
      {
        b: 'table',
        head: ['Type', 'Bytes used', 'Example'],
        rows: [
          ['`CHAR(n)`', 'Exactly n (n ≤ 255)', '`CHAR(5)` storing "Hello" uses 5 bytes; `CHAR(57)` storing "Goodbye" still uses **57**'],
          ['`VARCHAR(n)`', 'Up to n (n ≤ 65535)', '`VARCHAR(7)` storing "Morning" uses 7 bytes; `VARCHAR(100)` storing "Night" uses only **5**'],
          ['`BINARY(n)` / `BYTE(n)`', 'Exactly n (n ≤ 255)', 'As CHAR, but holds binary data'],
          ['`VARBINARY(n)`', 'Up to n (n ≤ 65535)', 'As VARCHAR, but holds binary data'],
          ['`INT`, `SMALLINT`, `BIGINT`', 'Fixed by type', 'Whole numbers of different ranges'],
          ['`DECIMAL(10,2)`', 'Fixed', 'Exact decimals — the right choice for money'],
        ],
      },
      {
        b: 'note',
        tone: 'exam',
        title: 'CHAR versus VARCHAR',
        text: '`CHAR(n)` always uses **exactly n bytes**, padding shorter values. `VARCHAR(n)` uses only as many bytes as the value needs, **up to** n. Use CHAR for values that are always the same length — a country code, an ISBN — and VARCHAR for everything else. This comparison is a standard question.',
      },

      { b: 'h2', text: 'Adding data' },
      {
        b: 'code',
        lang: 'sql',
        code: `INSERT INTO classics(author, title, type, year)
VALUES('Mark Twain', 'The Adventures of Tom Sawyer', 'Fiction', '1876');

INSERT INTO classics(author, title, type, year)
VALUES('Jane Austen', 'Pride and Prejudice', 'Fiction', '1811');`,
      },

      { b: 'h2', text: 'Altering a table' },
      {
        b: 'table',
        head: ['Purpose', 'Statement'],
        rows: [
          ['Rename a table', '`ALTER TABLE classics RENAME pre1900;`'],
          ['Change a column’s data type', '`ALTER TABLE classics MODIFY year SMALLINT;`'],
          ['Add a new column', '`ALTER TABLE classics ADD pages SMALLINT UNSIGNED;`'],
          ['Remove a column', '`ALTER TABLE classics DROP pages;`'],
        ],
      },
      {
        b: 'lab',
        spec: {
          lab: 'sql',
          title: 'Alter a real table and watch the schema change',
          seed: 'publications',
          sql: `DESCRIBE classics;

ALTER TABLE classics ADD pages SMALLINT UNSIGNED;

DESCRIBE classics;`,
          height: 240,
          note: 'Run it, then look at the schema panel — `pages` has appeared. Now change `ADD` to `DROP pages` and run again. **Reset data** puts everything back.',
        },
      },

      { b: 'h2', text: 'Indexes' },
      {
        b: 'p',
        text: 'Indexes help you search through tables **faster**. An index is a column of data, or a combination of columns, that can be used to search the table. The database designer decides which column to index by predicting which columns will be searched.',
      },
      {
        b: 'code',
        lang: 'sql',
        code: `ALTER TABLE classics ADD INDEX(author(20));
ALTER TABLE classics ADD INDEX(title(20));

-- These two statements are equivalent:
ALTER TABLE classics ADD INDEX(author(20));
CREATE INDEX author ON classics (author(20));`,
        caption: 'The `(20)` limits each index to the first 20 characters of the column — enough to distinguish rows without storing the whole value twice.',
      },

      { b: 'h2', text: 'Primary keys' },
      {
        b: 'p',
        text: 'A **primary key** lets you search a table using a **single unique key** to reach one row. Having a unique key is essential when you want to combine data from multiple tables.',
      },
      {
        b: 'code',
        lang: 'sql',
        code: `CREATE TABLE classics (
    author   VARCHAR(128),
    title    VARCHAR(128),
    category VARCHAR(16),
    year     SMALLINT,
    isbn     CHAR(13),
    INDEX(author(20)),
    INDEX(title(20)),
    INDEX(category(4)),
    INDEX(year),
    PRIMARY KEY (isbn)
);`,
      },
      {
        b: 'note',
        tone: 'tip',
        title: 'AUTO_INCREMENT',
        text: 'When there is no natural unique value — no ISBN, no NIC number — the usual answer is `id INT AUTO_INCREMENT PRIMARY KEY`. MySQL then allocates 1, 2, 3 … automatically, and you never have to think about it. `DESCRIBE` shows `auto_increment` in the **Extra** column.',
      },
      {
        b: 'lab',
        spec: {
          lab: 'sql',
          title: 'A table with an auto-incrementing key',
          seed: 'practice',
          sql: `CREATE TABLE students (
    id      INT AUTO_INCREMENT PRIMARY KEY,
    name    VARCHAR(60),
    grade   VARCHAR(8)
);

INSERT INTO students (name, grade) VALUES ('Nimali', '13A');
INSERT INTO students (name, grade) VALUES ('Kasun', '13B');
INSERT INTO students (name, grade) VALUES ('Dilki', '12A');

SELECT * FROM students;

DESCRIBE students;`,
          height: 300,
          note: 'The `id` column was never mentioned in the INSERTs, yet every row has one. Look at the `Extra` column of the DESCRIBE output for the word `auto_increment`.',
        },
      },

      {
        b: 'quiz',
        questions: [
          {
            kind: 'mcq',
            q: 'A field always holds a 13-character ISBN. Which type is most appropriate?',
            options: ['VARCHAR(13)', 'CHAR(13)', 'INT', 'TEXT'],
            answer: 1,
            why: '`CHAR(n)` is right for values of a **fixed** length. VARCHAR would add overhead for no benefit here.',
          },
          {
            kind: 'mcq',
            q: 'How many bytes does `VARCHAR(100)` use to store the word "Night"?',
            options: ['100', '5', '13', '0'],
            answer: 1,
            why: 'VARCHAR uses only as many bytes as the value needs, up to the maximum. `CHAR(100)` would use all 100.',
          },
          {
            kind: 'mcq',
            q: 'What is the purpose of a primary key?',
            options: [
              'To make the table load faster',
              'To provide a single unique value that identifies one row, essential for combining tables',
              'To sort the table automatically',
              'To prevent the table from being deleted',
            ],
            answer: 1,
            why: 'Uniqueness is what lets one table refer to a row in another — the basis of every join.',
          },
          {
            kind: 'match',
            q: 'Match each statement to what it does.',
            pairs: [
              { left: 'ALTER TABLE t ADD col INT', right: 'Adds a new column' },
              { left: 'ALTER TABLE t DROP col', right: 'Removes a column' },
              { left: 'ALTER TABLE t MODIFY col SMALLINT', right: 'Changes a column’s data type' },
              { left: 'ALTER TABLE t RENAME newname', right: 'Renames the table' },
            ],
            why: 'ADD, DROP, MODIFY, RENAME — four variations on one statement.',
          },
          {
            kind: 'fill',
            q: 'Which statement shows a table’s field names, types and keys?',
            accept: ['describe', 'describe table', 'desc', 'describe tablename'],
            why: '`DESCRIBE tablename;` — it confirms the table was created correctly and reminds you of the field names.',
            placeholder: 'one keyword',
          },
        ],
      },

      {
        b: 'recap',
        items: [
          'Database → table → record (row) → field (column). SQL = Structured Query Language.',
          '`CREATE DATABASE`, `USE`, `CREATE TABLE`, `DESCRIBE`, `INSERT INTO … VALUES`.',
          '`CHAR(n)` uses exactly n bytes; `VARCHAR(n)` uses only what it needs, up to n.',
          '`ALTER TABLE` … `RENAME` / `MODIFY` / `ADD` / `DROP`.',
          'Indexes make searching faster; a primary key uniquely identifies one row.',
        ],
      },
    ],
  },
]

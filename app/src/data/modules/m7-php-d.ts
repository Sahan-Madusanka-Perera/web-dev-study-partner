import type { Lesson } from '../../types/content'

export const m7LessonsD: Lesson[] = [
  // ── 7.15 ─────────────────────────────────────────────────────
  {
    id: 'm7l15',
    slug: 'sql-queries',
    title: 'Querying with SQL',
    summary:
      'SELECT, WHERE, ORDER BY, GROUP BY and joining two tables — running against a real database.',
    minutes: 18,
    outcomes: ['Creates data source and enters data', 'Develop simple web based information systems'],
    blocks: [
      {
        b: 'lead',
        text: 'Everything in this lesson runs against the `publications` database — the resource book’s own `classics` table, already loaded. Change any query and press Run; the engine is real, so a mistake produces a real error message.',
      },

      { b: 'h2', text: 'SELECT' },
      {
        b: 'p',
        text: 'The first command to learn. `SELECT` extracts data from tables.',
      },
      {
        b: 'code',
        lang: 'sql',
        code: `SELECT <column_name>
FROM <table_name>;`,
      },
      {
        b: 'lab',
        spec: {
          lab: 'sql',
          title: 'Selecting columns',
          seed: 'publications',
          sql: `SELECT author, title
FROM classics;`,
          height: 180,
          note: 'Change the column list to `*` to select every column. Change it to `title` alone and only one column comes back. The column list decides the shape of the result.',
        },
      },

      { b: 'h2', text: 'WHERE' },
      {
        b: 'p',
        text: 'The `WHERE` keyword narrows a query down, returning only rows where a certain expression is true.',
      },
      {
        b: 'code',
        lang: 'sql',
        code: `SELECT <column_name>
FROM <table_name>
WHERE <conditional_expression>;`,
      },
      {
        b: 'lab',
        spec: {
          lab: 'sql',
          title: 'Filtering rows',
          seed: 'publications',
          sql: `SELECT author, title
FROM classics
WHERE author = 'Mark Twain';`,
          height: 190,
          note: 'Try `WHERE year < 1850`, then `WHERE category = \'Fiction\'`, then `WHERE year > 1800 AND category = \'Fiction\'`. String values need quotes; numbers do not.',
        },
      },
      {
        b: 'note',
        tone: 'exam',
        title: 'One equals sign',
        text: 'SQL uses a **single** `=` to compare, not the `==` of PHP. And string comparisons need **single quotes**: `WHERE author = \'Mark Twain\'`.',
      },

      { b: 'h2', text: 'ORDER BY' },
      {
        b: 'p',
        text: 'Sorts the returned results by one or more columns, ascending or descending. Ascending is the default; `DESC` reverses it.',
      },
      {
        b: 'lab',
        spec: {
          lab: 'sql',
          title: 'Sorting results',
          seed: 'publications',
          sql: `SELECT author, title
FROM classics
ORDER BY author;

SELECT author, title, year
FROM classics
ORDER BY year DESC;`,
          height: 230,
          note: 'Two queries at once, separated by semicolons — each gets its own result grid. Add `ASC` to the first to be explicit about the default.',
        },
      },

      { b: 'h2', text: 'GROUP BY' },
      {
        b: 'p',
        text: 'Groups the results, which is good for retrieving information **about a group** of data rather than about individual rows. It is almost always paired with a counting or summing function.',
      },
      {
        b: 'lab',
        spec: {
          lab: 'sql',
          title: 'How many of each category?',
          seed: 'publications',
          sql: `SELECT category, COUNT(author)
FROM classics
GROUP BY category;`,
          height: 190,
          note: 'Five rows became three. Try `COUNT(*)` instead, and try adding `ORDER BY COUNT(author) DESC` on the end to put the biggest group first.',
        },
      },
      {
        b: 'table',
        head: ['Category', 'COUNT(author)'],
        rows: [
          ['Fiction', '3'],
          ['Non-Fiction', '1'],
          ['Play', '1'],
        ],
        caption: 'The expected output — three groups, because there are three distinct categories among the five books.',
      },

      { b: 'h2', text: 'Joining two tables' },
      {
        b: 'p',
        text: 'Databases often have multiple tables containing related data. You can join them in a **single** SELECT statement, matching them on a **common column**.',
      },
      {
        b: 'p',
        text: 'The `publications` database has a second table, `customers`, holding people who bought books — including the **ISBN** of the book purchased. The ISBN is the column common to both tables.',
      },
      {
        b: 'lab',
        spec: {
          lab: 'sql',
          title: 'The resource book’s join',
          seed: 'publications',
          sql: `SELECT name, author, title
FROM customers, classics
WHERE customers.isbn = classics.isbn;`,
          height: 200,
          note: 'Delete the WHERE line and run it again. You get **every** customer paired with **every** book — a Cartesian product. The WHERE clause is what makes it a join rather than a mess.',
        },
      },
      {
        b: 'note',
        tone: 'exam',
        title: 'Why the table name is written before the column',
        text: 'Both tables have a column called `isbn`, so `WHERE isbn = isbn` would be ambiguous. Writing `customers.isbn = classics.isbn` says exactly which one you mean. The `table.column` form is needed whenever a name appears in more than one table.',
      },

      { b: 'h2', text: 'Putting it together' },
      {
        b: 'lab',
        spec: {
          lab: 'sql',
          title: 'Your turn — the whole toolkit',
          seed: 'publications',
          sql: `-- Everything you have learned, in one query.
-- Edit it freely; press Reset data to restore the tables.

SELECT author, title, year
FROM classics
WHERE year > 1800
  AND category = 'Fiction'
ORDER BY year DESC;

-- Try these too:
-- SELECT * FROM classics;
-- SELECT COUNT(*) FROM classics;
-- SELECT category, COUNT(*) FROM classics GROUP BY category;
-- SELECT * FROM classics WHERE title LIKE '%The%';`,
          height: 300,
        },
      },

      {
        b: 'challenge',
        spec: {
          id: 'm7c11',
          title: 'Write a query from a description',
          brief:
            'The `practice` database is empty. Create a table called **`books`** with columns `title` (VARCHAR), `author` (VARCHAR) and `year` (INT). Insert **three** books, at least two of them published **before 1900**. Then write a final `SELECT` that returns only the books published before 1900, **sorted by year**.',
          lang: 'sql',
          starter: `-- 1. CREATE TABLE books ...

-- 2. INSERT three rows ...

-- 3. SELECT the pre-1900 ones, sorted by year ...
`,
            hints: [
              'Statements are separated by semicolons, and each gets its own result panel.',
              '`INSERT INTO books (title, author, year) VALUES ("A", "B", 1876);`',
              'The last statement must be the SELECT — that is the one that gets checked.',
            ],
          solution: `CREATE TABLE books (
    title  VARCHAR(128),
    author VARCHAR(128),
    year   INT
);

INSERT INTO books (title, author, year) VALUES ('Tom Sawyer', 'Mark Twain', 1876);
INSERT INTO books (title, author, year) VALUES ('Pride and Prejudice', 'Jane Austen', 1811);
INSERT INTO books (title, author, year) VALUES ('Dune', 'Frank Herbert', 1965);

SELECT title, author, year
FROM books
WHERE year < 1900
ORDER BY year;`,
          checks: [
            { kind: 'source', pattern: 'CREATE\\s+TABLE\\s+books', label: 'A table called books is created' },
            { kind: 'source', pattern: 'INSERT\\s+INTO[\\s\\S]*INSERT\\s+INTO[\\s\\S]*INSERT\\s+INTO', label: 'Three rows are inserted' },
            { kind: 'source', pattern: 'WHERE[\\s\\S]*year\\s*<\\s*1900', label: 'The SELECT filters on year < 1900' },
            { kind: 'source', pattern: 'ORDER\\s+BY\\s+year', label: 'The results are sorted by year' },
            { kind: 'rows', minCount: 2, hasColumns: ['year'], label: 'The final query returns at least two rows, including a year column' },
          ],
        },
      },

      {
        b: 'quiz',
        questions: [
          {
            kind: 'mcq',
            q: 'Which clause filters which **rows** come back?',
            options: ['SELECT', 'WHERE', 'ORDER BY', 'GROUP BY'],
            answer: 1,
            why: '`SELECT` chooses the **columns**; `WHERE` chooses the **rows**. `ORDER BY` sorts them and `GROUP BY` collapses them into groups.',
          },
          {
            kind: 'mcq',
            q: 'What does `ORDER BY title DESC` do?',
            options: [
              'Deletes the title column',
              'Sorts the results by title, Z to A',
              'Sorts by title, A to Z',
              'Groups the results by title',
            ],
            answer: 1,
            why: '`DESC` means descending. Leaving it off gives ascending order, which is the default.',
          },
          {
            kind: 'mcq',
            q: 'Why is `customers.isbn = classics.isbn` written with table names?',
            options: [
              'It is faster',
              'Both tables have a column named isbn, so the name alone would be ambiguous',
              'SQL requires it in every WHERE clause',
              'To create the isbn column',
            ],
            answer: 1,
            why: 'When a column name exists in more than one table, `table.column` says which you mean.',
          },
          {
            kind: 'mcq',
            q: 'A table has 5 rows with 3 distinct categories. How many rows does `SELECT category, COUNT(*) FROM t GROUP BY category;` return?',
            options: ['5', '3', '1', '15'],
            answer: 1,
            why: '`GROUP BY` returns **one row per group**, so three distinct categories give three rows.',
          },
          {
            kind: 'fill',
            q: 'Write the SQL keyword that removes duplicate values from a result.',
            accept: ['distinct'],
            why: '`SELECT DISTINCT category FROM classics;` returns each category once.',
            placeholder: 'one keyword',
          },
        ],
      },

      {
        b: 'recap',
        items: [
          '`SELECT columns FROM table` — SELECT picks columns.',
          '`WHERE condition` picks rows. One `=`, and single quotes around strings.',
          '`ORDER BY column [DESC]` sorts; `GROUP BY column` with `COUNT()` summarises.',
          'Join two tables by matching a common column: `WHERE a.isbn = b.isbn`.',
        ],
      },
    ],
  },

  // ── 7.16 ─────────────────────────────────────────────────────
  {
    id: 'm7l16',
    slug: 'connecting-php-mysql',
    title: 'Connecting PHP to MySQL',
    summary:
      'Two approaches — procedural and object-oriented — and the four credentials both of them need.',
    minutes: 17,
    outcomes: ['Creates PHP code to save/retrieve data to and from MySQL'],
    blocks: [
      {
        b: 'lead',
        text: 'PHP offers several extensions for database interaction, with **PDO (PHP Data Objects)** and **MySQLi (MySQL Improved)** the most commonly used. They let PHP connect to database management systems such as MySQL, PostgreSQL and SQLite. This course uses MySQLi, as the syllabus does.',
      },

      { b: 'h2', text: 'The four credentials' },
      {
        b: 'p',
        text: 'To connect, the PHP script needs the database credentials — and there are always the same four.',
      },
      {
        b: 'keyvals',
        items: [
          { k: '$servername', v: 'The hostname or IP address of the database server. In most local development environments this is **`localhost`** — `127.0.0.1` also works.' },
          { k: '$username', v: 'The username used to authenticate. For WAMP and XAMPP the default is usually **`root`**.' },
          { k: '$password', v: 'The password for that user. By default, on WAMP and XAMPP, it is an **empty string** `""`.' },
          { k: '$dbname', v: 'The name of the database you want to connect to. **It must already exist** in MySQL.' },
        ],
      },
      {
        b: 'note',
        tone: 'warn',
        title: 'root with no password is for your laptop only',
        text: 'It is the default on a development machine and a serious risk on a real server. A live site gets its own database user, with a strong password and permission for only the one database it needs.',
      },

      { b: 'h2', text: 'Approach 1 — procedural' },
      {
        b: 'p',
        text: 'The structured approach uses separate **functions**: `mysqli_connect()`, `mysqli_query()`, `mysqli_close()`.',
      },
      {
        b: 'lab',
        spec: {
          lab: 'php',
          title: 'The procedural connection',
          code: `<?php
$servername = "localhost";   // 127.0.0.1 also works
$username   = "root";
$password   = "";
$dbname     = "publications";

// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname);

// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

echo "Connected successfully";

// Close the connection
mysqli_close($conn);
?>`,
          height: 340,
          note: 'Change the database name to `publicationz` and run it again. You get a real "Unknown database" error — because this is a real connection to a real engine.',
        },
      },
      {
        b: 'dl',
        items: [
          {
            term: 'mysqli_connect()',
            desc: 'Attempts to open a new connection to the MySQL server. It takes the four credentials and returns a **MySQLi link identifier** (a connection object) on success, or **false** on failure.',
          },
          {
            term: 'if (!$conn)',
            desc: 'Checks whether the connection failed. If `$conn` is false, the connection was not successful.',
          },
          {
            term: 'die()',
            desc: 'Prints a message and **terminates the script**. If the connection failed there is no point continuing.',
          },
          {
            term: 'mysqli_connect_error()',
            desc: 'Returns a string describing the last connection error, explaining **why** it failed.',
          },
          {
            term: 'mysqli_close()',
            desc: 'Closes the connection. Good practice after the database work is finished, to free up resources.',
          },
        ],
      },

      { b: 'h2', text: 'Approach 2 — object-oriented' },
      {
        b: 'p',
        text: 'The OOP approach uses `new mysqli(...)` to create an **object**, then calls **methods** on it with the `->` arrow.',
      },
      {
        b: 'lab',
        spec: {
          lab: 'php',
          title: 'The object-oriented connection',
          code: `<?php
$servername = "localhost";
$username   = "root";
$password   = "";
$dbname     = "publications";

// Create connection using the OOP approach
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

echo "Connected successfully";

$conn->close();
?>`,
          height: 320,
        },
      },
      {
        b: 'p',
        text: 'The `new mysqli` constructor creates an **object of the mysqli class**, establishing a connection. On success, `$conn` holds an object with properties and methods for interacting with the database — `query()`, `prepare()`, `close()` and others.',
      },
      {
        b: 'note',
        tone: 'exam',
        title: 'Why the OOP check is different',
        text: 'Even when the connection **fails**, `new mysqli` still creates an instance of the class. `$conn` is therefore always an object, so `if (!$conn)` would never be true. You must instead check the **`connect_error` property**: `if ($conn->connect_error)`. This is the single most examined difference between the two approaches.',
      },

      { b: 'h2', text: 'The two approaches side by side' },
      {
        b: 'table',
        head: ['Purpose', 'Procedural', 'Object-oriented'],
        firstColHead: true,
        rows: [
          ['Creating the connection', '`mysqli_connect()`', '`new mysqli()`'],
          ['Checking the connection', '`if (!$conn)`', '`if ($conn->connect_error)`'],
          ['Reading the error', '`mysqli_connect_error()`', '`$conn->connect_error`'],
          ['Running a query', '`mysqli_query($conn, $sql)`', '`$conn->query($sql)`'],
          ['Counting rows', '`mysqli_num_rows($result)`', '`$result->num_rows`'],
          ['Fetching a row', '`mysqli_fetch_assoc($result)`', '`$result->fetch_assoc()`'],
          ['Closing the connection', '`mysqli_close($conn)`', '`$conn->close()`'],
        ],
        caption: 'The same operations, two spellings. Learn both — questions specify which style they want.',
      },

      { b: 'h2', text: 'Creating a database and a table from PHP' },
      {
        b: 'lab',
        spec: {
          lab: 'phpdb',
          title: 'CREATE TABLE, run from PHP',
          code: `<?php
$servername = "localhost";
$username   = "root";
$password   = "";
$dbname     = "practice";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// SQL query to create a table
$sql = "CREATE TABLE employees (
    id         INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name  VARCHAR(50) NOT NULL,
    email      VARCHAR(100) NOT NULL,
    phone      VARCHAR(20)
)";

if ($conn->query($sql) === TRUE) {
    echo "Table employees created successfully";
} else {
    echo "Error creating table: " . $conn->error;
}

$conn->close();
?>`,
          height: 420,
          note: 'Press Run once and the table is created. Press Run **again** and you get "Table employees already exists" — a real error from a real engine. The schema panel below shows the result either way.',
        },
      },
      {
        b: 'note',
        tone: 'tip',
        title: 'Reading `=== TRUE`',
        text: '`$conn->query()` returns **TRUE** for a successful INSERT, UPDATE, DELETE or CREATE, and a **result object** for a successful SELECT. Comparing with `=== TRUE` therefore only makes sense for statements that do not return rows.',
      },

      {
        b: 'challenge',
        spec: {
          id: 'm7c12',
          title: 'Connect and report',
          brief:
            'Write an **object-oriented** connection to the `mydb` database on `localhost` as `root` with an empty password. Check it correctly, print **Connected successfully** on success, and close it afterwards.',
          lang: 'php',
          starter: `<?php
$servername = "localhost";
$username   = "root";
$password   = "";
$dbname     = "mydb";

// Create the connection, check it, report, and close it.

?>`,
          hints: [
            'The OOP constructor is `new mysqli($servername, $username, $password, $dbname);`.',
            'Check with `if ($conn->connect_error) { die(...); }` — **not** `if (!$conn)`.',
            'Close it with `$conn->close();`.',
          ],
          solution: `<?php
$servername = "localhost";
$username   = "root";
$password   = "";
$dbname     = "mydb";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

echo "Connected successfully";

$conn->close();
?>`,
          checks: [
            { kind: 'source', pattern: 'new\\s+mysqli\\s*\\(', label: 'The object-oriented constructor is used' },
            { kind: 'source', pattern: '->connect_error', label: 'The connection is checked with ->connect_error' },
            { kind: 'source', pattern: 'die\\s*\\(', label: 'die() stops the script if the connection fails' },
            { kind: 'source', pattern: '->close\\s*\\(\\s*\\)', label: 'The connection is closed' },
            { kind: 'output', contains: 'Connected successfully', label: 'It reports a successful connection' },
          ],
        },
      },

      {
        b: 'quiz',
        questions: [
          {
            kind: 'mcq',
            q: 'Why is `if (!$conn)` wrong when using `new mysqli`?',
            options: [
              'Because $conn is a string',
              'Because new mysqli always returns an object, even when the connection failed',
              'Because ! is not a PHP operator',
              'It is not wrong — both work identically',
            ],
            answer: 1,
            why: 'The constructor always produces an instance. You must inspect the `connect_error` property instead.',
          },
          {
            kind: 'mcq',
            q: 'What is the default username and password on a WAMP or XAMPP installation?',
            options: [
              'admin and admin',
              'root and an empty string',
              'localhost and 3306',
              'mysql and password',
            ],
            answer: 1,
            why: '`root` with no password — convenient locally, and unacceptable on a live server.',
          },
          {
            kind: 'mcq',
            q: 'Which pair of statements is the **procedural** style?',
            options: [
              '$conn->query($sql) and $conn->close()',
              'mysqli_query($conn, $sql) and mysqli_close($conn)',
              'new mysqli() and $conn->connect_error',
              'PDO::query() and PDO::close()',
            ],
            answer: 1,
            why: 'Procedural uses standalone functions with the connection passed in as the first argument.',
          },
          {
            kind: 'match',
            q: 'Match each procedural function to its object-oriented equivalent.',
            pairs: [
              { left: 'mysqli_connect()', right: 'new mysqli()' },
              { left: 'mysqli_query($conn, $sql)', right: '$conn->query($sql)' },
              { left: 'mysqli_num_rows($result)', right: '$result->num_rows' },
              { left: 'mysqli_close($conn)', right: '$conn->close()' },
            ],
            why: 'The same operations, written two ways. Note that `num_rows` is a **property**, not a method — no brackets.',
          },
          {
            kind: 'tf',
            q: 'The database named in `$dbname` is created automatically if it does not exist.',
            answer: false,
            why: 'It must be created in MySQL **beforehand**. Naming a database that does not exist gives an "Unknown database" error.',
          },
        ],
      },

      {
        b: 'recap',
        items: [
          'Four credentials: servername, username, password, dbname.',
          'Procedural: `mysqli_connect()` → `if (!$conn)` → `mysqli_query()` → `mysqli_close()`.',
          'OOP: `new mysqli()` → `if ($conn->connect_error)` → `$conn->query()` → `$conn->close()`.',
          'The OOP check differs because the constructor always returns an object.',
          '`die()` stops the script when the connection fails; there is no point going on.',
        ],
      },
    ],
  },

  // ── 7.17 ─────────────────────────────────────────────────────
  {
    id: 'm7l17',
    slug: 'crud-with-php',
    title: 'Insert, read, update and delete',
    summary:
      'The four operations every information system is built from — with a real database responding.',
    minutes: 20,
    outcomes: [
      'Creates PHP code to save/retrieve data to and from MySQL',
      'Develop simple web based information systems',
    ],
    blocks: [
      {
        b: 'lead',
        text: 'Four operations cover almost everything a database-backed site does: **create, read, update, delete**. Everything below runs against the live `mydb` database — press Run and watch the schema panel change.',
      },

      { b: 'h2', text: '1. Inserting data' },
      {
        b: 'lab',
        spec: {
          lab: 'phpdb',
          title: 'INSERT a new record',
          code: `<?php
$servername = "localhost";
$username   = "root";
$password   = "";
$dbname     = "mydb";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "INSERT INTO users (username, email, age, gender, agreement)
        VALUES ('Sanduni Rathnayake', 'sanduni@example.com', 19, 'Female', 'yes')";

if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
    echo "<br>The new id is " . $conn->insert_id;
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>`,
          height: 420,
          note: 'Press Run twice and a second copy appears — INSERT does not check for duplicates unless you tell it to. Use **Reset data** in any SQL lab to restore the original three rows.',
        },
      },

      { b: 'h2', text: '2. Reading data' },
      {
        b: 'p',
        text: 'Reading takes five steps: connect, prepare the SQL, execute it, **process the result row by row**, and close. The processing step is the new part.',
      },
      {
        b: 'lab',
        spec: {
          lab: 'phpdb',
          title: 'SELECT and loop through the rows',
          code: `<?php
$conn = new mysqli("localhost", "root", "", "mydb");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql    = "SELECT * FROM users";
$result = $conn->query($sql);

// Check if there are any results
if ($result->num_rows > 0) {
    // Output the data of each row
    while ($row = $result->fetch_assoc()) {
        echo "ID: "         . $row["id"] .
             " - Name: "    . $row["username"] .
             " - Age: "     . $row["age"] .
             " - Gender: "  . $row["gender"] . "<br>";
    }
} else {
    echo "0 results";
}

$conn->close();
?>`,
          height: 400,
          note: 'The `while` loop is the pattern to memorise. `fetch_assoc()` returns the **next** row each time it is called, and **false** when there are none left — which is exactly what ends the loop.',
        },
      },
      {
        b: 'dl',
        items: [
          {
            term: '$conn->query($sql)',
            desc: 'Performs a query. For a successful **SELECT, SHOW, DESCRIBE or EXPLAIN** it returns a **result object**. For a successful **INSERT, UPDATE or DELETE** it returns **TRUE**. If the query fails it returns **FALSE**.',
          },
          {
            term: '$result->num_rows',
            desc: 'A **property** — no brackets — giving the number of rows in the result set as an integer.',
          },
          {
            term: '$result->fetch_assoc()',
            desc: 'Retrieves the next row as an **associative array**, where the keys are the **column names** of the table. Returns **FALSE** when there are no more rows.',
          },
        ],
      },
      {
        b: 'note',
        tone: 'exam',
        title: 'Why the while loop works',
        text: '`while ($row = $result->fetch_assoc())` does two things at once: it **assigns** the next row to `$row`, and then **tests** whether that assignment produced something truthy. When the rows run out, `fetch_assoc()` returns false, the test fails and the loop stops. Being able to explain that line earns full marks.',
      },
      {
        b: 'p',
        text: 'The procedural version does exactly the same thing with different names.',
      },
      {
        b: 'code',
        lang: 'php',
        code: `<?php
$conn = mysqli_connect("localhost", "root", "", "mydb");
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

$sql    = "SELECT * FROM users";
$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) > 0) {
    while ($row = mysqli_fetch_assoc($result)) {
        echo "ID: " . $row["id"] . " - Age: " . $row["age"] . "<br>";
    }
} else {
    echo "0 results";
}

mysqli_close($conn);
?>`,
      },

      { b: 'h2', text: '3. Updating data' },
      {
        b: 'p',
        text: 'To change existing data you must **locate it first**, then update it. Typically the primary key is used to locate the row.',
      },
      {
        b: 'lab',
        spec: {
          lab: 'phpdb',
          title: 'UPDATE one row',
          code: `<?php
$conn = new mysqli("localhost", "root", "", "mydb");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "UPDATE users
        SET email = 'john.newemail@example.com'
        WHERE id = 1";

if ($conn->query($sql) === TRUE) {
    echo "Record updated successfully";
    echo "<br>Rows affected: " . $conn->affected_rows;
} else {
    echo "Error updating record: " . $conn->error;
}

// Show the result
$result = $conn->query("SELECT id, username, email FROM users");
echo "<hr>";
while ($row = $result->fetch_assoc()) {
    echo $row["id"] . " | " . $row["username"] . " | " . $row["email"] . "<br>";
}

$conn->close();
?>`,
          height: 440,
          note: 'Change `WHERE id = 1` to `WHERE id = 2` and run again. Now delete the WHERE line entirely and run — **every** row gets the same email. That is the danger below.',
        },
      },
      {
        b: 'note',
        tone: 'warn',
        title: 'An UPDATE without a WHERE changes every row',
        text: 'There is no confirmation and no undo. `UPDATE users SET email = "x"` will rewrite the email of every single user in the table. Always write the WHERE clause **first**, then the SET.',
      },

      { b: 'h2', text: '4. Deleting data' },
      {
        b: 'lab',
        spec: {
          lab: 'phpdb',
          title: 'DELETE a row',
          code: `<?php
$conn = new mysqli("localhost", "root", "", "mydb");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Show what is there first
echo "<b>Before:</b><br>";
$result = $conn->query("SELECT id, username FROM users");
while ($row = $result->fetch_assoc()) {
    echo $row["id"] . " - " . $row["username"] . "<br>";
}

// Now delete one
$sql = "DELETE FROM users WHERE id = 3";

if ($conn->query($sql) === TRUE) {
    echo "<hr>Record deleted successfully<br>";
} else {
    echo "Error: " . $conn->error;
}

echo "<b>After:</b><br>";
$result = $conn->query("SELECT id, username FROM users");
while ($row = $result->fetch_assoc()) {
    echo $row["id"] . " - " . $row["username"] . "<br>";
}

$conn->close();
?>`,
          height: 460,
          note: 'Run it once and the row goes. Run it again and nothing changes — there is no id 3 any more, so the DELETE affects zero rows and still reports success.',
        },
      },
      {
        b: 'note',
        tone: 'warn',
        title: 'The same warning, louder',
        text: '`DELETE FROM users` with no WHERE clause **empties the entire table**. This is the single most destructive thing you can type. In real work, run the equivalent `SELECT` first to see exactly which rows you are about to lose.',
      },

      { b: 'h2', text: 'Escaping form data' },
      {
        b: 'p',
        text: 'When you collect data from users there could be **special characters or malicious inputs** that compromise the integrity and security of your SQL queries. To prevent this you must sanitise and escape the input, ensuring it is treated as **literal data rather than executable code**.',
      },
      {
        b: 'p',
        text: '`mysqli_real_escape_string()` prepares a string for use in a SQL query by escaping special characters, so the input cannot interfere with query execution or compromise the database.',
      },
      {
        b: 'code',
        lang: 'php',
        code: `$username = mysqli_real_escape_string($conn, $_POST['uname']);
$email    = mysqli_real_escape_string($conn, $_POST['email']);
$age      = mysqli_real_escape_string($conn, $_POST['age']);`,
      },
      {
        b: 'lab',
        spec: {
          lab: 'php',
          title: 'What escaping actually does',
          code: `<?php
$conn = new mysqli("localhost", "root", "", "mydb");

// A perfectly ordinary Irish surname breaks an unescaped query
$name = "O'Brien";

echo "Unescaped: INSERT ... VALUES ('$name')<br>";
echo "&nbsp;&nbsp;→ the quote inside O'Brien ends the string early<br><hr>";

$safe = mysqli_real_escape_string($conn, $name);
echo "Escaped:   INSERT ... VALUES ('$safe')<br>";
echo "&nbsp;&nbsp;→ the quote is now literal data<br><hr>";

// And the malicious version
$attack = "x'; DROP TABLE users; --";
echo "An attack: " . htmlspecialchars($attack) . "<br>";
echo "Escaped:   " . htmlspecialchars(mysqli_real_escape_string($conn, $attack));

$conn->close();
?>`,
          height: 380,
          note: 'The apostrophe in `O\'Brien` is not malicious — it is a surname. Escaping protects against ordinary data as well as against attacks, which is why it is not optional.',
        },
      },
      {
        b: 'note',
        tone: 'tip',
        title: 'Beyond the syllabus: prepared statements',
        text: 'Escaping is what the syllabus teaches, and it works. Professionals now prefer **prepared statements**, which send the SQL and the data to the server separately so the data can never be read as code. You will meet `$conn->prepare()` and `bind_param()` if you continue with PHP.',
      },

      { b: 'h2', text: 'Form to database, end to end' },
      {
        b: 'lab',
        spec: {
          lab: 'form',
          title: 'A form that really writes to the database',
          formHtml: `<form method="post" action="process.php">
  <legend>Data entry form</legend>
  <p>
    <label for="userName">Username: </label>
    <input type="text" name="uname" id="userName" value="Amaya Silva">
  </p>
  <p>
    <label for="email">Email: </label>
    <input type="email" name="email" id="email" value="amaya@example.com">
  </p>
  <p>
    <label for="age">Age: </label>
    <input type="number" name="age" id="age" min="14" max="65" value="18">
  </p>
  <p>
    <input type="radio" name="gender" value="Male"> Male
    <input type="radio" name="gender" value="Female" checked> Female
  </p>
  <p>
    <input type="checkbox" name="agree" value="yes" checked> I agree!
  </p>
  <input type="submit" value="Save to database">
</form>`,
          handler: `<?php
$conn = new mysqli("localhost", "root", "", "mydb");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Collect and sanitise the form data
$username  = mysqli_real_escape_string($conn, $_POST['uname']);
$email     = mysqli_real_escape_string($conn, $_POST['email']);
$age       = mysqli_real_escape_string($conn, $_POST['age']);
$gender    = mysqli_real_escape_string($conn, $_POST['gender']);
$agreement = isset($_POST['agree']) ? "yes" : "no";

// Prepare the SQL query
$sql = "INSERT INTO users (username, email, age, gender, agreement)
        VALUES ('$username', '$email', $age, '$gender', '$agreement')";

// Execute it
if ($conn->query($sql) === TRUE) {
    echo "<p><b>New record created successfully.</b></p>";
} else {
    echo "Error: " . $conn->error;
}

// Show the whole table back
echo "<table border='1' cellpadding='5'><tr>
      <th>id</th><th>username</th><th>age</th><th>gender</th><th>agreed</th></tr>";
$result = $conn->query("SELECT * FROM users");
while ($row = $result->fetch_assoc()) {
    echo "<tr><td>" . $row['id'] . "</td><td>" . $row['username'] .
         "</td><td>" . $row['age'] . "</td><td>" . $row['gender'] .
         "</td><td>" . $row['agreement'] . "</td></tr>";
}
echo "</table>";

$conn->close();
?>`,
          height: 320,
          note: 'Change the name, press **Save to database**, and watch your row appear at the bottom of the table. This is the complete journey: HTML form → HTTP request → `$_POST` → escaping → SQL → a stored row → a SELECT that reads it back.',
        },
      },

      { b: 'h2', text: 'Prefilling a form from the database' },
      {
        b: 'p',
        text: 'A very common pattern: **retrieve** data, **put it into a form**, let the user **edit** it, and **submit** the updated values back. This is the foundation of every Edit Profile, Update Student and Settings page.',
      },
      {
        b: 'lab',
        spec: {
          lab: 'phpdb',
          title: 'The edit-record pattern',
          code: `<?php
$conn = new mysqli("localhost", "root", "", "school");
$id   = 1;

$sql    = "SELECT * FROM students WHERE id = $id";
$result = $conn->query($sql);
$row    = $result->fetch_assoc();

// Now $row['name'], $row['email'] and $row['grade'] hold the record.
?>

<h3>Edit student</h3>

<form method="POST" action="update.php">
  <p>
    Name:
    <input type="text" name="name"
           value="<?php echo $row['name']; ?>">
  </p>
  <p>
    Email:
    <input type="email" name="email"
           value="<?php echo $row['email']; ?>">
  </p>
  <input type="hidden" name="id" value="<?php echo $row['id']; ?>">
  <input type="submit" value="Update">
</form>`,
          height: 440,
          note: 'The form fields arrive **already filled in** — this is called prefilling, or setting form values dynamically. Change `$id` to 2 and run again to load a different student. Note the hidden field carrying the id, so update.php knows which row to change.',
        },
      },

      {
        b: 'challenge',
        spec: {
          id: 'm7c13',
          title: 'Read a table and print it',
          brief:
            'Connect to the **`StudentDB`** database and print every row of the **`StInfo`** table, one per line, showing the **NIC**, the **surname** and the **home distance**. Use `num_rows` to report "0 results" if the table is empty.',
          lang: 'php',
          starter: `<?php
$conn = new mysqli("localhost", "root", "", "StudentDB");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// SELECT everything from StInfo and loop through the rows.

$conn->close();
?>`,
          hints: [
            'The columns are `StNIC`, `Init`, `Surname` and `HDistance`.',
            'The loop is `while ($row = $result->fetch_assoc()) { … }`.',
            'Check first with `if ($result->num_rows > 0)`.',
          ],
          solution: `<?php
$conn = new mysqli("localhost", "root", "", "StudentDB");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql    = "SELECT * FROM StInfo";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        echo "NIC: " . $row["StNIC"] .
             " - Name: " . $row["Init"] . " " . $row["Surname"] .
             " - Home Distance: " . $row["HDistance"] . "<br>";
    }
} else {
    echo "0 results";
}

$conn->close();
?>`,
          checks: [
            { kind: 'source', pattern: 'SELECT[\\s\\S]*StInfo', label: 'A SELECT query reads the StInfo table' },
            { kind: 'source', pattern: 'num_rows', label: 'num_rows is checked before looping' },
            { kind: 'source', pattern: 'while\\s*\\(\\s*\\$\\w+\\s*=\\s*\\$?\\w+(->|_)fetch_assoc', label: 'The rows are read with a while + fetch_assoc loop' },
            { kind: 'output', contains: '200212312512', label: 'The first NIC appears in the output' },
            { kind: 'output', contains: 'Silva', label: 'A surname appears in the output' },
            { kind: 'output', contains: 'Jayasuriya', label: 'The last student is printed too — the loop covers every row' },
          ],
        },
      },

      {
        b: 'quiz',
        questions: [
          {
            kind: 'mcq',
            q: 'What does `$conn->query($sql)` return for a successful SELECT?',
            options: ['TRUE', 'The number of rows', 'A result object', 'An array of rows'],
            answer: 2,
            why: 'SELECT, SHOW, DESCRIBE and EXPLAIN return a **result object**. INSERT, UPDATE and DELETE return TRUE. A failure returns FALSE.',
          },
          {
            kind: 'mcq',
            q: 'What does `fetch_assoc()` return when there are no more rows?',
            options: ['0', 'An empty array', 'FALSE', 'NULL, then an error'],
            answer: 2,
            why: 'It returns FALSE, which is what makes `while ($row = $result->fetch_assoc())` stop.',
          },
          {
            kind: 'mcq',
            q: 'What is wrong with `UPDATE users SET email = "x@y.com";`?',
            options: [
              'The quotes are wrong',
              'It has no WHERE clause, so it changes every row in the table',
              'UPDATE cannot change an email column',
              'Nothing — it is correct',
            ],
            answer: 1,
            why: 'Without a WHERE clause the statement applies to **every** row. The same is true of DELETE.',
          },
          {
            kind: 'mcq',
            q: 'Why is `mysqli_real_escape_string()` used on form input?',
            options: [
              'To make the query run faster',
              'To convert the input to uppercase',
              'To escape special characters so the input is treated as data, not as executable code',
              'To check that the field is not empty',
            ],
            answer: 2,
            why: 'It neutralises characters — such as an apostrophe — that would otherwise change the meaning of the SQL.',
          },
          {
            kind: 'order',
            q: 'Put the steps of retrieving data from a table into order.',
            items: [
              'Connect to the database',
              'Prepare an SQL SELECT query',
              'Execute the query',
              'Check the result and fetch the rows one by one',
              'Close the connection',
            ],
            why: 'Connect, prepare, execute, process, close — the same five steps every time.',
          },
        ],
      },

      {
        b: 'recap',
        items: [
          'INSERT creates, SELECT reads, UPDATE changes, DELETE removes.',
          '`query()` returns a result object for SELECT and TRUE for the others.',
          '`while ($row = $result->fetch_assoc())` reads rows until there are none left.',
          'UPDATE and DELETE without a WHERE clause affect **every row**.',
          'Escape all user input with `mysqli_real_escape_string()` before it reaches a query.',
          'Prefilling: SELECT a row, then echo its values into the `value` attributes of a form.',
        ],
      },
    ],
  },

  // ── 7.18 ─────────────────────────────────────────────────────
  {
    id: 'm7l18',
    slug: 'php-projects',
    title: 'Project: the five exercises',
    summary:
      'The exercises from the resource book, each one buildable and runnable right here.',
    minutes: 30,
    outcomes: ['Develop simple web based information systems'],
    blocks: [
      {
        b: 'lead',
        text: 'The resource book sets five PHP exercises. Each one combines several lessons from this module, and each is the shape of a practical question. Work through them in order — they get harder.',
      },

      { b: 'h2', text: 'Exercise 1 — the number guessing game' },
      {
        b: 'note',
        tone: 'note',
        title: 'The brief',
        text: '*Write a simple number-guessing game in PHP. The script should “think” of a random number between 1 and 100, then give the user five chances to guess it. For each guess, the script should report whether the guessed number was too low, too high, or correct.* Hint: use `rand(1, 100)`.',
      },
      {
        b: 'lab',
        spec: {
          lab: 'form',
          title: 'A working guessing game',
          formHtml: `<h3>Guess the number</h3>
<p>I am thinking of a number between 1 and 100.</p>

<form method="post" action="process.php">
  <input type="hidden" name="secret" value="42">
  <input type="hidden" name="tries" value="1">
  <p>
    <label for="g">Your guess:</label>
    <input type="number" name="guess" id="g" min="1" max="100" value="50">
  </p>
  <input type="submit" value="Guess">
</form>

<p><small>The secret is in a hidden field so you can experiment —
a real game would keep it in a session.</small></p>`,
          handler: `<?php
$secret = (int) $_POST['secret'];
$guess  = (int) $_POST['guess'];
$tries  = (int) $_POST['tries'];

echo "<p>You guessed <b>$guess</b>.</p>";

if ($guess === $secret) {
    echo "<p style='color:#146c43'><b>Correct!</b> The number was $secret.</p>";
} elseif ($guess < $secret) {
    echo "<p>Too <b>low</b>. Try a bigger number.</p>";
} else {
    echo "<p>Too <b>high</b>. Try a smaller number.</p>";
}

if ($tries >= 5) {
    echo "<p>That was your last chance — the number was $secret.</p>";
} else {
    echo "<p>Guess " . $tries . " of 5.</p>";
}
?>`,
          height: 260,
          note: 'Change the hidden `secret` value and play again. To make it genuinely random, replace the hidden field with `rand(1, 100)` stored in a session — which is beyond the syllabus but worth knowing exists.',
        },
      },

      { b: 'h2', text: 'Exercise 2 — the Amazon store selector' },
      {
        b: 'note',
        tone: 'note',
        title: 'The brief',
        text: '*Create a PHP script that displays a form allowing the user to select one of three Amazon stores — amazon.com, amazon.ca and amazon.co.uk — and then jumps to the relevant store based on the user’s choice.*',
      },
      {
        b: 'lab',
        spec: {
          lab: 'form',
          title: 'A select, a switch, and a destination',
          formHtml: `<h3>Choose your Amazon store</h3>

<form method="post" action="process.php">
  <p>
    <label for="store">Store:</label>
    <select name="store" id="store">
      <option value="us">United States</option>
      <option value="ca">Canada</option>
      <option value="uk">United Kingdom</option>
    </select>
  </p>
  <input type="submit" value="Go to store">
</form>`,
          handler: `<?php
$store = $_POST['store'] ?? '';

switch ($store) {
    case "us":
        $url = "https://www.amazon.com";
        break;
    case "ca":
        $url = "https://www.amazon.ca";
        break;
    case "uk":
        $url = "https://www.amazon.co.uk";
        break;
    default:
        $url = "";
}

if ($url === "") {
    echo "<p>Unknown store.</p>";
} else {
    echo "<p>Taking you to <a href='$url' target='_blank'>$url</a></p>";
    // On a real server you would redirect instead:
    // header("Location: $url");
}
?>`,
          height: 220,
          note: 'A real script would use `header("Location: $url");` to jump straight there. That has to be called **before any output**, which is why this version prints a link instead — a genuinely useful thing to know.',
        },
      },

      { b: 'h2', text: 'Exercise 3 — the BMI calculator' },
      {
        b: 'note',
        tone: 'note',
        title: 'The brief',
        text: '*Design a PHP script to display health suggestions based on the Body Mass Index. BMI = kg/m². Under weight below 18.5 · Normal 18.5–24.9 · Overweight 25–29.9 · Obese 30–34.9 · Extremely Obese 35 and above. The height may be entered in cm, m or inches.*',
      },
      {
        b: 'lab',
        spec: {
          lab: 'form',
          title: 'BMI, with unit conversion',
          formHtml: `<h3>Body Mass Index</h3>

<form method="post" action="process.php">
  <p>
    <label for="w">Weight (kg):</label>
    <input type="number" step="0.1" name="weight" id="w" value="68">
  </p>
  <p>
    <label for="h">Height:</label>
    <input type="number" step="0.1" name="height" id="h" value="170">
    <select name="unit">
      <option value="cm">cm</option>
      <option value="m">m</option>
      <option value="in">inch</option>
    </select>
  </p>
  <input type="submit" value="CALCULATE BMI">
</form>`,
          handler: `<?php
$weight = (float) ($_POST['weight'] ?? 0);
$height = (float) ($_POST['height'] ?? 0);
$unit   = $_POST['unit'] ?? 'm';

// Convert every height to metres first
switch ($unit) {
    case "cm": $metres = $height / 100;      break;
    case "in": $metres = $height * 0.0254;   break;
    default:   $metres = $height;
}

if ($metres <= 0) {
    die("<p>Please enter a valid height.</p>");
}

$bmi = $weight / ($metres ** 2);

if ($bmi < 18.5)      { $suggestion = "Under weight"; }
elseif ($bmi <= 24.9) { $suggestion = "Normal"; }
elseif ($bmi <= 29.9) { $suggestion = "Overweight"; }
elseif ($bmi <= 34.9) { $suggestion = "Obese"; }
else                  { $suggestion = "Extremely Obese"; }

echo "<p>Your Body Mass Index is <b>" . round($bmi, 1) .
     "</b>. This is considered <b>$suggestion</b>.</p>";
?>`,
          height: 250,
          note: 'Switch the unit to **inch** and enter 67 — the answer stays roughly the same, because the conversion happens before the calculation. Converting everything to one unit first is the trick that makes this exercise easy.',
        },
      },

      { b: 'h2', text: 'Exercise 4 — the kids’ art gallery' },
      {
        b: 'note',
        tone: 'note',
        title: 'The brief',
        text: '*Design a web page for a kids’ art gallery, in two pages. Page one lets children upload a drawing and enter their name, school and a short description. On submission, page two shows the drawing with the name, school and description.*',
      },
      {
        b: 'lab',
        spec: {
          lab: 'form',
          title: 'Two pages, one submission',
          formHtml: `<h3>Submit your drawing</h3>

<form method="post" action="process.php">
  <p>
    <label for="kid">Name of the Kid:</label>
    <input type="text" name="kid" id="kid" value="Sanuli">
  </p>
  <p>
    <label for="school">School Name:</label>
    <input type="text" name="school" id="school" value="Vidya College">
  </p>
  <p>
    <label for="desc">Description of the drawing:</label><br>
    <textarea name="description" id="desc" rows="3" cols="34">A blue bird sitting on a branch at sunrise.</textarea>
  </p>
  <p>
    <label for="pic">Your drawing:</label>
    <select name="picture" id="pic">
      <option value="media/bird.jpg">bird.jpg</option>
      <option value="media/beach.jpg">beach.jpg</option>
    </select>
  </p>
  <input type="submit" value="Submit drawing">
</form>

<p><small>A real page would use
&lt;input type="file"&gt; with enctype="multipart/form-data".</small></p>`,
          handler: `<?php
$kid     = htmlspecialchars($_POST['kid'] ?? '');
$school  = htmlspecialchars($_POST['school'] ?? '');
$desc    = htmlspecialchars($_POST['description'] ?? '');
$picture = $_POST['picture'] ?? '';

echo "<h3>$kid</h3>";
echo "<p><i>$school</i></p>";
echo "<img src='$picture' alt='" . $desc . "' width='220'>";
echo "<p>$desc</p>";
?>`,
          height: 320,
          note: 'Notice `htmlspecialchars()` on every value before it is printed. Children type all sorts of things, and this is what stops a stray `<` from breaking the page.',
        },
      },
      {
        b: 'note',
        tone: 'tip',
        title: 'About real file uploads',
        text: 'A genuine upload needs `<form enctype="multipart/form-data">`, `<input type="file">`, and the `$_FILES` superglobal with `move_uploaded_file()`. That is beyond this syllabus, but knowing the three pieces exist is worth a mark in a discussion question.',
      },

      { b: 'h2', text: 'Exercise 5 — countries by population' },
      {
        b: 'note',
        tone: 'note',
        title: 'The brief',
        text: '*Create a script for displaying countries in order of population. Ask the user to enter a country name and its population, five countries one at a time. Once the count reaches five, ask the user to select the display order — ascending or descending.*',
      },
      {
        b: 'lab',
        spec: {
          lab: 'form',
          title: 'Five countries, sorted on demand',
          formHtml: `<h3>Countries by population</h3>

<form method="post" action="process.php">
  <p>Enter five countries (millions):</p>

  <p><input type="text" name="c[]" value="Sri Lanka">
     <input type="number" step="0.1" name="p[]" value="22"></p>
  <p><input type="text" name="c[]" value="India">
     <input type="number" step="0.1" name="p[]" value="1428"></p>
  <p><input type="text" name="c[]" value="Maldives">
     <input type="number" step="0.1" name="p[]" value="0.5"></p>
  <p><input type="text" name="c[]" value="Nepal">
     <input type="number" step="0.1" name="p[]" value="30"></p>
  <p><input type="text" name="c[]" value="Bhutan">
     <input type="number" step="0.1" name="p[]" value="0.8"></p>

  <p>
    <label for="order">Display Mode:</label>
    <select name="order" id="order">
      <option value="asc">Ascending</option>
      <option value="desc">Descending</option>
    </select>
  </p>
  <input type="submit" value="Show">
</form>`,
          handler: `<?php
$names       = $_POST['c'] ?? [];
$populations = $_POST['p'] ?? [];
$order       = $_POST['order'] ?? 'asc';

// Build one associative array: country => population
$data = [];
for ($i = 0; $i < count($names); $i++) {
    if (trim($names[$i]) !== '') {
        $data[$names[$i]] = (float) $populations[$i];
    }
}

// Sort by VALUE, keeping the country names attached
if ($order === 'asc') {
    asort($data);
} else {
    arsort($data);
}

echo "<h4>Countries in " . ($order === 'asc' ? 'ascending' : 'descending') .
     " order of population</h4><ol>";
foreach ($data as $country => $people) {
    echo "<li>" . htmlspecialchars($country) . " — $people million</li>";
}
echo "</ol>";
?>`,
          height: 340,
          note: 'Two parallel arrays — `c[]` and `p[]` — arrive from the form and are zipped into one associative array. Then `asort` or `arsort` does the work. Switch the display mode and submit again.',
        },
      },

      { b: 'h2', text: 'A final challenge' },
      {
        b: 'challenge',
        spec: {
          id: 'm7project',
          title: 'Build a marks report from a database',
          brief:
            'Connect to **`StudentDB`**, read every row of **`StInfo`**, and print the results as an **HTML table** with a header row. The table must have a border and show the NIC, initials, surname and home distance. Finish by printing the **number of students** found.',
          lang: 'php',
          starter: `<?php
$conn = new mysqli("localhost", "root", "", "StudentDB");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// 1. SELECT everything from StInfo
// 2. echo an HTML table with a header row
// 3. loop the rows into <tr> elements
// 4. print how many students there were

$conn->close();
?>`,
          hints: [
            'Echo the opening `<table border="1">` and header row **before** the while loop.',
            'Inside the loop, echo one `<tr>` with four `<td>` cells.',
            'Echo the closing `</table>` after the loop.',
            '`$result->num_rows` gives the count — store it before the loop, because fetching moves the pointer.',
          ],
          solution: `<?php
$conn = new mysqli("localhost", "root", "", "StudentDB");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$result = $conn->query("SELECT * FROM StInfo");
$count  = $result->num_rows;

echo "<table border='1' cellpadding='6'>";
echo "<tr><th>NIC</th><th>Initials</th><th>Surname</th><th>Distance</th></tr>";

while ($row = $result->fetch_assoc()) {
    echo "<tr>";
    echo "<td>" . $row['StNIC'] . "</td>";
    echo "<td>" . $row['Init'] . "</td>";
    echo "<td>" . $row['Surname'] . "</td>";
    echo "<td>" . $row['HDistance'] . "</td>";
    echo "</tr>";
}

echo "</table>";
echo "<p>Total students: $count</p>";

$conn->close();
?>`,
          checks: [
            { kind: 'source', pattern: 'SELECT[\\s\\S]*StInfo', label: 'The StInfo table is queried' },
            { kind: 'output', pattern: '<table', label: 'An HTML table is produced' },
            { kind: 'output', pattern: '<th', label: 'The table has a header row using <th>' },
            { kind: 'output', contains: 'Silva', label: 'The first student appears in the table' },
            { kind: 'output', contains: 'Jayasuriya', label: 'The last student appears too' },
            { kind: 'output', contains: '4', label: 'The number of students is printed' },
            { kind: 'source', pattern: 'num_rows', label: 'num_rows is used for the count' },
          ],
        },
      },

      {
        b: 'recap',
        items: [
          'Every exercise combines the same pieces: a form, a superglobal, a control structure, and output.',
          'Convert to one unit before you calculate — the BMI exercise in one line.',
          '`name="x[]"` collects several fields into an array, which a loop then walks.',
          'Escape output with `htmlspecialchars()` whenever it came from a user.',
          'For a database report: query, count, open the table, loop, close the table.',
        ],
      },
    ],
  },
]

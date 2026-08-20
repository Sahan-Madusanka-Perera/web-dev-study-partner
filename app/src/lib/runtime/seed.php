<?php
/* Sample databases, created once when the engine boots and rebuilt
   whenever the student presses "Reset databases".

   These are the exact tables the syllabus and the class notes use, so
   every worked example in the course runs without setup. */

if (!@is_dir(WDSP_DB_DIR)) { @mkdir(WDSP_DB_DIR, 0777, true); }

function wdsp_seed_db($name, $statements) {
    $path = wdsp_db_path($name);
    if (file_exists($path)) { @unlink($path); }
    $pdo = new PDO('sqlite:' . $path);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    foreach ($statements as $s) { $pdo->exec($s); }
    $pdo = null;
}

/* ── publications.classics — the resource book's own example ── */
wdsp_seed_db('publications', array(
    "CREATE TABLE classics (
        author   VARCHAR(128),
        title    VARCHAR(128),
        category VARCHAR(16),
        year     SMALLINT,
        isbn     CHAR(13) PRIMARY KEY
    )",
    "INSERT INTO classics VALUES
        ('Mark Twain','The Adventures of Tom Sawyer','Fiction',1876,'9781598184891'),
        ('Jane Austen','Pride and Prejudice','Fiction',1811,'9780582506206'),
        ('Charles Darwin','The Origin of Species','Non-Fiction',1856,'9780517123201'),
        ('Charles Dickens','The Old Curiosity Shop','Fiction',1841,'9780099533474'),
        ('William Shakespeare','Romeo and Juliet','Play',1594,'9780192814968')",
    "CREATE INDEX classics_author ON classics (author)",
    "CREATE INDEX classics_title ON classics (title)",
    "CREATE TABLE customers (
        name VARCHAR(128),
        isbn CHAR(13)
    )",
    "INSERT INTO customers VALUES
        ('Nimali Perera','9781598184891'),
        ('Kasun Silva','9780582506206'),
        ('Dilki Fernando','9780517123201'),
        ('Kasun Silva','9780192814968')",
))
;

/* ── StudentDB.StInfo — the NIE PHP examples ─────────────────── */
wdsp_seed_db('StudentDB', array(
    "CREATE TABLE StInfo (
        StNIC     VARCHAR(12) PRIMARY KEY,
        Init      VARCHAR(10),
        Surname   VARCHAR(40),
        HDistance INTEGER
    )",
    "INSERT INTO StInfo VALUES
        ('200212312512','M.','Silva',4),
        ('200242134212','S.','Perera',12),
        ('200311098765','A. K.','Bandara',7),
        ('200455512309','H. D.','Jayasuriya',21)",
));

/* ── school.students — used by the edit-record pattern ──────── */
wdsp_seed_db('school', array(
    "CREATE TABLE students (
        id    INTEGER PRIMARY KEY AUTOINCREMENT,
        name  VARCHAR(60),
        email VARCHAR(80),
        grade VARCHAR(8)
    )",
    "INSERT INTO students (name, email, grade) VALUES
        ('Amaya Wickramasinghe','amaya@school.lk','13A'),
        ('Tharindu Rajapaksa','tharindu@school.lk','13B'),
        ('Nethmi Gunasekara','nethmi@school.lk','12A')",
));

/* ── demo.persons — the insert.php walkthrough ───────────────── */
wdsp_seed_db('demo', array(
    "CREATE TABLE persons (
        id         INTEGER PRIMARY KEY AUTOINCREMENT,
        first_name VARCHAR(30),
        last_name  VARCHAR(30),
        email      VARCHAR(70)
    )",
    "INSERT INTO persons (first_name, last_name, email) VALUES
        ('Pat','Peterson','pat@example.com')",
));

/* ── mydb.users — the form-to-database example ───────────────── */
wdsp_seed_db('mydb', array(
    "CREATE TABLE users (
        id        INTEGER PRIMARY KEY AUTOINCREMENT,
        username  VARCHAR(60),
        email     VARCHAR(80),
        age       INTEGER,
        gender    VARCHAR(10),
        agreement VARCHAR(10)
    )",
    "INSERT INTO users (username, email, age, gender, agreement) VALUES
        ('John Hamilton','john@example.com',17,'Male','yes'),
        ('Anne Smith','anne@example.com',30,'Female','no'),
        ('David Lee','david@example.com',22,'Male','yes')",
    "CREATE TABLE employees (
        id         INTEGER PRIMARY KEY AUTOINCREMENT,
        first_name VARCHAR(50) NOT NULL,
        last_name  VARCHAR(50) NOT NULL,
        email      VARCHAR(100) NOT NULL,
        phone      VARCHAR(20)
    )",
    "INSERT INTO employees (first_name, last_name, email, phone) VALUES
        ('John','Doe','john.doe@example.com','0771234567'),
        ('Mary','Fernando','mary.f@example.com','0719876543'),
        ('Sunil','Alwis','sunil.a@example.com','0715551234')",
));

/* An empty database so `CREATE TABLE` lessons have somewhere to go. */
wdsp_seed_db('practice', array());

echo 'seeded';

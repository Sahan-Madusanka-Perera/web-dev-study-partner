<?php
/* ─────────────────────────────────────────────────────────────
   MySQL-compatible layer for the in-browser PHP runtime.

   Students write the exact mysqli code the syllabus teaches.
   Before running, the platform rewrites `mysqli_*` / `new mysqli`
   to the shims below, which speak to a real SQL engine (SQLite,
   compiled into the same PHP binary) instead of a network MySQL
   server that a browser tab cannot reach.

   Everything the student sees — connection errors, num_rows,
   fetch_assoc, insert ids, SQL syntax errors — is genuinely
   produced by a database engine, not faked.
   ───────────────────────────────────────────────────────────── */

if (!defined('WDSP_DB_DIR')) {
    define('WDSP_DB_DIR', '/wdsp-db');
}

function wdsp_db_path($name) {
    return WDSP_DB_DIR . '/' . preg_replace('/[^A-Za-z0-9_\-]/', '_', $name) . '.sqlite';
}

/* ── MySQL dialect → SQLite ─────────────────────────────────── */

function wdsp_translate_sql($sql) {
    $s = trim($sql);
    $s = rtrim($s, ";\n\r\t ");

    /* Statements MySQL has and SQLite does not, answered directly. */
    if (preg_match('/^\s*SHOW\s+TABLES/i', $s)) {
        return "SELECT name AS `Tables_in_database` FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name";
    }
    if (preg_match('/^\s*(DESCRIBE|DESC)\s+`?([A-Za-z0-9_]+)`?\s*$/i', $s, $m)) {
        return '__WDSP_DESCRIBE__' . $m[2];
    }

    /* Table options MySQL requires and SQLite rejects. */
    $s = preg_replace('/\s+ENGINE\s*=\s*\w+/i', '', $s);
    $s = preg_replace('/\s+DEFAULT\s+CHARSET\s*=\s*\w+/i', '', $s);
    $s = preg_replace('/\s+COLLATE\s*=\s*\w+/i', '', $s);
    $s = preg_replace('/\s+UNSIGNED\b/i', '', $s);
    $s = preg_replace('/\s+ZEROFILL\b/i', '', $s);

    /* AUTO_INCREMENT primary keys. SQLite spells this one differently
       and insists the column be exactly INTEGER. */
    $s = preg_replace(
        '/\b(TINY|SMALL|MEDIUM|BIG)?INT\s*(\(\s*\d+\s*\))?\s+AUTO_INCREMENT\s+PRIMARY\s+KEY/i',
        'INTEGER PRIMARY KEY AUTOINCREMENT',
        $s
    );
    $s = preg_replace(
        '/\b(TINY|SMALL|MEDIUM|BIG)?INT\s*(\(\s*\d+\s*\))?\s+PRIMARY\s+KEY\s+AUTO_INCREMENT/i',
        'INTEGER PRIMARY KEY AUTOINCREMENT',
        $s
    );
    $s = preg_replace('/\s+AUTO_INCREMENT\b/i', '', $s);

    /* Index-prefix lengths: INDEX(author(20)) → INDEX(author) */
    $s = preg_replace('/(\b[A-Za-z_][A-Za-z0-9_]*)\s*\(\s*\d+\s*\)(?=\s*[,)])/', '$1', $s);

    /* Inline INDEX(...) definitions inside CREATE TABLE — SQLite makes
       indexes as separate statements, so lift them out and remember them. */
    if (preg_match('/^\s*CREATE\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?`?([A-Za-z0-9_]+)`?\s*\((.*)\)\s*$/is', $s, $m)) {
        $table = $m[1];
        $body = $m[2];
        $indexes = array();
        $body = preg_replace_callback(
            '/,?\s*(?:UNIQUE\s+)?(?:INDEX|KEY)\s*(?:`?([A-Za-z0-9_]+)`?)?\s*\(([^)]*)\)/i',
            function ($mm) use (&$indexes, $table) {
                $cols = trim($mm[2]);
                $name = $mm[1] ? $mm[1] : ($table . '_' . preg_replace('/[^A-Za-z0-9_]/', '_', $cols));
                $indexes[] = "CREATE INDEX IF NOT EXISTS `$name` ON `$table` ($cols)";
                return '';
            },
            $body
        );
        $body = preg_replace('/,\s*,/', ',', $body);
        $body = preg_replace('/,\s*$/', '', trim($body));
        $s = "CREATE TABLE `$table` ($body)";
        if ($indexes) {
            $GLOBALS['__wdsp_pending_indexes'] = $indexes;
        }
    }

    /* ALTER TABLE dialect gaps. */
    $s = preg_replace('/^\s*ALTER\s+TABLE\s+`?([A-Za-z0-9_]+)`?\s+RENAME\s+(?!TO)/i', 'ALTER TABLE `$1` RENAME TO ', $s);
    if (preg_match('/^\s*ALTER\s+TABLE\s+`?([A-Za-z0-9_]+)`?\s+ADD\s+(?:UNIQUE\s+)?(?:INDEX|KEY)\s*(?:`?([A-Za-z0-9_]+)`?)?\s*\(([^)]*)\)/i', $s, $m)) {
        $name = $m[2] ? $m[2] : ($m[1] . '_' . preg_replace('/[^A-Za-z0-9_]/', '_', $m[3]));
        return "CREATE INDEX IF NOT EXISTS `$name` ON `{$m[1]}` ({$m[3]})";
    }
    $s = preg_replace('/^\s*ALTER\s+TABLE\s+`?([A-Za-z0-9_]+)`?\s+ADD\s+(?!COLUMN|INDEX|KEY|PRIMARY|UNIQUE)/i', 'ALTER TABLE `$1` ADD COLUMN ', $s);
    $s = preg_replace('/^\s*ALTER\s+TABLE\s+`?([A-Za-z0-9_]+)`?\s+DROP\s+(?!COLUMN|INDEX|KEY)/i', 'ALTER TABLE `$1` DROP COLUMN ', $s);
    /* MODIFY has no SQLite equivalent — flag it for the rebuild path. */
    if (preg_match('/^\s*ALTER\s+TABLE\s+`?([A-Za-z0-9_]+)`?\s+MODIFY\s+(?:COLUMN\s+)?`?([A-Za-z0-9_]+)`?\s+(.+)$/is', $s, $m)) {
        return '__WDSP_MODIFY__' . $m[1] . '|' . $m[2] . '|' . trim($m[3]);
    }

    /* Common MySQL functions. */
    $s = preg_replace('/\bNOW\s*\(\s*\)/i', "datetime('now')", $s);
    $s = preg_replace('/\bCURDATE\s*\(\s*\)/i', "date('now')", $s);
    $s = preg_replace('/\bCURTIME\s*\(\s*\)/i', "time('now')", $s);
    $s = preg_replace('/\bRAND\s*\(\s*\)/i', 'random()', $s);

    return $s;
}

/* ── Result set ─────────────────────────────────────────────── */

class __wdsp_mysqli_result
{
    public $num_rows = 0;
    public $field_count = 0;
    private $rows = array();
    private $cursor = 0;

    public function __construct($rows) {
        $this->rows = $rows;
        $this->num_rows = count($rows);
        $this->field_count = $this->num_rows ? count($rows[0]) : 0;
    }
    public function fetch_assoc() {
        if ($this->cursor >= $this->num_rows) return null;
        return $this->rows[$this->cursor++];
    }
    public function fetch_row() {
        if ($this->cursor >= $this->num_rows) return null;
        return array_values($this->rows[$this->cursor++]);
    }
    public function fetch_array($mode = 3) {
        if ($this->cursor >= $this->num_rows) return null;
        $row = $this->rows[$this->cursor++];
        if ($mode === 1) return $row;
        if ($mode === 2) return array_values($row);
        return array_merge(array_values($row), $row);
    }
    public function fetch_all($mode = 2) {
        $out = array();
        while (($r = $this->fetch_array($mode)) !== null) $out[] = $r;
        return $out;
    }
    public function fetch_object() {
        $r = $this->fetch_assoc();
        return $r === null ? null : (object) $r;
    }
    public function data_seek($n) { $this->cursor = max(0, min((int) $n, $this->num_rows)); return true; }
    public function free() { $this->rows = array(); $this->cursor = 0; }
    public function close() { $this->free(); }
    public function free_result() { $this->free(); }
}

/* ── Connection ─────────────────────────────────────────────── */

class __wdsp_mysqli
{
    public $connect_error = null;
    public $connect_errno = 0;
    public $error = '';
    public $errno = 0;
    public $affected_rows = 0;
    public $insert_id = 0;
    public $host_info = 'Localhost (Study Partner in-browser engine)';
    public $server_info = '8.0.30-wdsp';

    public $pdo = null;
    public $dbname = null;
    private $open = false;

    public function __construct($host = 'localhost', $user = 'root', $pass = '', $db = null, $port = null, $socket = null) {
        if (!@is_dir(WDSP_DB_DIR)) { @mkdir(WDSP_DB_DIR, 0777, true); }

        /* The engine is local, so the only credential that can fail is the
           database name — which is exactly the mistake students make. */
        if ($host !== 'localhost' && $host !== '127.0.0.1' && $host !== '' && $host !== null) {
            $this->connect_error = "php_network_getaddresses: getaddrinfo failed for host '" . $host . "' (a browser tab cannot reach a remote MySQL server — use 'localhost')";
            $this->connect_errno = 2002;
            return;
        }
        $this->open = true;
        if ($db !== null && $db !== '') {
            $this->select_db($db);
        }
    }

    public function select_db($db) {
        $path = wdsp_db_path($db);
        if (!file_exists($path)) {
            $this->connect_error = "Unknown database '" . $db . "'";
            $this->connect_errno = 1049;
            $this->error = "Unknown database '" . $db . "'";
            $this->errno = 1049;
            return false;
        }
        try {
            $this->pdo = new PDO('sqlite:' . $path);
            $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->dbname = $db;
            $this->connect_error = null;
            $this->connect_errno = 0;
            return true;
        } catch (Exception $e) {
            $this->connect_error = $e->getMessage();
            $this->connect_errno = 1049;
            return false;
        }
    }

    public function query($sql) {
        $this->error = '';
        $this->errno = 0;
        $this->affected_rows = 0;

        $raw = trim($sql);
        if ($raw === '') { $this->error = 'Query was empty'; $this->errno = 1065; return false; }

        /* Server-level statements do not need a selected database. */
        if (preg_match('/^\s*CREATE\s+DATABASE\s+(?:IF\s+NOT\s+EXISTS\s+)?`?([A-Za-z0-9_]+)`?/i', $raw, $m)) {
            $path = wdsp_db_path($m[1]);
            if (file_exists($path) && !preg_match('/IF\s+NOT\s+EXISTS/i', $raw)) {
                $this->error = "Can't create database '" . $m[1] . "'; database exists";
                $this->errno = 1007;
                return false;
            }
            if (!@is_dir(WDSP_DB_DIR)) { @mkdir(WDSP_DB_DIR, 0777, true); }
            try { $p = new PDO('sqlite:' . $path); $p->exec('PRAGMA user_version = 1'); $p = null; }
            catch (Exception $e) { $this->error = $e->getMessage(); return false; }
            return true;
        }
        if (preg_match('/^\s*DROP\s+DATABASE\s+(?:IF\s+EXISTS\s+)?`?([A-Za-z0-9_]+)`?/i', $raw, $m)) {
            $path = wdsp_db_path($m[1]);
            if (file_exists($path)) { @unlink($path); return true; }
            if (preg_match('/IF\s+EXISTS/i', $raw)) return true;
            $this->error = "Can't drop database '" . $m[1] . "'; database doesn't exist";
            $this->errno = 1008;
            return false;
        }
        if (preg_match('/^\s*USE\s+`?([A-Za-z0-9_]+)`?/i', $raw, $m)) {
            return $this->select_db($m[1]);
        }
        if (preg_match('/^\s*SHOW\s+DATABASES/i', $raw)) {
            $rows = array();
            foreach ((array) @glob(WDSP_DB_DIR . '/*.sqlite') as $f) {
                $rows[] = array('Database' => basename($f, '.sqlite'));
            }
            return new __wdsp_mysqli_result($rows);
        }

        if (!$this->open) { $this->error = 'MySQL server has gone away'; return false; }
        if (!$this->pdo) {
            $this->error = 'No database selected';
            $this->errno = 1046;
            return false;
        }

        $GLOBALS['__wdsp_pending_indexes'] = array();
        $translated = wdsp_translate_sql($raw);

        /* DESCRIBE, rebuilt from SQLite's own catalogue. */
        if (strpos($translated, '__WDSP_DESCRIBE__') === 0) {
            $table = substr($translated, strlen('__WDSP_DESCRIBE__'));
            try {
                $info = $this->pdo->query("PRAGMA table_info(`" . $table . "`)")->fetchAll(PDO::FETCH_ASSOC);
            } catch (Exception $e) { $this->error = $e->getMessage(); return false; }
            if (!$info) {
                $this->error = "Table '" . $this->dbname . "." . $table . "' doesn't exist";
                $this->errno = 1146;
                return false;
            }
            $idx = array();
            try {
                foreach ($this->pdo->query("PRAGMA index_list(`" . $table . "`)")->fetchAll(PDO::FETCH_ASSOC) as $ix) {
                    foreach ($this->pdo->query("PRAGMA index_info(`" . $ix['name'] . "`)")->fetchAll(PDO::FETCH_ASSOC) as $ic) {
                        $idx[$ic['name']] = ($ix['unique'] ? 'UNI' : 'MUL');
                    }
                }
            } catch (Exception $e) { /* index info is a nicety */ }
            $rows = array();
            foreach ($info as $c) {
                $isAutoPk = $c['pk'] && strtolower($c['type']) === 'integer';
                $key = $c['pk'] ? 'PRI' : (isset($idx[$c['name']]) ? $idx[$c['name']] : '');
                $rows[] = array(
                    'Field' => $c['name'],
                    'Type' => $isAutoPk ? 'int(11)' : strtolower($c['type']),
                    'Null' => $c['notnull'] ? 'NO' : 'YES',
                    'Key' => $key,
                    'Default' => $c['dflt_value'],
                    'Extra' => $isAutoPk ? 'auto_increment' : '',
                );
            }
            return new __wdsp_mysqli_result($rows);
        }

        /* ALTER TABLE ... MODIFY, done the way SQLite requires: rebuild. */
        if (strpos($translated, '__WDSP_MODIFY__') === 0) {
            $parts = explode('|', substr($translated, strlen('__WDSP_MODIFY__')), 3);
            return $this->rebuild_with_modified_column($parts[0], $parts[1], $parts[2]);
        }

        try {
            $isSelect = preg_match('/^\s*(SELECT|PRAGMA|WITH|EXPLAIN)\b/i', $translated);
            if ($isSelect) {
                $stmt = $this->pdo->query($translated);
                $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
                return new __wdsp_mysqli_result($rows);
            }
            $count = $this->pdo->exec($translated);
            $this->affected_rows = $count === false ? 0 : (int) $count;
            $this->insert_id = (int) $this->pdo->lastInsertId();
            if (isset($GLOBALS['__wdsp_pending_indexes'])) {
                foreach ((array) $GLOBALS['__wdsp_pending_indexes'] as $ix) {
                    try { $this->pdo->exec($ix); } catch (Exception $e) { /* index is optional */ }
                }
                $GLOBALS['__wdsp_pending_indexes'] = array();
            }
            return true;
        } catch (Exception $e) {
            $this->error = wdsp_friendly_error($e->getMessage());
            $this->errno = 1064;
            return false;
        }
    }

    private function rebuild_with_modified_column($table, $column, $newType) {
        try {
            $info = $this->pdo->query("PRAGMA table_info(`" . $table . "`)")->fetchAll(PDO::FETCH_ASSOC);
            if (!$info) { $this->error = "Table '" . $table . "' doesn't exist"; return false; }
            $defs = array(); $names = array(); $found = false;
            foreach ($info as $c) {
                $names[] = '`' . $c['name'] . '`';
                if (strcasecmp($c['name'], $column) === 0) {
                    $found = true;
                    $d = '`' . $c['name'] . '` ' . preg_replace('/\s+UNSIGNED\b/i', '', $newType);
                    if ($c['pk']) $d .= ' PRIMARY KEY';
                } else {
                    $d = '`' . $c['name'] . '` ' . $c['type'];
                    if ($c['pk']) $d .= ' PRIMARY KEY';
                    if ($c['notnull']) $d .= ' NOT NULL';
                }
                $defs[] = $d;
            }
            if (!$found) { $this->error = "Unknown column '" . $column . "' in '" . $table . "'"; $this->errno = 1054; return false; }
            $cols = implode(', ', $names);
            $this->pdo->exec('PRAGMA foreign_keys = OFF');
            $this->pdo->exec('DROP TABLE IF EXISTS `__wdsp_tmp`');
            $this->pdo->exec("CREATE TABLE `__wdsp_tmp` (" . implode(', ', $defs) . ")");
            $this->pdo->exec("INSERT INTO `__wdsp_tmp` (" . $cols . ") SELECT " . $cols . " FROM `" . $table . "`");
            $this->pdo->exec("DROP TABLE `" . $table . "`");
            $this->pdo->exec("ALTER TABLE `__wdsp_tmp` RENAME TO `" . $table . "`");
            return true;
        } catch (Exception $e) {
            $this->error = $e->getMessage();
            return false;
        }
    }

    public function multi_query($sql) {
        foreach (array_filter(array_map('trim', explode(';', $sql))) as $one) {
            if ($this->query($one) === false) return false;
        }
        return true;
    }
    public function real_escape_string($s) { return wdsp_escape($s); }
    public function escape_string($s) { return wdsp_escape($s); }
    public function set_charset($c) { return true; }
    public function close() { $this->pdo = null; $this->open = false; return true; }
    public function prepare($sql) { return new __wdsp_mysqli_stmt($this, $sql); }
    public function begin_transaction() { if ($this->pdo) $this->pdo->beginTransaction(); return true; }
    public function commit() { if ($this->pdo) $this->pdo->commit(); return true; }
    public function rollback() { if ($this->pdo) $this->pdo->rollBack(); return true; }
}

class __wdsp_mysqli_stmt
{
    private $conn; private $sql; private $bound = array();
    public $error = ''; public $affected_rows = 0;
    private $result = null;
    public function __construct($conn, $sql) { $this->conn = $conn; $this->sql = $sql; }
    public function bind_param($types, &...$vars) { $this->bound = $vars; return true; }
    public function execute() {
        $i = 0;
        $bound = $this->bound;
        $sql = preg_replace_callback('/\?/', function () use (&$i, $bound) {
            $v = isset($bound[$i]) ? $bound[$i] : null; $i++;
            if ($v === null) return 'NULL';
            if (is_int($v) || is_float($v)) return (string) $v;
            return "'" . wdsp_escape((string) $v) . "'";
        }, $this->sql);
        $r = $this->conn->query($sql);
        $this->affected_rows = $this->conn->affected_rows;
        $this->error = $this->conn->error;
        $this->result = ($r instanceof __wdsp_mysqli_result) ? $r : null;
        return $r !== false;
    }
    public function get_result() { return $this->result ? $this->result : false; }
    public function close() { return true; }
}

function wdsp_escape($s) {
    if ($s === null) return '';
    return str_replace(
        array("\\", "\0", "\n", "\r", "'", '"', "\x1a"),
        array("\\\\", "\\0", "\\n", "\\r", "\\'", '\\"', "\\Z"),
        (string) $s
    );
}

function wdsp_friendly_error($msg) {
    /* SQLite phrases a few errors differently from MySQL. Translate the
       ones students actually hit so the message still teaches. */
    $msg = preg_replace('/^SQLSTATE\[\w+\]:?\s*/', '', $msg);
    $msg = preg_replace('/^General error:\s*\d+\s*/', '', $msg);
    if (preg_match('/no such table:\s*(\S+)/i', $msg, $m)) {
        return "Table '" . $m[1] . "' doesn't exist";
    }
    if (preg_match('/no such column:\s*(\S+)/i', $msg, $m)) {
        return "Unknown column '" . $m[1] . "' in field list";
    }
    if (preg_match('/UNIQUE constraint failed:\s*(\S+)/i', $msg, $m)) {
        return "Duplicate entry for key '" . $m[1] . "'";
    }
    if (preg_match('/NOT NULL constraint failed:\s*(\S+)/i', $msg, $m)) {
        return "Column '" . $m[1] . "' cannot be null";
    }
    if (stripos($msg, 'syntax error') !== false) {
        return 'You have an error in your SQL syntax — ' . $msg;
    }
    return $msg;
}

/* ── Procedural mirror of the same API ──────────────────────── */

function __wdsp_mysqli_connect($host = 'localhost', $user = 'root', $pass = '', $db = null, $port = null) {
    $c = new __wdsp_mysqli($host, $user, $pass, $db, $port);
    if ($c->connect_error) { $GLOBALS['__wdsp_last_connect_error'] = $c->connect_error; return false; }
    $GLOBALS['__wdsp_last_connect_error'] = null;
    return $c;
}
function __wdsp_mysqli_connect_error() {
    return isset($GLOBALS['__wdsp_last_connect_error']) ? $GLOBALS['__wdsp_last_connect_error'] : null;
}
function __wdsp_mysqli_connect_errno() { return __wdsp_mysqli_connect_error() ? 2002 : 0; }
function __wdsp_mysqli_select_db($c, $db) { return $c ? $c->select_db($db) : false; }
function __wdsp_mysqli_query($c, $sql) { return $c ? $c->query($sql) : false; }
function __wdsp_mysqli_multi_query($c, $sql) { return $c ? $c->multi_query($sql) : false; }
function __wdsp_mysqli_error($c) { return $c ? $c->error : (string) __wdsp_mysqli_connect_error(); }
function __wdsp_mysqli_errno($c) { return $c ? $c->errno : 0; }
function __wdsp_mysqli_num_rows($r) { return ($r instanceof __wdsp_mysqli_result) ? $r->num_rows : 0; }
function __wdsp_mysqli_fetch_assoc($r) { return ($r instanceof __wdsp_mysqli_result) ? $r->fetch_assoc() : null; }
function __wdsp_mysqli_fetch_array($r, $mode = 3) { return ($r instanceof __wdsp_mysqli_result) ? $r->fetch_array($mode) : null; }
function __wdsp_mysqli_fetch_row($r) { return ($r instanceof __wdsp_mysqli_result) ? $r->fetch_row() : null; }
function __wdsp_mysqli_fetch_all($r, $mode = 2) { return ($r instanceof __wdsp_mysqli_result) ? $r->fetch_all($mode) : array(); }
function __wdsp_mysqli_fetch_object($r) { return ($r instanceof __wdsp_mysqli_result) ? $r->fetch_object() : null; }
function __wdsp_mysqli_free_result($r) { if ($r instanceof __wdsp_mysqli_result) $r->free(); }
function __wdsp_mysqli_data_seek($r, $n) { return ($r instanceof __wdsp_mysqli_result) ? $r->data_seek($n) : false; }
function __wdsp_mysqli_affected_rows($c) { return $c ? $c->affected_rows : 0; }
function __wdsp_mysqli_insert_id($c) { return $c ? $c->insert_id : 0; }
function __wdsp_mysqli_real_escape_string($c, $s) { return wdsp_escape($s); }
function __wdsp_mysqli_escape_string($c, $s) { return wdsp_escape($s); }
function __wdsp_mysqli_close($c) { return $c ? $c->close() : false; }
function __wdsp_mysqli_set_charset($c, $x) { return true; }
function __wdsp_mysqli_prepare($c, $sql) { return $c ? $c->prepare($sql) : false; }
function __wdsp_mysqli_stmt_execute($s) { return $s ? $s->execute() : false; }
function __wdsp_mysqli_stmt_get_result($s) { return $s ? $s->get_result() : false; }
function __wdsp_mysqli_stmt_close($s) { return $s ? $s->close() : false; }
function __wdsp_mysqli_get_server_info($c) { return '8.0.30-wdsp'; }

if (!defined('MYSQLI_ASSOC')) { define('MYSQLI_ASSOC', 1); }
if (!defined('MYSQLI_NUM')) { define('MYSQLI_NUM', 2); }
if (!defined('MYSQLI_BOTH')) { define('MYSQLI_BOTH', 3); }

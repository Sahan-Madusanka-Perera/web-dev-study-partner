import type { Lesson } from '../../types/content'

export const m7LessonsB: Lesson[] = [
  // ── 7.6 ──────────────────────────────────────────────────────
  {
    id: 'm7l6',
    slug: 'conditions',
    title: 'Conditions: if, else and elseif',
    summary:
      'Making a page behave differently for different people — the point of a server language.',
    minutes: 15,
    outcomes: ['Creates PHP code to save/retrieve data to and from MySQL', 'Develop simple web based information systems'],
    blocks: [
      {
        b: 'lead',
        text: '**If** conditions let you execute specific blocks of code depending on whether a given condition evaluates to true or false. This control structure is fundamental to creating dynamic and responsive applications — it is the moment a page stops being a document and starts being a program.',
      },

      { b: 'h2', text: 'if' },
      {
        b: 'code',
        lang: 'php',
        code: `if (condition) {
    /* code to be executed if condition is true */
}`,
      },
      {
        b: 'lab',
        spec: {
          lab: 'php',
          title: 'A simple if',
          code: `<?php
$age = 20;

if ($age >= 18) {
    echo "You are eligible to vote.";
}
?>`,
          height: 200,
          note: 'Change `$age` to 15 and run it again. Nothing at all is printed — there is no else branch, so when the condition is false the script simply carries on.',
        },
      },

      { b: 'h2', text: 'if … else' },
      {
        b: 'p',
        text: 'Executes one block when the condition is true, and another when it is false.',
      },
      {
        b: 'lab',
        spec: {
          lab: 'php',
          title: 'Two outcomes',
          code: `<?php
$marks = 42;

if ($marks >= 50) {
    echo "You passed the exam.";
} else {
    echo "You failed the exam.";
}

echo "<hr>";

$age1 = 60;
$age2 = 55;

if ($age1 > $age2) {
    echo "Age 1 is greater than Age 2";
} else {
    echo "Age 2 is greater than Age 1";
}
?>`,
          height: 300,
        },
      },

      { b: 'h2', text: 'if … elseif … else' },
      {
        b: 'p',
        text: 'Tests multiple conditions in order. PHP checks each one from the top and runs the **first** block whose condition is true — then stops. The final `else` catches everything that matched nothing.',
      },
      {
        b: 'lab',
        spec: {
          lab: 'php',
          title: 'Sri Lankan A/L grades',
          code: `<?php
$marks = 60;

if ($marks >= 75) {
    echo "Your Grade is A";
} elseif ($marks >= 65) {
    echo "Your Grade is B";
} elseif ($marks >= 55) {
    echo "Your Grade is C";
} elseif ($marks >= 35) {
    echo "Your Grade is S";
} else {
    echo "Sit the exam again";
}
?>`,
          height: 300,
          note: 'Try marks of 80, 60, 40 and 20. Then try reversing the order — putting `>= 35` first — and watch every mark suddenly become an S. Order is everything in an elseif chain.',
        },
      },
      {
        b: 'note',
        tone: 'exam',
        title: 'Why order matters',
        text: 'A mark of 80 satisfies `>= 75`, `>= 65`, `>= 55` **and** `>= 35`. Only the first match runs, so the conditions must be written from the **most demanding downwards**. Getting this backwards is the classic mistake in grade-calculation questions.',
      },

      { b: 'h2', text: 'Nested if' },
      {
        b: 'p',
        text: 'An `if` statement inside another `if` is a **nested if**. Use it when a second question only makes sense once the first is answered.',
      },
      {
        b: 'code',
        lang: 'php',
        code: `<?php
$age = 25;
$hasLicence = true;

if ($age >= 18) {
    if ($hasLicence == true) {
        echo "You can drive the car.";
    }
}
?>`,
      },
      {
        b: 'p',
        text: 'An `if` can also be nested inside an `else`:',
      },
      {
        b: 'lab',
        spec: {
          lab: 'php',
          title: 'if inside else',
          code: `<?php
$marks = 42;

if ($marks >= 75) {
    echo "You got an A grade.";
} else {
    if ($marks >= 50) {
        echo "You passed the exam.";
    } else {
        echo "You failed the exam.";
    }
}
?>`,
          height: 270,
          note: 'This does exactly what an elseif chain does — which is why elseif exists. Nesting more than two levels deep is a sign the logic should be flattened.',
        },
      },

      { b: 'h2', text: 'The shorthand if — the ternary operator' },
      {
        b: 'p',
        text: 'The shorthand `if`-`else` in PHP is called the **ternary operator**. It writes a compact form of an if-else statement on a single line.',
      },
      {
        b: 'code',
        lang: 'php',
        code: `condition ? true_value : false_value;

// condition    — the expression to be evaluated
// true_value   — the value returned if it is true
// false_value  — the value returned if it is false`,
      },
      {
        b: 'lab',
        spec: {
          lab: 'php',
          title: 'The ternary operator',
          code: `<?php
$age = 20;

$message = ($age >= 18) ? "You are an adult." : "You are a minor.";
echo $message;

echo "<hr>";

// Ternaries can be nested — but readability suffers fast.
$score = 85;
$grade = ($score >= 90) ? "A"
       : (($score >= 80) ? "B"
       : (($score >= 70) ? "C" : "F"));
echo "Grade: $grade";
?>`,
          height: 300,
          note: 'The nested version works, but compare it with the elseif chain above and judge for yourself which one you would rather debug at 11 p.m.',
        },
      },

      {
        b: 'challenge',
        spec: {
          id: 'm7c4',
          title: 'The BMI classifier',
          brief:
            'Body Mass Index is **weight ÷ height²**, with weight in kilograms and height in metres. For a person of **68 kg** and **1.7 m**, calculate the BMI and print the classification using an if-elseif chain: **Under weight** below 18.5, **Normal** 18.5–24.9, **Overweight** 25–29.9, **Obese** 30–34.9, **Extremely Obese** 35 and above.',
          lang: 'php',
          starter: `<?php
$weight = 68;    // kg
$height = 1.7;   // m

// 1. Calculate the BMI.
// 2. Print the classification with if / elseif / else.

?>`,
          hints: [
            'Squaring is `$height * $height`, or `$height ** 2`.',
            '68 ÷ (1.7 × 1.7) = 23.5, which falls in the Normal band.',
            'Write the conditions from the **highest** band downwards, or from the lowest upwards — just be consistent, and remember only the first match runs.',
          ],
          solution: `<?php
$weight = 68;
$height = 1.7;

$bmi = $weight / ($height ** 2);

echo "Your Body Mass Index is " . round($bmi, 1) . ". ";

if ($bmi < 18.5) {
    echo "This is considered Under weight";
} elseif ($bmi <= 24.9) {
    echo "This is considered Normal";
} elseif ($bmi <= 29.9) {
    echo "This is considered Overweight";
} elseif ($bmi <= 34.9) {
    echo "This is considered Obese";
} else {
    echo "This is considered Extremely Obese";
}
?>`,
          checks: [
            { kind: 'source', pattern: '\\$height\\s*\\*\\s*\\$height|\\$height\\s*\\*\\*\\s*2|pow\\s*\\(', label: 'The height is squared' },
            { kind: 'output', pattern: '23(\\.5)?', label: 'The BMI (about 23.5) is printed' },
            { kind: 'output', contains: 'normal', label: 'The classification "Normal" is printed' },
            { kind: 'source', pattern: 'elseif|else\\s+if', label: 'An elseif chain is used' },
            { kind: 'source', pattern: '18\\.5', label: 'The 18.5 boundary appears in the conditions' },
          ],
        },
      },

      {
        b: 'quiz',
        questions: [
          {
            kind: 'mcq',
            q: 'What does this print when `$marks` is 80?',
            code: `if ($marks >= 35) {
    echo "S";
} elseif ($marks >= 75) {
    echo "A";
}`,
            codeLang: 'php',
            options: ['A', 'S', 'Both S and A', 'Nothing'],
            answer: 1,
            why: '80 satisfies the **first** condition, so `S` prints and the chain stops. The conditions are in the wrong order — the most demanding must come first.',
          },
          {
            kind: 'mcq',
            q: 'Which is the correct ternary syntax?',
            options: [
              '$x = if ($a > $b) then "yes" else "no";',
              '$x = ($a > $b) ? "yes" : "no";',
              '$x = ($a > $b) : "yes" ? "no";',
              '$x = ($a > $b) => "yes" | "no";',
            ],
            answer: 1,
            why: '`condition ? true_value : false_value` — question mark first, then colon.',
          },
          {
            kind: 'tf',
            q: 'In an if-elseif-else chain, more than one block can run if several conditions are true.',
            answer: false,
            why: 'Only the **first** matching block runs. The rest are skipped entirely, whether or not their conditions would also have been true.',
          },
          {
            kind: 'fill',
            q: 'Which keyword catches every case that matched none of the earlier conditions?',
            accept: ['else'],
            why: '`else` has no condition of its own — it runs when nothing above it matched.',
            placeholder: 'keyword',
          },
        ],
      },

      {
        b: 'recap',
        items: [
          '`if (condition) { }` · `if … else` · `if … elseif … else`.',
          'Only the first matching branch runs — so order the conditions from most demanding downwards.',
          'Nested ifs work but flatten into an elseif chain more readably.',
          'The ternary `condition ? a : b` is the shorthand if-else.',
        ],
      },
    ],
  },

  // ── 7.7 ──────────────────────────────────────────────────────
  {
    id: 'm7l7',
    slug: 'switch',
    title: 'The switch statement',
    summary:
      'A cleaner way to compare one variable against many fixed values — and the `break` that everyone forgets.',
    minutes: 12,
    outcomes: ['Creates PHP code to save/retrieve data to and from MySQL'],
    blocks: [
      {
        b: 'lead',
        text: 'The `switch` statement performs different actions based on different conditions. It is a **cleaner and more readable** way to compare one variable against multiple fixed values than a long chain of `elseif`s.',
      },

      { b: 'h2', text: 'The syntax' },
      {
        b: 'code',
        lang: 'php',
        code: `switch ($variable) {
    case value1:
        /* code to run if variable equals value1 */
        break;
    case value2:
        /* code to run if variable equals value2 */
        break;
    default:
        /* code to run if variable matches no case */
}`,
      },
      {
        b: 'dl',
        items: [
          { term: 'switch', desc: 'The keyword that initiates the statement.' },
          { term: 'variable', desc: 'The variable whose value you want to compare against each case.' },
          {
            term: 'case',
            desc: 'Each possible value the variable can have. If the variable matches a case value, the corresponding block of code is executed.',
          },
          {
            term: 'break',
            desc: 'Ends the switch once a case has run. **Without `break`, PHP continues executing the following cases** — behaviour known as **fall-through**.',
          },
          {
            term: 'default',
            desc: 'An optional case executed if the variable does not match any of the specified values. It goes at the end.',
          },
        ],
      },

      { b: 'h2', text: 'A worked example' },
      {
        b: 'lab',
        spec: {
          lab: 'php',
          title: 'Days of the week',
          code: `<?php
$day = "Wednesday";

switch ($day) {
    case "Monday":
        echo "Today is Monday.";
        break;
    case "Tuesday":
        echo "Today is Tuesday.";
        break;
    case "Wednesday":
        echo "Today is Wednesday.";
        break;
    case "Thursday":
        echo "Today is Thursday.";
        break;
    case "Friday":
        echo "Today is Friday.";
        break;
    default:
        echo "Invalid day.";
}
?>`,
          height: 380,
          note: 'Change `$day` to "Sunday" and the `default` case answers instead. Change it to "wednesday" in lowercase and you also get the default — switch comparisons are case sensitive.',
        },
      },

      { b: 'h2', text: 'Fall-through' },
      {
        b: 'p',
        text: 'This is the behaviour that trips people up, and it is examined regularly. Remove a `break` and execution **falls through** into the next case, running its code too — regardless of whether that case matched.',
      },
      {
        b: 'lab',
        spec: {
          lab: 'php',
          title: 'What happens without break',
          code: `<?php
$number = 2;

echo "<b>With break:</b><br>";
switch ($number) {
    case 1: echo "Number is 1<br>"; break;
    case 2: echo "Number is 2<br>"; break;
    case 3: echo "Number is 3<br>"; break;
    default: echo "Not 1, 2 or 3<br>";
}

echo "<hr><b>Without break:</b><br>";
switch ($number) {
    case 1: echo "Number is 1<br>";
    case 2: echo "Number is 2<br>";
    case 3: echo "Number is 3<br>";
    default: echo "Not 1, 2 or 3<br>";
}
?>`,
          height: 400,
          note: 'The second switch prints **three** lines: case 2 matched, then execution fell straight through case 3 and default without checking them.',
        },
      },
      {
        b: 'note',
        tone: 'tip',
        title: 'Deliberate fall-through',
        text: 'Occasionally you want it — several cases sharing one block. `case "Saturday": case "Sunday": echo "Weekend"; break;` handles both days with one piece of code. That is intentional; an accidental missing `break` is not.',
      },

      { b: 'h2', text: 'switch or elseif?' },
      {
        b: 'compare',
        left: {
          title: 'Use switch when',
          items: [
            'You are comparing **one variable** against fixed values',
            'The values are exact — a day name, a colour, a menu choice',
            'There are more than three of them',
          ],
        },
        right: {
          title: 'Use elseif when',
          items: [
            'The conditions are **ranges** — marks, ages, prices',
            'Different conditions test different variables',
            'The tests use `<`, `>` or combined logic',
          ],
        },
      },
      {
        b: 'note',
        tone: 'exam',
        title: 'Why grades use elseif, not switch',
        text: 'A `switch` compares for **equality only**. You cannot write `case >= 75:`. That is why every grade-boundary question in this syllabus uses an if-elseif chain, and every menu-choice question uses a switch.',
      },

      {
        b: 'challenge',
        spec: {
          id: 'm7c5',
          title: 'Redirect to the right Amazon store',
          brief:
            'A visitor has chosen a store. Using a **switch**, print the correct address: `amazon.com` for `"us"`, `amazon.ca` for `"ca"`, and `amazon.co.uk` for `"uk"`. Anything else must print **Unknown store**. The variable is already set to `"uk"`.',
          lang: 'php',
          starter: `<?php
$store = "uk";

// Write a switch statement that prints the right address.

?>`,
          hints: [
            'The shape is `switch ($store) { case "us": … break; … default: … }`.',
            'Do not forget `break` after each case, or the later ones will run too.',
            '`default` handles every value you did not list.',
          ],
          solution: `<?php
$store = "uk";

switch ($store) {
    case "us":
        echo "amazon.com";
        break;
    case "ca":
        echo "amazon.ca";
        break;
    case "uk":
        echo "amazon.co.uk";
        break;
    default:
        echo "Unknown store";
}
?>`,
          checks: [
            { kind: 'source', pattern: 'switch\\s*\\(', label: 'A switch statement is used' },
            { kind: 'source', pattern: 'case\\s+["\']us["\']', label: 'There is a case for "us"' },
            { kind: 'source', pattern: 'default\\s*:', label: 'There is a default case' },
            { kind: 'source', pattern: 'break\\s*;[\\s\\S]*break\\s*;', label: 'break is used to end the cases' },
            { kind: 'output', contains: 'amazon.co.uk', label: 'The output is amazon.co.uk' },
            { kind: 'output', contains: 'amazon.com', not: true, label: 'No other store address leaked through — the breaks work' },
          ],
        },
      },

      {
        b: 'quiz',
        questions: [
          {
            kind: 'mcq',
            q: 'What does this print?',
            code: `$colour = "blue";
switch ($colour) {
    case "red":   echo "R";
    case "blue":  echo "B";
    case "green": echo "G";
    default:      echo "D";
}`,
            codeLang: 'php',
            options: ['B', 'BGD', 'RBGD', 'D'],
            answer: 1,
            why: 'There are no `break` statements. Case "blue" matches, then execution falls through green and default — printing **BGD**.',
          },
          {
            kind: 'mcq',
            q: 'Which situation is a `switch` least suited to?',
            options: [
              'Choosing an action from a menu',
              'Assigning a grade from a range of marks',
              'Reacting to a selected colour',
              'Handling a chosen day of the week',
            ],
            answer: 1,
            why: 'A switch compares for **equality**, so it cannot express `>= 75`. Ranges need an if-elseif chain.',
          },
          {
            kind: 'tf',
            q: 'The `default` case is compulsory in a switch statement.',
            answer: false,
            why: 'It is optional. Without it, a value matching no case simply does nothing — which is often a bug worth guarding against.',
          },
          {
            kind: 'fill',
            q: 'What is the behaviour called when a missing `break` lets execution continue into the next case?',
            accept: ['fall-through', 'fall through', 'fallthrough', 'falling through'],
            why: 'Fall-through. Useful when deliberate, a bug when accidental.',
            placeholder: 'two words',
          },
        ],
      },

      {
        b: 'recap',
        items: [
          '`switch ($var) { case value: … break; default: … }`',
          '`break` ends the switch; without it, execution falls through into later cases.',
          '`default` is optional and catches unmatched values.',
          'switch compares equality only — use elseif for ranges.',
        ],
      },
    ],
  },

  // ── 7.8 ──────────────────────────────────────────────────────
  {
    id: 'm7l8',
    slug: 'loops',
    title: 'Loops',
    summary:
      'Four kinds of loop, when each is the right one, and how to leave early.',
    minutes: 18,
    outcomes: ['Creates PHP code to save/retrieve data to and from MySQL'],
    blocks: [
      {
        b: 'lead',
        text: 'Loops execute the same block of code repeatedly as long as a certain condition is met. There are **four** main types in PHP: `for`, `foreach`, `while` and `do-while`.',
      },

      { b: 'h2', text: 'The for loop' },
      {
        b: 'p',
        text: 'Used when you know **in advance** how many times you want to execute a statement or block. It takes three parameters: an **initialization** expression, a **condition** expression, and a **modification** expression.',
      },
      {
        b: 'code',
        lang: 'php',
        code: `for (initialization; condition; increment) {
    // code to be executed
}`,
      },
      {
        b: 'lab',
        spec: {
          lab: 'php',
          title: 'A times table',
          code: `<?php
for ($count = 1; $count <= 12; ++$count) {
    echo "$count times 12 is " . $count * 12 . "<br>";
}
?>`,
          height: 300,
          note: 'Change `<= 12` to `<= 5`, or `++$count` to `$count += 2`, and watch the loop follow. All three parts of the `for` header are yours to control.',
        },
      },

      { b: 'h2', text: 'The while loop' },
      {
        b: 'p',
        text: 'Executes a block **as long as the specified condition is true**. It checks the condition **before** each pass, so it may run zero times.',
      },
      {
        b: 'p',
        text: 'You can control how many times a while loop executes in three ways: by changing the **control variable**, by changing the **condition**, or by changing the **increment or decrement** of the control variable.',
      },
      {
        b: 'lab',
        spec: {
          lab: 'php',
          title: 'while, counting up',
          code: `<?php
$x = 1;

while ($x <= 5) {
    echo "The number is: $x <br>";
    $x++;
}
?>`,
          height: 240,
          note: 'Delete the `$x++;` line and press Run. The condition never becomes false — an **infinite loop**. The engine will stop it, but on a real server it would hang the page.',
        },
      },
      {
        b: 'note',
        tone: 'warn',
        title: 'Every while loop needs an exit',
        text: 'Something inside the loop **must** eventually make the condition false. Ninety per cent of infinite loops are a forgotten `$x++`.',
      },

      { b: 'h2', text: 'The do-while loop' },
      {
        b: 'p',
        text: 'A variation of the while loop that **always executes the block once**, then checks the condition and repeats while it stays true.',
      },
      {
        b: 'lab',
        spec: {
          lab: 'php',
          title: 'do-while runs at least once',
          code: `<?php
echo "<b>A condition that is true:</b><br>";
$x = 1;
do {
    echo "The number is: $x <br>";
    $x++;
} while ($x <= 5);

echo "<hr><b>A condition that is false from the start:</b><br>";
$x = 10;
do {
    echo "The number is: $x <br>";
    $x++;
} while ($x <= 5);
?>`,
          height: 380,
          note: 'In the second loop `$x` is already greater than 5 when the program reaches it — yet it still prints once, because a do-while checks **after** executing.',
        },
      },
      {
        b: 'table',
        head: ['', '`while`', '`do-while`'],
        firstColHead: true,
        rows: [
          ['Condition', 'Checked **before** execution', 'Checked **after** execution'],
          ['Minimum runs', 'May execute **0** times', 'Executes **at least 1** time'],
          ['Syntax', '`while (condition) { }`', '`do { } while (condition);`'],
          ['Use case', 'When execution depends entirely on the condition', 'When the code must run at least once'],
        ],
      },
      {
        b: 'note',
        tone: 'exam',
        title: 'The semicolon',
        text: 'A `do-while` ends with a **semicolon** after the closing bracket: `} while ($x <= 5);`. A plain `while` loop does not. Leaving it out is a parse error.',
      },

      { b: 'h2', text: 'The foreach loop' },
      {
        b: 'p',
        text: 'Used to loop through **arrays**. For every iteration, the value of the current array element is assigned to a variable and the array pointer moves on, until it reaches the last element.',
      },
      {
        b: 'lab',
        spec: {
          lab: 'php',
          title: 'foreach, both forms',
          code: `<?php
// Indexed array — value only
$colors = array("red", "green", "blue", "yellow");

foreach ($colors as $color) {
    echo "$color <br>";
}

echo "<hr>";

// Associative array — key AND value
$ages = array("Peter" => "35", "Ben" => "37", "Joe" => "43");

foreach ($ages as $name => $age) {
    echo "$name is $age years old.<br>";
}
?>`,
          height: 340,
          note: 'Arrays get a lesson of their own next. For now, notice the two shapes: `as $value` for a plain list, and `as $key => $value` when the keys matter too.',
        },
      },

      { b: 'h2', text: 'Nested loops' },
      {
        b: 'p',
        text: 'Loops can be nested inside each other — useful with multidimensional arrays, or for building tables.',
      },
      {
        b: 'lab',
        spec: {
          lab: 'php',
          title: 'A loop inside a loop',
          code: `<?php
for ($i = 1; $i <= 3; $i++) {
    echo "Outer Loop iteration $i<br>";
    for ($j = 1; $j <= 3; $j++) {
        echo "- Inner iteration $j<br>";
    }
    echo "<br>";
}
?>`,
          height: 340,
          note: 'The inner loop runs completely for **each** pass of the outer loop — three outer passes × three inner passes = nine inner iterations.',
        },
      },

      { b: 'h2', text: 'break and continue' },
      {
        b: 'compare',
        left: {
          title: '`break`',
          items: ['Exits the loop **immediately**', 'Nothing after it runs, and the loop does not resume', 'Use it when you have found what you were looking for'],
        },
        right: {
          title: '`continue`',
          items: ['Skips **the current iteration** only', 'The loop carries on with the next pass', 'Use it to ignore one item without abandoning the loop'],
        },
      },
      {
        b: 'lab',
        spec: {
          lab: 'php',
          title: 'break versus continue',
          code: `<?php
echo "<b>With break at 5:</b><br>";
for ($x = 0; $x < 10; $x++) {
    if ($x == 5) {
        break;
    }
    echo "The number is: $x <br>";
}

echo "<hr><b>With continue at 5:</b><br>";
for ($x = 0; $x < 7; $x++) {
    if ($x == 5) {
        continue;
    }
    echo "The number is: $x <br>";
}
?>`,
          height: 400,
          note: '`break` stops at 4 and never returns. `continue` skips only the 5 — notice that 6 still prints.',
        },
      },

      {
        b: 'challenge',
        spec: {
          id: 'm7c6',
          title: 'Print a multiplication table with a loop',
          brief:
            'Using a **for loop**, print the 7 times table from **7 × 1** to **7 × 10**, one line each, in the form `7 x 1 = 7`. Do not write the ten lines out by hand.',
          lang: 'php',
          starter: `<?php

// One loop, ten lines.

?>`,
          hints: [
            'The header is `for ($i = 1; $i <= 10; $i++) { … }`.',
            'Inside, calculate `7 * $i` and echo it with `<br>` at the end.',
            'To put a calculation inside a string, join it with a full stop: `echo "7 x $i = " . (7 * $i) . "<br>";`',
          ],
          solution: `<?php
for ($i = 1; $i <= 10; $i++) {
    echo "7 x $i = " . (7 * $i) . "<br>";
}
?>`,
          checks: [
            { kind: 'source', pattern: 'for\\s*\\(', label: 'A for loop is used' },
            { kind: 'output', contains: '7 x 1 = 7', label: 'The first line is 7 x 1 = 7' },
            { kind: 'output', contains: '7 x 10 = 70', label: 'The last line is 7 x 10 = 70' },
            { kind: 'output', contains: '7 x 6 = 42', label: 'The middle of the table is correct' },
            { kind: 'source', pattern: '7 x 2 =[^"]*"[\\s\\S]*7 x 3 =', not: true, label: 'The lines are generated by the loop, not typed out' },
          ],
        },
      },

      {
        b: 'quiz',
        questions: [
          {
            kind: 'mcq',
            q: 'How many times does this loop print?',
            code: `$x = 10;
do {
    echo $x;
    $x++;
} while ($x <= 5);`,
            codeLang: 'php',
            options: ['0 times', '1 time', '5 times', 'Infinitely'],
            answer: 1,
            why: 'A `do-while` checks the condition **after** executing, so the block always runs at least once — even though 10 is already greater than 5.',
          },
          {
            kind: 'mcq',
            q: 'Which loop should you use to go through every element of an array?',
            options: ['for', 'while', 'foreach', 'do-while'],
            answer: 2,
            why: '`foreach` is built for arrays. The others can be made to work, but foreach needs no counter and cannot run off the end.',
          },
          {
            kind: 'mcq',
            q: 'What is the difference between `break` and `continue`?',
            options: [
              'break skips one iteration; continue exits the loop',
              'break exits the loop; continue skips to the next iteration',
              'They do the same thing',
              'break works only in switch statements',
            ],
            answer: 1,
            why: '`break` leaves the loop entirely; `continue` abandons only the current pass and goes on to the next.',
          },
          {
            kind: 'mcq',
            q: 'How many times does the inner echo run in total?',
            code: `for ($i = 1; $i <= 4; $i++) {
    for ($j = 1; $j <= 3; $j++) {
        echo "*";
    }
}`,
            codeLang: 'php',
            options: ['7', '12', '4', '3'],
            answer: 1,
            why: 'The inner loop runs 3 times for each of the 4 outer passes: 4 × 3 = **12**.',
          },
          {
            kind: 'multi',
            q: 'Which are the four loop types in PHP?',
            options: ['for', 'foreach', 'repeat', 'while', 'do-while'],
            answers: [0, 1, 3, 4],
            why: 'There is no `repeat` loop in PHP — that belongs to Pascal.',
          },
        ],
      },

      {
        b: 'recap',
        items: [
          '`for` — when you know the number of repetitions in advance.',
          '`while` — checks first, so it may run zero times.',
          '`do-while` — checks after, so it always runs at least once. Note the trailing semicolon.',
          '`foreach` — for arrays: `as $value`, or `as $key => $value`.',
          '`break` leaves the loop; `continue` skips one iteration.',
        ],
      },
    ],
  },

  // ── 7.9 ──────────────────────────────────────────────────────
  {
    id: 'm7l9',
    slug: 'arrays',
    title: 'Arrays',
    summary:
      'One variable holding many values — indexed, associative and multidimensional — plus the six sort functions.',
    minutes: 17,
    outcomes: ['Creates PHP code to save/retrieve data to and from MySQL'],
    blocks: [
      {
        b: 'lead',
        text: 'Arrays in PHP are a collection of **key/value pairs** — they map values to keys. Keys (or indexes) may be integers or strings; values can be of any type. An array is declared with the `array()` language construct, or with square brackets.',
      },

      { b: 'h2', text: 'Indexed arrays' },
      {
        b: 'p',
        text: 'Arrays with **numeric indices**, counted from zero. Two ways to build one:',
      },
      {
        b: 'code',
        lang: 'php',
        code: `// All at once
$fruits = array("Banana", "Apple", "Orange");

// Or one element at a time
$fruits[0] = "Banana";
$fruits[1] = "Apple";
$fruits[2] = "Orange";`,
      },
      {
        b: 'lab',
        spec: {
          lab: 'php',
          title: 'Reading an indexed array',
          code: `<?php
$fruits = array("Banana", "Apple", "Orange");

echo $fruits[0];   // Banana — counting starts at ZERO
echo "<br>";
echo $fruits[2];   // Orange
echo "<hr>";

$arrlength = count($fruits);   // how many elements
echo "There are $arrlength fruits.<br><hr>";

for ($x = 0; $x < $arrlength; $x++) {
    echo $fruits[$x];
    echo "<br>";
}

echo "<hr>";
var_dump($fruits);
?>`,
          height: 400,
          note: 'Try `echo $fruits[3];` — an index that does not exist. PHP prints a **warning**, which is far more helpful than silence.',
        },
      },
      {
        b: 'note',
        tone: 'exam',
        title: 'Counting from zero',
        text: 'The **first** element is `$fruits[0]`, and an array of 3 elements has its last item at index **2**. `count()` returns 3. Off-by-one errors between `count()` and the last index are a favourite exam trap.',
      },

      { b: 'h2', text: 'Associative arrays' },
      {
        b: 'p',
        text: 'Arrays that use **named keys** you assign yourself, instead of numeric indices.',
      },
      {
        b: 'code',
        lang: 'php',
        code: `$variable_array_name = array(key1 => value1, key2 => value2, ...);

// For example
$fruits = array("fruit1" => "Banana",
                "fruit2" => "Apple",
                "fruit3" => "Orange");

// Or one at a time
$fruits['fruit1'] = "Banana";
$fruits['fruit2'] = "Apple";
$fruits['fruit3'] = "Orange";`,
      },
      {
        b: 'lab',
        spec: {
          lab: 'php',
          title: 'Keys that mean something',
          code: `<?php
$marks = array("ICT" => 78, "Maths" => 65, "Physics" => 82);

echo $marks["ICT"];
echo "<hr>";

foreach ($marks as $subject => $mark) {
    echo "Key=" . $subject . ", Value=" . $mark;
    echo "<br>";
}

echo "<hr>";
echo "Total: " . array_sum($marks);
?>`,
          height: 330,
          note: 'Compare `$marks["ICT"]` with `$fruits[0]`. A named key says what the value *means*; a number only says where it sits.',
        },
      },

      { b: 'h2', text: 'Multidimensional arrays' },
      {
        b: 'p',
        text: 'Arrays containing one or more arrays — a table rather than a list.',
      },
      {
        b: 'lab',
        spec: {
          lab: 'php',
          title: 'An array of arrays',
          code: `<?php
$data = array(
    array(10, 20, 30),
    array("a", "b", "c")
);

var_dump($data);

echo "<hr>";
echo $data[0][1];   // 20  — first array, second element
echo "<br>";
echo $data[1][2];   // c

echo "<hr>";
// A more realistic shape: a table of students
$students = array(
    array("name" => "Nimali", "grade" => "13A"),
    array("name" => "Kasun",  "grade" => "13B")
);

foreach ($students as $s) {
    echo $s["name"] . " is in " . $s["grade"] . "<br>";
}
?>`,
          height: 420,
          note: 'Two sets of brackets: the first picks the inner array, the second picks an element inside it. This is exactly the shape a database query returns, which you will meet in lesson 17.',
        },
      },

      { b: 'h2', text: 'Array functions' },
      {
        b: 'keyvals',
        title: 'The ones the syllabus lists',
        items: [
          { k: 'count($arr)', v: 'Counts all the elements in an array.' },
          { k: 'array_merge($a, $b)', v: 'Merges one or more arrays into a single array.' },
          { k: 'array_push($arr, …)', v: 'Pushes one or more elements onto the **end** of an array.' },
          { k: 'array_keys($arr)', v: 'Returns all the keys of an array, as a new array.' },
          { k: 'print_r($arr)', v: 'Prints human-readable information about a variable — less detailed than `var_dump`, but easier to read.' },
          { k: 'implode($glue, $arr)', v: 'Joins array elements into a **string**, separated by the glue. Also known as `join()`.' },
          { k: 'explode($sep, $str)', v: 'Splits a **string** into an array, at each separator. The opposite of implode.' },
        ],
      },
      {
        b: 'lab',
        spec: {
          lab: 'php',
          title: 'implode and explode',
          code: `<?php
$array  = array('apple', 'banana', 'cherry');
$string = implode(", ", $array);
echo $string;               // apple, banana, cherry
echo "<hr>";

$back = explode(", ", $string);
print_r($back);             // Array ( [0] => apple ... )
echo "<hr>";

$arr = array("apple", "banana");
array_push($arr, "orange", "grape");
print_r($arr);
echo "<hr>";

print_r(array_keys(array("a" => "apple", "b" => "banana")));
echo "<hr>";

print_r(array_merge(array(1,2,3), array(4,5,6)));
?>`,
          height: 400,
          note: '`implode` glues an array into a string; `explode` splits a string into an array. They are exact opposites, and between them they solve most "list of things" problems.',
        },
      },

      { b: 'h2', text: 'Sorting' },
      {
        b: 'p',
        text: 'PHP has built-in functions to sort arrays in ascending or descending order, alphabetically or numerically. There are six, and the naming is systematic once you see the pattern.',
      },
      {
        b: 'table',
        head: ['Function', 'Sorts', 'By', 'Order'],
        rows: [
          ['`sort()`', 'Any array', 'value', 'ascending'],
          ['`rsort()`', 'Any array', 'value', 'descending'],
          ['`asort()`', 'Associative', 'value', 'ascending'],
          ['`arsort()`', 'Associative', 'value', 'descending'],
          ['`ksort()`', 'Associative', 'key', 'ascending'],
          ['`krsort()`', 'Associative', 'key', 'descending'],
        ],
      },
      {
        b: 'note',
        tone: 'tip',
        title: 'Reading the names',
        text: 'An **`a`** at the front means *associative* — keys are preserved. A **`k`** means sort by *key*. An **`r`** means *reverse*. So `krsort` = key, reverse. And plain `sort()` **discards the keys**, renumbering from 0 — which is why it is wrong for an associative array.',
      },
      {
        b: 'lab',
        spec: {
          lab: 'php',
          title: 'Six sorts, one array',
          code: `<?php
$fruits = array("b" => "banana", "a" => "apple", "c" => "cherry");

echo "<b>sort() — keys are destroyed:</b><br>";
$x = $fruits; sort($x); print_r($x);

echo "<hr><b>asort() — by value, keys kept:</b><br>";
$x = $fruits; asort($x); print_r($x);

echo "<hr><b>arsort() — by value, descending:</b><br>";
$x = $fruits; arsort($x); print_r($x);

echo "<hr><b>ksort() — by key:</b><br>";
$x = $fruits; ksort($x); print_r($x);

echo "<hr><b>krsort() — by key, descending:</b><br>";
$x = $fruits; krsort($x); print_r($x);
?>`,
          height: 420,
          note: 'Look at the first result. `sort()` threw the keys "a", "b" and "c" away and replaced them with 0, 1, 2. For an associative array that is almost always a bug.',
        },
      },

      {
        b: 'challenge',
        spec: {
          id: 'm7c7',
          title: 'Countries by population',
          brief:
            'Build an **associative array** of five countries with their populations in millions: Sri Lanka 22, India 1428, Maldives 0.5, Nepal 30, Bhutan 0.8. Then sort it **by population, descending**, keeping the country names attached, and print each as `Country: population`.',
          lang: 'php',
          starter: `<?php

// 1. The array, with country names as keys.

// 2. Sort by value, descending, keeping the keys.

// 3. Print each line with a foreach.

?>`,
          hints: [
            'The array is `array("Sri Lanka" => 22, "India" => 1428, …)`.',
            'Sorting by **value** while **keeping keys**, descending, is `arsort()`.',
            'Print with `foreach ($pop as $country => $n) { echo "$country: $n<br>"; }`.',
          ],
          solution: `<?php
$pop = array(
    "Sri Lanka" => 22,
    "India"     => 1428,
    "Maldives"  => 0.5,
    "Nepal"     => 30,
    "Bhutan"    => 0.8
);

arsort($pop);

foreach ($pop as $country => $people) {
    echo "$country: $people<br>";
}
?>`,
          checks: [
            { kind: 'source', pattern: 'arsort\\s*\\(', label: 'arsort() is used — by value, descending, keys kept' },
            { kind: 'source', pattern: 'foreach', label: 'A foreach loop prints the results' },
            { kind: 'output', contains: 'India: 1428', label: 'India appears with its population' },
            { kind: 'output', contains: 'Sri Lanka: 22', label: 'Sri Lanka appears with its population' },
            { kind: 'output', pattern: 'India[\\s\\S]*Nepal[\\s\\S]*Sri Lanka', label: 'The order is descending: India, then Nepal, then Sri Lanka' },
          ],
        },
      },

      {
        b: 'quiz',
        questions: [
          {
            kind: 'mcq',
            q: 'An array has 5 elements. What is the index of the last one?',
            options: ['5', '4', '6', 'It depends on the values'],
            answer: 1,
            why: 'Indexing starts at 0, so 5 elements occupy indexes 0 to **4**. `count()` returns 5.',
          },
          {
            kind: 'mcq',
            q: 'Which function sorts an associative array by **value**, keeping the keys attached?',
            options: ['sort()', 'ksort()', 'asort()', 'rsort()'],
            answer: 2,
            why: '`asort()` — the `a` means associative, so keys survive. `sort()` would renumber them 0, 1, 2.',
          },
          {
            kind: 'mcq',
            q: 'What does `implode(", ", array("a","b","c"))` return?',
            options: ['An array of 3 elements', 'The string "a, b, c"', 'The number 3', 'An error'],
            answer: 1,
            why: '`implode` glues an array into a string. `explode` does the reverse.',
          },
          {
            kind: 'mcq',
            q: 'Given `$d = array(array(1,2,3), array("x","y","z"));`, what is `$d[1][0]`?',
            options: ['1', '2', '"x"', '"y"'],
            answer: 2,
            why: 'The first bracket picks the **second** inner array (index 1), the second picks its **first** element (index 0) — `"x"`.',
          },
          {
            kind: 'match',
            q: 'Match each sort function to what it does.',
            pairs: [
              { left: 'sort()', right: 'By value, ascending, keys discarded' },
              { left: 'arsort()', right: 'By value, descending, keys kept' },
              { left: 'ksort()', right: 'By key, ascending' },
              { left: 'krsort()', right: 'By key, descending' },
            ],
            why: '`a` = associative (keys kept), `k` = by key, `r` = reverse.',
          },
        ],
      },

      {
        b: 'recap',
        items: [
          'Three kinds: indexed (numeric keys from 0), associative (named keys), multidimensional (arrays inside arrays).',
          '`count()` gives the number of elements; the last index is one less than that.',
          '`array_merge`, `array_push`, `array_keys`, `print_r`, `implode`, `explode`.',
          'Six sorts: `sort` `rsort` `asort` `arsort` `ksort` `krsort` — a = associative, k = key, r = reverse.',
        ],
      },
    ],
  },

  // ── 7.10 ─────────────────────────────────────────────────────
  {
    id: 'm7l10',
    slug: 'functions-and-scope',
    title: 'Functions and variable scope',
    summary:
      'Write a block of code once, call it anywhere — and understand why a variable inside it is invisible outside.',
    minutes: 16,
    outcomes: ['Creates PHP code to save/retrieve data to and from MySQL'],
    blocks: [
      {
        b: 'lead',
        text: 'Functions are blocks of code that perform specific tasks and can be called whenever they are needed. They organise code, make it reusable, and improve readability — and they mean a fix happens in **one place** instead of five.',
      },

      { b: 'h2', text: 'Defining and calling' },
      {
        b: 'p',
        text: 'Use the `function` keyword, followed by the function name, parentheses `()`, and a block of code in `{}`. Nothing runs until the function is **called**.',
      },
      {
        b: 'lab',
        spec: {
          lab: 'php',
          title: 'Define once, call many times',
          code: `<?php
// Defining the function — this alone prints nothing
function writeWelcomeMessage() {
    echo "Hello World!<br>";
}

// Calling it — now it runs
writeWelcomeMessage();
writeWelcomeMessage();
writeWelcomeMessage();
?>`,
          height: 250,
          note: 'Comment out the three calls and run again. The definition on its own produces no output — a function is a recipe, not a meal.',
        },
      },

      { b: 'h2', text: 'The four kinds of function' },
      {
        b: 'p',
        text: 'Functions are categorised by whether they take **parameters** and whether they **return** a value. All four combinations exist, and the syllabus names each.',
      },
      {
        b: 'lab',
        spec: {
          lab: 'php',
          title: 'All four, side by side',
          code: `<?php
// 1. Parameters, no return value
function greet($name) {
    echo "Hello, $name!<br>";
}
greet("Alice");

// 2. Return value, no parameters
function getGreeting() {
    return "Hello, world!";
}
echo getGreeting() . "<br>";

// 3. Parameters AND a return value
function add($a, $b) {
    $z = $a + $b;
    return $z;
}
echo "5 + 10 = " . add(5, 10) . "<br>";

// 4. Neither
function sayHello() {
    echo "Hello, world!<br>";
}
sayHello();
?>`,
          height: 400,
        },
      },
      {
        b: 'note',
        tone: 'exam',
        title: 'echo inside versus return',
        text: 'A function that **echoes** prints immediately and gives you nothing back. A function that **returns** hands a value to whoever called it, who then decides what to do with it. `return` is almost always the more useful choice — you can always echo the result afterwards.',
      },

      { b: 'h2', text: 'Parameters' },
      {
        b: 'p',
        text: 'Arguments are specified after the function name, inside the parentheses, and multiple arguments are separated by commas.',
      },
      {
        b: 'lab',
        spec: {
          lab: 'php',
          title: 'Two parameters, three calls',
          code: `<?php
function printNameAndYear($fname, $year) {
    echo "Mr./Ms. $fname was born in $year <br>";
}

printNameAndYear("Rajah",  "1975");
printNameAndYear("Leela",  "1978");
printNameAndYear("Anuraj", "1983");
?>`,
          height: 250,
        },
      },
      {
        b: 'h3',
        text: 'Default parameter values',
      },
      {
        b: 'p',
        text: 'You can specify a default value for a parameter. If no argument is supplied for it during the call, the default is used.',
      },
      {
        b: 'lab',
        spec: {
          lab: 'php',
          title: 'A default that fills the gap',
          code: `<?php
function greet($name = "Guest") {
    echo "Hello, $name!<br>";
}

greet();          // Hello, Guest!
greet("Alice");   // Hello, Alice!
?>`,
          height: 220,
        },
      },

      { b: 'h2', text: 'Variable scope' },
      {
        b: 'p',
        text: 'Variables inside a function have **local scope** — they can only be accessed within that function, and are called **local variables**. Variables outside functions have **global scope** and cannot be accessed inside functions unless explicitly specified.',
      },
      {
        b: 'lab',
        spec: {
          lab: 'php',
          title: 'Two variables, same name, different worlds',
          code: `<?php
$x = "I am the GLOBAL x";

function showScope() {
    $x = "I am the LOCAL x";
    echo $x . "<br>";     // the local one
}

showScope();
echo $x . "<br>";         // the global one — untouched

echo "<hr>";

function tryToReachGlobal() {
    echo $x;   // Notice: Undefined variable
}
tryToReachGlobal();
?>`,
          height: 340,
          note: 'The last call produces a **warning**, not the value. `$x` in the global scope and `$x` in the local scope are two entirely different variables.',
        },
      },

      { b: 'h3', text: 'The global keyword' },
      {
        b: 'p',
        text: 'To access a global variable inside a function, declare it with `global`.',
      },
      {
        b: 'code',
        lang: 'php',
        code: `<?php
$globalVar = "I'm a global variable";

function showGlobal() {
    global $globalVar;
    echo $globalVar;    // now accessible
}
showGlobal();
?>`,
      },

      { b: 'h3', text: 'The $GLOBALS array' },
      {
        b: 'p',
        text: '`$GLOBALS` is a **superglobal associative array** containing references to all variables available in the global scope. The **keys are the names** of the global variables, and the values are their contents. It lets functions and methods access and modify global variables without using the `global` keyword.',
      },
      {
        b: 'lab',
        spec: {
          lab: 'php',
          title: 'global, $GLOBALS, and a name clash',
          code: `<?php
$var1 = "First variable";
$var2 = "Second variable";

function showGlobals() {
    echo $GLOBALS['var1'] . "<br>";
    echo $GLOBALS['var2'] . "<br>";
}
showGlobals();

echo "<hr>";

// Modifying a global from inside a function
$counterVar = 10;
function bump() {
    $GLOBALS['counterVar'] = $GLOBALS['counterVar'] + 5;
}
bump();
echo "counterVar is now $counterVar<br>";

echo "<hr>";

// Avoiding a conflict when both have the same name
$var = "Global variable";
function testConflict() {
    $var = "Local variable";
    echo $var . "<br>";              // the local one
    echo $GLOBALS['var'] . "<br>";   // the global one
}
testConflict();
?>`,
          height: 440,
          note: 'The last example is the point of `$GLOBALS`: when a local and a global share a name, it gives you an unambiguous way to reach the global one.',
        },
      },

      { b: 'h3', text: 'The static keyword' },
      {
        b: 'p',
        text: '`static` allows a local variable to **retain its value across multiple calls** to the function, instead of being created fresh each time.',
      },
      {
        b: 'lab',
        spec: {
          lab: 'php',
          title: 'A variable that remembers',
          code: `<?php
function counter() {
    static $count = 0;
    $count++;
    echo $count . "<br>";
}

counter();   // 1
counter();   // 2
counter();   // 3

echo "<hr>";

// Without static, it resets every time
function noMemory() {
    $count = 0;
    $count++;
    echo $count . "<br>";
}
noMemory();  // 1
noMemory();  // 1
noMemory();  // 1
?>`,
          height: 380,
        },
      },

      {
        b: 'challenge',
        spec: {
          id: 'm7c8',
          title: 'A reusable grade function',
          brief:
            'Write a function called **`getGrade`** that takes a mark as a parameter and **returns** the grade as a string: A for 75 and above, B for 65+, C for 55+, S for 35+, and F below that. Then call it with **82**, **58** and **20**, printing each result.',
          lang: 'php',
          starter: `<?php

function getGrade($marks) {
    // Work out the grade and RETURN it.
}

// Call it three times and echo each result.

?>`,
          hints: [
            'Use `return "A";` rather than `echo "A";` — the task says return.',
            'Once a `return` runs, the function stops immediately, so you do not even need `else`.',
            'Call it like `echo getGrade(82);`',
          ],
          solution: `<?php
function getGrade($marks) {
    if ($marks >= 75) {
        return "A";
    } elseif ($marks >= 65) {
        return "B";
    } elseif ($marks >= 55) {
        return "C";
    } elseif ($marks >= 35) {
        return "S";
    } else {
        return "F";
    }
}

echo getGrade(82) . "<br>";
echo getGrade(58) . "<br>";
echo getGrade(20) . "<br>";
?>`,
          checks: [
            { kind: 'source', pattern: 'function\\s+getGrade\\s*\\(', label: 'A function named getGrade is defined' },
            { kind: 'source', pattern: 'return', label: 'The function returns a value rather than echoing it' },
            { kind: 'source', pattern: 'getGrade\\s*\\(\\s*82', label: 'It is called with 82' },
            { kind: 'output', pattern: 'A[\\s\\S]*C[\\s\\S]*F', label: 'The three results printed are A, C and F in order' },
          ],
        },
      },

      {
        b: 'quiz',
        questions: [
          {
            kind: 'mcq',
            q: 'What does this print?',
            code: `$x = "global";
function test() {
    echo $x;
}
test();`,
            codeLang: 'php',
            options: ['global', 'Nothing, plus a warning about an undefined variable', 'An empty string with no warning', 'A fatal error'],
            answer: 1,
            why: 'A global variable is **not** visible inside a function. You need `global $x;` or `$GLOBALS[\'x\']` to reach it.',
          },
          {
            kind: 'mcq',
            q: 'What does `static` do to a local variable?',
            options: [
              'Makes it available globally',
              'Prevents it from being changed',
              'Makes it retain its value between calls to the function',
              'Makes the function run faster',
            ],
            answer: 2,
            why: 'It survives from one call to the next instead of being recreated — which is how a function can count.',
          },
          {
            kind: 'mcq',
            q: 'A function is defined but never called. What happens?',
            options: [
              'Its code runs once when the file loads',
              'Nothing — a definition alone produces no output',
              'A fatal error',
              'It runs at the end of the script',
            ],
            answer: 1,
            why: 'A definition is a recipe. Nothing happens until something calls it.',
          },
          {
            kind: 'mcq',
            q: 'What does `greet()` print, given `function greet($name = "Guest") { echo "Hello, $name"; }`?',
            options: ['Hello, ', 'Hello, Guest', 'An error about a missing argument', 'Hello, $name'],
            answer: 1,
            why: 'The parameter has a **default value**, so calling it with no argument uses "Guest".',
          },
          {
            kind: 'fill',
            q: 'Which keyword hands a value back from a function to whatever called it?',
            accept: ['return'],
            why: '`return`. It also ends the function immediately, which is why an elseif chain of returns needs no else.',
            placeholder: 'keyword',
          },
        ],
      },

      {
        b: 'recap',
        items: [
          '`function name($params) { … }` defines; `name($args)` calls.',
          'Four kinds: parameters or not, return value or not.',
          'Parameters can have default values, used when no argument is supplied.',
          'Local variables are invisible outside; use `global` or `$GLOBALS[\'name\']` to reach a global.',
          '`static` makes a local variable keep its value between calls.',
        ],
      },
    ],
  },
]

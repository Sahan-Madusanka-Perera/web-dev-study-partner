/* Lab code samples live in template literals, so a stray backtick inside a
   CSS or HTML comment silently ends the string. tsc catches it, but the error
   it prints points at the wrong place — this names the actual line. */
import { readFileSync } from 'node:fs'
import { globSync } from 'node:fs'

const files = globSync('src/data/modules/*.ts')
let bad = 0

for (const file of files) {
  const s = readFileSync(file, 'utf8')
  let i = 0, line = 1
  while (i < s.length) {
    const c = s[i]
    if (c === '\n') { line++; i++; continue }
    if (c === '"' || c === "'") {
      const q = c; i++
      while (i < s.length && s[i] !== q) { if (s[i] === '\\') i++; if (s[i] === '\n') line++; i++ }
      i++; continue
    }
    if (c === '/' && s[i + 1] === '/') { while (i < s.length && s[i] !== '\n') i++; continue }
    if (c === '/' && s[i + 1] === '*') {
      i += 2
      while (i + 1 < s.length && !(s[i] === '*' && s[i + 1] === '/')) { if (s[i] === '\n') line++; i++ }
      i += 2; continue
    }
    if (c === '`') {
      const startLine = line
      i++
      while (i < s.length && s[i] !== '`') { if (s[i] === '\\') i++; if (s[i] === '\n') line++; i++ }
      i++
      let j = i
      while (j < s.length && (s[j] === ' ' || s[j] === '\t')) j++
      if (!',)}];\n'.includes(s[j])) {
        console.log(`${file}:${startLine} — template literal ends at line ${line}; a backtick inside the sample probably closed it early`)
        bad++
      }
      continue
    }
    i++
  }
}
console.log(bad ? `\n${bad} suspect template literal(s)` : 'templates ok')
process.exit(bad ? 1 : 0)

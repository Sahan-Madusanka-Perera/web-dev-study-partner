/* Every challenge ships a model solution. If that solution does not pass the
   challenge's own checks, the checks are wrong — and a student following the
   hints correctly would be told they had failed. This catches that. */
import puppeteer from 'puppeteer-core'
import { readFileSync, readdirSync } from 'node:fs'

// Work out which lesson each challenge lives in, straight from the source.
const moduleSlug = {
  'm1-web': 'the-web', 'm2-planning': 'planning',
  'm3-html-a': 'html', 'm3-html-b': 'html',
  'm4-links-media': 'links-and-media',
  'm5-css-a': 'css', 'm5-css-b': 'css', 'm5-css-c': 'css',
  'm6-authoring': 'authoring-tools',
  'm7-php-a': 'php-mysql', 'm7-php-b': 'php-mysql',
  'm7-php-c': 'php-mysql', 'm7-php-d': 'php-mysql',
  'm8-publishing': 'publishing',
}

const targets = []
for (const file of readdirSync('src/data/modules')) {
  const base = file.replace('.ts', '')
  if (!(base in moduleSlug)) continue
  const src = readFileSync('src/data/modules/' + file, 'utf8')
  let lessonSlug = null
  for (const line of src.split('\n')) {
    const s = line.match(/^\s+slug: '([a-z0-9-]+)',/)
    if (s) lessonSlug = s[1]
    const c = line.match(/^\s+id: '(m\d+(?:c\d+|project))',/)
    if (c && lessonSlug) targets.push({ id: c[1], module: moduleSlug[base], lesson: lessonSlug })
  }
}

const filter = process.argv[2]
const only = process.argv[3]?.split(',')
const wanted = targets.filter(
  (t) => (!filter || t.module === filter) && (!only || only.includes(t.lesson)),
)

const browser = await puppeteer.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: 'new', args: ['--no-sandbox', '--disable-dev-shm-usage'],
})
const page = await browser.newPage()
await page.setViewport({ width: 1600, height: 1000 })

const bad = []
let done = 0
// Group challenges by lesson so each page loads once.
const byLesson = new Map()
for (const t of wanted) {
  const key = `${t.module}/${t.lesson}`
  byLesson.set(key, [...(byLesson.get(key) ?? []), t.id])
}

for (const [path, ids] of byLesson) {
  try {
    await page.goto(`http://localhost:5200/#/m/${path}`, { waitUntil: 'domcontentloaded', timeout: 60000 })
  } catch (e) {
    console.log(`\n  ! could not open ${path}: ${e.message.slice(0, 80)}`)
    continue
  }
  await new Promise((r) => setTimeout(r, 800))
  await page.evaluate(() => window.scrollBy(0, 100000))
  await new Promise((r) => setTimeout(r, 1800))

  let outcomes = []
  try {
    outcomes = await page.evaluate(async (count) => {
    const out = []
    const cards = [...document.querySelectorAll('section')].filter((s) =>
      [...s.querySelectorAll('button')].some((b) => b.textContent.includes('Check my work')),
    )
    for (let i = 0; i < Math.min(cards.length, count); i++) {
      const card = cards[i]
      const btn = (t) => [...card.querySelectorAll('button')].find((b) => b.textContent.includes(t))
      const title = card.querySelector('span')?.textContent?.trim() ?? '?'
      btn('Check my work')?.click()
      await new Promise((r) => setTimeout(r, 900))
      btn('Show one solution')?.click()
      await new Promise((r) => setTimeout(r, 500))
      btn('Check my work')?.click()
      await new Promise((r) => setTimeout(r, 1500))
      const m = card.innerText.match(/(\d+) \/ (\d+) checks/)
      const failed = [...card.querySelectorAll('li')]
        .filter((li) => li.querySelector('svg') && !li.className.includes('ok'))
        .map((li) => li.innerText.trim())
      out.push({ title, score: m ? `${m[1]}/${m[2]}` : 'none', pass: m ? m[1] === m[2] : false, failed })
    }
      return out
    }, ids.length)
  } catch (e) {
    console.log(`\n  ! ${path} threw: ${e.message.slice(0, 100)}`)
    continue
  }

  for (const o of outcomes) {
    done++
    if (!o.pass) bad.push({ path, ...o })
    console.log(`${o.pass ? 'PASS' : 'FAIL'}  ${path.padEnd(38)} ${o.score.padStart(6)}  ${o.title}`)
  }
}

console.log(`\n\n${done - bad.length}/${done} challenge solutions pass their own checks`)
if (bad.length) {
  console.log('\n--- solutions that do NOT pass ---')
  for (const b of bad) console.log(`${b.path}  "${b.title}"  ${b.score}`)
}
await browser.close()

import puppeteer from 'puppeteer-core'

const BASE = process.argv[2] || 'http://localhost:5200'
const browser = await puppeteer.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: 'new',
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
})
const page = await browser.newPage()
await page.setViewport({ width: 1440, height: 1000 })
const errors = []
page.on('pageerror', (e) => errors.push('pageerror: ' + e.message))
page.on('console', (m) => { if (m.type() === 'error') errors.push('console: ' + m.text().slice(0, 160)) })

const results = []
const check = (name, ok, detail = '') => {
  results.push(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? '  — ' + detail : ''}`)
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function go(hash) {
  await page.goto(BASE + '/#' + hash, { waitUntil: 'networkidle2', timeout: 90000 })
  await sleep(900)
}

// 1. Home renders and counts content
await go('/')
const homeText = await page.evaluate(() => document.body.innerText)
check('home renders', homeText.includes('Learn web development'))
check('home lists 8 modules', (homeText.match(/10\.\d/g) || []).length >= 8)

// 2. HTML lab renders markup in a real iframe (no PHP needed)
await go('/m/html/tables')
await page.evaluate(() => window.scrollBy(0, 2200))
await sleep(1200)
const tableRendered = await page.evaluate(() =>
  [...document.querySelectorAll('iframe')].some((f) => f.contentDocument?.querySelector('table')),
)
check('HTML lab renders a real <table>', tableRendered)

// 3. PHP engine boots and a lab produces output
await go('/m/php-mysql/loops')
await page.evaluate(() => window.scrollBy(0, 900))
let phpText = ''
for (let i = 0; i < 60; i++) {
  await sleep(1000)
  phpText = await page.evaluate(() => document.body.innerText)
  if (phpText.includes('The number is: 0') || phpText.includes('times 12 is')) break
}
check('PHP engine boots and runs a loop', /times 12 is/.test(phpText), phpText.match(/1 times 12 is \d+/)?.[0] || '')

// 4. SQL lab returns real rows
await go('/m/php-mysql/sql-queries')
await page.evaluate(() => window.scrollBy(0, 700))
await sleep(2500)
const ranSql = await page.evaluate(async () => {
  const btns = [...document.querySelectorAll('button')].filter((b) => b.textContent.trim() === 'Run')
  if (!btns.length) return 'no run button'
  btns[0].click()
  return 'clicked'
})
await sleep(4000)
const sqlText = await page.evaluate(() => document.body.innerText)
check('SQL lab returns rows from classics', sqlText.includes('Mark Twain'), ranSql)

// 5. Form lab: fill in, submit, and read $_POST back
await go('/m/php-mysql/get-post-superglobals')
await page.evaluate(() => window.scrollBy(0, 1800))
await sleep(3500)
const submitted = await page.evaluate(async () => {
  for (const f of document.querySelectorAll('iframe')) {
    const d = f.contentDocument
    const form = d?.querySelector('form')
    if (!form) continue
    const t = d.querySelector('input[name="uname"]')
    if (!t) continue
    t.value = 'E2E Tester'
    const btn = d.querySelector('input[type="submit"], button[type="submit"]')
    btn.click()
    return 'submitted'
  }
  return 'no form found'
})
await sleep(4000)
const formText = await page.evaluate(() => document.body.innerText)
check('form submits and PHP reads the value', formText.includes('E2E Tester'), submitted)

// 6. Quiz answers can be selected and checked
await go('/m/the-web/reading-a-url')
await page.evaluate(() => window.scrollBy(0, 3000))
await sleep(900)
const quizWorked = await page.evaluate(async () => {
  const opts = [...document.querySelectorAll('button')].filter((b) =>
    b.textContent.includes('/students/grade13.html'),
  )
  if (!opts.length) return 'no option'
  opts[0].click()
  await new Promise((r) => setTimeout(r, 250))
  const chk = [...document.querySelectorAll('button')].find((b) => b.textContent.trim() === 'Check answer')
  if (!chk) return 'no check button'
  chk.click()
  await new Promise((r) => setTimeout(r, 400))
  return document.body.innerText.includes('Correct') ? 'correct' : 'checked but not marked correct'
})
check('quiz marks a correct answer', quizWorked === 'correct', quizWorked)

// 7. Exam practice draws a paper
await go('/practice')
await sleep(600)
const examWorked = await page.evaluate(async () => {
  const b = [...document.querySelectorAll('button')].find((x) => x.textContent.includes('Start the paper'))
  if (!b) return 'no button'
  b.click()
  await new Promise((r) => setTimeout(r, 700))
  return /practice paper/i.test(document.body.innerText) ? 'drew a paper' : 'no paper'
})
check('exam practice draws a paper', examWorked === 'drew a paper', examWorked)

// 8. Reference search
await go('/reference')
await sleep(500)
const refWorked = await page.evaluate(async () => {
  const tab = [...document.querySelectorAll('button')].find((b) => b.textContent.includes('CSS properties'))
  tab?.click()
  await new Promise((r) => setTimeout(r, 400))
  const input = document.querySelector('input[placeholder*="Search"]')
  if (!input) return 'no search box'
  const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set
  setter.call(input, 'collapse')
  input.dispatchEvent(new Event('input', { bubbles: true }))
  await new Promise((r) => setTimeout(r, 400))
  return document.body.innerText.includes('border-collapse') ? 'found' : 'not found'
})
check('reference search filters', refWorked === 'found', refWorked)

// 9. A coding challenge checks the student's markup
await go('/m/html/lists')
await page.evaluate(() => window.scrollBy(0, 100000))
await sleep(1500)
const challenge = await page.evaluate(async () => {
  const btn = [...document.querySelectorAll('button')].find((b) => b.textContent.includes('Check my work'))
  if (!btn) return 'no check button'
  btn.click()
  await new Promise((r) => setTimeout(r, 1400))
  const txt = document.body.innerText
  const m = txt.match(/(\d+) \/ (\d+) checks/)
  return m ? `${m[1]}/${m[2]} checks reported` : 'no verdicts'
})
check('challenge runs its checks', /checks reported/.test(challenge), challenge)

// 10. Marking a lesson complete persists to localStorage
await go('/m/the-web/internet-and-networks')
const marked = await page.evaluate(async () => {
  const btn = [...document.querySelectorAll('button')].find((b) => b.textContent.includes('Mark as complete'))
  if (!btn) return 'no button'
  btn.click()
  await new Promise((r) => setTimeout(r, 400))
  const raw = localStorage.getItem('wdsp.progress.v1')
  return raw && JSON.parse(raw).done?.m1l1 ? 'saved' : 'not saved'
})
check('progress is saved to localStorage', marked === 'saved', marked)

console.log(results.join('\n'))
console.log('\n' + results.filter((r) => r.startsWith('PASS')).length + '/' + results.length + ' passed')
if (errors.length) console.log('\n--- page errors ---\n' + [...new Set(errors)].slice(0, 8).join('\n'))
await browser.close()

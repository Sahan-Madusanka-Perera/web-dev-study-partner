import puppeteer from 'puppeteer-core'

const url = process.argv[2] || 'http://localhost:5199/'
const waitFor = process.argv[3] || 'ALL DONE'
const timeout = Number(process.argv[4] || 180000)

const browser = await puppeteer.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: 'new',
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
})
const page = await browser.newPage()
const logs = []
page.on('console', (m) => logs.push(`[${m.type()}] ${m.text()}`))
page.on('pageerror', (e) => logs.push(`[pageerror] ${e.message}`))
page.on('requestfailed', (r) => logs.push(`[reqfail] ${r.url()} ${r.failure()?.errorText}`))

await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 })

let done = false
const start = Date.now()
while (Date.now() - start < timeout) {
  const text = await page.evaluate(() => document.body.innerText)
  if (text.includes(waitFor) || text.includes('THREW:')) { done = true; break }
  await new Promise((r) => setTimeout(r, 1000))
}
const text = await page.evaluate(() => document.body.innerText)
console.log('=== PAGE TEXT ===')
console.log(text.slice(0, 12000))
console.log('=== CONSOLE ===')
console.log(logs.slice(-40).join('\n'))
console.log('=== reached marker:', done, 'in', ((Date.now() - start) / 1000).toFixed(1), 's ===')
await browser.close()

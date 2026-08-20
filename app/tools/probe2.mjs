import puppeteer from 'puppeteer-core'
const browser = await puppeteer.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: 'new', args: ['--no-sandbox'],
})
const page = await browser.newPage()
await page.setViewport({ width: 1440, height: 1000 })
const errs = []
page.on('pageerror', (e) => errs.push(e.message))
page.on('console', (m) => { if (m.type() === 'error') errs.push('[console] ' + m.text()) })
await page.goto(process.argv[2], { waitUntil: 'networkidle2', timeout: 90000 })
// scroll through the whole page so every lazy lab runs
for (let i = 0; i < 40; i++) {
  await page.evaluate(() => window.scrollBy(0, window.innerHeight * 0.8))
  await new Promise((r) => setTimeout(r, 350))
}
await new Promise((r) => setTimeout(r, 4000))
const outs = await page.evaluate(() =>
  [...document.querySelectorAll('iframe')].map((f) => (f.contentDocument?.body?.innerText || '').trim().slice(0, 70)),
)
console.log('iframe outputs:')
outs.forEach((o, i) => console.log(` ${i}: ${JSON.stringify(o)}`))
if (errs.length) console.log('ERRORS:\n' + errs.slice(0, 10).join('\n'))
await browser.close()

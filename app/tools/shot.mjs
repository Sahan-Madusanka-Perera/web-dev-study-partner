import puppeteer from 'puppeteer-core'
import { mkdirSync } from 'node:fs'

const targets = process.argv.slice(2)
mkdirSync('shots', { recursive: true })

const browser = await puppeteer.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: 'new',
  args: ['--no-sandbox', '--disable-dev-shm-usage', '--force-device-scale-factor=2'],
})

const errors = []
for (const spec of targets) {
  const [name, url, w = '1440', h = '1000', theme = 'light', full = 'full'] = spec.split('|')
  const page = await browser.newPage()
  page.on('pageerror', (e) => errors.push(`${name}: ${e.message}`))
  page.on('console', (m) => { if (m.type() === 'error') errors.push(`${name} [console] ${m.text()}`) })
  await page.setViewport({ width: +w, height: +h, deviceScaleFactor: 2 })
  await page.evaluateOnNewDocument((t) => {
    try { localStorage.setItem('wdsp.theme', t) } catch {}
  }, theme)
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 })
  await new Promise((r) => setTimeout(r, 1400))
  await page.screenshot({ path: `shots/${name}.png`, fullPage: full === 'full' })
  console.log('shot', name)
  await page.close()
}
if (errors.length) { console.log('--- ERRORS ---'); console.log(errors.slice(0, 20).join('\n')) }
await browser.close()

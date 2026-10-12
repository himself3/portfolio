// Renders cv/resume.html to public/resume.pdf using a locally installed Chromium browser.
// Usage: npm run cv   (override the browser with CHROME_PATH=/path/to/chrome)
import { spawn, spawnSync } from 'node:child_process'
import { copyFileSync, existsSync, mkdtempSync, readFileSync, rmSync, statSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const root = resolve(import.meta.dirname, '..')
const source = join(root, 'cv', 'resume.html')
const output = join(root, 'public', 'resume.pdf')

const candidates = [
  process.env.CHROME_PATH,
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
].filter(Boolean)

const browser = candidates.find((p) => existsSync(p))
if (!browser) {
  console.error('No Chrome/Edge/Chromium found. Set CHROME_PATH to a Chromium-based browser.')
  process.exit(1)
}

// A throwaway profile keeps this isolated from any browser windows you have open.
// Headless Edge on Windows can linger after printing, so we wait for the PDF to land
// in a temp file, then stop only the browser process we started.
const profile = mkdtempSync(join(tmpdir(), 'cv-profile-'))
const tempPdf = join(profile, 'resume.pdf')
const child = spawn(
  browser,
  [
    '--headless=new',
    '--disable-gpu',
    '--disable-extensions',
    `--user-data-dir=${profile}`,
    '--no-pdf-header-footer',
    '--virtual-time-budget=10000', // let web fonts load before printing
    `--print-to-pdf=${tempPdf}`,
    pathToFileURL(source).href,
  ],
  { stdio: 'ignore' },
)

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
let lastSize = -1
let ready = false
for (let waited = 0; waited < 120_000 && !ready; waited += 500) {
  await sleep(500)
  const size = existsSync(tempPdf) ? statSync(tempPdf).size : 0
  ready = size > 0 && size === lastSize // unchanged for one tick = finished writing
  lastSize = size
}
// Stop the browser and its helper processes (only the tree we spawned).
if (process.platform === 'win32') spawnSync('taskkill', ['/PID', String(child.pid), '/T', '/F'], { stdio: 'ignore' })
else child.kill()
await sleep(1000)

if (ready) copyFileSync(tempPdf, output) // copy, not rename: temp may be on another drive
try {
  rmSync(profile, { recursive: true, force: true, maxRetries: 10, retryDelay: 500 })
} catch {
  // Browser helper processes can hold the temp profile briefly; the OS cleans temp later.
}
if (!ready) {
  console.error('Timed out waiting for the browser to print the PDF.')
  process.exit(1)
}

const size = existsSync(output) ? statSync(output).size : 0
if (size < 10_000) {
  console.error(`PDF generation failed (output is ${size} bytes).`)
  process.exit(1)
}
const pages = (readFileSync(output, 'latin1').match(/\/Type\s*\/Page[^s]/g) || []).length
console.log(`Wrote ${output} (${Math.round(size / 1024)} KB, ${pages} page${pages === 1 ? '' : 's'})`)
if (pages > 1) console.warn('Warning: the CV runs past one page. Trim content in cv/resume.html to keep it to a single page.')

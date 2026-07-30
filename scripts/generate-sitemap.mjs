/**
 * Generates public/sitemap.xml for allenfirth.info and ensures
 * staticwebapp.config.json is present under public/ so it ships in
 * .output/public (Azure SWA output_location).
 *
 * WORK_SLUGS must stay in sync with src/content/work.ts
 * (asserted by tests/work.test.ts).
 */
import { copyFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const siteUrl = 'https://allenfirth.info'
const staticRoutes = ['/', '/about', '/experience', '/skills', '/contact', '/work']

// Must match getAllWork().map(w => w.slug) — see tests/work.test.ts
const WORK_SLUGS = [
  'uniper-valuation-desktop',
  'lseg-tm3',
  'spar-datalake',
  'anglo-live-exposure',
]

const urls = [
  ...staticRoutes,
  ...WORK_SLUGS.map((slug) => `/work/${slug}`),
]

const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map((u) => `  <url><loc>${siteUrl}${u === '/' ? '' : u}</loc></url>`)
  .join('\n')}
</urlset>
`

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const publicDir = join(root, 'public')

writeFileSync(join(publicDir, 'sitemap.xml'), body)
console.log(`Wrote public/sitemap.xml (${urls.length} urls)`)

// Azure deploys only .output/public; copy SWA config into public so Vite emits it.
copyFileSync(
  join(root, 'staticwebapp.config.json'),
  join(publicDir, 'staticwebapp.config.json'),
)
console.log('Copied staticwebapp.config.json → public/')

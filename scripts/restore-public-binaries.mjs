/**
 * Copy binary files from public/ over .output/public after prerender.
 *
 * TanStack Start crawlLinks can fetch /allenfirth-cv.pdf and rewrite it with
 * res.text() (UTF-8), which replaces high bytes with U+FFFD and yields a
 * blank PDF. Filter in vite.config should skip those paths; this copy is the
 * last-line restore so the deployed file stays a valid binary PDF.
 */
import { copyFileSync, existsSync, readdirSync } from 'node:fs'
import { dirname, extname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const BINARY_EXTS = new Set(['.pdf'])

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const publicDir = join(root, 'public')
const outDir = join(root, '.output', 'public')

if (!existsSync(outDir)) {
  throw new Error(`Missing ${outDir} — run vite build first`)
}

const names = readdirSync(publicDir).filter((name) =>
  BINARY_EXTS.has(extname(name).toLowerCase()),
)

if (names.length === 0) {
  throw new Error(`No ${[...BINARY_EXTS].join(', ')} files found in public/`)
}

for (const name of names) {
  copyFileSync(join(publicDir, name), join(outDir, name))
  console.log(`Restored binary ${name} → .output/public/`)
}

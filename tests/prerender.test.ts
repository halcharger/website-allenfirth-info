import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { shouldPrerenderPath } from '../src/lib/prerender'
import { site } from '../src/content/site'

describe('shouldPrerenderPath', () => {
  it('skips the CV PDF so crawlLinks cannot UTF-8-corrupt it', () => {
    expect(shouldPrerenderPath(site.links.cv)).toBe(false)
    expect(shouldPrerenderPath('/allenfirth-cv.pdf')).toBe(false)
    expect(shouldPrerenderPath('/allenfirth-cv.pdf?download=1')).toBe(false)
  })

  it('still prerenders app routes discovered by crawlLinks', () => {
    expect(shouldPrerenderPath('/')).toBe(true)
    expect(shouldPrerenderPath('/about')).toBe(true)
    expect(shouldPrerenderPath('/work/uniper-valuation-desktop')).toBe(true)
  })

  it('is wired into vite prerender so crawlLinks cannot overwrite public binaries', () => {
    const config = readFileSync('vite.config.ts', 'utf8')
    expect(config).toContain('shouldPrerenderPath')
    expect(config).toMatch(/filter:\s*\(page\)\s*=>\s*shouldPrerenderPath\(page\.path\)/)
  })
})

describe('CV PDF source', () => {
  it('is a binary PDF, not UTF-8-replaced text', () => {
    const bytes = readFileSync('public/allenfirth-cv.pdf')
    expect(bytes.subarray(0, 5).toString('latin1')).toBe('%PDF-')
    // %PDF-1.7\r\n% then a high-bit marker (0xB5). UTF-8 mangling turns that
    // into U+FFFD (EF BF BD) and blank pages in viewers.
    expect(bytes[11]).toBe(0xb5)
  })
})


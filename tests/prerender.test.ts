import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { shouldPrerenderPath } from '../src/lib/prerender'
import { site } from '../src/content/site'

describe('shouldPrerenderPath', () => {
  it('skips the CV PDF so crawlLinks cannot UTF-8-corrupt it', () => {
    expect(shouldPrerenderPath(site.links.cv)).toBe(false)
    expect(shouldPrerenderPath(site.links.cvFrontend)).toBe(false)
    expect(shouldPrerenderPath(site.links.cvBackend)).toBe(false)
    expect(shouldPrerenderPath('/allenfirth-cv.pdf')).toBe(false)
    expect(shouldPrerenderPath('/allenfirth-cv-frontend.pdf')).toBe(false)
    expect(shouldPrerenderPath('/allenfirth-cv-backend.pdf')).toBe(false)
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
    for (const path of [
      site.links.cv,
      site.links.cvFrontend,
      site.links.cvBackend,
    ]) {
      const bytes = readFileSync(`public${path}`)
      expect(bytes.subarray(0, 5).toString('latin1')).toBe('%PDF-')
      // The header comment includes a high-bit marker. UTF-8 mangling turns that
      // into U+FFFD (EF BF BD) and blank pages in viewers.
      expect([...bytes.subarray(0, 20)].some((byte) => byte >= 0x80)).toBe(true)
    }
  })

  it('keeps specialist CVs as quiet links under the primary download', () => {
    const home = readFileSync('src/routes/index.tsx', 'utf8')
    const contact = readFileSync('src/routes/contact.tsx', 'utf8')
    const header = readFileSync('src/components/Header.tsx', 'utf8')

    expect(home.match(/<SpecialistCvLinks \/>/g)).toHaveLength(1)
    expect(contact.match(/<SpecialistCvLinks \/>/g)).toHaveLength(1)
    expect(home.match(/Download Fullstack CV/g)).toHaveLength(2)
    expect(contact).toContain('Download Fullstack CV')
    expect(header).toContain('Download Fullstack CV')
    expect(header).not.toContain('SpecialistCvLinks')
    expect(header).not.toContain('cvFrontend')
    expect(header).not.toContain('cvBackend')
  })
})


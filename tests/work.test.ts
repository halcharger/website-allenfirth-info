import { describe, expect, it } from 'vitest'
import { getAllWork, getFeaturedWork, getWorkBySlug } from '../src/content'

// Must match WORK_SLUGS in scripts/generate-sitemap.mjs
const SITEMAP_SLUGS = [
  'uniper-valuation-desktop',
  'lseg-tm3',
  'spar-datalake',
  'anglo-live-exposure',
]

describe('work content', () => {
  it('returns unique slugs', () => {
    const slugs = getAllWork().map((w) => w.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })
  it('resolves uniper slug', () => {
    expect(getWorkBySlug('uniper-valuation-desktop')?.client).toMatch(/Uniper/i)
  })
  it('featured list respects limit', () => {
    expect(getFeaturedWork(2).length).toBeLessThanOrEqual(2)
  })
  it('slugs stay in sync with sitemap script list', () => {
    expect(getAllWork().map((w) => w.slug).sort()).toEqual(
      [...SITEMAP_SLUGS].sort(),
    )
  })
})

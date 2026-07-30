import { describe, expect, it } from 'vitest'
import { getAllWork, getFeaturedWork, getWorkBySlug } from '../src/content'

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
})

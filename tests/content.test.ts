import { describe, expect, it } from 'vitest'
import { experience, getRecentRoles, skillGroups } from '../src/content'

describe('experience content', () => {
  it('has unique ids', () => {
    const ids = experience.map((r) => r.id)
    expect(new Set(ids).size).toBe(ids.length)
  })
  it('includes Uniper engagement', () => {
    expect(experience.some((r) => /uniper/i.test(r.company + r.title))).toBe(true)
  })
  it('lists the current corfinancial Salerio contract first', () => {
    const role = experience[0]
    expect(role).toMatchObject({
      id: 'corfinancial-salerio',
      company: 'corfinancial',
      title: 'Lead front-end developer — Salerio',
      start: '2026-02',
      end: null,
      location: 'London, UK — remote',
      employment: 'via Digiterre',
      stack: ['React', 'TypeScript', 'Zustand', 'Zod'],
      links: [
        {
          label: 'corfinancial Salerio product information',
          href: 'https://www.corfinancialgroup.com/financial-software-products/salerio-post-trade-processing/',
        },
      ],
    })
    expect(role?.summary).toMatch(/Salerio/)
    expect(role?.summary).toMatch(/React and TypeScript/)
    expect(role?.bullets.join(' ')).toMatch(/90%/)
    expect(getRecentRoles(3).map((item) => item.id)).toEqual([
      'corfinancial-salerio',
      'uniper-ppa-valuation',
      'corfinancial-bitarisk',
    ])
  })
  it('getRecentRoles returns at most N newest', () => {
    const recent = getRecentRoles(2)
    expect(recent.length).toBeLessThanOrEqual(2)
    // first item should be the first in experience array (newest-first convention)
    expect(recent[0]?.id).toBe(experience[0]?.id)
  })
})

describe('skills content', () => {
  it('has Cloud and Backend groups', () => {
    const layers = skillGroups.map((g) => g.layer)
    expect(layers).toEqual(expect.arrayContaining(['Cloud', 'Backend']))
  })

  it('includes PostgreSQL on the Data card, including the home snapshot first four', () => {
    const data = skillGroups.find((g) => g.layer === 'Data')
    expect(data?.items).toContain('PostgreSQL')
    expect(data?.items.slice(0, 4)).toContain('PostgreSQL')
  })
})

import { describe, expect, it } from 'vitest'
import { experience, getRecentRoles, skillGroups } from '../src/content'

describe('experience content', () => {
  it('has unique ids', () => {
    const ids = experience.map((r) => r.id)
    expect(new Set(ids).size).toBe(ids.length)
  })
  it('lists the older corfinancial bitarisk engagement as Jul 2024 – Mar 2025', () => {
    const role = experience.find((r) => r.id === 'corfinancial-bitarisk')
    expect(role).toMatchObject({
      company: 'corfinancial',
      start: '2024-07',
      end: '2025-03',
    })
    expect(experience[0]?.id).not.toBe('corfinancial-bitarisk')
  })
  it('lists Uniper after LSEG at Jul 2022 – May 2023', () => {
    const ids = experience.map((r) => r.id)
    const role = experience.find((r) => r.id === 'uniper-ppa-valuation')
    expect(role).toMatchObject({
      company: 'Uniper',
      start: '2022-07',
      end: '2023-05',
    })
    expect(ids.indexOf('uniper-ppa-valuation')).toBe(ids.indexOf('lseg-tm3') + 1)
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
      'stuart-peters-plm',
      'corfinancial-bitarisk',
    ])
  })
  it('lists the Stuart Peters PLM engagement second', () => {
    const role = experience[1]
    expect(role).toMatchObject({
      id: 'stuart-peters-plm',
      company: 'Stuart Peters',
      title: 'Business analyst and software architect — PLM replacement',
      start: '2025-04',
      end: '2025-12',
      location: 'London, UK and Hong Kong',
      employment: 'via CodeStream',
      stack: ['React', 'MongoDB'],
      links: [
        {
          label: 'Stuart Peters',
          href: 'https://www.speters.co.uk/',
        },
      ],
    })
    expect(role?.summary).toMatch(/Lectra Kubix Link/)
    expect(role?.summary).toMatch(/130-page report/)
    expect(role?.bullets.join(' ')).toMatch(/Hong Kong/)
    expect(role?.bullets.join(' ')).toMatch(/130-page report/)
    expect(role?.bullets.join(' ')).toMatch(/supplier workflows/)
  })
  it('lists the Clifford Chance engagement via CodeStream', () => {
    const role = experience.find((item) => item.id === 'clifford-chance-partner-remuneration')
    expect(role).toMatchObject({
      company: 'Clifford Chance',
      employment: 'via CodeStream',
    })
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

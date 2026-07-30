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
})

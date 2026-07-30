import { describe, expect, it } from 'vitest'
import { formatDateRange } from '../src/lib/dates'

describe('formatDateRange', () => {
  it('formats year-month range', () => {
    expect(formatDateRange('2022-07', '2025-03')).toBe('Jul 2022 – Mar 2025')
  })
  it('uses Present when end is null', () => {
    expect(formatDateRange('2025-04', null)).toBe('Apr 2025 – Present')
  })
  it('formats year-only', () => {
    expect(formatDateRange('2017', '2021')).toBe('2017 – 2021')
  })
})

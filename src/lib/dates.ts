const monthYearFormatter = new Intl.DateTimeFormat('en-GB', {
  month: 'short',
  year: 'numeric',
})

function formatDatePart(value: string): string {
  // Year-only: pass through
  if (/^\d{4}$/.test(value)) {
    return value
  }

  // YYYY-MM → "Mon YYYY" via en-GB short month
  const match = /^(\d{4})-(\d{2})$/.exec(value)
  if (!match) {
    return value
  }

  const year = Number(match[1])
  const monthIndex = Number(match[2]) - 1
  return monthYearFormatter.format(new Date(year, monthIndex, 1))
}

/**
 * Format a start/end date range for experience and similar content.
 * Accepts `YYYY-MM` or `YYYY`; `end` null renders as "Present".
 */
export function formatDateRange(start: string, end: string | null): string {
  const startLabel = formatDatePart(start)
  const endLabel = end === null ? 'Present' : formatDatePart(end)
  return `${startLabel} – ${endLabel}`
}

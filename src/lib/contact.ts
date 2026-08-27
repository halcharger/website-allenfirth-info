export type ContactFormValues = {
  name: string
  email: string
  message: string
}

const LIMITS = {
  name: 120,
  email: 254,
  message: 5000,
} as const

/** Basic email shape: local@domain.tld */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function isNonEmpty(value: string, max: number) {
  const trimmed = value.trim()
  return trimmed.length > 0 && trimmed.length <= max
}

export function isValidEmail(value: string) {
  const trimmed = value.trim()
  return (
    trimmed.length > 0 &&
    trimmed.length <= LIMITS.email &&
    EMAIL_PATTERN.test(trimmed)
  )
}

export function isContactFormValid(values: ContactFormValues) {
  return (
    isNonEmpty(values.name, LIMITS.name) &&
    isValidEmail(values.email) &&
    isNonEmpty(values.message, LIMITS.message)
  )
}

export const contactFieldLimits = LIMITS

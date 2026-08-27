import { describe, expect, it } from 'vitest'
import {
  contactFieldLimits,
  isContactFormValid,
  isValidEmail,
} from '../src/lib/contact'

describe('isValidEmail', () => {
  it('accepts a basic address', () => {
    expect(isValidEmail('allen@codestream.co.za')).toBe(true)
  })

  it('rejects empty, missing domain, and over-limit values', () => {
    expect(isValidEmail('')).toBe(false)
    expect(isValidEmail('not-an-email')).toBe(false)
    expect(isValidEmail('a@b')).toBe(false)
    expect(isValidEmail(`${'a'.repeat(250)}@x.co`)).toBe(false)
  })
})

describe('isContactFormValid', () => {
  const valid = {
    name: 'Jane Recruiter',
    email: 'jane@example.com',
    message: 'Hello — interested in a role.',
  }

  it('requires name, email, and message', () => {
    expect(isContactFormValid(valid)).toBe(true)
    expect(isContactFormValid({ ...valid, name: '  ' })).toBe(false)
    expect(isContactFormValid({ ...valid, email: 'bad' })).toBe(false)
    expect(isContactFormValid({ ...valid, message: '' })).toBe(false)
  })

  it('enforces field length limits', () => {
    expect(
      isContactFormValid({
        ...valid,
        name: 'n'.repeat(contactFieldLimits.name + 1),
      }),
    ).toBe(false)
    expect(
      isContactFormValid({
        ...valid,
        message: 'm'.repeat(contactFieldLimits.message + 1),
      }),
    ).toBe(false)
  })
})

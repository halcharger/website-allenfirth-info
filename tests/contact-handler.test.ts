import { afterEach, describe, expect, it, vi } from 'vitest'
import { handleContactPost } from '../src/lib/contact-handler'

const validBody = {
  name: 'Jane Recruiter',
  email: 'jane@example.com',
  message: 'Hello — interested in a role.',
}

const env = {
  RESEND_API_KEY: 're_test_key',
  CONTACT_TO: 'allen@codestream.co.za',
  CONTACT_FROM: 'Allen Firth <noreply@codestream.co.za>',
}

function jsonRequest(body: unknown, contentType = 'application/json') {
  return { contentType, body }
}

afterEach(() => {
  vi.unstubAllGlobals()
  vi.restoreAllMocks()
})

describe('handleContactPost', () => {
  it('rejects non-JSON content types', async () => {
    const result = await handleContactPost(
      jsonRequest(validBody, 'text/plain'),
      env,
    )
    expect(result.status).toBe(415)
    expect(result.body).toEqual({ error: 'Unsupported media type' })
  })

  it('returns fake success when the honeypot is filled', async () => {
    const fetchMock = vi.fn()
    const result = await handleContactPost(
      jsonRequest({ ...validBody, company: 'Acme Bot Ltd' }),
      env,
      { fetchImpl: fetchMock },
    )
    expect(result.status).toBe(200)
    expect(result.body).toEqual({ ok: true })
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('rejects missing or invalid fields', async () => {
    const result = await handleContactPost(
      jsonRequest({ name: 'Jane', email: 'bad', message: 'Hi' }),
      env,
    )
    expect(result.status).toBe(400)
    expect(result.body).toEqual({
      error: 'Please provide a valid name, email, and message',
    })
  })

  it('fails closed when Resend is not configured', async () => {
    const result = await handleContactPost(jsonRequest(validBody), {
      ...env,
      RESEND_API_KEY: '',
    })
    expect(result.status).toBe(500)
    expect(result.body).toEqual({ error: 'Contact form is not configured' })
  })

  it('sends via Resend with reply_to set to the visitor', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true })
    const result = await handleContactPost(jsonRequest(validBody), env, {
      fetchImpl: fetchMock,
      now: () => new Date('2026-08-27T12:00:00.000Z'),
    })

    expect(result).toEqual({ status: 200, body: { ok: true } })
    expect(fetchMock).toHaveBeenCalledTimes(1)

    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit]
    expect(url).toBe('https://api.resend.com/emails')
    expect(init.method).toBe('POST')
    expect(init.headers).toMatchObject({
      authorization: 'Bearer re_test_key',
      'content-type': 'application/json',
    })

    const payload = JSON.parse(String(init.body)) as {
      from: string
      to: string[]
      reply_to: string
      subject: string
      text: string
    }
    expect(payload.from).toBe(env.CONTACT_FROM)
    expect(payload.to).toEqual([env.CONTACT_TO])
    expect(payload.reply_to).toBe(validBody.email)
    expect(payload.subject).toBe('Website enquiry from Jane Recruiter')
    expect(payload.text).toContain('Jane Recruiter')
    expect(payload.text).toContain(validBody.message)
  })

  it('returns 502 when Resend rejects the send', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: false, status: 401 })
    const result = await handleContactPost(jsonRequest(validBody), env, {
      fetchImpl: fetchMock,
    })
    expect(result.status).toBe(502)
    expect(result.body).toEqual({ error: 'Failed to send message' })
  })
})

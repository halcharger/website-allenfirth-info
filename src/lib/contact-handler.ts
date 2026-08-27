import { contactFieldLimits, isValidEmail } from './contact'

export type ContactEnv = {
  RESEND_API_KEY?: string
  CONTACT_TO?: string
  CONTACT_FROM?: string
}

export type ContactRequest = {
  contentType: string | null
  body: unknown
}

export type ContactResult = {
  status: number
  body: Record<string, unknown>
}

type ContactBody = {
  name?: unknown
  email?: unknown
  message?: unknown
  company?: unknown
}

const DEFAULT_TO = 'allen@codestream.co.za'
const DEFAULT_FROM = 'Allen Firth <noreply@codestream.co.za>'

function asTrimmedString(value: unknown, max: number): string | null {
  if (typeof value !== 'string') return null
  const trimmed = value.trim()
  if (!trimmed || trimmed.length > max) return null
  return trimmed
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

export async function handleContactPost(
  request: ContactRequest,
  env: ContactEnv,
  options?: {
    fetchImpl?: typeof fetch
    now?: () => Date
    logError?: (message: string, extra?: Record<string, unknown>) => void
  },
): Promise<ContactResult> {
  const contentType = request.contentType ?? ''
  if (!contentType.toLowerCase().includes('application/json')) {
    return { status: 415, body: { error: 'Unsupported media type' } }
  }

  const raw = request.body
  if (raw === null || typeof raw !== 'object' || Array.isArray(raw)) {
    return { status: 400, body: { error: 'Invalid JSON body' } }
  }

  const body = raw as ContactBody

  if (typeof body.company === 'string' && body.company.trim() !== '') {
    return { status: 200, body: { ok: true } }
  }

  const name = asTrimmedString(body.name, contactFieldLimits.name)
  const email = asTrimmedString(body.email, contactFieldLimits.email)
  const message = asTrimmedString(body.message, contactFieldLimits.message)

  if (!name || !email || !message || !isValidEmail(email)) {
    return {
      status: 400,
      body: { error: 'Please provide a valid name, email, and message' },
    }
  }

  const apiKey = env.RESEND_API_KEY?.trim()
  if (!apiKey) {
    return { status: 500, body: { error: 'Contact form is not configured' } }
  }

  const to = env.CONTACT_TO?.trim() || DEFAULT_TO
  const from = env.CONTACT_FROM?.trim() || DEFAULT_FROM
  const now = options?.now ?? (() => new Date())
  const sentAt = now().toISOString()

  const text = [
    'New website enquiry',
    '',
    `Name: ${name}`,
    `Email: ${email}`,
    `Sent at: ${sentAt}`,
    '',
    'Message:',
    message,
  ].join('\n')

  const html = `
    <div style="font-family: system-ui, sans-serif; line-height: 1.5; color: #18181b;">
      <h2 style="margin: 0 0 16px;">New website enquiry</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Sent at:</strong> ${escapeHtml(sentAt)}</p>
      <p style="margin-top: 20px;"><strong>Message</strong></p>
      <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
    </div>
  `

  const fetchImpl = options?.fetchImpl ?? fetch
  const resendResponse = await fetchImpl('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      authorization: `Bearer ${apiKey}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: email,
      subject: `Website enquiry from ${name}`,
      text,
      html,
    }),
  })

  if (!resendResponse.ok) {
    let detail = ''
    try {
      detail = (await resendResponse.text()).slice(0, 1000)
    } catch {
      detail = ''
    }
    const logError = options?.logError ?? console.error
    logError('Resend rejected contact email', {
      status: resendResponse.status,
      from,
      to,
      detail,
    })
    return { status: 502, body: { error: 'Failed to send message' } }
  }

  return { status: 200, body: { ok: true } }
}

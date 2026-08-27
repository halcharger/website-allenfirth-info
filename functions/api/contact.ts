import { handleContactPost } from '../../src/lib/contact-handler'

interface Env {
  RESEND_API_KEY?: string
  CONTACT_TO?: string
  CONTACT_FROM?: string
}

type PagesContext = {
  request: Request
  env: Env
}

function json(status: number, body: Record<string, unknown>) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
    },
  })
}

export async function onRequestPost(context: PagesContext) {
  const { request, env } = context
  const contentType = request.headers.get('content-type') ?? ''
  if (!contentType.toLowerCase().includes('application/json')) {
    return json(415, { error: 'Unsupported media type' })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return json(400, { error: 'Invalid JSON body' })
  }

  const result = await handleContactPost({ contentType, body }, env)
  return json(result.status, result.body)
}

export async function onRequest(context: PagesContext) {
  if (context.request.method === 'POST') {
    return onRequestPost(context)
  }
  return json(405, { error: 'Method not allowed' })
}

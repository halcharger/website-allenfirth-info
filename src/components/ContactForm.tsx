import { useState, type FormEvent } from 'react'
import { Button } from '@/components/Button'
import {
  contactFieldLimits,
  isContactFormValid,
  type ContactFormValues,
} from '@/lib/contact'
import { site } from '@/content/site'
import { twMerge } from 'tailwind-merge'

type Status = 'idle' | 'submitting' | 'success' | 'error'

const emptyValues: ContactFormValues = {
  name: '',
  email: '',
  message: '',
}

/** Stable IDs — avoid useId(); prerender HTML must match client hydration. */
const FIELD_IDS = {
  name: 'contact-name',
  email: 'contact-email',
  message: 'contact-message',
  company: 'contact-company',
} as const

const fieldClassName =
  'mt-2 min-h-11 w-full rounded-md border border-border bg-bg px-3 py-2.5 text-sm text-text outline-none transition-colors placeholder:text-text-subtle focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:opacity-50'

export function ContactForm() {
  const [values, setValues] = useState<ContactFormValues>(emptyValues)
  const [honeypot, setHoneypot] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const valid = isContactFormValid(values)
  const busy = status === 'submitting'
  const canSubmit = valid && !busy

  function updateField<K extends keyof ContactFormValues>(key: K, value: string) {
    setValues((current) => ({ ...current, [key]: value }))
    if (status === 'success' || status === 'error') {
      setStatus('idle')
      setErrorMessage(null)
    }
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!canSubmit) return

    setStatus('submitting')
    setErrorMessage(null)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          message: values.message.trim(),
          company: honeypot,
        }),
      })

      const payload = (await response.json().catch(() => null)) as
        | { ok?: boolean; error?: string }
        | null

      if (!response.ok || !payload?.ok) {
        setStatus('error')
        setErrorMessage(payload?.error ?? 'Something went wrong. Please try again.')
        return
      }

      setValues(emptyValues)
      setHoneypot('')
      setStatus('success')
    } catch {
      setStatus('error')
      setErrorMessage(
        'Could not reach the server. Please try again or email me directly.',
      )
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-lg border border-border bg-surface p-6 sm:p-8"
      noValidate
      aria-busy={busy}
    >
      <p className="font-mono text-xs uppercase tracking-wider text-text-subtle">
        Message
      </p>
      <p className="mt-2 text-sm leading-relaxed text-text-muted">
        Send a note and I will get back to you. Or email{' '}
        <a
          href={`mailto:${site.email}`}
          className="text-text transition-colors hover:text-accent"
        >
          {site.email}
        </a>
        .
      </p>

      <div className="relative mt-6 space-y-4">
        <div>
          <label
            htmlFor={FIELD_IDS.name}
            className="font-mono text-xs uppercase tracking-wider text-text-subtle"
          >
            Name
          </label>
          <input
            id={FIELD_IDS.name}
            name="name"
            type="text"
            autoComplete="name"
            required
            maxLength={contactFieldLimits.name}
            value={values.name}
            disabled={busy}
            onChange={(event) => updateField('name', event.target.value)}
            className={fieldClassName}
          />
        </div>

        <div>
          <label
            htmlFor={FIELD_IDS.email}
            className="font-mono text-xs uppercase tracking-wider text-text-subtle"
          >
            Email
          </label>
          <input
            id={FIELD_IDS.email}
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={contactFieldLimits.email}
            value={values.email}
            disabled={busy}
            onChange={(event) => updateField('email', event.target.value)}
            className={fieldClassName}
          />
        </div>

        <div>
          <label
            htmlFor={FIELD_IDS.message}
            className="font-mono text-xs uppercase tracking-wider text-text-subtle"
          >
            Message
          </label>
          <textarea
            id={FIELD_IDS.message}
            name="message"
            required
            rows={5}
            maxLength={contactFieldLimits.message}
            value={values.message}
            disabled={busy}
            onChange={(event) => updateField('message', event.target.value)}
            className={twMerge(fieldClassName, 'min-h-28 resize-y')}
          />
        </div>

        <div
          className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden"
          aria-hidden="true"
        >
          <label htmlFor={FIELD_IDS.company}>Company</label>
          <input
            id={FIELD_IDS.company}
            name="company"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(event) => setHoneypot(event.target.value)}
          />
        </div>
      </div>

      <div className="mt-6">
        <Button type="submit" disabled={!canSubmit} className="w-full sm:w-auto">
          {busy ? 'Sending…' : 'Send'}
        </Button>
      </div>

      <div className="mt-4 min-h-6" aria-live="polite">
        {status === 'success' ? (
          <p className="text-sm text-text">Thanks — your message is on its way.</p>
        ) : null}
        {status === 'error' && errorMessage ? (
          <p className="text-sm text-red-600 dark:text-red-400">{errorMessage}</p>
        ) : null}
      </div>
    </form>
  )
}

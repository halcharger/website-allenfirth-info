import * as React from 'react'
import { twMerge } from 'tailwind-merge'

export function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  className,
}: {
  id?: string
  eyebrow?: string
  title?: string
  description?: string
  children?: React.ReactNode
  className?: string
}) {
  return (
    <section id={id} className={twMerge('py-12 sm:py-16', className)}>
      {(eyebrow || title || description) && (
        <header className="mb-8 max-w-2xl">
          {eyebrow ? (
            <p className="mb-2 font-mono text-xs uppercase tracking-wider text-text-subtle">
              {eyebrow}
            </p>
          ) : null}
          {title ? (
            <h2 className="text-xl font-semibold tracking-tight text-text sm:text-2xl">
              {title}
            </h2>
          ) : null}
          {description ? (
            <p className="mt-3 text-base leading-relaxed text-text-muted">
              {description}
            </p>
          ) : null}
        </header>
      )}
      {children}
    </section>
  )
}

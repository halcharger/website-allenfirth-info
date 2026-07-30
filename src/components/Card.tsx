import * as React from 'react'
import { twMerge } from 'tailwind-merge'

export function Card({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={twMerge(
        'rounded-lg border border-border bg-surface p-6 transition-colors hover:border-accent/30',
        className,
      )}
    >
      {children}
    </div>
  )
}

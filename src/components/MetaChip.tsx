import * as React from 'react'
import { twMerge } from 'tailwind-merge'

export function MetaChip({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <span
      className={twMerge(
        'inline-flex items-center rounded-full border border-border bg-bg px-2.5 py-0.5 font-mono text-xs text-text-muted',
        className,
      )}
    >
      {children}
    </span>
  )
}

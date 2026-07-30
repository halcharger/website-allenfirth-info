import { Link } from '@tanstack/react-router'
import * as React from 'react'
import { twMerge } from 'tailwind-merge'

const variants = {
  primary: 'bg-accent text-white hover:bg-accent-hover',
  secondary:
    'border border-border bg-surface text-text hover:border-accent/40 hover:text-accent',
  ghost: 'text-text-muted hover:bg-surface hover:text-text',
} as const

export type ButtonProps = {
  variant?: keyof typeof variants
  href?: string
  children: React.ReactNode
  className?: string
} & React.ButtonHTMLAttributes<HTMLButtonElement>

const base =
  'inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:pointer-events-none disabled:opacity-50'

function isAppRoute(href: string) {
  return href.startsWith('/') && !href.startsWith('//') && !href.includes('.')
}

export function Button({
  variant = 'primary',
  href,
  children,
  className,
  type = 'button',
  ...rest
}: ButtonProps) {
  const classes = twMerge(base, variants[variant], className)

  if (href) {
    if (isAppRoute(href)) {
      return (
        <Link to={href as never} className={classes}>
          {children}
        </Link>
      )
    }

    const external = /^https?:\/\//.test(href)
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
      >
        {children}
      </a>
    )
  }

  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  )
}

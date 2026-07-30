import { Link, useLocation } from '@tanstack/react-router'
import { twMerge } from 'tailwind-merge'
import { site } from '@/content/site'
import { Container } from './Container'
import { ThemeToggle } from './ThemeToggle'

export const navItems = [
  { label: 'About', to: '/about' },
  { label: 'Experience', to: '/experience' },
  { label: 'Work', to: '/work' },
  { label: 'Skills', to: '/skills' },
  { label: 'Contact', to: '/contact' },
] as const

function isActivePath(pathname: string, to: string) {
  return pathname === to || pathname.startsWith(`${to}/`)
}

export function Header() {
  const pathname = useLocation({ select: (location) => location.pathname })

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface/90 backdrop-blur">
      <Container className="flex h-14 items-center justify-between gap-4">
        <Link
          to="/"
          className="shrink-0 font-semibold tracking-tight text-text transition-colors hover:text-accent"
        >
          {site.name}
        </Link>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-5 text-sm md:flex"
        >
          {navItems.map((item) => {
            const active = isActivePath(pathname, item.to)
            return (
              <Link
                key={item.to}
                to={item.to as never}
                className={twMerge(
                  'transition-colors hover:text-accent',
                  active
                    ? 'font-medium text-accent'
                    : 'text-text-muted',
                )}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-3">
          {site.links.cv ? (
            <a
              href={site.links.cv}
              className="hidden text-sm text-text-muted transition-colors hover:text-accent sm:inline"
            >
              Download CV
            </a>
          ) : null}
          <ThemeToggle />
        </div>
      </Container>

      {/* Compact mobile nav */}
      <Container className="border-t border-border py-2 md:hidden">
        <nav
          aria-label="Primary mobile"
          className="flex gap-4 overflow-x-auto text-sm whitespace-nowrap"
        >
          {navItems.map((item) => {
            const active = isActivePath(pathname, item.to)
            return (
              <Link
                key={item.to}
                to={item.to as never}
                className={twMerge(
                  'transition-colors hover:text-accent',
                  active
                    ? 'font-medium text-accent'
                    : 'text-text-muted',
                )}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>
      </Container>
    </header>
  )
}

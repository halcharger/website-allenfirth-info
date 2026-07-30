import { Link } from '@tanstack/react-router'
import { site } from '@/content/site'
import { Container } from './Container'
import { navItems } from './Header'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-surface">
      <Container className="flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <nav
          aria-label="Footer"
          className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-text-muted"
        >
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to as never}
              className="transition-colors hover:text-accent"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-2 text-sm text-text-subtle sm:items-end">
          <div className="flex gap-4">
            <a
              href={site.links.github}
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-accent"
            >
              GitHub
            </a>
            <a
              href={site.links.linkedin}
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-accent"
            >
              LinkedIn
            </a>
          </div>
          <p>
            © {year} {site.name}
          </p>
        </div>
      </Container>
    </footer>
  )
}

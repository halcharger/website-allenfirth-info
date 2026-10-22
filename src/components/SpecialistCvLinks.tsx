import { site } from '@/content/site'

const specialistCvs = [
  { label: 'Frontend CV', href: site.links.cvFrontend },
  { label: 'Backend CV', href: site.links.cvBackend },
] as const

export function SpecialistCvLinks() {
  return (
    <p className="mt-3 text-sm text-text-subtle">
      {specialistCvs.map((item, index) => (
        <span key={item.href}>
          {index > 0 ? <span aria-hidden="true"> · </span> : null}
          <a
            href={item.href}
            className="rounded-sm transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            {item.label}
          </a>
        </span>
      ))}
    </p>
  )
}

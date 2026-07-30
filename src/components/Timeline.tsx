import { Card } from '@/components/Card'
import { MetaChip } from '@/components/MetaChip'
import type { Role } from '@/content'
import { formatDateRange } from '@/lib/dates'

function RoleEntry({ role }: { role: Role }) {
  return (
    <Card className="flex flex-col gap-3">
      <p className="font-mono text-xs text-text-subtle">
        {formatDateRange(role.start, role.end)}
      </p>
      <div>
        <h3 className="text-base font-semibold text-text">{role.company}</h3>
        <p className="mt-1 text-sm text-text-muted">{role.title}</p>
        {role.employment ? (
          <p className="mt-1 text-sm text-text-subtle">{role.employment}</p>
        ) : null}
        {role.location ? (
          <p className="mt-0.5 text-sm text-text-subtle">{role.location}</p>
        ) : null}
      </div>
      <p className="text-sm leading-relaxed text-text-muted">{role.summary}</p>
      {role.bullets.length > 0 ? (
        <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-text-muted">
          {role.bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      ) : null}
      {role.stack.length > 0 ? (
        <div className="flex flex-wrap gap-1.5 pt-1">
          {role.stack.map((tech) => (
            <MetaChip key={tech}>{tech}</MetaChip>
          ))}
        </div>
      ) : null}
      {role.links && role.links.length > 0 ? (
        <ul className="flex flex-col gap-1 pt-1">
          {role.links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-accent transition-colors hover:text-accent-hover"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      ) : null}
    </Card>
  )
}

export function Timeline({ roles }: { roles: Role[] }) {
  return (
    <ol className="space-y-6">
      {roles.map((role) => (
        <li key={role.id}>
          <RoleEntry role={role} />
        </li>
      ))}
    </ol>
  )
}

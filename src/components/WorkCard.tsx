import { Link } from '@tanstack/react-router'
import { Card } from '@/components/Card'
import { MetaChip } from '@/components/MetaChip'
import type { WorkItem } from '@/content'

export function WorkCard({ item }: { item: WorkItem }) {
  return (
    <Link
      to={`/work/${item.slug}` as never}
      className="group block h-full"
    >
      <Card className="flex h-full flex-col gap-3">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <p className="font-mono text-xs text-text-subtle">{item.year}</p>
          {item.clientType ? <MetaChip>{item.clientType}</MetaChip> : null}
        </div>
        <div>
          <h3 className="text-base font-semibold text-text transition-colors group-hover:text-accent">
            {item.title}
          </h3>
          <p className="mt-1 text-sm text-text-muted">{item.client}</p>
        </div>
        <p className="line-clamp-3 text-sm leading-relaxed text-text-muted">
          {item.outcome}
        </p>
        <div className="mt-auto flex flex-wrap gap-1.5 pt-1">
          {item.stack.slice(0, 4).map((tech) => (
            <MetaChip key={tech}>{tech}</MetaChip>
          ))}
        </div>
      </Card>
    </Link>
  )
}

import { Link } from '@tanstack/react-router'
import { Card } from '@/components/Card'
import { MetaChip } from '@/components/MetaChip'
import type { ProjectItem } from '@/content'

export function ProjectCard({ item }: { item: ProjectItem }) {
  return (
    <Link
      to={`/projects/${item.slug}` as never}
      className="group block h-full"
    >
      <Card className="flex h-full flex-col gap-3">
        <p className="font-mono text-xs text-text-subtle">
          {item.year}
          {item.publisher !== item.title ? (
            <>
              <span aria-hidden="true"> · </span>
              {item.publisher}
            </>
          ) : null}
        </p>
        <h3 className="text-base font-semibold text-text transition-colors group-hover:text-accent">
          {item.title}
        </h3>
        <p className="line-clamp-3 text-sm leading-relaxed text-text-muted">
          {item.summary}
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

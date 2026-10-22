import { ProjectCard } from '@/components/ProjectCard'
import { getAllProjects } from '@/content'

export function ProjectList() {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {getAllProjects().map((item) => (
        <li key={item.slug}>
          <ProjectCard item={item} />
        </li>
      ))}
    </ul>
  )
}

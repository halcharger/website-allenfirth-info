import { Link, createFileRoute, notFound } from '@tanstack/react-router'
import { Container } from '@/components/Container'
import { MetaChip } from '@/components/MetaChip'
import { NotFound } from '@/components/NotFound'
import { Section } from '@/components/Section'
import { buildSeoHead } from '@/components/Seo'
import { site, getProjectBySlug } from '@/content'

export const Route = createFileRoute('/projects/$slug')({
  loader: ({ params }) => {
    const item = getProjectBySlug(params.slug)
    if (!item) {
      throw notFound()
    }
    return item
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return buildSeoHead({ title: 'Projects', path: '/work' })
    }
    return buildSeoHead({
      title: loaderData.title,
      path: `/projects/${loaderData.slug}`,
      description: loaderData.summary,
    })
  },
  component: ProjectDetailPage,
  notFoundComponent: () => <NotFound>Project not found</NotFound>,
})

function ProjectDetailPage() {
  const item = Route.useLoaderData()

  return (
    <Container>
      <Section className="pt-16 sm:pt-20 pb-20">
        <p className="mb-6">
          <Link
            to="/work"
            className="text-sm text-text-muted transition-colors hover:text-accent"
          >
            ← Work
          </Link>
        </p>

        <header className="mb-8 max-w-3xl">
          <p className="mb-3 font-mono text-xs uppercase tracking-wider text-text-subtle">
            Project
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-text sm:text-4xl">
            {item.title}
          </h1>
          <p className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-sm text-text-muted">
            <a
              href={site.links.codestream}
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-accent"
            >
              {item.publisher}
            </a>
            <span aria-hidden="true" className="text-text-subtle">
              ·
            </span>
            <span>{item.year}</span>
            {item.website ? (
              <>
                <span aria-hidden="true" className="text-text-subtle">
                  ·
                </span>
                <a
                  href={item.website.href}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-accent"
                >
                  {item.website.label}
                </a>
              </>
            ) : null}
          </p>
          <p className="mt-6 text-base leading-relaxed text-text-muted">
            {item.summary}
          </p>
        </header>

        <div className="mb-10">
          <h2 className="mb-3 text-sm font-semibold text-text">Stack</h2>
          <div className="flex flex-wrap gap-1.5">
            {item.stack.map((tech) => (
              <MetaChip key={tech}>{tech}</MetaChip>
            ))}
          </div>
        </div>

        <div className="max-w-3xl space-y-8">
          {item.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-lg font-semibold tracking-tight text-text">
                {section.heading}
              </h2>
              <p className="mt-3 text-base leading-relaxed text-text-muted">
                {section.body}
              </p>
            </section>
          ))}
        </div>

        <p className="mt-12">
          <Link
            to="/work"
            className="text-sm font-medium text-accent transition-colors hover:text-accent-hover"
          >
            ← Back to work
          </Link>
        </p>
      </Section>
    </Container>
  )
}

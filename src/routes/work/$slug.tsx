import { Link, createFileRoute, notFound } from '@tanstack/react-router'
import { Container } from '@/components/Container'
import { MetaChip } from '@/components/MetaChip'
import { NotFound } from '@/components/NotFound'
import { Section } from '@/components/Section'
import { buildSeoHead } from '@/components/Seo'
import { getWorkBySlug } from '@/content'

export const Route = createFileRoute('/work/$slug')({
  loader: ({ params }) => {
    const item = getWorkBySlug(params.slug)
    if (!item) {
      throw notFound()
    }
    return item
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return buildSeoHead({ title: 'Work', path: '/work' })
    }
    return buildSeoHead({
      title: loaderData.title,
      path: `/work/${loaderData.slug}`,
      description: loaderData.outcome,
    })
  },
  component: WorkDetailPage,
  notFoundComponent: () => <NotFound>Case study not found</NotFound>,
})

function WorkDetailPage() {
  const item = Route.useLoaderData()

  return (
    <Container>
      <Section className="pt-16 sm:pt-20 pb-20">
        <p className="mb-6">
          <Link
            to="/work"
            className="text-sm text-text-muted transition-colors hover:text-accent"
          >
            ← All selected work
          </Link>
        </p>

        <header className="mb-8 max-w-3xl">
          <p className="mb-3 font-mono text-xs uppercase tracking-wider text-text-subtle">
            Case study
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-text sm:text-4xl">
            {item.title}
          </h1>
          <p className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-sm text-text-muted">
            <span>{item.client}</span>
            <span aria-hidden="true" className="text-text-subtle">
              ·
            </span>
            <span>{item.year}</span>
            <span aria-hidden="true" className="text-text-subtle">
              ·
            </span>
            <span>{item.role}</span>
          </p>
          {item.clientType ? (
            <div className="mt-3">
              <MetaChip>{item.clientType}</MetaChip>
            </div>
          ) : null}
          <p className="mt-6 text-base leading-relaxed text-text-muted">
            {item.outcome}
          </p>
        </header>

        {item.metrics && item.metrics.length > 0 ? (
          <ul className="mb-10 grid gap-4 sm:grid-cols-3">
            {item.metrics.map((metric) => (
              <li
                key={metric.label}
                className="rounded-lg border border-border bg-surface p-4"
              >
                <p className="text-base font-semibold text-text">
                  {metric.value}
                </p>
                <p className="mt-1 font-mono text-xs text-text-subtle">
                  {metric.label}
                </p>
              </li>
            ))}
          </ul>
        ) : null}

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

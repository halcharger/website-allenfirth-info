import { createFileRoute } from '@tanstack/react-router'
import { Container } from '@/components/Container'
import { Section } from '@/components/Section'
import { buildSeoHead } from '@/components/Seo'
import { WorkCard } from '@/components/WorkCard'
import { getAllWork } from '@/content'

export const Route = createFileRoute('/work/')({
  head: () =>
    buildSeoHead({
      title: 'Work',
      path: '/work',
      description:
        'Selected case studies — outcome-led highlights from consulting engagements across energy, markets, retail, and commodities.',
    }),
  component: WorkIndexPage,
})

function WorkIndexPage() {
  const items = getAllWork()

  return (
    <Container>
      <Section className="pt-16 sm:pt-20 pb-20">
        <header className="mb-8 max-w-2xl">
          <h1 className="text-3xl font-semibold tracking-tight text-text sm:text-4xl">
            Work
          </h1>
          <p className="mt-3 text-base leading-relaxed text-text-muted">
            Selected case studies from recent engagements. NDA-safe public
            summaries focused on context, approach, and outcomes.
          </p>
        </header>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <li key={item.slug}>
              <WorkCard item={item} />
            </li>
          ))}
        </ul>
      </Section>
    </Container>
  )
}

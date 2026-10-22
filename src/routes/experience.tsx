import { createFileRoute } from '@tanstack/react-router'
import { Container } from '@/components/Container'
import { Section } from '@/components/Section'
import { buildSeoHead } from '@/components/Seo'
import { ProjectList } from '@/components/ProjectList'
import { Timeline } from '@/components/Timeline'
import { experience } from '@/content'

export const Route = createFileRoute('/experience')({
  head: () =>
    buildSeoHead({
      title: 'Experience',
      path: '/experience',
      description:
        'Career timeline of consulting engagements across finance, energy, law, insurance and retail, plus end-to-end product systems.',
    }),
  component: ExperiencePage,
})

function ExperiencePage() {
  return (
    <Container>
      <Section className="pt-16 sm:pt-20 pb-20">
        <header className="mb-8 max-w-2xl">
          <h1 className="text-3xl font-semibold tracking-tight text-text sm:text-4xl">
            Experience
          </h1>
          <p className="mt-3 text-base leading-relaxed text-text-muted">
            Consulting and product engagements across finance, energy, law, and
            retail.
          </p>
        </header>

        <div className="mb-16">
          <h2 className="text-xl font-semibold tracking-tight text-text sm:text-2xl">
            Projects
          </h2>
          <p className="mt-3 mb-8 max-w-2xl text-base leading-relaxed text-text-muted">
            End-to-end systems: the problem, the design, and what shipped.
          </p>
          <ProjectList />
        </div>

        <h2 className="text-xl font-semibold tracking-tight text-text sm:text-2xl">
          Professional Engagements
        </h2>
        <p className="mt-3 mb-8 max-w-2xl text-base leading-relaxed text-text-muted">
          Newest first.
        </p>
        <Timeline roles={experience} />
      </Section>
    </Container>
  )
}

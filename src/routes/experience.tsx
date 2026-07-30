import { createFileRoute } from '@tanstack/react-router'
import { Container } from '@/components/Container'
import { Section } from '@/components/Section'
import { buildSeoHead } from '@/components/Seo'
import { Timeline } from '@/components/Timeline'
import { experience } from '@/content'

export const Route = createFileRoute('/experience')({
  head: () =>
    buildSeoHead({
      title: 'Experience',
      path: '/experience',
      description:
        'Career timeline — consulting and product roles across finance, energy, law, insurance and retail.',
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
            Full timeline of consulting and product engagements across finance,
            energy, law, and retail—newest first.
          </p>
        </header>
        <Timeline roles={experience} />
      </Section>
    </Container>
  )
}

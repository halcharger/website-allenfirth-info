import { createFileRoute } from '@tanstack/react-router'
import { Container } from '@/components/Container'
import { Section } from '@/components/Section'
import { buildSeoHead } from '@/components/Seo'
import { SkillGroup } from '@/components/SkillGroup'
import { skillGroups } from '@/content'

export const Route = createFileRoute('/skills')({
  head: () =>
    buildSeoHead({
      title: 'Skills',
      path: '/skills',
      description:
        'AI-native delivery since June 2025, plus cloud, backend, frontend, data, and practice skills across Azure, .NET, TypeScript, and delivery.',
    }),
  component: SkillsPage,
})

const intro =
  'Full-stack engineer with deep experience across cloud, backend, frontend, and data — plus AI-native delivery since June 2025: agents for the keystrokes, senior engineering for the decisions.'

function SkillsPage() {
  return (
    <Container>
      <Section className="pt-16 sm:pt-20 pb-20">
        <header className="mb-8 max-w-2xl">
          <h1 className="text-3xl font-semibold tracking-tight text-text sm:text-4xl">
            Skills
          </h1>
          <p className="mt-3 text-base leading-relaxed text-text-muted">
            {intro}
          </p>
        </header>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group) => (
            <li key={group.layer}>
              <SkillGroup group={group} />
            </li>
          ))}
        </ul>
      </Section>
    </Container>
  )
}

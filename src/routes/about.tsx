import { createFileRoute } from '@tanstack/react-router'
import { Container } from '@/components/Container'
import { Section } from '@/components/Section'
import { buildSeoHead } from '@/components/Seo'
import { site } from '@/content'
import portrait from '@/assets/portrait.jpg'

export const Route = createFileRoute('/about')({
  head: () =>
    buildSeoHead({
      title: 'About',
      path: '/about',
      description: `About ${site.name} — senior software engineer and consultant based in ${site.location}.`,
    }),
  component: AboutPage,
})

/** E.164-style tel: target (drop spaces, brackets, and trunk 0). */
const phoneTel = site.phone.replace(/[^\d+]/g, '').replace(/^\+270/, '+27')

const socialLinks = [
  {
    label: 'GitHub',
    value: 'github.com/halcharger',
    href: site.links.github,
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/allenfirth',
    href: site.links.linkedin,
  },
  {
    label: 'CodeStream',
    value: 'codestream.co.za',
    href: site.links.codestream,
  },
  {
    label: 'Email',
    value: site.email,
    href: `mailto:${site.email}`,
  },
  {
    label: 'Phone',
    value: site.phone,
    href: `tel:${phoneTel}`,
  },
] as const

function AboutPage() {
  return (
    <Container>
      <Section className="pt-16 sm:pt-20 pb-20">
        {/* Bio + portrait only — equal columns, no row-span stretch */}
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-x-12">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-text sm:text-4xl">
              About {site.name}
            </h1>
            <div className="mt-6 space-y-5 text-base leading-relaxed text-text-muted">
              <p>
                With over two decades in tech, I have led development teams and
                built software for large enterprises and startups alike. My focus
                is architecting and shipping complex distributed systems to a
                high standard.
              </p>
              <p>
                I spent six and a half years in{' '}
                <strong className="font-medium text-text">London</strong>,
                working with leading organisations in law, insurance, and
                finance.
              </p>
              <p>
                I now run{' '}
                <a
                  href={site.links.codestream}
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-text transition-colors hover:text-accent"
                >
                  CodeStream
                </a>
                , my software development consultancy, based in {site.location}.
              </p>
              <p>
                Since <strong className="font-medium text-text">June 2025</strong>{' '}
                I’ve used AI coding agents as a default part of how I build:
                planning and prompts I control, generation I treat as a draft,
                and nothing merges without my review. The goal isn’t “AI wrote
                it” — it’s{' '}
                <strong className="font-medium text-text">
                  higher throughput with the same bar
                </strong>{' '}
                on design, tests, and production safety.
              </p>
              <p>
                The core of how I work is{' '}
                <strong className="font-medium text-text">simplicity</strong>,{' '}
                <strong className="font-medium text-text">testing</strong>, and{' '}
                <strong className="font-medium text-text">automation</strong> —
                now applied to how AI is used, not only to the code it produces.
              </p>
              <blockquote className="border-l-2 border-accent pl-4 text-text-muted italic">
                Agents draft. I decide. Production stays human-owned.
              </blockquote>
            </div>
          </div>

          <div className="mx-auto w-full max-w-xs lg:mx-0 lg:max-w-md lg:justify-self-end">
            <img
              src={portrait}
              alt={`Portrait of ${site.name}`}
              width={640}
              height={640}
              className="aspect-square w-full rounded-2xl border border-border bg-surface object-cover shadow-sm"
            />
          </div>
        </div>

        {/* Contact full-width under the pair — multi-column, no empty left gutter */}
        <div className="mt-12 border-t border-border pt-10">
          <p className="font-mono text-xs uppercase tracking-wider text-text-subtle">
            Contact
          </p>
          <ul className="mt-6 grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
            {socialLinks.map((item) => (
              <li key={item.label}>
                <p className="font-mono text-xs uppercase tracking-wider text-text-subtle">
                  {item.label}
                </p>
                <a
                  href={item.href}
                  className="mt-0.5 inline-block break-all text-base text-text transition-colors hover:text-accent"
                  {...(/^https?:\/\//.test(item.href)
                    ? { target: '_blank', rel: 'noreferrer' }
                    : {})}
                >
                  {item.value}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </Container>
  )
}

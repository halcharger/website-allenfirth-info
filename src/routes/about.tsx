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
        <div className="grid grid-cols-1 gap-y-12 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-x-12 lg:gap-y-8">
          {/* Portrait — right column on large screens */}
          <div className="lg:pl-8">
            <div className="mx-auto max-w-xs lg:mx-0 lg:max-w-none">
              <img
                src={portrait}
                alt={`Portrait of ${site.name}`}
                width={640}
                height={640}
                className="aspect-square w-full rounded-2xl border border-border bg-surface object-cover shadow-sm"
              />
            </div>
          </div>

          {/* Bio — first column, spans rows */}
          <div className="lg:order-first lg:row-span-2">
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
                The core of how I work is{' '}
                <strong className="font-medium text-text">simplicity</strong>,{' '}
                <strong className="font-medium text-text">testing</strong>, and{' '}
                <strong className="font-medium text-text">automation</strong>.
              </p>
              <blockquote className="border-l-2 border-accent pl-4 text-text-muted italic">
                Keep it simple. Test everything. Automate always.
              </blockquote>
            </div>
          </div>

          {/* Social + contact */}
          <div className="lg:pl-8">
            <ul className="space-y-3 border-t border-border pt-8 lg:border-t-0 lg:pt-0">
              {socialLinks.map((item) => (
                <li key={item.label}>
                  <p className="font-mono text-xs uppercase tracking-wider text-text-subtle">
                    {item.label}
                  </p>
                  <a
                    href={item.href}
                    className="mt-0.5 inline-block text-base text-text transition-colors hover:text-accent"
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
        </div>
      </Section>
    </Container>
  )
}

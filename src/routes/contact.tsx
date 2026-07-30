import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { Section } from '@/components/Section'
import { buildSeoHead, Seo } from '@/components/Seo'
import { site } from '@/content'

export const Route = createFileRoute('/contact')({
  head: () =>
    buildSeoHead({
      title: 'Contact',
      path: '/contact',
      description:
        'Get in touch with Allen Firth — email, phone, LinkedIn, GitHub, or download the CV.',
    }),
  component: ContactPage,
})

/** E.164-style tel: target (drop spaces, brackets, and trunk 0). */
const phoneTel = site.phone.replace(/[^\d+]/g, '').replace(/^\+270/, '+27')

const contactLinks = [
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
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/allenfirth',
    href: site.links.linkedin,
  },
  {
    label: 'GitHub',
    value: 'github.com/halcharger',
    href: site.links.github,
  },
] as const

function ContactPage() {
  return (
    <Container>
      <Seo title="Contact" path="/contact" />
      <Section className="pt-16 sm:pt-20 pb-20">
        <header className="mb-8 max-w-2xl">
          <h1 className="text-3xl font-semibold tracking-tight text-text sm:text-4xl">
            Contact
          </h1>
          <p className="mt-3 text-base leading-relaxed text-text-muted">
            Open to senior engineering and consulting conversations. Based in{' '}
            {site.location}.
          </p>
        </header>

        <div className="mb-8">
          <Button href={site.links.cv}>Download CV</Button>
        </div>

        <ul className="grid max-w-xl gap-4 sm:grid-cols-2">
          {contactLinks.map((item) => (
            <li key={item.label}>
              <p className="font-mono text-xs uppercase tracking-wider text-text-subtle">
                {item.label}
              </p>
              <a
                href={item.href}
                className="mt-1 inline-block text-base text-text transition-colors hover:text-accent"
                {...(/^https?:\/\//.test(item.href)
                  ? { target: '_blank', rel: 'noreferrer' }
                  : {})}
              >
                {item.value}
              </a>
            </li>
          ))}
        </ul>
      </Section>
    </Container>
  )
}

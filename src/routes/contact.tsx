import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/Button'
import { ContactForm } from '@/components/ContactForm'
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
        'Get in touch with Allen Firth — send a message, or use LinkedIn, GitHub, or download the CV.',
    }),
  component: ContactPage,
})

const contactLinks = [
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

        <div className="grid gap-12 lg:grid-cols-[minmax(0,28rem)_minmax(0,1fr)] lg:items-start">
          <ContactForm />

          <div>
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
          </div>
        </div>
      </Section>
    </Container>
  )
}

import { Link, createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Container } from "@/components/Container";
import { MetaChip } from "@/components/MetaChip";
import { Section } from "@/components/Section";
import { buildSeoHead } from "@/components/Seo";
import { SkillGroup } from "@/components/SkillGroup";
import { WorkCard } from "@/components/WorkCard";
import { getFeaturedWork, getRecentRoles, site, skillGroups } from "@/content";
import { formatDateRange } from "@/lib/dates";
import portrait from "@/assets/portrait.jpg";

export const Route = createFileRoute("/")({
  head: () => buildSeoHead({ path: "/" }),
  component: Home,
});

const highlights = [
  { label: "25+ years", detail: "Shipping production software" },
  {
    label: "Finance · Energy · Law · Retail",
    detail: "Complex domain systems",
  },
  {
    label: "AI-first since Jun 2025",
    detail: "Agents for speed · human review for risk",
  },
] as const;

const heroSummary =
  "Senior software engineer and consultant with 25+ years building systems for finance, energy, law, insurance, and retail. Since June 2025 I’ve worked AI-first — agents for scaffolding, refactoring, and tests; I keep architecture, security, and every merge under senior review. Full-stack on React, Angular, TypeScript, C#/.NET, and Azure. Based in Durban; previously London.";

function Home() {
  const recentRoles = getRecentRoles(3);
  const featuredWork = getFeaturedWork(3);

  return (
    <Container>
      {/* Hero */}
      <Section className="pt-16 sm:pt-20">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <p className="mb-3 font-mono text-xs uppercase tracking-wider text-text-subtle">
              Professional site
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-text sm:text-4xl">
              {site.name}
            </h1>
            <p className="mt-2 text-lg text-text-muted sm:text-xl">
              {site.title}
            </p>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-text-muted">
              {heroSummary}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={site.links.cv}>Download CV</Button>
              <Button href="/experience" variant="secondary">
                View experience
              </Button>
            </div>
          </div>
          <div className="flex justify-center lg:col-span-5 lg:justify-end">
            <img
              src={portrait}
              alt={`Portrait of ${site.name}`}
              width={256}
              height={256}
              className="h-56 w-56 rounded-full border border-border bg-surface object-cover shadow-sm sm:h-64 sm:w-64"
            />
          </div>
        </div>
      </Section>

      {/* Highlights */}
      <Section eyebrow="At a glance" title="Highlights">
        <ul className="grid gap-4 sm:grid-cols-3">
          {highlights.map((item) => (
            <li key={item.label}>
              <Card className="h-full">
                <p className="text-base font-semibold text-text">
                  {item.label}
                </p>
                <p className="mt-1 text-sm text-text-muted">{item.detail}</p>
              </Card>
            </li>
          ))}
        </ul>
      </Section>

      {/* Recent experience */}
      <Section
        eyebrow="Career"
        title="Recent experience"
        description="Latest consulting and product engagements. Full timeline on the experience page."
      >
        <ul className="grid gap-4 md:grid-cols-3">
          {recentRoles.map((role) => (
            <li key={role.id}>
              <Link to={"/experience" as never} className="group block h-full">
                <Card className="flex h-full flex-col gap-2">
                  <p className="font-mono text-xs text-text-subtle">
                    {formatDateRange(role.start, role.end)}
                  </p>
                  <h3 className="text-base font-semibold text-text transition-colors group-hover:text-accent">
                    {role.company}
                  </h3>
                  <p className="text-sm text-text-muted">{role.title}</p>
                  <p className="mt-1 line-clamp-3 text-sm leading-relaxed text-text-muted">
                    {role.summary}
                  </p>
                  {role.stack.length > 0 ? (
                    <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
                      {role.stack.slice(0, 4).map((tech) => (
                        <MetaChip key={tech}>{tech}</MetaChip>
                      ))}
                    </div>
                  ) : null}
                </Card>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-6">
          <Button href="/experience" variant="secondary">
            Full experience
          </Button>
        </div>
      </Section>

      {/* Selected work */}
      <Section
        eyebrow="Case studies"
        title="Selected work"
        description="Outcome-led highlights from recent engagements."
      >
        <ul className="grid gap-4 md:grid-cols-3">
          {featuredWork.map((item) => (
            <li key={item.slug}>
              <WorkCard item={item} />
            </li>
          ))}
        </ul>
        <div className="mt-6">
          <Button href="/work" variant="secondary">
            All selected work
          </Button>
        </div>
      </Section>

      {/* Skills snapshot */}
      <Section
        eyebrow="Stack"
        title="Skills snapshot"
        description="Layers I work across day to day."
      >
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group) => (
            <li key={group.layer}>
              <SkillGroup
                group={{
                  ...group,
                  items: group.items.slice(0, 4),
                }}
              />
            </li>
          ))}
        </ul>
        <div className="mt-6">
          <Button href="/skills" variant="secondary">
            Full skills
          </Button>
        </div>
      </Section>

      {/* Contact strip */}
      <Section
        id="contact"
        eyebrow="Next step"
        title="Get in touch"
        description="Open to senior roles and consulting where AI-accelerated delivery needs a senior engineer in the loop."
        className="pb-20"
      >
        <div className="flex flex-wrap gap-3">
          <Button href="/contact">Send a message</Button>
          <Button href={site.links.linkedin} variant="secondary">
            LinkedIn
          </Button>
          <Button href={site.links.cv} variant="ghost">
            Download CV
          </Button>
        </div>
        <p className="mt-4 text-sm text-text-subtle">{site.location}</p>
      </Section>
    </Container>
  );
}

import { describe, expect, it } from 'vitest'
import { getAllProjects, getProjectBySlug } from '../src/content'

// Must match PROJECT_SLUGS in scripts/generate-sitemap.mjs
const SITEMAP_SLUGS = ['cosplay-platform', 'contractorpro', 'carwashpro']

describe('project content', () => {
  it('returns unique slugs', () => {
    const slugs = getAllProjects().map((project) => project.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })

  it('describes the cosplay platform without a product name', () => {
    const project = getProjectBySlug('cosplay-platform')
    expect(project?.title).toBe('Cosplay Platform')
    expect(project?.year).toBe('2024–2025')
    expect(project?.publisher).toBe('CodeStream')
    expect(project?.summary).toMatch(/cosplay/i)
    expect(JSON.stringify(project)).not.toMatch(/quirk/i)
    expect(project?.stack).toEqual(
      expect.arrayContaining([
        'React Native',
        'ASP.NET Core',
        'Azure Cosmos DB',
        'Azure DevOps',
        'Docker',
      ]),
    )
    const body = project?.sections.map((section) => section.body).join(' ')
    expect(body).toMatch(/messaging/i)
    expect(body).toMatch(/eventually consistent/i)
    expect(body).toMatch(/judg/i)
  })

  it('describes ContractorPro as a contractor and home-customer platform', () => {
    const project = getProjectBySlug('contractorpro')
    expect(project?.title).toBe('ContractorPro')
    expect(project?.year).toBe('2024–2025')
    expect(project?.publisher).toBe('CodeStream')
    expect(project?.website?.href).toBe('https://contractorpro.app/')
    expect(project?.summary).toMatch(/South African contractors/i)
    expect(project?.stack).toEqual(
      expect.arrayContaining([
        'React Native',
        'ASP.NET Core',
        'Marten',
        'Wolverine',
        'PostgreSQL',
        'Azure Service Bus',
        'Azure',
        'Docker',
      ]),
    )
    const body = project?.sections.map((section) => section.body).join(' ')
    expect(body).toMatch(/event-sourced/i)
    expect(body).toMatch(/Azure Service Bus/)
    expect(body).toMatch(/hosted on Azure/i)
    expect(body).toMatch(/GitHub Actions ran the CI\/CD pipeline/)
    expect(body).toMatch(/quote/i)
  })

  it('describes CarwashPro as an unreleased carwash queue application', () => {
    const project = getProjectBySlug('carwashpro')
    expect(project?.title).toBe('CarwashPro')
    expect(project?.year).toBe('2026')
    expect(project?.publisher).toBe('CodeStream')
    expect(project?.summary).toMatch(/still in development/i)
    expect(project?.stack).toEqual(
      expect.arrayContaining([
        'React',
        'ASP.NET Core',
        'Marten',
        'Wolverine',
        'PostgreSQL',
        'Supabase',
        'Docker',
        'GitHub Actions',
      ]),
    )
    const body = project?.sections.map((section) => section.body).join(' ')
    expect(body).toMatch(/not yet released/i)
    expect(body).toMatch(/licence disc/i)
    expect(body).toMatch(/Supabase/)
    expect(body).toMatch(/text message/i)
    expect(body).toMatch(/GitHub Actions runs the CI\/CD pipeline/)
  })

  it('slugs stay in sync with sitemap script list', () => {
    expect(getAllProjects().map((project) => project.slug).sort()).toEqual(
      [...SITEMAP_SLUGS].sort(),
    )
  })
})

import { site } from '@/content/site'

export function pageTitle(page?: string): string {
  if (!page) return `${site.name} — ${site.title}`
  return `${page} — ${site.name}`
}

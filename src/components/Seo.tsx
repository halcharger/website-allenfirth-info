import { site } from '@/content/site'
import { pageTitle } from '@/lib/seo'
import { seo } from '~/utils/seo'

export type SeoProps = {
  title?: string
  description?: string
  path?: string
}

function resolveSeo({ title, description, path }: SeoProps = {}) {
  const fullTitle = pageTitle(title)
  const desc = description ?? site.seo.defaultDescription
  const url = path
    ? `${site.seo.siteUrl}${path.startsWith('/') ? path : `/${path}`}`
    : site.seo.siteUrl

  return { fullTitle, desc, url }
}

/**
 * Build a TanStack Router `head()` payload (meta + canonical).
 * Prefer this on routes for SSR / prerender SEO.
 */
export function buildSeoHead(props: SeoProps = {}) {
  const { fullTitle, desc, url } = resolveSeo(props)

  return {
    meta: [
      ...seo({
        title: fullTitle,
        description: desc,
      }),
      { property: 'og:url', content: url },
    ],
    links: [{ rel: 'canonical', href: url }],
  }
}

/**
 * In-tree SEO tags (React 19 document metadata).
 * Prefer `buildSeoHead` in route `head` for static prerender; this is for
 * optional client/component usage matching the task interface.
 */
export function Seo(props: SeoProps) {
  const { fullTitle, desc, url } = resolveSeo(props)

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <meta name="og:title" content={fullTitle} />
      <meta name="og:description" content={desc} />
      <meta name="og:type" content="website" />
      <meta name="og:url" content={url} />
      <link rel="canonical" href={url} />
    </>
  )
}

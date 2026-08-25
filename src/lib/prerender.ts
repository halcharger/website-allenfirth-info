/**
 * TanStack Start prerender follows <a href> links (crawlLinks) and writes the
 * response with res.text() — UTF-8. That corrupts binary public files such as
 * the CV PDF (invalid bytes become U+FFFD / EF BF BD, pages render blank).
 * Skip those paths so Vite's binary copy from public/ is left alone.
 */
const STATIC_ASSET =
  /\.(pdf|png|jpe?g|gif|webp|svg|ico|xml|txt|webmanifest|css|js|map|woff2?|ttf|eot)$/i

export function shouldPrerenderPath(path: string): boolean {
  const pathname = path.split(/[?#]/)[0] ?? path
  return !STATIC_ASSET.test(pathname)
}

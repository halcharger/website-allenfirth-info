import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import { defineConfig } from 'vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { nitro } from 'nitro/vite'
import { getAllWork } from './src/content/work'

const workPages = getAllWork().map((w) => ({
  path: `/work/${w.slug}`,
  prerender: { enabled: true },
}))

export default defineConfig({
  server: {
    port: 3000,
  },
  // Prerender starts `vite preview` and fetches pages from it. Pin host/port so
  // CI runners resolve a reachable URL (SWA Oryx Docker cannot do this step).
  preview: {
    host: '127.0.0.1',
    port: 4173,
    strictPort: true,
  },
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [
    tailwindcss(),
    tanstackStart({
      srcDirectory: 'src',
      pages: [{ path: '/work', prerender: { enabled: true } }, ...workPages],
      prerender: {
        enabled: true,
        autoSubfolderIndex: true,
        autoStaticPathsDiscovery: true,
        crawlLinks: true,
        failOnError: true,
      },
    }),
    viteReact(),
    nitro(),
  ],
})

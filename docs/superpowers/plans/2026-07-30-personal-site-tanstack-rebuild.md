# Personal Site TanStack Rebuild Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild allenfirth.info as a static, recruiter-first professional site on TanStack Start with a clean product-UI design system, structured CV content, and selected work case studies.

**Architecture:** Greenfield TanStack Start (React + Vite + TanStack Router) app with typed content modules, CSS-variable design tokens, and full static prerender for Azure Static Web Apps. No production server runtime in v1.

**Tech Stack:** TypeScript, TanStack Start, TanStack Router, Vite, Tailwind CSS, Vitest (content helpers), Azure Static Web Apps.

**Spec:** `docs/superpowers/specs/2026-07-30-personal-site-redesign-design.md`

## Global Constraints

- **Feature branch only:** All implementation commits MUST be on `feature/tanstack-rebuild` (create from latest `master` before any code changes). Do not commit rebuild work to `master`. Merge only via PR after verification.
- Primary job: professional presence / CV for recruiters and hiring managers.
- Visual: clean modern product UI; indigo accent; Inter; no Spotlight teal; no serif display in v1.
- Content shape: CV core + selected work; no `/engagement`, blog, contact form backend, or TanStack Query in v1.
- Hosting: pure static output; Azure SWA compatible.
- Package identity: rename away from `tailwindui-template`; no Spencer/Planetaria template meta.
- Prefer small focused files; content in `src/content/*`; routes in `src/routes/*`.
- Commit after each task on the feature branch with a clear message.

---

## File structure (target)

```
package.json
vite.config.ts
tsconfig.json
staticwebapp.config.json
public/
  allenfirth-cv.pdf
  favicon.ico
  favicon.svg          # create if missing
  og-image.svg         # create
  robots.txt
  portrait.jpg         # copy from src/images if needed for public or import from src/assets
src/
  styles/
    app.css            # tokens + Tailwind entry
  content/
    site.ts
    experience.ts
    skills.ts
    work.ts
    index.ts           # re-exports + selectors
  lib/
    seo.ts
    dates.ts
    theme.ts
  components/
    Header.tsx
    Footer.tsx
    Button.tsx
    Card.tsx
    Section.tsx
    Timeline.tsx
    WorkCard.tsx
    SkillGroup.tsx
    MetaChip.tsx
    Seo.tsx
    ThemeToggle.tsx
    Container.tsx
  routes/
    __root.tsx
    index.tsx
    about.tsx
    experience.tsx
    skills.tsx
    contact.tsx
    work/
      index.tsx
      $slug.tsx
    $.tsx              # 404 catch-all if Start convention supports it
  assets/              # portrait, avatar if bundled via import
tests/
  content.test.ts
  dates.test.ts
  work.test.ts
scripts/
  generate-sitemap.mjs
```

Legacy Next.js paths (`src/pages/*`, `next.config.mjs`, Spotlight components) are removed on the feature branch after scaffold is green (Task 1–2), not left half-wired.

---

### Task 0: Create feature branch

**Files:** none (git only)

**Interfaces:**
- Consumes: current `master` (includes design spec commit)
- Produces: branch `feature/tanstack-rebuild` checked out and tracking nothing required yet

- [ ] **Step 1: Ensure working tree is clean enough to branch**

```bash
git status
```

Expected: design doc committed; untracked WIP may exist. Either leave untracked alone or stash; do not mix unrelated WIP into the rebuild without porting through `content/`.

- [ ] **Step 2: Create and check out the feature branch**

```bash
git checkout master
git pull origin master
git checkout -b feature/tanstack-rebuild
```

If `pull` fails (no remote access / already up to date), continue from local `master`.

- [ ] **Step 3: Verify branch name before any file edits**

```bash
git branch --show-current
```

Expected: `feature/tanstack-rebuild`

- [ ] **Step 4: Commit is not required if only branch creation; if you need an empty anchor commit:**

```bash
git commit --allow-empty -m "chore: start tanstack rebuild on feature branch"
```

**Stop if:** current branch is not `feature/tanstack-rebuild`. All later tasks assume this branch.

---

### Task 1: Scaffold TanStack Start and replace Next.js tooling

**Files:**
- Create/replace: `package.json`, `vite.config.ts`, `tsconfig.json`, `tsconfig.app.json` (as scaffold provides), `.gitignore` entries for Vite/Start
- Remove (after scaffold works): `next.config.mjs`, old Next-only scripts, `postcss.config.js` only if replaced by Tailwind v4 Vite plugin setup
- Keep for now: `public/allenfirth-cv.pdf`, `public/favicon.ico`, `src/images/*`, design docs under `docs/`

**Interfaces:**
- Produces: `npm run dev`, `npm run build` scripts; app boots with default Start home

- [ ] **Step 1: Confirm branch**

```bash
git branch --show-current
```

Expected: `feature/tanstack-rebuild`

- [ ] **Step 2: Scaffold Start in a temporary directory, then merge into repo root**

Prefer official path (adjust if CLI prompts change):

```bash
npx gitpick TanStack/router/tree/main/examples/react/start-basic _start_scaffold
```

Alternatively: `npx @tanstack/cli@latest create` into `_start_scaffold` with Tailwind + TypeScript if prompted.

- [ ] **Step 3: Copy scaffold app files into repo root without destroying `docs/`, `public/allenfirth-cv.pdf`, or `.github/`**

Copy at minimum: Start `package.json` dependencies/scripts (merge carefully), `vite.config.ts`, `src/` from scaffold (will replace old `src/`), config files. Preserve:

- `docs/**`
- `public/allenfirth-cv.pdf`
- `public/favicon.ico` (and later assets)
- `.github/workflows/*` (update in Task 12)
- `LICENSE.md` if present

- [ ] **Step 4: Set package identity**

In `package.json`:

```json
{
  "name": "allenfirth-info",
  "private": true,
  "type": "module"
}
```

Ensure scripts include at least:

```json
{
  "scripts": {
    "dev": "vite dev",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest run",
    "test:watch": "vitest"
  }
}
```

(Adjust `dev`/`build` to exact scripts from the scaffold if different; keep a single `build` that produces static output.)

- [ ] **Step 5: Install and verify dev server**

```bash
npm install
npm run dev
```

Expected: app loads without Next.js errors.

- [ ] **Step 6: Enable static prerender in `vite.config.ts`**

```ts
import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // if using Tailwind v4 Vite plugin

export default defineConfig({
  plugins: [
    tanstackStart({
      prerender: {
        enabled: true,
        autoSubfolderIndex: true,
        autoStaticPathsDiscovery: true,
        crawlLinks: true,
        failOnError: true,
      },
    }),
    // tailwindcss(), // if applicable
    viteReact(),
  ],
})
```

Match plugin order to current Start docs/scaffold. If Tailwind is PostCSS-based in the scaffold, keep that instead of inventing a second system.

- [ ] **Step 7: Production build smoke test**

```bash
npm run build
```

Expected: build succeeds; static HTML exists under scaffold output dir (often `dist`). Note the exact output directory for Azure (`output_location`).

- [ ] **Step 8: Delete Next.js-only root files no longer used**

Remove when no longer imported: `next.config.mjs`, Next-specific eslint that breaks Vite (fix), old `jsconfig.json` if replaced by `tsconfig`.

- [ ] **Step 9: Commit**

```bash
git add -A
git status
git commit -m "chore: scaffold TanStack Start on feature branch"
```

---

### Task 2: Design tokens, Tailwind theme, global styles

**Files:**
- Create: `src/styles/app.css`
- Modify: root layout / `__root.tsx` to import styles
- Modify: Tailwind config or CSS `@theme` per chosen Tailwind major version

**Interfaces:**
- Produces: CSS variables `--bg`, `--surface`, `--border`, `--text`, `--text-muted`, `--text-subtle`, `--accent`, `--accent-hover`; utility classes usable as `bg-[var(--bg)]` or mapped Tailwind tokens `bg-bg`, `text-text`, etc.

- [ ] **Step 1: Add token file `src/styles/app.css`**

```css
@import 'tailwindcss';

@theme {
  --font-sans: 'Inter', ui-sans-serif, system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', ui-monospace, monospace;
  --color-bg: var(--bg);
  --color-surface: var(--surface);
  --color-border: var(--border);
  --color-text: var(--text);
  --color-text-muted: var(--text-muted);
  --color-text-subtle: var(--text-subtle);
  --color-accent: var(--accent);
  --color-accent-hover: var(--accent-hover);
}

:root {
  --bg: #fafafa;
  --surface: #ffffff;
  --border: #e4e4e7;
  --text: #18181b;
  --text-muted: #52525b;
  --text-subtle: #71717a;
  --accent: #4f46e5;
  --accent-hover: #4338ca;
}

.dark {
  --bg: #09090b;
  --surface: #18181b;
  --border: #27272a;
  --text: #fafafa;
  --text-muted: #a1a1aa;
  --text-subtle: #71717a;
  --accent: #818cf8;
  --accent-hover: #a5b4fc;
}

html {
  font-family: var(--font-sans);
  color: var(--text-muted);
  background: var(--bg);
}

body {
  margin: 0;
  min-height: 100%;
}

::selection {
  background: var(--accent);
  color: var(--surface);
}
```

If scaffold uses Tailwind v3, translate tokens into `tailwind.config.ts` `theme.extend.colors` instead of `@theme`, but keep the same CSS variable names on `:root` / `.dark`.

- [ ] **Step 2: Load Inter + JetBrains Mono**

Use `fontsource` packages or `<link>` in root document:

```bash
npm install @fontsource-variable/inter @fontsource/jetbrains-mono
```

```ts
// in __root.tsx or styles entry
import '@fontsource-variable/inter'
import '@fontsource/jetbrains-mono'
```

- [ ] **Step 3: Wire import in root route**

In `src/routes/__root.tsx`, import `../styles/app.css`.

- [ ] **Step 4: Verify dark class toggle manually later; for now build**

```bash
npm run build
```

Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/styles/app.css src/routes/__root.tsx package.json package-lock.json
git commit -m "feat: add product-UI design tokens and fonts"
```

---

### Task 3: Content types, site meta, date helpers + tests

**Files:**
- Create: `src/content/site.ts`, `src/content/index.ts`, `src/lib/dates.ts`, `src/lib/seo.ts`
- Create: `tests/dates.test.ts`, `vitest.config.ts` (if missing)
- Modify: `package.json` test script if needed

**Interfaces:**
- Produces:

```ts
// site.ts
export const site = {
  name: 'Allen Firth',
  title: 'Senior software engineer and consultant',
  email: 'allen@codestream.co.za',
  phone: '+27 (0)60 840 7793',
  location: 'Durban, South Africa',
  links: {
    linkedin: 'https://www.linkedin.com/in/allenfirth',
    github: 'https://github.com/halcharger',
    codestream: 'https://www.codestream.co.za',
    cv: '/allenfirth-cv.pdf',
  },
  seo: {
    defaultDescription:
      'Allen Firth — senior software engineer and consultant with 25+ years building systems for finance, energy, law, insurance and retail.',
    siteUrl: 'https://allenfirth.info',
  },
} as const

// dates.ts
export function formatDateRange(start: string, end: string | null): string
// start/end: 'YYYY-MM' or 'YYYY'; end null => 'Present'

// seo.ts
export function pageTitle(page?: string): string
// pageTitle() => 'Allen Firth — Senior software engineer and consultant'
// pageTitle('Experience') => 'Experience — Allen Firth'
```

- [ ] **Step 1: Add Vitest if not present**

```bash
npm install -D vitest
```

`vitest.config.ts`:

```ts
import { defineConfig } from 'vitest/config'
import path from 'node:path'

export default defineConfig({
  test: { environment: 'node' },
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
})
```

- [ ] **Step 2: Write failing date tests**

```ts
// tests/dates.test.ts
import { describe, expect, it } from 'vitest'
import { formatDateRange } from '../src/lib/dates'

describe('formatDateRange', () => {
  it('formats year-month range', () => {
    expect(formatDateRange('2022-07', '2025-03')).toBe('Jul 2022 – Mar 2025')
  })
  it('uses Present when end is null', () => {
    expect(formatDateRange('2025-04', null)).toBe('Apr 2025 – Present')
  })
  it('formats year-only', () => {
    expect(formatDateRange('2017', '2021')).toBe('2017 – 2021')
  })
})
```

- [ ] **Step 3: Run tests — expect FAIL**

```bash
npm test
```

- [ ] **Step 4: Implement `src/lib/dates.ts` and `src/content/site.ts` and `src/lib/seo.ts`**

Implement `formatDateRange` with `Intl.DateTimeFormat('en-GB', { month: 'short', year: 'numeric' })` for `YYYY-MM`, and pass-through for year-only strings.

```ts
// src/lib/seo.ts
import { site } from '@/content/site'

export function pageTitle(page?: string): string {
  if (!page) return `${site.name} — ${site.title}`
  return `${page} — ${site.name}`
}
```

- [ ] **Step 5: Run tests — expect PASS**

```bash
npm test
```

- [ ] **Step 6: Commit**

```bash
git add src/content/site.ts src/content/index.ts src/lib/dates.ts src/lib/seo.ts tests vitest.config.ts package.json package-lock.json
git commit -m "feat: add site meta, SEO title helper, and date formatting"
```

---

### Task 4: Experience and skills content modules

**Files:**
- Create: `src/content/experience.ts`, `src/content/skills.ts`
- Modify: `src/content/index.ts`
- Create: `tests/content.test.ts`
- Source of truth for copy: legacy `src/pages/experience.jsx` and `src/pages/skills.jsx` (read from `master` / git history if already deleted on branch)

**Interfaces:**

```ts
export type Role = {
  id: string
  company: string
  title: string
  start: string
  end: string | null
  location?: string
  employment?: string
  summary: string
  bullets: string[]
  stack: string[]
  links?: { label: string; href: string }[]
}

export const experience: Role[]

export type SkillGroup = { layer: string; items: string[] }
export const skillGroups: SkillGroup[]

export function getRecentRoles(limit?: number): Role[]
// experience sorted newest-first; default limit 3
```

- [ ] **Step 1: Write content selector tests**

```ts
// tests/content.test.ts
import { describe, expect, it } from 'vitest'
import { experience, getRecentRoles, skillGroups } from '../src/content'

describe('experience content', () => {
  it('has unique ids', () => {
    const ids = experience.map((r) => r.id)
    expect(new Set(ids).size).toBe(ids.length)
  })
  it('includes Uniper engagement', () => {
    expect(experience.some((r) => /uniper/i.test(r.company + r.title))).toBe(true)
  })
  it('getRecentRoles returns at most N newest', () => {
    const recent = getRecentRoles(2)
    expect(recent.length).toBeLessThanOrEqual(2)
    // first item should be the first in experience array (newest-first convention)
    expect(recent[0]?.id).toBe(experience[0]?.id)
  })
})

describe('skills content', () => {
  it('has Cloud and Backend groups', () => {
    const layers = skillGroups.map((g) => g.layer)
    expect(layers).toEqual(expect.arrayContaining(['Cloud', 'Backend']))
  })
})
```

- [ ] **Step 2: Run tests — expect FAIL**

```bash
npm test
```

- [ ] **Step 3: Port experience roles**

Convert each contract from legacy experience into a `Role`. Rules:

- Newest first in the array.
- Fix known typos while porting (`Lodon` → `London`, `United Kingdoms` → `United Kingdom`, `Synaspe` → `Synapse`, grammar where obvious).
- Split long paragraphs into `summary` + `bullets` (2–5 bullets of impact).
- `stack` as string array from the bold tech lines.
- Include external case-study links where present (e.g. Digiterre LSEG, corfinancial).
- Minimum coverage: Uniper, corfinancial, LSEG TM3, Clifford Chance, Anglo American, SPAR (both), SMEasy CTO, M&G, EDF, EON, MAN Investments, Brit Insurance, Freshfields (both), plus “Various Other Contracts” if still relevant or fold into SPAR era summary.

Example shape:

```ts
{
  id: 'uniper-ppa-valuation',
  company: 'Uniper',
  title: 'Lead full-stack consultant',
  start: '2022-07',
  end: '2025-03',
  location: 'London, UK — remote',
  employment: 'via Digiterre',
  summary: '…',
  bullets: ['…', '…'],
  stack: ['Angular', 'TypeScript', 'SignalR', 'C#', 'ASP.NET Core', 'Azure Cosmos DB'],
}
```

- [ ] **Step 4: Port skills**

```ts
export const skillGroups: SkillGroup[] = [
  { layer: 'Cloud', items: ['Microsoft Azure', 'Azure DevOps', 'Functions', 'Event Hubs', 'Data Factory'] },
  { layer: 'Backend', items: ['C# / .NET', 'ASP.NET Core', 'SignalR', 'Node.js', 'GraphQL'] },
  { layer: 'Frontend', items: ['Angular', 'React', 'TypeScript', 'Web Components'] },
  { layer: 'Data', items: ['Azure SQL', 'Azure Synapse', 'Azure Cosmos DB', 'MongoDB'] },
  { layer: 'Practice', items: ['TDD', 'CI/CD', 'Microservices', 'Docker / Kubernetes', 'Code review'] },
]
```

- [ ] **Step 5: Implement `getRecentRoles`**

```ts
export function getRecentRoles(limit = 3): Role[] {
  return experience.slice(0, limit)
}
```

- [ ] **Step 6: Run tests — expect PASS**

```bash
npm test
```

- [ ] **Step 7: Commit**

```bash
git add src/content/experience.ts src/content/skills.ts src/content/index.ts tests/content.test.ts
git commit -m "feat: port experience and skills into typed content modules"
```

---

### Task 5: Work (selected case studies) content + tests

**Files:**
- Create: `src/content/work.ts`
- Modify: `src/content/index.ts`, `tests/content.test.ts` or `tests/work.test.ts`

**Interfaces:**

```ts
export type WorkItem = {
  slug: string
  title: string
  client: string
  clientType?: string
  year: string
  role: string
  outcome: string
  stack: string[]
  metrics?: { label: string; value: string }[]
  featured?: boolean
  order: number
  sections: { heading: string; body: string }[]
}

export const work: WorkItem[]
export function getAllWork(): WorkItem[] // sorted by order desc
export function getFeaturedWork(limit = 3): WorkItem[]
export function getWorkBySlug(slug: string): WorkItem | undefined
```

- [ ] **Step 1: Write failing tests**

```ts
// tests/work.test.ts
import { describe, expect, it } from 'vitest'
import { getAllWork, getFeaturedWork, getWorkBySlug } from '../src/content'

describe('work content', () => {
  it('returns unique slugs', () => {
    const slugs = getAllWork().map((w) => w.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })
  it('resolves uniper slug', () => {
    expect(getWorkBySlug('uniper-valuation-desktop')?.client).toMatch(/Uniper/i)
  })
  it('featured list respects limit', () => {
    expect(getFeaturedWork(2).length).toBeLessThanOrEqual(2)
  })
})
```

- [ ] **Step 2: Run tests — expect FAIL**

```bash
npm test
```

- [ ] **Step 3: Author 3–4 work items from experience**

Required minimum:

| slug | client |
|------|--------|
| `uniper-valuation-desktop` | Uniper |
| `lseg-tm3` | LSEG |
| `spar-datalake` | SPAR Group |

Optional fourth: `anglo-live-exposure` or Chelsea if you have accurate non-confidential copy.

Each item: short `outcome`, 2–3 `metrics` when honest numbers exist (e.g. Uniper ~10× critical-path), sections `Context`, `Approach`, `Outcome`. Keep NDA-safe; no confidential internals.

- [ ] **Step 4: Implement selectors**

```ts
export function getAllWork(): WorkItem[] {
  return [...work].sort((a, b) => b.order - a.order)
}
export function getFeaturedWork(limit = 3): WorkItem[] {
  return getAllWork().filter((w) => w.featured !== false).slice(0, limit)
}
export function getWorkBySlug(slug: string): WorkItem | undefined {
  return work.find((w) => w.slug === slug)
}
```

- [ ] **Step 5: Run tests — expect PASS**

```bash
npm test
```

- [ ] **Step 6: Commit**

```bash
git add src/content/work.ts src/content/index.ts tests/work.test.ts
git commit -m "feat: add selected work case study content"
```

---

### Task 6: UI primitives and site chrome

**Files:**
- Create: `src/components/Container.tsx`, `Button.tsx`, `Card.tsx`, `Section.tsx`, `MetaChip.tsx`, `Seo.tsx`, `ThemeToggle.tsx`, `Header.tsx`, `Footer.tsx`
- Modify: `src/routes/__root.tsx`
- Create: `src/lib/theme.ts`

**Interfaces:**

```tsx
// Button
type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'ghost'
  href?: string
  children: React.ReactNode
  className?: string
} & React.ButtonHTMLAttributes<HTMLButtonElement>
// If href set, render <a> or Router Link; else <button>

// Seo — sets document title + meta via Start/Head API used by scaffold
export function Seo(props: {
  title?: string
  description?: string
  path?: string
})

// Header nav items (exact labels):
// About, Experience, Work, Skills, Contact
// Wordmark links to /
// Optional Download CV -> site.links.cv
```

- [ ] **Step 1: Implement `Container`, `Button`, `Card`, `Section`, `MetaChip`**

Use token classes, e.g. `bg-surface border border-border rounded-lg`, primary button `bg-accent text-white hover:bg-accent-hover`.

- [ ] **Step 2: Implement theme toggle**

```ts
// src/lib/theme.ts
export type Theme = 'light' | 'dark'

export function getPreferredTheme(): Theme {
  if (typeof window === 'undefined') return 'light'
  const stored = localStorage.getItem('theme')
  if (stored === 'light' || stored === 'dark') return stored
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle('dark', theme === 'dark')
  localStorage.setItem('theme', theme)
}
```

Inline a tiny script in root HTML shell (if Start exposes document head/body hooks) to avoid FOUC — match scaffold patterns for head scripts.

- [ ] **Step 3: Implement `Header` and `Footer`**

- Sticky header: `sticky top-0 z-50 border-b border-border bg-surface/90 backdrop-blur`
- Active nav: accent text (compare route pathname)
- Footer: same links + copyright `{year} Allen Firth` + GitHub/LinkedIn

- [ ] **Step 4: Wire chrome in `__root.tsx`**

```tsx
// pseudocode — match Start's createRootRoute API
function RootLayout() {
  return (
    <>
      <Header />
      <main className="min-h-[70vh]">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
```

- [ ] **Step 5: Manual check**

```bash
npm run dev
```

Expected: stub page shows header/footer; theme toggle flips `.dark` on `<html>`.

- [ ] **Step 6: Commit**

```bash
git add src/components src/lib/theme.ts src/routes/__root.tsx
git commit -m "feat: add layout chrome and UI primitives"
```

---

### Task 7: Home page

**Files:**
- Create/modify: `src/routes/index.tsx`
- Optional section components under `src/components/home/` if files get large: `Hero.tsx`, `Highlights.tsx`, etc. — only split if `index.tsx` exceeds ~150 lines

**Interfaces:**
- Consumes: `site`, `getRecentRoles`, `getFeaturedWork`, `skillGroups`, `Button`, `WorkCard` (may stub WorkCard here or in Task 6), `Section`

- [ ] **Step 1: Implement home sections per spec**

1. Hero: name, `site.title`, 2–3 sentence summary, primary **Download CV** (`site.links.cv`), secondary **View experience** (`/experience`)
2. Highlights: three facts (e.g. `25+ years`, `Finance · Energy · Law · Retail`, `Durban · formerly London`)
3. Recent experience: `getRecentRoles(3)` as cards → link to `/experience`
4. Selected work: `getFeaturedWork(3)` → `/work`
5. Skills snapshot: first items from each `skillGroups` layer or full chips if space
6. Contact strip: email mailto, LinkedIn, CV

- [ ] **Step 2: Add `Seo` with default title/description**

- [ ] **Step 3: Manual verify**

```bash
npm run dev
```

Expected: full home scrolls; all links resolve (work pages may 404 until Task 10 — acceptable if linked paths match final routes).

- [ ] **Step 4: Commit**

```bash
git add src/routes/index.tsx src/components
git commit -m "feat: build recruiter-first home page"
```

---

### Task 8: Experience page

**Files:**
- Create: `src/routes/experience.tsx`, `src/components/Timeline.tsx`

**Interfaces:**

```tsx
// Timeline
export function Timeline(props: { roles: Role[] })
// Renders vertical list: date range, company, title, employment, summary, bullets, MetaChip stack
```

- [ ] **Step 1: Implement `Timeline`**

Use `formatDateRange(role.start, role.end)`. Each role is a `Card` or bordered block. Links open in new tab with `rel="noreferrer"`.

- [ ] **Step 2: Implement `/experience` route**

- `Seo` title `Experience`
- Page header: title + short intro (one sentence)
- `<Timeline roles={experience} />`

- [ ] **Step 3: Manual verify newest role is Uniper era first**

```bash
npm run dev
```

Open `/experience`.

- [ ] **Step 4: Commit**

```bash
git add src/routes/experience.tsx src/components/Timeline.tsx
git commit -m "feat: add experience timeline page"
```

---

### Task 9: Skills and Contact pages

**Files:**
- Create: `src/routes/skills.tsx`, `src/routes/contact.tsx`, `src/components/SkillGroup.tsx`

**Interfaces:**

```tsx
export function SkillGroup(props: { group: SkillGroup })
// layer heading + wrap MetaChips
```

- [ ] **Step 1: Skills page**

- Intro one paragraph from legacy skills page, tightened
- Map `skillGroups` to `SkillGroup` components in a responsive grid

- [ ] **Step 2: Contact page**

- Email (mailto), phone (`tel:`), LinkedIn, GitHub
- Primary button Download CV
- `Seo` title `Contact`

- [ ] **Step 3: Manual verify**

```bash
npm run dev
```

- [ ] **Step 4: Commit**

```bash
git add src/routes/skills.tsx src/routes/contact.tsx src/components/SkillGroup.tsx
git commit -m "feat: add skills and contact pages"
```

---

### Task 10: Work index and detail routes

**Files:**
- Create: `src/routes/work/index.tsx`, `src/routes/work/$slug.tsx`, `src/components/WorkCard.tsx`
- Modify: `vite.config.ts` only if dynamic slug prerender needs explicit `pages` entries

**Interfaces:**

```tsx
export function WorkCard(props: { item: WorkItem })
// links to `/work/${item.slug}`
```

- [ ] **Step 1: Work index**

- Grid of `WorkCard` for `getAllWork()`
- Seo title `Work`

- [ ] **Step 2: Work detail `$slug`**

```ts
// loader or beforeLoad: resolve getWorkBySlug(params.slug)
// if missing → notFound()
```

Render: title, client/year/role meta, outcome, metrics row, stack chips, `sections` as heading + paragraphs, back link to `/work`.

- [ ] **Step 3: Ensure prerender covers dynamic slugs**

Either:

- Link crawl from `/work` with `crawlLinks: true`, **or**
- Explicit pages in vite config:

```ts
pages: getAllWork().map((w) => ({
  path: `/work/${w.slug}`,
  prerender: { enabled: true },
}))
```

(Importing content into `vite.config.ts` is fine for static lists.)

- [ ] **Step 4: Build and assert HTML files exist**

```bash
npm run build
# PowerShell example — adjust dist path:
Get-ChildItem -Recurse dist -Filter index.html | Select-Object FullName
```

Expected: `work/uniper-valuation-desktop/index.html` (or equivalent) present.

- [ ] **Step 5: Commit**

```bash
git add src/routes/work src/components/WorkCard.tsx vite.config.ts
git commit -m "feat: add work index and case study routes with prerender"
```

---

### Task 11: About page and static assets

**Files:**
- Create: `src/routes/about.tsx`
- Copy/ensure: `src/assets/portrait.jpg` (from legacy `src/images/portrait.jpg`), `public/og-image.svg`, `public/favicon.svg`, `public/robots.txt`
- Modify: `Seo` default OG image path `/og-image.svg`

**Interfaces:** About consumes `site` + portrait image import.

- [ ] **Step 1: Port portrait asset**

```bash
# from repo root on feature branch
mkdir -p src/assets
cp src/images/portrait.jpg src/assets/portrait.jpg 2>$null
# if already removed, restore from git:
git show master:src/images/portrait.jpg > src/assets/portrait.jpg
```

- [ ] **Step 2: About page layout**

- Two-column on large screens: copy | portrait
- Bio paragraphs (tightened from legacy about): decades of experience, London years (law/insurance/finance), CodeStream, principles simplicity/testing/automation
- Social + email/phone list

- [ ] **Step 3: Create minimal `public/og-image.svg`**

Simple SVG ~1200×630: background zinc, text “Allen Firth” + title line, indigo accent bar. Good enough for v1.

- [ ] **Step 4: `public/robots.txt`**

```txt
User-agent: *
Allow: /

Sitemap: https://allenfirth.info/sitemap.xml
```

- [ ] **Step 5: Manual verify About + image loads**

```bash
npm run dev
```

- [ ] **Step 6: Commit**

```bash
git add src/routes/about.tsx src/assets public/og-image.svg public/favicon.svg public/robots.txt
git commit -m "feat: add about page and social/SEO assets"
```

---

### Task 12: Sitemap, Azure SWA config, CI workflow

**Files:**
- Create: `scripts/generate-sitemap.mjs`, `staticwebapp.config.json`
- Modify: `package.json` `build` script, `.github/workflows/azure-static-web-apps-lemon-dune-002898003.yml`

**Interfaces:**
- Build emits `sitemap.xml` into public or dist
- SWA `output_location` matches Vite/Start output directory (confirm from Task 1 — replace `out` if now `dist`)

- [ ] **Step 1: Sitemap generator**

```js
// scripts/generate-sitemap.mjs
import { writeFileSync } from 'node:fs'
import { work } from '../src/content/work.ts' // if TS import fails, duplicate slug list in script or compile — prefer reading a small JSON export

const siteUrl = 'https://allenfirth.info'
const staticRoutes = ['/', '/about', '/experience', '/skills', '/contact', '/work']
// Prefer generating slug list without TS loader friction:
// maintain WORK_SLUGS array imported from a .json written by content, OR use fs to parse work.ts slugs with a simple regex.

const urls = [
  ...staticRoutes,
  // ...work slugs as `/work/${slug}`
]
const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${siteUrl}${u === '/' ? '' : u}</loc></url>`).join('\n')}
</urlset>
`
writeFileSync('public/sitemap.xml', body)
```

Practical approach that avoids TS-in-node pain: export slugs from `src/content/work-slugs.json` generated by a tiny step, **or** hardcode the 3–4 known slugs in the script and add a test that `getAllWork().map(w => w.slug)` equals that list.

Add test:

```ts
// tests/work.test.ts addition
const SITEMAP_SLUGS = ['uniper-valuation-desktop', 'lseg-tm3', 'spar-datalake'] // keep in sync with script
it('slugs stay in sync with sitemap script list', () => {
  expect(getAllWork().map((w) => w.slug).sort()).toEqual([...SITEMAP_SLUGS].sort())
})
```

Update script to use the same constant file `src/content/work-slugs.ts` exporting `workSlugs` and import from tests; for the mjs script, use:

```js
// scripts/generate-sitemap.mjs
const workSlugs = ['uniper-valuation-desktop', 'lseg-tm3', 'spar-datalake']
```

And keep the test asserting content slugs match this array (duplicate list documented “must match scripts/generate-sitemap.mjs”).

- [ ] **Step 2: Wire build**

```json
"build": "node scripts/generate-sitemap.mjs && vite build"
```

- [ ] **Step 3: `staticwebapp.config.json`**

```json
{
  "trailingSlash": "auto",
  "navigationFallback": {
    "rewrite": "/index.html",
    "exclude": ["/assets/*", "/*.css", "/*.js", "/*.ico", "/*.svg", "/*.pdf", "/*.xml", "/*.txt"]
  },
  "globalHeaders": {
    "X-Content-Type-Options": "nosniff"
  }
}
```

Prefer relying on prerendered files; fallback is safety net only.

- [ ] **Step 4: Update GitHub Actions workflow**

Change:

- `app_build_command` → `npm run build` (or `npm ci && npm run build` if needed)
- `output_location` → actual dist folder name from Start (`dist` unless scaffold differs)
- Remove Next-specific `api_build_command` SWC cleanup if irrelevant
- Keep `azure_static_web_apps_api_token` secret name unchanged
- PR previews: workflow already runs on PRs to `master` — feature branch work deploys via PR when opened

- [ ] **Step 5: Local build + list output**

```bash
npm run build
npm test
```

Expected: both pass; `public/sitemap.xml` exists; static HTML for all routes.

- [ ] **Step 6: Commit**

```bash
git add scripts/generate-sitemap.mjs staticwebapp.config.json package.json .github/workflows public/sitemap.xml tests
git commit -m "chore: add sitemap generation and Azure Static Web Apps config"
```

---

### Task 13: 404 page, README, remove legacy Next remnants

**Files:**
- Create: catch-all 404 route per Start conventions (`src/routes/$.tsx` or `__root` notFoundComponent)
- Replace: `README.md`
- Delete: any remaining Next pages/components (`src/pages`, Spotlight `ArticleLayout`, old `Header` if still present under legacy paths), unused old CVs in public if desired (`allenfirth-cv-old*.pdf` optional delete)

**Interfaces:** 404 shows message + link home; README documents dev/build/deploy for TanStack site.

- [ ] **Step 1: 404 UI**

Simple centered message: “Page not found” + Button to `/`.

- [ ] **Step 2: Rewrite README**

```markdown
# allenfirth.info

Personal site for Allen Firth — senior software engineer and consultant (CodeStream, Durban).

## Stack

TanStack Start (React), TanStack Router, Vite, Tailwind CSS. Fully static prerender for Azure Static Web Apps.

## Develop

npm install
npm run dev

## Build

npm test
npm run build

## Content

Edit typed modules in `src/content/`.
```

- [ ] **Step 3: Delete dead legacy files still on the branch**

```bash
# examples — only if they still exist
git rm -r src/pages 2>$null
# remove orphaned Next components, next.config, etc.
```

- [ ] **Step 4: Grep for leftovers**

```bash
# PowerShell
Select-String -Path package.json,README.md,src -Pattern "next|Planetaria|Spencer|tailwindui-template|teal-500" -Recurse -ErrorAction SilentlyContinue
```

Expected: no Next runtime deps; no template meta; teal only if intentionally left (should be none).

- [ ] **Step 5: Full verify**

```bash
npm test
npm run build
npm run preview
```

Click through all routes in preview.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "chore: remove Next legacy, add 404 and project README"
```

---

### Task 14: Final verification checklist + PR

**Files:** none required (docs optional)

- [ ] **Step 1: Confirm still on feature branch**

```bash
git branch --show-current
```

Expected: `feature/tanstack-rebuild`

- [ ] **Step 2: Run automated checks**

```bash
npm test
npm run build
```

- [ ] **Step 3: Manual product checklist**

- [ ] Home communicates seniority + stack in one screen
- [ ] Experience lists all ported roles, newest first
- [ ] Skills groups render
- [ ] Work index + each slug page
- [ ] About portrait + bio
- [ ] Contact + CV download (`/allenfirth-cv.pdf`)
- [ ] Dark mode toggle persists across reload
- [ ] Mobile nav usable
- [ ] No Spencer/Planetaria/template naming
- [ ] `sitemap.xml` and `robots.txt` present in output

- [ ] **Step 4: Push feature branch and open PR to `master`**

```bash
git push -u origin feature/tanstack-rebuild
gh pr create --base master --head feature/tanstack-rebuild --title "Rebuild site on TanStack Start" --body "## Summary
- Full rebuild on TanStack Start with static prerender
- Recruiter-first IA: home, about, experience, work, skills, contact
- Product UI design system (indigo tokens)
- Azure SWA build/output updated

## Test plan
- [ ] CI preview deploy
- [ ] npm test && npm run build locally
- [ ] Click-through all routes + CV download
- [ ] Dark mode
"
```

- [ ] **Step 5: Do not merge until preview deploy and checklist pass**

Merge is a human decision after PR review. **No direct commits to `master` for this work.**

---

## Self-review (plan vs spec)

| Spec requirement | Task(s) |
|------------------|---------|
| TanStack Start + static prerender | 1, 10, 12 |
| Product UI tokens, indigo, Inter, dark mode | 2, 6 |
| Routes: home, about, experience, work, skills, contact | 7–11 |
| Typed content modules | 3–5 |
| Selected work 3–4 case studies | 5, 10 |
| No engagement/blog/form/Query v1 | Global constraints |
| Azure SWA + CI | 12, 14 |
| Remove Spotlight/Next identity | 1, 13 |
| SEO/OG/sitemap/robots | 3, 6, 11, 12 |
| CV download | 3, 7, 9 |
| Feature branch only | **Task 0 + Global Constraints + Task 14** |

**Placeholder scan:** none intentional; scaffold script names may differ slightly — implementer must match official Start scaffold while preserving behavior.

**Type consistency:** `Role`, `WorkItem`, `SkillGroup`, `getRecentRoles`, `getFeaturedWork`, `getWorkBySlug`, `formatDateRange`, `pageTitle`, `site` used consistently across tasks.

---

## Execution notes

1. Start at Task 0 every time — verify branch before editing.
2. Prefer subagent-driven execution: one task per agent, review between tasks.
3. If Start scaffold file layout differs (e.g. `app.config.ts` vs `vite.config.ts`), adapt paths but keep prerender + static deploy goals.
4. Untracked consultancy WIP is reference only; do not restore `/engagement`.

# Personal site redesign — design spec

**Date:** 2026-07-30  
**Status:** Approved (Approach A)  
**Site:** allenfirth.info  
**Primary job:** Professional presence / CV  
**Primary audience:** Recruiters and hiring managers  
**Visual direction:** Clean modern product UI  
**Technical path:** Full rebuild with TanStack Start (static prerender)

---

## 1. Goals and non-goals

### Goals

1. Replace the Tailwind UI Spotlight / Next.js portfolio with a recruiter-first professional site.
2. Deliver a consistent product-UI visual system (not a personal-blog template look).
3. Full static generation via TanStack Start for Azure Static Web Apps (or equivalent CDN).
4. Preserve and structure career content: experience timeline, skills, bio, CV download.
5. Add selected work (outcome-led case highlights) without turning the site into a consultancy sales funnel.

### Non-goals (v1)

- Blog, RSS, or thought-leadership CMS
- Contact form backend or server runtime in production
- Engagement / pricing / “how to hire me” sales page
- Testimonials, availability product widget (optional later)
- Internationalisation
- TanStack Query for remote data (not needed at build-time-only content)

---

## 2. Current state (baseline)

### Live / committed app

- Next.js 13 Pages Router, React 18, Tailwind 3, Headless UI
- Based on Tailwind UI **Spotlight** template (`package.json` name still `tailwindui-template`)
- Routes: `/`, `/about`, `/skills`, `/experience`, `/contact`
- Visual: zinc + teal, pill nav, scroll-scaling avatar header, floating white column shell
- Content issues: thin home, long unstructured experience page, skills as bullet list, passive contact, leftover template meta copy in places

### Untracked WIP (reference only)

Partial redesign exists as untracked files: case studies (`/work`), `/engagement`, Hero/Pillar/metrics components, SEO helpers. Positioning is consultancy/editorial (`paper`/`ink`/amber). **Do not adopt WIP as product architecture.** Mine case-study copy and metrics into the new content model only.

---

## 3. Architecture

### Stack

| Concern | Choice |
|---------|--------|
| Framework | TanStack Start (React) on Vite |
| Routing | TanStack Router (file-based routes) |
| Content | Typed TypeScript modules under `src/content/` |
| Styling | Tailwind CSS + CSS variables for theme tokens |
| Icons | Inline SVG or `lucide-react` |
| Output | Static prerender at build time |
| Hosting | Azure Static Web Apps |
| Language | TypeScript throughout |

TanStack Query is **out of scope for v1**.

### Directory shape

```
src/
  routes/           # file-based routes (__root, index, about, …)
  components/       # UI primitives + page sections
  content/          # experience, work, skills, site meta
  styles/           # global CSS + tokens
  lib/              # helpers (paths, SEO, date formatting)
public/             # CV PDF, favicon, OG image
```

### Rendering and deploy

- Enable TanStack Start **prerender** for all public routes.
- Discover work slugs from `content/work` at build time and include them in prerender.
- Production needs no Node server for v1 — pure static files.
- Align trailing-slash policy once between Start output and `staticwebapp.config.json`.
- CI: install → build/prerender → deploy artifact directory (confirm Start output dir at scaffold time, typically `dist`).

### What we leave behind

- Next.js Pages Router, Spotlight shell, Headless UI pill nav, avatar scroll choreography
- WIP engagement page and consultancy sales chrome
- Package/README identity as a Tailwind UI template

---

## 4. Visual system

### Brand feel

Clean modern product UI: calm, precise, scannable in ~10 seconds. Closer to polished SaaS/docs than magazine or personal blog. Light-first with a proper dark mode.

### Colour tokens

| Token | Light | Dark | Role |
|-------|--------|------|------|
| `--bg` | `#fafafa` | `#09090b` | Page background |
| `--surface` | `#ffffff` | `#18181b` | Cards, header bar |
| `--border` | `#e4e4e7` | `#27272a` | Dividers, card edges |
| `--text` | `#18181b` | `#fafafa` | Primary text |
| `--text-muted` | `#52525b` | `#a1a1aa` | Body / secondary |
| `--text-subtle` | `#71717a` | `#71717a` | Meta, labels |
| `--accent` | `#4f46e5` | `#818cf8` | Links, active nav, focus (indigo) |
| `--accent-hover` | `#4338ca` | `#a5b4fc` | Hover |

Accent is **indigo**, not Spotlight teal.

### Typography

| Role | Font | Usage |
|------|------|--------|
| UI / body | Inter | Body, nav, chrome |
| Mono (sparing) | JetBrains Mono or system mono | Dates, stack chips, section labels |
| Display | Inter (semibold/bold, tight tracking) | Page titles — **no serif for v1** |

Approximate scale:

- Page title: `text-3xl` / `sm:text-4xl`, tight tracking
- Section title: `text-xl` / `text-2xl`
- Body: `text-base`, relaxed leading
- Meta / chips: `text-xs`

### Layout

- Max content width ~`max-w-6xl` (72rem), responsive horizontal padding
- Full-bleed page background; surface only on cards and header (no Spotlight floating column)
- Home: stacked sections with consistent vertical rhythm
- Experience: timeline (year rail + cards)
- Work index: responsive card grid (1 → 2 → 3 columns)

### Component kit (v1)

| Component | Responsibility |
|-----------|----------------|
| `Header` | Sticky surface/blur; name left; nav; theme toggle; optional CV link |
| `Footer` | Compact nav, copyright, LinkedIn/GitHub |
| `Button` | Primary (solid accent), secondary (border), ghost (text) |
| `Card` | Surface + border; subtle hover |
| `Section` / `SectionHeader` | Optional eyebrow, title, description |
| `Timeline` | Experience entries |
| `WorkCard` | Title, client, year, one-line outcome |
| `SkillGroup` | Layer label + chips |
| `MetaChip` | Stack / tech tags |
| `Seo` | Title, description, canonical, OG/Twitter |

Motion: short transitions (~150ms), accent focus rings, no heavy animation.

### Imagery

- Portrait on About; optional small header avatar
- No stock hero illustration
- Branded OG image (name + role line)
- CV PDF in `public/`

### Explicit visual exclusions

- Serif editorial display and amber “consultancy paper” palette from WIP
- Teal Spotlight pills, gradient underlines, scroll-scaling avatar
- Dense decoration, large gradients, heavy glassmorphism

---

## 5. Information architecture and content

### Site map

| Route | Purpose |
|-------|---------|
| `/` | Who, seniority, stack snapshot, recent roles, selected work, CV + contact |
| `/about` | Bio, location, CodeStream, London years, principles, portrait, social |
| `/experience` | Full role timeline (primary depth page) |
| `/work` | Selected work index |
| `/work/$slug` | Short case write-up |
| `/skills` | Grouped capabilities |
| `/contact` | Email, phone, LinkedIn, GitHub, CV download |

**Nav:** About · Experience · Work · Skills · Contact (home via name/wordmark). Optional header: Download CV.

**Not in v1:** `/engagement`, blog, testimonials.

### Home sections (top → bottom)

1. Hero — name, title line, short summary, primary Download CV, secondary View experience  
2. Highlights — 3 compact facts (e.g. years, markets, location story)  
3. Recent experience — 2–3 latest roles → Experience  
4. Selected work — up to 3 featured cards → Work  
5. Skills snapshot — condensed groups or top chips  
6. Contact strip — email, LinkedIn, CV  

Tone: professional presence; soft “Get in touch”, not hard sales CTAs.

### Content model

```ts
// content/site.ts
export const site = {
  name: string
  title: string
  email: string
  phone: string
  location: string
  links: { linkedin: string; github: string; codestream?: string; cv: string }
  seo: { defaultDescription: string; siteUrl: string }
}

// content/experience.ts
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

// content/work.ts
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

// content/skills.ts
export type SkillGroup = {
  layer: string
  items: string[]
}
```

Work bodies live as structured `sections` in TypeScript for v1 (MDX optional later).

### Content sources

| Target | Source |
|--------|--------|
| Experience | Port/tighten `src/pages/experience.jsx` |
| Work | Port 3–4 items from untracked WIP MDX (Uniper, LSEG, SPAR, Chelsea) |
| Skills | Merge skills page + WIP stack groups |
| About | Rewrite from `about.jsx` |
| Site meta | Authoritative identity; remove template leftovers |

### SEO

- Per-route title/description via `Seo`
- Patterns: home `Allen Firth — {title line}`; interior `{Page} — Allen Firth`
- Canonical URLs, `og:image`, Twitter card tags
- `robots.txt` + build-generated `sitemap.xml`
- No Spencer/Planetaria or other template meta

### Content principles

1. Scan first — bullets and chips over long prose on list views  
2. One consistent career story across pages and CV PDF  
3. Proof where it counts — metrics on work; impact bullets on experience  
4. No fake social proof  

---

## 6. Migration plan

### Strategy

Greenfield rebuild on a long-lived branch (e.g. `feature/tanstack-rebuild`). Replace app at repo root when ready; keep `master` deployable until cutover. Use git history and untracked WIP as **reference**, not a dual-app forever.

Optional alternative: park current Next tree under `legacy/` during scaffold — only if root replacement is awkward; prefer single-app branch rebuild.

### Phases

| Phase | Deliverable | Exit criteria |
|-------|-------------|---------------|
| 0. Scaffold | TanStack Start + TS + Tailwind + prerender | Dev server + static build for stub home |
| 1. Design system | Tokens, typography, Header/Footer/Button/Card/Section/Seo | Shared chrome; light/dark works |
| 2. Content layer | Populated `content/*` | All routes feedable; no lorem |
| 3. Core pages | Home, Experience, Skills, Contact | Recruiter path without Work |
| 4. Work | Index + `$slug`, prerender all slugs | 3–4 case studies live |
| 5. About + assets | About, portrait, CV, favicon, OG | Essential parity |
| 6. Deploy hardening | SWA config, sitemap/robots, `SITE_URL`, CI | Preview + production-ready artifact |
| 7. Cutover | Merge, delete Next/Spotlight/WIP dead code, README | `master` is TanStack-only |

### Content port order

1. `site.ts`  
2. `experience.ts`  
3. `skills.ts`  
4. `work.ts`  
5. About copy  

### Risks

| Risk | Mitigation |
|------|------------|
| Prerender misses work slugs | Explicit slug list from content; CI asserts HTML per slug |
| Trailing-slash / Azure mismatch | One URL policy; config and links agree |
| Content regression | Checklist: every old role present; CV link works |
| Scope creep | Enforce non-goals until post-cutover |
| WIP pollutes tree | Port content only; do not merge WIP into Next |

### Verification before done

- All routes on desktop and mobile  
- Dark mode on chrome and pages  
- Reasonable Lighthouse performance/SEO on static host  
- OG tags and CV download work  
- No template naming or meta leftovers  
- Acceptable 404  

### Success criteria

1. Recruiter understands seniority, recent employers, and stack in under a minute (Home + Experience).  
2. CV downloads in one click from Home and Contact.  
3. Selected work shows outcomes without a sales narrative.  
4. Fully static, fast, visually consistent product UI.  
5. Repo and README describe Allen’s site, not Spotlight.

### Post-cutover (out of scope)

Contact form, availability line, MDX long-form, blog, further brand iteration.

---

## 7. Decisions log

| Decision | Choice |
|----------|--------|
| Primary job | Professional presence / CV |
| Primary visitor | Recruiters / hiring managers |
| Visual personality | Clean modern product UI |
| Technical approach | Full rebuild, TanStack Start, static prerender |
| Content shape | CV core + selected work |
| Accent | Indigo |
| Display type | Inter only (no serif v1) |
| Work long-form | TS `sections` (not MDX) for v1 |
| Query library | Not used in v1 |

---

## 8. Next step

After user review of this spec: produce an implementation plan via the writing-plans process, then execute phase 0 onward.

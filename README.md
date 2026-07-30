# allenfirth.info

Personal site for **[Allen Firth](https://allenfirth.info)** — senior software engineer and consultant (CodeStream, Durban).

The site is a **static**, recruiter-facing professional presence: home, about, experience timeline, selected work case studies, skills, and contact. Content is typed TypeScript modules, not a CMS.

---

## Stack

| Piece | Choice |
|--------|--------|
| UI | React 19 + TypeScript |
| Framework | [TanStack Start](https://tanstack.com/start) + [TanStack Router](https://tanstack.com/router) (file-based routes) |
| Build | Vite 8, Nitro, static prerender |
| Styles | Tailwind CSS v4 (`src/styles/app.css`) |
| Tests | Vitest |
| Hosting | Azure Static Web Apps |

Node **22+** is recommended (matches CI).

---

## Prerequisites

- Node.js 22 or newer  
- npm (comes with Node)  
- Git  

---

## Getting started

```sh
git clone https://github.com/halcharger/website-allenfirth-info.git
cd website-allenfirth-info
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:3000`).

| Command | What it does |
|---------|----------------|
| `npm run dev` | Local development server with HMR |
| `npm test` | Run unit tests once |
| `npm run test:watch` | Vitest in watch mode |
| `npm run typecheck` | TypeScript check (`tsc --noEmit`) |
| `npm run build` | Generate sitemap, production build, prerender → `.output/public` |
| `npm run preview` | Serve the production build locally |

---

## Project layout

```
src/
  routes/           # Pages (file-based routing)
  components/       # Shared UI (Header, Card, Timeline, …)
  content/          # Site copy and structured data
  lib/              # Small helpers (dates, SEO, theme)
  styles/app.css    # Design tokens + Tailwind entry
  assets/           # Images imported by the app (e.g. portrait)
public/             # Static files copied as-is (CV PDF, favicons, robots.txt)
scripts/            # Build helpers (sitemap generation)
staticwebapp.config.json
.github/workflows/  # Azure Static Web Apps CI/CD
```

### Routes

| Path | Purpose |
|------|---------|
| `/` | Landing / hero, highlights, recent experience, work, skills snapshot |
| `/about` | Bio, portrait, contact links |
| `/experience` | Full role timeline |
| `/work` | Case study index |
| `/work/:slug` | Individual case study |
| `/skills` | Skill groups |
| `/contact` | Email, phone, social, CV download |

---

## Editing content (most common task)

Almost all copy lives under **`src/content/`**:

| File | Contents |
|------|----------|
| `site.ts` | Name, title line, SEO description, email, phone, social links, CV path |
| `experience.ts` | Roles (newest first): company, dates, bullets, stack |
| `skills.ts` | Skill groups and chips |
| `work.ts` | Case studies (`slug`, metrics, sections, `featured`, `order`) |
| `index.ts` | Re-exports and helpers (`getRecentRoles`, `getFeaturedWork`, …) |

After content edits:

```sh
npm test
npm run build   # optional locally; CI runs this on push
```

**CV:** replace `public/allenfirth-cv.pdf` (and keep the path in `site.links.cv` in sync if you rename it).

**Portrait:** `src/assets/portrait.jpg` (used on home and about).

---

## Styling

- Global tokens and Tailwind setup: **`src/styles/app.css`**
- Prefer semantic classes from the theme: `bg-bg`, `bg-surface`, `text-text`, `text-text-muted`, `border-border`, `text-accent`, etc.
- Accent colour is indigo (light/dark variants defined as CSS variables).
- Shared cards: `src/components/Card.tsx` — use this for work/skills-style surfaces.

---

## Testing

```sh
npm test
```

Tests cover content helpers and invariants (unique role IDs, work slugs, date formatting). When you add a work case study, update **`src/content/work.ts`** and keep sitemap slug lists in sync (tests will fail if they drift).

---

## Build output

```sh
npm run build
```

1. `scripts/generate-sitemap.mjs` writes `public/sitemap.xml` (gitignored) and copies SWA config into `public/` for the build.  
2. Vite/Nitro builds and **prerenders** routes into **`.output/public`**.

That folder is what gets deployed. Preview it with:

```sh
npm run preview
```

---

## Deploy (Azure Static Web Apps)

Production deploys from **`master`**. Pull requests to `master` get preview environments.

Workflow: `.github/workflows/azure-static-web-apps-lemon-dune-002898003.yml`

What CI does:

1. Checkout  
2. Node 22, `npm install`, `npm run build` **on the GitHub runner**  
3. Deploy **`.output/public`** with `skip_app_build: true`  

**Why not build inside Azure’s Oryx container?**  
TanStack prerender starts a local Vite preview server. That step fails inside the SWA Oryx Docker environment (`ECONNREFUSED`). Building on the runner avoids that.

Required secret (repo settings): `AZURE_STATIC_WEB_APPS_API_TOKEN_LEMON_DUNE_002898003`.

Routing / headers for the static host: **`staticwebapp.config.json`** (source of truth in the repo root).

---

## Git conventions

- Default branch: **`master`**  
- Prefer short-lived feature branches and PRs for non-trivial changes  
- Do not commit build artefacts: `.output/`, `.next/`, `out/`, generated `public/sitemap.xml` (see `.gitignore`)  

---

## Agent / AI tooling

Project instructions for coding agents live in **`AGENTS.md`**. That file is not part of the public site.

---

## Licence

See [LICENSE.md](./LICENSE.md).

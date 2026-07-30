# AGENTS.md — allenfirth.info

Instructions for AI coding agents working in this repository.

**Not a site asset.** This file is for agent/developer context only. Azure Static Web Apps deploys **only** from `.output/public` (see CI workflow). Root files such as `AGENTS.md`, `docs/`, tests, and config are **not** published to allenfirth.info.

---

## What this project is

Personal professional site for **Allen Firth** (CodeStream, Durban): recruiter-first CV / presence, not a consultancy sales funnel.

- Primary audience: recruiters and hiring managers  
- Positioning: senior software engineer with **AI-augmented delivery since June 2025**  
- Live site: https://allenfirth.info  

Design / plan docs (if present): `docs/superpowers/specs/`, `docs/superpowers/plans/`.

---

## Stack

| Layer | Choice |
|--------|--------|
| Framework | **TanStack Start** (React 19) + **TanStack Router** (file routes) |
| Build | **Vite 8**, **Nitro**, static **prerender** |
| Styling | **Tailwind CSS v4** (`@tailwindcss/vite`), tokens in `src/styles/app.css` |
| Language | **TypeScript** |
| Tests | **Vitest** (`tests/`) |
| Hosting | **Azure Static Web Apps** |

Do **not** reintroduce Next.js, Pages Router, or the old Tailwind UI Spotlight shell.

---

## Layout (important paths)

```
src/
  routes/          # File-based routes (__root, index, about, experience, work, …)
  components/      # UI primitives (Button, Card, Header, …)
  content/         # Typed content modules (site, experience, skills, work)
  lib/             # dates, seo helpers, theme
  styles/app.css   # Design tokens + Tailwind entry
  assets/          # Portrait and bundled images
public/            # CV PDF, favicons, robots.txt (static copy-through)
scripts/           # generate-sitemap.mjs (runs as part of npm run build)
staticwebapp.config.json
.github/workflows/ # Azure SWA CI/CD
```

Content is **data**, not JSX walls of prose: edit `src/content/*.ts` for experience, skills, work, site meta.

---

## Commands

```sh
npm install
npm run dev          # local dev
npm test             # vitest
npm run typecheck
npm run build        # sitemap + vite build + prerender → .output/public
npm run preview      # preview production build
```

Before claiming work is done: run **`npm test`** and **`npm run build`** when changes affect content, routes, or config.

---

## Visual / UX conventions

Product UI (not editorial magazine, not Spotlight teal):

- Semantic tokens: `bg-bg`, `bg-surface`, `text-text`, `text-text-muted`, `border-border`, `text-accent`, etc.  
- Accent: **indigo** (CSS vars in `app.css`)  
- Fonts: Inter (UI), JetBrains Mono (labels/meta only)  
- Cards: shared `Card` component (`bg-surface`, border) for work and skills  
- Dark mode: `.dark` on `<html>` via theme toggle + FOUC script in root  

Keep the site scannable for a 10-second recruiter pass.

---

## Content & copy

- Tone: professional, senior, credible. AI messaging: **agents for speed, human review for risk** — since **June 2025**.  
- Do **not** backdate AI onto roles that ended before mid-2025 unless factually true.  
- Work case studies: NDA-safe; prefer outcomes and metrics over confidential detail.  
- Site identity: `src/content/site.ts` (title, SEO, links, CV path).  

---

## Git & PRs

- Default branch: **`master`**.  
- Prefer feature branches for non-trivial work; open a PR for review when changing deploy/CI.  
- Commit messages: complete sentences, focus on **why**.  
- Do **not** force-push `master` or commit secrets.  
- Do **not** commit build output: `.output/`, `.next/`, `/out/`, generated `public/sitemap.xml` (see `.gitignore`).  

---

## Deploy (Azure Static Web Apps)

Workflow: `.github/workflows/azure-static-web-apps-lemon-dune-002898003.yml`

1. GitHub Actions builds on the **runner**: `npm install` + `npm run build`  
2. Deploy with **`skip_app_build: true`** and **`app_location: .output/public`**  

**Why:** TanStack prerender starts a Vite preview server; that fails inside SWA Oryx Docker (`ECONNREFUSED 127.0.0.1`). Never revert to Oryx-only `app_build_command` without verifying prerender.

Static config source: repo-root `staticwebapp.config.json` (copied into `public/` during the sitemap script). Deployed artifact is still only under `.output/public`.

---

## Testing notes

- Content helpers: `tests/content.test.ts`, `tests/dates.test.ts`, `tests/work.test.ts`  
- Work slugs used by sitemap script must stay in sync with `src/content/work.ts` (tests guard this).  
- Prerender must emit HTML for `/`, `/about`, `/experience`, `/skills`, `/contact`, `/work`, and each work slug.  

---

## Out of scope (unless explicitly requested)

- Blog / RSS  
- Contact form backend  
- Engagement / pricing sales pages  
- CMS  
- TanStack Query for remote data (content is build-time)  

---

## Agent working style

- Prefer small, focused files and existing patterns.  
- Match product-UI tokens; avoid one-off zinc/teal Spotlight leftovers.  
- Ask before destructive git operations (hard reset, force-push).  
- After deploy-related changes, remind to verify Azure Actions and the live/preview URL.  

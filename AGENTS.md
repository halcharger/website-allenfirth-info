# AGENTS.md — allenfirth.info

Instructions for AI coding agents working in this repository.

**Not a site asset.** This file is for agent/developer context only. Cloudflare Pages deploys static files from `.output/public` plus the root `functions/` directory. Root files such as `AGENTS.md`, `docs/`, and tests are **not** published as site pages.

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
| Hosting | **Cloudflare Pages** (Git integration) |
| Contact API | **Pages Function** `functions/api/contact.ts` → Resend |

Do **not** reintroduce Next.js, Pages Router, or the old Tailwind UI Spotlight shell.

---

## Layout (important paths)

```
src/
  routes/          # File-based routes (__root, index, about, experience, work, …)
  components/      # UI primitives (Button, Card, Header, ContactForm, …)
  content/         # Typed content modules (site, experience, skills, work)
  lib/             # dates, seo, theme, contact validation + Resend handler
  styles/app.css   # Design tokens + Tailwind entry
  assets/          # Portrait and bundled images
public/            # CV PDF, favicons, robots.txt, _headers
functions/api/     # Pages Function: POST /api/contact → Resend
scripts/           # generate-sitemap.mjs (runs as part of npm run build)
wrangler.toml      # local Pages Functions / CONTACT_* defaults only
```

Content is **data**, not JSX walls of prose: edit `src/content/*.ts` for experience, skills, work, site meta.

---

## Commands

```sh
npm install
npm run dev          # local UI (Vite). /api/contact is not served here.
npm test             # vitest
npm run typecheck
npm run build        # sitemap + vite build + prerender → .output/public
npm run preview      # preview production static build (no Functions)
```

Contact API locally (after `npm run build`):

```sh
cp .dev.vars.example .dev.vars   # add RESEND_API_KEY
npx wrangler pages dev .output/public
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
- Contact: form (name, email, message) posts to `/api/contact`. Keep mailto fallback. Do not put `RESEND_API_KEY` in the repo — use Cloudflare secrets / `.dev.vars`.  

---

## Git & PRs

- Default branch: **`master`**.  
- Prefer feature branches for non-trivial work; open a PR for review when changing deploy/CI.  
- Commit messages: complete sentences, focus on **why**.  
- Do **not** force-push `master` or commit secrets.  
- Do **not** commit build output: `.output/`, `.next/`, `/out/`, generated `public/sitemap.xml` (see `.gitignore`).  

---

## Deploy (Cloudflare Pages)

Primary host is **Cloudflare Pages** (Git integration on `master`).

Dashboard settings:

| Setting | Value |
|--------|--------|
| Build command | `npm install --no-audit --no-fund && npm test && npm run typecheck && npm run build` |
| Output directory | `.output/public` |
| Production branch | `master` |

Set environment variable **`SKIP_DEPENDENCY_INSTALL=true`** (Production and Preview). Pages otherwise runs `npm ci` first; this lockfile can lag nested optional peers on Linux (`Missing: lru-cache@… from lock file`), the same reason Azure used `npm install`.

Root `functions/` is published with that build (including PR previews). **Do not** set `pages_build_output_dir` in `wrangler.toml` — that makes Pages skip the dashboard build command.

Secrets (Pages project → Settings → Variables and Secrets):

| Name | Required | Notes |
|------|----------|--------|
| `RESEND_API_KEY` | Yes | Resend API key — type **Secret**. Enable for Production **and** Preview. |
| `CONTACT_TO` | No | Defaults to `allen@codestream.co.za` |
| `CONTACT_FROM` | No | Defaults to `Allen Firth <noreply@codestream.co.za>` — sending domain must be verified in Resend |

If `RESEND_API_KEY` is missing the Function returns HTTP 500 with `Contact form is not configured`.

Headers: `public/_headers` (copied into `.output/public` by the build).

If a Pages Git build fails because prerender cannot bind `127.0.0.1:4173`, fall back to a GitHub Action that builds on the runner and `wrangler pages deploy .output/public`. Do not switch to TanStack Start on Workers SSR unless explicitly requested.

---

## Testing notes

- Content helpers: `tests/content.test.ts`, `tests/dates.test.ts`, `tests/work.test.ts`  
- Contact: `tests/contact.test.ts`, `tests/contact-handler.test.ts`  
- Work slugs used by sitemap script must stay in sync with `src/content/work.ts` (tests guard this).  
- Prerender must emit HTML for `/`, `/about`, `/experience`, `/skills`, `/contact`, `/work`, and each work slug.  

---

## Out of scope (unless explicitly requested)

- Blog / RSS  
- Captcha / Turnstile (add only if spam becomes a problem)  
- Engagement / pricing sales pages  
- CMS  
- TanStack Query for remote data (content is build-time)  

---

## Agent working style

- Prefer small, focused files and existing patterns.  
- Match product-UI tokens; avoid one-off zinc/teal Spotlight leftovers.  
- Ask before destructive git operations (hard reset, force-push).  
- After deploy-related changes, remind to verify the Cloudflare Pages build (Functions uploaded) and the live/preview URL.  

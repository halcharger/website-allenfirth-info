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
| Hosting | Cloudflare Pages |
| Contact | Pages Function + Resend (`POST /api/contact`) |

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
| `npm run preview` | Serve the production static build locally (no Functions) |

---

## Project layout

```
src/
  routes/           # Pages (file-based routing)
  components/       # Shared UI (Header, Card, Timeline, ContactForm, …)
  content/          # Site copy and structured data
  lib/              # Small helpers (dates, SEO, theme, contact)
  styles/app.css    # Design tokens + Tailwind entry
  assets/           # Images imported by the app (e.g. portrait)
public/             # Static files copied as-is (CV PDF, favicons, robots.txt, _headers)
functions/api/      # Cloudflare Pages Function for the contact form
scripts/            # Build helpers (sitemap generation)
wrangler.toml       # Local Pages Functions only
```

### Routes

| Path | Purpose |
|------|---------|
| `/` | Landing / hero, highlights, recent experience, work, skills snapshot |
| `/about` | Bio, portrait, social links |
| `/experience` | Full role timeline |
| `/work` | Case study index |
| `/work/:slug` | Individual case study |
| `/skills` | Skill groups |
| `/contact` | Message form, social links, CV download |

---

## Editing content (most common task)

Almost all copy lives under **`src/content/`**:

| File | Contents |
|------|----------|
| `site.ts` | Name, title line, SEO description, social links, CV path |
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

Tests cover content helpers, contact validation/Resend payload shaping, and invariants (unique role IDs, work slugs, date formatting). When you add a work case study, update **`src/content/work.ts`** and keep sitemap slug lists in sync (tests will fail if they drift).

---

## Build output

```sh
npm run build
```

1. `scripts/generate-sitemap.mjs` writes `public/sitemap.xml` (gitignored).  
2. Vite/Nitro builds and **prerenders** routes into **`.output/public`**.

That folder is the static output Cloudflare Pages publishes, together with root `functions/`. Preview the static build with:

```sh
npm run preview
```

---

## Contact form

Fields: **name**, **email**, **message**. The form posts to `/api/contact` (`functions/api/contact.ts`), which emails `CONTACT_TO` via Resend (`reply_to` is the visitor’s address). The public site does not show a personal email or phone.

### Local API

```sh
cp .dev.vars.example .dev.vars   # add your RESEND_API_KEY
npm run build
npx wrangler pages dev .output/public
```

`npm run dev` does not serve the Function; the form will show an error until you run Pages Functions locally.

### Secrets (Cloudflare Pages)

The Function reads `RESEND_API_KEY` at **runtime**. Set secrets in the Pages project → **Settings** → **Variables and Secrets**:

| Name | Required | Notes |
|------|----------|--------|
| `RESEND_API_KEY` | Yes | Resend API key — type **Secret** |
| `CONTACT_TO` | No | Defaults to `allen@codestream.co.za` |
| `CONTACT_FROM` | No | Defaults to `Allen Firth <noreply@codestream.co.za>` — domain must be verified in Resend |

Enable the secret for **Preview** and **Production**. Existing deploys do not pick up new secrets until redeployed.

---

## Deploy (Cloudflare Pages)

Production deploys from **`master`**. Pull requests get `*.pages.dev` previews.

Connect the GitHub repo in the Cloudflare dashboard:

| Setting | Value |
|---------|--------|
| Build command | `npm install --no-audit --no-fund && npm test && npm run typecheck && npm run build` |
| Output directory | `.output/public` |
| Production branch | `master` |

Also set **`SKIP_DEPENDENCY_INSTALL`** = `true` (Production and Preview). Cloudflare otherwise runs `npm ci` before the build command; this repo’s lockfile can fail that check on Linux (`Missing: lru-cache@… from lock file`). `npm install` still respects the lockfile, which is what Azure CI used.

Do **not** add `pages_build_output_dir` to `wrangler.toml`.

After the first successful Pages deploy, attach the custom domain `allenfirth.info` (DNS is already on Cloudflare). Then retire the old Azure Static Web Apps resource so it is no longer the origin.

Confirm in the deploy log that Functions were uploaded (`Found Functions directory at /functions`).

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

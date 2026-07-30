# allenfirth.info

Personal site for Allen Firth — senior software engineer and consultant (CodeStream, Durban).

## Stack

TanStack Start (React), TanStack Router, Vite, Tailwind CSS. Fully static prerender for Azure Static Web Apps.

## Develop

```sh
npm install
npm run dev
```

## Build

```sh
npm test
npm run build
```

Preview the production build:

```sh
npm run preview
```

## Content

Edit typed modules in `src/content/`.

## Deploy

Azure Static Web Apps CI builds with `npm run build` and deploys from `.output/public`. Source of truth for SWA settings is `staticwebapp.config.json` (copied into `public/` during the sitemap step).

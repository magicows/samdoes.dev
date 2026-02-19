# samdoes.dev

Personal website + blog for Sam Fitzpatrick.

- **Frontend:** Next.js (Pages Router) + React + TypeScript
- **Styling:** Tailwind CSS (+ a small amount of custom CSS for Notion-rendered blocks)
- **Content source:** Notion database (acts as a lightweight CMS)
- **Deployment:** Vercel (preview deploys on branches)

## What this repo contains

- **Home page**: a simple personal/portfolio landing page
- **Blog**: statically generated/ISR pages that render posts pulled from Notion
- **Revalidate endpoint**: used to refresh ISR content when Notion changes

## Local development

### Prerequisites

- Node (see `.nvmrc`)
- npm

### Install

```bash
npm install
```

### Environment variables

Create a `.env` file (this repo expects it to exist locally).

At minimum:

- `NOTION_TOKEN`
- `NOTION_DATABASE_ID`

Optional (if you use the Spotify widget / endpoint):

- Spotify-related env vars (see `src/pages/api/spotify.ts`)

### Run dev server

```bash
npm run dev
```

Then open: http://localhost:3000

### Build

```bash
npm run build
npm run start
```

## Content model (Notion)

Posts are queried from the Notion database defined by `NOTION_DATABASE_ID`.

Expected properties:

- **Title** (title)
- **Slug** (rich text)
- **Summary** (rich text)
- **Tags** (multi-select)
- **Date** (date)
- **Status** (status) — only `Live` posts are published

## Notes / conventions

- Work happens on `dev`. PRs/merges to `main` are intentional (manual approval).
- Notion blocks are rendered to HTML in `src/pages/blog/[slug].tsx`.
- Styling for Notion-rendered blocks lives primarily in `src/styles/globals.css`.

## Troubleshooting

- If a post doesn’t show up, check its **Status** is `Live` and it has a **Slug**.
- If Notion fetches fail, verify `NOTION_TOKEN` and `NOTION_DATABASE_ID`.

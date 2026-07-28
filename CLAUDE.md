# Marin Mirasol - Portfolio

Personal portfolio: React + TypeScript + Vite + TailwindCSS, deployed to GitHub
Pages at marinmirasol.com. It's a single page; the content is data-driven from
`src/hooks/useProjects.tsx` and `src/hooks/useTechnologies.tsx`.

## Project preview screenshots

Each project card flips to a carousel of app screenshots (or, for the CLI
projects, an interactive in-browser terminal). The screenshots are **generated,
not hand-captured**:

- Generator: `screenshots/capture.mjs` (Playwright); config in
  `screenshots/config.mjs`. Output lands in
  `public/images/project-previews/*.webp` and is referenced by the
  `previewImages` arrays in `useProjects.tsx`.
- Run locally: `npm run screenshots` (one-time setup: `npx playwright install chromium`).
- Or run the **"Regenerate project previews"** GitHub Action - it's **manual
  only** (Actions tab -> Run workflow). It captures the live apps and opens a
  single reviewable PR. Re-running updates that same PR, and it closes any stray
  duplicate PRs, so previews never pile up.

### When to regenerate (assistant: act on this)

These previews go stale when a showcased app's UI changes. **If you make or
notice noticeable visual updates to any of the showcased live projects
(Lifelyze, Tunelyze, ProUML, ExchangeMyIdeas), ask the developer whether they'd
like to start a screenshot-regeneration job** so the portfolio stays current.
Offer it - don't run it unprompted.

## Conventions

- No em dashes in site copy or code - use hyphens.
- Preview filenames: `<project-id>-<n>.webp` (display order = array order).
- Interactive CLI terminals live in `src/components/Terminal/programs/`; register
  new ones in `ProjectTerminal.tsx` and set `terminal:` on the project.

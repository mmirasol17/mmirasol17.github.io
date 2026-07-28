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

## Project app icons

Every project card shows an app icon, set by the `icon` field in
`useProjects.tsx` and served from `public/icons/projects/<project-id>.(svg|png)`.
The same file doubles as the favicon in the fake browser chrome of the preview
frame and terminal.

- Real marks, pulled from the live apps: Lifelyze, Tunelyze, ExchangeMyIdeas,
  SigParser (Enterprise SaaS), and Chattington (its Play Store launcher icon
  from the Android repo).
- Hand-drawn tiles for the ones with no published icon: ProUML (its site brands
  itself with the lucide `command` glyph; its only favicon is the stock Next.js
  one), GradeApp, Attendance Grading System, myPR200 GUI, and the two CLI tools.
- Every file is a self-contained rounded-square tile that reads at 22px, so
  callers only pick a size. Add a new one the same way and keep transparent
  marks off transparent backgrounds.

## Conventions

- No em dashes in site copy or code - use hyphens.
- Preview filenames: `<project-id>-<n>.webp` (display order = array order).
- Interactive CLI terminals live in `src/components/Terminal/programs/`; register
  new ones in `ProjectTerminal.tsx` and set `terminal:` on the project.

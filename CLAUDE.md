@AGENTS.md

# ML Math E-Book Project

## Tech Stack
- Next.js 16.2.1 (App Router, static export)
- TypeScript strict mode
- Tailwind CSS v4 (CSS-based config via `@theme inline` in globals.css)
- MathJax 3 (CDN, client-side rendering)
- pnpm (always use pnpm, never npm/yarn)

## Project Structure
- `src/app/` — Next.js App Router pages and layouts
- `src/components/` — React components (layout/, chapter/, ui/)
- `src/data/` — JSON content files and metadata
- `src/hooks/` — Custom React hooks
- `src/lib/` — Utility functions (data access, progress)
- `src/types/` — TypeScript interfaces

## Key Conventions
- All content in Dhakaia Bengali with "গুরু" persona
- Dark theme only (bg-base: #0b0f1a)
- Static export: `output: 'export'` in next.config.ts
- Chapter data in JSON files at `src/data/chapters/{category}/{slug}.json`
- Tailwind 4: custom tokens in `src/app/globals.css` @theme inline block
- Fonts: Hind Siliguri (Bengali text) + JetBrains Mono (code)

## Commands
- `pnpm dev` — development server
- `pnpm build` — production build (static export to out/)
- `pnpm lint` — ESLint check

## Git
- `master` = production (Vercel deploy)
- Feature branches for development
- Always build-verify before merging to master

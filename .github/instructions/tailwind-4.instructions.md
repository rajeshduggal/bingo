
---
applyTo: "src/**/*.{ts,tsx,js,jsx,css},tailwind.config.*,postcss.config.*"
---

Tailwind v4 — Copilot 1‑pager (frontend devs)

Purpose
- Quick, practical Tailwind CSS v4 notes for everyday frontend work in this repo.

Essentials
- Confirm the project `tailwind.config.*` is at the repo root and update `content` paths to cover `src/**/*.{js,ts,jsx,tsx}`.
- Use the CLI or local dependency to verify version: `npx tailwindcss -v`.

Config & theme
- Keep tokens and theme extensions in `theme.extend` to centralize colors, radii, fonts.
- Put global CSS and `@tailwind` layers in `src/index.css` (or the project's entry CSS).

Developer practices
- Prefer utility-first classes for layout; extract repeated patterns into `@layer components` with `@apply`.
- For dynamic classnames use a helper (`clsx`/`cn`) and avoid fully dynamic strings that Tailwind can't see (use safelist or explicit mappings).
- Use responsive prefixes (`sm:`, `md:`, `lg:`) and variant utilities consistently; keep breakpoints in `tailwind.config`.

Performance & tooling
- Ensure `content` (purge) paths include all runtime templates and component file patterns.
- When adding dynamic variants or runtime-generated classes, add them to a `safelist` in `tailwind.config`.
- Run `npm run build` / dev server to validate no missing styles.

Testing & accessibility
- Test components with their styles (snapshot or visual tests) to catch accidental class churn.
- Prefer semantic HTML classes + Tailwind for presentational concerns.

Migration & troubleshooting
- Check the Tailwind v4 changelog for breaking changes before upgrading packages; update `postcss` or plugins as necessary.
- If a utility disappears, search `tailwind.config` for renamed tokens or moved plugins.

Quick commands
- Dev: `npm run dev`  
- Build: `npm run build`  
- Lint: `npm run lint`

Keep it simple: favor readable classnames, small shared component classes, and explicit safelists for any runtime-generated utilities.

// Seed prompt
// > Fill in a 1-pager copilot instructions (compact, minimal prose), targeted for frontend devs and focused on tailwind v4-specific development essentials; #web_search
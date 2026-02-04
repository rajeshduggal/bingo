# Copilot / Agent Instructions — bingo

Mandatory development checklist
- [ ] Lint: `npm run lint`
- [ ] Build: `npm run build`
- [ ] Test: `npm run test`

Purpose
- Short, actionable guidance to help AI agents be productive in this small React + TypeScript app.

Quick start
- Install: `npm install` → Dev: `npm run dev` (Vite).

Architecture (at-a-glance)
- SPA: `src/main.tsx` → `src/App.tsx`.
- Components: `src/components/` (UI), hook: `src/hooks/useBingoGame.ts` (state + persistence), logic: `src/utils/bingoLogic.ts` (pure functions), data: `src/data/questions.ts`.

Key patterns
- `generateBoard()` creates a 5×5 board (center index `12` is free).
- `toggleSquare(board, id)` flips `isMarked` (skips free space).
- `checkBingo(board)` returns a winning `BingoLine | null` and `getWinningSquareIds()` yields a `Set<number>`.
- Persistence: `useBingoGame` uses `localStorage` key `bingo-game-state` and `STORAGE_VERSION` — update `validateStoredData` when schema changes.

Files to inspect
- `src/hooks/useBingoGame.ts` — main state and persistence
- `src/utils/bingoLogic.ts` — core logic and tests
- `src/data/questions.ts` — question list and `FREE_SPACE`
- `src/components/GameScreen.tsx` — primary UI wiring

When changing behavior
- Update tests in `src/utils/bingoLogic.test.ts` and run `npm run test`.
- If changing storage shape: increment `STORAGE_VERSION` and add migration/validation in `useBingoGame`.

Agent tooling
- See `.github/prompts/` and `.lab/GUIDE.md` for workspace prompts, setup checks, and lab guidance.

Feedback
- Tell me which section to expand: tests, migrations, or component props.

Design Guide
- **Purpose:** Keep UI consistent and accessible; this repo uses a Cozy Coffee theme as the reference design.
- **Tokens & theme:** Add theme tokens in `tailwind.config.js` under `theme.extend.colors` (coffee-brown, warm-cream, amber-syrup, muted-sage, terracotta). Prefer Tailwind tokens over ad-hoc CSS variables so utilities compile cleanly.
- **Typography:** Primary: `Merriweather` for headings; Secondary: `Inter` for UI/body. Load fonts in `index.html` and set fallbacks in `src/index.css`.
- **Textures & assets:** Store textures and logos under `public/textures/` and `src/assets/branding/` (e.g., `wood.svg`, `linen.svg`, `coffee-logo.svg`). Optimize SVGs and keep raster assets small.
- **Component patterns:** Prefer utility-first classes and extract shared visuals into `@layer components` or small helper classes (e.g., `.card`) to keep markup readable. Use `@apply` sparingly for component aliases.
- **Runtime classes & safelist:** Avoid fully dynamic class strings. If you must generate classes at runtime, add them to the `safelist` in `tailwind.config.js` so they are not purged.
- **Spacing & responsiveness:** Use Tailwind spacing scale; for the Cozy theme slightly increase base paddings for cards and tiles (`p-4` → `p-6` equivalents). Verify behavior across `sm`, `md`, `lg` breakpoints.
- **Accessibility:** Ensure contrast for buttons and bingo indicators, maintain keyboard focus styles, and keep `aria-*` attributes on interactive elements (see `BingoSquare` and `BingoModal`). Run manual a11y checks after visual changes.
- **Testing & QA:** Add visual checks during major redesigns. Always run the mandatory checklist: `npm run lint`, `npm run build`, `npm run test`, plus a manual visual review at `npm run dev`.
- **Release checklist:** Commit small, focused changes; update `copilot-instructions.md` when design tokens or component contracts change.

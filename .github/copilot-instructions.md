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

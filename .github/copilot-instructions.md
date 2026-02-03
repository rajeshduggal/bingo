# Copilot / Agent Instructions — bingo

Purpose
- Give AI coding agents the minimum, high-value information to be immediately productive in this repo.

Quick start (developer commands)
- Install: `npm install`
- Dev server: `npm run dev` (Vite)
- Build: `npm run build` (runs `tsc -b` then `vite build`)
- Tests: `npm run test` (Vitest)
- Lint: `npm run lint` (ESLint)

High-level architecture
- Single-page React app using Vite + TypeScript + Tailwind v4. Entry: `src/main.tsx` → `src/App.tsx`.
- UI components live under `src/components/` (e.g. `StartScreen.tsx`, `GameScreen.tsx`, `BingoBoard.tsx`, `BingoSquare.tsx`, `BingoModal.tsx`).
- Game logic lives in a hook: `src/hooks/useBingoGame.ts` (state management, persistence, actions).
- Pure logic utilities are in `src/utils/bingoLogic.ts` (board generation, toggle, bingo detection).
- Questions dataset: `src/data/questions.ts` (exported `questions` array and `FREE_SPACE`).

Key code patterns & examples
- Board generation: call `generateBoard()` in `src/utils/bingoLogic.ts` (5x5 board, center index `12` is free).
- Toggle a square: `toggleSquare(board, squareId)` — note it ignores `isFreeSpace`.
- Bingo detection: `checkBingo(board)` returns a `BingoLine | null`; helper `getWinningSquareIds()` returns a `Set<number>`.
- Hook persistence: `useBingoGame` saves/loads localStorage using key `bingo-game-state` and `STORAGE_VERSION = 1`.
  - Stored shape: `{ version, gameState, board, winningLine }` — keep `validateStoredData` in sync when changing schema.

Developer workflows & gotchas
- Local dev uses Node 22+ per README. Use DevContainer or WSL if needed for consistent env.
- The app deploys to GitHub Pages on push to `main` (project default behavior in this template).
- Tests: `src/utils/bingoLogic.test.ts` contains unit tests for core logic — prefer adding unit tests here for algorithmic changes.
- Styling: Tailwind v4; check `index.css` and `package.json` dependencies when updating Tailwind config.

Project-specific conventions
- Keep domain logic in `src/utils/*` and stateful orchestration inside `src/hooks/useBingoGame.ts`.
- UI components are small and focused; prefer composing them instead of adding complex logic directly in components.
- Persisted game state is versioned. If changing storage shape, increment `STORAGE_VERSION` and update `validateStoredData`.

Files to inspect first when making changes
- [src/hooks/useBingoGame.ts](src/hooks/useBingoGame.ts) — central hook, persistence, and actions
- [src/utils/bingoLogic.ts](src/utils/bingoLogic.ts) — deterministic logic; add tests here
- [src/data/questions.ts](src/data/questions.ts) — question source and `FREE_SPACE`
- [src/components/GameScreen.tsx](src/components/GameScreen.tsx) and related components — rendering and event handlers
- [.lab/GUIDE.md](.lab/GUIDE.md) and [.github/prompts/setup.prompt.md](.github/prompts/setup.prompt.md) — repo-specific agent prompts and lab instructions

When you change behavior
- Update unit tests in `src/utils/bingoLogic.test.ts` and run `npm run test`.
- If you change the localStorage schema, bump `STORAGE_VERSION` and add migration/validation.
- Keep changes minimal and focused; this repo is used as a small workshop/demo app so avoid large refactors without tests.

Agent tooling locations
- Repo includes agent prompts and labs: `.github/prompts/`, `.github/agents/`, and `.lab/GUIDE.md` — reference these for agent conventions and expected checks.

Questions / feedback
- If any section is unclear or you want more examples (UI props, test patterns, or storage migrations), tell me which area to expand.

import { render, screen, fireEvent } from '@testing-library/react';
import { vi, afterEach } from 'vitest';
import * as useBingo from './hooks/useBingoGame';
import type { BingoGameState, BingoGameActions } from './hooks/useBingoGame';
import App from './App';

afterEach(() => {
  vi.restoreAllMocks();
});

test('selecting scavenger and clicking Start calls startGame with mode', () => {
  const startGame = vi.fn();

  const mocked: BingoGameState & BingoGameActions = {
    gameState: 'start',
    board: [],
    winningSquareIds: new Set<number>(),
    showBingoModal: false,
    startGame,
    handleSquareClick: () => {},
    resetGame: () => {},
    dismissModal: () => {},
  };

  vi.spyOn(useBingo, 'useBingoGame').mockReturnValue(mocked as unknown as ReturnType<typeof useBingo.useBingoGame>);

  render(<App />);

  const scavengerRadio = screen.getByRole('radio', { name: /scavenger/i });
  fireEvent.click(scavengerRadio);
  fireEvent.click(screen.getByRole('button', { name: /start game/i }));

  expect(startGame).toHaveBeenCalledWith('scavenger');
});

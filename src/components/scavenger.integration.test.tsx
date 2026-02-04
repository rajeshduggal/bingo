import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { vi } from 'vitest';
import { useBingoGame } from '../hooks/useBingoGame';
import { StartScreen } from './StartScreen';
import { ScavengerScreen } from './ScavengerScreen';

function makeLocalStorageMock(initial: Record<string, string> = {}) {
  let store: Record<string, string> = { ...initial };
  return {
    getItem: (key: string) => (key in store ? store[key] : null),
    setItem: (key: string, value: string) => { store[key] = value; },
    removeItem: (key: string) => { delete store[key]; },
    clear: () => { store = {}; },
    _store: () => store,
  } as Storage & { _store: () => Record<string, string> };
}

function TestHarness() {
  const { gameState, board, startGame, handleSquareClick } = useBingoGame();

  if (gameState === 'start') return <StartScreen onStart={startGame} />;

  return <ScavengerScreen board={board} onToggle={handleSquareClick} />;
}

test('full scavenger flow persists mode and checked items across remount', async () => {
  const mock = makeLocalStorageMock();
  const setItemSpy = vi.spyOn(mock, 'setItem');
  const g = global as unknown as { localStorage?: Storage; window?: Window & typeof globalThis };
  g.localStorage = mock as unknown as Storage;
  g.window = g.window ?? ({} as Window & typeof globalThis);
  g.window.localStorage = mock as unknown as Storage;

  const { unmount } = render(<TestHarness />);

  // select scavenger and start
  const scavengerRadio = screen.getByRole('radio', { name: /scavenger/i });
  fireEvent.click(scavengerRadio);
  fireEvent.click(screen.getByRole('button', { name: /start game/i }));

  // wait for checkboxes to appear
  const checkboxes = await screen.findAllByRole('checkbox');
  expect(checkboxes.length).toBeGreaterThan(0);

  // pick first two items and record their labels
  const first = checkboxes[0];
  const second = checkboxes[1];
  const firstLabel = first.getAttribute('aria-label') as string;
  const secondLabel = second.getAttribute('aria-label') as string;

  // toggle them
  fireEvent.click(first);
  fireEvent.click(second);

  // expect localStorage saved with mode=scavenger and version 2
  expect(setItemSpy).toHaveBeenCalled();
  const lastCall = setItemSpy.mock.calls[setItemSpy.mock.calls.length - 1][1];
  const parsed = JSON.parse(lastCall) as any;
  expect(parsed.version).toBe(2);
  expect(parsed.mode).toBe('scavenger');

  // expect the saved board has those texts marked true
  const marked = parsed.board.filter((s: any) => s.isMarked).map((s: any) => s.text);
  expect(marked).toContain(firstLabel);
  expect(marked).toContain(secondLabel);

  // unmount and remount to simulate reload
  unmount();
  cleanup();
  render(<TestHarness />);

  // after remount, those checkboxes should be checked
  const firstCheckbox = await screen.findByLabelText(firstLabel) as HTMLInputElement;
  const secondCheckbox = await screen.findByLabelText(secondLabel) as HTMLInputElement;
  expect(firstCheckbox.checked).toBe(true);
  expect(secondCheckbox.checked).toBe(true);

  // progress percentage should reflect marked items
  const percentText = `${Math.round((marked.length / 25) * 100)}%`;
  expect(screen.getByText(percentText)).toBeInTheDocument();
});

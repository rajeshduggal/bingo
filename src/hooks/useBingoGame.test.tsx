import { render, screen, fireEvent } from '@testing-library/react';
import { vi, afterEach } from 'vitest';
import { useBingoGame } from './useBingoGame';
import React from 'react';

afterEach(() => {
  vi.restoreAllMocks();
});

function makeLocalStorageMock(initial: Record<string, string> = {}) {
  let store: Record<string, string> = { ...initial };
  return {
    getItem: (key: string) => (key in store ? store[key] : null),
    setItem: (key: string, value: string) => { store[key] = value; },
    removeItem: (key: string) => { delete store[key]; },
    clear: () => { store = {}; },
    // helper for tests
    _store: () => store,
  } as Storage & { _store: () => Record<string, string> };
}

function TestStarter() {
  const { startGame } = useBingoGame();
  return <button onClick={() => startGame('scavenger')}>start</button>;
}

test('starting a scavenger game saves state with version 2 and mode=scavenger', () => {
  const mock = makeLocalStorageMock();
  const setItemSpy = vi.spyOn(mock, 'setItem');
  // Ensure both global and window localStorage are set for the hook's isBrowser check
  const g = global as unknown as { localStorage?: Storage; window?: Window & typeof globalThis };
  g.localStorage = mock as unknown as Storage;
  g.window = g.window ?? ({} as Window & typeof globalThis);
  g.window.localStorage = mock as unknown as Storage;

  render(<TestStarter />);

  fireEvent.click(screen.getByRole('button', { name: /start/i }));

  expect(setItemSpy).toHaveBeenCalled();

  // The hook may call setItem on mount and again when starting the game.
  // Find a call where the stored `version` is 2 and `mode` is 'scavenger'.
  const calls = setItemSpy.mock.calls.map((c) => c[1]);
  const parsedCalls = calls
    .map((c) => {
      try {
        return JSON.parse(c) as unknown;
      } catch {
        return null;
      }
    })
    .filter((x): x is unknown => x !== null);

  function findStored(scans: unknown[]): { version: number; mode?: string } | undefined {
    return scans.find((s): s is { version: number; mode?: string } => {
        if (!s || typeof s !== 'object') return false;
        const obj = s as { version?: unknown };
        return typeof obj.version === 'number' && obj.version === 2;
    }) as { version: number; mode?: string } | undefined;
  }

  const found = findStored(parsedCalls);
  expect(found).toBeTruthy();
  if (found) expect(found.mode).toBe('scavenger');
});

test('loading v1 data without mode either migrates to v2 or clears state', () => {
  const v1 = JSON.stringify({
    version: 1,
    gameState: 'start',
    board: [],
    winningLine: null,
  });

  const mock = makeLocalStorageMock({ 'bingo-game-state': v1 });
  // Ensure both global and window localStorage are set for the hook's isBrowser check
  const g2 = global as unknown as { localStorage?: Storage; window?: Window & typeof globalThis };
  g2.localStorage = mock as unknown as Storage;
  g2.window = g2.window ?? ({} as Window & typeof globalThis);
  g2.window.localStorage = mock as unknown as Storage;

  // render so hook attempts to load saved state
  render(<TestStarter />);

  const saved = mock.getItem('bingo-game-state');
  const parsedUnknown = saved ? JSON.parse(saved) as unknown : null;
  if (parsedUnknown === null) {
    expect(parsedUnknown).toBeNull();
  } else {
    function isV2(data: unknown): data is { version: number } {
      return !!data && typeof data === 'object' && typeof (data as Record<string, unknown>)['version'] === 'number';
    }
    expect(isV2(parsedUnknown)).toBe(true);
    if (isV2(parsedUnknown)) expect(parsedUnknown.version === 2).toBeTruthy();
  }
});

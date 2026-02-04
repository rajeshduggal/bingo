import { it, expect } from 'vitest';
import { generateBoard } from './bingoLogic';

it('generateBoard returns 25 entries with center free for both modes', () => {
  const boardDefault = generateBoard();
  const boardScav = generateBoard('scavenger');

  expect(boardDefault).toHaveLength(25);
  expect(boardScav).toHaveLength(25);

  expect(boardDefault[12].isFreeSpace).toBe(true);
  expect(boardScav[12].isFreeSpace).toBe(true);
});

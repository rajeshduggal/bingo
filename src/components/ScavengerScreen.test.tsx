import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import type { BingoSquareData } from '../types';
import { generateBoard } from '../utils/bingoLogic';
import { ScavengerScreen } from './ScavengerScreen';

test('ScavengerScreen lists non-free items with checkboxes, toggles call handler, progress updates, and labels are accessible', () => {
  const board: BingoSquareData[] = generateBoard();
  const onToggle = vi.fn();

  render(<ScavengerScreen board={board} onToggle={onToggle} />);

  // a) lists all non-free items with checkboxes
  const nonFree = board.filter((s) => !s.isFreeSpace);
  const checkboxes = screen.getAllByRole('checkbox');
  expect(checkboxes).toHaveLength(nonFree.length);

  // d) checkboxes have accessible labels (use text from board)
  for (const sq of nonFree) {
    const labelled = screen.getByLabelText(sq.text);
    expect(labelled).toBeInTheDocument();
  }

  // c) progress bar shows correct percentage (center is pre-marked)
  // initial marked count includes free center
  const markedCount = board.filter((s) => s.isMarked).length;
  const expectedPercentText = `${Math.round((markedCount / board.length) * 100)}%`;
  expect(screen.getByText(expectedPercentText)).toBeInTheDocument();

  // b) toggling a checkbox calls the handler and updates progress
  const firstNonFree = nonFree[0];
  const firstCheckbox = screen.getByLabelText(firstNonFree.text) as HTMLInputElement;
  fireEvent.click(firstCheckbox);

  expect(onToggle).toHaveBeenCalledWith(firstNonFree.id);

  const newMarked = markedCount + (firstCheckbox.checked ? 0 : 1);
  const newPercentText = `${Math.round((newMarked / board.length) * 100)}%`;
  expect(screen.getByText(newPercentText)).toBeInTheDocument();
});

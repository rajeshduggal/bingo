import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { StartScreen } from './StartScreen';

test('default mode is classic, shows selector, and selecting scavenger calls onStart("scavenger")', () => {
  const onStart = vi.fn();
  render(<StartScreen onStart={onStart} />);

  // Expect a mode selector with options 'Classic' and 'Scavenger'
  const classicRadio = screen.queryByRole('radio', { name: /classic/i });
  const scavengerRadio = screen.queryByRole('radio', { name: /scavenger/i });

  // The selector does not exist yet in the implementation; these asserts will fail (TDD red)
  expect(classicRadio).toBeInTheDocument();
  expect(scavengerRadio).toBeInTheDocument();

  // Classic should be selected by default
  expect(classicRadio).toBeChecked();
  expect(scavengerRadio).not.toBeChecked();

  // Select scavenger and start the game
  fireEvent.click(scavengerRadio as HTMLElement);
  fireEvent.click(screen.getByRole('button', { name: /start game/i }));

  // Expect onStart to be called with the chosen mode
  expect(onStart).toHaveBeenCalledWith('scavenger');
});

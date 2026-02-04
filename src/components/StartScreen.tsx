import { useState } from 'react';
import type { Mode } from '../types';

interface StartScreenProps {
  onStart: (mode: Mode) => void;
}

const MODE_OPTIONS: Mode[] = ['classic', 'scavenger'];

function formatModeLabel(mode: Mode) {
  return mode[0].toUpperCase() + mode.slice(1);
}

function RadioOption({ value, checked, onChange }: { value: Mode; checked: boolean; onChange: (v: Mode) => void }) {
  return (
    <label className="inline-flex items-center">
      <input
        type="radio"
        name="mode"
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        className="mr-2"
      />
      {formatModeLabel(value)}
    </label>
  );
}

export function StartScreen({ onStart }: StartScreenProps) {
  const [mode, setMode] = useState<Mode>('classic');

  return (
    <div className="flex flex-col items-center justify-center min-h-full p-6">
      <div className="text-center max-w-sm">
        <img src="/src/assets/branding/coffee-logo.svg" alt="Cozy Coffee" className="mx-auto mb-4 w-24 h-24" />
        <h1 className="text-4xl font-bold text-coffee-brown mb-1">Cozy Coffee Bingo</h1>
        <p className="text-lg text-coffee-brown/80 mb-6">A warm social bingo experience</p>

        <div className="card mb-6">
          <h2 className="font-semibold text-coffee-brown mb-3">How to play</h2>
          <ul className="text-left text-coffee-brown/80 text-sm space-y-2">
            <li>• Find people who match the questions</li>
            <li>• Tap a square when you find a match</li>
            <li>• Get 5 in a row to win!</li>
          </ul>
        </div>

        <fieldset className="mb-4 flex justify-center gap-4" aria-label="Mode">
          {MODE_OPTIONS.map((opt) => (
            <RadioOption key={opt} value={opt} checked={mode === opt} onChange={setMode} />
          ))}
        </fieldset>

        <button
          onClick={() => onStart(mode)}
          className="w-full bg-accent text-white font-semibold py-4 px-8 rounded-lg text-lg active:bg-accent-light transition-colors"
        >
          Start Game
        </button>
      </div>
    </div>
  );
}

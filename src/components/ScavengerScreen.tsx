import React, { useMemo } from 'react';
import type { BingoSquareData } from '../types';

interface ScavengerScreenProps {
  board: BingoSquareData[];
  onToggle: (id: number) => void;
}

export function ScavengerScreen({ board, onToggle }: ScavengerScreenProps) {
  const nonFree = useMemo(() => board.filter((s) => !s.isFreeSpace), [board]);

  // derive marked set directly from board prop (single source of truth)
  const markedSet = useMemo(() => new Set(board.filter((s) => s.isMarked).map((s) => s.id)), [board]);

  const total = board.length;
  const markedCount = markedSet.size;
  const percent = Math.round((markedCount / total) * 100);

  function handleToggle(id: number) {
    onToggle(id);
  }

  return (
    <div className="p-4">
      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent}
        aria-valuetext={`${percent}% complete`}
        className="mb-3"
      >
        <div className="h-2 bg-gray-200 rounded">
          <div style={{ width: `${percent}%` }} className="h-2 bg-accent rounded" />
        </div>
        <div className="text-sm mt-1">{percent}%</div>
      </div>

      <ul className="space-y-2">
        {nonFree.map((sq) => (
          <li key={sq.id}>
            <label className="inline-flex items-center" htmlFor={`scav-${sq.id}`}>
              <input
                id={`scav-${sq.id}`}
                type="checkbox"
                checked={markedSet.has(sq.id)}
                onChange={() => handleToggle(sq.id)}
                className="mr-2"
                aria-label={sq.text}
              />
              <span>{sq.text}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ScavengerScreen;

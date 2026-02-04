import { useMemo } from 'react';
import type { BingoSquareData } from '../types';
import { generateBoard } from '../utils/bingoLogic';

export function BoardPreview() {
  // Generate a sample board once (memoized, not persisted)
  const previewBoard: BingoSquareData[] = useMemo(() => generateBoard(), []);

  return (
    <div className="w-full max-w-sm mx-auto">
      <div 
        className="grid grid-cols-5 gap-2 w-full mx-auto aspect-square rounded-xl overflow-hidden shadow-lg"
        role="img"
        aria-label="Preview of bingo game board with 5x5 grid"
      >
        {previewBoard.map((square) => (
          <div
            key={square.id}
            className={`
              relative flex items-center justify-center p-2 text-center border rounded-lg
              text-xs leading-tight select-none min-h-[48px]
              ${square.isMarked 
                ? 'bg-marked border-marked-border text-white' 
                : 'bg-white text-coffee-brown opacity-60'
              }
              ${square.isFreeSpace ? 'font-bold' : ''}
            `}
          >
            <span className="wrap-break-word hyphens-auto">{square.text}</span>
            {square.isMarked && !square.isFreeSpace && (
              <span className="absolute top-0.5 right-0.5 text-green-600 text-xs">✓</span>
            )}
          </div>
        ))}
      </div>
      <p className="text-center text-sm text-coffee-brown/60 mt-3 italic">Sample board preview</p>
    </div>
  );
}

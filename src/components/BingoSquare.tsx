import type { BingoSquareData } from '../types';

interface BingoSquareProps {
  square: BingoSquareData;
  isWinning: boolean;
  onClick: () => void;
}

export function BingoSquare({ square, isWinning, onClick }: BingoSquareProps) {
  const baseClasses =
    'relative flex items-center justify-center p-3 text-center border rounded-xl transition-all duration-150 select-none min-h-[72px] text-sm leading-tight shadow-sm';

  const stateClasses = square.isMarked
    ? isWinning
      ? 'bg-amber-syrup/95 border-amber-syrup text-white scale-95 ring-2 ring-amber-syrup/30'
      : 'bg-marked border-marked-border text-white'
    : 'bg-white text-coffee-brown active:bg-accent-light hover:shadow-md';

  const freeSpaceClasses = square.isFreeSpace ? 'font-bold text-base' : '';

  return (
    <button
      onClick={onClick}
      disabled={square.isFreeSpace}
      className={`${baseClasses} ${stateClasses} ${freeSpaceClasses}`}
      aria-pressed={square.isMarked}
      aria-label={square.isFreeSpace ? 'Free space' : square.text}
    >
      <span className="wrap-break-word hyphens-auto">{square.text}</span>
      {square.isMarked && !square.isFreeSpace && (
        <span className="absolute top-0.5 right-0.5 text-green-600 text-xs">✓</span>
      )}
    </button>
  );
}

interface BingoModalProps {
  onDismiss: () => void;
}

export function BingoModal({ onDismiss }: BingoModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="relative bg-accent-light rounded-xl p-6 max-w-xs w-full text-center shadow-xl animate-[bounce_0.5s_ease-out] overflow-visible">
        <div className="modal-confetti"><img src="/src/assets/celebration/coffee-confetti.svg" alt="celebration" /></div>
        <div className="text-5xl mb-4">☕️</div>
        <h2 className="text-3xl font-bold text-coffee-brown mb-2">BINGO!</h2>
        <p className="text-coffee-brown/80 mb-6">You completed a line — enjoy a virtual cup!</p>

        <button
          onClick={onDismiss}
          className="w-full bg-accent text-white font-semibold py-3 px-6 rounded-lg active:bg-accent-light transition-colors"
        >
          Keep Playing
        </button>
      </div>
    </div>
  );
}

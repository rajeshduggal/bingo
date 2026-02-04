import { useBingoGame } from './hooks/useBingoGame';
import { StartScreen } from './components/StartScreen';
import { GameScreen } from './components/GameScreen';
import { BingoModal } from './components/BingoModal';
import { useEffect } from 'react';

function App() {
  const {
    gameState,
    board,
    winningSquareIds,
    showBingoModal,
    accessibilityPreferences,
    startGame,
    handleSquareClick,
    resetGame,
    dismissModal,
    updateAccessibilityPreferences,
  } = useBingoGame();

  // Apply accessibility preferences to the document
  useEffect(() => {
    const root = document.documentElement;
    
    // Apply high contrast mode
    if (accessibilityPreferences.highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }
    
    // Apply font size
    root.classList.remove('font-normal', 'font-large', 'font-extra-large');
    root.classList.add(`font-${accessibilityPreferences.fontSize}`);
  }, [accessibilityPreferences]);

  if (gameState === 'start') {
    return (
      <StartScreen 
        onStart={startGame} 
        accessibilityPreferences={accessibilityPreferences}
        onPreferencesChange={updateAccessibilityPreferences}
      />
    );
  }

  return (
    <>
      <GameScreen
        board={board}
        winningSquareIds={winningSquareIds}
        hasBingo={gameState === 'bingo'}
        onSquareClick={handleSquareClick}
        onReset={resetGame}
      />
      {showBingoModal && (
        <BingoModal onDismiss={dismissModal} />
      )}
    </>
  );
}

export default App;

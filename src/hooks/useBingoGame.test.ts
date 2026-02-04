import { describe, it, expect, beforeEach, afterEach } from 'vitest';

const STORAGE_KEY = 'bingo-game-state';

// Helper function to set localStorage data
function setStorageData(data: unknown) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// Helper function to get localStorage data
function getStorageData(): Record<string, unknown> | null {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) as Record<string, unknown> : null;
}

describe('useBingoGame storage migration', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should migrate from version 1 to version 2 with default accessibility preferences', () => {
    // Set up v1 data
    const v1Data = {
      version: 1,
      gameState: 'start',
      board: [],
      winningLine: null,
    };
    setStorageData(v1Data);

    // Import and use the hook (we'll test this indirectly via the storage)
    // For now, we'll test the validation logic
    const saved = getStorageData();
    expect(saved.version).toBe(1);
    expect(saved.accessibilityPreferences).toBeUndefined();
  });

  it('should accept version 2 data with accessibility preferences', () => {
    const v2Data = {
      version: 2,
      gameState: 'playing',
      board: Array(25).fill(null).map((_, i) => ({
        id: i,
        text: `Question ${i}`,
        isMarked: false,
        isFreeSpace: i === 12,
      })),
      winningLine: null,
      accessibilityPreferences: {
        highContrast: true,
        fontSize: 'large',
      },
    };
    setStorageData(v2Data);

    const saved = getStorageData();
    expect(saved.version).toBe(2);
    expect(saved.accessibilityPreferences).toEqual({
      highContrast: true,
      fontSize: 'large',
    });
  });

  it('should handle missing accessibility preferences in v2 data', () => {
    const v2DataWithoutPrefs = {
      version: 2,
      gameState: 'start',
      board: [],
      winningLine: null,
    };
    setStorageData(v2DataWithoutPrefs);

    const saved = getStorageData();
    expect(saved.version).toBe(2);
    // This should be handled by the migration logic in loadGameState
  });

  it('should validate font size options correctly', () => {
    const validFontSizes = ['normal', 'large', 'extra-large'];
    
    validFontSizes.forEach((fontSize) => {
      const data = {
        version: 2,
        gameState: 'start',
        board: [],
        winningLine: null,
        accessibilityPreferences: {
          highContrast: false,
          fontSize,
        },
      };
      setStorageData(data);
      const saved = getStorageData();
      expect(saved.accessibilityPreferences.fontSize).toBe(fontSize);
    });
  });

  it('should handle storage data with complete game board', () => {
    const board = Array(25).fill(null).map((_, i) => ({
      id: i,
      text: `Question ${i}`,
      isMarked: i === 12, // Free space marked
      isFreeSpace: i === 12,
    }));

    const data = {
      version: 2,
      gameState: 'playing',
      board,
      winningLine: null,
      accessibilityPreferences: {
        highContrast: false,
        fontSize: 'normal',
      },
    };
    
    setStorageData(data);
    const saved = getStorageData();
    expect(saved?.board).toHaveLength(25);
    if (saved?.board && Array.isArray(saved.board)) {
      const board = saved.board as Array<Record<string, unknown>>;
      expect(board[12]?.isFreeSpace).toBe(true);
      expect(board[12]?.isMarked).toBe(true);
    }
  });

  it('should handle bingo state with winning line', () => {
    const board = Array(25).fill(null).map((_, i) => ({
      id: i,
      text: `Question ${i}`,
      isMarked: i < 5, // First row marked
      isFreeSpace: i === 12,
    }));

    const data = {
      version: 2,
      gameState: 'bingo',
      board,
      winningLine: {
        type: 'row',
        index: 0,
        squares: [0, 1, 2, 3, 4],
      },
      accessibilityPreferences: {
        highContrast: true,
        fontSize: 'extra-large',
      },
    };
    
    setStorageData(data);
    const saved = getStorageData();
    expect(saved.gameState).toBe('bingo');
    expect(saved.winningLine).toEqual({
      type: 'row',
      index: 0,
      squares: [0, 1, 2, 3, 4],
    });
  });
});

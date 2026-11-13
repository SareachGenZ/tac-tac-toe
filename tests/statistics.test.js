import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  DEFAULT_STATISTICS,
  MAX_HISTORY_ITEMS,
  appendHistoryEntry,
  calculateWinPercentage,
  createHistoryEntry,
  recordGameResult,
} from '../src/utils/statistics.js';
import {
  DEFAULT_SETTINGS,
  STORAGE_KEYS,
  readStorage,
  writeStorage,
} from '../src/utils/storage.js';

describe('Statistics, History & LocalStorage Persistence', () => {
  it('tracks total games, X wins, O wins, Computer wins, and draws accurately', () => {
    let stats = { ...DEFAULT_STATISTICS };
    stats = recordGameResult(stats, { mode: 'pvp', winner: 'X' });
    stats = recordGameResult(stats, { mode: 'pvp', winner: 'O' });
    stats = recordGameResult(stats, { mode: 'pvc', winner: 'O' });
    stats = recordGameResult(stats, { mode: 'pvc', winner: null });

    assert.deepEqual(stats, {
      totalGames: 4,
      xWins: 1,
      oWins: 1,
      computerWins: 1,
      draws: 1,
    });
    assert.equal(calculateWinPercentage(stats.xWins, stats.totalGames), 25);
    assert.equal(calculateWinPercentage(0, 0), 0);
  });

  it('creates formatted history entries and caps history length', () => {
    let history = [];
    for (let i = 1; i <= MAX_HISTORY_ITEMS + 5; i += 1) {
      const entry = createHistoryEntry({
        gameNumber: i,
        mode: i % 2 === 0 ? 'pvc' : 'pvp',
        difficulty: 'hard',
        playerXName: 'Alice',
        playerOName: 'Bob',
        winner: i % 3 === 0 ? null : i % 2 === 0 ? 'O' : 'X',
      });
      history = appendHistoryEntry(history, entry);
    }

    assert.equal(history.length, MAX_HISTORY_ITEMS);
    assert.equal(history[0].gameNumber, MAX_HISTORY_ITEMS + 5);
    assert.equal(history[0].playerXName, 'Alice');
  });

  it('persists statistics, history, and settings across simulated reloads and resets cleanly', () => {
    const store = new Map();
    globalThis.window = {
      localStorage: {
        getItem: (k) => (store.has(k) ? store.get(k) : null),
        setItem: (k, v) => store.set(k, v),
        removeItem: (k) => store.delete(k),
      },
    };

    try {
      const savedStats = recordGameResult(DEFAULT_STATISTICS, { mode: 'pvc', winner: 'X' });
      const savedEntry = createHistoryEntry({
        gameNumber: 1,
        mode: 'pvc',
        difficulty: 'medium',
        playerXName: 'Dim',
        playerOName: 'Computer',
        winner: 'X',
      });
      const savedSettings = {
        ...DEFAULT_SETTINGS,
        theme: 'light',
        soundEnabled: false,
        animationsEnabled: false,
        defaultDifficulty: 'hard',
      };

      writeStorage(STORAGE_KEYS.STATISTICS, savedStats);
      writeStorage(STORAGE_KEYS.HISTORY, [savedEntry]);
      writeStorage(STORAGE_KEYS.SETTINGS, savedSettings);

      // Simulate reload by reading back
      assert.deepEqual(readStorage(STORAGE_KEYS.STATISTICS, DEFAULT_STATISTICS), savedStats);
      assert.deepEqual(readStorage(STORAGE_KEYS.HISTORY, []), [savedEntry]);
      assert.deepEqual(readStorage(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS), savedSettings);

      // Reset verification
      writeStorage(STORAGE_KEYS.STATISTICS, DEFAULT_STATISTICS);
      writeStorage(STORAGE_KEYS.HISTORY, []);
      writeStorage(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS);

      assert.deepEqual(readStorage(STORAGE_KEYS.STATISTICS, null), DEFAULT_STATISTICS);
      assert.deepEqual(readStorage(STORAGE_KEYS.HISTORY, null), []);
      assert.deepEqual(readStorage(STORAGE_KEYS.SETTINGS, null), DEFAULT_SETTINGS);
    } finally {
      delete globalThis.window;
    }
  });
});


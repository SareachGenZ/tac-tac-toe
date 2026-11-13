export const DEFAULT_STATISTICS = {
  totalGames: 0,
  xWins: 0,
  oWins: 0,
  computerWins: 0,
  draws: 0,
};

export const MAX_HISTORY_ITEMS = 50;

/**
 * Updates persistent statistics with the outcome of a completed game.
 */
export function recordGameResult(stats, { mode, winner }) {
  const current = { ...DEFAULT_STATISTICS, ...stats };
  const next = {
    ...current,
    totalGames: current.totalGames + 1,
  };

  if (winner === 'X') {
    next.xWins += 1;
  } else if (winner === 'O') {
    if (mode === 'pvc') {
      next.computerWins += 1;
    } else {
      next.oWins += 1;
    }
  } else {
    next.draws += 1;
  }

  return next;
}

/**
 * Calculates integer win percentage (0-100). Returns 0 when totalGames is 0.
 */
export function calculateWinPercentage(wins, totalGames) {
  if (!totalGames || totalGames <= 0) return 0;
  return Math.round((wins / totalGames) * 100);
}

/**
 * Creates a structured match history entry.
 */
export function createHistoryEntry({
  gameNumber,
  mode,
  difficulty,
  playerXName,
  playerOName,
  winner,
  timestamp = new Date().toISOString(),
}) {
  const cleanX = (playerXName || '').trim() || 'Player 1';
  const cleanO =
    mode === 'pvc'
      ? `Computer (${(difficulty || 'medium').toUpperCase()})`
      : (playerOName || '').trim() || 'Player 2';

  let winnerName = 'Draw';
  let resultLabel = 'Draw';

  if (winner === 'X') {
    winnerName = cleanX;
    resultLabel = `${cleanX} Won`;
  } else if (winner === 'O') {
    winnerName = cleanO;
    resultLabel = mode === 'pvc' ? 'Computer Won' : `${cleanO} Won`;
  }

  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    gameNumber,
    mode,
    difficulty: mode === 'pvc' ? difficulty : null,
    playerXName: cleanX,
    playerOName: cleanO,
    winner,
    winnerName,
    resultLabel,
    timestamp,
  };
}

/**
 * Prepends a new match entry and keeps history bounded to maxItems.
 */
export function appendHistoryEntry(history, entry, maxItems = MAX_HISTORY_ITEMS) {
  const safeHistory = Array.isArray(history) ? history : [];
  return [entry, ...safeHistory].slice(0, maxItems);
}


import {
  PLAYERS,
  evaluateBoard,
  getAvailableMoves,
  getNextPlayer,
} from './gameLogic.js';

/**
 * Easy AI: Picks a random valid empty cell with no strategic lookahead.
 */
export function getEasyMove(board, rng = Math.random) {
  const available = getAvailableMoves(board);
  if (available.length === 0) return null;
  const randomIndex = Math.floor(rng() * available.length);
  return available[randomIndex];
}

/**
 * Finds an immediate winning cell index for the specified player, or null.
 */
export function findWinningMove(board, player) {
  const available = getAvailableMoves(board);
  for (const index of available) {
    const simulated = [...board];
    simulated[index] = player;
    const result = evaluateBoard(simulated);
    if (result.status === 'won' && result.winner === player) {
      return index;
    }
  }
  return null;
}

/**
 * Medium AI:
 * 1. Take an immediate winning move if one exists.
 * 2. Block the opponent's immediate winning move if one exists.
 * 3. Prefer center, then corners, then edges.
 */
export function getMediumMove(board, aiPlayer = PLAYERS.O, rng = Math.random) {
  const available = getAvailableMoves(board);
  if (available.length === 0) return null;

  const humanPlayer = getNextPlayer(aiPlayer);

  // 1. Win if possible
  const winningMove = findWinningMove(board, aiPlayer);
  if (winningMove !== null) return winningMove;

  // 2. Block opponent win
  const blockingMove = findWinningMove(board, humanPlayer);
  if (blockingMove !== null) return blockingMove;

  // 3. Strategic positional preference: center, then corners, then edges
  if (board[4] === null) return 4;

  const openCorners = [0, 2, 6, 8].filter((idx) => board[idx] === null);
  if (openCorners.length > 0) {
    return openCorners[Math.floor(rng() * openCorners.length)];
  }

  return available[Math.floor(rng() * available.length)];
}

/**
 * Depth-weighted Minimax with Alpha-Beta pruning.
 * Prefers faster wins (higher score) and slower losses (less negative score).
 */
export function minimax(
  board,
  depth,
  isMaximizing,
  aiPlayer,
  humanPlayer,
  alpha = -Infinity,
  beta = Infinity
) {
  const evaluation = evaluateBoard(board);
  if (evaluation.status === 'won') {
    return evaluation.winner === aiPlayer ? 10 - depth : depth - 10;
  }
  if (evaluation.status === 'draw') {
    return 0;
  }

  const available = getAvailableMoves(board);

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (const index of available) {
      board[index] = aiPlayer;
      const score = minimax(
        board,
        depth + 1,
        false,
        aiPlayer,
        humanPlayer,
        alpha,
        beta
      );
      board[index] = null;
      if (score > bestScore) bestScore = score;
      if (score > alpha) alpha = score;
      if (beta <= alpha) break;
    }
    return bestScore;
  }

  let bestScore = Infinity;
  for (const index of available) {
    board[index] = humanPlayer;
    const score = minimax(
      board,
      depth + 1,
      true,
      aiPlayer,
      humanPlayer,
      alpha,
      beta
    );
    board[index] = null;
    if (score < bestScore) bestScore = score;
    if (score < beta) beta = score;
    if (beta <= alpha) break;
  }
  return bestScore;
}

/**
 * Hard AI: Uses optimal Minimax algorithm and never loses.
 */
export function getHardMove(board, aiPlayer = PLAYERS.O) {
  const available = getAvailableMoves(board);
  if (available.length === 0) return null;

  // Optimization for empty board: center is optimal
  if (available.length === 9) return 4;

  const humanPlayer = getNextPlayer(aiPlayer);
  const workingBoard = [...board];
  let bestScore = -Infinity;
  let bestMove = available[0];

  for (const index of available) {
    workingBoard[index] = aiPlayer;
    const score = minimax(
      workingBoard,
      0,
      false,
      aiPlayer,
      humanPlayer,
      -Infinity,
      Infinity
    );
    workingBoard[index] = null;

    if (score > bestScore) {
      bestScore = score;
      bestMove = index;
    }
  }

  return bestMove;
}

/**
 * Selects an AI move based on the configured difficulty level.
 * Returns null if the game is already finished or no cells remain.
 */
export function getAIMove(board, difficulty = 'medium', aiPlayer = PLAYERS.O, rng = Math.random) {
  const evaluation = evaluateBoard(board);
  if (evaluation.status !== 'playing') return null;

  switch (difficulty) {
    case 'easy':
      return getEasyMove(board, rng);
    case 'hard':
      return getHardMove(board, aiPlayer);
    case 'medium':
    default:
      return getMediumMove(board, aiPlayer, rng);
  }
}


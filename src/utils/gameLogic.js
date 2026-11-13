export const PLAYERS = {
  X: 'X',
  O: 'O',
};

export const WINNING_LINES = [
  [0, 1, 2], // Top row
  [3, 4, 5], // Middle row
  [6, 7, 8], // Bottom row
  [0, 3, 6], // Left column
  [1, 4, 7], // Middle column
  [2, 5, 8], // Right column
  [0, 4, 8], // Main diagonal
  [2, 4, 6], // Anti-diagonal
];

/**
 * Creates a fresh 3x3 board filled with null values.
 */
export function createEmptyBoard() {
  return Array(9).fill(null);
}

/**
 * Returns an array of empty cell indices (0-8).
 */
export function getAvailableMoves(board) {
  const moves = [];
  for (let i = 0; i < board.length; i += 1) {
    if (board[i] === null) {
      moves.push(i);
    }
  }
  return moves;
}

/**
 * Checks whether placing a mark at index is valid on the given board.
 */
export function isValidMove(board, index) {
  if (!Array.isArray(board) || board.length !== 9) return false;
  if (!Number.isInteger(index) || index < 0 || index > 8) return false;
  return board[index] === null;
}

/**
 * Evaluates the current 3x3 board state for a win, draw, or ongoing play.
 */
export function evaluateBoard(board) {
  for (const line of WINNING_LINES) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return {
        status: 'won',
        winner: board[a],
        winningLine: line,
      };
    }
  }

  const hasEmptyCell = board.some((cell) => cell === null);
  if (!hasEmptyCell) {
    return {
      status: 'draw',
      winner: null,
      winningLine: null,
    };
  }

  return {
    status: 'playing',
    winner: null,
    winningLine: null,
  };
}

/**
 * Returns the next player's symbol.
 */
export function getNextPlayer(currentPlayer) {
  return currentPlayer === PLAYERS.X ? PLAYERS.O : PLAYERS.X;
}

/**
 * Immutably applies a move if the game is still active and the target cell is empty.
 * Returns null if the move is illegal.
 */
export function applyMove(board, index, player) {
  if (player !== PLAYERS.X && player !== PLAYERS.O) return null;
  const currentEvaluation = evaluateBoard(board);
  if (currentEvaluation.status !== 'playing') return null;
  if (!isValidMove(board, index)) return null;

  const nextBoard = [...board];
  nextBoard[index] = player;
  return nextBoard;
}


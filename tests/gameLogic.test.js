import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  PLAYERS,
  applyMove,
  createEmptyBoard,
  evaluateBoard,
  getAvailableMoves,
  getNextPlayer,
  isValidMove,
} from '../src/utils/gameLogic.js';

describe('Game Logic Engine', () => {
  it('creates an empty 9-cell board', () => {
    const board = createEmptyBoard();
    assert.equal(board.length, 9);
    assert.ok(board.every((cell) => cell === null));
    assert.deepEqual(getAvailableMoves(board), [0, 1, 2, 3, 4, 5, 6, 7, 8]);
  });

  it('alternates turns correctly between X and O', () => {
    assert.equal(getNextPlayer(PLAYERS.X), PLAYERS.O);
    assert.equal(getNextPlayer(PLAYERS.O), PLAYERS.X);
  });

  it('detects X winning horizontally (top, middle, bottom rows)', () => {
    const topRow = ['X', 'X', 'X', 'O', 'O', null, null, null, null];
    assert.deepEqual(evaluateBoard(topRow), {
      status: 'won',
      winner: 'X',
      winningLine: [0, 1, 2],
    });

    const midRow = ['O', null, 'O', 'X', 'X', 'X', null, null, null];
    assert.deepEqual(evaluateBoard(midRow), {
      status: 'won',
      winner: 'X',
      winningLine: [3, 4, 5],
    });

    const bottomRow = [null, 'O', 'O', null, null, null, 'X', 'X', 'X'];
    assert.deepEqual(evaluateBoard(bottomRow), {
      status: 'won',
      winner: 'X',
      winningLine: [6, 7, 8],
    });
  });

  it('detects O winning vertically (left, middle, right columns)', () => {
    const leftCol = ['O', 'X', 'X', 'O', 'X', null, 'O', null, null];
    assert.deepEqual(evaluateBoard(leftCol), {
      status: 'won',
      winner: 'O',
      winningLine: [0, 3, 6],
    });

    const midCol = ['X', 'O', null, 'X', 'O', null, null, 'O', 'X'];
    assert.deepEqual(evaluateBoard(midCol), {
      status: 'won',
      winner: 'O',
      winningLine: [1, 4, 7],
    });

    const rightCol = ['X', null, 'O', 'X', null, 'O', null, 'X', 'O'];
    assert.deepEqual(evaluateBoard(rightCol), {
      status: 'won',
      winner: 'O',
      winningLine: [2, 5, 8],
    });
  });

  it('detects X winning diagonally (main diagonal)', () => {
    const board = ['X', 'O', null, 'O', 'X', null, null, null, 'X'];
    assert.deepEqual(evaluateBoard(board), {
      status: 'won',
      winner: 'X',
      winningLine: [0, 4, 8],
    });
  });

  it('detects O winning diagonally (anti-diagonal)', () => {
    const board = ['X', 'X', 'O', null, 'O', 'X', 'O', null, null];
    assert.deepEqual(evaluateBoard(board), {
      status: 'won',
      winner: 'O',
      winningLine: [2, 4, 6],
    });
  });

  it('detects a draw when all cells are occupied without a winner', () => {
    const drawBoard = ['X', 'O', 'X', 'X', 'O', 'O', 'O', 'X', 'X'];
    assert.deepEqual(evaluateBoard(drawBoard), {
      status: 'draw',
      winner: null,
      winningLine: null,
    });
  });

  it('prevents selecting occupied cells or invalid indices', () => {
    let board = createEmptyBoard();
    board = applyMove(board, 4, PLAYERS.X);
    assert.equal(board[4], 'X');
    assert.equal(isValidMove(board, 4), false);
    assert.equal(isValidMove(board, -1), false);
    assert.equal(isValidMove(board, 9), false);
    assert.equal(applyMove(board, 4, PLAYERS.O), null);
  });

  it('prevents additional moves after a win or draw', () => {
    const wonBoard = ['X', 'X', 'X', 'O', 'O', null, null, null, null];
    assert.equal(applyMove(wonBoard, 5, PLAYERS.O), null);

    const drawBoard = ['X', 'O', 'X', 'X', 'O', 'O', 'O', 'X', 'X'];
    assert.equal(applyMove(drawBoard, 0, PLAYERS.O), null);
  });

  it('restarts game state cleanly via createEmptyBoard', () => {
    let board = createEmptyBoard();
    board = applyMove(board, 0, PLAYERS.X);
    board = applyMove(board, 4, PLAYERS.O);
    const restarted = createEmptyBoard();
    assert.equal(evaluateBoard(restarted).status, 'playing');
    assert.deepEqual(getAvailableMoves(restarted), [0, 1, 2, 3, 4, 5, 6, 7, 8]);
  });
});


import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  PLAYERS,
  applyMove,
  createEmptyBoard,
  evaluateBoard,
  getAvailableMoves,
} from '../src/utils/gameLogic.js';
import {
  getAIMove,
  getEasyMove,
  getHardMove,
  getMediumMove,
} from '../src/utils/minimax.js';

describe('AI Opponent Engine (Easy, Medium, Hard Minimax)', () => {
  it('Easy AI always chooses a valid unoccupied cell and returns null on full board', () => {
    const board = ['X', 'O', null, 'X', null, 'O', null, null, 'X'];
    for (let i = 0; i < 20; i += 1) {
      const move = getEasyMove(board);
      assert.ok([2, 4, 6, 7].includes(move), `Invalid Easy AI move: ${move}`);
      assert.equal(board[move], null);
    }

    const fullBoard = ['X', 'O', 'X', 'X', 'O', 'O', 'O', 'X', 'X'];
    assert.equal(getAIMove(fullBoard, 'easy', PLAYERS.O), null);
  });

  it('Medium AI takes immediate winning move when available', () => {
    // O has [0, 3], needs [6] to win even if X also threatens
    const board = ['O', 'X', 'X', 'O', null, null, null, null, null];
    const move = getMediumMove(board, PLAYERS.O);
    assert.equal(move, 6);
  });

  it('Medium AI blocks opponent immediate winning threats', () => {
    // X threatens top row at index 2
    const board = ['X', 'X', null, null, 'O', null, null, null, null];
    const move = getMediumMove(board, PLAYERS.O);
    assert.equal(move, 2);
  });

  it('AI never selects an occupied cell across all difficulties', () => {
    const board = ['X', 'O', 'X', 'O', 'X', null, null, 'O', null];
    for (const difficulty of ['easy', 'medium', 'hard']) {
      const move = getAIMove(board, difficulty, PLAYERS.O);
      assert.ok(move !== null);
      assert.equal(board[move], null, `${difficulty} AI chose occupied cell ${move}`);
    }
  });

  it('AI returns null when game is already won', () => {
    const wonBoard = ['X', 'X', 'X', 'O', 'O', null, null, null, null];
    for (const difficulty of ['easy', 'medium', 'hard']) {
      assert.equal(getAIMove(wonBoard, difficulty, PLAYERS.O), null);
    }
  });

  it('Hard AI (Minimax) NEVER loses against ANY possible sequence of human moves as O', () => {
    function verifyNoLossForAI(board, turn) {
      const result = evaluateBoard(board);
      if (result.status === 'won') {
        assert.notEqual(
          result.winner,
          PLAYERS.X,
          `Hard AI lost on board: ${JSON.stringify(board)}`
        );
        return;
      }
      if (result.status === 'draw') {
        return;
      }

      if (turn === PLAYERS.X) {
        for (const move of getAvailableMoves(board)) {
          const next = applyMove(board, move, PLAYERS.X);
          verifyNoLossForAI(next, PLAYERS.O);
        }
      } else {
        const aiMove = getHardMove(board, PLAYERS.O);
        assert.ok(aiMove !== null && board[aiMove] === null);
        const next = applyMove(board, aiMove, PLAYERS.O);
        verifyNoLossForAI(next, PLAYERS.X);
      }
    }

    verifyNoLossForAI(createEmptyBoard(), PLAYERS.X);
  });

  it('Hard AI (Minimax) NEVER loses when playing first as X', () => {
    function verifyNoLossAsFirstPlayer(board, turn) {
      const result = evaluateBoard(board);
      if (result.status === 'won') {
        assert.notEqual(
          result.winner,
          PLAYERS.O,
          `Hard AI (X) lost on board: ${JSON.stringify(board)}`
        );
        return;
      }
      if (result.status === 'draw') return;

      if (turn === PLAYERS.X) {
        const aiMove = getHardMove(board, PLAYERS.X);
        assert.ok(aiMove !== null && board[aiMove] === null);
        verifyNoLossAsFirstPlayer(applyMove(board, aiMove, PLAYERS.X), PLAYERS.O);
      } else {
        for (const move of getAvailableMoves(board)) {
          verifyNoLossAsFirstPlayer(applyMove(board, move, PLAYERS.O), PLAYERS.X);
        }
      }
    }

    verifyNoLossAsFirstPlayer(createEmptyBoard(), PLAYERS.X);
  });
});


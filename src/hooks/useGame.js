import { useCallback, useMemo, useRef, useState } from 'react';
import {
  PLAYERS,
  applyMove,
  createEmptyBoard,
  evaluateBoard,
  getNextPlayer,
} from '../utils/gameLogic.js';

const INITIAL_SCORES = {
  X: 0,
  O: 0,
  draws: 0,
};

/**
 * Manages Tic-Tac-Toe round state, turn alternation, session scores, and completion events.
 */
export function useGame({ onMove, onRoundComplete } = {}) {
  const [board, setBoard] = useState(createEmptyBoard);
  const [currentPlayer, setCurrentPlayer] = useState(PLAYERS.X);
  const [sessionScores, setSessionScores] = useState(INITIAL_SCORES);
  const [lastMoveIndex, setLastMoveIndex] = useState(null);
  const [moveCount, setMoveCount] = useState(0);
  const roundReportedRef = useRef(false);

  const evaluation = useMemo(() => evaluateBoard(board), [board]);

  const makeMove = useCallback(
    (index) => {
      const nextBoard = applyMove(board, index, currentPlayer);
      if (!nextBoard) return false;

      const playedBy = currentPlayer;
      const nextEvaluation = evaluateBoard(nextBoard);

      setBoard(nextBoard);
      setLastMoveIndex(index);
      setMoveCount((count) => count + 1);
      onMove?.({ player: playedBy, index, evaluation: nextEvaluation });

      if (nextEvaluation.status === 'playing') {
        setCurrentPlayer(getNextPlayer(playedBy));
      } else if (!roundReportedRef.current) {
        roundReportedRef.current = true;
        setSessionScores((prev) => {
          if (nextEvaluation.winner === PLAYERS.X) {
            return { ...prev, X: prev.X + 1 };
          }
          if (nextEvaluation.winner === PLAYERS.O) {
            return { ...prev, O: prev.O + 1 };
          }
          return { ...prev, draws: prev.draws + 1 };
        });
        onRoundComplete?.({
          winner: nextEvaluation.winner,
          status: nextEvaluation.status,
          winningLine: nextEvaluation.winningLine,
          finalBoard: nextBoard,
        });
      }

      return true;
    },
    [board, currentPlayer, onMove, onRoundComplete]
  );

  const restartRound = useCallback(() => {
    setBoard(createEmptyBoard());
    setCurrentPlayer(PLAYERS.X);
    setLastMoveIndex(null);
    setMoveCount(0);
    roundReportedRef.current = false;
  }, []);

  const resetSession = useCallback(() => {
    restartRound();
    setSessionScores(INITIAL_SCORES);
  }, [restartRound]);

  return {
    board,
    currentPlayer,
    status: evaluation.status,
    winner: evaluation.winner,
    winningLine: evaluation.winningLine,
    sessionScores,
    lastMoveIndex,
    moveCount,
    makeMove,
    restartRound,
    resetSession,
  };
}


import { useEffect, useState } from 'react';
import { PLAYERS } from '../utils/gameLogic.js';
import { getAIMove } from '../utils/minimax.js';

/**
 * Triggers Computer AI moves when playing in PvC mode on Player O's turn.
 */
export function useAI({
  enabled,
  mode,
  difficulty,
  board,
  currentPlayer,
  status,
  animationsEnabled = true,
  onAIMove,
}) {
  const [isAIThinking, setIsAIThinking] = useState(false);

  const shouldAIMove =
    enabled &&
    mode === 'pvc' &&
    status === 'playing' &&
    currentPlayer === PLAYERS.O;

  useEffect(() => {
    if (!shouldAIMove) {
      setIsAIThinking(false);
      return undefined;
    }

    setIsAIThinking(true);
    const delayMs = animationsEnabled ? 420 : 180;

    const timer = window.setTimeout(() => {
      const moveIndex = getAIMove(board, difficulty, PLAYERS.O);
      setIsAIThinking(false);
      if (moveIndex !== null) {
        onAIMove(moveIndex);
      }
    }, delayMs);

    return () => {
      window.clearTimeout(timer);
    };
  }, [shouldAIMove, board, difficulty, animationsEnabled, onAIMove]);

  return { isAIThinking };
}


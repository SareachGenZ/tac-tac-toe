import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowLeft, BarChart3, Bot, Users } from 'lucide-react';
import Button from '../components/Button.jsx';
import GameBoard from '../components/GameBoard.jsx';
import ScoreBoard from '../components/ScoreBoard.jsx';
import GameResultModal from '../components/GameResultModal.jsx';
import { useGame } from '../hooks/useGame.js';
import { useAI } from '../hooks/useAI.js';

/**
 * Interactive Game Arena combining the 3x3 board, ScoreBoard info panel, AI opponent, and Result Modal.
 */
function Game({
  mode,
  difficulty,
  playerNames,
  animationsEnabled,
  sound,
  onRecordMatch,
  onBackHome,
  onOpenStatistics,
}) {
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);
  const [announcement, setAnnouncement] = useState('');
  const modalTimerRef = useRef(null);

  const playerXName = (playerNames.X || '').trim() || 'Player 1';
  const playerOName =
    mode === 'pvc'
      ? `Computer (${difficulty.toUpperCase()})`
      : (playerNames.O || '').trim() || 'Player 2';

  const clearModalTimer = useCallback(() => {
    if (modalTimerRef.current !== null) {
      window.clearTimeout(modalTimerRef.current);
      modalTimerRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => clearModalTimer();
  }, [clearModalTimer]);

  const handleMoveFeedback = useCallback(
    ({ player, index, evaluation }) => {
      if (player === 'X') {
        sound?.playMoveX?.();
      } else {
        sound?.playMoveO?.();
      }

      const row = Math.floor(index / 3) + 1;
      const col = (index % 3) + 1;
      const actor = player === 'X' ? playerXName : playerOName;

      if (evaluation.status === 'won') {
        setAnnouncement(`${actor} placed ${player} at row ${row} column ${col} and won the match!`);
      } else if (evaluation.status === 'draw') {
        setAnnouncement(`${actor} placed ${player} at row ${row} column ${col}. The match ended in a draw.`);
      } else {
        const nextActor = player === 'X' ? playerOName : playerXName;
        const nextSymbol = player === 'X' ? 'O' : 'X';
        setAnnouncement(`${actor} placed ${player} at row ${row} column ${col}. ${nextActor}'s turn (${nextSymbol}).`);
      }
    },
    [playerXName, playerOName, sound]
  );

  const handleRoundComplete = useCallback(
    (result) => {
      if (result.status === 'won') {
        sound?.playWin?.();
      } else if (result.status === 'draw') {
        sound?.playDraw?.();
      }

      onRecordMatch?.({
        mode,
        difficulty,
        playerXName,
        playerOName,
        winner: result.winner,
      });

      clearModalTimer();
      const delay = animationsEnabled ? 380 : 80;
      modalTimerRef.current = window.setTimeout(() => {
        setIsResultModalOpen(true);
      }, delay);
    },
    [animationsEnabled, clearModalTimer, difficulty, mode, onRecordMatch, playerOName, playerXName, sound]
  );

  const {
    board,
    currentPlayer,
    status,
    winner,
    winningLine,
    sessionScores,
    lastMoveIndex,
    makeMove,
    restartRound,
    resetSession,
  } = useGame({
    onMove: handleMoveFeedback,
    onRoundComplete: handleRoundComplete,
  });

  const handleAIMove = useCallback(
    (index) => {
      makeMove(index);
    },
    [makeMove]
  );

  const { isAIThinking } = useAI({
    enabled: true,
    mode,
    difficulty,
    board,
    currentPlayer,
    status,
    animationsEnabled,
    onAIMove: handleAIMove,
  });

  const isBoardPlayable =
    status === 'playing' && !(mode === 'pvc' && (currentPlayer === 'O' || isAIThinking));

  const handleHumanCellSelect = (index) => {
    if (!isBoardPlayable) return;
    makeMove(index);
  };

  const handleRestartRound = () => {
    sound?.playClick?.();
    clearModalTimer();
    setIsResultModalOpen(false);
    restartRound();
    setAnnouncement(`New round started. ${playerXName}'s turn (X).`);
  };

  const handleResetSession = () => {
    sound?.playClick?.();
    clearModalTimer();
    setIsResultModalOpen(false);
    resetSession();
    setAnnouncement(`Session scores reset. ${playerXName}'s turn (X).`);
  };

  return (
    <div className="space-y-6">
      {/* Screen-reader live region for turns and game outcomes */}
      <div className="visually-hidden" aria-live="polite" aria-atomic="true">
        {announcement}
      </div>

      {/* Top Arena Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => {
            sound?.playClick?.();
            onBackHome();
          }}
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          Back to Menu
        </Button>

        <div className="flex items-center gap-2">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface border border-border text-xs font-semibold text-text-muted">
            {mode === 'pvc' ? (
              <Bot className="w-4 h-4 text-player-o" aria-hidden="true" />
            ) : (
              <Users className="w-4 h-4 text-player-x" aria-hidden="true" />
            )}
            <span>
              {mode === 'pvc' ? `Player vs Computer • ${difficulty.toUpperCase()}` : 'Player vs Player'}
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              sound?.playClick?.();
              onOpenStatistics();
            }}
          >
            <BarChart3 className="w-4 h-4" aria-hidden="true" />
            <span className="hidden sm:inline">Stats</span>
          </Button>
        </div>
      </div>

      {/* Main Arena Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        <div className="lg:col-span-7 flex flex-col items-center">
          <h1 className="visually-hidden">Tic-Tac-Toe Pro Match Arena</h1>
          <GameBoard
            board={board}
            currentPlayer={currentPlayer}
            winningLine={winningLine}
            lastMoveIndex={lastMoveIndex}
            isPlayable={isBoardPlayable}
            animationsEnabled={animationsEnabled}
            onSelectCell={handleHumanCellSelect}
          />
        </div>

        <div className="lg:col-span-5">
          <div className="rounded-3xl bg-surface border border-border p-5 sm:p-6 shadow-card">
            <ScoreBoard
              mode={mode}
              difficulty={difficulty}
              playerXName={playerXName}
              playerOName={playerOName}
              currentPlayer={currentPlayer}
              status={status}
              winner={winner}
              sessionScores={sessionScores}
              isAIThinking={isAIThinking}
              animationsEnabled={animationsEnabled}
              onRestartRound={handleRestartRound}
              onResetSession={handleResetSession}
            />
          </div>
        </div>
      </div>

      <GameResultModal
        isOpen={isResultModalOpen}
        onClose={() => setIsResultModalOpen(false)}
        mode={mode}
        winner={winner}
        winningLine={winningLine}
        board={board}
        playerXName={playerXName}
        playerOName={playerOName}
        animationsEnabled={animationsEnabled}
        onPlayAgain={handleRestartRound}
        onBackToMenu={() => {
          sound?.playClick?.();
          setIsResultModalOpen(false);
          onBackHome();
        }}
      />
    </div>
  );
}

export default Game;

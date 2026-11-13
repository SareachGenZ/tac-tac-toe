import React from 'react';
import { motion } from 'framer-motion';
import { Bot, Loader2, RotateCcw, Trophy, User } from 'lucide-react';
import Button from './Button.jsx';

/**
 * Animated Score Number Badge
 */
function AnimatedScoreValue({ value, animationsEnabled, colorClass }) {
  if (!animationsEnabled) {
    return <span className={`text-2xl sm:text-3xl font-black ${colorClass}`}>{value}</span>;
  }
  return (
    <motion.span
      key={value}
      initial={{ scale: 1.35, opacity: 0.6 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className={`inline-block text-2xl sm:text-3xl font-black ${colorClass}`}
    >
      {value}
    </motion.span>
  );
}

/**
 * Game Information Panel displaying player identities, turn indicator, scores, draws, and status.
 */
function ScoreBoard({
  mode,
  difficulty,
  playerXName,
  playerOName,
  currentPlayer,
  status,
  winner,
  sessionScores,
  isAIThinking,
  animationsEnabled,
  onRestartRound,
  onResetSession,
}) {
  const isXTurn = status === 'playing' && currentPlayer === 'X';
  const isOTurn = status === 'playing' && currentPlayer === 'O';

  let statusHeadline = '';
  let statusBadgeClass = 'bg-surface-secondary text-text-main border-border';

  if (status === 'won') {
    const winnerName = winner === 'X' ? playerXName : playerOName;
    statusHeadline = `${winnerName} (${winner}) wins!`;
    statusBadgeClass =
      winner === 'X'
        ? 'bg-player-x/15 text-player-x border-player-x/40'
        : 'bg-player-o/15 text-player-o border-player-o/40';
  } else if (status === 'draw') {
    statusHeadline = "It's a draw!";
    statusBadgeClass = 'bg-warning/15 text-warning border-warning/40';
  } else if (isAIThinking) {
    statusHeadline = 'Computer is thinking…';
    statusBadgeClass = 'bg-player-o/15 text-player-o border-player-o/40';
  } else {
    const activeName = currentPlayer === 'X' ? playerXName : playerOName;
    statusHeadline = `${activeName}'s turn (${currentPlayer})`;
    statusBadgeClass =
      currentPlayer === 'X'
        ? 'bg-player-x/15 text-player-x border-player-x/40'
        : 'bg-player-o/15 text-player-o border-player-o/40';
  }

  return (
    <div className="space-y-4">
      {/* Live Status Banner */}
      <div
        className={`rounded-2xl border px-4 py-3 flex items-center justify-between gap-3 ${statusBadgeClass}`}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          {isAIThinking ? (
            <Loader2 className="w-4 h-4 animate-spin shrink-0" aria-hidden="true" />
          ) : status === 'won' ? (
            <Trophy className="w-4 h-4 shrink-0" aria-hidden="true" />
          ) : (
            <span
              aria-hidden="true"
              className={[
                'w-2.5 h-2.5 rounded-full shrink-0',
                status === 'draw'
                  ? 'bg-warning'
                  : currentPlayer === 'X'
                  ? 'bg-player-x'
                  : 'bg-player-o',
              ].join(' ')}
            />
          )}
          <span className="text-sm font-bold truncate">{statusHeadline}</span>
        </div>
        <span className="text-xs font-semibold uppercase tracking-wider opacity-85 shrink-0">
          {mode === 'pvc' ? `AI: ${difficulty}` : 'PvP'}
        </span>
      </div>

      {/* Player Score Cards */}
      <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
        {/* Player X */}
        <div
          className={[
            'rounded-2xl p-3.5 border transition-all duration-200 flex flex-col justify-between gap-2',
            isXTurn
              ? 'bg-player-x/12 border-player-x shadow-glow-x'
              : 'bg-surface border-border',
          ].join(' ')}
        >
          <div className="flex items-center justify-between gap-1">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-player-x truncate">
              <User className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span className="truncate">{playerXName}</span>
            </span>
            <span className="text-xs font-black text-player-x px-1.5 py-0.5 rounded bg-player-x/15">
              X
            </span>
          </div>
          <AnimatedScoreValue
            value={sessionScores.X}
            animationsEnabled={animationsEnabled}
            colorClass="text-text-main"
          />
        </div>

        {/* Draws */}
        <div className="rounded-2xl p-3.5 border border-border bg-surface flex flex-col justify-between gap-2 text-center">
          <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">
            Draws
          </span>
          <AnimatedScoreValue
            value={sessionScores.draws}
            animationsEnabled={animationsEnabled}
            colorClass="text-text-muted"
          />
        </div>

        {/* Player O / Computer */}
        <div
          className={[
            'rounded-2xl p-3.5 border transition-all duration-200 flex flex-col justify-between gap-2',
            isOTurn
              ? 'bg-player-o/12 border-player-o shadow-glow-o'
              : 'bg-surface border-border',
          ].join(' ')}
        >
          <div className="flex items-center justify-between gap-1">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-player-o truncate">
              {mode === 'pvc' ? (
                <Bot className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              ) : (
                <User className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              )}
              <span className="truncate">{playerOName}</span>
            </span>
            <span className="text-xs font-black text-player-o px-1.5 py-0.5 rounded bg-player-o/15">
              O
            </span>
          </div>
          <AnimatedScoreValue
            value={sessionScores.O}
            animationsEnabled={animationsEnabled}
            colorClass="text-text-main"
          />
        </div>
      </div>

      {/* Round Controls */}
      <div className="flex flex-wrap items-center gap-2.5">
        <Button variant="secondary" size="sm" onClick={onRestartRound} className="flex-1">
          <RotateCcw className="w-4 h-4" aria-hidden="true" />
          Restart Round
        </Button>
        <Button variant="ghost" size="sm" onClick={onResetSession}>
          Reset Session Score
        </Button>
      </div>
    </div>
  );
}

export default ScoreBoard;


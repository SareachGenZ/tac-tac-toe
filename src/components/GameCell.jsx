import React from 'react';
import { motion } from 'framer-motion';

/**
 * Animated SVG X Symbol
 */
function SymbolX({ animated, isWinning }) {
  const strokeColor = isWinning ? 'stroke-success' : 'stroke-player-x';

  if (!animated) {
    return (
      <svg
        viewBox="0 0 100 100"
        className={`w-[58%] h-[58%] ${strokeColor}`}
        fill="none"
        aria-hidden="true"
      >
        <line x1="22" y1="22" x2="78" y2="78" strokeWidth="12" strokeLinecap="round" />
        <line x1="78" y1="22" x2="22" y2="78" strokeWidth="12" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 100 100"
      className={`w-[58%] h-[58%] ${strokeColor}`}
      fill="none"
      aria-hidden="true"
    >
      <motion.line
        x1="22"
        y1="22"
        x2="78"
        y2="78"
        strokeWidth="12"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.18, ease: 'easeOut' }}
      />
      <motion.line
        x1="78"
        y1="22"
        x2="22"
        y2="78"
        strokeWidth="12"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.18, delay: 0.08, ease: 'easeOut' }}
      />
    </svg>
  );
}

/**
 * Animated SVG O Symbol
 */
function SymbolO({ animated, isWinning }) {
  const strokeColor = isWinning ? 'stroke-success' : 'stroke-player-o';

  if (!animated) {
    return (
      <svg
        viewBox="0 0 100 100"
        className={`w-[58%] h-[58%] ${strokeColor}`}
        fill="none"
        aria-hidden="true"
      >
        <circle cx="50" cy="50" r="28" strokeWidth="12" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 100 100"
      className={`w-[58%] h-[58%] ${strokeColor}`}
      fill="none"
      aria-hidden="true"
    >
      <motion.circle
        cx="50"
        cy="50"
        r="28"
        strokeWidth="12"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.24, ease: 'easeOut' }}
      />
    </svg>
  );
}

/**
 * Individual cell on the 3x3 Tic-Tac-Toe board.
 */
function GameCell({
  index,
  value,
  currentPlayer,
  isWinningCell,
  isLastMove,
  isPlayable,
  animationsEnabled,
  buttonRef,
  onSelect,
  onKeyDown,
}) {
  const row = Math.floor(index / 3) + 1;
  const col = (index % 3) + 1;
  const stateLabel = value ? `occupied by ${value}` : 'empty';
  const canInteract = isPlayable && value === null;

  return (
    <motion.button
      ref={buttonRef}
      type="button"
      onClick={() => canInteract && onSelect(index)}
      onKeyDown={(e) => onKeyDown?.(e, index)}
      aria-label={`Row ${row}, Column ${col}: ${stateLabel}`}
      aria-disabled={!canInteract}
      whileHover={canInteract && animationsEnabled ? { scale: 1.03 } : undefined}
      whileTap={canInteract && animationsEnabled ? { scale: 0.96 } : undefined}
      className={[
        'group relative aspect-square w-full min-h-[72px] rounded-2xl border-2 flex items-center justify-center transition-all duration-150 select-none',
        isWinningCell
          ? 'bg-success/15 border-success shadow-glow-success'
          : value === 'X'
          ? 'bg-player-x/10 border-player-x/40'
          : value === 'O'
          ? 'bg-player-o/10 border-player-o/40'
          : canInteract
          ? 'bg-surface-secondary/60 border-border hover:border-primary/70 hover:bg-surface-secondary cursor-pointer'
          : 'bg-surface-secondary/40 border-border/70 cursor-default',
        isLastMove && !isWinningCell ? 'ring-2 ring-primary/40 ring-offset-2 ring-offset-surface' : '',
      ].join(' ')}
    >
      {value === 'X' && <SymbolX animated={animationsEnabled} isWinning={isWinningCell} />}
      {value === 'O' && <SymbolO animated={animationsEnabled} isWinning={isWinningCell} />}

      {/* Subtle hover preview for empty playable cells */}
      {canInteract && (
        <span
          aria-hidden="true"
          className={[
            'pointer-events-none opacity-0 group-hover:opacity-25 group-focus-visible:opacity-25 transition-opacity text-4xl sm:text-5xl font-black',
            currentPlayer === 'X' ? 'text-player-x' : 'text-player-o',
          ].join(' ')}
        >
          {currentPlayer}
        </span>
      )}
    </motion.button>
  );
}

export default GameCell;


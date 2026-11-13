import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import GameCell from './GameCell.jsx';

// SVG coordinates (0-300 viewBox) for the 8 winning lines
const LINE_COORDS = {
  '0,1,2': { x1: 22, y1: 50, x2: 278, y2: 50 },
  '3,4,5': { x1: 22, y1: 150, x2: 278, y2: 150 },
  '6,7,8': { x1: 22, y1: 250, x2: 278, y2: 250 },
  '0,3,6': { x1: 50, y1: 22, x2: 50, y2: 278 },
  '1,4,7': { x1: 150, y1: 22, x2: 150, y2: 278 },
  '2,5,8': { x1: 250, y1: 22, x2: 250, y2: 278 },
  '0,4,8': { x1: 26, y1: 26, x2: 274, y2: 274 },
  '2,4,6': { x1: 274, y1: 26, x2: 26, y2: 274 },
};

/**
 * Interactive 3x3 Tic-Tac-Toe Board with keyboard arrow navigation and winning line overlay.
 */
function GameBoard({
  board,
  currentPlayer,
  winningLine,
  lastMoveIndex,
  isPlayable,
  animationsEnabled,
  onSelectCell,
}) {
  const cellRefs = useRef([]);

  const handleCellKeyDown = (event, index) => {
    const row = Math.floor(index / 3);
    const col = index % 3;
    let nextIndex = null;

    switch (event.key) {
      case 'ArrowRight':
        nextIndex = row * 3 + ((col + 1) % 3);
        break;
      case 'ArrowLeft':
        nextIndex = row * 3 + ((col + 2) % 3);
        break;
      case 'ArrowDown':
        nextIndex = ((row + 1) % 3) * 3 + col;
        break;
      case 'ArrowUp':
        nextIndex = ((row + 2) % 3) * 3 + col;
        break;
      case 'Home':
        nextIndex = 0;
        break;
      case 'End':
        nextIndex = 8;
        break;
      default:
        return;
    }

    event.preventDefault();
    cellRefs.current[nextIndex]?.focus();
  };

  const lineKey = winningLine ? winningLine.join(',') : null;
  const lineCoords = lineKey ? LINE_COORDS[lineKey] : null;

  return (
    <div className="relative w-full max-w-[min(92vw,400px)] mx-auto rounded-3xl bg-surface border border-border p-3.5 sm:p-4 shadow-card">
      <div
        role="group"
        aria-label="Tic-Tac-Toe 3 by 3 board"
        className="relative grid grid-cols-3 gap-2.5 sm:gap-3"
      >
        {board.map((cellValue, index) => (
          <GameCell
            key={index}
            index={index}
            value={cellValue}
            currentPlayer={currentPlayer}
            isWinningCell={Boolean(winningLine?.includes(index))}
            isLastMove={lastMoveIndex === index}
            isPlayable={isPlayable}
            animationsEnabled={animationsEnabled}
            buttonRef={(el) => {
              cellRefs.current[index] = el;
            }}
            onSelect={onSelectCell}
            onKeyDown={handleCellKeyDown}
          />
        ))}

        {/* Animated Winning Strike-Through Overlay */}
        {lineCoords && (
          <svg
            viewBox="0 0 300 300"
            className="pointer-events-none absolute inset-0 w-full h-full"
            aria-hidden="true"
          >
            {animationsEnabled ? (
              <motion.line
                x1={lineCoords.x1}
                y1={lineCoords.y1}
                x2={lineCoords.x2}
                y2={lineCoords.y2}
                stroke="#22C55E"
                strokeWidth="10"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.9 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              />
            ) : (
              <line
                x1={lineCoords.x1}
                y1={lineCoords.y1}
                x2={lineCoords.x2}
                y2={lineCoords.y2}
                stroke="#22C55E"
                strokeWidth="10"
                strokeLinecap="round"
                opacity="0.9"
              />
            )}
          </svg>
        )}
      </div>
    </div>
  );
}

export default GameBoard;


import React from 'react';
import { motion } from 'framer-motion';
import { Award, Bot, Home, MinusCircle, RotateCcw, Sparkles, Trophy } from 'lucide-react';
import Modal from './Modal.jsx';
import Button from './Button.jsx';

/**
 * Game Result Modal showing Win / Loss / Draw treatments, final board snapshot, and post-game actions.
 */
function GameResultModal({
  isOpen,
  onClose,
  mode,
  winner,
  winningLine,
  board,
  playerXName,
  playerOName,
  animationsEnabled,
  onPlayAgain,
  onBackToMenu,
}) {
  const isDraw = winner === null;
  const isLossVsComputer = mode === 'pvc' && winner === 'O';
  const winnerName = winner === 'X' ? playerXName : playerOName;

  let title = 'Match Complete';
  let subtitle = '';
  let badgeClass = 'bg-warning/15 text-warning border-warning/40';
  let BannerIcon = MinusCircle;

  if (isDraw) {
    title = "It's a Draw!";
    subtitle = 'Well matched — neither side broke through.';
    badgeClass = 'bg-warning/15 text-warning border-warning/40';
    BannerIcon = MinusCircle;
  } else if (isLossVsComputer) {
    title = 'Computer Wins!';
    subtitle = `${playerOName} claimed the round. Ready for a rematch?`;
    badgeClass = 'bg-danger/15 text-danger border-danger/40';
    BannerIcon = Bot;
  } else {
    title = `${winnerName} Wins!`;
    subtitle =
      mode === 'pvc'
        ? 'Brilliant strategy — you defeated the Computer!'
        : `Victory goes to Player ${winner}!`;
    badgeClass = 'bg-success/15 text-success border-success/40';
    BannerIcon = Trophy;
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} maxWidthClass="max-w-md">
      <div className="space-y-5 text-center">
        {/* Visual Treatment Banner */}
        <motion.div
          initial={animationsEnabled ? { scale: 0.85, opacity: 0 } : false}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.28, ease: 'easeOut' }}
          className={`relative rounded-2xl border p-5 flex flex-col items-center gap-2 ${badgeClass}`}
        >
          {!isDraw && !isLossVsComputer && animationsEnabled && (
            <motion.div
              aria-hidden="true"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.35 }}
              className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-success"
            >
              <Sparkles className="w-4 h-4" />
              <span>Winner Celebration</span>
              <Award className="w-4 h-4" />
            </motion.div>
          )}
          <BannerIcon className="w-10 h-10" aria-hidden="true" />
          <p className="text-sm font-medium text-text-main">{subtitle}</p>
        </motion.div>

        {/* Final Board Snapshot */}
        <div className="space-y-2">
          <div className="text-xs font-semibold uppercase tracking-wider text-text-muted">
            Final Board State
          </div>
          <div
            aria-label="Final board state"
            className="w-44 mx-auto grid grid-cols-3 gap-1.5 p-2.5 rounded-2xl bg-bg/80 border border-border"
          >
            {board.map((cell, index) => {
              const isWinCell = Boolean(winningLine?.includes(index));
              return (
                <div
                  key={index}
                  className={[
                    'aspect-square rounded-xl border flex items-center justify-center text-lg font-black',
                    isWinCell
                      ? 'bg-success/20 border-success text-success'
                      : 'bg-surface border-border',
                  ].join(' ')}
                >
                  {cell === 'X' && (
                    <span className={isWinCell ? 'text-success' : 'text-player-x'}>
                      X
                    </span>
                  )}
                  {cell === 'O' && (
                    <span className={isWinCell ? 'text-success' : 'text-player-o'}>
                      O
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-1">
          <Button onClick={onPlayAgain} className="flex-1" data-autofocus="true">
            <RotateCcw className="w-4 h-4" aria-hidden="true" />
            Play Again
          </Button>
          <Button variant="secondary" onClick={onBackToMenu} className="flex-1">
            <Home className="w-4 h-4" aria-hidden="true" />
            Back to Main Menu
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default GameResultModal;

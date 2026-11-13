import React from 'react';
import { Award, Cpu, Grid3X3, Keyboard } from 'lucide-react';
import Modal from './Modal.jsx';
import Button from './Button.jsx';

/**
 * Accessible "How to Play" modal explaining rules, AI tiers, and controls.
 */
function HowToPlayModal({ isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="How to Play Tic-Tac-Toe Pro">
      <div className="space-y-4 text-sm text-text-muted">
        <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-surface-secondary/60 border border-border">
          <Grid3X3 className="w-5 h-5 text-player-x shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <h3 className="font-semibold text-text-main">Objective</h3>
            <p className="mt-0.5">
              Players take turns placing <strong className="text-player-x">X</strong> and{' '}
              <strong className="text-player-o">O</strong> on the 3×3 board. Player X always
              moves first. Align 3 matching marks horizontally, vertically, or diagonally to win.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-surface-secondary/60 border border-border">
          <Cpu className="w-5 h-5 text-player-o shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <h3 className="font-semibold text-text-main">Game Modes & AI</h3>
            <p className="mt-0.5">
              Play locally against a friend in <strong>Player vs Player</strong>, or test your
              strategy against <strong>Easy</strong> (random), <strong>Medium</strong> (tactical
              blocking), or <strong>Hard</strong> (unbeatable Minimax) AI.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-surface-secondary/60 border border-border">
          <Award className="w-5 h-5 text-success shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <h3 className="font-semibold text-text-main">Stats & History</h3>
            <p className="mt-0.5">
              Every completed match automatically updates your persistent scoreboard, win rate, and
              match history in your browser.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-surface-secondary/60 border border-border">
          <Keyboard className="w-5 h-5 text-secondary shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <h3 className="font-semibold text-text-main">Keyboard Controls</h3>
            <p className="mt-0.5">
              Use <kbd className="px-1.5 py-0.5 rounded bg-surface border border-border text-xs text-text-main">Tab</kbd>{' '}
              or arrow keys to navigate board cells, <kbd className="px-1.5 py-0.5 rounded bg-surface border border-border text-xs text-text-main">Enter</kbd>{' '}
              / <kbd className="px-1.5 py-0.5 rounded bg-surface border border-border text-xs text-text-main">Space</kbd> to
              place a mark, and <kbd className="px-1.5 py-0.5 rounded bg-surface border border-border text-xs text-text-main">Esc</kbd> to
              close dialogs.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <Button onClick={onClose} data-autofocus="true">
          Got It
        </Button>
      </div>
    </Modal>
  );
}

export default HowToPlayModal;

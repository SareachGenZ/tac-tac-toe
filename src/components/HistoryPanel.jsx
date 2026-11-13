import React, { useState } from 'react';
import { Bot, Clock, History, Trash2, Users } from 'lucide-react';
import Button from './Button.jsx';
import ConfirmDialog from './ConfirmDialog.jsx';

function formatTimestamp(isoString) {
  try {
    return new Intl.DateTimeFormat(undefined, {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(new Date(isoString));
  } catch {
    return isoString;
  }
}

/**
 * Displays automatic match history with empty state and confirmation-protected clearing.
 */
function HistoryPanel({ history, onClearHistory }) {
  const [confirmClearOpen, setConfirmClearOpen] = useState(false);

  return (
    <section className="rounded-3xl bg-surface border border-border p-6 sm:p-8 shadow-card space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-secondary/15 text-secondary border border-secondary/30">
            <History className="w-5 h-5" aria-hidden="true" />
          </span>
          <div>
            <h2 className="text-xl font-bold text-text-main">Game History</h2>
            <p className="text-sm text-text-muted">
              Recent completed matches saved automatically
            </p>
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => setConfirmClearOpen(true)}
          disabled={history.length === 0}
        >
          <Trash2 className="w-4 h-4 text-danger" aria-hidden="true" />
          Clear History
        </Button>
      </div>

      {history.length === 0 ? (
        <div className="rounded-2xl bg-surface-secondary/35 border border-dashed border-border p-10 text-center space-y-2.5">
          <History className="w-9 h-9 text-text-muted mx-auto opacity-80" aria-hidden="true" />
          <h3 className="text-base font-bold text-text-main">No Match History Yet</h3>
          <p className="text-sm text-text-muted max-w-sm mx-auto">
            Finish a game in Player vs Player or Player vs Computer mode to see detailed match
            logs here.
          </p>
        </div>
      ) : (
        <ul className="space-y-3" aria-label="Recent games">
          {history.map((entry) => {
            const isDraw = entry.winner === null;
            const isXWinner = entry.winner === 'X';
            const isCpuWinner = entry.mode === 'pvc' && entry.winner === 'O';

            const resultBadgeClass = isDraw
              ? 'bg-warning/15 text-warning border-warning/30'
              : isCpuWinner
              ? 'bg-danger/15 text-danger border-danger/30'
              : isXWinner
              ? 'bg-player-x/15 text-player-x border-player-x/30'
              : 'bg-player-o/15 text-player-o border-player-o/30';

            return (
              <li
                key={entry.id}
                className="rounded-2xl bg-surface-secondary/50 border border-border p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-surface border border-border text-text-muted">
                      Game #{entry.gameNumber}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-text-muted">
                      {entry.mode === 'pvc' ? (
                        <Bot className="w-3.5 h-3.5 text-player-o" aria-hidden="true" />
                      ) : (
                        <Users className="w-3.5 h-3.5 text-player-x" aria-hidden="true" />
                      )}
                      {entry.mode === 'pvc'
                        ? `PvC (${(entry.difficulty || 'medium').toUpperCase()})`
                        : 'PvP'}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-text-muted">
                      <Clock className="w-3 h-3" aria-hidden="true" />
                      {formatTimestamp(entry.timestamp)}
                    </span>
                  </div>

                  <div className="text-sm font-semibold text-text-main truncate">
                    <span className="text-player-x">{entry.playerXName}</span>{' '}
                    <span className="text-text-muted font-normal">vs</span>{' '}
                    <span className="text-player-o">{entry.playerOName}</span>
                  </div>
                  <div className="text-xs text-text-muted">
                    Winner: <span className="font-semibold text-text-main">{entry.winnerName}</span>
                  </div>
                </div>

                <div className="shrink-0">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${resultBadgeClass}`}
                  >
                    {entry.resultLabel}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      <ConfirmDialog
        isOpen={confirmClearOpen}
        onClose={() => setConfirmClearOpen(false)}
        onConfirm={onClearHistory}
        title="Clear Game History?"
        message="This will remove all entries from your recent game history list. Lifetime statistics counters will remain intact."
        confirmLabel="Clear History"
      />
    </section>
  );
}

export default HistoryPanel;


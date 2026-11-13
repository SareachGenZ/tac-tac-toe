import React from 'react';
import { Bot, Users } from 'lucide-react';

const MODES = [
  {
    id: 'pvp',
    title: 'Player vs Player',
    subtitle: 'Local 2-player match on the same device',
    badge: 'Local Multiplayer',
    icon: Users,
    accentClass: 'text-player-x bg-player-x/15 border-player-x/30',
  },
  {
    id: 'pvc',
    title: 'Player vs Computer',
    subtitle: 'Challenge an adaptive AI across 3 difficulty tiers',
    badge: 'Single Player AI',
    icon: Bot,
    accentClass: 'text-player-o bg-player-o/15 border-player-o/30',
  },
];

/**
 * Interactive cards for selecting Player vs Player or Player vs Computer mode,
 * along with customizable player names.
 */
function GameModeSelector({
  selectedMode,
  onSelectMode,
  playerNames,
  onChangePlayerName,
}) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {MODES.map((mode) => {
          const Icon = mode.icon;
          const isSelected = selectedMode === mode.id;

          return (
            <button
              key={mode.id}
              type="button"
              onClick={() => onSelectMode(mode.id)}
              aria-pressed={isSelected}
              className={[
                'text-left rounded-2xl p-5 border transition-all duration-200 flex flex-col gap-3',
                isSelected
                  ? 'bg-surface border-primary shadow-glow-primary ring-1 ring-primary/40'
                  : 'bg-surface/75 border-border hover:border-primary/50 hover:bg-surface',
              ].join(' ')}
            >
              <div className="flex items-center justify-between gap-2">
                <span
                  className={`inline-flex items-center justify-center w-11 h-11 rounded-xl border ${mode.accentClass}`}
                >
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </span>
                <span
                  className={[
                    'text-xs font-semibold px-2.5 py-1 rounded-full border',
                    isSelected
                      ? 'bg-primary/15 text-primary border-primary/40'
                      : 'bg-surface-secondary text-text-muted border-border',
                  ].join(' ')}
                >
                  {mode.badge}
                </span>
              </div>
              <div>
                <h3 className="text-base font-bold text-text-main">{mode.title}</h3>
                <p className="text-xs sm:text-sm text-text-muted mt-1">{mode.subtitle}</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Player Name Customization */}
      <div className="rounded-2xl bg-surface-secondary/50 border border-border p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label
              htmlFor="player-x-name"
              className="block text-xs font-semibold text-player-x mb-1.5"
            >
              Player X Name
            </label>
            <input
              id="player-x-name"
              type="text"
              maxLength={20}
              value={playerNames.X}
              onChange={(e) => onChangePlayerName('X', e.target.value)}
              placeholder="Player 1"
              className="w-full rounded-xl bg-surface border border-border px-3 py-2 text-sm text-text-main placeholder:text-text-muted/60 focus:border-player-x"
            />
          </div>

          {selectedMode === 'pvp' ? (
            <div>
              <label
                htmlFor="player-o-name"
                className="block text-xs font-semibold text-player-o mb-1.5"
              >
                Player O Name
              </label>
              <input
                id="player-o-name"
                type="text"
                maxLength={20}
                value={playerNames.O}
                onChange={(e) => onChangePlayerName('O', e.target.value)}
                placeholder="Player 2"
                className="w-full rounded-xl bg-surface border border-border px-3 py-2 text-sm text-text-main placeholder:text-text-muted/60 focus:border-player-o"
              />
            </div>
          ) : (
            <div>
              <span className="block text-xs font-semibold text-player-o mb-1.5">
                Opponent (O)
              </span>
              <div className="w-full rounded-xl bg-surface/60 border border-border px-3 py-2 text-sm text-text-muted flex items-center gap-2">
                <Bot className="w-4 h-4 text-player-o shrink-0" aria-hidden="true" />
                <span>Computer AI</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default GameModeSelector;


import React from 'react';
import { Brain, Cpu, Sparkles } from 'lucide-react';

const DIFFICULTIES = [
  {
    id: 'easy',
    label: 'Easy',
    description: 'Relaxed random moves, great for warm-ups',
    icon: Sparkles,
    badgeClass: 'text-success bg-success/15 border-success/30',
  },
  {
    id: 'medium',
    label: 'Medium',
    description: 'Seizes wins and blocks obvious threats',
    icon: Cpu,
    badgeClass: 'text-secondary bg-secondary/15 border-secondary/30',
  },
  {
    id: 'hard',
    label: 'Hard',
    description: 'Optimal Minimax AI — unbeatable strategy',
    icon: Brain,
    badgeClass: 'text-player-o bg-player-o/15 border-player-o/30',
  },
];

/**
 * Interactive AI difficulty cards for Player vs Computer mode.
 */
function DifficultySelector({ difficulty, onSelectDifficulty }) {
  return (
    <div className="space-y-2.5">
      <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider">
        AI Difficulty Level
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {DIFFICULTIES.map((level) => {
          const Icon = level.icon;
          const isSelected = difficulty === level.id;
          return (
            <button
              key={level.id}
              type="button"
              onClick={() => onSelectDifficulty(level.id)}
              aria-pressed={isSelected}
              className={[
                'text-left rounded-2xl p-4 border transition-all duration-150 flex flex-col gap-2',
                isSelected
                  ? 'bg-surface border-secondary shadow-sm ring-1 ring-secondary/40'
                  : 'bg-surface/65 border-border hover:border-secondary/50 hover:bg-surface',
              ].join(' ')}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-bold text-sm text-text-main">{level.label}</span>
                <span
                  className={`inline-flex items-center justify-center w-8 h-8 rounded-lg border ${level.badgeClass}`}
                >
                  <Icon className="w-4 h-4" aria-hidden="true" />
                </span>
              </div>
              <p className="text-xs text-text-muted leading-relaxed">
                {level.description}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default DifficultySelector;


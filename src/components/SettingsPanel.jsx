import React, { useState } from 'react';
import { Moon, RotateCcw, Sparkles, Sun, Trash2, Volume2 } from 'lucide-react';
import Modal from './Modal.jsx';
import Button from './Button.jsx';
import ConfirmDialog from './ConfirmDialog.jsx';

/**
 * Settings modal for managing theme, sound, animations, default AI difficulty, and resets.
 */
function SettingsPanel({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
  onResetStatistics,
  onResetPreferences,
}) {
  const [confirmStatsReset, setConfirmStatsReset] = useState(false);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} title="Settings">
        <div className="space-y-4">
          {/* Theme Toggle */}
          <div className="flex items-center justify-between gap-4 p-3.5 rounded-2xl bg-surface-secondary/50 border border-border">
            <div className="flex items-center gap-3 min-w-0">
              {settings.theme === 'dark' ? (
                <Moon className="w-5 h-5 text-primary shrink-0" aria-hidden="true" />
              ) : (
                <Sun className="w-5 h-5 text-warning shrink-0" aria-hidden="true" />
              )}
              <div className="min-w-0">
                <div className="text-sm font-semibold text-text-main">Appearance Theme</div>
                <div className="text-xs text-text-muted">
                  Currently using {settings.theme === 'dark' ? 'Dark' : 'Light'} Mode
                </div>
              </div>
            </div>
            <Button
              variant="secondary"
              size="sm"
              onClick={() =>
                onUpdateSettings({
                  theme: settings.theme === 'dark' ? 'light' : 'dark',
                })
              }
              aria-pressed={settings.theme === 'dark'}
            >
              {settings.theme === 'dark' ? 'Switch Light' : 'Switch Dark'}
            </Button>
          </div>

          {/* Sound Effects */}
          <div className="flex items-center justify-between gap-4 p-3.5 rounded-2xl bg-surface-secondary/50 border border-border">
            <div className="flex items-center gap-3 min-w-0">
              <Volume2 className="w-5 h-5 text-secondary shrink-0" aria-hidden="true" />
              <div className="min-w-0">
                <div className="text-sm font-semibold text-text-main">Sound Effects</div>
                <div className="text-xs text-text-muted">
                  Audio cues on clicks, moves, wins, and draws
                </div>
              </div>
            </div>
            <Button
              variant={settings.soundEnabled ? 'primary' : 'outline'}
              size="sm"
              onClick={() =>
                onUpdateSettings({ soundEnabled: !settings.soundEnabled })
              }
              aria-pressed={settings.soundEnabled}
            >
              {settings.soundEnabled ? 'On' : 'Off'}
            </Button>
          </div>

          {/* Animations */}
          <div className="flex items-center justify-between gap-4 p-3.5 rounded-2xl bg-surface-secondary/50 border border-border">
            <div className="flex items-center gap-3 min-w-0">
              <Sparkles className="w-5 h-5 text-player-o shrink-0" aria-hidden="true" />
              <div className="min-w-0">
                <div className="text-sm font-semibold text-text-main">Animations</div>
                <div className="text-xs text-text-muted">
                  Motion transitions and celebration effects
                </div>
              </div>
            </div>
            <Button
              variant={settings.animationsEnabled ? 'primary' : 'outline'}
              size="sm"
              onClick={() =>
                onUpdateSettings({ animationsEnabled: !settings.animationsEnabled })
              }
              aria-pressed={settings.animationsEnabled}
            >
              {settings.animationsEnabled ? 'On' : 'Off'}
            </Button>
          </div>

          {/* Default AI Difficulty */}
          <div className="p-3.5 rounded-2xl bg-surface-secondary/50 border border-border space-y-2">
            <label
              htmlFor="default-difficulty-select"
              className="block text-sm font-semibold text-text-main"
            >
              Default AI Difficulty
            </label>
            <select
              id="default-difficulty-select"
              value={settings.defaultDifficulty}
              onChange={(e) =>
                onUpdateSettings({ defaultDifficulty: e.target.value })
              }
              className="w-full rounded-xl bg-surface border border-border px-3 py-2 text-sm text-text-main"
            >
              <option value="easy">Easy — Random moves</option>
              <option value="medium">Medium — Tactical blocking</option>
              <option value="hard">Hard — Minimax optimal</option>
            </select>
          </div>

          {/* Reset Actions */}
          <div className="pt-3 border-t border-border flex flex-wrap items-center justify-between gap-2.5">
            <div className="flex flex-wrap items-center gap-2">
              <Button variant="ghost" size="sm" onClick={onResetPreferences}>
                <RotateCcw className="w-4 h-4" aria-hidden="true" />
                Reset Preferences
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setConfirmStatsReset(true)}
              >
                <Trash2 className="w-4 h-4 text-danger" aria-hidden="true" />
                Reset Statistics
              </Button>
            </div>
            <Button onClick={onClose}>Done</Button>
          </div>
        </div>
      </Modal>

      <ConfirmDialog
        isOpen={confirmStatsReset}
        onClose={() => setConfirmStatsReset(false)}
        onConfirm={onResetStatistics}
        title="Reset All Statistics?"
        message="This will permanently clear all recorded wins, draws, and win percentage counters."
        confirmLabel="Reset Statistics"
      />
    </>
  );
}

export default SettingsPanel;

import React from 'react';
import {
  BarChart3,
  Home,
  Moon,
  Settings,
  Sun,
  Volume2,
  VolumeX,
} from 'lucide-react';
import logoUrl from '../assets/logo.svg';

/**
 * Top application header with branding, navigation, and quick toggles.
 */
function Header({
  activeView,
  onNavigate,
  onOpenSettings,
  isDark,
  onToggleTheme,
  soundEnabled,
  onToggleSound,
}) {
  return (
    <header className="sticky top-0 z-30 border-b border-border/80 bg-surface/85 backdrop-blur-md">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => onNavigate('home')}
          className="flex items-center gap-3 text-left rounded-xl px-1.5 py-1 hover:bg-surface-secondary/60 transition-colors min-w-0"
          aria-label="Tic-Tac-Toe Pro Home"
        >
          <img
            src={logoUrl}
            alt=""
            aria-hidden="true"
            className="w-9 h-9 rounded-xl shrink-0 shadow-sm"
          />
          <div className="min-w-0">
            <span className="block font-bold text-base sm:text-lg tracking-tight truncate">
              Tic-Tac-Toe <span className="text-primary">Pro</span>
            </span>
          </div>
        </button>

        <nav aria-label="Primary" className="flex items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={() => onNavigate('home')}
            aria-current={activeView === 'home' ? 'page' : undefined}
            className={[
              'inline-flex items-center gap-2 min-h-[40px] px-3 rounded-xl text-sm font-medium transition-colors',
              activeView === 'home'
                ? 'bg-primary/15 text-primary border border-primary/30'
                : 'text-text-muted hover:text-text-main hover:bg-surface-secondary/70',
            ].join(' ')}
          >
            <Home className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span className="hidden sm:inline">Home</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('statistics')}
            aria-current={activeView === 'statistics' ? 'page' : undefined}
            className={[
              'inline-flex items-center gap-2 min-h-[40px] px-3 rounded-xl text-sm font-medium transition-colors',
              activeView === 'statistics'
                ? 'bg-primary/15 text-primary border border-primary/30'
                : 'text-text-muted hover:text-text-main hover:bg-surface-secondary/70',
            ].join(' ')}
          >
            <BarChart3 className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span className="hidden sm:inline">Statistics</span>
          </button>

          <button
            type="button"
            onClick={onOpenSettings}
            aria-label="Open settings"
            className="inline-flex items-center gap-2 min-h-[40px] px-3 rounded-xl text-sm font-medium text-text-muted hover:text-text-main hover:bg-surface-secondary/70 transition-colors"
          >
            <Settings className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span className="hidden md:inline">Settings</span>
          </button>

          <div className="h-5 w-px bg-border mx-0.5 hidden sm:block" aria-hidden="true" />

          <button
            type="button"
            onClick={onToggleSound}
            aria-pressed={soundEnabled}
            aria-label={soundEnabled ? 'Mute sound effects' : 'Enable sound effects'}
            className={[
              'inline-flex items-center justify-center min-h-[40px] min-w-[40px] rounded-xl border transition-colors',
              soundEnabled
                ? 'bg-surface-secondary/70 border-border text-secondary hover:border-secondary/60'
                : 'bg-surface-secondary/40 border-border/60 text-text-muted hover:text-text-main',
            ].join(' ')}
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4" aria-hidden="true" />
            ) : (
              <VolumeX className="w-4 h-4" aria-hidden="true" />
            )}
          </button>

          <button
            type="button"
            onClick={onToggleTheme}
            aria-pressed={isDark}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="inline-flex items-center justify-center min-h-[40px] min-w-[40px] rounded-xl bg-surface-secondary/70 border border-border text-text-main hover:border-primary/60 transition-colors"
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-warning" aria-hidden="true" />
            ) : (
              <Moon className="w-4 h-4 text-primary" aria-hidden="true" />
            )}
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Header;


import React from 'react';
import { BarChart3, HelpCircle, Play, Sparkles } from 'lucide-react';
import logoUrl from '../assets/logo.svg';
import Button from '../components/Button.jsx';
import GameModeSelector from '../components/GameModeSelector.jsx';
import DifficultySelector from '../components/DifficultySelector.jsx';

const HERO_PREVIEW_CELLS = ['X', 'O', 'X', null, 'X', 'O', 'O', null, 'X'];

/**
 * Welcome & Game Mode Configuration landing page.
 */
function Home({
  selectedMode,
  onSelectMode,
  difficulty,
  onSelectDifficulty,
  playerNames,
  onChangePlayerName,
  onStartGame,
  onOpenHowToPlay,
  onOpenStatistics,
}) {
  return (
    <div className="space-y-8">
      {/* Hero Banner */}
      <section className="relative rounded-3xl bg-surface border border-border p-6 sm:p-10 shadow-card overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full bg-primary/15 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-secondary/15 blur-3xl"
        />

        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/15 border border-primary/30 text-primary text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Strategic Classic Reimagined</span>
            </div>

            <div className="flex items-center gap-4">
              <img
                src={logoUrl}
                alt="Tic-Tac-Toe Pro logo"
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl shadow-glow-primary shrink-0"
              />
              <div>
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-text-main">
                  Tic-Tac-Toe{' '}
                  <span className="bg-gradient-to-r from-player-x via-primary to-player-o bg-clip-text text-transparent">
                    Pro
                  </span>
                </h1>
                <p className="text-sm sm:text-base text-text-muted mt-1">
                  Outsmart friends locally or challenge an unbeatable Minimax AI.
                </p>
              </div>
            </div>

            <p className="text-sm sm:text-base text-text-muted leading-relaxed max-w-xl">
              Enjoy crisp animations, three AI difficulty levels, automatic match history, and
              real-time performance statistics — all crafted for fast, distraction-free play on
              any screen.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Button size="lg" onClick={onStartGame}>
                <Play className="w-4 h-4 fill-current" aria-hidden="true" />
                Play Game
              </Button>
              <Button variant="secondary" size="lg" onClick={onOpenHowToPlay}>
                <HelpCircle className="w-4 h-4" aria-hidden="true" />
                How to Play
              </Button>
              <Button variant="outline" size="lg" onClick={onOpenStatistics}>
                <BarChart3 className="w-4 h-4" aria-hidden="true" />
                View Statistics
              </Button>
            </div>
          </div>

          {/* Decorative X and O Board Preview */}
          <div className="lg:col-span-5 flex justify-center">
            <div
              aria-hidden="true"
              className="w-full max-w-[260px] rounded-3xl bg-bg/80 border border-border p-4 shadow-card"
            >
              <div className="grid grid-cols-3 gap-2.5">
                {HERO_PREVIEW_CELLS.map((symbol, index) => {
                  const isWinningDiagonal = index === 0 || index === 4 || index === 8;
                  return (
                    <div
                      key={index}
                      className={[
                        'aspect-square rounded-2xl border flex items-center justify-center text-2xl font-black select-none',
                        isWinningDiagonal
                          ? 'bg-player-x/15 border-player-x/60 shadow-glow-x'
                          : 'bg-surface border-border/80',
                      ].join(' ')}
                    >
                      {symbol === 'X' && (
                        <span className="text-player-x">X</span>
                      )}
                      {symbol === 'O' && (
                        <span className="text-player-o">O</span>
                      )}
                    </div>
                  );
                })}
              </div>
              <div className="mt-3 flex items-center justify-between text-xs text-text-muted px-1">
                <span className="font-semibold text-player-x">Player X</span>
                <span>vs</span>
                <span className="font-semibold text-player-o">Player O</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mode & Difficulty Selection */}
      <section className="rounded-3xl bg-surface border border-border p-6 sm:p-8 shadow-card space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-text-main">Configure Match</h2>
            <p className="text-sm text-text-muted mt-0.5">
              Choose your game mode, customize player names, and start playing.
            </p>
          </div>
          <Button onClick={onStartGame}>
            <Play className="w-4 h-4 fill-current" aria-hidden="true" />
            Start Match
          </Button>
        </div>

        <GameModeSelector
          selectedMode={selectedMode}
          onSelectMode={onSelectMode}
          playerNames={playerNames}
          onChangePlayerName={onChangePlayerName}
        />

        {selectedMode === 'pvc' && (
          <DifficultySelector
            difficulty={difficulty}
            onSelectDifficulty={onSelectDifficulty}
          />
        )}
      </section>
    </div>
  );
}

export default Home;


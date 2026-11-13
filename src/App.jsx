import React, { useCallback, useState } from 'react';
import { MotionConfig } from 'framer-motion';
import Header from './components/Header.jsx';
import HowToPlayModal from './components/HowToPlayModal.jsx';
import SettingsPanel from './components/SettingsPanel.jsx';
import Home from './pages/Home.jsx';
import Game from './pages/Game.jsx';
import Statistics from './pages/Statistics.jsx';
import { useTheme } from './hooks/useTheme.js';
import { useSound } from './hooks/useSound.js';
import { useLocalStorage } from './hooks/useLocalStorage.js';
import { DEFAULT_SETTINGS, STORAGE_KEYS } from './utils/storage.js';
import {
  DEFAULT_STATISTICS,
  appendHistoryEntry,
  createHistoryEntry,
  recordGameResult,
} from './utils/statistics.js';

/**
 * Root Application Component
 * Coordinates navigation, game configuration, persistent stats/history, theme, audio, and motion settings.
 */
function App() {
  const [settings, setSettings] = useLocalStorage(
    STORAGE_KEYS.SETTINGS,
    DEFAULT_SETTINGS
  );
  const [statistics, setStatistics] = useLocalStorage(
    STORAGE_KEYS.STATISTICS,
    DEFAULT_STATISTICS
  );
  const [history, setHistory] = useLocalStorage(STORAGE_KEYS.HISTORY, []);

  const normalizedSettings = { ...DEFAULT_SETTINGS, ...settings };
  const normalizedStats = { ...DEFAULT_STATISTICS, ...statistics };

  const [activeView, setActiveView] = useState('home');
  const [selectedMode, setSelectedMode] = useState('pvc');
  const [difficulty, setDifficulty] = useState(
    normalizedSettings.defaultDifficulty
  );
  const [playerNames, setPlayerNames] = useState({ X: 'Player 1', O: 'Player 2' });
  const [isHowToPlayOpen, setIsHowToPlayOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const sound = useSound(normalizedSettings.soundEnabled);

  const updateSettings = useCallback(
    (patch) => {
      setSettings((prev) => ({
        ...DEFAULT_SETTINGS,
        ...prev,
        ...patch,
      }));
    },
    [setSettings]
  );

  const resetPreferences = useCallback(() => {
    sound.playClick();
    setSettings(DEFAULT_SETTINGS);
    setDifficulty(DEFAULT_SETTINGS.defaultDifficulty);
  }, [setSettings, sound]);

  const resetStatistics = useCallback(() => {
    sound.playClick();
    setStatistics(DEFAULT_STATISTICS);
  }, [setStatistics, sound]);

  const clearHistory = useCallback(() => {
    sound.playClick();
    setHistory([]);
  }, [setHistory, sound]);

  const handleRecordMatch = useCallback(
    ({ mode, difficulty: matchDifficulty, playerXName, playerOName, winner }) => {
      const latestHistoryNum =
        Array.isArray(history) && history.length > 0 ? history[0].gameNumber || 0 : 0;
      const nextGameNumber = Math.max(normalizedStats.totalGames || 0, latestHistoryNum) + 1;
      setStatistics((prev) => recordGameResult(prev, { mode, winner }));
      setHistory((prev) => {
        const entry = createHistoryEntry({
          gameNumber: nextGameNumber,
          mode,
          difficulty: matchDifficulty,
          playerXName,
          playerOName,
          winner,
        });
        return appendHistoryEntry(prev, entry);
      });
    },
    [history, normalizedStats.totalGames, setHistory, setStatistics]
  );

  const { isDark, toggleTheme } = useTheme(normalizedSettings.theme, (nextTheme) =>
    updateSettings({ theme: nextTheme })
  );

  const handleChangePlayerName = (symbol, value) => {
    setPlayerNames((prev) => ({ ...prev, [symbol]: value }));
  };

  const handleNavigate = (view) => {
    sound.playClick();
    setActiveView(view);
  };

  return (
    <MotionConfig
      reducedMotion={normalizedSettings.animationsEnabled ? 'user' : 'always'}
    >
      <div className="min-h-[100dvh] bg-bg text-text-main flex flex-col">
        <a href="#main-content" className="visually-hidden">
          Skip to main content
        </a>

        <Header
          activeView={activeView}
          onNavigate={handleNavigate}
          onOpenSettings={() => {
            sound.playClick();
            setIsSettingsOpen(true);
          }}
          isDark={isDark}
          onToggleTheme={() => {
            sound.playClick();
            toggleTheme();
          }}
          soundEnabled={normalizedSettings.soundEnabled}
          onToggleSound={() => {
            updateSettings({ soundEnabled: !normalizedSettings.soundEnabled });
          }}
        />

        <main
          id="main-content"
          tabIndex={-1}
          className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10"
        >
          {activeView === 'home' && (
            <Home
              selectedMode={selectedMode}
              onSelectMode={(mode) => {
                sound.playClick();
                setSelectedMode(mode);
              }}
              difficulty={difficulty}
              onSelectDifficulty={(level) => {
                sound.playClick();
                setDifficulty(level);
              }}
              playerNames={playerNames}
              onChangePlayerName={handleChangePlayerName}
              onStartGame={() => handleNavigate('game')}
              onOpenHowToPlay={() => {
                sound.playClick();
                setIsHowToPlayOpen(true);
              }}
              onOpenStatistics={() => handleNavigate('statistics')}
            />
          )}

          {activeView === 'game' && (
            <Game
              key={`${selectedMode}-${difficulty}`}
              mode={selectedMode}
              difficulty={difficulty}
              playerNames={playerNames}
              animationsEnabled={normalizedSettings.animationsEnabled}
              sound={sound}
              onRecordMatch={handleRecordMatch}
              onBackHome={() => handleNavigate('home')}
              onOpenStatistics={() => handleNavigate('statistics')}
            />
          )}

          {activeView === 'statistics' && (
            <Statistics
              statistics={normalizedStats}
              history={Array.isArray(history) ? history : []}
              onResetStatistics={resetStatistics}
              onClearHistory={clearHistory}
              onBackHome={() => handleNavigate('home')}
              onStartGame={() => handleNavigate('game')}
            />
          )}
        </main>

        <HowToPlayModal
          isOpen={isHowToPlayOpen}
          onClose={() => {
            sound.playClick();
            setIsHowToPlayOpen(false);
          }}
        />

        <SettingsPanel
          isOpen={isSettingsOpen}
          onClose={() => {
            sound.playClick();
            setIsSettingsOpen(false);
          }}
          settings={normalizedSettings}
          onUpdateSettings={updateSettings}
          onResetStatistics={resetStatistics}
          onResetPreferences={resetPreferences}
        />
      </div>
    </MotionConfig>
  );
}

export default App;

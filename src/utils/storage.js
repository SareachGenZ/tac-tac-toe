export const STORAGE_KEYS = {
  SETTINGS: 'ttt_pro_settings_v1',
  STATISTICS: 'ttt_pro_statistics_v1',
  HISTORY: 'ttt_pro_history_v1',
};

export const DEFAULT_SETTINGS = {
  theme: 'dark',
  soundEnabled: true,
  animationsEnabled: true,
  defaultDifficulty: 'medium',
};

/**
 * Safely reads and parses a JSON value from localStorage.
 * Falls back to defaultValue if storage is unavailable or data is corrupt.
 */
export function readStorage(key, defaultValue) {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return defaultValue;
    }
    const raw = window.localStorage.getItem(key);
    if (raw === null) return defaultValue;
    return JSON.parse(raw);
  } catch {
    return defaultValue;
  }
}

/**
 * Safely serializes and writes a value to localStorage.
 */
export function writeStorage(key, value) {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return false;
    }
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

/**
 * Safely removes a key from localStorage.
 */
export function removeStorage(key) {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return false;
    }
    window.localStorage.removeItem(key);
    return true;
  } catch {
    return false;
  }
}


import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  DEFAULT_SETTINGS,
  STORAGE_KEYS,
  readStorage,
  writeStorage,
  removeStorage,
} from '../src/utils/storage.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

describe('Phase 2: UI/UX Layout & Storage Foundation', () => {
  it('has all Phase 2 components, hooks, utils, and pages', () => {
    const files = [
      'src/components/Button.jsx',
      'src/components/Modal.jsx',
      'src/components/Header.jsx',
      'src/components/GameModeSelector.jsx',
      'src/components/DifficultySelector.jsx',
      'src/components/HowToPlayModal.jsx',
      'src/components/SettingsPanel.jsx',
      'src/hooks/useTheme.js',
      'src/utils/storage.js',
      'src/pages/Home.jsx',
      'src/pages/Game.jsx',
      'src/pages/Statistics.jsx',
      'src/App.jsx',
    ];
    for (const file of files) {
      assert.equal(fs.existsSync(path.join(rootDir, file)), true, `Missing file: ${file}`);
    }
  });

  it('uses native <dialog> without redundant role="dialog" or aria-modal in Modal.jsx', () => {
    const modalSrc = fs.readFileSync(path.join(rootDir, 'src/components/Modal.jsx'), 'utf-8');
    assert.ok(modalSrc.includes('<dialog'), 'Modal should use native <dialog>');
    assert.ok(modalSrc.includes('showModal'), 'Modal should open with showModal()');
    assert.ok(modalSrc.includes('aria-labelledby'), 'Modal should use aria-labelledby');
    assert.equal(modalSrc.includes('role="dialog"'), false, 'Native <dialog> must not duplicate role="dialog"');
    assert.equal(modalSrc.includes('aria-modal'), false, 'Native <dialog> must not duplicate aria-modal');
  });

  it('uses semantic landmarks in Header.jsx and App.jsx', () => {
    const headerSrc = fs.readFileSync(path.join(rootDir, 'src/components/Header.jsx'), 'utf-8');
    const appSrc = fs.readFileSync(path.join(rootDir, 'src/App.jsx'), 'utf-8');
    assert.ok(headerSrc.includes('<header'), 'Header should use <header>');
    assert.ok(headerSrc.includes('<nav aria-label="Primary"'), 'Header should use labeled <nav>');
    assert.ok(appSrc.includes('<main'), 'App should use <main> landmark');
  });

  it('handles storage read/write/remove gracefully when window is unavailable or mocked', () => {
    // In Node without window, readStorage returns fallback and writeStorage/removeStorage return false safely
    assert.deepEqual(readStorage(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS), DEFAULT_SETTINGS);
    assert.equal(writeStorage(STORAGE_KEYS.SETTINGS, { theme: 'light' }), false);
    assert.equal(removeStorage(STORAGE_KEYS.SETTINGS), false);

    // Mock window.localStorage
    const store = new Map();
    globalThis.window = {
      localStorage: {
        getItem: (k) => (store.has(k) ? store.get(k) : null),
        setItem: (k, v) => store.set(k, v),
        removeItem: (k) => store.delete(k),
      },
    };
    try {
      const updated = { ...DEFAULT_SETTINGS, theme: 'light', soundEnabled: false };
      assert.equal(writeStorage(STORAGE_KEYS.SETTINGS, updated), true);
      assert.deepEqual(readStorage(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS), updated);
      assert.equal(removeStorage(STORAGE_KEYS.SETTINGS), true);
      assert.deepEqual(readStorage(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS), DEFAULT_SETTINGS);
    } finally {
      delete globalThis.window;
    }
  });
});


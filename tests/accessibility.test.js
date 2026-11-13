import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

describe('Phase 7 & 8: Accessibility, Sound, Motion, and Responsive Verification', () => {
  it('supports keyboard arrow navigation and accessible cell labels in GameBoard & GameCell', () => {
    const boardSrc = fs.readFileSync(path.join(rootDir, 'src/components/GameBoard.jsx'), 'utf-8');
    const cellSrc = fs.readFileSync(path.join(rootDir, 'src/components/GameCell.jsx'), 'utf-8');

    for (const key of ['ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp', 'Home', 'End']) {
      assert.ok(boardSrc.includes(key), `Missing keyboard navigation handler for ${key}`);
    }
    assert.ok(cellSrc.includes('aria-label={`Row ${row}, Column ${col}: ${stateLabel}`}'));
    assert.ok(cellSrc.includes('min-h-[72px]'), 'Touch target should be generously sized');
  });

  it('includes aria-live announcements in Game.jsx and MotionConfig reducedMotion in App.jsx', () => {
    const gameSrc = fs.readFileSync(path.join(rootDir, 'src/pages/Game.jsx'), 'utf-8');
    const appSrc = fs.readFileSync(path.join(rootDir, 'src/App.jsx'), 'utf-8');

    assert.ok(gameSrc.includes('aria-live="polite"'), 'Missing polite live region');
    assert.ok(appSrc.includes('MotionConfig'), 'App should wrap with MotionConfig');
    assert.ok(appSrc.includes('reducedMotion='), 'MotionConfig should configure reducedMotion');
  });

  it('has sound synthesizer methods for click, X, O, win, and draw in useSound.js', () => {
    const soundSrc = fs.readFileSync(path.join(rootDir, 'src/hooks/useSound.js'), 'utf-8');
    for (const fn of ['playClick', 'playMoveX', 'playMoveO', 'playWin', 'playDraw']) {
      assert.ok(soundSrc.includes(fn), `Missing sound effect function: ${fn}`);
    }
  });
});


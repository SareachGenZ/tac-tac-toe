import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

describe('Phase 1: Project Setup & Architecture', () => {
  it('has required configuration files', () => {
    const requiredFiles = [
      'package.json',
      'index.html',
      'vite.config.js',
      'tailwind.config.js',
      'postcss.config.js',
      '.gitignore',
      'CHECKLIST.md',
    ];
    for (const file of requiredFiles) {
      assert.equal(
        fs.existsSync(path.join(rootDir, file)),
        true,
        `Missing required config file: ${file}`
      );
    }
  });

  it('has the required source folder structure', () => {
    const requiredDirs = [
      'src/assets',
      'src/components',
      'src/hooks',
      'src/utils',
      'src/pages',
      'src/styles',
    ];
    for (const dir of requiredDirs) {
      const fullPath = path.join(rootDir, dir);
      assert.equal(fs.existsSync(fullPath) && fs.statSync(fullPath).isDirectory(), true, `Missing directory: ${dir}`);
    }
  });

  it('defines required npm scripts and dependencies in package.json', () => {
    const pkg = JSON.parse(fs.readFileSync(path.join(rootDir, 'package.json'), 'utf-8'));
    assert.equal(pkg.scripts.dev, 'vite');
    assert.equal(pkg.scripts.build, 'vite build');
    assert.ok(pkg.dependencies.react);
    assert.ok(pkg.dependencies['react-dom']);
    assert.ok(pkg.dependencies['lucide-react']);
    assert.ok(pkg.dependencies['framer-motion']);
    assert.ok(pkg.devDependencies.tailwindcss);
    assert.ok(pkg.devDependencies.vite);
    assert.ok(pkg.devDependencies.vitest);
  });

  it('defines dark and light theme CSS design tokens in src/styles/index.css', () => {
    const css = fs.readFileSync(path.join(rootDir, 'src/styles/index.css'), 'utf-8');
    const requiredTokens = [
      '--color-bg: #0B1020',
      '--color-surface: #151D32',
      '--color-surface-secondary: #1E293B',
      '--color-primary: #8B5CF6',
      '--color-secondary: #06B6D4',
      '--color-player-x: #38BDF8',
      '--color-player-o: #C084FC',
      '--color-success: #22C55E',
      '--color-danger: #EF4444',
      '--color-text-main: #F8FAFC',
      '--color-text-muted: #94A3B8',
      'prefers-reduced-motion: reduce',
    ];
    for (const token of requiredTokens) {
      assert.ok(css.includes(token), `Missing design token or rule: ${token}`);
    }
  });
});


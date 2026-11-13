import React from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, fireEvent, render, screen, within } from '@testing-library/react';
import App from '../src/App.jsx';

describe('Tic-Tac-Toe Pro UI Integration Tests', () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.classList.add('dark');
    // JSDOM does not implement HTMLDialogElement.showModal/close natively
    HTMLDialogElement.prototype.showModal = function showModal() {
      this.setAttribute('open', '');
    };
    HTMLDialogElement.prototype.close = function close() {
      this.removeAttribute('open');
    };
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('plays a complete Player vs Player match, prevents occupied clicks, and records statistics', () => {
    vi.useFakeTimers();
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: /Player vs Player/i }));
    fireEvent.click(screen.getAllByRole('button', { name: /Play Game/i })[0]);

    const board = screen.getByRole('group', { name: /Tic-Tac-Toe 3 by 3 board/i });
    const cells = within(board).getAllByRole('button');

    // X: 0, O: 3, X: 1, O: 4, X: 2 (X wins top row)
    fireEvent.click(cells[0]);
    // Clicking occupied cell 0 should not overwrite X with O
    fireEvent.click(cells[0]);
    expect(cells[0]).toHaveAttribute('aria-label', expect.stringContaining('occupied by X'));

    fireEvent.click(cells[3]);
    fireEvent.click(cells[1]);
    fireEvent.click(cells[4]);
    fireEvent.click(cells[2]);

    act(() => {
      vi.advanceTimersByTime(450);
    });

    expect(screen.getByText(/Player 1 \(X\) wins!/i)).toBeInTheDocument();

    // Navigate to Statistics and verify recorded match
    fireEvent.click(screen.getByRole('button', { name: /Statistics/i }));
    expect(screen.getByText('Statistics Dashboard')).toBeInTheDocument();
    expect(screen.getByText(/Game #1/i)).toBeInTheDocument();
  });

  it('runs Computer AI move in PvC mode and locks board while thinking', () => {
    vi.useFakeTimers();
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: /Hard/i }));
    fireEvent.click(screen.getAllByRole('button', { name: /Play Game/i })[0]);

    const board = screen.getByRole('group', { name: /Tic-Tac-Toe 3 by 3 board/i });
    const cells = within(board).getAllByRole('button');

    fireEvent.click(cells[0]);
    expect(screen.getByText(/Computer is thinking/i)).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(500);
    });

    // Center cell (4) is optimal AI response to corner (0)
    expect(cells[4]).toHaveAttribute('aria-label', expect.stringContaining('occupied by O'));
  });

  it('toggles and persists dark/light theme in settings and header', () => {
    render(<App />);
    expect(document.documentElement.classList.contains('dark')).toBe(true);

    const themeBtn = screen.getByRole('button', { name: /Switch to light mode/i });
    fireEvent.click(themeBtn);
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(window.localStorage.getItem('ttt_pro_settings_v1')).toContain('"theme":"light"');
  });
});

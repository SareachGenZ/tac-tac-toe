import React, { useState } from 'react';
import { BarChart3, Bot, MinusCircle, Percent, Trash2, Trophy, Users } from 'lucide-react';
import Button from './Button.jsx';
import ConfirmDialog from './ConfirmDialog.jsx';
import { calculateWinPercentage } from '../utils/statistics.js';

/**
 * Statistics Dashboard displaying lifetime metrics and reset confirmation.
 */
function StatisticsPanel({ statistics, onResetStatistics }) {
  const [confirmResetOpen, setConfirmResetOpen] = useState(false);

  const { totalGames, xWins, oWins, computerWins, draws } = statistics;
  const xWinPct = calculateWinPercentage(xWins, totalGames);
  const oWinPct = calculateWinPercentage(oWins, totalGames);
  const cpuWinPct = calculateWinPercentage(computerWins, totalGames);
  const drawPct = calculateWinPercentage(draws, totalGames);

  const statCards = [
    {
      label: 'Total Games',
      value: totalGames,
      sub: 'All completed matches',
      icon: BarChart3,
      accent: 'text-primary bg-primary/15 border-primary/30',
    },
    {
      label: 'Player X Wins',
      value: xWins,
      sub: `${xWinPct}% win rate`,
      icon: Trophy,
      accent: 'text-player-x bg-player-x/15 border-player-x/30',
    },
    {
      label: 'Player O Wins',
      value: oWins,
      sub: `${oWinPct}% (PvP)`,
      icon: Users,
      accent: 'text-player-o bg-player-o/15 border-player-o/30',
    },
    {
      label: 'Computer Wins',
      value: computerWins,
      sub: `${cpuWinPct}% (AI)`,
      icon: Bot,
      accent: 'text-danger bg-danger/15 border-danger/30',
    },
    {
      label: 'Total Draws',
      value: draws,
      sub: `${drawPct}% tied rounds`,
      icon: MinusCircle,
      accent: 'text-warning bg-warning/15 border-warning/30',
    },
    {
      label: 'X Win Percentage',
      value: `${xWinPct}%`,
      sub: totalGames > 0 ? `${xWins} of ${totalGames} games` : 'No games yet',
      icon: Percent,
      accent: 'text-success bg-success/15 border-success/30',
    },
  ];

  return (
    <section className="rounded-3xl bg-surface border border-border p-6 sm:p-8 shadow-card space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-primary/15 text-primary border border-primary/30">
            <BarChart3 className="w-5 h-5" aria-hidden="true" />
          </span>
          <div>
            <h1 className="text-2xl font-bold text-text-main">Statistics Dashboard</h1>
            <p className="text-sm text-text-muted">
              Lifetime wins, draws, and win percentage saved locally
            </p>
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => setConfirmResetOpen(true)}
          disabled={totalGames === 0}
        >
          <Trash2 className="w-4 h-4 text-danger" aria-hidden="true" />
          Reset Statistics
        </Button>
      </div>

      {/* Stat Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className="rounded-2xl bg-surface-secondary/50 border border-border p-4 flex flex-col gap-3"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-semibold text-text-muted">{card.label}</span>
                <span
                  className={`inline-flex items-center justify-center w-8 h-8 rounded-lg border ${card.accent}`}
                >
                  <Icon className="w-4 h-4" aria-hidden="true" />
                </span>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-text-main">
                  {card.value}
                </div>
                <div className="text-xs text-text-muted mt-0.5">{card.sub}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Outcome Distribution Bar */}
      {totalGames > 0 && (
        <div className="space-y-2 pt-1">
          <div className="flex items-center justify-between text-xs font-semibold text-text-muted">
            <span>Outcome Distribution</span>
            <span>{totalGames} total matches</span>
          </div>
          <div className="h-3 w-full rounded-full bg-surface-secondary overflow-hidden flex">
            {xWinPct > 0 && (
              <div
                style={{ width: `${xWinPct}%` }}
                className="bg-player-x h-full"
                title={`Player X Wins: ${xWinPct}%`}
              />
            )}
            {oWinPct > 0 && (
              <div
                style={{ width: `${oWinPct}%` }}
                className="bg-player-o h-full"
                title={`Player O Wins: ${oWinPct}%`}
              />
            )}
            {cpuWinPct > 0 && (
              <div
                style={{ width: `${cpuWinPct}%` }}
                className="bg-danger h-full"
                title={`Computer Wins: ${cpuWinPct}%`}
              />
            )}
            {drawPct > 0 && (
              <div
                style={{ width: `${drawPct}%` }}
                className="bg-warning h-full"
                title={`Draws: ${drawPct}%`}
              />
            )}
          </div>
        </div>
      )}

      <ConfirmDialog
        isOpen={confirmResetOpen}
        onClose={() => setConfirmResetOpen(false)}
        onConfirm={onResetStatistics}
        title="Reset All Statistics?"
        message="This will permanently clear all recorded wins, draws, and win percentage counters. This action cannot be undone."
        confirmLabel="Reset Statistics"
      />
    </section>
  );
}

export default StatisticsPanel;


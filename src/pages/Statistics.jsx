import React from 'react';
import { ArrowLeft, Play } from 'lucide-react';
import Button from '../components/Button.jsx';
import StatisticsPanel from '../components/StatisticsPanel.jsx';
import HistoryPanel from '../components/HistoryPanel.jsx';

/**
 * Combined Statistics Dashboard and Match History Page.
 */
function Statistics({
  statistics,
  history,
  onResetStatistics,
  onClearHistory,
  onBackHome,
  onStartGame,
}) {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Button variant="secondary" size="sm" onClick={onBackHome}>
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          Back to Menu
        </Button>
        <Button size="sm" onClick={onStartGame}>
          <Play className="w-4 h-4 fill-current" aria-hidden="true" />
          Play a Match
        </Button>
      </div>

      <StatisticsPanel
        statistics={statistics}
        onResetStatistics={onResetStatistics}
      />

      <HistoryPanel history={history} onClearHistory={onClearHistory} />
    </div>
  );
}

export default Statistics;

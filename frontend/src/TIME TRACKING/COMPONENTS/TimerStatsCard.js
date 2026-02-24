import React from 'react';

const TimerStatsCard = ({ label, value, icon, highlightClass }) => {
  return (
    <div className={`tt-stat-card ${highlightClass || ''}`}>
      <p className="tt-stat-label">{label}</p>
      <div className="tt-stat-value-row">
        <span className={`tt-stat-value ${highlightClass || ''}`}>{value}</span>
        <span className="tt-icon">{icon}</span>
      </div>
    </div>
  );
};

export default TimerStatsCard;

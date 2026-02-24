import React from 'react';
import { formatTime } from '../COMPONENTS/FormatTime';

const TimerAlert = ({ sessionTime, taskName, clientName, handleStop }) => {
  return (
    <section className="tt-alert-bar">
      <span className="tt-icon tt-highlight-green">📄</span>
      <p className="tt-alert-text"><strong>{taskName}</strong> - {clientName} - Started at 10:30</p>
      <span className="tt-alert-timer">{formatTime(sessionTime)}</span>
      <span className="tt-stop-icon" onClick={handleStop}>⏹</span>
    </section>
  );
};

export default TimerAlert;

import React from 'react';
import { formatTime } from '../COMPONENTS/FormatTime';

const TabContent = ({ selectedTab, isRunning, sessionTime, handleStopTimer, handleStartTimer, todayHours }) => {
  const formatTodayHoursDisplay = formatTime(todayHours).slice(0, 5);

  switch (selectedTab) {
    case 'entries':
      return (
        <div className="tt-tab-content-area">
          <h2 className="tt-form-title">Time Entries</h2>
          <p className="tt-content-placeholder">**September 28, 2025**</p>
          <ul className="tt-time-entry-list">
            <li className="tt-time-entry-item">
              <span className="tt-entry-time">01:30:00</span> - Document Collection (ABC Partnership)
              <span className="tt-entry-edit" role="button" aria-label="Edit entry">✏️</span>
            </li>
            <li className="tt-time-entry-item">
              <span className="tt-entry-time">02:00:00</span> - Client Meeting (Project Titan)
              <span className="tt-entry-edit" role="button" aria-label="Edit entry">✏️</span>
            </li>
            <li className="tt-time-entry-total">
              Total: 3:30 (Billable: 3:30)
            </li>
          </ul>
          <button className="tt-action-button tt-pdf-button">+ Add Manual Entry</button>
        </div>
      );
    case 'reports':
      return (
        <div className="tt-tab-content-area">
          <h2 className="tt-form-title">Time Reports</h2>
          <p className="tt-content-placeholder">Select a filter to generate a report.</p>
          <div className="tt-form-grid tt-report-filters">
            <select className="tt-input-field"><option>Filter by Client</option></select>
            <select className="tt-input-field"><option>Filter by Project</option></select>
            <input className="tt-input-field" type="date" defaultValue="2025-09-01" />
          </div>
          <p className="tt-content-placeholder">**Last Report Summary (Q3 2025):** Total Hours: 450. Billable Rate: 95%.</p>
          <button className="tt-action-button tt-generate-report">Generate Report</button>
        </div>
      );
    case 'timer':
    default:
      return (
        <div className="tt-tab-content-area">
          <h2 className="tt-form-title">Start New Timer</h2>
          <div className="tt-form-grid">
            <div className="tt-form-group">
              <label className="tt-label" htmlFor="task-description">Task Description *</label>
              <input className="tt-input-field" type="text" id="task-description" placeholder="What are you working on?" />
            </div>
            <div className="tt-form-group">
              <label className="tt-label" htmlFor="client">Client *</label>
              <select className="tt-input-field" id="client"><option>Select client</option></select>
            </div>
            <div className="tt-form-group">
              <label className="tt-label" htmlFor="project">Project</label>
              <select className="tt-input-field" id="project"><option>Select project (optional)</option></select>
            </div>
            <div className="tt-form-group">
              <label className="tt-label" htmlFor="billing-type">Billing Type</label>
              <select className="tt-input-field" id="billing-type"><option>Billable</option></select>
            </div>
          </div>
          <button 
            className={`tt-timer-button ${isRunning ? 'tt-running-button' : ''}`}
            onClick={isRunning ? handleStopTimer : handleStartTimer}
          >
            <span className="tt-button-icon" role="img" aria-label="timer icon">{isRunning ? '⏹' : '▷'}</span>
            {isRunning ? `Timer Running (${formatTime(sessionTime)})` : 'Start Timer'}
          </button>
        </div>
      );
  }
};

export default TabContent;

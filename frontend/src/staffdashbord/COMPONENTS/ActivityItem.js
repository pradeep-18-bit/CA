import React from 'react';

export default function ActivityItem_staff({ text, time, status }) {
  return (
    <div className="deadline-dashboard-activity-item">
      <div>
        <div className="deadline-dashboard-activity-text">{text}</div>
        <div className="deadline-dashboard-activity-time">{time}</div>
      </div>
      <span className={`deadline-dashboard-activity-status deadline-dashboard-activity-status-${status}`}>{status}</span>
    </div>
  );
}

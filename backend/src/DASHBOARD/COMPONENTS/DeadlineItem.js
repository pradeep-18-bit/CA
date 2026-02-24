import React from 'react';

export default function DeadlineItem({ company, task, date, priority, color }) {
  return (
    <div className="deadline-dashboard-deadline-item">
      <div className="deadline-dashboard-deadline-company">{company}</div>
      <div className="deadline-dashboard-deadline-task">{task}</div>
      <div className="deadline-dashboard-deadline-row">
        <span className="deadline-dashboard-deadline-date" style={{ background: color }}>
          {date}
        </span>
        <span className="deadline-dashboard-deadline-priority" style={{ color }}>
          {priority}
        </span>
      </div>
    </div>
  );
}

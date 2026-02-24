import React from 'react';

export default function ExtraCardStaff({ title, value, subtitle }) {
  return (
    <div className="deadline-dashboard-card">
      <h4 className="deadline-dashboard-extra-title">{title}</h4>
      <div className="deadline-dashboard-extra-value">{value}</div>
      <div className="deadline-dashboard-extra-subtitle">{subtitle}</div>
    </div>
  );
}

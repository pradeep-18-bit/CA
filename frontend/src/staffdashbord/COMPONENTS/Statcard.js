import React from 'react';

export default function StatCardStaff({ label, value, subtitle, highlight }) {
  let valueClass = "";
  if (highlight === "error") valueClass = "deadline-dashboard-stat-error";
  if (highlight === "success") valueClass = "deadline-dashboard-stat-success";
  
  return (
    <div className="deadline-dashboard-card">
      <div style={{ fontSize: 13, color: "#6b7280" }}>{label}</div>
      <div className={valueClass} style={{ fontSize: 22, fontWeight: 700, marginTop: 6 }}>
        {value}
      </div>
      {subtitle && (
        <div style={{ fontSize: 12, color: "#6b7280", marginTop: 4 }}>{subtitle}</div>
      )}
    </div>
  );
}

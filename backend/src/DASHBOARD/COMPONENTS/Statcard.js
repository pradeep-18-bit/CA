import React from "react";

export default function StatCard({ label, value, subtitle, highlight }) {
  let valueClass = "";
  if (highlight === "error") valueClass = "deadline-dashboard-stat-error";
  if (highlight === "success") valueClass = "deadline-dashboard-stat-success";

  return (
    <div className="deadline-dashboard-card">
      {/* Label */}
      <div
        style={{
          fontSize: 13,
          color: "#000", // ✅ BLACK label
        }}
      >
        {label}
      </div>

      {/* Value */}
      <div
        className={valueClass}
        style={{
          fontSize: 22,
          fontWeight: 700,
          marginTop: 6,
          color: "#3b82f6", // ✅ LIGHT BLUE number
        }}
      >
        {value}
      </div>

      {/* Subtitle */}
      {subtitle && (
        <div
          style={{
            fontSize: 12,
            color: "#6b7280",
            marginTop: 4,
          }}
        >
          {subtitle}
        </div>
      )}
    </div>
  );
}

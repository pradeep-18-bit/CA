import React from "react";

export default function ExtraCard({ title, value, subtitle }) {
  return (
    <div className="deadline-dashboard-card">
      {/* Title */}
      <h4
        className="deadline-dashboard-extra-title"
        style={{ color: "#000" }} // ✅ BLACK title
      >
        {title}
      </h4>

      {/* Value */}
      <div
        className="deadline-dashboard-extra-value"
        style={{ color: "#3b82f6", fontWeight: 700 }} // ✅ LIGHT BLUE number
      >
        {value}
      </div>

      {/* Subtitle */}
      <div className="deadline-dashboard-extra-subtitle">
        {subtitle}
      </div>
    </div>
  );
}

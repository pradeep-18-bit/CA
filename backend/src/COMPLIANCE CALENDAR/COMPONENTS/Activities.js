import React from "react";

const Activities = ({ activities }) => {
  return (
    <div className="card activities-section">
      <h4 className="card-title">Recent Compliance Activities</h4>
      <hr className="divider" />
      {activities.map((a, idx) => (
        <div key={idx} className="activity-item">
          <div>
            <p className="activity-text">{a.text}</p>
            <p className="activity-time">{a.time}</p>
          </div>
          <span className={`status-badge status-${a.status}`}>{a.status}</span>
        </div>
      ))}
    </div>
  );
};

export default Activities;

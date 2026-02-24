import React from "react";

const UpcomingDeadlines = ({ upcomingDeadlines }) => {
  return (
    <div className="upcoming-section">
      <div className="card">
        <h4 className="card-title">Upcoming Deadlines</h4>
        <hr className="divider" />
        {upcomingDeadlines.length > 0 ? (
          upcomingDeadlines.map((d, idx) => (
            <div key={idx} className="deadline-item">
              <p className="deadline-company">{d.company}</p>
              <p className="deadline-task">{d.task}</p>
              <span className="deadline-badge" data-bgcolor={d.color}>
                {d.date.toDateString()}
              </span>
            </div>
          ))
        ) : (
          <p className="no-upcoming-deadlines">No upcoming deadlines</p>
        )}
      </div>
    </div>
  );
};

export default UpcomingDeadlines;

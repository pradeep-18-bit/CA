import React from "react";

const Counters = ({ deadlines, activities, today }) => {
  const cards = [
    {
      title: "Due Today",
      value: deadlines.filter((d) => d.date.toDateString() === today.toDateString()).length,
      color: "#dc2626",
      note: "Immediate attention required",
    },
    {
      title: "Due This Week",
      value: deadlines.filter((d) => {
        const diff = (d.date - today) / (1000 * 60 * 60 * 24);
        return diff >= 0 && diff <= 7;
      }).length,
      color: "#f59e0b",
      note: "Upcoming deadlines",
    },
    {
      title: "Completed",
      value: activities.filter((a) => a.status === "completed").length,
      color: "#16a34a",
      note: "This month",
    },
    {
      title: "Total Pending",
      value: deadlines.length,
      color: "#111827",
      note: "Across all clients",
    },
  ];

  return (
    <div className="counters-grid">
      {cards.map((c, idx) => (
        <div key={idx} className="counter-card">
          <h4 className="counter-title" data-color={c.color}>{c.title}</h4>
          <p className="counter-value" data-color={c.color}>{c.value}</p>
          <p className="counter-note">{c.note}</p>
        </div>
      ))}
    </div>
  );
};

export default Counters;

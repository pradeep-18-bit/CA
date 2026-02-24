import React from "react";

const CalendarView = ({
  deadlines,
  currentMonth,
  currentYear,
  selectedDate,
  setSelectedDate,
  changeMonth,
  filter,
  setFilter,
}) => {
  const today = new Date();
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  return (
    <div className="card calendar-section">
      <div className="calendar-header">
        <button onClick={() => changeMonth("prev")} className="nav-btn">{"<"}</button>
        <h3 className="calendar-title">
          {new Date(currentYear, currentMonth).toLocaleString("default", { month: "long" })} {currentYear}
        </h3>
        <button onClick={() => changeMonth("next")} className="nav-btn">{">"}</button>
      </div>

      <div className="filter-section">
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="form-select">
          <option value="">All Deadlines</option>
          <option value="GST">GST</option>
          <option value="TDS">TDS</option>
          <option value="ITR">ITR</option>
          <option value="ROC">ROC</option>
          <option value="Audit">Audit</option>
        </select>
      </div>

      <div className="weekdays-grid">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      <div className="calendar-grid">
        {Array.from({ length: firstDay }).map((_, i) => (
          <div key={"empty" + i}></div>
        ))}
        {Array.from({ length: daysInMonth }, (_, i) => {
          const dateNum = i + 1;
          const dateObj = new Date(currentYear, currentMonth, dateNum);
          const deadlinesForDate = deadlines.filter(
            (d) =>
              d.date.getDate() === dateNum &&
              d.date.getMonth() === currentMonth &&
              d.date.getFullYear() === currentYear
          );
          const isToday =
            dateNum === today.getDate() &&
            currentMonth === today.getMonth() &&
            currentYear === today.getFullYear();
          const isSelected = selectedDate && dateObj.toDateString() === selectedDate.toDateString();

          return (
            <div
              key={i}
              onClick={() => setSelectedDate(dateObj)}
              className={`calendar-day ${isToday ? "day-today" : ""} ${isSelected ? "day-selected" : ""}`}
            >
              {dateNum}
              {deadlinesForDate.length > 0 && (
                <div
                  className="deadline-dot"
                  style={{ backgroundColor: deadlinesForDate[0].color }}
                  title={deadlinesForDate.map((d) => `${d.company}: ${d.task}`).join("\n")}
                ></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarView;

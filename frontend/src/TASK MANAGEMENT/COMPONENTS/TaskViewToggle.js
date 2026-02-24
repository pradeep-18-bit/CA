
import React from "react";
export default function TaskViewToggle({ view, setView }) {
  return (
    <div className="tm-toggleRow">
      <div className="tm-toggleView">

        <button
          className={view === "kanban" ? "tm-activeTab" : "tm-inactiveTab"}
          onClick={() => setView("kanban")}
        >
          Kanban Board
        </button>

        <button
          className={view === "list" ? "tm-activeTab" : "tm-inactiveTab"}
          onClick={() => setView("list")}
        >
          List View
        </button>

      </div>
    </div>
  );
}


import React from "react";
import { FaCheckSquare, FaClock, FaFlag, FaCheck } from "react-icons/fa";

export default function TaskStats({ tasks }) {
  return (
    <div className="tm-statsContainer">
      {/* TOTAL */}
      <div className="tm-statBox">
        <div>
          <span>Total Tasks</span>
          <h3>{tasks.length}</h3>
        </div>
        <FaCheckSquare className="tm-icon tm-total" />
      </div>

      {/* IN PROGRESS */}
      <div className="tm-statBox">
        <div>
          <span>In Progress</span>
          <h3>{tasks.filter((t) => t.status === "In Progress").length}</h3>
        </div>
        <FaClock className="tm-icon tm-inprogress" />
      </div>

      {/* REVIEW */}
      <div className="tm-statBox">
        <div>
          <span>Pending Review</span>
          <h3>{tasks.filter((t) => t.status === "Review").length}</h3>
        </div>
        <FaFlag className="tm-icon tm-review" />
      </div>

      {/* COMPLETED */}
      <div className="tm-statBox">
        <div>
          <span>Completed</span>
          <h3>{tasks.filter((t) => t.status === "Completed").length}</h3>
        </div>
        <FaCheck className="tm-icon tm-completed" />
      </div>
    </div>
  );
}

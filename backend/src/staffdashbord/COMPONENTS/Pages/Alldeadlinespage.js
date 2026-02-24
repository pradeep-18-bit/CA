import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AllDeadlinesPage_staff() {
  const navigate = useNavigate();
  const THEME_COLOR = "#073D7F";

  const API_BASE =
    "https://posthemorrhagic-nonequilaterally-caroline.ngrok-free.dev/api/ComplianceCalendar";

  const [deadlines, setDeadlines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  // Fetch all deadlines from API
  useEffect(() => {
    const fetchAllDeadlines = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(API_BASE, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "ngrok-skip-browser-warning": "true",
          },
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();

        // Map API data without changing any backend data
        const mapped = data
          .filter((item) => item.status !== "Completed") // same rule as before
          .map((item, index) => {
            const deadlineDate = item.deadline ? new Date(item.deadline) : null;
            const dueDateStr = deadlineDate
              ? deadlineDate.toISOString().slice(0, 10)
              : "";

            // UI change only:
            // Medium Priority → Pending
            const fixedStatus =
              item.status === "Medium Priority" ? "Pending" : item.status;

            return {
              id: item.complianceId ?? item.id ?? index + 1,
              task: item.taskDescription || item.task || "Compliance Task",
              assignee: item.companyName || "—",
              dueDate: dueDateStr,
              status: fixedStatus || "Pending",
            };
          });

        setDeadlines(mapped);
      } catch (err) {
        console.error("Error fetching all deadlines:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAllDeadlines();
  }, []);

  // Pagination logic (same as before)
  const totalPages = Math.ceil(deadlines.length / rowsPerPage);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = deadlines.slice(indexOfFirstRow, indexOfLastRow);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div
      style={{
        padding: "10px 40px 40px 40px",
        position: "relative",
        minHeight: "100vh",
        backgroundColor: "#f9fbfd",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {/* Back Button */}
      <button
        onClick={() => navigate("/DeadlineDashboard")}
        style={{
          position: "absolute",
          top: "15px",
          right: "20px",
          backgroundColor: THEME_COLOR,
          color: "#fff",
          border: "none",
          borderRadius: "50%",
          width: "40px",
          height: "40px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "18px",
          fontWeight: "bold",
        }}
      >
        ←
      </button>

      {/* Page Header */}
      <h2 style={{ color: THEME_COLOR }}>All Deadlines</h2>
      <p style={{ marginTop: 0, marginBottom: 8, color: "#555" }}>
        Here is the full list of deadlines.
      </p>

      {loading && <p style={{ color: THEME_COLOR }}>Loading deadlines…</p>}
      {error && <p style={{ color: "red" }}>Failed to load: {error}</p>}

      {/* Table */}
      <div
        style={{
          background: "#fff",
          borderRadius: "10px",
          boxShadow: "0 3px 8px rgba(0,0,0,0.05)",
          overflow: "hidden",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            textAlign: "left",
          }}
        >
          <thead style={{ background: THEME_COLOR, color: "#fff" }}>
            <tr>
              <th style={{ padding: "10px 16px" }}>ID</th>
              <th style={{ padding: "10px 16px" }}>Task</th>
              <th style={{ padding: "10px 16px" }}>Assignee</th>
              <th style={{ padding: "10px 16px" }}>Due Date</th>
              <th style={{ padding: "10px 16px" }}>Status</th>
            </tr>
          </thead>

          <tbody>
            {currentRows.map((item, idx) => (
              <tr
                key={item.id}
                style={{
                  background: idx % 2 === 0 ? "#f7faff" : "#fff",
                }}
              >
                <td style={{ padding: "10px 16px" }}>{item.id}</td>
                <td style={{ padding: "10px 16px" }}>{item.task}</td>
                <td style={{ padding: "10px 16px" }}>{item.assignee}</td>
                <td style={{ padding: "10px 16px" }}>{item.dueDate}</td>

                <td
                  style={{
                    padding: "10px 16px",
                    color:
                      item.status === "In Progress"
                        ? "#f39c12"
                        : item.status === "Pending"
                        ? "red"
                        : "#2c3e50",
                    fontWeight: item.status === "In Progress" ? "bold" : "normal",
                  }}
                >
                  {item.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination – circular buttons (original design restored) */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 12,
          marginTop: 20,
        }}
      >
        {/* Prev */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          style={{
            width: 42,
            height: 42,
            borderRadius: "50%",
            border: "none",
            backgroundColor: currentPage === 1 ? "#ccc" : THEME_COLOR,
            color: "#fff",
            cursor: currentPage === 1 ? "not-allowed" : "pointer",
          }}
        >
          ‹
        </button>

        {/* Numbers */}
        {Array.from({ length: totalPages }).map((_, index) => {
          const pg = index + 1;
          const isActive = pg === currentPage;

          return (
            <button
              key={pg}
              onClick={() => handlePageChange(pg)}
              style={{
                width: 42,
                height: 42,
                borderRadius: "50%",
                backgroundColor: isActive ? THEME_COLOR : "#fff",
                border: `1px solid ${THEME_COLOR}`,
                color: isActive ? "#fff" : THEME_COLOR,
                fontWeight: isActive ? "bold" : "normal",
              }}
            >
              {pg}
            </button>
          );
        })}

        {/* Next */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          style={{
            width: 42,
            height: 42,
            borderRadius: "50%",
            border: "none",
            backgroundColor: currentPage === totalPages ? "#ccc" : THEME_COLOR,
            color: "#fff",
            cursor: currentPage === totalPages ? "not-allowed" : "pointer",
          }}
        >
          ›
        </button>
      </div>
    </div>
  );
}

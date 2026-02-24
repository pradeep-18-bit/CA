import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

export default function DueTodayPageStaff() {
  const navigate = useNavigate();

  const [dueTodayTasks, setDueTodayTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_BASE =
    "https://posthemorrhagic-nonequilaterally-caroline.ngrok-free.dev/api/ComplianceCalendar";

  // ✔ FIXED — headers moved INSIDE useCallback
  const loadDueToday = useCallback(async () => {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
    };

    try {
      const res = await fetch(API_BASE, {
        method: "GET",
        headers,
      });

      const data = await res.json();

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const filtered = data.filter((item) => {
        const d = new Date(item.deadline);
        d.setHours(0, 0, 0, 0);
        return d.getTime() === today.getTime();
      });

      const mapped = filtered.map((item, idx) => ({
        id: item.id || item._id || idx + 1,
        title: item.taskDescription || item.task,
        assignee: item.companyName,
        deadline: "Today",
        status: item.status || "Pending",
      }));

      setDueTodayTasks(mapped);
    } catch (err) {
      console.error("❌ Due Today API Error:", err);
    } finally {
      setLoading(false);
    }
  }, [API_BASE]); // ✔ headers removed (now safe)

  // ✔ FIXED — no warnings
  useEffect(() => {
    loadDueToday();
  }, [loadDueToday]);

  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 10;

  const totalPages = Math.ceil(dueTodayTasks.length / tasksPerPage);

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;

  const currentTasks = dueTodayTasks.slice(indexOfFirstTask, indexOfLastTask);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div
      style={{
        padding: "30px 40px",
        backgroundColor: "#f9fbfd",
        minHeight: "100vh",
        fontFamily: "Inter, sans-serif",
        position: "relative",
      }}
    >
      <button
        onClick={() => navigate("/DeadlineDashboard")}
        style={{
          position: "absolute",
          top: "20px",
          right: "25px",
          backgroundColor: "#073D7F",
          color: "#fff",
          border: "none",
          borderRadius: "50%",
          width: "42px",
          height: "42px",
        }}
      >
        ←
      </button>

      <h2
        style={{
          color: "#073D7F",
          fontSize: "26px",
          fontWeight: "700",
          marginBottom: "8px",
        }}
      >
        Due Today
      </h2>

      <p style={{ color: "#555", fontSize: "15px", marginBottom: "20px" }}>
        All filings, tasks, and deadlines that must be completed today.
      </p>

      {loading ? (
        <p style={{ fontSize: "18px", color: "#073D7F" }}>Loading...</p>
      ) : (
        <>
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
              <thead style={{ background: "#073D7F", color: "#fff" }}>
                <tr>
                  <th style={{ padding: "10px 16px" }}>ID</th>
                  <th style={{ padding: "10px 16px" }}>Title</th>
                  <th style={{ padding: "10px 16px" }}>Assignee</th>
                  <th style={{ padding: "10px 16px" }}>Deadline</th>
                  <th style={{ padding: "10px 16px" }}>Status</th>
                </tr>
              </thead>

              <tbody>
                {currentTasks.map((task, i) => (
                  <tr
                    key={task.id}
                    style={{
                      background: i % 2 === 0 ? "#f7faff" : "#fff",
                    }}
                  >
                    <td style={{ padding: "10px 16px" }}>{task.id}</td>
                    <td style={{ padding: "10px 16px" }}>{task.title}</td>
                    <td style={{ padding: "10px 16px" }}>{task.assignee}</td>
                    <td style={{ padding: "10px 16px" }}>{task.deadline}</td>
                    <td
                      style={{
                        padding: "10px 16px",
                        color:
                          task.status === "Completed"
                            ? "green"
                            : task.status === "In Progress"
                            ? "#f39c12"
                            : "red",
                        fontWeight: "600",
                      }}
                    >
                      {task.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "30px",
              gap: "12px",
            }}
          >
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              style={{
                backgroundColor: "#073D7F",
                color: "#fff",
                borderRadius: "50%",
                width: "42px",
                height: "42px",
              }}
            >
              ‹
            </button>

            {[...Array(totalPages)].map((_, index) => {
              const pageNum = index + 1;
              const isActive = pageNum === currentPage;

              return (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  style={{
                    width: "42px",
                    height: "42px",
                    borderRadius: "50%",
                    border: "1px solid #073D7F",
                    backgroundColor: isActive ? "#073D7F" : "#fff",
                    color: isActive ? "#fff" : "#073D7F",
                  }}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              style={{
                backgroundColor: "#073D7F",
                color: "#fff",
                borderRadius: "50%",
                width: "42px",
                height: "42px",
              }}
            >
              ›
            </button>
          </div>
        </>
      )}
    </div>
  );
}

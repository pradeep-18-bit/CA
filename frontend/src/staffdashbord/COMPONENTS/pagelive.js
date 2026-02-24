import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
 
export default function LiveTasksPage_staff() {
  const navigate = useNavigate();
 
  // -----------------------------
  // API DATA STATES
  // -----------------------------
  const [liveTasks, setLiveTasks] = useState([]);
  const [loading, setLoading] = useState(true);
 
  const API_TASKS =
    "https://posthemorrhagic-nonequilaterally-caroline.ngrok-free.dev/api/tasks";
 
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "true",
  };
 
  // -----------------------------
  // LOAD LIVE TASKS FROM API
  // -----------------------------
  const loadTasks = async () => {
    try {
      const res = await fetch(API_TASKS, {
        method: "GET",
        headers,
      });
 
      const data = await res.json();
 
      // ⭐ MAP API → YOUR LIVE TASK TABLE FORMAT
      const mapped = data.map((task) => ({
        id: task.id,
        title: task.taskName,
        assignee: task.assignedTo,
        deadline: task.dueDate || "Ongoing",
        status: task.status,
      }));
 
      setLiveTasks(mapped);
    } catch (err) {
      console.log("TASK LOAD ERROR:", err);
    } finally {
      setLoading(false);
    }
  };
 
  useEffect(() => {
    loadTasks();
  }, []);
 
  // -----------------------------
  // PAGINATION LOGIC (DYNAMIC)
  // -----------------------------
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 10;
 
  const totalPages = Math.ceil(liveTasks.length / tasksPerPage);
 
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
 
  const currentTasks = liveTasks.slice(indexOfFirstTask, indexOfLastTask);
 
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
      {/* Back Button */}
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
          cursor: "pointer",
          fontSize: "18px",
          fontWeight: "bold",
          boxShadow: "0 3px 8px rgba(0,0,0,0.1)",
          transition: "transform 0.2s ease, background-color 0.2s ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#0a4e9b")}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#073D7F")}
      >
        ←
      </button>
 
      {/* Header */}
      <h2
        style={{
          color: "#073D7F",
          fontSize: "26px",
          fontWeight: "700",
          marginBottom: "8px",
        }}
      >
        Live Tasks
      </h2>
      <p style={{ color: "#555", fontSize: "15px", marginBottom: "20px" }}>
        All ongoing activities and real-time monitored tasks.
      </p>
 
      {/* Loading */}
      {loading ? (
        <p style={{ fontSize: "18px", color: "#073D7F" }}>Loading...</p>
      ) : (
        <>
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
                      transition: "background 0.2s ease",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = "#eef4ff")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background =
                        i % 2 === 0 ? "#f7faff" : "#fff")
                    }
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
              alignItems: "center",
              marginTop: "30px",
              gap: "12px",
            }}
          >
            {/* Previous Button */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              style={{
                backgroundColor: "#073D7F",
                color: "#fff",
                border: "none",
                borderRadius: "50%",
                width: "42px",
                height: "42px",
                cursor: currentPage === 1 ? "not-allowed" : "pointer",
                opacity: currentPage === 1 ? 0.5 : 1,
                fontSize: "18px",
                fontWeight: "bold",
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                if (currentPage !== 1)
                  e.currentTarget.style.transform = "scale(1.1)";
              }}
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              ‹
            </button>
 
            {/* Page Numbers */}
            {[...Array(totalPages)].map((_, idx) => {
              const pageNum = idx + 1;
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
                    cursor: "pointer",
                    fontSize: "15px",
                    fontWeight: isActive ? "700" : "500",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: isActive
                      ? "0 3px 8px rgba(7,61,127,0.3)"
                      : "none",
                    transition: "all 0.25s ease",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive)
                      e.currentTarget.style.backgroundColor = "#eef3ff";
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive)
                      e.currentTarget.style.backgroundColor = "#fff";
                  }}
                >
                  {pageNum}
                </button>
              );
            })}
 
            {/* Next Button */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              style={{
                backgroundColor: "#073D7F",
                color: "#fff",
                border: "none",
                borderRadius: "50%",
                width: "42px",
                height: "42px",
                cursor:
                  currentPage === totalPages ? "not-allowed" : "pointer",
                opacity: currentPage === totalPages ? 0.5 : 1,
                fontSize: "18px",
                fontWeight: "bold",
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                if (currentPage !== totalPages)
                  e.currentTarget.style.transform = "scale(1.1)";
              }}
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              ›
            </button>
          </div>
        </>
      )}
    </div>
  );
}
 

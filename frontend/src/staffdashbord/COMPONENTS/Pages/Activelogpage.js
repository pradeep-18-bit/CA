import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ViewActivityLogPage_staff() {
  const navigate = useNavigate();
  const THEME_COLOR = "#073D7F";

  const API_BASE =
    "https://posthemorrhagic-nonequilaterally-caroline.ngrok-free.dev/api/ComplianceCalendar";

  const [activityLogs, setActivityLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  useEffect(() => {
    const fetchLogs = async () => {
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

        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        const data = await res.json();

        const mapped = data.map((item, index) => {
          const deadlineDate = item.deadline ? new Date(item.deadline) : null;
          const formattedTs = deadlineDate
            ? deadlineDate.toLocaleString("en-IN", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })
            : "";

          return {
            id: item.complianceId ?? item.id ?? index + 1,
            user: item.companyName || `Client ${index + 1}`,
            action: item.taskDescription || "Compliance Task",
            timestamp: formattedTs,
            status: item.status || "Pending",
          };
        });

        setActivityLogs(mapped);

        // ⭐ SEND COUNT TO DASHBOARD
        window.dispatchEvent(
          new CustomEvent("activityCount", {
            detail: mapped.length,
          })
        );
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  const totalPages = Math.ceil(activityLogs.length / rowsPerPage);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = activityLogs.slice(indexOfFirstRow, indexOfLastRow);

  return (
    <div
      style={{
        padding: "15px 40px 40px 40px",
        position: "relative",
        minHeight: "100vh",
        backgroundColor: "#f9fbfd",
        fontFamily: "Inter, sans-serif",
      }}
    >
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
          width: "42px",
          height: "42px",
          cursor: "pointer",
        }}
      >
        ←
      </button>

      <h2 style={{ marginTop: "5px", color: THEME_COLOR }}>Activity Log</h2>
      <p style={{ marginTop: 0, color: "#555" }}>
        Track all user activities and timeline events.
      </p>

      {loading && <p style={{ color: THEME_COLOR }}>Loading activity log…</p>}
      {error && <p style={{ color: "red" }}>Failed to load: {error}</p>}

      <div
        style={{
          background: "#fff",
          borderRadius: "10px",
          boxShadow: "0 3px 8px rgba(0,0,0,0.05)",
          overflow: "hidden",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead style={{ background: THEME_COLOR, color: "#fff" }}>
            <tr>
              <th style={{ padding: "10px 16px" }}>ID</th>
              <th style={{ padding: "10px 16px" }}>User</th>
              <th style={{ padding: "10px 16px" }}>Action</th>
              <th style={{ padding: "10px 16px" }}>Timestamp</th>
              <th style={{ padding: "10px 16px" }}>Status</th>
            </tr>
          </thead>

          <tbody>
            {currentRows.map((log, idx) => (
              <tr
                key={log.id}
                style={{
                  background: idx % 2 === 0 ? "#f7faff" : "#fff",
                }}
              >
                <td style={{ padding: 10 }}>{log.id}</td>
                <td style={{ padding: 10 }}>{log.user}</td>
                <td style={{ padding: 10 }}>{log.action}</td>
                <td style={{ padding: 10 }}>{log.timestamp}</td>
                <td
                  style={{
                    padding: 10,
                    fontWeight: 600,
                    color:
                      log.status.toLowerCase() === "completed"
                        ? "green"
                        : log.status.toLowerCase() === "in progress"
                        ? "#f39c12"
                        : log.status.toLowerCase() === "pending"
                        ? "red"
                        : "#2c3e50",
                  }}
                >
                  {log.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div
        style={{
          marginTop: 22,
          display: "flex",
          justifyContent: "center",
          gap: 12,
        }}
      >
        <button
          onClick={() => setCurrentPage((p) => p - 1)}
          disabled={currentPage === 1}
          style={{
            width: 42,
            height: 42,
            borderRadius: "50%",
            backgroundColor: currentPage === 1 ? "#ccc" : THEME_COLOR,
            color: "#fff",
            border: "none",
          }}
        >
          ‹
        </button>

        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            style={{
              width: 42,
              height: 42,
              borderRadius: "50%",
              border: `1px solid ${THEME_COLOR}`,
              backgroundColor: currentPage === i + 1 ? THEME_COLOR : "#fff",
              color: currentPage === i + 1 ? "#fff" : THEME_COLOR,
            }}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage((p) => p + 1)}
          disabled={currentPage === totalPages}
          style={{
            width: 42,
            height: 42,
            borderRadius: "50%",
            backgroundColor: currentPage === totalPages ? "#ccc" : THEME_COLOR,
            color: "#fff",
            border: "none",
          }}
        >
          ›
        </button>
      </div>
    </div>
  );
}

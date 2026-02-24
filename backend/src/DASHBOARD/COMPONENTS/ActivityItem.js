import React, { useState, useEffect } from "react";

export default function ViewRecentActivitiesPage() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_BASE =
    "https://posthemorrhagic-nonequilaterally-caroline.ngrok-free.dev/api/ComplianceCalendar";

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "true",
  };

  // ------------------------------------------
  // LOAD ACTIVITY LOGS
  // ------------------------------------------
  useEffect(() => {
    const loadActivities = async () => {
      setLoading(true);
      try {
        const res = await fetch(API_BASE, { method: "GET", headers });
        const data = await res.json();

        const mapped = data.map((item, idx) => {
          const deadlineDate = item.deadline
            ? new Date(item.deadline)
            : null;

          // ✅ DATE ONLY (NO TIME)
          const formattedDate = deadlineDate
            ? deadlineDate.toLocaleDateString("en-IN", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })
            : "";

          return {
            id: item.complianceId ?? item.id ?? idx + 1,
            user: item.companyName || `Client ${idx + 1}`,
            action: item.taskDescription || "Compliance Task",
            timestamp: formattedDate,
            status: item.status || "Pending",
          };
        });

        setActivities(mapped.reverse()); // Recent first
      } catch (err) {
        console.log("ACTIVITY LOAD ERROR:", err);
      } finally {
        setLoading(false);
      }
    };

    loadActivities();
  }, []);

  // ------------------------------------------
  // PAGINATION LOGIC
  // ------------------------------------------
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const totalPages = Math.ceil(activities.length / rowsPerPage);

  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;

  const currentRows = activities.slice(indexOfFirst, indexOfLast);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const THEME = "#073D7F";

  const getStatusColor = (status) => {
    if (!status) return "#6b7280";

    switch (status.toLowerCase()) {
      case "completed":
        return "#16a34a";
      case "in progress":
        return "#f59e0b";
      case "pending":
        return "#ef4444";
      default:
        return "#3b82f6";
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
      {/* BACK BUTTON */}
      <button
        onClick={() => window.history.back()}
        style={{
          position: "absolute",
          top: "20px",
          right: "25px",
          backgroundColor: THEME,
          color: "#fff",
          border: "none",
          borderRadius: "50%",
          width: "42px",
          height: "42px",
          cursor: "pointer",
          fontSize: "18px",
          fontWeight: "bold",
          boxShadow: "0 3px 8px rgba(0,0,0,0.1)",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#0a4e9b")}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = THEME)}
      >
        ←
      </button>

      {/* PAGE TITLE */}
      <h2
        style={{
          color: THEME,
          fontSize: "26px",
          fontWeight: "700",
          marginBottom: "8px",
        }}
      >
        Recent Activity
      </h2>
      <p style={{ color: "#555", fontSize: "15px", marginBottom: "20px" }}>
        Latest compliance actions and activity records.
      </p>

      {/* LOADING */}
      {loading ? (
        <p style={{ fontSize: "18px", color: THEME }}>Loading...</p>
      ) : (
        <>
          {/* TABLE */}
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
              <thead style={{ background: THEME, color: "#fff" }}>
                <tr>
                  <th style={{ padding: "10px 16px" }}>ID</th>
                  <th style={{ padding: "10px 16px" }}>User</th>
                  <th style={{ padding: "10px 16px" }}>Action</th>
                  <th style={{ padding: "10px 16px" }}>Date</th>
                  <th style={{ padding: "10px 16px" }}>Status</th>
                </tr>
              </thead>

              <tbody>
                {currentRows.length > 0 ? (
                  currentRows.map((row, i) => (
                    <tr
                      key={row.id}
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
                      <td style={{ padding: "10px 16px", fontWeight: "600" }}>
                        {row.id}
                      </td>
                      <td style={{ padding: "10px 16px" }}>{row.user}</td>
                      <td style={{ padding: "10px 16px" }}>{row.action}</td>
                      <td style={{ padding: "10px 16px" }}>{row.timestamp}</td>
                      <td style={{ padding: "10px 16px" }}>
                        <div
                          style={{
                            display: "inline-block",
                            padding: "4px 8px",
                            borderRadius: "4px",
                            backgroundColor: `${getStatusColor(
                              row.status
                            )}20`,
                            color: getStatusColor(row.status),
                            fontWeight: "600",
                            fontSize: "12px",
                          }}
                        >
                          {row.status}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      style={{
                        padding: "20px",
                        textAlign: "center",
                        color: "#999",
                      }}
                    >
                      No activity found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "30px",
                gap: "12px",
              }}
            >
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                style={{
                  backgroundColor: THEME,
                  color: "#fff",
                  border: "none",
                  borderRadius: "50%",
                  width: "42px",
                  height: "42px",
                  cursor: currentPage === 1 ? "not-allowed" : "pointer",
                  opacity: currentPage === 1 ? 0.5 : 1,
                  fontSize: "18px",
                }}
              >
                ‹
              </button>

              {[...Array(totalPages)].map((_, i) => {
                const pageNum = i + 1;
                const isActive = pageNum === currentPage;

                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    style={{
                      width: "42px",
                      height: "42px",
                      borderRadius: "50%",
                      border: `1px solid ${THEME}`,
                      backgroundColor: isActive ? THEME : "#fff",
                      color: isActive ? "#fff" : THEME,
                      cursor: "pointer",
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
                  backgroundColor: THEME,
                  color: "#fff",
                  border: "none",
                  borderRadius: "50%",
                  width: "42px",
                  height: "42px",
                  cursor:
                    currentPage === totalPages ? "not-allowed" : "pointer",
                  opacity: currentPage === totalPages ? 0.5 : 1,
                  fontSize: "18px",
                }}
              >
                ›
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function UpcomingDeadlinesPage() {
  const navigate = useNavigate();

  const [deadlines, setDeadlines] = useState([]);
  const [loading, setLoading] = useState(true);

  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    role: "",
  });

  const API_BASE =
    "https://posthemorrhagic-nonequilaterally-caroline.ngrok-free.dev/api/ComplianceCalendar";

  const headers = {
    Accept: "application/json",
    "ngrok-skip-browser-warning": "true",
  };

  // --------------------------------------------------
  // 1) Load logged-in user from localStorage
  // --------------------------------------------------
  useEffect(() => {
    try {
      let name = "";
      let email = "";
      let role = "";

      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const u = JSON.parse(storedUser);
        name = u.fullName || u.name || u.userName || u.username || name;
        email = u.emailAddress || u.email || u.userEmail || email;
        role = u.role || u.userRole || role;
      }

      const storedEmail = localStorage.getItem("email");
      if (!email && storedEmail) email = storedEmail;

      const storedRole = localStorage.getItem("role");
      if (!role && storedRole) role = storedRole;

      if (!name && email) name = email.split("@")[0];

      setUserInfo({
        name,
        email,
        role: (role || "").toLowerCase(),
      });
    } catch (err) {
      console.error("USER LOAD ERROR:", err);
      setUserInfo({ name: "", email: "", role: "" });
    }
  }, []);

  // --------------------------------------------------
  // 2) Fetch all deadlines (except Completed)
  // --------------------------------------------------
  useEffect(() => {
    const fetchAllDeadlines = async () => {
      setLoading(true);

      try {
        const res = await fetch(API_BASE, {
          method: "GET",
          headers,
        });

        const data = await res.json();

        let filtered = data.filter((d) => d.status !== "Completed");

        const isAdmin = userInfo.role === "admin";

        if (!isAdmin) {
          const emailLower = (userInfo.email || "").toLowerCase();
          const nameLower = (userInfo.name || "").toLowerCase();

          filtered = filtered.filter((d) => {
            const dEmail = (d.assignedToEmail || d.ownerEmail || "").toLowerCase();
            const dName = (d.assignedTo || d.assignedUser || "").toLowerCase();

            return (
              (emailLower && dEmail === emailLower) ||
              (nameLower && dName === nameLower)
            );
          });
        }

        const mapped = filtered.map((item, index) => {
          const due = item.deadline ? new Date(item.deadline) : null;
          const dueStr = due ? due.toISOString().slice(0, 10) : "";

          const fixedStatus =
            item.status === "Medium Priority" ? "Pending" : item.status;

          return {
            id: item.complianceId ?? item.id ?? index + 1,
            title: item.taskDescription || item.task || "Compliance Task",
            assignee:
              item.assignedTo ||
              item.assignedUser ||
              item.companyName ||
              "—",
            dueDate: dueStr,
            status: fixedStatus || "Pending",
          };
        });

        setDeadlines(mapped);
      } catch (err) {
        console.error("DEADLINE LOAD ERROR:", err);
      } finally {
        setLoading(false);
      }
    };

    if (userInfo.email || userInfo.name || userInfo.role) {
      fetchAllDeadlines();
    }
  }, [userInfo]);

  // --------------------------------------------------
  // Pagination
  // --------------------------------------------------
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const totalPages = Math.ceil(deadlines.length / rowsPerPage);
  const currentRows = deadlines.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  /* ✅ ROW CLICK → COMPLIANCE PAGE */
  const handleRowClick = (deadlineId) => {
    navigate("/compliance", {
      state: { fromUpcomingDeadlineId: deadlineId },
    });
  };

  const isAdmin = userInfo.role === "admin";
  const displayName = userInfo.name || userInfo.email || "current user";

  const getStatusColor = (status) => {
    if (!status) return "#6b7280";
    switch (status.toLowerCase()) {
      case "in progress":
        return "#f59e0b";
      case "pending":
        return "#ef4444";
      case "review":
        return "#8b5cf6";
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
      {/* Back Button */}
      <button
        onClick={() => window.history.back()}
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
        }}
      >
        ←
      </button>

      <h2 style={{ color: "#073D7F", fontSize: "26px", fontWeight: "700" }}>
        Upcoming Deadlines
      </h2>

      <p style={{ color: "#555", fontSize: "15px", marginBottom: "20px" }}>
        {isAdmin
          ? "All upcoming deadlines"
          : `Deadlines related to ${displayName}`}
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
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead style={{ background: "#073D7F", color: "#fff" }}>
                <tr>
                  <th style={{ padding: "10px 16px" }}>ID</th>
                  <th style={{ padding: "10px 16px" }}>Task</th>
                  <th style={{ padding: "10px 16px" }}>Assignee</th>
                  <th style={{ padding: "10px 16px" }}>Due Date</th>
                  <th style={{ padding: "10px 16px" }}>Status</th>
                </tr>
              </thead>

              <tbody>
                {currentRows.length > 0 ? (
                  currentRows.map((item, i) => (
                    <tr
                      key={item.id}
                      onClick={() => handleRowClick(item.id)}
                      style={{
                        cursor: "pointer",
                        background: i % 2 === 0 ? "#f7faff" : "#fff",
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
                        {item.id}
                      </td>
                      <td style={{ padding: "10px 16px" }}>{item.title}</td>
                      <td style={{ padding: "10px 16px" }}>{item.assignee}</td>
                      <td style={{ padding: "10px 16px" }}>{item.dueDate}</td>
                      <td style={{ padding: "10px 16px" }}>
                        <div
                          style={{
                            display: "inline-block",
                            padding: "4px 8px",
                            borderRadius: "4px",
                            backgroundColor: `${getStatusColor(
                              item.status
                            )}20`,
                            color: getStatusColor(item.status),
                            fontWeight: "600",
                            fontSize: "12px",
                          }}
                        >
                          {item.status}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" style={{ padding: "20px", textAlign: "center" }}>
                      {isAdmin
                        ? "No upcoming deadlines."
                        : `No deadlines for ${displayName}`}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
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
                  width: "42px",
                  height: "42px",
                  borderRadius: "50%",
                  border: "none",
                  opacity: currentPage === 1 ? 0.5 : 1,
                }}
              >
                ‹
              </button>

              {[...Array(totalPages)].map((_, idx) => (
                <button
                  key={idx + 1}
                  onClick={() => handlePageChange(idx + 1)}
                  style={{
                    width: "42px",
                    height: "42px",
                    borderRadius: "50%",
                    border: "1px solid #073D7F",
                    backgroundColor:
                      currentPage === idx + 1 ? "#073D7F" : "#fff",
                    color:
                      currentPage === idx + 1 ? "#fff" : "#073D7F",
                  }}
                >
                  {idx + 1}
                </button>
              ))}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                style={{
                  backgroundColor: "#073D7F",
                  color: "#fff",
                  width: "42px",
                  height: "42px",
                  borderRadius: "50%",
                  border: "none",
                  opacity: currentPage === totalPages ? 0.5 : 1,
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

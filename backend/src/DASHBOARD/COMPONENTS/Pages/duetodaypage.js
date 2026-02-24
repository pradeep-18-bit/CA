import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function DueTodayPage() {
  const navigate = useNavigate();

  const [dueTodayTasks, setDueTodayTasks] = useState([]);
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
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "true",
  };

  /* ================= LOAD USER ================= */
  useEffect(() => {
    try {
      let name = "";
      let email = "";
      let role = "";

      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const u = JSON.parse(storedUser);
        name = u.fullName || u.name || "";
        email = u.emailAddress || u.email || "";
        role = u.role || "";
      }

      if (!email) email = localStorage.getItem("email") || "";
      if (!role) role = localStorage.getItem("role") || "";

      if (!name && email) name = email.split("@")[0];

      setUserInfo({ name, email, role: role.toLowerCase() });
    } catch {
      setUserInfo({ name: "", email: "", role: "" });
    }
  }, []);

  /* ================= LOAD DUE TODAY ================= */
  useEffect(() => {
    const loadDueToday = async () => {
      setLoading(true);
      try {
        const res = await fetch(API_BASE, { headers });
        const data = await res.json();

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        let filtered = data.filter((item) => {
          if (!item.deadline) return false;
          const d = new Date(item.deadline);
          d.setHours(0, 0, 0, 0);
          return d.getTime() === today.getTime();
        });

        if (userInfo.role !== "admin") {
          const email = userInfo.email.toLowerCase();
          const name = userInfo.name.toLowerCase();

          filtered = filtered.filter((item) => {
            const itemEmail = (
              item.assignedToEmail || item.ownerEmail || ""
            ).toLowerCase();
            const itemName = (
              item.assignedTo || item.assignedUser || ""
            ).toLowerCase();

            return itemEmail === email || itemName === name;
          });
        }

        setDueTodayTasks(
          filtered.map((item, idx) => ({
            id: item.id || item._id || idx + 1,
            title: item.taskDescription || item.task,
            assignee:
              item.assignedTo ||
              item.assignedUser ||
              item.companyName ||
              "",
            deadline: "Today",
            status: item.status || "Pending",
          }))
        );
      } catch (err) {
        console.error("❌ Due Today API Error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (userInfo.email || userInfo.name) loadDueToday();
  }, [userInfo]);

  /* ================= ROW CLICK ================= */
  const handleRowClick = (taskId) => {
    navigate("/compliance", {
      state: { fromDueTodayId: taskId },
    });
  };

  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 10;

  const totalPages = Math.ceil(dueTodayTasks.length / tasksPerPage);
  const currentTasks = dueTodayTasks.slice(
    (currentPage - 1) * tasksPerPage,
    currentPage * tasksPerPage
  );

  const isAdmin = userInfo.role === "admin";
  const displayName = userInfo.name || userInfo.email;

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
        }}
      >
        ←
      </button>

      <h2 style={{ color: "#073D7F" }}>Due Today</h2>
      <p style={{ color: "#555" }}>
        {isAdmin
          ? "Dues added today."
          : `Today's filings, tasks, and deadlines for ${displayName}.`}
      </p>

      {loading ? (
        <p style={{ color: "#073D7F" }}>Loading...</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead style={{ background: "#073D7F", color: "#fff" }}>
            <tr>
              <th style={{ padding: 12, textAlign: "left" }}>ID</th>
              <th style={{ padding: 12, textAlign: "left" }}>Title</th>
              <th style={{ padding: 12, textAlign: "left" }}>Assignee</th>
              <th style={{ padding: 12, textAlign: "left" }}>Deadline</th>
              <th style={{ padding: 12, textAlign: "left" }}>Status</th>
            </tr>
          </thead>

          <tbody>
            {currentTasks.length ? (
              currentTasks.map((task, i) => (
                <tr
                  key={task.id}
                  onClick={() => handleRowClick(task.id)}
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
                  <td style={{ padding: 12, textAlign: "left" }}>
                    {task.id}
                  </td>
                  <td style={{ padding: 12, textAlign: "left" }}>
                    {task.title}
                  </td>
                  <td style={{ padding: 12, textAlign: "left" }}>
                    {task.assignee}
                  </td>
                  <td style={{ padding: 12, textAlign: "left" }}>
                    {task.deadline}
                  </td>
                  <td
                    style={{
                      padding: 12,
                      textAlign: "left",
                      fontWeight: 600,
                      color:
                        task.status === "Completed"
                          ? "green"
                          : task.status === "In Progress"
                          ? "#f39c12"
                          : "red",
                    }}
                  >
                    {task.status}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  style={{ textAlign: "center", padding: 20 }}
                >
                  No due-today items found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

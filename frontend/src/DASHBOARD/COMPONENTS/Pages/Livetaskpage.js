import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LiveTasksPage() {
  const navigate = useNavigate();

  const [liveTasks, setLiveTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    role: "",
  });

  const API_TASKS =
    "https://posthemorrhagic-nonequilaterally-caroline.ngrok-free.dev/api/tasks";

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

  /* ================= LOAD IN-PROGRESS TASKS ================= */
  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const res = await fetch(API_TASKS, { headers });
        const data = await res.json();

        const inProgress = data.filter(
          (t) => t.status?.toLowerCase() === "in progress"
        );

        const isAdmin = userInfo.role === "admin";

        const filtered = isAdmin
          ? inProgress
          : inProgress.filter(
              (t) =>
                t.assignedToEmail?.toLowerCase() ===
                  userInfo.email.toLowerCase() ||
                t.assignedTo?.toLowerCase() ===
                  userInfo.name.toLowerCase()
            );

        setLiveTasks(
          filtered.map((t) => ({
            id: t.id,
            title: t.taskName,
            assignee: t.assignedTo,
            deadline: t.dueDate || "Ongoing",
            priority: t.priority,
            status: t.status,
          }))
        );
      } catch (err) {
        console.error("TASK LOAD ERROR:", err);
      } finally {
        setLoading(false);
      }
    };

    if (userInfo.email || userInfo.name) fetchTasks();
  }, [userInfo]);

  /* ================= HELPERS ================= */
  const getStatusColor = (status) =>
    status?.toLowerCase() === "in progress" ? "#f59e0b" : "#6b7280";

  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case "high":
        return "#ef4444";
      case "medium":
        return "#f59e0b";
      case "low":
        return "#10b981";
      default:
        return "#6b7280";
    }
  };

  /* ================= ROW CLICK ================= */
  const openTaskManagement = (taskId) => {
    navigate("/TaskManagement", {
      state: { fromLiveTaskId: taskId },
    });
  };

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

      <h2 style={{ color: "#073D7F" }}>Live Tasks</h2>
      <p style={{ color: "#555" }}>
        {isAdmin
          ? "In-progress tasks"
          : `In-progress tasks assigned to ${displayName}`}
      </p>

      {loading ? (
        <p style={{ color: "#073D7F" }}>Loading...</p>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            background: "#fff",
            boxShadow: "0 3px 8px rgba(0,0,0,0.05)",
          }}
        >
          <thead style={{ background: "#073D7F", color: "#fff" }}>
            <tr>
              <th style={{ padding: 12, textAlign: "left" }}>ID</th>
              <th style={{ padding: 12, textAlign: "left" }}>Title</th>
              <th style={{ padding: 12, textAlign: "left" }}>Assignee</th>
              <th style={{ padding: 12, textAlign: "left" }}>Deadline</th>
              <th style={{ padding: 12, textAlign: "left" }}>Priority</th>
              <th style={{ padding: 12, textAlign: "left" }}>Status</th>
            </tr>
          </thead>

          <tbody>
            {liveTasks.length ? (
              liveTasks.map((task) => (
                <tr
                  key={task.id}
                  onClick={() => openTaskManagement(task.id)}
                  style={{ cursor: "pointer" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "#eef4ff")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "#fff")
                  }
                >
                  <td style={{ padding: 12, fontWeight: 600, textAlign: "left" }}>
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
                      color: getPriorityColor(task.priority),
                    }}
                  >
                    {task.priority}
                  </td>
                  <td
                    style={{
                      padding: 12,
                      textAlign: "left",
                      color: getStatusColor(task.status),
                    }}
                  >
                    {task.status}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  style={{ padding: 20, textAlign: "center" }}
                >
                  No in-progress tasks found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const formatDateYYYYDDMM = (dateString) => {
  if (!dateString) return "—";
  const date = new Date(dateString);
  if (isNaN(date)) return "—";

  const year = date.getFullYear();
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");

  return `${year}/${day}/${month}`;
};

export default function SupportTicketsPage() {
  const navigate = useNavigate();

  const API_URL =
    "https://posthemorrhagic-nonequilaterally-caroline.ngrok-free.dev/api/tasks";

  const [tickets, setTickets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const ticketsPerPage = 10;

  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    role: "",
  });

  /* ================= LOAD USER ================= */
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
    }
  }, []);

  /* ================= LOAD TASKS ================= */
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await fetch(API_URL, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "ngrok-skip-browser-warning": "true",
          },
        });

        if (!res.ok) throw new Error("Failed to fetch tickets");

        const data = await res.json();

        const isAdmin = userInfo.role === "admin";
        let filtered = data;

        if (!isAdmin) {
          const emailLower = (userInfo.email || "").toLowerCase();
          const nameLower = (userInfo.name || "").toLowerCase();

          filtered = data.filter((task) => {
            const taskEmail = (task.assignedToEmail || "").toLowerCase();
            const taskName = (task.assignedTo || "").toLowerCase();

            return (
              (emailLower && taskEmail === emailLower) ||
              (nameLower && taskName === nameLower)
            );
          });
        }

        const formatted = filtered.map((task) => {
          const createdOnRaw = task.createdAt || task.dueDate || null;

          return {
            id: task.id,
            client: task.assignedTo || "—",
            subject: task.taskName || "Task",
            priority: task.priority || "Medium",
            status: task.status || "Pending",
            createdOn: formatDateYYYYDDMM(createdOnRaw),
          };
        });

        setTickets(formatted);
        setCurrentPage(1);
      } catch (err) {
        console.error("Error loading tickets:", err);
      }
    };

    if (userInfo.email || userInfo.name || userInfo.role) {
      fetchTickets();
    }
  }, [userInfo]);

  /* ================= ROW CLICK ================= */
  const handleRowClick = (taskId) => {
    navigate("/TaskManagement", {
      state: { fromSupportTicketId: taskId },
    });
  };

  const isAdmin = userInfo.role === "admin";
  const displayName = userInfo.name || userInfo.email || "current user";

  const cellStyle = {
    padding: "12px 16px",
    textAlign: "left",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
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
        }}
      >
        ←
      </button>

      <h2 style={{ color: "#073D7F", fontSize: "26px", fontWeight: "700" }}>
        Tasks
      </h2>

      <p style={{ color: "#555", fontSize: "15px", marginBottom: "20px" }}>
        {isAdmin
          ? "All tasks in the system."
          : `Tasks assigned to ${displayName}.`}
      </p>

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
            tableLayout: "fixed",
          }}
        >
          <thead style={{ background: "#073D7F", color: "#fff" }}>
            <tr>
              <th style={{ ...cellStyle, width: "10%" }}>Ticket ID</th>
              <th style={{ ...cellStyle, width: "18%" }}>Client</th>
              <th style={{ ...cellStyle, width: "28%" }}>Subject</th>
              <th style={{ ...cellStyle, width: "14%" }}>Priority</th>
              <th style={{ ...cellStyle, width: "15%" }}>Status</th>
              <th style={{ ...cellStyle, width: "15%" }}>Created On</th>
            </tr>
          </thead>

          <tbody>
            {tickets.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: "center", padding: "20px" }}>
                  No tasks available.
                </td>
              </tr>
            ) : (
              tickets.map((ticket, i) => (
                <tr
                  key={ticket.id}
                  onClick={() => handleRowClick(ticket.id)}
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
                  <td style={cellStyle}>{ticket.id}</td>
                  <td style={cellStyle}>{ticket.client}</td>
                  <td style={cellStyle}>{ticket.subject}</td>
                  <td style={cellStyle}>{ticket.priority}</td>
                  <td style={cellStyle}>{ticket.status}</td>
                  <td style={cellStyle}>{ticket.createdOn}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

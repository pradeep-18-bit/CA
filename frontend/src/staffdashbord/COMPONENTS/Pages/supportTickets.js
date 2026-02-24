import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SupportTicketsPage_staff() {
  const navigate = useNavigate();

  // ⭐ FIXED: TASK LIST API (TRUE SOURCE)
  const API_URL =
    "https://posthemorrhagic-nonequilaterally-caroline.ngrok-free.dev/api/tasks";

  const [tickets, setTickets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const ticketsPerPage = 10;

  // ⭐ FETCH TASKS AS TICKETS
  useEffect(() => {
    fetchTickets();
  }, []);

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

      // ⭐ MAP TASK → TICKET
      const formatted = data.map((task) => {
        const createdOn = task.createdAt || task.dueDate || "N/A";

        return {
          id: task.id,
          client: task.assignedTo || "—",
          subject: task.taskName || "Task",
          priority: task.priority || "Medium",
          status: task.status || "Pending",
          createdOn: createdOn,
        };
      });

      setTickets(formatted);
    } catch (err) {
      console.error("Error loading tickets:", err);
    }
  };

  // ⭐ PAGINATION
  const totalPages = Math.ceil(tickets.length / ticketsPerPage);

  const indexOfLastTicket = currentPage * ticketsPerPage;
  const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;

  const currentTickets = tickets.slice(indexOfFirstTicket, indexOfLastTicket);

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
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = "#0a4e9b")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = "#073D7F")
        }
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
        Tasks
      </h2>
      <p style={{ color: "#555", fontSize: "15px", marginBottom: "20px" }}>
        Manage and resolve client-reported technical issues and requests.
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
            textAlign: "left",
          }}
        >
          <thead style={{ background: "#073D7F", color: "#fff" }}>
            <tr>
              <th style={{ padding: "10px 16px" }}>Ticket ID</th>
              <th style={{ padding: "10px 16px" }}>Client</th>
              <th style={{ padding: "10px 16px" }}>Subject</th>
              <th style={{ padding: "10px 16px" }}>Priority</th>
              <th style={{ padding: "10px 16px" }}>Status</th>
              <th style={{ padding: "10px 16px" }}>Created On</th>
            </tr>
          </thead>

          <tbody>
            {currentTickets.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: "center", padding: "20px" }}>
                  No Support Tickets Available
                </td>
              </tr>
            ) : (
              currentTickets.map((ticket, i) => (
                <tr
                  key={ticket.id}
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
                  <td style={{ padding: "10px 16px" }}>{ticket.id}</td>
                  <td style={{ padding: "10px 16px" }}>{ticket.client}</td>
                  <td style={{ padding: "10px 16px" }}>{ticket.subject}</td>

                  <td
                    style={{
                      padding: "10px 16px",
                      fontWeight: "600",
                      color:
                        ticket.priority === "Critical"
                          ? "red"
                          : ticket.priority === "High"
                          ? "#f39c12"
                          : "#2c3e50",
                    }}
                  >
                    {ticket.priority}
                  </td>

                  <td
                    style={{
                      padding: "10px 16px",
                      fontWeight: "600",
                      color:
                        ticket.status === "Open"
                          ? "#e74c3c"
                          : ticket.status === "In Progress"
                          ? "#f39c12"
                          : "green",
                    }}
                  >
                    {ticket.status}
                  </td>

                  <td style={{ padding: "10px 16px" }}>{ticket.createdOn}</td>
                </tr>
              ))
            )}
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
        {/* Previous */}
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
                cursor: "pointer",
                fontSize: "15px",
                fontWeight: isActive ? "700" : "500",
                boxShadow: isActive
                  ? "0 3px 8px rgba(7,61,127,0.3)"
                  : "none",
              }}
            >
              {pageNum}
            </button>
          );
        })}

        {/* Next */}
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
          }}
        >
          ›
        </button>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
 
export default function NewClientsPage() {
  const navigate = useNavigate();
 
  const API_URL =
    "https://posthemorrhagic-nonequilaterally-caroline.ngrok-free.dev/api/clients";
 
  const [clients, setClients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const clientsPerPage = 10;
 
  const loadClients = async () => {
    try {
      const res = await fetch(API_URL, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "ngrok-skip-browser-warning": "true",
        },
      });
 
      const data = await res.json();
 
      const now = new Date();
      const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
 
      const filtered = data.filter((c) => {
        const created = new Date(c.createdAt);
        return c.status === "Active" && created >= oneDayAgo;
      });
 
      setClients(filtered);
    } catch (err) {
      console.error("CLIENT FETCH ERROR:", err);
    }
  };
 
  useEffect(() => {
    loadClients();
  }, []);
 
  const totalPages = Math.ceil(clients.length / clientsPerPage);
  const indexOfLastClient = currentPage * clientsPerPage;
  const indexOfFirstClient = indexOfLastClient - clientsPerPage;
  const currentClients = clients.slice(indexOfFirstClient, indexOfLastClient);
 
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  /* ✅ ROW CLICK → CLIENTS PAGE */
  const handleRowClick = (clientId) => {
    navigate("/clients", {
      state: { fromNewClientId: clientId },
    });
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
        }}
      >
        ←
      </button>
 
      <h2 style={{ color: "#073D7F", fontSize: "26px", fontWeight: "700" }}>
        New Clients Added ({clients.length})
      </h2>
 
      <p style={{ color: "#555", fontSize: "15px", marginBottom: "20px" }}>
        Here’s a list of all new clients added in the last 24 hours.
      </p>
 
      <div
        style={{
          background: "#fff",
          borderRadius: "10px",
          boxShadow: "0 3px 8px rgba(0,0,0,0.05)",
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
              <th style={{ padding: "10px 16px" }}>Name</th>
              <th style={{ padding: "10px 16px" }}>Contact</th>
              <th style={{ padding: "10px 16px" }}>Services</th>
              <th style={{ padding: "10px 16px" }}>Added On</th>
            </tr>
          </thead>
 
          <tbody>
            {currentClients.map((client, i) => (
              <tr
                key={client.id}
                onClick={() => handleRowClick(client.id)}
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
                <td style={{ padding: "10px 16px" }}>{client.id}</td>
                <td style={{ padding: "10px 16px" }}>
                  {client.clientName || "—"}
                </td>
                <td style={{ padding: "10px 16px" }}>{client.contact}</td>
                <td style={{ padding: "10px 16px" }}>{client.services}</td>
                <td style={{ padding: "10px 16px" }}>
                  {client.createdAt?.substring(0, 10)}
                </td>
              </tr>
            ))}
 
            {clients.length === 0 && (
              <tr>
                <td
                  colSpan="5"
                  style={{ textAlign: "center", padding: "20px" }}
                >
                  No new clients added in the last day.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
 
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
              backgroundColor: "#073D7F",
              color: "#fff",
              border: "none",
              borderRadius: "50%",
              width: "42px",
              height: "42px",
              cursor: currentPage === 1 ? "not-allowed" : "pointer",
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
              border: "none",
              borderRadius: "50%",
              width: "42px",
              height: "42px",
              cursor:
                currentPage === totalPages ? "not-allowed" : "pointer",
            }}
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
}

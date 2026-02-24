import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function CandidatesPage() {
  const navigate = useNavigate();

  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const candidatesPerPage = 10;

  const totalPages = Math.ceil(candidates.length / candidatesPerPage);

  const indexOfLastCandidate = currentPage * candidatesPerPage;
  const indexOfFirstCandidate = indexOfLastCandidate - candidatesPerPage;
  const currentCandidates = candidates.slice(
    indexOfFirstCandidate,
    indexOfLastCandidate
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  /* ================= FETCH CLIENTS ================= */
  useEffect(() => {
    const fetchActiveClients = async () => {
      try {
        const response = await fetch(
          "https://posthemorrhagic-nonequilaterally-caroline.ngrok-free.dev/api/clients",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "ngrok-skip-browser-warning": "true",
            },
          }
        );

        const data = await response.json();

        setCandidates(
          data.map((item) => ({
            id: item.id,
            name: item.clientName,
            role: item.services || "N/A",
            email: item.contact || "N/A",
            status: item.status,
          }))
        );

        setCurrentPage(1);
      } catch (error) {
        console.error("Error fetching active clients:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchActiveClients();
  }, []);

  /* ================= ROW CLICK ================= */
  const handleRowClick = (clientId) => {
    navigate("/clients", {
      state: { fromCandidatesClientId: clientId },
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
          boxShadow: "0 3px 8px rgba(0,0,0,0.1)",
        }}
      >
        ←
      </button>

      <h2 style={{ color: "#073D7F", fontSize: "26px", fontWeight: 700 }}>
        Candidates
      </h2>
      <p style={{ color: "#555", marginBottom: 20 }}>
        List of all active Clients.
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
                  <th style={{ padding: "10px 16px", textAlign: "left" }}>
                    ID
                  </th>
                  <th style={{ padding: "10px 16px", textAlign: "left" }}>
                    Client Name
                  </th>
                  <th style={{ padding: "10px 16px", textAlign: "left" }}>
                    Services
                  </th>
                  <th style={{ padding: "10px 16px", textAlign: "left" }}>
                    Email
                  </th>
                  <th style={{ padding: "10px 16px", textAlign: "left" }}>
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {currentCandidates.map((candidate, i) => (
                  <tr
                    key={candidate.id}
                    onClick={() => handleRowClick(candidate.id)}
                    style={{
                      cursor: "pointer",
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
                    <td
                      style={{ padding: "10px 16px", textAlign: "left" }}
                    >
                      {candidate.id}
                    </td>
                    <td
                      style={{ padding: "10px 16px", textAlign: "left" }}
                    >
                      {candidate.name}
                    </td>
                    <td
                      style={{ padding: "10px 16px", textAlign: "left" }}
                    >
                      {candidate.role}
                    </td>
                    <td
                      style={{ padding: "10px 16px", textAlign: "left" }}
                    >
                      {candidate.email}
                    </td>
                    <td
                      style={{
                        padding: "10px 16px",
                        textAlign: "left",
                        color:
                          candidate.status === "Active"
                            ? "green"
                            : "red",
                        fontWeight: 600,
                      }}
                    >
                      {candidate.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination (unchanged) */}
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
                opacity: currentPage === 1 ? 0.5 : 1,
              }}
            >
              ‹
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i + 1}
                onClick={() => handlePageChange(i + 1)}
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "50%",
                  border: "1px solid #073D7F",
                  backgroundColor:
                    currentPage === i + 1 ? "#073D7F" : "#fff",
                  color:
                    currentPage === i + 1 ? "#fff" : "#073D7F",
                }}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              style={{
                backgroundColor: "#073D7F",
                color: "#fff",
                borderRadius: "50%",
                width: "42px",
                height: "42px",
                opacity: currentPage === totalPages ? 0.5 : 1,
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

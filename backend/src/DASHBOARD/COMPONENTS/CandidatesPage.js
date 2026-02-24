import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
 
export default function CandidatesPage() {
  const navigate = useNavigate();
 
  // API result state
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
 
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const candidatesPerPage = 10;
 
  // 🔥 DYNAMIC page count (auto adjusts to API length)
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
 
  // 🔥 Fetch ACTIVE CLIENTS dynamically
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
 
        const mappedData = data.map((item) => ({
          id: item.id,
          name: item.clientName,
          role: item.services || "N/A",
          email: item.contact || "N/A",
          status: item.status,
        }));
 
        setCandidates(mappedData);
 
        // 🔥 Reset to page 1 when fresh data loads
        setCurrentPage(1);
      } catch (error) {
        console.error("Error fetching active clients:", error);
      } finally {
        setLoading(false);
      }
    };
 
    fetchActiveClients();
  }, []);
 
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
        Candidates
      </h2>
      <p style={{ color: "#555", fontSize: "15px", marginBottom: "20px" }}>
        List of all active team members and applicants.
      </p>
 
      {/* Loading */}
      {loading ? (
        <p style={{ fontSize: "18px", color: "#073D7F" }}>Loading...</p>
      ) : (
        <>
          {/* Candidates Table */}
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
                  <th style={{ padding: "10px 16px" }}>Name</th>
                  <th style={{ padding: "10px 16px" }}>Role</th>
                  <th style={{ padding: "10px 16px" }}>Email</th>
                  <th style={{ padding: "10px 16px" }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {currentCandidates.map((candidate, i) => (
                  <tr
                    key={candidate.id}
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
                    <td style={{ padding: "10px 16px" }}>{candidate.id}</td>
                    <td style={{ padding: "10px 16px" }}>{candidate.name}</td>
                    <td style={{ padding: "10px 16px" }}>{candidate.role}</td>
                    <td style={{ padding: "10px 16px" }}>{candidate.email}</td>
                    <td
                      style={{
                        padding: "10px 16px",
                        color:
                          candidate.status === "Active" ? "green" : "red",
                        fontWeight: "600",
                      }}
                    >
                      {candidate.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
 
          {/* DYNAMIC PAGINATION */}
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
 
            {/* Page Numbers - AUTO GENERATION */}
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
 

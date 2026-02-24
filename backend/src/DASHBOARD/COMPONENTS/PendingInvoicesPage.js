import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
 
export default function PendingInvoicesPage() {
  const navigate = useNavigate();
 
  const API_URL =
    "https://posthemorrhagic-nonequilaterally-caroline.ngrok-free.dev/api/invoices";
 
  const [invoices, setInvoices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
 
  const invoicesPerPage = 10;
 
  // CALCULATE AMOUNT
  const calculateTotalAmount = (invoiceItems) => {
    try {
      const items = JSON.parse(invoiceItems || "[]");
      return items.reduce(
        (sum, item) => sum + (Number(item.amount) || 0),
        0
      );
    } catch (e) {
      console.error("Failed to parse invoiceItems:", e);
      return 0;
    }
  };
 
  // LOAD ONLY PENDING + OVERDUE INVOICES
  const loadInvoices = async () => {
    try {
      const res = await fetch(API_URL, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "ngrok-skip-browser-warning": "true",
        },
      });
 
      const data = await res.json();
 
      const filtered = data
        .filter((inv) => inv.status === "Pending" || inv.status === "Overdue")
        .map((inv) => ({
          id: inv.id,
          client: inv.clientName,
          amount:
            "₹" +
            calculateTotalAmount(inv.invoiceItems).toLocaleString("en-IN"),
          dueDate: inv.dueDate,
          status: inv.status,
        }));
 
      setInvoices(filtered);
    } catch (err) {
      console.error("INVOICE FETCH ERROR:", err);
    }
  };
 
  useEffect(() => {
    loadInvoices();
  }, []);
 
  const totalPages = Math.ceil(invoices.length / invoicesPerPage);
 
  const indexOfLastInvoice = currentPage * invoicesPerPage;
  const indexOfFirstInvoice = indexOfLastInvoice - invoicesPerPage;
  const currentInvoices = invoices.slice(
    indexOfFirstInvoice,
    indexOfLastInvoice
  );
 
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  /* ✅ ROW CLICK → BILLING PAGE */
  const handleRowClick = (invoiceId) => {
    navigate("/billing", {
      state: { fromPendingInvoiceId: invoiceId },
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
        onClick={() => navigate("/AdminDashboard")}
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
 
      <h2
        style={{
          color: "#073D7F",
          fontSize: "26px",
          fontWeight: "700",
          marginBottom: "8px",
        }}
      >
        Pending Invoices
      </h2>
 
      <p style={{ color: "#555", fontSize: "15px", marginBottom: "20px" }}>
        Below is a list of all invoices that are currently pending or overdue.
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
              <th style={{ padding: "10px 16px" }}>Invoice ID</th>
              <th style={{ padding: "10px 16px" }}>Client Name</th>
              <th style={{ padding: "10px 16px" }}>Amount</th>
              <th style={{ padding: "10px 16px" }}>Due Date</th>
              <th style={{ padding: "10px 16px" }}>Status</th>
            </tr>
          </thead>
 
          <tbody>
            {currentInvoices.map((invoice, i) => (
              <tr
                key={invoice.id}
                onClick={() => handleRowClick(invoice.id)}
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
                <td style={{ padding: "10px 16px" }}>{invoice.id}</td>
                <td style={{ padding: "10px 16px" }}>{invoice.client}</td>
                <td style={{ padding: "10px 16px", fontWeight: "600" }}>
                  {invoice.amount}
                </td>
                <td style={{ padding: "10px 16px" }}>{invoice.dueDate}</td>
                <td
                  style={{
                    padding: "10px 16px",
                    color:
                      invoice.status === "Overdue" ? "red" : "#f39c12",
                    fontWeight: "600",
                  }}
                >
                  {invoice.status}
                </td>
              </tr>
            ))}
 
            {invoices.length === 0 && (
              <tr>
                <td
                  colSpan="5"
                  style={{ textAlign: "center", padding: "20px" }}
                >
                  No pending or overdue invoices found.
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
            gap: "12px",
            marginTop: "30px",
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
 
          {[...Array(totalPages)].map((_, index) => {
            const num = index + 1;
            return (
              <button
                key={num}
                onClick={() => handlePageChange(num)}
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "50%",
                  border: "1px solid #073D7F",
                  backgroundColor:
                    num === currentPage ? "#073D7F" : "#fff",
                  color: num === currentPage ? "#fff" : "#073D7F",
                }}
              >
                {num}
              </button>
            );
          })}
 
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
    </div>
  );
}

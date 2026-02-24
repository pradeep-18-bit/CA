import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

export default function RevenuePageStaff() {
  const navigate = useNavigate();

  const API_URL =
    "https://posthemorrhagic-nonequilaterally-caroline.ngrok-free.dev/api/invoices";

  const [invoices, setInvoices] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [loading, setLoading] = useState(true);

  // ------------ CALCULATE AMOUNT (stable) ------------
  const calculateTotalAmount = useCallback((invoiceItems) => {
    try {
      const items = JSON.parse(invoiceItems || "[]");
      return items.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
    } catch (e) {
      console.error("Error parsing invoiceItems:", e);
      return 0;
    }
  }, []);

  // ------------ LOAD REVENUE (headers moved INSIDE useCallback) ------------
  const loadRevenue = useCallback(async () => {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
    };

    try {
      const res = await fetch(API_URL, { headers });
      const data = await res.json();

      let total = 0;

      const mapped = data.map((inv) => {
        const amount = calculateTotalAmount(inv.invoiceItems);
        total += amount;

        return {
          id: inv.id,
          client: inv.clientName,
          amount,
          date: inv.invoiceDate?.slice(0, 10),
          status: inv.status,
        };
      });

      setInvoices(mapped);
      setTotalRevenue(total);
    } catch (err) {
      console.error("❌ Revenue API Error:", err);
    } finally {
      setLoading(false);
    }
  }, [API_URL, calculateTotalAmount]);

  // ------------ RUN ON LOAD (no warnings) ------------
  useEffect(() => {
    loadRevenue();
  }, [loadRevenue]);

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
          fontSize: "20px",
        }}
      >
        ←
      </button>

      {/* HEADER */}
      <h2
        style={{
          color: "#073D7F",
          fontSize: "26px",
          fontWeight: "700",
          marginBottom: "8px",
        }}
      >
        Revenue Overview
      </h2>

      <p style={{ color: "#555", fontSize: "15px", marginBottom: "20px" }}>
        Total billing amount calculated from all invoices.
      </p>

      {/* TOTAL REVENUE CARD */}
      <div
        style={{
          background: "#073D7F",
          color: "white",
          padding: "20px",
          borderRadius: "12px",
          marginBottom: "25px",
          boxShadow: "0 3px 8px rgba(0,0,0,0.1)",
        }}
      >
        <h3 style={{ fontSize: "20px", marginBottom: "6px" }}>Total Revenue</h3>
        <div style={{ fontSize: "32px", fontWeight: "700" }}>
          ₹{totalRevenue.toLocaleString("en-IN")}
        </div>
      </div>

      {/* TABLE */}
      {loading ? (
        <p style={{ fontSize: "18px", color: "#073D7F" }}>Loading...</p>
      ) : (
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
                <th style={{ padding: "10px 16px" }}>Client</th>
                <th style={{ padding: "10px 16px" }}>Amount</th>
                <th style={{ padding: "10px 16px" }}>Date</th>
                <th style={{ padding: "10px 16px" }}>Status</th>
              </tr>
            </thead>

            <tbody>
              {invoices.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center", padding: "20px" }}>
                    No invoices found.
                  </td>
                </tr>
              ) : (
                invoices.map((inv, i) => (
                  <tr
                    key={inv.id}
                    style={{
                      background: i % 2 === 0 ? "#f7faff" : "#fff",
                    }}
                  >
                    <td style={{ padding: "10px 16px" }}>{inv.id}</td>
                    <td style={{ padding: "10px 16px" }}>{inv.client}</td>
                    <td style={{ padding: "10px 16px", fontWeight: "600" }}>
                      ₹{inv.amount.toLocaleString("en-IN")}
                    </td>
                    <td style={{ padding: "10px 16px" }}>{inv.date}</td>
                    <td
                      style={{
                        padding: "10px 16px",
                        fontWeight: "600",
                        color:
                          inv.status === "Paid"
                            ? "green"
                            : inv.status === "Pending"
                            ? "#f39c12"
                            : "red",
                      }}
                    >
                      {inv.status}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

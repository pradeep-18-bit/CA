import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function RevenuePage() {
  const navigate = useNavigate();
  const THEME_COLOR = "#073D7F";

  const API_URL =
    "https://posthemorrhagic-nonequilaterally-caroline.ngrok-free.dev/api/invoices";

  // UI States
  const [view, setView] = useState("monthly");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  // Data States
  const [revenueData, setRevenueData] = useState([]);
  const [summaryData, setSummaryData] = useState({
    monthly: [],
    quarterly: [],
    halfyearly: [],
    yearly: [],
  });

  const [loading, setLoading] = useState(false);

  const COLORS = ["#00C49F", "#FFBB28", "#FF8042", "#0088FE"];

  // ----------- HELPER: CALCULATE TOTAL AMOUNT -----------
  const calculateTotalAmount = (invoiceItems) => {
    try {
      const items = JSON.parse(invoiceItems || "[]");
      return items.reduce(
        (sum, item) => sum + (Number(item.amount) || 0),
        0
      );
    } catch (e) {
      return 0;
    }
  };

  // ----------- LOAD INVOICE DATA FROM API -----------
  const loadRevenue = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL, {
        headers: {
          Accept: "application/json",
          "ngrok-skip-browser-warning": "true",
        },
      });

      const invoices = await res.json();

      // ---------------- TABLE DATA ----------------
      const rowData = invoices.map((inv) => ({
        id: inv.id,
        client: inv.clientName,
        project: inv.invoiceNumber,
        amount: calculateTotalAmount(inv.invoiceItems),
        status: inv.status || "Pending",
        invoiceDate: inv.invoiceDate,
      }));

      setRevenueData(rowData);

      // ---------------- SUMMARY DATA ----------------
      const monthMap = {};
      const quarterMap = { Q1: 0, Q2: 0, Q3: 0, Q4: 0 };
      const halfMap = { H1: 0, H2: 0 };
      const yearMap = {};

      rowData.forEach((item) => {
        const date = new Date(item.invoiceDate);
        if (isNaN(date)) return;

        const month = date.toLocaleString("default", { month: "short" });
        const year = date.getFullYear();
        const amount = item.amount;

        monthMap[month] = (monthMap[month] || 0) + amount;
        quarterMap[`Q${Math.floor(date.getMonth() / 3) + 1}`] += amount;
        date.getMonth() < 6 ? (halfMap.H1 += amount) : (halfMap.H2 += amount);
        yearMap[year] = (yearMap[year] || 0) + amount;
      });

      setSummaryData({
        monthly: Object.entries(monthMap).map(([name, revenue]) => ({
          name,
          revenue,
        })),
        quarterly: Object.entries(quarterMap).map(([name, revenue]) => ({
          name,
          revenue,
        })),
        halfyearly: Object.entries(halfMap).map(([name, revenue]) => ({
          name,
          revenue,
        })),
        yearly: Object.entries(yearMap).map(([name, revenue]) => ({
          name,
          revenue,
        })),
      });
    } catch (err) {
      console.error("Revenue API Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRevenue();
  }, []);

  // ------------ PAGINATION -------------
  const totalPages = Math.ceil(revenueData.length / rowsPerPage);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = revenueData.slice(indexOfFirstRow, indexOfLastRow);

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
      {/* BACK BUTTON */}
      <button
        onClick={() => navigate("/DeadlineDashboard")}
        style={{
          position: "absolute",
          top: "20px",
          right: "25px",
          backgroundColor: THEME_COLOR,
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

      {/* HEADER */}
      <h2
        style={{
          color: THEME_COLOR,
          fontSize: "26px",
          fontWeight: 700,
          marginBottom: 8,
        }}
      >
        Revenue Dashboard
      </h2>
      <p style={{ color: "#555", fontSize: 15, marginBottom: 20 }}>
        Detailed financial summary for different time periods.
      </p>

      {/* TABLE CARD */}
      <div
        style={{
          background: "#fff",
          borderRadius: 10,
          boxShadow: "0 3px 8px rgba(0,0,0,0.05)",
          overflow: "hidden",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            tableLayout: "fixed", // ✅ FIX
          }}
        >
          <thead style={{ background: THEME_COLOR, color: "#fff" }}>
            <tr>
              <th style={{ padding: 12, textAlign: "center", width: 80 }}>ID</th>
              <th style={{ padding: 12, textAlign: "left", width: 220 }}>
                Client
              </th>
              <th style={{ padding: 12, textAlign: "left", width: 180 }}>
                Project
              </th>
              <th style={{ padding: 12, textAlign: "right", width: 140 }}>
                Amount (₹)
              </th>
              <th style={{ padding: 12, textAlign: "center", width: 140 }}>
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" style={{ textAlign: "center", padding: 20 }}>
                  Loading...
                </td>
              </tr>
            ) : (
              currentRows.map((item, i) => (
                <tr
                  key={item.id}
                  style={{
                    background: i % 2 === 0 ? "#f7faff" : "#fff",
                  }}
                >
                  <td style={{ padding: 12, textAlign: "center" }}>
                    {item.id}
                  </td>
                  <td style={{ padding: 12, textAlign: "left" }}>
                    {item.client}
                  </td>
                  <td style={{ padding: 12, textAlign: "left" }}>
                    {item.project}
                  </td>
                  <td style={{ padding: 12, textAlign: "right" }}>
                    {item.amount.toLocaleString()}
                  </td>
                  <td
                    style={{
                      padding: 12,
                      textAlign: "center",
                      fontWeight: 600,
                      color:
                        item.status === "Paid"
                          ? "green"
                          : item.status === "In Progress"
                          ? "#f39c12"
                          : "red",
                    }}
                  >
                    {item.status}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: 30,
          gap: 12,
        }}
      >
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          style={{
            width: 42,
            height: 42,
            borderRadius: "50%",
            background: currentPage === 1 ? "#ccc" : THEME_COLOR,
            color: "#fff",
            border: "none",
          }}
        >
          ‹
        </button>

        {Array.from({ length: totalPages }).map((_, idx) => {
          const pageNum = idx + 1;
          return (
            <button
              key={pageNum}
              onClick={() => handlePageChange(pageNum)}
              style={{
                width: 42,
                height: 42,
                borderRadius: "50%",
                border: `1px solid ${THEME_COLOR}`,
                background:
                  currentPage === pageNum ? THEME_COLOR : "#fff",
                color:
                  currentPage === pageNum ? "#fff" : THEME_COLOR,
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
            width: 42,
            height: 42,
            borderRadius: "50%",
            background:
              currentPage === totalPages ? "#ccc" : THEME_COLOR,
            color: "#fff",
            border: "none",
          }}
        >
          ›
        </button>
      </div>

      {/* CHARTS (UNCHANGED) */}
      <h3 style={{ color: THEME_COLOR, marginTop: 30 }}>
        {view.charAt(0).toUpperCase() + view.slice(1)} Revenue Overview
      </h3>

      <div style={{ display: "flex", gap: 20, flexWrap: "wrap", marginTop: 20 }}>
        <ChartCard>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="project" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="amount"
                stroke={THEME_COLOR}
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={summaryData[view]}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="revenue" fill={THEME_COLOR} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={summaryData[view]}
                dataKey="revenue"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {summaryData[view].map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
}

// CHART CARD WRAPPER (UNCHANGED)
function ChartCard({ children }) {
  return (
    <div
      style={{
        flex: 1,
        minWidth: 300,
        height: 300,
        border: "1px solid #eee",
        borderRadius: 10,
        padding: 10,
        background: "#fff",
        boxShadow: "0 3px 6px rgba(0,0,0,0.1)",
      }}
    >
      {children}
    </div>
  );
}

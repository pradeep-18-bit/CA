// ServiceBreakdown.js
import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";

/**
 * NOTE: kept the same layout/style/colors as your original component.
 * Uses the same ALL_CLIENTS_URL from ClientsPage to fetch clients and derive services.
 */
const ALL_CLIENTS_URL =
  "https://posthemorrhagic-nonequilaterally-caroline.ngrok-free.dev/api/clients/all";

const KNOWN_SERVICE_COLORS = {
  "ITR Filing": "#8b7cf1",
  "GST Returns": "#82ca9d",
  "TDS Returns": "#f6c344",
  "ROC Filing": "#ff7300",
  "Audit Services": "#ff4d4f",
};

const FALLBACK_COLORS = [
  "#8b7cf1",
  "#82ca9d",
  "#f6c344",
  "#ff7300",
  "#ff4d4f",
  "#6f42c1",
  "#20c997",
  "#ffc107",
  "#fd7e14",
  "#e83e8c",
];

const ServiceBreakdown = () => {
  const [serviceData, setServiceData] = useState([
    { name: "ITR Filing", value: 35, color: "#8b7cf1" },
    { name: "GST Returns", value: 25, color: "#82ca9d" },
    { name: "TDS Returns", value: 20, color: "#f6c344" },
    { name: "ROC Filing", value: 15, color: "#ff7300" },
    { name: "Audit Services", value: 5, color: "#ff4d4f" },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // keeps identical label rendering as your original component
  const renderCustomLabel = ({ x, y, width, value }) => (
    <text
      x={x + width + 10}
      y={y + 10}
      fill="#333"
      textAnchor="start"
      dominantBaseline="middle"
      fontSize="14"
    >
      {value}%
    </text>
  );

  useEffect(() => {
    let mounted = true;

    const fetchClientsAndBuildServices = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(ALL_CLIENTS_URL, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "ngrok-skip-browser-warning": "true",
          },
        });

        if (!res.ok) {
          const txt = await res.text();
          throw new Error(txt || "Failed to fetch clients");
        }

        const clients = await res.json();

        // Build counts map for services
        const counts = {};
        clients.forEach((c) => {
          const svcField = c.services;
          if (!svcField) return;
          // normalize: accept array or comma-separated string
          const svcArray = Array.isArray(svcField)
            ? svcField
            : String(svcField)
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean);
          svcArray.forEach((s) => {
            if (!s) return;
            counts[s] = (counts[s] || 0) + 1;
          });
        });

        // If no services found, keep your default static data (do not change layout)
        if (Object.keys(counts).length === 0) {
          if (mounted) {
            setServiceData((prev) => prev); // keep existing default
          }
          return;
        }

        // Create array from counts and assign colors (use known mapping first)
        const names = Object.keys(counts);
        const dataArr = names.map((name, idx) => {
          const color =
            KNOWN_SERVICE_COLORS[name] ||
            FALLBACK_COLORS[idx % FALLBACK_COLORS.length];
          return { name, value: counts[name], color };
        });

        // Convert counts to percentages for pie (recharts can show either counts or percentages;
        // to preserve the same visual proportions as your original, we'll feed raw counts
        // to charts but format pie labels to show percent in label function)
        if (mounted) setServiceData(dataArr);
      } catch (err) {
        console.error("ServiceBreakdown fetch error:", err);
        if (mounted) setError(err.message || "Failed to load services");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchClientsAndBuildServices();

    return () => {
      mounted = false;
    };
  }, []);

  const total = serviceData.reduce((s, item) => s + (item.value || 0), 0) || 1;

  // Custom tooltip to show count and percentage; kept look simple so layout unchanged.
  const tooltipFormatter = (value, name) => {
    const percent = ((value / total) * 100).toFixed(1);
    return [`${value} (${percent}%)`, name];
  };

  return (
    <div style={{ display: "flex", gap: "20px", alignItems: "stretch" }}>
      <div
        style={{
          flex: 1,
          background: "#fff",
          borderRadius: "12px",
          padding: "20px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <h3 style={{ fontSize: "18px", marginBottom: "20px" }}>
          Service Distribution
        </h3>

        {loading ? (
          <div style={{ height: 300, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span>Loading...</span>
          </div>
        ) : error ? (
          <div style={{ height: 300, display: "flex", alignItems: "center", justifyContent: "center", color: "#d9534f" }}>
            <span>Error: {error}</span>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={serviceData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                // label shows name + percent like original (keeps formatting)
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {serviceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={tooltipFormatter} />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>

      <div
        style={{
          flex: 1,
          background: "#fff",
          borderRadius: "12px",
          padding: "20px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <h3 style={{ fontSize: "18px", marginBottom: "20px" }}>
          Service Performance
        </h3>

        {loading ? (
          <div style={{ height: 300, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span>Loading...</span>
          </div>
        ) : error ? (
          <div style={{ height: 300, display: "flex", alignItems: "center", justifyContent: "center", color: "#d9534f" }}>
            <span>Error: {error}</span>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              layout="vertical"
              data={serviceData}
              margin={{ top: 5, right: 40, left: 20, bottom: 5 }}
              barCategoryGap={30}
            >
              <XAxis type="number" hide />
              <YAxis
                type="category"
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 14, dy: 20 }}
              />
              <Tooltip formatter={tooltipFormatter} />
              <Bar dataKey="value" barSize={8} radius={[5, 5, 5, 5]}>
                {serviceData.map((entry, index) => (
                  <Cell key={`cell-bar-${index}`} fill={entry.color} />
                ))}
                {/* LabelList uses custom renderer originally used */}
                <LabelList content={renderCustomLabel} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default ServiceBreakdown;

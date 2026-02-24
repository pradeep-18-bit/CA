import React, { useEffect, useState } from "react";
import ComplianceOverviewChart from "./ComplianceOverViewChart";
import { ExportIcon } from "./DashbaordHeader";

const FILING_API = "https://posthemorrhagic-nonequilaterally-caroline.ngrok-free.dev/api/filingtracker";
const CALENDAR_API = "https://posthemorrhagic-nonequilaterally-caroline.ngrok-free.dev/api/ComplianceCalendar";

const ComplianceStatus = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // metrics shape consumed by the UI/chart
  const [metrics, setMetrics] = useState({
    overviewData: [],        // [{ label: 'GST', completed: 60, pending: 40 }]
    overallRate: 0,         // percent
    filingStatusData: [],   // [{ label: 'Completed', percentage: 78.2 }]
    upcomingDeadlines: []   // [{ title, details, date }]
  });

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      setError(null);

      try {
        // Fetch filings
        const resFilings = await fetch(FILING_API, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "ngrok-skip-browser-warning": "true",
          },
        });
        if (!resFilings.ok) throw new Error(`Filing API error: ${resFilings.status}`);
        const filings = await resFilings.json(); // expect array

        // Fetch deadlines (calendar)
        const resCalendar = await fetch(CALENDAR_API, {
          method: "GET",
          headers: { "ngrok-skip-browser-warning": "true" },
        });
        if (!resCalendar.ok) throw new Error(`Calendar API error: ${resCalendar.status}`);
        const calendarData = await resCalendar.json(); // expect array

        // --- Transform filings into overviewData per service ---
        // Ensure each filing object has: service, status (Completed/Pending/etc)
        const servicesMap = {};
        let totalCount = 0;
        let totalCompleted = 0;

        (filings || []).forEach((f) => {
          // adapt keys if different (e.g. serviceName instead of service)
          const service = (f.service || f.serviceName || "Unknown").toString();
          const status = (f.status || "Pending").toString();
          if (!servicesMap[service]) servicesMap[service] = { total: 0, completed: 0, pending: 0 };
          servicesMap[service].total += 1;
          totalCount += 1;

          // treat common completed variants
          const isCompleted = /completed|done|submitted/i.test(status);
          if (isCompleted) {
            servicesMap[service].completed += 1;
            totalCompleted += 1;
          } else {
            servicesMap[service].pending += 1;
          }
        });

        const overviewData = Object.keys(servicesMap).map((svc) => {
          const s = servicesMap[svc];
          const completedPct = s.total > 0 ? Math.round((s.completed / s.total) * 100) : 0;
          const pendingPct = s.total > 0 ? Math.round((s.pending / s.total) * 100) : 0;
          // ensure not exceeding 100 due to rounding
          const cap = Math.min(completedPct + pendingPct, 100);
          return {
            label: svc,
            completed: completedPct,
            pending: pendingPct,
            raw: { total: s.total, completed: s.completed, pending: s.pending },
            displaySum: cap
          };
        });

        // --- Overall compliance rate ---
        const overallRate = totalCount === 0 ? 0 : (totalCompleted / totalCount) * 100;

        // --- Filing status summary (counts -> percentages) ---
        const statusCounts = filings.reduce((acc, f) => {
          const st = (f.status || "Pending").toString();
          acc[st] = (acc[st] || 0) + 1;
          return acc;
        }, {});
        const filingStatusData = Object.keys(statusCounts).map((label) => ({
          label,
          percentage: totalCount === 0 ? 0 : (statusCounts[label] / totalCount) * 100,
          count: statusCounts[label]
        }))
        // sort typical statuses first for nicer UI
        .sort((a,b) => {
          const priority = ["Completed","Submitted","Pending","In Progress","Overdue"];
          const ai = priority.indexOf(a.label) >= 0 ? priority.indexOf(a.label) : 99;
          const bi = priority.indexOf(b.label) >= 0 ? priority.indexOf(b.label) : 99;
          if (ai !== bi) return ai - bi;
          return b.percentage - a.percentage;
        });

        // --- Upcoming deadlines from calendar API ---
        // Map calendar items to { title, details, date } and sort ascending
        const transformedDeadlines = (calendarData || []).map((item) => {
          // adapt mapping if calendar item keys differ
          const company = item.companyName || item.company || item.Company || "";
          const task = item.taskDescription || item.task || item.Task || "";
          const dateStr = item.deadline || item.date || item.Deadline || null;
          const dateObj = dateStr ? new Date(dateStr) : null;
          return {
            title: `${task} — ${company}`,
            details: task || item.task || "",
            raw: item,
            dateObj,
            date: dateObj ? dateObj.toLocaleDateString() : "N/A"
          };
        }).filter(d => d.dateObj);

        transformedDeadlines.sort((a,b) => a.dateObj - b.dateObj);
        const upcomingDeadlines = transformedDeadlines.slice(0, 8).map(d => ({
          title: d.title,
          details: d.details,
          date: d.date
        }));

        // Commit metrics
        setMetrics({
          overviewData,
          overallRate,
          filingStatusData,
          upcomingDeadlines
        });
      } catch (err) {
        console.error("Error loading compliance metrics:", err);
        setError(err.message || String(err));
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  return (
    <>
      <div style={{ border: "1px solid #e5e7eb", borderRadius: "8px", marginBottom: "24px", padding: 16 }}>
        <div className="reports-section" style={{ borderRadius: "8px 8px 0 0" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <h2 className="reports-section-title">Compliance Status Overview</h2>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <button className="reports-header-export-btn" style={{ padding: "6px 14px", fontSize: "14px", width: "110px", display: "flex", alignItems: "center", gap: "8px" }}>
                <ExportIcon /> Export
              </button>
            </div>
          </div>

          {loading ? (
            <div style={{ padding: 24, textAlign: "center" }}>Loading compliance overview...</div>
          ) : error ? (
            <div style={{ padding: 24, color: "red" }}>Error: {error}</div>
          ) : metrics.overviewData.length === 0 ? (
            <div style={{ padding: 24, textAlign: "center", color: "#6b7280" }}>No filing tracker data available</div>
          ) : (
            <ComplianceOverviewChart data={metrics.overviewData} />
          )}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
        <div className="reports-section" style={{ padding: 16 }}>
          <h2 className="reports-section-title">Filing Status Summary</h2>
          <div style={{ marginTop: "16px", borderBottom: "1px solid #f3f4f6", paddingBottom: 12 }}>
            <div className="reports-compliance-overall" style={{ fontSize: 28, fontWeight: 700 }}>
              {metrics.overallRate.toFixed(1)}%
              <div className="reports-compliance-label" style={{ fontSize: 12, fontWeight: 500, color: "#6b7280" }}>Overall Compliance Rate</div>
            </div>
          </div>
          <div style={{ marginTop: "16px" }}>
            {metrics.filingStatusData.map((item, index) => (
              <div key={index} className="reports-filing-row" style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", alignItems: "center" }}>
                <span className="reports-filing-label" style={{ color: "#374151" }}>{item.label}</span>
                <span className={`reports-filing-percentage ${item.percentage >= 85.0 ? "high" : "low"}`} style={{ fontWeight: 600 }}>
                  {item.percentage.toFixed(1)}% ({item.count})
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="reports-section" style={{ padding: 16 }}>
          <h2 className="reports-section-title">Upcoming Deadlines</h2>
          <div style={{ marginTop: "16px" }}>
            {metrics.upcomingDeadlines.length === 0 ? (
              <div style={{ color: "#6b7280" }}>No upcoming deadlines found in the calendar.</div>
            ) : (
              metrics.upcomingDeadlines.map((deadline, index) => (
                <div key={index} className="reports-deadline-card" style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid #f3f4f6" }}>
                  <div>
                    <div className="reports-deadline-title" style={{ fontWeight: 600 }}>{deadline.title}</div>
                    <div className="reports-deadline-details" style={{ color: "#6b7280", fontSize: 13 }}>{deadline.details}</div>
                  </div>
                  <div className="reports-deadline-date" style={{ color: "#374151", fontWeight: 600 }}>Due: {deadline.date}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ComplianceStatus;

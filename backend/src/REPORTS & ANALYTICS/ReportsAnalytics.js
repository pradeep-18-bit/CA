import React, { useEffect, useMemo, useState } from "react";
import DashboardHeader from "../REPORTS & ANALYTICS/COMPONENTS/DashbaordHeader";
import InfoCards from "../REPORTS & ANALYTICS/COMPONENTS/InfoCards";
import Tabs from "../REPORTS & ANALYTICS/COMPONENTS/Tabs";
import ServiceBreakdown from "../REPORTS & ANALYTICS/COMPONENTS/ServiceBreakdown";
import TeamPerformance from "../REPORTS & ANALYTICS/COMPONENTS/TeamPerformance";
import ComplianceStatus from "../REPORTS & ANALYTICS/COMPONENTS/ComplianceStatus";
import RevenueAnalysis from "../REPORTS & ANALYTICS/COMPONENTS/RevenueAnalysis";

// API endpoints used in your other files (kept same as your examples)
const INVOICES_API = "https://posthemorrhagic-nonequilaterally-caroline.ngrok-free.dev/api/invoices";
const CLIENTS_API = "https://posthemorrhagic-nonequilaterally-caroline.ngrok-free.dev/api/clients";
const TIME_TRACKER_API = "https://posthemorrhagic-nonequilaterally-caroline.ngrok-free.dev/api/time-tracker";
const FILING_API = "https://posthemorrhagic-nonequilaterally-caroline.ngrok-free.dev/api/filingtracker";

// helper: safely parse invoiceItems JSON and sum amounts
const calculateTotalAmount = (invoiceItems) => {
  try {
    const items = typeof invoiceItems === "string" ? JSON.parse(invoiceItems || "[]") : invoiceItems || [];
    return items.reduce((sum, it) => sum + (Number(it.amount) || 0), 0);
  } catch (e) {
    // fallback: if invoiceItems is an array-like object
    try {
      return (invoiceItems || []).reduce((s, it) => s + (Number(it.amount) || 0), 0);
    } catch {
      return 0;
    }
  }
};

// helper: parse duration strings like "HH:MM", "HH:MM:SS" -> seconds
const parseDurationToSeconds = (durationStr) => {
  if (!durationStr) return NaN;
  const parts = String(durationStr).split(":").map(p => Number(p));
  if (parts.some(isNaN)) return NaN;
  if (parts.length === 3) {
    return parts[0] * 3600 + parts[1] * 60 + parts[2];
  } else if (parts.length === 2) {
    return parts[0] * 3600 + parts[1] * 60; // treat "HH:MM" as hours:minutes
  } else if (parts.length === 1) {
    return parts[0] * 3600;
  }
  return NaN;
};

// format seconds to "X.X hrs" or "Y days" if large
const formatAvgSeconds = (secs) => {
  if (!secs || isNaN(secs)) return "—";
  const hours = secs / 3600;
  if (hours >= 24) {
    const days = hours / 24;
    return `${(Math.round(days * 10) / 10).toFixed(1)} days`;
  }
  return `${(Math.round(hours * 10) / 10).toFixed(1)} hrs`;
};

const ReportsAnalytics = () => {
  const tabs = ["Revenue Analysis", "Service Breakdown", "Compliance Status", "Team Performance"];
  const [activeTab, setActiveTab] = useState("Revenue Analysis");

  // data states
  const [invoices, setInvoices] = useState([]);
  const [clients, setClients] = useState([]);
  const [timeEntries, setTimeEntries] = useState([]);
  const [filings, setFilings] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all 4 endpoints concurrently on mount
  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    const fetchAll = async () => {
      try {
        const [invRes, clientsRes, ttRes, filingRes] = await Promise.allSettled([
          fetch(INVOICES_API, { headers: { Accept: "application/json", "ngrok-skip-browser-warning": "true" } }),
          fetch(CLIENTS_API, { headers: { Accept: "application/json", "ngrok-skip-browser-warning": "true" } }),
          fetch(TIME_TRACKER_API, { headers: { Accept: "application/json", "ngrok-skip-browser-warning": "true" } }),
          fetch(FILING_API, { headers: { Accept: "application/json", "ngrok-skip-browser-warning": "true" } }),
        ]);

        // invoices
        if (invRes.status === "fulfilled" && invRes.value.ok) {
          const data = await invRes.value.json();
          if (isMounted) setInvoices(Array.isArray(data) ? data : []);
        } else {
          console.warn("Invoices fetch failed", invRes.reason || invRes.value);
          if (isMounted) setInvoices([]);
        }

        // clients
        if (clientsRes.status === "fulfilled" && clientsRes.value.ok) {
          const data = await clientsRes.value.json();
          if (isMounted) setClients(Array.isArray(data) ? data : []);
        } else {
          console.warn("Clients fetch failed", clientsRes.reason || clientsRes.value);
          if (isMounted) setClients([]);
        }

        // time entries
        if (ttRes.status === "fulfilled" && ttRes.value.ok) {
          const data = await ttRes.value.json();
          if (isMounted) setTimeEntries(Array.isArray(data) ? data : []);
        } else {
          console.warn("Time-tracker fetch failed", ttRes.reason || ttRes.value);
          if (isMounted) setTimeEntries([]);
        }

        // filings
        if (filingRes.status === "fulfilled" && filingRes.value.ok) {
          const data = await filingRes.value.json();
          if (isMounted) setFilings(Array.isArray(data) ? data : []);
        } else {
          console.warn("Filing fetch failed", filingRes.reason || filingRes.value);
          if (isMounted) setFilings([]);
        }
      } catch (err) {
        console.error("Error fetching dashboard data", err);
        if (isMounted) setError("Failed to fetch dashboard metrics");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchAll();
    return () => { isMounted = false; };
  }, []);

  // derived metrics (memoized)
  const totalRevenue = useMemo(() => {
    try {
      const enhanced = (invoices || []).map(inv => ({ ...inv, amount: calculateTotalAmount(inv.invoiceItems) }));
      return enhanced
        .filter(inv => (inv.status || "").toLowerCase() === "paid" || (inv.status || "").toLowerCase() === "completed")
        .reduce((sum, inv) => sum + (Number(inv.amount) || 0), 0);
    } catch {
      return 0;
    }
  }, [invoices]);

  const activeClientsCount = useMemo(() => {
    try {
      // prefer /api/clients which should return active clients per your API doc
      const list = clients || [];
      return list.filter(c => (c.status || "").toLowerCase() === "active").length;
    } catch {
      return 0;
    }
  }, [clients]);

  const avgCompletionSeconds = useMemo(() => {
    try {
      const entries = timeEntries || [];
      // time entries may store duration in `duration` or `duration` style strings like "01:30" or "01:30:15"
      const secs = entries
        .map(e => parseDurationToSeconds(e.duration || e.durationStr || e.duration_string || e.time || e.duration || ""))
        .filter(s => !isNaN(s));
      if (secs.length === 0) return NaN;
      const total = secs.reduce((a, b) => a + b, 0);
      return Math.round((total / secs.length)); // average seconds
    } catch {
      return NaN;
    }
  }, [timeEntries]);

  const complianceRatePercent = useMemo(() => {
    try {
      const all = filings || [];
      if (all.length === 0) return NaN;
      // consider a filing 'completed' when status equals 'Completed' (case-insensitive)
      const completed = all.filter(f => (f.status || "").toLowerCase() === "completed" || (f.status || "").toLowerCase() === "done" || (f.status || "").toLowerCase() === "filed").length;
      return Math.round((completed / all.length) * 1000) / 10; // 1 decimal
    } catch {
      return NaN;
    }
  }, [filings]);

  // Also prepare a filing breakdown by service if you want to show in compliance status component
  const filingByService = useMemo(() => {
    const map = {};
    (filings || []).forEach(f => {
      const svc = (f.service || f.servicedescription || "Other").trim();
      if (!map[svc]) map[svc] = { total: 0, completed: 0 };
      map[svc].total += 1;
      const isCompleted = ((f.status || "").toLowerCase() === "completed" || (f.status || "").toLowerCase() === "filed" || (f.status || "").toLowerCase() === "done");
      if (isCompleted) map[svc].completed += 1;
    });
    return map;
  }, [filings]);

  // Build card data for InfoCards component
  const cardData = [
    {
      title: "Total Revenue",
      value: `₹${(totalRevenue || 0).toLocaleString("en-IN")}`,
      change: loading ? "Loading..." : `${(invoices || []).filter(i => (i.status || "").toLowerCase() === "paid" || (i.status || "").toLowerCase() === "completed").length} invoices`,
      changeColor: "#073D7F",
      icon: "📈",
    },
    {
      title: "Active Clients",
      value: loading ? "—" : `${activeClientsCount}`,
      change: loading ? "" : `${activeClientsCount > 0 ? `${activeClientsCount} active` : "No active clients"}`,
      changeColor: "#6b7280",
      icon: "👥",
    },
    {
      title: "Avg. Completion Time",
      value: loading ? "—" : formatAvgSeconds(avgCompletionSeconds),
      change: loading ? "" : `${isNaN(avgCompletionSeconds) ? "No data" : "vs last period N/A"}`,
      changeColor: "#073D7F",
      icon: "🕒",
    },
    {
      title: "Compliance Rate",
      value: loading ? "—" : (isNaN(complianceRatePercent) ? "—" : `${complianceRatePercent}%`),
      change: loading ? "" : `${(filings || []).length} filings`,
      changeColor: "#073D7F",
      icon: "📊",
    },
  ];

  // Keep the rest of your static data (revenueData etc.) as-is (or adapt to dynamic later)
  const revenueData = [120000, 95000, 140000, 135000, 150000, 160000];
  const revenueMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  const maxRevenue = Math.max(...revenueData);
  const yAxisLabels = [0, 50000, 100000, 150000, 200000];
  const clientGrowthData = [5, 8, 10, 12, 15, 18];
  const clientGrowthLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  const revenueBreakdownData = [
    { title: "ITR Revenue", value: "₹4,20,000" },
    { title: "GST Revenue", value: "₹3,50,000" },
    { title: "TDS Revenue", value: "₹2,70,000" },
    { title: "ROC Revenue", value: "₹1,00,000" },
  ];

  return (
    <div className="reports-root">
      <DashboardHeader />
      <InfoCards cardData={cardData} />
      <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === "Service Breakdown" && <ServiceBreakdown />}
      {activeTab === "Team Performance" && <TeamPerformance />}
      {activeTab === "Compliance Status" && (
        <ComplianceStatus
          metrics={{
            overviewData: Object.keys(filingByService).map(s => ({
              label: s,
              completed: filingByService[s].completed,
              pending: filingByService[s].total - filingByService[s].completed
            })),
            filingStatusData: Object.keys(filingByService).map(s => ({
              label: s,
              percentage: filingByService[s].total ? Math.round((filingByService[s].completed / filingByService[s].total) * 1000) / 10 : 0
            })),
            upcomingDeadlines: [], // keep as-is or compute from filings if you have dueDate
            overallRate: isNaN(complianceRatePercent) ? 0 : complianceRatePercent,
          }}
        />
      )}
      {activeTab === "Revenue Analysis" && (
        <RevenueAnalysis
          revenueData={revenueData}
          revenueMonths={revenueMonths}
          maxRevenue={maxRevenue}
          yAxisLabels={yAxisLabels}
          clientGrowthData={clientGrowthData}
          clientGrowthLabels={clientGrowthLabels}
          revenueBreakdownData={revenueBreakdownData}
        />
      )}
      {error && <div style={{ padding: 12, color: "crimson" }}>Error: {error}</div>}
    </div>
  );
};

export default ReportsAnalytics;  

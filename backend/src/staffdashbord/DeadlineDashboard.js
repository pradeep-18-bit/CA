import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
// import { useSettings } from "./COMPONENTS/SettingsContext";
import StatCardStaff from "./COMPONENTS/Statcard";
import ExtraCardStaff from "./COMPONENTS/Extracard";
import DeadlineItemStaff from "./COMPONENTS/DeadlineItem";
// import ActivityItem from "./COMPONENTS/ActivityItem";
import "../Global.css";

export default function StaffDeadlineDashboard() {
  // const { settings } = useSettings();
  const navigate = useNavigate();

  const [candidates, setCandidates] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [revenue, setRevenue] = useState(0);
  const [loadingRevenue, setLoadingRevenue] = useState(true);
  const [newClientsCount, setNewClientsCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingTasks, setLoadingTasks] = useState(true);
  const [pendingInvoicesCount, setPendingInvoicesCount] = useState(0);
  const [supportTicketCount, setSupportTicketCount] = useState(0);

  const [dueTodayCount, setDueTodayCount] = useState(0);
  const [upcomingDeadlines, setUpcomingDeadlines] = useState([]);

  // ⭐ Activity state
  const [activityCount, setActivityCount] = useState(0);
  const [recentActivities, setRecentActivities] = useState([]); // raw from API
  const [previewActivities, setPreviewActivities] = useState([]); // filtered/sorted for UI

  // ⭐ Preview UI controls
  const [searchQuery, setSearchQuery] = useState("");
  const [sortMode, setSortMode] = useState("newest");

  const refreshIntervalRef = useRef(null);

  const timeAgo = (date) => {
    if (!date) return "N/A";
    const now = new Date();
    const diffMs = now - date;
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHr = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHr / 24);

    if (diffSec < 10) return "Just now";
    if (diffSec < 60) return `${diffSec} seconds ago`;
    if (diffMin < 60) return `${diffMin} minutes ago`;
    if (diffHr < 24) return `${diffHr} hours ago`;
    if (diffDay === 1) return "Yesterday";
    if (diffDay < 7) return `${diffDay} days ago`;

    return date.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  };

  const getEmojiForText = (text = "") => {
    const t = text.toLowerCase();
    if (t.includes("file") || t.includes("upload") || t.includes("document")) return "📄";
    if (t.includes("invoice") || t.includes("bill") || t.includes("payment")) return "🧾";
    if (t.includes("deadline") || t.includes("due") || t.includes("reminder")) return "⏰";
    if (t.includes("complete") || t.includes("done") || t.includes("filed")) return "✔️";
    if (t.includes("update")) return "🔄";
    if (t.includes("email")) return "✉️";
    if (t.includes("gst") || t.includes("tax")) return "💼";
    return "🔔";
  };

  const getInitial = (company = "") => {
    if (!company) return "?";
    const parts = company.trim().split(/\s+/);
    if (parts.length === 1) return parts[0][0]?.toUpperCase() || "?";
    return (parts[0][0] + parts[1][0]).toUpperCase();
  };

  useEffect(() => {
    let items = [...recentActivities];

    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      items = items.filter(
        (it) =>
          it.company.toLowerCase().includes(q) ||
          it.text.toLowerCase().includes(q)
      );
    }

    if (sortMode === "newest") {
      items.sort((a, b) => b.timestamp - a.timestamp);
    } else if (sortMode === "oldest") {
      items.sort((a, b) => a.timestamp - b.timestamp);
    } else if (sortMode === "company") {
      items.sort((a, b) => (a.company || "").localeCompare(b.company || ""));
    } else if (sortMode === "status") {
      items.sort((a, b) => (a.status || "").localeCompare(b.status || ""));
    }

    setPreviewActivities(items.slice(0, 4));
  }, [recentActivities, searchQuery, sortMode]);

  useEffect(() => {
    const handleActivityEvent = (event) => {
      setActivityCount(event.detail);
    };
    window.addEventListener("activityCount", handleActivityEvent);
    return () => window.removeEventListener("activityCount", handleActivityEvent);
  }, []);

  const fetchActivities = async () => {
    try {
      const res = await fetch(
        "https://posthemorrhagic-nonequilaterally-caroline.ngrok-free.dev/api/ComplianceCalendar",
        {
          headers: { Accept: "application/json", "ngrok-skip-browser-warning": "true" },
        }
      );

      const data = await res.json();

      const mapped = data.map((item) => ({
        id: item.complianceId ?? Math.random().toString(36).slice(2, 9),
        company: item.companyName || "Client",
        text: item.taskDescription || "Compliance Task",
        timestamp: item.deadline ? new Date(item.deadline) : null,
        status: item.status || "Pending",
      }));

      setRecentActivities(mapped);
      const count = mapped.length;
      setActivityCount(count);
      window.dispatchEvent(new CustomEvent("activityCount", { detail: count }));
    } catch (err) {
      console.error("Failed to load activities:", err);
    }
  };

  useEffect(() => {
    fetchActivities();
    refreshIntervalRef.current = setInterval(fetchActivities, 30000);
    return () => clearInterval(refreshIntervalRef.current);
  }, []);

  // UPCOMING DEADLINES
  useEffect(() => {
    const loadUpcoming = async () => {
      try {
        const res = await fetch(
          "https://posthemorrhagic-nonequilaterally-caroline.ngrok-free.dev/api/ComplianceCalendar",
          {
            headers: { Accept: "application/json", "ngrok-skip-browser-warning": "true" },
          }
        );

        const data = await res.json();

        const today = new Date().setHours(0, 0, 0, 0);

        const filtered = data
          .filter((d) => d.status !== "Completed")
          .filter((d) => new Date(d.deadline).setHours(0, 0, 0, 0) >= today)
          .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
          .slice(0, 4);

        setUpcomingDeadlines(filtered);
      } catch (err) {
        console.log("UPCOMING DEADLINE ERROR:", err);
      }
    };

    loadUpcoming();
  }, []);

  // DUE TODAY
  useEffect(() => {
    const loadDueToday = async () => {
      try {
        const res = await fetch(
          "https://posthemorrhagic-nonequilaterally-caroline.ngrok-free.dev/api/ComplianceCalendar",
          {
            headers: { Accept: "application/json", "ngrok-skip-browser-warning": "true" },
          }
        );

        const data = await res.json();

        const today = new Date().setHours(0, 0, 0, 0);

        const filtered = data.filter((item) => {
          const d = new Date(item.deadline).setHours(0, 0, 0, 0);
          return d === today;
        });

        setDueTodayCount(filtered.length);
      } catch (err) {
        console.log("DUE TODAY ERROR:", err);
      }
    };

    loadDueToday();
  }, []);

  // TASK COUNT
  useEffect(() => {
    const loadTasksTotal = async () => {
      try {
        const res = await fetch(
          "https://posthemorrhagic-nonequilaterally-caroline.ngrok-free.dev/api/tasks",
          {
            headers: { Accept: "application/json", "ngrok-skip-browser-warning": "true" },
          }
        );

        const data = await res.json();
        setSupportTicketCount(data.length);
      } catch (err) {
        console.error("Task Count Error:", err);
      }
    };

    loadTasksTotal();
  }, []);

  // CLIENTS
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await fetch(
          "https://posthemorrhagic-nonequilaterally-caroline.ngrok-free.dev/api/clients",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "ngrok-skip-browser-warning": "true",
            },
          }
        );

        const data = await res.json();

        setCandidates(
          data.map((item) => ({
            id: item.id,
            name: item.clientName,
            role: item.services || "N/A",
            email: item.contact || "N/A",
            status: item.status,
          }))
        );

        const now = new Date();
        const oneDayAgo = new Date(now.getTime() - 86400000);

        const count = data.filter((c) => {
          const created = new Date(c.createdAt);
          return c.status === "Active" && created >= oneDayAgo;
        }).length;

        setNewClientsCount(count);
      } catch (err) {
        console.error("Client Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  // ACTIVE TASKS
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const res = await fetch(
          "https://posthemorrhagic-nonequilaterally-caroline.ngrok-free.dev/api/tasks",
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "ngrok-skip-browser-warning": "true",
            },
          }
        );

        const data = await res.json();
        const inProgress = data.filter(
          (t) => t.status?.toLowerCase() === "in progress"
        );

        setTasks(inProgress);
      } catch (err) {
        console.log("Task Load Error:", err);
      } finally {
        setLoadingTasks(false);
      }
    };

    loadTasks();
  }, []);

  // REVENUE
  useEffect(() => {
    const loadRevenue = async () => {
      try {
        const res = await fetch(
          "https://posthemorrhagic-nonequilaterally-caroline.ngrok-free.dev/api/invoices",
          {
            headers: { Accept: "application/json", "ngrok-skip-browser-warning": "true" },
          }
        );

        const invoices = await res.json();
        let total = 0;

        invoices.forEach((inv) => {
          try {
            const items = JSON.parse(inv.invoiceItems || "[]");
            total += items.reduce(
              (acc, item) => acc + (Number(item.amount) || 0),
              0
            );
          } catch (e) {}
        });

        setRevenue(total);
      } catch (err) {
        console.error("Revenue Error:", err);
      } finally {
        setLoadingRevenue(false);
      }
    };

    loadRevenue();
  }, []);

  // PENDING INVOICES
  useEffect(() => {
    const loadPendingInvoices = async () => {
      try {
        const res = await fetch(
          "https://posthemorrhagic-nonequilaterally-caroline.ngrok-free.dev/api/invoices",
          {
            headers: { Accept: "application/json", "ngrok-skip-browser-warning": "true" },
          }
        );

        const invoices = await res.json();
        const count = invoices.filter(
          (inv) => inv.status === "Pending" || inv.status === "Overdue"
        ).length;

        setPendingInvoicesCount(count);
      } catch (err) {
        console.error("Pending Invoice Error:", err);
      }
    };

    loadPendingInvoices();
  }, []);

  const statusColor = (status = "") => {
    const s = status.toLowerCase();
    if (s === "completed" || s === "done") return "#16a34a";
    if (s === "in progress") return "#f59e0b";
    if (s === "pending") return "#ef4444";
    return "#374151";
  };

  // --------------------------------------------------------------------
  // UI LAYOUT — SWAPPED POSITIONS OF UPCOMING DEADLINES & RECENT ACTIVITIES
  // --------------------------------------------------------------------

  return (
    <div className="deadline-dashboard-root">
      <div className="deadline-dashboard-header">
        <div>
          <h2 className="deadline-dashboard-header-title">Staff DASHBOARD</h2>
          <p className="deadline-dashboard-header-desc">
            Welcome back! Here’s your firm’s overview.
          </p>
        </div>

        <div className="deadline-dashboard-header-btns">
          <button
            className="deadline-dashboard-clients-btn"
            onClick={() => navigate("/clients")}
          >
            Go to Clients
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="deadline-dashboard-stats">
        <div onClick={() => navigate("/live-tasks_staff")} style={{ cursor: "pointer" }}>
          <StatCardStaff
            // label={settings.metricLabels.projects || "Live Tasks"}
            value={loadingTasks ? "…" : tasks.length}
            subtitle="Active ongoing tasks"
          />
        </div>

        <div onClick={() => navigate("/due-today_staff")} style={{ cursor: "pointer" }}>
          <StatCardStaff
            label="Due Today"
            value={dueTodayCount}
            subtitle="Calendar Dues"
            highlight="error"
          />
        </div>

        <div onClick={() => navigate("/candidates_staff")} style={{ cursor: "pointer" }}>
          <StatCardStaff
            label="Candidates"
            value={loading ? "…" : candidates.length}
            subtitle="All Active clients"
            highlight="success"
          />
        </div>

        <div onClick={() => navigate("/revenue_staff")} style={{ cursor: "pointer" }}>
          <StatCardStaff
            label="Revenue This Month"
            value={loadingRevenue ? "…" : `₹${revenue.toLocaleString()}`}
            subtitle="Auto-synced from invoices"
          />
        </div>
      </div>

      {/* SWAPPED: RECENT ACTIVITIES COMES FIRST NOW */}
      <div className="deadline-dashboard-main">

        {/* RECENT ACTIVITIES — MOVED LEFT */}
        <div className="deadline-dashboard-card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3 className="deadline-dashboard-section-title">
              🔔 Recent Activities ({activityCount})
            </h3>

            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search activities..."
                style={{
                  padding: "6px 10px",
                  borderRadius: 8,
                  border: "1px solid #e5e7eb",
                  fontSize: 13,
                }}
              />

              <select
                value={sortMode}
                onChange={(e) => setSortMode(e.target.value)}
                style={{
                  padding: "6px 10px",
                  borderRadius: 8,
                  border: "1px solid #e5e7eb",
                  fontSize: 13,
                }}
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="company">Company A–Z</option>
                <option value="status">Status</option>
              </select>
            </div>
          </div>

          {previewActivities.length === 0 && (
            <p style={{ color: "#777", marginTop: 8 }}>No recent activities</p>
          )}

          {previewActivities.map((a) => (
            <div
              key={a.id}
              style={{
                display: "flex",
                gap: 12,
                alignItems: "center",
                padding: "10px 0",
                borderBottom: "1px solid #f1f5f9",
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#eef2ff",
                  fontWeight: 700,
                  fontSize: 14,
                  color: "#0f172a",
                }}
              >
                {getInitial(a.company)}
              </div>

              <div style={{ fontSize: 20 }}>{getEmojiForText(a.text)}</div>

              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                  <div style={{ fontWeight: 600 }}>
                    {a.text} <span style={{ color: "#6b7280" }}>— {a.company}</span>
                  </div>
                  <div style={{ fontSize: 12, color: "#6b7280" }}>
                    {timeAgo(a.timestamp)}
                  </div>
                </div>

                <div style={{ marginTop: 6, display: "flex", gap: 8, alignItems: "center" }}>
                  <div
                    style={{
                      padding: "4px 8px",
                      borderRadius: 999,
                      fontWeight: 600,
                      fontSize: 12,
                      background: `${statusColor(a.status)}20`,
                      color: statusColor(a.status),
                      border: `1px solid ${statusColor(a.status)}33`,
                    }}
                  >
                    {a.status}
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="deadline-dashboard-card-footer" style={{ marginTop: 8 }}>
            <button
              className="deadline-dashboard-link-btn"
              onClick={() => navigate("/activity-log_staff")}
            >
              View Activity Log
            </button>
          </div>
        </div>

        {/* UPCOMING DEADLINES — MOVED RIGHT */}
        <div className="deadline-dashboard-card">
          <h3 className="deadline-dashboard-section-title">⏰ Upcoming Deadlines</h3>

          {upcomingDeadlines.length === 0 && (
            <p style={{ color: "#777" }}>No upcoming deadlines</p>
          )}

          {upcomingDeadlines.map((d) => (
            <DeadlineItemStaff
              key={d.id}
              company={d.companyName}
              task={d.taskDescription}
              date={d.deadline?.slice(0, 10)}
              priority={d.priority || "Pending"}
              color="#ef4444"
            />
          ))}

          <div className="deadline-dashboard-card-footer">
            <button
              className="deadline-dashboard-link-btn"
              onClick={() => navigate("/all-deadlines_staff")}
            >
              View All Deadlines
            </button>
          </div>
        </div>
      </div>

      {/* Extra Cards */}
      <div className="deadline-dashboard-extras">
        <div onClick={() => navigate("/new-clients_staff")} style={{ cursor: "pointer" }}>
          <ExtraCardStaff title="New Clients Added" value={newClientsCount} subtitle="Last 24 hours" />
        </div>

        <div onClick={() => navigate("/pending-invoices_staff")} style={{ cursor: "pointer" }}>
          <ExtraCardStaff title="Pending Invoices" value={pendingInvoicesCount} subtitle="Awaiting payment" />
        </div>

        <div onClick={() => navigate("/support-tickets_staff")} style={{ cursor: "pointer" }}>
          <ExtraCardStaff title="Total Tasks" value={supportTicketCount} subtitle="Total tickets submitted" />
        </div>
      </div>
    </div>
  );
}

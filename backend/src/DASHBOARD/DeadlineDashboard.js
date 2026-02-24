
// import React, { useEffect, useState, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import { useSettings } from "./COMPONENTS/SettingsContext";
// import StatCard from "./COMPONENTS/Statcard";
// import ExtraCard from "./COMPONENTS/Extracard";
// import DeadlineItem from "./COMPONENTS/DeadlineItem";
// // import ActivityItem from "./COMPONENTS/ActivityItem";
// // import RevenueDetailspage from "./COMPONENTS/pages/RevenuePage";

// import "../Global.css";

// export default function DeadlineDashboard() {
//   const { settings } = useSettings();
//   const navigate = useNavigate();

//   // ---------- USER INFO (ROLE + EMAIL) ----------
//   const [userRole, setUserRole] = useState("");
//   const [userEmail, setUserEmail] = useState("");

//   useEffect(() => {
//     try {
//       const storedRole = localStorage.getItem("role") || "";
//       const storedEmail = localStorage.getItem("email") || "";

//       setUserRole(storedRole.toLowerCase());
//       setUserEmail(storedEmail.toLowerCase());
//     } catch (err) {
//       console.error("Error reading user info from localStorage:", err);
//       setUserRole("");
//       setUserEmail("");
//     }
//   }, []);

//   const isAdmin = userRole === "admin";

//   // ---------- STATE ----------
//   const [candidates, setCandidates] = useState([]);
//   const [tasks, setTasks] = useState([]); // live tasks
//   const [revenue, setRevenue] = useState(0);
//   const [loadingRevenue, setLoadingRevenue] = useState(true);
//   const [newClientsCount, setNewClientsCount] = useState(0);
//   const [loadingClients, setLoadingClients] = useState(true);
//   const [loadingTasks, setLoadingTasks] = useState(true);
//   const [pendingInvoicesCount, setPendingInvoicesCount] = useState(0);
//   const [supportTicketCount, setSupportTicketCount] = useState(0); // total tasks

//   const [dueTodayCount, setDueTodayCount] = useState(0);
//   const [upcomingDeadlines, setUpcomingDeadlines] = useState([]);

//   // Activity state (kept global for everyone)
//   const [activityCount, setActivityCount] = useState(0);
//   const [recentActivities, setRecentActivities] = useState([]);
//   const [previewActivities, setPreviewActivities] = useState([]);

//   // Activity UI controls
//   const [searchQuery, setSearchQuery] = useState("");
//   const [sortMode, setSortMode] = useState("newest");

//   const refreshIntervalRef = useRef(null);

//   // ---------- HELPERS ----------
//   const timeAgo = (date) => {
//     if (!date) return "N/A";
//     const now = new Date();
//     const diffMs = now - date;
//     const diffSec = Math.floor(diffMs / 1000);
//     const diffMin = Math.floor(diffSec / 60);
//     const diffHr = Math.floor(diffMin / 60);
//     const diffDay = Math.floor(diffHr / 24);

//     if (diffSec < 10) return "Just now";
//     if (diffSec < 60) return `${diffSec} seconds ago`;
//     if (diffMin < 60) return `${diffMin} minutes ago`;
//     if (diffHr < 24) return `${diffHr} hours ago`;
//     if (diffDay === 1) return "Yesterday";
//     if (diffDay < 7) return `${diffDay} days ago`;

//     return date.toLocaleDateString("en-IN", {
//       year: "numeric",
//       month: "short",
//       day: "2-digit",
//     });
//   };

//   const getEmojiForText = (text = "") => {
//     const t = text.toLowerCase();
//     if (t.includes("file") || t.includes("upload") || t.includes("document")) return "📄";
//     if (t.includes("invoice") || t.includes("bill") || t.includes("payment")) return "🧾";
//     if (t.includes("deadline") || t.includes("due") || t.includes("reminder")) return "⏰";
//     if (t.includes("complete") || t.includes("done") || t.includes("filed")) return "✔️";
//     if (t.includes("update")) return "🔄";
//     if (t.includes("email")) return "✉️";
//     if (t.includes("gst") || t.includes("tax")) return "💼";
//     return "🔔";
//   };

//   const getInitial = (company = "") => {
//     if (!company) return "?";
//     const parts = company.trim().split(/\s+/);
//     if (parts.length === 1) return parts[0][0]?.toUpperCase() || "?";
//     return (parts[0][0] + parts[1][0]).toUpperCase();
//   };

//   const statusColor = (status = "") => {
//     const s = status.toLowerCase();
//     if (s === "completed" || s === "done") return "#16a34a";
//     if (s === "in progress") return "#f59e0b";
//     if (s === "pending") return "#ef4444";
//     return "#374151";
//   };

//   // ---------- ACTIVITY PREVIEW ----------
//   useEffect(() => {
//     let items = [...recentActivities];

//     if (searchQuery.trim()) {
//       const q = searchQuery.trim().toLowerCase();
//       items = items.filter(
//         (it) =>
//           it.company.toLowerCase().includes(q) ||
//           it.text.toLowerCase().includes(q)
//       );
//     }

//     if (sortMode === "newest") {
//       items.sort((a, b) => b.timestamp - a.timestamp);
//     } else if (sortMode === "oldest") {
//       items.sort((a, b) => a.timestamp - b.timestamp);
//     } else if (sortMode === "company") {
//       items.sort((a, b) => (a.company || "").localeCompare(b.company || ""));
//     } else if (sortMode === "status") {
//       items.sort((a, b) => (a.status || "").localeCompare(b.status || ""));
//     }

//     setPreviewActivities(items.slice(0, 4));
//   }, [recentActivities, searchQuery, sortMode]);

//   useEffect(() => {
//     const handleActivityEvent = (event) => {
//       setActivityCount(event.detail);
//     };
//     window.addEventListener("activityCount", handleActivityEvent);
//     return () => window.removeEventListener("activityCount", handleActivityEvent);
//   }, []);

//   // ---------- RECENT ACTIVITIES (NO FILTER – EVERYONE SEES ALL) ----------
//   const fetchActivities = async () => {
//     try {
//       const res = await fetch(
//         "https://posthemorrhagic-nonequilaterally-caroline.ngrok-free.dev/api/ComplianceCalendar",
//         {
//           headers: { Accept: "application/json", "ngrok-skip-browser-warning": "true" },
//         }
//       );

//       const data = await res.json();

//       const mapped = data.map((item) => ({
//         id: item.complianceId ?? Math.random().toString(36).slice(2, 9),
//         company: item.companyName || "Client",
//         text: item.taskDescription || "Compliance Task",
//         timestamp: item.deadline ? new Date(item.deadline) : null,
//         status: item.status || "Pending",
//       }));

//       setRecentActivities(mapped);
//       const count = mapped.length;
//       setActivityCount(count);
//       window.dispatchEvent(new CustomEvent("activityCount", { detail: count }));
//     } catch (err) {
//       console.error("Failed to load activities:", err);
//     }
//   };

//   useEffect(() => {
//     fetchActivities();
//     refreshIntervalRef.current = setInterval(fetchActivities, 30000);
//     return () => clearInterval(refreshIntervalRef.current);
//   }, []);

//   // ---------- UPCOMING DEADLINES (FILTERED FOR STAFF/INTERN) ----------
//   useEffect(() => {
//     const loadUpcoming = async () => {
//       if (!userRole) return; // wait for role to load

//       try {
//         const res = await fetch(
//           "https://posthemorrhagic-nonequilaterally-caroline.ngrok-free.dev/api/ComplianceCalendar",
//           {
//             headers: { Accept: "application/json", "ngrok-skip-browser-warning": "true" },
//           }
//         );

//         const data = await res.json();

//         const today = new Date().setHours(0, 0, 0, 0);

//         let filtered = data
//           .filter((d) => d.status !== "Completed")
//           .filter((d) => {
//             if (!d.deadline) return false;
//             return new Date(d.deadline).setHours(0, 0, 0, 0) >= today;
//           });

//         // staff / intern -> only their deadlines
//         if (userRole === "staff" || userRole === "intern") {
//           const emailLower = userEmail;
//           filtered = filtered.filter(
//             (d) =>
//               (d.assignedToEmail || "").toLowerCase() === emailLower
//           );
//         }

//         filtered = filtered
//           .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
//           .slice(0, 4);

//         setUpcomingDeadlines(filtered);
//       } catch (err) {
//         console.log("UPCOMING DEADLINE ERROR:", err);
//       }
//     };

//     loadUpcoming();
//   }, [userRole, userEmail]);

//   // ---------- DUE TODAY (FILTERED FOR STAFF/INTERN) ----------
//   useEffect(() => {
//     const loadDueToday = async () => {
//       if (!userRole) return;

//       try {
//         const res = await fetch(
//           "https://posthemorrhagic-nonequilaterally-caroline.ngrok-free.dev/api/ComplianceCalendar",
//           {
//             headers: { Accept: "application/json", "ngrok-skip-browser-warning": "true" },
//           }
//         );

//         const data = await res.json();

//         const today = new Date().setHours(0, 0, 0, 0);

//         let filtered = data.filter((item) => {
//           if (!item.deadline) return false;
//           const d = new Date(item.deadline).setHours(0, 0, 0, 0);
//           return d === today;
//         });

//         if (userRole === "staff" || userRole === "intern") {
//           const emailLower = userEmail;
//           filtered = filtered.filter(
//             (d) =>
//               (d.assignedToEmail || "").toLowerCase() === emailLower
//           );
//         }

//         setDueTodayCount(filtered.length);
//       } catch (err) {
//         console.log("DUE TODAY ERROR:", err);
//       }
//     };

//     loadDueToday();
//   }, [userRole, userEmail]);

//   // ---------- TOTAL TASKS (FILTERED FOR STAFF/INTERN) ----------
//   useEffect(() => {
//     const loadTasksTotal = async () => {
//       if (!userRole) return;

//       try {
//         const res = await fetch(
//           "https://posthemorrhagic-nonequilaterally-caroline.ngrok-free.dev/api/tasks",
//           {
//             headers: { Accept: "application/json", "ngrok-skip-browser-warning": "true" },
//           }
//         );

//         const data = await res.json();

//         let filtered = data;
//         if (userRole === "staff" || userRole === "intern") {
//           const emailLower = userEmail;
//           filtered = data.filter(
//             (t) =>
//               (t.assignedToEmail || "").toLowerCase() === emailLower
//           );
//         }

//         setSupportTicketCount(filtered.length);
//       } catch (err) {
//         console.error("Task Count Error:", err);
//       }
//     };

//     loadTasksTotal();
//   }, [userRole, userEmail]);

//   // ---------- LIVE TASKS (FILTERED FOR STAFF/INTERN) ----------
//   useEffect(() => {
//     const loadTasks = async () => {
//       if (!userRole) return;

//       try {
//         const res = await fetch(
//           "https://posthemorrhagic-nonequilaterally-caroline.ngrok-free.dev/api/tasks",
//           {
//             method: "GET",
//             headers: {
//               Accept: "application/json",
//               "Content-Type": "application/json",
//               "ngrok-skip-browser-warning": "true",
//             },
//           }
//         );

//         const data = await res.json();

//         let inProgress = data.filter(
//           (t) => t.status?.toLowerCase() === "in progress"
//         );

//         if (userRole === "staff" || userRole === "intern") {
//           const emailLower = userEmail;
//           inProgress = inProgress.filter(
//             (t) =>
//               (t.assignedToEmail || "").toLowerCase() === emailLower
//           );
//         }

//         setTasks(inProgress);
//       } catch (err) {
//         console.log("Task Load Error:", err);
//       } finally {
//         setLoadingTasks(false);
//       }
//     };

//     loadTasks();
//   }, [userRole, userEmail]);

//   // ---------- CLIENTS (GLOBAL FOR EVERYONE) ----------
//   useEffect(() => {
//     const fetchClients = async () => {
//       try {
//         const res = await fetch(
//           "https://posthemorrhagic-nonequilaterally-caroline.ngrok-free.dev/api/clients",
//           {
//             method: "GET",
//             headers: {
//               "Content-Type": "application/json",
//               "ngrok-skip-browser-warning": "true",
//             },
//           }
//         );

//         const data = await res.json();

//         setCandidates(
//           data.map((item) => ({
//             id: item.id,
//             name: item.clientName,
//             role: item.services || "N/A",
//             email: item.contact || "N/A",
//             status: item.status,
//           }))
//         );

//         const now = new Date();
//         const oneDayAgo = new Date(now.getTime() - 86400000);

//         const count = data.filter((c) => {
//           const created = new Date(c.createdAt);
//           return c.status === "Active" && created >= oneDayAgo;
//         }).length;

//         setNewClientsCount(count);
//       } catch (err) {
//         console.error("Client Error:", err);
//       } finally {
//         setLoadingClients(false);
//       }
//     };

//     fetchClients();
//   }, []);

//   // ---------- REVENUE (GLOBAL, BUT CARD VISIBLE ONLY FOR ADMIN) ----------
//   useEffect(() => {
//     const loadRevenue = async () => {
//       try {
//         const res = await fetch(
//           "https://posthemorrhagic-nonequilaterally-caroline.ngrok-free.dev/api/invoices",
//           {
//             headers: { Accept: "application/json", "ngrok-skip-browser-warning": "true" },
//           }
//         );

//         const invoices = await res.json();
//         let total = 0;

//         invoices.forEach((inv) => {
//           try {
//             const items = JSON.parse(inv.invoiceItems || "[]");
//             total += items.reduce(
//               (acc, item) => acc + (Number(item.amount) || 0),
//               0
//             );
//           } catch (e) {}
//         });

//         setRevenue(total);
//       } catch (err) {
//         console.error("Revenue Error:", err);
//       } finally {
//         setLoadingRevenue(false);
//       }
//     };

//     loadRevenue();
//   }, []);

//   // ---------- PENDING INVOICES (GLOBAL) ----------
//   useEffect(() => {
//     const loadPendingInvoices = async () => {
//       try {
//         const res = await fetch(
//           "https://posthemorrhagic-nonequilaterally-caroline.ngrok-free.dev/api/invoices",
//           {
//             headers: { Accept: "application/json", "ngrok-skip-browser-warning": "true" },
//           }
//         );

//         const invoices = await res.json();
//         const count = invoices.filter(
//           (inv) => inv.status === "Pending" || inv.status === "Overdue"
//         ).length;

//         setPendingInvoicesCount(count);
//       } catch (err) {
//         console.error("Pending Invoice Error:", err);
//       }
//     };

//     loadPendingInvoices();
//   }, []);

//   // ---------- TITLE / SUBTITLE ----------
//   let dashboardTitle = "CA DASHBOARD";
//   let dashboardSubtitle = "Welcome back! Here’s your firm’s overview.";

//   if (userRole === "staff") {
//     dashboardTitle = "STAFF DASHBOARD";
//     dashboardSubtitle = "Welcome back!";
//   } else if (userRole === "intern") {
//     dashboardTitle = "INTERN DASHBOARD";
//     dashboardSubtitle = "Welcome back!";
//   } else if (userRole === "admin") {
//     dashboardTitle = "CA DASHBOARD";
//     dashboardSubtitle = "Welcome back! Here’s your firm’s overview.";
//   }

//   // ---------- UI ----------
//   return (
//     <div className="deadline-dashboard-root">
//       <div className="deadline-dashboard-header">
//         <div>
//           <h2 className="deadline-dashboard-header-title">{dashboardTitle}</h2>
//           <p className="deadline-dashboard-header-desc">
//             {dashboardSubtitle}
//           </p>
//         </div>

//         <div className="deadline-dashboard-header-btns">
//           <button
//             className="deadline-dashboard-clients-btn"
//             onClick={() => navigate("/clients")}
//           >
//             Go to Clients
//           </button>
//         </div>
//       </div>

//       {/* Stats Row */}
//       <div className="deadline-dashboard-stats">
//         {/* Live Tasks – filtered for staff/intern, global for admin */}
//         <div onClick={() => navigate("/live-tasks")} style={{ cursor: "pointer" }}>
//           <StatCard
//             label={settings.metricLabels.projects || "Live Tasks"}
//             value={loadingTasks ? "…" : tasks.length}
//             subtitle="Active ongoing tasks"
//           />
//         </div>

//         {/* Due Today – filtered for staff/intern, global for admin */}
//         <div onClick={() => navigate("/due-today")} style={{ cursor: "pointer" }}>
//           <StatCard
//             label="Due Today"
//             value={dueTodayCount}
//             subtitle="Calendar Dues"
//             highlight="error"
//           />
//         </div>

//         {/* Candidates – global for everyone */}
//         <div onClick={() => navigate("/candidates")} style={{ cursor: "pointer" }}>
//           <StatCard
//             label="Candidates"
//             value={loadingClients ? "…" : candidates.length}
//             subtitle="All Active clients"
//             highlight="success"
//           />
//         </div>

//         {/* Revenue – ADMIN ONLY */}
//         {isAdmin && (
//           <div onClick={() => navigate("/revenue")} style={{ cursor: "pointer" }}>
//             <StatCard
//               label="Revenue This Month"
//               value={loadingRevenue ? "…" : `₹${revenue.toLocaleString()}`}
//               subtitle="Auto-synced from invoices"
//             />
//           </div>
//         )}
//       </div>

//       {/* Main Content: Activities + Upcoming Deadlines */}
//       <div className="deadline-dashboard-main">
//         {/* Recent Activities – global */}
//         <div className="deadline-dashboard-card">
//           <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//             <h3 className="deadline-dashboard-section-title">
//               🔔 Recent Activities ({activityCount})
//             </h3>

//             <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
//               <input
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 placeholder="Search activities..."
//                 style={{
//                   padding: "6px 10px",
//                   borderRadius: 8,
//                   border: "1px solid #e5e7eb",
//                   fontSize: 13,
//                 }}
//               />

//               <select
//                 value={sortMode}
//                 onChange={(e) => setSortMode(e.target.value)}
//                 style={{
//                   padding: "6px 10px",
//                   borderRadius: 8,
//                   border: "1px solid #e5e7eb",
//                   fontSize: 13,
//                 }}
//               >
//                 <option value="newest">Newest</option>
//                 <option value="oldest">Oldest</option>
//                 <option value="company">Company A–Z</option>
//                 <option value="status">Status</option>
//               </select>
//             </div>
//           </div>

//           {previewActivities.length === 0 && (
//             <p style={{ color: "#777", marginTop: 8 }}>No recent activities</p>
//           )}

//           {previewActivities.map((a) => (
//             <div
//               key={a.id}
//               style={{
//                 display: "flex",
//                 gap: 12,
//                 alignItems: "center",
//                 padding: "10px 0",
//                 borderBottom: "1px solid #f1f5f9",
//               }}
//             >
//               <div
//                 style={{
//                   width: 44,
//                   height: 44,
//                   borderRadius: "50%",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   background: "#eef2ff",
//                   fontWeight: 700,
//                   fontSize: 14,
//                   color: "#0f172a",
//                 }}
//               >
//                 {getInitial(a.company)}
//               </div>

//               <div style={{ fontSize: 20 }}>{getEmojiForText(a.text)}</div>

//               <div style={{ flex: 1 }}>
//                 <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
//                   <div style={{ fontWeight: 600 }}>
//                     {a.text} <span style={{ color: "#6b7280" }}>— {a.company}</span>
//                   </div>
//                   <div style={{ fontSize: 12, color: "#6b7280" }}>
//                     {timeAgo(a.timestamp)}
//                   </div>
//                 </div>

//                 <div style={{ marginTop: 6, display: "flex", gap: 8, alignItems: "center" }}>
//                   <div
//                     style={{
//                       padding: "4px 8px",
//                       borderRadius: 999,
//                       fontWeight: 600,
//                       fontSize: 12,
//                       background: `${statusColor(a.status)}20`,
//                       color: statusColor(a.status),
//                       border: `1px solid ${statusColor(a.status)}33`,
//                     }}
//                   >
//                     {a.status}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}

//           <div className="deadline-dashboard-card-footer" style={{ marginTop: 8 }}>
//             <button
//               className="deadline-dashboard-link-btn"
//               onClick={() => navigate("/activity-log")}
//             >
//               View Activity Log
//             </button>
//           </div>
//         </div>

//         {/* Upcoming Deadlines – filtered for staff/intern */}
//         <div className="deadline-dashboard-card">
//           <h3 className="deadline-dashboard-section-title">⏰ Upcoming Deadlines</h3>

//           {upcomingDeadlines.length === 0 && (
//             <p style={{ color: "#777" }}>No upcoming deadlines</p>
//           )}

//           {upcomingDeadlines.map((d) => (
//             <DeadlineItem
//               key={d.id}
//               company={d.companyName}
//               task={d.taskDescription}
//               date={d.deadline?.slice(0, 10)}
//               priority={d.priority || "Pending"}
//               color="#ef4444"
//             />
//           ))}

//           <div className="deadline-dashboard-card-footer">
//             <button
//               className="deadline-dashboard-link-btn"
//               onClick={() => navigate("/all-deadlines")}
//             >
//               View All Deadlines
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Extra Cards */}
//       <div className="deadline-dashboard-extras">
//         {/* New Clients Added – ADMIN ONLY */}
//         {isAdmin && (
//           <div onClick={() => navigate("/new-clients")} style={{ cursor: "pointer" }}>
//             <ExtraCard
//               title="New Clients Added"
//               value={newClientsCount}
//               subtitle="Last 24 hours"
//             />
//           </div>
//         )}

//         {/* Pending Invoices – global */}
//         <div onClick={() => navigate("/pending-invoices")} style={{ cursor: "pointer" }}>
//           <ExtraCard
//             title="Pending Invoices"
//             value={pendingInvoicesCount}
//             subtitle="Awaiting payment"
//           />
//         </div>

//         {/* Total Tasks – filtered for staff/intern */}
//         <div onClick={() => navigate("/support-tickets")} style={{ cursor: "pointer" }}>
//           <ExtraCard
//             title="Total Tasks"
//             value={supportTicketCount}
//             subtitle="Total tickets submitted"
//           />
//         </div>
//       </div>
//     </div>
//   );
// }





import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSettings } from "./COMPONENTS/SettingsContext";
import StatCard from "./COMPONENTS/Statcard";
import ExtraCard from "./COMPONENTS/Extracard";
import DeadlineItem from "./COMPONENTS/DeadlineItem";
// import ActivityItem from "./COMPONENTS/ActivityItem";
// import RevenueDetailspage from "./COMPONENTS/pages/RevenuePage";

import "../Global.css";

export default function DeadlineDashboard() {
  const { settings } = useSettings();
  const navigate = useNavigate();

  // ---------- USER INFO (ROLE + EMAIL) ----------
  const [userRole, setUserRole] = useState("");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    try {
      const storedRole = localStorage.getItem("role") || "";
      const storedEmail = localStorage.getItem("email") || "";

      setUserRole(storedRole.toLowerCase());
      setUserEmail(storedEmail.toLowerCase());
    } catch (err) {
      console.error("Error reading user info from localStorage:", err);
      setUserRole("");
      setUserEmail("");
    }
  }, []);

  const isAdmin = userRole === "admin";

  // ---------- STATE ----------
  const [candidates, setCandidates] = useState([]);
  const [tasks, setTasks] = useState([]); // live tasks
  const [revenue, setRevenue] = useState(0);
  const [loadingRevenue, setLoadingRevenue] = useState(true);
  const [newClientsCount, setNewClientsCount] = useState(0);
  const [loadingClients, setLoadingClients] = useState(true);
  const [loadingTasks, setLoadingTasks] = useState(true);
  const [pendingInvoicesCount, setPendingInvoicesCount] = useState(0);
  const [supportTicketCount, setSupportTicketCount] = useState(0); // total tasks

  const [dueTodayCount, setDueTodayCount] = useState(0);
  const [upcomingDeadlines, setUpcomingDeadlines] = useState([]);

  // Activity state (kept global for everyone)
  const [activityCount, setActivityCount] = useState(0);
  const [recentActivities, setRecentActivities] = useState([]);
  const [previewActivities, setPreviewActivities] = useState([]);

  // Activity UI controls
  const [searchQuery, setSearchQuery] = useState("");
  const [sortMode, setSortMode] = useState("newest");

  const refreshIntervalRef = useRef(null);

  // ---------- HELPERS ----------
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

  const statusColor = (status = "") => {
    const s = status.toLowerCase();
    if (s === "completed" || s === "done") return "#16a34a";
    if (s === "in progress") return "#f59e0b";
    if (s === "pending") return "#ef4444";
    return "#374151";
  };

  // ---------- ACTIVITY PREVIEW ----------
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

  // ---------- RECENT ACTIVITIES (NO FILTER – EVERYONE SEES ALL) ----------
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

  // ---------- UPCOMING DEADLINES (FILTERED FOR STAFF/INTERN) ----------
  useEffect(() => {
    const loadUpcoming = async () => {
      if (!userRole) return; // wait for role to load

      try {
        const res = await fetch(
          "https://posthemorrhagic-nonequilaterally-caroline.ngrok-free.dev/api/ComplianceCalendar",
          {
            headers: { Accept: "application/json", "ngrok-skip-browser-warning": "true" },
          }
        );

        const data = await res.json();

        const today = new Date().setHours(0, 0, 0, 0);

        let filtered = data
          .filter((d) => d.status !== "Completed")
          .filter((d) => {
            if (!d.deadline) return false;
            return new Date(d.deadline).setHours(0, 0, 0, 0) >= today;
          });

        // staff / intern -> only their deadlines
        if (userRole === "staff" || userRole === "intern") {
          const emailLower = userEmail;
          filtered = filtered.filter(
            (d) =>
              (d.assignedToEmail || "").toLowerCase() === emailLower
          );
        }

        filtered = filtered
          .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
          .slice(0, 4);

        setUpcomingDeadlines(filtered);
      } catch (err) {
        console.log("UPCOMING DEADLINE ERROR:", err);
      }
    };

    loadUpcoming();
  }, [userRole, userEmail]);

  // ---------- DUE TODAY (FILTERED FOR STAFF/INTERN) ----------
  useEffect(() => {
    const loadDueToday = async () => {
      if (!userRole) return;

      try {
        const res = await fetch(
          "https://posthemorrhagic-nonequilaterally-caroline.ngrok-free.dev/api/ComplianceCalendar",
          {
            headers: { Accept: "application/json", "ngrok-skip-browser-warning": "true" },
          }
        );

        const data = await res.json();

        const today = new Date().setHours(0, 0, 0, 0);

        let filtered = data.filter((item) => {
          if (!item.deadline) return false;
          const d = new Date(item.deadline).setHours(0, 0, 0, 0);
          return d === today;
        });

        if (userRole === "staff" || userRole === "intern") {
          const emailLower = userEmail;
          filtered = filtered.filter(
            (d) =>
              (d.assignedToEmail || "").toLowerCase() === emailLower
          );
        }

        setDueTodayCount(filtered.length);
      } catch (err) {
        console.log("DUE TODAY ERROR:", err);
      }
    };

    loadDueToday();
  }, [userRole, userEmail]);

  // ---------- TOTAL TASKS (FILTERED FOR STAFF/INTERN) ----------
  useEffect(() => {
    const loadTasksTotal = async () => {
      if (!userRole) return;

      try {
        const res = await fetch(
          "https://posthemorrhagic-nonequilaterally-caroline.ngrok-free.dev/api/tasks",
          {
            headers: { Accept: "application/json", "ngrok-skip-browser-warning": "true" },
          }
        );

        const data = await res.json();

        let filtered = data;
        if (userRole === "staff" || userRole === "intern") {
          const emailLower = userEmail;
          filtered = data.filter(
            (t) =>
              (t.assignedToEmail || "").toLowerCase() === emailLower
          );
        }

        setSupportTicketCount(filtered.length);
      } catch (err) {
        console.error("Task Count Error:", err);
      }
    };

    loadTasksTotal();
  }, [userRole, userEmail]);

  // ---------- LIVE TASKS (FILTERED FOR STAFF/INTERN) ----------
  useEffect(() => {
    const loadTasks = async () => {
      if (!userRole) return;

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

        let inProgress = data.filter(
          (t) => t.status?.toLowerCase() === "in progress"
        );

        if (userRole === "staff" || userRole === "intern") {
          const emailLower = userEmail;
          inProgress = inProgress.filter(
            (t) =>
              (t.assignedToEmail || "").toLowerCase() === emailLower
          );
        }

        setTasks(inProgress);
      } catch (err) {
        console.log("Task Load Error:", err);
      } finally {
        setLoadingTasks(false);
      }
    };

    loadTasks();
  }, [userRole, userEmail]);

  // ---------- CLIENTS (GLOBAL FOR EVERYONE) ----------
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
        setLoadingClients(false);
      }
    };

    fetchClients();
  }, []);

  // ---------- REVENUE (GLOBAL, BUT CARD VISIBLE ONLY FOR ADMIN) ----------
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

  // ---------- PENDING INVOICES (GLOBAL) ----------
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

  // ---------- TITLE / SUBTITLE ----------
  let dashboardTitle = "CA DASHBOARD";
  let dashboardSubtitle = "Welcome back! Here’s your firm’s overview.";

  if (userRole === "staff") {
    dashboardTitle = "STAFF DASHBOARD";
    dashboardSubtitle = "Welcome back!";
  } else if (userRole === "intern") {
    dashboardTitle = "INTERN DASHBOARD";
    dashboardSubtitle = "Welcome back!";
  } else if (userRole === "admin") {
    dashboardTitle = "CA DASHBOARD";
    dashboardSubtitle = "Welcome back! Here’s your firm’s overview.";
  }

  // ---------- UI ----------
  return (
    <div className="deadline-dashboard-root">
      <div className="deadline-dashboard-header">
        <div>
          <h2 className="deadline-dashboard-header-title">{dashboardTitle}</h2>
          <p className="deadline-dashboard-header-desc">
            {dashboardSubtitle}
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

      {/* Stats Row */}
      <div className="deadline-dashboard-stats">
        {/* Live Tasks – filtered for staff/intern, global for admin */}
        <div onClick={() => navigate("/live-tasks")} style={{ cursor: "pointer" }}>
          <StatCard
            label={settings.metricLabels.projects || "Live Tasks"}
            value={loadingTasks ? "…" : tasks.length}
            subtitle="Active ongoing tasks"
          />
        </div>

        {/* Due Today – filtered for staff/intern, global for admin */}
        <div onClick={() => navigate("/due-today")} style={{ cursor: "pointer" }}>
          <StatCard
            label="Due Today"
            value={dueTodayCount}
            subtitle="Calendar Dues"
            highlight="error"
          />
        </div>

        {/* Candidates – global for everyone */}
        <div onClick={() => navigate("/candidates")} style={{ cursor: "pointer" }}>
          <StatCard
            label="Candidates"
            value={loadingClients ? "…" : candidates.length}
            subtitle="All Active clients"
            highlight="success"
          />
        </div>

        {/* Revenue – ADMIN ONLY */}
        {isAdmin && (
          <div onClick={() => navigate("/revenue")} style={{ cursor: "pointer" }}>
            <StatCard
              label="Revenue This Month"
              value={loadingRevenue ? "…" : `₹${revenue.toLocaleString()}`}
              subtitle="Auto-synced from invoices"
            />
          </div>
        )}
      </div>

      {/* Main Content: Activities + Upcoming Deadlines */}
      <div className="deadline-dashboard-main">
        {/* Recent Activities – global */}
        <div className="deadline-dashboard-card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3 className="deadline-dashboard-section-title">
              🔔 Recent Activities ({activityCount})
            </h3>

            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              {/* <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search activities..."
                style={{
                  padding: "6px 10px",
                  borderRadius: 8,
                  border: "1px solid #e5e7eb",
                  fontSize: 13,
                }}
              /> */}

              {/* <select
                value={sortMode}
                onChange={(e) => setSortMode(e.target.value)}
                style={{
                  padding: "6px 10px",
                  borderRadius: 8,
                  border: "1px solid #e5e7eb",
                  fontSize: 13,
                }}
              > */}
                {/* <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="company">Company A–Z</option>
                <option value="status">Status</option>
              </select> */}
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

          <div className="deadline-dashboard-card-footer" style={{ marginTop: 10 }}>
            <button
              className="deadline-dashboard-link-btn"
              onClick={() => navigate("/activity-log")}
            >
              View Activity Log
            </button>
          </div>
        </div>

        {/* Upcoming Deadlines – filtered for staff/intern */}
        <div className="deadline-dashboard-card">
          <h3 className="deadline-dashboard-section-title">⏰ Upcoming Deadlines</h3>

          {upcomingDeadlines.length === 0 && (
            <p style={{ color: "#777" }}>No upcoming deadlines</p>
          )}

          {upcomingDeadlines.map((d) => (
            <DeadlineItem
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
              onClick={() => navigate("/all-deadlines")}
            >
              View All Deadlines
            </button>
          </div>
        </div>
      </div>

      {/* Extra Cards */}
      <div className="deadline-dashboard-extras">
        {/* New Clients Added – ADMIN ONLY */}
        {isAdmin && (
          <div onClick={() => navigate("/new-clients")} style={{ cursor: "pointer" }}>
            <ExtraCard
              title="New Clients Added"
              value={newClientsCount}
              subtitle="Last 24 hours"
            />
          </div>
        )}

        {/* Pending Invoices – global */}
        <div onClick={() => navigate("/pending-invoices")} style={{ cursor: "pointer" }}>
          <ExtraCard
            title="Pending Invoices"
            value={pendingInvoicesCount}
            subtitle="Awaiting payment"
          />
        </div>

        {/* Total Tasks – filtered for staff/intern */}
        <div onClick={() => navigate("/support-tickets")} style={{ cursor: "pointer" }}>
          <ExtraCard
            title="Total Tasks"
            value={supportTicketCount}
            subtitle="Total tickets submitted"
          />
        </div>
      </div>
    </div>
  );
}

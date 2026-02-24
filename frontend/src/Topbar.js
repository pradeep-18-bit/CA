

// import React, { useState, useRef, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { FaBell, FaTasks } from "react-icons/fa";

// export default function Topbar() {
//   const [open, setOpen] = useState(false);
//   const dropdownRef = useRef(null);
//   const navigate = useNavigate();

//   const [dueTodayCount, setDueTodayCount] = useState(0);
//   const [pendingInvoicesCount, setPendingInvoicesCount] = useState(0);

//   /* ===============================
//      ✅ USER (SAME AS DASHBOARD)
//      =============================== */
//   const getUserFromStorage = () => {
//     let email = "";
//     let role = "";

//     try {
//       const storedUser = localStorage.getItem("user");
//       if (storedUser) {
//         const u = JSON.parse(storedUser);
//         email =
//           u.emailAddress ||
//           u.email ||
//           u.userEmail ||
//           "";
//         role = u.role || u.userRole || "";
//       }

//       if (!email) email = localStorage.getItem("email") || "";
//       if (!role) role = localStorage.getItem("role") || "";
//     } catch (err) {
//       console.error("User parse error:", err);
//     }

//     return {
//       email: email.toLowerCase(),
//       role: role.toLowerCase(),
//     };
//   };

//   const { email, role } = getUserFromStorage();

//   // Initials from email
//   const getUserInitials = () => {
//     if (email) return email[0].toUpperCase();
//     return "U";
//   };

//   // Close dropdown on outside click
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   /* ===============================
//      ✅ DUE TODAY (EMAIL BASED)
//      =============================== */
//   useEffect(() => {
//     const loadDueToday = async () => {
//       try {
//         const res = await fetch(
//           "https://posthemorrhagic-nonequilaterally-caroline.ngrok-free.dev/api/ComplianceCalendar",
//           {
//             headers: {
//               Accept: "application/json",
//               "ngrok-skip-browser-warning": "true",
//             },
//           }
//         );

//         const data = await res.json();

//         const today = new Date();
//         today.setHours(0, 0, 0, 0);

//         let filtered = data.filter((item) => {
//           if (!item.deadline) return false;
//           const d = new Date(item.deadline);
//           d.setHours(0, 0, 0, 0);
//           return d.getTime() === today.getTime();
//         });

//         // 🔐 Email-based filtering (matches dashboard)
//         if (role !== "admin") {
//           filtered = filtered.filter((item) => {
//             const itemEmail = (
//               item.assignedToEmail ||
//               item.ownerEmail ||
//               ""
//             ).toLowerCase();
//             return itemEmail === email;
//           });
//         }

//         setDueTodayCount(filtered.length);
//       } catch (err) {
//         console.log("DUE TODAY ERROR (Topbar):", err);
//         setDueTodayCount(0);
//       }
//     };

//     if (email && role) loadDueToday();
//   }, [email, role]);

//   /* ===============================
//      ✅ PENDING (GLOBAL)
//      =============================== */
//   useEffect(() => {
//     const loadPendingInvoices = async () => {
//       try {
//         const res = await fetch(
//           "https://posthemorrhagic-nonequilaterally-caroline.ngrok-free.dev/api/invoices",
//           {
//             headers: {
//               Accept: "application/json",
//               "ngrok-skip-browser-warning": "true",
//             },
//           }
//         );

//         const invoices = await res.json();

//         const count = invoices.filter((inv) => {
//           const status = (inv.status || "").toLowerCase().trim();
//           return status === "pending" || status === "overdue";
//         }).length;

//         setPendingInvoicesCount(count);
//       } catch (err) {
//         console.error("Pending Invoice Error (Topbar):", err);
//         setPendingInvoicesCount(0);
//       }
//     };

//     loadPendingInvoices();
//   }, []);

//   const handleLogout = () => {
//     if (role === "staff" || role === "intern") {
//       navigate("/staff_intern/login");
//     } else {
//       navigate("/Signin");
//     }
//   };

//   return (
//     <header style={headerStyle}>
//       <br />

//       <div style={rightContainer}>
//         {/* Due Today */}
//         <button
//           style={pillButtonStyledue("white")}
//           onClick={() => navigate("/due-today")}
//         >
//           {dueTodayCount} Due Today
//         </button>

//         {/* Pending */}
//         <button
//           style={pillButtonStyle("white")}
//           onClick={() => navigate("/pending-invoices")}
//         >
//           {pendingInvoicesCount} Pending
//         </button>

//         {/* Notifications */}
//         <button
//           onClick={() => navigate("/Notifications")}
//           style={notificationButton}
//         >
//           <FaBell />
//         </button>

//         {/* Profile */}
//         <div style={{ position: "relative" }} ref={dropdownRef}>
//           <button onClick={() => setOpen(!open)} style={userButtonStyle}>
//             {getUserInitials()}
//           </button>

//           {open && (
//             <div style={dropdownMenu}>
//               <div style={profileSection}>
//                 <div style={profileRow}>
//                   <span style={profileLabel}>Email:&nbsp;</span>
//                   <span style={profileValue}>{email}</span>
//                 </div>
//                 <div style={profileRow}>
//                   <span style={profileLabel}>Role:&nbsp;</span>
//                   <span style={profileValue}>{role}</span>
//                 </div>
//               </div>

//               <hr style={dividerStyle} />

//               <button
//                 onClick={handleLogout}
//                 style={{ ...dropdownItem, color: "#ef4444" }}
//               >
//                 Logout
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// }

// /* ===============================
//    🔒 STYLES (UNCHANGED)
//    =============================== */

// const headerStyle = {
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "space-between",
//   background: "#deddddff",
//   color: "#1f2937",
//   padding: "8px 16px",
//   borderBottom: "1px solid #f9f7f7ff",
//   boxShadow: "0 2px 2px #deddddff",
//   height: "70px",
//   zIndex: 100,
// };

// const rightContainer = { display: "flex", alignItems: "center", gap: "10px" };

// const Daytask = {
//   background: "none",
//   border: "none",
//   color: "#073d7f",
//   cursor: "pointer",
//   fontSize: "128%",
// };

// const pillButtonStyle = (color) => ({
//   padding: "2px 20px",
//   border: "solid #f40e0eff",
//   borderRadius: "25px",
//   color: "#000",
//   backgroundColor: color,
//   cursor: "pointer",
//   fontSize: "10px",
// });

// const pillButtonStyledue = (color) => ({
//   padding: "2px 20px",
//   border: "solid orange",
//   borderRadius: "25px",
//   color: "#000",
//   backgroundColor: color,
//   cursor: "pointer",
//   fontSize: "10px",
// });

// const notificationButton = {
//   background: "none",
//   border: "none",
//   color: "#073d7f",
//   cursor: "pointer",
//   fontSize: "18px",
// };

// const userButtonStyle = {
//   backgroundColor: "#073d7f",
//   color: "white",
//   border: "none",
//   borderRadius: "50%",
//   width: "30px",
//   height: "30px",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
//   fontSize: "14px",
//   cursor: "pointer",
// };

// const dropdownMenu = {
//   position: "absolute",
//   top: "40px",
//   right: 0,
//   background: "#fff",
//   border: "1px solid #d1d5db",
//   borderRadius: "10px",
//   boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
//   width: "260px",
//   padding: "10px 0",
//   zIndex: 2000,
// };

// const profileSection = {
//   padding: "8px 12px",
//   display: "flex",
//   flexDirection: "column",
//   gap: "4px",
// };

// const profileRow = {
//   display: "flex",
//   flexWrap: "wrap",
// };

// const profileLabel = {
//   fontWeight: "600",
//   fontSize: "11px",
//   color: "#4b5563",
// };

// const profileValue = {
//   fontSize: "11px",
//   color: "#111827",
// };

// const dividerStyle = { margin: "6px 0", border: "0.5px solid #d1d5db" };

// const dropdownItem = {
//   display: "flex",
//   alignItems: "center",
//   gap: "10px",
//   padding: "8px 12px",
//   fontSize: "12px",
//   cursor: "pointer",
//   background: "transparent",
//   border: "none",
//   width: "100%",
//   textAlign: "left",
// };






import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaBell } from "react-icons/fa";
import { useNotifications } from "./NOTIFICATIONS/COMPONENTS/NotificationContext";

export default function Topbar() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const { unreadCount } = useNotifications();

  const [dueTodayCount, setDueTodayCount] = useState(0);
  const [pendingInvoicesCount, setPendingInvoicesCount] = useState(0);

  /* ===============================
     USER INFO
     =============================== */
  const getUserFromStorage = () => {
    let email = "";
    let role = "";

    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const u = JSON.parse(storedUser);
        email = u.emailAddress || u.email || "";
        role = u.role || "";
      }

      if (!email) email = localStorage.getItem("email") || "";
      if (!role) role = localStorage.getItem("role") || "";
    } catch (err) {
      console.error("User parse error:", err);
    }

    return {
      email: email.toLowerCase(),
      role: role.toLowerCase(),
    };
  };

  const { email, role } = getUserFromStorage();
  const getUserInitials = () => (email ? email[0].toUpperCase() : "U");

  /* ===============================
     CLOSE DROPDOWN
     =============================== */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ===============================
     DUE TODAY
     =============================== */
  useEffect(() => {
    const loadDueToday = async () => {
      try {
        const res = await fetch(
          "https://posthemorrhagic-nonequilaterally-caroline.ngrok-free.dev/api/ComplianceCalendar",
          {
            headers: {
              Accept: "application/json",
              "ngrok-skip-browser-warning": "true",
            },
          }
        );

        const data = await res.json();
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        let filtered = data.filter((item) => {
          if (!item.deadline) return false;
          const d = new Date(item.deadline);
          d.setHours(0, 0, 0, 0);
          return d.getTime() === today.getTime();
        });

        if (role !== "admin") {
          filtered = filtered.filter(
            (i) => (i.assignedToEmail || "").toLowerCase() === email
          );
        }

        setDueTodayCount(filtered.length);
      } catch {
        setDueTodayCount(0);
      }
    };

    if (email && role) loadDueToday();
  }, [email, role]);

  /* ===============================
     PENDING INVOICES
     =============================== */
  useEffect(() => {
    const loadPendingInvoices = async () => {
      try {
        const res = await fetch(
          "https://posthemorrhagic-nonequilaterally-caroline.ngrok-free.dev/api/invoices",
          {
            headers: {
              Accept: "application/json",
              "ngrok-skip-browser-warning": "true",
            },
          }
        );

        const invoices = await res.json();
        const count = invoices.filter((inv) => {
          const s = (inv.status || "").toLowerCase();
          return s === "pending" || s === "overdue";
        }).length;

        setPendingInvoicesCount(count);
      } catch {
        setPendingInvoicesCount(0);
      }
    };

    loadPendingInvoices();
  }, []);

  const handleLogout = () => {
    if (role === "staff" || role === "intern") {
      navigate("/staff_intern/login");
    } else {
      navigate("/Signin");
    }
  };

  /* ===============================
     RENDER
     =============================== */
  return (
    <header style={headerStyle}>
      <div style={rightContainer}>
        {/* Due Today */}
        <button
          style={pillButtonStyledue("white")}
          onClick={() => navigate("/due-today")}
        >
          {dueTodayCount} Due Today
        </button>

        {/* Pending */}
        <button
          style={pillButtonStyle("white")}
          onClick={() => navigate("/pending-invoices")}
        >
          {pendingInvoicesCount} Pending
        </button>

        {/* 🔔 Notifications */}
        <button
          onClick={() => navigate("/Notifications")}
          style={{ ...notificationButton, position: "relative" }}
        >
          <FaBell />
          {unreadCount > 0 && <span style={badgeStyle}>{unreadCount}</span>}
        </button>

        {/* Profile */}
        <div style={{ position: "relative" }} ref={dropdownRef}>
          <button onClick={() => setOpen(!open)} style={userButtonStyle}>
            {getUserInitials()}
          </button>

          {open && (
            <div style={dropdownMenu}>
              <div style={profileSection}>
                <div style={profileRow}>
                  <span style={profileLabel}>Email:&nbsp;</span>
                  <span style={profileValue}>{email}</span>
                </div>
                <div style={profileRow}>
                  <span style={profileLabel}>Role:&nbsp;</span>
                  <span style={profileValue}>{role}</span>
                </div>
              </div>

              <hr style={dividerStyle} />

              <button
                onClick={handleLogout}
                style={{ ...dropdownItem, color: "#ef4444" }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

/* ===============================
   STYLES (FIXED COLORS)
   =============================== */

const headerStyle = {
  display: "flex",
  justifyContent: "flex-end",
  background: "#deddddff",
  padding: "8px 16px",
  height: "70px",
};

const rightContainer = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
};

/* ✅ COLOR FIX IS HERE */
const pillButtonStyle = (bgColor) => ({
  padding: "4px 20px",
  border: "2px solid red",
  borderRadius: "25px",
  backgroundColor: bgColor,
  color: "#111827",      // 🔥 FIXED
  fontSize: "12px",
  fontWeight: "600",
  cursor: "pointer",
});

const pillButtonStyledue = (bgColor) => ({
  padding: "4px 20px",
  border: "2px solid orange",
  borderRadius: "25px",
  backgroundColor: bgColor,
  color: "#111827",      // 🔥 FIXED
  fontSize: "12px",
  fontWeight: "600",
  cursor: "pointer",
});

const notificationButton = {
  background: "none",
  border: "none",
  color: "#073d7f",
  cursor: "pointer",
  fontSize: "18px",
};

const badgeStyle = {
  position: "absolute",
  top: "-6px",
  right: "-6px",
  background: "red",
  color: "white",
  borderRadius: "50%",
  padding: "2px 6px",
  fontSize: "10px",
  fontWeight: "bold",
};

const userButtonStyle = {
  backgroundColor: "#073d7f",
  color: "white",
  border: "none",
  borderRadius: "50%",
  width: "30px",
  height: "30px",
  cursor: "pointer",
};

const dropdownMenu = {
  position: "absolute",
  top: "40px",
  right: 0,
  background: "#fff",
  borderRadius: "10px",
  width: "260px",
};

const profileSection = { padding: "8px 12px" };
const profileRow = { display: "flex" };
const profileLabel = { fontSize: "11px", fontWeight: 600 };
const profileValue = { fontSize: "11px" };
const dividerStyle = { margin: "6px 0" };
const dropdownItem = {
  padding: "8px 12px",
  background: "none",
  border: "none",
  cursor: "pointer",
};

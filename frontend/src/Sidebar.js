
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUsers,
  FaCalendarAlt,
  FaFileInvoice,
  FaHome,
  FaDochub,
  FaFileAlt,
  FaBusinessTime,
} from "react-icons/fa";

export default function Sidebar({ children }) {
  const [permissions, setPermissions] = useState({});
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const role = localStorage.getItem("role");
  const isAdmin = role?.toLowerCase() === "admin";

    useEffect(() => {
  const fetchPermissions = async () => {
    const email = localStorage.getItem("email");
    if (!email) return;

    try {
      const response = await fetch(
        "https://posthemorrhagic-nonequilaterally-caroline.ngrok-free.dev/api/staff",
        {
          headers: { "ngrok-skip-browser-warning": "true" },
        }
      );

      const staffList = await response.json();
      const staffUser = staffList.find(
        (u) => u.emailAddress?.toLowerCase() === email.toLowerCase()
      );

      if (staffUser) {
        localStorage.setItem("permissions", JSON.stringify(staffUser));
        setPermissions(staffUser); // update UI
      }
    } catch (error) {
      console.log("Error fetching permissions:", error);
    }
  };

  fetchPermissions(); // RUN ON REFRESH
}, []);


  const sidebarWidth = isHovered ? 220 : 60;
  const TOPBAR_HEIGHT = "50px";

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <aside
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          width: sidebarWidth,
          background: "#073D7f",
          transition: "0.25s",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          overflow: "hidden",
        }}
      >

        {/* ==== SCROLLABLE NAVIGATION PART ==== */}
        <nav
          style={{
            marginTop: 20,
            display: "flex",
            flexDirection: "column",
            overflowY: "auto",
            overflowX: "hidden",
            paddingBottom: 20,
            scrollbarWidth: "none",
          }}
        >

          <SidebarLink to="/DeadlineDashboard" icon={<FaHome />} label="Dashboard" isHovered={isHovered} />

          {(isAdmin || permissions?.clientManagement) && (
            <SidebarLink to="/clients" icon={<FaUsers />} label="Clients" isHovered={isHovered} />
          )}

          {(isAdmin || permissions?.complianceCalendar) && (
            <SidebarLink to="/compliance" icon={<FaCalendarAlt />} label="Compliance Calendar" isHovered={isHovered} />
          )}

          {(isAdmin || permissions?.documents) && (
            <SidebarLink to="/Document" icon={<FaFileAlt />} label="Document" isHovered={isHovered} />
          )}

          {(isAdmin || permissions?.billing) && (
            <SidebarLink to="/billing" icon={<FaFileInvoice />} label="Billing" isHovered={isHovered} />
          )}

          {(isAdmin || permissions?.filing) && (
            <SidebarLink to="/filling-tracker" icon={<FaDochub />} label="Filing Tracker" isHovered={isHovered} />
          )}

          {(isAdmin || permissions?.generateInvoice) && (
            <SidebarLink to="/generate-invoice" icon={<FaFileInvoice />} label="Generate Invoice" isHovered={isHovered} />
          )}

          {(isAdmin || permissions?.timeTracking) && (
            <SidebarLink to="/time-tracking" icon={<FaBusinessTime />} label="Time Tracking" isHovered={isHovered} />
          )}

          {(isAdmin || permissions?.userManagement) && (
            <SidebarLink to="/UserManagement" icon={<FaUsers />} label="User Management" isHovered={isHovered} />
          )}

          {(isAdmin || permissions?.taskManagement) && (
            <SidebarLink to="/TaskManagement" icon={<FaCalendarAlt />} label="Task Management" isHovered={isHovered} />
          )}

          {(isAdmin || permissions?.firmSettings) && (
            <SidebarLink to="/FirmSettings" icon={<FaFileAlt />} label="Firm Settings" isHovered={isHovered} />
          )}

          {(isAdmin || permissions?.reports) && (
            <SidebarLink to="/ReportsAnalytics" icon={<FaFileAlt />} label="Reports" isHovered={isHovered} />
          )}

          {/* ---- Add User visible only for ADMIN ---- */}
          {isAdmin && (
            <SidebarLink
              to="/Authentication"
              icon={<FaUsers />}
              label="Add User"
              isHovered={isHovered}
            />
          )}
        </nav>

        {/* ==== BOTTOM LOGOUT BUTTON ==== */}
          <div style={{ paddingBottom: 12, textAlign: "center" }}>
  <button
    style={{
      width: isHovered ? "80%" : "40px",
      padding: 10,
      borderRadius: 8,
      cursor: "pointer",
      background: "white",
      color: "#073D7f",
      border: "none",
      fontWeight: 600,
    }}
    onClick={() => {
      const role = (localStorage.getItem("role") || "").toLowerCase();
      // localStorage.clear();

      if (role === "admin") {
        navigate("/Signin");   // Admin login
      } 
      else if (role === "intern" || role === "staff") {
        navigate("/staff_intern/login");  // Intern + Staff login
      } 
      // else {
      //   navigate("/Signin");        // fallback
      // }
    }}
  >
    {isHovered ? "Logout" : "⎋"}
  </button>
</div>


      </aside>

      {/* ==== MAIN PAGE CONTENT ==== */}
      <main
        style={{
          marginLeft: sidebarWidth,
          paddingTop: TOPBAR_HEIGHT,
          width: `calc(100% - ${sidebarWidth}px)`,
          transition: "margin-left 0.25s",
        }}
      >
        {children}
      </main>
    </div>
  );
}

// COMPONENT FOR MENU ITEMS
function SidebarLink({ to, icon, label, isHovered }) {
  return (
    <Link
      to={to}
      style={{
        padding: "12px 10px",
        margin: "4px 10px",
        color: "#f4b443",
        display: "flex",
        alignItems: "center",
        textDecoration: "none",
        borderRadius: 6,
        transition: "0.2s",
        justifyContent: isHovered ? "flex-start" : "center",
      }}
    >
      {icon}
      {isHovered && <span style={{ marginLeft: 12 }}>{label}</span>}
    </Link>
  );
}

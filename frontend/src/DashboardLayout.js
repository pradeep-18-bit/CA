
import React from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function DashboardLayout({ children, hideTopBar = false }) {
  const SIDEBAR_COLLAPSED_WIDTH = 40;
  const SIDEBAR_EXPANDED_WIDTH = 180;
  const sidebarWidth = SIDEBAR_EXPANDED_WIDTH; // fixed width after login

  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar fixed on the left */}
      <Sidebar />

      {/* Main content area with Topbar + children */}
      <div style={{ flexGrow: 1 }}>
        {/* Conditionally render Topbar */}
        {!hideTopBar && <Topbar sidebarWidth={sidebarWidth} />}
        <div style={{ padding: 0, marginTop: 0 }}>{children}</div>
      </div>
    </div>
  );
}

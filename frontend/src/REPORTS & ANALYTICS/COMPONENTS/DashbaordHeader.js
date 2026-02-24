import React from "react";

export const ExportIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="17 8 12 3 7 8"></polyline>
    <line x1="12" y1="3" x2="12" y2="15"></line>
  </svg>
);

export const DashboardIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#073D7F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="9"></rect>
    <rect x="14" y="3" width="7" height="5"></rect>
    <rect x="14" y="12" width="7" height="9"></rect>
    <rect x="3" y="16" width="7" height="5"></rect>
  </svg>
);

const DashboardHeader = () => {
  return (
    <header className="reports-header">
      <div className="reports-header-left">
        <DashboardIcon />
        <div>
          <h1 className="reports-header-title">Reports & Analytics</h1>
          <p className="reports-header-desc">Business insights and performance metrics</p>
        </div>
      </div>
      <div className="reports-header-actions">
        <select className="reports-header-select">
          <option>Last 6 Months</option>
          <option>Last 12 Months</option>
          <option>This Year</option>
        </select>
        <button className="reports-header-export-btn">
          <ExportIcon /> Export
        </button>
      </div>
    </header>
  );
};

export default DashboardHeader;

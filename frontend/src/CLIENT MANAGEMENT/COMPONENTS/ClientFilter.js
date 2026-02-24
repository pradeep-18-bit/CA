import React from "react";
import "./Global.css";

export default function ClientFilter({
  searchQuery,
  setSearchQuery,
  filterData,
  handleFilterChange,
}) {
  return (
    <>
      {/* 🔍 Search + Status Filter Container */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 220px",
          gap: "16px",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        {/* 🔍 Search Input with Icon */}
        <div
          style={{
            position: "relative",
            width: "100%",
          }}
        >
          {/* Search Icon */}
          <span
            style={{
              position: "absolute",
              left: "14px",
              top: "50%",
              transform: "translateY(-50%)",
              fontSize: "16px",
              color: "#6b7280",
              pointerEvents: "none",
            }}
          >
            🔍
          </span>

          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by client, service, or staff..."
            style={{
              height: "44px",
              padding: "0 16px 0 42px", // space for icon
              border: "1px solid #d1d5db",
              borderRadius: "10px",
              fontSize: "15px",
              boxSizing: "border-box",
              width: "100%",
            }}
          />
        </div>

        {/* Status Dropdown */}
        <select
          name="status"
          value={filterData.status}
          onChange={handleFilterChange}
          style={{
            height: "44px",
            padding: "0 14px",
            border: "1px solid #d1d5db",
            borderRadius: "10px",
            fontSize: "15px",
            backgroundColor: "#ffffff",
            cursor: "pointer",
            width: "100%",
          }}
        >
          <option value="">All Status</option>
          <option value="Active">Active</option>
          <option value="In Active">In Active</option>
          {/* <option value="Completed">Completed</option> */}
        </select>
      </div>
    </>
  );
}

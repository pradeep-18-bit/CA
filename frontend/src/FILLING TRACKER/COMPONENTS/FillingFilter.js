import React from "react";
import { FaSearch } from "react-icons/fa";

export default function FilingFilter({
  search,
  status,
  onSearchChange,
  onStatusChange,
}) {
  return (
    <div
      style={{
        background: "white",
        padding: "20px 30px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        display: "flex",
        gap: "15px",
        flexWrap: "wrap",
        alignItems: "center",
      }}
    >
      {/* 🔍 Search Input */}
      <div style={{ flex: "1 1 300px", position: "relative" }}>
        {/* ✅ Search Icon (VISIBLE FIX) */}
        <span
          style={{
            position: "absolute",
            left: "16px",
            top: "50%",
            transform: "translateY(-50%)",
            color: "#4a5568",       // 🔥 darker color
            zIndex: 2,               // 🔥 ensure above input
            pointerEvents: "none",
            display: "flex",
            alignItems: "center",
          }}
        >
          <FaSearch size={18} />     {/* 🔥 slightly bigger */}
        </span>

        <input
          type="text"
          placeholder="Search by client, service, or staff..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          style={{
            width: "100%",
            height: "48px",
            padding: "0 14px 0 46px", // space for icon
            border: "1px solid #b5b5b5",
            borderRadius: "10px",
            fontSize: "15px",
            boxSizing: "border-box",
            outline: "none",
          }}
          onFocus={(e) => (e.target.style.borderColor = "#4f46e5")}
          onBlur={(e) => (e.target.style.borderColor = "#b5b5b5")}
        />
      </div>

      {/* ⬇️ Status Dropdown */}
      <select
        value={status}
        onChange={(e) => onStatusChange(e.target.value)}
        style={{
          height: "48px",
          padding: "0 16px",
          border: "1px solid #b5b5b5",
          borderRadius: "10px",
          fontSize: "14px",
          cursor: "pointer",
          background: "white",
          fontWeight: "500",
          color: "#4a5568",
          width: "150px",
          outline: "none",
        }}
        onFocus={(e) => (e.target.style.borderColor = "#4f46e5")}
        onBlur={(e) => (e.target.style.borderColor = "#b5b5b5")}
      >
        <option value="All">All Status</option>
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
        <option value="Overdue">Overdue</option>
      </select>
    </div>
  );
}

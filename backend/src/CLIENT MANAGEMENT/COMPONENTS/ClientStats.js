import React from "react";
import "./Global.css";

export default function ClientStats({ filteredClients }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "30px",
        gap: "20px",
        overflowX: "auto",
      }}
    >
      <div className="stat-box">
        <p className="stat-label">Total Clients</p>
        <p className="stat-value">{filteredClients.length}</p>
      </div>
      <div className="stat-box">
        <p className="stat-label">Companies</p>
        <p className="stat-value">
          {filteredClients.filter(
            (c) => c.clientType?.toLowerCase() === "company"
          ).length}
        </p>
      </div>
      <div className="stat-box">
        <p className="stat-label">Individuals</p>
        <p className="stat-value">
          {filteredClients.filter(
            (c) => c.clientType?.toLowerCase() === "individual"
          ).length}
        </p>
      </div>
      <div className="stat-box">
        <p className="stat-label">Partnerships</p>
        <p className="stat-value">
          {filteredClients.filter(
            (c) => c.clientType?.toLowerCase() === "partnership"
          ).length}
        </p>
      </div>
    </div>
  );
}

import React from "react";

const InfoCards = ({ cardData }) => {
  return (
    <div className="reports-cards">
      {cardData.map((item, index) => (
        <div key={index} className="reports-card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
            <div className="reports-card-title">{item.title}</div>
            <div style={{ fontSize: "20px", color: "#6b7280" }}>{item.icon}</div>
          </div>
          <p className="reports-card-value">{item.value}</p>
          <p className="reports-card-change" style={{ color: item.changeColor }}>{item.change}</p>
        </div>
      ))}
    </div>
  );
};

export default InfoCards;

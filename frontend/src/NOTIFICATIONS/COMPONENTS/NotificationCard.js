import React from "react";

const NotificationCard = ({ icon, title, text, time }) => {
  return (
    <div className="info-card">
      <h3 className="info-title">{icon} {title}</h3>
      <p className="info-text">{text}</p>
      <p className="time-text">{time}</p>
    </div>
  );
};

export default NotificationCard;

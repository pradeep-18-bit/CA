import React from "react";
import { useNavigate } from "react-router-dom";
import { useNotifications } from "../context/NotificationContext";

export default function NotificationBell() {
  const { unreadCount } = useNotifications();
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate("/notifications")}
      style={{ position: "relative", cursor: "pointer" }}
    >
      🔔
      {unreadCount > 0 && (
        <span
          style={{
            position: "absolute",
            top: -6,
            right: -8,
            background: "red",
            color: "white",
            borderRadius: "50%",
            padding: "2px 6px",
            fontSize: 12,
            fontWeight: "bold",
          }}
        >
          {unreadCount}
        </span>
      )}
    </div>
  );
}


// src/components/UserStats.js
import React, { useMemo } from "react";
 
const UserStats = ({ users = [] }) => {
  // ✅ Calculate all stats whenever users change
  const stats = useMemo(() => {
    const total = users.length;
 
    const active = users.filter(
      (u) => u.status?.toLowerCase() === "active"
    ).length;
 
    const partners = users.filter(
      (u) => u.role?.toLowerCase() === "partner"
    ).length;
 
    const staff = users.filter(
      (u) => u.role?.toLowerCase() === "staff"
    ).length;
 
    const interns = users.filter(
      (u) => u.role?.toLowerCase() === "intern"
    ).length;
 
    return [
      {
        title: "Total Users",
        value: total.toString(),
        extra: `${active} active`,
      },
      {
        title: "Partners",
        value: partners.toString(),
      },
      {
        title: "Staff Members",
        value: staff.toString(),
      },
      {
        title: "Interns",
        value: interns.toString(),
      },
    ];
  }, [users]);
 
  return (
    <div className="user-mgmt-stats">
      {stats.map((card, i) => (
        <div key={i} className="user-mgmt-stat-card">
          <div className="user-mgmt-stat-title">{card.title}</div>
          <div className="user-mgmt-stat-value">{card.value}</div>
          {card.extra && (
            <div className="user-mgmt-stat-extra">{card.extra}</div>
          )}
        </div>
      ))}
    </div>
  );
};
 
export default UserStats;
 
 
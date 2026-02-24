// src/REPORTS & ANALYTICS/COMPONENTS/TeamPerformance.js
import React, { useEffect, useState } from "react";
import { ExportIcon } from "./DashbaordHeader";

const API_STAFF = "https://posthemorrhagic-nonequilaterally-caroline.ngrok-free.dev/api/staff";
const API_TASKS = "https://posthemorrhagic-nonequilaterally-caroline.ngrok-free.dev/api/tasks";

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  "ngrok-skip-browser-warning": "true",
};

const isCompletedStatus = (status) => {
  if (status === undefined || status === null) return false;
  const s = String(status).toLowerCase();
  return s === "completed" || s === "done" || s === "complete" || s === "closed" || s === "finished";
};

const TeamPerformance = () => {
  const [teamData, setTeamData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const fetchAll = async () => {
      setLoading(true);
      try {
        const [staffRes, tasksRes] = await Promise.all([
          fetch(API_STAFF, { headers }),
          fetch(API_TASKS, { headers }),
        ]);

        if (!staffRes.ok) throw new Error("Failed to fetch staff");
        if (!tasksRes.ok) throw new Error("Failed to fetch tasks");

        const staff = await staffRes.json();
        const tasksRaw = await tasksRes.json();

        const tasks = (Array.isArray(tasksRaw) ? tasksRaw : []).map((t) => {
          // normalize task fields using || to avoid ?? mixing issues
          const title = t && (t.taskName || t.title || "");
          const assignedTo = t && (t.assignedTo || t.assignee || "");
          const status = t && (t.status || "");
          let estimatedHours = 0;
          if (t && t.estimatedHours !== undefined && t.estimatedHours !== null) {
            estimatedHours = Number(t.estimatedHours) || 0;
          } else if (t && (t.hours !== undefined && t.hours !== null)) {
            // sometimes hours may be string like "5" or "5h"
            const parsed = parseFloat(String(t.hours).replace(/[^\d.]/g, ""));
            estimatedHours = Number(parsed) || 0;
          }
          return {
            id: t && t.id,
            title,
            assignedTo,
            status,
            estimatedHours,
          };
        });

        // Prepare staff map entries
        const map = (Array.isArray(staff) ? staff : []).map((s) => {
          const id = s && (s.id || s._id || null);
          const name =
            (s && (s.fullName || s.name)) ||
            ((s && (s.firstName || s.lastName)) ? `${s.firstName || ""} ${s.lastName || ""}`.trim() : "Unknown");
          return {
            id,
            name,
            tasksAssigned: 0,
            tasksCompleted: 0,
            hours: 0,
          };
        });

        // helper to find staff index by id or name (loose matching)
        const findStaffIndex = (assignedTo) => {
          if (assignedTo === undefined || assignedTo === null) return -1;
          const asStr = String(assignedTo).trim();
          if (!asStr) return -1;
          // try id match
          let idx = map.findIndex((m) => m.id !== null && String(m.id) === asStr);
          if (idx !== -1) return idx;
          // exact name match (case-insensitive)
          idx = map.findIndex((m) => m.name && m.name.toLowerCase() === asStr.toLowerCase());
          if (idx !== -1) return idx;
          // partial match
          idx = map.findIndex(
            (m) =>
              m.name &&
              asStr.length > 0 &&
              (m.name.toLowerCase().includes(asStr.toLowerCase()) || asStr.toLowerCase().includes(m.name.toLowerCase()))
          );
          return idx;
        };

        tasks.forEach((t) => {
          const idx = findStaffIndex(t.assignedTo);
          if (idx === -1) return;
          map[idx].tasksAssigned += 1;
          map[idx].hours += Number(t.estimatedHours || 0);
          if (isCompletedStatus(t.status)) map[idx].tasksCompleted += 1;
        });

        const result = map.map((m) => {
          const efficiency = m.tasksAssigned > 0 ? Math.round((m.tasksCompleted / m.tasksAssigned) * 100) : 0;
          return {
            name: m.name,
            tasks: m.tasksCompleted,
            hours: Math.round(m.hours) || 0,
            efficiency,
            totalAssigned: m.tasksAssigned,
          };
        });

        if (mounted) setTeamData(result);
      } catch (err) {
        console.error("TeamPerformance load error:", err);
        if (mounted) setTeamData([]);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchAll();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="reports-team-container">
      <div className="reports-team-header-row">
        <h3 className="reports-team-header">Team Performance Metrics</h3>
        <button
          className="reports-header-export-btn"
          style={{ padding: "6px 14px", fontSize: "14px", width: "110px", display: "flex", alignItems: "center", gap: "8px" }}
        >
          <ExportIcon /> Export
        </button>
      </div>

      {loading && <p style={{ padding: "12px 0" }}>Loading team data...</p>}

      {!loading &&
        (teamData.length ? (
          teamData.map((member, index) => (
            <div key={index} className="reports-team-card">
              <div className="reports-team-top-row">
                <span className="reports-team-name">{member.name}</span>
                <span className="reports-team-efficiency">Efficiency: {member.efficiency}%</span>
              </div>
              <p className="reports-team-task-info">
                Tasks (completed): {member.tasks}
                {member.totalAssigned !== undefined ? ` | Assigned: ${member.totalAssigned}` : ""} | Hours: {member.hours}
              </p>
              <div className="reports-team-progress-bg">
                <div className="reports-team-progress" style={{ width: `${member.efficiency}%` }}></div>
              </div>
            </div>
          ))
        ) : (
          <p style={{ padding: "12px 0" }}>No team data available.</p>
        ))}
    </div>
  );
};

export default TeamPerformance;

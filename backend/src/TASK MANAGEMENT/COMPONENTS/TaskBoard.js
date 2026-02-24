
import React, { useEffect, useMemo, useState } from "react";
import { FaUser, FaCalendarAlt, FaTrash, FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function TaskBoard({
  tasks = [],
  onEdit,
  onDelete,
}) {
  const statuses = ["To Do", "In Progress", "Review", "Completed"];
  const navigate = useNavigate();

  // ================= AUTH =================
  const loggedInEmail = localStorage.getItem("email");
  const role = (localStorage.getItem("role") || "").toLowerCase();

  // ================= STAFF MAP =================
  const [staffMap, setStaffMap] = useState({});

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const res = await fetch(
          "https://posthemorrhagic-nonequilaterally-caroline.ngrok-free.dev/api/staff",
          { headers: { "ngrok-skip-browser-warning": "true" } }
        );

        const data = await res.json();
        const map = {};
        data.forEach((u) => {
          map[u.emailAddress] = u.fullName;
        });

        setStaffMap(map);
      } catch (err) {
        console.error("Failed to fetch staff", err);
      }
    };

    fetchStaff();
  }, []);

  // ================= FILTER TASKS =================
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      if (role === "admin") return true;

      if (role === "staff") {
        return (
          task.assignedToEmail === loggedInEmail ||
          task.createdByEmail === loggedInEmail
        );
      }

      // intern
      return task.assignedToEmail === loggedInEmail;
    });
  }, [tasks, role, loggedInEmail]);

  // ================= EMAIL → FULL NAME =================
  const resolveFullName = (email) => {
    if (!email) return "—";
    return staffMap[email] || email;
  };

  // ================= TASK TITLE → PAGE ROUTING =================
  const handleTaskNavigation = (task) => {
    switch (task.title) {
      case "Check Details of Client":
        navigate("/clients");
        break;
      case "Collect DOCs":
        navigate("/document");
        break;
      case "Generate Invoice":
        navigate("/generate-invoice");
        break;
      case "Complete Billing":
        navigate("/billing");
        break;
      case "Contact Client":
        navigate("/clients");
        break;
      default:
        break;
    }
  };

  return (
    <>
      <style>{`
        .tm-kanban {
          display: flex;
          gap: 16px;
          align-items: flex-start;
        }

        .tm-column {
          flex: 1;
          min-width: 250px;
          background: #f6f7f9;
          border-radius: 12px;
          padding: 12px;
        }

        .tm-columnHeader {
          display: flex;
          justify-content: space-between;
          margin-bottom: 12px;
        }

        .tm-card {
          padding: 14px;
          margin-bottom: 12px;
          border-radius: 10px;
          background: white;
          box-shadow: 0 2px 6px rgba(0,0,0,.12);
          display: flex;
          flex-direction: column;
          gap: 10px;
          cursor: pointer;
        }

        .tm-infoRow {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 14px;
          color: #555;
        }

        .tm-iconSmall {
          font-size: 13px;
        }

        .tm-actions {
          display: flex;
          gap: 12px;
          margin-top: 6px;
        }
      `}</style>

      <div className="tm-kanban">
        {statuses.map((status) => {
          const columnTasks = filteredTasks.filter(
            (t) => t.status === status
          );

          return (
            <div key={status} className="tm-column">
              <div className="tm-columnHeader">
                <h4>{status}</h4>
                <span>{columnTasks.length}</span>
              </div>

              {columnTasks.map((task) => {
                const canDelete =
                  role === "admin" ||
                  (role === "staff" &&
                    task.createdByEmail === loggedInEmail);

                return (
                  <div
                    key={task.id}
                    className="tm-card"
                    onClick={() => handleTaskNavigation(task)}
                  >
                    <strong>{task.title}</strong>

                    <div className="tm-infoRow">
                      <FaUser className="tm-iconSmall" />
                      <span>
                        Assigned To: {resolveFullName(task.assignedToEmail)}
                      </span>
                    </div>

                    <div className="tm-infoRow">
                      <FaUser className="tm-iconSmall" />
                      <span>
                        Assigned By: {resolveFullName(task.createdByEmail)}
                      </span>
                    </div>

                    <div className="tm-infoRow">
                      <FaCalendarAlt className="tm-iconSmall" />
                      <span>{task.dueDate}</span>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: 13,
                      }}
                    >
                      <span>{task.priority}</span>
                      <span>{task.hours}</span>
                    </div>

                    {/* ACTIONS */}
                    <div className="tm-actions">
                      <FaEdit
                        style={{ cursor: "pointer" }}
                        title="Edit"
                        onClick={(e) => {
                          e.stopPropagation();
                          onEdit(task);
                        }}
                      />

                      {canDelete && (
                        <FaTrash
                          style={{ cursor: "pointer", color: "#d11a2a" }}
                          title="Delete"
                          onClick={(e) => {
                            e.stopPropagation();
                            onDelete(task.id);
                          }}
                        />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </>
  );
}

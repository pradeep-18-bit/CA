
// src/USER MANAGEMENT/COMPONENTS/UserTable.jsx
import React from "react";
import { FaTrash, FaEdit, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

/**
 * Clean, compact professional table
 * - Blue header background (#073d7f)
 * - Slightly increased font size
 * - No data / logic changes
 */

const tableStyles = {
  wrapper: {
    width: "100%",
    marginTop: 8,
    overflowX: "visible",
  },

  table: {
    width: "100%",
    tableLayout: "auto",
    borderCollapse: "collapse",
    fontFamily:
      "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif",
    fontSize: 14, // 🔹 slightly increased
    color: "#111827",
  },

  /* ===== TABLE HEADER ===== */
  thead: {
    backgroundColor: "#073d7f", // 🔹 requested blue
  },

  th: {
    padding: "10px 8px",
    textAlign: "left",
    fontWeight: 600,
    whiteSpace: "nowrap",
    fontSize: 14, // 🔹 slightly larger
    color: "#ffffff",
    borderBottom: "2px solid #052c5f",
  },

  /* ===== TABLE BODY ===== */
  td: {
    padding: "8px 8px",
    borderBottom: "1px solid #f1f5f9",
    whiteSpace: "nowrap",
    verticalAlign: "middle",
    overflow: "hidden",
    textOverflow: "ellipsis",
    fontSize: 14,
  },

  nameCell: {
    fontWeight: 600,
  },

  /* CONTACT COLUMN STACKED */
  contactCell: {
    whiteSpace: "normal",
    lineHeight: 1.2,
  },
  contactLine: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    marginBottom: 2,
    fontSize: 13,
  },
  contactIcon: {
    fontSize: 12,
    color: "#4b5563",
  },

  /* STATUS BADGES */
  statusActive: {
    padding: "4px 10px",
    borderRadius: 999,
    fontSize: 12,
    backgroundColor: "#dcfce7",
    color: "#166534",
    fontWeight: 600,
  },
  statusInactive: {
    padding: "4px 10px",
    borderRadius: 999,
    fontSize: 12,
    backgroundColor: "#fee2e2",
    color: "#b91c1c",
    fontWeight: 600,
  },

  /* ACTIONS */
  actionsCell: {
    textAlign: "right",
    paddingRight: 0,
  },

  iconGroup: {
    display: "inline-flex",
    alignItems: "center",
    gap: 0,
  },

  iconButton: {
    background: "none",
    border: "none",
    padding: 8,
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
  },

  editBtn: { color: "#0b4a8f" },
  deleteBtn: { color: "#b91c1c" },
};

const UserTable = ({ users = [], onEdit, onDelete }) => {
  const renderRole = (role) =>
    role ? role.charAt(0).toUpperCase() + role.slice(1) : "-";

  return (
    <div style={tableStyles.wrapper}>
      <table style={tableStyles.table}>
        <thead style={tableStyles.thead}>
          <tr>
            <th style={tableStyles.th}>Name</th>
            <th style={tableStyles.th}>Role</th>
            <th style={tableStyles.th}>Department</th>
            <th style={tableStyles.th}>Contact / Email</th>
            <th style={tableStyles.th}>Status</th>
            <th style={tableStyles.th}>Joining Date</th>
            <th style={{ ...tableStyles.th, textAlign: "right", paddingRight: 0 }}>
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {users.length > 0 ? (
            users.map((user) => {
              const id = user.id || user._id;
              const fullName = user.fullName || "-";
              const phone = user.phoneNumber || user.phone || "-";
              const email = user.emailAddress || user.email || "-";
              const joining = user.joiningDate
                ? user.joiningDate.split("T")[0]
                : "-";
              const status = user.status || "Inactive";

              return (
                <tr key={id}>
                  <td style={{ ...tableStyles.td, ...tableStyles.nameCell }}>
                    {fullName}
                  </td>
                  <td style={tableStyles.td}>{renderRole(user.role)}</td>
                  <td style={tableStyles.td}>{user.department || "-"}</td>

                  <td style={{ ...tableStyles.td, ...tableStyles.contactCell }}>
                    <div style={tableStyles.contactLine}>
                      <FaPhoneAlt style={tableStyles.contactIcon} />
                      <span>{phone}</span>
                    </div>
                    <div style={tableStyles.contactLine}>
                      <FaEnvelope style={tableStyles.contactIcon} />
                      <span>{email}</span>
                    </div>
                  </td>

                  <td style={tableStyles.td}>
                    <span
                      style={
                        status.toLowerCase() === "active"
                          ? tableStyles.statusActive
                          : tableStyles.statusInactive
                      }
                    >
                      {status}
                    </span>
                  </td>

                  <td style={tableStyles.td}>{joining}</td>

                  <td style={tableStyles.actionsCell}>
                    <div style={tableStyles.iconGroup}>
                      <button
                        style={{ ...tableStyles.iconButton, ...tableStyles.editBtn }}
                        onClick={() => onEdit(user)}
                        title="Edit"
                      >
                        <FaEdit size={15} />
                      </button>

                      <button
                        style={{ ...tableStyles.iconButton, ...tableStyles.deleteBtn }}
                        onClick={() => onDelete(id)}
                        title="Delete"
                      >
                        <FaTrash size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td style={tableStyles.td} colSpan={7}>
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;

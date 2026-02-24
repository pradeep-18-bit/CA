import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa";
 
const TableStyles = () => (
  <style>
    {`
/* Table Container */
.ct-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
  background: white;
  border-radius: 8px;
  overflow: hidden;
}
 
/* Header */
.ct-table th {
  background: #073D7F;
  padding: 14px;
  text-align: left;
  font-weight: 600;
  color: #fff;
  text-transform: uppercase;
  font-size: 0.85rem;
}
 
.ct-table th:first-child {
  border-radius: 8px 0 0 0;
}
 
.ct-table th:last-child {
  border-radius: 0 8px 0 0;
}
 
/* Rows */
.ct-table td {
  padding: 14px;
  border-bottom: 1px solid #e5e7eb;
  font-size: 14px;
}
 
.ct-table tr:hover {
  background-color: #f7fafc;
}
 
/* Editable Inputs */
.ct-table input,
.ct-table select {
  width: 100%;
  padding: 8px;
  border: 2px solid #e2e8f0;
  background: white;
  border-radius: 8px;
  font-size: 14px;
  box-sizing: border-box;
}
 
.ct-table input:focus,
.ct-table select:focus {
  border-color: #073D7F;
  box-shadow: 0 0 0 3px rgba(7,61,127,0.2);
}
 
/* Buttons */
.edit-btn,
.delete-btn,
.save-btn,
.cancel-btn {
  padding: 6px 10px;
  font-size: 13px;
  border-radius: 6px;
  cursor: pointer;
  border: none;
}
 
.edit-btn {
  // background: #3182ce;
  color: white;
}
 
.edit-btn:hover {
  // background: #2b6cb0;
}
 
.delete-btn {
  // background: #e53e3e;
  color: white;
}
 
.delete-btn:hover {
  // background: #c53030;
}
 
.save-btn {
  background: #38a169;
  color: white;
}
 
.save-btn:hover {
  background: #2f855a;
}
 
.cancel-btn {
  background: #a0aec0;
  color: white;
}
 
.cancel-btn:hover {
  background: #718096;
}
 
/* Status Colors */
.text-status-active {
  color: #2f855a;
  font-weight: 600;
}
 
.text-status-inactive {
  color: #c53030;
  font-weight: 600;
}
 
/* Pagination */
.pagination-container {
  margin-top: 12px;
  display: flex;
  justify-content: center;
  gap: 6px;
}
 
.pagination-button {
  padding: 6px 12px;
  border-radius: 6px;
  background: #e2e8f0;
  border: none;
  cursor: pointer;
  font-size: 14px;
}
 
.pagination-button:hover {
  background: #cbd5e0;
}
 
.pagination-button.is-active {
  background: #073D7F;
  color: white;
}
 
.pagination-button:disabled {
  background: #cbd5e0;
  cursor: not-allowed;
}
    `}
  </style>
);
 
export default function ClientTable({
  paginatedClients,
  startIndex,
  handleClientClick,
  handleDelete,
  totalPages,
  currentPage,
  handlePageChange,
}) {
  const [clients, setClients] = useState(paginatedClients);
  const [editIndex, setEditIndex] = useState(null);
  const [editedClient, setEditedClient] = useState({});
  const [feedback, setFeedback] = useState(null);
 
  useEffect(() => {
    setClients(paginatedClients);
  }, [paginatedClients]);
 
  const showFeedback = (message, type = "info") => {
    setFeedback({ message, type });
    setTimeout(() => setFeedback(null), 4000);
  };
 
  const handleEditClick = (client, index) => {
    setEditIndex(index);
    setEditedClient({ ...client });
  };
 
  const handleCancel = () => {
    setEditIndex(null);
    setEditedClient({});
  };
 
  const handleInputChange = (e) => {
    setEditedClient({ ...editedClient, [e.target.name]: e.target.value });
  };
 
  const API_URL =
    "https://posthemorrhagic-nonequilaterally-caroline.ngrok-free.dev/api/clients";
 
  const handleSave = async () => {
    if (!editedClient.id) {
      showFeedback("❌ Cannot update: Missing client ID.", "error");
      return;
    }
 
    const payload = {
      services: editedClient.services,
      status: editedClient.status,
      lastActivity: editedClient.lastActivity,
    };
 
    try {
      const response = await fetch(`${API_URL}/${editedClient.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
        body: JSON.stringify(payload),
      });
 
      if (!response.ok) throw new Error("Failed to update client");
 
      const updatedClient = await response.json();
 
      const updatedList = [...clients];
      updatedList[editIndex] = {
        ...clients[editIndex],
        ...updatedClient,
      };
 
      setClients(updatedList);
      showFeedback("✅ Client updated successfully!", "success");
      setEditIndex(null);
      setEditedClient({});
    } catch (error) {
      console.error("Update Error:", error);
      showFeedback("❌ Error updating client", "error");
    }
  };
 
  return (
    <>
      <TableStyles />
 
      {feedback && (
        <div
          style={{
            marginBottom: "10px",
            padding: "8px",
            borderRadius: "5px",
            textAlign: "center",
            background: feedback.type === "success" ? "#d4edda" : "#f8d7da",
            color: feedback.type === "success" ? "#155724" : "#721c24",
          }}
        >
          {feedback.message}
        </div>
      )}
 
      <table className="ct-table">
        <thead>
          <tr>
            <th>Client</th>
            <th>Type</th>
            <th>PAN</th>
            <th>GST</th>
            <th>Contact / Email</th>
            <th>Services</th>
            <th>Status</th>
            <th>Last Activity</th>
            <th>Action</th>
          </tr>
        </thead>
 
        <tbody>
          {clients.length > 0 ? (
            clients.map((c, i) => (
              <tr key={c.id || i}>
                <td onClick={() => handleClientClick(c)}>{c.clientName}</td>
                <td onClick={() => handleClientClick(c)}>{c.clientType}</td>
                <td onClick={() => handleClientClick(c)}>{c.panNumber}</td>
                <td onClick={() => handleClientClick(c)}>{c.gstNumber || "-"}</td>
                <td onClick={() => handleClientClick(c)}>{c.contact}</td>
 
                <td>
                  {editIndex === i ? (
                    <input
                      type="text"
                      name="services"
                      value={editedClient.services || ""}
                      onChange={handleInputChange}
                    />
                  ) : Array.isArray(c.services) ? (
                    c.services.join(", ")
                  ) : (
                    c.services
                  )}
                </td>
 
                <td>
                  {editIndex === i ? (
                    <select
                      name="status"
                      value={editedClient.status || "Active"}
                      onChange={handleInputChange}
                    >
                      <option>Active</option>
                      <option>Inactive</option>
                    </select>
                  ) : (
                    <span
                      className={
                        c.status === "Active"
                          ? "text-status-active"
                          : "text-status-inactive"
                      }
                    >
                      {c.status}
                    </span>
                  )}
                </td>
 
                <td>
                  {editIndex === i ? (
                    <input
                      type="date"
                      name="lastActivity"
                      value={editedClient.lastActivity || ""}
                      onChange={handleInputChange}
                    />
                  ) : (
                    c.lastActivity
                  )}
                </td>
 
                <td style={{ display: "flex", gap: "6px" }}>
                  {editIndex === i ? (
                    <>
                      <button className="save-btn" onClick={handleSave}>
                        Save
                      </button>
                      <button className="cancel-btn" onClick={handleCancel}>
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="edit-btn"
                        onClick={() => handleEditClick(c, i)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(c.id)}
                      >
                        <FaTrash />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" style={{ textAlign: "center", padding: "20px" }}>
                No clients found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
 
      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="pagination-container">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="pagination-button"
          >
            Previous
          </button>
 
          {[...Array(totalPages).keys()].map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page + 1)}
              className={`pagination-button ${
                currentPage === page + 1 ? "is-active" : ""
              }`}
            >
              {page + 1}
            </button>
          ))}
 
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="pagination-button"
          >
            Next
          </button>
        </div>
      )}
    </>
  );
}
 
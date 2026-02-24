

import React, { useState } from "react";
import { FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa";

const TableStyles = () => (
  <style>
    {`
      .ft-table {
        width: 100%;
        border-collapse: collapse;
        background-color: #ffffff;
        color: #000000;
        font-family: Arial, sans-serif;
        margin-top: 20px;
        border: 2px solid #b7b5b5ff;
      }

      .ft-table th {
        background-color: #f8f8f8;
        color: #000000;
        font-weight: bold;
        padding: 12px 15px;
        text-align: left;
        border-bottom: 2px solid #b7b5b5ff;
        border-right: 1px solid #ccc;
      }

      .ft-table th:last-child {
        border-right: none;
      }

      .ft-table td {
        padding: 12px 15px;
        border-bottom: 1px solid #ccc;
        vertical-align: middle;
        border-right: 1px solid #ccc;
      }

      .ft-table td:last-child {
        border-right: none;
      }

      .ft-table tbody tr:nth-of-type(even) {
        background-color: #fdfdfd;
      }

      .ft-table tbody tr:hover {
        background-color: #f1f1f1;
      }

      .ft-table input[type="text"],
      .ft-table select {
        width: 100%;
        padding: 8px;
        box-sizing: border-box;
        background-color: #ffffff;
        color: #000000;
        border: 1px solid #999;
        border-radius: 4px;
      }

      .ft-actions {
        text-align: center;
      }

      .ft-actions button {
        background: none;
        border: none;
        color: #333333;
        cursor: pointer;
        font-size: 1.1em;
        margin: 0 8px;
        padding: 5px;
        transition: color 0.2s ease;
      }

      .ft-actions button[title="Edit"]:hover,
      .ft-actions button[title="Save"]:hover {
        color: #4CAF50;
      }

      .ft-actions button[title="Delete"]:hover,
      .ft-actions button[title="Cancel"]:hover {
        color: #f44336;
      }
    `}
  </style>
);

export default function FilingTable({ filings, onStatusChange, onDelete, onEdit }) {
  const statusOptions = ["Pending", "In Progress", "Completed", "Overdue"];
  const priorityOptions = ["High", "Medium", "Low"];

  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({});

  const handleEditClick = (filing) => {
    setEditingId(filing.id);
    setEditFormData({ ...filing });
  };

  const handleCancelClick = () => {
    setEditingId(null);
    setEditFormData({});
  };

  const handleSaveClick = async () => {
    await onEdit(editFormData);
    setEditingId(null);
    setEditFormData({});
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      <TableStyles />
      <table className="ft-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Client</th>
            <th>Service</th>
            <th>Due Date</th>
            <th>Status</th>
            <th>Assigned To</th>
            <th>Priority</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filings.map((f) => {
            const isEditing = editingId === f.id;
            return (
              <tr key={f.id}>
                <td>{f.id}</td>

                <td>
                  {isEditing ? (
                    <input
                      type="text"
                      name="clientName"
                      value={editFormData.clientName}
                      onChange={handleEditChange}
                      required
                    />
                  ) : (
                    f.clientName
                  )}
                </td>

                <td>
                  {isEditing ? (
                    <input
                      type="text"
                      name="service"
                      value={editFormData.service}
                      onChange={handleEditChange}
                    />
                  ) : (
                    f.service
                  )}
                </td>

                <td>
                  {isEditing ? (
                    <input
                      type="date"
                      name="dueDate"
                      value={editFormData.dueDate}
                      onChange={handleEditChange}
                    />
                  ) : (
                    f.dueDate
                  )}
                </td>

                <td>
                  <select
                    name="status"
                    value={isEditing ? editFormData.status : f.status}
                    onChange={
                      isEditing
                        ? handleEditChange
                        : (e) => onStatusChange(f.id, e.target.value)
                    }
                  >
                    {statusOptions.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </td>

                <td>
                  {isEditing ? (
                    <input
                      type="text"
                      name="assignedTo"
                      value={editFormData.assignedTo}
                      onChange={handleEditChange}
                    />
                  ) : (
                    f.assignedTo
                  )}
                </td>

                <td>
                  {isEditing ? (
                    <select
                      name="priority"
                      value={editFormData.priority}
                      onChange={handleEditChange}
                    >
                      {priorityOptions.map((p) => (
                        <option key={p} value={p}>
                          {p}
                        </option>
                      ))}
                    </select>
                  ) : (
                    f.priority
                  )}
                </td>

                <td className="ft-actions">
                  {isEditing ? (
                    <>
                      <button onClick={handleSaveClick} title="Save">
                        <FaSave />
                      </button>
                      <button onClick={handleCancelClick} title="Cancel">
                        <FaTimes />
                      </button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleEditClick(f)} title="Edit">
                        <FaEdit />
                      </button>
                      <button onClick={() => onDelete(f.id)} title="Delete">
                        <FaTrash />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}


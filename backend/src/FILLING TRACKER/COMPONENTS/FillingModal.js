import React, { useState, useEffect } from "react";

export default function FilingModal({ form, onChange, onClose, onSubmit }) {
  const [errors, setErrors] = useState({});
  const [shake, setShake] = useState(false);

  const [clients, setClients] = useState([]);
  const [loadingClients, setLoadingClients] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);

  const [staffList, setStaffList] = useState([]);
  const [loadingStaff, setLoadingStaff] = useState(true);

  const CLIENT_API =
    "https://posthemorrhagic-nonequilaterally-caroline.ngrok-free.dev/api/clients";

  const STAFF_API =
    "https://posthemorrhagic-nonequilaterally-caroline.ngrok-free.dev/api/staff";

  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    const loadClients = async () => {
      try {
        setLoadingClients(true);
        const res = await fetch(CLIENT_API, {
          headers: {
            Accept: "application/json",
            "ngrok-skip-browser-warning": "true",
          },
        });
        const data = await res.json();
        setClients(data);
      } catch {
        setFetchError("Failed to load clients");
      } finally {
        setLoadingClients(false);
      }
    };
    loadClients();
  }, []);

  useEffect(() => {
    const loadStaff = async () => {
      try {
        setLoadingStaff(true);
        const res = await fetch(STAFF_API, {
          headers: {
            Accept: "application/json",
            "ngrok-skip-browser-warning": "true",
          },
        });
        const data = await res.json();
        setStaffList(data);
      } catch {
        console.error("Staff fetch error");
      } finally {
        setLoadingStaff(false);
      }
    };
    loadStaff();
  }, []);

  useEffect(() => {
    if (!selectedClient) return;

    const auto = {
      clientName: selectedClient.clientName,
      clientType: selectedClient.clientType,
      contact: selectedClient.contact,
      gstNumber: selectedClient.gstNumber,
      panNumber: selectedClient.panNumber,
      service: selectedClient.services,
    };

    Object.entries(auto).forEach(([k, v]) =>
      onChange({ target: { name: k, value: v || "" } })
    );
  }, [selectedClient]);

  const validate = () => {
    const err = {};
    if (!form.clientName) err.clientName = "Client required";
    if (!form.service) err.service = "Service required";
    if (!form.dueDate) err.dueDate = "Due date required";
    if (!form.assignedTo) err.assignedTo = "Select staff";
    return err;
  };

  const handleAssignedSelect = (e) => {
    const name = e.target.value;
    const staff = staffList.find((s) => s.fullName === name);

    if (staff) {
      onChange({ target: { name: "assignedTo", value: staff.fullName } });
      onChange({ target: { name: "assignedToName", value: staff.fullName } });
      onChange({
        target: { name: "assignedToEmail", value: staff.emailAddress },
      });
    } else {
      onChange({ target: { name: "assignedTo", value: "" } });
      onChange({ target: { name: "assignedToName", value: "" } });
      onChange({ target: { name: "assignedToEmail", value: "" } });
    }

    if (errors.assignedTo) {
      setErrors((prev) => ({ ...prev, assignedTo: undefined }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const err = validate();
    setErrors(err);

    if (Object.keys(err).length === 0) {
      onSubmit();
      onClose();
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 400);
    }
  };

  const handleInputChange = (e) => {
    if (errors[e.target.name])
      setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
    onChange(e);
  };

  const handleClientSelect = (e) => {
    const cname = e.target.value;
    const found = clients.find((c) => c.clientName === cname);

    setSelectedClient(found || null);
    onChange({ target: { name: "clientName", value: cname } });
  };

  return (
    <div className="modal-overlay">
      <div className={`modal-box ${shake ? "shake" : ""}`}>

        <h3 className="modal-title">Add New Filing</h3>

        <div className="grid-container">

          {/* CLIENT NAME */}
          <div className="modal-field">
            <label>Client Name</label>
            <select
              name="clientName"
              value={form.clientName}
              onChange={handleClientSelect}
              className={errors.clientName ? "error-border" : ""}
            >
              <option value="">Select Client</option>
              {clients.map((c) => (
                <option key={c.id} value={c.clientName}>
                  {c.clientName}
                </option>
              ))}
            </select>
            {errors.clientName && (
              <p className="error-text">{errors.clientName}</p>
            )}
          </div>

          {/* SERVICE */}
          <div className="modal-field">
            <label>Service</label>
            <input
              name="service"
              value={form.service}
              onChange={handleInputChange}
              className={errors.service ? "error-border" : ""}
            />
            {errors.service && (
              <p className="error-text">{errors.service}</p>
            )}
          </div>

          {/* DUE DATE */}
          <div className="modal-field">
            <label>Due Date</label>
            <input
              type="date"
              name="dueDate"
              value={form.dueDate}
              onChange={handleInputChange}
              className={errors.dueDate ? "error-border" : ""}
            />
            {errors.dueDate && (
              <p className="error-text">{errors.dueDate}</p>
            )}
          </div>

          {/* STATUS */}
          <div className="modal-field">
            <label>Status</label>
            <select name="status" value={form.status} onChange={handleInputChange}>
              <option>Pending</option>
              <option>In Progress</option>
              <option>Completed</option>
              <option>Overdue</option>
            </select>
          </div>

          {/* ASSIGNED STAFF */}
          <div className="modal-field">
            <label>Assigned To</label>
            <select
              name="assignedTo"
              value={form.assignedTo}
              onChange={handleAssignedSelect}
              className={errors.assignedTo ? "error-border" : ""}
            >
              <option value="">Select Staff</option>
              {staffList.map((s) => (
                <option key={s.id} value={s.fullName}>
                  {s.fullName}
                </option>
              ))}
            </select>
            {errors.assignedTo && (
              <p className="error-text">{errors.assignedTo}</p>
            )}
          </div>

          {/* ASSIGNED TO EMAIL – ALWAYS PRESENT */}
          <div className="modal-field">
            <label>Assigned To Email</label>
            <input
              type="text"
              value={form.assignedToEmail || ""}
              readOnly
              className="readonly-input"
            />
          </div>

          {/* PRIORITY */}
          <div className="modal-field">
            <label>Priority</label>
            <select
              name="priority"
              value={form.priority}
              onChange={handleInputChange}
            >
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </div>
        </div>

        {/* BUTTONS */}
        <div
          className="modal-actions"
          style={{
            display: "flex",
            gap: "10px",
            justifyContent: "flex-end",
          }}
        >
          <button
            onClick={onClose}
            style={{
              width: "200px",
              padding: "10px 0",
              fontSize: "14px",
              borderRadius: "6px",
              background: "#ccc",
              border: "none",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            style={{
              width: "200px",
              padding: "10px 0",
              fontSize: "14px",
              borderRadius: "6px",
              background: "#007bff",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            Add Filing
          </button>
        </div>
      </div>

      <style>
        {`
          .modal-overlay {
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,0.5);
            display:flex;
            justify-content:center;
            align-items:center;
            z-index:2000;
          }
          .modal-box {
            background:white;
            padding:25px;
            width:450px;
            border-radius:10px;
            max-height:90vh;
            overflow-y:auto;
          }
          .grid-container {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
          }
          .error-border { border:1px solid red; }
          .error-text { color:red; font-size:0.8rem; }
          .readonly-input {
            background:#f2f2f2;
            cursor:not-allowed;
          }
        `}
      </style>
    </div>
  );
}

import React, { useState } from "react";
import "./Global.css";

export default function ClientForm({ setShowForm, fetchClients }) {

  const API_URL =
    "https://posthemorrhagic-nonequilaterally-caroline.ngrok-free.dev/api/clients";
  // const API_URL = "http://localhost:8080/api/clients";

  const initialState = {
    name: "",
    type: "Company",
    pan: "",
    gst: "",
    contact: "",
    email: "",
    services: "",
    status: "Active",
    lastActivity: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [formErrors, setFormErrors] = useState({});

  const serviceOptions = [
    "TAX Planning",
    "GST Filing",
    "GST",
    "ROC",
    "Payroll",
  ];

  // ==============================
  // HANDLE INPUT CHANGE
  // ==============================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData(prev => {
      if (name === "pan" || name === "gst") {
        return { ...prev, [name]: value.toUpperCase() };
      }

      if (name === "contact") {
        return { ...prev, contact: value.replace(/\D/g, "") };
      }

      return { ...prev, [name]: value };
    });
  };

  // ==============================
  // VALIDATION
  // ==============================
  const validate = () => {
    let errors = {};

    if (!formData.name.trim())
      errors.name = "Client name required";

    if (!/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(formData.pan))
      errors.pan = "Invalid PAN (Format: AAAAA1111A)";

    if (!/^\d{2}[A-Z]{5}\d{4}[A-Z]\d[A-Z]\d$/.test(formData.gst))
      errors.gst = "Invalid GST format";

    if (!/^[6-9]\d{9}$/.test(formData.contact))
      errors.contact = "Enter valid 10 digit mobile number";

    if (!/^\S+@\S+\.\S+$/.test(formData.email.trim()))
      errors.email = "Invalid email";

    if (!formData.services)
      errors.services = "Select service";

    if (!formData.lastActivity)
      errors.lastActivity = "Select date";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // ==============================
  // HANDLE SUBMIT
  // ==============================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    const payload = {
      clientName: formData.name.trim(),
      clientType: formData.type.toLowerCase(),
      panNumber: formData.pan,
      gstNumber: formData.gst,
      contact: formData.contact,
      email: formData.email.trim(),
      services: formData.services,
      status: formData.status,
      lastActivity: formData.lastActivity,
    };

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      // Safely read response
      let data = {};
      try {
        data = await res.json();
      } catch {
        data = {};
      }

      if (!res.ok) {
        alert(data.message || "Failed to save client");
        return;
      }

      alert("Client Added Successfully ✅");

      fetchClients?.();
      setShowForm(false);
      setFormData(initialState);

    } catch (error) {
      console.error("Error:", error);
      alert("Server Error. Please check backend or ngrok.");
    }
  };

  // ==============================
  // UI
  // ==============================
  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="form-grid">

        <div className="form-group">
          <label>Client Name *</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="input-style"
          />
          <span className="error-text">{formErrors.name}</span>
        </div>

        <div className="form-group">
          <label>Client Type *</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="input-style"
          >
            <option>Company</option>
            <option>Individual</option>
            <option>Partnership</option>
          </select>
        </div>

        <div className="form-group">
          <label>PAN *</label>
          <input
            name="pan"
            value={formData.pan}
            onChange={handleChange}
            maxLength={10}
            className="input-style"
          />
          <span className="error-text">{formErrors.pan}</span>
        </div>

        <div className="form-group">
          <label>GST *</label>
          <input
            name="gst"
            value={formData.gst}
            onChange={handleChange}
            maxLength={15}
            className="input-style"
          />
          <span className="error-text">{formErrors.gst}</span>
        </div>

        <div className="form-group">
          <label>Contact *</label>
          <input
            name="contact"
            type="tel"
            value={formData.contact}
            onChange={handleChange}
            maxLength={10}
            className="input-style"
            placeholder="9876543210"
          />
          <span className="error-text">{formErrors.contact}</span>
        </div>

        <div className="form-group">
          <label>Email *</label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="input-style"
          />
          <span className="error-text">{formErrors.email}</span>
        </div>

        <div className="form-group">
          <label>Services *</label>
          <select
            name="services"
            value={formData.services}
            onChange={handleChange}
            className="input-style"
          >
            <option value="">Select Service</option>
            {serviceOptions.map((s, i) => (
              <option key={i} value={s}>
                {s}
              </option>
            ))}
          </select>
          <span className="error-text">{formErrors.services}</span>
        </div>

        <div className="form-group">
          <label>Status *</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="input-style"
          >
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>

        <div className="form-group">
          <label>Last Activity *</label>
          <input
            type="date"
            name="lastActivity"
            value={formData.lastActivity}
            onChange={handleChange}
            className="input-style"
          />
          <span className="error-text">{formErrors.lastActivity}</span>
        </div>

      </div>

      <div className="form-actions">
        <button type="submit" className="submit-button-style">
          Submit
        </button>

        <button
          type="button"
          onClick={() => setShowForm(false)}
          className="submit-button-style btn-secondary"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

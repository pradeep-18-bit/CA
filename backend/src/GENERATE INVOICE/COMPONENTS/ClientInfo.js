import React from "react";

const ClientInfo = () => {
  return (
    <section className="gi-form-section">
      <h2 className="gi-section-title">Client Information</h2>
      <p className="gi-section-subtitle">Select client to auto-fill details</p>
      <div className="gi-full-width">
        <label htmlFor="client-select" className="gi-hidden-label">Select Client</label>
        <select id="client-select" className="gi-input-field">
          <option>Choose a client</option>
        </select>
      </div>
    </section>
  );
};

export default ClientInfo;

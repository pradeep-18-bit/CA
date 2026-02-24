import React from "react";

const InvoiceHeader = () => {
  return (
    <header className="gi-header">
      <div>
        <h1 className="gi-header-title">Generate Invoice</h1>
        <p className="gi-header-subtitle">Create and send invoices to your clients</p>
      </div>
      <div className="gi-actions">
        <button className="gi-pdf-btn">
          <span role="img" aria-label="pdf icon">📄</span> Generate PDF
        </button>
        <button className="gi-send-btn">
          <span role="img" aria-label="send icon">✉️</span> Send Invoice
        </button>
      </div>
    </header>
  );
};

export default InvoiceHeader;

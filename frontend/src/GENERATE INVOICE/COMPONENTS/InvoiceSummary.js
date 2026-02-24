import React from "react";

const InvoiceSummary = ({ invoiceData }) => {
  return (
    <aside className="gi-summary-panel">
      <h2 className="gi-section-title">Invoice Summary</h2>

      <div className="gi-summary-row">
        <span>Subtotal:</span>
        <span>₹{invoiceData.subtotal}</span>
      </div>

      <div className="gi-summary-row">
        <span>GST (18%):</span>
        <span>₹{invoiceData.gst}</span>
      </div>

      <div className="gi-total-row">
        <span>Total:</span>
        <span>₹{invoiceData.total}</span>
      </div>

      <div className="gi-invoice-info">
        <p>Invoice Info:</p>
        <p>Invoice: <strong>{invoiceData.invoiceNumber}</strong></p>
        <p>Date: <strong>{invoiceData.date}</strong></p>
      </div>
    </aside>
  );
};

export default InvoiceSummary;

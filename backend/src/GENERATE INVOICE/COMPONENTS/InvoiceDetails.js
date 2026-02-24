import React from "react";

const InvoiceDetails = ({ invoiceData }) => {
  return (
    <section className="gi-form-section">
      <h2 className="gi-section-title">Invoice Details</h2>
      <div className="gi-form-row">
        <div className="gi-full-width">
          <label htmlFor="invoice-number" className="gi-hidden-label">Invoice Number</label>
          <input type="text" id="invoice-number" placeholder="Invoice Number" defaultValue={invoiceData.invoiceNumber} className="gi-input-field" />
        </div>
        <div className="gi-full-width">
          <label htmlFor="invoice-date" className="gi-hidden-label">Invoice Date</label>
          <input type="text" id="invoice-date" placeholder="Invoice Date" defaultValue={invoiceData.date} className="gi-input-field" />
        </div>
      </div>
      <div className="gi-full-width">
        <label htmlFor="due-date" className="gi-hidden-label">Due Date</label>
        <input type="text" id="due-date" placeholder="Pick a date (Due Date)" className="gi-input-field" />
      </div>
    </section>
  );
};

export default InvoiceDetails;

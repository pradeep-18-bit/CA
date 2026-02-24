import React from "react";

const InvoiceItems = ({ invoiceData }) => {
  return (
    <section className="gi-form-section">
      <h2 className="gi-section-title">Invoice Items</h2>
      <p className="gi-section-subtitle">Add services and products</p>

      <button className="gi-add-item-btn">
        <span role="img" aria-label="plus icon">+</span> Add Item
      </button>
      <div className="gi-clear-float"></div>

      <div className="gi-item-box">
        <div className="gi-item-title">Item 1</div>
        <label htmlFor="item-description-1" className="gi-hidden-label">Service Description</label>
        <textarea id="item-description-1" rows="2" placeholder="Service description" className="gi-item-description"></textarea>

        <div className="gi-quantity-row">
          <div className="gi-item-input-group">
            <label htmlFor="item-qty-1" className="gi-item-label">Quantity</label>
            <input type="number" id="item-qty-1" defaultValue={invoiceData.itemQuantity} className="gi-input-field" />
          </div>
          <div className="gi-item-input-group">
            <label htmlFor="item-rate-1" className="gi-item-label">Rate (₹)</label>
            <input type="number" id="item-rate-1" defaultValue={invoiceData.itemRate} className="gi-input-field" />
          </div>
          <div className="gi-item-input-group">
            <label htmlFor="item-amount-1" className="gi-item-label">Amount (₹)</label>
            <input type="text" id="item-amount-1" readOnly defaultValue={invoiceData.itemAmount} className="gi-input-field" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default InvoiceItems;

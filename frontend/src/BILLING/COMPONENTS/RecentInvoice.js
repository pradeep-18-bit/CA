import React from 'react';

const RecentInvoices = ({ invoices }) => {
  return (
    <div className="recent-invoices-card">
      <h3 className="recent-invoices-title">Recent Invoices</h3>
      <div>
        {invoices.map((invoice, index) => (
          <div
            key={invoice.id}
            className={`invoice-item ${index === invoices.length - 1 ? 'invoice-item-last' : ''}`}
          >
            <div className="invoice-client-date">
              <span className="invoice-client">{invoice.client}</span>
              <span className="invoice-date">{invoice.date}</span>
            </div>
            <div className="invoice-amount-status">
              <span className="invoice-amount">₹{invoice.amount}</span>
              <span className={`status-tag ${invoice.status}`}>
                {invoice.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentInvoices;

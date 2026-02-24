import React from 'react';

const BillingSummary = ({ summary }) => {
  return (
    <div className="summary-grid">
      <div className="summary-card">
        <div className="summary-card-title">Total Revenue</div>
        <div className="summary-card-amount total-revenue-amount">₹{summary.totalRevenue}</div>
        <div className="summary-card-subtitle revenue-change-positive">{summary.revenueChange}</div>
      </div>

      <div className="summary-card">
        <div className="summary-card-title">Pending Invoices</div>
        <div className="summary-card-amount pending-amount">₹{summary.pendingInvoicesAmount}</div>
        <div className="summary-card-subtitle">{summary.pendingInvoicesCount}</div>
      </div>

      <div className="summary-card">
        <div className="summary-card-title">Overdue Amount</div>
        <div className="summary-card-amount overdue-amount-color">₹{summary.overdueAmount}</div>
        <div className="summary-card-subtitle">{summary.overdueCount}</div>
      </div>
    </div>
  );
};

export default BillingSummary;

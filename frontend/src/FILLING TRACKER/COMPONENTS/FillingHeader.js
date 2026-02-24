import React from "react";

export default function FilingHeader({ onNewFiling }) {
  return (
    <div className="ft-header-row">
      <div>
        <h2 className="ft-page-title">Filing Tracker</h2>
        <p className="ft-subtext">Monitor and manage all client filings and deadlines</p>
      </div>
      <button className="ft-new-filing-btn" onClick={onNewFiling}>
        + New Filing
      </button>
    </div>
  );
}

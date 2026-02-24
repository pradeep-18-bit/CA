import React from "react";

export default function UploadForm({ onBack }) {
  return (
    <div className="navigated-view">
      <h2>Upload New Documents</h2>
      <p>
        This is a mock upload form. You can add file selection, client assignment, and
        additional details here.
      </p>
      <button className="back-button" onClick={onBack}>
        Back to Documents
      </button>
    </div>
  );
}

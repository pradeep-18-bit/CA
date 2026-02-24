import React from "react";

export default function CategoryData({ name, onBack }) {
  return (
    <div className="navigated-view">
      <h2>Documents in: {name}</h2>
      <p>This view lists all documents that fall under the <b>{name}</b> category.</p>
      <p>Example Data: Documents related to {name}.</p>
      <button className="back-button" onClick={onBack}>
        Back to All Documents
      </button>
    </div>
  );
}

import React from "react";
import { FaCloudUploadAlt } from "react-icons/fa";

export default function QuickUpload({
  handleFileExplorerClick,
  handleFileSelection,
  fileInputRef,
}) {
  return (
    <div className="quick-upload-section">
      <FaCloudUploadAlt className="upload-icon" />
      <p>Quick Upload</p>
      <p>Drag and drop files here for quick upload</p>
      <button className="select-files-button" onClick={handleFileExplorerClick}>
        Select Files
      </button>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelection}
        style={{ display: "none" }}
      />
    </div>
  );
}

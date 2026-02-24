// import React from "react";
// import { FaEye, FaDownload, FaTrashAlt, FaFilePdf, FaImage } from "react-icons/fa";

// export default function DocumentTable({ documents }) {
//   const getIcon = (type) => {
//     if (type === "pdf") return <FaFilePdf className="document-icon" />;
//     return <FaImage className="document-icon" />;
//   };

//   return (
//     <div className="documents-table-section">
//       <div className="table-header">
//         <h2>Uploaded Documents ({documents.length})</h2>
//       </div>
//       <table className="styled-table">
//         <thead>
//           <tr>
//             <th>Document</th>
//             <th>Client</th>
//             <th>Category</th>
//             <th>Size</th>
//             <th>Upload Date</th>
//             <th>Status</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {documents.map((doc, index) => (
//             <tr key={index}>
//               <td>
//                 <div className="document-info">
//                   {getIcon(doc.icon)}
//                   <div>
//                     <p>{doc.name}</p>
//                     <span>{doc.type}</span>
//                   </div>
//                 </div>
//               </td>
//               <td>{doc.client}</td>
//               <td>
//                 <span className="category-badge">{doc.category}</span>
//               </td>
//               <td>{doc.size}</td>
//               <td>{doc.uploadDate}</td>
//               <td>
//                 <span className={`status-badge ${doc.status}`}>{doc.status}</span>
//               </td>
//               <td>
//                 <div className="action-buttons">
//                   <FaEye />
//                   <FaDownload />
//                   <FaTrashAlt />
//                 </div>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }


import React from "react";
import { FaEye, FaDownload, FaTrash, FaCheck } from "react-icons/fa";


export default function DocumentTable({ documents, handlePreview, handleDownload, handleStatusChange, handleDelete }) {
  return (
    <div className="all-documents-section mt-8 p-4">
      <h2 className="text-lg font-bold mb-4">All Documents</h2>
      {documents.length === 0 ? (
        <p>No documents found.</p>
      ) : (
        <table className="document-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Client</th>
              <th>Category</th>
              <th>Status</th>
              <th>Upload Date</th>
              <th>File Size (KB)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((doc, i) => (
              <tr key={doc.id} className={i % 2 === 0 ? "row-even" : "row-odd"}>
                <td>{doc.id}</td>
                <td>{doc.clientName}</td>
                <td>{doc.category}</td>
                <td>{doc.status}</td>
                <td>{new Date(doc.uploadDate).toLocaleString()}</td>
                <td>{(doc.fileSize / 1024).toFixed(2)}</td>
                <td className="actions">
                  <button onClick={() => handlePreview(doc)}><FaEye /> Preview</button>
                  <button onClick={() => handleDownload(doc)}><FaDownload /> Download</button>
                  <button onClick={() => handleStatusChange(doc)}><FaCheck /> Status</button>
                  <button onClick={() => handleDelete(doc.id)}><FaTrash /> Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

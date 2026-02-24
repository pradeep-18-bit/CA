


// import React, { useEffect, useState } from "react";
// import { FaTrash, FaEdit } from "react-icons/fa";

// export default function TaskList({ tasks = [], onEdit, onDelete }) {
//   /* ================= STAFF MAP ================= */
//   const [staffMap, setStaffMap] = useState({});

//   useEffect(() => {
//     const fetchStaff = async () => {
//       try {
//         const res = await fetch(
//           "https://posthemorrhagic-nonequilaterally-caroline.ngrok-free.dev/api/staff",
//           { headers: { "ngrok-skip-browser-warning": "true" } }
//         );

//         const data = await res.json();

//         const map = {};
//         data.forEach((u) => {
//           map[u.emailAddress] = u.fullName;
//         });

//         setStaffMap(map);
//       } catch (err) {
//         console.error("Failed to fetch staff", err);
//       }
//     };

//     fetchStaff();
//   }, []);

//   /* ================= EMAIL → FULL NAME ================= */
//   const resolveFullName = (email) => {
//     if (!email) return "—";
//     return staffMap[email] || email;
//   };

//   return (
//     <>
//       <style>{`
//         .tm-table {
//           width: 100%;
//           border-collapse: separate;
//           border-spacing: 0 10px;
//           font-size: 14px;
//         }

//         .tm-table thead th {
//           background: #073d7f;
//           color: #fff;
//           padding: 14px 16px;
//           font-weight: 600;
//           text-align: left;
//         }

//         .tm-table tbody tr {
//           background: #ffffff;
//           box-shadow: 0 2px 8px rgba(0,0,0,0.08);
//         }

//         .tm-table td {
//           padding: 14px 16px;
//           color: #333;
//           white-space: nowrap;
//         }

//         .tm-actions {
//           display: flex;
//           justify-content: center;
//           gap: 12px;
//         }

//         .tm-action-btn {
//           width: 40px;
//           height: 40px;
//           border-radius: 10px;
//           border: none;
//           cursor: pointer;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           font-size: 16px;
//         }

//         .tm-edit-btn {
//           background: rgba(13, 110, 253, 0.15);
//           color: #0d6efd;
//         }

//         .tm-delete-btn {
//           background: rgba(220, 53, 69, 0.15);
//           color: #dc3545;
//         }
//       `}</style>

//       <table className="tm-table">
//         <thead>
//           <tr>
//             <th>Task</th>
//             <th>Assigned By</th>
//             <th>Due</th>
//             <th>Priority</th>
//             <th>Hours</th>
//             <th>Status</th>
//             <th>Actions</th>
//           </tr>
//         </thead>

//         <tbody>
//           {tasks.map((task) => (
//             <tr key={task.id}>
//               <td>{task.title}</td>

//               {/* ✅ ASSIGNED BY (FULL NAME ONLY) */}
//               <td>
//                 {resolveFullName(task.createdByEmail)}
//               </td>

//               <td>{task.dueDate}</td>
//               <td>{task.priority}</td>
//               <td>{task.hours}</td>
//               <td>{task.status}</td>

//               <td>
//                 <div className="tm-actions">
//                   <button
//                     className="tm-action-btn tm-edit-btn"
//                     onClick={() => onEdit(task)}
//                     title="Edit"
//                   >
//                     <FaEdit />
//                   </button>

//                   <button
//                     className="tm-action-btn tm-delete-btn"
//                     onClick={() => onDelete(task.id)}
//                     title="Delete"
//                   >
//                     <FaTrash />
//                   </button>
//                 </div>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </>
//   );
// }







 
import React, { useEffect, useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
 
export default function TaskList({ tasks = [], onEdit, onDelete }) {
  /* ================= STAFF MAP ================= */
  const [staffMap, setStaffMap] = useState({});
 
  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const res = await fetch(
          "https://posthemorrhagic-nonequilaterally-caroline.ngrok-free.dev/api/staff",
          { headers: { "ngrok-skip-browser-warning": "true" } }
        );
 
        const data = await res.json();
 
        const map = {};
        data.forEach((u) => {
          map[u.emailAddress] = u.fullName;
        });
 
        setStaffMap(map);
      } catch (err) {
        console.error("Failed to fetch staff", err);
      }
    };
 
    fetchStaff();
  }, []);
 
  /* ================= EMAIL → FULL NAME ================= */
  const resolveFullName = (email) => {
    if (!email) return "—";
    return staffMap[email] || email;
  };
 
  return (
    <>
      <style>{`
        .tm-table {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0 10px;
          font-size: 14px;
        }
 
        .tm-table thead th {
          background: #073d7f;
          color: #fff;
          padding: 14px 16px;
          font-weight: 600;
          text-align: left;
        }
 
        .tm-table tbody tr {
          background: #ffffff;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        }
 
        .tm-table td {
          padding: 14px 16px;
          color: #333;
          white-space: nowrap;
        }
 
        .tm-actions {
          display: flex;
          justify-content: center;
          gap: 12px;
        }
 
        .tm-action-btn {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
        }
 
        .tm-edit-btn {
          background: rgba(13, 110, 253, 0.15);
          color: #0d6efd;
        }
 
        .tm-delete-btn {
          background: rgba(220, 53, 69, 0.15);
          color: #dc3545;
        }
      `}</style>
 
      <table className="tm-table">
        <thead>
          <tr>
            <th>Task</th>
            <th>Assigned By</th>
            <th>Due</th>
            <th>Priority</th>
            <th>Hours</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
 
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.title}</td>
 
              {/* ✅ ASSIGNED BY (FULL NAME ONLY) */}
              <td>
                {resolveFullName(task.createdByEmail)}
              </td>
 
              <td>{task.dueDate}</td>
              <td>{task.priority}</td>
              <td>{task.hours}</td>
              <td>{task.status}</td>
 
              <td>
                <div className="tm-actions">
                  <button
                    className="tm-action-btn tm-edit-btn"
                    onClick={() => onEdit(task)}
                    title="Edit"
                  >
                    <FaEdit />
                  </button>
 
                  <button
                    className="tm-action-btn tm-delete-btn"
                    onClick={() => onDelete(task.id)}
                    title="Delete"
                  >
                    <FaTrash />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
 

 
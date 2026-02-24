
// import React, { useState, useEffect } from "react";

// const CLIENTS_ALL_API =
//   "https://posthemorrhagic-nonequilaterally-caroline.ngrok-free.dev/api/clients/all";
// const CLIENTS_API =
//   "https://posthemorrhagic-nonequilaterally-caroline.ngrok-free.dev/api/clients";

// export default function TaskModal({
//   task,
//   setTask,
//   staff,
//   onSave,
//   onClose,
//   isEdit,
// }) {
//   const [clients, setClients] = useState([]);
//   const [showDescModal, setShowDescModal] = useState(false);
//   const [tempDesc, setTempDesc] = useState(task.description || "");

//   const role = (localStorage.getItem("role") || "").toLowerCase();

//   const isAdmin = role === "admin";
//   const isStaff = role === "staff";
//   const isIntern = role === "intern";

//   // ================= SYNC DESCRIPTION =================
//   useEffect(() => {
//     setTempDesc(task.description || "");
//   }, [task.description]);

//   // ================= FETCH CLIENTS =================
//   useEffect(() => {
//     const headers = {
//       Accept: "application/json",
//       "ngrok-skip-browser-warning": "true",
//     };

//     const normalize = (data) =>
//       Array.isArray(data)
//         ? data
//             .map((c) => ({
//               id: c.id || c._id || c.clientId,
//               name: c.name || c.clientName || c.companyName,
//             }))
//             .filter((c) => c.name)
//         : [];

//     const fetchClients = async () => {
//       try {
//         const resAll = await fetch(CLIENTS_ALL_API, { headers });
//         const dataAll = await resAll.json();
//         const n = normalize(dataAll);
//         if (n.length) return setClients(n);
//       } catch {}

//       try {
//         const res = await fetch(CLIENTS_API, { headers });
//         const data = await res.json();
//         setClients(normalize(data));
//       } catch {
//         setClients([]);
//       }
//     };

//     fetchClients();
//   }, []);

//   // ================= STAFF SELECT =================
//   const handleStaffSelect = (email) => {
//     const selected = staff.find((s) => s.emailAddress === email);
//     if (!selected) return;

//     // staff can assign only intern
//     if (isStaff && selected.role !== "intern") return;

//     setTask({
//       ...task,
//       assignedTo: selected.fullName,
//       assignedToEmail: selected.emailAddress,
//     });
//   };

//   // ================= INPUT HANDLER =================
//   const handleInput = (name, value) => {
//     setTask({ ...task, [name]: value });
//   };

//   // ================= SAVE DESCRIPTION =================
//   const saveDescription = () => {
//     setTask({ ...task, description: tempDesc });
//     setShowDescModal(false);
//   };

//   // ================= INTERN CREATE BLOCK =================
//   if (isIntern && !isEdit) {
//     return (
//       <div className="tm-modalOverlay">
//         <div className="tm-modal">
//           <h3>Access Denied</h3>
//           <p>Interns are not allowed to create tasks.</p>
//           <div className="tm-modalActions">
//             <button className="tm-saveBtn" onClick={onClose}>
//               OK
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="tm-modalOverlay">
//       <div className="tm-modal">
//         <h3>{isEdit ? "Edit Task" : "Create Task"}</h3>

//         {/* ================= MAIN FORM ================= */}
//         <div
//           style={{
//             display: "grid",
//             gridTemplateColumns: "1fr 1fr",
//             gap: "12px",
//             marginTop: "10px",
//           }}
//         >
//           {/* TASK TITLE */}
//           <div className="tm-formGroup">
//             <label>Task Title</label>
//             <select
//               className="tm-input"
//               disabled={isEdit && !isAdmin}
//               value={task.title || ""}
//               onChange={(e) => handleInput("title", e.target.value)}
//             >
//               <option value="">Select Task</option>
//               <option>Check Details of Client</option>
//               <option>Collect DOCs</option>
//               <option>Generate Invoice</option>
//               <option>Complete Billing</option>
//               <option>Contact Client</option>
//             </select>
//           </div>

//           {/* CLIENT */}
//           <div className="tm-formGroup">
//             <label>Client</label>
//             <select
//               className="tm-input"
//               disabled={isEdit && !isAdmin}
//               value={task.client || ""}
//               onChange={(e) => handleInput("client", e.target.value)}
//             >
//               <option value="">Select Client</option>
//               {clients.map((c) => (
//                 <option key={c.id} value={c.name}>
//                   {c.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* ASSIGNED TO */}
//           <div className="tm-formGroup">
//             <label>Assigned To</label>
//             <select
//               className="tm-input"
//               disabled={isEdit && !isAdmin}
//               value={task.assignedToEmail || ""}
//               onChange={(e) => handleStaffSelect(e.target.value)}
//             >
//               <option value="">Select User</option>
//               {staff
//                 .filter((s) => (isStaff ? s.role === "intern" : true))
//                 .map((s) => (
//                   <option key={s.emailAddress} value={s.emailAddress}>
//                     {s.fullName}
//                   </option>
//                 ))}
//             </select>
//           </div>

//           {/* ASSIGNED STAFF EMAIL */}
//           <div className="tm-formGroup">
//             <label>Assigned Staff Email</label>
//             <input
//               className="tm-input"
//               value={task.assignedToEmail || ""}
//               readOnly
//             />
//           </div>

//           {/* ✅ CREATED BY EMAIL (FIXED) */}
//           <div className="tm-formGroup">
//             <label>Created By Email</label>
//             <input
//               className="tm-input"
//               value={task.createdByEmail || ""}
//               readOnly
//             />
//           </div>

//           {/* DUE DATE */}
//           <div className="tm-formGroup">
//             <label>Due Date</label>
//             <input
//               type="date"
//               className="tm-input"
//               disabled={isEdit && !isAdmin}
//               value={task.dueDate || ""}
//               onChange={(e) => handleInput("dueDate", e.target.value)}
//             />
//           </div>

//           {/* PRIORITY */}
//           <div className="tm-formGroup">
//             <label>Priority</label>
//             <select
//               className="tm-input"
//               disabled={isEdit && !isAdmin}
//               value={task.priority || "Medium"}
//               onChange={(e) => handleInput("priority", e.target.value)}
//             >
//               <option>High</option>
//               <option>Medium</option>
//               <option>Low</option>
//             </select>
//           </div>

//           {/* STATUS (EDITABLE BY ALL) */}
//           <div className="tm-formGroup">
//             <label>Status</label>
//             <select
//               className="tm-input"
//               value={task.status || "To Do"}
//               onChange={(e) => handleInput("status", e.target.value)}
//             >
//               <option>To Do</option>
//               <option>In Progress</option>
//               <option>Review</option>
//               <option>Completed</option>
//             </select>
//           </div>

//           {/* HOURS */}
//           <div className="tm-formGroup">
//             <label>Hours</label>
//             <input
//               type="number"
//               className="tm-input"
//               disabled={isEdit && !isAdmin}
//               value={task.hours || ""}
//               onChange={(e) => handleInput("hours", e.target.value)}
//             />
//           </div>
//         </div>

//         {/* ================= DESCRIPTION ================= */}
//         <div className="tm-formGroup" style={{ marginTop: 16 }}>
//           <button
//             type="button"
//             className="tm-saveBtn"
//             onClick={() => setShowDescModal(true)}
//           >
//             {task.description ? "View / Edit Description" : "Add Description"}
//           </button>
//         </div>

//         {/* DESCRIPTION POPUP */}
//         {showDescModal && (
//           <div className="tm-modalOverlay" style={{ backdropFilter: "blur(4px)" }}>
//             <div className="tm-modal" style={{ width: 600 }}>
//               <h3>Task Description</h3>
//               <textarea
//                 className="tm-input"
//                 style={{ height: 140 }}
//                 value={tempDesc}
//                 onChange={(e) => setTempDesc(e.target.value)}
//               />
//               <div className="tm-modalActions">
//                 <button
//                   className="tm-cancelBtn"
//                   onClick={() => setShowDescModal(false)}
//                 >
//                   Cancel
//                 </button>
//                 <button className="tm-saveBtn" onClick={saveDescription}>
//                   OK
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* ================= ACTION BUTTONS ================= */}
//         <div className="tm-modalActions">
//           <button className="tm-cancelBtn" onClick={onClose}>
//             Cancel
//           </button>
//           <button className="tm-saveBtn" onClick={onSave}>
//             {isEdit ? "Update Task" : "Create Task"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }




import React, { useState, useEffect } from "react";

const CLIENTS_ALL_API =
  "https://posthemorrhagic-nonequilaterally-caroline.ngrok-free.dev/api/clients/all";
const CLIENTS_API =
  "https://posthemorrhagic-nonequilaterally-caroline.ngrok-free.dev/api/clients";

export default function TaskModal({
  task,
  setTask,
  staff,
  onSave,
  onClose,
  isEdit,
}) {
  const [clients, setClients] = useState([]);
  const [showDescModal, setShowDescModal] = useState(false);
  const [tempDesc, setTempDesc] = useState(task.description || "");
  const [errors, setErrors] = useState({});

  const role = (localStorage.getItem("role") || "").toLowerCase();

  const isAdmin = role === "admin";
  const isStaff = role === "staff";
  const isIntern = role === "intern";

  useEffect(() => {
    setTempDesc(task.description || "");
  }, [task.description]);

  useEffect(() => {
    const headers = {
      Accept: "application/json",
      "ngrok-skip-browser-warning": "true",
    };

    const normalize = (data) =>
      Array.isArray(data)
        ? data
            .map((c) => ({
              id: c.id || c._id || c.clientId,
              name: c.name || c.clientName || c.companyName,
            }))
            .filter((c) => c.name)
        : [];

    const fetchClients = async () => {
      try {
        const resAll = await fetch(CLIENTS_ALL_API, { headers });
        const dataAll = await resAll.json();
        const n = normalize(dataAll);
        if (n.length) return setClients(n);
      } catch {}

      try {
        const res = await fetch(CLIENTS_API, { headers });
        const data = await res.json();
        setClients(normalize(data));
      } catch {
        setClients([]);
      }
    };

    fetchClients();
  }, []);

  const handleStaffSelect = (email) => {
    const selected = staff.find((s) => s.emailAddress === email);
    if (!selected) return;

    if (isStaff && selected.role !== "intern") return;

    setTask({
      ...task,
      assignedTo: selected.fullName,
      assignedToEmail: selected.emailAddress,
    });

    setErrors({ ...errors, assignedToEmail: "" });
  };

  const handleInput = (name, value) => {
    setTask({ ...task, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const saveDescription = () => {
    setTask({ ...task, description: tempDesc });
    setShowDescModal(false);
  };

  const validate = () => {
    let newErrors = {};

    if (!task.title) newErrors.title = "Task title is required";
    if (!task.client) newErrors.client = "Client is required";
    if (!task.assignedToEmail) newErrors.assignedToEmail = "Assignee is required";
    if (!task.dueDate) newErrors.dueDate = "Due date is required";
    if (!task.priority) newErrors.priority = "Priority is required";
    if (!task.status) newErrors.status = "Status is required";
    if (!task.hours) newErrors.hours = "Hours is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  if (isIntern && !isEdit) {
    return (
      <div className="tm-modalOverlay">
        <div className="tm-modal">
          <h3>Access Denied</h3>
          <p>Interns are not allowed to create tasks.</p>
          <div className="tm-modalActions">
            <button className="tm-saveBtn" onClick={onClose}>
              OK
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="tm-modalOverlay">
      {/* INTERNAL CSS */}
      <style>
        {`
          .tm-error {
            border-left: 4px solid red !important;
          }
          .tm-errorText {
            color: red;
            font-size: 12px;
            margin-top: 4px;
          }
        `}
      </style>

      <div className="tm-modal">
        <h3>{isEdit ? "Edit Task" : "Create Task"}</h3>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "12px",
            marginTop: "10px",
          }}
        >
          {/* TASK TITLE */}
          <div className="tm-formGroup">
            <label>Task Title</label>
            <select
              className={`tm-input ${errors.title ? "tm-error" : ""}`}
              disabled={isEdit && !isAdmin}
              value={task.title || ""}
              onChange={(e) => handleInput("title", e.target.value)}
            >
              <option value="">Select Task</option>
              <option>Check Details of Client</option>
              <option>Collect DOCs</option>
              <option>Generate Invoice</option>
              <option>Complete Billing</option>
              <option>Contact Client</option>
            </select>
            {errors.title && <div className="tm-errorText">{errors.title}</div>}
          </div>

          {/* CLIENT */}
          <div className="tm-formGroup">
            <label>Client</label>
            <select
              className={`tm-input ${errors.client ? "tm-error" : ""}`}
              disabled={isEdit && !isAdmin}
              value={task.client || ""}
              onChange={(e) => handleInput("client", e.target.value)}
            >
              <option value="">Select Client</option>
              {clients.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
            {errors.client && <div className="tm-errorText">{errors.client}</div>}
          </div>

          {/* ASSIGNED TO */}
          <div className="tm-formGroup">
            <label>Assigned To</label>
            <select
              className={`tm-input ${errors.assignedToEmail ? "tm-error" : ""}`}
              disabled={isEdit && !isAdmin}
              value={task.assignedToEmail || ""}
              onChange={(e) => handleStaffSelect(e.target.value)}
            >
              <option value="">Select User</option>
              {staff
                .filter((s) => (isStaff ? s.role === "intern" : true))
                .map((s) => (
                  <option key={s.emailAddress} value={s.emailAddress}>
                    {s.fullName}
                  </option>
                ))}
            </select>
            {errors.assignedToEmail && (
              <div className="tm-errorText">{errors.assignedToEmail}</div>
            )}
          </div>

          {/* ASSIGNED STAFF EMAIL */}
          <div className="tm-formGroup">
            <label>Assigned Staff Email</label>
            <input
              className="tm-input"
              value={task.assignedToEmail || ""}
              readOnly
            />
          </div>

          {/* CREATED BY EMAIL */}
          <div className="tm-formGroup">
            <label>Created By Email</label>
            <input
              className="tm-input"
              value={task.createdByEmail || ""}
              readOnly
            />
          </div>

          {/* DUE DATE */}
          <div className="tm-formGroup">
            <label>Due Date</label>
            <input
              type="date"
              className={`tm-input ${errors.dueDate ? "tm-error" : ""}`}
              disabled={isEdit && !isAdmin}
              value={task.dueDate || ""}
              onChange={(e) => handleInput("dueDate", e.target.value)}
            />
            {errors.dueDate && <div className="tm-errorText">{errors.dueDate}</div>}
          </div>

          {/* PRIORITY */}
          <div className="tm-formGroup">
            <label>Priority</label>
            <select
              className={`tm-input ${errors.priority ? "tm-error" : ""}`}
              disabled={isEdit && !isAdmin}
              value={task.priority || "Medium"}
              onChange={(e) => handleInput("priority", e.target.value)}
            >
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
            {errors.priority && (
              <div className="tm-errorText">{errors.priority}</div>
            )}
          </div>

          {/* STATUS */}
          <div className="tm-formGroup">
            <label>Status</label>
            <select
              className={`tm-input ${errors.status ? "tm-error" : ""}`}
              value={task.status || "To Do"}
              onChange={(e) => handleInput("status", e.target.value)}
            >
              <option>To Do</option>
              <option>In Progress</option>
              <option>Review</option>
              <option>Completed</option>
            </select>
            {errors.status && <div className="tm-errorText">{errors.status}</div>}
          </div>

          {/* HOURS */}
          <div className="tm-formGroup">
            <label>Hours</label>
            <input
              type="number"
              className={`tm-input ${errors.hours ? "tm-error" : ""}`}
              disabled={isEdit && !isAdmin}
              value={task.hours || ""}
              onChange={(e) => handleInput("hours", e.target.value)}
            />
            {errors.hours && <div className="tm-errorText">{errors.hours}</div>}
          </div>
        </div>

        {/* DESCRIPTION */}
        <div className="tm-formGroup" style={{ marginTop: 16 }}>
          <button
            type="button"
            className="tm-saveBtn"
            onClick={() => setShowDescModal(true)}
          >
            {task.description ? "View / Edit Description" : "Add Description"}
          </button>
        </div>

        {showDescModal && (
          <div className="tm-modalOverlay" style={{ backdropFilter: "blur(4px)" }}>
            <div className="tm-modal" style={{ width: 600 }}>
              <h3>Task Description</h3>
              <textarea
                className="tm-input"
                style={{ height: 140 }}
                value={tempDesc}
                onChange={(e) => setTempDesc(e.target.value)}
              />
              <div className="tm-modalActions">
                <button
                  className="tm-cancelBtn"
                  onClick={() => setShowDescModal(false)}
                >
                  Cancel
                </button>
                <button className="tm-saveBtn" onClick={saveDescription}>
                  OK
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="tm-modalActions">
          <button className="tm-cancelBtn" onClick={onClose}>
            Cancel
          </button>
          <button
            className="tm-saveBtn"
            onClick={() => {
              if (validate()) onSave();
            }}
          >
            {isEdit ? "Update Task" : "Create Task"}
          </button>
        </div>
      </div>
    </div>
  );
}

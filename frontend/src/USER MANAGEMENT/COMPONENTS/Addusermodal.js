
// // AddUserModal.js
// import React, { useEffect, useRef, useState } from "react";
// import ReactDOM from "react-dom";

// const AddUserModal = ({ form, setForm, onClose, onSubmit, editing }) => {
//   const [users, setUsers] = useState([]);
//   const firstInputRef = useRef(null);

//   const permissionsList = [
//     "Clients Page",
//     "Compliance Calendar",
//     "Document Management",
//     "Billing Page",
//     "Filing Tracking",
//     "Generative Invoice",
//     "Task Management",
//     "Firm Settings",
//     "Report Analytics",
//     "Time Tracking",
//     "User Management",
//   ];

//   /* ========= FETCH USER LIST (ADD MODE ONLY) ========= */
//   useEffect(() => {
//     if (!editing) {
//       fetch(
//         "https://posthemorrhagic-nonequilaterally-caroline.ngrok-free.dev/api/user/all",
//         { headers: { "ngrok-skip-browser-warning": "true" } }
//       )
//         .then((res) => res.json())
//         .then((data) => setUsers(data || []))
//         .catch(console.error);
//     }
//   }, [editing]);

//   useEffect(() => {
//     const prev = document.body.style.overflow;
//     document.body.style.overflow = "hidden";
//     setTimeout(() => firstInputRef.current?.focus(), 80);
//     return () => (document.body.style.overflow = prev);
//   }, []);

//   const capitalize = (s) =>
//     s ? s.charAt(0).toUpperCase() + s.slice(1) : "";

//   const handleChange = (field, value) => {
//     setForm((prev) => ({ ...prev, [field]: value }));
//   };

//   /* ========= ADD MODE AUTO-FILL ========= */
//   const handleUserSelect = (email) => {
//     const u = users.find((x) => x.email === email);
//     if (!u) return;

//     setForm((prev) => ({
//       ...prev,
//       fullName: u.firstName,
//       email: u.email,
//       phone: u.mobileNumber,
//       role: capitalize(u.role),
//     }));
//   };

//   /* ========= TOGGLE ========= */
//   const handleTogglePermission = (perm, val) => {
//     setForm((prev) => ({
//       ...prev,
//       permissions: {
//         ...(prev.permissions || {}),
//         [perm]: val,
//       },
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(e);
//   };

//   const Toggle = ({ checked, onChange }) => (
//     <div
//       onClick={() => onChange(!checked)}
//       style={{
//         width: 42,
//         height: 22,
//         borderRadius: 20,
//         background: checked ? "#007bff" : "#bbb",
//         position: "relative",
//         cursor: "pointer",
//         transition: "0.2s",
//       }}
//     >
//       <div
//         style={{
//           width: 18,
//           height: 18,
//           borderRadius: "50%",
//           background: "#fff",
//           position: "absolute",
//           top: 2,
//           left: checked ? 22 : 2,
//           transition: "0.2s",
//         }}
//       />
//     </div>
//   );

//   const styles = {
//     overlay: {
//       position: "fixed",
//       inset: 0,
//       background: "rgba(0,0,0,0.45)",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       zIndex: 99999,
//       padding: 20,
//     },
//     card: {
//       background: "#fff",
//       padding: 24,
//       borderRadius: 12,
//       width: "100%",
//       maxWidth: 900,
//       maxHeight: "90vh",
//       overflowY: "auto",
//     },
//     formGrid: {
//       display: "grid",
//       gridTemplateColumns: "1fr 1fr",
//       gap: "14px 18px",
//     },
//     formRow: { display: "flex", flexDirection: "column" },
//     input: {
//       padding: "10px 12px",
//       border: "1px solid #d1d5db",
//       borderRadius: 8,
//     },
//     permissionsSection: {
//       gridColumn: "1 / -1",
//       background: "#f8fbff",
//       padding: 12,
//       borderRadius: 8,
//       border: "1px solid #e4e8f2",
//       marginTop: 16,
//     },
//     modalButtons: {
//       gridColumn: "1 / -1",
//       display: "flex",
//       justifyContent: "flex-end",
//       gap: 10,
//       marginTop: 20,
//     },
//   };

//   const permissions = form.permissions || {};

//   return ReactDOM.createPortal(
//     <div style={styles.overlay} onClick={onClose}>
//       <div style={styles.card} onClick={(e) => e.stopPropagation()}>
//         <h2>{editing ? "Edit Team Member" : "Add New Team Member"}</h2>

//         <form style={styles.formGrid} onSubmit={handleSubmit}>
//           {/* FULL NAME */}
//           <div style={styles.formRow}>
//             <label>Full Name *</label>
//             {!editing ? (
//               <select
//                 ref={firstInputRef}
//                 style={styles.input}
//                 value={form.email || ""}
//                 onChange={(e) => handleUserSelect(e.target.value)}
//               >
//                 <option value="">-- Select User --</option>
//                 {users.map((u, i) => (
//                   <option key={i} value={u.email}>
//                     {u.firstName}
//                   </option>
//                 ))}
//               </select>
//             ) : (
//               <input
//                 ref={firstInputRef}
//                 style={styles.input}
//                 value={form.fullName || ""}
//                 onChange={(e) =>
//                   handleChange("fullName", e.target.value)
//                 }
//               />
//             )}
//           </div>

//           {/* EMAIL */}
//           <div style={styles.formRow}>
//             <label>Email</label>
//             <input
//               style={styles.input}
//               value={form.email || ""}
//               onChange={(e) => handleChange("email", e.target.value)}
//             />
//           </div>

//           {/* PHONE */}
//           <div style={styles.formRow}>
//             <label>Phone</label>
//             <input
//               style={styles.input}
//               value={form.phone || ""}
//               onChange={(e) =>
//                 handleChange("phone", e.target.value.replace(/\D/g, ""))
//               }
//             />
//           </div>

//           {/* ROLE */}
//           <div style={styles.formRow}>
//             <label>Role</label>
//             <select
//               style={styles.input}
//               value={form.role || ""}
//               onChange={(e) => handleChange("role", e.target.value)}
//             >
//               <option>Staff</option>
//               <option>Intern</option>
//               <option>Manager</option>
//               <option>Partner</option>
//             </select>
//           </div>

//           {/* DEPARTMENT */}
//           <div style={styles.formRow}>
//             <label>Department</label>
//             <select
//               style={styles.input}
//               value={form.department || ""}
//               onChange={(e) =>
//                 handleChange("department", e.target.value)
//               }
//             >
//               <option value="">-- Select Department --</option>
//               <option>General</option>
//               <option>Audit</option>
//               <option>Taxation</option>
//               <option>Advisory</option>
//             </select>
//           </div>

//           {/* JOIN DATE */}
//           <div style={styles.formRow}>
//             <label>Joining Date</label>
//             <input
//               type="date"
//               style={styles.input}
//               value={form.joinDate || ""}
//               onChange={(e) =>
//                 handleChange("joinDate", e.target.value)
//               }
//             />
//           </div>

//           {/* STATUS */}
//           <div style={styles.formRow}>
//             <label>Status</label>
//             <select
//               style={styles.input}
//               value={form.status || ""}
//               onChange={(e) =>
//                 handleChange("status", e.target.value)
//               }
//             >
//               <option>Active</option>
//               <option>Inactive</option>
//             </select>
//           </div>

//           {/* ===== OLD PERMISSIONS TABLE STRUCTURE ===== */}
//           <div style={styles.permissionsSection}>
//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 marginBottom: 8,
//                 fontWeight: 600,
//               }}
//             >
//               <span>Module Permissions</span>
//               <span style={{ fontSize: 12, color: "#555" }}>
//                 Enable modules for this user
//               </span>
//             </div>

//             <table style={{ width: "100%", borderCollapse: "collapse" }}>
//               <tbody>
//                 {permissionsList.map((perm, index) => (
//                   <tr key={perm} style={{ borderBottom: "1px solid #eee" }}>
//                     <td style={{ padding: 6, width: 30 }}>
//                       {index + 1}
//                     </td>
//                     <td style={{ padding: 6 }}>{perm}</td>
//                     <td style={{ padding: 6, textAlign: "right" }}>
//                       <Toggle
//                         checked={!!permissions[perm]}
//                         onChange={(v) =>
//                           handleTogglePermission(perm, v)
//                         }
//                       />
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {/* BUTTONS */}
//           <div style={styles.modalButtons}>
//             <button type="button" onClick={onClose}>
//               Cancel
//             </button>
//             <button type="submit">
//               {editing ? "Save Changes" : "Add User"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>,
//     document.body
//   );
// };

// export default AddUserModal;




// AddUserModal.js
import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

const AddUserModal = ({ form, setForm, onClose, onSubmit, editing }) => {
  const [users, setUsers] = useState([]);
  const firstInputRef = useRef(null);

  const permissionsList = [
    "Clients Page",
    "Compliance Calendar",
    "Document Management",
    "Billing Page",
    "Filing Tracking",
    "Generative Invoice",
    "Task Management",
    "Firm Settings",
    "Report Analytics",
    "Time Tracking",
    "User Management",
  ];

  /* ========= FETCH USER LIST (ADD MODE ONLY) ========= */
  useEffect(() => {
    if (!editing) {
      fetch(
        "https://posthemorrhagic-nonequilaterally-caroline.ngrok-free.dev/api/user/all",
        { headers: { "ngrok-skip-browser-warning": "true" } }
      )
        .then((res) => res.json())
        .then((data) => setUsers(data || []))
        .catch(console.error);
    }
  }, [editing]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    setTimeout(() => firstInputRef.current?.focus(), 80);
    return () => (document.body.style.overflow = prev);
  }, []);

  const capitalize = (s) =>
    s ? s.charAt(0).toUpperCase() + s.slice(1) : "";

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  /* ========= ONLY INTERN & STAFF (NO ADMIN) ========= */
  const filteredUsers = users.filter(
    (u) =>
      u.role?.toLowerCase() === "intern" ||
      u.role?.toLowerCase() === "staff"
  );

  /* ========= ADD MODE AUTO-FILL ========= */
  const handleUserSelect = (email) => {
    const u = filteredUsers.find((x) => x.email === email);
    if (!u) return;

    setForm((prev) => ({
      ...prev,
      fullName: u.firstName,
      email: u.email,
      phone: u.mobileNumber,
      role: capitalize(u.role),
    }));
  };

  /* ========= TOGGLE ========= */
  const handleTogglePermission = (perm, val) => {
    setForm((prev) => ({
      ...prev,
      permissions: {
        ...(prev.permissions || {}),
        [perm]: val,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(e);
  };

  const Toggle = ({ checked, onChange }) => (
    <div
      onClick={() => onChange(!checked)}
      style={{
        width: 42,
        height: 22,
        borderRadius: 20,
        background: checked ? "#007bff" : "#bbb",
        position: "relative",
        cursor: "pointer",
        transition: "0.2s",
      }}
    >
      <div
        style={{
          width: 18,
          height: 18,
          borderRadius: "50%",
          background: "#fff",
          position: "absolute",
          top: 2,
          left: checked ? 22 : 2,
          transition: "0.2s",
        }}
      />
    </div>
  );

  const styles = {
    overlay: {
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.45)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 99999,
      padding: 20,
    },
    card: {
      background: "#fff",
      padding: 24,
      borderRadius: 12,
      width: "100%",
      maxWidth: 900,
      maxHeight: "90vh",
      overflowY: "auto",
    },
    formGrid: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "14px 18px",
    },
    formRow: { display: "flex", flexDirection: "column" },
    input: {
      padding: "10px 12px",
      border: "1px solid #d1d5db",
      borderRadius: 8,
    },
    permissionsSection: {
      gridColumn: "1 / -1",
      background: "#f8fbff",
      padding: 12,
      borderRadius: 8,
      border: "1px solid #e4e8f2",
      marginTop: 16,
    },
    modalButtons: {
      gridColumn: "1 / -1",
      display: "flex",
      justifyContent: "flex-end",
      gap: 10,
      marginTop: 20,
    },
  };

  const permissions = form.permissions || {};

  return ReactDOM.createPortal(
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.card} onClick={(e) => e.stopPropagation()}>
        <h2>{editing ? "Edit Team Member" : "Add New Team Member"}</h2>

        <form style={styles.formGrid} onSubmit={handleSubmit}>
          {/* FULL NAME (ONLY CHANGE HERE) */}
          <div style={styles.formRow}>
            <label>Full Name *</label>
            {!editing ? (
              <select
                ref={firstInputRef}
                style={styles.input}
                value={form.email || ""}
                onChange={(e) => handleUserSelect(e.target.value)}
              >
                <option value="">-- Select User --</option>
                {filteredUsers.map((u, i) => (
                  <option key={i} value={u.email}>
                    {u.firstName}
                  </option>
                ))}
              </select>
            ) : (
              <input
                ref={firstInputRef}
                style={styles.input}
                value={form.fullName || ""}
                onChange={(e) =>
                  handleChange("fullName", e.target.value)
                }
              />
            )}
          </div>

          {/* ===== ALL OTHER FIELDS UNCHANGED ===== */}

          {/* EMAIL */}
          <div style={styles.formRow}>
            <label>Email</label>
            <input
              style={styles.input}
              value={form.email || ""}
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </div>

          {/* PHONE */}
          <div style={styles.formRow}>
            <label>Phone</label>
            <input
              style={styles.input}
              value={form.phone || ""}
              onChange={(e) =>
                handleChange("phone", e.target.value.replace(/\D/g, ""))
              }
            />
          </div>

          {/* ROLE */}
          <div style={styles.formRow}>
            <label>Role</label>
            <select
              style={styles.input}
              value={form.role || ""}
              onChange={(e) => handleChange("role", e.target.value)}
            >
              <option>Staff</option>
              <option>Intern</option>
              <option>Manager</option>
              <option>Partner</option>
            </select>
          </div>

          {/* DEPARTMENT */}
          <div style={styles.formRow}>
            <label>Department</label>
            <select
              style={styles.input}
              value={form.department || ""}
              onChange={(e) =>
                handleChange("department", e.target.value)
              }
            >
              <option value="">-- Select Department --</option>
              <option>General</option>
              <option>Audit</option>
              <option>Taxation</option>
              <option>Advisory</option>
            </select>
          </div>

          {/* JOIN DATE */}
          <div style={styles.formRow}>
            <label>Joining Date</label>
            <input
              type="date"
              style={styles.input}
              value={form.joinDate || ""}
              onChange={(e) =>
                handleChange("joinDate", e.target.value)
              }
            />
          </div>

          {/* STATUS */}
          <div style={styles.formRow}>
            <label>Status</label>
            <select
              style={styles.input}
              value={form.status || ""}
              onChange={(e) =>
                handleChange("status", e.target.value)
              }
            >
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>

          {/* PERMISSIONS */}
          <div style={styles.permissionsSection}>
            <table style={{ width: "100%" }}>
              <tbody>
                {permissionsList.map((perm, index) => (
                  <tr key={perm}>
                    <td>{index + 1}</td>
                    <td>{perm}</td>
                    <td style={{ textAlign: "right" }}>
                      <Toggle
                        checked={!!permissions[perm]}
                        onChange={(v) =>
                          handleTogglePermission(perm, v)
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={styles.modalButtons}>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit">
              {editing ? "Save Changes" : "Add User"}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default AddUserModal;

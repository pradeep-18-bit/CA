// // import React, { useState, useEffect, useCallback } from 'react';

// // // --- Utility: Format Seconds to HH:MM:SS ---
// // const formatTime = (totalSeconds) => {
// //   if (totalSeconds < 0 || isNaN(totalSeconds)) return '00:00:00';
// //   const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
// //   const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
// //   const seconds = String(totalSeconds % 60).padStart(2, '0');
// //   return `${hours}:${minutes}:${seconds}`;
// // };

// // // --- Components ---

// // const TabButtons = ({ selectedTab, setSelectedTab }) => {
// //   const tabs = [
// //     { id: 'timer', label: 'Start Timer' },
// //     { id: 'entries', label: 'Time Entries' },
// //     { id: 'reports', label: 'Time Reports' }
// //   ];

// //   return (
// //     <div className="tab-buttons">
// //       {tabs.map(tab => (
// //         <button
// //           key={tab.id}
// //           className={`tab-button ${selectedTab === tab.id ? 'tab-active' : ''}`}
// //           onClick={() => setSelectedTab(tab.id)}
// //         >
// //           {tab.label}
// //         </button>
// //       ))}
// //     </div>
// //   );
// // };

// // const Modal = ({ title, children, onClose }) => (
// //   <div className="modal-overlay">
// //     <div className="modal-content">
// //       <div className="modal-header">
// //         <h3>{title}</h3>
// //         <button className="modal-close" onClick={onClose}>✕</button>
// //       </div>
// //       <div className="modal-body">{children}</div>
// //     </div>
// //   </div>
// // );

// // // --- Entry Form Component (Used for Timer & Manual Entry) ---
// // const EntryForm = ({ taskDetails, handleChange, handleSubmit, clients, projects, loadingClients, error, showDuration, submitButtonText, loading, timerLayout, errors = {} }) => (
// //   <form onSubmit={handleSubmit}>
// //     {timerLayout ? (
// //       <div>
// //         <div className="form-grid-2">
// //           <div className="form-group">
// //             <label className="form-label" htmlFor="task">Task Description </label>
// //             <input
// //               className={`form-input ${errors.task ? 'input-error' : ''}`}
// //               type="text"
// //               id="task"
// //               value={taskDetails.task}
// //               onChange={handleChange}
// //               placeholder="What are you working on?"
// //             />
// //             {errors.task && <span className="error-text">{errors.task}</span>}
// //           </div>

// //           <div className="form-group">
// //             <label className="form-label" htmlFor="client">Client </label>
// //             <select
// //               className={`form-input ${errors.client ? 'input-error' : ''}`}
// //               id="client"
// //               value={taskDetails.client}
// //               onChange={handleChange}
// //               disabled={loadingClients}
// //             >
// //               <option value="">
// //                 {loadingClients ? "Loading..." : "Select client"}
// //               </option>
// //               {!loadingClients && !error && clients.map((c) => (
// //                 <option key={c.id} value={c.clientName}>
// //                   {c.clientName}
// //                 </option>
// //               ))}
// //             </select>
// //             {errors.client && <span className="error-text">{errors.client}</span>}
// //           </div>
// //         </div>

// //         <div className="form-grid-3">
// //           <div className="form-group">
// //             <label className="form-label" htmlFor="project">Project</label>
// //             <select
// //               className="form-input"
// //               id="project"
// //               value={taskDetails.project}
// //               onChange={handleChange}
// //             >
// //               <option value="">Select project </option>
// //               {projects.map((p) => (
// //                 <option key={p.id} value={p.name}>{p.name}</option>
// //               ))}
// //             </select>
// //           </div>

// //           <div className="form-group">
// //             <label className="form-label" htmlFor="date">Date</label>
// //             <input
// //               className={`form-input ${errors.date ? 'input-error' : ''}`}
// //               type="date"
// //               id="date"
// //               value={taskDetails.date}
// //               onChange={handleChange}
// //             />
// //             {errors.date && <span className="error-text">{errors.date}</span>}
// //           </div>

// //           <div className="form-group">
// //             <label className="form-label" htmlFor="billing">Billing Type</label>
// //             <select
// //               className="form-input"
// //               id="billing"
// //               value={taskDetails.billing}
// //               onChange={handleChange}
// //             >
// //               <option>Billable</option>
// //               <option>Non-Billable</option>
// //             </select>
// //           </div>
// //         </div>
// //       </div>
// //     ) : (
// //       <div className="form-grid">
// //         {/* Manual Entry Layout */}
// //         <div className="form-group">
// //           <label className="form-label" htmlFor="task">Task Description *</label>
// //           <input
// //             className={`form-input ${errors.task ? 'input-error' : ''}`}
// //             type="text"
// //             id="task"
// //             value={taskDetails.task}
// //             onChange={handleChange}
// //             placeholder="What are you working on?"
// //           />
// //           {errors.task && <span className="error-text">{errors.task}</span>}
// //         </div>

// //         <div className="form-group">
// //           <label className="form-label" htmlFor="client">Client *</label>
// //           <select
// //             className={`form-input ${errors.client ? 'input-error' : ''}`}
// //             id="client"
// //             value={taskDetails.client}
// //             onChange={handleChange}
// //             disabled={loadingClients}
// //           >
// //             <option value="">Select client</option>
// //             {!loadingClients && !error && clients.map((c) => (
// //               <option key={c.id} value={c.clientName}>
// //                 {c.clientName}
// //               </option>
// //             ))}
// //           </select>
// //           {errors.client && <span className="error-text">{errors.client}</span>}
// //         </div>

// //         <div className="form-group">
// //           <label className="form-label" htmlFor="project">Project</label>
// //           <select
// //             className="form-input"
// //             id="project"
// //             value={taskDetails.project}
// //             onChange={handleChange}
// //           >
// //             <option value="">Select project </option>
// //             {projects.map((p) => (
// //               <option key={p.id} value={p.name}>{p.name}</option>
// //             ))}
// //           </select>
// //         </div>

// //         <div className="form-group">
// //           <label className="form-label" htmlFor="date">Date *</label>
// //           <input
// //             className={`form-input ${errors.date ? 'input-error' : ''}`}
// //             type="date"
// //             id="date"
// //             value={taskDetails.date}
// //             onChange={handleChange}
// //           />
// //           {errors.date && <span className="error-text">{errors.date}</span>}
// //         </div>

// //         <div className="form-group">
// //           <label className="form-label" htmlFor="billing">Billing Type</label>
// //           <select
// //             className="form-input"
// //             id="billing"
// //             value={taskDetails.billing}
// //             onChange={handleChange}
// //           >
// //             <option>Billable</option>
// //             <option>Non-Billable</option>
// //           </select>
// //         </div>

// //         {showDuration && (
// //           <div className="form-group">
// //             <label className="form-label" htmlFor="duration">Duration (HH:MM) *</label>
// //             <input
// //               type="text"
// //               id="duration"
// //               className={`form-input ${errors.duration ? 'input-error' : ''}`}
// //               placeholder="e.g., 01:30"
// //               value={taskDetails.duration}
// //               onChange={handleChange}
// //             />
// //             {errors.duration && <span className="error-text">{errors.duration}</span>}
// //           </div>
// //         )}
// //       </div>
// //     )}
    
// //     {submitButtonText && (
// //       <button type="submit" className="action-button primary" disabled={loading}>
// //         {loading ? 'Processing...' : submitButtonText}
// //       </button>
// //     )}
// //   </form>
// // );

// // // --- Main Tab Content ---
// // const TabContent = ({ selectedTab, isRunning, sessionTime, handleStopTimer, handleStartTimer, projects }) => {
// //   const API_BASE = "https://posthemorrhagic-nonequilaterally-caroline.ngrok-free.dev/api";
  
// //   const [taskDetails, setTaskDetails] = useState({
// //     task: "",
// //     client: "",
// //     project: "",
// //     billing: "Billable",
// //     date: new Date().toISOString().slice(0, 10),
// //     duration: "",
// //   });

// //   const [clients, setClients] = useState([]);
// //   const [loadingClients, setLoadingClients] = useState(false);
// //   const [error, setError] = useState(null);
// //   const [entries, setEntries] = useState([]);
// //   const [showManualEntry, setShowManualEntry] = useState(false);
// //   const [editEntry, setEditEntry] = useState(null);
// //   const [reports, setReports] = useState([]);
// //   const [loading, setLoading] = useState(false);
// //   const [successMessage, setSuccessMessage] = useState('');
// //   const [filterFromDate, setFilterFromDate] = useState('');
// //   const [filterToDate, setFilterToDate] = useState('');
  
// //   // Validation States
// //   const [formErrors, setFormErrors] = useState({});
// //   const [editErrors, setEditErrors] = useState({});

// //   useEffect(() => {
// //     const fetchClients = async () => {
// //       setLoadingClients(true);
// //       try {
// //         const response = await fetch(`${API_BASE}/clients/all`, {
// //           method: "GET",
// //           headers: {
// //             Accept: "application/json",
// //             "ngrok-skip-browser-warning": "true",
// //           },
// //         });
// //         if (!response.ok) throw new Error("Failed to fetch clients");
// //         const data = await response.json();
// //         const sortedClients = data
// //           .filter((c) => c.status === "Active")
// //           .sort((a, b) => a.clientName.localeCompare(b.clientName));
// //         setClients(sortedClients);
// //       } catch (err) {
// //         console.error("Client Fetch Error:", err);
// //         setError("⚠️ Failed to load clients");
// //       } finally {
// //         setLoadingClients(false);
// //       }
// //     };
// //     fetchClients();
// //   }, []);

// //   useEffect(() => {
// //     const fetchEntries = async () => {
// //       try {
// //         const response = await fetch(`${API_BASE}/time-tracker`, {
// //           headers: { "ngrok-skip-browser-warning": "true" },
// //         });
// //         if (response.ok) {
// //           const data = await response.json();
// //           setEntries(data);
// //           setReports(data);
// //         }
// //       } catch (err) {
// //         console.error("Error fetching entries:", err);
// //       }
// //     };
// //     if (selectedTab === 'entries' || selectedTab === 'reports') {
// //       fetchEntries();
// //     }
// //   }, [selectedTab]);

// //   // --- Validation Helpers ---
// //   const validateDurationFormat = (duration) => {
// //     if (!duration) return '';
// //     const regex = /^([0-9]{1,2}):([0-5][0-9])$/;
// //     if (!regex.test(duration)) {
// //       return 'Format must be HH:MM (e.g. 01:30)';
// //     }
// //     return '';
// //   };

// //   const validateManualForm = (details) => {
// //     const errs = {};
// //     if (!details.task || details.task.trim() === '') errs.task = 'Task description is required';
// //     if (!details.client || details.client.trim() === '') errs.client = 'Client is required';
// //     if (!details.date) errs.date = 'Date is required';
    
// //     // Duration validation (only for manual entry/edit, not start timer)
// //     if (!details.duration || details.duration.trim() === '') {
// //        errs.duration = 'Duration is required';
// //     } else {
// //        const durError = validateDurationFormat(details.duration);
// //        if (durError) errs.duration = durError;
// //     }
// //     return errs;
// //   };

// //   const validateTimerStart = (details) => {
// //     const errs = {};
// //     if (!details.task || details.task.trim() === '') errs.task = 'Task description is required';
// //     if (!details.client || details.client.trim() === '') errs.client = 'Client is required';
// //     return errs;
// //   };

// //   // --- Handlers ---

// //   const handleChange = (e) => {
// //     const { id, value } = e.target;
// //     setTaskDetails(prev => ({ ...prev, [id]: value }));
// //     // Real-time error clearing
// //     if (formErrors[id]) {
// //       setFormErrors(prev => ({ ...prev, [id]: '' }));
// //     }
// //   };

// //   const showSuccessMsg = (msg) => {
// //     setSuccessMessage(msg);
// //     setTimeout(() => setSuccessMessage(''), 3000);
// //   };

// //   const showErrorMsg = (msg) => {
// //     setError(msg);
// //     setTimeout(() => setError(null), 3000);
// //   };

// //   const onStartTimer = (details) => {
// //     const errs = validateTimerStart(details);
// //     if (Object.keys(errs).length > 0) {
// //       setFormErrors(errs);
// //       return;
// //     }
// //     handleStartTimer(details);
// //     showSuccessMsg('Timer started');
// //   };

// //   const onStopTimer = async () => {
// //     handleStopTimer();
// //     try {
// //       const duration = formatTime(sessionTime).slice(0, 5);
// //       const payload = {
// //         taskDescription: taskDetails.task,
// //         client: taskDetails.client,
// //         project: taskDetails.project || null,
// //         date: taskDetails.date,
// //         billingType: taskDetails.billing,
// //         duration: duration,
// //       };

// //       const response = await fetch(`${API_BASE}/time-tracker`, {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //           "ngrok-skip-browser-warning": "true",
// //         },
// //         body: JSON.stringify(payload),
// //       });

// //       if (response.ok) {
// //         const newEntry = await response.json();
// //         setEntries(prev => [newEntry, ...prev]);
// //         setReports(prev => [newEntry, ...prev]);
// //         setTaskDetails({
// //           task: "",
// //           client: "",
// //           project: "",
// //           billing: "Billable",
// //           date: new Date().toISOString().slice(0, 10),
// //           duration: "",
// //         });
// //         setFormErrors({});
// //         showSuccessMsg('✓ Timer entry saved');
// //       } else {
// //         const errorData = await response.json();
// //         showErrorMsg(errorData.message || "Failed to save entry");
// //       }
// //     } catch (err) {
// //       console.error("Error saving entry:", err);
// //       showErrorMsg("Failed to save timer entry");
// //     }
// //   };

// //   const handleManualEntrySubmit = async (e) => {
// //     e.preventDefault();
// //     const errs = validateManualForm(taskDetails);
    
// //     if (Object.keys(errs).length > 0) {
// //       setFormErrors(errs);
// //       return;
// //     }
    
// //     setLoading(true);
// //     try {
// //       const payload = {
// //         taskDescription: taskDetails.task,
// //         client: taskDetails.client,
// //         project: taskDetails.project || null,
// //         date: taskDetails.date,
// //         billingType: taskDetails.billing,
// //         duration: taskDetails.duration || null,
// //       };

// //       const response = await fetch(`${API_BASE}/time-tracker`, {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //           "ngrok-skip-browser-warning": "true",
// //         },
// //         body: JSON.stringify(payload),
// //       });

// //       if (response.ok) {
// //         const newEntry = await response.json();
// //         setEntries(prev => [newEntry, ...prev]);
// //         setReports(prev => [newEntry, ...prev]);
// //         setShowManualEntry(false);
// //         setTaskDetails({
// //           task: "",
// //           client: "",
// //           project: "",
// //           billing: "Billable",
// //           date: new Date().toISOString().slice(0, 10),
// //           duration: "",
// //         });
// //         setFormErrors({});
// //         showSuccessMsg('✓ Manual entry added');
// //       } else {
// //         const errorData = await response.json();
// //         showErrorMsg(errorData.message || "Failed to add entry");
// //       }
// //     } catch (err) {
// //       console.error("Error adding manual entry:", err);
// //       showErrorMsg("Failed to add manual entry");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleDelete = async (id, entry) => {
// //     try {
// //       const response = await fetch(`${API_BASE}/time-tracker`, {
// //         method: "DELETE",
// //         headers: {
// //           "Content-Type": "application/json",
// //           "ngrok-skip-browser-warning": "true",
// //         },
// //         body: JSON.stringify({
// //           taskDescription: entry.taskDescription,
// //           client: entry.client,
// //           project: entry.project || null,
// //         }),
// //       });

// //       if (response.ok) {
// //         setEntries(prev => prev.filter(e => e.id !== id));
// //         setReports(prev => prev.filter(r => r.id !== id));
// //         showSuccessMsg('✓ Entry deleted');
// //       } else {
// //         const errorData = await response.json();
// //         showErrorMsg(errorData.message || "Failed to delete entry");
// //       }
// //     } catch (err) {
// //       console.error("Error deleting entry:", err);
// //       showErrorMsg("Failed to delete entry");
// //     }
// //   };

// //   const handleEditSubmit = async (e) => {
// //     e.preventDefault();
    
// //     // Edit Form Validation
// //     const errs = {};
// //     if (!editEntry.taskDescription || editEntry.taskDescription.trim() === '') {
// //       errs.taskDescription = 'Task description is required';
// //     }
// //     if (!editEntry.client || editEntry.client.trim() === '') {
// //       errs.client = 'Client is required';
// //     }
// //     if (!editEntry.date) {
// //       errs.date = 'Date is required';
// //     }
// //     if (!editEntry.duration || editEntry.duration.trim() === '') {
// //         errs.duration = 'Duration is required';
// //     } else {
// //         const durErr = validateDurationFormat(editEntry.duration);
// //         if (durErr) errs.duration = durErr;
// //     }

// //     if (Object.keys(errs).length > 0) {
// //       setEditErrors(errs);
// //       return;
// //     }

// //     setLoading(true);
// //     try {
// //       const payload = {
// //         taskDescription: editEntry.taskDescription,
// //         client: editEntry.client,
// //         project: editEntry.project || null,
// //         date: editEntry.date,
// //         billingType: editEntry.billingType,
// //         duration: editEntry.duration || null,
// //       };

// //       const response = await fetch(`${API_BASE}/time-tracker`, {
// //         method: "PATCH",
// //         headers: {
// //           "Content-Type": "application/json",
// //           "ngrok-skip-browser-warning": "true",
// //         },
// //         body: JSON.stringify(payload),
// //       });

// //       if (response.ok) {
// //         const updatedEntry = await response.json();
// //         setEntries(prev => prev.map(e => e.id === updatedEntry.id ? updatedEntry : e));
// //         setReports(prev => prev.map(r => r.id === updatedEntry.id ? updatedEntry : r));
// //         setEditEntry(null);
// //         setEditErrors({});
// //         showSuccessMsg('✓ Entry updated');
// //       } else {
// //         const errorData = await response.json();
// //         showErrorMsg(errorData.message || "Failed to update entry");
// //       }
// //     } catch (err) {
// //       console.error("Error updating entry:", err);
// //       showErrorMsg("Failed to update entry");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const getFilteredReports = () => {
// //     return reports.filter(r => {
// //       const reportDate = new Date(r.date);
// //       const from = filterFromDate ? new Date(filterFromDate) : null;
// //       const to = filterToDate ? new Date(filterToDate) : null;

// //       if (from && reportDate < from) return false;
// //       if (to && reportDate > to) return false;
// //       return true;
// //     });
// //   };

// //   const groupReportsByDate = (filteredReports) => {
// //     const grouped = {};
// //     filteredReports.forEach(report => {
// //       const date = report.date;
// //       if (!grouped[date]) {
// //         grouped[date] = [];
// //       }
// //       grouped[date].push(report);
// //     });
// //     return grouped;
// //   };

// //   switch (selectedTab) {
// //     case "entries":
// //       return (
// //         <div className="tab-content-area">
// //           {successMessage && <div className="success-msg">{successMessage}</div>}
// //           {error && <div className="error-msg">{error}</div>}
          
// //           {entries.length === 0 ? (
// //             <p className="content-placeholder">No entries found yet.</p>
// //           ) : (
// //             <div className="table-container">
// //               <table className="professional-table">
// //                 <thead>
// //                   <tr>
// //                     <th>Task</th>
// //                     <th>Client</th>
// //                     <th>Project</th>
// //                     <th>Date</th>
// //                     <th>Billing</th>
// //                     <th>Duration</th>
// //                     <th>Actions</th>
// //                   </tr>
// //                 </thead>
// //                 <tbody>
// //                   {entries.map((entry) => (
// //                     <tr key={entry.id}>
// //                       <td className="task-cell">{entry.taskDescription}</td>
// //                       <td>{entry.client}</td>
// //                       <td>{entry.project || "-"}</td>
// //                       <td>{entry.date}</td>
// //                       <td>
// //                         <span className={`billing-badge ${entry.billingType === 'Billable' ? 'billable' : 'non-billable'}`}>
// //                           {entry.billingType}
// //                         </span>
// //                       </td>
// //                       <td className="duration-cell">{entry.duration || "-"}</td>
// //                       <td className="actions-cell">
// //                         <button className="icon-btn edit" onClick={() => {setEditEntry(entry); setEditErrors({});}} title="Edit">✏️</button>
// //                         <button className="icon-btn delete" onClick={() => handleDelete(entry.id, entry)} title="Delete">🗑️</button>
// //                       </td>
// //                     </tr>
// //                   ))}
// //                 </tbody>
// //               </table>
// //             </div>
// //           )}

// //           <h3><button className="action-button secondary" onClick={() => {setShowManualEntry(true); setFormErrors({});}}>
// //             + Add Manual Entry
// //           </button></h3>

// //           {showManualEntry && (
// //             <Modal title="Add Manual Entry" onClose={() => setShowManualEntry(false)}>
// //               <EntryForm
// //                 taskDetails={taskDetails}
// //                 handleChange={handleChange}
// //                 handleSubmit={handleManualEntrySubmit}
// //                 clients={clients}
// //                 projects={projects}
// //                 loadingClients={loadingClients}
// //                 error={error}
// //                 showDuration={true}
// //                 submitButtonText="Save Entry"
// //                 loading={loading}
// //                 errors={formErrors}
// //               />
// //             </Modal>
// //           )}

// //           {editEntry && (
// //             <Modal title="Edit Entry" onClose={() => setEditEntry(null)}>
// //               <form onSubmit={handleEditSubmit}>
// //                 <div className="form-grid">
// //                   <div className="form-group">
// //                     <label className="form-label">Task *</label>
// //                     <input 
// //                       className={`form-input ${editErrors.taskDescription ? 'input-error' : ''}`}
// //                       value={editEntry.taskDescription} 
// //                       onChange={(e) => {
// //                         setEditEntry({...editEntry, taskDescription: e.target.value});
// //                         if (editErrors.taskDescription) setEditErrors(prev => ({...prev, taskDescription: ''}));
// //                       }} 
// //                       placeholder="Enter task description"
// //                     />
// //                     {editErrors.taskDescription && <span className="error-text">{editErrors.taskDescription}</span>}
// //                   </div>
// //                   <div className="form-group">
// //                     <label className="form-label">Client *</label>
// //                     <input 
// //                       className={`form-input ${editErrors.client ? 'input-error' : ''}`}
// //                       value={editEntry.client} 
// //                       onChange={(e) => {
// //                         setEditEntry({...editEntry, client: e.target.value});
// //                         if (editErrors.client) setEditErrors(prev => ({...prev, client: ''}));
// //                       }} 
// //                       placeholder="Enter client name"
// //                     />
// //                     {editErrors.client && <span className="error-text">{editErrors.client}</span>}
// //                   </div>
// //                   <div className="form-group">
// //                     <label className="form-label">Project</label>
// //                     <select 
// //                       className="form-input"
// //                       value={editEntry.project || ''} 
// //                       onChange={(e) => {
// //                         setEditEntry({...editEntry, project: e.target.value});
// //                       }}
// //                     >
// //                       <option value="">Select project</option>
// //                       {projects.map((p) => (
// //                         <option key={p.id} value={p.name}>{p.name}</option>
// //                       ))}
// //                     </select>
// //                   </div>
// //                   <div className="form-group">
// //                     <label className="form-label">Date *</label>
// //                     <input 
// //                       className={`form-input ${editErrors.date ? 'input-error' : ''}`}
// //                       type="date" 
// //                       value={editEntry.date} 
// //                       onChange={(e) => {
// //                         setEditEntry({...editEntry, date: e.target.value});
// //                         if (editErrors.date) setEditErrors(prev => ({...prev, date: ''}));
// //                       }} 
// //                     />
// //                     {editErrors.date && <span className="error-text">{editErrors.date}</span>}
// //                   </div>
// //                   <div className="form-group">
// //                     <label className="form-label">Billing Type</label>
// //                     <select 
// //                       className="form-input"
// //                       value={editEntry.billingType} 
// //                       onChange={(e) => {
// //                         setEditEntry({...editEntry, billingType: e.target.value});
// //                       }}
// //                     >
// //                       <option>Billable</option>
// //                       <option>Non-Billable</option>
// //                     </select>
// //                   </div>
// //                   <div className="form-group">
// //                     <label className="form-label">Duration (HH:MM) *</label>
// //                     <input 
// //                       className={`form-input ${editErrors.duration ? 'input-error' : ''}`}
// //                       value={editEntry.duration || ''} 
// //                       onChange={(e) => {
// //                         setEditEntry({...editEntry, duration: e.target.value});
// //                         if (editErrors.duration) setEditErrors(prev => ({...prev, duration: ''}));
// //                       }} 
// //                       placeholder="e.g., 01:30"
// //                     />
// //                     {editErrors.duration && <span className="error-text">{editErrors.duration}</span>}
// //                   </div>
// //                 </div>
// //                 <button type="submit" className="action-button primary" disabled={loading}>
// //                   {loading ? 'Updating...' : 'Save Changes'}
// //                 </button>
// //               </form>
// //             </Modal>
// //           )}
// //         </div>
// //       );

// //     case "reports":
// //       const filteredReports = getFilteredReports();
// //       const groupedReports = groupReportsByDate(filteredReports);
// //       const sortedDates = Object.keys(groupedReports).sort().reverse();

// //       return (
// //         <div className="tab-content-area">
// //           <div className="filter-section">
// //             <div className="filter-group">
// //               <label className="filter-label">From Date:</label>
// //               <input
// //                 type="date"
// //                 className="form-input filter-input"
// //                 value={filterFromDate}
// //                 onChange={(e) => setFilterFromDate(e.target.value)}
// //               />
// //             </div>
// //             <div className="filter-group">
// //               <label className="filter-label">To Date:</label>
// //               <input
// //                 type="date"
// //                 className="form-input filter-input"
// //                 value={filterToDate}
// //                 onChange={(e) => setFilterToDate(e.target.value)}
// //               />
// //             </div>
// //             <div className="filter-group">
// //               <button className="action-button primary" onClick={() => { setFilterFromDate(''); setFilterToDate(''); }}>
// //                 Clear Filter
// //               </button>
// //             </div>
// //           </div>

// //           {successMessage && <div className="success-msg">{successMessage}</div>}
// //           {error && <div className="error-msg">{error}</div>}

// //           {filteredReports.length === 0 ? (
// //             <p className="content-placeholder">No reports available for selected dates.</p>
// //           ) : (
// //             <div className="report-container">
// //               {sortedDates.map(date => (
// //                 <div key={date} className="date-section">
// //                   <div className="date-header">
// //                     <h4>{new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</h4>
// //                   </div>
// //                   <div className="date-reports">
// //                     {groupedReports[date].map(r => (
// //                       <div key={r.id} className="report-card">
// //                         <div className="report-row">
// //                           <span className="report-label">Client:</span>
// //                           <span className="report-value">{r.client}</span>
// //                         </div>
// //                         <div className="report-row">
// //                           <span className="report-label">Task:</span>
// //                           <span className="report-value">{r.taskDescription}</span>
// //                         </div>
// //                         <div className="report-row">
// //                           <span className="report-label">Project:</span>
// //                           <span className="report-value">{r.project || "-"}</span>
// //                         </div>
// //                         <div className="report-row">
// //                           <span className="report-label">Duration:</span>
// //                           <span className="report-value">{r.duration || "-"}</span>
// //                         </div>
// //                         <div className="report-row">
// //                           <span className="report-label">Billing:</span>
// //                           <span className={`billing-badge ${r.billingType === 'Billable' ? 'billable' : 'non-billable'}`}>
// //                             {r.billingType}
// //                           </span>
// //                         </div>
// //                       </div>
// //                     ))}
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>
// //           )}
// //         </div>
// //       );

// //     case "timer":
// //     default:
// //       return (
// //         <div className="tab-content-area">
// //           {error && <div className="error-msg">{error}</div>}
          
// //           <div className="timer-form-wrapper">
// //             <EntryForm
// //               taskDetails={taskDetails}
// //               handleChange={handleChange}
// //               handleSubmit={onStartTimer}
// //               clients={clients}
// //               projects={projects}
// //               loadingClients={loadingClients}
// //               error={error}
// //               showDuration={false}
// //               timerLayout={true}
// //               errors={formErrors}
// //             />
// //             <button
// //               className={`timer-button ${isRunning ? 'running' : ''}`}
// //               onClick={() => isRunning ? onStopTimer() : onStartTimer(taskDetails)}
// //             >
// //               <span className="timer-icon">{isRunning ? "⏹" : "▶"}</span>
// //               <span className="timer-text">
// //                 {isRunning ? `Timer Running (${formatTime(sessionTime)})` : "Start Timer"}
// //               </span>
// //             </button>
// //           </div>
// //         </div>
// //       );
// //   }
// // };

// // const TimeTrackingDashboard = () => {
// //   const [isRunning, setIsRunning] = useState(false);
// //   const [sessionTime, setSessionTime] = useState(0);
// //   const [todayHours, setTodayHours] = useState(0);
// //   const [selectedTab, setSelectedTab] = useState('timer');
// //   const [projects] = useState([
// //     { id: 1, name: 'Taxiation' },
// //     { id: 2, name: 'Budgeting' },
// //     { id: 3, name: 'Internal Audit' },
// //   ]);

// //   useEffect(() => {
// //     let intervalId;
// //     if (isRunning) {
// //       intervalId = setInterval(() => {
// //         setSessionTime((prev) => prev + 1);
// //         setTodayHours((prev) => prev + 1);
// //       }, 1000);
// //     }
// //     return () => clearInterval(intervalId);
// //   }, [isRunning]);

// //   const handleStartTimer = (details) => {
// //     setIsRunning(true);
// //     setSessionTime(0);
// //   };

// //   const handleStopTimer = useCallback(() => {
// //     setIsRunning(false);
// //   }, []);

// //   const formatTodayHoursDisplay = formatTime(todayHours).slice(0, 5);

// //   return (
// //     <div className="dashboard-root">
// //       <style>{`
// //         :root {
// //           --primary: #003777;
// //           --secondary: #F0F0F0;
// //           --text-dark: #1a1a1a;
// //           --text-light: #666;
// //           --border: #ddd;
// //           --success: #28a745;
// //           --error: #dc2626; /* Updated darker red */
// //           --white: #ffffff;
// //         }

// //         /* ... existing styles ... */

// //         .dashboard-root {
// //           width: 100%;
// //           min-height: 100vh;
// //           background: var(--secondary);
// //           padding: 20px;
// //           display: flex;
// //           flex-direction: column;
// //         }

// //         /* --- Updated Error Validation Styles --- */

// //         .form-input.input-error {
// //           border-color: #ef4444 !important; /* Force red border */
// //           // background-color: #fef2f2;        /* Very light red bg */
// //         }

// //         .form-input.input-error:hover,
// //         .form-input.input-error:focus {
// //           border-color: #dc2626 !important;
// //           box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.2); /* Red Glow */
// //           outline: none;
// //         }

// //         .error-text {
// //           color: #ef4444;
// //           font-size: 0.8rem;
// //           font-weight: 500;
// //           margin-top: 4px;
// //           display: flex;
// //           align-items: center;
// //           gap: 4px;
// //           animation: fadeIn 0.3s ease-in-out;
// //         }

// //         @keyframes fadeIn {
// //           from { opacity: 0; transform: translateY(-3px); }
// //           to { opacity: 1; transform: translateY(0); }
// //         }

// //         /* ... Rest of your CSS ... */
        
// //         .header-box {
// //           background: linear-gradient(135deg, var(--primary), #037);
// //           border-radius: 12px;
// //           padding: 25px;
// //           margin-bottom: 25px;
// //           display: flex;
// //           align-items: center;
// //           gap: 16px;
// //           box-shadow: 0 4px 15px rgba(0, 55, 119, 0.15);
// //           color: var(--white);
// //         }

// //         .header-icon {
// //           font-size: 36px;
// //           background: rgba(255, 255, 255, 0.2);
// //           border-radius: 10px;
// //           padding: 12px 16px;
// //         }

// //         .header-content h1 {
// //           font-size: 28px;
// //           font-weight: 700;
// //           margin: 0;
// //         }

// //         .header-content p {
// //           font-size: 14px;
// //           margin-top: 4px;
// //           opacity: 0.9;
// //         }

// //         .stats-grid {
// //           display: grid;
// //           grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
// //           gap: 15px;
// //           margin-bottom: 25px;
// //         }

// //         .stat-card {
// //           background: var(--white);
// //           border: 2px solid var(--border);
// //           border-radius: 10px;
// //           padding: 20px;
// //           box-shadow: 0 2px 5px rgba(0,0,0,0.05);
// //           transition: all 0.3s ease;
// //         }

// //         .stat-card:hover {
// //           box-shadow: 0 4px 12px rgba(0,0,0,0.1);
// //           border-color: var(--primary);
// //         }

// //         .stat-card.green {
// //           border-left: 4px solid var(--success);
// //           background: #f0fdf4;
// //         }

// //         .stat-card.blue {
// //           border-left: 4px solid var(--primary);
// //           background: #f0f6ff;
// //         }

// //         .stat-label {
// //           font-size: 12px;
// //           color: var(--text-light);
// //           font-weight: 600;
// //           margin-bottom: 10px;
// //           text-transform: uppercase;
// //           letter-spacing: 0.5px;
// //         }

// //         .stat-value-row {
// //           display: flex;
// //           justify-content: space-between;
// //           align-items: center;
// //         }

// //         .stat-value {
// //           font-size: 28px;
// //           font-weight: 700;
// //           color: var(--primary);
// //         }

// //         .stat-icon {
// //           font-size: 28px;
// //         }

// //         .tab-container {
// //           background: var(--white);
// //           border-radius: 10px;
// //           overflow: hidden;
// //         }

// //         .tab-buttons {
// //           display: flex;
// //           gap: 0;
// //           border-bottom: 2px solid var(--secondary);
// //           background: var(--white);
// //           padding: 0 10px;
// //         }

// //         .tab-button {
// //           flex: 1;
// //           padding: 16px 20px;
// //           border: none;
// //           background: transparent;
// //           font-size: 14px;
// //           font-weight: 600;
// //           color: var(--text-light);
// //           cursor: pointer;
// //           transition: all 0.3s ease;
// //           border-bottom: 3px solid transparent;
// //           margin-bottom: -2px;
// //         }

// //         .tab-button:hover {
// //           color: var(--primary);
// //         }

// //         .tab-button.tab-active {
// //           color: var(--white);
// //           background: var(--primary);
// //           border-bottom-color: var(--primary);
// //           border-radius: 6px 6px 0 0;
// //         }

// //         .tab-content-area {
// //           padding: 30px;
// //           min-height: 500px;
// //         }

// //         .form-grid {
// //           display: grid;
// //           grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
// //           gap: 15px;
// //           background: var(--white);
// //           margin-bottom: 20px;
// //         }

// //         .form-grid-2 {
// //           display: grid;
// //           grid-template-columns: repeat(2, 1fr);
// //           gap: 20px;
// //           background: var(--white);
// //           margin-bottom: 20px;
          
// //         }

// //         .form-grid-3 {
// //           display: grid;
// //           grid-template-columns: repeat(3, 1fr);
// //           gap: 20px;
// //           background: var(--white);
// //           margin-bottom: 20px;
// //         }

// //         @media (max-width: 768px) {
// //           .form-grid-2 {
// //             grid-template-columns: 1fr;
// //             background: var(--white);
// //           }
// //           .form-grid-3 {
// //             grid-template-columns: 1fr;
// //             background: var(--white);
// //           }
// //         }

// //         .form-group {
// //           display: flex;
// //           flex-direction: column;
// //           background: var(--white);
// //           gap: 6px;
// //         }

// //         .form-label {
// //           font-size: 13px;
// //           font-weight: 600;
// //           color: var(--text-dark);
// //           text-transform: uppercase;
// //           letter-spacing: 0.5px;
// //         }

// //         .form-input {
// //           padding: 12px 14px;
// //           border: 2px solid var(--secondary);
// //           border-radius: 6px;
// //           font-size: 14px;
// //           height: 45px;
// //           background: var(--white);
// //           color: var(--text-dark);
// //           transition: all 0.2s;
// //           font-family: inherit;
// //         }

// //         .form-input:focus {
// //           outline: none;
// //           border-color: var(--primary);
// //           box-shadow: 0 0 0 3px rgba(0, 55, 119, 0.1);
// //           background: var(--white);
// //         }

// //         .form-input:disabled {
// //           background: var(--white);
// //           cursor: not-allowed;
// //           opacity: 0.6;
// //         }

// //         .timer-form-wrapper {
// //           background: var(--white);
// //           border-radius: 8px;
// //           padding: 25px;
// //           margin-bottom: 25px;
// //         }

// //         .action-button {
// //           padding: 12px 24px;
// //           border: none;
// //           border-radius: 6px;
// //           font-size: 14px;
// //           font-weight: 600;
// //           cursor: pointer;
// //           transition: all 0.3s;
// //         }

// //         .action-button.primary {
// //           background: var(--primary);
// //           color: var(--white);
// //           width: auto;
// //         }

// //         .action-button.primary:hover:not(:disabled) {
// //           background: #002550;
// //           box-shadow: 0 4px 12px rgba(0, 55, 119, 0.3);
// //         }

// //         .action-button.primary:disabled {
// //           opacity: 0.6;
// //           cursor: not-allowed;
// //         }

// //         .action-button.secondary {
// //           background: #6c757d;
// //           color: var(--white);
// //           margin-top: 15px;
// //         }

// //         .action-button.secondary:hover {
// //           background: #5a6268;
// //         }

// //         .timer-button {
// //           display: flex;
// //           align-items: center;
// //           justify-content: center;
// //           gap: 12px;
// //           width: 100%;
// //           padding: 18px;
// //           font-size: 16px;
// //           font-weight: 700;
// //           background: #037;
// //           color: var(--white);
// //           border: none;
// //           border-radius: 8px;
// //           cursor: pointer;
// //           transition: all 0.3s;
// //           margin-top: 20px;
// //           box-shadow: 0 4px 12px rgba(40, 167, 69, 0.2);
// //         }

// //         .timer-button:hover {
// //           background: #037;
// //           box-shadow: 0 6px 16px rgba(40, 167, 69, 0.3);
// //         }

// //         .timer-button.running {
// //           background: var(--error);
// //           box-shadow: 0 4px 12px rgba(220, 53, 69, 0.2);
// //         }

// //         .timer-button.running:hover {
// //           background: #c82333;
// //           box-shadow: 0 6px 16px rgba(220, 53, 69, 0.3);
// //         }

// //         .timer-icon {
// //           font-size: 20px;
// //         }

// //         .timer-text {
// //           flex: 1;
// //         }

// //         .table-container {
// //           overflow-x: auto;
// //           margin-bottom: 25px;
// //           border-radius: 8px;
// //           box-shadow: 0 2px 8px rgba(0,0,0,0.05);
// //         }

// //         .professional-table {
// //           width: 100%;
// //           border-collapse: collapse;
// //           background: var(--white);
// //         }

// //         .professional-table thead {
// //           background: var(--primary);
// //           color: var(--white);
// //         }

// //         .professional-table th {
// //           padding: 14px 16px;
// //           text-align: left;
// //           font-weight: 600;
// //           font-size: 13px;
// //           letter-spacing: 0.5px;
// //           text-transform: uppercase;
// //         }

// //         .professional-table td {
// //           padding: 14px 16px;
// //           border-bottom: 1px solid var(--secondary);
// //           font-size: 14px;
// //         }

// //         .professional-table tbody tr {
// //           transition: all 0.2s;
// //         }

// //         .professional-table tbody tr:hover {
// //           background: var(--secondary);
// //         }

// //         .task-cell {
// //           font-weight: 600;
// //           color: var(--primary);
// //         }

// //         .duration-cell {
// //           font-weight: 600;
// //           color: var(--primary);
// //         }

// //         .actions-cell {
// //           display: flex;
// //           gap: 10px;
// //         }

// //         .icon-btn {
// //           background: none;
// //           border: none;
// //           font-size: 16px;
// //           cursor: pointer;
// //           opacity: 0.7;
// //           transition: all 0.2s;
// //           padding: 4px 8px;
// //         }

// //         .icon-btn:hover {
// //           opacity: 1;
// //         }

// //         .icon-btn.edit:hover {
// //           color: var(--primary);
// //         }

// //         .icon-btn.delete:hover {
// //           color: var(--error);
// //         }

// //         .billing-badge {
// //           display: inline-block;
// //           padding: 4px 12px;
// //           border-radius: 20px;
// //           font-size: 12px;
// //           font-weight: 600;
// //           text-transform: uppercase;
// //           letter-spacing: 0.5px;
// //         }

// //         .billing-badge.billable {
// //           background: #d4edda;
// //           color: #155724;
// //         }

// //         .billing-badge.non-billable {
// //           background: #fff3cd;
// //           color: #856404;
// //         }

// //         .modal-overlay {
// //           position: fixed;
// //           top: 0;
// //           left: 0;
// //           right: 0;
// //           bottom: 0;
// //           background: rgba(0, 0, 0, 0.5);
// //           display: flex;
// //           justify-content: center;
// //           align-items: center;
// //           z-index: 9999;
// //         }

// //         .modal-content {
// //           background: var(--white);
// //           border-radius: 10px;
// //           width: 90%;
// //           max-width: 500px;
// //           max-height: 100vh;
// //           overflow-y: auto;
// //           box-shadow: 0 10px 40px rgba(0,0,0,0.2);
// //         }

// //         .modal-header {
// //           display: flex;
// //           justify-content: space-between;
// //           align-items: center;
// //           padding: 20px;
// //           border-bottom: 2px solid var(--secondary);
// //           background: white;
// //           color: var(--primary);
// //         }

// //         .modal-header h3 {
// //           font-size: 24px;
// //           font-weight: 700;
// //           margin: 0;
// //         }

// //         .modal-close {
// //           background: none;
// //           border: none;
// //           font-size: 24px;
// //           cursor: pointer;
// //           // height: 30px;
// //           width: 30px;
// //           color: var(--primary);
// //           transition: opacity 0.2s;
// //         }

// //         .modal-close:hover {
// //           opacity: 0.8;
// //         }

// //         .modal-body {
// //           padding: 25px;
// //         }

// //         .success-msg {
// //           background: #d4edda;
// //           border: 2px solid var(--success);
// //           color: #155724;
// //           padding: 12px 16px;
// //           border-radius: 6px;
// //           margin-bottom: 15px;
// //           font-size: 14px;
// //           font-weight: 500;
// //           animation: slideIn 0.3s ease;
// //         }

// //         .error-msg {
// //           background: #f8d7da;
// //           border: 2px solid var(--error);
// //           color: #721c24;
// //           padding: 12px 16px;
// //           border-radius: 6px;
// //           margin-bottom: 15px;
// //           font-size: 14px;
// //           font-weight: 500;
// //           animation: slideIn 0.3s ease;
// //         }

// //         @keyframes slideIn {
// //           from {
// //             transform: translateY(-10px);
// //             opacity: 0;
// //           }
// //           to {
// //             transform: translateY(0);
// //             opacity: 1;
// //           }
// //         }

// //         .content-placeholder {
// //           text-align: center;
// //           color: var(--text-light);
// //           padding: 60px 20px;
// //           font-size: 15px;
// //         }

// //         .filter-section {
// //           display: grid;
// //           grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
// //           gap: 15px;
// //           margin: 20px 0;
// //           padding: 20px;
// //           background: var(--white);
// //           border-radius: 8px;
// //         }

// //         .filter-group {
// //           display: flex;
// //           flex-direction: column;
// //           gap: 8px;
// //         }

// //         .filter-label {
// //           font-size: 13px;
// //           font-weight: 600;
// //           color: var(--text-dark);
// //           text-transform: uppercase;
// //           letter-spacing: 0.5px;
// //         }

// //         .filter-input {
// //           padding: 10px 12px;
// //           border: 2px solid var(--border);
// //           border-radius: 6px;
// //           font-size: 14px;
// //         }

// //         .report-container {
// //           background: var(--white);
// //           border-radius: 8px;
// //           padding: 20px;
// //           margin-top: 20px;
// //         }

// //         .date-section {
// //           margin-bottom: 30px;
// //           padding-bottom: 20px;
// //           border-bottom: 1px solid var(--secondary);
// //         }

// //         .date-section:last-child {
// //           border-bottom: none;
// //         }

// //         .date-header {
// //           background: var(--primary);
// //           color: var(--white);
// //           padding: 12px 16px;
// //           border-radius: 6px;
// //           margin-bottom: 15px;
// //         }

// //         .date-header h4 {
// //           margin: 0;
// //           font-size: 14px;
// //           font-weight: 600;
// //         }

// //         .date-reports {
// //           display: grid;
// //           grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
// //           gap: 15px;
// //         }

// //         .report-card {
// //           background: var(--secondary);
// //           border: 2px solid var(--border);
// //           border-radius: 8px;
// //           padding: 16px;
// //           transition: all 0.3s;
// //         }

// //         .report-card:hover {
// //           box-shadow: 0 4px 12px rgba(0, 55, 119, 0.1);
// //           border-color: var(--primary);
// //         }

// //         .report-row {
// //           display: flex;
// //           justify-content: space-between;
// //           margin-bottom: 10px;
// //           padding-bottom: 10px;
// //           border-bottom: 1px solid var(--border);
// //         }

// //         .report-row:last-child {
// //           margin-bottom: 0;
// //           padding-bottom: 0;
// //           border-bottom: none;
// //         }

// //         .report-label {
// //           font-weight: 600;
// //           color: var(--text-dark);
// //           font-size: 13px;
// //           text-transform: uppercase;
// //           letter-spacing: 0.5px;
// //         }

// //         .report-value {
// //           color: var(--primary);
// //           font-weight: 600;
// //           text-align: right;
// //           flex: 1;
// //           padding-left: 10px;
// //         }

// //         @media (max-width: 768px) {
// //           .dashboard-root {
// //             padding: 10px;
// //           }

// //           .header-box {
// //             flex-direction: column;
// //             text-align: center;
// //           }

// //           .stats-grid {
// //             grid-template-columns: 1fr 1fr;
// //           }

// //           .filter-section {
// //             grid-template-columns: 1fr;
// //           }

// //           .date-reports {
// //             grid-template-columns: 1fr;
// //           }

// //           .professional-table {
// //             font-size: 12px;
// //           }

// //           .professional-table th,
// //           .professional-table td {
// //             padding: 10px 8px;
// //           }
// //         }

// //         * {
// //           scrollbar-width: none;
// //         }

// //         *::-webkit-scrollbar {
// //           display: none;
// //         }
// //       `}</style>

// //       <div className="header-box">
// //         <div className="header-icon">⏱️</div>
// //         <div className="header-content">
// //           <h1>Time Tracking</h1>
// //           <p>Track billable hours and project time</p>
// //         </div>
// //       </div>

// //       <div className="stats-grid">
// //         <div className="stat-card green">
// //           <div className="stat-label">Today's Hours</div>
// //           <div className="stat-value-row">
// //             <span className="stat-value">{formatTodayHoursDisplay}</span>
// //             <span className="stat-icon">⏱️</span>
// //           </div>
// //         </div>
// //         <div className="stat-card blue">
// //           <div className="stat-label">Billable Hours</div>
// //           <div className="stat-value-row">
// //             <span className="stat-value">5:30</span>
// //             <span className="stat-icon">💰</span>
// //           </div>
// //         </div>
// //         <div className="stat-card">
// //           <div className="stat-label">Active Projects</div>
// //           <div className="stat-value-row">
// //             <span className="stat-value">{projects.length}</span>
// //             <span className="stat-icon">➕</span>
// //           </div>
// //         </div>
// //         <div className={`stat-card ${isRunning ? 'green' : ''}`}>
// //           <div className="stat-label">Running Timer</div>
// //           <div className="stat-value-row">
// //             <span className="stat-value">{isRunning ? 'Active' : 'Stopped'}</span>
// //             <span className="stat-icon">{isRunning ? '▶️' : '⏸️'}</span>
// //           </div>
// //         </div>
// //       </div>

// //       <div className="tab-container">
// //         <TabButtons selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
// //         <TabContent
// //           selectedTab={selectedTab}
// //           isRunning={isRunning}
// //           sessionTime={sessionTime}
// //           handleStopTimer={handleStopTimer}
// //           handleStartTimer={handleStartTimer}
// //           projects={projects}
// //         />
// //       </div>
// //     </div>
// //   );
// // };

// // export default TimeTrackingDashboard;




// import React, { useState, useEffect, useCallback } from 'react';

// const formatTime = (totalSeconds) => {
//   if (totalSeconds < 0 || isNaN(totalSeconds)) return '00:00:00';
//   const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
//   const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
//   const seconds = String(totalSeconds % 60).padStart(2, '0');
//   return `${hours}:${minutes}:${seconds}`;
// };

// const convertHoursToHHMM = (hours) => {
//   if (!hours) return '';
//   const h = Math.floor(hours);
//   const m = Math.round((hours - h) * 60);
//   return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
// };

// const TabButtons = ({ selectedTab, setSelectedTab }) => {
//   const tabs = [
//     { id: 'timer', label: 'Start Timer' },
//     { id: 'entries', label: 'Time Entries' },
//     { id: 'reports', label: 'Time Reports' }
//   ];

//   return (
//     <div className="tab-buttons">
//       {tabs.map(tab => (
//         <button
//           key={tab.id}
//           className={`tab-button ${selectedTab === tab.id ? 'tab-active' : ''}`}
//           onClick={() => setSelectedTab(tab.id)}
//         >
//           {tab.label}
//         </button>
//       ))}
//     </div>
//   );
// };

// const Modal = ({ title, children, onClose }) => (
//   <div className="modal-overlay">
//     <div className="modal-content">
//       <div className="modal-header">
//         <h3>{title}</h3>
//         <button className="modal-close" onClick={onClose}>✕</button>
//       </div>
//       <div className="modal-body">{children}</div>
//     </div>
//   </div>
// );

// const EntryForm = ({ taskDetails, handleChange, handleSubmit, clients, projects, loadingClients, error, showDuration, submitButtonText, loading, timerLayout, tasks = [], errors = {} }) => (
//   <form onSubmit={handleSubmit}>
//     {timerLayout ? (
//       <div>
//         <div className="form-grid-2">
//           <div className="form-group">
//             <label className="form-label" htmlFor="task">Task Description</label>
//             <select
//               className={`form-input ${errors.task ? 'input-error' : ''}`}
//               id="task"
//               value={taskDetails.task}
//               onChange={handleChange}
//             >
//               <option value="">Select a task</option>
//               {tasks.map((t) => (
//                 <option key={t.id} value={t.taskName}>
//                   {t.taskName} ({convertHoursToHHMM(t.estimatedHours)})
//                 </option>
//               ))}
//             </select>
//             {errors.task && <span className="error-text">{errors.task}</span>}
//           </div>

//           <div className="form-group">
//             <label className="form-label" htmlFor="client">Client</label>
//             <select
//               className={`form-input ${errors.client ? 'input-error' : ''}`}
//               id="client"
//               value={taskDetails.client}
//               onChange={handleChange}
//               disabled={loadingClients}
//             >
//               <option value="">{loadingClients ? "Loading..." : "Select client"}</option>
//               {!loadingClients && !error && clients.map((c) => (
//                 <option key={c.id} value={c.clientName}>{c.clientName}</option>
//               ))}
//             </select>
//             {errors.client && <span className="error-text">{errors.client}</span>}
//           </div>
//         </div>

//         <div className="form-grid-3">
//           <div className="form-group">
//             <label className="form-label" htmlFor="project">Project</label>
//             <select className="form-input" id="project" value={taskDetails.project} onChange={handleChange}>
//               <option value="">Select project</option>
//               {projects.map((p) => (
//                 <option key={p.id} value={p.name}>{p.name}</option>
//               ))}
//             </select>
//           </div>

//           <div className="form-group">
//             <label className="form-label" htmlFor="date">Date</label>
//             <input
//               className={`form-input ${errors.date ? 'input-error' : ''}`}
//               type="date"
//               id="date"
//               value={taskDetails.date}
//               onChange={handleChange}
//             />
//             {errors.date && <span className="error-text">{errors.date}</span>}
//           </div>

//           <div className="form-group">
//             <label className="form-label" htmlFor="billing">Billing Type</label>
//             <select className="form-input" id="billing" value={taskDetails.billing} onChange={handleChange}>
//               <option>Billable</option>
//               <option>Non-Billable</option>
//             </select>
//           </div>
//         </div>
//       </div>
//     ) : (
//       <div className="form-grid">
//         <div className="form-group">
//           <label className="form-label" htmlFor="task">Task Description *</label>
//           <select
//             className={`form-input ${errors.task ? 'input-error' : ''}`}
//             id="task"
//             value={taskDetails.task}
//             onChange={handleChange}
//           >
//             <option value="">Select a task</option>
//             {tasks.map((t) => (
//               <option key={t.id} value={t.taskName}>
//                 {t.taskName} ({convertHoursToHHMM(t.estimatedHours)})
//               </option>
//             ))}
//           </select>
//           {errors.task && <span className="error-text">{errors.task}</span>}
//         </div>

//         <div className="form-group">
//           <label className="form-label" htmlFor="client">Client *</label>
//           <select
//             className={`form-input ${errors.client ? 'input-error' : ''}`}
//             id="client"
//             value={taskDetails.client}
//             onChange={handleChange}
//             disabled={loadingClients}
//           >
//             <option value="">Select client</option>
//             {!loadingClients && !error && clients.map((c) => (
//               <option key={c.id} value={c.clientName}>{c.clientName}</option>
//             ))}
//           </select>
//           {errors.client && <span className="error-text">{errors.client}</span>}
//         </div>

//         <div className="form-group">
//           <label className="form-label" htmlFor="project">Project</label>
//           <select className="form-input" id="project" value={taskDetails.project} onChange={handleChange}>
//             <option value="">Select project</option>
//             {projects.map((p) => (
//               <option key={p.id} value={p.name}>{p.name}</option>
//             ))}
//           </select>
//         </div>

//         <div className="form-group">
//           <label className="form-label" htmlFor="date">Date *</label>
//           <input
//             className={`form-input ${errors.date ? 'input-error' : ''}`}
//             type="date"
//             id="date"
//             value={taskDetails.date}
//             onChange={handleChange}
//           />
//           {errors.date && <span className="error-text">{errors.date}</span>}
//         </div>

//         <div className="form-group">
//           <label className="form-label" htmlFor="billing">Billing Type</label>
//           <select className="form-input" id="billing" value={taskDetails.billing} onChange={handleChange}>
//             <option>Billable</option>
//             <option>Non-Billable</option>
//           </select>
//         </div>

//         {showDuration && (
//           <div className="form-group">
//             <label className="form-label" htmlFor="duration">Duration (HH:MM) *</label>
//             <input
//               type="text"
//               id="duration"
//               className={`form-input ${errors.duration ? 'input-error' : ''}`}
//               placeholder="e.g., 01:30"
//               value={taskDetails.duration}
//               onChange={handleChange}
//             />
//             {errors.duration && <span className="error-text">{errors.duration}</span>}
//           </div>
//         )}
//       </div>
//     )}
    
//     {submitButtonText && (
//       <button type="submit" className="action-button primary" disabled={loading}>
//         {loading ? 'Processing...' : submitButtonText}
//       </button>
//     )}
//   </form>
// );

// const TabContent = ({ selectedTab, isRunning, sessionTime, handleStopTimer, handleStartTimer, projects, tasks = [], entries: parentEntries = [] }) => {
//   const API_BASE = "https://posthemorrhagic-nonequilaterally-caroline.ngrok-free.dev/api";
  
//   const [taskDetails, setTaskDetails] = useState({
//     task: "",
//     client: "",
//     project: "",
//     billing: "Billable",
//     date: new Date().toISOString().slice(0, 10),
//     duration: "",
//     estimatedSeconds: 0,
//   });

//   const [clients, setClients] = useState([]);
//   const [loadingClients, setLoadingClients] = useState(false);
//   const [error, setError] = useState(null);
//   const [entries, setEntries] = useState([]);
//   const [showManualEntry, setShowManualEntry] = useState(false);
//   const [editEntry, setEditEntry] = useState(null);
//   const [reports, setReports] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [successMessage, setSuccessMessage] = useState('');
//   const [filterFromDate, setFilterFromDate] = useState('');
//   const [filterToDate, setFilterToDate] = useState('');
//   const [formErrors, setFormErrors] = useState({});
//   const [editErrors, setEditErrors] = useState({});

//   useEffect(() => {
//     const fetchClients = async () => {
//       setLoadingClients(true);
//       try {
//         const response = await fetch(`${API_BASE}/clients/all`, {
//           method: "GET",
//           headers: {
//             Accept: "application/json",
//             "ngrok-skip-browser-warning": "true",
//           },
//         });
//         if (!response.ok) throw new Error("Failed to fetch clients");
//         const data = await response.json();
//         const sortedClients = data
//           .filter((c) => c.status === "Active")
//           .sort((a, b) => a.clientName.localeCompare(b.clientName));
//         setClients(sortedClients);
//       } catch (err) {
//         console.error("Client Fetch Error:", err);
//         setError("Failed to load clients");
//       } finally {
//         setLoadingClients(false);
//       }
//     };
//     fetchClients();
//   }, []);

//   useEffect(() => {
//     const fetchEntries = async () => {
//       try {
//         const response = await fetch(`${API_BASE}/time-tracker`, {
//           headers: { "ngrok-skip-browser-warning": "true" },
//         });
//         if (response.ok) {
//           const data = await response.json();
//           setEntries(data);
//           setReports(data);
//         }
//       } catch (err) {
//         console.error("Error fetching entries:", err);
//       }
//     };
//     if (selectedTab === 'entries' || selectedTab === 'reports') {
//       fetchEntries();
//     }
//   }, [selectedTab]);

//   const validateDurationFormat = (duration) => {
//     if (!duration) return '';
//     const regex = /^([0-9]{1,2}):([0-5][0-9])$/;
//     if (!regex.test(duration)) {
//       return 'Format must be HH:MM (e.g. 01:30)';
//     }
//     return '';
//   };

//   const validateManualForm = (details) => {
//     const errs = {};
//     if (!details.task || details.task.trim() === '') errs.task = 'Task description is required';
//     if (!details.client || details.client.trim() === '') errs.client = 'Client is required';
//     if (!details.date) errs.date = 'Date is required';
//     if (!details.duration || details.duration.trim() === '') {
//        errs.duration = 'Duration is required';
//     } else {
//        const durError = validateDurationFormat(details.duration);
//        if (durError) errs.duration = durError;
//     }
//     return errs;
//   };

//   const validateTimerStart = (details) => {
//     const errs = {};
//     if (!details.task || details.task.trim() === '') errs.task = 'Task description is required';
//     if (!details.client || details.client.trim() === '') errs.client = 'Client is required';
//     return errs;
//   };

//   const handleChange = (e) => {
//     const { id, value } = e.target;
//     setTaskDetails(prev => ({ ...prev, [id]: value }));
    
//     if (id === 'task' && value) {
//       const selectedTask = tasks.find(t => t.taskName === value);
//       if (selectedTask) {
//         setTaskDetails(prev => ({ 
//           ...prev, 
//           duration: convertHoursToHHMM(selectedTask.estimatedHours),
//           estimatedSeconds: Math.round(selectedTask.estimatedHours * 3600)
//         }));
//       }
//     }
    
//     if (formErrors[id]) {
//       setFormErrors(prev => ({ ...prev, [id]: '' }));
//     }
//   };

//   const showSuccessMsg = (msg) => {
//     setSuccessMessage(msg);
//     setTimeout(() => setSuccessMessage(''), 3000);
//   };

//   const showErrorMsg = (msg) => {
//     setError(msg);
//     setTimeout(() => setError(null), 3000);
//   };

//   const onStartTimer = (details) => {
//     const errs = validateTimerStart(details);
//     if (Object.keys(errs).length > 0) {
//       setFormErrors(errs);
//       return;
//     }
//     handleStartTimer(details);
//     showSuccessMsg('Timer started');
//   };

//   const onStopTimer = async () => {
//     handleStopTimer();
//     try {
//       const duration = formatTime(sessionTime).slice(0, 5);
//       const payload = {
//         taskDescription: taskDetails.task,
//         client: taskDetails.client,
//         project: taskDetails.project || null,
//         date: taskDetails.date,
//         billingType: taskDetails.billing,
//         duration: duration,
//       };

//       const response = await fetch(`${API_BASE}/time-tracker`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "ngrok-skip-browser-warning": "true",
//         },
//         body: JSON.stringify(payload),
//       });

//       if (response.ok) {
//         const newEntry = await response.json();
//         setEntries(prev => [newEntry, ...prev]);
//         setReports(prev => [newEntry, ...prev]);
//         setTaskDetails({
//           task: "",
//           client: "",
//           project: "",
//           billing: "Billable",
//           date: new Date().toISOString().slice(0, 10),
//           duration: "",
//         });
//         setFormErrors({});
//         showSuccessMsg('Timer entry saved');
//       } else {
//         const errorData = await response.json();
//         showErrorMsg(errorData.message || "Failed to save entry");
//       }
//     } catch (err) {
//       console.error("Error saving entry:", err);
//       showErrorMsg("Failed to save timer entry");
//     }
//   };

//   const handleManualEntrySubmit = async (e) => {
//     e.preventDefault();
//     const errs = validateManualForm(taskDetails);
    
//     if (Object.keys(errs).length > 0) {
//       setFormErrors(errs);
//       return;
//     }
    
//     setLoading(true);
//     try {
//       const payload = {
//         taskDescription: taskDetails.task,
//         client: taskDetails.client,
//         project: taskDetails.project || null,
//         date: taskDetails.date,
//         billingType: taskDetails.billing,
//         duration: taskDetails.duration || null,
//       };

//       const response = await fetch(`${API_BASE}/time-tracker`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "ngrok-skip-browser-warning": "true",
//         },
//         body: JSON.stringify(payload),
//       });

//       if (response.ok) {
//         const newEntry = await response.json();
//         setEntries(prev => [newEntry, ...prev]);
//         setReports(prev => [newEntry, ...prev]);
//         setShowManualEntry(false);
//         setTaskDetails({
//           task: "",
//           client: "",
//           project: "",
//           billing: "Billable",
//           date: new Date().toISOString().slice(0, 10),
//           duration: "",
//         });
//         setFormErrors({});
//         showSuccessMsg('Manual entry added');
//       } else {
//         const errorData = await response.json();
//         showErrorMsg(errorData.message || "Failed to add entry");
//       }
//     } catch (err) {
//       console.error("Error adding manual entry:", err);
//       showErrorMsg("Failed to add manual entry");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id, entry) => {
//     try {
//       const response = await fetch(`${API_BASE}/time-tracker`, {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//           "ngrok-skip-browser-warning": "true",
//         },
//         body: JSON.stringify({
//           taskDescription: entry.taskDescription,
//           client: entry.client,
//           project: entry.project || null,
//         }),
//       });

//       if (response.ok) {
//         setEntries(prev => prev.filter(e => e.id !== id));
//         setReports(prev => prev.filter(r => r.id !== id));
//         showSuccessMsg('Entry deleted');
//       } else {
//         const errorData = await response.json();
//         showErrorMsg(errorData.message || "Failed to delete entry");
//       }
//     } catch (err) {
//       console.error("Error deleting entry:", err);
//       showErrorMsg("Failed to delete entry");
//     }
//   };

//   const handleEditSubmit = async (e) => {
//     e.preventDefault();
    
//     const errs = {};
//     if (!editEntry.taskDescription || editEntry.taskDescription.trim() === '') {
//       errs.taskDescription = 'Task description is required';
//     }
//     if (!editEntry.client || editEntry.client.trim() === '') {
//       errs.client = 'Client is required';
//     }
//     if (!editEntry.date) {
//       errs.date = 'Date is required';
//     }
//     if (!editEntry.duration || editEntry.duration.trim() === '') {
//         errs.duration = 'Duration is required';
//     } else {
//         const durErr = validateDurationFormat(editEntry.duration);
//         if (durErr) errs.duration = durErr;
//     }

//     if (Object.keys(errs).length > 0) {
//       setEditErrors(errs);
//       return;
//     }

//     setLoading(true);
//     try {
//       const payload = {
//         taskDescription: editEntry.taskDescription,
//         client: editEntry.client,
//         project: editEntry.project || null,
//         date: editEntry.date,
//         billingType: editEntry.billingType,
//         duration: editEntry.duration || null,
//       };

//       const response = await fetch(`${API_BASE}/time-tracker`, {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//           "ngrok-skip-browser-warning": "true",
//         },
//         body: JSON.stringify(payload),
//       });

//       if (response.ok) {
//         const updatedEntry = await response.json();
//         setEntries(prev => prev.map(e => e.id === updatedEntry.id ? updatedEntry : e));
//         setReports(prev => prev.map(r => r.id === updatedEntry.id ? updatedEntry : r));
//         setEditEntry(null);
//         setEditErrors({});
//         showSuccessMsg('Entry updated');
//       } else {
//         const errorData = await response.json();
//         showErrorMsg(errorData.message || "Failed to update entry");
//       }
//     } catch (err) {
//       console.error("Error updating entry:", err);
//       showErrorMsg("Failed to update entry");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getFilteredReports = () => {
//     return reports.filter(r => {
//       const reportDate = new Date(r.date);
//       const from = filterFromDate ? new Date(filterFromDate) : null;
//       const to = filterToDate ? new Date(filterToDate) : null;

//       if (from && reportDate < from) return false;
//       if (to && reportDate > to) return false;
//       return true;
//     });
//   };

//   // Calculate total billable hours
//   const calculateBillableHours = () => {
//     let totalSeconds = 0;
//     entries.forEach(entry => {
//       if (entry.billingType === 'Billable' && entry.duration) {
//         const [h, m] = entry.duration.split(':').map(Number);
//         totalSeconds += (h * 3600) + (m * 60);
//       }
//     });
//     return formatTime(totalSeconds).slice(0, 5);
//   };

//   const groupReportsByDate = (filteredReports) => {
//     const grouped = {};
//     filteredReports.forEach(report => {
//       const date = report.date;
//       if (!grouped[date]) {
//         grouped[date] = [];
//       }
//       grouped[date].push(report);
//     });
//     return grouped;
//   };

//   switch (selectedTab) {
//     case "entries":
//       return (
//         <div className="tab-content-area">
//           {successMessage && <div className="success-msg">{successMessage}</div>}
//           {error && <div className="error-msg">{error}</div>}
          
//           {entries.length === 0 ? (
//             <p className="content-placeholder">No entries found yet.</p>
//           ) : (
//             <div className="table-container">
//               <table className="professional-table">
//                 <thead>
//                   <tr>
//                     <th>Task</th>
//                     <th>Client</th>
//                     <th>Project</th>
//                     <th>Date</th>
//                     <th>Billing</th>
//                     <th>Duration</th>
//                     <th>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {entries.map((entry) => (
//                     <tr key={entry.id}>
//                       <td className="task-cell">{entry.taskDescription}</td>
//                       <td>{entry.client}</td>
//                       <td>{entry.project || "-"}</td>
//                       <td>{entry.date}</td>
//                       <td>
//                         <span className={`billing-badge ${entry.billingType === 'Billable' ? 'billable' : 'non-billable'}`}>
//                           {entry.billingType}
//                         </span>
//                       </td>
//                       <td className="duration-cell">{entry.duration || "-"}</td>
//                       <td className="actions-cell">
//                         <button className="icon-btn edit" onClick={() => {setEditEntry(entry); setEditErrors({});}} title="Edit">✏️</button>
//                         <button className="icon-btn delete" onClick={() => handleDelete(entry.id, entry)} title="Delete">🗑️</button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}

//           <h3><button className="action-button secondary" onClick={() => {setShowManualEntry(true); setFormErrors({});}}>
//             + Add Manual Entry
//           </button></h3>

//           {showManualEntry && (
//             <Modal title="Add Manual Entry" onClose={() => setShowManualEntry(false)}>
//               <EntryForm
//                 taskDetails={taskDetails}
//                 handleChange={handleChange}
//                 handleSubmit={handleManualEntrySubmit}
//                 clients={clients}
//                 projects={projects}
//                 loadingClients={loadingClients}
//                 error={error}
//                 showDuration={true}
//                 submitButtonText="Save Entry"
//                 loading={loading}
//                 tasks={tasks}
//                 errors={formErrors}
//               />
//             </Modal>
//           )}

//           {editEntry && (
//             <Modal title="Edit Entry" onClose={() => setEditEntry(null)}>
//               <form onSubmit={handleEditSubmit}>
//                 <div className="form-grid">
//                   <div className="form-group">
//                     <label className="form-label">Task *</label>
//                     <input 
//                       className={`form-input ${editErrors.taskDescription ? 'input-error' : ''}`}
//                       value={editEntry.taskDescription} 
//                       onChange={(e) => {
//                         setEditEntry({...editEntry, taskDescription: e.target.value});
//                         if (editErrors.taskDescription) setEditErrors(prev => ({...prev, taskDescription: ''}));
//                       }} 
//                       placeholder="Enter task description"
//                     />
//                     {editErrors.taskDescription && <span className="error-text">{editErrors.taskDescription}</span>}
//                   </div>
//                   <div className="form-group">
//                     <label className="form-label">Client *</label>
//                     <input 
//                       className={`form-input ${editErrors.client ? 'input-error' : ''}`}
//                       value={editEntry.client} 
//                       onChange={(e) => {
//                         setEditEntry({...editEntry, client: e.target.value});
//                         if (editErrors.client) setEditErrors(prev => ({...prev, client: ''}));
//                       }} 
//                       placeholder="Enter client name"
//                     />
//                     {editErrors.client && <span className="error-text">{editErrors.client}</span>}
//                   </div>
//                   <div className="form-group">
//                     <label className="form-label">Project</label>
//                     <select 
//                       className="form-input"
//                       value={editEntry.project || ''} 
//                       onChange={(e) => {
//                         setEditEntry({...editEntry, project: e.target.value});
//                       }}
//                     >
//                       <option value="">Select project</option>
//                       {projects.map((p) => (
//                         <option key={p.id} value={p.name}>{p.name}</option>
//                       ))}
//                     </select>
//                   </div>
//                   <div className="form-group">
//                     <label className="form-label">Date *</label>
//                     <input 
//                       className={`form-input ${editErrors.date ? 'input-error' : ''}`}
//                       type="date" 
//                       value={editEntry.date} 
//                       onChange={(e) => {
//                         setEditEntry({...editEntry, date: e.target.value});
//                         if (editErrors.date) setEditErrors(prev => ({...prev, date: ''}));
//                       }} 
//                     />
//                     {editErrors.date && <span className="error-text">{editErrors.date}</span>}
//                   </div>
//                   <div className="form-group">
//                     <label className="form-label">Billing Type</label>
//                     <select 
//                       className="form-input"
//                       value={editEntry.billingType} 
//                       onChange={(e) => {
//                         setEditEntry({...editEntry, billingType: e.target.value});
//                       }}
//                     >
//                       <option>Billable</option>
//                       <option>Non-Billable</option>
//                     </select>
//                   </div>
//                   <div className="form-group">
//                     <label className="form-label">Duration (HH:MM) *</label>
//                     <input 
//                       className={`form-input ${editErrors.duration ? 'input-error' : ''}`}
//                       value={editEntry.duration || ''} 
//                       onChange={(e) => {
//                         setEditEntry({...editEntry, duration: e.target.value});
//                         if (editErrors.duration) setEditErrors(prev => ({...prev, duration: ''}));
//                       }} 
//                       placeholder="e.g., 01:30"
//                     />
//                     {editErrors.duration && <span className="error-text">{editErrors.duration}</span>}
//                   </div>
//                 </div>
//                 <button type="submit" className="action-button primary" disabled={loading}>
//                   {loading ? 'Updating...' : 'Save Changes'}
//                 </button>
//               </form>
//             </Modal>
//           )}
//         </div>
//       );

//     case "reports":
//       const filteredReports = getFilteredReports();
//       const groupedReports = groupReportsByDate(filteredReports);
//       const sortedDates = Object.keys(groupedReports).sort().reverse();

//       return (
//         <div className="tab-content-area">
//           <div className="filter-section">
//             <div className="filter-group">
//               <label className="filter-label">From Date:</label>
//               <input
//                 type="date"
//                 className="form-input filter-input"
//                 value={filterFromDate}
//                 onChange={(e) => setFilterFromDate(e.target.value)}
//               />
//             </div>
//             <div className="filter-group">
//               <label className="filter-label">To Date:</label>
//               <input
//                 type="date"
//                 className="form-input filter-input"
//                 value={filterToDate}
//                 onChange={(e) => setFilterToDate(e.target.value)}
//               />
//             </div>
//             <div className="filter-group">
//               <button className="action-button primary" onClick={() => { setFilterFromDate(''); setFilterToDate(''); }}>
//                 Clear Filter
//               </button>
//             </div>
//           </div>

//           {successMessage && <div className="success-msg">{successMessage}</div>}
//           {error && <div className="error-msg">{error}</div>}

//           {filteredReports.length === 0 ? (
//             <p className="content-placeholder">No reports available.</p>
//           ) : (
//             <div className="report-container">
//               {sortedDates.map(date => (
//                 <div key={date} className="date-section">
//                   <div className="date-header">
//                     <h4>{new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</h4>
//                   </div>
//                   <div className="date-reports">
//                     {groupedReports[date].map(r => (
//                       <div key={r.id} className="report-card">
//                         <div className="report-row">
//                           <span className="report-label">Client:</span>
//                           <span className="report-value">{r.client}</span>
//                         </div>
//                         <div className="report-row">
//                           <span className="report-label">Task:</span>
//                           <span className="report-value">{r.taskDescription}</span>
//                         </div>
//                         <div className="report-row">
//                           <span className="report-label">Project:</span>
//                           <span className="report-value">{r.project || "-"}</span>
//                         </div>
//                         <div className="report-row">
//                           <span className="report-label">Duration:</span>
//                           <span className="report-value">{r.duration || "-"}</span>
//                         </div>
//                         <div className="report-row">
//                           <span className="report-label">Billing:</span>
//                           <span className={`billing-badge ${r.billingType === 'Billable' ? 'billable' : 'non-billable'}`}>
//                             {r.billingType}
//                           </span>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       );

//     case "timer":
//     default:
//       return (
//         <div className="tab-content-area">
//           {error && <div className="error-msg">{error}</div>}
          
//           <div className="timer-form-wrapper">
//             <EntryForm
//               taskDetails={taskDetails}
//               handleChange={handleChange}
//               handleSubmit={onStartTimer}
//               clients={clients}
//               projects={projects}
//               loadingClients={loadingClients}
//               error={error}
//               showDuration={false}
//               timerLayout={true}
//               tasks={tasks}
//               errors={formErrors}
//             />
//             <button
//               className={`timer-button ${isRunning ? 'running' : ''}`}
//               onClick={() => {
//                 if (isRunning) {
//                   console.log('Stopping timer...');
//                   onStopTimer();
//                 } else {
//                   console.log('Starting timer with details:', taskDetails);
//                   onStartTimer(taskDetails);
//                 }
//               }}
//             >
//               <span className="timer-icon">{isRunning ? "⏹" : "▶"}</span>
//               <span className="timer-text">
//                 {isRunning ? `Timer Running (${formatTime(sessionTime)})` : "Start Timer"}
//               </span>
//             </button>
//           </div>
//         </div>
//       );
//   }
// };

// const TimeTrackingDashboard = () => {
//   const [isRunning, setIsRunning] = useState(false);
//   const [sessionTime, setSessionTime] = useState(0);
//   const [todayHours, setTodayHours] = useState(0);
//   const [selectedTab, setSelectedTab] = useState('timer');
//   const [tasks, setTasks] = useState([]);
//   const [loadingTasks, setLoadingTasks] = useState(true);
//   const [estimatedSeconds, setEstimatedSeconds] = useState(0);
//   const [entries, setEntries] = useState([]);
//   const [projects] = useState([
//     { id: 1, name: 'Taxiation' },
//     { id: 2, name: 'Budgeting' },
//     { id: 3, name: 'Internal Audit' },
//   ]);

//   const API_BASE = "https://posthemorrhagic-nonequilaterally-caroline.ngrok-free.dev/api";

//   useEffect(() => {
//     const fetchTasks = async () => {
//       try {
//         const response = await fetch(`${API_BASE}/tasks`, {
//           headers: { "ngrok-skip-browser-warning": "true" },
//         });
//         if (response.ok) {
//           const data = await response.json();
//           setTasks(data);
//         }
//       } catch (err) {
//         console.error("Error fetching tasks:", err);
//       } finally {
//         setLoadingTasks(false);
//       }
//     };
//     fetchTasks();
//   }, []);

//   useEffect(() => {
//     const fetchEntries = async () => {
//       try {
//         const response = await fetch(`${API_BASE}/time-tracker`, {
//           headers: { "ngrok-skip-browser-warning": "true" },
//         });
//         if (response.ok) {
//           const data = await response.json();
//           setEntries(data);
//         }
//       } catch (err) {
//         console.error("Error fetching entries:", err);
//       }
//     };
//     fetchEntries();
//   }, []);

//   useEffect(() => {
//     let intervalId;
//     if (isRunning) {
//       intervalId = setInterval(() => {
//         setSessionTime((prev) => {
//           const newTime = prev + 1;
//           // Auto-stop if estimated time is reached
//           if (estimatedSeconds > 0 && newTime >= estimatedSeconds) {
//             setIsRunning(false);
//             return newTime;
//           }
//           return newTime;
//         });
//         setTodayHours((prev) => prev + 1);
//       }, 1000);
//     }
//     return () => clearInterval(intervalId);
//   }, [isRunning, estimatedSeconds]);

//   const handleStartTimer = (details) => {
//     setIsRunning(true);
//     setSessionTime(0);
//     // Set estimated time limit if task has estimated hours
//     if (details.estimatedSeconds && details.estimatedSeconds > 0) {
//       setEstimatedSeconds(details.estimatedSeconds);
//     } else {
//       setEstimatedSeconds(0);
//     }
//   };

//   const handleStopTimer = useCallback(() => {
//     setIsRunning(false);
//   }, []);

//   const formatTodayHoursDisplay = formatTime(todayHours).slice(0, 5);

//   // Calculate billable hours from entries
//   const calculateBillableHours = () => {
//     let totalSeconds = 0;
//     entries.forEach(entry => {
//       if (entry.billingType === 'Billable' && entry.duration) {
//         const [h, m] = entry.duration.split(':').map(Number);
//         totalSeconds += (h * 3600) + (m * 60);
//       }
//     });
//     return formatTime(totalSeconds).slice(0, 5);
//   };

//   const billableHoursDisplay = calculateBillableHours();

//   // Calculate billable hours for TODAY only
//   const calculateTodayBillableHours = () => {
//     const today = new Date().toISOString().slice(0, 10);
//     let totalSeconds = 0;
//     entries.forEach(entry => {
//       if (entry.billingType === 'Billable' && entry.duration && entry.date === today) {
//         const [h, m] = entry.duration.split(':').map(Number);
//         totalSeconds += (h * 3600) + (m * 60);
//       }
//     });
//     return formatTime(totalSeconds).slice(0, 5);
//   };

//   const todayBillableHoursDisplay = calculateTodayBillableHours();

//   return (
//     <div className="dashboard-root">
//       <style>{`
//         :root {
//           --primary: #003777;
//           --secondary: #F0F0F0;
//           --text-dark: #1a1a1a;
//           --text-light: #666;
//           --border: #ddd;
//           --success: #28a745;
//           --error: #dc2626;
//           --white: #ffffff;
//         }

//         .dashboard-root {
//           width: 100%;
//           min-height: 100vh;
//           background: var(--secondary);
//           padding: 20px;
//           display: flex;
//           flex-direction: column;
//         }

//         .form-input.input-error {
//           border-color: #ef4444 !important;
//         }

//         .form-input.input-error:hover,
//         .form-input.input-error:focus {
//           border-color: #dc2626 !important;
//           box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.2);
//           outline: none;
//         }

//         .error-text {
//           color: #ef4444;
//           font-size: 0.8rem;
//           font-weight: 500;
//           margin-top: 4px;
//           display: flex;
//           align-items: center;
//           gap: 4px;
//           animation: fadeIn 0.3s ease-in-out;
//         }

//         @keyframes fadeIn {
//           from { opacity: 0; transform: translateY(-3px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
        
//         .header-box {
//           background: linear-gradient(135deg, var(--primary), #037);
//           border-radius: 12px;
//           padding: 25px;
//           margin-bottom: 25px;
//           display: flex;
//           align-items: center;
//           gap: 16px;
//           box-shadow: 0 4px 15px rgba(0, 55, 119, 0.15);
//           color: var(--white);
//         }

//         .header-icon {
//           font-size: 36px;
//           background: rgba(255, 255, 255, 0.2);
//           border-radius: 10px;
//           padding: 12px 16px;
//         }

//         .header-content h1 {
//           font-size: 28px;
//           font-weight: 700;
//           margin: 0;
//         }

//         .header-content p {
//           font-size: 14px;
//           margin-top: 4px;
//           opacity: 0.9;
//         }

//         .stats-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
//           gap: 15px;
//           margin-bottom: 25px;
//         }

//         .stat-card {
//           background: var(--white);
//           border: 2px solid var(--border);
//           border-radius: 10px;
//           padding: 20px;
//           box-shadow: 0 2px 5px rgba(0,0,0,0.05);
//           transition: all 0.3s ease;
//         }

//         .stat-card:hover {
//           box-shadow: 0 4px 12px rgba(0,0,0,0.1);
//           border-color: var(--primary);
//         }

//         .stat-card.green {
//           border-left: 4px solid var(--success);
//           background: #f0fdf4;
//         }

//         .stat-card.blue {
//           border-left: 4px solid var(--primary);
//           background: #f0f6ff;
//         }

//         .stat-label {
//           font-size: 12px;
//           color: var(--text-light);
//           font-weight: 600;
//           margin-bottom: 10px;
//           text-transform: uppercase;
//           letter-spacing: 0.5px;
//         }

//         .stat-value-row {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//         }

//         .stat-value {
//           font-size: 28px;
//           font-weight: 700;
//           color: var(--primary);
//         }

//         .stat-icon {
//           font-size: 28px;
//         }

//         .tab-container {
//           background: var(--white);
//           border-radius: 10px;
//           overflow: hidden;
//         }

//         .tab-buttons {
//           display: flex;
//           gap: 0;
//           border-bottom: 2px solid var(--secondary);
//           background: var(--white);
//           padding: 0 10px;
//         }

//         .tab-button {
//           flex: 1;
//           padding: 16px 20px;
//           border: none;
//           background: transparent;
//           font-size: 14px;
//           font-weight: 600;
//           color: var(--text-light);
//           cursor: pointer;
//           transition: all 0.3s ease;
//           border-bottom: 3px solid transparent;
//           margin-bottom: -2px;
//         }

//         .tab-button:hover {
//           color: var(--primary);
//         }

//         .tab-button.tab-active {
//           color: var(--white);
//           background: var(--primary);
//           border-bottom-color: var(--primary);
//           border-radius: 6px 6px 0 0;
//         }

//         .tab-content-area {
//           padding: 30px;
//           min-height: 500px;
//         }

//         .form-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
//           gap: 15px;
//           background: var(--white);
//           margin-bottom: 20px;
//         }

//         .form-grid-2 {
//           display: grid;
//           grid-template-columns: repeat(2, 1fr);
//           gap: 20px;
//           background: var(--white);
//           margin-bottom: 20px;
//         }

//         .form-grid-3 {
//           display: grid;
//           grid-template-columns: repeat(3, 1fr);
//           gap: 20px;
//           background: var(--white);
//           margin-bottom: 20px;
//         }

//         @media (max-width: 768px) {
//           .form-grid-2 {
//             grid-template-columns: 1fr;
//           }
//           .form-grid-3 {
//             grid-template-columns: 1fr;
//           }
//         }

//         .form-group {
//           display: flex;
//           flex-direction: column;
//           gap: 6px;
//         }

//         .form-label {
//           font-size: 13px;
//           font-weight: 600;
//           color: var(--text-dark);
//           text-transform: uppercase;
//           letter-spacing: 0.5px;
//         }

//         .form-input {
//           padding: 12px 14px;
//           border: 2px solid var(--secondary);
//           border-radius: 6px;
//           font-size: 14px;
//           height: 45px;
//           background: var(--white);
//           color: var(--text-dark);
//           transition: all 0.2s;
//           font-family: inherit;
//         }

//         .form-input:focus {
//           outline: none;
//           border-color: var(--primary);
//           box-shadow: 0 0 0 3px rgba(0, 55, 119, 0.1);
//         }

//         .form-input:disabled {
//           background: var(--white);
//           cursor: not-allowed;
//           opacity: 0.6;
//         }

//         .timer-form-wrapper {
//           background: var(--white);
//           border-radius: 8px;
//           padding: 25px;
//           margin-bottom: 25px;
//         }

//         .action-button {
//           padding: 12px 24px;
//           border: none;
//           border-radius: 6px;
//           font-size: 14px;
//           font-weight: 600;
//           cursor: pointer;
//           transition: all 0.3s;
//         }

//         .action-button.primary {
//           background: var(--primary);
//           color: var(--white);
//         }

//         .action-button.primary:hover:not(:disabled) {
//           background: #002550;
//           box-shadow: 0 4px 12px rgba(0, 55, 119, 0.3);
//         }

//         .action-button.primary:disabled {
//           opacity: 0.6;
//           cursor: not-allowed;
//         }

//         .action-button.secondary {
//           background: #6c757d;
//           color: var(--white);
//           margin-top: 15px;
//         }

//         .action-button.secondary:hover {
//           background: #5a6268;
//         }

//         .timer-button {
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           gap: 12px;
//           width: 100%;
//           padding: 18px;
//           font-size: 16px;
//           font-weight: 700;
//           background: #037;
//           color: var(--white);
//           border: none;
//           border-radius: 8px;
//           cursor: pointer;
//           transition: all 0.3s;
//           margin-top: 20px;
//           box-shadow: 0 4px 12px rgba(40, 167, 69, 0.2);
//         }

//         .timer-button:hover {
//           background: #037;
//           box-shadow: 0 6px 16px rgba(40, 167, 69, 0.3);
//         }

//         .timer-button.running {
//           background: var(--error);
//           box-shadow: 0 4px 12px rgba(220, 53, 69, 0.2);
//         }

//         .timer-button.running:hover {
//           background: #c82333;
//           box-shadow: 0 6px 16px rgba(220, 53, 69, 0.3);
//         }

//         .table-container {
//           overflow-x: auto;
//           margin-bottom: 25px;
//           border-radius: 8px;
//           box-shadow: 0 2px 8px rgba(0,0,0,0.05);
//         }

//         .professional-table {
//           width: 100%;
//           border-collapse: collapse;
//           background: var(--white);
//         }

//         .professional-table thead {
//           background: var(--primary);
//           color: var(--white);
//         }

//         .professional-table th {
//           padding: 14px 16px;
//           text-align: left;
//           font-weight: 600;
//           font-size: 13px;
//           text-transform: uppercase;
//         }

//         .professional-table td {
//           padding: 14px 16px;
//           border-bottom: 1px solid var(--secondary);
//           font-size: 14px;
//         }

//         .professional-table tbody tr:hover {
//           background: var(--secondary);
//         }

//         .task-cell {
//           font-weight: 600;
//           color: var(--primary);
//         }

//         .actions-cell {
//           display: flex;
//           gap: 10px;
//         }

//         .icon-btn {
//           background: none;
//           border: none;
//           font-size: 16px;
//           cursor: pointer;
//           opacity: 0.7;
//           transition: all 0.2s;
//           padding: 4px 8px;
//         }

//         .icon-btn:hover {
//           opacity: 1;
//         }

//         .billing-badge {
//           display: inline-block;
//           padding: 4px 12px;
//           border-radius: 20px;
//           font-size: 12px;
//           font-weight: 600;
//           text-transform: uppercase;
//         }

//         .billing-badge.billable {
//           background: #d4edda;
//           color: #155724;
//         }

//         .billing-badge.non-billable {
//           background: #fff3cd;
//           color: #856404;
//         }

//         .modal-overlay {
//           position: fixed;
//           top: 0;
//           left: 0;
//           right: 0;
//           bottom: 0;
//           background: rgba(0, 0, 0, 0.5);
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           z-index: 9999;
//         }

//         .modal-content {
//           background: var(--white);
//           border-radius: 10px;
//           width: 90%;
//           max-width: 500px;
//           max-height: 100vh;
//           overflow-y: auto;
//           box-shadow: 0 10px 40px rgba(0,0,0,0.2);
//         }

//         .modal-header {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           padding: 20px;
//           border-bottom: 2px solid var(--secondary);
//           color: var(--primary);
//         }

//         .modal-header h3 {
//           font-size: 24px;
//           font-weight: 700;
//           margin: 0;
//         }

//         .modal-close {
//           background: none;
//           border: none;
//           font-size: 24px;
//           cursor: pointer;
//           color: var(--primary);
//         }

//         .modal-body {
//           padding: 25px;
//         }

//         .success-msg {
//           background: #d4edda;
//           border: 2px solid var(--success);
//           color: #155724;
//           padding: 12px 16px;
//           border-radius: 6px;
//           margin-bottom: 15px;
//           font-size: 14px;
//           font-weight: 500;
//           animation: slideIn 0.3s ease;
//         }

//         .error-msg {
//           background: #f8d7da;
//           border: 2px solid var(--error);
//           color: #721c24;
//           padding: 12px 16px;
//           border-radius: 6px;
//           margin-bottom: 15px;
//           font-size: 14px;
//           font-weight: 500;
//           animation: slideIn 0.3s ease;
//         }

//         @keyframes slideIn {
//           from { transform: translateY(-10px); opacity: 0; }
//           to { transform: translateY(0); opacity: 1; }
//         }

//         .content-placeholder {
//           text-align: center;
//           color: var(--text-light);
//           padding: 60px 20px;
//         }

//         .filter-section {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
//           gap: 15px;
//           margin: 20px 0;
//           padding: 20px;
//           background: var(--white);
//           border-radius: 8px;
//         }

//         .filter-group {
//           display: flex;
//           flex-direction: column;
//           gap: 8px;
//         }

//         .filter-label {
//           font-size: 13px;
//           font-weight: 600;
//           color: var(--text-dark);
//           text-transform: uppercase;
//         }

//         .report-container {
//           background: var(--white);
//           border-radius: 8px;
//           padding: 20px;
//           margin-top: 20px;
//         }

//         .date-section {
//           margin-bottom: 30px;
//           padding-bottom: 20px;
//           border-bottom: 1px solid var(--secondary);
//         }

//         .date-header {
//           background: var(--primary);
//           color: var(--white);
//           padding: 12px 16px;
//           border-radius: 6px;
//           margin-bottom: 15px;
//         }

//         .date-header h4 {
//           margin: 0;
//           font-size: 14px;
//         }

//         .date-reports {
//           display: grid;
//           grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
//           gap: 15px;
//         }

//         .report-card {
//           background: var(--secondary);
//           border: 2px solid var(--border);
//           border-radius: 8px;
//           padding: 16px;
//         }

//         .report-row {
//           display: flex;
//           justify-content: space-between;
//           margin-bottom: 10px;
//           padding-bottom: 10px;
//           border-bottom: 1px solid var(--border);
//         }

//         .report-label {
//           font-weight: 600;
//           color: var(--text-dark);
//           font-size: 13px;
//         }

//         .report-value {
//           color: var(--primary);
//           font-weight: 600;
//           text-align: right;
//         }

//         @media (max-width: 768px) {
//           .dashboard-root {
//             padding: 10px;
//           }
//           .date-reports {
//             grid-template-columns: 1fr;
//           }
//         }

//         * {
//           scrollbar-width: none;
//         }

//         *::-webkit-scrollbar {
//           display: none;
//         }
//       `}</style>

//       <div className="header-box">
//         <div className="header-icon">⏱️</div>
//         <div className="header-content">
//           <h1>Time Tracking</h1>
//           <p>Track billable hours and project time</p>
//         </div>
//       </div>

//       <div className="stats-grid">
//         <div className="stat-card green">
//           <div className="stat-label">Today's Billable Hours</div>
//           <div className="stat-value-row">
//             <span className="stat-value">{todayBillableHoursDisplay}</span>
//             <span className="stat-icon">⏱️</span>
//           </div>
//         </div>
//         <div className="stat-card blue">
//           <div className="stat-label">Total Billable Hours</div>
//           <div className="stat-value-row">
//             <span className="stat-value">{billableHoursDisplay}</span>
//             <span className="stat-icon">💰</span>
//           </div>
//         </div>
//         <div className="stat-card">
//           <div className="stat-label">Active Projects</div>
//           <div className="stat-value-row">
//             <span className="stat-value">{projects.length}</span>
//             <span className="stat-icon">➕</span>
//           </div>
//         </div>
//         <div className={`stat-card ${isRunning ? 'green' : ''}`}>
//           <div className="stat-label">Running Timer</div>
//           <div className="stat-value-row">
//             <span className="stat-value">{isRunning ? 'Active' : 'Stopped'}</span>
//             <span className="stat-icon">{isRunning ? '▶️' : '⸸️'}</span>
//           </div>
//         </div>
//       </div>

//       <div className="tab-container">
//         <TabButtons selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
//         <TabContent
//           selectedTab={selectedTab}
//           isRunning={isRunning}
//           sessionTime={sessionTime}
//           handleStopTimer={handleStopTimer}
//           handleStartTimer={handleStartTimer}
//           projects={projects}
//           tasks={tasks}
//           entries={entries}
//           setEntries={setEntries}
//         />
//       </div>
//     </div>
//   );
// };

// export default TimeTrackingDashboard;



import React, { useState, useEffect, useCallback, useRef } from 'react';

const formatTime = (totalSeconds) => {
  if (totalSeconds < 0 || isNaN(totalSeconds)) return '00:00:00';
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
};

const convertHoursToHHMM = (hours) => {
  if (!hours) return '';
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
};

const TabButtons = ({ selectedTab, setSelectedTab, isRunning }) => {
  const tabs = [
    { id: 'timer', label: 'Start Timer' },
    { id: 'entries', label: 'Time Entries' },
    { id: 'reports', label: 'Time Reports' }
  ];

  return (
    <div className="tab-buttons">
      {tabs.map(tab => (
        <button
          key={tab.id}
          className={`tab-button ${selectedTab === tab.id ? 'tab-active' : ''} ${isRunning && tab.id !== 'timer' ? 'timer-active' : ''}`}
          onClick={() => setSelectedTab(tab.id)}
          title={isRunning && tab.id !== 'timer' ? 'Timer is running in the background' : ''}
        >
          {tab.label}
          {isRunning && tab.id !== 'timer' && <span className="timer-badge">⏱️</span>}
        </button>
      ))}
    </div>
  );
};

const Modal = ({ title, children, onClose }) => (
  <div className="modal-overlay">
    <div className="modal-content">
      <div className="modal-header">
        <h3>{title}</h3>
        <button className="modal-close" onClick={onClose}>✕</button>
      </div>
      <div className="modal-body">{children}</div>
    </div>
  </div>
);

const EntryForm = ({ taskDetails, handleChange, handleSubmit, clients, projects, loadingClients, error, showDuration, submitButtonText, loading, timerLayout, tasks = [], errors = {} }) => (
  <form onSubmit={handleSubmit}>
    {timerLayout ? (
      <div>
        <div className="form-grid-2">
          <div className="form-group">
            <label className="form-label" htmlFor="task">Task Description</label>
            <select
              className={`form-input ${errors.task ? 'input-error' : ''}`}
              id="task"
              value={taskDetails.task}
              onChange={handleChange}
            >
              <option value="">Select a task</option>
              {tasks.map((t) => (
                <option key={t.id} value={t.taskName}>
                  {t.taskName} ({convertHoursToHHMM(t.estimatedHours)})
                </option>
              ))}
            </select>
            {errors.task && <span className="error-text">{errors.task}</span>}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="client">Client</label>
            <select
              className={`form-input ${errors.client ? 'input-error' : ''}`}
              id="client"
              value={taskDetails.client}
              onChange={handleChange}
              disabled={loadingClients}
            >
              <option value="">{loadingClients ? "Loading..." : "Select client"}</option>
              {!loadingClients && !error && clients.map((c) => (
                <option key={c.id} value={c.clientName}>{c.clientName}</option>
              ))}
            </select>
            {errors.client && <span className="error-text">{errors.client}</span>}
          </div>
        </div>

        <div className="form-grid-3">
          <div className="form-group">
            <label className="form-label" htmlFor="project">Project</label>
            <select className="form-input" id="project" value={taskDetails.project} onChange={handleChange}>
              <option value="">Select project</option>
              {projects.map((p) => (
                <option key={p.id} value={p.name}>{p.name}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="date">Date</label>
            <input
              className={`form-input ${errors.date ? 'input-error' : ''}`}
              type="date"
              id="date"
              value={taskDetails.date}
              onChange={handleChange}
            />
            {errors.date && <span className="error-text">{errors.date}</span>}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="billing">Billing Type</label>
            <select className="form-input" id="billing" value={taskDetails.billing} onChange={handleChange}>
              <option>Billable</option>
              <option>Non-Billable</option>
            </select>
          </div>
        </div>
      </div>
    ) : (
      <div className="form-grid">
        <div className="form-group">
          <label className="form-label" htmlFor="task">Task Description *</label>
          <select
            className={`form-input ${errors.task ? 'input-error' : ''}`}
            id="task"
            value={taskDetails.task}
            onChange={handleChange}
          >
            <option value="">Select a task</option>
            {tasks.map((t) => (
              <option key={t.id} value={t.taskName}>
                {t.taskName} ({convertHoursToHHMM(t.estimatedHours)})
              </option>
            ))}
          </select>
          {errors.task && <span className="error-text">{errors.task}</span>}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="client">Client *</label>
          <select
            className={`form-input ${errors.client ? 'input-error' : ''}`}
            id="client"
            value={taskDetails.client}
            onChange={handleChange}
            disabled={loadingClients}
          >
            <option value="">Select client</option>
            {!loadingClients && !error && clients.map((c) => (
              <option key={c.id} value={c.clientName}>{c.clientName}</option>
            ))}
          </select>
          {errors.client && <span className="error-text">{errors.client}</span>}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="project">Project</label>
          <select className="form-input" id="project" value={taskDetails.project} onChange={handleChange}>
            <option value="">Select project</option>
            {projects.map((p) => (
              <option key={p.id} value={p.name}>{p.name}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="date">Date *</label>
          <input
            className={`form-input ${errors.date ? 'input-error' : ''}`}
            type="date"
            id="date"
            value={taskDetails.date}
            onChange={handleChange}
          />
          {errors.date && <span className="error-text">{errors.date}</span>}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="billing">Billing Type</label>
          <select className="form-input" id="billing" value={taskDetails.billing} onChange={handleChange}>
            <option>Billable</option>
            <option>Non-Billable</option>
          </select>
        </div>

        {showDuration && (
          <div className="form-group">
            <label className="form-label" htmlFor="duration">Duration (HH:MM) *</label>
            <input
              type="text"
              id="duration"
              className={`form-input ${errors.duration ? 'input-error' : ''}`}
              placeholder="e.g., 01:30"
              value={taskDetails.duration}
              onChange={handleChange}
            />
            {errors.duration && <span className="error-text">{errors.duration}</span>}
          </div>
        )}
      </div>
    )}
    
    {submitButtonText && (
      <button type="submit" className="action-button primary" disabled={loading}>
        {loading ? 'Processing...' : submitButtonText}
      </button>
    )}
  </form>
);

const TabContent = ({ selectedTab, isRunning, sessionTime, handleStopTimer, handleStartTimer, projects, tasks = [], entries: parentEntries = [], timerTaskDetails }) => {
  const API_BASE = "https://posthemorrhagic-nonequilaterally-caroline.ngrok-free.dev/api";
  
  // Declare state
  const [taskDetails, setTaskDetails] = useState({
    task: "",
    client: "",
    project: "",
    billing: "Billable",
    date: new Date().toISOString().slice(0, 10),
    duration: "",
    estimatedSeconds: 0,
  });

  const [clients, setClients] = useState([]);
  const [loadingClients, setLoadingClients] = useState(false);
  const [error, setError] = useState(null);
  const [entries, setEntries] = useState([]);
  const [showManualEntry, setShowManualEntry] = useState(false);
  const [editEntry, setEditEntry] = useState(null);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [filterFromDate, setFilterFromDate] = useState('');
  const [filterToDate, setFilterToDate] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const [editErrors, setEditErrors] = useState({});

  // Sync taskDetails with parent's timerTaskDetails
  useEffect(() => {
    if (timerTaskDetails) {
      setTaskDetails(timerTaskDetails);
    }
  }, [timerTaskDetails]);

  // Auto-select client when task is selected and clients are loaded
  useEffect(() => {
    if (taskDetails.task && clients.length > 0) {
      const selectedTask = tasks.find(t => t.taskName === taskDetails.task);
      if (selectedTask && selectedTask.client) {
        // Match client from task with available clients
        const matchedClient = clients.find(c => 
          c.clientName.toLowerCase() === selectedTask.client.toLowerCase()
        );
        if (matchedClient && taskDetails.client !== matchedClient.clientName) {
          setTaskDetails(prev => ({
            ...prev,
            client: matchedClient.clientName
          }));
        }
      }
    }
  }, [taskDetails.task, clients, tasks]);

  useEffect(() => {
    const fetchClients = async () => {
      setLoadingClients(true);
      try {
        const response = await fetch(`${API_BASE}/clients/all`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "ngrok-skip-browser-warning": "true",
          },
        });
        if (!response.ok) throw new Error("Failed to fetch clients");
        const data = await response.json();
        const sortedClients = data
          .filter((c) => c.status === "Active")
          .sort((a, b) => a.clientName.localeCompare(b.clientName));
        setClients(sortedClients);
      } catch (err) {
        console.error("Client Fetch Error:", err);
        setError("Failed to load clients");
      } finally {
        setLoadingClients(false);
      }
    };
    fetchClients();
  }, []);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await fetch(`${API_BASE}/time-tracker`, {
          headers: { "ngrok-skip-browser-warning": "true" },
        });
        if (response.ok) {
          const data = await response.json();
          setEntries(data);
          setReports(data);
        }
      } catch (err) {
        console.error("Error fetching entries:", err);
      }
    };
    if (selectedTab === 'entries' || selectedTab === 'reports') {
      fetchEntries();
    }
  }, [selectedTab]);

  const validateDurationFormat = (duration) => {
    if (!duration) return '';
    const regex = /^([0-9]{1,2}):([0-5][0-9])$/;
    if (!regex.test(duration)) {
      return 'Format must be HH:MM (e.g. 01:30)';
    }
    return '';
  };

  const validateManualForm = (details) => {
    const errs = {};
    if (!details.task || details.task.trim() === '') errs.task = 'Task description is required';
    if (!details.client || details.client.trim() === '') errs.client = 'Client is required';
    if (!details.date) errs.date = 'Date is required';
    if (!details.duration || details.duration.trim() === '') {
       errs.duration = 'Duration is required';
    } else {
       const durError = validateDurationFormat(details.duration);
       if (durError) errs.duration = durError;
    }
    return errs;
  };

  const validateTimerStart = (details) => {
    const errs = {};
    if (!details.task || details.task.trim() === '') errs.task = 'Task description is required';
    if (!details.client || details.client.trim() === '') errs.client = 'Client is required';
    return errs;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setTaskDetails(prev => ({ ...prev, [id]: value }));
    
    if (id === 'task' && value) {
      const selectedTask = tasks.find(t => t.taskName === value);
      if (selectedTask) {
        // Find matching client from clients list
        let clientToSet = '';
        if (selectedTask.client) {
          // First try exact match (case-insensitive)
          const matchedClient = clients.find(c => 
            c.clientName.toLowerCase() === selectedTask.client.toLowerCase()
          );
          clientToSet = matchedClient ? matchedClient.clientName : selectedTask.client;
        }
        
        setTaskDetails(prev => ({ 
          ...prev, 
          duration: convertHoursToHHMM(selectedTask.estimatedHours),
          estimatedSeconds: Math.round(selectedTask.estimatedHours * 3600),
          client: clientToSet
        }));
      }
    }
    
    if (formErrors[id]) {
      setFormErrors(prev => ({ ...prev, [id]: '' }));
    }
  };

  const showSuccessMsg = (msg) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const showErrorMsg = (msg) => {
    setError(msg);
    setTimeout(() => setError(null), 3000);
  };

  const onStartTimer = (details) => {
    const errs = validateTimerStart(details);
    if (Object.keys(errs).length > 0) {
      setFormErrors(errs);
      return;
    }
    handleStartTimer(details);
    showSuccessMsg('Timer started');
  };

  const onStopTimer = async () => {
    handleStopTimer();
    try {
      const duration = formatTime(sessionTime).slice(0, 5);
      const payload = {
        taskDescription: taskDetails.task,
        client: taskDetails.client,
        project: taskDetails.project || null,
        date: taskDetails.date,
        billingType: taskDetails.billing,
        duration: duration,
      };

      const response = await fetch(`${API_BASE}/time-tracker`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const newEntry = await response.json();
        setEntries(prev => [newEntry, ...prev]);
        setReports(prev => [newEntry, ...prev]);
        setTaskDetails({
          task: "",
          client: "",
          project: "",
          billing: "Billable",
          date: new Date().toISOString().slice(0, 10),
          duration: "",
        });
        setFormErrors({});
        showSuccessMsg('Timer entry saved');
      } else {
        const errorData = await response.json();
        showErrorMsg(errorData.message || "Failed to save entry");
      }
    } catch (err) {
      console.error("Error saving entry:", err);
      showErrorMsg("Failed to save timer entry");
    }
  };

  const handleManualEntrySubmit = async (e) => {
    e.preventDefault();
    const errs = validateManualForm(taskDetails);
    
    if (Object.keys(errs).length > 0) {
      setFormErrors(errs);
      return;
    }
    
    setLoading(true);
    try {
      const payload = {
        taskDescription: taskDetails.task,
        client: taskDetails.client,
        project: taskDetails.project || null,
        date: taskDetails.date,
        billingType: taskDetails.billing,
        duration: taskDetails.duration || null,
      };

      const response = await fetch(`${API_BASE}/time-tracker`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const newEntry = await response.json();
        setEntries(prev => [newEntry, ...prev]);
        setReports(prev => [newEntry, ...prev]);
        setShowManualEntry(false);
        setTaskDetails({
          task: "",
          client: "",
          project: "",
          billing: "Billable",
          date: new Date().toISOString().slice(0, 10),
          duration: "",
        });
        setFormErrors({});
        showSuccessMsg('Manual entry added');
      } else {
        const errorData = await response.json();
        showErrorMsg(errorData.message || "Failed to add entry");
      }
    } catch (err) {
      console.error("Error adding manual entry:", err);
      showErrorMsg("Failed to add manual entry");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, entry) => {
    try {
      const response = await fetch(`${API_BASE}/time-tracker`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
        body: JSON.stringify({
          taskDescription: entry.taskDescription,
          client: entry.client,
          project: entry.project || null,
        }),
      });

      if (response.ok) {
        setEntries(prev => prev.filter(e => e.id !== id));
        setReports(prev => prev.filter(r => r.id !== id));
        showSuccessMsg('Entry deleted');
      } else {
        const errorData = await response.json();
        showErrorMsg(errorData.message || "Failed to delete entry");
      }
    } catch (err) {
      console.error("Error deleting entry:", err);
      showErrorMsg("Failed to delete entry");
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    
    const errs = {};
    if (!editEntry.taskDescription || editEntry.taskDescription.trim() === '') {
      errs.taskDescription = 'Task description is required';
    }
    if (!editEntry.client || editEntry.client.trim() === '') {
      errs.client = 'Client is required';
    }
    if (!editEntry.date) {
      errs.date = 'Date is required';
    }
    if (!editEntry.duration || editEntry.duration.trim() === '') {
        errs.duration = 'Duration is required';
    } else {
        const durErr = validateDurationFormat(editEntry.duration);
        if (durErr) errs.duration = durErr;
    }

    if (Object.keys(errs).length > 0) {
      setEditErrors(errs);
      return;
    }

    setLoading(true);
    try {
      const payload = {
        taskDescription: editEntry.taskDescription,
        client: editEntry.client,
        project: editEntry.project || null,
        date: editEntry.date,
        billingType: editEntry.billingType,
        duration: editEntry.duration || null,
      };

      const response = await fetch(`${API_BASE}/time-tracker`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const updatedEntry = await response.json();
        setEntries(prev => prev.map(e => e.id === updatedEntry.id ? updatedEntry : e));
        setReports(prev => prev.map(r => r.id === updatedEntry.id ? updatedEntry : r));
        setEditEntry(null);
        setEditErrors({});
        showSuccessMsg('Entry updated');
      } else {
        const errorData = await response.json();
        showErrorMsg(errorData.message || "Failed to update entry");
      }
    } catch (err) {
      console.error("Error updating entry:", err);
      showErrorMsg("Failed to update entry");
    } finally {
      setLoading(false);
    }
  };

  const getFilteredReports = () => {
    return reports.filter(r => {
      const reportDate = new Date(r.date);
      const from = filterFromDate ? new Date(filterFromDate) : null;
      const to = filterToDate ? new Date(filterToDate) : null;

      if (from && reportDate < from) return false;
      if (to && reportDate > to) return false;
      return true;
    });
  };

  const calculateBillableHours = () => {
    let totalSeconds = 0;
    entries.forEach(entry => {
      if (entry.billingType === 'Billable' && entry.duration) {
        const [h, m] = entry.duration.split(':').map(Number);
        totalSeconds += (h * 3600) + (m * 60);
      }
    });
    return formatTime(totalSeconds).slice(0, 5);
  };

  const groupReportsByDate = (filteredReports) => {
    const grouped = {};
    filteredReports.forEach(report => {
      const date = report.date;
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(report);
    });
    return grouped;
  };

  switch (selectedTab) {
    case "entries":
      return (
        <div className="tab-content-area">
          {successMessage && <div className="success-msg">{successMessage}</div>}
          {error && <div className="error-msg">{error}</div>}
          
          {entries.length === 0 ? (
            <p className="content-placeholder">No entries found yet.</p>
          ) : (
            <div className="table-container">
              <table className="professional-table">
                <thead>
                  <tr>
                    <th>Task</th>
                    <th>Client</th>
                    <th>Project</th>
                    <th>Date</th>
                    <th>Billing</th>
                    <th>Duration</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {entries.map((entry) => (
                    <tr key={entry.id}>
                      <td className="task-cell">{entry.taskDescription}</td>
                      <td>{entry.client}</td>
                      <td>{entry.project || "-"}</td>
                      <td>{entry.date}</td>
                      <td>
                        <span className={`billing-badge ${entry.billingType === 'Billable' ? 'billable' : 'non-billable'}`}>
                          {entry.billingType}
                        </span>
                      </td>
                      <td className="duration-cell">{entry.duration || "-"}</td>
                      <td className="actions-cell">
                        <button className="icon-btn edit" onClick={() => {setEditEntry(entry); setEditErrors({});}} title="Edit">✏️</button>
                        <button className="icon-btn delete" onClick={() => handleDelete(entry.id, entry)} title="Delete">🗑️</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <h3><button className="action-button secondary" onClick={() => {setShowManualEntry(true); setFormErrors({});}}>
            + Add Manual Entry
          </button></h3>

          {showManualEntry && (
            <Modal title="Add Manual Entry" onClose={() => setShowManualEntry(false)}>
              <EntryForm
                taskDetails={taskDetails}
                handleChange={handleChange}
                handleSubmit={handleManualEntrySubmit}
                clients={clients}
                projects={projects}
                loadingClients={loadingClients}
                error={error}
                showDuration={true}
                submitButtonText="Save Entry"
                loading={loading}
                tasks={tasks}
                errors={formErrors}
              />
            </Modal>
          )}

          {editEntry && (
            <Modal title="Edit Entry" onClose={() => setEditEntry(null)}>
              <form onSubmit={handleEditSubmit}>
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">Task *</label>
                    <input 
                      className={`form-input ${editErrors.taskDescription ? 'input-error' : ''}`}
                      value={editEntry.taskDescription} 
                      onChange={(e) => {
                        setEditEntry({...editEntry, taskDescription: e.target.value});
                        if (editErrors.taskDescription) setEditErrors(prev => ({...prev, taskDescription: ''}));
                      }} 
                      placeholder="Enter task description"
                    />
                    {editErrors.taskDescription && <span className="error-text">{editErrors.taskDescription}</span>}
                  </div>
                  <div className="form-group">
                    <label className="form-label">Client *</label>
                    <input 
                      className={`form-input ${editErrors.client ? 'input-error' : ''}`}
                      value={editEntry.client} 
                      onChange={(e) => {
                        setEditEntry({...editEntry, client: e.target.value});
                        if (editErrors.client) setEditErrors(prev => ({...prev, client: ''}));
                      }} 
                      placeholder="Enter client name"
                    />
                    {editErrors.client && <span className="error-text">{editErrors.client}</span>}
                  </div>
                  <div className="form-group">
                    <label className="form-label">Project</label>
                    <select 
                      className="form-input"
                      value={editEntry.project || ''} 
                      onChange={(e) => {
                        setEditEntry({...editEntry, project: e.target.value});
                      }}
                    >
                      <option value="">Select project</option>
                      {projects.map((p) => (
                        <option key={p.id} value={p.name}>{p.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Date *</label>
                    <input 
                      className={`form-input ${editErrors.date ? 'input-error' : ''}`}
                      type="date" 
                      value={editEntry.date} 
                      onChange={(e) => {
                        setEditEntry({...editEntry, date: e.target.value});
                        if (editErrors.date) setEditErrors(prev => ({...prev, date: ''}));
                      }} 
                    />
                    {editErrors.date && <span className="error-text">{editErrors.date}</span>}
                  </div>
                  <div className="form-group">
                    <label className="form-label">Billing Type</label>
                    <select 
                      className="form-input"
                      value={editEntry.billingType} 
                      onChange={(e) => {
                        setEditEntry({...editEntry, billingType: e.target.value});
                      }}
                    >
                      <option>Billable</option>
                      <option>Non-Billable</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Duration (HH:MM) *</label>
                    <input 
                      className={`form-input ${editErrors.duration ? 'input-error' : ''}`}
                      value={editEntry.duration || ''} 
                      onChange={(e) => {
                        setEditEntry({...editEntry, duration: e.target.value});
                        if (editErrors.duration) setEditErrors(prev => ({...prev, duration: ''}));
                      }} 
                      placeholder="e.g., 01:30"
                    />
                    {editErrors.duration && <span className="error-text">{editErrors.duration}</span>}
                  </div>
                </div>
                <button type="submit" className="action-button primary" disabled={loading}>
                  {loading ? 'Updating...' : 'Save Changes'}
                </button>
              </form>
            </Modal>
          )}
        </div>
      );

    case "reports":
      const filteredReports = getFilteredReports();
      const groupedReports = groupReportsByDate(filteredReports);
      const sortedDates = Object.keys(groupedReports).sort().reverse();

      return (
        <div className="tab-content-area">
          <div className="filter-section">
            <div className="filter-group">
              <label className="filter-label">From Date:</label>
              <input
                type="date"
                className="form-input filter-input"
                value={filterFromDate}
                onChange={(e) => setFilterFromDate(e.target.value)}
              />
            </div>
            <div className="filter-group">
              <label className="filter-label">To Date:</label>
              <input
                type="date"
                className="form-input filter-input"
                value={filterToDate}
                onChange={(e) => setFilterToDate(e.target.value)}
              />
            </div>
            <div className="filter-group">
              <button className="action-button primary" onClick={() => { setFilterFromDate(''); setFilterToDate(''); }}>
                Clear Filter
              </button>
            </div>
          </div>

          {successMessage && <div className="success-msg">{successMessage}</div>}
          {error && <div className="error-msg">{error}</div>}

          {filteredReports.length === 0 ? (
            <p className="content-placeholder">No reports available.</p>
          ) : (
            <div className="report-container">
              {sortedDates.map(date => (
                <div key={date} className="date-section">
                  <div className="date-header">
                    <h4>{new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</h4>
                  </div>
                  <div className="date-reports">
                    {groupedReports[date].map(r => (
                      <div key={r.id} className="report-card">
                        <div className="report-row">
                          <span className="report-label">Client:</span>
                          <span className="report-value">{r.client}</span>
                        </div>
                        <div className="report-row">
                          <span className="report-label">Task:</span>
                          <span className="report-value">{r.taskDescription}</span>
                        </div>
                        <div className="report-row">
                          <span className="report-label">Project:</span>
                          <span className="report-value">{r.project || "-"}</span>
                        </div>
                        <div className="report-row">
                          <span className="report-label">Duration:</span>
                          <span className="report-value">{r.duration || "-"}</span>
                        </div>
                        <div className="report-row">
                          <span className="report-label">Billing:</span>
                          <span className={`billing-badge ${r.billingType === 'Billable' ? 'billable' : 'non-billable'}`}>
                            {r.billingType}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      );

    case "timer":
    default:
      return (
        <div className="tab-content-area">
          {error && <div className="error-msg">{error}</div>}
          
          <div className="timer-form-wrapper">
            <EntryForm
              taskDetails={taskDetails}
              handleChange={handleChange}
              handleSubmit={onStartTimer}
              clients={clients}
              projects={projects}
              loadingClients={loadingClients}
              error={error}
              showDuration={false}
              timerLayout={true}
              tasks={tasks}
              errors={formErrors}
            />
            <button
              className={`timer-button ${isRunning ? 'running' : ''}`}
              onClick={() => {
                if (isRunning) {
                  onStopTimer();
                } else {
                  onStartTimer(taskDetails);
                }
              }}
            >
              <span className="timer-icon">{isRunning ? "⏹" : "▶"}</span>
              <span className="timer-text">
                {isRunning ? `Timer Running (${formatTime(sessionTime)})` : "Start Timer"}
              </span>
            </button>
          </div>
        </div>
      );
  }
};

const TimeTrackingDashboard = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [sessionTime, setSessionTime] = useState(0);
  const [todayHours, setTodayHours] = useState(0);
  const [selectedTab, setSelectedTab] = useState('timer');
  const [tasks, setTasks] = useState([]);
  const [loadingTasks, setLoadingTasks] = useState(true);
  const [estimatedSeconds, setEstimatedSeconds] = useState(0);
  const [entries, setEntries] = useState([]);
  const [timerTaskDetails, setTimerTaskDetails] = useState(null);
  const [projects] = useState([
    { id: 1, name: 'Taxiation' },
    { id: 2, name: 'Budgeting' },
    { id: 3, name: 'Internal Audit' },
  ]);
  const intervalRef = useRef(null);

  const API_BASE = "https://posthemorrhagic-nonequilaterally-caroline.ngrok-free.dev/api";

  // Initialize timer from localStorage on component mount
  useEffect(() => {
    const savedTimerState = localStorage.getItem('timerState');
    if (savedTimerState) {
      try {
        const state = JSON.parse(savedTimerState);
        setIsRunning(state.isRunning);
        setSessionTime(state.sessionTime);
        setEstimatedSeconds(state.estimatedSeconds);
        setTimerTaskDetails(state.taskDetails);
        
        // If timer was running when page was closed, calculate elapsed time
        if (state.isRunning && state.startTime) {
          const elapsedSeconds = Math.floor((Date.now() - state.startTime) / 1000);
          setSessionTime(state.sessionTime + elapsedSeconds);
        }
      } catch (err) {
        console.error('Error loading timer state:', err);
        localStorage.removeItem('timerState');
      }
    }
  }, []);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(`${API_BASE}/tasks`, {
          headers: { "ngrok-skip-browser-warning": "true" },
        });
        if (response.ok) {
          const data = await response.json();
          setTasks(data);
        }
      } catch (err) {
        console.error("Error fetching tasks:", err);
      } finally {
        setLoadingTasks(false);
      }
    };
    fetchTasks();
  }, []);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await fetch(`${API_BASE}/time-tracker`, {
          headers: { "ngrok-skip-browser-warning": "true" },
        });
        if (response.ok) {
          const data = await response.json();
          setEntries(data);
        }
      } catch (err) {
        console.error("Error fetching entries:", err);
      }
    };
    fetchEntries();
  }, []);

  // Save timer state to localStorage whenever it changes
  useEffect(() => {
    if (isRunning || estimatedSeconds > 0) {
      const timerState = {
        isRunning,
        sessionTime,
        estimatedSeconds,
        taskDetails: timerTaskDetails,
        startTime: isRunning ? Date.now() : null,
      };
      localStorage.setItem('timerState', JSON.stringify(timerState));
    }
  }, [isRunning, sessionTime, estimatedSeconds, timerTaskDetails]);
  useEffect(() => {
    if (!isRunning) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    // Only set up interval if it's not already running
    if (intervalRef.current) return;

    intervalRef.current = setInterval(() => {
      setSessionTime((prev) => {
        const newTime = prev + 1;
        
        // Auto-stop if estimated time is reached
        if (estimatedSeconds > 0 && newTime >= estimatedSeconds) {
          setIsRunning(false);
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
        }
        
        return newTime;
      });
      
      setTodayHours((prev) => prev + 1);
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isRunning]);

  const handleStartTimer = (details) => {
    setIsRunning(true);
    setSessionTime(0);
    setTimerTaskDetails(details);
    // Set estimated time limit if task has estimated hours
    if (details.estimatedSeconds && details.estimatedSeconds > 0) {
      setEstimatedSeconds(details.estimatedSeconds);
    } else {
      setEstimatedSeconds(0);
    }
  };

  const handleStopTimer = useCallback(() => {
    setIsRunning(false);
    setTimerTaskDetails(null);
    setSessionTime(0);
    setEstimatedSeconds(0);
    localStorage.removeItem('timerState');
  }, []);

  // Monitor if estimated time has been reached
  useEffect(() => {
    if (isRunning && estimatedSeconds > 0 && sessionTime >= estimatedSeconds) {
      setIsRunning(false);
    }
  }, [sessionTime, estimatedSeconds, isRunning]);

  const formatTodayHoursDisplay = formatTime(todayHours).slice(0, 5);

  // Calculate billable hours from entries
  const calculateBillableHours = () => {
    let totalSeconds = 0;
    entries.forEach(entry => {
      if (entry.billingType === 'Billable' && entry.duration) {
        const [h, m] = entry.duration.split(':').map(Number);
        totalSeconds += (h * 3600) + (m * 60);
      }
    });
    return formatTime(totalSeconds).slice(0, 5);
  };

  const billableHoursDisplay = calculateBillableHours();

  // Calculate billable hours for TODAY only
  const calculateTodayBillableHours = () => {
    const today = new Date().toISOString().slice(0, 10);
    let totalSeconds = 0;
    entries.forEach(entry => {
      if (entry.billingType === 'Billable' && entry.duration && entry.date === today) {
        const [h, m] = entry.duration.split(':').map(Number);
        totalSeconds += (h * 3600) + (m * 60);
      }
    });
    return formatTime(totalSeconds).slice(0, 5);
  };

  const todayBillableHoursDisplay = calculateTodayBillableHours();

  return (
    <div className="dashboard-root">
      <style>{`
        :root {
          --primary: #003777;
          --secondary: #F0F0F0;
          --text-dark: #1a1a1a;
          --text-light: #666;
          --border: #ddd;
          --success: #28a745;
          --error: #dc2626;
          --white: #ffffff;
        }

        .dashboard-root {
          width: 100%;
          min-height: 100vh;
          background: var(--secondary);
          padding: 20px;
          display: flex;
          flex-direction: column;
        }

        .form-input.input-error {
          border-color: #ef4444 !important;
        }

        .form-input.input-error:hover,
        .form-input.input-error:focus {
          border-color: #dc2626 !important;
          box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.2);
          outline: none;
        }

        .error-text {
          color: #ef4444;
          font-size: 0.8rem;
          font-weight: 500;
          margin-top: 4px;
          display: flex;
          align-items: center;
          gap: 4px;
          animation: fadeIn 0.3s ease-in-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-3px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .header-box {
          background: linear-gradient(135deg, var(--primary), #037);
          border-radius: 12px;
          padding: 25px;
          margin-bottom: 25px;
          display: flex;
          align-items: center;
          gap: 16px;
          box-shadow: 0 4px 15px rgba(0, 55, 119, 0.15);
          color: var(--white);
        }

        .header-icon {
          font-size: 36px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 10px;
          padding: 12px 16px;
        }

        .header-content h1 {
          font-size: 28px;
          font-weight: 700;
          margin: 0;
        }

        .header-content p {
          font-size: 14px;
          margin-top: 4px;
          opacity: 0.9;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 15px;
          margin-bottom: 25px;
        }

        .stat-card {
          background: var(--white);
          border: 2px solid var(--border);
          border-radius: 10px;
          padding: 20px;
          box-shadow: 0 2px 5px rgba(0,0,0,0.05);
          transition: all 0.3s ease;
        }

        .stat-card:hover {
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          border-color: var(--primary);
        }

        .stat-card.green {
          border-left: 4px solid var(--success);
          background: #f0fdf4;
        }

        .stat-card.blue {
          border-left: 4px solid var(--primary);
          background: #f0f6ff;
        }

        .stat-label {
          font-size: 12px;
          color: var(--text-light);
          font-weight: 600;
          margin-bottom: 10px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .stat-value-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .stat-value {
          font-size: 28px;
          font-weight: 700;
          color: var(--primary);
        }

        .stat-icon {
          font-size: 28px;
        }

        .tab-container {
          background: var(--white);
          border-radius: 10px;
          overflow: hidden;
        }

        .tab-buttons {
          display: flex;
          gap: 0;
          border-bottom: 2px solid var(--secondary);
          background: var(--white);
          padding: 0 10px;
        }

        .tab-button {
          flex: 1;
          padding: 16px 20px;
          border: none;
          background: transparent;
          font-size: 14px;
          font-weight: 600;
          color: var(--text-light);
          cursor: pointer;
          transition: all 0.3s ease;
          border-bottom: 3px solid transparent;
          margin-bottom: -2px;
          position: relative;
        }

        .tab-button:hover {
          color: var(--primary);
        }

        .tab-button.tab-active {
          color: var(--white);
          background: var(--primary);
          border-bottom-color: var(--primary);
          border-radius: 6px 6px 0 0;
        }

        .tab-button.timer-active {
          border-right: 3px solid var(--error);
        }

        .timer-badge {
          margin-left: 6px;
          font-size: 12px;
          display: inline-block;
          animation: pulse 1.5s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        .tab-content-area {
          padding: 30px;
          min-height: 500px;
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 15px;
          background: var(--white);
          margin-bottom: 20px;
        }

        .form-grid-2 {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
          background: var(--white);
          margin-bottom: 20px;
        }

        .form-grid-3 {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          background: var(--white);
          margin-bottom: 20px;
        }

        @media (max-width: 768px) {
          .form-grid-2 {
            grid-template-columns: 1fr;
          }
          .form-grid-3 {
            grid-template-columns: 1fr;
          }
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .form-label {
          font-size: 13px;
          font-weight: 600;
          color: var(--text-dark);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .form-input {
          padding: 12px 14px;
          border: 2px solid var(--secondary);
          border-radius: 6px;
          font-size: 14px;
          height: 45px;
          background: var(--white);
          color: var(--text-dark);
          transition: all 0.2s;
          font-family: inherit;
        }

        .form-input:focus {
          outline: none;
          border-color: var(--primary);
          box-shadow: 0 0 0 3px rgba(0, 55, 119, 0.1);
        }

        .form-input:disabled {
          background: var(--white);
          cursor: not-allowed;
          opacity: 0.6;
        }

        .timer-form-wrapper {
          background: var(--white);
          border-radius: 8px;
          padding: 25px;
          margin-bottom: 25px;
        }

        .action-button {
          padding: 12px 24px;
          border: none;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
        }

        .action-button.primary {
          background: var(--primary);
          color: var(--white);
        }

        .action-button.primary:hover:not(:disabled) {
          background: #002550;
          box-shadow: 0 4px 12px rgba(0, 55, 119, 0.3);
        }

        .action-button.primary:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .action-button.secondary {
          background: #6c757d;
          color: var(--white);
          margin-top: 15px;
        }

        .action-button.secondary:hover {
          background: #5a6268;
        }

        .timer-button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          width: 100%;
          padding: 18px;
          font-size: 16px;
          font-weight: 700;
          background: #037;
          color: var(--white);
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s;
          margin-top: 20px;
          box-shadow: 0 4px 12px rgba(40, 167, 69, 0.2);
        }

        .timer-button:hover {
          background: #037;
          box-shadow: 0 6px 16px rgba(40, 167, 69, 0.3);
        }

        .timer-button.running {
          background: var(--error);
          box-shadow: 0 4px 12px rgba(220, 53, 69, 0.2);
          animation: timerPulse 1s infinite;
        }

        @keyframes timerPulse {
          0%, 100% { box-shadow: 0 4px 12px rgba(220, 53, 69, 0.2); }
          50% { box-shadow: 0 6px 20px rgba(220, 53, 69, 0.4); }
        }

        .timer-button.running:hover {
          background: #c82333;
          box-shadow: 0 6px 16px rgba(220, 53, 69, 0.3);
        }

        .table-container {
          overflow-x: auto;
          margin-bottom: 25px;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }

        .professional-table {
          width: 100%;
          border-collapse: collapse;
          background: var(--white);
        }

        .professional-table thead {
          background: var(--primary);
          color: var(--white);
        }

        .professional-table th {
          padding: 14px 16px;
          text-align: left;
          font-weight: 600;
          font-size: 13px;
          text-transform: uppercase;
        }

        .professional-table td {
          padding: 14px 16px;
          border-bottom: 1px solid var(--secondary);
          font-size: 14px;
        }

        .professional-table tbody tr:hover {
          background: var(--secondary);
        }

        .task-cell {
          font-weight: 600;
          color: var(--primary);
        }

        .actions-cell {
          display: flex;
          gap: 10px;
        }

        .icon-btn {
          background: none;
          border: none;
          font-size: 16px;
          cursor: pointer;
          opacity: 0.7;
          transition: all 0.2s;
          padding: 4px 8px;
        }

        .icon-btn:hover {
          opacity: 1;
        }

        .billing-badge {
          display: inline-block;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
        }

        .billing-badge.billable {
          background: #d4edda;
          color: #155724;
        }

        .billing-badge.non-billable {
          background: #fff3cd;
          color: #856404;
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999;
        }

        .modal-content {
          background: var(--white);
          border-radius: 10px;
          width: 90%;
          max-width: 500px;
          max-height: 100vh;
          overflow-y: auto;
          box-shadow: 0 10px 40px rgba(0,0,0,0.2);
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          border-bottom: 2px solid var(--secondary);
          color: var(--primary);
        }

        .modal-header h3 {
          font-size: 24px;
          font-weight: 700;
          margin: 0;
        }

        .modal-close {
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
          color: var(--primary);
        }

        .modal-body {
          padding: 25px;
        }

        .success-msg {
          background: #d4edda;
          border: 2px solid var(--success);
          color: #155724;
          padding: 12px 16px;
          border-radius: 6px;
          margin-bottom: 15px;
          font-size: 14px;
          font-weight: 500;
          animation: slideIn 0.3s ease;
        }

        .error-msg {
          background: #f8d7da;
          border: 2px solid var(--error);
          color: #721c24;
          padding: 12px 16px;
          border-radius: 6px;
          margin-bottom: 15px;
          font-size: 14px;
          font-weight: 500;
          animation: slideIn 0.3s ease;
        }

        @keyframes slideIn {
          from { transform: translateY(-10px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .content-placeholder {
          text-align: center;
          color: var(--text-light);
          padding: 60px 20px;
        }

        .filter-section {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 15px;
          margin: 20px 0;
          padding: 20px;
          background: var(--white);
          border-radius: 8px;
        }

        .filter-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .filter-label {
          font-size: 13px;
          font-weight: 600;
          color: var(--text-dark);
          text-transform: uppercase;
        }

        .report-container {
          background: var(--white);
          border-radius: 8px;
          padding: 20px;
          margin-top: 20px;
        }

        .date-section {
          margin-bottom: 30px;
          padding-bottom: 20px;
          border-bottom: 1px solid var(--secondary);
        }

        .date-header {
          background: var(--primary);
          color: var(--white);
          padding: 12px 16px;
          border-radius: 6px;
          margin-bottom: 15px;
        }

        .date-header h4 {
          margin: 0;
          font-size: 14px;
        }

        .date-reports {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 15px;
        }

        .report-card {
          background: var(--secondary);
          border: 2px solid var(--border);
          border-radius: 8px;
          padding: 16px;
        }

        .report-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
          padding-bottom: 10px;
          border-bottom: 1px solid var(--border);
        }

        .report-label {
          font-weight: 600;
          color: var(--text-dark);
          font-size: 13px;
        }

        .report-value {
          color: var(--primary);
          font-weight: 600;
          text-align: right;
        }

        @media (max-width: 768px) {
          .dashboard-root {
            padding: 10px;
          }
          .date-reports {
            grid-template-columns: 1fr;
          }
        }

        * {
          scrollbar-width: none;
        }

        *::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      <div className="header-box">
        <div className="header-icon">⏱️</div>
        <div className="header-content">
          <h1>Time Tracking</h1>
          <p>Track billable hours and project time</p>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card green">
          <div className="stat-label">Today's Billable Hours</div>
          <div className="stat-value-row">
            <span className="stat-value">{todayBillableHoursDisplay}</span>
            <span className="stat-icon">⏱️</span>
          </div>
        </div>
        <div className="stat-card blue">
          <div className="stat-label">Total Billable Hours</div>
          <div className="stat-value-row">
            <span className="stat-value">{billableHoursDisplay}</span>
            <span className="stat-icon">💰</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Active Projects</div>
          <div className="stat-value-row">
            <span className="stat-value">{projects.length}</span>
            <span className="stat-icon">➕</span>
          </div>
        </div>
        <div className={`stat-card ${isRunning ? 'green' : ''}`}>
          <div className="stat-label">Running Timer</div>
          <div className="stat-value-row">
            <span className="stat-value">{isRunning ? 'Active' : 'Stopped'}</span>
            <span className="stat-icon">{isRunning ? '▶️' : '⸸️'}</span>
          </div>
        </div>
      </div>

      <div className="tab-container">
        <TabButtons selectedTab={selectedTab} setSelectedTab={setSelectedTab} isRunning={isRunning} />
        <TabContent
          selectedTab={selectedTab}
          isRunning={isRunning}
          sessionTime={sessionTime}
          handleStopTimer={handleStopTimer}
          handleStartTimer={handleStartTimer}
          projects={projects}
          tasks={tasks}
          entries={entries}
          timerTaskDetails={timerTaskDetails}
        />
      </div>
    </div>
  );
};

export default TimeTrackingDashboard;
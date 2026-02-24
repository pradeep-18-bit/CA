
// import React, { useState, useEffect } from "react";
// import "../Global.css";

// // Success / Error message bar
// function SuccessMessage({ message, type }) {
//   if (!message) return null;
//   return (
//     <div className={type === "error" ? "top-error-bar" : "top-success-bar"}>
//       {message}
//     </div>
//   );
// }

// export default function Filmnotifaction() {
//   const API =
//     "https://posthemorrhagic-nonequilaterally-caroline.ngrok-free.dev/api/notification-setting";

//   // STATES
//   const [gstReminder, setGstReminder] = useState(true);
//   const [tdsReminder, setTdsReminder] = useState(true);
//   const [itrReminder, setItrReminder] = useState(true);

//   const [emailNotif, setEmailNotif] = useState(true);
//   const [smsNotif, setSmsNotif] = useState(false);
//   const [waNotif, setWaNotif] = useState(true);

//   const [daysBefore, setDaysBefore] = useState("7");
//   const [reminderTime, setReminderTime] = useState("09:00 AM");

//   const [loading, setLoading] = useState(false);
//   const [apiMessage, setApiMessage] = useState(null);

//   // ----------------------------------------------------
//   // LOAD DATA FROM BACKEND (GET)
//   // ----------------------------------------------------
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await fetch(API, {
//           method: "GET",
//           headers: {
//             Accept: "application/json",
//             "ngrok-skip-browser-warning": "true",
//           },
//         });

//         if (res.ok) {
//           const data = await res.json();

//           setGstReminder(data.gstReturnReminders);
//           setTdsReminder(data.tdsReturnReminders);
//           setItrReminder(data.itrFilingReminders);

//           setDaysBefore(data.reminderDaysDeadline);
//           setReminderTime(data.reminderTime);

//           setEmailNotif(data.emailNotifications);
//           setSmsNotif(data.smsNotifications); // FIXED ✔
//           setWaNotif(data.whatsappNotifications);
//         }
//       } catch (error) {
//         console.error("LOAD ERROR:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   // ----------------------------------------------------
//   // VALIDATE (only required fields)
//   // ----------------------------------------------------
//   const validate = () => {
//     if (!daysBefore || !reminderTime) {
//       setApiMessage({
//         type: "error",
//         text: "Reminder Days and Time are required.",
//       });
//       return false;
//     }
//     return true;
//   };

//   // ----------------------------------------------------
//   // SAVE NOTIFICATIONS SETTINGS (POST)
//   // ----------------------------------------------------
//   const handleSave = async () => {
//     if (!validate()) return;

//     setLoading(true);
//     setApiMessage(null);

//     try {
//       const res = await fetch(API, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//           "ngrok-skip-browser-warning": "true",
//         },
//         body: JSON.stringify({
//           gstReturnReminders: gstReminder,
//           tdsReturnReminders: tdsReminder,
//           itrFilingReminders: itrReminder,
//           reminderDaysDeadline: daysBefore,
//           reminderTime,
//           emailNotifications: emailNotif,
//           smsNotifications: smsNotif,
//           whatsappNotifications: waNotif,
//         }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         setApiMessage({
//           type: "success",
//           text: "Notification settings saved successfully!",
//         });
//       } else {
//         setApiMessage({
//           type: "error",
//           text: data.message || "Failed to save settings.",
//         });
//       }
//     } catch (error) {
//       setApiMessage({
//         type: "error",
//         text: "Network error. Please try again.",
//       });
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="notif-container">

//       <SuccessMessage message={apiMessage?.text} type={apiMessage?.type} />

//       {/* ----------------- DEADLINE NOTIFICATIONS ----------------- */}
//       <div className="notif-card">
//         <h3 className="sectionTitle">📅 Deadline Notifications</h3>

//         <div className="notif-option-row">
//           <div>
//             <b>GST Return Reminders</b>
//             <p className="text">Get notified before GST filing deadlines</p>
//           </div>
//           <label className="switch">
//             <input
//               type="checkbox"
//               checked={gstReminder}
//               onChange={() => setGstReminder(!gstReminder)}
//             />
//             <span className="slider round"></span>
//           </label>
//         </div>

//         <div className="notif-option-row">
//           <div>
//             <b>TDS Return Reminders</b>
//             <p className="text">Get notified before TDS filing deadlines</p>
//           </div>
//           <label className="switch">
//             <input
//               type="checkbox"
//               checked={tdsReminder}
//               onChange={() => setTdsReminder(!tdsReminder)}
//             />
//             <span className="slider round"></span>
//           </label>
//         </div>

//         <div className="notif-option-row">
//           <div>
//             <b>ITR Filing Reminders</b>
//             <p className="text">Get notified before ITR filing deadlines</p>
//           </div>
//           <label className="switch">
//             <input
//               type="checkbox"
//               checked={itrReminder}
//               onChange={() => setItrReminder(!itrReminder)}
//             />
//             <span className="slider round"></span>
//           </label>
//         </div>

//         {/* Timing */}
//         <h4 className="sectionTitle">Reminder Timing</h4>

//         <div className="row">
//           <div className="input-group">
//             <label>Days Before Deadline</label>
//             <select
//               className="select"
//               value={daysBefore}
//               onChange={(e) => setDaysBefore(e.target.value)}
//             >
//               <option value="1">1 Day</option>
//               <option value="3">3 Days</option>
//               <option value="5">5 Days</option>
//               <option value="7">7 Days</option>
//             </select>
//           </div>

//           <div className="input-group">
//             <label>Reminder Time</label>
//             <select
//               className="select"
//               value={reminderTime}
//               onChange={(e) => setReminderTime(e.target.value)}
//             >
//               <option>09:00 AM</option>
//               <option>12:00 PM</option>
//               <option>03:00 PM</option>
//               <option>06:00 PM</option>
//             </select>
//           </div>
//         </div>
//       </div>

//       {/* ----------------- COMMUNICATION CHANNELS ----------------- */}
//       <div className="notif-card">
//         <h3 className="sectionTitle">✉️ Communication Channels</h3>

//         <div className="notif-option-row">
//           <div>
//             <b>Email Notifications</b>
//             <p className="text">Receive alerts via email</p>
//           </div>
//           <label className="switch">
//             <input
//               type="checkbox"
//               checked={emailNotif}
//               onChange={() => setEmailNotif(!emailNotif)}
//             />
//             <span className="slider round"></span>
//           </label>
//         </div>

//         <div className="notif-option-row">
//           <div>
//             <b>SMS Notifications</b>
//             <p className="text">Receive alerts via SMS</p>
//           </div>
//           <label className="switch">
//             <input
//               type="checkbox"
//               checked={smsNotif}
//               onChange={() => setSmsNotif(!smsNotif)}
//             />
//             <span className="slider round"></span>
//           </label>
//         </div>

//         <div className="notif-option-row">
//           <div>
//             <b>WhatsApp Notifications</b>
//             <p className="text">Receive alerts via WhatsApp</p>
//           </div>
//           <label className="switch">
//             <input
//               type="checkbox"
//               checked={waNotif}
//               onChange={() => setWaNotif(!waNotif)}
//             />
//             <span className="slider round"></span>
//           </label>
//         </div>
//       </div>

//       <div className="save-row">
//         <button className="save-btn" onClick={handleSave} disabled={loading}>
//           {loading ? "Saving..." : "💾 Save Changes"}
//         </button>
//       </div>
//     </div>
//   );
// }



// src/firmsettings/Notifications.js
import React, { useState, useEffect } from "react";

export default function Filmnotifaction() {
  const [gstReminder, setGstReminder] = useState(true);
  const [tdsReminder, setTdsReminder] = useState(false);
  const [itrReminder, setItrReminder] = useState(true);

  const [emailNotif, setEmailNotif] = useState(true);
  const [smsNotif, setSmsNotif] = useState(false);
  const [waNotif, setWaNotif] = useState(true);

  const [daysBefore, setDaysBefore] = useState("7");
  const [reminderTime, setReminderTime] = useState("9:00 AM");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const API_URL = "https://posthemorrhagic-nonequilaterally-caroline.ngrok-free.dev/api/notification-setting";

  // Fetch notification settings on component mount
  useEffect(() => {
    fetchNotificationSettings();
  }, []);

  const fetchNotificationSettings = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true"
        }
        // REMOVED: credentials: "include"
      });

      const contentType = response.headers.get("content-type");

      if (!contentType || !contentType.includes("application/json")) {
        const responseText = await response.text();
        console.error("Response is not JSON:", responseText);
        setMessage("⚠️ Using default notification settings");
        setLoading(false);
        return;
      }

      if (response.ok) {
        const data = await response.json();
        setGstReminder(data.gstReturnReminders);
        setTdsReminder(data.tdsReturnReminders);
        setItrReminder(data.itrFilingReminders);
        setReminderTime(data.reminderTime);
        setDaysBefore(String(data.reminderDaysDeadline));
        setEmailNotif(data.emailNotifications);
        setSmsNotif(data.smsNotifications);
        setWaNotif(data.whatsappNotifications);
      } else {
        setMessage("❌ Failed to fetch notification settings");
      }
    } catch (error) {
      console.error("Error fetching settings:", error);
      setMessage("⚠️ Using default notification settings (API unavailable)");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      setMessage("");

      if (!daysBefore || !reminderTime) {
        setMessage("❌ Days Before and Reminder Time are required");
        setLoading(false);
        return;
      }

      const payload = {
        gstReturnReminders: gstReminder,
        tdsReturnReminders: tdsReminder,
        itrFilingReminders: itrReminder,
        reminderDaysDeadline: daysBefore,
        reminderTime: reminderTime,
        emailNotifications: emailNotif,
        smsNotifications: smsNotif,
        whatsappNotifications: waNotif,
      };

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true"
        },
        // REMOVED: credentials: "include"
        body: JSON.stringify(payload),
      });

      const contentType = response.headers.get("content-type");

      if (!contentType || !contentType.includes("application/json")) {
        const responseText = await response.text();
        console.error("Response is not JSON:", responseText);
        setMessage("⚠️ Settings sent (server response unclear)");
        return;
      }

      if (response.ok) {
        setMessage("✅ Notification settings saved successfully!");
        setTimeout(() => setMessage(""), 3000);
      } else {
        const errorData = await response.json();
        setMessage(`❌ ${errorData.message || "Failed to save notification settings"}`);
      }
    } catch (error) {
      console.error("Error saving settings:", error);
      setMessage("❌ Error saving notification settings");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      {/* Status Message */}
      {message && (
        <div style={{
          padding: "12px",
          marginBottom: "16px",
          borderRadius: "4px",
          backgroundColor: message.includes("✅") ? "#d4edda" : "#f8d7da",
          color: message.includes("✅") ? "#155724" : "#721c24",
          border: `1px solid ${message.includes("✅") ? "#c3e6cb" : "#f5c6cb"}`,
        }}>
          {message}
        </div>
      )}

      {/* Deadline Notifications */}
      <div style={styles.card}>
        <h3 style={styles.sectionTitle}>📅 Deadline Notifications</h3>

        <div style={styles.optionRow}>
          <div>
            <b>GST Return Reminders</b>
            <p style={styles.text}>Get notified before GST filing deadlines</p>
          </div>
          <label className="switch">
            <input
              type="checkbox"
              checked={gstReminder}
              onChange={() => setGstReminder(!gstReminder)}
              disabled={loading}
            />
            <span className="slider round"></span>
          </label>
        </div>

        <div style={styles.optionRow}>
          <div>
            <b>TDS Return Reminders</b>
            <p style={styles.text}>Get notified before TDS filing deadlines</p>
          </div>
          <label className="switch">
            <input
              type="checkbox"
              checked={tdsReminder}
              onChange={() => setTdsReminder(!tdsReminder)}
              disabled={loading}
            />
            <span className="slider round"></span>
          </label>
        </div>

        <div style={styles.optionRow}>
          <div>
            <b>ITR Filing Reminders</b>
            <p style={styles.text}>Get notified before ITR filing deadlines</p>
          </div>
          <label className="switch">
            <input
              type="checkbox"
              checked={itrReminder}
              onChange={() => setItrReminder(!itrReminder)}
              disabled={loading}
            />
            <span className="slider round"></span>
          </label>
        </div>

        {/* Reminder Timing */}
        <h4 style={{ marginTop: "20px" }}>Reminder Timing</h4>
        <div style={styles.timingRow}>
          <div style={styles.column}>
            <label style={styles.label}>Days Before Deadline</label>
            <select
              style={styles.select}
              value={daysBefore}
              onChange={(e) => setDaysBefore(e.target.value)}
              disabled={loading}
            >
              <option value="1">1 Day</option>
              <option value="3">3 Days</option>
              <option value="5">5 Days</option>
              <option value="7">7 Days</option>
            </select>
          </div>
          <div style={styles.column}>
            <label style={styles.label}>Reminder Time</label>
            <select
              style={styles.select}
              value={reminderTime}
              onChange={(e) => setReminderTime(e.target.value)}
              disabled={loading}
            >
              <option>9:00 AM</option>
              <option>12:00 PM</option>
              <option>3:00 PM</option>
              <option>6:00 PM</option>
            </select>
          </div>
        </div>
      </div>

      {/* Communication Channels */}
      <div style={styles.card}>
        <h3 style={styles.sectionTitle}>✉️ Communication Channels</h3>

        <div style={styles.optionRow}>
          <div>
            <b>Email Notifications</b>
            <p style={styles.text}>Receive alerts via email</p>
          </div>
          <label className="switch">
            <input
              type="checkbox"
              checked={emailNotif}
              onChange={() => setEmailNotif(!emailNotif)}
              disabled={loading}
            />
            <span className="slider round"></span>
          </label>
        </div>

        <div style={styles.optionRow}>
          <div>
            <b>SMS Notifications</b>
            <p style={styles.text}>Receive alerts via SMS</p>
          </div>
          <label className="switch">
            <input
              type="checkbox"
              checked={smsNotif}
              onChange={() => setSmsNotif(!smsNotif)}
              disabled={loading}
            />
            <span className="slider round"></span>
          </label>
        </div>

        <div style={styles.optionRow}>
          <div>
            <b>WhatsApp Notifications</b>
            <p style={styles.text}>Receive alerts via WhatsApp</p>
          </div>
          <label className="switch">
            <input
              type="checkbox"
              checked={waNotif}
              onChange={() => setWaNotif(!waNotif)}
              disabled={loading}
            />
            <span className="slider round"></span>
          </label>
        </div>
      </div>

      {/* Save Button at Bottom */}
      <div style={styles.saveRow}>
        <button
          style={{
            ...styles.saveBtn,
            opacity: loading ? 0.6 : 1,
            cursor: loading ? "not-allowed" : "pointer",
          }}
          onClick={handleSave}
          disabled={loading}
        >
          {loading ? "💾 Saving..." : "💾 Save Changes"}
        </button>
      </div>

      {/* Internal CSS for toggle */}
      <style>{`
        .switch {
          position: relative;
          display: inline-block;
          width: 46px;
          height: 24px;
        }

        .switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #ccc;
          transition: .4s;
          border-radius: 34px;
        }

        .slider:before {
          position: absolute;
          content: "";
          height: 18px;
          width: 18px;
          left: 3px;
          bottom: 3px;
          background-color: white;
          transition: .4s;
          border-radius: 50%;
        }

        input:checked + .slider {
          background-color: #007bff;
        }

        input:checked + .slider:before {
          transform: translateX(22px);
        }

        input:disabled + .slider {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    width: "96%",
    margin: "10px auto",
  },
  card: {
    background: "#fff",
    border: "1px solid #eee",
    borderRadius: "8px",
    padding: "20px",
    marginBottom: "20px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
    width: "100%",
  },
  sectionTitle: { marginBottom: "15px" },
  optionRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #f0f0f0",
    padding: "10px 0",
  },
  text: { fontSize: "14px", color: "#555", margin: 0 },
  timingRow: {
    display: "flex",
    gap: "20px",
    marginTop: "10px",
  },
  column: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  label: {
    marginBottom: "6px",
    fontSize: "14px",
    fontWeight: "bold",
    color: "#333",
  },
  select: {
    padding: "6px 10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  saveRow: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "20px",
  },
  saveBtn: {
    background: "#073D7F",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
  },
};
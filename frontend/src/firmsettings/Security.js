// import React, { useState, useEffect } from "react";
// import "./Global.css";

// // Reusable success/error bar
// function SuccessMessage({ message, type }) {
//   if (!message) return null;
//   return (
//     <div className={type === "error" ? "top-error-bar" : "top-success-bar"}>
//       {message}
//     </div>
//   );
// }

// export default function Filmsecurity() {
//   const API =
//     "https://posthemorrhagic-nonequilaterally-caroline.ngrok-free.dev/api/security-setting";

//   // States
//   const [twoFA, setTwoFA] = useState(true);
//   const [auditLogging, setAuditLogging] = useState(false);
//   const [sessionTimeout, setSessionTimeout] = useState("");
//   const [loginAttempts, setLoginAttempts] = useState("");
//   const [dataEncryption, setDataEncryption] = useState(true);
//   const [dataBackup, setDataBackup] = useState(true);

//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [apiMessage, setApiMessage] = useState(null);

//   // ----------------------------------------------------
//   // GET SECURITY SETTINGS FROM BACKEND
//   // ----------------------------------------------------
//   useEffect(() => {
//     const fetchSettings = async () => {
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

//           setTwoFA(data.twoFactorAuthentication);
//           setAuditLogging(data.auditLogging);
//           setSessionTimeout(data.sessionTimeout);
//           setLoginAttempts(data.loginAttemptLimit);

//           setDataEncryption(data.dataEncryption === "Enabled");
//           setDataBackup(data.dataBackup === "Active");
//         }
//       } catch (error) {
//         console.error("LOAD ERROR:", error);
//       }
//     };

//     fetchSettings();
//   }, []);

//   // ----------------------------------------------------
//   // VALIDATION
//   // ----------------------------------------------------
//   const validate = () => {
//     let newErrors = {};

//     if (!sessionTimeout) newErrors.sessionTimeout = "Session timeout is required.";
//     if (!loginAttempts) newErrors.loginAttempts = "Login attempt limit is required.";

//     return newErrors;
//   };

//   // ----------------------------------------------------
//   // SAVE SECURITY SETTINGS (POST)
//   // ----------------------------------------------------
//   const handleSave = async () => {
//     const validationErrors = validate();
//     setErrors(validationErrors);

//     if (Object.keys(validationErrors).length > 0) return;

//     setLoading(true);
//     setApiMessage(null);

//     try {
//       const res = await fetch(API, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           twoFactorAuthentication: twoFA,
//           auditLogging,
//           sessionTimeout,
//           loginAttemptLimit: loginAttempts,
//           dataEncryption: dataEncryption ? "Enabled" : "Disabled",
//           dataBackup: dataBackup ? "Active" : "Inactive",
//         }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         setApiMessage({
//           type: "success",
//           text: "Security settings saved successfully!",
//         });
//       } else {
//         setApiMessage({
//           type: "error",
//           text: data.message || "Failed to save settings",
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
//     <div>
//       {/* Global success bar */}
//       <SuccessMessage message={apiMessage?.text} type={apiMessage?.type} />

//       <div className="security-container">
//         {/* -------- ACCESS CONTROL -------- */}
//         <div className="security-card">
//           <h3 className="security-section-title">🔐 Access Control</h3>

//           <div className="security-option-row">
//             <div>
//               <b>Two-Factor Authentication</b>
//               <p className="security-text">Require 2FA for all users</p>
//             </div>
//             <label className="switch">
//               <input type="checkbox" checked={twoFA} onChange={() => setTwoFA(!twoFA)} />
//               <span className="slider round"></span>
//             </label>
//           </div>

//           <div className="security-option-row">
//             <div>
//               <b>Session Timeout</b>
//               <p className="security-text">Auto-logout after inactivity</p>
//               {errors.sessionTimeout && <p className="error-text">{errors.sessionTimeout}</p>}
//             </div>
//             <select
//               className={`security-select ${errors.sessionTimeout ? "error-border" : ""}`}
//               value={sessionTimeout}
//               onChange={(e) => setSessionTimeout(e.target.value)}
//             >
//               <option value="">Select timeout</option>
//               <option>15 minutes</option>
//               <option>30 minutes</option>
//               <option>1 hour</option>
//               <option>2 hours</option>
//             </select>
//           </div>

//           <div className="security-option-row">
//             <div>
//               <b>Login Attempt Limit</b>
//               <p className="security-text">Lock account after failed attempts</p>
//               {errors.loginAttempts && <p className="error-text">{errors.loginAttempts}</p>}
//             </div>
//             <select
//               className={`security-select ${errors.loginAttempts ? "error-border" : ""}`}
//               value={loginAttempts}
//               onChange={(e) => setLoginAttempts(e.target.value)}
//             >
//               <option value="">Select attempts</option>
//               <option value="3">3</option>
//               <option value="5">5</option>
//               <option value="7">7</option>
//             </select>
//           </div>
//         </div>

//         {/* -------- DATA PROTECTION -------- */}
//         <div className="security-card">
//           <h3 className="security-section-title">🛡️ Data Protection</h3>

//           <div className="security-option-row">
//             <div>
//               <b>Data Encryption</b>
//               <p className="security-text">Encrypt sensitive client data</p>
//             </div>
//             <label className="switch">
//               <input
//                 type="checkbox"
//                 checked={dataEncryption}
//                 onChange={() => setDataEncryption(!dataEncryption)}
//               />
//               <span className="slider round"></span>
//             </label>
//           </div>

//           <div className="security-option-row">
//             <div>
//               <b>Audit Logging</b>
//               <p className="security-text">Track all user activities</p>
//             </div>
//             <label className="switch">
//               <input
//                 type="checkbox"
//                 checked={auditLogging}
//                 onChange={() => setAuditLogging(!auditLogging)}
//               />
//               <span className="slider round"></span>
//             </label>
//           </div>

//           <div className="security-option-row">
//             <div>
//               <b>Data Backup</b>
//               <p className="security-text">Automatic daily backups</p>
//             </div>
//             <label className="switch">
//               <input type="checkbox" checked={dataBackup} onChange={() => setDataBackup(!dataBackup)} />
//               <span className="slider round"></span>
//             </label>
//           </div>
//         </div>

//         {/* -------- SAVE BUTTON -------- */}
//         <div className="security-save-row">
//           <button className="security-save-btn" onClick={handleSave} disabled={loading}>
//             {loading ? "Saving..." : "💾 Save Changes"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }




import React, { useState, useEffect } from "react";
import './Global.css';

export default function Filmsecurity() {
  const [twoFA, setTwoFA] = useState(true);
  const [auditLogging, setAuditLogging] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState("30");
  const [loginAttempts, setLoginAttempts] = useState("5");
  const [dataEncryption, setDataEncryption] = useState("Enabled");
  const [dataBackup, setDataBackup] = useState("Active");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const API_URL = "https://posthemorrhagic-nonequilaterally-caroline.ngrok-free.dev/api/security-setting";

  // Fetch security settings on component mount
  useEffect(() => {
    fetchSecuritySettings();
  }, []);

  const fetchSecuritySettings = async () => {
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
        setMessage("⚠️ Using default security settings");
        setLoading(false);
        return;
      }

      if (response.ok) {
        const data = await response.json();
        setTwoFA(data.twoFactorAuthentication);
        setSessionTimeout(String(data.sessionTimeout));
        setLoginAttempts(String(data.loginAttemptLimit));
        setAuditLogging(data.auditLogging);
        setDataEncryption(data.dataEncryption);
        setDataBackup(data.dataBackup);
      } else {
        setMessage("❌ Failed to fetch security settings");
      }
    } catch (error) {
      console.error("Error fetching settings:", error);
      setMessage("⚠️ Using default security settings (API unavailable)");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      setMessage("");

      const payload = {
        twoFactorAuthentication: twoFA,
        sessionTimeout: sessionTimeout,
        loginAttemptLimit: loginAttempts,
        dataEncryption: dataEncryption,
        auditLogging: auditLogging,
        dataBackup: dataBackup,
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
        setMessage("✅ Security settings saved successfully!");
        setTimeout(() => setMessage(""), 3000);
      } else {
        setMessage("❌ Failed to save security settings");
      }
    } catch (error) {
      console.error("Error saving settings:", error);
      setMessage("❌ Error saving security settings");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="security-container">
      {/* Status Message */}
      {message && (
        <div className="security-message" style={{
          padding: "12px",
          marginBottom: "16px",
          borderRadius: "4px",
          backgroundColor: message.includes("✅") ? "#d4edda" : "#f8d7da",
          color: message.includes("✅") ? "#155724" : "#721c24",
          border: `1px solid ${message.includes("✅") ? "#c3e6cb" : "#f5c6cb"}`
        }}>
          {message}
        </div>
      )}

      {/* Access Control */}
      <div className="security-card">
        <h3 className="security-section-title">🔐 Access Control</h3>

        <div className="security-option-row">
          <div>
            <b>Two-Factor Authentication</b>
            <p className="security-text">Require 2FA for all users</p>
          </div>
          <label className="switch">
            <input
              type="checkbox"
              checked={twoFA}
              onChange={() => setTwoFA(!twoFA)}
              disabled={loading}
            />
            <span className="slider round"></span>
          </label>
        </div>

        <div className="security-option-row">
          <div>
            <b>Session Timeout</b>
            <p className="security-text">Auto-logout after inactivity</p>
          </div>
          <select
            className="security-select"
            value={sessionTimeout}
            onChange={(e) => setSessionTimeout(e.target.value)}
            disabled={loading}
          >
            <option value="15">15 minutes</option>
            <option value="30">30 minutes</option>
            <option value="60">1 hour</option>
            <option value="120">2 hours</option>
          </select>
        </div>

        <div className="security-option-row">
          <div>
            <b>Login Attempt Limit</b>
            <p className="security-text">Lock account after failed attempts</p>
          </div>
          <select
            className="security-select"
            value={loginAttempts}
            onChange={(e) => setLoginAttempts(e.target.value)}
            disabled={loading}
          >
            <option value="3">3 attempts</option>
            <option value="5">5 attempts</option>
            <option value="7">7 attempts</option>
          </select>
        </div>
      </div>

      {/* Data Protection */}
      <div className="security-card">
        <h3 className="security-section-title">🛡️ Data Protection</h3>

        <div className="security-option-row">
          <div>
            <b>Data Encryption</b>
            <p className="security-text">Encrypt sensitive client data</p>
          </div>
          <select
            className="security-select"
            value={dataEncryption}
            onChange={(e) => setDataEncryption(e.target.value)}
            disabled={loading}
          >
            <option value="Enabled">Enabled</option>
            <option value="Disabled">Disabled</option>
          </select>
        </div>

        <div className="security-option-row">
          <div>
            <b>Audit Logging</b>
            <p className="security-text">Track all user activities</p>
          </div>
          <label className="switch">
            <input
              type="checkbox"
              checked={auditLogging}
              onChange={() => setAuditLogging(!auditLogging)}
              disabled={loading}
            />
            <span className="slider round"></span>
          </label>
        </div>

        <div className="security-option-row">
          <div>
            <b>Data Backup</b>
            <p className="security-text">Automatic daily backups</p>
          </div>
          <select
            className="security-select"
            value={dataBackup}
            onChange={(e) => setDataBackup(e.target.value)}
            disabled={loading}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Save Button */}
      <div className="security-save-row">
        <button
          className="security-save-btn"
          onClick={handleSave}
          disabled={loading}
          style={{ opacity: loading ? 0.6 : 1, cursor: loading ? "not-allowed" : "pointer" }}
        >
          {loading ? "💾 Saving..." : "💾 Save Changes"}
        </button>
      </div>
    </div>
  );
}
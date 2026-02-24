
// import React, { useEffect, useState } from "react";
// import "../Global.css";

// // -------------------------------
// // GLOBAL SUCCESS / ERROR BAR
// // -------------------------------
// function SuccessMessage({ message, type }) {
//   if (!message) return null;
//   return (
//     <div className={type === "error" ? "top-error-bar" : "top-success-bar"}>
//       {message}
//     </div>
//   );
// }

// const API = "https://posthemorrhagic-nonequilaterally-caroline.ngrok-free.dev/api/general-setting";

// export default function General() {
//   const [formData, setFormData] = useState({
//     firmName: "",
//     registrationNumber: "",
//     panNumber: "",
//     gstin: "",
//     firmDescription: "",
//     financialYear: "",
//     currency: "",
//     timezone: "",
//     workingHours: "",
//   });

//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);

//   // success/error bar
//   const [message, setMessage] = useState({ type: "", text: "" });

//   const currencyOptions = ["INR", "USD", "EUR", "GBP"];
//   const timezoneOptions = ["Asia/Kolkata", "UTC", "GMT", "EST"];
//   const workingHoursOptions = [
//     "9:00 AM - 6:00 PM",
//     "10:00 AM - 7:00 PM",
//     "8:00 AM - 5:00 PM",
//   ];

//   // -------------------------------
//   // LOAD EXISTING GENERAL SETTINGS
//   // -------------------------------
//   useEffect(() => {
//     const load = async () => {
//       try {
//         const res = await fetch(API, {
//           method: "GET",
//           headers: {
//             Accept: "application/json",
//             "ngrok-skip-browser-warning": "true",
//           },
//         });

//         const data = await res.json();

//         if (res.ok && data) {
//           setFormData({
//             firmName: data.firmName ?? "",
//             registrationNumber: data.registrationNumber ?? "",
//             panNumber: data.panNumber ?? "",
//             gstin: data.gstin ?? "",
//             firmDescription: data.firmDescription ?? "",
//             financialYear: data.financialYear ?? "",
//             currency: data.currency ?? "",
//             timezone: data.timezone ?? "",
//             workingHours: data.workingHours ?? "",
//           });
//         }
//       } catch (err) {
//         console.error("LOAD ERROR:", err);
//       }
//     };

//     load();
//   }, []);

//   // -------------------------------
//   // VALIDATION
//   // -------------------------------
//   const validateField = (field, value) => {
//     let msg = "";

//     if (!value.trim()) msg = "This field is required.";

//     if (field === "panNumber") {
//       const regex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
//       if (!regex.test(value.toUpperCase())) msg = "Invalid PAN (Format: ABCDE1234F)";
//     }

//     setErrors((prev) => ({ ...prev, [field]: msg }));
//     return msg === "";
//   };

//   const handleChange = (field, value) => {
//     setFormData((p) => ({ ...p, [field]: value }));
//     setErrors((p) => ({ ...p, [field]: "" }));
//     setMessage({ type: "", text: "" });
//   };

//   // -------------------------------
//   // SAVE SETTINGS
//   // -------------------------------
//   const handleSave = async () => {
//     let valid = true;

//     Object.keys(formData).forEach((field) => {
//       if (!validateField(field, formData[field])) valid = false;
//     });

//     if (!valid) return;

//     try {
//       setLoading(true);

//       const res = await fetch(API, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//           "ngrok-skip-browser-warning": "true",
//         },
//         body: JSON.stringify(formData),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         setMessage({ type: "success", text: "General settings saved successfully!" });
//         setTimeout(() => setMessage({ type: "", text: "" }), 3000);
//       } else {
//         setMessage({
//           type: "error",
//           text: data.message || "Failed to save. Try again.",
//         });
//       }
//     } catch (error) {
//       console.error("SAVE ERROR:", error);
//       setMessage({ type: "error", text: "Network error. Try again." });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="general-container">

//       {/* Top Success / Error Bar */}
//       <SuccessMessage message={message.text} type={message.type} />

//       {/* ---------- FIRM INFORMATION ---------- */}
//       <div className="general-card">
//         <h2 className="general-section-title">🏢 Firm Information</h2>

//         <div className="general-row">
//           <div className="general-input-group">
//             <label>Firm Name</label>
//             <input
//               value={formData.firmName}
//               onChange={(e) => handleChange("firmName", e.target.value)}
//               onBlur={(e) => validateField("firmName", e.target.value)}
//             />
//             {errors.firmName && <p className="errorMsg">{errors.firmName}</p>}
//           </div>

//           <div className="general-input-group">
//             <label>Registration Number</label>
//             <input
//               value={formData.registrationNumber}
//               onChange={(e) => handleChange("registrationNumber", e.target.value)}
//               onBlur={(e) => validateField("registrationNumber", e.target.value)}
//             />
//             {errors.registrationNumber && (
//               <p className="errorMsg">{errors.registrationNumber}</p>
//             )}
//           </div>
//         </div>

//         <div className="general-row">
//           <div className="general-input-group">
//             <label>PAN Number</label>
//             <input
//               value={formData.panNumber}
//               onChange={(e) => handleChange("panNumber", e.target.value.toUpperCase())}
//               onBlur={(e) => validateField("panNumber", e.target.value)}
//               placeholder="ABCDE1234F"
//             />
//             {errors.panNumber && <p className="errorMsg">{errors.panNumber}</p>}
//           </div>

//           <div className="general-input-group">
//             <label>GSTIN</label>
//             <input
//               value={formData.gstin}
//               onChange={(e) => handleChange("gstin", e.target.value)}
//               onBlur={(e) => validateField("gstin", e.target.value)}
//             />
//             {errors.gstin && <p className="errorMsg">{errors.gstin}</p>}
//           </div>
//         </div>

//         <div className="general-input-group">
//           <label>Firm Description</label>
//           <textarea
//             value={formData.firmDescription}
//             onChange={(e) => handleChange("firmDescription", e.target.value)}
//             onBlur={(e) => validateField("firmDescription", e.target.value)}
//           />
//           {errors.firmDescription && (
//             <p className="errorMsg">{errors.firmDescription}</p>
//           )}
//         </div>
//       </div>

//       {/* ---------- BUSINESS SETTINGS ---------- */}
//       <div className="general-card">
//         <h2 className="general-section-title">⚙️ Business Settings</h2>

//         <div className="general-row">
//           <div className="general-input-group">
//             <label>Financial Year</label>
//             <input
//               value={formData.financialYear}
//               onChange={(e) => handleChange("financialYear", e.target.value)}
//               onBlur={(e) => validateField("financialYear", e.target.value)}
//             />
//             {errors.financialYear && (
//               <p className="errorMsg">{errors.financialYear}</p>
//             )}
//           </div>

//           <div className="general-input-group">
//             <label>Currency</label>
//             <select
//               value={formData.currency}
//               onChange={(e) => handleChange("currency", e.target.value)}
//               onBlur={(e) => validateField("currency", e.target.value)}
//             >
//               <option value="">Select Currency</option>
//               {currencyOptions.map((c) => (
//                 <option key={c} value={c}>{c}</option>
//               ))}
//             </select>
//             {errors.currency && <p className="errorMsg">{errors.currency}</p>}
//           </div>
//         </div>

//         <div className="general-row">
//           <div className="general-input-group">
//             <label>Timezone</label>
//             <select
//               value={formData.timezone}
//               onChange={(e) => handleChange("timezone", e.target.value)}
//               onBlur={(e) => validateField("timezone", e.target.value)}
//             >
//               <option value="">Select Timezone</option>
//               {timezoneOptions.map((tz) => (
//                 <option key={tz} value={tz}>{tz}</option>
//               ))}
//             </select>
//             {errors.timezone && <p className="errorMsg">{errors.timezone}</p>}
//           </div>

//           <div className="general-input-group">
//             <label>Working Hours</label>
//             <select
//               value={formData.workingHours}
//               onChange={(e) => handleChange("workingHours", e.target.value)}
//               onBlur={(e) => validateField("workingHours", e.target.value)}
//             >
//               <option value="">Select Working Hours</option>
//               {workingHoursOptions.map((wh) => (
//                 <option key={wh} value={wh}>{wh}</option>
//               ))}
//             </select>
//             {errors.workingHours && <p className="errorMsg">{errors.workingHours}</p>}
//           </div>
//         </div>
//       </div>

//       {/* Save */}
//       <div className="general-save-row">
//         <button className="general-save-btn" onClick={handleSave} disabled={loading}>
//           💾 {loading ? "Saving..." : "Save Changes"}
//         </button>
//       </div>
//     </div>
//   );
// }



import React, { useState, useEffect } from "react";

const API_BASE_URL = "https://posthemorrhagic-nonequilaterally-caroline.ngrok-free.dev/api";

export default function General() {
  const [formData, setFormData] = useState({
    firmName: "",
    registrationNumber: "",
    panNumber: "",
    gstin: "",
    firmDescription: "",
    financialYear: "",
    currency: "Indian Rupee (₹)",
    timezone: "Asia/Kolkata",
    workingHours: "9:00 AM - 6:00 PM"
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    fetchFirmSettings();
  }, []);

  const fetchFirmSettings = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/general-setting`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "ngrok-skip-browser-warning": "true"
        }
      });
      
      console.log("Fetch Response Status:", response.status);
      
      if (response.ok) {
        const text = await response.text();
        console.log("Raw response text:", text);
        
        try {
          const data = JSON.parse(text);
          console.log("Fetched firm data:", data);
          setFormData({
            firmName: data.firmName || "",
            registrationNumber: data.registrationNumber || "",
            panNumber: data.panNumber || "",
            gstin: data.gstin || "",
            firmDescription: data.firmDescription || "",
            financialYear: data.financialYear || "",
            currency: data.currency || "Indian Rupee (₹)",
            timezone: data.timezone || "Asia/Kolkata",
            workingHours: data.workingHours || "9:00 AM - 6:00 PM"
          });
          setMessage({ type: "", text: "" });
          setErrors({});
        } catch (parseError) {
          console.error("Failed to parse JSON response:", parseError);
          console.log("Response was:", text.substring(0, 500));
          setMessage({ 
            type: "error", 
            text: "API returned invalid JSON. Check backend configuration." 
          });
        }
      } else {
        console.log("Response not ok. Status:", response.status);
        const errorText = await response.text();
        console.log("Error response:", errorText.substring(0, 500));
        setMessage({ 
          type: "error", 
          text: `API error: ${response.status}` 
        });
      }
    } catch (error) {
      console.error("Error fetching firm settings:", error);
      setMessage({ 
        type: "error", 
        text: "Failed to load firm settings. Please try again." 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Real-time validation - remove error as user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firmName.trim()) {
      newErrors.firmName = "Firm Name is required";
    }
    if (!formData.registrationNumber.trim()) {
      newErrors.registrationNumber = "Registration Number is required";
    }
    if (!formData.panNumber.trim()) {
      newErrors.panNumber = "PAN Number is required";
    }
    if (!formData.gstin.trim()) {
      newErrors.gstin = "GSTIN is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setSaving(true);
      const payload = {
        firmName: formData.firmName,
        registrationNumber: formData.registrationNumber,
        panNumber: formData.panNumber,
        gstin: formData.gstin,
        firmDescription: formData.firmDescription,
        financialYear: formData.financialYear,
        currency: formData.currency,
        timezone: formData.timezone,
        workingHours: formData.workingHours
      };

      const response = await fetch(`${API_BASE_URL}/general-setting`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "ngrok-skip-browser-warning": "true"
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const data = await response.json();
        setMessage({ 
          type: "success", 
          text: "Firm settings saved successfully!" 
        });
        setErrors({});
        setTimeout(() => setMessage({ type: "", text: "" }), 3000);
      } else {
        const errorData = await response.json().catch(() => ({}));
        setMessage({ 
          type: "error", 
          text: errorData.message || "Failed to save firm settings" 
        });
      }
    } catch (error) {
      console.error("Error saving firm settings:", error);
      setMessage({ 
        type: "error", 
        text: "Error saving firm settings. Please try again." 
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div style={styles.generalContainer}>
        <div style={styles.loadingMessage}>Loading firm settings...</div>
      </div>
    );
  }

  return (
    <div style={styles.generalContainer}>
      {message.text && (
        <div style={{
          ...styles.message,
          backgroundColor: message.type === "success" ? "#d4edda" : "#f8d7da",
          color: message.type === "success" ? "#155724" : "#721c24",
          borderColor: message.type === "success" ? "#c3e6cb" : "#f5c6cb"
        }}>
          {message.type === "success" && "✅ "}
          {message.type === "error" && "❌ "}
          {message.text}
        </div>
      )}

      <div style={styles.generalCard}>
        <h2 style={styles.generalSectionTitle}>🏢 Firm Information</h2>

        <div style={styles.generalRow}>
          <div style={styles.generalInputGroup}>
            <label style={styles.label}>
              Firm Name 
              {errors.firmName && <span style={styles.requiredMarker}>*</span>}
            </label>
            <input 
              type="text" 
              name="firmName"
              value={formData.firmName}
              onChange={handleInputChange}
              placeholder="Enter firm name"
              style={{
                ...styles.input,
                ...(errors.firmName ? styles.inputError : {}),
              }}
              onMouseEnter={(e) => {
                if (errors.firmName) {
                  e.target.style.borderColor = '#c82333';
                  e.target.style.boxShadow = '0 0 8px rgba(220, 53, 69, 0.3)';
                }
              }}
              onMouseLeave={(e) => {
                if (errors.firmName) {
                  e.target.style.borderColor = '#dc3545';
                  e.target.style.boxShadow = 'none';
                }
              }}
            />
            {errors.firmName && <span style={styles.errorText}>{errors.firmName}</span>}
          </div>
          <div style={styles.generalInputGroup}>
            <label style={styles.label}>
              Registration Number 
              {errors.registrationNumber && <span style={styles.requiredMarker}>*</span>}
            </label>
            <input 
              type="text" 
              name="registrationNumber"
              value={formData.registrationNumber}
              onChange={handleInputChange}
              placeholder="Enter registration number"
              style={{
                ...styles.input,
                ...(errors.registrationNumber ? styles.inputError : {}),
              }}
              onMouseEnter={(e) => {
                if (errors.registrationNumber) {
                  e.target.style.borderColor = '#c82333';
                  e.target.style.boxShadow = '0 0 8px rgba(220, 53, 69, 0.3)';
                }
              }}
              onMouseLeave={(e) => {
                if (errors.registrationNumber) {
                  e.target.style.borderColor = '#dc3545';
                  e.target.style.boxShadow = 'none';
                }
              }}
            />
            {errors.registrationNumber && <span style={styles.errorText}>{errors.registrationNumber}</span>}
          </div>
        </div>

        <div style={styles.generalRow}>
          <div style={styles.generalInputGroup}>
            <label style={styles.label}>
              PAN Number 
              {errors.panNumber && <span style={styles.requiredMarker}>*</span>}
            </label>
            <input 
              type="text" 
              name="panNumber"
              value={formData.panNumber}
              onChange={handleInputChange}
              placeholder="Enter PAN number"
              style={{
                ...styles.input,
                ...(errors.panNumber ? styles.inputError : {}),
              }}
              onMouseEnter={(e) => {
                if (errors.panNumber) {
                  e.target.style.borderColor = '#c82333';
                  e.target.style.boxShadow = '0 0 8px rgba(220, 53, 69, 0.3)';
                }
              }}
              onMouseLeave={(e) => {
                if (errors.panNumber) {
                  e.target.style.borderColor = '#dc3545';
                  e.target.style.boxShadow = 'none';
                }
              }}
            />
            {errors.panNumber && <span style={styles.errorText}>{errors.panNumber}</span>}
          </div>
          <div style={styles.generalInputGroup}>
            <label style={styles.label}>
              GSTIN 
              {errors.gstin && <span style={styles.requiredMarker}>*</span>}
            </label>
            <input 
              type="text" 
              name="gstin"
              value={formData.gstin}
              onChange={handleInputChange}
              placeholder="Enter GSTIN"
              style={{
                ...styles.input,
                ...(errors.gstin ? styles.inputError : {}),
              }}
              onMouseEnter={(e) => {
                if (errors.gstin) {
                  e.target.style.borderColor = '#c82333';
                  e.target.style.boxShadow = '0 0 8px rgba(220, 53, 69, 0.3)';
                }
              }}
              onMouseLeave={(e) => {
                if (errors.gstin) {
                  e.target.style.borderColor = '#dc3545';
                  e.target.style.boxShadow = 'none';
                }
              }}
            />
            {errors.gstin && <span style={styles.errorText}>{errors.gstin}</span>}
          </div>
        </div>

        <div style={styles.generalInputGroup}>
          <label style={styles.label}>Firm Description</label>
          <textarea 
            name="firmDescription"
            value={formData.firmDescription}
            onChange={handleInputChange}
            placeholder="Enter firm description"
            style={styles.textarea}
          />
        </div>
      </div>

      <div style={styles.generalCard}>
        <h2 style={styles.generalSectionTitle}>⚙️ Business Settings</h2>

        <div style={styles.generalRow}>
          <div style={styles.generalInputGroup}>
            <label style={styles.label}>Financial Year</label>
            <input 
              type="text" 
              name="financialYear"
              value={formData.financialYear}
              onChange={handleInputChange}
              placeholder="e.g., 2024-25"
              style={styles.input}
            />
          </div>
          <div style={styles.generalInputGroup}>
            <label style={styles.label}>Currency</label>
            <select 
              name="currency"
              value={formData.currency}
              onChange={handleInputChange}
              style={styles.select}
            >
              <option>Indian Rupee (₹)</option>
              <option>USD ($)</option>
              <option>EUR (€)</option>
            </select>
          </div>
        </div>

        <div style={styles.generalRow}>
          <div style={styles.generalInputGroup}>
            <label style={styles.label}>Timezone</label>
            <select 
              name="timezone"
              value={formData.timezone}
              onChange={handleInputChange}
              style={styles.select}
            >
              <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
              <option value="UTC">UTC</option>
              <option value="America/New_York">America/New_York (EST)</option>
            </select>
          </div>
          <div style={styles.generalInputGroup}>
            <label style={styles.label}>Working Hours</label>
            <select 
              name="workingHours"
              value={formData.workingHours}
              onChange={handleInputChange}
              style={styles.select}
            >
              <option>9:00 AM - 6:00 PM</option>
              <option>10:00 AM - 7:00 PM</option>
              <option>8:00 AM - 5:00 PM</option>
            </select>
          </div>
        </div>
      </div>

      <div style={styles.generalSaveRow}>
        <button 
          style={{
            ...styles.generalSaveBtn,
            opacity: saving ? 0.6 : 1,
            cursor: saving ? 'not-allowed' : 'pointer'
          }}
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? "💾 Saving..." : "💾 Save Changes"}
        </button>
      </div>
    </div>
  );
}

const styles = {
  generalContainer: {
    fontFamily: "Arial, sans-serif",
    width: "96%",
    margin: "12px auto",
    maxWidth: "1200px"
  },
  message: {
    padding: "12px 16px",
    marginBottom: "16px",
    borderRadius: "6px",
    border: "1px solid",
    fontSize: "14px",
    fontWeight: "500"
  },
  loadingMessage: {
    padding: "20px",
    textAlign: "center",
    color: "#666",
    fontSize: "16px"
  },
  generalCard: {
    background: "#fff",
    border: "1px solid #eee",
    borderRadius: "8px",
    padding: "20px",
    marginBottom: "20px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.05)"
  },
  generalSectionTitle: {
    marginBottom: "15px",
    fontSize: "18px",
    fontWeight: "bold",
    color: "#333"
  },
  generalRow: {
    display: "flex",
    gap: "20px",
    marginBottom: "16px"
  },
  generalInputGroup: {
    flex: 1,
    display: "flex",
    flexDirection: "column"
  },
  label: {
    display: "block",
    marginBottom: "6px",
    fontSize: "14px",
    fontWeight: "bold",
    color: "#333"
  },
  requiredMarker: {
    color: "#dc3545",
    fontWeight: "bold",
    marginLeft: "2px"
  },
  input: {
    padding: "10px 12px",
    border: "2px solid #ddd",
    borderRadius: "6px",
    fontSize: "14px",
    fontFamily: "Arial, sans-serif",
    transition: "all 0.2s ease"
  },
  inputError: {
    borderColor: "#dc3545",
    backgroundColor: "#fff5f5",
    border: "2px solid #dc3545"
  },
  textarea: {
    padding: "10px 12px",
    border: "2px solid #ddd",
    borderRadius: "6px",
    fontSize: "14px",
    fontFamily: "Arial, sans-serif",
    minHeight: "100px",
    resize: "vertical",
    transition: "all 0.2s ease"
  },
  select: {
    padding: "10px 12px",
    border: "2px solid #ddd",
    borderRadius: "6px",
    fontSize: "14px",
    backgroundColor: "#fff",
    cursor: "pointer",
    transition: "all 0.2s ease"
  },
  errorText: {
    display: "block",
    color: "#dc3545",
    fontSize: "12px",
    marginTop: "4px",
    fontWeight: "500"
  },
  generalSaveRow: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "24px"
  },
  generalSaveBtn: {
    background: "#073D7F",
    color: "#fff",
    padding: "12px 24px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    transition: "background 0.2s ease"
  }
};
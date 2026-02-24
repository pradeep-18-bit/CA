
// import React, { useState, useEffect } from "react";
// import "./Global.css";

// const API = "https://posthemorrhagic-nonequilaterally-caroline.ngrok-free.dev/api/contact-setting";

// export default function Contact() {
//   const [formData, setFormData] = useState({
//     streetAddress: "",
//     city: "",
//     state: "",
//     pinCode: "",
//     primaryPhone: "",
//     secondaryPhone: "",
//     primaryEmail: "",
//     supportEmail: "",
//     website: ""
//   });

//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [message, setMessage] = useState("");

//   // -------------------------------
//   // LOAD CONTACT SETTINGS FROM BACKEND
//   // -------------------------------
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await fetch(API, {
//           method: "GET",
//           headers: {
//             Accept: "application/json",
//             "ngrok-skip-browser-warning": "true"
//           }
//         });

//         if (res.ok) {
//           const data = await res.json();
//           setFormData({
//             streetAddress: data.streetAddress || "",
//             city: data.city || "",
//             state: data.state || "",
//             pinCode: data.pinCode || "",
//             primaryPhone: data.primaryPhone || "",
//             secondaryPhone: data.secondaryPhone || "",
//             primaryEmail: data.primaryEmail || "",
//             supportEmail: data.supportEmail || "",
//             website: data.website || ""
//           });
//         }
//       } catch (error) {
//         console.error("LOAD ERROR:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   // -------------------------------
//   // VALIDATION
//   // -------------------------------
//   const validateField = (field, value) => {
//     let error = "";

//     if (!value.trim()) error = "This field is required.";

//     if (field === "primaryEmail" || field === "supportEmail") {
//       if (value.trim()) {
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         if (!emailRegex.test(value)) error = "Invalid email format";
//       }
//     }

//     setErrors((prev) => ({ ...prev, [field]: error }));
//     return error === "";
//   };

//   // Hide error while typing
//   const handleChange = (field, value) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//     setErrors((prev) => ({ ...prev, [field]: "" }));
//   };

//   // -------------------------------
//   // SAVE CONTACT SETTINGS
//   // -------------------------------
//   const handleSave = async () => {
//     let valid = true;

//     Object.keys(formData).forEach((field) => {
//       if (!validateField(field, formData[field])) valid = false;
//     });

//     if (!valid) return;

//     try {
//       setSaving(true);

//       const res = await fetch(API, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//           "ngrok-skip-browser-warning": "true"
//         },
//         body: JSON.stringify(formData)
//       });

//       if (res.ok) {
//         setMessage("✅ Saved Successfully!");
//         setTimeout(() => setMessage(""), 3000);
//       } else {
//         setMessage("❌ Failed to save");
//       }

//     } catch (error) {
//       console.error("SAVE ERROR:", error);
//       setMessage("❌ Error saving data");
//     } finally {
//       setSaving(false);
//     }
//   };

//   if (loading) return <h3 style={{ padding: 20 }}>Loading contact settings...</h3>;

//   return (
//     <div className="filmcontact-container">

//       {/* SUCCESS / ERROR MESSAGE */}
//       {message && (
//         <div style={{
//           background: message.includes("❌") ? "#ffdddd" : "#ddffdd",
//           padding: "10px",
//           marginBottom: "15px",
//           borderRadius: "6px",
//           color: message.includes("❌") ? "red" : "green"
//         }}>
//           {message}
//         </div>
//       )}

//       {/* --------------------- OFFICE ADDRESS --------------------- */}
//       <div className="filmcontact-card">
//         <h2 className="filmcontact-section-title">📍 Office Address</h2>

//         <div className="filmcontact-input-group">
//           <label>Street Address *</label>
//           <textarea
//             value={formData.streetAddress}
//             onChange={(e) => handleChange("streetAddress", e.target.value)}
//             onBlur={(e) => validateField("streetAddress", e.target.value)}
//           />
//           {errors.streetAddress && (
//             <p style={{ color: "red", marginTop: 4 }}>{errors.streetAddress}</p>
//           )}
//         </div>

//         <div className="filmcontact-row">
//           <div className="filmcontact-input-group">
//             <label>City *</label>
//             <input
//               value={formData.city}
//               onChange={(e) => handleChange("city", e.target.value)}
//               onBlur={(e) => validateField("city", e.target.value)}
//             />
//             {errors.city && <p style={{ color: "red" }}>{errors.city}</p>}
//           </div>

//           <div className="filmcontact-input-group">
//             <label>State *</label>
//             <input
//               value={formData.state}
//               onChange={(e) => handleChange("state", e.target.value)}
//               onBlur={(e) => validateField("state", e.target.value)}
//             />
//             {errors.state && <p style={{ color: "red" }}>{errors.state}</p>}
//           </div>

//           <div className="filmcontact-input-group">
//             <label>PIN Code *</label>
//             <input
//               value={formData.pinCode}
//               onChange={(e) => handleChange("pinCode", e.target.value)}
//               onBlur={(e) => validateField("pinCode", e.target.value)}
//             />
//             {errors.pinCode && <p style={{ color: "red" }}>{errors.pinCode}</p>}
//           </div>
//         </div>
//       </div>

//       {/* --------------------- CONTACT INFORMATION --------------------- */}
//       <div className="filmcontact-card">
//         <h2 className="filmcontact-section-title">📞 Contact Information</h2>

//         <div className="filmcontact-row">
//           <div className="filmcontact-input-group">
//             <label>Primary Phone *</label>
//             <input
//               value={formData.primaryPhone}
//               onChange={(e) => handleChange("primaryPhone", e.target.value)}
//               onBlur={(e) => validateField("primaryPhone", e.target.value)}
//             />
//             {errors.primaryPhone && <p style={{ color: "red" }}>{errors.primaryPhone}</p>}
//           </div>

//           <div className="filmcontact-input-group">
//             <label>Secondary Phone</label>
//             <input
//               value={formData.secondaryPhone}
//               onChange={(e) => handleChange("secondaryPhone", e.target.value)}
//             />
//           </div>
//         </div>

//         <div className="filmcontact-row">
//           <div className="filmcontact-input-group">
//             <label>Primary Email *</label>
//             <input
//               value={formData.primaryEmail}
//               onChange={(e) => handleChange("primaryEmail", e.target.value)}
//               onBlur={(e) => validateField("primaryEmail", e.target.value)}
//             />
//             {errors.primaryEmail && <p style={{ color: "red" }}>{errors.primaryEmail}</p>}
//           </div>

//           <div className="filmcontact-input-group">
//             <label>Support Email</label>
//             <input
//               value={formData.supportEmail}
//               onChange={(e) => handleChange("supportEmail", e.target.value)}
//               onBlur={(e) => validateField("supportEmail", e.target.value)}
//             />
//             {errors.supportEmail && <p style={{ color: "red" }}>{errors.supportEmail}</p>}
//           </div>
//         </div>

//         <div className="filmcontact-input-group">
//           <label>Website</label>
//           <input
//             value={formData.website}
//             onChange={(e) => handleChange("website", e.target.value)}
//           />
//         </div>
//       </div>

//       {/* SAVE BUTTON */}
//       <div className="filmcontact-save-row">
//         <button
//           className="filmcontact-save-btn"
//           onClick={handleSave}
//           disabled={saving}
//         >
//           {saving ? "💾 Saving..." : "💾 Save Changes"}
//         </button>
//       </div>
//     </div>
//   );
// }



import React, { useState, useEffect } from "react";

const API = "https://posthemorrhagic-nonequilaterally-caroline.ngrok-free.dev/api/contact-setting";

export default function Contact() {
  const [formData, setFormData] = useState({
    streetAddress: "",
    city: "",
    state: "",
    pinCode: "",
    primaryPhone: "",
    secondaryPhone: "",
    primaryEmail: "",
    supportEmail: "",
    website: ""
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  // Required fields list
  const requiredFields = ["streetAddress", "city", "state", "pinCode", "primaryPhone", "primaryEmail"];

  // Load contact settings from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(API, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "ngrok-skip-browser-warning": "true"
          }
        });

        if (res.ok) {
          const data = await res.json();
          setFormData({
            streetAddress: data.streetAddress || "",
            city: data.city || "",
            state: data.state || "",
            pinCode: data.pinCode || "",
            primaryPhone: data.primaryPhone || "",
            secondaryPhone: data.secondaryPhone || "",
            primaryEmail: data.primaryEmail || "",
            supportEmail: data.supportEmail || "",
            website: data.website || ""
          });
        }
      } catch (error) {
        console.error("LOAD ERROR:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Validation
  const validateField = (field, value) => {
    let error = "";

    if (!value.trim()) {
      error = `${getFieldLabel(field)} is required`;
    } else if (field === "primaryEmail" || field === "supportEmail") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        error = `Invalid email format`;
      }
    }

    setErrors((prev) => ({ ...prev, [field]: error }));
    return error === "";
  };

  const getFieldLabel = (field) => {
    const labels = {
      streetAddress: "Street Address",
      city: "City",
      state: "State",
      pinCode: "PIN Code",
      primaryPhone: "Primary Phone",
      secondaryPhone: "Secondary Phone",
      primaryEmail: "Primary Email",
      supportEmail: "Support Email",
      website: "Website"
    };
    return labels[field] || field;
  };

  // Hide error while typing
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  // Save contact settings
  const handleSave = async () => {
    let valid = true;

    Object.keys(formData).forEach((field) => {
      if (!validateField(field, formData[field])) valid = false;
    });

    if (!valid) return;

    try {
      setSaving(true);

      const res = await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "ngrok-skip-browser-warning": "true"
        },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setMessage("✅ Saved Successfully!");
        setErrors({});
        setTimeout(() => setMessage(""), 3000);
      } else {
        setMessage("❌ Failed to save");
      }

    } catch (error) {
      console.error("SAVE ERROR:", error);
      setMessage("❌ Error saving data");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <h3 style={{ padding: 20 }}>Loading contact settings...</h3>;

  return (
    <div style={styles.container}>

      {/* SUCCESS / ERROR MESSAGE */}
      {message && (
        <div style={{
          ...styles.messageBox,
          backgroundColor: message.includes("❌") ? "#f8d7da" : "#d4edda",
          color: message.includes("❌") ? "#721c24" : "#155724",
          borderColor: message.includes("❌") ? "#f5c6cb" : "#c3e6cb"
        }}>
          {message}
        </div>
      )}

      {/* OFFICE ADDRESS */}
      <div style={styles.card}>
        <h2 style={styles.sectionTitle}>📍 Office Address</h2>

        <div style={styles.inputGroup}>
          <label style={styles.label}>
            Street Address 
            {errors.streetAddress && <span style={styles.requiredMarker}>*</span>}
          </label>
          <textarea
            value={formData.streetAddress}
            onChange={(e) => handleChange("streetAddress", e.target.value)}
            onBlur={(e) => validateField("streetAddress", e.target.value)}
            style={{
              ...styles.textarea,
              ...(errors.streetAddress ? styles.inputError : {}),
            }}
            onMouseEnter={(e) => {
              if (errors.streetAddress) {
                e.target.style.borderColor = '#c82333';
                e.target.style.boxShadow = '0 0 8px rgba(220, 53, 69, 0.3)';
              }
            }}
            onMouseLeave={(e) => {
              if (errors.streetAddress) {
                e.target.style.borderColor = '#dc3545';
                e.target.style.boxShadow = 'none';
              }
            }}
          />
          {errors.streetAddress && (
            <span style={styles.errorText}>{errors.streetAddress}</span>
          )}
        </div>

        <div style={styles.row}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>
              City 
              {errors.city && <span style={styles.requiredMarker}>*</span>}
            </label>
            <input
              value={formData.city}
              onChange={(e) => handleChange("city", e.target.value)}
              onBlur={(e) => validateField("city", e.target.value)}
              style={{
                ...styles.input,
                ...(errors.city ? styles.inputError : {}),
              }}
              onMouseEnter={(e) => {
                if (errors.city) {
                  e.target.style.borderColor = '#c82333';
                  e.target.style.boxShadow = '0 0 8px rgba(220, 53, 69, 0.3)';
                }
              }}
              onMouseLeave={(e) => {
                if (errors.city) {
                  e.target.style.borderColor = '#dc3545';
                  e.target.style.boxShadow = 'none';
                }
              }}
            />
            {errors.city && <span style={styles.errorText}>{errors.city}</span>}
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>
              State 
              {errors.state && <span style={styles.requiredMarker}>*</span>}
            </label>
            <input
              value={formData.state}
              onChange={(e) => handleChange("state", e.target.value)}
              onBlur={(e) => validateField("state", e.target.value)}
              style={{
                ...styles.input,
                ...(errors.state ? styles.inputError : {}),
              }}
              onMouseEnter={(e) => {
                if (errors.state) {
                  e.target.style.borderColor = '#c82333';
                  e.target.style.boxShadow = '0 0 8px rgba(220, 53, 69, 0.3)';
                }
              }}
              onMouseLeave={(e) => {
                if (errors.state) {
                  e.target.style.borderColor = '#dc3545';
                  e.target.style.boxShadow = 'none';
                }
              }}
            />
            {errors.state && <span style={styles.errorText}>{errors.state}</span>}
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>
              PIN Code 
              {errors.pinCode && <span style={styles.requiredMarker}>*</span>}
            </label>
            <input
              value={formData.pinCode}
              onChange={(e) => handleChange("pinCode", e.target.value)}
              onBlur={(e) => validateField("pinCode", e.target.value)}
              style={{
                ...styles.input,
                ...(errors.pinCode ? styles.inputError : {}),
              }}
              onMouseEnter={(e) => {
                if (errors.pinCode) {
                  e.target.style.borderColor = '#c82333';
                  e.target.style.boxShadow = '0 0 8px rgba(220, 53, 69, 0.3)';
                }
              }}
              onMouseLeave={(e) => {
                if (errors.pinCode) {
                  e.target.style.borderColor = '#dc3545';
                  e.target.style.boxShadow = 'none';
                }
              }}
            />
            {errors.pinCode && <span style={styles.errorText}>{errors.pinCode}</span>}
          </div>
        </div>
      </div>

      {/* CONTACT INFORMATION */}
      <div style={styles.card}>
        <h2 style={styles.sectionTitle}>📞 Contact Information</h2>

        <div style={styles.row}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>
              Primary Phone 
              {errors.primaryPhone && <span style={styles.requiredMarker}>*</span>}
            </label>
            <input
              value={formData.primaryPhone}
              onChange={(e) => handleChange("primaryPhone", e.target.value)}
              onBlur={(e) => validateField("primaryPhone", e.target.value)}
              style={{
                ...styles.input,
                ...(errors.primaryPhone ? styles.inputError : {}),
              }}
              onMouseEnter={(e) => {
                if (errors.primaryPhone) {
                  e.target.style.borderColor = '#c82333';
                  e.target.style.boxShadow = '0 0 8px rgba(220, 53, 69, 0.3)';
                }
              }}
              onMouseLeave={(e) => {
                if (errors.primaryPhone) {
                  e.target.style.borderColor = '#dc3545';
                  e.target.style.boxShadow = 'none';
                }
              }}
            />
            {errors.primaryPhone && <span style={styles.errorText}>{errors.primaryPhone}</span>}
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Secondary Phone</label>
            <input
              value={formData.secondaryPhone}
              onChange={(e) => handleChange("secondaryPhone", e.target.value)}
              style={styles.input}
            />
          </div>
        </div>

        <div style={styles.row}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>
              Primary Email 
              {errors.primaryEmail && <span style={styles.requiredMarker}>*</span>}
            </label>
            <input
              value={formData.primaryEmail}
              onChange={(e) => handleChange("primaryEmail", e.target.value)}
              onBlur={(e) => validateField("primaryEmail", e.target.value)}
              style={{
                ...styles.input,
                ...(errors.primaryEmail ? styles.inputError : {}),
              }}
              onMouseEnter={(e) => {
                if (errors.primaryEmail) {
                  e.target.style.borderColor = '#c82333';
                  e.target.style.boxShadow = '0 0 8px rgba(220, 53, 69, 0.3)';
                }
              }}
              onMouseLeave={(e) => {
                if (errors.primaryEmail) {
                  e.target.style.borderColor = '#dc3545';
                  e.target.style.boxShadow = 'none';
                }
              }}
            />
            {errors.primaryEmail && <span style={styles.errorText}>{errors.primaryEmail}</span>}
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>
              Support Email
              {errors.supportEmail && <span style={styles.requiredMarker}>*</span>}
            </label>
            <input
              value={formData.supportEmail}
              onChange={(e) => handleChange("supportEmail", e.target.value)}
              onBlur={(e) => validateField("supportEmail", e.target.value)}
              style={{
                ...styles.input,
                ...(errors.supportEmail ? styles.inputError : {}),
              }}
              onMouseEnter={(e) => {
                if (errors.supportEmail) {
                  e.target.style.borderColor = '#c82333';
                  e.target.style.boxShadow = '0 0 8px rgba(220, 53, 69, 0.3)';
                }
              }}
              onMouseLeave={(e) => {
                if (errors.supportEmail) {
                  e.target.style.borderColor = '#dc3545';
                  e.target.style.boxShadow = 'none';
                }
              }}
            />
            {errors.supportEmail && <span style={styles.errorText}>{errors.supportEmail}</span>}
          </div>
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Website</label>
          <input
            value={formData.website}
            onChange={(e) => handleChange("website", e.target.value)}
            style={styles.input}
          />
        </div>
      </div>

      {/* SAVE BUTTON */}
      <div style={styles.saveRow}>
        <button
          style={{
            ...styles.saveBtn,
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
  container: {
    fontFamily: "Arial, sans-serif",
    color: "#1a1a1a",
    width: "100%",
    maxWidth: "1200px",
    margin: "10px auto",
    padding: "0 12px"
  },
  messageBox: {
    padding: "12px 16px",
    marginBottom: "16px",
    borderRadius: "6px",
    border: "1px solid",
    fontSize: "14px",
    fontWeight: "500"
  },
  card: {
    border: "1px solid #eee",
    borderRadius: "10px",
    padding: "20px",
    marginBottom: "20px",
    background: "#fff",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)"
  },
  sectionTitle: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "18px",
    color: "#222"
  },
  row: {
    display: "flex",
    gap: "20px",
    marginBottom: "18px",
    flexWrap: "wrap"
  },
  inputGroup: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    minWidth: "250px",
    marginBottom: "18px"
  },
  label: {
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
    padding: "10px",
    border: "2px solid #ddd",
    borderRadius: "6px",
    fontSize: "14px",
    background: "#fafafa",
    transition: "all 0.2s ease",
    fontFamily: "Arial, sans-serif"
  },
  textarea: {
    padding: "10px",
    border: "2px solid #ddd",
    borderRadius: "6px",
    fontSize: "14px",
    background: "#fafafa",
    resize: "vertical",
    minHeight: "100px",
    transition: "all 0.2s ease",
    fontFamily: "Arial, sans-serif"
  },
  inputError: {
    borderColor: "#dc3545",
    backgroundColor: "#fff5f5",
    border: "2px solid #dc3545"
  },
  errorText: {
    display: "block",
    color: "#dc3545",
    fontSize: "12px",
    marginTop: "4px",
    fontWeight: "500"
  },
  saveRow: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "10px"
  },
  saveBtn: {
    background: "#073d7f",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    fontSize: "14px",
    fontWeight: "bold",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background 0.2s ease-in-out"
  }
};
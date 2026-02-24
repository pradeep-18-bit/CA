
// import React, { useState, useEffect } from "react";
// import "./Global.css";

// function SuccessMessage({ message, type }) {
//   if (!message) return null;
//   return (
//     <div className={type === "error" ? "top-error-bar" : "top-success-bar"}>
//       {message}
//     </div>
//   );
// }

// export default function Branding() {
//   const API =
//     "https://posthemorrhagic-nonequilaterally-caroline.ngrok-free.dev/api/branding-setting";

//   const BASE_URL =
//     "https://posthemorrhagic-nonequilaterally-caroline.ngrok-free.dev";

//   const [logoFile, setLogoFile] = useState(null);
//   const [logoPreview, setLogoPreview] = useState(null);

//   const [primaryColor, setPrimaryColor] = useState("");
//   const [secondaryColor, setSecondaryColor] = useState("");
//   const [letterheadTemplate, setLetterheadTemplate] = useState("");
//   const [invoiceTemplate, setInvoiceTemplate] = useState("");

//   const [errors, setErrors] = useState({});
//   const [saving, setSaving] = useState(false);
//   const [msg, setMsg] = useState(null);

//   // FIELD VALUES MAP (replaces eval)
//   const fieldValues = {
//     primaryColor,
//     secondaryColor,
//     letterheadTemplate,
//     invoiceTemplate,
//   };

//   // -------------------------------------------------------------
//   // LOAD BRANDING SETTINGS (GET)
//   // -------------------------------------------------------------
//   useEffect(() => {
//   const loadBranding = async () => {
//     try {
//       const res = await fetch(API, {
//         method: "GET",
//         headers: {
//           Accept: "application/json",
//           "ngrok-skip-browser-warning": "true",
//         },
//       });

//       if (res.ok) {
//         const data = await res.json();

//         setPrimaryColor(data.primaryColor || "");
//         setSecondaryColor(data.secondaryColor || "");
//         setLetterheadTemplate(data.letterheadTemplate || "");
//         setInvoiceTemplate(data.invoiceTemplate || "");

//         // ---------- FIXED IMAGE HANDLING ----------
//         if (data.firmLogoUrl) {
//           let fixedUrl = data.firmLogoUrl;

//           // If backend returns relative path → build correct absolute URL
//           if (!fixedUrl.startsWith("http")) {
//             fixedUrl = `${BASE_URL}${fixedUrl.startsWith("/") ? "" : "/"}${fixedUrl}`;
//           }

//           setLogoPreview(fixedUrl);
//         } else {
//           setLogoPreview(null);
//         }
//       }
//     } catch (err) {
//       console.error("Failed to load branding:", err);
//     }
//   };

//   loadBranding();
// }, []);


//   // -------------------------------------------------------------
//   // VALIDATION
//   // -------------------------------------------------------------
//   const validateField = (field, value) => {
//     let error = "";

//     if (!value && field !== "logoFile") {
//       error = "This field is required.";
//     }

//     if (field === "logoFile" && !logoPreview && !logoFile) {
//       error = "Please upload your logo.";
//     }

//     setErrors((prev) => ({ ...prev, [field]: error }));
//     return error === "";
//   };

//   // -------------------------------------------------------------
//   // LOGO UPLOAD HANDLER
//   // -------------------------------------------------------------
//   const handleLogoChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     if (!["image/png", "image/jpeg"].includes(file.type)) {
//       setErrors((prev) => ({
//         ...prev,
//         logoFile: "Only PNG / JPG allowed.",
//       }));
//       return;
//     }

//     if (file.size > 2 * 1024 * 1024) {
//       setErrors((prev) => ({
//         ...prev,
//         logoFile: "Max size allowed: 2MB.",
//       }));
//       return;
//     }

//     setLogoFile(file);
//     setLogoPreview(URL.createObjectURL(file)); // ⭐ Instant preview
//     setErrors((prev) => ({ ...prev, logoFile: "" }));
//   };

//   // -------------------------------------------------------------
//   // SAVE BRANDING SETTINGS (POST)
//   // -------------------------------------------------------------
//   const handleSave = async () => {
//     let valid = true;

//     ["primaryColor", "secondaryColor", "letterheadTemplate", "invoiceTemplate"].forEach(
//       (field) => {
//         if (!validateField(field, fieldValues[field])) valid = false;
//       }
//     );

//     if (!logoPreview && !logoFile) {
//       validateField("logoFile", null);
//       valid = false;
//     }

//     if (!valid) return;

//     const formData = new FormData();

//     if (logoFile) {
//       formData.append("FirmLogoFile", logoFile);
//     }

//     formData.append("PrimaryColor", primaryColor);
//     formData.append("SecondaryColor", secondaryColor);
//     formData.append("LetterheadTemplate", letterheadTemplate);
//     formData.append("InvoiceTemplate", invoiceTemplate);

//     setSaving(true);
//     setMsg(null);

//     try {
//       const res = await fetch(API, {
//         method: "POST",
//         headers: {
//           "ngrok-skip-browser-warning": "true",
//         },
//         body: formData,
//       });

//       const data = await res.json();

//       if (res.ok) {
//         // ⭐ Update preview after saving
//        // ⭐ Always show logo returned from GET API
//          if (data.firmLogoUrl) {
//   const fixedUrl = data.firmLogoUrl.startsWith("http")
//     ? data.firmLogoUrl
//     : `${BASE_URL}${data.firmLogoUrl}`;

//   setLogoPreview(fixedUrl);
// }



//         setMsg({ type: "success", text: "Branding settings saved successfully!" });
//       } else {
//         setMsg({
//           type: "error",
//           text: data.message || "Failed to save branding",
//         });
//       }
//     } catch (err) {
//       setMsg({ type: "error", text: "Network error, try again." });
//     }

//     setSaving(false);
//   };

//   return (
//     <div className="container">
//       <SuccessMessage message={msg?.text} type={msg?.type} />

//       <div className="card">
//         <h3 className="sectionTitle">🌐 Firm Branding</h3>

//         {/* LOGO UPLOAD */}
//         <div className="formGroup">
//           <label className="label">Upload Logo</label>

//           <div className="logoRow">
//             <div className="logoBox">
//               {logoPreview ? (
//                 <img src={logoPreview} alt="Firm Logo" className="logoPreview" />
//               ) : (
//                 <span className="logoIcon">📄</span>
//               )}
//             </div>

//             <div>
//               <input
//                 type="file"
//                 id="logoUpload"
//                 accept="image/png, image/jpeg"
//                 style={{ display: "none" }}
//                 onChange={handleLogoChange}
//               />

//               <button
//                 type="button"
//                 className="uploadBtn"
//                 onClick={() => document.getElementById("logoUpload").click()}
//               >
//                 Upload Logo
//               </button>

//               <p className="note">PNG, JPG up to 2MB</p>
//               {errors.logoFile && <p className="errorMsg">{errors.logoFile}</p>}
//             </div>
//           </div>
//         </div>

//         {/* COLOR SCHEME */}
//         <div className="section">
//           <p className="label">Color Scheme</p>

//           <div className="colorRow">
//             {/* Primary */}
//             <div className="colorBox">
//               <label className="smallLabel">Primary Color</label>

//               <div className="colorInput">
//                 <input
//                   type="color"
//                   className="colorPicker"
//                   value={primaryColor}
//                   onChange={(e) => {
//                     setPrimaryColor(e.target.value);
//                     validateField("primaryColor", e.target.value);
//                   }}
//                 />

//                 <input
//                   type="text"
//                   className="input"
//                   value={primaryColor}
//                   placeholder="#1e40af"
//                   onChange={(e) => {
//                     setPrimaryColor(e.target.value);
//                     validateField("primaryColor", e.target.value);
//                   }}
//                 />
//               </div>

//               {errors.primaryColor && <p className="errorMsg">{errors.primaryColor}</p>}
//             </div>

//             {/* Secondary */}
//             <div className="colorBox">
//               <label className="smallLabel">Secondary Color</label>

//               <div className="colorInput">
//                 <input
//                   type="color"
//                   className="colorPicker"
//                   value={secondaryColor}
//                   onChange={(e) => {
//                     setSecondaryColor(e.target.value);
//                     validateField("secondaryColor", e.target.value);
//                   }}
//                 />

//                 <input
//                   type="text"
//                   className="input"
//                   value={secondaryColor}
//                   placeholder="#f59e0b"
//                   onChange={(e) => {
//                     setSecondaryColor(e.target.value);
//                     validateField("secondaryColor", e.target.value);
//                   }}
//                 />
//               </div>

//               {errors.secondaryColor && (
//                 <p className="errorMsg">{errors.secondaryColor}</p>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* TEMPLATES */}
//         <div className="formGroup">
//           <label className="label">Letterhead Template</label>
//           <select
//             className="select"
//             value={letterheadTemplate}
//             onChange={(e) => {
//               setLetterheadTemplate(e.target.value);
//               validateField("letterheadTemplate", e.target.value);
//             }}
//           >
//             <option value="">Select Template</option>
//             <option value="Default Template">Default Template</option>
//             <option value="Modern Template">Modern Template</option>
//             <option value="Classic Template">Classic Template</option>
//           </select>

//           {errors.letterheadTemplate && (
//             <p className="errorMsg">{errors.letterheadTemplate}</p>
//           )}
//         </div>

//         <div className="formGroup">
//           <label className="label">Invoice Template</label>
//           <select
//             className="select"
//             value={invoiceTemplate}
//             onChange={(e) => {
//               setInvoiceTemplate(e.target.value);
//               validateField("invoiceTemplate", e.target.value);
//             }}
//           >
//             <option value="">Select Template</option>
//             <option value="Professional">Professional</option>
//             <option value="Simple">Simple</option>
//             <option value="Detailed">Detailed</option>
//           </select>

//           {errors.invoiceTemplate && (
//             <p className="errorMsg">{errors.invoiceTemplate}</p>
//           )}
//         </div>

//         {/* SAVE BUTTON */}
//         <div className="saveRow">
//           <button className="saveBtn" onClick={handleSave} disabled={saving}>
//             {saving ? "Saving..." : "💾 Save Changes"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }



import React, { useState, useEffect } from "react";

export default function Filmbranding() {
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [logoUrl, setLogoUrl] = useState(null);

  const [primaryColor, setPrimaryColor] = useState("#1e40af");
  const [secondaryColor, setSecondaryColor] = useState("#f59e0b");

  const [letterheadTemplate, setLetterheadTemplate] = useState("Default Template");
  const [invoiceTemplate, setInvoiceTemplate] = useState("Professional");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const API_URL = "https://posthemorrhagic-nonequilaterally-caroline.ngrok-free.dev/api/branding-setting";

  // Fetch branding settings on component mount
  useEffect(() => {
    fetchBrandingSettings();
  }, []);

  const fetchBrandingSettings = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
      });

      const contentType = response.headers.get("content-type");

      if (!contentType || !contentType.includes("application/json")) {
        const responseText = await response.text();
        console.error("Response is not JSON:", responseText);
        setMessage("⚠️ Using default branding settings");
        setLoading(false);
        return;
      }

      if (response.ok) {
        const data = await response.json();
        console.log("Branding data received:", data);
        setLogoUrl(data.firmLogoUrl);
        setPrimaryColor(data.primaryColor);
        setSecondaryColor(data.secondaryColor);
        setLetterheadTemplate(data.letterheadTemplate);
        setInvoiceTemplate(data.invoiceTemplate);
      } else {
        setMessage("❌ Failed to fetch branding settings");
      }
    } catch (error) {
      console.error("Error fetching settings:", error);
      setMessage("⚠️ Using default branding settings (API unavailable)");
    } finally {
      setLoading(false);
    }
  };

  const handleLogoSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/png") && !file.type.startsWith("image/")) {
        setMessage("❌ Please select a valid PNG image file");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setMessage("❌ File size must be less than 5MB");
        return;
      }

      setLogoFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogoPreview(e.target.result);
      };
      reader.readAsDataURL(file);
      setMessage("");
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      setMessage("");

      const formData = new FormData();

      if (logoFile) {
        formData.append("FirmLogoFile", logoFile);
      }

      formData.append("PrimaryColor", primaryColor);
      formData.append("SecondaryColor", secondaryColor);
      formData.append("LetterheadTemplate", letterheadTemplate);
      formData.append("InvoiceTemplate", invoiceTemplate);

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "ngrok-skip-browser-warning": "true",
        },
        body: formData,
      });

      const contentType = response.headers.get("content-type");

      if (!contentType || !contentType.includes("application/json")) {
        const responseText = await response.text();
        console.error("Response is not JSON:", responseText);
        setMessage("⚠️ Settings sent (server response unclear)");
        return;
      }

      if (response.ok) {
        const data = await response.json();
        console.log("Branding saved successfully:", data);
        if (data.firmLogoUrl) {
          setLogoUrl(data.firmLogoUrl);
          setLogoPreview(null);
        }
        setLogoFile(null);
        setMessage("✅ Branding settings saved successfully!");
        setTimeout(() => setMessage(""), 3000);
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error("Server error:", errorData);
        setMessage(`❌ ${errorData.message || "Failed to save branding settings"}`);
      }
    } catch (error) {
      console.error("Error saving settings:", error);
      setMessage("❌ Error saving branding settings");
    } finally {
      setLoading(false);
    }
  };

  const getLogoUrl = () => {
    if (!logoUrl) return null;
    
    // Debug: log the raw logoUrl
    console.log("Raw logoUrl from API:", logoUrl);
    
    // Clean up the URL - remove any accidental duplicates or prefixes
    let cleanUrl = logoUrl.trim();
    if (cleanUrl.startsWith("__")) {
      cleanUrl = cleanUrl.slice(2);
    }
    
    // If it's already a full URL, use it as-is
    if (cleanUrl.startsWith("http://") || cleanUrl.startsWith("https://")) {
      console.log("Using full URL:", cleanUrl);
      return cleanUrl;
    }
    
    // If it's a relative path, prepend the base URL
    if (cleanUrl.startsWith("/")) {
      const finalUrl = `https://posthemorrhagic-nonequilaterally-caroline.ngrok-free.dev${cleanUrl}`;
      console.log("Constructed URL from relative path:", finalUrl);
      return finalUrl;
    }
    
    // Otherwise, treat it as a relative path needing a slash
    const finalUrl = `https://posthemorrhagic-nonequilaterally-caroline.ngrok-free.dev/${cleanUrl}`;
    console.log("Constructed URL from unclear path:", finalUrl);
    return finalUrl;
  };

  return (
    <div style={styles.container}>
      {/* Status Message */}
      {message && (
        <div
          style={{
            padding: "12px",
            marginBottom: "16px",
            borderRadius: "4px",
            backgroundColor: message.includes("✅") ? "#d4edda" : "#f8d7da",
            color: message.includes("✅") ? "#155724" : "#721c24",
            border: `1px solid ${message.includes("✅") ? "#c3e6cb" : "#f5c6cb"}`,
          }}
        >
          {message}
        </div>
      )}

      {/* Logo Upload */}
      <div style={styles.card}>
        <h3 style={styles.sectionTitle}>🎨 Firm Logo</h3>

        <div style={styles.logoSection}>
          <div style={styles.logoPreviewContainer}>
            {logoPreview ? (
              <>
                <img
                  src={logoPreview}
                  alt="Logo Preview"
                  style={styles.logoImage}
                  onError={() => console.error("Preview image failed to load")}
                />
                <p style={{ fontSize: "12px", color: "#666", marginTop: "8px" }}>Preview (not yet saved)</p>
              </>
            ) : getLogoUrl() ? (
              <>
                <img
                  src={getLogoUrl()}
                  alt="Firm Logo"
                  style={styles.logoImage}
                  onError={(e) => {
                    console.error("Logo image failed to load from:", e.target.src);
                    console.error("Error details:", e);
                    console.log("Status code might be:", e.target.status);
                    // setMessage("⚠️ Logo uploaded but preview unavailable - check console for details");
                  }}
                  onLoad={() => console.log("Logo loaded successfully from:", getLogoUrl())}
                />
                <p style={{ fontSize: "12px", color: "#28a745", marginTop: "8px" }}>✓ Uploaded</p>
              </>
            ) : (
              <div style={styles.logoPlaceholder}>
                <span style={{ fontSize: "48px" }}>📷</span>
                <p>No logo uploaded</p>
              </div>
            )}
          </div>

          <div style={styles.logoUploadSection}>
            <h3><label style={styles.label}>Upload Firm Logo (PNG)</label></h3>
            <input
              type="file"
              accept=".png,image/png"
              onChange={handleLogoSelect}
              disabled={loading}
              style={styles.fileInput}
            />
            <p style={styles.helpText}>Supported: PNG files (Max 5MB)</p>
            {logoFile && (
              <p style={{ color: "#28a745", fontSize: "14px" }}>
                ✓ {logoFile.name} ready to upload
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Color Settings */}
      <div style={styles.card}>
        <h3 style={styles.sectionTitle}>🎯 Brand Colors</h3>

        <div style={styles.colorRow}>
          <div style={styles.colorColumn}>
            <label style={styles.label}>Primary Color</label>
            <div style={styles.colorPickerContainer}>
              <input
                type="color"
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
                disabled={loading}
                style={styles.colorInput}
              />
              <span style={styles.colorValue}>{primaryColor}</span>
            </div>
          </div>

          <div style={styles.colorColumn}>
            <label style={styles.label}>Secondary Color</label>
            <div style={styles.colorPickerContainer}>
              <input
                type="color"
                value={secondaryColor}
                onChange={(e) => setSecondaryColor(e.target.value)}
                disabled={loading}
                style={styles.colorInput}
              />
              <span style={styles.colorValue}>{secondaryColor}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Templates */}
      <div style={styles.card}>
        <h3 style={styles.sectionTitle}>📄 Templates</h3>

        <div style={styles.templateRow}>
          <div style={styles.templateColumn}>
            <label style={styles.label}>Letterhead Template</label>
            <select
              value={letterheadTemplate}
              onChange={(e) => setLetterheadTemplate(e.target.value)}
              disabled={loading}
              style={styles.select}
            >
              <option>Default Template</option>
              <option>Modern Template</option>
              <option>Classic Template</option>
            </select>
          </div>

          <div style={styles.templateColumn}>
            <label style={styles.label}>Invoice Template</label>
            <select
              value={invoiceTemplate}
              onChange={(e) => setInvoiceTemplate(e.target.value)}
              disabled={loading}
              style={styles.select}
            >
              <option>Professional</option>
              <option>Simple</option>
              <option>Detailed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Save Button */}
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
          {loading ? "💾 Saving..." : "💾 Save Branding"}
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    width: "96%",
    margin: "12px auto",
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
  sectionTitle: {
    marginBottom: "15px",
    fontSize: "18px",
    fontWeight: "bold",
  },
  logoSection: {
    display: "flex",
    gap: "30px",
    alignItems: "flex-start",
  },
  logoPreviewContainer: {
    flex: "0 0 300px",
    minHeight: "250px",
  },
  logoImage: {
    width: "100%",
    height: "250px",
    objectFit: "contain",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "10px",
    backgroundColor: "#f9f9f9",
    display: "block",
  },
  logoPlaceholder: {
    width: "100%",
    height: "250px",
    border: "2px dashed #ddd",
    borderRadius: "8px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f9f9f9",
    color: "#999",
  },
  logoUploadSection: {
    flex: 1,
  },
  label: {
    display: "block",
    marginBottom: "8px",
    fontSize: "14px",
    fontWeight: "bold",
    color: "#333",
  },
  fileInput: {
    display: "block",
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "6px",
    cursor: "pointer",
    width: "100%",
    marginBottom: "8px",
  },
  helpText: {
    fontSize: "12px",
    color: "#666",
    margin: "0 0 8px 0",
  },
  colorRow: {
    display: "flex",
    gap: "40px",
  },
  colorColumn: {
    flex: 1,
  },
  colorPickerContainer: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "12px",
  },
  colorInput: {
    width: "60px",
    height: "40px",
    border: "1px solid #ddd",
    borderRadius: "6px",
    cursor: "pointer",
  },
  colorValue: {
    fontSize: "14px",
    fontFamily: "monospace",
    color: "#555",
  },
  colorPreview: {
    width: "100%",
    height: "80px",
    borderRadius: "6px",
    border: "1px solid #ddd",
  },
  templateRow: {
    display: "flex",
    gap: "30px",
  },
  templateColumn: {
    flex: 1,
  },
  select: {
    width: "100%",
    padding: "8px 12px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "14px",
    cursor: "pointer",
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
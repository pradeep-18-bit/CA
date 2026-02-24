

// import React, { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import "./ChangePassword.css";
// import { FaEye, FaEyeSlash } from "react-icons/fa";

// function ChangePassword() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const token = location.state?.token || localStorage.getItem("token");

//   const [currentPassword, setCurrentPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");

//   // 👁 visibility states (NEW)
//   const [showCurrent, setShowCurrent] = useState(false);
//   const [showNew, setShowNew] = useState(false);
//   const [showConfirm, setShowConfirm] = useState(false);

//   const [errors, setErrors] = useState({});
//   const [passwordError, setPasswordError] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");

//   if (!token) {
//     return (
//       <div className="cp-wrapper">
//         <div className="cp-box">
//           <p className="cp-error">No token found. Please login again.</p>
//         </div>
//       </div>
//     );
//   }

//   const validatePasswordStrength = (value) => {
//     let error = "";

//     if (value.length === 0) {
//       setPasswordError("");
//       return "";
//     }

//     if (value.length < 8) error = "At least 8 characters required";
//     else if (!/[A-Z]/.test(value)) error = "Add an uppercase letter (A-Z)";
//     else if (!/[a-z]/.test(value)) error = "Add a lowercase letter (a-z)";
//     else if (!/[@$!%*?&]/.test(value))
//       error = "Add a symbol (@ $ ! % * ? &)";
//     else if (!/\d/.test(value)) error = "Add a number (0-9)";
//     else error = "";

//     setPasswordError(error);
//     return error ? "Weak password" : "";
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const newErrors = {};

//     if (!currentPassword.trim())
//       newErrors.currentPassword = "Old Password is required";

//     if (!newPassword.trim()) {
//       newErrors.newPassword = "New Password is required";
//     } else {
//       const result = validatePasswordStrength(newPassword);
//       if (result) newErrors.newPassword = result;
//     }

//     if (!confirmPassword.trim()) {
//       newErrors.confirmPassword = "Confirm Password is required";
//     } else if (confirmPassword !== newPassword) {
//       newErrors.confirmPassword = "Passwords do not match";
//     }

//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       return;
//     }

//     try {
//       const response = await fetch(
//         "https://posthemorrhagic-nonequilaterally-caroline.ngrok-free.dev/api/Auth/change-password",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify({
//             currentPassword,
//             newPassword,
//           }),
//         }
//       );

//       const text = await response.text();
//       let data;

//       try {
//         data = JSON.parse(text);
//       } catch {
//         data = { message: text };
//       }

//       if (!response.ok) {
//         setErrors({ general: data.message || "Password update failed." });
//         return;
//       }

//       setSuccessMessage(data.message || "Password updated successfully!");

//       setTimeout(() => navigate("/DeadlineDashboard"), 1500);
//     } catch {
//       setErrors({ general: "Server error. Please try again later." });
//     }
//   };

//   return (
//     <div className="cp-wrapper">
//       <div className="cp-box">
//         <h3 className="cp-title">Change Password</h3>

//         {errors.general && (
//           <p className="cp-error cp-general-error">{errors.general}</p>
//         )}
//         {successMessage && <p className="cp-success">{successMessage}</p>}

//         <form onSubmit={handleSubmit} className="cp-form">

//           {/* OLD PASSWORD */}
//           <div className="cp-form-group">
//             <label>Old Password*</label>
//             <div className="cp-password-wrapper">
//               <input
//                 type={showCurrent ? "text" : "password"}
//                 placeholder="Enter Old Password"
//                 value={currentPassword}
//                 className={errors.currentPassword ? "error-input" : ""}
//                 onChange={(e) => {
//                   setCurrentPassword(e.target.value);
//                   setErrors((p) => ({ ...p, currentPassword: "" }));
//                 }}
//               />
//               <span
//                 className="cp-eye-icon"
//                 onClick={() => setShowCurrent((p) => !p)}
//               >
//                 {showCurrent ? <FaEye /> : <FaEyeSlash />}
//               </span>
//             </div>
//             {errors.currentPassword && (
//               <span className="cp-error">{errors.currentPassword}</span>
//             )}
//           </div>

//           {/* NEW PASSWORD */}
//           <div className="cp-form-group">
//             <label>New Password*</label>
//             <div className="cp-password-wrapper">
//               <input
//                 type={showNew ? "text" : "password"}
//                 placeholder="Enter New Password"
//                 value={newPassword}
//                 className={errors.newPassword ? "error-input" : ""}
//                 onChange={(e) => {
//                   setNewPassword(e.target.value);
//                   validatePasswordStrength(e.target.value);
//                   setErrors((p) => ({ ...p, newPassword: "" }));
//                 }}
//               />
//               <span
//                 className="cp-eye-icon"
//                 onClick={() => setShowNew((p) => !p)}
//               >
//                 {showNew ? <FaEye /> : <FaEyeSlash />}
//               </span>
//             </div>

//             {newPassword && passwordError && (
//               <p className="cp-error">• {passwordError}</p>
//             )}
//             {newPassword && !passwordError && (
//               <p className="cp-success">✔ Password is strong</p>
//             )}
//             {errors.newPassword && (
//               <span className="cp-error">{errors.newPassword}</span>
//             )}
//           </div>

//           {/* CONFIRM PASSWORD */}
//           <div className="cp-form-group">
//             <label>Confirm Password*</label>
//             <div className="cp-password-wrapper">
//               <input
//                 type={showConfirm ? "text" : "password"}
//                 placeholder="Confirm New Password"
//                 value={confirmPassword}
//                 className={errors.confirmPassword ? "error-input" : ""}
//                 onChange={(e) => {
//                   setConfirmPassword(e.target.value);
//                   setErrors((p) => ({ ...p, confirmPassword: "" }));
//                 }}
//               />
//               <span
//                 className="cp-eye-icon"
//                 onClick={() => setShowConfirm((p) => !p)}
//               >
//                 {showConfirm ? <FaEye /> : <FaEyeSlash />}
//               </span>
//             </div>
//             {errors.confirmPassword && (
//               <span className="cp-error">{errors.confirmPassword}</span>
//             )}
//           </div>

//           <button type="submit" className="cp-btn">
//             Update Password
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default ChangePassword;




















import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ChangePassword.css";

function ChangePassword() {
  const navigate = useNavigate();
  const location = useLocation();

  const token = location.state?.token || localStorage.getItem("token");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState({});
  const [passwordError, setPasswordError] = useState(""); // real-time validation
  const [successMessage, setSuccessMessage] = useState("");

  if (!token) {
    return (
      <div className="cp-wrapper">
        <div className="cp-box">
          <p className="cp-error">No token found. Please login again.</p>
        </div>
      </div>
    );
  }

  //  REAL-TIME PASSWORD VALIDATIONS
  const validatePasswordStrength = (value) => {
    let error = "";

    if (value.length === 0) {
      setPasswordError("");
      return "";
    }

    if (value.length < 8) error = "At least 8 characters required";
    else if (!/[A-Z]/.test(value)) error = "Add an uppercase letter (A-Z)";
    else if (!/[a-z]/.test(value)) error = "Add a lowercase letter (a-z)";
    else if (!/[@$!%*?&]/.test(value))
      error = "Add a symbol (@ $ ! % * ? &)";
    else if (!/\d/.test(value)) error = "Add a number (0-9)";
    else error = ""; // strong password

    setPasswordError(error);
    return error ? "Weak password" : "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!currentPassword.trim())
      newErrors.currentPassword = "Old Password is required";

    // Validate New Password
    if (!newPassword.trim()) {
      newErrors.newPassword = "New Password is required";
    } else {
      const result = validatePasswordStrength(newPassword);
      if (result) newErrors.newPassword = result;
    }

    // Confirm Password
    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = "Confirm Password is required";
    } else if (confirmPassword !== newPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await fetch(
        "https://posthemorrhagic-nonequilaterally-caroline.ngrok-free.dev/api/Auth/change-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            currentPassword,
            newPassword,
          }),
        }
      );

      const text = await response.text();
      let data;

      try {
        data = JSON.parse(text);
      } catch {
        data = { message: text };
      }

      if (!response.ok) {
        if (response.status === 401) {
          setErrors({ general: "Please log in again." });
          return;
        }
        setErrors({ general: data.message || "Password update failed." });
        return;
      }

      setSuccessMessage(data.message || "Password updated successfully!");

      setTimeout(() => {
        const role = data.role?.toLowerCase();
        if (role === "admin" || role === "staff" || role === "intern") {
          navigate("/DeadlineDashboard");
        } else {
          navigate("/Signin");
        }
      }, 1500);
    } catch (error) {
      console.error("Error updating password:", error);
      setErrors({ general: "Server error. Please try again later." });
    }
  };

  return (
    <div className="cp-wrapper">
      {/* Floating Stars */}
<div className="stars-container">
  <div className="star big" style={{ top: "20%", left: "10%" }}></div>
  <div className="star mid" style={{ top: "70%", left: "80%" }}></div>
  <div className="star small" style={{ top: "40%", left: "50%" }}></div>
  <div className="star big" style={{ top: "85%", left: "30%" }}></div>
  <div className="star mid" style={{ top: "10%", left: "70%" }}></div>
  <div className="star small" style={{ top: "55%", left: "15%" }}></div>
  <div className="star big" style={{ top: "32%", left: "85%" }}></div>
  <div className="star mid" style={{ top: "60%", left: "60%" }}></div>
</div>

      <div className="cp-box">
        <h3 className="cp-title">Change Password</h3>

        {errors.general && <p className="cp-error cp-general-error">{errors.general}</p>}
        {successMessage && <p className="cp-success">{successMessage}</p>}

        <form onSubmit={handleSubmit} className="cp-form">

          {/* OLD PASSWORD */}
          <div className="cp-form-group">
            <label>Old Password*</label>
            <input
              type="password"
              placeholder="Enter Old Password"
              value={currentPassword}
              className={errors.currentPassword ? "error-input" : ""}
              onChange={(e) => {
                setCurrentPassword(e.target.value);
                setErrors((p) => ({ ...p, currentPassword: "" }));
              }}
            />
            {errors.currentPassword && <span className="cp-error">{errors.currentPassword}</span>}
          </div>

          {/* NEW PASSWORD */}
          <div className="cp-form-group">
            <label>New Password*</label>
            <input
              type="password"
              placeholder="Enter New Password"
              value={newPassword}
              className={errors.newPassword ? "error-input" : ""}
              onChange={(e) => {
                setNewPassword(e.target.value);
                validatePasswordStrength(e.target.value);
                setErrors((p) => ({ ...p, newPassword: "" }));
              }}
            />

            {/* REAL-TIME MESSAGE */}
            {newPassword && passwordError && (
              <p className="cp-error">• {passwordError}</p>
            )}

            {/* STRONG PASSWORD */}
            {newPassword && !passwordError && (
              <p className="cp-success">✔ Password is strong</p>
            )}

            {errors.newPassword && <span className="cp-error">{errors.newPassword}</span>}
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="cp-form-group">
            <label>Confirm Password*</label>
            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              className={errors.confirmPassword ? "error-input" : ""}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setErrors((p) => ({ ...p, confirmPassword: "" }));

                if (newPassword === e.target.value) {
                  setErrors((p) => ({ ...p, confirmPassword: "" }));
                }
              }}
            />
            {errors.confirmPassword && (
              <span className="cp-error">{errors.confirmPassword}</span>
            )}
          </div>

          <button type="submit" className="cp-btn">Update Password</button>
        </form>
      </div>
    </div>
  );
}

export default ChangePassword;



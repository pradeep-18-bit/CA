// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./staffintern.css";
// import book from "../../images/books.jpg";
// import { FaEye, FaEyeSlash } from "react-icons/fa";

// function StaffLogin() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false); // 👁 added
//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const validatePassword = (value) => {
//     if (!value.trim()) return "Password is required";
//     return "";
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const newErrors = {};

//     if (!email) newErrors.email = "Email is required";

//     const passErr = validatePassword(password);
//     if (passErr) newErrors.password = passErr;

//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       return;
//     }

//     setLoading(true);
//     setErrors({});

//     try {
//       const response = await fetch(
//         "https://posthemorrhagic-nonequilaterally-caroline.ngrok-free.dev/api/Auth/staff-login",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ email, password }),
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
//         setErrors({ general: "Invalid email or password" });
//         setLoading(false);
//         return;
//       }

//       localStorage.setItem("token", data.token);
//       localStorage.setItem("role", data.role);
//       localStorage.setItem("email", email);

//       if (!data.isPasswordChanged) {
//         navigate("/ChangePassword", {
//           state: { email, token: data.token, role: data.role },
//         });
//         return;
//       }

//       const permResponse = await fetch(
//         "https://posthemorrhagic-nonequilaterally-caroline.ngrok-free.dev/api/staff",
//         {
//           headers: {
//             Authorization: `Bearer ${data.token}`,
//             "ngrok-skip-browser-warning": "true",
//           },
//         }
//       );

//       const staffList = await permResponse.json();
//       const staffUser = staffList.find(
//         (u) => u.emailAddress?.toLowerCase() === email.toLowerCase()
//       );

//       if (staffUser) {
//         localStorage.setItem("permissions", JSON.stringify(staffUser));
//       }

//       const role = data.role?.toLowerCase();
//       if (role === "admin" || role === "staff" || role === "intern") {
//         navigate("/DeadlineDashboard");
//       } else {
//         setErrors({ general: "Unknown role. Contact admin" });
//       }
//     } catch (error) {
//       console.error(error);
//       setErrors({ general: "Server error. Try again later." });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div
//       className="staff-page"
//       style={{
//         backgroundImage: `url(${book})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         backgroundRepeat: "no-repeat",
//       }}
//     >
//       <div className="stars-container"></div>

//       <div className="login-wrapper">
//         <div className="login-box">
//           {errors.general && <p className="general-error">{errors.general}</p>}

//           <form onSubmit={handleSubmit}>
//             <h3 className="login-title">Staff - Intern Login</h3>

//             <div className="form-group">
//               <label>Email*</label>
//               <input
//                 type="email"
//                 placeholder="Enter email"
//                 value={email}
//                 className={errors.email ? "error-input" : ""}
//                 onChange={(e) => {
//                   setEmail(e.target.value);
//                   setErrors((prev) => ({ ...prev, email: "" }));
//                 }}
//               />
//               {errors.email && <span className="error">{errors.email}</span>}
//             </div>

//             <div className="form-group">
//               <label>Password*</label>
//               <div style={{ position: "relative" }}>
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   placeholder="Enter password"
//                   value={password}
//                   className={errors.password ? "error-input" : ""}
//                   onChange={(e) => {
//                     setPassword(e.target.value);
//                     setErrors((prev) => ({ ...prev, password: "" }));
//                   }}
//                 />
//                 <span
//                   onClick={() => setShowPassword((p) => !p)}
//                   style={{
//                     position: "absolute",
//                     right: "10px",
//                     top: "50%",
//                     transform: "translateY(-50%)",
//                     cursor: "pointer",
//                   }}
//                   title={showPassword ? "Hide password" : "Show password"}
//                 >
//                   {showPassword ? <FaEye /> : <FaEyeSlash />}
//                 </span>
//               </div>

//               {errors.password && (
//                 <span className="error">{errors.password}</span>
//               )}
//             </div>

//             <button type="submit" disabled={loading}>
//               {loading ? "Logging in..." : "Log In"}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default StaffLogin;























import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./staffintern.css";
import book from "../../images/books.jpg";


function StaffLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validatePassword = (value) => {
  if (!value.trim()) return "Password is required";
  return "";
};


  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!email) newErrors.email = "Email is required";

    const passErr = validatePassword(password);
    if (passErr) newErrors.password = passErr;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      const response = await fetch(
        "https://posthemorrhagic-nonequilaterally-caroline.ngrok-free.dev/api/Auth/staff-login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
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
        setErrors({ general: "Invalid email or password" });
        setLoading(false);
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      localStorage.setItem("email", email);

      if (!data.isPasswordChanged) {
        navigate("/ChangePassword", {
          state: { email, token: data.token, role: data.role },
        });
        return;
      }

      const permResponse = await fetch(
        "https://posthemorrhagic-nonequilaterally-caroline.ngrok-free.dev/api/staff",
        {
          headers: {
            Authorization: `Bearer ${data.token}`,
            "ngrok-skip-browser-warning": "true",
          },
        }
      );

      const staffList = await permResponse.json();
      const staffUser = staffList.find(
        (u) => u.emailAddress?.toLowerCase() === email.toLowerCase()
      );

      if (staffUser) {
        localStorage.setItem("permissions", JSON.stringify(staffUser));
      }

      const role = data.role?.toLowerCase();
      if (role === "admin" || role === "staff" || role === "intern") {
        navigate("/DeadlineDashboard");
      } else {
        setErrors({ general: "Unknown role. Contact admin" });
      }
    } catch (error) {
      console.error(error);
      setErrors({ general: "Server error. Try again later." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="staff-page"  style={{
    backgroundImage: `url(${book})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  }}>
              <div className="stars-container">
  <div className="star small" style={{ top: "10%", left: "15%" }}></div>
  <div className="star mid" style={{ top: "20%", left: "70%" }}></div>
  <div className="star big" style={{ top: "30%", left: "40%" }}></div>

  <div className="star small" style={{ top: "50%", left: "80%" }}></div>
  <div className="star big" style={{ top: "70%", left: "20%" }}></div>
  <div className="star mid" style={{ top: "85%", left: "60%" }}></div>

  <div className="star small" style={{ top: "40%", left: "10%" }}></div>
  <div className="star big" style={{ top: "15%", left: "85%" }}></div>
  <div className="star mid" style={{ top: "60%", left: "50%" }}></div>

  <div className="star small" style={{ top: "75%", left: "35%" }}></div>
  <div className="star mid" style={{ top: "25%", left: "25%" }}></div>
  <div className="star big" style={{ top: "5%",  left: "55%" }}></div>

  <div className="star big" style={{ top: "92%", left: "10%" }}></div>
  <div className="star small" style={{ top: "68%", left: "90%" }}></div>
  <div className="star mid" style={{ top: "48%", left: "75%" }}></div>

  <div className="star small" style={{ top: "33%", left: "5%" }}></div>
  <div className="star small" style={{ top: "12%", left: "45%" }}></div>
  <div className="star mid" style={{ top: "88%", left: "50%" }}></div>
  <div className="star big" style={{ top: "58%", left: "5%" }}></div>
  <div className="star mid" style={{ top: "78%", left: "70%" }}></div>
</div>
      <div className="login-wrapper">
      
        <div className="login-box">
           {errors.general && (
              <p className="general-error">{errors.general}</p>
            )}

          <form onSubmit={handleSubmit}>
            <h3 className="login-title">Staff - Intern Login</h3>
            
            <div className="form-group">
              <label>Email*</label>
              <input
                type="email"
                placeholder="Enter email"
                value={email}
                className={errors.email ? "error-input" : ""}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrors((prev) => ({ ...prev, email: "" }));
                }}
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label>Password*</label>
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                className={errors.password ? "error-input" : ""}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrors((prev) => ({ ...prev, password: "" }));
                }}
              />
              {errors.password && (
                <span className="error">{errors.password}</span>
              )}
            </div>

            <button type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Log In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default StaffLogin;

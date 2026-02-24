
// // import React, { useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import "./login.css";
// // import tradingBg from "../images/trading.jpg";
// // function Login() {
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [errors, setErrors] = useState({});
// //   const [loading, setLoading] = useState(false);
// //   const navigate = useNavigate();

// //   const validate = () => {
// //     const err = {};
// //     if (!email.trim()) err.email = "Email is required";
// //     else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
// //       err.email = "Enter a valid email";

// //     if (!password) err.password = "Password is required";

// //     return err;
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     const validation = validate();

// //     if (Object.keys(validation).length) return setErrors(validation);

// //     setErrors({});
// //     setLoading(true);

// //     try {
// //       const response = await fetch(
// //         "https://posthemorrhagic-nonequilaterally-caroline.ngrok-free.dev/api/Auth/login",
// //         {
// //           method: "POST",
// //           headers: { "Content-Type": "application/json" },
// //           body: JSON.stringify({ email: email.trim(), password }),
// //         }
// //       );

// //       const data = await response.json();

// //       if (!response.ok) {
// //         setErrors({ general: data.message || "Invalid email or password" });
// //         setLoading(false);
// //         return;
// //       }

// //       localStorage.setItem("token", data.token);
// //       localStorage.setItem("role", data.role);
// //       localStorage.setItem("email", email.trim());
// //       localStorage.setItem("isLoggedIn", "true");

// //       if (!data.isPasswordChanged) {
// //         navigate("/ChangePassword", {
// //           state: { email, token: data.token, role: data.role },
// //         });
// //         return;
// //       }

// //       if (data.role === "admin") navigate("/DeadlineDashboard");
// //       else navigate("/DeadlineDashboard");
// //     } catch {
// //       setErrors({ general: "Invalid email or password." });
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="login-page"  style={{
// //         backgroundImage: `url(${tradingBg})`,
// //         backgroundSize: "cover",
// //         backgroundPosition: "center",
// //         backgroundRepeat: "no-repeat",
// //       }}>
// //       <div className="stars-container">
// //         <div className="star small" style={{ top: "10%", left: "15%" }}></div>
// //         <div className="star mid" style={{ top: "20%", left: "70%" }}></div>
// //         <div className="star big" style={{ top: "30%", left: "40%" }}></div>

// //         <div className="star small" style={{ top: "50%", left: "80%" }}></div>
// //         <div className="star big" style={{ top: "70%", left: "20%" }}></div>
// //         <div className="star mid" style={{ top: "85%", left: "60%" }}></div>

// //         <div className="star small" style={{ top: "40%", left: "10%" }}></div>
// //         <div className="star big" style={{ top: "15%", left: "85%" }}></div>
// //         <div className="star mid" style={{ top: "60%", left: "50%" }}></div>

// //         <div className="star small" style={{ top: "75%", left: "35%" }}></div>
// //         <div className="star mid" style={{ top: "25%", left: "25%" }}></div>
// //         <div className="star big" style={{ top: "5%", left: "55%" }}></div>

// //         <div className="star big" style={{ top: "92%", left: "10%" }}></div>
// //         <div className="star small" style={{ top: "68%", left: "90%" }}></div>
// //         <div className="star mid" style={{ top: "48%", left: "75%" }}></div>

// //         <div className="star small" style={{ top: "33%", left: "5%" }}></div>
// //         <div className="star small" style={{ top: "12%", left: "45%" }}></div>
// //         <div className="star mid" style={{ top: "88%", left: "50%" }}></div>
// //         <div className="star big" style={{ top: "58%", left: "5%" }}></div>
// //         <div className="star mid" style={{ top: "78%", left: "70%" }}></div>
// //       </div>

// //       <div className="login-wrapper">
// //         <div className="login-box">
// //           {errors.general && (
// //             <div className="error general-error">{errors.general}</div>
// //           )}

// //           <form className="login-form" onSubmit={handleSubmit}>
// //             <h1 className="login-title">Login</h1>

// //             <div className="form-group">
// //               <label className="form-label">Email*</label>
// //               <input
// //                 className={`form-input ${errors.email ? "invalid" : ""}`}
// //                 type="email"
// //                 placeholder="info@example.com"
// //                 value={email}
// //                 onChange={(e) => {
// //                   setEmail(e.target.value);
// //                   setErrors((p) => ({ ...p, email: "" }));
// //                 }}
// //               />
// //               {errors.email && <p className="field-error">{errors.email}</p>}
// //             </div>

// //             <div className="form-group">
// //               <label className="form-label">Password*</label>
// //               <input
// //                 className={`form-input ${errors.password ? "invalid" : ""}`}
// //                 type="password"
// //                 placeholder="Password"
// //                 value={password}
// //                 onChange={(e) => {
// //                   setPassword(e.target.value);
// //                   setErrors((p) => ({ ...p, password: "" }));
// //                 }}
// //               />
// //               {errors.password && (
// //                 <p className="field-error">{errors.password}</p>
// //               )}
// //             </div>

// //             <button className="submit-btn" type="submit" disabled={loading}>
// //               {loading ? "Logging in..." : "Log In"}
// //             </button>
// //           </form>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default Login;






import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import tradingBg from "../images/trading.jpg";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const err = {};
    if (!email.trim()) err.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      err.email = "Enter a valid email";

    if (!password) err.password = "Password is required";

    return err;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validation = validate();

    if (Object.keys(validation).length) {
      setErrors(validation);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      const response = await fetch(
        "https://posthemorrhagic-nonequilaterally-caroline.ngrok-free.dev/api/Auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: email.trim(), password }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setErrors({ general: data.message || "Invalid email or password" });
        setLoading(false);
        return;
      }

      //  ADMIN ONLY CHECK
      if (data.role !== "admin") {
        setErrors({ general: "Access denied. Admins only." });
        setLoading(false);
        return;
      }

      // ✅ Store admin data
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      localStorage.setItem("email", email.trim());
      localStorage.setItem("isLoggedIn", "true");

      //  Force password change if required
      if (!data.isPasswordChanged) {
        navigate("/ChangePassword", {
          state: { email, token: data.token, role: data.role },
        });
        return;
      }

      //  Admin dashboard
      navigate("/DeadlineDashboard");

    } catch (error) {
      setErrors({ general: "Invalid email or password." });
      setLoading(false);
    }
  };

  return (
    <div
      className="login-page"
      style={{
        backgroundImage: `url(${tradingBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
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
        <div className="star big" style={{ top: "5%", left: "55%" }}></div>
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
            <div className="error general-error">{errors.general}</div>
          )}

          <form className="login-form" onSubmit={handleSubmit}>
            <h1 className="login-title">Admin Login</h1>

            <div className="form-group">
              <label className="form-label">Email*</label>
              <input
                className={`form-input ${errors.email ? "invalid" : ""}`}
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrors((p) => ({ ...p, email: "" }));
                }}
              />
              {errors.email && <p className="field-error">{errors.email}</p>}
            </div>

            <div className="form-group">
              <label className="form-label">Password*</label>
              <input
                className={`form-input ${errors.password ? "invalid" : ""}`}
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrors((p) => ({ ...p, password: "" }));
                }}
              />
              {errors.password && (
                <p className="field-error">{errors.password}</p>
              )}
            </div>

            <button className="submit-btn" type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Log In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;









































































































































































































































































// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./login.css";
// import tradingBg from "../images/trading.jpg";
// import { FaEye, FaEyeSlash } from "react-icons/fa";

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const validate = () => {
//     const err = {};
//     if (!email.trim()) err.email = "Email is required";
//     else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
//       err.email = "Enter a valid email";
//     if (!password) err.password = "Password is required";
//     return err;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const validation = validate();
//     if (Object.keys(validation).length) {
//       setErrors(validation);
//       return;
//     }

//     setErrors({});
//     setLoading(true);

//     try {
//       const response = await fetch(
//         "https://posthemorrhagic-nonequilaterally-caroline.ngrok-free.dev/api/Auth/login",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ email: email.trim(), password }),
//         }
//       );

//       const data = await response.json();

//       if (!response.ok) {
//         setErrors({ general: data.message || "Invalid email or password" });
//         setLoading(false);
//         return;
//       }

//       if (data.role !== "admin") {
//         setErrors({ general: "Access denied. Admins only." });
//         setLoading(false);
//         return;
//       }

//       localStorage.setItem("token", data.token);
//       localStorage.setItem("role", data.role);
//       localStorage.setItem("email", email.trim());
//       localStorage.setItem("isLoggedIn", "true");

//       if (!data.isPasswordChanged) {
//         navigate("/ChangePassword", {
//           state: { email, token: data.token, role: data.role },
//         });
//         return;
//       }

//       navigate("/DeadlineDashboard");
//     } catch {
//       setErrors({ general: "Invalid email or password." });
//       setLoading(false);
//     }
//   };

//   return (
//     <div
//       className="login-page"
//       style={{
//         backgroundImage: `url(${tradingBg})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         backgroundRepeat: "no-repeat",
//       }}
//     >
//       <div className="login-wrapper">
//         <div className="login-box">
//           {errors.general && (
//             <div className="error general-error">{errors.general}</div>
//           )}

//           <form className="login-form" onSubmit={handleSubmit}>
//             <h1 className="login-title">Admin Login</h1>

//             <div className="form-group">
//               <label className="form-label">Email*</label>
//               <input
//                 className={`form-input ${errors.email ? "invalid" : ""}`}
//                 type="email"
//                 value={email}
//                 placeholder="admin@example.com"
//                 onChange={(e) => {
//                   setEmail(e.target.value);
//                   setErrors((p) => ({ ...p, email: "" }));
//                 }}
//               />
//               {errors.email && <p className="field-error">{errors.email}</p>}
//             </div>

//             {/* PASSWORD FIELD */}
//             <div className="form-group password-group">
//               <label className="form-label">Password*</label>

//               <div className="password-wrapper">
//                 <input
//                   className={`form-input ${errors.password ? "invalid" : ""}`}
//                   type={showPassword ? "text" : "password"}
//                   value={password}
//                   placeholder="Password"
//                   onChange={(e) => {
//                     setPassword(e.target.value);
//                     setErrors((p) => ({ ...p, password: "" }));
//                   }}
//                 />

//                 <span
//                   className="eye-icon"
//                   onClick={() => setShowPassword((p) => !p)}
//                   title={showPassword ? "Hide password" : "Show password"}
//                 >
//                   {showPassword ? <FaEye /> : <FaEyeSlash />}
//                 </span>
//               </div>

//               {errors.password && (
//                 <p className="field-error">{errors.password}</p>
//               )}
//             </div>

//             <button className="submit-btn" type="submit" disabled={loading}>
//               {loading ? "Logging in..." : "Log In"}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;

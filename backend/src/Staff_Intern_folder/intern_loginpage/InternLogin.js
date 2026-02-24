
// import React, { useState } from "react";
// import { useNavigate} from "react-router-dom";
// // import "../Global.css";

// function InternLogin() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("");
//   const [errors, setErrors] = useState({});
//   const navigate = useNavigate();

//   // Get registered user from localStorage
//   const registeredUser = JSON.parse(localStorage.getItem("registeredUser"));

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const newErrors = {};
//     if (!email) newErrors.email = "Email is required";
//     if (!password) newErrors.password = "Password is required";
//     if (!role) newErrors.role = "Please select your role";

//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       return;
//     }

//     if (
//       !registeredUser ||
//       registeredUser.email !== email ||
//       registeredUser.password !== password ||
//       registeredUser.role !== role
//     ) {
//       setErrors({ general: "Invalid email, password, or role!" });
//       return;
//     }

//     setErrors({});
//     if (role === "Intern") navigate("/intern/dashboard");
//     // else if (role === "Intern") navigate("/DeadlineDashboard");
//   };

//   return (
//     <div className="login-wrapper">
//       <div className="login-box">
//         {errors.general && <p className="error general-error">{errors.general}</p>}

//         <form onSubmit={handleSubmit}>
//           <h3 className="login-title">Intern Login</h3>

//           {/* Role selection */}
//           <div className="form-group">
//             <label>Login As*</label>
//             <div className="radio-group">
//               <label>
//                 <input
//                   type="radio"
//                   name="role"
//                   value="Staff"
//                   checked={role === "Staff"}
//                   onChange={(e) => setRole(e.target.value)}
//                 />
//                 Staff
//               </label>
//               <label>
//                 <input
//                   type="radio"
//                   name="role"
//                   value="Intern"
//                   checked={role === "Intern"}
//                   onChange={(e) => setRole(e.target.value)}
//                 />
//                 Intern
//               </label>
//             </div>
//             {errors.role && <span className="error">{errors.role}</span>}
//           </div>

//           {/* Email */}
//           <div className="form-group">
//             <label>Email*</label>
//             <input
//               type="email"
//               placeholder="enter email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//             {errors.email && <span className="error">{errors.email}</span>}
//           </div>

//           {/* Password */}
//           <div className="form-group">
//             <label>Password*</label>
//             <input
//               type="password"
//               placeholder="enter password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//             {errors.password && <span className="error">{errors.password}</span>}
//           </div>

//           <button type="submit">Log In</button>

//           {/* <p className="signup-text">
//             Don’t have an account? <Link to="/Authentication/Signup">Register</Link>
//           </p> */}
//         </form>
//       </div>
//     </div>
//   );
// }

// export default InternLogin;







 

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";

function InternLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const location = useLocation();

  // Get registered user either from location.state or localStorage
  const [registeredUser] = useState(
    location.state?.user || JSON.parse(localStorage.getItem("registeredUser"))
  );

  // Keep localStorage in sync
  useEffect(() => {
    if (registeredUser) {
      localStorage.setItem("registeredUser", JSON.stringify(registeredUser));
    }
  }, [registeredUser]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";
    if (!role) newErrors.role = "Please select your role";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Validate credentials
    if (
      !registeredUser ||
      registeredUser.email !== email ||
      registeredUser.password !== password ||
      registeredUser.role !== role
    ) {
      setErrors({ general: "Invalid email, password, or role!" });
      return;
    }

    // Clear errors before navigation
    setErrors({});

    // Navigate based on whether password has been changed
    if (registeredUser.changedPassword) {
      //  Already changed password → go to staff dashboard
      navigate("/intern/dashboard", { state: { user: registeredUser } });
    } else {
      //  First-time login → go to Change Password page
      navigate("/ChangePasswordIntern", { state: { user: registeredUser } });
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-box">
        {errors.general && (
          <p className="error general-error">{errors.general}</p>
        )}

        <form onSubmit={handleSubmit}>
          <h3 className="login-title">Intern Login</h3>

          {/* Role Selection */}
          <div className="form-group">
            <label>Login As*</label>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="role"
                  value="Staff"
                  checked={role === "Staff"}
                  onChange={(e) => setRole(e.target.value)}
                />
                Staff
              </label>
              <label>
                <input
                  type="radio"
                  name="role"
                  value="Intern"
                  checked={role === "Intern"}
                  onChange={(e) => setRole(e.target.value)}
                />
                Intern
              </label>
            </div>
            {errors.role && <span className="error">{errors.role}</span>}
          </div>

          {/* Email */}
          <div className="form-group">
            <label>Email*</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          {/* Password */}
          <div className="form-group">
            <label>Password*</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <span className="error">{errors.password}</span>}
          </div>

          <button type="submit">Log In</button>

          {/* <p className="signup-text">
            Don’t have an account?{" "}
            <Link to="/Authentication/Signup">Register</Link>
          </p> */}
        </form>
      </div>
    </div>
  );
}

export default InternLogin;

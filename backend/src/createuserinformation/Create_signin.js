
import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom"; // ✅ Added Link import
import "../Global.css";

function Signinpage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const location = useLocation();

  const registeredUser = location.state?.user;

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

    if (!registeredUser) {
      setErrors({ general: "No registered user found! Please sign up first." });
      return;
    }

    if (
      registeredUser.email !== email ||
      registeredUser.password !== password ||
      registeredUser.role !== role
    ) {
      setErrors({ general: "Invalid email, password, or role!" });
      return;
    }

    setErrors({});
     navigate("/DeadlineDashboard");
  };

  return (
    <div className="login-wrapper">
      
      <div className="login-box">
        {errors.general && <p className="error general-error">{errors.general}</p>}

        <form onSubmit={handleSubmit}>
          <h3 className="login-title">Login</h3>

          {/* Role Radio Buttons */}
          <div className="form-group">
            <label>Login As*</label>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="role"
                  value="Staff"
                  checked={role === "Staff"}
                  onChange={(e) => {
                    setRole(e.target.value);
                    setErrors({ ...errors, role: "" });
                  }}
                />
                Staff
              </label>
              <label>
                <input
                  type="radio"
                  name="role"
                  value="Intern"
                  checked={role === "Intern"}
                  onChange={(e) => {
                    setRole(e.target.value);
                    setErrors({ ...errors, role: "" });
                  }}
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
              placeholder="info@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors({ ...errors, email: "" });
              }}
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          {/* Password */}
          <div className="form-group">
            <label>Password*</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrors({ ...errors, password: "" });
              }}
            />
            {errors.password && <span className="error">{errors.password}</span>}
          </div>

          <button type="submit">Log In</button>

          {/* ✅ Fixed Link */}
          <p className="signup-text">
            Don’t have an account?{" "}
            <Link to="/Authentication/Signup">Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signinpage;

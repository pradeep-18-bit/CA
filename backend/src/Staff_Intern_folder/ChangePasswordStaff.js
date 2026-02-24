import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// import "../Global.css";

function ChangePasswordStaff() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state?.user;

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  if (!user) {
    return (
      <div className="login-wrapper">
        <div className="login-box">
          <p className="error">No user data found. Please login again.</p>
        </div>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!oldPassword) newErrors.oldPassword = "Old Password is required";
    if (!newPassword) newErrors.newPassword = "New Password is required";
    if (!confirmPassword) newErrors.confirmPassword = "Confirm Password is required";

    if (newPassword && confirmPassword && newPassword !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    if (oldPassword !== user.password)
      newErrors.oldPassword = "Old password is incorrect";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Simulate password update
    const updatedUser = { ...user, password: newPassword, changedPassword: true };

      localStorage.setItem("registeredUser", JSON.stringify(updatedUser));

    // Navigate to dashboard with updated user data
    navigate("/staff/dashboard", { state: { user: updatedUser } });
  };

  return (
    <div className="login-wrapper">
      <div className="login-box">
        <h3 className="login-title">Change Password</h3>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Old Password*</label>
            <input
              type="password"
              placeholder="Enter Old Password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
            {errors.oldPassword && <span className="error">{errors.oldPassword}</span>}
          </div>

          <div className="form-group">
            <label>New Password*</label>
            <input
              type="password"
              placeholder="Enter New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            {errors.newPassword && <span className="error">{errors.newPassword}</span>}
          </div>

          <div className="form-group">
            <label>Confirm Password*</label>
            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
          </div>

          <button type="submit">Update Password</button>
        </form>
      </div>
    </div>
  );
}

export default ChangePasswordStaff;

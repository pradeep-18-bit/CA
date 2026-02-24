import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Global.css";

function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  // Step 1: Send OTP
  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!email) {
      alert("Please enter your email");
      return;
    }

    const randomOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(randomOtp);
    alert(`Demo OTP: ${randomOtp}`);
    setStep(2);
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (!otp) {
      alert("Please enter the OTP");
      return;
    }
    if (otp !== generatedOtp) {
      alert("Invalid OTP, please try again");
      return;
    }
    setStep(3);
  };

  // Step 3: Reset Password
  const handleResetPassword = (e) => {
    e.preventDefault();
    if (!password || !confirmPassword) {
      alert("Please enter both password fields");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    alert("Password reset successful! Please login with your new password.");
    navigate("/Authentication/Signin");
  };

  return (
    <div className="forgot-wrapper">
      <div className="forgot-card">
        {step === 1 && (
          <form onSubmit={handleSendOtp}>
            <h3 className="form-title">Forgot Password</h3>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit">Send OTP</button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleVerifyOtp}>
            <h3 className="form-title">Verify OTP</h3>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button type="submit">Verify</button>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handleResetPassword}>
            <h3 className="form-title">Reset Password</h3>
            <input
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button type="submit">Reset Password</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;

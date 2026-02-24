import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const registeredUser = location.state?.user;
  const email = registeredUser?.email || "";

  const handleSendOtp = (e) => {
    e.preventDefault();

    if (!registeredUser) {
      alert("No registered user found! Please sign up first.");
      navigate("/signup");
      return;
    }

    const randomOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(randomOtp);
    alert(`OTP has been sent to ${email}\n\n(Demo OTP: ${randomOtp})`);
    setStep(2);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (!otp) {
      alert("Please enter OTP");
      return;
    }
    if (otp !== generatedOtp) {
      alert("Invalid OTP");
      return;
    }
    alert("OTP verified successfully!");
    setStep(3);
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    if (!password || !confirmPassword) {
      alert("Please fill both fields");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // Update user password in state and return to login
    const updatedUser = { ...registeredUser, password };
    alert("Password reset successful!");
    navigate("/Signin", { state: { user: updatedUser } });
  };

  return (
    <div className="forgot-wrapper">
      <div className="forgot-card">
        {step === 1 && (
          <>
            <h3 className="form-title">Forgot Password</h3>
            <form onSubmit={handleSendOtp}>
              <label>Email*</label>
              <input type="email" value={email} readOnly />
              <button type="submit">Send OTP</button>
            </form>
          </>
        )}

        {step === 2 && (
          <>
            <h3 className="form-title">Verify OTP</h3>
            <form onSubmit={handleVerifyOtp}>
              <label>Enter OTP*</label>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <button type="submit">Verify</button>
            </form>
          </>
        )}

        {step === 3 && (
          <>
            <h3 className="form-title">Reset Password</h3>
            <form onSubmit={handleResetPassword}>
              <label>New Password*</label>
              <input
                type="password"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label>Confirm Password*</label>
              <input
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button type="submit">Reset Password</button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;


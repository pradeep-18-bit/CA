// src/firmsettings/FirmSettings.js
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Signinpage from "./Create_signin";
import Signuppage from "./create_signup";
import ForgotPage from "./create_forgot";


export default function Authentication() {
  return (
    <div style={styles.container}>
      <div style={styles.contentBox}>
        <Routes>
          {/* Default redirect when visiting /firmsettings */}
          <Route path="/" element={<Navigate to="Signup" replace />} />

          {/* ⚠️ DO NOT put / in front */}
          <Route path="Signin" element={<Signinpage/>} />
          <Route path="Signup" element={<Signuppage />} />
          <Route path="Forgotpage" element={<ForgotPage />} />

         

        </Routes>
      </div>
    </div>
  );
}

const styles = {
  container: { fontFamily: "Arial, sans-serif"},
  
  }

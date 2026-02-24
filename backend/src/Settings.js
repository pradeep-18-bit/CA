// Settings.js
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Settings() {
  const [profile, setProfile] = useState({
    name: "Charan Reddy",
    email: "CharanReddy@example.com",
    role: "Associate Engineer",
  });

  const [preferences, setPreferences] = useState({
    dashboardTitle: "My Dashboard",
    themeColor: "Teal",
    landingPage: "Dashboard",
  });

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handlePrefChange = (e) => {
    const { name, value } = e.target;
    setPreferences((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    alert("✅ Settings saved!\n\n" + JSON.stringify({ profile, preferences }, null, 2));
  };

  return (
    <div style={pageWrapper}>
      <div style={pageContainer}>
        {/* Back Button */}
        <Link to="/DeadlineDashboard" style={{ textDecoration: "none" }}>
          <button style={backButton}>← Back to Dashboard</button>
        </Link>

        {/* Page Title */}
        <h1 style={pageTitle}>⚙️ Settings</h1>
        <p style={pageSubtitle}>
          Update your profile details and personalize your dashboard theme.
        </p>

        {/* Grid Layout */}
        <div style={contentGrid}>
          {/* Account Info */}
          <section style={card}>
            <h2 style={sectionTitle}>👤 Account Information</h2>
            <form style={form}>
              <div style={formGroup}>
                <label style={label}>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleProfileChange}
                  style={input}
                />
              </div>
              <div style={formGroup}>
                <label style={label}>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleProfileChange}
                  style={input}
                />
              </div>
              <div style={formGroup}>
                <label style={label}>Role / Position</label>
                <input
                  type="text"
                  name="role"
                  value={profile.role}
                  onChange={handleProfileChange}
                  style={input}
                />
              </div>
            </form>
          </section>

          {/* Preferences */}
          <section style={card}>
            <h2 style={sectionTitle}>🎨 Preferences</h2>
            <form style={form} onSubmit={handleSave}>
              <div style={formGroup}>
                <label style={label}>Dashboard Title</label>
                <input
                  type="text"
                  name="dashboardTitle"
                  value={preferences.dashboardTitle}
                  onChange={handlePrefChange}
                  style={input}
                />
              </div>

              <div style={formGroup}>
                <label style={label}>Theme Color</label>
                <select
                  name="themeColor"
                  value={preferences.themeColor}
                  onChange={handlePrefChange}
                  style={input}
                >
                  <option>Teal</option>
                  <option>Orange</option>
                  <option>Slate Gray</option>
                  <option>Dark Mode</option>
                </select>
              </div>

              <div style={formGroup}>
                <label style={label}>Default Landing Page</label>
                <select
                  name="landingPage"
                  value={preferences.landingPage}
                  onChange={handlePrefChange}
                  style={input}
                >
                  <option>Dashboard</option>
                  <option>Notifications</option>
                  <option>Reports</option>
                </select>
              </div>

              <button style={primaryButton} type="submit">
                💾 Save Settings
              </button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}

/* ---- Styles ---- */
const pageWrapper = {
  background: "#f1f5f9", // soft gray background
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
  padding: "40px 20px",
};

const pageContainer = {
  width: "100%",
  maxWidth: "1100px",
};

const pageTitle = {
  fontSize: "32px",
  fontWeight: "bold",
  color: "#0f172a", // dark slate
  marginTop: "10px",
};

const pageSubtitle = {
  marginTop: "6px",
  marginBottom: "32px",
  color: "#475569", // slate gray
  fontSize: "16px",
};

const contentGrid = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "32px",
};

const card = {
  background: "#ffffff",
  padding: "28px",
  borderRadius: "14px",
  boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
};

const sectionTitle = {
  fontSize: "20px",
  fontWeight: "600",
  marginBottom: "20px",
  color: "#0d9488", // teal primary
};

const form = { display: "flex", flexDirection: "column", gap: "18px" };

const formGroup = { display: "flex", flexDirection: "column" };

const label = { fontWeight: "500", color: "#334155", marginBottom: "6px" };

const input = {
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #cbd5e1",
  fontSize: "15px",
  outline: "none",
};

const primaryButton = {
  background: "#0d9488", // teal
  color: "#fff",
  padding: "14px",
  borderRadius: "8px",
  border: "none",
  fontSize: "16px",
  fontWeight: "600",
  cursor: "pointer",
  marginTop: "8px",
};

const backButton = {
  background: "#f97316", // orange accent
  color: "#fff",
  padding: "10px 18px",
  borderRadius: "8px",
  border: "none",
  fontSize: "14px",
  fontWeight: "600",
  cursor: "pointer",
  marginBottom: "16px",
};

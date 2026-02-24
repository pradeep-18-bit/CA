import React from "react";
import { useNavigate } from "react-router-dom";

export default function ContactUs() {
  const navigate = useNavigate();

  return (
    <div style={pageContainer}>
      {/* Back Button */}
      <button onClick={() => navigate("/DeadlineDashboard")} style={backButton}>
        ⬅ Back to Dashboard
      </button>

      {/* Page Title */}
      <header style={header}>
        <h1 style={{ fontSize: 28, fontWeight: "bold", color: "#fff" }}>
          Contact Us
        </h1>
        <p style={{ marginTop: 6, color: "#e0e7ff" }}>
          We'd love to hear from you. Reach out anytime!
        </p>
      </header>

      {/* Main Content */}
      <div style={contentGrid}>
        {/* Contact Info */}
        <section style={infoSection}>
          <h2 style={sectionTitle}>Our Office</h2>
          <p style={{ color: "#4b5563", marginBottom: 16 }}>
            We are here to assist you with your queries. Feel free to contact us
            through the details below.
          </p>

          <div style={infoCard}>
            <h3 style={infoTitle}>📍 Address</h3>
            <p style={infoText}>
              123 Business Park, Suite 400 <br />
              Hyderabad, India
            </p>
          </div>

          <div style={infoCard}>
            <h3 style={infoTitle}>📧 Email</h3>
            <p style={infoText}>support@mycompany.com</p>
          </div>

          <div style={infoCard}>
            <h3 style={infoTitle}>📞 Phone</h3>
            <p style={infoText}>+91 98765 43210</p>
          </div>
        </section>

        {/* Contact Form */}
        <section style={formSection}>
          <h2 style={sectionTitle}>Send a Message</h2>
          <form style={form} onSubmit={(e) => e.preventDefault()}>
            <div style={formGroup}>
              <label style={label}>Name</label>
              <input style={input} type="text" placeholder="Your Name" />
            </div>
            <div style={formGroup}>
              <label style={label}>Email</label>
              <input style={input} type="email" placeholder="you@example.com" />
            </div>
            <div style={formGroup}>
              <label style={label}>Message</label>
              <textarea
                style={{ ...input, height: "120px" }}
                placeholder="Your message here..."
              />
            </div>
            <button style={button} type="submit">
              Send Message
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}

/* --- Styles --- */
const pageContainer = {
  minHeight: "100vh",
  background: "#f9fafb",
  display: "flex",
  flexDirection: "column",
  padding: "24px",
};

const backButton = {
  background: "#1f2937",
  color: "#f4b443",
  border: "none",
  borderRadius: "8px",
  padding: "10px 16px",
  cursor: "pointer",
  fontWeight: "600",
  fontSize: "14px",
  marginBottom: "16px",
  alignSelf: "flex-start",
};

const header = {
  background: "#2563eb",
  padding: "15px 24px",
  textAlign: "center",
  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
};

const contentGrid = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "40px",
  padding: "40px 60px",
};

const infoSection = {
  background: "#fff",
  padding: "24px",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
};

const formSection = {
  background: "#fff",
  padding: "24px",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
};

const sectionTitle = {
  fontSize: "20px",
  fontWeight: "600",
  marginBottom: "16px",
  color: "#111827",
};

const infoCard = {
  marginBottom: "20px",
  padding: "16px",
  background: "#f3f4f6",
  borderRadius: "10px",
};

const infoTitle = {
  fontWeight: "600",
  marginBottom: "6px",
  color: "#2563eb",
};

const infoText = {
  color: "#374151",
};

const form = { display: "flex", flexDirection: "column", gap: "16px" };

const formGroup = { display: "flex", flexDirection: "column" };

const label = { marginBottom: "6px", fontWeight: "500", color: "#374151" };

const input = {
  padding: "12px",
  border: "1px solid #d1d5db",
  borderRadius: "8px",
  outline: "none",
  fontSize: "14px",
};

const button = {
  background: "#2563eb",
  color: "#fff",
  padding: "14px",
  borderRadius: "8px",
  border: "none",
  fontSize: "16px",
  fontWeight: "600",
  cursor: "pointer",
  marginTop: "8px",
};

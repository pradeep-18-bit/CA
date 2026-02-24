
// // src/firmsettings/Filmtop.js
// import React from "react";
// import { NavLink } from "react-router-dom";

// export default function Filmtop() {
//   const tabs = [
//     { name: "General", path: "/firmsettings/general" },
//     { name: "Contact", path: "/firmsettings/contact" },
//     { name: "Notifications", path: "/firmsettings/notifications" },
//     { name: "Security", path: "/firmsettings/security" },
//     { name: "Branding", path: "/firmsettings/branding" },
//   ];

//   return (
//     <div style={styles.topbar}>
//       {tabs.map((tab) => (
//         <NavLink
//           key={tab.name}
//           to={tab.path}   
//           style={({ isActive }) => ({
//             ...styles.link,
//             ...(isActive ? styles.activeLink : {}),
//           })}
//         >
//           {tab.name}
//         </NavLink>
//       ))}
//     </div>
//   );
// }

// const styles = {
//   topbar: {
//     display: "flex",
//     gap: "15px",
//     borderBottom: "2px solid #ddd",
//     paddingBottom: "10px",
//     marginBottom: "20px",
//   },
//   link: {
//     textDecoration: "none",
//     padding: "8px 15px",
//     borderRadius: "6px",
//     color: "#333",
//     background: "#f5f5f5",
//   },
//   activeLink: {
//     background: "#007bff",
//     color: "white",
//   },
// };



// src/firmsettings/Filmtop.js
import React from "react";
import { NavLink } from "react-router-dom";

export default function Filmtop() {
  const tabs = [
    { name: "General", path: "/firmsettings/general" },
    { name: "Contact", path: "/firmsettings/contact" },
    { name: "Notifications", path: "/firmsettings/notifications" },
    { name: "Security", path: "/firmsettings/security" },
    { name: "Branding", path: "/firmsettings/branding" },
  ];

  return (
    <div style={styles.container}>
      {/* Title */}
      <h1 style={styles.title}>Firm Settings</h1>
      <p style={styles.subtitle}>
        Configure your CA firm details and preferences
      </p>

      {/* Full-width tab bar */}
      <div style={styles.topbar}>
        {tabs.map((tab) => (
          <NavLink
            key={tab.name}
            to={tab.path}
            style={({ isActive }) => ({
              ...styles.link,
              ...(isActive ? styles.activeLink : {}),
            })}
          >
            {tab.name}
          </NavLink>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: "100%",
    padding:"10px",
    marginBottom: "20px",
  },
  title: {
    fontSize: "24px",
    fontWeight: "600",
    marginBottom: "6px",
    color: "#111827",
  },
  subtitle: {
    fontSize: "14px",
    color: "#6b7280",
    marginBottom: "20px",
  },
  topbar: {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)", // 5 equal-width columns
    width: "100%",
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
    overflow: "hidden",
  },
  link: {
    textDecoration: "none",
    padding: "12px 0",
    textAlign: "center",
    fontSize: "15px",
    fontWeight: "500",
    color: "#374151",
    background: "#f3f4f6", // light gray background
    transition: "all 0.2s ease",
  },
  activeLink: {
    background: "#fff", // active tab looks white
    color: "#111827",
    fontWeight: "600",
  },
};

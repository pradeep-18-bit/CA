// // src/firmsettings/FirmSettings.js
// import React from "react";
// import { Routes, Route, Navigate } from "react-router-dom";
// import Branding from "./brnding";
// import Filmcontact from "./Contact";
// import Filmtop from "./filmTopbar";
// import Filmnotifaction from "./Notifications";
// import Filmsecurity from "./Security";
// import General from "./General";

// export default function FirmSettings() {
//   return (
//     <div style={styles.container}>
//       {/* <h2 style={styles.heading}>Firm Settings</h2>
//       <p style={styles.subheading}>
//         Configure your CA firm details and preferences
//       </p> */}

//       {/* Local topbar for firm settings */}
//       <Filmtop />

//       {/* Nested Routes */}
//       <div style={styles.contentBox}>
//         <Routes>
//           {/* Default redirect when visiting /firmsettings */}
//           <Route path="/" element={<Navigate to="general" replace />} />

//           {/* ⚠️ DO NOT put / in front */}
//           <Route path="general" element={<General />} />
//           <Route path="contact" element={<Filmcontact />} />
//           <Route path="notifications" element={<Filmnotifaction />} />
//           <Route path="security" element={<Filmsecurity />} />
//           <Route path="branding" element={<Branding />} />

//         </Routes>
//       </div>
//     </div>
//   );
// }

// const styles = {
//   container: { fontFamily: "Arial, sans-serif" },
 
//   }
// src/firmsettings/FirmSettings.js
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Branding from "./brnding";
import Filmcontact from "./Contact";
import Filmtop from "./filmTopbar";
import Filmnotifaction from "./Notifications";
import Filmsecurity from "./Security";
import General from "./General";

export default function FirmSettings() {
  return (
    <div style={styles.container}>
      {/* <h2 style={styles.heading}>Firm Settings</h2>
      <p style={styles.subheading}>
        Configure your CA firm details and preferences
      </p> */}

      {/* Local topbar for firm settings */}
      <Filmtop />

      {/* Nested Routes */}
      <div style={styles.contentBox}>
        <Routes>
          {/* Default redirect when visiting /firmsettings */}
          <Route path="/" element={<Navigate to="general" replace />} />

          {/* ⚠️ DO NOT put / in front */}
          <Route path="general" element={<General />} />
          <Route path="contact" element={<Filmcontact />} />
          <Route path="notifications" element={<Filmnotifaction />} />
          <Route path="security" element={<Filmsecurity />} />
          <Route path="branding" element={<Branding />} />

        </Routes>
      </div>
    </div>
  );
}

const styles = {
  container: { fontFamily: "Arial, sans-serif" },
  // heading: { marginBottom: "5px" },
  // subheading: { marginBottom: "20px", color: "#666" },
  // contentBox: {
  //   marginTop: "20px",
  //   padding: "15px",
  //   border: "1px solid #eee",
  //   borderRadius: "8px",
    // background: "#fafafa",
  }

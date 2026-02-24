// import React, { useEffect, useRef } from "react";
// import PropTypes from "prop-types";
// import "./Global.css";

// function formatLastActivity(value) {
//   if (!value) return "-";
//   const d = value instanceof Date ? value : new Date(value);
//   if (isNaN(d)) return String(value);

//   // Return only date (no time)
//   return d.toLocaleDateString();
// }

// export default function ClientModal({ client, onClose }) {
//   const overlayRef = useRef(null);
//   const contentRef = useRef(null);
//   const previouslyFocused = useRef(null);

//   useEffect(() => {
//     if (!client) return;

//     previouslyFocused.current = document.activeElement;

//     const prevOverflow = document.body.style.overflow;
//     document.body.style.overflow = "hidden";

//     const firstFocusable = contentRef.current?.querySelector(
//       'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
//     );
//     (firstFocusable || contentRef.current)?.focus();

//     function handleKey(e) {
//       if (e.key === "Escape") {
//         e.preventDefault();
//         onClose?.();
//       } else if (e.key === "Tab") {
//         const focusable = contentRef.current.querySelectorAll(
//           'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
//         );
//         if (!focusable.length) return;
//         const nodes = Array.from(focusable);
//         const first = nodes[0];
//         const last = nodes[nodes.length - 1];
//         if (e.shiftKey && document.activeElement === first) {
//           e.preventDefault();
//           last.focus();
//         } else if (!e.shiftKey && document.activeElement === last) {
//           e.preventDefault();
//           first.focus();
//         }
//       }
//     }

//     document.addEventListener("keydown", handleKey);

//     return () => {
//       document.removeEventListener("keydown", handleKey);
//       document.body.style.overflow = prevOverflow;
//       previouslyFocused.current?.focus?.();
//     };
//   }, [client, onClose]);

//   if (!client) return null;

//   const name = client.clientName || client.name || "-";
//   const type = client.clientType || client.type || "-";
//   const pan = client.panNumber || client.pan || "-";
//   const gst = client.gstNumber || client.gstin || null;
//   const contact = client.contact || client.phone || "-";
//   const services =
//     Array.isArray(client.services)
//       ? client.services.join(", ")
//       : typeof client.services === "string"
//       ? client.services
//       : "-";
//   const status = client.status || "-";
//   const lastActivity = formatLastActivity(
//     client.lastActivity || client.last_activity || client.updatedAt
//   );

//   function handleOverlayMouseDown(e) {
//     if (e.target === overlayRef.current) onClose?.();
//   }

//   return (
//     <div
//       className="modal-overlay"
//       ref={overlayRef}
//       onMouseDown={handleOverlayMouseDown}
//     >
//       <div
//         className="modal-content"
//         ref={contentRef}
//         tabIndex={-1}
//         role="dialog"
//         aria-modal="true"
//         style={{
//           maxWidth: "420px",        // 🔽 reduced width
//           width: "90%",
//           padding: "14px 16px",     // 🔽 tighter padding
//           borderRadius: "8px",
//         }}
//       >
//         {/* Header */}
//         <div
//           className="modal-header"
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             marginBottom: "10px",
//           }}
//         >
//           <h3
//             id="client-modal-title"
//             style={{
//               margin: 0,
//               color: "#000",
//               fontSize: "16px",      // 🔽 smaller title
//               fontWeight: 600,
//             }}
//           >
//             Client Details
//           </h3>

//           <button
//             onClick={() => onClose?.()}
//             aria-label="Close"
//             title="Close"
//             style={{
//               background: "transparent",
//               border: "none",
//               padding: 0,
//               cursor: "pointer",
//               width: 18,
//               height: 18,
//               lineHeight: 0,
//             }}
//           >
//             <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
//               <line
//                 x1="4"
//                 y1="4"
//                 x2="16"
//                 y2="16"
//                 stroke="#000"
//                 strokeWidth="1.5"
//                 strokeLinecap="round"
//               />
//               <line
//                 x1="16"
//                 y1="4"
//                 x2="4"
//                 y2="16"
//                 stroke="#000"
//                 strokeWidth="1.5"
//                 strokeLinecap="round"
//               />
//             </svg>
//           </button>
//         </div>

//         {/* Body */}
//         <div className="modal-body">
//           {[
//             ["Name", name],
//             ["Type", type],
//             ["PAN", pan],
//             ["GST", gst],
//             ["Contact", contact],
//             ["Services", services],
//             ["Status", status],
//             ["Last Activity", lastActivity],
//           ].map(
//             ([label, value]) =>
//               value && (
//                 <div
//                   key={label}
//                   className="modal-row"
//                   style={{
//                     marginBottom: "6px", // 🔽 tighter spacing
//                     fontSize: "13px",    // 🔽 smaller text
//                   }}
//                 >
//                   <strong style={{ color: "#000" }}>{label}:</strong>{" "}
//                   <span style={{ color: "#222" }}>{value}</span>
//                 </div>
//               )
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// ClientModal.propTypes = {
//   client: PropTypes.object,
//   onClose: PropTypes.func.isRequired,
// };



import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import "./Global.css";

function formatLastActivity(value) {
  if (!value) return "-";
  const d = value instanceof Date ? value : new Date(value);
  if (isNaN(d)) return String(value);

  // Return only date (no time)
  return d.toLocaleDateString();
}

export default function ClientModal({ client, onClose }) {
  const overlayRef = useRef(null);
  const contentRef = useRef(null);
  const previouslyFocused = useRef(null);

  useEffect(() => {
    if (!client) return;

    previouslyFocused.current = document.activeElement;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const firstFocusable = contentRef.current?.querySelector(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    (firstFocusable || contentRef.current)?.focus();

    function handleKey(e) {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose?.();
      } else if (e.key === "Tab") {
        const focusable = contentRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable.length) return;
        const nodes = Array.from(focusable);
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", handleKey);

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = prevOverflow;
      previouslyFocused.current?.focus?.();
    };
  }, [client, onClose]);

  if (!client) return null;

  const name = client.clientName || client.name || "-";
  const type = client.clientType || client.type || "-";
  const pan = client.panNumber || client.pan || "-";
  const gst = client.gstNumber || client.gstin || null;
  const contact = client.contact || client.phone || "-";
  const services =
    Array.isArray(client.services)
      ? client.services.join(", ")
      : typeof client.services === "string"
      ? client.services
      : "-";
  const status = client.status || "-";
  const lastActivity = formatLastActivity(
    client.lastActivity || client.last_activity || client.updatedAt
  );

  function handleOverlayMouseDown(e) {
    if (e.target === overlayRef.current) onClose?.();
  }

  return (
    <div
      className="modal-overlay"
      ref={overlayRef}
      onMouseDown={handleOverlayMouseDown}
    >
      <div
        className="modal-content"
        ref={contentRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        style={{
          maxWidth: "420px",        // 🔽 reduced width
          width: "90%",
          padding: "14px 16px",     // 🔽 tighter padding
          borderRadius: "8px",
        }}
      >
        {/* Header */}
        <div
          className="modal-header"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <h3
            id="client-modal-title"
            style={{
              margin: 0,
              color: "#000",
              fontSize: "16px",      // 🔽 smaller title
              fontWeight: 600,
            }}
          >
            Client Details
          </h3>

          <button
            onClick={() => onClose?.()}
            aria-label="Close"
            title="Close"
            style={{
              background: "transparent",
              border: "none",
              padding: 0,
              cursor: "pointer",
              width: 18,
              height: 18,
              lineHeight: 0,
            }}
          >
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
              <line
                x1="4"
                y1="4"
                x2="16"
                y2="16"
                stroke="#000"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <line
                x1="16"
                y1="4"
                x2="4"
                y2="16"
                stroke="#000"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="modal-body">
          {[
            ["Name", name],
            ["Type", type],
            ["PAN", pan],
            ["GST", gst],
            ["Contact", contact],
            ["Services", services],
            ["Status", status],
            ["Last Activity", lastActivity],
          ].map(
            ([label, value]) =>
              value && (
                <div
                  key={label}
                  className="modal-row"
                  style={{
                    marginBottom: "6px", // 🔽 tighter spacing
                    fontSize: "13px",    // 🔽 smaller text
                  }}
                >
                  <strong style={{ color: "#000" }}>{label}:</strong>{" "}
                  <span style={{ color: "#222" }}>{value}</span>
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
}

ClientModal.propTypes = {
  client: PropTypes.object,
  onClose: PropTypes.func.isRequired,
};

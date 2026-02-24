// GenerateInvoicePage.jsx
import React, { useEffect, useRef, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
// import CaLogo from "./ca-logo.jpg";

const API_BASE =
  "https://posthemorrhagic-nonequilaterally-caroline.ngrok-free.dev/api/invoices";
const CLIENTS_API =
  "https://posthemorrhagic-nonequilaterally-caroline.ngrok-free.dev/api/clients";
const GST_RATE = 0.18;

export default function GenerateInvoicePage() {
  const [clients, setClients] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  const [selectedClientName, setSelectedClientName] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("INV-001");
  const [invoiceDate, setInvoiceDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [dueDate, setDueDate] = useState("");
  const [items, setItems] = useState([{ service: "", rate: "" }]);
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({
    client: "",
    dueDate: "",
    invoiceNumber: "",
    items: [{ service: "", rate: "" }],
    general: "",
  });

  const [showSendModal, setShowSendModal] = useState(false);
  const [showPdfModal, setShowPdfModal] = useState(false);

  // const companyLogoDataUrl = CaLogo;
  const invoicePreviewRef = useRef(null);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await fetch(CLIENTS_API, {
          headers: { "ngrok-skip-browser-warning": "true" },
        });
        if (!res.ok) throw new Error("Failed to fetch clients");
        const data = await res.json();
        setClients(data.map((c) => c.clientName));
      } catch (err) {
        console.error(err);
        setClients(["Dilshaad"]);
      }
    };
    fetchClients();
  }, []);

  const selectedClient = clients.find((c) => c === selectedClientName);

  const amounts = items.map((it) => Number(it.rate || 0));
  const subtotal = amounts.reduce((acc, cur) => acc + cur, 0);
  const gst = subtotal * GST_RATE;
  const total = subtotal + gst;
  const formatINR = (value) =>
    "₹" +
    Number(value || 0).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const ensureItemErrorsLength = (newItems) => {
    const errs = [...(errors.items || [])];
    while (errs.length < newItems.length) errs.push({ service: "", rate: "" });
    while (errs.length > newItems.length) errs.pop();
    return errs;
  };

  const handleAddItem = () => {
    const newItems = [...items, { service: "", rate: "" }];
    setItems(newItems);
    setErrors((prev) => ({ ...prev, items: ensureItemErrorsLength(newItems) }));
  };

  const handleRemoveItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    const final = newItems.length ? newItems : [{ service: "", rate: "" }];
    setItems(final);
    setErrors((prev) => ({ ...prev, items: ensureItemErrorsLength(final) }));
  };

  const handleItemChange = (index, field, value) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: value };
    setItems(updated);
    setErrors((prev) => {
      const itemErrs = prev.items ? [...prev.items] : [];
      itemErrs[index] = itemErrs[index] || { service: "", rate: "" };
      itemErrs[index][field === "rate" ? "rate" : "service"] = "";
      return { ...prev, items: itemErrs, general: "" };
    });
  };

  const formatInvoiceNumberOnBlur = (value) => {
    if (!value) return value;
    let v = value.toString().trim().toUpperCase().replace(/\s+/g, "");
    const invDigitsMatch = v.match(/^(?:INV-?|)(\d+)$/i);
    if (invDigitsMatch) {
      const digits = invDigitsMatch[1].padStart(3, "0");
      return `INV-${digits}`;
    }
    if (/^\d+$/.test(v)) {
      return `INV-${v.padStart(3, "0")}`;
    }
    return v;
  };

  const validateAll = () => {
    const newErrors = {
      client: "",
      dueDate: "",
      invoiceNumber: "",
      items: items.map(() => ({ service: "", rate: "" })),
      general: "",
    };
    let valid = true;

    if (!selectedClientName) {
      newErrors.client = "Please select a client.";
      valid = false;
    }
    if (!dueDate) {
      newErrors.dueDate = "Please select a due date.";
      valid = false;
    }
    if (!invoiceNumber || !invoiceNumber.trim()) {
      newErrors.invoiceNumber = "Invoice number is required.";
      valid = false;
    }

    items.forEach((it, idx) => {
      const service = (it.service || "").toString().trim();
      const rateRaw = it.rate;
      const rateNum = Number(rateRaw);
      if (!service) {
        newErrors.items[idx].service = "Service is required.";
        valid = false;
      }
      if (rateRaw === "" || rateRaw === null) {
        newErrors.items[idx].rate = "Rate is required.";
        valid = false;
      } else if (isNaN(rateNum) || rateNum <= 0) {
        newErrors.items[idx].rate = "Rate must be a number greater than 0.";
        valid = false;
      }
    });

    const anyValidItem = items.some((it) => (it.service || "").toString().trim() && Number(it.rate) > 0);
    if (!anyValidItem) {
      newErrors.general = "Please add at least one service with a valid rate.";
      valid = false;
    }

    setErrors(newErrors);
    return { valid, newErrors };
  };
    
   const handleSaveInvoice = async () => {
  const { valid, newErrors } = validateAll();
  if (!valid) {
    if (newErrors.client) {
      const el = document.querySelector("select");
      if (el) el.focus();
    } else if (newErrors.invoiceNumber) {
      const el = document.querySelector("input[name='invoiceNumber']");
      if (el) el.focus();
    } else {
      for (let i = 0; i < newErrors.items.length; i++) {
        if (newErrors.items[i].service) {
          const el = document.querySelectorAll(
            "input[placeholder='Service name or description']"
          )[i];
          if (el) el.focus();
          break;
        }
        if (newErrors.items[i].rate) {
          const el = document.querySelectorAll("input[type='number']")[i];
          if (el) el.focus();
          break;
        }
      }
    }
    return;
  }

  // ✅ CREATE PAYLOAD
  const payload = {
    invoiceNumber,
    invoiceDate: invoiceDate || new Date().toISOString().split("T")[0],
    dueDate,
    clientName: selectedClientName,
    status: "Pending",
    invoiceItems: JSON.stringify(
      items.map((it) => ({
        itemname: it.service,
        servicedescription: it.service,
        quantity: 1,
        rate: Number(it.rate),
        amount: Number(it.rate),
      }))
    ),
  };

 try {
  setLoading(true);

  const res = await fetch(API_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  let data = {};
  try {
    data = await res.json();
  } catch {
    data = {};
  }

  if (res.status === 409) {
    alert("Invoice number already exists!");
    return;
  }

  if (!res.ok) {
    alert(data?.message || "Failed to save invoice.");
    return;
  }

  // ✅ SUCCESS
  setSuccessMessage("Invoice created successfully");
  setTimeout(() => setSuccessMessage(""), 3000);

} catch (err) {
  console.error("FETCH FAILED:", err);
  alert("Server error. Please contact support.");
} finally {
  setLoading(false);
}

};



  const generatePdf = async () => {
    if (!invoicePreviewRef.current) return;
    const canvas = await html2canvas(invoicePreviewRef.current, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({ orientation: "portrait", unit: "pt", format: "a4" });
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${invoiceNumber || "invoice"}.pdf`);
  };

  const handleSendInvoice = () => {
    if (!selectedClient) return;
    alert(`Invoice sent to ${selectedClient} (email/mobile not available)`);
    setShowSendModal(false);
  };

  // const CompanyLogo = ({ size = 44 }) => (
  //   <img
  //     src={companyLogoDataUrl}
  //     alt="CA logo"
  //     style={{ width: size, height: size, objectFit: "contain", borderRadius: 6 }}
  //   />
  // );

  return (
    <div style={styles.page}>
      {/* scoped CSS */}
      <style>
        {`
          .icon-plain {
            background: transparent;
            border: 1px solid rgba(0,0,0,0.06);
            cursor: pointer;
            padding: 6px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            border-radius: 6px;
            width: 36px;
            height: 36px;
            box-sizing: border-box;
          }
          .icon-plain svg { display: block; }
          .icon-delete { color: #e11d48; border-color: rgba(225,29,72,0.12); }
          /* changed add to blue */
          .icon-add { color: #2563eb; border-color: rgba(37,99,235,0.12); }
          .field-error-space { min-height: 18px; }
          /* add button placed top-right inside the items card, slightly adjusted */
          .items-card-add {
            position: absolute;
            top: 28px;
            right: 18px;
            transform: translateY(-50%);
            z-index: 2;
          }
        `}
      </style>

      <header style={styles.header}>
        <h1 style={styles.h1}>Generate Invoice</h1>
        {/* <p style={styles.sub}>Create and send invoices to your clients</p> */}
        {successMessage && (
  <div style={styles.successMsg}>
    {successMessage}
  </div>
)}

      </header>

      <div style={styles.contentGrid}>
        <section style={styles.leftSection}>
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Client Information</h2>
            <small style={styles.cardSubtitle}>Select client to auto-fill details</small>
            <select
              style={{
                ...styles.selectInput,
                borderColor: errors.client ? "#dc2626" : styles.selectInput.borderColor,
              }}
              value={selectedClientName}
              onChange={(e) => {
                setSelectedClientName(e.target.value);
                setErrors((prev) => ({ ...prev, client: "" }));
              }}
            >
              <option value="">Choose a client</option>
              {clients.map((name, idx) => (
                <option key={idx} value={name}>
                  {name}
                </option>
              ))}
            </select>
            {errors.client && <div style={styles.fieldError}>{errors.client}</div>}
          </div>

          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Invoice Details</h2>
            <div style={styles.invoiceDetailsRow}>
              <label style={styles.label}>
                Invoice Number
                <input
                  name="invoiceNumber"
                  style={{
                    ...styles.input,
                    borderColor: errors.invoiceNumber ? "#dc2626" : styles.input.borderColor,
                  }}
                  type="text"
                  value={invoiceNumber}
                  onChange={(e) => {
                    setInvoiceNumber(e.target.value);
                    setErrors((prev) => ({ ...prev, invoiceNumber: "" }));
                  }}
                  onBlur={(e) => {
                    const formatted = formatInvoiceNumberOnBlur(e.target.value);
                    setInvoiceNumber(formatted);
                  }}
                />
                {errors.invoiceNumber && <div style={styles.fieldError}>{errors.invoiceNumber}</div>}
              </label>

              <label style={styles.label}>
                Invoice Date
                <input
                  style={styles.input}
                  type="date"
                  value={invoiceDate}
                  onChange={(e) => setInvoiceDate(e.target.value)}
                />
              </label>
            </div>

            <div style={{ marginTop: 12 }}>
              <label style={styles.label}>
                Due Date
                <input
                  style={{
                    ...styles.input,
                    borderColor: errors.dueDate ? "#dc2626" : styles.input.borderColor,
                  }}
                  type="date"
                  value={dueDate}
                  onChange={(e) => {
                    setDueDate(e.target.value);
                    setErrors((prev) => ({ ...prev, dueDate: "" }));
                  }}
                />
                {errors.dueDate && <div style={styles.fieldError}>{errors.dueDate}</div>}
              </label>
            </div>
          </div>

          {/* ITEMS / SERVICES CARD */}
          <div style={{ ...styles.card, position: "relative" }}>
            <div style={{ textAlign: "center", marginBottom: 8 }}>
              <h2 style={styles.cardTitle}>Items / Services</h2>
              <small style={styles.cardSubtitle}>Add services and rates (INR*)</small>
            </div>

            {/* ADD BUTTON inside the card header (top-right, blue) */}
            <div className="items-card-add">
              <button
                onClick={handleAddItem}
                title="Add item"
                className="icon-plain icon-add"
                aria-label="Add item"
                style={{ width: 36, height: 36 }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <path d="M12 5v14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {items.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    border: "1px solid #e5e7eb",
                    borderRadius: 10,
                    padding: 16,
                    background: "#fff",
                    position: "relative",
                  }}
                >
                  {/* TOP ROW: Service Title + Delete Button */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 10,
                    }}
                  >
                    <div style={{ fontSize: 15, fontWeight: 700 }}>Service {idx + 1}</div>

                    {/* DELETE ICON -> red, no background */}
                    <button
                      onClick={() => handleRemoveItem(idx)}
                      title="Remove"
                      className="icon-plain icon-delete"
                      aria-label={`Remove service ${idx + 1}`}
                      style={{ width: 36, height: 36 }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                        <path d="M3 6h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M10 11v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M14 11v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>

                  {/* SERVICE INPUT */}
                  <label style={styles.labelBlock}>
                    Service
                    <input
                      type="text"
                      placeholder="Service name or description"
                      style={{
                        ...styles.input,
                        borderColor:
                          errors.items[idx]?.service ? "#dc2626" : styles.input.borderColor,
                      }}
                      value={item.service}
                      onChange={(e) => handleItemChange(idx, "service", e.target.value)}
                    />
                    <div className="field-error-space" aria-hidden>
                      {errors.items[idx]?.service ? (
                        <div style={styles.fieldError}>{errors.items[idx].service}</div>
                      ) : null}
                    </div>
                  </label>

                  {/* RATE + TOTAL ROW */}
                  <div style={{ display: "flex", gap: 12, marginTop: 10 }}>
                    <label style={{ ...styles.label, flex: 1 }}>
                      Rate (INR*)
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        style={{
                          ...styles.input,height:"43px",
                          borderColor:
                            errors.items[idx]?.rate ? "#dc2626" : styles.input.borderColor,
                        }}
                        value={item.rate}
                        onChange={(e) => handleItemChange(idx, "rate", e.target.value)}
                      />
                      <div className="field-error-space" aria-hidden>
                        {errors.items[idx]?.rate ? (
                          <div style={styles.fieldError}>{errors.items[idx].rate}</div>
                        ) : null}
                      </div>
                    </label>

                    <label style={{ ...styles.label, flex: 1 }}>
                      Total (INR*)
                      <input
                        type="text"
                        readOnly
                        style={{
                          ...styles.input,
                          backgroundColor: "#f3f4f6",
                          width: "100%",
                        }}
                        value={formatINR(Number(item.rate || 0))}
                      />
                      <div style={{ minHeight: 18 }} aria-hidden />
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* GENERAL ERROR: moved below the entire items card */}
          <div style={{ marginTop: 8 }}>
            {errors.general ? (
              <div style={{ ...styles.fieldError }}>{errors.general}</div>
            ) : (
              <div style={{ minHeight: 18 }} />
            )}
          </div>
        </section>

        <section style={styles.rightSection}>
          <div style={styles.summaryCard}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h2 style={{ margin: 0 }}>Invoice Summary</h2>
              <div style={styles.smallBadge}>Preview</div>
            </div>

            <div style={{ marginTop: 12 }}>
              <div style={styles.summaryRow}>
                <span>Subtotal:</span>
                <span>{formatINR(subtotal)}</span>
              </div>
              <div style={styles.summaryRow}>
                <span>GST (18%):</span>
                <span>{formatINR(gst)}</span>
              </div>
              <hr style={{ margin: "12px 0", borderColor: "#e6edf8" }} />
              <div style={{ ...styles.summaryRow, fontWeight: 700, fontSize: 18 }}>
                <span>Total:</span>
                <span>{formatINR(total)}</span>
              </div>
            </div>

            <div style={{ marginTop: 18 }}>
              <div style={{ fontWeight: 700, marginBottom: 6 }}>Invoice Info:</div>
              <div style={{ fontSize: 13, color: "#2b6cb0" }}>Invoice: {invoiceNumber}</div>
              <div style={{ fontSize: 13, color: "#6b7280", marginTop: 6 }}>
                Date:{" "}
                {new Date(invoiceDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 18 }}>
              <button
                onClick={() => setShowPdfModal(true)}
                disabled={!selectedClientName}
                style={styles.generatePdfBtn}
              >
                Preview
              </button>

              <button onClick={handleSaveInvoice} disabled={loading} style={styles.saveBtnSmallRight}>
                {loading ? "Saving..." : "Save"}
              </button>
            </div>

            <div style={{ marginTop: 12, display: "flex", gap: 12 }}>
              <button
                style={styles.sendInvoiceBtn}
                onClick={() => setShowSendModal(true)}
                disabled={!selectedClientName}
              >
                Send Invoice
              </button>
            </div>
          </div>
        </section>
      </div>

      {showSendModal && selectedClient && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h3>Send Invoice to {selectedClient}</h3>
            <p>Email/mobile not available</p>
            <div style={{ marginTop: 20, textAlign: "right" }}>
              <button style={styles.sendInvoiceBtn} onClick={handleSendInvoice}>
                Send
              </button>
              <button
                style={{ ...styles.sendInvoiceBtn, marginLeft: 12 }}
                onClick={() => setShowSendModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showPdfModal && (
        <div
          className="preview-overlay-anim"
          style={styles.previewOverlay}
          onClick={() => setShowPdfModal(false)}
        >
          <div
            className="preview-modal-anim printable-modal"
            role="dialog"
            aria-modal="true"
            style={styles.previewModal}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={styles.previewHeader}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ fontSize: 18, fontWeight: 800, color: "#0b57a6" }}>Invoice Preview</div>
                <div style={{ fontSize: 12, color: "#6b7280" }}>{invoiceNumber} • {selectedClientName || "—"}</div>
              </div>

              <div style={{ display: "flex", gap: 8, alignItems: "center" }} className="no-print">
                <button onClick={generatePdf} style={styles.previewActionBtn}>Download</button>
                <button onClick={() => window.print()} style={styles.previewActionBtnAlt}>Print</button>
              </div>
            </div>

            <div ref={invoicePreviewRef} style={styles.previewBody}>
              <div style={styles.printHeader}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    {/* <CompanyLogo size={56} /> */}
                    <div>
                      <div style={{ fontSize: 20, fontWeight: 800 }}>CA PVT. LTD.</div>
                      <div style={{ fontSize: 12, color: "#6b7280", marginTop: 6 }}>
                        12, Finance Street, Bangalore • +91 90000 00000 • info@capvt.example
                      </div>
                    </div>
                  </div>

                  <div style={{ textAlign: "right", color: "#374151" }}>
                    <div><strong>Invoice:</strong> {invoiceNumber}</div>
                    <div style={{ marginTop: 6 }}><strong>Date:</strong> {new Date(invoiceDate).toLocaleDateString("en-IN")}</div>
                    <div style={{ marginTop: 6 }}><strong>Due:</strong> {dueDate ? new Date(dueDate).toLocaleDateString("en-IN") : "-"}</div>
                  </div>
                </div>

                <hr style={{ marginTop: 12, borderColor: "#eef6ff" }} />
              </div>

              <div style={{ marginTop: 14, marginBottom: 10 }}>
                <div style={{ fontSize: 13, color: "#374151", marginBottom: 8 }}><strong>Bill To:</strong></div>
                <div style={{ fontSize: 15, fontWeight: 700 }}>{selectedClientName || "—"}</div>
                <div style={{ fontSize: 12, color: "#6b7280", marginTop: 6 }}>Email/Mobile not available</div>
              </div>

              <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 18 }}>
                <thead>
                  <tr style={{ background: "#f1f7ff" }}>
                    <th style={styles.thTd}>Description</th>
                    <th style={styles.thTd}>Quantity</th>
                    <th style={styles.thTd}>Rate (₹)</th>
                    <th style={styles.thTd}>Amount (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, idx) => (
                    <tr key={idx}>
                      <td style={styles.thTd}>{item.service}</td>
                      <td style={{ ...styles.thTd, textAlign: "center" }}>1</td>
                      <td style={{ ...styles.thTd, textAlign: "right" }}>{Number(item.rate || 0).toFixed(2)}</td>
                      <td style={{ ...styles.thTd, textAlign: "right" }}>{Number(item.rate || 0).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: 24 }}>
                <div style={{ textAlign: "right", minWidth: 220 }}>
                  <div style={{ color: "#6b7280" }}>Subtotal: {formatINR(subtotal)}</div>
                  <div style={{ color: "#6b7280", marginTop: 6 }}>GST (18%): {formatINR(gst)}</div>
                  <div style={{ marginTop: 10, fontSize: 20, fontWeight: 800 }}>Total: {formatINR(total)}</div>
                </div>
              </div>

              <div style={{ marginTop: 22, borderTop: "1px dashed #e6eefb", paddingTop: 12, color: "#475569", fontSize: 13 }}>
                <div style={{ marginBottom: 6 }}>
                  <strong>Notes:</strong> Payment due within 15 days. Late payments may attract interest.
                </div>
                <div style={{ fontSize: 12, color: "#6b7280" }}>
                  Bank: ACME Bank • A/C: 0123456789 • IFSC: ACME0001234
                </div>
              </div>
            </div>

            <div style={{ marginTop: 12, textAlign: "right" }} className="no-print">
              <button style={{ ...styles.sendInvoiceBtn, marginLeft: 10 }} onClick={() => setShowPdfModal(false)}>Close</button>
            </div>

            <div className="print-footer" style={{ marginTop: 18, color: "#6b7280", fontSize: 12 }}>
              <div style={{ textAlign: "center" }}>
                CA PVT. LTD. — Chartered Accountants • 12 Finance Street, Bangalore • GSTIN: 29ABCDE1234F2Z5
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ----- styles ----- */
const styles = {
  page: {
    padding: 24,
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
    width: "100%",
    maxWidth: "none",
    margin: 0,
    backgroundColor: "#f7fbff",
    minHeight: "100vh",
    boxSizing: "border-box",
  },
  header: { marginBottom: 20 },
  h1: { fontWeight: 800, color: "#306ed0", fontSize: 40, margin: 0 },
  sub: { color: "#404654", marginTop: 6, marginBottom: 0,marginLeft:'-801px' },

  contentGrid: {
    display: "flex",
    gap: 24,
    flexWrap: "wrap",
    alignItems: "flex-start",
  },

  leftSection: { flex: "2 1 640px", minWidth: 320 },
  rightSection: { flex: "1 1 320px", minWidth: 300 },

  card: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 18,
    boxShadow: "0 6px 18px rgba(9,30,66,0.04)",
    marginBottom: 20,
    border: "1px solid rgba(16,88,248,0.03)",
    position: "relative",
  },

  cardTitle: { fontWeight: 700, fontSize: 16 },
  cardSubtitle: { fontSize: 12, color: "#000000ff", marginTop: 4 },
  selectInput: {
    marginTop: 12,
    width: "100%",
    padding: 8,
    fontSize: 14,
    borderColor: "#d1d5db",
    borderRadius: 6,
    border: "1px solid #d1d5db",
    boxSizing: "border-box",
  },
  invoiceDetailsRow: { display: "flex", gap: 12, alignItems: "flex-end", flexWrap: "wrap" },
  label: { display: "flex", flexDirection: "column", fontSize: 14, fontWeight: 500, flex: 1 },
  labelBlock: { display: "flex", flexDirection: "column", fontSize: 14, fontWeight: 500, marginBottom: 8 },
  input: {
    marginTop: 6,
    padding: 8,
    fontSize: 14,
    borderRadius: 6,
    border: "1px solid #d1d5db",
    borderColor: "#d1d5db",
    boxSizing: "border-box",
  },

  addItemRow: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: 12,
    width: "100%",
  },

  summaryCard: {
    background: "linear-gradient(180deg,#ffffff 0%, #f7fbff 100%)",
    borderRadius: 10,
    padding: 18,
    boxShadow: "0 10px 30px rgba(13, 64, 163, 0.06)",
    border: "1px solid rgba(42, 116, 255, 0.06)",
  },

  smallBadge: {
    background: "linear-gradient(90deg,#e6f0ff,#ffffff)",
    padding: "6px 10px",
    borderRadius: 999,
    fontSize: 12,
    color: "#0b57a6",
    border: "1px solid rgba(11,87,166,0.06)",
  },

  summaryRow: { display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: 15 },

  generatePdfBtn: {
    backgroundColor: "#2563eb",
    color: "white",
    padding: "10px 12px",
    border: "none",
    borderRadius: 8,
    fontWeight: 700,
    cursor: "pointer",
    fontSize: 13,
  },

  saveBtnSmallRight: {
    backgroundColor: "#0ea37a",
    color: "white",
    padding: "8px 10px",
    borderRadius: 8,
    border: "none",
    cursor: "pointer",
    fontSize: 13,
    fontWeight: 700,
    minWidth: 72,
  },

  sendInvoiceBtn: {
    backgroundColor: "#eef2ff",
    color: "#243b99",
    padding: "10px 12px",
    border: "none",
    borderRadius: 8,
    fontWeight: 700,
    cursor: "pointer",
    fontSize: 13,
  },

  previewOverlay: {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(9,30,66,0.45)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1400,
    padding: 20,
    boxSizing: "border-box",
  },
  previewModal: {
    width: "95%",
    maxWidth: 980,
    maxHeight: "90vh",
    overflowY: "auto",
    borderRadius: 12,
    background: "linear-gradient(180deg,#ffffff,#fbfdff)",
    boxShadow: "0 30px 80px rgba(2,6,23,0.35)",
    border: "1px solid rgba(8,86,167,0.06)",
    padding: 18,
    display: "flex",
    flexDirection: "column",
    boxSizing: "border-box",
  },

  previewHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid rgba(12,74,160,0.04)",
    paddingBottom: 12,
    marginBottom: 12,
  },

  previewActionBtn: {
    background: "#0b73d6",
    color: "white",
    border: "none",
    padding: "8px 10px",
    borderRadius: 8,
    fontWeight: 700,
    cursor: "pointer",
  },

  previewActionBtnAlt: {
    background: "#ffffff",
    border: "1px solid rgba(11,87,166,0.12)",
    color: "#0b57a6",
    padding: "8px 10px",
    borderRadius: 8,
    fontWeight: 700,
    cursor: "pointer",
  },

  previewCloseBtn: {
    background: "transparent",
    border: "1px solid rgba(11,87,166,0.12)",
    color: "#0b57a6",
    padding: "8px 10px",
    borderRadius: 8,
    cursor: "pointer",
    fontWeight: 700,
  },

  previewBody: {
    padding: 12,
    borderRadius: 8,
    background: "white",
    border: "1px solid rgba(227, 232, 240, 0.6)",
  },

  printHeader: {
    marginBottom: 8,
  },

  thTd: { padding: 10, border: "1px solid #e6eefb", fontSize: 14, textAlign: "left" },

  modalOverlay: {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(0,0,0,0.35)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
    padding: 16,
    boxSizing: "border-box",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 24,
    width: "100%",
    maxWidth: 480,
    boxShadow: "0 8px 24px rgb(0 0 0 / 0.2)",
    boxSizing: "border-box",
  },

  successMsg: {
  marginTop: 10,
  padding: "10px 16px",
  backgroundColor: "#ecfdf5",
  color: "#047857",
  border: "1px solid #a7f3d0",
  borderRadius: 8,
  fontSize: 14,
  fontWeight: 600,
  width: "fit-content",
  marginLeft:"400px",
},


  fieldError: { color: "#dc2626", fontSize: 12, marginTop: 6 },
};




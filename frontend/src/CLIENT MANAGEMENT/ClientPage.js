import React, { useEffect, useState } from "react";
import "./COMPONENTS/Global.css";
import ClientForm from "../CLIENT MANAGEMENT/COMPONENTS/ClientForm";
import ClientStats from "./COMPONENTS/ClientStats";
import ClientFilter from "./COMPONENTS/ClientFilter";
import ClientTable from "./COMPONENTS/ClientTable";
import ClientModal from "./COMPONENTS/ClientModal";
 
const initialFormState = {
  name: "",
  type: "Company",
  pan: "",
  gst: "",
  contact: "",
  services: "",
  status: "Active",
  lastActivity: "",
};
 
const API_URL =
  "https://posthemorrhagic-nonequilaterally-caroline.ngrok-free.dev/api/clients";
 
const ALL_CLIENTS_URL =
  "https://posthemorrhagic-nonequilaterally-caroline.ngrok-free.dev/api/clients/all";
 
const tableHeaderStyle = {
  padding: "12px 15px",
  fontWeight: "bold",
  color: "#495057",
  textAlign: "left",
  borderBottom: "2px solid #dee2e6",
};
 
const tableCellStyle = {
  padding: "10px 15px",
  textAlign: "left",
  verticalAlign: "top",
  wordBreak: "break-word",
};
 
const ClientsPage = () => {
  const [clients, setClients] = useState([]);
  const [deletedClients, setDeletedClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState(initialFormState);
  const [formErrors, setFormErrors] = useState({});
  const [filterVisible, setFilterVisible] = useState(false);
  const [filterData, setFilterData] = useState({ type: "", status: "" });
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClient, setSelectedClient] = useState(null);
  const [showHistory, setShowHistory] = useState(false);
  const [feedback, setFeedback] = useState(null);
 
  // ⭐ User Role
  const userRole = localStorage.getItem("role");
 
  const toggleView = () => {
    setShowHistory(!showHistory);
    setSearchQuery("");
    setFilterData({ type: "", status: "" });
    setFeedback(null);
  };
 
  const showFeedback = (message, type = "info") => {
    setFeedback({ message, type });
    setTimeout(() => setFeedback(null), 4000);
  };
 
  // Fetch Active Clients
  const fetchClients = async () => {
    try {
      setLoading(true);
 
      const response = await fetch(ALL_CLIENTS_URL, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "ngrok-skip-browser-warning": "true",
        },
      });
 
      const data = await response.json();
 
      setClients(
        data.sort(
          (a, b) => new Date(b.lastActivity) - new Date(a.lastActivity)
        )
      );
    } catch (error) {
      console.error("Fetch Clients Error:", error);
      setClients([]);
      showFeedback("⚠️ Error fetching clients", "error");
    } finally {
      setLoading(false);
    }
  };
 
  // Fetch Deleted Clients
  const fetchDeletedClients = async () => {
    try {
      const response = await fetch(`${API_URL}/deleted`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "ngrok-skip-browser-warning": "true",
        },
      });
 
      const data = await response.json();
      setDeletedClients(data);
    } catch (error) {
      console.error("Fetch Deleted Clients Error:", error);
      showFeedback("⚠️ Error fetching deleted clients", "error");
    }
  };
 
  useEffect(() => {
    fetchClients();
    fetchDeletedClients();
  }, []);
 
  // Validation
  const validatePAN = (pan) => /^[A-Za-z0-9]{10}$/.test(pan);
  const validateGST = (gst) => /^[A-Za-z0-9]{15}$/.test(gst);
  const validateContact = (contact) =>
    /^\d{10}$/.test(contact) ||
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact);
 
  const handleChange = (e) => {
    const { name, value } = e.target;
 
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };
 
  const validateForm = () => {
    const errors = {};
 
    if (!formData.name.trim()) errors.name = "Client Name is required";
    if (!formData.type.trim()) errors.type = "Client Type is required";
 
    if (!formData.pan.trim()) errors.pan = "PAN is required";
    else if (!validatePAN(formData.pan))
      errors.pan = "PAN must be 10 alphanumeric characters";
 
    if (!formData.gst.trim()) errors.gst = "GST is required";
    else if (!validateGST(formData.gst))
      errors.gst = "GST must be 15 alphanumeric characters";
 
    if (!formData.contact.trim()) errors.contact = "Contact is required";
    else if (!validateContact(formData.contact))
      errors.contact = "Contact must be 10 digits or valid email";
 
    if (!formData.services.trim()) errors.services = "Services required";
    if (!formData.status.trim()) errors.status = "Status required";
    if (!formData.lastActivity.trim()) errors.lastActivity = "Date required";
 
    setFormErrors(errors);
 
    return Object.keys(errors).length === 0;
  };
 
  // Submit Client
  const handleSubmit = async (e) => {
    e.preventDefault();
 
    if (!validateForm()) return;
 
    const newClient = {
      clientName: formData.name.trim(),
      clientType: formData.type.trim().toLowerCase(),
      panNumber: formData.pan.trim().toUpperCase(),
      gstNumber: formData.gst.trim().toUpperCase(),
      contact: formData.contact.trim(),
      services: formData.services
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
        .join(", "),
      status: formData.status,
      lastActivity:
        formData.lastActivity || new Date().toISOString().slice(0, 10),
    };
 
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
        body: JSON.stringify(newClient),
      });
 
      if (!response.ok) throw new Error(await response.text());
 
      showFeedback("✅ Client added successfully!", "success");
 
      setFormData(initialFormState);
      setFormErrors({});
      setShowForm(false);
 
      fetchClients();
    } catch (error) {
      console.error("Add Error:", error);
      showFeedback("❌ Error adding client", "error");
    }
  };
 
  // Delete
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: { "ngrok-skip-browser-warning": "true" },
      });
 
      if (!response.ok) throw new Error();
 
      await Promise.all([fetchClients(), fetchDeletedClients()]);
 
      showFeedback("🗑️ Client deleted", "info");
    } catch (error) {
      showFeedback("❌ Delete failed", "error");
    }
  };
 
  // Status Toggle
  const handleStatusChange = async (client) => {
    const newStatus = client.status === "Active" ? "Inactive" : "Active";
 
    try {
      const response = await fetch(`${API_URL}/${client.id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
        body: JSON.stringify({ status: newStatus }),
      });
 
      if (!response.ok) throw new Error();
 
      showFeedback(`✅ Status: ${newStatus}`, "success");
      fetchClients();
    } catch (error) {
      showFeedback("❌ Status update failed", "error");
    }
  };
 
  // Filters
  const handleFilterChange = (e) =>
    setFilterData({ ...filterData, [e.target.name]: e.target.value });
 
  const resetFilter = () => setFilterData({ type: "", status: "" });
 
  // Filtered Clients
  const filteredClients = clients.filter((c) => {
    const typeMatch = !filterData.type || c.clientType === filterData.type;
 
    const statusMatch =
      !filterData.status || c.status === filterData.status;
 
    const q = searchQuery.toLowerCase();
 
    const searchMatch =
      c.clientName?.toLowerCase().includes(q) ||
      c.panNumber?.toLowerCase().includes(q) ||
      c.gstNumber?.toLowerCase().includes(q);
 
    return typeMatch && statusMatch && searchMatch;
  });
 
  return (
    <div className="app-container">
 
      {/* Feedback */}
      {feedback && (
        <div
          style={{
            marginBottom: 15,
            padding: 10,
            borderRadius: 6,
            textAlign: "center",
            color:
              feedback.type === "success"
                ? "#155724"
                : feedback.type === "error"
                ? "#721c24"
                : "#0c5460",
            backgroundColor:
              feedback.type === "success"
                ? "#d4edda"
                : feedback.type === "error"
                ? "#f8d7da"
                : "#d1ecf1",
          }}
        >
          {feedback.message}
        </div>
      )}
 
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        <h2>
          {showHistory ? "Deleted Clients History" : "Client Management"}
        </h2>
 
        <div>
          <button
            className="submit-button-style"
            onClick={toggleView}
            style={{ marginRight: 10 }}
          >
            {showHistory ? "Show Active" : "Show History"}
          </button>
 
          {!showHistory &&
            userRole !== "intern" &&
            userRole !== "staff" && (
              <button
                className="submit-button-style"
                onClick={() => setShowForm(!showForm)}
              >
                + Add Client
              </button>
            )}
        </div>
      </div>
 
      {/* Form */}
      {showForm && (
        <div className="form-container">
          <ClientForm
            formData={formData}
            formErrors={formErrors}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            setShowForm={setShowForm}
          />
        </div>
      )}
 
      {/* Main Content */}
      {showHistory ? (
        <DeletedClientsTable
          deletedClients={deletedClients}
          tableHeaderStyle={tableHeaderStyle}
          tableCellStyle={tableCellStyle}
        />
      ) : loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <ClientStats filteredClients={filteredClients} />
 
          <ClientFilter
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            filterVisible={filterVisible}
            setFilterVisible={setFilterVisible}
            filterData={filterData}
            handleFilterChange={handleFilterChange}
            resetFilter={resetFilter}
          />
 
          {/* No Pagination - Full List */}
          <ClientTable
            paginatedClients={filteredClients.map((c) => ({
              ...c,
              services:
                typeof c.services === "string"
                  ? c.services
                  : Array.isArray(c.services)
                  ? c.services.join(", ")
                  : "-",
            }))}
            handleClientClick={setSelectedClient}
            handleDelete={handleDelete}
            handleStatusChange={handleStatusChange}
          />
 
          <ClientModal
            client={selectedClient}
            onClose={() => setSelectedClient(null)}
          />
        </>
      )}
    </div>
  );
};
 
// Deleted Clients Table
const DeletedClientsTable = ({
  deletedClients,
  tableHeaderStyle,
  tableCellStyle,
}) => (
  <div className="deleted-table-container">
 
    <h3 style={{ textAlign: "center", color: "#dc3545" }}>
      🗑️ Deleted Clients History
    </h3>
 
    {deletedClients.length === 0 ? (
      <p style={{ textAlign: "center" }}>No deleted clients found.</p>
    ) : (
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={tableHeaderStyle}>Name</th>
            <th style={tableHeaderStyle}>Type</th>
            <th style={tableHeaderStyle}>PAN</th>
            <th style={tableHeaderStyle}>GST</th>
            <th style={tableHeaderStyle}>Contact</th>
            <th style={tableHeaderStyle}>Services</th>
            <th style={tableHeaderStyle}>Deleted At</th>
          </tr>
        </thead>
 
        <tbody>
          {deletedClients.map((c, i) => (
            <tr key={c.id}>
              <td style={tableCellStyle}>{c.clientName}</td>
              <td style={tableCellStyle}>{c.clientType}</td>
              <td style={tableCellStyle}>{c.panNumber}</td>
              <td style={tableCellStyle}>{c.gstNumber}</td>
              <td style={tableCellStyle}>{c.contact}</td>
              <td style={tableCellStyle}>{c.services}</td>
              <td style={tableCellStyle}>
                {new Date(c.deletedAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
);
 
export default ClientsPage;
 

 
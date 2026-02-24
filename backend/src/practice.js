

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

// ✅ Replace with your working ngrok API
const API_URL =
  "https://posthemorrhagic-nonequilaterally-caroline.ngrok-free.dev/api/clients";

const ClientsPage = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState(initialFormState);
  const [errorMessage, setErrorMessage] = useState("");
  const [filterVisible, setFilterVisible] = useState(false);
  const [filterData, setFilterData] = useState({ type: "", status: "" });
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClient, setSelectedClient] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // ✅ Fetch clients
  const fetchClients = async () => {
    try {
      console.log("Fetching clients from:", API_URL);
      const response = await fetch(API_URL, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "ngrok-skip-browser-warning": "true", // prevent ngrok HTML page
        },
      });

      console.log("Response status:", response.status);
      const contentType = response.headers.get("content-type");
      console.log("Content-Type:", contentType);

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        console.log("✅ Clients fetched:", data);
        setClients(data);
      } else {
        const text = await response.text();
        console.error("❌ Invalid response text:", text.slice(0, 200));
        throw new Error("Invalid response: received HTML instead of JSON");
      }
    } catch (error) {
      console.error("❌ Fetch error:", error);
      setErrorMessage("Error fetching clients: " + error.message);
      setClients([]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fetch clients on page load
  useEffect(() => {
    fetchClients();
  }, []);

  // ✅ Validation
  const validatePAN = (pan) => /^[A-Za-z0-9]{10}$/.test(pan);
  const validateGST = (gst) => /^[A-Za-z0-9]{15}$/.test(gst);
  const validateContact = (contact) =>
    /^\d{10}$/.test(contact) || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact);

  // ✅ Handle form field change
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // ✅ Add client
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, pan, gst, contact } = formData;

    if (!name.trim() || !pan.trim())
      return setErrorMessage("Please enter at least Client Name and PAN.");
    if (!validatePAN(pan))
      return setErrorMessage("PAN must be exactly 10 alphanumeric characters.");
    if (gst && !validateGST(gst))
      return setErrorMessage("GST must be 15 alphanumeric characters if provided.");
    if (contact && !validateContact(contact))
      return setErrorMessage("Contact must be 10 digits or valid email.");

    const newClient = {
      clientName: name.trim(),
      clientType: formData.type.trim().toLowerCase(),
      panNumber: pan.trim().toUpperCase(),
      gstNumber: gst.trim().toUpperCase(),
      contact: contact.trim(),
      services: formData.services
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
        .join(", "),
      status: formData.status.trim(),
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

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      alert("✅ Client added successfully!");
      setFormData(initialFormState);
      setShowForm(false);
      fetchClients(); // Refresh list after add
    } catch (error) {
      console.error("Error adding client:", error);
      setErrorMessage("Error adding client: " + error.message);
    }
  };

  // ✅ Delete client
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this client?")) return;
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: { "ngrok-skip-browser-warning": "true" },
      });
      if (!response.ok) throw new Error("Failed to delete client.");
      alert("🗑️ Client deleted successfully!");
      fetchClients(); // refresh
    } catch (error) {
      console.error("Delete error:", error);
      alert("❌ Error deleting client: " + error.message);
    }
  };

  // ✅ Filters
  const handleFilterChange = (e) =>
    setFilterData({ ...filterData, [e.target.name]: e.target.value });
  const resetFilter = () => setFilterData({ type: "", status: "" });

  const filteredClients = clients.filter((c) => {
    const typeMatch = !filterData.type || c.clientType === filterData.type;
    const statusMatch = !filterData.status || c.status === filterData.status;
    const q = searchQuery.toLowerCase();
    const searchMatch =
      c.clientName?.toLowerCase().includes(q) ||
      c.panNumber?.toLowerCase().includes(q) ||
      c.gstNumber?.toLowerCase().includes(q);
    return typeMatch && statusMatch && searchMatch;
  });

  const totalPages = Math.ceil(filteredClients.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedClients = filteredClients.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="app-container">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <h2>Client Management</h2>
        <button
          className="submit-button-style"
          onClick={() => setShowForm(!showForm)}
        >
          + Add Client
        </button>
      </div>

      {showForm && (
        <ClientForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          setShowForm={setShowForm}
          errorMessage={errorMessage}
        />
      )}

      {loading ? (
        <p>Loading clients...</p>
      ) : filteredClients.length === 0 ? (
        <p>No clients found.</p>
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

          <ClientTable
            paginatedClients={paginatedClients.map((c) => ({
              ...c,
              services:
                typeof c.services === "string"
                  ? c.services
                  : Array.isArray(c.services)
                  ? c.services.join(", ")
                  : "-",
            }))}
            startIndex={startIndex}
            handleClientClick={setSelectedClient}
            totalPages={totalPages}
            currentPage={currentPage}
            handlePageChange={setCurrentPage}
            handleDelete={handleDelete}
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

export default ClientsPage;

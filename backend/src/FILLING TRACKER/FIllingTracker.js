
import React, { useState, useEffect } from "react";
import FilingHeader from "../FILLING TRACKER/COMPONENTS/FillingHeader";
import FilingFilter from "../FILLING TRACKER/COMPONENTS/FillingFilter";
import FilingTable from "../FILLING TRACKER/COMPONENTS/FillingTable";
import FilingModal from "../FILLING TRACKER/COMPONENTS/FillingModal";
import "../Global.css";

const FILING_API =
  "https://posthemorrhagic-nonequilaterally-caroline.ngrok-free.dev/api/filingtracker";

export default function FilingTracker() {
  const [filings, setFilings] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const [form, setForm] = useState({
    clientName: "",
    service: "",
    dueDate: "",
    status: "Pending",
    assignedTo: "",
    priority: "Medium",
  });

  const loggedEmail = (localStorage.getItem("email") || "").toLowerCase();
  const loggedRole = (localStorage.getItem("role") || "").toLowerCase();

  const isAdmin = loggedRole === "admin";
  const isStaffOrIntern = loggedRole === "staff" || loggedRole === "intern";

  // 🔹 FETCH FILINGS
    useEffect(() => {
  const fetchFilings = async () => {
    try {
      setLoading(true);

      const res = await fetch(FILING_API, {
        headers: {
          Accept: "application/json",
          "ngrok-skip-browser-warning": "true",
        },
      });

      if (!res.ok) {
        console.error("Fetch failed:", res.status);
        return;
      }

      const data = await res.json();
      console.log("Fetched filings:", data); // 🔴 DEBUG

      let filtered = data;

      if (!isAdmin && isStaffOrIntern) {
        filtered = data.filter(
          (f) =>
            f.assignedToEmail &&
            f.assignedToEmail.toLowerCase() === loggedEmail
        );
      }

      setFilings(filtered);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchFilings();
}, [loggedEmail, isAdmin, isStaffOrIntern]);

  // 🔹 FILTER
    const filteredFilings = filings.filter((f) => {
  if (editingId && f.id === editingId) return true;

  const s = search.toLowerCase();

  const matchesSearch =
    (f.clientName || "").toLowerCase().includes(s) ||
    (f.service || "").toLowerCase().includes(s) ||
    (f.assignedTo || "").toLowerCase().includes(s);

  const matchesStatus =
    filterStatus === "All" || f.status === filterStatus;

  return matchesSearch && matchesStatus;
});

  // 🔹 ADD MODAL
  const openAddModal = () => {
    setIsEditMode(false);
    setEditingId(null);
    setForm({
      clientName: "",
      service: "",
      dueDate: "",
      status: "Pending",
      assignedTo: "",
      priority: "Medium",
    });
    setShowModal(true);
  };

  // 🔹 EDIT MODAL (THIS IS WHAT YOU WANT)
  const openEditModal = (filing) => {
    setIsEditMode(true);
    setEditingId(filing.id);
    setForm({
      clientName: filing.clientName,
      service: filing.service,
      dueDate: filing.dueDate,
      status: filing.status,
      assignedTo: filing.assignedTo,
      priority: filing.priority,
    });
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  // 🔹 ADD
  const handleAdd = async () => {
    const res = await fetch(FILING_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const created = await res.json();
    setFilings((p) => [created, ...p]);
    closeModal();
  };

  // 🔹 EDIT (PATCH – MATCHES YOUR API SPEC)
    const handleEdit = async () => {
  try {
    const payload = {
      clientName: form.clientName,
      service: form.service,
      dueDate: form.dueDate,
      status: form.status,
      assignedTo: form.assignedTo,
      priority: form.priority,
    };

    const res = await fetch(`${FILING_API}/${editingId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) throw new Error("Update failed");

    await res.json();

    // ✅ CLOSE MODAL
    closeModal();

    // 🔥 FORCE FULL PAGE REFRESH (GUARANTEED)
    window.location.reload();

  } catch (err) {
    console.error("Edit error:", err);
    alert("Failed to update filing");
  }
};



  // 🔹 STATUS CHANGE
  const handleStatusChange = async (id, status) => {
    const res = await fetch(`${FILING_API}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    const updated = await res.json();

    setFilings((p) =>
      p.map((f) => (f.id === id ? { ...f, status: updated.status } : f))
    );
  };

  // 🔹 DELETE
  const handleDelete = async (id) => {
    await fetch(`${FILING_API}/${id}`, { method: "DELETE" });
    setFilings((p) => p.filter((f) => f.id !== id));
  };

  return (
    <div className="ft-container">
      <FilingHeader onNewFiling={openAddModal} />

      <FilingFilter
        search={search}
        status={filterStatus}
        onSearchChange={setSearch}
        onStatusChange={setFilterStatus}
      />

      {loading ? (
        <p style={{ textAlign: "center" }}>Loading…</p>
      ) : (
        <FilingTable
          filings={filteredFilings}
          onStatusChange={handleStatusChange}
          onDelete={handleDelete}
          onEdit={openEditModal}
        />
      )}

      {showModal && (
        <FilingModal
          form={form}
          onChange={handleChange}
          onClose={closeModal}
          onSubmit={isEditMode ? handleEdit : handleAdd}
        />
      )}
    </div>
  );
}

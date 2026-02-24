// src/USER MANAGEMENT/UserManagement.jsx
import React, { useState, useEffect } from "react";
import { FaUserPlus } from "react-icons/fa";
import UserStats from "../USER MANAGEMENT/COMPONENTS/UserStats";
import UserTable from "../USER MANAGEMENT/COMPONENTS/UserTable";
import AddUserModal from "./COMPONENTS/Addusermodal";
import "../Global.css";

const API_BASE =
  "https://posthemorrhagic-nonequilaterally-caroline.ngrok-free.dev/api/staff";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);

  // role from storage
  const userRole = (localStorage.getItem("role") || "").toLowerCase();

  // only non–intern/staff (i.e. admin/partner/manager) can add users
  const canAddUser = !(userRole === "intern" || userRole === "staff");

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    role: "Staff",
    department: "",
    joinDate: new Date().toISOString().split("T")[0],
    status: "Active",
    permissions: {},
  });

  const permissionMap = {
    "Clients Page": "clientManagement",
    "Filing Tracking": "filing",
    "Document Management": "documents",
    "Billing Page": "billing",
    "Report Analytics": "reports",
    "Firm Settings": "firmSettings",
    "User Management": "userManagement",
    "Compliance Calendar": "complianceCalendar",
    "Generative Invoice": "generateInvoice",
    "Time Tracking": "timeTracking",
    "Task Management": "taskManagement",
  };

  // map UI permissions → API fields
  const mapFormPermissionsToApi = (permissions) => {
    const apiPermissions = {};
    Object.values(permissionMap).forEach((apiKey) => {
      apiPermissions[apiKey] = false;
    });
    Object.entries(permissions).forEach(([formKey, value]) => {
      const apiKey = permissionMap[formKey];
      if (apiKey) apiPermissions[apiKey] = Boolean(value);
    });
    return apiPermissions;
  };

  // map API fields → UI permissions
  const mapApiPermissionsToForm = (user) => {
    const formPermissions = {};
    Object.entries(permissionMap).forEach(([formKey, apiKey]) => {
      formPermissions[formKey] = Boolean(user[apiKey]);
    });
    return formPermissions;
  };

  const capitalize = (str) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1) : "";

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await fetch(API_BASE, {
          headers: { "ngrok-skip-browser-warning": "true" },
        });
        if (!res.ok) throw new Error("Failed to fetch users");
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Submit (add / edit)
  const handleSubmitUser = async (e) => {
    e.preventDefault();

    const today = new Date().toISOString().split("T")[0];
    if (form.joinDate > today) {
      alert("Joining date cannot be in the future.");
      return;
    }

    if (!form.fullName || !form.email || !form.phone) {
      alert("Full name, email, and phone number are required.");
      return;
    }

    const payload = {
      fullName: form.fullName.trim(),
      emailAddress: form.email.trim(),
      phoneNumber: form.phone.trim(),
      role: form.role.trim().toLowerCase(),
      status: form.status.trim(),
      joiningDate: form.joinDate,
      department: form.department?.trim() || "",
      ...mapFormPermissionsToApi(form.permissions),
    };

    try {
      let res;
      if (editingUserId) {
        res = await fetch(`${API_BASE}/${editingUserId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch(API_BASE, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      const text = await res.text();
      if (!res.ok) throw new Error("Failed to save user");
      const savedUser = JSON.parse(text);

      if (editingUserId) {
        setUsers((prev) =>
          prev.map((u) => (u.id === editingUserId ? savedUser : u))
        );
      } else {
        setUsers((prev) => [savedUser, ...prev]);
      }

      // reset form + modal
      setForm({
        fullName: "",
        email: "",
        phone: "",
        role: "Staff",
        department: "",
        joinDate: new Date().toISOString().split("T")[0],
        status: "Active",
        permissions: {},
      });
      setEditingUserId(null);
      setShowModal(false);
    } catch (err) {
      console.error(err);
      alert("Failed to save user.");
    }
  };

  // Delete
  const handleDeleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      const res = await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete user.");
    }
  };

  // Edit
  const handleEditUser = (user) => {
    setForm({
      fullName: user.fullName || "",
      email: user.emailAddress || "",
      phone: user.phoneNumber || "",
      role: user.role ? capitalize(user.role) : "Staff",
      department: user.department || "",
      joinDate: user.joiningDate
        ? user.joiningDate.split("T")[0]
        : new Date().toISOString().split("T")[0],
      status: user.status || "Active",
      permissions: mapApiPermissionsToForm(user),
    });
    setEditingUserId(user.id);
    setShowModal(true);
  };

  const handleOpenAddModal = () => {
    setEditingUserId(null);
    setForm({
      fullName: "",
      email: "",
      phone: "",
      role: "Staff",
      department: "",
      joinDate: new Date().toISOString().split("T")[0],
      status: "Active",
      permissions: {},
    });
    setShowModal(true);
  };

  return (
    <div className="user-mgmt-root">
      <div className="user-mgmt-header">
        <div>
          <h1 className="user-mgmt-title" style={{fontSize:'35px'}}>User Management</h1>
          <p className="user-mgmt-desc" style={{color:'black',font:'bold'}}>
            Manage team members, roles, and permissions
          </p>
        </div>

        {canAddUser && (
          <button
            onClick={handleOpenAddModal}
            className="user-mgmt-add-btn"
            disabled={loading}
            aria-label="Add User"
            type="button"
          >
            <span className="add-btn-content">
              <FaUserPlus /> 
              <span className="add-btn-text" style={{padding:"2px",marginLeft:'1px'}}>  Add User</span>
            </span>
          </button>
        )}
      </div>

      {loading && <p>Loading...</p>}

      <UserStats users={users} />

      <UserTable
        users={users}
        onDelete={handleDeleteUser}
        onEdit={handleEditUser}
      />

      {showModal && (
        <AddUserModal
          form={form}
          setForm={setForm}
          onClose={() => {
            setShowModal(false);
            setEditingUserId(null);
          }}
          onSubmit={handleSubmitUser}
          editing={Boolean(editingUserId)}
        />
      )}
    </div>
  );
};

export default UserManagement;


import React, { useEffect, useState } from "react";
import TaskStats from "../TASK MANAGEMENT/COMPONENTS/TaskStats";
import TaskViewToggle from "../TASK MANAGEMENT/COMPONENTS/TaskViewToggle";
import TaskBoard from "../TASK MANAGEMENT/COMPONENTS/TaskBoard";
import TaskList from "../TASK MANAGEMENT/COMPONENTS/TaskList";
import TaskModal from "../TASK MANAGEMENT/COMPONENTS/TaskModal";
import "../Global.css";

const API = "https://posthemorrhagic-nonequilaterally-caroline.ngrok-free.dev";
const API_TASKS = `${API}/api/tasks`;
const API_STAFF = `${API}/api/staff`;

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  "ngrok-skip-browser-warning": "true",
};

export default function TaskManagement() {
  const [view, setView] = useState("kanban");
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [allTasks, setAllTasks] = useState([]);
  const [staffList, setStaffList] = useState([]);
  const [errorMsg, setErrorMsg] = useState(""); // ✅ error state

  const role = (localStorage.getItem("role") || "").toLowerCase();
  const loggedEmail = localStorage.getItem("email");

  const emptyTask = {
    title: "",
    client: "",
    assignedTo: "",
    assignedToEmail: "",
    createdByEmail: loggedEmail,
    dueDate: "",
    priority: "Medium",
    status: "To Do",
    hours: "",
    description: "",
  };

  const [taskForm, setTaskForm] = useState(emptyTask);

  // ================= LOAD STAFF =================
  const loadStaff = async () => {
    try {
      const res = await fetch(API_STAFF, { headers });
      if (!res.ok) throw new Error("Staff fetch failed");
      const data = await res.json();
      setStaffList(data);
      setErrorMsg("");
    } catch (err) {
      console.error(err);
      setStaffList([]);
      setErrorMsg("⚠️ Failed to fetch task management");
    }
  };

  // ================= LOAD TASKS =================
  const loadTasks = async () => {
    try {
      const res = await fetch(API_TASKS, { headers });
      if (!res.ok) throw new Error("Tasks fetch failed");
      const data = await res.json();

      const mapped = data.map((t) => ({
        id: t.id,
        title: t.taskName,
        client: t.client,
        assignedTo: t.assignedTo,
        assignedToEmail: t.assignedToEmail,
        createdByEmail: t.createdByEmail,
        dueDate: t.dueDate,
        priority: t.priority,
        status: t.status,
        description: t.description || "",
        hours: t.estimatedHours || "",
      }));

      setAllTasks(mapped);
      setErrorMsg("");
    } catch (err) {
      console.error(err);
      setAllTasks([]);
      setErrorMsg("⚠️ Failed to fetch task management");
    }
  };

  useEffect(() => {
    loadStaff();
    loadTasks();
  }, []);

  // ================= FILTER TASKS =================
  useEffect(() => {
    if (role === "admin") {
      setTasks(allTasks);
    } else {
      const email = loggedEmail?.toLowerCase();
      setTasks(
        allTasks.filter(
          (t) =>
            t.assignedToEmail?.toLowerCase() === email ||
            t.createdByEmail?.toLowerCase() === email
        )
      );
    }
  }, [allTasks, role, loggedEmail]);

  // ================= CREATE TASK =================
  const createTask = async () => {
    if (role === "intern") {
      alert("Interns cannot create tasks");
      return;
    }

    const payload = {
      taskName: taskForm.title,
      client: taskForm.client,
      assignedTo: taskForm.assignedTo,
      assignedToEmail: taskForm.assignedToEmail,
      createdByEmail: loggedEmail,
      dueDate: taskForm.dueDate,
      priority: taskForm.priority,
      estimatedHours: taskForm.hours,
      status: taskForm.status,
      description: taskForm.description,
    };

    try {
      await fetch(API_TASKS, {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
      });

      loadTasks();
      closeModal();
    } catch (err) {
      console.error(err);
      setErrorMsg("⚠️ Failed to fetch task management");
    }
  };

  // ================= UPDATE TASK =================
  const updateTask = async () => {
    const payload =
      role === "admin"
        ? {
            taskName: taskForm.title,
            client: taskForm.client,
            assignedTo: taskForm.assignedTo,
            assignedToEmail: taskForm.assignedToEmail,
            dueDate: taskForm.dueDate,
            priority: taskForm.priority,
            estimatedHours: taskForm.hours,
            status: taskForm.status,
            description: taskForm.description,
          }
        : {
            status: taskForm.status,
            description: taskForm.description,
          };

    try {
      await fetch(`${API_TASKS}/${editId}`, {
        method: "PUT",
        headers,
        body: JSON.stringify(payload),
      });

      loadTasks();
      closeModal();
    } catch (err) {
      console.error(err);
      setErrorMsg("⚠️ Failed to fetch task management");
    }
  };

  // ================= DELETE TASK =================
  const deleteTask = async (taskId) => {
    const task = allTasks.find((t) => t.id === taskId);
    if (!task) return;

    if (role === "intern") {
      alert("Interns cannot delete tasks");
      return;
    }

    if (role === "staff" && task.createdByEmail !== loggedEmail) {
      alert("You can delete only tasks created by you");
      return;
    }

    if (!window.confirm("Delete this task?")) return;

    try {
      await fetch(`${API_TASKS}/${taskId}`, {
        method: "DELETE",
        headers,
      });

      loadTasks();
    } catch (err) {
      console.error(err);
      setErrorMsg("⚠️ Failed to fetch task management");
    }
  };

  // ================= MODAL HANDLERS =================
  const openCreate = () => {
    setTaskForm(emptyTask);
    setEditId(null);
    setShowModal(true);
  };

  const editTask = (task) => {
    setEditId(task.id);
    setTaskForm({ ...task });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditId(null);
  };

  return (
    <div className="tm-container">
      <div className="tm-header">
        <h2>Task Management</h2>

        {role !== "intern" && (
          <button className="tm-createBtn" onClick={openCreate}>
            + Create Task
          </button>
        )}
      </div>

      {/* ✅ SIMPLE ERROR MESSAGE */}
      {errorMsg && (
        <div style={{ color: "orange", marginBottom: 10 }}>
          {errorMsg}
        </div>
      )}

      <TaskStats tasks={tasks} />
      <TaskViewToggle view={view} setView={setView} />

      {view === "kanban" ? (
        <TaskBoard
          tasks={tasks}
          onEdit={editTask}
          onDelete={deleteTask}
          role={role}
          loggedEmail={loggedEmail}
        />
      ) : (
        <TaskList
          tasks={tasks}
          onEdit={editTask}
          onDelete={deleteTask}
          role={role}
          loggedEmail={loggedEmail}
        />
      )}

      {showModal && (
        <TaskModal
          task={taskForm}
          setTask={setTaskForm}
          staff={staffList}
          onSave={editId ? updateTask : createTask}
          onClose={closeModal}
          isEdit={!!editId}
        />
      )}
    </div>
  );
}


import React, { useState } from "react";

const AddDeadlineForm = ({ onAdd }) => {
  const [form, setForm] = useState({ company: "", task: "", type: "", date: "" });

  const handleAdd = () => {
    onAdd(form);
    setForm({ company: "", task: "", type: "", date: "" });
  };

  return (
    <div className="card add-deadline-card">
      <h4 className="card-title">Add Deadline</h4>
      <div className="deadline-form">
        <input
          type="text"
          placeholder="Company Name"
          value={form.company}
          onChange={(e) => setForm({ ...form, company: e.target.value })}
          className="form-input"
        />
        <input
          type="text"
          placeholder="Task Description"
          value={form.task}
          onChange={(e) => setForm({ ...form, task: e.target.value })}
          className="form-input"
        />
        <select
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
          className="form-select"
        >
          <option value="">Select Type</option>
          <option value="GST">GST</option>
          <option value="TDS">TDS</option>
          <option value="ITR">ITR</option>
          <option value="ROC">ROC</option>
          <option value="Audit">Audit</option>
        </select>
        <input
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          className="form-date"
        />
        <button onClick={handleAdd} className="submit-btn">
          Add Deadline
        </button>
      </div>
    </div>
  );
};

export default AddDeadlineForm;

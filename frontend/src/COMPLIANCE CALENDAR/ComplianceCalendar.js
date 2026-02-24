import React, { useState, useEffect, useCallback } from "react";

const ComplianceCalendar = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState(today);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [deadlines, setDeadlines] = useState([]);
  const [activities, setActivities] = useState([]);
  const [clients, setClients] = useState([]);
  const [staff, setStaff] = useState([]);
  const [showSMTPModal, setShowSMTPModal] = useState(false);
  const [selectedDeadline, setSelectedDeadline] = useState(null);
  const [smtpForm, setSMTPForm] = useState({ to: "", subject: "", message: "", includeSMS: false, phoneNumber: "" });
  const [smtpErrors, setSMTPErrors] = useState({ to: "", subject: "", message: "", phoneNumber: "" });
  const [form, setForm] = useState({ company: "", task: "", taskDescription: "", date: "", assignedToName: "", assignedToEmail: "" });
  const [formErrors, setFormErrors] = useState({ company: "", task: "", taskDescription: "", date: "", assignedToName: "", assignedToEmail: "" });
  const [showAllDeadlines, setShowAllDeadlines] = useState(false);
  const [showAllActivities, setShowAllActivities] = useState(false);
  const [showAddDeadlineCard, setShowAddDeadlineCard] = useState(false);

  const API_BASE = "https://posthemorrhagic-nonequilaterally-caroline.ngrok-free.dev/api/compliancecalendar";
  const STAFF_API = "https://posthemorrhagic-nonequilaterally-caroline.ngrok-free.dev/api/staff";

  useEffect(() => {
    fetchDeadlines();
    fetchClients();
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      const response = await fetch(STAFF_API, { headers: { 'ngrok-skip-browser-warning': 'true' } });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const staffData = await response.json();
      setStaff(staffData);
    } catch (err) {
      console.error("Staff API Error:", err);
    }
  };

  const fetchDeadlines = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(API_BASE, { headers: { 'ngrok-skip-browser-warning': 'true' } });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      const transformedDeadlines = data.map(item => ({
        company: item.companyName,
        task: item.task,
        taskDescription: item.taskDescription || "",
        date: new Date(item.deadline),
        status: item.status || "Pending",
        color: getColorByStatus(item.status),
        id: item.complianceId,
        assignedToName: item.assignedToName || "",
        assignedToEmail: item.assignedToEmail || ""
      }));
      setDeadlines(transformedDeadlines);
      setActivities(transformedDeadlines.map(d => ({
        text: `${d.task} for ${d.company}`,
        description: d.taskDescription,
        time: "Due on " + d.date.toDateString(),
        status: d.status?.toLowerCase() || "pending",
        type: d.task,
        deadline: d,
        assignedToName: d.assignedToName,
        assignedToEmail: d.assignedToEmail
      })));
    } catch (err) {
      setError(`Failed to fetch deadlines: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const fetchClients = async () => {
    try {
      const response = await fetch("https://posthemorrhagic-nonequilaterally-caroline.ngrok-free.dev/api/clients/all", { headers: { 'ngrok-skip-browser-warning': 'true' } });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      setClients(await response.json());
    } catch (err) {
      console.error("Clients API Error:", err);
    }
  };

  const getColorByStatus = (status) => {
    if (!status) return "#6b7280";
    switch (status.toLowerCase()) {
      case "completed": return "#16a34a";
      case "pending": return "#f59e0b";
      case "overdue": return "#dc2626";
      default: return "#3b82f6";
    }
  };

  const getDeadlineColor = (deadlineDate) => {
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    const d = new Date(deadlineDate);
    d.setHours(0, 0, 0, 0);
    const diffDays = Math.ceil((d - t) / (1000 * 60 * 60 * 24));
    if (diffDays < 0) return "#dc2626";
    if (diffDays <= 7) return "#a855f7";
    return "#3b82f6";
  };

  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const changeMonth = (dir) => {
    if (dir === "prev") setCurrentMonth(p => { if (p === 0) { setCurrentYear(y => y - 1); return 11; } return p - 1; });
    else setCurrentMonth(p => { if (p === 11) { setCurrentYear(y => y + 1); return 0; } return p + 1; });
  };

  const validateForm = () => {
    const e = { company: "", task: "", taskDescription: "", date: "", assignedToName: "", assignedToEmail: "" };
    let v = true;
    if (!form.company.trim()) { e.company = "Client name is required"; v = false; }
    if (!form.task) { e.task = "Please select a task type"; v = false; }
    if (!form.taskDescription.trim()) { e.taskDescription = "Task description is required"; v = false; }
    if (!form.date) { e.date = "Date is required"; v = false; }
    if (!form.assignedToName) { e.assignedToName = "Please assign to a staff member"; v = false; }
    setFormErrors(e);
    return v;
  };

  const handleAddDeadline = async () => {
    if (!validateForm()) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(API_BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'ngrok-skip-browser-warning': 'true' },
        body: JSON.stringify({
          companyName: form.company,
          task: form.task,
          taskDescription: form.taskDescription,
          deadline: form.date,
          assignedToName: form.assignedToName,
          assignedToEmail: form.assignedToEmail
        })
      });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      await fetchDeadlines();
      setForm({ company: "", task: "", taskDescription: "", date: "", assignedToName: "", assignedToEmail: "" });
      setFormErrors({ company: "", task: "", taskDescription: "", date: "", assignedToName: "", assignedToEmail: "" });
      setShowAddDeadlineCard(false);
    } catch (err) {
      setError(`Failed to add deadline: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkComplete = async (i) => {
    const a = activities[i];
    if (!a.deadline) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/update-status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'ngrok-skip-browser-warning': 'true' },
        body: JSON.stringify({
          companyName: a.deadline.company,
          task: a.deadline.task,
          status: "Completed"
        })
      });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const u = [...activities];
      u[i].status = "completed";
      u[i].time = "just now";
      setActivities(u);
      await fetchDeadlines();
    } catch (err) {
      setError(`Failed to update status: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteActivity = async (i) => {
    const a = activities[i];
    if (a.deadline && a.deadline.id) {
      setLoading(true);
      setError(null);
      try {
        const deleteUrl = `${API_BASE}/${a.deadline.id}`;
        const res = await fetch(deleteUrl, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json', 'ngrok-skip-browser-warning': 'true' }
        });
        if (!res.ok) {
          try {
            const errData = await res.json();
            throw new Error(errData.message || `HTTP error! status: ${res.status}`);
          } catch {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
        }
        setActivities(activities.filter((_, idx) => idx !== i));
        await fetchDeadlines();
        setError(null);
      } catch (err) {
        setError(`Failed to delete task: ${err.message}`);
        console.error("Delete error:", err);
      } finally {
        setLoading(false);
      }
    } else {
      setActivities(activities.filter((_, idx) => idx !== i));
    }
  };

  const handleSendReminder = (d) => {
    setSelectedDeadline(d);
    setSMTPForm({ to: "", subject: `Reminder: ${d.task} - ${d.company}`, message: `This is a reminder that ${d.task} for ${d.company} is due on ${d.date.toDateString()}.`, includeSMS: false, phoneNumber: "" });
    setSMTPErrors({ to: "", subject: "", message: "", phoneNumber: "" });
    setShowSMTPModal(true);
  };

  const validateSMTPForm = () => {
    const e = { to: "", subject: "", message: "", phoneNumber: "" };
    let v = true;
    if (!smtpForm.to.trim()) { e.to = "Email address is required"; v = false; }
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(smtpForm.to)) { e.to = "Please enter a valid email address"; v = false; }
    if (!smtpForm.subject.trim()) { e.subject = "Subject is required"; v = false; }
    if (!smtpForm.message.trim()) { e.message = "Message is required"; v = false; }
    if (smtpForm.includeSMS && !smtpForm.phoneNumber.trim()) { e.phoneNumber = "Phone number is required when SMS is enabled"; v = false; }
    setSMTPErrors(e);
    return v;
  };

  const handleSendSMTP = () => {
    if (!validateSMTPForm()) return;
    const n = { text: `Reminder sent for ${selectedDeadline.task} - ${selectedDeadline.company}`, time: "just now", status: "reminder", type: selectedDeadline.task };
    if (smtpForm.includeSMS && smtpForm.phoneNumber) n.text += ` (Email + SMS to ${smtpForm.phoneNumber})`;
    else n.text += ` (Email to ${smtpForm.to})`;
    setActivities([n, ...activities]);
    setShowSMTPModal(false);
    setSMTPForm({ to: "", subject: "", message: "", includeSMS: false, phoneNumber: "" });
    setSMTPErrors({ to: "", subject: "", message: "", phoneNumber: "" });
    setSelectedDeadline(null);
  };

  const handleStaffChange = (staffId) => {
    const selectedStaff = staff.find(s => s.id === parseInt(staffId));
    if (selectedStaff) {
      setForm({
        ...form,
        assignedToName: selectedStaff.fullName,
        assignedToEmail: selectedStaff.emailAddress
      });
      if (formErrors.assignedToName) setFormErrors({ ...formErrors, assignedToName: "" });
    }
  };

  const filteredDeadlines = filter ? deadlines.filter(d => d.task === filter) : deadlines;
  const upcomingDeadlines = filteredDeadlines.filter(d => d.date.getMonth() === currentMonth && d.date.getFullYear() === currentYear).sort((a, b) => a.date - b.date);
  const displayedDeadlines = showAllDeadlines ? upcomingDeadlines : upcomingDeadlines.slice(0, 5);
  const displayedActivities = showAllActivities ? activities : activities.slice(0, 5);
  const counterData = [
    { title: "Due Today", value: deadlines.filter(d => d.date.toDateString() === today.toDateString()).length, color: "#dc2626", note: "Immediate attention required" },
    { title: "Due This Week", value: deadlines.filter(d => { const diff = (d.date - today) / (1000 * 60 * 60 * 24); return diff >= 0 && diff <= 7; }).length, color: "#f59e0b", note: "Upcoming deadlines" },
    { title: "Completed", value: activities.filter(a => a.status === "completed").length, color: "#16a34a", note: "This month" },
    { title: "Total Pending", value: deadlines.filter(d => d.status !== "Completed").length, color: "#111827", note: "Across all clients" }
  ];

  const cardStyle = { border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px', background: '#fff' };
  const inputStyle = { padding: '10px 12px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '14px', width: '100%', boxSizing: 'border-box' };
  const btnStyle = { padding: '10px 16px', backgroundColor: '#073D7F', color: '#fff', borderRadius: '6px', border: 'none', cursor: 'pointer', fontWeight: '500' };

  return (
    <div style={{ padding: '20px', overflowY: 'auto', backgroundColor: '#fff', maxWidth: '1400px', margin: '0 auto', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
       <style>{`

        * {

          scrollbar-width: none;

        }

        *::-webkit-scrollbar {

          display: none;

        }

      `}</style>
      <h2 style={{ fontSize: '30px', fontWeight: 'bold', marginBottom: '10px' , color: '#037' }}>Compliance Calendar</h2>
      <p style={{ color: '#6b7280', marginBottom: '20px' }}>Track all filing deadlines and compliance requirements</p>
      {loading && <div style={{ padding: '12px', backgroundColor: '#eff6ff', borderRadius: '6px', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px', color: '#1e40af' }}>⏳ Loading...</div>}
      {error && <div style={{ padding: '12px', backgroundColor: '#fee2e2', borderRadius: '6px', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px', color: '#991b1b' }}>❌ {error}</div>}

      <h3><button onClick={() => setShowAddDeadlineCard(!showAddDeadlineCard)} style={{ ...btnStyle, marginBottom: '20px', height: '40px', width: '160px', fontSize: '14px' ,   fontWeight: '600' , backgroundColor: '#037'  ,  textAlign: 'center'  }}>
        + Add Deadline
      </button></h3>

      {showAddDeadlineCard && (
  <div style={{ ...cardStyle, marginBottom: '20px' }}>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', position: 'relative' }}>
      {/* Client Select */}
      <div>
        <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '6px', color: '#374151' }}>Client</label>
        <select 
          value={form.company} 
          onChange={e => { setForm({ ...form, company: e.target.value }); if (formErrors.company) setFormErrors({ ...formErrors, company: "" }); }} 
          onFocus={e => { e.target.style.borderColor = '#3b82f6'; e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)'; }}
          onBlur={e => { e.target.style.borderColor = formErrors.company ? '#dc2626' : '#ddd'; e.target.style.boxShadow = 'none'; }}
          style={{ ...inputStyle, borderColor: formErrors.company ? '#dc2626' : '#ddd', width: '100%', transition: 'all 0.2s ease' }}
        >
          <option value="">Select Client</option>
          {clients.map((c, i) => <option key={i} value={c.clientName}>{c.clientName}</option>)}
        </select>
        {formErrors.company && <p style={{ color: '#dc2626', fontSize: '12px', marginTop: '4px', marginBottom: 0 }}>{formErrors.company}</p>}
      </div>

      {/* Task Type Select */}
      <div>
        <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '6px', color: '#374151' }}>Task Type</label>
        <select 
          value={form.task} 
          onChange={e => { setForm({ ...form, task: e.target.value }); if (formErrors.task) setFormErrors({ ...formErrors, task: "" }); }} 
          onFocus={e => { e.target.style.borderColor = '#3b82f6'; e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)'; }}
          onBlur={e => { e.target.style.borderColor = formErrors.task ? '#dc2626' : '#ddd'; e.target.style.boxShadow = 'none'; }}
          style={{ ...inputStyle, borderColor: formErrors.task ? '#dc2626' : '#ddd', width: '100%', transition: 'all 0.2s ease' }}
        >
          <option value="">Select Type</option>
          <option value="GST">GST</option>
          <option value="TDS">TDS</option>
          <option value="ITR">ITR</option>
          <option value="ROC">ROC</option>
          <option value="Audit">Audit</option>
        </select>
        {formErrors.task && <p style={{ color: '#dc2626', fontSize: '12px', marginTop: '4px', marginBottom: 0 }}>{formErrors.task}</p>}
      </div>

      {/* Task Description */}
      <div>
        <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '6px', color: '#374151' }}>Description</label>
        <input 
          type="text" 
          value={form.taskDescription} 
          onChange={e => { setForm({ ...form, taskDescription: e.target.value }); if (formErrors.taskDescription) setFormErrors({ ...formErrors, taskDescription: "" }); }} 
          onFocus={e => { e.target.style.borderColor = '#3b82f6'; e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)'; }}
          onBlur={e => { e.target.style.borderColor = formErrors.taskDescription ? '#dc2626' : '#ddd'; e.target.style.boxShadow = 'none'; }}
          style={{ ...inputStyle, borderColor: formErrors.taskDescription ? '#dc2626' : '#ddd', width: '100%', transition: 'all 0.2s ease' }}
        />
        {formErrors.taskDescription && <p style={{ color: '#dc2626', fontSize: '12px', marginTop: '4px', marginBottom: 0 }}>{formErrors.taskDescription}</p>}
      </div>

      {/* Deadline Date */}
      <div>
        <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '6px', color: '#374151' }}>Deadline Date</label>
        <input 
          type="date" 
          value={form.date} 
          onChange={e => { setForm({ ...form, date: e.target.value }); if (formErrors.date) setFormErrors({ ...formErrors, date: "" }); }} 
          onFocus={e => { e.target.style.borderColor = '#3b82f6'; e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)'; }}
          onBlur={e => { e.target.style.borderColor = formErrors.date ? '#dc2626' : '#ddd'; e.target.style.boxShadow = 'none'; }}
          style={{ ...inputStyle, borderColor: formErrors.date ? '#dc2626' : '#ddd', width: '100%', transition: 'all 0.2s ease' }}
        />
        {formErrors.date && <p style={{ color: '#dc2626', fontSize: '12px', marginTop: '4px', marginBottom: 0 }}>{formErrors.date}</p>}
      </div>

      {/* Assigned Staff */}
      <div>
        <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '6px', color: '#374151' }}>Assign To</label>
        <select 
          value={staff.find(s => s.fullName === form.assignedToName)?.id || ""} 
          onChange={e => { handleStaffChange(e.target.value); }} 
          onFocus={e => { e.target.style.borderColor = '#3b82f6'; e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)'; }}
          onBlur={e => { e.target.style.borderColor = formErrors.assignedToName ? '#dc2626' : '#ddd'; e.target.style.boxShadow = 'none'; }}
          style={{ ...inputStyle, borderColor: formErrors.assignedToName ? '#dc2626' : '#ddd', width: '100%', transition: 'all 0.2s ease' }}
        >
          <option value="">Select Staff</option>
          {staff.map((s, i) => <option key={i} value={s.id}>{s.fullName}</option>)}
        </select>
        {formErrors.assignedToName && <p style={{ color: '#dc2626', fontSize: '12px', marginTop: '4px', marginBottom: 0 }}>{formErrors.assignedToName}</p>}
      </div>

      {/* Email (Read Only) */}
      <div>
        <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '6px', color: '#374151' }}>Email</label>
        <input 
          type="email" 
          value={form.assignedToEmail} 
          readOnly 
          style={{ ...inputStyle, backgroundColor: '#f3f4f6', color: '#6b7280', width: '100%', cursor: 'not-allowed' }}
        />
      </div>

      {/* Submit Button */}
      <div style={{ display: 'flex', alignItems: 'flex-end' }}>
        <button 
          onClick={handleAddDeadline} 
          style={{ ...btnStyle, opacity: loading ? 0.6 : 1, width: '100%' }} 
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Deadline"}
        </button>
      </div>
    </div>
  </div>
)}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '20px' }}>
        {counterData.map((c, i) => <div key={i} style={{ ...cardStyle, minHeight: '100px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h4 style={{ marginBottom: '6px', fontWeight: '600', color: c.color }}>{c.title}</h4>
          <p style={{ fontSize: '28px', fontWeight: 'bold', margin: 0, color: c.color }}>{c.value}</p>
          <p style={{ fontSize: '12px', color: '#6b7280', margin: 0, marginTop: '4px' }}>{c.note}</p>
        </div>)}
      </div>

      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        <div style={{ ...cardStyle, flex: 2, minWidth: '600px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
            <h3><button onClick={() => changeMonth("prev")} style={{ padding: '8px 16px', background: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}>&lt;</button></h3>
            <h3 style={{ fontWeight: 'bold', fontSize: '18px' }}>{new Date(currentYear, currentMonth).toLocaleString("default", { month: "long" })} {currentYear}</h3>
            <h3><button onClick={() => changeMonth("next")} style={{ padding: '8px 16px', background: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}>&gt;</button></h3>
          </div>
          <h3><select value={filter} onChange={e => setFilter(e.target.value)} style={{ ...inputStyle, marginBottom: '15px' }}>
            <option value="">All Deadlines</option>
            <option value="GST">GST</option>
            <option value="TDS">TDS</option>
            <option value="ITR">ITR</option>
            <option value="ROC">ROC</option>
            <option value="Audit">Audit</option>
          </select></h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', textAlign: 'center', marginBottom: '10px', fontWeight: 'bold', color: '#374151' }}>
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(d => <div key={d}>{d}</div>)}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px' }}>
            {Array.from({ length: firstDay }).map((_, i) => <div key={"e" + i} />)}
            {Array.from({ length: daysInMonth }, (_, i) => {
              const n = i + 1, o = new Date(currentYear, currentMonth, n), dl = filteredDeadlines.filter(d => d.date.getDate() === n && d.date.getMonth() === currentMonth && d.date.getFullYear() === currentYear),
                iT = n === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear(),
                iS = selectedDate && o.toDateString() === selectedDate.toDateString(),
                tt = dl.length > 0 ? dl.map(d => { const dd = Math.ceil((d.date - today) / (1000 * 60 * 60 * 24)); return `${d.company}: ${d.task}\n${dd < 0 ? 'Overdue' : dd === 0 ? 'Due Today' : dd <= 7 ? 'This Week' : 'Upcoming'} - ${d.date.toDateString()}`; }).join('\n\n') : '';
              return <div key={i} onClick={() => setSelectedDate(o)} title={tt} style={{ padding: '12px', border: '1px solid #e5e7eb', borderRadius: '6px', cursor: 'pointer', textAlign: 'center', minHeight: '60px', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: iT ? '#eff6ff' : iS ? '#dbeafe' : '#fff', borderColor: iS ? '#051e4d' : '#e5e7eb' }}>
                {n}
                {dl.length > 0 && <div style={{ marginTop: '5px' }}><div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: getDeadlineColor(dl[0].date) }} /></div>}
              </div>;
            })}
          </div>
        </div>
        <div style={{ flex: 1, minWidth: '300px' }}>
          <div style={cardStyle}>
            <h4 style={{ marginBottom: '15px', fontWeight: 'bold', fontSize: '16px' }}>Upcoming Deadlines</h4>
            <hr style={{ margin: '10px 0', border: 'none', borderTop: '1px solid #e5e7eb' }} />
            {upcomingDeadlines.length > 0 ? <>
              {displayedDeadlines.map((d, i) => <div key={i} style={{ borderBottom: '1px solid #e5e7eb', padding: '12px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: 'bold', marginBottom: '4px' }}>{d.company}</p>
                  <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '6px' }}>{d.task}</p>
                  {d.assignedToName && <p style={{ fontSize: '12px', color: '#5b21b6', marginBottom: '6px', fontWeight: '500' }}>👤 {d.assignedToName}</p>}
                  <span style={{ color: '#fff', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', backgroundColor: d.color }}>{d.date.toDateString()}</span>
                </div>
                <button style={{ ...btnStyle, height: '40px', width: '140px', fontSize: '13px' }} onClick={() => handleSendReminder(d)}>📧 Send</button>
              </div>)}
              {upcomingDeadlines.length > 5 && <button style={{ width: '100%', padding: '10px', marginTop: '12px', backgroundColor: '#f3f4f6', color: '#374151', border: '1px solid #e5e7eb', borderRadius: '6px', cursor: 'pointer' }} onClick={() => setShowAllDeadlines(!showAllDeadlines)}>{showAllDeadlines ? "View Less" : `View All (${upcomingDeadlines.length})`}</button>}
            </> : <p style={{ color: '#6b7280', textAlign: 'center' }}>No upcoming deadlines</p>}
          </div>
        </div>
      </div>

      <div style={{ ...cardStyle, marginTop: '30px' }}>
        <h4 style={{ marginBottom: '15px', fontWeight: 'bold', fontSize: '16px' }}>Recent Activities</h4>
        <hr style={{ margin: '10px 0', border: 'none', borderTop: '1px solid #e5e7eb' }} />
        {activities.length > 0 ? <>
          {displayedActivities.map((a, i) => <div key={i} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e5e7eb', padding: '12px 0', alignItems: 'flex-start', gap: '16px' }}>
            <div style={{ flex: 1 }}>
              <p style={{ margin: '0 0 4px 0' }}>{a.text}</p>
              {a.description && <p style={{ fontSize: '12px', color: '#6b7280', margin: '4px 0' }}>{a.description}</p>}
              {a.assignedToName && <p style={{ fontSize: '12px', color: '#5b21b6', margin: '4px 0', fontWeight: '500' }}>👤 {a.assignedToName}</p>}
              <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>{a.time}</p>
            </div>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <span style={{ color: '#fff', padding: '6px 16px', borderRadius: '20px', fontSize: '14px', minWidth: '100px', textAlign: 'center', textTransform: 'capitalize', backgroundColor: a.status === 'completed' ? '#037' : a.status === 'reminder' ? '#6b7280' : '#81807fff' }}>{a.status}</span>
              {a.status === "pending" && <button style={{ width: '40px', height: '40px', border: 'none', borderRadius: '8px', cursor: 'pointer', backgroundColor: '#f3f4f6', color: '#16a34a', fontWeight: 'bold' }} onClick={() => handleMarkComplete(i)} disabled={loading}>✓</button>}
              <button style={{ width: '40px', height: '40px', border: 'none', borderRadius: '8px', cursor: 'pointer', backgroundColor: '#f0f0f0', color: '#dc2626', fontWeight: 'bold' }} onClick={() => handleDeleteActivity(i)}>🗑️</button>
            </div>
          </div>)}
          {activities.length > 5 && <button style={{ width: '100%', padding: '10px', marginTop: '12px', backgroundColor: '#d4d4d4', color: '#374151', border: '1px solid #e5e7eb', borderRadius: '6px', cursor: 'pointer' }} onClick={() => setShowAllActivities(!showAllActivities)}>{showAllActivities ? "View Less" : `View All (${activities.length})`}</button>}
        </> : <p style={{ color: '#6b7280', textAlign: 'center' }}>No recent activities</p>}
      </div>

      {showSMTPModal && (   
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', width: '400px', boxSizing: 'border-box' }}>
            <h3 style={{ marginBottom: '15px', fontWeight: 'bold' }}>Send Reminder</h3> 
            <div style={{ marginBottom: '12px' }}>
              <input type="email" placeholder="To Email Address" value={smtpForm.to} onChange={e => { setSMTPForm({ ...smtpForm, to: e.target.value }); if (smtpErrors.to) setSMTPErrors({ ...smtpErrors, to: "" }); }} style={{ ...inputStyle, borderColor: smtpErrors.to ? '#dc2626' : '#ddd' }} />
              {smtpErrors.to && <p style={{ color: '#dc2626', fontSize: '12px', marginTop: '4px', marginBottom: 0 }}>{smtpErrors.to}</p>}
            </div>
            <div style={{ marginBottom: '12px' }}>
              <input type="text" placeholder="Subject" value={smtpForm.subject} onChange={e => { setSMTPForm({ ...smtpForm, subject: e.target.value }); if (smtpErrors.subject) setSMTPErrors({ ...smtpErrors, subject: "" }); }} style={{ ...inputStyle, borderColor: smtpErrors.subject ? '#dc2626' : '#ddd' }} />
              {smtpErrors.subject && <p style={{ color: '#dc2626', fontSize: '12px', marginTop: '4px', marginBottom: 0 }}>{smtpErrors.subject}</p>}
            </div>
            <div style={{ marginBottom: '12px' }}>

              <textarea placeholder="Message" value={smtpForm.message} onChange={e => { setSMTPForm({ ...smtpForm, message: e.target.value }); if (smtpErrors.message) setSMTPErrors({ ...smtpErrors, message: "" }); }} style={{ ...inputStyle, height: '100px', borderColor: smtpErrors.message ? '#dc2626' : '#ddd' }} />
              {smtpErrors.message && <p style={{ color: '#dc2626', fontSize: '12px', marginTop: '4px', marginBottom: 0 }}>{smtpErrors.message}</p>}
            </div>
            <div style={{ marginBottom: '12px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input type="checkbox" checked={smtpForm.includeSMS} onChange={e => setSMTPForm({ ...smtpForm, includeSMS: e.target.checked })} />
                <span>Include SMS Reminder</span>
              </label>
              {smtpForm.includeSMS && (
                <div style={{ marginTop: '8px' }}>  
                  <input type="text" placeholder="Phone Number" value={smtpForm.phoneNumber} onChange={e => { setSMTPForm({ ...smtpForm, phoneNumber: e.target.value }); if (smtpErrors.phoneNumber) setSMTPErrors({ ...smtpErrors, phoneNumber: "" }); }} style={{ ...inputStyle, borderColor: smtpErrors.phoneNumber ? '#dc2626' : '#ddd' }} />
                  {smtpErrors.phoneNumber && <p style={{ color: '#dc2626', fontSize: '12px', marginTop: '4px', marginBottom: 0 }}>{smtpErrors.phoneNumber}</p>}
                </div>
              )}
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button onClick={() => setShowSMTPModal(false)} style={{ ...btnStyle, backgroundColor: '#6b7280' }}>Cancel</button>
              <button onClick={handleSendSMTP} style={btnStyle}>Send</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

}
export default ComplianceCalendar;
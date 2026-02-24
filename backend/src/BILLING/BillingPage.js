import React, { useState, useEffect } from "react";
import "../BILLING/Billing.css";
// --- ICONS ---
const EyeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 5C8.24261 5 5.43602 7.4404 3.76737 9.43934C2.92545 10.4509 2.92545 11.5491 3.76737 12.5607C5.43602 14.5596 8.24261 17 12 17C15.7574 17 18.564 14.5596 20.2326 12.5607C21.0746 11.5491 21.0746 10.4509 20.2326 9.43934C18.564 7.4404 15.7574 5 12 5ZM12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12C15 13.6569 13.6569 15 12 15Z"/>
  </svg>
);

const EditIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M11 2C10.4477 2 10 2.44772 10 3V4H4C3.44772 4 3 4.44772 3 5V20C3 20.5523 3.44772 21 4 21H20C20.5523 21 21 20.5523 21 20V5C21 4.44772 20.5523 4 20 4H14V3C14 2.44772 13.5523 2 13 2H11ZM12 4H12V5H14V4H12ZM5 6H19V19H5V6Z"/>
    <path d="M16.0429 8.29289C15.6524 7.90237 15.0192 7.90237 14.6287 8.29289L9 13.9216V15H10.0784L15.7071 9.3713C16.0976 8.98078 16.0976 8.34761 15.7071 7.95709L16.0429 8.29289Z"/>
  </svg>
);

const TrashIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M10 2C9.44772 2 9 2.44772 9 3V4H4C3.44772 4 3 4.44772 3 5C3 5.55228 3.44772 6 4 6H5V19C5 20.6569 6.34315 22 8 22H16C17.6569 22 19 20.6569 19 19V6H20C20.5523 6 21 5.55228 21 5C21 4.44772 20.5523 4 20 4H15V3C15 2.44772 14.5523 2 14 2H10ZM7 6H17V19C17 19.5523 16.5523 20 16 20H8C7.44772 20 7 19.5523 7 19V6Z"/>
    <path d="M10 9C10.5523 9 11 9.44772 11 10V17C11 17.5523 10.5523 18 10 18C9.44772 18 9 17.5523 9 17V10C9 9.44772 9.44772 9 10 9Z"/>
    <path d="M14 9C14.5523 9 15 9.44772 15 10V17C15 17.5523 14.5523 18 14 18C13.4477 18 13 17.5523 13 17V10C13 9.44772 13.4477 9 14 9Z"/>
  </svg>
);

const RefreshIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/>
  </svg>
);

// --- STYLES ---
const actionButtonStyles = { 
  background: 'none', 
  border: 'none', 
  cursor: 'pointer', 
  padding: '5px', 
  color: '#718096',
  transition: 'color 0.2s'
};

const statusStyles = {
  "Paid": { background: '#c6f6d5', color: '#22543d', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: '500', display: 'inline-block' },
  "Completed": { background: '#c6f6d5', color: '#22543d', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: '500', display: 'inline-block' },
  "Pending": { background: '#feebc8', color: '#7c2d12', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: '500', display: 'inline-block' },
  "Overdue": { background: '#fed7d7', color: '#742a2a', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: '500', display: 'inline-block' }
};

const primaryButtonStyles = { 
  background: '#073D7F', 
  color: 'white', 
  border: 'none', 
  padding: '10px 20px', 
  borderRadius: '8px', 
  fontSize: '14px', 
  fontWeight: '600', 
  cursor: 'pointer', 
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  transition: 'all 0.2s'
};

const modalStyles = {
  overlay: { 
    position: 'fixed', 
    top: 0, 
    left: 0, 
    right: 0, 
    bottom: 0, 
    background: 'rgba(0,0,0,0.7)', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center', 
    zIndex: 1000,
    animation: 'fadeIn 0.3s'
  },
  content: { 
    background: 'white', 
    padding: '30px', 
    borderRadius: '12px', 
    width: '100%', 
    maxWidth: '600px', 
    maxHeight: '90vh',
    overflowY: 'auto',
    boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
    animation: 'slideUp 0.3s'
  },
  header: { 
    margin: 0, 
    marginBottom: '25px', 
    color: '#1a202c',
    fontSize: '24px',
    fontWeight: '700',
    borderBottom: '2px solid #e2e8f0',
    paddingBottom: '15px'
  },
  formGroup: { 
    marginBottom: '18px' 
  },
  label: { 
    display: 'block', 
    marginBottom: '6px', 
    fontWeight: '600', 
    color: '#4a5568',
    fontSize: '14px'
  },
  input: { 
    width: '100%', 
    padding: '12px', 
    border: '2px solid #e2e8f0', 
    borderRadius: '8px', 
    fontSize: '14px', 
    boxSizing: 'border-box',
    transition: 'border-color 0.2s'
  },
  select: { 
    width: '100%', 
    padding: '12px', 
    border: '2px solid #e2e8f0', 
    borderRadius: '8px', 
    fontSize: '14px', 
    boxSizing: 'border-box',
    cursor: 'pointer',
    backgroundColor: 'white',
    transition: 'border-color 0.2s'
  },
  actions: { 
    marginTop: '30px', 
    display: 'flex', 
    justifyContent: 'flex-end', 
    gap: '12px',
    paddingTop: '20px',
    borderTop: '1px solid #e2e8f0'
  },
  secondaryButton: { 
    background: 'white', 
    color: '#4a5568', 
    border: '2px solid #e2e8f0', 
    padding: '10px 20px', 
    borderRadius: '8px', 
    fontSize: '14px', 
    fontWeight: '600', 
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  itemsContainer: {
    maxHeight: '200px',
    overflowY: 'auto',
    padding: '10px',
    backgroundColor: '#f9fafb',
    borderRadius: '8px',
    marginTop: '10px'
  }
};

// Helper function to calculate total amount from invoiceItems string
const calculateTotalAmount = (invoiceItems) => {
  try {
    const items = JSON.parse(invoiceItems || '[]');
    return items.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
  } catch (e) {
    console.error("Failed to parse invoiceItems:", e);
    return 0;
  }
};

// --- COMPONENTS ---
const BillingSummary = ({ invoices }) => {
  const enhancedInvoices = invoices.map(inv => ({
    ...inv,
    status: inv.status || "Pending",
    amount: calculateTotalAmount(inv.invoiceItems)
  }));

  const totalRevenue = enhancedInvoices
    .filter(inv => inv.status === "Completed" || inv.status === "Paid")
    .reduce((sum, inv) => sum + inv.amount, 0);
  
  const pendingInvoices = enhancedInvoices.filter(inv => inv.status === "Pending");
  const overdueInvoices = enhancedInvoices.filter(inv => inv.status === "Overdue");

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '30px' }}>
      <div style={{ background: 'linear-gradient(135deg, rgba(254, 255, 255, 1) 0%, rgba(255, 255, 255, 1) 100%)', padding: '25px', borderRadius: '12px', boxShadow: '0 2px 12px #8dace1ff', color: 'white' }}>
        <h3 style={{ margin: 0, fontSize: '14px', opacity: 0.9,color:'#037', fontWeight: '500' }}>Total Paid Revenue</h3>
        <p style={{ margin: '10px 0', fontSize: '32px',color:'#037',  fontWeight: '700' }}>₹{totalRevenue.toLocaleString('en-IN')}</p>
        <p style={{ margin: 0, fontSize: '12px',color:'rgba(17, 17, 18, 1)',  opacity: 0.8 }}>From {enhancedInvoices.filter(inv => inv.status === "Completed" || inv.status === "Paid").length} invoices</p>
      </div>
      <div style={{ background: 'linear-gradient(135deg, rgba(255, 255, 255, 1) 0%, rgba(248, 248, 248, 1) 100%)', padding: '25px', borderRadius: '12px', boxShadow: '0 2px 12px #8dace1ff', color: 'white' }}>
        <h3 style={{ margin: 0, fontSize: '14px', opacity: 0.9,color:'#037', fontWeight: '500' }}>Pending Invoices</h3>
        <p style={{ margin: '10px 0', fontSize: '32px',color:'#037',  fontWeight: '700' }}>₹{pendingInvoices.reduce((sum, inv) => sum + inv.amount, 0).toLocaleString('en-IN')}</p>
        <p style={{ margin: 0, fontSize: '12px',color:'rgba(0, 0, 0, 1)',  opacity: 0.8 }}>{pendingInvoices.length} invoices awaiting payment</p>
      </div>
      <div style={{ background: 'linear-gradient(135deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 1) 100%)', padding: '25px', borderRadius: '12px', boxShadow: '0 2px 12px #8dace1ff',color:'white', }}>
        <h3 style={{ margin: 0, fontSize: '14px', opacity: 0.9,color:'#037', fontWeight: '500' }}>Overdue Payments</h3>
        <p style={{ margin: '10px 0', fontSize: '32px',color:'#037', fontWeight: '700' }}>₹{overdueInvoices.reduce((sum, inv) => sum + inv.amount, 0).toLocaleString('en-IN')}</p>
        <p style={{ margin: 0, fontSize: '12px',color:'rgba(11, 11, 11, 1)',  opacity: 0.8 }}>{overdueInvoices.length} invoices overdue</p>
      </div>
    </div>
  );
};

const RecentInvoices = ({ invoices, onView, onEdit, onDelete, title, loading }) => {
  const enhancedInvoices = invoices.map(inv => ({
    ...inv,
    amount: calculateTotalAmount(inv.invoiceItems),
    status: inv.status || "Pending",
  }));

  return (
    <div>
      <h2 style={{ marginTop: '30px', marginBottom: '20px', color: '#1a202c', fontSize: '22px', fontWeight: '700' }}>{title}</h2>
      <div style={{ overflowX: 'auto', border: '1px solid #e2e8f0', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', background: 'white' }}>
          <thead>
            <tr style={{ background: 'linear-gradient(135deg, #037 0%, #0a5fb5 100%)', color: 'white' }}>
              <th style={{ padding: '16px', borderRight: '1px solid rgba(255,255,255,0.1)', fontWeight: '600' }}>Invoice #</th>
              <th style={{ padding: '16px', borderRight: '1px solid rgba(255,255,255,0.1)', fontWeight: '600' }}>Client</th>
              <th style={{ padding: '16px', borderRight: '1px solid rgba(255,255,255,0.1)', fontWeight: '600' }}>Date</th>
              <th style={{ padding: '16px', borderRight: '1px solid rgba(255,255,255,0.1)', fontWeight: '600' }}>Due Date</th>
              <th style={{ padding: '16px', borderRight: '1px solid rgba(255,255,255,0.1)', fontWeight: '600' }}>Amount</th>
              <th style={{ padding: '16px', borderRight: '1px solid rgba(255,255,255,0.1)', fontWeight: '600' }}>Status</th>
              <th style={{ padding: '16px', fontWeight: '600' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', padding: '30px', color: '#060606ff' }}>
                  Loading invoices...
                </td>
              </tr>
            ) : enhancedInvoices.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', padding: '30px', color: '#718096' }}>
                  No invoices found. Create your first invoice to get started.
                </td>
              </tr>
            ) : (
              enhancedInvoices.map((inv, index) => (
                <tr 
                  key={inv.id} 
                  style={{ 
                    borderBottom: index < enhancedInvoices.length - 1 ? '1px solid #edf2f7' : 'none',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f7fafc'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                >
                  <td style={{ padding: '14px', borderRight: '1px solid #edf2f7', fontWeight: '600', color: '#037' }}>
                    {inv.invoiceNumber}
                  </td>
                  <td style={{ padding: '14px', borderRight: '1px solid #edf2f7', color: '#2d3748' }}>
                    {inv.clientName}
                  </td>
                  <td style={{ padding: '14px', borderRight: '1px solid #edf2f7', color: '#4a5568' }}>
                    {inv.invoiceDate}
                  </td>
                  <td style={{ padding: '14px', borderRight: '1px solid #edf2f7', color: '#4a5568' }}>
                    {inv.dueDate}
                  </td>
                  <td style={{ padding: '14px', borderRight: '1px solid #edf2f7', fontWeight: '600', color: '#2d3748' }}>
                    ₹{inv.amount.toLocaleString('en-IN')}
                  </td>
                  <td style={{ padding: '14px', borderRight: '1px solid #edf2f7' }}>
                    <span style={statusStyles[inv.status]}>{inv.status}</span>
                  </td>
                  <td style={{ padding: '14px', display: 'flex', gap: '8px', justifyContent: 'center' }}>
                    {onView && (
                      <button 
                        style={actionButtonStyles} 
                        onClick={() => onView(inv.id)}
                        title="View Invoice"
                        onMouseEnter={(e) => e.currentTarget.style.color = '#037'}
                        onMouseLeave={(e) => e.currentTarget.style.color = '#718096'}
                      >
                        <EyeIcon />
                      </button>
                    )}
                    {onEdit && (
                      <button 
                        style={actionButtonStyles} 
                        onClick={() => onEdit(inv)}
                        title="Edit Invoice"
                        onMouseEnter={(e) => e.currentTarget.style.color = '#3182ce'}
                        onMouseLeave={(e) => e.currentTarget.style.color = '#718096'}
                      >
                        <EditIcon />
                      </button>
                    )}
                    {onDelete && (
                      <button 
                        style={actionButtonStyles} 
                        onClick={() => onDelete(inv.id)}
                        title="Delete Invoice"
                        onMouseEnter={(e) => e.currentTarget.style.color = '#e53e3e'}
                        onMouseLeave={(e) => e.currentTarget.style.color = '#718096'}
                      >
                        <TrashIcon />
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const ViewInvoiceModal = ({ isOpen, onClose, invoice }) => {
  if (!isOpen || !invoice) return null;

  let items = [];
  try {
    items = JSON.parse(invoice.invoiceItems || '[]');
  } catch (e) {
    console.error("Failed to parse items:", e);
  }

  const total = calculateTotalAmount(invoice.invoiceItems);

  return (
    <div style={modalStyles.overlay} onClick={onClose}>
      <div style={modalStyles.content} onClick={(e) => e.stopPropagation()}>
        <h2 style={modalStyles.header}>Invoice Details</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
          <div>
            <p style={{ margin: '8px 0', color: '#4a5568', fontSize: '14px' }}>
              <strong>Invoice Number:</strong> {invoice.invoiceNumber}
            </p>
            <p style={{ margin: '8px 0', color: '#4a5568', fontSize: '14px' }}>
              <strong>Client:</strong> {invoice.clientName}
            </p>
            <p style={{ margin: '8px 0', color: '#4a5568', fontSize: '14px' }}>
              <strong>Status:</strong> <span style={statusStyles[invoice.status]}>{invoice.status}</span>
            </p>
          </div>
          <div>
            <p style={{ margin: '8px 0', color: '#4a5568', fontSize: '14px' }}>
              <strong>Invoice Date:</strong> {invoice.invoiceDate}
            </p>
            <p style={{ margin: '8px 0', color: '#4a5568', fontSize: '14px' }}>
              <strong>Due Date:</strong> {invoice.dueDate}
            </p>
            <p style={{ margin: '8px 0', color: '#4a5568', fontSize: '14px' }}>
              <strong>Total Amount:</strong> ₹{total.toLocaleString('en-IN')}
            </p>
          </div>
        </div>

        <div style={{ marginTop: '25px' }}>
          <h3 style={{ margin: '0 0 15px 0', color: '#2d3748', fontSize: '16px', fontWeight: '600' }}>Invoice Items</h3>
          <div style={modalStyles.itemsContainer}>
            {items.length === 0 ? (
              <p style={{ textAlign: 'center', color: '#718096' }}>No items found</p>
            ) : (
              items.map((item, idx) => (
                <div key={idx} style={{ 
                  padding: '12px', 
                  marginBottom: '10px', 
                  backgroundColor: 'white', 
                  borderRadius: '6px',
                  border: '1px solid #e2e8f0'
                }}>
                  <p style={{ margin: '4px 0', fontWeight: '600', color: '#2d3748' }}>{item.itemname || item.servicedescription}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#718096' }}>
                    <span>Qty: {item.quantity}</span>
                    <span>Rate: ₹{item.rate}</span>
                    <span>Amount: ₹{item.amount}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div style={modalStyles.actions}>
          <button style={modalStyles.secondaryButton} onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

const EditInvoiceModal = ({ isOpen, onClose, data, onInputChange, onEditSubmit, loading }) => {
  if (!isOpen) return null;

  return (
    <div style={modalStyles.overlay} onClick={onClose}>
      <div style={modalStyles.content} onClick={(e) => e.stopPropagation()}>
        <h2 style={modalStyles.header}>Edit Invoice</h2>
        <form onSubmit={onEditSubmit}>
          <div style={modalStyles.formGroup}>
            <label style={modalStyles.label}>Invoice Number</label>
            <input 
              style={modalStyles.input} 
              name="invoiceNumber" 
              value={data.invoiceNumber || ''} 
              onChange={onInputChange}
              disabled
            />
          </div>
          <div style={modalStyles.formGroup}>
            <label style={modalStyles.label}>Client Name</label>
            <input 
              style={modalStyles.input} 
              name="clientName" 
              value={data.clientName || ''} 
              onChange={onInputChange} 
              required
            />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <div style={modalStyles.formGroup}>
              <label style={modalStyles.label}>Invoice Date</label>
              <input 
                type="date" 
                style={modalStyles.input} 
                name="invoiceDate" 
                value={data.invoiceDate || ''} 
                onChange={onInputChange} 
                required
              />
            </div>
            <div style={modalStyles.formGroup}>
              <label style={modalStyles.label}>Due Date</label>
              <input 
                type="date" 
                style={modalStyles.input} 
                name="dueDate" 
                value={data.dueDate || ''} 
                onChange={onInputChange} 
                required
              />
            </div>
          </div>
          <div style={modalStyles.formGroup}>
            <label style={modalStyles.label}>Status</label>
            <select 
              style={modalStyles.select} 
              name="status" 
              value={data.status || 'Pending'} 
              onChange={onInputChange}
            >
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="Overdue">Overdue</option>
            </select>
          </div>
          
          <div style={modalStyles.actions}>
            <button 
              type="button" 
              style={modalStyles.secondaryButton} 
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              style={{...primaryButtonStyles, opacity: loading ? 0.6 : 1}} 
              disabled={loading}
            >
              {loading ? 'Updating...' : 'Update Invoice'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// --- MAIN PAGE ---
const BillingPage = () => {
  const API_URL = "https://posthemorrhagic-nonequilaterally-caroline.ngrok-free.dev/api/invoices";
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [formData, setFormData] = useState({
    id: null,
    invoiceNumber: "",
    invoiceDate: "",
    dueDate: "",
    invoiceItems: "[]",
    clientName: "",
    status: "Pending"
  });

  const defaultInvoiceState = {
    id: null,
    invoiceNumber: "",
    invoiceDate: "",
    dueDate: "",
    invoiceItems: "[]",
    clientName: "",
    status: "Pending"
  };

  // Fetch all invoices
  const fetchInvoices = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL, {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "ngrok-skip-browser-warning": "true"
        }
      });
      
      if (!res.ok) throw new Error("Failed to fetch invoices");
      const data = await res.json();
      setInvoices(data);
    } catch (err) {
      console.error("Error fetching invoices:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  // View single invoice
  const handleViewInvoice = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        headers: {
          "ngrok-skip-browser-warning": "true"
        }
      });
      
      if (!res.ok) throw new Error("Failed to fetch invoice");
      const data = await res.json();
      setSelectedInvoice(data);
      setIsViewModalOpen(true);
    } catch (err) {
      console.error("Error fetching invoice:", err);
      alert("Failed to load invoice details");
    }
  };

  // Delete invoice
  const handleDeleteInvoice = async (id) => {
    const invoice = invoices.find(inv => inv.id === id);
    if (!invoice) return;

    // if (!window.confirm(`Are you sure you want to delete invoice ${invoice.invoiceNumber}?`)) return;

    setActionLoading(true);
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
          "ngrok-skip-browser-warning": "true"
        }
      });
      
      // if (!res.ok) throw new Error("Failed to delete invoice");
      
      setInvoices(invoices.filter(inv => inv.id !== id));
    } catch (err) {
      console.error("Error deleting invoice:", err);
      alert("Failed to delete invoice");
    } finally {
      setActionLoading(false);
    }
  };

  // Open edit modal
  const handleOpenEditModal = (invoiceData) => {
    setFormData({
      id: invoiceData.id,
      invoiceNumber: invoiceData.invoiceNumber,
      invoiceDate: invoiceData.invoiceDate,
      dueDate: invoiceData.dueDate,
      invoiceItems: invoiceData.invoiceItems,
      clientName: invoiceData.clientName,
      status: invoiceData.status
    });
    setIsEditModalOpen(true);
  };

  // Update invoice
  const handleEditInvoiceSubmit = async (e) => {
    e.preventDefault();
    const { id, clientName, invoiceDate, dueDate, status } = formData;
    
    setActionLoading(true);
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true"
        },
        body: JSON.stringify({
          clientName,
          invoiceDate,
          dueDate,
          status
        })
      });

      if (!res.ok) throw new Error("Failed to update invoice");
      
      const updated = await res.json();
      setInvoices(invoices.map(inv => inv.id === id ? updated : inv));
      handleCloseModal();
    } catch (err) {
      console.error("Error updating invoice:", err);
      alert("Failed to update invoice");
    } finally {
      setActionLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setIsViewModalOpen(false);
    setFormData(defaultInvoiceState);
    setSelectedInvoice(null);
  };

  return (
    <div style={{ padding: '30px', minHeight: '100vh', background: 'linear-gradient(to bottom right, #f9fafb, #eff6ff)' }}>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <div>
            <h1 style={{ color: '#073D7F', fontSize: '32px', fontWeight: '700', margin: '0 0 8px 0' }}>
              Billing & Invoicing
            </h1>
            <p style={{ color: '#51617aff', margin: 0, fontSize: '16px' }}>
              Manage invoices, payments, and billing operations
            </p>
          </div>
          {/* <button 
            onClick={fetchInvoices} 
            style={{...primaryButtonStyles, opacity: loading ? 0.6 : 1}}
            disabled={loading}
            onMouseEnter={(e) => !loading && (e.currentTarget.style.background = '#0a5fb5')}
            onMouseLeave={(e) => !loading && (e.currentTarget.style.background = '#073D7F')}
          >
            <RefreshIcon />
            {loading ? 'Refreshing...' : 'Refresh'}
          </button> */}
        </div>

        <BillingSummary invoices={invoices} />
        
        <RecentInvoices
          title="All Invoices"
          invoices={invoices}
          onView={handleViewInvoice}
          onEdit={handleOpenEditModal}
          onDelete={handleDeleteInvoice}
          loading={loading}
        />
        
        <ViewInvoiceModal
          isOpen={isViewModalOpen}
          onClose={handleCloseModal}
          invoice={selectedInvoice}
        />
        
        <EditInvoiceModal
          isOpen={isEditModalOpen}
          onClose={handleCloseModal}
          onEditSubmit={handleEditInvoiceSubmit}
          data={formData}
          onInputChange={handleInputChange}
          loading={actionLoading}
        />
      </div>
    </div>
  );
};

export default BillingPage;
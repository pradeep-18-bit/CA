import React, { useState, useRef, useEffect, useCallback } from 'react';

// --- ICONS ---
const UploadIcon = () => (
  <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor">
    <path d="M7 18C7 18.5523 7.44772 19 8 19H16C16.5523 19 17 18.5523 17 18C17 17.4477 16.5523 17 16 17H8C7.44772 17 7 17.4477 7 18Z"/>
    <path d="M12 15C12.2652 15 12.5196 14.8946 12.7071 14.7071L17.7071 9.70711C18.0976 9.31658 18.0976 8.68342 17.7071 8.29289C17.3166 7.90237 16.6834 7.90237 16.2929 8.29289L13 11.5858V3C13 2.44772 12.5523 2 12 2C11.4477 2 11 2.44772 11 3V11.5858L7.70711 8.29289C7.31658 7.90237 6.68342 7.90237 6.29289 8.29289C5.90237 8.68342 5.90237 9.31658 6.29289 9.70711L11.2929 14.7071C11.4804 14.8946 11.7348 15 12 15Z"/>
    <path d="M3 8C3 7.44772 3.44772 7 4 7C4.55228 7 5 7.44772 5 8V16C5 16.5523 5.44772 17 6 17C6.55228 17 7 17.4477 7 18C7 18.5523 6.55228 19 6 19H5C3.89543 19 3 18.1046 3 17V8Z"/>
    <path d="M19 8C19 7.44772 19.4477 7 20 7C20.5523 7 21 7.44772 21 8V17C21 18.1046 20.1046 19 19 19H18C17.4477 19 17 18.5523 17 18C17 17.4477 17.4477 17 18 17C18.5523 17 19 16.5523 19 16V8Z"/>
  </svg>
);

const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18C11.8487 18 13.551 17.3729 14.9056 16.3199L20.2929 21.7071C20.6834 22.0976 21.3166 22.0976 21.7071 21.7071C22.0976 21.3166 22.0976 20.6834 21.7071 20.2929L16.3199 14.9056C17.3729 13.551 18 11.8487 18 10C18 5.58172 14.4183 2 10 2ZM4 10C4 6.68629 6.68629 4 10 4C13.3137 4 16 6.68629 16 10C16 13.3137 13.3137 16 10 16C6.68629 16 4 13.3137 4 10Z"/>
  </svg>
);

const FolderIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor" color="#073D7F">
    <path d="M4 4C2.89543 4 2 4.89543 2 6V18C2 19.1046 2.89543 20 4 20H20C21.1046 20 22 19.1046 22 18V8C22 6.89543 21.1046 6 20 6H12L10 4H4Z" />
  </svg>
);

const ArrowLeftIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12"></line>
    <polyline points="12 19 5 12 12 5"></polyline>
  </svg>
);

const DownloadIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M13 3C13 2.44772 12.5523 2 12 2C11.4477 2 11 2.44772 11 3V12.5858L7.70711 9.29289C7.31658 8.90237 6.68342 8.90237 6.29289 9.29289C5.90237 9.68342 5.90237 10.3166 6.29289 10.7071L11.2929 15.7071C11.6834 16.0976 12.3166 16.0976 12.7071 15.7071L17.7071 10.7071C18.0976 10.3166 18.0976 9.68342 17.7071 9.29289C17.3166 8.90237 16.6834 8.90237 16.2929 9.29289L13 12.5858V3Z"/>
    <path d="M5 16C5 15.4477 4.55228 15 4 15C3.44772 15 3 15.4477 3 16V18C3 19.6569 4.34315 21 6 21H18C19.6569 21 21 19.6569 21 18V16C21 15.4477 20.5523 15 20 15C19.4477 15 19 15.4477 19 16V18C19 18.5523 18.5523 19 18 19H6C5.44772 19 5 18.5523 5 18V16Z"/>
  </svg>
);

const TrashIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M10 2C9.44772 2 9 2.44772 9 3V4H4C3.44772 4 3 4.44772 3 5C3 5.55228 3.44772 6 4 6H5V19C5 20.6569 6.34315 22 8 22H16C17.6569 22 19 20.6569 19 19V6H20C20.5523 6 21 5.55228 21 5C21 4.44772 20.5523 4 20 4H15V3C15 2.44772 14.5523 2 14 2H10ZM7 6H17V19C17 19.5523 16.5523 20 16 20H8C7.44772 20 7 19.5523 7 19V6Z"/>
    <path d="M10 9C10.5523 9 11 9.44772 11 10V17C11 17.5523 10.5523 18 10 18C9.44772 18 9 17.5523 9 17V10C9 9.44772 9.44772 9 10 9Z"/>
    <path d="M14 9C14.5523 9 15 9.44772 15 10V17C15 17.5523 14.5523 18 14 18C13.4477 18 13 17.5523 13 17V10C13 9.44772 13.4477 9 14 9Z"/>
  </svg>
);

const CycleStatusIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 4V1L8 5L12 9V6C15.3137 6 18 8.68629 18 12C18 13.7548 17.2284 15.3444 16 16.3888V18.3888C18.6631 17.2003 20 14.7171 20 12C20 7.58172 16.4183 4 12 4Z"/>
    <path d="M12 20V23L16 19L12 15V18C8.68629 18 6 15.3137 6 12C6 10.2452 6.7716 8.65559 8 7.61119V5.61119C5.33687 6.79973 4 9.28292 4 12C4 16.4183 7.58172 20 12 20Z"/>
  </svg>
);

const PdfIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z"/>
  </svg>
);

const ImageIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M4 4C4 2.89543 4.89543 2 6 2H18C19.1046 2 20 2.89543 20 4V20C20 21.1046 19.1046 22 18 22H6C4.89543 22 4 21.1046 4 20V4Z"/>
  </svg>
);

const FileIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z"/>
  </svg>
);

const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6.70711 5.29289C6.31658 4.90237 5.68342 4.90237 5.29289 5.29289C4.90237 5.68342 4.90237 6.31658 5.29289 6.70711L10.5858 12L5.29289 17.2929C4.90237 17.6834 4.90237 18.3166 5.29289 18.7071C5.68342 19.0976 6.31658 19.0976 6.70711 18.7071L12 13.4142L17.2929 18.7071C17.6834 19.0976 18.3166 19.0976 18.7071 18.7071C19.0976 18.3166 19.0976 17.6834 18.7071 17.2929L13.4142 12L18.7071 6.70711C19.0976 6.31658 19.0976 5.68342 18.7071 5.29289C18.3166 4.90237 17.6834 4.90237 17.2929 5.29289L12 10.5858L6.70711 5.29289Z"/>
  </svg>
);

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z"/>
  </svg>
);

// --- HELPER FUNCTIONS ---
const getFileIcon = (fileName) => {
  if (typeof fileName !== 'string') return FileIcon;
  const ext = fileName.split('.').pop().toLowerCase();
  if (ext === 'pdf') return PdfIcon;
  if (['jpg', 'jpeg', 'png', 'gif'].includes(ext)) return ImageIcon;
  return FileIcon;
};

const getFileType = (fileName) => {
  if (typeof fileName !== 'string') return 'File';
  const ext = fileName.split('.').pop().toLowerCase();
  if (ext === 'pdf') return 'PDF';
  if (['jpg', 'jpeg', 'png', 'gif'].includes(ext)) return 'Image';
  return 'File';
};

const formatFileSize = (bytes) => {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
};

// --- MAIN COMPONENT ---

const API_BASE_URL = 'https://posthemorrhagic-nonequilaterally-caroline.ngrok-free.dev';

const DocumentManagement = () => {
  const [documents, setDocuments] = useState([]);
  const [view, setView] = useState('main');
  const [currentFolder, setCurrentFolder] = useState(null); // New state to track current client folder
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [uploadingFiles, setUploadingFiles] = useState([]);
  const [viewDocument, setViewDocument] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploadFormData, setUploadFormData] = useState({
    client: '',
    category: '',
    status: ''
  });
  const [uploadErrors, setUploadErrors] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editDocData, setEditDocData] = useState(null);
  const [editErrors, setEditErrors] = useState({});
  const [clients, setClients] = useState([]);
  const [selectedClientDetails, setSelectedClientDetails] = useState(null);

  const fileInputRef = useRef(null);

  const categories = ['GST Documents', 'Identity Documents', 'Financial Documents', 'Tax Returns', 'Invoices'];
  const status = ['verified', 'processing', 'rejected'];

  // --- Fetch Active Clients ---
  const fetchClients = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/clients`, {
        headers: { "ngrok-skip-browser-warning": "true" },
      });
      if (!res.ok) throw new Error("Failed to fetch clients");
      const data = await res.json();
      const list = Array.isArray(data) ? data : data.clients || [];
      const activeClients = list.filter((c) => c.status?.toLowerCase() === "active");
      setClients(activeClients);
    } catch (error) {
      console.error("Error fetching clients:", error);
      setClients([]);
    }
  }, []);

  // --- Fetch Documents ---
  const fetchDocuments = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/ClientDocuments`, {
        headers: { "ngrok-skip-browser-warning": "true" }
      });
      
      if (!response.ok) {
        if (response.status === 404) {
          setDocuments([]);
          return;
        }
        throw new Error('Failed to fetch documents');
      }
      
      const apiDocs = await response.json();
      const mappedDocs = apiDocs.map(apiDoc => {
        const fileName = apiDoc.originalFileName || 'unknown.file';
        return {
          id: apiDoc.id,
          name: fileName,
          type: getFileType(fileName),
          client: apiDoc.clientName,
          category: apiDoc.category,
          size: formatFileSize(apiDoc.fileSize),
          uploadDate: new Date(apiDoc.uploadDate).toISOString().split('T')[0],
          status: apiDoc.status
        };
      });
      setDocuments(mappedDocs);
    } catch (error) {
      console.error("Failed to fetch documents:", error);
      setDocuments([]);
    }
  }, []);

  useEffect(() => {
    fetchDocuments();
    fetchClients();
  }, [fetchDocuments, fetchClients]);

  const handleFileSelection = (files) => {
    const newFiles = Array.from(files).map((file, index) => ({
      id: Date.now() + index,
      file,
      name: file.name,
      size: formatFileSize(file.size),
      progress: 0,
      status: 'pending'
    }));
    setUploadingFiles(newFiles);
    setView('upload');
    setUploadErrors({});
  };

  const handleFileExplorerClick = () => {
    fileInputRef.current.click();
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelection(e.dataTransfer.files);
    }
  };

  const uploadFiles = async () => {
    const errors = {};
    if (!uploadFormData.client) errors.client = 'Client Name is required.';
    if (!uploadFormData.category) errors.category = 'Document Category is required.';
    if (!uploadFormData.status) errors.status = 'Status is required.';
    
    setUploadErrors(errors);
    if (Object.keys(errors).length > 0) return;

    const uploadPromises = uploadingFiles.map(async (file, index) => {
      try {
        setUploadingFiles(prev => prev.map((f, i) => (i === index ? { ...f, status: 'uploading', progress: 10 } : f)));

        const formData = new FormData();
        formData.append('document', file.file);
        formData.append('clientName', uploadFormData.client);
        formData.append('category', uploadFormData.category);
        formData.append('status', uploadFormData.status);

        setUploadingFiles(prev => prev.map((f, i) => (i === index ? { ...f, progress: 50 } : f)));

        const response = await fetch(`${API_BASE_URL}/api/ClientDocuments/upload`, {
          method: 'POST',
          body: formData,
          headers: { "ngrok-skip-browser-warning": "true" }
        });

        if (!response.ok) throw new Error(`Upload failed with status ${response.status}`);
        
        setUploadingFiles(prev => prev.map((f, i) => (i === index ? { ...f, status: 'completed', progress: 100 } : f)));
        return true;
      } catch (error) {
        console.error('Upload error for file:', file.name, error);
        setUploadingFiles(prev => prev.map((f, i) => (i === index ? { ...f, status: 'failed', progress: 0 } : f)));
        return false;
      }
    });

    await Promise.all(uploadPromises);
    await fetchDocuments();

    if (uploadingFiles.length > 0) {
      setTimeout(() => {
        setView('main');
        setUploadingFiles([]);
        setUploadFormData({ client: '', category: '', status: '' });
        setUploadErrors({});
      }, 1500);
    }
  };

  const removeUploadingFile = (id) => {
    setUploadingFiles(prev => prev.filter(f => f.id !== id));
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/ClientDocuments/${id}`, {
        method: 'DELETE',
        headers: { "ngrok-skip-browser-warning": "true" }
      });
      if (!response.ok) throw new Error(`Failed to delete document: ${response.statusText}`);
      await fetchDocuments();
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  const handleDownload = async (doc) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/ClientDocuments/download/${doc.id}`, {
        headers: { "ngrok-skip-browser-warning": "true" }
      });
      
      if (!response.ok) throw new Error(`Download failed with status ${response.status}`);
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = doc.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download error:', error);
    }
  };

  const handleStatusChange = async (doc) => {
    const currentIndex = status.indexOf(doc.status);
    const nextIndex = (currentIndex + 1) % status.length;
    const newStatus = status[nextIndex];

    try {
      const response = await fetch(`${API_BASE_URL}/api/ClientDocuments/${doc.id}/status`, {
        method: 'PATCH',
        headers: { 
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true" 
        },
        body: JSON.stringify({ status: newStatus }),
      });
      
      if (!response.ok) throw new Error(`Failed to update status: ${response.statusText}`);
      await fetchDocuments();
    } catch (error) {
      console.error('Status change error:', error);
    }
  };

  const handleView = (doc) => {
    setViewDocument(doc);
    setIsEditing(false);
    setEditDocData(null);
    setPreviewData(null);
  };
  
  const handleEdit = (doc) => {
    setViewDocument(doc);
    setEditDocData(doc);
    setIsEditing(true);
    setEditErrors({});
  };
  
  const handleSaveEdit = async () => {
    const errors = {};
    if (!editDocData.client) errors.client = 'Client Name is required.';
    if (!editDocData.category) errors.category = 'Document Category is required.';
    if (!editDocData.status) errors.status = 'Status is required.';

    setEditErrors(errors);
    if (Object.keys(errors).length > 0) return;

    try {
      const res = await fetch(`${API_BASE_URL}/api/ClientDocuments/${editDocData.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", "ngrok-skip-browser-warning": "true" },
        body: JSON.stringify({
          clientName: editDocData.client,
          category: editDocData.category,
          status: editDocData.status,
        }),
      });
      if (!res.ok) throw new Error("Failed to update document metadata");
      await fetchDocuments();
      setViewDocument(null);
      setEditDocData(null);
      setIsEditing(false);
      setEditErrors({});
    } catch (error) {
      console.error("Edit save error:", error);
    }
  };

  const [previewData, setPreviewData] = useState(null);
  const [previewLoading, setPreviewLoading] = useState(false);

  const handlePreview = useCallback(async (doc) => {
    setPreviewLoading(true);
    try {
      const url = `${API_BASE_URL}/api/ClientDocuments/preview/${doc.id}`;
      const res = await fetch(url, { headers: { "ngrok-skip-browser-warning": "true" } });
      if (!res.ok) throw new Error("Document not found");
      const data = await res.json();
      const blob = new Blob([Uint8Array.from(atob(data.base64), c => c.charCodeAt(0))], { type: data.contentType });
      const previewUrl = URL.createObjectURL(blob);
      setPreviewData({
        url: previewUrl,
        type: data.contentType,
        fileName: data.fileName
      });
    } catch (error) {
      console.error("Preview error:", error);
      setPreviewData(null);
    } finally {
      setPreviewLoading(false);
    }
  }, []); 

  // Filter documents based on current state (Folder view or search)
  const filteredDocuments = documents.filter(doc => {
    // If inside a folder, only show docs for that client
    if (currentFolder && doc.client !== currentFolder) return false;

    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.client.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const styles = {
    container: {
      background: '#f8f9faff',
      padding: '15px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    },
    mainContent: {
      maxWidth: '4000px',
      margin: '0px',
      background: 'white',
      borderRadius: '15px',
      boxShadow: '0 10px 40px rgba(7,61,127,0.2)',
      overflow: 'hidden',  
    },
    header: {
      background: '#FFFFFF',
      padding: '25px 30px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      color: '#073D7F'
    },
    headerText: {
      flex: 1
    },
    title: {
      margin: 0,
      fontSize: '28px',
      fontWeight: '700'
    },
    subtitle: {
      margin: 0,
      opacity: 0.9,
      fontSize: '14px',
      textAlign: 'left'
    },
    quickUploadSection: {
      margin: '25px 30px',
      padding: '50px 30px',
      border: `3px dashed ${dragActive ? '#073D7F' : '#cbd5e0'}`,
      borderRadius: '12px',
      textAlign: 'center',
      background: dragActive ? '#f7fafc' : 'white',
      transition: 'all 0.3s',
      cursor: 'pointer'
    },
    uploadIcon: {
      color: '#073D7F',
      marginBottom: '15px',
      display: 'flex',
      justifyContent: 'center'
    },
    selectFilesBtn: {
      background: '#073D7F',
      color: 'white',
      border: 'none',
      padding: '10px 28px',
      borderRadius: '8px',
      fontSize: '14px',
      fontWeight: '600',
      cursor: 'pointer',
      marginTop: '15px',
      transition: 'transform 0.2s',
      boxShadow: '0 4px 15px rgba(7,61,127,0.3)'
    },
    filterSection: {
      margin: '0 30px 25px',
      display: 'flex',
      gap: '15px',
      alignItems: 'center'
    },
    searchBarContainer: {
      flex: 1,
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      width: 'fit-content'
    },
    searchIcon: {
      position: 'absolute',
      left: '15px',
      color: '#a0aec0',
      display: 'flex',
      alignItems: 'center'
    },
    searchInput: {
      width: '100%',
      padding: '10px 10px 10px 40px',
      border: '2px solid #e2e8f0',
      borderRadius: '8px',
      fontSize: '14px',
      outline: 'none',
      transition: 'border-color 0.2s',
      boxSizing: 'border-box'
    },
    categoryFilter: {
      padding: '10px 18px',
      border: '2px solid #e2e8f0',
      borderRadius: '8px',
      fontSize: '14px',
      cursor: 'pointer',
      outline: 'none',
      background: 'white',
      width: 'fit-content'
    },
    tableSection: {
      margin: '0 30px 30px',
      overflowX: 'auto'
    },
    tableHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px'
    },
    table: {
      width: '100%',
      borderCollapse: 'separate',
      borderSpacing: '0'
    },
    th: {
      background: '#073D7F',
      padding: '15px',
      textAlign: 'left',
      fontWeight: '600',
      color: '#ffffffff',
      fontSize: '14px',
      borderBottom: '1px solid #e2e8f0'
    },
    td: {
      padding: '15px',
      borderBottom: '1px solid #e2e8f0',
      fontSize: '14px'
    },
    documentInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    },
    docIcon: {
      color: '#073D7F',
      display: 'flex',
      alignItems: 'center'
    },
    docName: {
      margin: 0,
      fontWeight: '600',
      color: '#2d3748'
    },
    docType: {
      fontSize: '12px',
      color: '#718096'
    },
    categoryBadge: {
      background: '#e6fffa',
      color: '#234e52',
      padding: '6px 12px',
      borderRadius: '20px',
      fontSize: '12px',
      fontWeight: '500',
      display: 'inline-block'
    },
    statusBadge: {
      padding: '6px 12px',
      borderRadius: '20px',
      fontSize: '12px',
      fontWeight: '500',
      display: 'inline-block'
    },
    statusVerified: {
      background: '#c6f6d5',
      color: '#22543d'
    },
    statusProcessing: {
      background: '#feebc8',
      color: '#7c2d12'
    },
    actionButtons: {
      display: 'flex',
      gap: '12px'
    },
    actionBtn: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: '#718096',
      transition: 'color 0.2s',
      padding: '5px',
      display: 'flex',
      alignItems: 'center'
    },
    uploadForm: {
      padding: '30px',
      maxWidth: '700px',
      margin: '0 auto'
    },
    formGroup: {
      marginBottom: '25px'
    },
    label: {
      display: 'block',
      marginBottom: '8px',
      fontWeight: '600',
      color: '#2d3748',
      fontSize: '14px'
    },
    input: {
      width: '100%',
      padding: '10px',
      border: '2px solid #e2e8f0',
      borderRadius: '8px',
      fontSize: '14px',
      outline: 'none',
      boxSizing: 'border-box'
    },
    validationError: {
      color: '#e53e3e',
      fontSize: '12px',
      marginTop: '5px'
    },
    fileList: {
      marginTop: '20px'
    },
    fileItem: {
      background: '#f7fafc',
      padding: '12px',
      borderRadius: '8px',
      marginBottom: '8px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    progressBar: {
      width: '100%',
      height: '5px',
      background: '#e2e8f0',
      borderRadius: '3px',
      overflow: 'hidden',
      marginTop: '6px'
    },
    progressFill: {
      height: '100%',
      background: '#073D7F',
      transition: 'width 0.3s'
    },
    buttonGroup: {
      display: 'flex',
      gap: '12px',
      marginTop: '25px'
    },
    primaryBtn: {
      background: '#073D7F',
      color: 'white',
      border: 'none',
      padding: '10px 28px',
      borderRadius: '8px',
      fontSize: '14px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'transform 0.2s'
    },
    secondaryBtn: {
      background: 'white',
      color: '#073D7F',
      border: '2px solid #073D7F',
      padding: '10px 28px',
      borderRadius: '8px',
      fontSize: '14px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.2s'
    },
    modal: {
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
      padding: '20px'
    },
    modalContent: {
      background: 'white',
      borderRadius: '15px',
      maxWidth: '600px',
      height: '85%',        
      width: '100%',
      overflow: 'auto',     
      position: 'relative'
    },
    modalHeader: {
      padding: '20px 25px',
      borderBottom: '1px solid #e2e8f0',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      background: '#073D7F',
      color: 'white',
      borderRadius: '15px 15px 0 0'
    },
    modalBody: {
      padding: '25px'
    },
    closeBtn: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: 'white',
      padding: '5px',
      display: 'flex',
      alignItems: 'center'
    },
    infoGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '15px',
      marginTop: '15px'
    },
    infoItem: {
      padding: '12px',
      background: '#f7fafc',
      borderRadius: '8px'
    },
    infoLabel: {
      fontSize: '12px',
      color: '#718096',
      marginBottom: '5px'
    },
    infoValue: {
      fontSize: '16px',
      fontWeight: '600',
      color: '#2d3748'
    },
    emptyState: {
      textAlign: 'center',
      padding: '50px 20px',
      color: '#a0aec0'
    },
    cardGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
      gap: '20px',
    },
    docCard: {
      background: '#ffffff',
      borderRadius: '12px',
      padding: '16px',
      boxShadow: '0 6px 20px rgba(0,0,0,0.08)',
      cursor: 'pointer',
      transition: 'transform 0.2s, box-shadow 0.2s',
    },
    docCardHeader: {
      fontWeight: '700',
      marginBottom: '6px',
      color: '#2d3748',
    },
    docCardRow: {
      fontSize: '13px',
      color: '#4a5568',
      marginBottom: '4px',
    },
    docCardActions: {
      display: 'flex',
      gap: '10px',
      marginTop: '12px',
    },
    folderCard: {
        background: '#ffffff',
        borderRadius: '12px',
        padding: '20px',
        boxShadow: '0 6px 20px rgba(0,0,0,0.08)',
        cursor: 'pointer',
        transition: 'transform 0.2s, box-shadow 0.2s',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid #e2e8f0'
    },
    backButton: {
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
        background: 'none',
        border: 'none',
        color: '#073D7F',
        cursor: 'pointer',
        fontWeight: '600',
        fontSize: '16px',
        marginBottom: '20px'
    }
  };

  const renderUploadView = () => (
  <div style={styles.uploadForm}>
    <h2 style={{ marginTop: 0, color: "#2d3748", fontSize: "24px" }}>
      Upload Documents
    </h2>

    {/* CLIENT NAME */}
    <div style={styles.formGroup}>
      <label style={styles.label}>Client Name *</label>

      <select
        value={uploadFormData.client}
        style={{
          ...styles.input,
          borderColor: uploadErrors.client ? "#e53e3e" : "#e2e8f0"
        }}
        onChange={(e) => {
          const clientName = e.target.value;

          setUploadFormData({
            ...uploadFormData,
            client: clientName
          });

          setUploadErrors(prev => ({
            ...prev,
            client: ""
          }));

          const selected = clients.find(
            c => c.clientName === clientName
          );
          setSelectedClientDetails(selected || null);
        }}
      >
        <option value="">Select Client</option>
        {clients && clients.length > 0 ? (
          clients.map(client => (
            <option key={client.id} value={client.clientName}>
              {client.clientName}
            </option>
          ))
        ) : (
          <option disabled>No active clients found</option>
        )}
      </select>

      {uploadErrors.client && (
        <div
          style={{
            color: "#e53e3e",
            fontSize: "12px",
            marginTop: "4px",
            textAlign: "left"
          }}
        >
          {uploadErrors.client}
        </div>
      )}
    </div>

    {/* CLIENT DETAILS */}
    {selectedClientDetails && (
      <div style={{ ...styles.infoGrid, marginBottom: "20px" }}>
        <div style={styles.infoItem}>
          <div style={styles.infoLabel}>Client Type</div>
          <div style={styles.infoValue}>
            {selectedClientDetails.clientType || "-"}
          </div>
        </div>
        <div style={styles.infoItem}>
          <div style={styles.infoLabel}>PAN</div>
          <div style={styles.infoValue}>
            {selectedClientDetails.panNumber || "-"}
          </div>
        </div>
        <div style={styles.infoItem}>
          <div style={styles.infoLabel}>GST</div>
          <div style={styles.infoValue}>
            {selectedClientDetails.gstNumber || "-"}
          </div>
        </div>
        <div style={styles.infoItem}>
          <div style={styles.infoLabel}>Contact</div>
          <div style={styles.infoValue}>
            {selectedClientDetails.contact || "-"}
          </div>
        </div>
      </div>
    )}

    {/* DOCUMENT CATEGORY */}
    <div style={styles.formGroup}>
      <label style={styles.label}>Document Category *</label>

      <select
        value={uploadFormData.category}
        style={{
          ...styles.input,
          borderColor: uploadErrors.category ? "#e53e3e" : "#e2e8f0"
        }}
        onChange={(e) => {
          setUploadFormData({
            ...uploadFormData,
            category: e.target.value
          });

          setUploadErrors(prev => ({
            ...prev,
            category: ""
          }));
        }}
      >
        <option value="">Select category</option>
        {categories.map(cat => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      {uploadErrors.category && (
        <div
          style={{
            color: "#e53e3e",
            fontSize: "12px",
            marginTop: "4px",
            textAlign: "left"
          }}
        >
          {uploadErrors.category}
        </div>
      )}
    </div>

    {/* STATUS */}
    <div style={styles.formGroup}>
      <label style={styles.label}>Status *</label>

      <select
        value={uploadFormData.status}
        style={{
          ...styles.input,
          borderColor: uploadErrors.status ? "#e53e3e" : "#e2e8f0"
        }}
        onChange={(e) => {
          setUploadFormData({
            ...uploadFormData,
            status: e.target.value
          });

          setUploadErrors(prev => ({
            ...prev,
            status: ""
          }));
        }}
      >
        <option value="">Select Status</option>
        {status.map(s => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>

      {uploadErrors.status && (
        <div
          style={{
            color: "#e53e3e",
            fontSize: "12px",
            marginTop: "4px",
            textAlign: "left"
          }}
        >
          {uploadErrors.status}
        </div>
      )}
    </div>

    {/* FILE LIST */}
    <div style={styles.fileList}>
      <h3 style={{ color: "#2d3748", fontSize: "16px" }}>
        Selected Files ({uploadingFiles.length})
      </h3>

      {uploadingFiles.map(file => (
        <div key={file.id} style={styles.fileItem}>
          <div style={{ flex: 1, overflow: "hidden", paddingRight: "10px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "5px"
              }}
            >
              <span
                style={{
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis"
                }}
              >
                {file.name}
              </span>
              <span
                style={{
                  fontSize: "12px",
                  color: "#718096",
                  flexShrink: 0
                }}
              >
                {file.size}
              </span>
            </div>

            {file.status !== "pending" && (
              <div style={styles.progressBar}>
                <div
                  style={{
                    ...styles.progressFill,
                    width: `${file.progress}%`
                  }}
                />
              </div>
            )}

            {file.status === "completed" && (
              <div
                style={{
                  color: "#38a169",
                  fontSize: "12px",
                  marginTop: "5px",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px"
                }}
              >
                <CheckIcon /> Uploaded successfully
              </div>
            )}

            {file.status === "failed" && (
              <div
                style={{
                  color: "#e53e3e",
                  fontSize: "12px",
                  marginTop: "5px"
                }}
              >
                Upload failed
              </div>
            )}
          </div>
        </div>
      ))}
    </div>

    {/* BUTTONS */}
    <div style={styles.buttonGroup}>
      <button
        style={styles.primaryBtn}
        onClick={uploadFiles}
        onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
        onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
      >
        Upload Files
      </button>

      <button
        style={styles.secondaryBtn}
        onClick={() => {
          setView("main");
          setUploadingFiles([]);
          setUploadFormData({
            client: "",
            category: "",
            status: ""
          });
          setUploadErrors({});
        }}
        onMouseOver={(e) => (e.target.style.background = "#f7fafc")}
        onMouseOut={(e) => (e.target.style.background = "white")}
      >
        Cancel
      </button>
    </div>
  </div>
);

  const renderMainView = () => {
    // If we are looking at the client folder list (Level 1)
    if (!currentFolder) {
        // Filter clients based on search query
        const filteredClients = clients.filter(c => 
            c.clientName.toLowerCase().includes(searchQuery.toLowerCase())
        );

        return (
            <>
                <div style={styles.quickUploadSection} onDragEnter={handleDrag} onDragOver={handleDrag} onDragLeave={handleDrag} onDrop={handleDrop} onClick={handleFileExplorerClick}>
                    <div style={styles.uploadIcon}><UploadIcon /></div>
                    <h3 style={{ margin: '0 0 10px 0', color: '#2d3748', fontSize: '20px' }}>Quick Upload</h3>
                    <p style={{ margin: '0 0 5px 0', color: '#718096' }}>Drag and drop files here or click to browse</p>
                    <p style={{ margin: 0, color: '#a0aec0', fontSize: '14px' }}>Supports PDF, Images, Word, Excel files</p>
                    <button style={styles.selectFilesBtn} onClick={(e) => {
                        e.stopPropagation();
                        handleFileExplorerClick();
                    }} onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'} onMouseOut={(e) => e.target.style.transform = 'scale(1)'}>
                        Select Files
                    </button>
                    <input type="file" ref={fileInputRef} onChange={(e) => handleFileSelection(e.target.files)} style={{ display: 'none' }} multiple />
                </div>

                <div style={styles.filterSection}>
                    <div style={styles.searchBarContainer}>
                        <div style={styles.searchIcon}><SearchIcon /></div>
                        <input style={styles.searchInput} type="text" placeholder="Search clients..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} onFocus={(e) => e.target.style.borderColor = '#073D7F'} onBlur={(e) => e.target.style.borderColor = '#e2e8f0'} />
                    </div>
                </div>

                <div style={styles.tableSection}>
                    <div style={styles.tableHeader}><h2 style={{ margin: 0, color: '#2d3748' }}>Client Folders ({filteredClients.length})</h2></div>
                    <div style={styles.cardGrid}>
                        {filteredClients.map(client => {
                            // Count documents for this client
                            const docCount = documents.filter(d => d.client === client.clientName).length;
                            return (
                                <div 
                                    key={client.id} 
                                    style={styles.folderCard} 
                                    onClick={() => {
                                        setCurrentFolder(client.clientName);
                                        setSearchQuery(''); // Clear search when entering folder
                                        setSelectedCategory('');
                                    }}
                                    onMouseOver={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-4px)';
                                        e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.15)';
                                    }}
                                    onMouseOut={(e) => {
                                        e.currentTarget.style.transform = 'none';
                                        e.currentTarget.style.boxShadow = styles.folderCard.boxShadow;
                                    }}
                                >
                                    <FolderIcon />
                                    <h3 style={{marginTop: '15px', marginBottom: '5px', color: '#2d3748', textAlign: 'center'}}>{client.clientName}</h3>
                                    <span style={{color: '#718096', fontSize: '14px'}}>{docCount} Documents</span>
                                </div>
                            );
                        })}
                    </div>
                    {filteredClients.length === 0 && (
                        <div style={styles.emptyState}>
                            <p style={{ fontSize: '18px', margin: 0 }}>No active clients found</p>
                        </div>
                    )}
                </div>
            </>
        );
    }

    // If we are looking inside a specific client folder (Level 2)
    return (
      <>
        <div style={{margin: '0 30px 20px'}}>
             <button style={styles.backButton} onClick={() => {
                 setCurrentFolder(null);
                 setSearchQuery('');
             }}>
                 <ArrowLeftIcon /> Back to Folders
             </button>
             <h2 style={{margin: '0', color: '#2d3748', fontSize: '24px'}}>Documents for {currentFolder}</h2>
        </div>

        <div style={styles.filterSection}>
          <div style={styles.searchBarContainer}>
            <div style={styles.searchIcon}><SearchIcon /></div>
            <input style={styles.searchInput} type="text" placeholder="Search documents..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} onFocus={(e) => e.target.style.borderColor = '#073D7F'} onBlur={(e) => e.target.style.borderColor = '#e2e8f0'} />
          </div>
          <select style={styles.categoryFilter} value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            <option value="">All Categories</option>
            {categories.map(cat => (<option key={cat} value={cat}>{cat}</option>))}
          </select>
        </div>
  
        <div style={styles.tableSection}>
          <div style={styles.tableHeader}><h2 style={{ margin: 0, color: '#2d3748' }}>Documents ({filteredDocuments.length})</h2></div>
          
        <div style={styles.cardGrid}>
    {filteredDocuments.map((doc) => {
      const IconComponent = getFileIcon(doc.name);
      const nextStatus = status[(status.indexOf(doc.status) + 1) % status.length];
  
      return (
        <div
          key={doc.id}
          style={styles.docCard}
          onClick={() => handleView(doc)}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.15)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'none';
            e.currentTarget.style.boxShadow = styles.docCard.boxShadow;
          }}
        >
          <div style={styles.documentInfo}>
            <div style={styles.docIcon}><IconComponent /></div>
            <div>
              <div style={styles.docCardHeader}>
                #{doc.id} – {doc.name}
              </div>
              <div style={styles.docType}>{doc.type}</div>
            </div>
          </div>
  
          <div style={styles.docCardRow}><b>Category:</b> {doc.category}</div>
          <div style={styles.docCardRow}><b>Size:</b> {doc.size}</div>
          <div style={styles.docCardRow}><b>Date:</b> {doc.uploadDate}</div>
  
          <span
            style={{
              ...styles.statusBadge,
              ...(doc.status === 'verified'
                ? styles.statusVerified
                : doc.status === 'processing'
                ? styles.statusProcessing
                : {}),
            }}
          >
            {doc.status}
          </span>
  
          <div style={styles.docCardActions}>
            <button
              style={styles.actionBtn}
              onClick={(e) => {
                e.stopPropagation();
                handleStatusChange(doc);
              }}
              title={`Cycle Status to ${nextStatus}`}
            >
              <CycleStatusIcon />
            </button>
  
            <button
              style={styles.actionBtn}
              onClick={(e) => {
                e.stopPropagation();
                handleDownload(doc);
              }}
              title="Download"
            >
              <DownloadIcon />
            </button>
  
            <button
              style={styles.actionBtn}
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(doc.id);
              }}
              title="Delete"
            >
              <TrashIcon />
            </button>
          </div>
        </div>
      );
    })}
  </div>
  
  
          {filteredDocuments.length === 0 && (
            <div style={styles.emptyState}>
              <div style={{ fontSize: '64px', marginBottom: '20px' }}><FileIcon /></div>
              <p style={{ fontSize: '18px', margin: 0 }}>
                {searchQuery || selectedCategory ? 'No documents match your filter' : 'No documents found for this client'}
              </p>
            </div>
          )}
        </div>
      </>
    );
  };

  return (
    <div style={styles.container}>
      <div style={styles.mainContent}>
        <header style={styles.header}>
          <div style={styles.headerText}>
            <h1 style={{ ...styles.title, marginBottom: "10px" }}>Document Management</h1>
            <p style={{ ...styles.subtitle, marginTop: "0px" }}>Upload, organize, and manage client documents securely</p>
          </div>
        </header>

        {view === 'upload' ? renderUploadView() : renderMainView()}
      </div>

      {viewDocument && (
        <div style={styles.modal} onClick={() => { setViewDocument(null); setPreviewData(null); }}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h2 style={{ margin: 0 }}>{isEditing ? 'Edit Document' : 'Document Details'}</h2>
              {/* <button style={styles.closeBtn} onClick={() => { setViewDocument(null); setPreviewData(null); }}><CloseIcon /></button> */}
            </div>
            <div style={styles.modalBody}>
              {previewData && !isEditing && (
                <div style={{ marginBottom: '20px' }}>
                  <h3 style={{ margin: '0 0 10px 0', color: '#2d3748' }}>Document Preview</h3>
                  {previewData.type.includes('image') ? (
                    <img src={previewData.url} alt="Document Preview" style={{ maxWidth: '100%', maxHeight: '400px', borderRadius: '8px', border: '1px solid #e2e8f0' }} />
                  ) : previewData.type.includes('pdf') ? (
                    <iframe src={previewData.url} style={{ width: '100%', height: '500px', borderRadius: '8px', border: '1px solid #e2e8f0' }} title="PDF Preview" />
                  ) : (
                    <div style={{ padding: '20px', background: '#f7fafc', borderRadius: '8px', textAlign: 'center', color: '#718096' }}>
                      <p>Preview not available for this file type</p>
                      <button style={{ ...styles.primaryBtn, marginTop: '10px' }} onClick={() => window.open(previewData.url, '_blank')}>
                        Open in New Tab
                      </button>
                    </div>
                  )}
                </div>
              )}

              {previewLoading && !isEditing && (
                <div style={{ padding: '20px', textAlign: 'center', color: '#718096' }}>
                  <p>Loading preview...</p>
                </div>
              )}

              <div style={styles.infoGrid}>
                <div style={styles.infoItem}>
                  <div style={styles.infoLabel}>Client {isEditing && '*'}</div>
                  {isEditing ? (
                    <>
                      <input type="text" style={{ ...styles.input, borderColor: editErrors.client ? '#e53e3e' : '#e2e8f0', padding: '5px' }} value={editDocData.client} onChange={(e) => { setEditDocData({...editDocData, client: e.target.value}); setEditErrors(prev => ({...prev, client: ''})); }} />
                      {editErrors.client && <p style={styles.validationError}>{editErrors.client}</p>}
                    </>
                  ) : (
                    <div style={styles.infoValue}>{viewDocument.client}</div>
                  )}
                </div>
                
                <div style={styles.infoItem}>
                  <div style={styles.infoLabel}>Category {isEditing && '*'}</div>
                  {isEditing ? (
                    <>
                      <select style={{ ...styles.input, borderColor: editErrors.category ? '#e53e3e' : '#e2e8f0', padding: '5px' }} value={editDocData.category} onChange={(e) => { setEditDocData({...editDocData, category: e.target.value}); setEditErrors(prev => ({...prev, category: ''})); }}>
                        {categories.map(cat => (<option key={cat} value={cat}>{cat}</option>))}
                      </select>
                      {editErrors.category && <p style={styles.validationError}>{editErrors.category}</p>}
                    </>
                  ) : (
                    <div style={styles.infoValue}>{viewDocument.category}</div>
                  )}
                </div>

                <div style={styles.infoItem}>
                  <div style={styles.infoLabel}>File Size</div>
                  <div style={styles.infoValue}>{viewDocument.size}</div>
                </div>

                <div style={styles.infoItem}>
                  <div style={styles.infoLabel}>Upload Date</div>
                  <div style={styles.infoValue}>{viewDocument.uploadDate}</div>
                </div>
                
                <div style={styles.infoItem}>
                  <div style={styles.infoLabel}>Status {isEditing && '*'}</div>
                  {isEditing ? (
                    <>
                      <select style={{ ...styles.input, borderColor: editErrors.status ? '#e53e3e' : '#e2e8f0', padding: '5px' }} value={editDocData.status} onChange={(e) => { setEditDocData({...editDocData, status: e.target.value}); setEditErrors(prev => ({...prev, status: ''})); }}>
                        {status.map(s => (<option key={s} value={s}>{s}</option>))}
                      </select>
                      {editErrors.status && <p style={styles.validationError}>{editErrors.status}</p>}
                    </>
                  ) : (
                    <div style={styles.infoValue}>
                      <span style={{ ...styles.statusBadge, ...(viewDocument.status === 'verified' ? styles.statusVerified : (viewDocument.status === 'processing' ? styles.statusProcessing : {})) }}>
                        {viewDocument.status}
                      </span>
                    </div>
                  )}
                </div>

                <div style={styles.infoItem}>
                  <div style={styles.infoLabel}>Document Type</div>
                  <div style={styles.infoValue}>{viewDocument.type}</div>
                </div>
              </div>

              <div style={styles.buttonGroup}>
                {isEditing ? (
                  <button style={styles.primaryBtn} onClick={handleSaveEdit} onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'} onMouseOut={(e) => e.target.style.transform = 'scale(1)'}>
                    Save Changes
                  </button>
                ) : (
                  <button style={styles.primaryBtn} onClick={() => handlePreview(viewDocument)} disabled={previewLoading} onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'} onMouseOut={(e) => e.target.style.transform = 'scale(1)'}>
                    {previewLoading ? 'Loading Preview...' : previewData ? 'Refresh Preview' : 'View Preview'}
                  </button>
                )}
                
                <button style={styles.secondaryBtn} onClick={() => { setViewDocument(null); setPreviewData(null); }} onMouseOver={(e) => e.target.style.background = '#f7fafc'} onMouseOut={(e) => e.target.style.background = 'white'}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentManagement;
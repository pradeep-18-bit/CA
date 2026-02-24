
// module.exports = {
//   SignIn: "https://localhost:44374/api/Auth/SignIn",
//   SignUp: "https://localhost:44374/api/Auth/SignUp",
// };



// /* General Styles */
// .container {
//   font-family: 'Inter', sans-serif;
//   background-color: #f8f9fa;
//   min-height: 100vh;
//   padding: 8px 30px 30px 30px;
//   box-sizing: border-box;
// }

// /* Header Styles */
// .header {
//   margin-bottom: 30px;
// }
// .header-title {
//   font-size: 22px;
//   font-weight: 600;
//   color: #333;
//   margin-bottom: 5px;
// }
// .header-subtitle {
//   font-size: 13px;
//   color: #666;
// }

// /* Summary Grid */
// .summary-grid {
//   display: grid;
//   grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
//   gap: 20px;
//   margin-bottom: 30px;
// }
// .summary-card {
//   background-color: #fff;
//   border-radius: 8px;
//   padding: 25px;
//   box-shadow: 0 2px 4px rgba(0,0,0,0.05);
// }
// .summary-card-title {
//   font-size: 13px;
//   font-weight: 500;
//   color: #888;
//   margin-bottom: 10px;
// }
// .summary-card-amount {
//   font-size: 22px;
//   font-weight: 700;
//   color: #333;
//   margin-bottom: 5px;
// }
// .summary-card-subtitle {
//   font-size: 11px;
//   color: #666;
// }

// .total-revenue-amount { color: #007bff; }
// .revenue-change-positive { color: #28a745; font-size: 11px; font-weight: 500; }
// .pending-amount { color: #ffc107; }
// .overdue-amount-color { color: #dc3545; }

// /* Recent Invoices */
// .recent-invoices-card {
//   background-color: #fff;
//   border-radius: 8px;
//   padding: 25px;
//   box-shadow: 0 2px 4px rgba(0,0,0,0.05);
// }
// .recent-invoices-title {
//   font-size: 17px;
//   font-weight: 600;
//   color: #333;
//   margin-bottom: 20px;
// }

// .invoice-item {
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   padding: 15px 0;
//   border-bottom: 1px solid #eee;
// }
// .invoice-item-last { border-bottom: none; }

// .invoice-client-date {
//   display: flex;
//   flex-direction: column;
// }
// .invoice-client { font-size: 14px; font-weight: 500; color: #333; }
// .invoice-date { font-size: 11px; color: #888; margin-top: 3px; }

// .invoice-amount-status {
//   display: flex;
//   align-items: center;
//   gap: 15px;
// }
// .invoice-amount { font-size: 15px; font-weight: 600; color: #333; }

// /* Status Tags */
// .status-tag {
//   padding: 5px 10px;
//   border-radius: 20px;
//   font-size: 11px;
//   font-weight: 600;
//   color: white;
//   text-transform: capitalize;
//   min-width: 65px;
//   text-align: center;
// }
// .status-tag.paid { background-color: #e6f4ea; color: #1a7f37; }
// .status-tag.pending { background-color: #fffbe5; color: #7f6f00; }
// .status-tag.overdue { background-color: #fde9e7; color: #a82c20; }


// /* Main Container */
// .main-content {
//     max-width: 1000px;
//     margin: auto;
//     padding: 16px;
//     font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
//     background-image: url('https://your-image-url.com/your-image.jpg');
//     background-size: cover;
//     background-position: center;
//     background-repeat: no-repeat;
//     color: #333;
// }

// /* Header */
// .page-header {
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     margin-bottom: 16px;
// }
// .header-text h1 { font-size: 20px; font-weight: 600; color: #1e3b5e; margin: 0; }
// .header-text p { font-size: 12px; color: #667085; margin: 0; }
// .upload-button {
//     background-color: #073D7F;
//     color: white;
//     border: none;
//     padding: 8px 16px;
//     border-radius: 4px;
//     font-size: 12px;
//     cursor: pointer;
//     display: flex;
//     align-items: center;
//     gap: 6px;
//     font-weight: 500;
//     width: fit-content;
// }
// .upload-button:hover { background-color: #0056b3; }

// /* Quick Upload */
// .quick-upload-section {
//     background-color: #ffffff;
//     border: 2px dashed #e2e8f0;
//     border-radius: 8px;
//     padding: 30px 16px;
//     text-align: center;
//     margin-bottom: 16px;
// }
// .upload-icon { font-size: 40px; color: #94a3b8; margin-bottom: 8px; }
// .select-files-button {
//     background-color: #f0f2f5;
//     border: 1px solid #cbd5e1;
//     color: #333;
//     padding: 6px 12px;
//     border-radius: 4px;
//     cursor: pointer;
//     font-size: 12px;
//     font-weight: 500;
// }
// .select-files-button:hover { background-color: #e2e8f0; }

// /* Filter Section */
// .filter-section { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }
// .search-bar-container { position: relative; }
// .search-icon { position: absolute; left: 10px; top: 50%; transform: translateY(-50%); color: #94a3b8; font-size: 12px; }
// .search-input {
//     width: 250px;
//     padding: 8px 8px 8px 32px;
//     border: 1px solid #cbd5e1;
//     border-radius: 4px;
//     font-size: 12px;
// }
// .category-filter {
//     padding: 8px;
//     border: 1px solid #cbd5e1;
//     border-radius: 4px;
//     font-size: 12px;
//     background-color: #fff;
//     cursor: pointer;
//     flex-shrink: 0;
//     min-width: 150px;
// }

// /* Documents Table */
// .documents-table-section {
//     background-color: #ffffff;
//     border-radius: 8px;
//     box-shadow: 0 4px 6px rgba(0,0,0,0.05);
//     overflow: hidden;
// }
// .table-header { padding: 16px; border-bottom: 1px solid #e2e8f0; }
// .table-header h2 { font-size: 16px; font-weight: 600; margin: 0; }
// .styled-table { width: 100%; border-collapse: collapse; }
// .styled-table th, .styled-table td { padding: 12px 16px; text-align: left; border-bottom: 1px solid #e2e8f0; }
// .styled-table th { background-color: #f8fafc; color: #667085; font-weight: 500; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; }
// .styled-table tr:last-child td { border-bottom: none; }
// .document-info { display: flex; align-items: center; gap: 8px; }
// .document-info p { margin: 0; font-size: 12px; font-weight: 500; color: #1e3b5e; }
// .document-info span { font-size: 10px; color: #94a3b8; }
// .document-icon { color: #007bff; font-size: 18px; }
// .category-badge { background-color: #e6f0ff; color: #007bff; padding: 3px 6px; border-radius: 3px; font-size: 10px; font-weight: 500; }
// .status-badge.verified { background-color: #e6f9ed; color: #28a745; padding: 3px 8px; border-radius: 10px; font-size: 10px; font-weight: 600; text-transform: capitalize; }
// .status-badge.processing { background-color: #fff3e0; color: #ff9800; padding: 3px 8px; border-radius: 10px; font-size: 10px; font-weight: 600; text-transform: capitalize; }
// .action-buttons { display: flex; gap: 10px; color: #6c757d; }
// .action-buttons svg { cursor: pointer; font-size: 14px; transition: color 0.2s; }
// .action-buttons svg:hover { color: #333; }

// /* Navigated Views */
// .navigated-view {
//     background-color: #ffffff;
//     border-radius: 8px;
//     box-shadow: 0 4px 6px rgba(0,0,0,0.05);
//     padding: 30px;
//     text-align: center;
// }
// .back-button {
//     background: none;
//     border: 1px solid #cbd5e1;
//     color: #667085;
//     padding: 6px 12px;
//     border-radius: 4px;
//     cursor: pointer;
//     margin-top: 16px;
// }
// .back-button:hover { background-color: #e2e8f0; }



// /* Container */
// .ft-container {
//   padding: 8px 32px 32px 32px;
//   font-family: Inter, sans-serif;
//   font-size: 14px;
//   background-color: #f9fafb;
//   min-height: 100vh;
// }

// /* Header */
// .ft-header-row {
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   margin-bottom: 24px;
// }
// .ft-page-title { font-size: 24px; font-weight: 700; margin-bottom: 4px; }
// .ft-subtext { font-size: 13px; color: #6b7280; }
// .ft-new-filing-btn {
//   padding: 8px 16px;
//   background-color: #073D7F;
//   color: #fff;
//   font-weight: 600;
//   border: none;
//   border-radius: 6px;
//   cursor: pointer;
//    width: fit-content;
// }

// /* Search & Filter */
// .ft-search-filter-row { display: flex; justify-content: space-between; gap: 12px; margin-bottom: 20px; }
// .ft-search-box { flex: 1; padding: 8px 12px; border-radius: 6px; border: 1px solid #d1d5db; font-size: 13px; }
// .ft-dropdown { padding: 8px 12px; border-radius: 6px; border: 1px solid #d1d5db; font-size: 13px; }
// .ft-dropdown-small { padding: 4px 8px; font-size: 12px; border-radius: 4px; border: 1px solid #d1d5db; }

// /* Table */
// .ft-table-card { background-color: #ffffff; border-radius: 10px; padding: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
// .ft-section-title { font-size: 16px; font-weight: 600; margin-bottom: 12px; }
// .ft-table { width: 100%; border-collapse: collapse; }
// .ft-th { text-align: left; padding: 8px; font-weight: 600; font-size: 13px; color: #374151; border-bottom: 1px solid #e5e7eb; }
// .ft-td { padding: 10px 8px; font-size: 13px; border-bottom: 1px solid #f3f4f6; }
// .ft-status-badge, .ft-priority-badge { padding: 2px 8px; border-radius: 12px; font-size: 12px; font-weight: 500; text-transform: capitalize; }
// .ft-status-badge.overdue { background: #fee2e2; color: #b91c1c; }
// .ft-status-badge.in-progress { background: #fef9c3; color: #92400e; }
// .ft-status-badge.pending { background: #e0e7ff; color: #1e3a8a; }
// .ft-status-badge.completed { background: #dcfce7; color: #065f46; }
// .ft-priority-badge.high { background: #fca5a5; color: #7f1d1d; }
// .ft-priority-badge.medium { background: #93c5fd; color: #1e3a8a; }
// .ft-priority-badge.low { background: #d1fae5; color: #065f46; }
// .ft-action-btn { background: none; border: none; cursor: pointer; font-size: 16px; margin-right: 8px; }

// /* Modal */
// .ft-modal-overlay {
//   position: fixed;
//   top: 0; left: 0; right: 0; bottom: 0;
//   background-color: rgba(0,0,0,0.5);
//   display: flex; align-items: center; justify-content: center;
//   z-index: 1000;
// }
// .ft-modal-box { background-color: #fff; padding: 24px; border-radius: 10px; width: 500px; box-shadow: 0 5px 20px rgba(0,0,0,0.1); }
// .ft-modal-header { display: flex; justify-content: space-between; margin-bottom: 20px; }
// .ft-modal-title { font-size: 18px; font-weight: 600; }
// .ft-close-btn { background: none; border: none; font-size: 18px; cursor: pointer; }

// /* Form */
// .ft-form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
// .ft-form-group { display: flex; flex-direction: column; }
// .ft-col-span-2 { grid-column: 1 / 3; }
// .ft-label { font-size: 12px; margin-bottom: 4px; font-weight: 500; }
// .ft-input { padding: 8px 10px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 13px; }
// .ft-textarea { resize: vertical; }

// /* Modal Footer */
// .ft-modal-footer { margin-top: 20px; display: flex; justify-content: flex-end; gap: 10px; }
// .ft-cancel-btn { padding: 8px 16px; background-color: #f3f4f6; border-radius: 6px; border: 1px solid #d1d5db; cursor: pointer; }
// .ft-submit-btn { padding: 8px 16px; background-color: #073D7F; color: #fff; font-weight: 600; border: none; border-radius: 6px; cursor: pointer; }


// /* Container */
// .gi-main-container {
//   padding: 25px;
//   background-color: #F8F9FA;
//   min-height: 100vh;
//   font-family: Arial, sans-serif;
//   color: #333;
// }

// /* Header */
// .gi-header {
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   margin-bottom: 25px;
// }
// .gi-header-title { font-size: 1.8em; font-weight: 600; margin: 0; }
// .gi-header-subtitle { color: #666; margin-top: 5px; font-size: 0.85em; }

// .gi-actions { display: flex; gap: 10px; }
// .gi-pdf-btn {
//   padding: 8px 18px;
//   border-radius: 4px;
//   font-weight: 500;
//   cursor: pointer;
//   border: 1px solid #E0E0E0;
//   display: flex;
//   align-items: center;
//   gap: 6px;
//   transition: background-color 0.2s;
//   font-size: 0.9em;
//   background-color: #FFFFFF;
//   color: #333;
// }
// .gi-send-btn {
//   padding: 8px 18px;
//   border-radius: 4px;
//   font-weight: 500;
//   cursor: pointer;
//   border: 1px solid #073D7F;
//   display: flex;
//   align-items: center;
//   gap: 6px;
//   transition: background-color 0.2s;
//   font-size: 0.9em;
//   background-color: #073D7F;
//   color: #FFFFFF;
// }

// /* Content Grid */
// .gi-content-grid { display: grid; grid-template-columns: 2fr 1fr; gap: 20px; }

// /* Form Sections */
// .gi-form-section {
//   background-color: #FFFFFF;
//   padding: 20px;
//   border-radius: 6px;
//   box-shadow: 0 2px 4px rgba(0,0,0,0.05);
//   margin-bottom: 15px;
// }
// .gi-section-title { font-size: 1.1em; font-weight: 600; margin-bottom: 8px; }
// .gi-section-subtitle { color: #666; font-size: 0.85em; margin-bottom: 15px; }
// .gi-input-field {
//   padding: 8px;
//   border: 1px solid #E0E0E0;
//   border-radius: 4px;
//   font-size: 0.95em;
//   width: 100%;
//   box-sizing: border-box;
// }
// .gi-form-row { display: flex; gap: 15px; margin-bottom: 15px; align-items: flex-end; }
// .gi-full-width { width: 100%; }

// /* Item Boxes */
// .gi-item-box { border: 1px solid #E0E0E0; border-radius: 4px; padding: 12px; margin-bottom: 10px; }
// .gi-item-title { font-weight: 600; margin-bottom: 8px; font-size: 0.95em; }
// .gi-item-description {
//   padding: 8px;
//   border: 1px solid #E0E0E0;
//   border-radius: 4px;
//   margin-bottom: 12px;
//   width: 100%;
//   box-sizing: border-box;
//   font-family: inherit;
//   font-size: 0.95em;
// }
// .gi-quantity-row { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; }
// .gi-item-input-group { display: flex; flex-direction: column; }
// .gi-item-label { font-size: 0.8em; color: #666; margin-bottom: 3px; }

// /* Add Item Button */
// .gi-add-item-btn {
//   background-color: #073D7F;
//   color: #FFFFFF;
//   border: none;
//   padding: 6px 12px;
//   border-radius: 4px;
//   font-weight: 500;
//   cursor: pointer;
//   display: flex;
//   align-items: center;
//   gap: 4px;
//   float: right;
//   margin-bottom: 12px;
//   font-size: 0.9em;
// }
// .gi-clear-float { clear: both; }

// /* Summary Panel */
// .gi-summary-panel {
//   background-color: #FFFFFF;
//   padding: 20px;
//   border-radius: 6px;
//   box-shadow: 0 2px 4px rgba(0,0,0,0.05);
//   height: fit-content;
//   position: sticky;
//   top: 25px;
// }
// .gi-summary-row { display: flex; justify-content: space-between; padding: 4px 0; font-size: 0.9em; }
// .gi-total-row { border-top: 1px solid #E0E0E0; padding-top: 8px; margin-top: 8px; font-weight: 600; font-size: 1em; display: flex; justify-content: space-between; }
// .gi-invoice-info { margin-top: 15px; padding-top: 15px; border-top: 1px solid #E0E0E0; font-size: 0.85em; color: #666; }
// .gi-hidden-label { display: none; }




// /* Dashboard Container */
// .tt-dashboard-content {
//   max-width: 1200px;
//   margin: 0 auto 20px auto;
//   padding: 25px;
//   background-color: #FFF;
//   border-radius: 8px;
//   box-shadow: 0 4px 12px rgba(0,0,0,0.05);
//   font-family: Arial, sans-serif;
//   color: #333;
// }

// /* Header */
// .tt-content-header { margin-bottom: 15px; }
// .tt-header-title { display: flex; align-items: center; }
// .tt-icon { font-size: 1.3em; margin-right: 8px; color: #073D7F; }
// .tt-h1 { margin: 0; font-size: 1.6em; font-weight: 600; }
// .tt-header-subtitle { color: #666; margin-top: 5px; font-size: 0.85em; }

// /* Stats Cards */
// .tt-stats-cards { display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; margin-bottom: 25px; }
// .tt-stat-card { background-color: #FFF; border: 1px solid #E0E0E0; border-radius: 6px; padding: 12px 18px; box-shadow: 0 2px 4px rgba(0,0,0,0.03); }
// .tt-timer-card { background-color: #EBF2FE; border-color: #073D7F; }
// .tt-highlight-blue-border { border-color: #073D7F; }
// .tt-stat-label { font-size: 0.8em; color: #666; margin: 0 0 4px 0; }
// .tt-stat-value-row { display: flex; justify-content: space-between; align-items: center; }
// .tt-stat-value { font-size: 1.6em; font-weight: 700; }
// .tt-highlight-blue { color: #073D7F; }
// .tt-highlight-green { color: #38A169; font-weight: 600; }

// /* Alert Bar */
// .tt-alert-bar { display: flex; align-items: center; background-color: #E6F7E9; padding: 10px 15px; border-radius: 6px; margin-bottom: 25px; color: #38A169; font-size: 0.9em; font-weight: 500; }
// .tt-alert-text { margin: 0; margin-right: 15px; flex-grow: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
// .tt-alert-timer { margin-left: auto; font-weight: 600; margin-right: 15px; min-width: 85px; font-size: 1em; }
// .tt-stop-icon { font-size: 1.1em; cursor: pointer; color: #38A169; padding: 4px; }

// /* Tabs */
// .tt-tab-container { border: 1px solid #E0E0E0; border-radius: 8px; padding: 15px 20px 20px 20px; }
// .tt-tabs { display: flex; border-bottom: 1px solid #E0E0E0; margin-bottom: 15px; }
// .tt-tab-button { background: none; border: none; padding: 8px 15px; font-size: 0.95em; cursor: pointer; color: #666; font-weight: 500; border-bottom: 3px solid transparent; position: relative; top: 1px; transition: color 0.2s; }
// .tt-tab-active { color: #073D7F; font-weight: 600; border-bottom: 3px solid #073D7F; }
// .tt-tab-content-area { padding: 5px 0; }

// /* Forms */
// .tt-form-title { font-size: 1.3em; margin-top: 0; margin-bottom: 15px; }
// .tt-form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px 20px; margin-bottom: 20px; }
// .tt-report-filters { grid-template-columns: 1fr 1fr 1fr; }
// .tt-form-group { display: flex; flex-direction: column; }
// .tt-label { font-size: 0.85em; font-weight: 500; margin-bottom: 4px; }
// .tt-input-field { padding: 8px; border: 1px solid #E0E0E0; border-radius: 4px; font-size: 0.95em; background-color: #FFF; }

// /* Timer Button */
// .tt-timer-button { width: 100%; padding: 12px 15px; background-color: #073D7F; color: #FFF; border: none; border-radius: 4px; font-size: 1em; font-weight: 600; cursor: pointer; display: flex; justify-content: center; align-items: center; transition: background-color 0.2s, color 0.2s; }
// .tt-running-button { background-color: #C2E0FF; color: #073D7F; }
// .tt-button-icon { margin-right: 8px; font-size: 1.1em; }

// /* Time Entries */
// .tt-content-placeholder { color: #666; font-size: 0.9em; margin-bottom: 10px; }
// .tt-time-entry-list { list-style: none; padding: 0; margin: 0; }
// .tt-time-entry-item { border-bottom: 1px solid #EEE; padding: 8px 0; display: flex; justify-content: space-between; align-items: center; font-size: 0.9em; }
// .tt-time-entry-total { border-top: 2px solid #333; padding: 10px 0; font-weight: 600; margin-top: 10px; font-size: 1em; }
// .tt-entry-time { font-weight: bold; margin-right: 10px; color: #073D7F; }
// .tt-entry-edit { cursor: pointer; color: #666; }

// /* Action Buttons */
// .tt-action-button { padding: 8px 18px; border-radius: 4px; font-weight: 500; cursor: pointer; border: 1px solid #E0E0E0; display: flex; align-items: center; gap: 6px; font-size: 0.9em; background-color: #FFF; color: #333; transition: background-color 0.2s; }
// .tt-pdf-button { background-color: #FFF; border-color: #E0E0E0; color: #333; }
// .tt-generate-report { background-color: #073D7F; color: #C2E0FF; border-color: #073D7F; }






// /* Base Styles */
// body, #root, html {
//   height: 100%;
//   margin: 0;
// }

// .app-container {
//   min-height: 100vh;   /* allows natural page scrolling */
//   height: auto;        /* removes fixed scroll box */

//   font-family: 'Inter', sans-serif; /* Using Inter as per guidelines */
//   padding: 20px;
// }

// /* Reusable Components Styles */

// .input-style {
//   padding: 8px 12px;
//   border-radius: 5px;
//   border: 1px solid #ccc;
//   font-size: 14px;
//   min-width: 150px;
// }

// .submit-button-style {
//   padding: 8px 16px;
//   background-color: #073D7F;
//   color: white;
//   border: none;
//   border-radius: 5px;
//   font-size: 14px;
//   cursor: pointer;
//   transition: background-color 0.2s;
//    width: fit-content;
// }

// .submit-button-style:hover {
//   background-color: #0056b3;
// }

// .btn-secondary {
//   background-color: #6c757d;
//   margin-left: 10px;
// }

// .btn-secondary:hover {
//   background-color: #5a6268;
// }

// .btn-filter {
//   background-color: #f0f1f6;
//   color: #073D7F;
//   border: none;
// }

// .btn-reset {
//   background-color: #6c757d;
//   color: white;
//   margin-left: auto;
// }

// /* Statistic Boxes */
// .stat-box {
//   flex: 1;
//   min-width: 120px;
//   background-color: #f1f3f5;
//   padding: 10px;
//   border-radius: 8px;
//   text-align: center;
//   box-shadow: 0 1px 3px rgba(0,0,0,0.1);
// }

// .stat-label {
//   font-size: 10px;
//   color: #555;
//   margin-bottom: 5px;
// }

// .stat-value {
//   font-size: 28px;
//   font-weight: 700;
//   margin-bottom: 3px;
// }

// .stat-sub-label {
//   font-size: 10px;
//   color: #888;
// }

// /* Table Styles */
// .table-header {
//   padding: 12px 15px;
//   background-color: #0056b3;
//   color: white;
//   text-align: left;
//   font-weight: 600;
//   font-size: 14px;
//   border-bottom: 2px solid #003366;
// }

// .table-cell {
//   padding: 10px 15px;
//   font-size: 14px;
//   border-bottom: 1px solid #ddd;
// }

// .table-row-odd {
//   background-color: #f9f9f9;
// }

// .table-row-even {
//   background-color: white;
// }

// .cursor-pointer {
//   cursor: pointer;
// }

// .text-status-active {
//   color: green;
// }

// .text-status-inactive {
//   color: red;
// }

// .text-small-muted {
//   font-size: 12px;
//   color: #555;
// }

// /* Form & Filter container */
// .form-container {
//   margin-bottom: 30px;
//   border: 1px solid #ccc;
//   padding: 15px;
//   border-radius: 8px;
//   background-color: #fafafa;
// }

// .error-message {
//   color: red;
//   margin-bottom: 12px;
//   font-weight: 600;
// }

// /* Modal specific styles */
// .modal-overlay {
//   position: fixed;
//   top: 0;
//   left: 0;
//   right: 0;
//   bottom: 0;
//   background-color: rgba(0, 0, 0, 0.5);
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   z-index: 1000;
// }

// .modal-content {
//   background-color: #fff;
//   padding: 25px;
//   border-radius: 10px;
//   box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
//   min-width: 350px;
//   max-width: 90%;
//   text-align: left;
//   position: relative;
// }

// .modal-header {
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   border-bottom: 1px solid #ddd;
//   padding-bottom: 10px;
//   margin-bottom: 15px;
// }

// .modal-body {
//   line-height: 1.6;
// }

// .close-button {
//   background: none;
//   border: none;
//   font-size: 24px;
//   cursor: pointer;
//   color: #666;
//   position: absolute;
//   top: 10px;
//   right: 15px;
// }

// /* Pagination styles */
// .pagination-container {
//   display: flex;
//   justify-content: center;
//   margin-top: 20px;
//   gap: 10px;
// }

// .pagination-button {
//   padding: 8px 12px;
//   font-size: 14px;
//   cursor: pointer;
//   border-radius: 5px;
//   border: 1px solid #073D7F;
//   background-color: white;
//   color: #073D7F;
//    width: fit-content;
// }

// .pagination-button:disabled {
//   opacity: 0.6;
//   cursor: not-allowed;
// }

// .pagination-button.is-active {
//   background-color: #073D7F;
//   color: white;
// }







// /* ComplianceCalendar.css */

// .container {
//   padding: 20px;
//   overflow-y: auto;
//   background-color: #fff;
//   max-width: 1400px;
//   margin: 0 auto;
// }

// .header {
//   font-size: 22px;
//   font-weight: bold;
//   margin-bottom: 10px;
// }

// .subtitle {
//   color: #6b7280;
//   margin-bottom: 20px;
// }

// .card {
//   border: 1px solid #e5e7eb;
//   border-radius: 8px;
//   padding: 20px;
//   background: #fff;
// }

// .add-deadline-card {
//   margin-bottom: 20px;
// }

// .card-title {
//   margin-bottom: 15px;
//   font-weight: bold;
//   font-size: 16px;
// }

// .deadline-form {
//   display: grid;
//   grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
//   gap: 12px;
//   align-items: end;
// }

// .form-input,
// .form-select,
// .form-date {
//   padding: 10px 12px;
//   border: 1px solid #ddd;
//   border-radius: 6px;
//   font-size: 14px;
//   width: 100%;
//   box-sizing: border-box;
// }

// .form-input:focus,
// .form-select:focus,
// .form-date:focus {
//   outline: none;
//   border-color: #051e4dff;
// }

// .submit-btn {
//   padding: 10px 16px;
//   background-color: #051e4dff;
//   color: #fff;
//   border-radius: 6px;
//   border: none;
//   cursor: pointer;
//   font-weight: 500;
//   transition: background-color 0.2s;
// }

// .submit-btn:hover {
//   background-color: #03152e;
// }

// .counters-grid {
//   display: grid;
//   grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
//   gap: 20px;
//   margin-bottom: 20px;
// }

// .counter-card {
//   background: #fff;
//   border: 1px solid #e5e7eb;
//   border-radius: 8px;
//   padding: 16px;
//   min-height: 100px;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
// }

// .counter-title {
//   margin-bottom: 6px;
//   font-weight: 600;
// }

// .counter-value {
//   font-size: 28px;
//   font-weight: bold;
//   margin: 0;
// }

// .counter-note {
//   font-size: 12px;
//   color: #6b7280;
//   margin: 0;
//   margin-top: 4px;
// }

// .main-layout {
//   display: flex;
//   gap: 20px;
//   flex-wrap: wrap;
// }

// .calendar-section {
//   flex: 2;
//   min-width: 600px;
// }

// .calendar-header {
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   margin-bottom: 15px;
// }

// .nav-btn {
//   padding: 8px 16px;
//   background: #f3f4f6;
//   border: 1px solid #e5e7eb;
//   border-radius: 6px;
//   cursor: pointer;
//   font-weight: 600;
// }

// .nav-btn:hover {
//   background: #e5e7eb;
// }

// .calendar-title {
//   font-weight: bold;
//   font-size: 18px;
// }

// .filter-section {
//   margin-bottom: 15px;
// }

// .weekdays-grid {
//   display: grid;
//   grid-template-columns: repeat(7, 1fr);
//   text-align: center;
//   margin-bottom: 10px;
//   font-weight: bold;
//   color: #374151;
// }

// .calendar-grid {
//   display: grid;
//   grid-template-columns: repeat(7, 1fr);
//   gap: 8px;
// }

// .calendar-day {
//   padding: 12px;
//   border: 1px solid #e5e7eb;
//   border-radius: 6px;
//   cursor: pointer;
//   position: relative;
//   text-align: center;
//   min-height: 60px;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: flex-start;
//   transition: all 0.2s;
// }

// .calendar-day:hover {
//   background-color: #f9fafb;
//   border-color: #051e4dff;
// }

// .day-today {
//   background-color: #eff6ff;
// }

// .day-selected {
//   background-color: #dbeafe;
//   border-color: #051e4dff;
// }

// .deadline-dot {
//   margin-top: 5px;
//   width: 8px;
//   height: 8px;
//   border-radius: 50%;
// }

// .upcoming-section {
//   flex: 1;
//   min-width: 300px;
//   display: flex;
//   flex-direction: column;
//   gap: 20px;
// }

// .divider {
//   margin: 10px 0;
//   border: none;
//   border-top: 1px solid #e5e7eb;
// }

// .deadline-item {
//   border-bottom: 1px solid #e5e7eb;
//   padding: 12px 0;
// }

// .deadline-item:last-child {
//   border-bottom: none;
// }

// .deadline-company {
//   font-weight: bold;
//   margin-bottom: 4px;
// }

// .deadline-task {
//   font-size: 13px;
//   color: #6b7280;
//   margin-bottom: 6px;
// }

// .deadline-badge {
//   color: #fff;
//   padding: 4px 10px;
//   border-radius: 12px;
//   font-size: 12px;
//   display: inline-block;
// }

// .activities-section {
//   margin-top: 30px;
// }

// .activity-item {
//   display: flex;
//   justify-content: space-between;
//   border-bottom: 1px solid #e5e7eb;
//   padding: 12px 0;
//   align-items: center;
//   gap: 16px;
// }

// .activity-item:last-child {
//   border-bottom: none;
// }

// .activity-text {
//   margin: 0 0 4px 0;
// }

// .activity-time {
//   font-size: 12px;
//   color: #6b7280;
//   margin: 0;
// }

// .status-badge {
//   color: #fff;
//   padding: 6px 16px;
//   border-radius: 20px;
//   font-size: 14px;
//   min-width: 100px;
//   text-align: center;
//   text-transform: capitalize;
// }

// .status-completed {
//   background-color: #052456ff;
// }

// .status-reminder {
//   background-color: #5e5d5cff;
// }

// .no-deadlines-text {
//   color: #6b7280;
//   text-align: center;
// }

// /* Responsive Design */
// @media (max-width: 768px) {
//   .deadline-form {
//     grid-template-columns: 1fr;
//   }

//   .calendar-section {
//     min-width: 100%;
//   }

//   .upcoming-section {
//     min-width: 100%;
//   }
// }





// /* DeadlineDashboard Component CSS */
// .deadline-dashboard-root {
//   padding: 16px;
//   background: #f9fafb;
//   min-height: 100vh;
// }
// .deadline-dashboard-header {
//   background: #fff;
//   padding: 20px;
//   border-radius: 12px;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   box-shadow: 0 6px 14px rgba(0,0,0,0.06);
// }
// .deadline-dashboard-header-title {
//   margin: 0;
//   color: #111827;
// }
// .deadline-dashboard-header-desc {
//   margin: 6px 0 0 0;
//   color: #6b7280;
// }
// .deadline-dashboard-header-btns {
//   display: flex;
//   gap: 12px;
// }
// .deadline-dashboard-clients-btn {
//   background: #073D7F;
//   color: #fff;
//   border: none;
//   padding: 8px 14px;
//   border-radius: 8px;
//   cursor: pointer;
// }
// .deadline-dashboard-stats {
//   display: grid;
//   grid-template-columns: repeat(4,1fr);
//   gap: 16px;
//   margin-top: 16px;
// }
// .deadline-dashboard-main {
//   display: grid;
//   grid-template-columns: 2fr 1fr;
//   gap: 16px;
//   margin-top: 20px;
// }
// .deadline-dashboard-card {
//   background: #fff;
//   padding: 16px;
//   border-radius: 12px;
//   box-shadow: 0 6px 10px rgba(0,0,0,0.06);
//   border: 1px solid #e5e7eb;
// }
// .deadline-dashboard-section-title {
//   margin: 0;
//   color: #111827;
//   font-size: 16px;
//   font-weight: 600;
// }
// .deadline-dashboard-deadline-item {
//   margin-top: 12px;
//   padding: 12px;
//   border: 1px solid #e5e7eb;
//   border-radius: 8px;
//   background: #f9fafb;
// }
// .deadline-dashboard-deadline-company {
//   font-weight: 600;
// }
// .deadline-dashboard-deadline-task {
//   font-size: 13px;
//   color: #6b7280;
// }
// .deadline-dashboard-deadline-row {
//   display: flex;
//   justify-content: space-between;
//   margin-top: 8px;
// }
// .deadline-dashboard-deadline-date {
//   font-size: 12px;
//   color: #fff;
//   padding: 2px 8px;
//   border-radius: 6px;
// }
// .deadline-dashboard-deadline-priority {
//   font-size: 12px;
// }
// .deadline-dashboard-card-footer {
//   margin-top: 12px;
//   text-align: center;
//   border-top: 1px solid #e5e7eb;
//   padding-top: 10px;
// }
// .deadline-dashboard-link-btn {
//   background: transparent;
//   border: none;
//   color: #073D7F;
//   cursor: pointer;
//   font-weight: 500;
// }
// .deadline-dashboard-activity-item {
//   margin-top: 12px;
//   display: flex;
//   justify-content: space-between;
// }
// .deadline-dashboard-activity-text {
//   font-size: 14px;
//   color: #111827;
// }
// .deadline-dashboard-activity-time {
//   font-size: 12px;
//   color: #6b7280;
// }
// .deadline-dashboard-activity-status {
//   font-size: 12px;
//   padding: 2px 8px;
//   border-radius: 6px;
//   align-self: center;
// }
// .deadline-dashboard-activity-status-completed {
//   background: #073D7F;
//   color: #fff;
// }
// .deadline-dashboard-activity-status-pending {
//   background: #f3f4f6;
//   color: #6b7280;
// }
// .deadline-dashboard-extras {
//   display: grid;
//   grid-template-columns: repeat(3,1fr);
//   gap: 16px;
//   margin-top: 20px;
// }
// .deadline-dashboard-extra-title {
//   margin: 0;
//   font-size: 15px;
//   color: #111827;
// }
// .deadline-dashboard-extra-value {
//   font-size: 22px;
//   font-weight: 700;
//   margin-top: 8px;
// }
// .deadline-dashboard-extra-subtitle {
//   font-size: 12px;
//   color: #6b7280;
//   margin-top: 4px;
// }







// /* UserManagement global CSS */

// .user-mgmt-root {
//   font-family: 'Segoe UI', Roboto, system-ui, -apple-system;
//   background: #f9fafc;
//   min-height: 100vh;
//   padding: 20px;
// }

// .user-mgmt-header {
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
// }

// .user-mgmt-title {
//   margin: 0;
//   font-size: 24px;
//   color: #073D7F;
// }

// .user-mgmt-desc {
//   color: #6b7280;
//   font-size: 14px;
//   margin-top: 6px;
// }

// .user-mgmt-add-btn {
//   background: #073D7F;
//   height: 40px;
//   width: 120px;
//   color: white;
//   border: none;
//   padding: 8px 14px;
//   border-radius: 8px;
//   cursor: pointer;
//   font-weight: 400;
//   display: flex;
//   align-items: center;
// }

// .user-mgmt-add-icon {
//   margin-right: 8px;
// }

// .user-mgmt-stats {
//   display: grid;
//   grid-template-columns: repeat(4, 1fr);
//   gap: 15px;
//   margin: 20px 0;
// }

// .user-mgmt-stat-card {
//   background: white;
//   padding: 14px;
//   border-radius: 8px;
//   box-shadow: 0 1px 3px rgba(7,61,127,0.08);
// }

// .user-mgmt-stat-title {
//   font-size: 13px;
//   color: #6b7280;
//   margin-bottom: 6px;
// }

// .user-mgmt-stat-value {
//   font-size: 20px;
//   font-weight: 700;
//   color: #073D7F;
// }

// .user-mgmt-stat-extra {
//   font-size: 12px;
//   color: #6b7280;
// }

// .user-mgmt-table-wrap {
//   background: white;
//   padding: 16px;
//   border-radius: 10px;
//   box-shadow: 0 1px 3px rgba(7,61,127,0.06);
// }

// .user-mgmt-table-title {
//   font-weight: 600;
//   margin-bottom: 12px;
// }

// .user-mgmt-table {
//   width: 100%;
//   border-collapse: collapse;
//   font-size: 14px;
// }

// .user-mgmt-table-header {
//   text-align: left;
//   color: #6b7280;
//   border-bottom: 1px solid #eef2f6;
// }

// .user-mgmt-table th, .user-mgmt-table td {
//   padding: 12px 8px;
// }

// .user-mgmt-table-row {
//   border-bottom: 1px solid #f1f5f9;
// }

// .user-mgmt-table-user .user-mgmt-user-name {
//   font-weight: 700;
// }

// .user-mgmt-user-email {
//   font-size: 12px;
//   color: #6b7280;
// }

// .user-mgmt-role {
//   padding: 6px 10px;
//   border-radius: 12px;
//   font-size: 12px;
//   font-weight: 600;
//   display: inline-block;
// }
// .user-mgmt-role-partner {
//   background: #e0f2fe;
//   color: #073D7F;
// }
// .user-mgmt-role-manager {
//   background: #dcfce7;
//   color: #16a34a;
// }
// .user-mgmt-role-staff {
//   background: #fef3c7;
//   color: #d97706;
// }
// .user-mgmt-role-intern {
//   background: #f3f4f6;
//   color: #374151;
// }

// .user-mgmt-table-contact {
//   color: #4b5563;
//   font-size: 13px;
// }
// .user-mgmt-contact-row {
//   display: flex;
//   align-items: center;
//   gap: 8px;
// }
// .user-mgmt-contact-phone {
//   margin-top: 6px;
// }
// .user-mgmt-contact-email {
//   font-size: 12px;
// }

// .user-mgmt-status-btn {
//   border: none;
//   border-radius: 14px;
//   padding: 6px 12px;
//   font-size: 12px;
//   cursor: pointer;
// }
// .user-mgmt-status-btn.active {
//   background: #073D7F;
//   color: #fff;
// }
// .user-mgmt-status-btn.inactive {
//   background: #f1f5f9;
//   color: #374151;
// }

// .user-mgmt-table-actions {
//   display: flex;
//   gap: 8px;
// }
// .user-mgmt-action-btn {
//   border: none;
//   padding: 8px;
//   border-radius: 8px;
//   cursor: pointer;
// }
// .user-mgmt-edit-btn {
//   background: #e0f2fe;
//   color: #073D7F;
// }
// .user-mgmt-delete-btn {
//   background: #fee2e2;
//   color: #dc2626;
// }

// /* Modal Styles */
// .user-mgmt-modal-overlay {
//   position: fixed;
//   inset: 0;
//   background: rgba(7,12,20,0.55);
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   z-index: 1200;
//   padding: 20px;
// }
// .user-mgmt-modal {
//   width: 680px;
//   background: #fff;
//   border-radius: 10px;
//   padding: 20px;
//   box-shadow: 0 10px 30px rgba(2,6,23,0.25);
//   max-height: 90vh;
//   overflow-y: auto;
// }
// .user-mgmt-modal-header {
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
// }
// .user-mgmt-modal-title {
//   margin: 0;
//   font-size: 18px;
// }
// .user-mgmt-modal-close {
//   border: none;
//   background: transparent;
//   font-size: 18px;
//   cursor: pointer;
// }
// .user-mgmt-modal-form {
//   margin-top: 18px;
// }
// .user-mgmt-modal-form-grid {
//   display: grid;
//   grid-template-columns: 1fr 1fr;
//   gap: 14px;
// }
// .user-mgmt-modal-form-dept {
//   grid-column: 1 / -1;
// }
// .user-mgmt-label {
//   font-size: 13px;
//   font-weight: 600;
//   display: block;
//   margin-bottom: 6px;
// }
// .user-mgmt-input {
//   width: 100%;
//   height: 40px;
//   padding: 8px 10px;
//   border-radius: 8px;
//   border: 1px solid #e6e9ee;
//   outline: none;
//   font-size: 14px;
//   background: #fff;
// }
// .user-mgmt-modal-perms {
//   margin-top: 18px;
// }
// .user-mgmt-modal-perms-title {
//   font-size: 13px;
//   font-weight: 600;
//   margin-bottom: 8px;
// }
// .user-mgmt-modal-perms-grid {
//   display: grid;
//   grid-template-columns: 1fr 1fr;
//   gap: 10px;
// }
// .user-mgmt-modal-perms-col {
//   display: grid;
//   gap: 8px;
// }
// .user-mgmt-modal-perm-row {
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   padding: 8px 10px;
//   border-radius: 8px;
// }
// .user-mgmt-modal-perm-label {
//   font-size: 14px;
// }
// .user-mgmt-modal-btns {
//   display: flex;
//   justify-content: flex-end;
//   gap: 10px;
//   margin-top: 18px;
// }
// .user-mgmt-modal-cancel {
//   padding: 8px 14px;
//   border: 1px solid #e6e9ee;
//   border-radius: 8px;
//   background: #f3f4f6;
//   cursor: pointer;
// }
// .user-mgmt-modal-submit {
//   padding: 8px 14px;
//   border: none;
//   border-radius: 8px;
//   background: #073D7F;
//   color: #fff;
//   font-weight: 700;
//   cursor: pointer;
// }

// /* Toggle Switch */
// .toggle-track {
//   width: 46px;
//   height: 26px;
//   border-radius: 26px;
//   background: #e6e9ee;
//   position: relative;
//   cursor: pointer;
//   /* transition: background 0.18s ease; */
//   display: inline-block;
//   vertical-align: middle;
// }
// .toggle-track.checked {
//   background: #073D7F;
// }
// .toggle-knob {
//   width: 20px;
//   height: 20px;
//   border-radius: 50%;
//   background: #fff;
//   position: absolute;
//   top: 3px;
//   left: 3px;
//   box-shadow: 0 2px 6px rgba(12,20,40,0.12);
//   transition: left 0.18s ease;
// }
// .toggle-knob.checked {
//   left: 23px;
// }







// body, .reports-root {
//   font-family: Arial, sans-serif;
//   background: #f9fafb;
//   min-height: 100vh;
// }
// .reports-header {
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   margin-bottom: 32px;
// }
// .reports-header-left {
//   display: flex;
//   align-items: center;
//   gap: 12px;
// }
// .reports-header-title {
//   margin: 0;
//   font-size: 24px;
//   font-weight: 600;
// }
// .reports-header-desc {
//   margin: 4px 0 0;
//   font-size: 14px;
//   color: #6b7280;
// }
// .reports-header-actions {
//   display: flex;
//   gap: 16px;
// }
// .reports-header-select {
//   padding: 8px 12px;
//   border-radius: 6px;
//   border: 1px solid #d1d5db;
// }
// .reports-header-export-btn {
//   padding: 8px 18px;
//   border-radius: 6px;
//   border: 1px solid #d1d5db;
//   background: #fff;
//   display: flex;
//   align-items: center;
//   gap: 8px;
//   cursor: pointer;
//   font-size: 15px;
//   font-weight: 600;
//   color: #073D7F;
//   transition: background 0.2s;
// }
// .reports-header-export-btn:hover {
//   background: #f0f4fa;
// }
// .reports-cards {
//   display: grid;
//   grid-template-columns: repeat(4, 1fr);
//   gap: 24px;
//   margin-bottom: 32px;
// }
// .reports-card {
//   background: #fff;
//   padding: 20px;
//   border-radius: 8px;
//   box-shadow: 0 1px 2px rgba(0,0,0,0.05);
// }
// .reports-card-title {
//   font-size: 14px;
//   color: #6b7280;
//   font-weight: 500;
// }
// .reports-card-value {
//   font-size: 28px;
//   font-weight: 600;
//   margin: 8px 0;
//   color: #111827;
// }
// .reports-card-change {
//   font-size: 13px;
//   margin: 0;
//   font-weight: 500;
// }
// .reports-tabs {
//   border-bottom: 1px solid #e5e7eb;
//   margin-bottom: 32px;
// }
// .reports-tab-btn {
//   padding: 12px 0;
//   font-size: 15px;
//   background: none;
//   border: none;
//   cursor: pointer;
//   color: #6b7280;
//   font-weight: 500;
//   border-bottom: 2px solid transparent;
//   /* transition: color 0.2s, border-bottom 0.2s; */
// }
// .reports-tab-btn.active {
//   color: #073D7F;
//   font-weight: 600;
//   border-bottom: 2px solid #3b82f6;
// }
// .reports-section {
//   background: #fff;
//   padding: 24px;
//   border-radius: 8px;
//   border: 1px solid #e5e7eb;
//   box-shadow: 0 1px 2px rgba(0,0,0,0.05);
//   margin-bottom: 24px;
// }
// .reports-section-title {
//   margin: 0 0 16px 0;
//   font-size: 18px;
//   font-weight: 600;
//   color: #111827;
// }
// .reports-breakdown-list {
//   list-style: none;
//   padding: 0;
//   margin: 0;
// }
// .reports-breakdown-item {
//   display: flex;
//   justify-content: space-between;
//   padding: 12px 0;
//   border-bottom: 1px solid #f3f4f6;
//   font-size: 14px;
// }
// .reports-breakdown-amount {
//   font-weight: 600;
// }
// .reports-compliance-overall {
//   font-size: 36px;
//   font-weight: 700;
//   color: #073D7F;
//   margin-bottom: 4px;
// }
// .reports-compliance-label {
//   font-size: 14px;
//   font-weight: 400;
//   color: #6b7280;
//   margin-top: 4px;
// }
// .reports-filing-row {
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   margin-bottom: 10px;
//   padding: 8px 0;
//   border-bottom: 1px solid #f3f4f6;
// }
// .reports-filing-label {
//   font-weight: 500;
//   color: #374151;
//   font-size: 14px;
// }
// .reports-filing-percentage {
//   font-weight: 600;
//   font-size: 14px;
//   background-color: #f9fafb;
//   padding: 4px 8px;
//   border-radius: 4px;
// }
// .reports-filing-percentage.high {
//   color: #073D7F;
// }
// .reports-filing-percentage.low {
//   color: #dc2626;
// }
// .reports-deadline-card {
//   padding: 12px;
//   border-radius: 6px;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   margin-bottom: 8px;
//   border: 1px solid #e5e7eb;
//   background-color: white;
// }
// .reports-deadline-title {
//   font-size: 14px;
//   font-weight: 500;
//   color: #1f2937;
// }
// .reports-deadline-details {
//   font-size: 12px;
//   color: #6b7280;
// }
// .reports-deadline-date {
//   font-size: 12px;
//   font-weight: 600;
//   color: #ef4444;
// }
// .reports-team-container {
//   padding: 24px;
// }
// .reports-team-header-row {
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   margin-bottom: 20px;
// }
// .reports-team-header {
//   font-size: 20px;
//   font-weight: 600;
//   color: #374151;
// }
// .reports-team-export-btn {
//   background: #fff;
//   border: 1px solid #d1d5db;
//   border-radius: 8px;
//   padding: 8px 20px;
//   cursor: pointer;
//   font-size: 15px;
//   font-weight: 600;
//   color: #073D7F;
//   transition: background 0.2s;
// }
// .reports-team-export-btn:hover {
//   background: #f0f4fa;
// }
// .reports-team-card {
//   background: #fff;
//   box-shadow: 0 1px 3px rgba(0,0,0,0.1);
//   border-radius: 12px;
//   padding: 16px;
//   margin-bottom: 16px;
// }
// .reports-team-top-row {
//   display: flex;
//   justify-content: space-between;
//   margin-bottom: 8px;
// }
// .reports-team-name {
//   font-weight: 600;
//   color: #1f2937;
// }
// .reports-team-efficiency {
//   font-weight: 500;
//   color: #059669;
// }
// .reports-team-task-info {
//   font-size: 14px;
//   color: #6b7280;
//   margin-bottom: 8px;
// }
// .reports-team-progress-bg {
//   width: 100%;
//   background: #e5e7eb;
//   border-radius: 8px;
//   height: 8px;
// }
// .reports-team-progress {
//   height: 8px;
//   background: #073D7F;
//   border-radius: 8px;
// }



// /* ===== Base Styles ===== */
// .tm-container {
//   padding: 24px;
//   font-family: "Inter", "Segoe UI", Arial, sans-serif;
//   background-color: #f8fafc;
//   min-height: 100vh;
// }
 
// .tm-title {
//   font-size: 22px;
//   font-weight: 600;
//   color: #1e293b;
//   margin: 0;
//   display: flex;
//   align-items: center;
//   gap: 8px;
// }
 
// .tm-subtitle {
//   font-size: 14px;
//   color: #64748b;
//   margin-top: 4px;
// }
 
// /* ===== Header ===== */
// .tm-header {
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
// }
 
// .tm-createBtn {
//   background-color: #073d7f;
//   color: #fff;
//   padding: 8px 18px;
//   font-size: 14px;
//   font-weight: 500;
//   border: none;
//   border-radius: 6px;
//   cursor: pointer;
//   transition: background 0.2s;
//   width:100px;
// }
 
// .tm-createBtn:hover {
//   background-color: #052c5c;
// }
 
// /* ===== Stats Cards ===== */
// .tm-statsContainer {
//   display: flex;
//   gap: 16px;
//   margin: 24px 0;
// }
 
// .tm-statBox {
//   flex: 1;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   background: #fff;
//   padding: 16px 18px;
//   border: 1px solid #e2e8f0;
//   border-radius: 10px;
//   box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
// }
 
// .tm-statBox span {
//   font-size: 14px;
//   color: #64748b;
// }
 
// .tm-statBox h3 {
//   font-size: 20px;
//   font-weight: 600;
//   color: #1e293b;
//   margin-top: 4px;
// }
 
// /* ===== Toggle View Tabs ===== */
// .tm-toggleRow {
//   display: flex;
//   justify-content: space-between;
//   margin-bottom: 16px;
//   background: #f1f5f9;
//   border-radius: 8px;
//   overflow: hidden;
// }
 
// .tm-toggleView {
//   display: flex;
//   width: 100%;
// }
 
// .tm-activeTab,
// .tm-inactiveTab {
//   flex: 1;
//   padding: 10px;
//   font-size: 14px;
//   font-weight: 500;
//   border: none;
//   cursor: pointer;
//   transition: background 0.2s;
// }
 
// .tm-activeTab {
//   background: #073d7f;
//    color: #fff;
// }
 
// .tm-inactiveTab {
//   background: transparent;
//   color: #64748b;
// }
 
// /* ===== Kanban Columns ===== */
// .tm-kanban {
//   display: flex;
//   gap: 16px;
// }
 
// .tm-column {
//   flex: 1;
//   background: #fff;
//   border: 1px solid #e2e8f0;
//   border-radius: 12px;
//   padding: 14px;
//   display: flex;
//   flex-direction: column;
//   gap: 10px;
//   box-shadow: 0 1px 4px rgba(0, 0, 0, 0.03);
// }
 
// .tm-columnHeader {
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   margin-bottom: 6px;
// }
 
// .tm-columnHeader h4 {
//   font-size: 15px;
//   font-weight: 600;
//   color: #1e293b;
// }
 
// .tm-countBadge {
//   background: #f1f5f9;
//   padding: 2px 8px;
//   border-radius: 12px;
//   font-size: 12px;
//   color: #1e293b;
// }
 
// /* ===== Task Cards ===== */
// .tm-card {
//   background: #fff;
//   border: 1px solid #e2e8f0;
//   border-radius: 10px;
//   padding: 12px;
//   display: flex;
//   flex-direction: column;
//   gap: 6px;
//   box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
// }
 
// .tm-cardTitle {
//   font-size: 14px;
//   font-weight: 600;
//   color: #1e293b;
// }
 
// .tm-cardInfo {
//   font-size: 13px;
//   color: #475569;
//   display: flex;
//   align-items: center;
//   gap: 6px;
// }
 
// .tm-cardFooter {
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   margin-top: 4px;
// }
 
// .tm-high {
//   background: #fee2e2;
//   color: #dc2626;
//   padding: 2px 8px;
//   border-radius: 12px;
//   font-size: 12px;
//   font-weight: 500;
// }
 
// .tm-medium {
//   background: #fef3c7;
//   color: #d97706;
//   padding: 2px 8px;
//   border-radius: 12px;
//   font-size: 12px;
//   font-weight: 500;
// }
 
// .tm-low {
//   background: #dcfce7;
//   color: #16a34a;
//   padding: 2px 8px;
//   border-radius: 12px;
//   font-size: 12px;
//   font-weight: 500;
// }
 
// .tm-hours {
//   font-size: 13px;
//   color: #475569;
//   font-weight: 500;
// }
 
// /* ===== Table View ===== */
// .tm-table {
//   width: 100%;
//   border-collapse: collapse;
//   background: #fff;
//   border: 1px solid #e2e8f0;
//   border-radius: 12px;
//   overflow: hidden;
// }
 
// .tm-table th {
//   background: #f8fafc;
//   font-size: 13px;
//   font-weight: 600;
//   color: #475569;
//   text-align: left;
//   padding: 10px;
//   border-bottom: 1px solid #e2e8f0;
// }
 
// .tm-table td {
//   padding: 10px;
//   border-bottom: 1px solid #e2e8f0;
//   font-size: 13px;
//   color: #1e293b;
// }
 
// .tm-table tr:last-child td {
//   border-bottom: none;
// }
 
// /* ===== Modal ===== */
// .tm-modalOverlay {
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background: rgba(0, 0, 0, 0.4);
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   z-index: 1000;
// }
 
// .tm-modal {
//   background: #fff;
//   padding: 24px;
//   border-radius: 12px;
//   width: 420px;
//   box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
// }
 
// .tm-formGroup {
//   display: flex;
//   flex-direction: column;
//   margin-bottom: 12px;
// }
 
// .tm-formGroup label {
//   font-size: 13px;
//   font-weight: 500;
//   color: #475569;
//   margin-bottom: 4px;
// }
 
// .tm-input,
// .tm-textarea,
// .tm-formGroup select {
//   padding: 8px;
//   font-size: 13px;
//   border: 1px solid #e2e8f0;
//   border-radius: 6px;
//   background: #f8fafc;
// }
 
// .tm-textarea {
//   min-height: 60px;
//   resize: vertical;
// }
 
// .tm-formGrid {
//   display: grid;
//   grid-template-columns: 1fr 1fr;
//   gap: 12px;
//   margin-top: 8px;
// }
 
// .tm-modalActions {
//   display: flex;
//   justify-content: flex-end;
//   gap: 10px;
//   margin-top: 16px;
// }
 
// .tm-cancelBtn {
//   background: #e2e8f0;
//   border: none;
//   padding: 8px 14px;
//   border-radius: 6px;
//   cursor: pointer;
// }
 
// .tm-saveBtn {
//   background: #073d7f;
//   color: #fff;
//   border: none;
//   padding: 8px 14px;
//   border-radius: 6px;
//   cursor: pointer;
// }
 
 


// /* Global Reset */
// * {
//   margin: 0;
//   padding: 0;
//   box-sizing: border-box;
//   font-family: Arial, sans-serif;
//   caret-color: transparent;
// }
 
// html,
// body,
// #root {
//   height: 100%;
// }
 
// .login-wrapper {
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 100vh;
//   width: 100vw;
//   background: linear-gradient(135deg, #eceef1ff, #eff1f5ff);
// }
 
// /* Box */
// .login-box {
//   background: #fff;
//   border-radius: 12px;
//   padding: 40px 30px;
//   width: 400px;
//   box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
//   text-align: center;
// }
 
// /* Form groups */
// .form-group {
//   display: flex;
//   flex-direction: column;
//   margin-bottom: 5px;
//   text-align: left;
// }
 
// .form-group label {
//   font-size: 14px;
//   font-weight: bold;
//   margin-bottom: 6px;
//   color: #073d7f;
// }
 
// .radio-group {
//   display: flex;
//   justify-content: center;
//   gap: 20px;
//   /* margin-top: 5px; */
// }
 
// .form-group input {
//   width: 100%;
//   padding: 10px;
//   border: 1px solid #ccc;
//   border-radius: 6px;
//   font-size: 14px;
//   background: #f1f1f1;
// }
 
// /* Error styles */
// .error {
//   color: red;
//   font-size: 12px;
//   margin-top: 5px;
// }
 
// .general-error {
//   text-align: center;
//   font-size: 14px;
//   margin-bottom: 10px;
//   color: red;
// }
 
// /* Button */
// button {
//   width: 100%;
//   padding: 12px;
//   background: #073d7f;
//   color: #fff;
//   border: none;
//   border-radius: 6px;
//   font-size: 16px;
//   font-weight: bold;
//   cursor: pointer;
//   margin-top: 10px;
// }
 
// /* Links */
// .signup-text,
// .forgot-text {
//   text-align: center;
//   font-size: 14px;
//   margin-top: 15px;
//   color: #333;
// }
 
// .signup-text a,
// .forgot-text a,
// .forgot-link {
//   text-decoration: none;
//   color: #073d7f;
//   font-weight: bold;
//   cursor: pointer;
// }
 
// /* Logo section */
// .logo {
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   gap: 10px;
//   margin-bottom: 8px;
// }
 
// .logo img {
//   width: 50px;
//   height: 50px;
// }
 
// .logo h2 {
//   font-size: 20px;
//   font-weight: bold;
//   color: #073d7f;
// }
 
 



 
// * {
//   margin: 0;
//   padding: 0;
//   box-sizing: border-box;
//   font-family: Arial, sans-serif;
//   caret-color: transparent;
// }
 
// input:focus,
// select:focus {
//   outline: none;
//   border-color: #073d7f;
// }
 
// /* Wrapper */
// .register-wrapper {
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 100vh;
//    padding: 20px;
//   background: linear-gradient(135deg, #f7f9fc, #f7f9fc);
// }
 
// /* Box */
// .register-box {
//   background: #fff;
//   width: 100%;
//   max-width: 500px;
//   padding: 35px 30px;
//   border-radius: 12px;
//   box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
//   border: 1px solid #e6e9ef;
// }
// /* Title */
// .form-title {
//   text-align: center;
//   margin-bottom: 15px;
//   font-size: 22px;
//   color: #073d7f;
//   font-weight: bold;
// }
 
// /* Form layout */
// .row {
//   display: flex;
//   gap: 20px;
//   margin-bottom: 10px;
// }
 
// .col {
//   flex: 1;
//   display: flex;
//   flex-direction: column;
// }
 
// input,
// select {
//   padding: 8px;
//   border: 1px solid #ccc;
//   border-radius: 6px;
//   font-size: 14px;
//   background: #f1f1f1;
//     outline: none;
// }
 
// /* Errors */
// .error {
//   color: red;
//   font-size: 12px;
//   margin-top: 5px;
// }
 
// /* Button */
// button {
//   width: 100%;
//   padding: 12px;
//   background: #073d7f;
//   color: #fff;
//   border: none;
//   border-radius: 6px;
//   font-size: 16px;
//   font-weight: bold;
//   margin-top: 10px;
//   cursor: pointer;
// }
 
// /* Login link */
// .login-link {
//   text-align: center;
//   margin-top: 15px;
//   font-size: 14px;
// }
 
// .login-link a {
//   color: #073d7f;
//   font-weight: bold;
//   text-decoration: none;
// }
 
// input:focus,
// select:focus {
//   border-color: #007bff;
// }
 







// /* Notifications.css */
 
// /* Page Layout */

// .page-container {

//   background: #f9fafb;

//   padding: 24px;

//   min-height: calc(100vh - 64px);

// }
 
// /* Back Button */

// .back-button {

//   background: #1f2937;

//   color: #f4b443;

//   border: none;

//   border-radius: 8px;

//   padding: 10px 16px;

//   cursor: pointer;

//   font-weight: 600;

//   font-size: 14px;

//   margin-bottom: 16px;

// }
 
// /* Page Header */

// .page-title {

//   font-size: 26px;

//   font-weight: bold;

//   color: #2563eb;

// }
 
// .page-subtitle {

//   margin-top: 6px;

//   margin-bottom: 24px;

//   color: #374151;

// }
 
// /* Grid Layout */

// .content-grid {

//   display: grid;

//   grid-template-columns: 1fr 1fr;

//   gap: 40px;

// }
 
// /* Info and Form Sections */

// .info-section,

// .form-section {

//   background: #fff;

//   padding: 24px;

//   border-radius: 12px;

//   box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);

// }
 
// /* Section Titles */

// .section-title {

//   font-size: 20px;

//   font-weight: 600;

//   margin-bottom: 16px;

//   color: #111827;

// }
 
// /* Notification Cards */

// .info-card {

//   margin-bottom: 20px;

//   padding: 16px;

//   background: #f3f4f6;

//   border-radius: 10px;

// }
 
// .info-title {

//   font-weight: 600;

//   margin-bottom: 6px;

//   color: #2563eb;

// }
 
// .info-text {

//   color: #374151;

//   margin-bottom: 6px;

// }
 
// .time-text {

//   font-size: 12px;

//   color: #6b7280;

// }
 
// /* Form */

// .form {

//   display: flex;

//   flex-direction: column;

//   gap: 16px;

// }
 
// .form-group {

//   display: flex;

//   flex-direction: column;

// }
 
// .label {

//   font-weight: 500;

//   color: #374151;

// }
 
// .button {

//   background: #2563eb;

//   color: #fff;

//   padding: 14px;

//   border-radius: 8px;

//   border: none;

//   font-size: 16px;

//   font-weight: 600;

//   cursor: pointer;

//   margin-top: 8px;

// }
// .app-container {
//   max-width: 1200px;
//   margin: 0 auto;
//   padding: 20px;
//   overflow-x: hidden;
//   text-align: center;
// }
 
// .client-table {
//   width: 100%;
//   border-collapse: collapse;
//   margin: 20px 0;
//   text-align: left;
// }
 
// .client-table th,
// .client-table td {
//   border: 1px solid #ddd;
//   padding: 8px;
// }
 
// .client-table th {
//   background-color: #f2f2f2;
// }
 
// .delete-button {
//   background-color: #e74c3c;
//   color: white;
//   border: none;
//   padding: 5px 10px;
//   margin-left: 5px;
//   cursor: pointer;
//   border-radius: 4px;
// }
 
// .status-button {
//   background-color: #3498db;
//   color: white;
//   border: none;
//   padding: 5px 10px;
//   margin-right: 5px;
//   cursor: pointer;
//   border-radius: 4px;
// }
 
// .submit-button-style {
//   background-color: #073D7F;
//   color: white;
//   border: none;
//   padding: 8px 15px;
//   border-radius: 5px;
//   cursor: pointer;
// }
// .delete-button {
//   background-color: #e74c3c;
//   color: white;
//   border: none;
//   padding: 5px 10px;
//   margin-left: 5px;
//   border-radius: 4px;
//   cursor: pointer;
//   transition: background-color 0.2s ease;
// }
 
// .delete-button:hover {
//   background-color: #c0392b;
// }
// .pagination-container {
//   display: flex;
//   justify-content: center;
//   flex-wrap: nowrap; /* single row */
//   gap: 5px;
//   margin-top: 15px;
// }
 
// .pagination-button {
//   padding: 5px 10px;
//   border: 1px solid #ccc;
//   border-radius: 4px;
//   background-color: #f0f0f0;
//   cursor: pointer;
//   transition: 0.2s;
// }
 
// .pagination-button:hover {
//   background-color: #e0e0e0;
// }
 
// .pagination-button.is-active {
//   background-color: #073D7F;
//   color: white;
//   border-color: #073D7F;
// }
 
 


// /* ----------------- Added for Client Form ----------------- */

// .form-grid {
//   display: grid;
//   grid-template-columns: repeat(4, 2fr);
//   gap: 16px;
// }

// .form-group {
//   display: flex;
//   flex-direction: column;
// }

// .error-text {
//   font-size: 12px;
//   color: red;
//   margin-top: 4px;
// }

// .input-error {
//   border: 1px solid red !important;
//   background-color: #ffecec;
// }

// .icon-btn {
//   background: none;
//   border: none;
//   cursor: pointer;
//   font-size: 18px;
//   padding: 4px;
// }

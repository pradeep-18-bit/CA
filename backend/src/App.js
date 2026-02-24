// src/App.js
import React from "react";
// import './Global.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { SettingsProvider } from "./DASHBOARD/COMPONENTS/SettingsContext";
import DashboardLayout from "./DashboardLayout";
import DeadlineDashboard from "./DASHBOARD/DeadlineDashboard";
import ClientsPage from "./CLIENT MANAGEMENT/ClientPage";
import ComplianceCalendar from "./COMPLIANCE CALENDAR/ComplianceCalendar";
import BillingPage from "./BILLING/BillingPage";
import Login from "./Authentication/Loginpage";
import Registers from "./Authentication/signuppage";
import Notifications from "./NOTIFICATIONS/Notifications";
import ContactUs from "./ContactUs";
import Settings from "./Settings";
import ForgotPassword from "./Authentication/forgotpassword";
import DocumentManagement from "./DOCUMENT/DocumentManagement";
import FilingTracker from "./FILLING TRACKER/FIllingTracker";
import GenerateInvoice from "./GENERATE INVOICE/GenerateInvoice";   
import TimeTracking from "./TIME TRACKING/TimeTrackingDashboard";        
import UserManagement from "../src/USER MANAGEMENT/UserManagement";
import TaskManagement from "./TASK MANAGEMENT/TaskManagement";
import FirmSettings from "./firmsettings/FirmSettings";
import ReportsAnalytics from "./REPORTS & ANALYTICS/ReportsAnalytics";
import Authentication from "./createuserinformation/mainpage";
import InternLogin from "./Staff_Intern_folder/intern_loginpage/InternLogin";
import StaffLogin from "./Staff_Intern_folder/Staff_loginpage/StaffLogin";
import ChangePassword from "./Authentication/ChangePassword";
import ChangePasswordStaff from "./Staff_Intern_folder/ChangePasswordStaff";
import ChangePasswordIntern from "./Staff_Intern_folder/intern_loginpage/ChangePasswordStaff";


import ViewActivityLogPage from "./DASHBOARD/COMPONENTS/Pages/Activelogpage";
import AllDeadlinesPage from "./DASHBOARD/COMPONENTS/Pages/Alldeadlinespage";
import SupportTicketsPage from "./DASHBOARD/COMPONENTS/Pages/supportTickets";
import LiveTasksPage from "./DASHBOARD/COMPONENTS/Pages/Livetaskpage";
import NewClientsPage from "./DASHBOARD/COMPONENTS/Pages/newclientspage";
import DueTodayPage from "./DASHBOARD/COMPONENTS/Pages/duetodaypage";
import PendingInvoicesPage from "./DASHBOARD/COMPONENTS/Pages/pendinginvoices";
import RevenuePage from "./DASHBOARD/COMPONENTS/Pages/revenuepage";
import CandidatesPage from "./DASHBOARD/COMPONENTS/Pages/candidatespage";
// import ActivityItem from "./DASHBOARD/COMPONENTS/ActivityItem";


// import StaffDeadlineDashboard from "./staffdashbord/DeadlineDashboard";
import ViewActivityLogPageStaff from "./staffdashbord/COMPONENTS/Pages/Activelogpage";
import AllDeadlinesPageStaff from "./staffdashbord/COMPONENTS/Pages/Alldeadlinespage";
import SupportTicketsPageStaff from "./staffdashbord/COMPONENTS/Pages/supportTickets";
import LiveTasksPageStaff from "./staffdashbord/COMPONENTS/Pages/Livetaskpage";
import NewClientsPageStaff from "./staffdashbord/COMPONENTS/Pages/newclientspage";
import DueTodayPageStaff from "./staffdashbord/COMPONENTS/Pages/duetodaypage";
import PendingInvoicesPageStaff from "./staffdashbord/COMPONENTS/Pages/pendinginvoices";
import RevenuePageStaff from "./staffdashbord/COMPONENTS/Pages/revenuepage";
import CandidatesPageStaff from "./staffdashbord/COMPONENTS/Pages/candidatespage";

import { NotificationProvider } from "./NOTIFICATIONS/COMPONENTS/NotificationContext";


// Protect routes that need login
function PrivateRoute({ children }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  return isLoggedIn ? children : <Navigate to="/Signin" replace />;
}
export default function App() {
  return (
    <NotificationProvider>
    <SettingsProvider>
      <Router>
        <Routes>
          {/* Default: redirect to login if not logged in */}
          <Route path="/" element={<Navigate to="/Signin" replace />} />
          <Route path="/" element={<Navigate to="/changepassword" replace />} />


          {/* Auth pages */}
          <Route path="/Signin" element={<Login />} />
          <Route path="/signup" element={<Registers />} />
          <Route path="/ForgotPassword" element={<ForgotPassword />} />
          <Route path="/Notifications" element={<PrivateRoute><Notifications /></PrivateRoute>} />
          <Route path="/ContactUs" element={<PrivateRoute><ContactUs /></PrivateRoute>} />
          <Route path="/Settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
          <Route path="/ChangePassword" element={<ChangePassword />} />
           <Route path="/ChangePasswordforStaff" element={<ChangePasswordStaff />} />
           <Route path="/ChangePasswordIntern" element={<ChangePasswordIntern />} />

        
          {/* Dashboard Pages */}
          <Route
            path="/DeadlineDashboard"
            element={
              <PrivateRoute>
                <DashboardLayout>
                  <DeadlineDashboard />
                </DashboardLayout>
              </PrivateRoute>
            }
          />


            <Route
              path="/Notifications"
              element={
                <PrivateRoute>
                  <Notifications />
                </PrivateRoute>
              }
            />

           {/* <Route
            path="/StaffDeadlineDashboard"
            element={
              <PrivateRoute>
                <DashboardLayout>
                  <StaffDeadlineDashboard />
                </DashboardLayout>
              </PrivateRoute>
            }
          /> */}
          <Route
            path="/clients"
            element={
              <PrivateRoute>
                <DashboardLayout>
                  <ClientsPage />
                </DashboardLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/compliance"
            element={
              <PrivateRoute>
                <DashboardLayout>
                  <ComplianceCalendar />
                </DashboardLayout>
              </PrivateRoute>
            }
          />
          <Route 
            path="/Document" 
            element={
              <PrivateRoute>
                <DashboardLayout>
                  <DocumentManagement />
                </DashboardLayout>
              </PrivateRoute>
            } 
          />
          <Route
            path="/billing"
            element={
              <PrivateRoute>
                <DashboardLayout>
                  <BillingPage />
                </DashboardLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/filling-tracker"
            element={
              <PrivateRoute>
                <DashboardLayout>
                  <FilingTracker />
                </DashboardLayout>
              </PrivateRoute>
            }
          />

          {/* New Routes */}
          <Route
            path="/generate-invoice"
            element={
              <PrivateRoute>
                <DashboardLayout>
                  <GenerateInvoice />
                </DashboardLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/time-tracking"
            element={
              <PrivateRoute>
                <DashboardLayout>
                  <TimeTracking />
                </DashboardLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/UserManagement"
            element={
              <PrivateRoute>
                <DashboardLayout>
                  <UserManagement />
                </DashboardLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/TaskManagement"
            element={
              <PrivateRoute>
                <DashboardLayout>
                  <TaskManagement />
                </DashboardLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/ReportsAnalytics"
            element={
              <PrivateRoute>
                <DashboardLayout>
                  <ReportsAnalytics />
                </DashboardLayout>
              </PrivateRoute>
            }
          />
           <Route
            path="/FirmSettings/*"
            element={
              <PrivateRoute>
                <DashboardLayout>
                  <FirmSettings />
                </DashboardLayout>
              </PrivateRoute>
            }
          />
            <Route
            path="/Authentication/*"
            element={
              <PrivateRoute>
                <DashboardLayout  hideTopBar={true} >
                  <Authentication />
                </DashboardLayout>
              </PrivateRoute>
            }
          />
           <Route
            path="/live-tasks"
            element={
              <PrivateRoute>
                <DashboardLayout  hideTopBar={true} >
                  <LiveTasksPage/>
                </DashboardLayout>
              </PrivateRoute>
            }
          />
           <Route
            path="/live-tasks_staff"
            element={
              <PrivateRoute>
                <DashboardLayout  hideTopBar={true} >
                  <LiveTasksPageStaff/>
                </DashboardLayout>
              </PrivateRoute>
            }
          />
           <Route
            path="/due-today"
            element={
              <PrivateRoute>
                <DashboardLayout  hideTopBar={true} >
                  <DueTodayPage/>
                </DashboardLayout>
              </PrivateRoute>
            }
          />
            <Route
            path="/due-today_staff"
            element={
              <PrivateRoute>
                <DashboardLayout  hideTopBar={true} >
                  <DueTodayPageStaff/>
                </DashboardLayout>
              </PrivateRoute>
            }
          />
            <Route
            path="/candidates"
            element={
              <PrivateRoute>
                <DashboardLayout  hideTopBar={true} >
                  <CandidatesPage/>
                </DashboardLayout>
              </PrivateRoute>
            }
          />

            <Route
            path="/candidates_staff"
            element={
              <PrivateRoute>
                <DashboardLayout  hideTopBar={true} >
                  <CandidatesPageStaff/>
                </DashboardLayout>
              </PrivateRoute>
            }
          />
            <Route
            path="/revenue"
            element={
              <PrivateRoute>
                <DashboardLayout  hideTopBar={true} >
                  <RevenuePage/>
                </DashboardLayout>
              </PrivateRoute>
            }
          />
            <Route
            path="/revenue_staff"
            element={
              <PrivateRoute>
                <DashboardLayout  hideTopBar={true} >
                  <RevenuePageStaff/>
                </DashboardLayout>
              </PrivateRoute>
            }
          />
            <Route
            path="/new-clients"
            element={
              <PrivateRoute>
                <DashboardLayout  hideTopBar={true} >
                  <NewClientsPage/>
                </DashboardLayout>
              </PrivateRoute>
            }
          />
           <Route
            path="/new-clients_staff"
            element={
              <PrivateRoute>
                <DashboardLayout  hideTopBar={true} >
                  <NewClientsPageStaff/>
                </DashboardLayout>
              </PrivateRoute>
            }
          />
            <Route
            path="/pending-invoices"
            element={
              <PrivateRoute>
                <DashboardLayout  hideTopBar={true} >
                  <PendingInvoicesPage/>
                </DashboardLayout>
              </PrivateRoute>
            }
          />
             <Route
            path="/pending-invoices_staff"
            element={
              <PrivateRoute>
                <DashboardLayout  hideTopBar={true} >
                  <PendingInvoicesPageStaff/>
                </DashboardLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/support-tickets"
            element={
              <PrivateRoute>
                <DashboardLayout  hideTopBar={true} >
                  <SupportTicketsPage/>
                </DashboardLayout>
              </PrivateRoute>
            }
          />
           <Route
            path="/support-tickets_staff"
            element={
              <PrivateRoute>
                <DashboardLayout  hideTopBar={true} >
                  <SupportTicketsPageStaff/>
                </DashboardLayout>
              </PrivateRoute>
            }
          />
           <Route
            path="/activity-log"
            element={
              <PrivateRoute>
                <DashboardLayout  hideTopBar={true} >
                  <ViewActivityLogPage/>
                </DashboardLayout>
              </PrivateRoute>
            }
          />
           <Route
            path="/activity-log_staff"
            element={
              <PrivateRoute>
                <DashboardLayout  hideTopBar={true} >
                  <ViewActivityLogPageStaff/>
                </DashboardLayout>
              </PrivateRoute>
            }
          />
           <Route
            path="/all-deadlines"
            element={
              <PrivateRoute>
                <DashboardLayout  hideTopBar={true} >
                  <AllDeadlinesPage/>
                </DashboardLayout>
              </PrivateRoute>
            }
          />

            <Route
            path="/all-deadlines_staff"
            element={
              <PrivateRoute>
                <DashboardLayout  hideTopBar={true} >
                  <AllDeadlinesPageStaff/>
                </DashboardLayout>
              </PrivateRoute>
            }
          />

          {/* staff dashbord */}

            <Route
            path="/StaffDashbord"
            element={
              <PrivateRoute>
                <DashboardLayout  hideTopBar={true} >
                  {/* <Staffdashbord/> */}
                </DashboardLayout>
              </PrivateRoute>
            }
          />
 {/* Staff login */}
        <Route path="/staff_intern/login" element={ <PrivateRoute>
              
                  <StaffLogin />
              </PrivateRoute>} />
       <Route 
          path="/staff/dashboard" 
          element={
            <DashboardLayout>
              <DeadlineDashboard />
            </DashboardLayout>
          } 
        />
        {/* Intern login */}
        <Route path="/intern/login" element={<PrivateRoute>
            
                  <InternLogin />
               
              </PrivateRoute>} />
        <Route path="/intern/dashboard" element={<PrivateRoute>
                <DashboardLayout>
                  <DeadlineDashboard />
                </DashboardLayout>
              </PrivateRoute>} />
        </Routes>
      </Router>
    </SettingsProvider>
    </NotificationProvider>
  );
}




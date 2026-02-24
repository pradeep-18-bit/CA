// import React from "react";
// import '../Global.css'; // Only import global CSS here

// import BackButton from "../NOTIFICATIONS/COMPONENTS/BackButton";
// import PageHeader from "../NOTIFICATIONS/COMPONENTS/PageHeader";
// import NotificationCard from "../NOTIFICATIONS/COMPONENTS/NotificationCard";
// import NotificationPreferences from "../NOTIFICATIONS/COMPONENTS/NotificationPreferences";

// export default function Notifications() {

//   const notifications = [
//     { icon: "🧾", title: "Tax Declaration", text: "The tax declaration period is now open. Please submit your tax forms before the deadline to avoid penalties.", time: "Just now" },
//     { icon: "⚠", title: "Tax Filing Alert", text: "Reminder: Tax filing for this financial year is due soon. Make sure all documents are prepared and submitted on time.", time: "30 mins ago" },
//     { icon: "📢", title: "System Update", text: "A new version of the dashboard has been released. Please refresh your browser to get the latest updates.", time: "2 hours ago" },
//     { icon: "✅", title: "Task Completed", text: "Your team has successfully completed 15 tasks this week. Great job!", time: "1 day ago" },
//     { icon: "⚠", title: "Deadline Reminder", text: "Project Alpha has a deadline approaching in 3 days. Please ensure all tasks are on track.", time: "3 days ago" },
//   ];

//   return (
//     <div className="page-container">
//       <BackButton to="/DeadlineDashboard" />
//       <PageHeader 
//         title="Notifications" 
//         subtitle="Stay updated with the latest alerts, reminders, and updates." 
//       />

//       <div className="content-grid">
//         <section className="info-section">
//           <h2 className="section-title">Recent Updates</h2>
//           {notifications.map((n, idx) => (
//             <NotificationCard 
//               key={idx} 
//               icon={n.icon} 
//               title={n.title} 
//               text={n.text} 
//               time={n.time} 
//             />
//           ))}
//         </section>

//         <NotificationPreferences />
//       </div>
//     </div>
//   );
// }





import React, { useEffect } from "react";
import "../Global.css";

import BackButton from "./COMPONENTS/BackButton";
import PageHeader from "./COMPONENTS/PageHeader";
import NotificationCard from "./COMPONENTS/NotificationCard";
import NotificationPreferences from "./COMPONENTS/NotificationPreferences";

import { useNotifications } from "./COMPONENTS/NotificationContext"; 
import { useNavigate } from "react-router-dom";

export default function Notifications() {
  const { notifications, markAllRead } = useNotifications();
  const navigate = useNavigate();

  useEffect(() => {
    markAllRead(); // clear bell count
  }, []);

  const handleClick = (n) => {
    if (n.taskId) {
      navigate("/TaskManagement", {
        state: { taskId: n.taskId },
      });
    }
  };

  return (
    <div className="page-container">
      <BackButton to="/DeadlineDashboard" />

      <PageHeader
        title="Notifications"
        subtitle="Stay updated with task assignments and updates."
      />

      <div className="content-grid">
        <section className="info-section">
          <h2 className="section-title">Recent Updates</h2>

          {notifications.length === 0 && (
            <p style={{ opacity: 0.6 }}>No notifications yet</p>
          )}

          {notifications.map((n, idx) => (
            <div
              key={idx}
              style={{ cursor: "pointer" }}
              onClick={() => handleClick(n)}
            >
              <NotificationCard
                icon="🔔"
                title="Task Update"
                text={n.message || n.text}
                time={n.time || "Just now"}
              />
            </div>
          ))}
        </section>

        <NotificationPreferences />
      </div>
    </div>
  );
}


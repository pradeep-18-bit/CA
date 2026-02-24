import React from "react";

const NotificationPreferences = () => {
  const handleSubmit = (e) => e.preventDefault();

  return (
    <section className="form-section">
      <h2 className="section-title">Notification Preferences</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="label">
            <input type="checkbox" defaultChecked /> Email Alerts
          </label>
        </div>
        <div className="form-group">
          <label className="label">
            <input type="checkbox" defaultChecked /> Task Reminders
          </label>
        </div>
        <div className="form-group">
          <label className="label">
            <input type="checkbox" /> System Announcements
          </label>
        </div>
        <div className="form-group">
          <label className="label">
            <input type="checkbox" /> Marketing & Promotions
          </label>
        </div>
        <button className="button" type="submit">Save Preferences</button>
      </form>
    </section>
  );
};

export default NotificationPreferences;

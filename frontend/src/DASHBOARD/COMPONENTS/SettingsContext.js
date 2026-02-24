// SettingsContext.js
import React, { createContext, useContext } from "react";

const SettingsContext = createContext();

export function SettingsProvider({ children }) {
  // provide defaults you can override later
  const settings = {
    dashboardTitle: "CA DASHBOARD",
    sidebarColor: "#073d7f",
    topbarColor: "#ffffff",
    userName: "user",
    userEmail: "user@example.com",
    avatarUrl: "https://i.pravatar.cc/150?img=32",
    metricLabels: {
      projects: "Live Tasks",
      tasks: "Companies",
      completed: "Candidates",
    },
    cardColor: "#fff",
  };

  const metrics = {
    projects: 120,
    tasks: 45,
    completed: 250,
  };

  return (
    <SettingsContext.Provider value={{ settings, metrics }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}

import React from 'react';

const TabButtons = ({ selectedTab, setSelectedTab }) => {
  const tabs = [
    { id: 'timer', label: 'Start Timer' },
    { id: 'entries', label: 'Time Entries' },
    { id: 'reports', label: 'Time Reports' }
  ];

  return (
    <div className="tt-tabs">
      {tabs.map(tab => (
        <button
          key={tab.id}
          className={`tt-tab-button ${selectedTab === tab.id ? 'tt-tab-active' : ''}`}
          onClick={() => setSelectedTab(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default TabButtons;

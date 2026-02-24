
 
  
import React from "react";
 
const Toggle = ({ checked, onChange }) => (
  <div
    className={`toggle-track${checked ? " checked" : ""}`}
    onClick={() => onChange(!checked)}
  >
    <div className={`toggle-knob${checked ? " checked" : ""}`} />
  </div>
);
 
export default Toggle;
 
 
import React, { useEffect } from "react";
import "../COMPONENTS/general.css";
 
export default function Toast({ message, type = "info", onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => onClose(), 3000);
    return () => clearTimeout(timer);
  }, [onClose]);
 
  return <div className={`toast ${type}`}>{message}</div>;
}
 
 
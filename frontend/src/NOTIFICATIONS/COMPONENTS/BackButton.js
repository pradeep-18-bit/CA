import React from "react";
import { useNavigate } from "react-router-dom";

const BackButton = ({ to }) => {
  const navigate = useNavigate();
  return (
    <button onClick={() => navigate(to)} className="back-button">
      ⬅ Back to Dashboard
    </button>
  );
};

export default BackButton;

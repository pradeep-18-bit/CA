import React from "react";

const PageHeader = ({ title, subtitle }) => {
  return (
    <>
      <h1 className="page-title">{title}</h1>
      <p className="page-subtitle">{subtitle}</p>
    </>
  );
};

export default PageHeader;

// src/components/Meta/CustomHelmet.jsx
import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";

const CustomHelmet = ({ title }) => {
  useEffect(() => {
    document.title = `ZenithFit | ${title}`;
  }, [title]);

  return (
    <Helmet>
      <title>{`ZenithFit | ${title}`}</title>
    </Helmet>
  );
};

export default CustomHelmet;

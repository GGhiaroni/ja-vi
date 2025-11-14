import React from "react";
import { Link } from "react-router-dom";

const Logomarca: React.FC = () => {
  return (
    <Link to="/" className="text-(--color-ja-vi-secondary) text-2xl font-bold">
      ¿já vi?
    </Link>
  );
};

export default Logomarca;

import React from "react";
import Logomarca from "./Logomarca";

const Footer: React.FC = () => {
  return (
    <footer className="py-4 mt-auto">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-sm">
        <div className="flex items-center space-x-2 md:space-x-12">
          <Logomarca />
          <p>© desenvolvido por Gabriel Ghiaroni</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

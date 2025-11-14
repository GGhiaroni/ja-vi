import React from "react";
import Logomarca from "./Logomarca";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-gray-400 py-4 mt-auto">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-sm">
        <p className="mb-2 md:mb-0">Dados de filmes e séries fornecidos por:</p>
        <div className="flex items-center space-x-2">
          <Logomarca />
          <p>The Movie Database</p>
        </div>
        <p className="mt-2 md:mt-0">© {new Date().getFullYear()} Já Vi</p>
      </div>
    </footer>
  );
};

export default Footer;

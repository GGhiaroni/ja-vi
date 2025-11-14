import { Send } from "lucide-react";
import React from "react";
import Logomarca from "./Logomarca";

const Footer: React.FC = () => {
  const urlLinkedin = "https://www.linkedin.com/in/gabrieltiziano/";
  return (
    <footer className="bg-[#1c4100] bottom-0 py-4 mt-auto z-12 shadow-lg">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-sm">
        <div className="flex items-center space-x-2 md:space-x-12">
          <Logomarca />
          <p className="text-(--color-ja-vi-secondary)">
            © desenvolvido por Gabriel Ghiaroni
          </p>
        </div>
        <a
          href={urlLinkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex gap-4 text-(--color-ja-vi-secondary)"
        >
          <Send />
          fale comigo
        </a>
      </div>
    </footer>
  );
};

export default Footer;

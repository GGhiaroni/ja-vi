import React from "react";
import { Link } from "react-router-dom";
import { useMinhaListaStore } from "../store/useMinhaListaStore";

const Navbar: React.FC = () => {
  const contagemItens = useMinhaListaStore((state) => state.count());

  return (
    <header className="bg-(--color-ja-vi-primary) shadow-lg sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link
          to="/"
          className="text-(--color-ja-vi-secondary) text-2xl font-bold"
        >
          ¿já vi?
        </Link>

        <nav className="flex items-center space-x-6">
          <Link
            to="/"
            className="text-(--color-ja-vi-secondary) text-base transition-colors duration-200"
          >
            Início
          </Link>

          <Link
            to="/minhalista"
            className="text-(--color-ja-vi-secondary) text-base relative transition-colors duration-200"
          >
            Minha Lista
            {contagemItens > 0 && (
              <span className="bg-(--color-ja-vi-secondary) text-(--color-ja-vi-primary) absolute -top-3 -right-5 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {contagemItens}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;

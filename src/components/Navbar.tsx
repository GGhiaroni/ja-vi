import React from "react";
import { Link } from "react-router-dom";
import { useMinhaListaStore } from "../store/useMinhaListaStore";
import { BarraDePesquisa } from "./BarraDePesquisa";
import Logomarca from "./Logomarca";

const Navbar: React.FC = () => {
  const contagemItens = useMinhaListaStore((state) => state.count());

  return (
    <header className="bg-(--color-ja-vi-primary) shadow-lg sticky top-0 z-10 w-full">
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex justify-between items-center w-full md:w-auto">
          <Logomarca />
          <nav className="flex items-center space-x-6 md:ml-10">
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
        <div className="wfull md:w-auto">
          <BarraDePesquisa />
        </div>
      </div>
    </header>
  );
};

export default Navbar;

import { Filter } from "lucide-react";
import React from "react";

type FiltroTipos = "todos" | "filmes" | "series";

interface FiltroProps {
  filtroSimples: FiltroTipos;
  setFiltroSimples: (filtro: FiltroTipos) => void;
  onAbrirModal: () => void;
}

const Filtro: React.FC<FiltroProps> = ({
  filtroSimples,
  setFiltroSimples,
  onAbrirModal,
}) => {
  const classesBotao = (filtro: FiltroTipos) => {
    return `px-4 py-2 rounded-lg transition-colors font-semibold cursor-pointer hover: cursor-pointer ${
      filtroSimples === filtro
        ? "bg-(--color-ja-vi-secondary) text-(--color-ja-vi-primary) shadow-md"
        : "text-gray-300 hover:bg-(--color-ja-vi-secondary) hover:text-(--color-ja-vi-primary)"
    }`;
  };
  return (
    <div className="flex mb-8 items-center gap-4">
      <div className="flex gap-4">
        <button
          onClick={() => setFiltroSimples("series")}
          className={classesBotao("series")}
        >
          Séries
        </button>
        <button
          onClick={() => setFiltroSimples("filmes")}
          className={classesBotao("filmes")}
        >
          Filmes
        </button>
        <button
          onClick={() => setFiltroSimples("todos")}
          className={classesBotao("todos")}
        >
          Todos
        </button>
      </div>
      <div
        onClick={onAbrirModal}
        className="hover:cursor-pointer flex gap-4 bg-(--color-ja-vi-secondary) text-(--color-ja-vi-primary) font-semibold rounded-lg px-4 py-2"
      >
        <Filter className="w-5 h-5" />
        Filtro personalizado
      </div>
    </div>
  );
};

export default Filtro;

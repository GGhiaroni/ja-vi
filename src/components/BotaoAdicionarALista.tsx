import type React from "react";
import { useMinhaListaStore } from "../store/useMinhaListaStore";

interface BotaoProps {
  mediaId: number;
}

const BotaoAdicionarALista: React.FC<BotaoProps> = ({ mediaId }) => {
  const { estaAdicionado, toggleItem } = useMinhaListaStore();

  const handleToggleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleItem(mediaId);
  };

  const itemNaLista = estaAdicionado(mediaId);

  const textoBotao = itemNaLista ? "╳ Remover" : "+ Lista";

  const classesBotao = itemNaLista
    ? "bg-red-600 hover:bg-red-700 text-white text-white"
    : "bg-[var(--color-ja-vi-secondary)] hover:bg-[#8ade5f] text-[var(--color-ja-vi-primary)]";

  return (
    <button
      onClick={handleToggleClick}
      className={`${classesBotao} text-sm py-1 px-3 rounded
                    transition-colors duration-200
                    cursor-pointer`}
    >
      {textoBotao}
    </button>
  );
};

export default BotaoAdicionarALista;

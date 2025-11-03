import React from "react";
import { IMAGE_BASE_URL } from "../api/config";
import { useMinhaListaStore } from "../store/useMinhaListaStore";
import type { MediaItem } from "../types/media";

interface MediaCardProps {
  item: MediaItem;
}

const MediaCard: React.FC<MediaCardProps> = ({ item }) => {
  const { toggleItem, estaAdicionado } = useMinhaListaStore();

  const itemEstaNaLista = estaAdicionado(item.id);

  const textoBotao = itemEstaNaLista ? "✔ Na Lista" : "+ Lista";

  const buttonClasses = itemEstaNaLista
    ? "bg-red-600 hover:bg-red-700 text-white"
    : "bg-[var(--color-ja-vi-secondary)] hover:bg-[#8ade5f] text-[var(--color-ja-vi-primary)]";

  const titulo = item.title ?? item.name ?? "Título desconhecido";

  const imagemUrl = item.poster_path
    ? `${IMAGE_BASE_URL}${item.poster_path}`
    : "placeholder.jpg";
  const anoLancamento =
    item.release_date?.substring(0, 4) ??
    item.first_air_date?.substring(0, 4) ??
    "N/A";

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-shadow duration-300 hover:shadow-xl">
      <img
        src={imagemUrl}
        alt={`Pôster de ${titulo}`}
        className="w-full h-80 object-cover"
      />
      <div className="p-4">
        <h3 className="font-bold text-lg mb-1 truncate">{titulo}</h3>
        <p className="text-gray-600 text-sm mb-2">{anoLancamento}</p>
        <button
          onClick={() => toggleItem(item.id)}
          className={`${buttonClasses}
                    text-sm py-1 px-3 rounded
                    transition-colors duration-200
                    cursor-pointer
                    `}
        >
          {textoBotao}
        </button>
      </div>
    </div>
  );
};

export default MediaCard;

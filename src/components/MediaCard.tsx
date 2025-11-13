import React from "react";
import { Link } from "react-router-dom";
import { IMAGE_BASE_URL } from "../api/config";
import type { MediaItem } from "../types/media";
import { padronizarTitulo } from "../utils/padronizarTitulo";
import BotaoAdicionarALista from "./BotaoAdicionarALista";

interface MediaCardProps {
  item: MediaItem;
}

const MediaCard: React.FC<MediaCardProps> = ({ item }) => {
  const titulo = item.title ?? item.name ?? "Título desconhecido";

  const tituloPadronizado = padronizarTitulo(titulo);

  const imagemUrl = item.poster_path
    ? `${IMAGE_BASE_URL}${item.poster_path}`
    : "placeholder.jpg";

  const anoLancamento =
    item.release_date?.substring(0, 4) ??
    item.first_air_date?.substring(0, 4) ??
    "N/A";

  return (
    <Link
      to={`/media/${item.media_type}/${item.id}/${tituloPadronizado}`}
      className="block bg-white rounded-lg shadow-lg overflow-hidden transition-shadow duration-300 hover:shadow-xl"
    >
      <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-shadow duration-300 hover:shadow-xl">
        <img
          src={imagemUrl}
          alt={`Pôster de ${titulo}`}
          className="w-full h-80 object-cover"
        />
        <div className="p-4">
          <h3 className="font-bold text-lg mb-1 truncate">{titulo}</h3>
          <p className="text-gray-600 text-sm mb-2">{anoLancamento}</p>
          <BotaoAdicionarALista mediaId={item.id} />
        </div>
      </div>
    </Link>
  );
};

export default MediaCard;

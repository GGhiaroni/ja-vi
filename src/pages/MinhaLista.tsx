import React from "react";
import MediaCard from "../components/MediaCard";
import { useMediaStore } from "../store/useMediaStore";
import { useMinhaListaStore } from "../store/useMinhaListaStore";
const MinhaLista: React.FC = () => {
  const listaIDs = useMinhaListaStore((state) => state.lista);

  const mediaListCache = useMediaStore((state) => state.mediaList);

  const minhaListaItems = mediaListCache.filter((item) => listaIDs[item.id]);

  if (minhaListaItems.length === 0) {
    return (
      <div className="container mx-auto p-8 text-center">
        <h1
          className={`text-3xl font-bold mb-4 text-(--color-ja-vi-secondary)`}
        >
          Sua lista está vazia 🤷‍♀️
        </h1>
        <p className="text-white">
          Adicione filmes ou séries na página inicial para vê-los aqui.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className={`text-3xl font-bold mb-6 text-(--color-ja-vi-secondary)`}>
        Minha Lista: ({minhaListaItems.length} itens)
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {minhaListaItems.map((item) => (
          <MediaCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};
export default MinhaLista;

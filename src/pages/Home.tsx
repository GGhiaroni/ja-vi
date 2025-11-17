import React, { useEffect, useState } from "react";
import { getDescobrirMediasURL, TRENDING_URL } from "../api/config";
import ErrorMessage from "../components/ErrorMessage";
import Filtro from "../components/Filtro";
import LoadingSpinner from "../components/LoadingSpinner";
import MediaCard from "../components/MediaCard";
import ModalFiltro from "../components/ModalFiltro";
import { useFetch } from "../hooks/useFetch";
import { useMediaStore } from "../store/useMediaStore";
import type { MediaResponse } from "../types/media";
type FiltroTipos = "todos" | "filmes" | "series";

interface FiltrosPersonalizados {
  generos: number[];
  providers: number[];
}

const Home: React.FC = () => {
  const [filtroSimples, setFiltroSimples] = useState<FiltroTipos>("todos");

  const [filtrosPersonalizados, setFiltrosPersonalizados] =
    useState<FiltrosPersonalizados>({ generos: [], providers: [] });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [apiUrl, setApiUrl] = useState(TRENDING_URL);

  const { data, loading, error } = useFetch<MediaResponse>(apiUrl);

  const setMediaList = useMediaStore((state) => state.setMediaList);

  useEffect(() => {
    if (data && data.results) {
      setMediaList(data.results);
    }
  }, [data, setMediaList]);

  useEffect(() => {
    const filtroPersonalizadoEstaAtivado =
      filtrosPersonalizados.generos.length > 0 ||
      filtrosPersonalizados.providers.length > 0;

    if (!filtroPersonalizadoEstaAtivado) {
      setApiUrl(TRENDING_URL);
    } else {
      let mediaType: "movie" | "tv" = "movie";

      if (filtroSimples === "series") {
        mediaType = "tv";
      }
      if (filtroSimples === "todos") {
        mediaType = "movie";
      }

      const novaUrl = getDescobrirMediasURL(mediaType, filtrosPersonalizados);

      setApiUrl(novaUrl);
    }
  }, [filtroSimples, filtrosPersonalizados]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  const listFinal = (data?.results ?? []).filter((item) => {
    if (!apiUrl.includes("/discover")) {
      if (filtroSimples === "filmes") return item.media_type === "movie";
      if (filtroSimples === "series") return item.media_type === "tv";
    }
    return true;
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-(--color-ja-vi-secondary)">
        Em alta hoje 🔥
      </h1>

      <Filtro
        filtroSimples={filtroSimples}
        setFiltroSimples={setFiltroSimples}
        onAbrirModal={() => setIsModalOpen(true)}
      />

      <ModalFiltro
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onApply={setFiltrosPersonalizados}
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {listFinal
          .filter((item) => item.poster_path)
          .map((item) => (
            <MediaCard key={item.id} item={item} />
          ))}
      </div>
    </div>
  );
};

export default Home;

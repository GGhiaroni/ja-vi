import React, { useEffect, useState } from "react";
import { TRENDING_URL } from "../api/config";
import ErrorMessage from "../components/ErrorMessage";
import Filtro from "../components/Filtro";
import LoadingSpinner from "../components/LoadingSpinner";
import MediaCard from "../components/MediaCard";
import { useFetch } from "../hooks/useFetch";
import { useMediaStore } from "../store/useMediaStore";
import type { MediaItem, MediaResponse } from "../types/media";
type FiltroTipos = "todos" | "filmes" | "series";

const Home: React.FC = () => {
  const [filtroAtivo, setFiltroAtivo] = useState<FiltroTipos>("todos");

  const { data, loading, error } = useFetch<MediaResponse>(TRENDING_URL);

  const setMediaList = useMediaStore((state) => state.setMediaList);

  useEffect(() => {
    if (data && data.results) {
      setMediaList(data.results);
    }
  }, [data, setMediaList]);

  const listaFiltradaPorTipoDeMidia: MediaItem[] =
    data?.results?.filter((item: MediaItem) => {
      if (filtroAtivo === "todos") {
        return true;
      }

      if (filtroAtivo === "filmes") {
        return item.media_type === "movie";
      }

      if (filtroAtivo === "series") {
        return item.media_type === "tv";
      }

      return true;
    }) ?? [];

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="container mx-auto-p-4">
      <h1 className="text-3xl font-bold mb-6 text-(--color-ja-vi-secondary)">
        Em alta hoje 🔥
      </h1>

      <Filtro filtroAtivo={filtroAtivo} setFiltroAtivo={setFiltroAtivo} />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {listaFiltradaPorTipoDeMidia
          .filter((item) => item.poster_path)
          .map((item) => (
            <MediaCard key={item.id} item={item} />
          ))}
      </div>
    </div>
  );
};

export default Home;

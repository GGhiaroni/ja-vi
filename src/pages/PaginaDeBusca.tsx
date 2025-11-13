import React, { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { getSearchURL } from "../api/config";
import ErrorMessage from "../components/ErrorMessage";
import LoadingSpinner from "../components/LoadingSpinner";
import MediaCard from "../components/MediaCard";
import { useFetch } from "../hooks/useFetch";
import { useMediaStore } from "../store/useMediaStore";
import type { MediaResponse } from "../types/media";

const PaginaDeBusca: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  const urlDeBusca = useMemo(() => {
    return query ? getSearchURL(query) : null;
  }, [query]);

  const { data, loading, error } = useFetch<MediaResponse>(urlDeBusca);

  const setMediaList = useMediaStore((state) => state.setMediaList);

  useEffect(() => {
    if (data && data.results) {
      const midiaValida = data.results.filter(
        (item) =>
          (item.media_type === "movie" || item.media_type === "tv") &&
          item.poster_path
      );
      setMediaList(midiaValida);
    }
  }, [data, setMediaList]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  const mediaList =
    data?.results.filter(
      (item) =>
        (item.media_type === "movie" || item.media_type === "tv") &&
        item.poster_path
    ) ?? [];

  return (
    <div className="container mx-auto p-4">
      {query ? (
        <h1 className="text-3xl font-bold mb-6 text-(--color-ja-vi-secondary)">
          Resultados para: "{query}"
        </h1>
      ) : (
        <h1 className="text-3xl font-bold mb-6 text-(--color-ja-vi-secondary)">
          Por favor, digite um termo de busca.
        </h1>
      )}

      {mediaList.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {mediaList.map((item) => (
            <MediaCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        !loading &&
        query && (
          <p className="text-white text-center">
            Nenhum resultado encontrado para "{query}".
          </p>
        )
      )}
    </div>
  );
};

export default PaginaDeBusca;

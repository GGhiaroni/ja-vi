import React from "react";
import { TRENDING_URL } from "../api/config";
import ErrorMessage from "../components/ErrorMessage";
import LoadingSpinner from "../components/LoadingSpinner";
import MediaCard from "../components/MediaCard";
import { useFetch } from "../hooks/useFetch";
import type { MediaResponse } from "../types/media";

const Home: React.FC = () => {
  const { data, loading, error } = useFetch<MediaResponse>(TRENDING_URL);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  const mediaList = data?.results ?? [];

  return (
    <div className="container mx-auto-p-4">
      <h1 className="text-3xl font-bold mb-6">Em alta hoje 🔥</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {mediaList
          .filter((item) => item.poster_path)
          .map((item) => (
            <MediaCard
              key={item.id}
              item={item}
              onToggleAdicionarALista={(id) =>
                console.log(`Adicionando item ${id} à lista.`)
              }
            />
          ))}
      </div>
    </div>
  );
};

export default Home;

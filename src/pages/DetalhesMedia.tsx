import React from "react";
import { useParams } from "react-router-dom";
import {
  getMediaDetailsURL,
  getOndeAssistirStreamingURL,
  IMAGE_BASE_URL,
} from "../api/config";
import BotaoAdicionarALista from "../components/BotaoAdicionarALista";
import ErrorMessage from "../components/ErrorMessage";
import LoadingSpinner from "../components/LoadingSpinner";
import { useFetch } from "../hooks/useFetch";
import { useMediaStore } from "../store/useMediaStore";
import type { MediaItem } from "../types/media";

interface StreamingData {
  results: {
    BR?: {
      flatrate?: Array<{
        logo_path: string;
        provider_name: string;
        provider_id: number;
      }>;
    };
  };
}

const DetalhesMedia: React.FC = () => {
  const { media_type, id } = useParams<{ media_type: string; id: string }>();

  const buscaIdNoCache = useMediaStore((state) =>
    state.mediaList.find(
      (item) => item.id === Number(id) && item.media_type == media_type
    )
  );

  const fetchUrlDetalhesMedia =
    media_type && id ? getMediaDetailsURL(media_type, id) : null;

  const { data, loading, error } = useFetch<MediaItem>(fetchUrlDetalhesMedia);

  const fetchUrlStreamings =
    media_type && id ? getOndeAssistirStreamingURL(media_type, id) : null;

  const { data: dataProviders, loading: loadingProviders } =
    useFetch<StreamingData>(fetchUrlStreamings);

  if (!media_type || !id) {
    return <ErrorMessage message="URL inválida." />;
  }

  const itemASerExibido = data ?? buscaIdNoCache;

  if ((loading || loadingProviders) && !itemASerExibido) {
    return <LoadingSpinner />;
  }

  if (error && !buscaIdNoCache) {
    return <ErrorMessage message={error} />;
  }

  if (!itemASerExibido) {
    return <ErrorMessage message="Item não encontrado." />;
  }

  const titulo = itemASerExibido.title ?? itemASerExibido.name;

  const imageUrl = itemASerExibido.poster_path
    ? `${IMAGE_BASE_URL}${itemASerExibido.poster_path}`
    : "placeholder.png";

  const listaDeStreamings = dataProviders?.results?.BR?.flatrate ?? [];

  const streamingsMap = new Map();

  listaDeStreamings.forEach((streaming) => {
    const chaveUnica = streaming.provider_name.toLowerCase().trim();

    if (!streamingsMap.has(chaveUnica)) {
      streamingsMap.set(chaveUnica, streaming);
    }
  });

  const streamingsComNomesDuplicados = Array.from(streamingsMap.values());

  const streamingsUnicos = streamingsComNomesDuplicados.filter(
    (streamingAtual) => {
      const nomeAtual = streamingAtual.provider_name.toLowerCase().trim();

      const existeNomeMaisCurto = streamingsComNomesDuplicados.some(
        (outroStreaming) => {
          const outroNome = outroStreaming.provider_name.toLowerCase().trim();

          return nomeAtual !== outroNome && nomeAtual.startsWith(outroNome);
        }
      );

      return !existeNomeMaisCurto;
    }
  );

  return (
    <div className="container mx-auto p-4 text-white">
      <div className="flex flex-col md:flex-row gap-8">
        <img
          src={imageUrl}
          alt={`Pôster de ${titulo}`}
          className="w-full md:w-1/3 rounded-lg shadow-lg"
        />
        <div className="md:w-2/3">
          <h1 className="text-4xl font-bold mb-4 text-(--color-ja-vi-secondary)">
            {titulo}
          </h1>

          <div className="flex items-center space-x-4 mb-4">
            <span className="text-2xl font-bold text-yellow-400">
              ★ {itemASerExibido.vote_average.toFixed(1)}
            </span>
            <span className="text-gray-400">
              ({media_type === "tv" ? "Série de TV" : "Filme"})
            </span>
          </div>

          <h2 className="text-2xl font-bold mb-2">Sinopse</h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            {itemASerExibido.overview}
          </p>

          {streamingsUnicos.length > 0 && (
            <div className="mt-4">
              <h2 className="text-2xl font-bold mb-4">Onde assistir?</h2>
              <div className="flex flex-wrap gap-4">
                {streamingsUnicos.map((provider) => (
                  <div
                    key={provider.provider_name}
                    className="flex flex-col items-center"
                  >
                    <img
                      src={`${IMAGE_BASE_URL}${provider.logo_path}`}
                      alt={provider.provider_name}
                      className="w-12 h-12 rounded-full shadow-lg"
                      title={provider.provider_name}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex mt-7">
            <BotaoAdicionarALista mediaId={Number(id)} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetalhesMedia;

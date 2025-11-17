import { Check, Filter, X } from "lucide-react";
import { useEffect, useState } from "react";
import { getGenerosURL } from "../api/config";
import { useFetch } from "../hooks/useFetch";
import LoadingSpinner from "./LoadingSpinner";

interface FiltrosPersonalizados {
  generos: number[];
  providers: number[];
}

interface ModalFiltroProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filtros: FiltrosPersonalizados) => void;
}

interface ItemLista {
  id: number;
  name: string;
  logo_path?: string;
}
interface GenerosResponse {
  genres?: ItemLista[];
}

const ModalFiltro: React.FC<ModalFiltroProps> = ({
  isOpen,
  onClose,
  onApply,
}) => {
  const [generosSelecionados, setGenerosSelecionados] = useState<number[]>([]);
  // Usado array vazio, pois o filtro de providers foi removido.
  const [providersSelecionados] = useState<number[]>([]);
  const [mediaType, setMediaType] = useState<"movie" | "tv">("movie");

  const { data: generosData, loading: generosLoading } =
    useFetch<GenerosResponse>(getGenerosURL(mediaType));

  useEffect(() => {
    if (!isOpen) {
      setGenerosSelecionados([]);
    }
  }, [isOpen]);

  useEffect(() => {
    setGenerosSelecionados([]);
  }, [mediaType]);

  const handleToggleSelection = (id: number) => {
    const currentList = generosSelecionados;
    const setState = setGenerosSelecionados;

    if (currentList.includes(id)) {
      setState(currentList.filter((itemId) => itemId !== id));
    } else {
      if (currentList.length < 5) {
        setState((prev) => [...prev, id]);
      }
    }
  };

  const handleApplyFilters = () => {
    onApply({
      generos: generosSelecionados,
      providers: providersSelecionados,
    });
    onClose();
  };

  if (!isOpen) return null;

  const listaDeGeneros = generosData?.genres ?? [];

  const isLoading = generosLoading;
  const limiteMaximo = 5;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4">
      <div className="bg-(--color-ja-vi-primary) text-gray-800 p-6 rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6 border-b border-b-(--color-ja-vi-secondary) pb-3">
          <h2 className="text-2xl font-bold flex gap-4 items-center text-(--color-ja-vi-secondary)">
            <Filter /> Filtro Personalizado
          </h2>
          <button
            className="text-gray-500 hover:text-(--color-ja-vi-secondary) transition-colors p-1 rounded-full hover:bg-gray-100"
            onClick={onClose}
          >
            <X size={24} />
          </button>
        </div>

        <div className="mb-6 flex space-x-4">
          <button
            onClick={() => setMediaType("movie")}
            className={`px-4 py-2 rounded-full hover:cursor-pointer font-semibold transition-colors ${
              mediaType === "movie"
                ? "bg-(--color-ja-vi-secondary) text-(--color-ja-vi-primary) shadow-md"
                : "bg-gray-200 text-gray-700 hover:bg-indigo-100"
            }`}
          >
            Filmes 🎬
          </button>
          <button
            onClick={() => setMediaType("tv")}
            className={`px-4 py-2 rounded-full hover:cursor-pointer font-semibold transition-colors ${
              mediaType === "tv"
                ? "bg-(--color-ja-vi-secondary) text-(--color-ja-vi-primary) shadow-md"
                : "bg-gray-200 text-gray-700 hover:bg-indigo-100"
            }`}
          >
            Séries 📺
          </button>
        </div>

        {isLoading && <LoadingSpinner />}

        {!isLoading && (
          <div className="space-y-8">
            <div>
              <h3 className="flex gap-1 items-center text-xl text-(--color-ja-vi-secondary) font-semibold mb-3 border-b-2 pb-1">
                Gêneros
                <p className="text-base text-gray-500 font-normal">
                  ({generosSelecionados.length}/{limiteMaximo} selecionados)
                </p>
              </h3>
              <div className="flex flex-wrap gap-2 font-semibold">
                {listaDeGeneros.map((genero) => {
                  const isSelected = generosSelecionados.includes(genero.id);
                  const isDisabled =
                    generosSelecionados.length >= limiteMaximo && !isSelected;
                  return (
                    <button
                      key={genero.id}
                      onClick={() => handleToggleSelection(genero.id)}
                      disabled={isDisabled}
                      className={`hover:cursor-pointer px-3 py-1 rounded-full text-sm transition-colors border ${
                        isSelected
                          ? "bg-(--color-ja-vi-secondary) text-(--color-ja-vi-primary) border-(--color-ja-vi-secondary)"
                          : isDisabled
                          ? "bg-gray-200 text-gray-400 border-gray-200 cursor-not-allowed"
                          : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
                      }`}
                    >
                      {genero.name}{" "}
                      {isSelected && (
                        <Check size={14} className="inline ml-1" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        <div className="pt-6 border-t border-t-(--color-ja-vi-secondary) mt-6 flex justify-end">
          <button
            onClick={handleApplyFilters}
            disabled={isLoading || generosSelecionados.length === 0}
            className={`hover:cursor-pointer px-6 py-2 rounded-lg font-bold transition-opacity ${
              generosSelecionados.length > 0
                ? "bg-(--color-ja-vi-secondary) text-(--color-ja-vi-primary) hover:opacity-90 shadow-md"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Aplicar Filtros
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalFiltro;

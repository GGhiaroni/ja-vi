import { create } from "zustand";

interface MinhaListaItem {
  mediaId: number;
  adicionadoEm: number;
}

interface EstadoMinhaLista {
  lista: Record<number, MinhaListaItem>;

  toggleItem: (mediaId: number) => void;
  estaAdicionado: (mediaId: number) => boolean;
  count: () => number;
}

export const useWatchlistStore = create<EstadoMinhaLista>((set, get) => ({
  lista: {},

  toggleItem: (mediaId: number) => {
    set((state) => {
      const novaLista = { ...state.lista };

      if (novaLista[mediaId]) {
        delete novaLista[mediaId];
      } else {
        novaLista[mediaId] = {
          mediaId,
          adicionadoEm: Date.now(),
        };
      }
      // Retorna o novo estado
      return { lista: novaLista };
    });
  },

  estaAdicionado: (mediaId: number) => {
    return !!get().lista[mediaId];
  },

  count: () => {
    return Object.keys(get().lista).length;
  },
}));

import { create } from "zustand";
import { persist } from "zustand/middleware";

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

export const useMinhaListaStore = create<EstadoMinhaLista>()(
  persist(
    (set, get) => ({
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
          return { lista: novaLista };
        });
      },

      estaAdicionado: (mediaId: number) => {
        return !!get().lista[mediaId];
      },

      count: () => {
        return Object.keys(get().lista).length;
      },
    }),
    {
      name: "ja-vi-localstorage",
    }
  )
);

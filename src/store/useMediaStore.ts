import { create } from "zustand";
import type { MediaItem } from "../types/media";

interface MediaStoreState {
  mediaList: MediaItem[];
  setMediaList: (lista: MediaItem[]) => void;
}

export const useMediaStore = create<MediaStoreState>((set) => ({
  mediaList: [],
  setMediaList: (lista) => {
    set({ mediaList: lista });
  },
}));

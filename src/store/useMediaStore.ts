import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { MediaItem } from "../types/media";

interface MediaStoreState {
  mediaList: MediaItem[];
  setMediaList: (lista: MediaItem[]) => void;
}

export const useMediaStore = create<MediaStoreState>()(
  persist(
    (set) => ({
      mediaList: [],
      setMediaList: (lista) => {
        set((state) => {
          const mediaMap = new Map(
            state.mediaList.map((item) => [item.id, item])
          );
          lista.forEach((item) => mediaMap.set(item.id, item));
          return { mediaList: Array.from(mediaMap.values()) };
        });
      },
    }),
    {
      name: "ja-vi-media-cache",
    }
  )
);

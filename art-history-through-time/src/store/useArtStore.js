import { create } from "zustand";

const useArtStore = create((set) => ({
  artworks: [],
  favorites: [],
  startYear: 1400,
  endYear: 1600,

  setArtworks: (artworks) => set({ artworks }),

  setTimeline: (startYear, endYear) =>
    set({ startYear, endYear }),

  addFavorite: (art) =>
    set((state) => ({
      favorites: [...state.favorites, art],
    })),

  removeFavorite: (id) =>
    set((state) => ({
      favorites: state.favorites.filter((a) => a.id !== id),
    })),
}));

export default useArtStore;

import { create } from "zustand";
import { searchArtworks, getArtwork } from "../services/museumApi";

export const useArtStore = create((set) => ({
  artworks: [],
  favorites: [],
  selectedArtwork: null,
  yearRange: [1400, 1800],

  setYearRange: (range) => set({ yearRange: range }),

  fetchArtworks: async () => {
    const ids = await searchArtworks("art");
    const data = await Promise.all(ids.map(id => getArtwork(id)));
    set({ artworks: data });
  },

  selectArtwork: (art) => set({ selectedArtwork: art }),

  addFavorite: (art) =>
    set((state) => ({
      favorites: [...state.favorites, art],
    })),
}));

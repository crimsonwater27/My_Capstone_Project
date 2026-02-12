import { create } from "zustand";
import { searchArtworks } from "../services/metMuseumApi";
import { parseYear } from "../utils/parseYear";

export const useArtStore = create((set, get) => ({
  artworks: [],
  filteredArtworks: [],
  favorites: [],
  selectedArtwork: null,
  yearRange: [1400, 1800],

  setYearRange: (range) => {
    set({ yearRange: range });
    get().applyFilters();
  },

  fetchArtworks: async (query = "painting") => {
    try {
      const data = await searchArtworks(query);

      set({
        artworks: data,
        filteredArtworks: data,
      });

      get().applyFilters();
    } catch (err) {
      console.error("Fetch artworks failed:", err);
    }
  },

  applyFilters: () => {
    const { artworks, yearRange } = get();

    const filtered = artworks.filter((art) => {
      const year = parseYear(art.date);
      if (!year) return false;

      return year >= yearRange[0] && year <= yearRange[1];
    });

    set({ filteredArtworks: filtered });
  },

  addFavorite: (art) =>
    set((state) => ({
      favorites: state.favorites.find((f) => f.id === art.id)
        ? state.favorites
        : [...state.favorites, art],
    })),

  removeFavorite: (id) =>
    set((state) => ({
      favorites: state.favorites.filter((f) => f.id !== id),
    })),

  setSelectedArtwork: (art) => set({ selectedArtwork: art }),
}));

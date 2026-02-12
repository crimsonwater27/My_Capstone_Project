import { create } from "zustand";
import { searchArtworks } from "../services/metMuseumApi";
import { parseYear } from "../utils/parseYear";

export const useArtStore = create((set, get) => ({
  artworks: [],
  filteredArtworks: [],
  favorites: [],
  selectedArtwork: null,
  yearRange: [1400, 2000],
  loading: false,

  setSelectedArtwork: (art) => set({ selectedArtwork: art }),

  setYearRange: (range) => {
    set({ yearRange: range });
    get().applyFilters();
  },

  fetchArtworks: async (query = "painting") => {
    set({ loading: true });

    const data = await searchArtworks(query);

    set({
      artworks: data,
      filteredArtworks: data,
      loading: false,
    });

    get().applyFilters();
  },

  applyFilters: () => {
    const { artworks, yearRange } = get();

    const filtered = artworks.filter((art) => {
      const year = parseYear(art.date);
      if (!year) return true;

      return year >= yearRange[0] && year <= yearRange[1];
    });

    set({ filteredArtworks: filtered });
  },

  addFavorite: (art) =>
    set((state) => ({
      favorites: [...state.favorites, art],
    })),
}));

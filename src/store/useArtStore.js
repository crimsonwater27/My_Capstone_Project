import { create } from "zustand";
import { searchArtworks } from "../services/metMuseumApi";
import { fetchWikiSummary } from "../services/wikiApi";
import { parseYear } from "../utils/parseYear";

export const useArtStore = create((set, get) => ({
  artworks: [],
  filteredArtworks: [],
  favorites: JSON.parse(localStorage.getItem("favorites")) || [],
  selectedArtwork: null,
  wikiData: null,

  loading: false,
  modalLoading: false,
  error: null,

  yearRange: [1400, 1800],

  setYearRange: (range) => {
    set({ yearRange: range });
    get().filterArtworks();
  },

  fetchArtworks: async (query = "painting") => {
    try {
      set({ loading: true, error: null });

      const ids = await searchArtworks(query);
      const limited = ids.slice(0, 30);

      const data = await Promise.all(
        limited.map((id) => searchArtworks(id))
      );

      const clean = data.filter(Boolean);

      set({ artworks: clean, loading: false });

      get().filterArtworks();
    } catch (err) {
      console.error(err);
      set({ error: "Failed to fetch artworks", loading: false });
    }
  },

  filterArtworks: () => {
    const { artworks, yearRange } = get();

    const filtered = artworks.filter((art) => {
      const year = parseYear(art?.objectDate);
      if (!year) return true;

      return year >= yearRange[0] && year <= yearRange[1];
    });

    set({ filteredArtworks: filtered });
  },

  selectArtwork: async (art) => {
    set({
      selectedArtwork: art,
      modalLoading: true,
      wikiData: null,
    });

    if (!art?.artistDisplayName) {
      set({ modalLoading: false });
      return;
    }

    try {
      const wiki = await fetchWikiSummary(art.artistDisplayName);

      set({
        wikiData: wiki,
        modalLoading: false,
      });
    } catch {
      set({ modalLoading: false });
    }
  },

  closeModal: () =>
    set({
      selectedArtwork: null,
      wikiData: null,
    }),

  addFavorite: (art) =>
    set((state) => {
      const updated = [...state.favorites, art];
      localStorage.setItem("favorites", JSON.stringify(updated));
      return { favorites: updated };
    }),

  removeFavorite: (id) =>
    set((state) => {
      const updated = state.favorites.filter(
        (art) => art.objectID !== id
      );
      localStorage.setItem("favorites", JSON.stringify(updated));
      return { favorites: updated };
    }),
}));

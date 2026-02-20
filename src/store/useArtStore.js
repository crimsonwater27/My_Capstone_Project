import { create } from "zustand";
import { searchArtworks, fetchArtworksSafe } from "../services/metMuseumApi";
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
  modalError: null,

  yearRange: [1400, 1800],

  setYearRange: (range) => {
    set({ yearRange: range });
    get().filterArtworks();
  },

fetchArtworks: async (query = "painting") => {
  try {
    set({ loading: true, error: null });

    const ids = await searchArtworks(query);

    if (!ids.length) {
      set({ artworks: [], loading: false });
      return;
    }

    const artworks = await fetchArtworksSafe(ids, 20);

    set({ artworks, loading: false });
    get().filterArtworks();
  } catch (err) {
    console.error("Fetch failed:", err);
    set({ error: "Failed to load artworks", loading: false });
  }
},

  filterArtworks: () => {
    const { artworks, yearRange } = get();

    const filtered = artworks.filter((art) => {
      const year = parseYear(art?.date);
      if (!year) return true;
      return year >= yearRange[0] && year <= yearRange[1];
    });

    set({ filteredArtworks: filtered });
  },

selectArtwork: async (art) => {
  const artistName = art?.artist?.trim();

  
  if (!artistName || artistName === "Unknown Artist") {
    set({
      selectedArtwork: art,
      wikiData: null,
      modalLoading: false,
      modalError: null,
    });
    return;
  }

  
  set({
    selectedArtwork: art,
    modalLoading: true,
    wikiData: null,
    modalError: null,
  });

  try {
    const wiki = await fetchWikiSummary(artistName);

    set({
      wikiData: wiki || null,
      modalLoading: false,
      modalError: wiki ? null : "No info found for this artist",
    });
  } catch (err) {
    console.warn("Wiki fetch failed:", artistName, err);
    set({
      modalError: "Failed to fetch artist info",
      modalLoading: false,
      wikiData: null,
    });
  }
},

toggleFavorite: (art) =>
  set((state) => {
    const exists = state.favorites.some(
      (item) => item.id === art.id
    );

    const updatedFavorites = exists
      ? state.favorites.filter((item) => item.id !== art.id)
      : [...state.favorites, art];

    localStorage.setItem(
      "favorites",
      JSON.stringify(updatedFavorites)
    );

    return { favorites: updatedFavorites };
  }),

  closeModal: () =>
    set({
      selectedArtwork: null,
      wikiData: null,
      modalError: null,
      modalLoading: false,
    }),

  addFavorite: (art) =>
    set((state) => {
      if (state.favorites.find((a) => a.id === art.id)) return state; // prevent duplicates
      const updated = [...state.favorites, art];
      localStorage.setItem("favorites", JSON.stringify(updated));
      return { favorites: updated };
    }),

  removeFavorite: (id) =>
    set((state) => {
      const updated = state.favorites.filter((art) => art.id !== id);
      localStorage.setItem("favorites", JSON.stringify(updated));
      return { favorites: updated };
    }),
}));

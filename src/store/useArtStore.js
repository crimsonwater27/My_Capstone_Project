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
  set({
    selectedArtwork: art,
    modalLoading: true,
    wikiData: null,
    modalError: null,
  });

  const artistName = art?.artist?.trim();

  if (!artistName || artistName === "Unknown Artist") {
    set({
      modalLoading: false,
      modalError: "No artist information available."
    });
    return;
  }

  try {
    const wiki = await fetchWikiSummary(artistName);

    if (!wiki) {
      throw new Error("No Wikipedia page found");
    }

    set({
      wikiData: wiki,
      modalLoading: false,
      modalError: null,
    });
  } catch (error) {
    set({ 
      modalLoading: false,
      wikiData: null, 
      modalError: error.message 
    });
  }
},


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

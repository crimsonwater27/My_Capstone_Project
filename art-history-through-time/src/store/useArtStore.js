import { create } from "zustand";
import { searchArtworks, getArtwork } from "../services/metMuseumApi";
import { getWikiSummary } from "../services/wikiApi";
import { parseYear } from "../utils/parseYear";

export const useArtStore = create((set, get) => ({
  artworks: [],
  filteredArtworks: [],
  favorites: [],
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

  fetchArtworks: async () => {
    try {
      set({ loading: true, error: null });

      const ids = await searchArtworks("painting");
      const limited = ids.slice(0, 30);

      const data = await Promise.all(limited.map(id => getArtwork(id)));

      set({
        artworks: data,
        filteredArtworks: data,
        loading: false,
      });
    } catch {
      set({ error: "Failed to fetch artworks", loading: false });
    }
  },

  filterArtworks: () => {
    const { artworks, yearRange } = get();

    const filtered = artworks.filter((art) => {
      const year = parseYear(art.ObjectDate);
      if (!year) return false;
      return year >= yearRange[0] && year <= yearRange[1];
    });

    set({ filteredArtworks: filtered });
  },

  selectArtwork: async (art) => {
    set({ selectedArtwork: art, modalLoading: true, wikiData: null });

    if (!art?.artistDisplayName) {
      set({ modalLoading: false });
      return;
    }

    const wiki = await getWikiSummary(art.artistDisplayName);

    set({
      wikiData: wiki,
      modalLoading: false,
    });
  },

  closeModal: () => set({ selectedArtwork: null, wikiData: null }),

removeFavorite: (id) => {
  const updated = get().favorites.filter((art) => art.objectID !== id);
  localStorage.setItem("favorites", JSON.stringify(updated));
  return set({ favorites: updated });
},

addFavorite: (art) =>
  set((state) => {
    const updated = [...state.favorites, art];
    localStorage.setItem("favorites", JSON.stringify(updated));
    return { favorites: updated };
  }),

}));

import { create } from "zustand";
import { searchArtworks, getArtwork } from "../services/metMuseumApi";
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
      if (!ids?.length) {
        set({ artworks: [], loading: false });
        return;
      }

      const limitedIds = ids.slice(0, 30);

      
      const data = await Promise.all(
        limitedIds.map(async (id) => {
          try {
            const art = await getArtwork(id);
            if (!art || !art.primaryImageSmall) return null;

            return {
              id: art.objectID,                // unique key
              title: art.title,
              artist: art.artistDisplayName || "Unknown",
              date: art.objectDate,
              image: art.primaryImageSmall,
            };
          } catch (err) {
            console.error(`Failed to fetch artwork ${id}:`, err);
            return null;
          }
        })
      );

      const cleanData = data.filter(Boolean);
      set({ artworks: cleanData, loading: false });

      get().filterArtworks();
    } catch (err) {
      console.error("Failed to fetch artworks:", err);
      set({ error: "Failed to fetch artworks", loading: false });
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
    });

    if (!art?.artist) {
      set({ modalLoading: false });
      return;
    }

    try {
      // 3️⃣ Clean artist name for Wikipedia
      const safeName = encodeURIComponent(art.artist.replace(/["']/g, ""));
      const wiki = await fetchWikiSummary(safeName);

      set({ wikiData: wiki, modalLoading: false });
    } catch {
      set({ modalLoading: false, wikiData: { extract: "No summary available." } });
    }
  },

  closeModal: () =>
    set({
      selectedArtwork: null,
      wikiData: null,
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

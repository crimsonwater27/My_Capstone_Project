import { create } from "zustand";
import { searchArtworks, fetchArtworksSafe } from "../services/metMuseumApi";
import { searchArtworksByDate } from "../services/metMuseumApi";
import { fetchWikiSummary } from "../services/wikiApi";
import { parseYear } from "../utils/parseYear";

export const useArtStore = create((set, get) => ({
  // Core State
  artworks: [],
  filteredArtworks: [],
  selectedArtwork: null,
  selectedEra: null,
  wikiData: null,
  favorites: [],
  user: JSON.parse(localStorage.getItem("user")) || null,

  loading: false,
  modalLoading: false,
  error: null,
  modalError: null,

  yearRange: [500, 2025],
  currentQuery: null,
  artworkCache: {},

  // Era Definitions
  eraQueryMap: {
    Medieval: "Medieval painting",
    Renaissance: "Renaissance painting",
    Baroque: "Baroque painting",
    Romanticism: "Romanticism painting",
    "Modern Art": "Modern art painting",
    Rococo: "Rococo painting",
    Realism: "Realist painting",
    Surrealism: "Surrealist painting",
    Contemporary: "Contemporary art painting",
  },

  eraYearMap: {
    Medieval: [500, 1450],
    Renaissance: [1300, 1600],
    Baroque: [1600, 1750],
    Rococo: [1690, 1785],          
    Romanticism: [1790, 1855],
    Realism: [1840, 1905],
    "Modern Art": [1860, 1975],
    Surrealism: [1900, 1960], 
    Contemporary: [1945, 2025],
  },

  // Set Year Range (Slider)
  setYearRange: (range) => {
    set({ yearRange: range });
    get().applyFilters();
  },

  // Fetch Artworks
  fetchArtworks: async (eraOrQuery = "painting") => {
    const { artworkCache, eraQueryMap, eraYearMap } = get();

    const isEra = eraQueryMap[eraOrQuery];
    const query = isEra ? eraQueryMap[eraOrQuery] : eraOrQuery;
    const eraRange = isEra ? eraYearMap[eraOrQuery] : [500, 2025];

    // If cached
    if (artworkCache[eraOrQuery]) {
      set({
        artworks: artworkCache[eraOrQuery],
        filteredArtworks: artworkCache[eraOrQuery],
        selectedEra: isEra ? eraOrQuery : null,
        yearRange: eraRange,
        loading: false,
        error: null,
      });
      get().applyFilters();
      return;
    }

    try {
      set({
        loading: true,
        error: null,
        selectedEra: isEra ? eraOrQuery : null,
        yearRange: eraRange,
      });

      let ids;
      if (isEra) {
        const [start, end] = eraRange;
        ids = await searchArtworksByDate(start, end);
      } else {
        ids = await searchArtworks(query);
      }
      
      console.log("IDs returned:", ids.length);

      const artworks = await fetchArtworksSafe(ids, 24);

      set((state) => ({
        artworks,
        filteredArtworks: artworks,
        artworkCache: {
          ...state.artworkCache,
          [eraOrQuery]: artworks,
        },
        loading: false,
      }));

      get().applyFilters();
    } catch (err) {
      console.error("Error fetching artworks:", err);
      set({ error: "Failed to fetch artworks.", loading: false });
    }
  },

  // Apply Filters (Era + Slider)
  applyFilters: () => {
    const { artworks, yearRange } = get();

    const filtered = artworks.filter((art) => {
      const year = parseYear(art?.date);
      if (!year) return false;

      return year >= yearRange[0] && year <= yearRange[1];
    });

    set({ filteredArtworks: filtered });
  },

  // Reset Filters
  resetFilters: () => {
    set({
      selectedEra: null,
      yearRange: [500, 2025],
    });
    get().applyFilters();
  },

  // Artwork Modal
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
      console.error("Error fetching wiki summary:", err);
      set({
        modalError: "Failed to fetch artist info",
        modalLoading: false,
        wikiData: null,
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

  // Favorites
  toggleFavorite: (art) => {
    const user = get().user;
    if (!user) return;

    const exists = user.favorites.some((a) => a.id === art.id);
    const updatedFavorites = exists
      ? user.favorites.filter((a) => a.id !== art.id)
      : [...user.favorites, art];

    const updatedUser = { ...user, favorites: updatedFavorites };

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.map((u) =>
      u.id === updatedUser.id ? updatedUser : u
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem("user", JSON.stringify(updatedUser));

    set({ favorites: updatedFavorites, user: updatedUser });
  },

  // Authentication
  login: (email, password) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const existingUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!existingUser) throw new Error("Invalid email or password");

    localStorage.setItem("user", JSON.stringify(existingUser));
    set({ user: existingUser, favorites: existingUser.favorites });
  },

  register: (email, password) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.find((u) => u.email === email))
      throw new Error("User already exists");

    const newUser = {
      id: Date.now(),
      email,
      password,
      favorites: [],
    };

    const updatedUsers = [...users, newUser];

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem("user", JSON.stringify(newUser));

    set({ user: newUser, favorites: [] });
  },

  logout: () => {
    localStorage.removeItem("user");
    set({ user: null, favorites: [] });
  },
}));
import { create } from "zustand";
import { searchArtworks, fetchArtworksSafe } from "../services/metMuseumApi";
import { fetchWikiSummary } from "../services/wikiApi";
import { parseYear } from "../utils/parseYear";

export const useArtStore = create((set, get) => ({
  artworks: [],
  filteredArtworks: [],
  favorites: JSON.parse(localStorage.getItem("user"))?.favorites || [],
  selectedArtwork: null,
  wikiData: null,

  loading: false,
  modalLoading: false,
  error: null,
  modalError: null,

  yearRange: [1400, 2000],
  currentQuery: null,

  setYearRange: (range) => {
    set({ yearRange: range });
    get().filterArtworks();
  },

  fetchArtworks: async (query = "painting") => {
    try {
      const currentQuery = get().currentQuery;
      if (currentQuery === query) return; // prevent duplicate fetch

      set({ loading: true, error: null, currentQuery: query });

      const eraQueryMap = {
        Renaissance: "Renaissance painting 1400-1600",
        Baroque: "Baroque painting 1600-1750",
        Romanticism: "Romanticism painting 1800-1850",
        "Modern Art": "Modern painting 1900-1970",
      };

      const enhancedQuery =
        eraQueryMap[query] || `${query} painting`;

      const ids = await searchArtworks(enhancedQuery);

      if (!ids.length) {
        set({ artworks: [], filteredArtworks: [], loading: false });
        return;
      }

      const artworks = await fetchArtworksSafe(ids, 20);

      set({ artworks, loading: false });

      get().filterArtworks();
    } catch (err) {
      console.error("Error fetching artworks:", err);
      set({
        error: "Failed to fetch artworks. Please try again.",
        loading: false,
      });
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
    if (!state.user) return state;

    const exists = state.favorites.some(
      (item) => item.id === art.id
    );

    const updatedFavorites = exists
      ? state.favorites.filter((item) => item.id !== art.id)
      : [...state.favorites, art];

    const updatedUser = {
      ...state.user,
      favorites: updatedFavorites,
    };

    // Update users in localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.map((u) =>
      u.id === updatedUser.id ? updatedUser : u
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem("user", JSON.stringify(updatedUser));

    return {
      favorites: updatedFavorites,
      user: updatedUser,
    };
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

user: JSON.parse(localStorage.getItem("user")) || null,

login: (email, password) => {
  const users = JSON.parse(localStorage.getItem("users")) || [];

  const existingUser = users.find(
    (u) => u.email === email && u.password === password
  );

  if (!existingUser) {
    throw new Error("Invalid email or password");
  }

  localStorage.setItem("user", JSON.stringify(existingUser));

  set({ user: existingUser });
},

register: (email, password) => {
  const users = JSON.parse(localStorage.getItem("users")) || [];

  const alreadyExists = users.find((u) => u.email === email);

  if (alreadyExists) {
    throw new Error("User already exists");
  }

  const newUser = {
    id: Date.now(),
    email,
    password,
    favorites: [],
  };

  const updatedUsers = [...users, newUser];

  localStorage.setItem("users", JSON.stringify(updatedUsers));
  localStorage.setItem("user", JSON.stringify(newUser));

  set({ user: newUser });
},

logout: () => {
  localStorage.removeItem("user");
  set({ user: null, favorites: [] });
},

}));

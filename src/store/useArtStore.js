import { create } from "zustand";
import {
  searchArtworks,
  fetchArtworksSafe,
  searchArtworksByDate,
} from "../services/metMuseumApi";
import { fetchWikiSummary } from "../services/wikiApi";
import { parseYear } from "../utils/parseYear";

// Helpers

const getStoredUser = () =>
  JSON.parse(localStorage.getItem("user"));

const getStoredUsers = () =>
  JSON.parse(localStorage.getItem("users")) || [];

const getGuestFavorites = () =>
  JSON.parse(localStorage.getItem("guestFavorites")) || [];

const saveGuestFavorites = (favorites) =>
  localStorage.setItem("guestFavorites", JSON.stringify(favorites));

const saveUsers = (users) =>
  localStorage.setItem("users", JSON.stringify(users));

const saveUser = (user) =>
  localStorage.setItem("user", JSON.stringify(user));

//Store

export const useArtStore = create((set, get) => {
  const storedUser = getStoredUser();

  return {
    //Core State
    
    artworks: [],
    filteredArtworks: [],
    selectedArtwork: null,
    selectedEra: null,
    wikiData: null,

    user: storedUser,
    favorites: storedUser?.favorites || getGuestFavorites(),

    loading: false,
    modalLoading: false,
    error: null,
    modalError: null,

    yearRange: [500, 2025],
    artworkCache: {},

    //Era Maps

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

    // Year Filter

    setYearRange: (range) => {
      set({ yearRange: range });
      get().applyFilters();
    },

    resetFilters: () => {
      set({ yearRange: [500, 2025] });
      get().applyFilters();
    },

    applyFilters: () => {
      const { artworks, yearRange } = get();

      const filtered = artworks.filter((art) => {
        const year = parseYear(art?.date);
        return year && year >= yearRange[0] && year <= yearRange[1];
      });

      set({ filteredArtworks: filtered });
    },

    // Fetch Artworks
    
    fetchArtworks: async (eraOrQuery = "painting") => {
      const { artworkCache, eraQueryMap, eraYearMap } = get();

      const isEra = !!eraQueryMap[eraOrQuery];
      const query = isEra ? eraQueryMap[eraOrQuery] : eraOrQuery;
      const eraRange = isEra ? eraYearMap[eraOrQuery] : [500, 2025];

      if (artworkCache[eraOrQuery]) {
        set({
          artworks: artworkCache[eraOrQuery],
          filteredArtworks: artworkCache[eraOrQuery],
          selectedEra: isEra ? eraOrQuery : null,
          yearRange: eraRange,
          loading: false,
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
        console.error(err);
        set({ error: "Failed to fetch artworks.", loading: false });
      }
    },

    // Modal
    
    selectArtwork: async (art) => {
      const artistName = art?.artist?.trim();

      if (!artistName || artistName === "Unknown Artist") {
        set({
          selectedArtwork: art,
          wikiData: null,
          modalLoading: false,
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
          modalError: wiki ? null : "No info found",
        });
      } catch {
        set({
          modalError: "Failed to fetch artist info",
          modalLoading: false,
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
      const { user } = get();
      const currentFavorites = user
        ? user.favorites
        : getGuestFavorites();

      const exists = currentFavorites.some((a) => a.id === art.id);

      const updatedFavorites = exists
        ? currentFavorites.filter((a) => a.id !== art.id)
        : [...currentFavorites, art];

      if (!user) {
        saveGuestFavorites(updatedFavorites);
        set({ favorites: updatedFavorites });
        return;
      }

      const updatedUser = { ...user, favorites: updatedFavorites };
      const users = getStoredUsers().map((u) =>
        u.id === user.id ? updatedUser : u
      );

      saveUsers(users);
      saveUser(updatedUser);

      set({ user: updatedUser, favorites: updatedFavorites });
    },

    //Authentication

    login: (email, password) => {
      const users = getStoredUsers();

      const existingUser = users.find(
        (u) => u.email === email && u.password === password
      );

      if (!existingUser)
        throw new Error("Invalid email or password");

      const guestFavorites = getGuestFavorites();

      const mergedFavorites = [
        ...existingUser.favorites,
        ...guestFavorites.filter(
          (g) =>
            !existingUser.favorites.some(
              (u) => u.id === g.id
            )
        ),
      ];

      const updatedUser = {
        ...existingUser,
        favorites: mergedFavorites,
      };

      const updatedUsers = users.map((u) =>
        u.id === updatedUser.id ? updatedUser : u
      );

      saveUsers(updatedUsers);
      saveUser(updatedUser);
      localStorage.removeItem("guestFavorites");

      set({ user: updatedUser, favorites: mergedFavorites });
    },

    register: (email, password) => {
      const users = getStoredUsers();

      if (users.find((u) => u.email === email))
        throw new Error("User already exists");

      const newUser = {
        id: Date.now(),
        email,
        password,
        favorites: [],
      };

      const updatedUsers = [...users, newUser];

      saveUsers(updatedUsers);
      saveUser(newUser);

      set({ user: newUser, favorites: [] });
    },

    logout: () => {
      localStorage.removeItem("user");
      set({
        user: null,
        favorites: getGuestFavorites(),
      });
    },
  };
});
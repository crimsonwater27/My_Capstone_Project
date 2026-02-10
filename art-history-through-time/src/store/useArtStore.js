import { create } from "zustand";
import { searchArtworks, getArtwork } from "../services/museumApi";
import { parseYear } from "../utils/parseYear";

export const useArtStore = create((set, get) => ({
  artworks: [],
  favorites: [],
  selectedArtwork: null,
  yearRange: [1400, 1800],

  setYearRange: (range) => {
    set({ yearRange: range });
    getArtwork().filteredArtworks();
  },


  fetchArtworks: async () => {
    const ids = await searchArtworks("painting");
    const data = await Promise.all(ids.map(id => getArtwork(id)));
    set({ 
      artworks: data,
      filteredArtworks: data,
    });
  },
     
filteredArtworks: () => {
  const { artworks, yearRange } = get();

  const filtered = artworks.filter((art) => {
    const year = parseYear(art.ObjectDate);
    if (!year) return false;

    return year >= yearRange[0] && year <= yearRange[1];
  });

  set({ filteredArtworks: filtered });

},

  addFavorite: (art) =>
    set((state) => ({
      favorites: [...state.favorites, art],
    })),
}));

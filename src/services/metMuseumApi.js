import axios from "axios";

const BASE = "https://collectionapi.metmuseum.org/public/collection/v1";
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export const searchArtworks = async (query) => {
  try {
    const res = await axios.get(`${BASE}/search`, {
      params: { q: query, hasImages: true },
    });

    return res.data.objectIDs || [];
  } catch (err) {
    console.error("Search error:", err);
    return [];
  }
};

export const getArtwork = async (id) => {
  try {
    const res = await axios.get(`${BASE}/objects/${id}`);
    return res.data;
  } catch {
    console.warn("Met API blocked id:", id);
    return null;
  }
};

// ✅ Safe fetch function with placeholders
export const fetchArtworksSafe = async (ids, limit = 20) => {
  const results = [];

  for (let i = 0; i < ids.length && results.length < limit; i++) {
    const art = await getArtwork(ids[i]);

    if (art && art.primaryImageSmall) {
      results.push({
        id: art.objectID,
        title: art.title || "Untitled",
        artist: art.artistDisplayName || "Unknown Artist",
        date: art.objectDate || "Unknown Date",
        image: art.primaryImageSmall,
      });
    } else {
      // Placeholder for blocked or missing images
      results.push({
        id: ids[i],
        title: "Unavailable",
        artist: "Unknown Artist",
        date: "Unknown Date",
        image: "/placeholder.png",
      });
    }

    // Small delay to reduce API load
    await delay(120);
  }

  return results;
};
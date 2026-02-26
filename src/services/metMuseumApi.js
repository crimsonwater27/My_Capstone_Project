import axios from "axios";
import { getArtMovement } from "../utils/mapArtMovements";

const BASE = "/met/public/collection/v1";


export const searchArtworks = async (query) => {
  try {
    const res = await axios.get(`${BASE}/search`, {
      params: {
        q: query,
        hasImages: true,
      },
    });

    return res.data.objectIDs || [];
  } catch (err) {
    console.error("Search error:", err);
    return [];
  }
};


export const searchArtworksByDate = async (start, end) => {
  try {
    const res = await axios.get(`${BASE}/search`, {
      params: {
        hasImages: true,
        dateBegin: start,
        dateEnd: end,
        q: "*",   // more open search
      },
    });

    return res.data.objectIDs || [];
  } catch (err) {
    console.error("Date search error:", err);
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


export const fetchArtworksSafe = async (ids, limit = 24) => {
  const results = [];
  const selectedIds = ids.slice(0, limit * 3); 

  for (let id of selectedIds) {
    if (results.length >= limit) break;

    try {
      const res = await axios.get(`${BASE}/objects/${id}`);
      const art = res.data;

      if (art && art.primaryImageSmall) {
        results.push({
          id: art.objectID,
          title: art.title || "Untitled",
          artist: art.artistDisplayName || "Unknown Artist",
          date: art.objectDate || "Unknown Date",
          movement: getArtMovement(art.objectDate),
          image: art.primaryImageSmall,
        });
      }

    
      await new Promise((resolve) => setTimeout(resolve, 120));

    } catch (err) {
      console.warn("Error fetching id:", id, err.message);
    }
  }

  console.log("Fetched artworks:", results.length);
  return results;
};
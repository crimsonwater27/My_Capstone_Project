import axios from "axios";

const MET_BASE_URL = "https://collectionapi.metmuseum.org/public/collection/v1";


export const searchArtworks = async (query = "painting") => {
  try {
    const res = await axios.get(`${MET_BASE_URL}/search`, {
      params: {
        q: query,
        hasImages: true, // only artworks with images
      },
    });

    if (res.data?.objectIDs?.length) {
      return res.data.objectIDs;
    }
    return [];
  } catch (err) {
    console.error("Met API search error:", err);
    return [];
  }
};


export const getArtwork = async (objectID) => {
  if (!objectID) return null;

  try {
    const res = await axios.get(`${MET_BASE_URL}/objects/${objectID}`);
    if (res.data) return res.data;
    return null;
  } catch (err) {
    console.warn(`Met API error fetching artwork ${objectID}:`, err);
    return null;
  }
};

import axios from "axios";

const BASE = "https://collectionapi.metmuseum.org/public/collection/v1";

export async function searchArtworks(query = "painting") {
  const res = await axios.get(`${BASE}/search?q=${query}&hasImages=true`);
  return res.data.objectIDs?.slice(0, 12) || [];
}

export async function getArtwork(id) {
  const res = await axios.get(`${BASE}/objects/${id}`);
  return res.data;
}
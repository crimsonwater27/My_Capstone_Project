import axios from "axios";
import { fetchWikiSummary } from "./wikiApi";

const BASE = "https://collectionapi.metmuseum.org/public/collection/v1";

export const searchArtworks = async (query) => {
  try {
    const res = await axios.get(`${BASE}/search?q=${query}`);

    const ids = res.data.objectIDs?.slice(0, 10) || [];

    const artworks = await Promise.all(
      ids.map(async (id) => {
        const artRes = await axios.get(`${BASE}/objects/${id}`);
        const art = artRes.data;

        const wiki =
          (await fetchWikiSummary(art.artistDisplayName)) ||
          (await fetchWikiSummary(art.title));

        return {
          id: art.objectID,
          title: art.title,
          artist: art.artistDisplayName,
          date: art.objectDate,
          image: art.primaryImageSmall,
          wiki,
        };
      })
    );

    return artworks;
  } catch (err) {
    console.error("Met API error:", err);
    return [];
  }
};
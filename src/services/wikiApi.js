import axios from "axios";

const WIKI_BASE = "https://en.wikipedia.org/api/rest_v1/page/summary";

/**
 * Get wikipedia summary for a term
 * @param {string} term
 */
export const fetchWikiSummary = async (term) => {
  try {
    if (!term) return null;

    const res = await axios.get(`${WIKI_BASE}/${encodeURIComponent(term)}`);

    return {
      title: res.data.title,
      description: res.data.description,
      extract: res.data.extract,
      image: res.data.thumbnail?.source || null,
      wikiUrl: res.data.content_urls?.desktop?.page || null,
    };
  } catch {
    console.log("Wiki fetch failed:", term);
    return null;
  }
};

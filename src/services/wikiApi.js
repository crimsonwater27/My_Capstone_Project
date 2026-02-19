import axios from "axios";

export const fetchWikiSummary = async (name) => {
  try {
    const cleanName = name.replace(/\(.*?\)/g, "").trim();

    const res = await axios.get(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(cleanName)}`
    );

    return res.data;
  } catch {
    // Silent fail — many artists don't have pages
    return null;
  }
};

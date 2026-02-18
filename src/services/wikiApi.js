export const fetchWikiSummary = async (query) => {
  if (!query) return null;

  try {
    // encode query to handle spaces and special chars
    const encoded = encodeURIComponent(query);
    const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encoded}`;

    const res = await fetch(url);

    if (!res.ok) {
      console.warn(`Wiki fetch failed for: ${query}`);
      return null;
    }

    const data = await res.json();

    // return extract (summary) or null
    return data.extract || null;
  } catch (err) {
    console.error(`Wiki fetch error for: ${query}`, err);
    return null;
  }
};

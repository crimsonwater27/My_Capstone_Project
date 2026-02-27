export const formatDate = (dateString) => {
  if (!dateString) return "Unknown Date";

  const raw = dateString.trim();

  // Extract first 4-digit year if present
  const yearMatch = raw.match(/\d{4}/);

  if (yearMatch) {
    return yearMatch[0];
  }

  // Extract century (e.g., "16th century")
  const centuryMatch = raw.match(/(\d{1,2})(st|nd|rd|th)\s+century/i);

  if (centuryMatch) {
    return `${centuryMatch[1]}th century`;
  }

  // Fallback to raw string if no year or century found
  return raw;
};
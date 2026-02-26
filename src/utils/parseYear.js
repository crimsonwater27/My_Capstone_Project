export function parseYear(objectDate) {
  if (!objectDate) return null;

  // Match 4-digit year (most common case)
  const yearMatch = objectDate.match(/\b\d{4}\b/);
  if (yearMatch) return Number(yearMatch[0]);

  // Match decade like "1870s"
  const decadeMatch = objectDate.match(/\b(\d{4})s\b/);
  if (decadeMatch) return Number(decadeMatch[1]);

  // Match century like "18th century"
  const centuryMatch = objectDate.match(/(\d{1,2})(st|nd|rd|th) century/);
  if (centuryMatch) {
    const century = Number(centuryMatch[1]);
    return (century - 1) * 100;
  }

  return null;
}
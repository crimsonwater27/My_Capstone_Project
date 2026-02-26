export const artMovements = [
  { name: "Medieval", start: 500, end: 1450 },
  { name: "Renaissance", start: 1300, end: 1600 },
  { name: "Baroque", start: 1600, end: 1750 },
  { name: "Romanticism", start: 1790, end: 1850 },
  { name: "Modern Art", start: 1860, end: 1970 },
  { name: "Rococo", start: 1690, end: 1785 },
  { name: "Realism", start: 1840, end: 1900 },
  { name: "Surrealism", start: 1900, end: 1960 },
  { name: "Contemporary", start: 1945, end: 2025 },
];

export function getArtMovement(dateString) {
  if (!dateString) return "Unknown Period";

  // Extract first 4-digit year found
  const match = dateString.match(/\d{4}/);
  if (!match) return "Unknown Period";

  const year = parseInt(match[0], 10);

  const movement = artMovements.find(
    (m) => year >= m.start && year <= m.end
  );

  console.log("DATE:", dateString, "YEAR:", year, "MOVEMENT:", movement?.name);

  return movement?.name || "Unknown Period";
}
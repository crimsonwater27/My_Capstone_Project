export const artMovements = [
  { name: "Medieval", start: 1000, end: 1400 },
  { name: "Renaissance", start: 1400, end: 1600 },
  { name: "Baroque", start: 1600, end: 1750 },
  { name: "Romanticism", start: 1800, end: 1850 },
  { name: "Modern Art", start: 1860, end: 1970 },
];

export function getArtMovement(year) {
  return (
    artMovements.find(
      (m) => year >= m.start && year <= m.end
    )?.name || "Unknown Period"
  );
}

export function parseYear(objectDate) {
  if (!objectDate) return null;

  const match = objectDate.match(/\d{4}/);
  if (match) return Number(match[0]);

  return null;
}

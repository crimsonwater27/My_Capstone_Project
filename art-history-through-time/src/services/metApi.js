const BASE_URL = "https://collectionapi.metmuseum.org/public/collection/v1";

export async function searchArtworks(query = "painting") {
  const res = await fetch(
    `${BASE_URL}/search?hasImages=true&q=${query}`
  );
  return res.json();
}

export async function fetchArtworkById(id) {
  const res = await fetch(`${BASE_URL}/objects/${id}`);
  return res.json();
}

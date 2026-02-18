import { useArtStore } from "./stores/useArtStore";

const testFetch = async () => {
  const store = useArtStore.getState();

  console.log("Fetching artworks...");
  await store.fetchArtworks("painting");

  console.log("All artworks:", store.artworks);
  console.log("Filtered artworks:", store.filteredArtworks);

  if (store.artworks.length === 0) {
    console.warn("No artworks were fetched. Check the API or query term.");
  } else {
    console.log(`Fetched ${store.artworks.length} artworks successfully!`);
  }

  // Test selecting an artwork for wiki fetch
  const firstArt = store.artworks[0];
  if (firstArt) {
    console.log("Selecting first artwork for wiki fetch:", firstArt.title);
    await store.selectArtwork(firstArt);
    console.log("Wiki data:", store.wikiData);
  } else {
    console.warn("No artwork available to test wiki fetch.");
  }
};

testFetch();

import { useEffect } from "react";
import { useArtStore } from "../store/useArtStore";
import ArtworkCard from "../components/ArtworkCard";
import TimelineSlider from "../components/TimelineSlider";
import SearchBar from "../components/SearchBar";
import Filters from "../components/Filters";
import ArtworkGrid from "../components/ArtworkGrid";
import ArtworkModal from "../components/ArtworkModal";
import FavoritesPanel from "../components/FavoritesPanel";

export default function Dashboard() {
  const fetchArtworks = useArtStore((s) => s.fetchArtworks);
  const selectedArtwork = useArtStore((s) => s.selectedArtwork);

  useEffect(() => {
    fetchArtworks("painting");
  }, [fetchArtworks]);

  return (
    <div>
      <SearchBar />
      <Filters />
      <FavoritesPanel />
      <TimelineSlider />

      <h1>Artwork Images</h1>
      <ArtworkGrid />

      {selectedArtwork && <ArtworkModal />}


      

    </div>
  );
}

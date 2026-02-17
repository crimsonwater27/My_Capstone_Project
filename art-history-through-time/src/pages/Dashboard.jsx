import { useEffect } from "react";
import { useArtStore } from "../store/useArtStore";

import ArtworkGrid from "../components/ArtworkGrid";
import TimelineSlider from "../components/TimelineSlider";
import SearchBar from "../components/SearchBar";
import Filters from "../components/Filters";
import ArtworkModal from "../components/ArtworkModal";
import FavoritesPanel from "../components/FavoritesPanel";

export default function Dashboard() {
  const fetchArtworks = useArtStore((s) => s.fetchArtworks);
  const artworks = useArtStore((s) => s.filteredArtworks);
  const selectedArtwork = useArtStore((s) => s.selectedArtwork);

  useEffect(() => {
    fetchArtworks("painting");
  }, [fetchArtworks]);

  return (
<section className="space-y-6">

  <div className="space-y-4">
    <SearchBar />
    <Filters />
    <TimelineSlider />
  </div>

  <div className="grid lg:grid-cols-4 gap-6">

    {/* Main */}
    <div className="lg:col-span-3 space-y-6">
      <h1 className="text-xl md:text-2xl font-bold">
        Artwork Images
      </h1>

      <ArtworkGrid artworks={artworks} />
    </div>

    {/* Sidebar */}
    <div className="lg:col-span-1">
      <FavoritesPanel />
    </div>

  </div>

  {selectedArtwork && <ArtworkModal />}
</section>
  );
}
import { useEffect } from "react";
import { useArtStore } from "../store/useArtStore";
import ArtworkCard from "../components/ArtworkCard";
import TimelineSlider from "../components/TimelineSlider";

export default function Dashboard() {
  const { filteredArtworks, fetchArtworks } = useArtStore();

  useEffect(() => {
    fetchArtworks();
  }, [fetchArtworks]);

  return (
    <div>
      <h1>Art History Through Time</h1>

      <TimelineSlider />

      <div>
        {filteredArtworks.map((art) => (
          <ArtworkCard key={art.objectID} art={art} />
        ))}
      </div>
    </div>
  );
}

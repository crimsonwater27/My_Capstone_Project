import { useEffect } from "react";
import { useArtStore } from "../store/useArtStore";
import ArtworkCard from "../components/ArtworkCard";
import Timeline from "../components/Timeline";
import TimelineSlider from "../components/TimelineSlider";

export default function Dashboard() {
  const { artworks, fetchArtworks } = useArtStore();

  useEffect(() => {
    fetchArtworks();
  }, [fetchArtworks]);

  return (
    <div>
      <h1>Art History Through Time</h1>

      <TimelineSlider />

      <div>
        {artworks.map((art) => (
          <ArtworkCard key={art.objectID} art={art} />
        ))}
      </div>
    </div>
  );
}

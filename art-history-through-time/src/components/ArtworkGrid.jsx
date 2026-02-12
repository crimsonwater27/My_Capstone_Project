import { useEffect } from "react";
import { useArtStore } from "../store/useArtStore";
import ArtworkCard from "./ArtworkCard";

export default function ArtworkGrid() {
  const fetchArtworks = useArtStore((s) => s.fetchArtworks);
  const artworks = useArtStore((s) => s.filteredArtworks);
  const loading = useArtStore((s) => s.loading);

  useEffect(() => {
    fetchArtworks("painting");
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!artworks.length) return <p>No results</p>;

  return (
    <div>
      {artworks.map((art) => (
        <ArtworkCard key={art.id} art={art} />
      ))}
    </div>
  );
}

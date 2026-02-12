import React from "react";
import { useArtStore } from "../store/useArtStore";
import ArtworkCard from "./ArtworkCard";


export default function ArtworkGrid() {
  const artworks = useArtStore((s) => s.filteredArtworks);

  if (!artworks.length) return <p>No results</p>;

  return (
    <div>
      {artworks.map((art) => (
        <ArtworkCard key={art.id} artwork={art} />
      ))}
    </div>
  );
}
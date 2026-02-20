import { useArtStore } from "../store/useArtStore";

export default function ArtworkCard({ art }) {
  const setSelectedArtwork = useArtStore((s) => s.setSelectedArtwork);
  const addFavorite = useArtStore((s) => s.addFavorite);

  if (!art) return null;

  return (
    <div style={{ border: "1px solid #ccc", padding: 12, margin: 10 }}>
      {/* IMAGE */}
      {art.image ? (
        <img src={art.image} alt={art.title} className="w-full h-64 aspect-[4/3] rounded" />
      ) : (
        <div style={{ width: 200, height: 150, background: "#ddd" }}>
          No image
        </div>
      )}

      {/* TEXT */}
      <h3>{art.title || "Untitled"}</h3>
      <p>{art.artist || "Unknown artist"}</p>
      <p>{art.date || "Unknown date"}</p>

      {/* BUTTONS */}
      <button onClick={() => setSelectedArtwork(art)}>View</button>
      <button onClick={() => addFavorite(art)}>Favorite</button>
    </div>
  );
}

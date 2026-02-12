import { useArtStore } from "../store/useArtStore";

export default function FavoritesPanel() {
  const favorites = useArtStore((s) => s.favorites);
  const onRemove = useArtStore((s) => s.removeFromFavorites);

  if (!favorites.length) return <p>No favorites yet</p>;

  return (
    <div>
      <h3>Favorites</h3>

      {favorites.map((art) => (
        <div key={art.id}>
          <p>{art.title}</p>
          <span>{art.title}</span>
          <button onClick={() => onRemove(art.id)}>Remove</button>
        </div>
      ))}
    </div>
  );
};


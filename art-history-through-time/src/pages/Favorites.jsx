import { useArtStore } from "../store/useArtStore";

export default function Favorites() {
  const { favorites } = useArtStore();

  return (
    <div>
      <h1>Favorites</h1>

      {favorites.map((art) => (
        <div key={art.objectID}>
          <p>{art.title}</p>
        </div>
      ))}
    </div>
  );
}

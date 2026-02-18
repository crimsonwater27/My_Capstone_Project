import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";
import { useArtStore } from "../store/useArtStore";

const ArtworkGrid = () => {
  const { artworks, loading, error } = useArtStore();

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="grid">
      {artworks.map((art) => (
        <div key={art.objectID}>
          <img src={art.primaryImageSmall} alt={art.title} />
          <p>{art.title}</p>
        </div>
      ))}
    </div>
  );
};

export default ArtworkGrid;

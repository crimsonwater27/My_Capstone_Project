import { useEffect } from "react";
import ArtworkCard from "./ArtworkCard";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";  
import { useArtStore } from "../store/artStore";

export const ArtworkGrid = () => {
  const { filteredArtworks, loading, error, fetchArtworks } = useArtStore();

  useEffect(() => {
    fetchArtworks();
  }, []);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
      {filteredArtworks.map((art) => (
        <ArtworkCard key={art.objectID} art={art} />
      ))}
    </div>
  );
};

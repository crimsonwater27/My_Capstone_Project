import { useEffect } from "react";
import ArtworkCard from "./ArtworkCard";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";  
import { useArtStore } from "../store/artStore";

export const ArtworkGrid = () => {
  const { filteredArtworks, loading, error, fetchArtworks } = useArtStore();

  useEffect(() => {
    fetchArtworks();
  }, [fetchArtworks]);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="grid
     grid-cols-1 
     sm:grid-cols-2 
     md:grid-cols-3 
     lg:grid-cols-4
     xl:grid-cols-5 
     gap-6 p-6">

      {filteredArtworks.map((art) => (
        <ArtworkCard key={art.objectID} art={art} />
      ))}
    </div>
  );
};

import React from "react";
import { useArtStore } from "../store/useArtStore";

export const ArtworkGrid = () => {
  const { filteredArtworks, selectArtwork } = useArtStore();

  if (!filteredArtworks?.length) {
    return <p className="text-center mt-8">No artworks found.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {filteredArtworks.map((art) => (
        <div
          key={art.id} // ✅ unique key
          className="border rounded overflow-hidden shadow hover:shadow-lg transition cursor-pointer"
          onClick={() => selectArtwork(art)}
        >
          {art.image ? (
            <img
              src={art.image}
              alt={art.title}
              className="w-full h-64 object-cover"
            />
          ) : (
            <div className="w-full h-64 flex items-center justify-center bg-gray-200 text-gray-600">
              No Image
            </div>
          )}
          <div className="p-2">
            <h3 className="font-semibold">{art.title}</h3>
            <p className="text-sm text-gray-500">{art.artist}</p>
            <p className="text-sm text-gray-400">{art.date}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ArtworkGrid;

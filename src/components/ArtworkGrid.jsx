import React from "react";
import { useArtStore } from "../store/useArtStore";

export const ArtworkGrid = () => {
  const { filteredArtworks, selectArtwork, favorites, addFavorite, removeFavorite } =
    useArtStore();

  if (!filteredArtworks.length) {
    return <p className="text-center mt-8">No artworks found.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {filteredArtworks.map((art) => (
        <div
          key={art.id}
          className="border rounded shadow hover:shadow-lg transition cursor-pointer"
        >
          <img
            src={art.image || "/public/12th digital drawing.jpg"} 
            alt={art.title}
            className="w-full h-64 object-cover rounded-t"
            onClick={() => selectArtwork(art)}
          />
          <div className="p-2">
            <h3 className="font-semibold">{art.title}</h3>
            <p className="text-sm text-gray-600">{art.artist || "Unknown Artist"}</p>
            <p className="text-sm text-gray-500">{art.date || "Unknown Date"}</p>

            <button
              className="mt-2 px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() =>
                favorites.some((f) => f.id === art.id)
                  ? removeFavorite(art.id)
                  : addFavorite(art)
              }
            >
              {favorites.some((f) => f.id === art.id) ? "Remove Favorite" : "Add Favorite"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ArtworkGrid;

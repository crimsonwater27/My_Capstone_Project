import React from "react";
import { useArtStore } from "../store/useArtStore";

export const ArtworkGrid = () => {
  const {
    filteredArtworks,
    selectArtwork,
    toggleFavorite,
    favorites,
  } = useArtStore();

  const isFavorited = (artwork) =>
    favorites.some((item) => item.id === artwork.id);

  if (!filteredArtworks?.length) {
    return <p className="text-center mt-8">No artworks found.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-6">
      {filteredArtworks.map((art) => {
        const favorited = isFavorited(art);

        return (
          <div
            key={art.id}
            className="relative border rounded overflow-hidden shadow hover:shadow-xl transition duration-300 bg-white"
          >
            {/* FAVORITED BADGE */}
            {favorited && (
              <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded shadow">
                Favorited
              </div>
            )}

            {/* HEART ICON */}
            <button
              onClick={() => toggleFavorite(art)}
              className={`absolute top-2 left-2 text-2xl transition transform ${
                favorited
                  ? "text-red-400 scale-110"
                  : "text-gray-200 hover:text-red-200"
              } hover:scale-125`}
            >
              {favorited ? "❤️" : "🤍"}
            </button>

            {/* CLICKABLE IMAGE */}
            <div
              className="cursor-pointer"
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
            </div>

            <div className="p-3 space-y-1">
              <h3 className="font-semibold">{art.title}</h3>
              <p className="text-sm text-gray-500">
                {art.artist || "Unknown Artist"}
              </p>
              <p className="text-sm text-gray-400">{art.date}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ArtworkGrid;
import React from "react";
import { useArtStore } from "../store/useArtStore";

export default function ArtworkGrid() {
  const {
    filteredArtworks,
    selectArtwork,
    toggleFavorite,
    favorites,
  } = useArtStore();

  const isFavorited = (art) =>
    favorites.some((item) => item.id === art.id);

  if (!filteredArtworks?.length) {
    return (
      <p className="text-center mt-8 text-gray-400">
        No artworks found.
      </p>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredArtworks.map((art) => {
        const unavailable = art.title === "Unavailable";

        return (
          <div
            key={art.id}
            className="bg-[#1E1E1E] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition relative flex flex-col"
          >
            {/* Image Container */}
            <div className="relative">
              <img
                src={art.image || "/placeholder.png"}
                alt={art.title}
                loading="lazy"
                decoding="async"
                onError={(e) => (e.target.src = "/12th digital drawing.jpg")}
                onClick={() => !unavailable && selectArtwork(art)}
                className="w-full h-64 object-cover rounded-t-2xl cursor-pointer"
              />

              {/* Overlay if unavailable */}
              {unavailable && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white font-semibold text-sm">
                  Data Unavailable
                </div>
              )}
            </div>

            {/* Info Section */}
            <div className="p-4 flex flex-col justify-between flex-1">
              <div>
                <h3 className="text-sm font-semibold text-white">
                  {art.title}
                </h3>
                <p className="text-xs text-gray-400">
                  {art.artist || "Unknown Artist"}
                </p>
                <p className="text-xs text-gray-500">
                  {art.date || "Unknown Date"}
                </p>
              </div>

              {/* Favorites Button */}
              {!unavailable && (
                <button
                  onClick={() => toggleFavorite(art)}
                  className={`mt-3 w-full py-2 rounded-lg transition font-semibold ${
                    isFavorited(art)
                      ? "bg-red-500 text-white hover:bg-red-600"
                      : "bg-gray-700 text-white hover:bg-gray-600"
                  }`}
                >
                  {isFavorited(art)
                    ? "Remove from Favorites"
                    : "Add to Favorites"}
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
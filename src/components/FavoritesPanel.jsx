import React from "react";
import { useArtStore } from "../store/useArtStore";

export default function FavoritesPanel() {
  const { favorites, selectArtwork, removeFavorite } = useArtStore();

  if (!favorites.length) {
    return (
      <div className="bg-[#1E1E1E] rounded-2xl p-4 shadow-md space-y-2">
        <h2 className="text-lg font-semibold text-yellow-400">Favorites</h2>
        <p className="text-gray-400 text-sm">No favorites yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-[#1E1E1E] rounded-2xl p-4 shadow-md space-y-4">
      <h2 className="text-lg font-semibold text-yellow-400">Favorites</h2>

      <div className="space-y-3 max-h-[70vh] overflow-y-auto">
        {favorites.map((art) => (
          <div
            key={art.id}
            className="flex items-center space-x-3 bg-[#121212] rounded-lg p-2 hover:bg-[#272727] transition cursor-pointer"
          >
            <img
              src={art.image}
              alt={art.title}
              className="w-12 h-12 object-cover rounded"
              onClick={() => selectArtwork(art)}
            />
            <div className="flex-1">
              <p className="text-sm font-medium text-white">{art.title}</p>
              <p className="text-xs text-gray-400">{art.artist || "Unknown"}</p>
            </div>
            <button
              onClick={() => removeFavorite(art.id)}
              className="text-red-500 hover:text-red-600 text-sm font-semibold"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
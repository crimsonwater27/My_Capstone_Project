import React from "react";
import { useArtStore } from "../store/useArtStore";
import ArtworkModal from "../components/ArtworkModal";

export default function FavoritesPage() {
  const {
    favorites,
    toggleFavorite,
    selectArtwork,
    selectedArtwork,
  } = useArtStore();

  if (!favorites.length) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-[#121212] text-white">
        <p className="text-lg">
          You haven’t added any favorites yet.
        </p>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#121212] text-white p-6">
      <h1 className="text-2xl font-bold mb-6">
        Your Favorite Artworks ❤️
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {favorites.map((art) => (
          <div
            key={art.id}
            className="relative bg-white text-black rounded shadow hover:shadow-xl transition"
          >
            {/* Remove Favorite Button */}
            <button
              onClick={() => toggleFavorite(art)}
              className="absolute top-2 right-2 text-2xl text-red-500 hover:scale-125 transition"
            >
              ❤️
            </button>

            <div
              className="cursor-pointer"
              onClick={() => selectArtwork(art)}
            >
              <img
                src={art.image}
                alt={art.title}
                className="w-full h-64 object-cover rounded-t"
              />
            </div>

            <div className="p-3">
              <h3 className="font-semibold">{art.title}</h3>
              <p className="text-sm text-gray-600">
                {art.artist || "Unknown Artist"}
              </p>
              <p className="text-sm text-gray-500">{art.date}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedArtwork && <ArtworkModal />}
    </section>
  );
}
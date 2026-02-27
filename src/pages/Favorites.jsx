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
          You haven’t added any favorites yet, Your personal Museum awaits!
        </p>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#121212] text-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-10">

        {!favorites.length ? (
          <div className="flex items-center justify-center text-center h-[60vh]">
            <p className="text-lg sm:text-xl text-gray-300">
              You haven’t added any favorites yet. Your personal museum awaits!
            </p>
          </div>
        ) : (
          <>
            <h1 className="text-2xl sm:text-3xl font-bold mb-8">
              Your Favorite Artworks ❤️
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {favorites.map((art) => (
                <div
                  key={art.id}
                  className="relative bg-white text-black rounded-xl shadow hover:shadow-xl transition"
                >
                  <button
                    onClick={() => toggleFavorite(art)}
                    className="absolute top-3 right-3 text-2xl text-red-500 hover:scale-125 transition"
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
                      className="w-full aspect-[3/4] object-cover rounded-t-xl"
                    />
                  </div>

                  <div className="p-4">
                    <h3 className="font-semibold text-base">
                      {art.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {art.artist || "Unknown Artist"}
                    </p>
                    <p className="text-sm text-gray-500">
                      {art.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {selectedArtwork && <ArtworkModal />}
    </section>
  )
}
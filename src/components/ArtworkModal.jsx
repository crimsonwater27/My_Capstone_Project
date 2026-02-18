import React from "react";
import { useArtStore } from "../store/useArtStore";


export const ArtworkModal = () => {
  const { selectedArtwork, closeModal, wikiData, modalLoading } = useArtStore();

  if (!selectedArtwork) return null; // modal hidden if no artwork selected

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full p-4 relative shadow-lg">
        {/* Close button */}
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-xl font-bold"
        >
          ×
        </button>

        {/* Artwork image */}
        <img
          src={selectedArtwork.image || "/placeholder.png"}
          alt={selectedArtwork.title}
          className="w-full h-96 object-cover rounded mb-4"
        />

        {/* Artwork info */}
        <h2 className="text-2xl font-semibold">{selectedArtwork.title}</h2>
        <p className="text-gray-700">
          {selectedArtwork.artist || "Unknown Artist"} |{" "}
          {selectedArtwork.date || "Unknown Date"}
        </p>

        {/* Wiki summary */}
        <div className="mt-4">
          {modalLoading ? (
            <p className="text-gray-500">Loading artist info...</p>
          ) : wikiData ? (
            <p className="text-gray-700">{wikiData.extract}</p>
          ) : (
            <p className="text-gray-400 italic">
              No additional info available for this artist.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArtworkModal;

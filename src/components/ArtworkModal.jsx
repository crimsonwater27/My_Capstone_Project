import React, { useEffect } from "react";
import { useArtStore } from "../store/useArtStore";
import Spinner from "./Spinner";

export const ArtworkModal = () => {
  const {
    selectedArtwork,
    closeModal,
    wikiData,
    modalLoading,
    modalError,
    selectArtwork,
  } = useArtStore();

  // Lock background scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  if (!selectedArtwork) return null;

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
          src={selectedArtwork.image}
          alt={selectedArtwork.title}
          onError={(e) => (e.target.src = "/12th digital drawing.jpg")}
          className="w-full h-96 object-cover rounded mb-4"
        />

        {/* Artwork info */}
        <h2 className="text-2xl font-semibold">{selectedArtwork.title}</h2>
        <p className="text-gray-700">
          {selectedArtwork.artist || "Unknown Artist"} |{" "}
          {selectedArtwork.date || "Unknown Date"}
        </p>

        {/* Wiki summary / spinner / error */}
        <div className="mt-4 flex flex-col items-center justify-center min-h-[120px]">
          {modalLoading && <Spinner text="Loading artist info..." />}

          {modalError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-center">
              <p className="font-medium">{modalError}</p>
              <button
                onClick={() => selectArtwork(selectedArtwork)}
                className="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                Retry
              </button>
            </div>
          )}

          {!modalLoading && !modalError && wikiData && (
            <p className="text-gray-700">{wikiData.extract}</p>
          )}

          {!modalLoading && !modalError && !wikiData && (
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

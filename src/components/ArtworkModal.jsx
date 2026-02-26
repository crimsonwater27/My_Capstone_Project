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

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  if (!selectedArtwork) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-[#1E1E1E] rounded-3xl max-w-3xl w-full p-6 relative shadow-2xl text-white">
        
        {/* Close button */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl font-bold"
        >
          ×
        </button>

        {/* Artwork image */}
        <img
          src={selectedArtwork.image}
          alt={selectedArtwork.title}
          onError={(e) => (e.target.src = "/12th digital drawing.jpg")}
          className="max-h-[70vh] w-auto h-auto object-contain mx-auto"
        />

        {/* Artwork info */}
        <h2 className="text-2xl font-semibold">{selectedArtwork.title}</h2>
        <p className="text-gray-400">
          {selectedArtwork.artist || "Unknown Artist"} |{" "}
          {selectedArtwork.date || "Unknown Date"}
        </p>

        {/* Wiki summary */}
        <div className="mt-6 min-h-[120px]">
          {modalLoading && <Spinner text="Loading artist info..." />}
          
          {modalError && (
            <div className="bg-red-600/20 border border-red-400 text-red-400 px-4 py-3 rounded">
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
            <p className="text-gray-300">{wikiData.extract}</p>
          )}

          {!modalLoading && !modalError && !wikiData && (
            <p className="text-gray-500 italic">
              No additional info available for this artist.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArtworkModal;
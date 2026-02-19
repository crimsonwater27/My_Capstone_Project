import React, { useEffect } from "react";
import { useArtStore } from "../store/useArtStore";
import Spinner from "./Spinner";


export const ArtworkModal = () => {
  const { selectedArtwork, closeModal, wikiData, modalLoading } = useArtStore();

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
        onError={(e) => (e.target.src = "public/12th digital drawing.jpg")}
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
          <Spinner text="Loading artist info..." />
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

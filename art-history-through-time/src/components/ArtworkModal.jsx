import React from "react";

const ArtworkModal = ({ artwork, onClose, onFavorite }) => {
  if (!artwork) return null;

  return (
    <div>
      <button onClick={onClose}>Close</button>
      <h2>{artwork.title}</h2>
      <img src={artwork.image} alt={artwork.title} width="300" />
      <p>{artwork.description}</p>
      <button onClick={() => onFavorite(artwork)}>
        Add to Favorites
      </button>
    </div>
  );
};

export default ArtworkModal;

import React from "react";

const ArtworkGrid = ({ artworks, onSelect }) => {
  return (
    <div>
      {artworks.map((art) => (
        <div key={art.id} onClick={() => onSelect(art)}>
          <img src={art.image} alt={art.title} width="150" />
          <p>{art.title}</p>
        </div>
      ))}
    </div>
  );
};

export default ArtworkGrid;

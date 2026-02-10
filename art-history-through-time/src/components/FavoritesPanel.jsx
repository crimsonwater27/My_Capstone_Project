import React from "react";

const FavoritesPanel = ({ favorites, onRemove }) => {
  return (
    <div>
      <h2>Favorites</h2>
      {favorites.length === 0 && <p>No favorites yet</p>}

      {favorites.map((art) => (
        <div key={art.id}>
          <span>{art.title}</span>
          <button onClick={() => onRemove(art.id)}>Remove</button>
        </div>
      ))}
    </div>
  );
};

export default FavoritesPanel;

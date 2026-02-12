import React, { useState } from "react";
import { useArtStore } from "../store/useArtStore";


export default function SearchBar() {
  const [query, setQuery] = useState("");
  const fetchArtworks = useArtStore((s) => s.fetchArtworks);

  const handleSearch = () => {
    fetchArtworks(query);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search art, artist, era..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <button onClick={handleSearch}>Search</button>
    </div>
  );
};


import React, { useState } from "react";
import { useArtStore } from "../store/useArtStore";

export default function SearchBar() {
  const { fetchArtworks } = useArtStore();
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    fetchArtworks(query);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="bg-[#1E1E1E] rounded-2xl p-4 shadow-md flex items-center space-x-4"
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search artworks..."
        className="flex-1 bg-[#121212] text-white px-4 py-2 rounded-lg outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-yellow-400 transition"
      />

      <button
        type="submit"
        className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-lg font-semibold transition"
      >
        Search
      </button>
    </form>
  );
}
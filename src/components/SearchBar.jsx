import { useState } from "react";
import { useArtStore } from "../store/useArtStore";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const fetchArtworks = useArtStore((s) => s.fetchArtworks);

  const handleSearch = () => {
    fetchArtworks(query || "painting");
  };

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search art..."
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

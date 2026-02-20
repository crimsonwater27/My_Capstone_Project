import React from "react";
import { useArtStore } from "../store/useArtStore";

export default function Filters() {
  const {  setYearRange } = useArtStore();

  const eras = [
    { label: "Medieval", range: [1000, 1400] },
    { label: "Renaissance", range: [1401, 1600] },
    { label: "Baroque", range: [1601, 1750] },
    { label: "romanticism", range: [1750, 1850] },
    { label: "Modern", range: [1851, 2000] },
  ];

  return (
    <div className="bg-[#1E1E1E] rounded-2xl p-4 flex flex-col space-y-4 shadow-md">
      <h3 className="text-lg font-semibold text-yellow-400">Filter by Era</h3>

      <div className="flex flex-col space-y-2">
        {eras.map((era) => (
          <button
            key={era.label}
            onClick={() => setYearRange(era.range)}
            className="text-left px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition text-white font-medium"
          >
            {era.label}
          </button>
        ))}
      </div>

      <button
        onClick={() => setYearRange([1400, 1800])}
        className="mt-2 px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold transition"
      >
        Reset Filters
      </button>
    </div>
  );
}
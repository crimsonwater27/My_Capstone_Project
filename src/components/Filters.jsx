import React from "react";
import { useNavigate } from "react-router-dom";

export default function Filters() {
  const navigate = useNavigate();

  const eras = [
    "Medieval",
    "Renaissance",
    "Baroque",
    "Rococo",
    "Romanticism",
    "Realism",
    "Surrealism",
    "Modern Art",
    "Contemporary",
  ];

  return (
    <div className="bg-[#1E1E1E] rounded-2xl p-4 flex flex-col space-y-4 shadow-md">
      <h3 className="text-lg font-semibold text-yellow-400">
        Browse by Era
      </h3>

      <div className="flex flex-col space-y-2">
        {eras.map((era) => (
          <button
            key={era}
            onClick={() => navigate(`/dashboard/${era}`)}
            className="text-left px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition text-white font-medium"
          >
            {era}
          </button>
        ))}
      </div>

      <button
        onClick={() => navigate("/dashboard")}
        className="mt-2 px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold transition"
      >
        Reset
      </button>
    </div>
  );
}
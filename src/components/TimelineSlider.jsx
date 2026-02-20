import React from "react";

export default function TimelineSlider({ yearRange = [1400, 2000], setYearRange }) {
  const [start, end] = yearRange;

  const handleStartChange = (e) => {
    const newStart = Number(e.target.value);
    if (newStart <= end) setYearRange([newStart, end]);
  };

  const handleEndChange = (e) => {
    const newEnd = Number(e.target.value);
    if (newEnd >= start) setYearRange([start, newEnd]);
  };

  return (
    <div className="bg-[#1E1E1E] rounded-2xl p-4 space-y-3 shadow-md">
      <div className="flex justify-between items-center">
        <h2 className="text-white font-semibold">Timeline</h2>
        <span className="text-gray-400 text-sm">{start} — {end}</span>
      </div>

      {/* Sliders */}
      <div className="space-y-2">
        <input
          type="range"
          min="1000"
          max="2000"
          value={start}
          onChange={handleStartChange}
          className="w-full accent-yellow-400"
        />
        <input
          type="range"
          min="1000"
          max="2000"
          value={end}
          onChange={handleEndChange}
          className="w-full accent-yellow-400"
        />
      </div>
    </div>
  );
}
import { useArtStore } from "../store/useArtStore";

export default function TimelineSlider() {
  const  yearRange = useArtStore((s) => s.yearRange);
  const setYearRange = useArtStore((s) => s.setYearRange);

  const updateMin = (e) => {
    setYearRange([Number(e.target.value), yearRange[1]]);
  };

  const updateMax = (e) => {
    setYearRange([yearRange[0], Number(e.target.value)]);
  };

  return (
    <div>
      <h2>Timeline</h2>

      <p>
        {yearRange[0]} — {yearRange[1]}
      </p>

      
      <input
        type="range"
        min="1000"
        max="2000"
        value={yearRange[0]}
        onChange={updateMin}
      />

      <input
        type="range"
        min="1000"
        max="2000"
        value={yearRange[1]}
        onChange={updateMax}
      />
    </div>
  );
}

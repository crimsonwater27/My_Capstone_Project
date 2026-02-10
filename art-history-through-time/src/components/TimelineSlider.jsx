import { useArtStore } from "../store/useArtStore";

export default function TimelineSlider() {
  const { yearRange, setYearRange } = useArtStore();

  const handleStartChange = (e) => {
    setYearRange([Number(e.target.value), yearRange[1]]);
  };

  const handleEndChange = (e) => {
    setYearRange([yearRange[0], Number(e.target.value)]);
  };

  return (
    <div>
      <h2>Timeline</h2>

      <p>
        {yearRange[0]} — {yearRange[1]}
      </p>

      {/* START YEAR */}
      <input
        type="range"
        min="1000"
        max="2000"
        value={yearRange[0]}
        onChange={handleStartChange}
      />

      {/* END YEAR */}
      <input
        type="range"
        min="1000"
        max="2000"
        value={yearRange[1]}
        onChange={handleEndChange}
      />
    </div>
  );
}

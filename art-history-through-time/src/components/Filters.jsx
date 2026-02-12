import { useArtStore } from "../store/useArtStore";

export default function Filters() {
  const setYearRange = useArtStore((s) => s.setYearRange);

  return (
    <div>
      <button onClick={() => setYearRange([1400, 1600])}>
        Renaissance
      </button>

      <button onClick={() => setYearRange([1600, 1800])}>
        Baroque
      </button>

      <button onClick={() => setYearRange([1800, 2000])}>
        Modern
      </button>
    </div>
  );
}

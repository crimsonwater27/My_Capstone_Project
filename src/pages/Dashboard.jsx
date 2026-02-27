import { useEffect, lazy, Suspense } from "react";
import { useParams } from "react-router-dom";
import { useArtStore } from "../store/useArtStore";
import { motion as Motion } from "framer-motion";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";
import ArtworkGrid from "../components/ArtworkGrid";
import TimelineSlider from "../components/TimelineSlider";
import SearchBar from "../components/SearchBar";
import Filters from "../components/Filters";
import FavoritesPanel from "../components/FavoritesPanel";
import ModalSkeleton from "../components/ModalSkeleton";

const ArtworkModal = lazy(() => import("../components/ArtworkModal"));

export default function Dashboard() {
  const { era } = useParams();

  const fetchArtworks = useArtStore((s) => s.fetchArtworks);
  const artworks = useArtStore((s) => s.filteredArtworks);
  const selectedArtwork = useArtStore((s) => s.selectedArtwork);
  const loading = useArtStore((s) => s.loading);
  const error = useArtStore((s) => s.error);
  const yearRange = useArtStore((s) => s.yearRange);
  const setYearRange = useArtStore((s) => s.setYearRange);

  const eraThemes = {
    Renaissance: "text-amber-300",
    Baroque: "text-purple-400",
    Romanticism: "text-pink-400",
    "Modern Art": "text-cyan-400",
    Contemporary: "text-green-400",
    Rococo: "text-yellow-400",
    Realism: "text-blue-400",
    Surrealism: "text-indigo-400",
  };

  useEffect(() => {
    if (era) fetchArtworks(era);
    else fetchArtworks("painting");
  }, [fetchArtworks, era]);

  if (loading) return <Spinner text="Loading artworks..." />;

  if (error)
    return <ErrorMessage message={error} onRetry={() => fetchArtworks(era || "painting")} />;

  return (
    <section
      className={`min-h-screen w-full bg-[#121212] overflow-x-hidden ${
        eraThemes[era] || "text-yellow-300"
      } transition-colors duration-500`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-8 space-y-8">

        {/* Search + Filters */}
        <div className="space-y-4">
          <SearchBar />
          <Filters />
          <TimelineSlider yearRange={yearRange} setYearRange={setYearRange} />
        </div>

        {/* Grid + Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Panel */}
          <div className="lg:col-span-3 space-y-6">
            <h1 className={`text-xl sm:text-2xl md:text-3xl font-bold ${eraThemes[era] || "text-yellow-300"}`}>
              {era ? `${era} Artworks` : "Artwork Images"}
            </h1>

            <Motion.div
              key={era}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ArtworkGrid artworks={artworks} />
            </Motion.div>
          </div>

          <div className="lg:col-span-1">
            <FavoritesPanel />
          </div>
        </div>
      </div>

      {selectedArtwork && (
        <Suspense fallback={<ModalSkeleton />}>
          <ArtworkModal />
        </Suspense>
      )}
    </section>
  );
}
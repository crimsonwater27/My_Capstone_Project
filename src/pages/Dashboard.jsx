import { useEffect, useState, lazy, Suspense } from "react";
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

  // Mobile accordion state
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [favoritesOpen, setFavoritesOpen] = useState(false);

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
    return (
      <ErrorMessage
        message={error}
        onRetry={() => fetchArtworks(era || "painting")}
      />
    );

  return (
    <section
      className={`min-h-screen w-full bg-[#121212] overflow-x-hidden ${
        eraThemes[era] || "text-yellow-300"
      } transition-colors duration-500`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-8 space-y-8">

        {/* ------------------------------
            Search
        ------------------------------ */}
        <SearchBar />

        {/* ------------------------------
            Filters Accordion (Mobile)
        ------------------------------ */}
        <div className="lg:hidden">
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className="w-full bg-neutral-800 rounded-xl p-4 flex justify-between items-center font-semibold"
          >
            Filters
            <span>{filtersOpen ? "−" : "+"}</span>
          </button>

          <div
            className={`overflow-hidden transition-all duration-300 ${
              filtersOpen ? "max-h-screen opacity-100 mt-4" : "max-h-0 opacity-0 ease-in-out"
            }`}
          >
            <div className="space-y-4">
              <Filters />
              <TimelineSlider
                yearRange={yearRange}
                setYearRange={setYearRange}
              />
            </div>
          </div>
        </div>

        {/* ------------------------------
            Desktop Filters
        ------------------------------ */}
        <div className="hidden lg:block space-y-4">
          <Filters />
          <TimelineSlider
            yearRange={yearRange}
            setYearRange={setYearRange}
          />
        </div>

        {/* ------------------------------
            Main Layout
        ------------------------------ */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          {/* Main Panel */}
          <div className="lg:col-span-3 space-y-6">
            <h1
              className={`text-xl sm:text-2xl md:text-3xl font-bold ${
                eraThemes[era] || "text-yellow-300"
              }`}
            >
              {era ? `${era} Artworks` : "Artwork Images"}
            </h1>

            <Motion.div
              key={era}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <ArtworkGrid artworks={artworks} />
            </Motion.div>
          </div>

          {/* Favorites Sidebar */}
          <div className="lg:col-span-1">

            {/* Mobile Accordion */}
            <div className="lg:hidden">
              <button
                onClick={() => setFavoritesOpen(!favoritesOpen)}
                className="w-full bg-neutral-800 rounded-xl p-4 flex justify-between items-center font-semibold"
              >
                Favorites
                <span>{favoritesOpen ? "−" : "+"}</span>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  favoritesOpen
                    ? "max-h-[600px] opacity-100 mt-4"
                    : "max-h-0 opacity-0"
                }`}
              >
                <FavoritesPanel />
              </div>
            </div>

            {/* Desktop Sidebar */}
            <div className="hidden lg:block">
              <FavoritesPanel />
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedArtwork && (
        <Suspense fallback={<ModalSkeleton />}>
          <ArtworkModal />
        </Suspense>
      )}
    </section>
  );
}
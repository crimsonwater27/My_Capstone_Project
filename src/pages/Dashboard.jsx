import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useArtStore } from "../store/useArtStore";
import { Motion } from "framer-motion";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";
import ArtworkGrid from "../components/ArtworkGrid";
import TimelineSlider from "../components/TimelineSlider";
import SearchBar from "../components/SearchBar";
import Filters from "../components/Filters";
import ArtworkModal from "../components/ArtworkModal";
import FavoritesPanel from "../components/FavoritesPanel";

export default function Dashboard() {
  const { era } = useParams();

  const {
    fetchArtworks,
    filteredArtworks: artworks,
    selectedArtwork,
    loading,
    error,
    yearRange,
    setYearRange,
  } = useArtStore();
  
  const eraThemes = {
  Renaissance: "text-amber-300",
  Baroque: "text-purple-400",
  Romanticism: "text-pink-400",
  "Modern Art": "text-cyan-400",
};

  useEffect(() => {
    fetchArtworks(era || "painting");
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
      className={`space-y-6 min-h-screen bg-[#121212] ${
        eraThemes[era] || "text-yellow-300"
        } transition-colors duration-500`}
        >

      {/* Search + Filters */}
      <div className="space-y-4 px-4 sm:px-6 lg:px-8">
        <SearchBar />
        <Filters />
        <TimelineSlider yearRange={yearRange} setYearRange={setYearRange} />
      </div>

      {/* Grid + Sidebar */}
      <div className="grid lg:grid-cols-4 gap-6 items-start justify-center px-4 sm:px-6 lg:px-8 py-6">

        {/* Main Panel */}
        <div className="lg:col-span-3 space-y-6">
          <h1
          className={`text-xl md:text-2xl font-bold ${eraThemes[era] || "text-yellow-300"}`}
          >
            {era ? `${era} Artworks` : "Artwork Images"}
          </h1>
          
          <Motion
            key={era}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ArtworkGrid artworks={artworks} />
          </Motion>
        </div>


        {/* Sidebar */}
        <div className="lg:col-span-1">
          <FavoritesPanel />
        </div>

      </div>

      {selectedArtwork && <ArtworkModal />}
    </section>
  );
}
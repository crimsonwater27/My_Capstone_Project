export default function Dashboard() {
  const artworks = Array.from({ length: 12 });

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      
      {/* TOP NAV */}
      <header className="h-18 border-b border-white/10 flex items-center justify-between px-8">
        <h1 className="text-xl font-semibold tracking-wide">
          Art History Through Time
        </h1>

        <nav className="flex gap-8 text-sm text-white/80">
          <button className="hover:text-white">Explore</button>
          <button className="hover:text-white">Timeline</button>
          <button className="hover:text-white">Favorites</button>
        </nav>
      </header>

      {/* MAIN LAYOUT */}
      <div className="flex">
        
        {/* SIDEBAR */}
        <aside className="w-[280px] border-r border-white/10 p-6 space-y-6">
          
          <div>
            <input
              placeholder="Search artworks..."
              className="w-full bg-[#1E1E1E] rounded-lg px-4 py-2 text-sm outline-none"
            />
          </div>

          <div>
            <h3 className="text-sm mb-2 text-white/60">Era</h3>
            <div className="space-y-2">
              <button className="block text-left hover:text-white/80">Renaissance</button>
              <button className="block text-left hover:text-white/80">Baroque</button>
              <button className="block text-left hover:text-white/80">Modern</button>
            </div>
          </div>

          <button className="text-sm text-white/50 hover:text-white">
            Reset Filters
          </button>
        </aside>

        {/* MAIN PANEL */}
        <main className="flex-1 p-8 space-y-8">
          
          {/* TIMELINE CARD */}
          <div className="bg-[#1E1E1E] rounded-2xl p-6 space-y-4">
            <div className="flex justify-between">
              <h2 className="text-lg">Timeline</h2>
              <span className="text-sm text-white/60">1400 — 1600</span>
            </div>

            <div className="h-2 bg-white/10 rounded-full relative">
              <div className="absolute left-1/4 right-1/4 h-2 bg-white rounded-full"></div>
            </div>
          </div>

          {/* ART GRID */}
          <div className="grid grid-cols-4 gap-6">
            {artworks.map((_, i) => (
              <div
                key={i}
                className="bg-[#1E1E1E] rounded-2xl overflow-hidden group hover:scale-[1.02] transition"
              >
                <div className="h-48 bg-gray-700"></div>

                <div className="p-4 space-y-1">
                  <h3 className="text-sm font-medium">Artwork Title</h3>
                  <p className="text-xs text-white/60">Artist Name</p>
                  <p className="text-xs text-white/40">1503</p>
                </div>
              </div>
            ))}
          </div>

        </main>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [eras, setEras] = useState({});
  const navigate = useNavigate();

  const eraList = [
    "Renaissance",
    "Baroque",
    "Romanticism",
    "Modern Art",
    "Contemporary",
    "Rococo",
    "Realism",
    "Surrealism",
  ];

  useEffect(() => {
    async function fetchArtworks() {
      const results = {};

      for (let era of eraList) {
        try {
          const searchRes = await fetch(
            `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${era}&hasImages=true`
          );
          const searchData = await searchRes.json();
          const objectIDs = searchData.objectIDs?.slice(0, 1);

          if (objectIDs) {
            const objRes = await fetch(
              `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectIDs[0]}`
            );
            const objData = await objRes.json();
            results[era] = objData.primaryImageSmall;
          }
        } catch (error) {
          console.error("Error fetching", era, error);
        }
      }

      setEras(results);
    }

    fetchArtworks();
  }, []);

  return (
    <div className="min-h-screen w-full bg-black text-yellow-300 overflow-x-hidden">

      {/* HERO */}
      <section
        className="min-h-screen flex items-center bg-cover bg-center px-6 sm:px-10 lg:px-20"
        style={{
          backgroundImage:
            "url('https://images.metmuseum.org/CRDImages/ep/original/DP-14286-001.jpg')",
        }}
      >
        <div className="max-w-3xl">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl italic leading-tight text-yellow-200">
            Explore Art Across Centuries
          </h1>

          <p className="mt-6 text-base sm:text-lg md:text-xl text-yellow-400 italic">
            Take a walk in time and discover history through art.
          </p>

          <button
            onClick={() =>
              window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
            }
            className="mt-10 bg-neutral-900 px-6 py-3 sm:px-8 sm:py-4 rounded-xl text-yellow-400 text-base sm:text-lg hover:bg-neutral-800 transition"
          >
            Start Exploring
          </button>
        </div>
      </section>

      {/* FEATURED ERAS */}
      <section className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-16">
        <h2 className="text-2xl sm:text-3xl md:text-4xl italic text-yellow-400 mb-12">
          Featured Eras
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {eraList.map((era) => (
            <div
              key={era}
              onClick={() => navigate(`/dashboard/${encodeURIComponent(era)}`)}
              className="cursor-pointer group"
            >
              <div
                className="aspect-[3/4] bg-cover bg-center rounded-xl relative overflow-hidden transform hover:scale-105 transition duration-500"
                style={{
                  backgroundImage: `url(${eras[era]})`,
                }}
              >
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition" />

                <h3 className="absolute bottom-4 left-4 text-yellow-300 italic text-lg sm:text-xl">
                  {era}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
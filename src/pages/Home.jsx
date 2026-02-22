import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [eras, setEras] = useState({});
  const navigate = useNavigate();

  const eraList = ["Renaissance", "Baroque", "Romanticism", "Modern Art"];

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
    <div className="bg-black text-white">

      {/* HERO SECTION (Landing merged) */}
      <section
        className="h-screen bg-cover bg-center flex items-center px-16"
        style={{
          backgroundImage:
            "url('https://images.metmuseum.org/CRDImages/ep/original/DP-14286-001.jpg')",
        }}
      >
        <div className="max-w-3xl">
          <h1 className="text-6xl md:text-7xl italic text-yellow-200 leading-tight">
            Explore Art Across Centuries
          </h1>

          <p className="mt-6 text-lg text-yellow-300 italic">
            Take a walk in time and discover history through art.
          </p>

          <button
            onClick={() =>
              window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
            }
            className="mt-10 bg-neutral-900 px-8 py-4 rounded-xl text-yellow-400 text-lg hover:bg-neutral-800 transition"
          >
            Start Exploring
          </button>
        </div>
      </section>

      {/* FEATURED ERAS */}
      <section className="px-12 py-24">
        <h2 className="text-4xl italic text-yellow-400 mb-12">
          Featured Eras
        </h2>

        <div className="grid md:grid-cols-4 gap-10">
          {eraList.map((era) => (
            <div
              key={era}
              onClick={() => navigate(`/dashboard/${encodeURIComponent(era)}`)}
              className="cursor-pointer group"
            >
              <div
                className="h-72 bg-cover bg-center rounded-xl relative overflow-hidden transform hover:scale-105 transition duration-500"
                style={{
                  backgroundImage: `url(${eras[era]})`,
                }}
              >
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition" />

                <h3 className="absolute bottom-6 left-6 text-yellow-300 italic text-xl">
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
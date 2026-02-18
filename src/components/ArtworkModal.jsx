import { useArtStore } from "../store/useArtStore";
import Loader from "./Loader";

export default function ArtworkModal() {
  const { selectedArtwork, closeModal, wikiData, modalLoading } = useArtStore();

  if (!selectedArtwork) return null;

return (
  <div className="fixed inset-0 bg-black/60 flex justify-center items-center">
    <div className="bg-white p-6 max-w-lg w-full relative">
      <button onClick={closeModal} className="absolute top-2 right-2">
        ✕
      </button>

      <img
        src={selectedArtwork.primaryImageSmall}
        alt={selectedArtwork.title}
        className="w-full mb-4"
      />

      <h2 className="text-xl font-bold">{selectedArtwork.title}</h2>
      <p>{selectedArtwork.artistDisplayName}</p>
      <p>{selectedArtwork.objectDate}</p>

      {modalLoading && <Loader />}

      {wikiData && (
        <div className="mt-4 text-sm">
          <p>{wikiData.extract}</p>
          <a href={wikiData.url} target="_blank">
            Read more on Wikipedia
          </a>
        </div>
      )}
    </div>
  </div>
);
}

import { useArtStore } from "../store/useArtStore";

export default function ArtworkModal() {
  const art = useArtStore ((s) => s.selectedArtwork);
  const close = useArtStore((s) => s.setSelectedArtwork);

  if (!art) return null;

  return (
    <div>
      <button onClick={() => close (null)}>Close</button>
      
      <h2>{art.title}</h2>
      <img src={art.primaryImageSmall} alt={art.title} width="300" />
      <p>{art.artistDisplayName}</p>
      <p>{art.date}</p>

      <h3>About</h3>
      <p>{art.wiki?.extract}</p>

      {art.wiki?.wikiUrl &&(
        <a href={art.wiki.wikiUrl} target="_blank">
          Read more
        </a>
      )}

    </div>
  );
};



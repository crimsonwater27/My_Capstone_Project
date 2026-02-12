import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { searchArtworks } from "../services/metMuseumApi";

export default function ArtworkDetail() {
  const { id } = useParams();
  const [art, setArt] = useState(null);

  useEffect(() => {
    searchArtworks(id).then(setArt);
  }, [id]);

  if (!art) return <p>Loading...</p>;

  return (
    <div>
      <h2>{art.title}</h2>
      <img src={art.primaryImage} width="300" />
      <p>{art.artistDisplayName}</p>
      <p>{art.objectDate}</p>
    </div>
  );
}

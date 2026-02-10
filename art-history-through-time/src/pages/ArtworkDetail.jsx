import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getArtwork } from "../services/museumApi";

export default function ArtworkDetail() {
  const { id } = useParams();
  const [art, setArt] = useState(null);

  useEffect(() => {
    getArtwork(id).then(setArt);
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

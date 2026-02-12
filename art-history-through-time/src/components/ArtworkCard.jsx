import {Link} from "react-router-dom";
import {useArtStore} from "../store/useArtStore";

export default function ArtworkCard({ art }) {
    const setSelected = useArtStore((s) => s.setSelectedArtwork);
    const { addFavorite } = useArtStore();

    return (
        <div>
            <img src={art.primaryImageSmall} width="200"/>

            <h3>{art.title}</h3>
            <p>{art.artistDisplayName}</p>

            <Link to={`/art/${art.objectID}`}>View Details</Link>

            <button onClick={() => setSelected(art)}>View</button>
            <button onClick={() => addFavorite(art)}>Add to Favorites</button>
        </div>

    );
}
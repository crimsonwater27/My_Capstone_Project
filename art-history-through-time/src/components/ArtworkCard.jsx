import {Link} from "react-router-dom";
import {usestore} from "../store/useArtStore";

export default function ArtworkCard({ art}) {
    const { addFavorite } = usestore();

    return (
        <div>
            <img src={art.primaryImageSmall} width="150"/>

            <p>{art.title}</p>
            <p>{art.artistDisplayName}</p>

            <Link to={`/art/${art.objectID}`}>View Details</Link>


            <button onClick={() => addFavorite(art)}>Add to Favorites</button>
        </div>

    );
}
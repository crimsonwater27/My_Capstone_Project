import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div>
      <h1>Art History Through Time</h1>

      <p>
        Explore artworks across centuries using an interactive timeline.
      </p>

      <Link to="/home">
        <button>Enter App</button>
      </Link>
    </div>
  );
}

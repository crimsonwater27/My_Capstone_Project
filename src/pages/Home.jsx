import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <h1>Home</h1>

      <nav>
        <Link to="/dashboard">
          <button>Explore Timeline</button>
        </Link>

        <Link to="/favorites">
          <button>Favorites</button>
        </Link>
      </nav>
    </div>
  );
}

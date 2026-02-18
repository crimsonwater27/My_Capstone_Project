import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-full space-y-6">
      <h1 className="text-3xl font-bold">Welcome to Art History Through Time</h1>

      <nav className="flex flex-col space-y-4">
        <Link to="/dashboard">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Explore Timeline
          </button>
        </Link>

        <Link to="/favorites">
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Favorites
          </button>
        </Link>
      </nav>
    </div>
  );
}

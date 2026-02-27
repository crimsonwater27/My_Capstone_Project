import { Link } from "react-router-dom";
import { useArtStore } from "../store/useArtStore";

export default function Header() {
  const { user, logout } = useArtStore();

  return (
    <header className="w-full bg-[#121212] border-b border-yellow-500/20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col sm:flex-row items-center justify-between py-4 gap-4">

          <Link
            to="/"
            className="font-bold text-lg sm:text-xl text-yellow-400 text-center sm:text-left"
          >
            Art History Through Time
          </Link>

          <nav className="flex flex-wrap justify-center sm:justify-end gap-4 text-sm sm:text-base text-yellow-300">
            <Link to="/" className="hover:text-yellow-400 transition font-medium">
              Home
            </Link>

            <Link to="/dashboard" className="hover:text-yellow-400 transition font-medium">
              Dashboard
            </Link>

            <Link to="/favorites" className="hover:text-yellow-400 transition font-medium">
              Favorites
            </Link>

            {user ? (
              <button
                onClick={logout}
                className="text-red-400 hover:text-red-600 transition font-medium"
              >
                Logout
              </button>
            ) : (
              <Link to="/login" className="hover:text-yellow-400 transition font-medium">
                Login
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
import { Link } from "react-router-dom";
import { useArtStore } from "../store/useArtStore";

export default function Header() {
  const { user, logout } = useArtStore();

  return (
    <header className="w-full border-b bg-[#121212]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link
            to="/"
            className="font-bold text-lg md:text-xl text-yellow-400"
          >
            Art History Through Time
          </Link>

          {/* Nav */}
          <nav className="flex gap-4 text-sm md:text-base text-yellow-300">
            <Link
              to="/"
              className="hover:text-yellow-400 transition-colors duration-200 font-medium"
            >
              Home
            </Link>

            <Link
              to="/dashboard"
              className="hover:text-yellow-400 transition-colors duration-200 font-medium"
            >
              Dashboard
            </Link>

            <Link
              to="/favorites"
              className="hover:text-yellow-400 transition-colors duration-200 font-medium"
            >
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
              <Link
                to="/login"
                className="hover:text-yellow-400 transition font-medium"
              >
                Login
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}

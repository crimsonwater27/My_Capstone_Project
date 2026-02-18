import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="w-full border-b bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="font-bold text-lg md:text-xl">
            Art History Through Time
          </Link>

          {/* Nav */}
          <nav className="flex gap-4 text-sm md:text-base">
            <Link to="/">Home</Link>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/favorites">Favorites</Link>
          </nav>

        </div>
      </div>
    </header>
  );
}

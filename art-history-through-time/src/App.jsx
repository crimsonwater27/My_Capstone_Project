import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import ArtworkDetail from "./pages/ArtworkDetail";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-neutral-50">
      <Header />

      <main className="flex-1 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/artwork/:id" element={<ArtworkDetail />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;

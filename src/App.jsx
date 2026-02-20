import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import ArtworkDetail from "./pages/ArtworkDetail";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";
import ArtworkModal from "./components/ArtworkModal";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-121212 text-white">
      <Header />

      <main className="flex-1 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/artwork/:id" element={<ArtworkDetail />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/modal" element={<ArtworkModal />} />
          <Route path="/login" element={<LoginPage />} />
          {/* Protected Routes */}
          <Route
            path="/favorites"
            element={
              <ProtectedRoute>
                <Favorites />
              </ProtectedRoute>
            }
          />
        </Routes>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;

import { Navigate } from "react-router-dom";
import { useArtStore } from "../store/useArtStore";

export default function ProtectedRoute({ children }) {
  const { user } = useArtStore();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
import { Navigate } from "react-router-dom";
import Loader from "../ui/Loader";
import { useAuth } from "../../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <Loader />;

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  return children;
}

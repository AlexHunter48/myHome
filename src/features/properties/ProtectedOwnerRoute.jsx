import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Loader from "../../components/ui/Loader";

export default function ProtectedOwnerRoute({ children }) {
  const { isAuthenticated, isOwner, loading } = useAuth();
  if (loading) return <Loader />;
  if (!isAuthenticated || !isOwner) {
    console.log(isAuthenticated, isOwner);
    return <Navigate to="/properties" replace />;
  }
  return <div>{children}</div>;
}

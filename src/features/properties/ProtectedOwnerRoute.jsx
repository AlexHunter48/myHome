import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function ProtectedOwnerRoute({ children }) {
  const { isAuthenticated, isOwner } = useAuth();
  if (!isAuthenticated || !isOwner) {
    return <Navigate to="/properties" replace />;
  }
  return <div>{children}</div>;
}

import { Navigate, Outlet } from "react-router-dom";
import HomePage from "../pages/HomePage";
import { useAuthStore } from "../store/auth.store";

function ProtectedRoute() {
  const {isAuthenticated, loading} = useAuthStore(); // replace with real auth logic

   if (loading) return null;

  // 🔐 block access if not logged in
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  // ✅ allow access
  return <Outlet />;
}

export default ProtectedRoute;

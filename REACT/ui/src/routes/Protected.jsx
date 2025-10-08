import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Protected({ role }) {
  const { isAuthenticated, userType } = useAuth();

  // not logged in
  if (!isAuthenticated) {return <Navigate to="/" replace />;}

  // role mismatch
  if (role && userType !== role) {
    return userType === "admin"
      ? <Navigate to="/dashboard" replace />
      : <Navigate to="/home" replace />;
  }

  return <Outlet />;
}

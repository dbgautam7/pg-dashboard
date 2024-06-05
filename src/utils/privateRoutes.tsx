import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function PrivateRoutes() {
  const { auth } = useAuth();

  return auth?.token ? <Outlet /> : <Navigate to="/auth" />;
}

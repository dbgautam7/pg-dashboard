import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const AuthGuard: React.FC = () => {
  const { auth } = useAuth();
  return auth.token ? <Navigate to="/" /> : <Outlet />;
};

export default AuthGuard;

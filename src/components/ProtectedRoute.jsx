import { useState, useEffect, useCallback } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { user } from "../models/userModel";
import Spinner from "./Spinner";
import useGetToken from "../hooks/useGetToken";
import { useNavigate } from "react-router-dom";

const useAuth = (redirectTo = "/") => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const token = useGetToken();
  const navigate = useNavigate();

  const verifyToken = useCallback(async () => {
    try {
      const userData = await user(token);

      if (userData.success) {
        setAuthenticated(true);
      } else {
        navigate(redirectTo);
      }

      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }, [token]);

  useEffect(() => {
    verifyToken();
  }, [verifyToken]);

  return [loading, authenticated];
};

const ProtectedRoute = ({ children, redirectTo = "/login" }) => {
  const [loading, authenticated] = useAuth(redirectTo);

  return loading ? (
    <Spinner text="Cargando..." />
  ) : authenticated ? (
    children ? (
      children
    ) : (
      <Outlet />
    )
  ) : (
    <Navigate to={redirectTo} />
  );
};

export default ProtectedRoute;

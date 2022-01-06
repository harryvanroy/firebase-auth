import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: JSX.Element;
}
export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { currentUser } = useAuth();
  console.log(currentUser);
  return currentUser != null ? children : <Navigate to="/login" />;
};

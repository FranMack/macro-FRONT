import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface RouteProps {
  children: ReactNode;
}

export const PrivateRouter = ({ children }: RouteProps) => {
  const userDataString = localStorage.getItem("userData");

  return userDataString ? children : <Navigate to="/login" />;
};

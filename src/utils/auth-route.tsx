import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { PUBLIC_ROUTES } from "../config/routes";
import { getCurrentUser } from "../actions/auth";

export const AuthRoute = () => {
  const result = getCurrentUser();

  return result.ok === false ? (
    <Navigate to={PUBLIC_ROUTES.login} replace />
  ) : (
    <Outlet />
  );
};

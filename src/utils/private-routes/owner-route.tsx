import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { getCurrentUser } from "../../actions/auth";
import { ROLE } from "../../constants/constants";
import { PUBLIC_ROUTES } from "../../config/routes";

export const OwnerRoute = () => {
  const result = getCurrentUser();

  return result.user.role === ROLE.owner ? (
    <Outlet />
  ) : (
    <Navigate to={PUBLIC_ROUTES.error404} replace />
  );
};

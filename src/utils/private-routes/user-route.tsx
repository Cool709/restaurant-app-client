import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { getCurrentUser } from "../../actions/auth";
import { ROLE } from "../../constants/constants";
import { PUBLIC_ROUTES } from "../../config/routes";

// ====================
// Route for user
// ====================
export const UserRoute = () => {
  const result = getCurrentUser();

  return result.user.role === ROLE.user ? (
    <Outlet />
  ) : (
    <Navigate to={PUBLIC_ROUTES.error404} replace />
  );
};

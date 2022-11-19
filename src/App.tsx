import { Suspense } from "react";
import {
  Route,
  Routes,
  BrowserRouter as Router,
  Navigate,
} from "react-router-dom";

import { PRIVATE_ROUTES, PUBLIC_ROUTES } from "./config/routes";
import { AuthRoute } from "./utils/auth-route";
import { UserRoute } from "./utils/private-routes/user-route";
import { AdminRoute } from "./utils/private-routes/admin-route";
import { OwnerRoute } from "./utils/private-routes/owner-route";

import { Provider } from "./Provider";
import { Layout } from "./layouts/layout";

import { NotFoundPage } from "./pages/404";
import { SignIn } from "./pages/signin";
import { SignUp } from "./pages/signup";
import { Home } from "./pages/home";
import { Admin } from "./pages/admin";
import { Details } from "./pages/details";
import { Restaurants } from "./pages/restaurants";
import { LeaveComment } from "./pages/leave-comment";

function App() {
  return (
    <Suspense fallback={<>Loading</>}>
      <Router>
        <Provider>
          <Layout>
            <Routes>
              {/* PUBLIC_ROUTES */}
              <Route path={PUBLIC_ROUTES.signup} element={<SignUp />} />
              <Route path={PUBLIC_ROUTES.login} element={<SignIn />} />
              <Route path={PUBLIC_ROUTES.default} element={<SignIn />} />
              <Route path={PUBLIC_ROUTES.error404} element={<NotFoundPage />} />
              {/* PRIVATE (AUTH) ROUTES */}
              <Route element={<AuthRoute />}>
                {/* USER ROUTES */}
                <Route element={<UserRoute />}>
                  <Route path={PRIVATE_ROUTES.home} element={<Home />} />
                </Route>
                {/* OWNER ROUTES */}
                <Route element={<OwnerRoute />}>
                  <Route
                    path={PRIVATE_ROUTES.restaurants}
                    element={<Restaurants />}
                  />
                </Route>
                {/* ADMIN ROUTES */}
                <Route element={<AdminRoute />}>
                  <Route path={PRIVATE_ROUTES.admin} element={<Admin />} />
                </Route>
                {/* AUTH */}
                <Route
                  path={`${PRIVATE_ROUTES.detail}/:id`}
                  element={<Details />}
                />
                <Route
                  path={`${PRIVATE_ROUTES.leaveComment}/:id`}
                  element={<LeaveComment />}
                />
              </Route>
              {/* ERROR 404 */}
              <Route
                path="*"
                element={<Navigate to={PUBLIC_ROUTES.error404} replace />}
              />
            </Routes>
          </Layout>
        </Provider>
      </Router>
    </Suspense>
  );
}

export default App;

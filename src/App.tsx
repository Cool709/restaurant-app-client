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
import { ReplyComment } from "./pages/reply-comment";
import { UpdateUser } from "./pages/user/update-user";
import { CreateUser } from "./pages/user/create-user";
import { CreateRestaurant } from "./pages/restaurant/create-restaurant";
import { UpdateRestaurant } from "./pages/restaurant/update-restaurant";
import { CreateComment } from "./pages/comment/create-comment";
import { UpdateComment } from "./pages/comment/update-comment";
import { ReplyCommentAdmin } from "./pages/review/reply-comment";
import { UpdateReview } from "./pages/review/update-review";

// ====================
// Base
// ====================
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
                  <Route
                    path={PRIVATE_ROUTES.create + PRIVATE_ROUTES.user}
                    element={<CreateUser />}
                  />
                  <Route
                    path={`${PRIVATE_ROUTES.update + PRIVATE_ROUTES.user}/:id`}
                    element={<UpdateUser />}
                  />
                  <Route
                    path={PRIVATE_ROUTES.create + PRIVATE_ROUTES.restaurant}
                    element={<CreateRestaurant />}
                  />
                  <Route
                    path={`${
                      PRIVATE_ROUTES.update + PRIVATE_ROUTES.restaurant
                    }/:id`}
                    element={<UpdateRestaurant />}
                  />
                  <Route
                    path={`${
                      PRIVATE_ROUTES.create + PRIVATE_ROUTES.comment
                    }/:id`}
                    element={<CreateComment />}
                  />
                  <Route
                    path={`${
                      PRIVATE_ROUTES.update + PRIVATE_ROUTES.comment
                    }/:id`}
                    element={<UpdateComment />}
                  />
                  <Route
                    path={`${
                      PRIVATE_ROUTES.create + PRIVATE_ROUTES.review
                    }/:id`}
                    element={<ReplyCommentAdmin />}
                  />
                  <Route
                    path={`${
                      PRIVATE_ROUTES.update + PRIVATE_ROUTES.review
                    }/:id`}
                    element={<UpdateReview />}
                  />
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
                <Route
                  path={`${PRIVATE_ROUTES.replyComment}/:id`}
                  element={<ReplyComment />}
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

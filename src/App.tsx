import { Suspense } from "react";
import {
  Route,
  Switch,
  Redirect,
  BrowserRouter as Router,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { PUBLIC_ROUTES } from "./config/routes";

import { Layout } from "./layouts/layout";

import { NotFoundPage } from "./pages/404";

function App() {
  return (
    <Suspense
      fallback={() => {
        <div>Loading</div>;
      }}
    >
      <Router>
        <Layout>
          <Switch>
            <Route
              path={PUBLIC_ROUTES.error404}
              exact
              render={() => <NotFoundPage />}
            />
            <Redirect to={PUBLIC_ROUTES.error404} />
          </Switch>
          <ToastContainer
            position="bottom-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            theme="light"
          />
        </Layout>
      </Router>
    </Suspense>
  );
}

export default App;

import "./App.css";

import { Container } from "@mui/material";
import NotFound from "pages/NotFound";
import { Route, RouteObject, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Layout/Navbar/Navbar";
import { useAuthState } from "./context/Auth";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import ProfilePage from "./pages/Profile";

const commonRoutes: RouteObject[] = [
  {
    path: "/",
    Component: HomePage,
  },
  { path: "*", Component: NotFound },
];
const authorizedRoutes: RouteObject[] = [
  {
    path: "/profile",
    Component: ProfilePage,
  },
];
const unAuthorizedRoutes: RouteObject[] = [
  {
    path: "/login",
    Component: LoginPage,
  },
];

function App() {
  const { user } = useAuthState();
  const routes = commonRoutes.concat(
    Boolean(user) ? authorizedRoutes : unAuthorizedRoutes
  );
  return (
    <div className="App">
      <Navbar />
      <Container>
        <Routes>
          {routes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              Component={route.Component}
            />
          ))}
        </Routes>
      </Container>
    </div>
  );
}

export default App;

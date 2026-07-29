import { createBrowserRouter, RouterProvider } from "react-router";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import Favourites from "../pages/Favourites";
import ArtistDashboard from "../pages/ArtistDashboard";
import Register from "../pages/Register";
import Login from "../pages/Login";
import AuthLayout from "../layout/AuthLayout";
import Profile from "../pages/Profile";
import Library from "../pages/Library";
import Upload from "../pages/Upload";
import RouteProtection from "./RouteProtection";

const Router = () => {
  let router = createBrowserRouter([
    {
      path: "/",
      element: <AuthLayout />,
      children: [
        {
          path: "",
          element: <Login />,
        },
        {
          path: "register",
          element: <Register />,
        },
      ],
    },
    {
      path: "/main",
      element: <RouteProtection />,
      children: [
        {
          path: "",
          element: <MainLayout />,
          children: [
            {
              index: true,
              element: <Home />,
            },
            {
              path: "profile",
              element: <Profile />,
            },
            {
              path: "library",
              element: <Library />,
            },
            {
              path: "favourites",
              element: <Favourites />,
            },
            {
              path: "artistdashboard",
              element: <ArtistDashboard />,
            },
            {
              path: "upload",
              element: <Upload />,
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;

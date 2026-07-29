import { createBrowserRouter, RouterProvider } from "react-router";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import Favourites from "../pages/Favourites";
import ArtistDashboard from "../pages/ArtistDashboard";
import Register from "../pages/Register";
import Login from "../pages/Login";
import AuthLayout from "../../../Dy13_AuthPractice/src/layout/AuthLayout";

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
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "favourites",
          element: <Favourites />,
        },
        {
          path: "artistdashboard",
          element: <ArtistDashboard />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;

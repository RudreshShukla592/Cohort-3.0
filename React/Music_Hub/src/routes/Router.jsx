import { createBrowserRouter, RouterProvider } from "react-router";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import Favourites from "../pages/Favourites";
import ArtistDashboard from "../pages/ArtistDashboard";
import Register from "../pages/Register";
import Login from "../pages/Login";

const Router = () => {
  let router = createBrowserRouter([
    {
      path: "/",
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
          path: "login",
          element: <Login />,
        },
        {
          path: "register",
          element: <Register />,
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

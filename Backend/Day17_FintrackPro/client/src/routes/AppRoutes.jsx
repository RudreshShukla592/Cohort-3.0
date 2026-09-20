import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import Login from "../feature/auth/ui/pages/Login";
import AuthLayout from "../app/layout/AuthLayout";
import Register from "../feature/auth/ui/pages/Register";
import MainLayout from "../app/layout/MainLayout";
import Dashboard from "../feature/transaction/ui/pages/Dashboard";
import Profile from "../feature/transaction/ui/pages/Profile";

const AppRoutes = () => {
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
      path: "/home",
      element: <MainLayout />,
      children: [
        {
          path: "",
          element: <Dashboard />,
        },
        {
          path: "profile",
          element: <Profile />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRoutes;

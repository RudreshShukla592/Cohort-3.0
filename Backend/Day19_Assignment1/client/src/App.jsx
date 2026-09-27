import React, { useContext, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import AuthLayout from "./layout/AuthLayout";
import Register from "./pages/Register";
import Login from "./pages/Login";
import MainLayout from "./layout/MainLayout";
import ProductList from "./pages/ProductList";
import { AuthContext } from "./context/AuthContext";
import useApi from "./api/useApi";
import MainProtected from "./pages/protected/MainProtected";
import PublicProtected from "./pages/protected/PublicProtected";
import MyProducts from "./pages/MyProducts";
import ProductForm from "./pages/ProductForm";

const App = () => {
  const { setUser, setLoading } = useContext(AuthContext);

  const api = useApi();

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const response = await api.get("/auth/getMe");
        setUser(response.data.data.user);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    restoreSession();
  }, []);

  const router = createBrowserRouter([
    {
      element: <PublicProtected />,
      children: [
        {
          path: "/",
          element: <AuthLayout />,
          children: [
            {
              index: true,
              element: <Register />,
            },
            {
              path: "login",
              element: <Login />,
            },
          ],
        },
      ],
    },

    {
      element: <MainProtected />,
      children: [
        {
          element: <MainLayout />,
          children: [
            {
              path: "/products",
              element: <ProductList />,
            },
            {
              path: "/my-products",
              element: <MyProducts />,
            },
            {
              path: "/create-product",
              element: <ProductForm />,
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;

import React from "react";
import { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import { MyStore } from "../../app/context/MyContext";

const MainProtectedRoute = () => {
  const { user, loading } = useContext(MyStore);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) return <Navigate to="/" />;

  return <Outlet />;
};

export default MainProtectedRoute;

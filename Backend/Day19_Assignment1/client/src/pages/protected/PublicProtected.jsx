import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import { AuthContext } from "../../context/AuthContext";

const PublicProtected = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (user) {
    return <Navigate to="/products" />;
  }

  return <Outlet />;
};

export default PublicProtected;

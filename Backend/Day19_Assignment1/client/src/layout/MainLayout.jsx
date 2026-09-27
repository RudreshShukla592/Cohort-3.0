import React from "react";
import { Outlet } from "react-router";
import NavBar from "../components/NavBar";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <NavBar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <Outlet />
      </main>
    </div>
  )
};

export default MainLayout;

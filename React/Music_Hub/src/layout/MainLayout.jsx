import React, { useState } from "react";
import { Outlet } from "react-router";
import { Menu } from "lucide-react";
import Navbar from "../components/Navbar";

const MainLayout = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0f0f10] text-white flex">
      {/* Desktop */}
      <div className="hidden lg:block w-64">
        <Navbar />
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#171717] transform transition-transform duration-300 lg:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Navbar />
      </div>

      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/50 lg:hidden"
        />
      )}

      <main className="flex-1">
        {/* Mobile Topbar */}
        <div className="lg:hidden flex items-center p-4 border-b border-white/10">
          <button onClick={() => setOpen(true)}>
            <Menu size={28} />
          </button>
        </div>

        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;

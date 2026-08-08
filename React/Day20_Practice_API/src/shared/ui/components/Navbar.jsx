import React from "react";
import { NavLink } from "react-router";
import { Box, ShoppingCart, LogOut } from "lucide-react";

const Navbar = () => {
  return (
    <div className="bg-gray-900 border-b border-gray-800 px-8 py-4 flex items-center justify-between">
      {/* Logo */}
      <h1 className="text-3xl font-bold text-indigo-500 cursor-pointer">
        Logo
      </h1>

      {/* Navigation */}
      <div className="flex items-center gap-8 text-gray-300 font-medium">
        <NavLink
          to="/main"
          className={({ isActive }) =>
            isActive ? "text-indigo-500" : "hover:text-indigo-400 transition"
          }
          end
        >
          Home
        </NavLink>

        <NavLink
          to="/main/product"
          className={({ isActive }) =>
            isActive ? "text-indigo-500" : "hover:text-indigo-400 transition"
          }
        >
          Shop
        </NavLink>
      </div>

      {/* Right */}
      <div className="flex items-center gap-5">
        <button className="flex items-center gap-2 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-white font-medium transition cursor-pointer">
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;

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
          to="/main/products"
          className={({ isActive }) =>
            isActive ? "text-indigo-500" : "hover:text-indigo-400 transition"
          }
        >
          Shop
        </NavLink>

        <NavLink
          to="/main/about"
          className={({ isActive }) =>
            isActive ? "text-indigo-500" : "hover:text-indigo-400 transition"
          }
        >
          About
        </NavLink>
      </div>

      {/* Right */}
      <div className="flex items-center gap-5">
       <NavLink to={"/main/cart"}> <button className="relative text-white cursor-pointer hover:text-indigo-400 transition">
          <ShoppingCart size={24} />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            2
          </span>
        </button>
       </NavLink>

       <NavLink to={"/main/orders"}>
        <button className="text-white cursor-pointer hover:text-indigo-400 transition">
          <Box size={24} />
        </button>
       </NavLink>
       
        <button className="flex items-center gap-2 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-white font-medium transition cursor-pointer">
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;

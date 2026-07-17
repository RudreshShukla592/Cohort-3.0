import React, { useContext } from "react";
import funny from "./funny.png";
import { MyStore } from "../context/MyContext";

const Nav = () => {
  let { setIsCartOpen, isCartOpen } = useContext(MyStore);

  return (
    <nav className="bg-gray-900 rounded-2xl px-8 py-4 flex items-center justify-between border border-gray-700 shadow-lg">
      {/* Logo */}
      <div>
        <img
          className="w-52 h-16 rounded-full object-cover border-2 border-orange-400 shadow-lg shadow-orange-500/30 hover:scale-105 transition-all duration-300 cursor-pointer"
          src={funny}
          alt="Logo"
        />
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-4 bg-gray-800 p-2 rounded-full border border-gray-700">
        <button
          onClick={() => setIsCartOpen(false)}
          className={`flex items-center gap-2 px-6 py-2 rounded-full transition-all duration-300 font-semibold cursor-pointer
        ${
          !isCartOpen
            ? "bg-indigo-600 text-white shadow-lg"
            : "text-gray-300 hover:bg-gray-700"
        }`}
        >
          🏠 Home
        </button>

        <button
          onClick={() => setIsCartOpen(true)}
          className={`flex items-center gap-2 px-6 py-2 rounded-full transition-all duration-300 font-semibold cursor-pointer
        ${
          isCartOpen
            ? "bg-indigo-600 text-white shadow-lg"
            : "text-gray-300 hover:bg-gray-700"
        }`}
        >
          🛒 Cart
        </button>
      </div>

      {/* Login */}
      <button className="bg-indigo-600 hover:bg-indigo-500 px-6 py-2 rounded-xl font-semibold transition shadow-md hover:shadow-indigo-500/40">
        Login
      </button>
    </nav>
  );
  
};

export default Nav;

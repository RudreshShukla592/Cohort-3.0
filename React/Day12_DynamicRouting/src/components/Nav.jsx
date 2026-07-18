import React from 'react'
import { NavLink } from 'react-router'

const Nav = () => {
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-8 py-5 border-b border-gray-800 bg-gray-950/90 backdrop-blur">
        <h1 className="text-2xl font-bold text-indigo-400">Logo</h1>

        <div className="flex items-center gap-8 text-gray-300">
          <p className="cursor-pointer hover:text-indigo-400 transition">
            <NavLink to={"/"}>Home</NavLink>
          </p>
          <p className="cursor-pointer hover:text-indigo-400 transition">
            <NavLink to={"/about"}>About</NavLink>
          </p>
          <p className="cursor-pointer hover:text-indigo-400 transition">
            <NavLink to={"/product"}>Product</NavLink>
          </p>
        </div>

        <button className="bg-indigo-600 hover:bg-indigo-500 px-5 py-2 rounded-lg font-medium transition">
          Login
        </button>
      </nav>
  )
}

export default Nav
import React, { useContext } from "react";
import { NavLink } from "react-router";
import { useAuth } from "../hooks/useAuthForm";
import { AuthContext } from "../context/AuthContext";

const NavBar = () => {
  const { logout } = useAuth();
  const { user } = useContext(AuthContext);

  const initials = user?.name
    ?.split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const navClass = ({ isActive }) =>
    `relative px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
      isActive
        ? "text-[var(--primary)] bg-[var(--primary)]/8"
        : "text-[var(--muted)] hover:text-[var(--text)] hover:bg-white/5"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--bg)]/85 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
       
        <NavLink to="/products" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-[var(--primary)] text-black flex items-center justify-center font-bold text-sm transition-transform duration-200 group-hover:rotate-6">
            N
          </div>

          <span className="font-bold text-xl tracking-tight">NEXA</span>
        </NavLink>

       
        <nav className="hidden md:flex items-center gap-1">
          <NavLink to="/products" className={navClass}>
            All Products
          </NavLink>

          <NavLink to="/my-products" className={navClass}>
            My Products
          </NavLink>

          <NavLink
            to="/create-product"
            className="ml-2 flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--primary)] text-black text-sm font-semibold transition-all duration-200 hover:bg-[var(--primary-hover)] active:scale-[0.97]"
          >
            <span className="text-lg leading-none">+</span>
            Create
          </NavLink>
        </nav>

        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[var(--primary)] text-black flex items-center justify-center font-semibold text-sm">
            {initials}
          </div>

          <button
            onClick={logout}
            className="px-3 py-2 rounded-lg text-sm font-medium text-[var(--muted)] border border-[var(--border)] hover:text-[var(--danger)] hover:border-[var(--danger)]/40 hover:bg-[var(--danger)]/5 transition-all duration-200"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default NavBar;

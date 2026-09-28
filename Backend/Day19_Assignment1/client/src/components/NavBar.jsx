import React, { useContext, useState } from "react";
import { NavLink } from "react-router";
import { Menu, X } from "lucide-react";
import { useAuth } from "../hooks/useAuthForm";
import { AuthContext } from "../context/AuthContext";

const NavBar = () => {
  const { logout } = useAuth();
  const { user } = useContext(AuthContext);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--bg)]/85 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
        {/* Logo */}
        <NavLink
          to="/products"
          className="flex items-center gap-2.5 group"
          onClick={closeMenu}
        >
          <div className="w-8 h-8 rounded-lg bg-[var(--primary)] text-black flex items-center justify-center font-bold text-sm transition-transform duration-200 group-hover:rotate-6">
            N
          </div>

          <span className="font-bold text-xl tracking-tight">NEXA</span>
        </NavLink>

        {/* Desktop Navigation */}
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

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="w-9 h-9 rounded-full bg-[var(--primary)] text-black flex items-center justify-center font-semibold text-sm">
            {initials}
          </div>

          {/* Desktop Logout */}
          <button
            onClick={logout}
            className="hidden md:block px-3 py-2 rounded-lg text-sm font-medium text-[var(--muted)] border border-[var(--border)] hover:text-[var(--danger)] hover:border-[var(--danger)]/40 hover:bg-[var(--danger)]/5 transition-all duration-200"
          >
            Logout
          </button>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg border border-[var(--border)] text-[var(--muted)] hover:text-[var(--text)] hover:bg-white/5 transition"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-[var(--border)] bg-[var(--bg)] px-4 py-4">
          <nav className="flex flex-col gap-2">
            <NavLink to="/products" className={navClass} onClick={closeMenu}>
              All Products
            </NavLink>

            <NavLink to="/my-products" className={navClass} onClick={closeMenu}>
              My Products
            </NavLink>

            <NavLink
              to="/create-product"
              onClick={closeMenu}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[var(--primary)] text-black text-sm font-semibold hover:bg-[var(--primary-hover)] transition"
            >
              <span className="text-lg leading-none">+</span>
              Create Product
            </NavLink>

            {/* Mobile Logout */}
            <button
              onClick={() => {
                closeMenu();
                logout();
              }}
              className="w-full px-4 py-3 rounded-lg text-sm font-medium text-[var(--muted)] border border-[var(--border)] hover:text-[var(--danger)] hover:border-[var(--danger)]/40 hover:bg-[var(--danger)]/5 transition"
            >
              Logout
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default NavBar;

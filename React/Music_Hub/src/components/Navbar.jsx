import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router";
import {
  House,
  Heart,
  Library,
  User,
  LogOut,
  Upload,
  LayoutDashboard,
} from "lucide-react";
import { AuthShop } from "../context/AuthContext";

const Navbar = ({ setOpen }) => {
  let { currentUser, setCurrentUser } = useContext(AuthShop);
  let navigate = useNavigate();

  const navLinkStyle = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
      isActive ? "bg-violet-500 text-white" : "text-gray-300 hover:bg-[#252525]"
    }`;

  return (
    <aside className="h-dvh bg-[#171717] border-r border-white/5 flex flex-col">
      {/* Header */}
      <div className="p-5 border-b border-white/5">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-300 to-purple-500 bg-clip-text text-transparent">
          MusicHub
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          {currentUser.role.toUpperCase()} Account
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-5 space-y-3">
        <NavLink
          to="/main"
          onClick={() => setOpen?.(false)}
          end
          className={navLinkStyle}
        >
          <House size={20} />
          Home
        </NavLink>

        <NavLink
          onClick={() => setOpen?.(false)}
          to="/main/library"
          className={navLinkStyle}
        >
          <Library size={20} />
          Library
        </NavLink>

        {currentUser.role === "listener" ? (
          <NavLink
            onClick={() => setOpen?.(false)}
            to="/main/favourites"
            className={navLinkStyle}
          >
            <Heart size={20} />
            Favourites
          </NavLink>
        ) : (
          <>
            <NavLink
              onClick={() => setOpen?.(false)}
              to="/main/upload"
              className={navLinkStyle}
            >
              <Upload size={20} />
              Upload
            </NavLink>

            <NavLink
              onClick={() => setOpen?.(false)}
              to="/main/artistdashboard"
              className={navLinkStyle}
            >
              <LayoutDashboard size={20} />
              Dashboard
            </NavLink>
          </>
        )}

        <NavLink
          onClick={() => setOpen?.(false)}
          to="/main/profile"
          className={navLinkStyle}
        >
          <User size={20} />
          Profile
        </NavLink>
      </nav>

      {/* Logout */}
      <div className="p-5 border-t border-white/5 bg-[#171717]">
        <button
          onClick={() => {
            setOpen?.(false);
            setCurrentUser(null);
            localStorage.removeItem("currentUser");
            navigate("/");
          }}
          className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all duration-200"
        >
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Navbar;

import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router";
import { House, Heart, Library, User, LogOut } from "lucide-react";
import { AuthShop } from "../context/AuthContext";

const Navbar = () => {
  let { currentUser, setCurrentUser } = useContext(AuthShop);
  let navigate = useNavigate();

  const navLinkStyle = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
      isActive ? "bg-violet-500 text-white" : "text-gray-300 hover:bg-[#252525]"
    }`;

  return (
    <aside className="h-screen bg-[#171717] border-r border-white/5 flex flex-col justify-between p-5">
      <div>
        {/* Logo */}
        <div className="mb-14">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-300 to-purple-500 bg-clip-text text-transparent">
            MusicHub
          </h1>

          <p className="text-sm text-gray-500">
            {currentUser.role.toUpperCase()} Account
          </p>
        </div>

        {/* Links */}
        <nav className="space-y-3">
          <NavLink to="/main" end className={navLinkStyle}>
            <House size={20} />
            Home
          </NavLink>

          <NavLink to="/main/library" className={navLinkStyle}>
            <Library size={20} />
            Library
          </NavLink>

          {currentUser.role === "listener" ? (
            <NavLink to="/main/favourites" className={navLinkStyle}>
              <Heart size={20} />
              Favourites
            </NavLink>
          ) : (
            <>
              <NavLink to="/main/upload" className={navLinkStyle}>
                <Upload size={20} />
                Upload
              </NavLink>

              <NavLink to="/main/artistdashboard" className={navLinkStyle}>
                <LayoutDashboard size={20} />
                Dashboard
              </NavLink>
            </>
          )}

          <NavLink to="/main/profile" className={navLinkStyle}>
            <User size={20} />
            Profile
          </NavLink>
        </nav>
      </div>

      {/* Logout */}
      <button
        onClick={() => {
          setCurrentUser(null);
          localStorage.removeItem("currentUser");
          navigate("/");
        }}
        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:bg-red-500/10 hover:text-red-400 transition"
      >
        <LogOut size={20} />
        <span className="font-medium">Logout</span>
      </button>
    </aside>
  );
};

export default Navbar;

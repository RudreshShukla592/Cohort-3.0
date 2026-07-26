import React, { useContext } from "react";
import { Navigate, NavLink, useNavigate } from "react-router";
import { MyShop } from "../context/MyContext";

const Navbar = () => {
  let { setLoggedUser } = useContext(MyShop);

  return (
    <div className="border-r border-gray-500 flex flex-col justify-between p-3">
      <div className="flex flex-col gap-10">
        <h1 className="text-3xl font-semibold">E-comm</h1>

        <div className="flex flex-col gap-6 ml-5">
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "font-semibold text-red-500 border-b border-gray-500"
                : "text-black border-b border-gray-500"
            }
            to={"/main"}
            end
          >
            Home
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "font-semibold text-red-500 border-b border-gray-500"
                : "text-black border-b border-gray-500"
            }
            to={"/main/users"}
          >
            Users
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "font-semibold text-red-500 border-b border-gray-500"
                : "text-black border-b border-gray-500"
            }
            to={"/main/products"}
          >
            Products
          </NavLink>
        </div>
      </div>

      <button
        onClick={() => {
          localStorage.removeItem("loggedUserr");

          setLoggedUser(null);
        }}
        className="py-3 bg-red-500 text-white rounded-xl cursor-pointer"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;

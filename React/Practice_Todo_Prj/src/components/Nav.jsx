import React, { useContext } from "react";
import { MyShop } from "../context/Mycontext";

const Nav = () => {
  let { setToggle } = useContext(MyShop);
  return (
    <div className="bg-white shadow-md rounded-2xl px-8 py-5 flex items-center justify-between">
      {/* Logo & Title */}
      <div className="flex items-center gap-4">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0Ue-w2fid8sxN5e_rYQpYEZl7hIFqVz5BLnkucliKwQ&s=10"
          alt="Logo"
          className="w-12 h-12 rounded-full object-cover shadow"
        />

        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            React Task Manager
          </h1>

          <p className="text-sm text-gray-500">
            Stay organized. Stay productive.
          </p>
        </div>
      </div>

      {/* Button */}
      <button
        onClick={() => setToggle((prev) => !prev)}
        className="px-5 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-md cursor-pointer"
      >
        + New Task
      </button>
    </div>
  );
};

export default Nav;

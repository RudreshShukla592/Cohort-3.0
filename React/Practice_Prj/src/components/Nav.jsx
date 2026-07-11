import React from "react";

const Nav = ({setToggle}) => {
  return (
    <div className="p-6 rounded-2xl bg-black flex items-center justify-between">
      <div>
        <img
          width={35}
          className="rounded-full"
          src="https://png.pngtree.com/element_our/png/20181206/users-vector-icon-png_260862.jpg"
          alt="Loading..."
        />
      </div>

      <div className=" flex gap-6 font-semibold">
        <p>Home</p>
        <p>About</p>
        <p>Contact</p>
      </div>

      <button onClick={()=> setToggle(prev => !prev)} className="px-4 py-2 bg-blue-600 text-white cursor-pointer rounded-3xl">
        Create User
      </button>
    </div>
  );
};

export default Nav;

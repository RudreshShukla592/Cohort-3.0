import React, { useContext } from "react";
import { MyShop } from "../context/Mycontext";

const Nav = () => {
  let {setToggle}= useContext(MyShop)
  return (
    <div className="p-6 rounded-2xl bg-black flex items-center justify-between">
      <div>
        <img
          width={35}
          className="rounded-full"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0Ue-w2fid8sxN5e_rYQpYEZl7hIFqVz5BLnkucliKwQ&s=10"
          alt="Loading..."
        />
      </div>

      <div className=" flex gap-6 font-semibold">
       <h1>React Task Manager</h1>
      </div>

      <button
        onClick={()=> setToggle(prev => !prev)}
        className="px-4 py-2 bg-blue-600 text-white cursor-pointer rounded-3xl"
      >
        Create Task
      </button>
    </div>
  );
};

export default Nav;

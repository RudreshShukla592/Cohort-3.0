import React, { useContext } from "react";
import funny from "./funny.png";
import { MyStore } from "../context/MyContext";


const Nav = () => {

  let {setIsCartOpen} = useContext(MyStore)
  return (
    <div className="p-6 rounded-2xl bg-black flex items-center justify-between">
      <div>
        <img
          className="w-50 h-16 rounded-full object-cover border-2 shadow-lg shadow-orange-500/30 hover:scale-105 transition-all duration-300 cursor-pointer"
          src={funny}
          alt="Loading..."
        />
      </div>
      <div className=" flex gap-10 font-semibold">
        <p className="cursor-pointer" onClick={()=> setIsCartOpen(false)}>
          Home
        </p>
        <p className="cursor-pointer" onClick={()=> setIsCartOpen(true)}>
          Cart
        </p>
      </div>
      <button>LogIn</button>
    </div>
  );
};

export default Nav;

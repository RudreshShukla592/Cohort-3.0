import React from "react";

const Login = ({ setToggle}) => {
  return (
    <div className="bg-white p-6 flex flex-col gap-7 rounded">
      <h1 className="text-center ">Login</h1>
      <form action="" className="flex flex-col gap-5">
        <input
          className="p-2 rounded border border-gray-400"
          type="text"
          placeholder="Name"
        />
        <input
          className="p-2 rounded border border-gray-400"
          type="text"
          placeholder="Email"
        />
        <button className="px-6 py-2 cursor-pointer text-white bg-blue-500 border w-50 rounded-2xl">
          Login
        </button>
      </form>
      <p>
        Dont have an Account
        <span onClick={()=>{
            setToggle(prev => !prev)
        }} className="text-blue-600 cursor-pointer"> Register here</span>
      </p>
    </div>
  );
};

export default Login;

import React from "react";
import { useState } from "react";

const Register = ({setToggle,setUsers}) => {

  const [formData, setFormData] = useState({
    name:"",
    email:"",
    password:""
  })
  
  let handleChange=(e)=>{
    let {name,value} = e.target
    setFormData({...formData,[name]:value})
  }

  let handleSubmit = (e)=>{
     e.preventDefault()
    setUsers(prev => [...prev,formData])
    setFormData({
    name:"",
    email:"",
    password:""
  })
  }

  return (
    <div className="bg-white p-6 flex flex-col gap-7 rounded">
      <h1 className="text-center ">Register</h1>
      <form onSubmit={handleSubmit} action="" className="flex flex-col gap-5">
        <input
          required
          value={formData.name}
          className="p-2 rounded border border-gray-400"
          type="text"
          placeholder="Name"
          onChange={handleChange}
          name="name"
        />
        <input
          required
          value={formData.email}
          className="p-2 rounded border border-gray-400"
          type="text"
          placeholder="Email"
           onChange={handleChange}
           name="email"
        />
        <input
          value={formData.password}
          className="p-2 rounded border border-gray-400"
          type="password"
          placeholder="Password"
           onChange={handleChange}
           name="password"
          required
        />
        <button className="px-6 cursor-pointer py-2 border-none bg-amber-400 border w-50 rounded-2xl">
          Register
        </button>
      </form>
      <p>
        Already have an Account
        <span onClick={()=>{
          setToggle(prev => !prev)
        }} className="text-blue-600 cursor-pointer"> Login here</span>
      </p>
    </div>
  );
};

export default Register;

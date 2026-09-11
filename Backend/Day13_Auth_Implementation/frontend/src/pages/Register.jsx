import React, { useState } from "react";
import useApi from "../config/api";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const api = useApi()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Register Data:", formData);

    try {
      const response = await api.post("/auth/register",formData)

      console.log(response);
      
    } catch (error) {
      console.log(error);
      
    }
  };

  return (
    <div className="min-h-screen bg-[#121015] text-white flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-[500px] bg-[#1c1a1f] p-10 rounded-xl"
      >
        <h1 className="text-3xl font-bold mb-8">Create your account</h1>

        {/* Name */}
        <div className="mb-5">
          <label className="block mb-2">Name</label>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            className="w-full h-12 px-4 rounded-md bg-[#0f0d12] border border-gray-700 outline-none"
          />
        </div>

        {/* Email */}
        <div className="mb-5">
          <label className="block mb-2">Email</label>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="name@company.com"
            className="w-full h-12 px-4 rounded-md bg-[#0f0d12] border border-gray-700 outline-none"
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block mb-2">Password</label>

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            className="w-full h-12 px-4 rounded-md bg-[#0f0d12] border border-gray-700 outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full h-12 rounded-md bg-[#7051b6] hover:bg-[#7b5bc2]"
        >
          Create Account
        </button>
      </form>
    </div>
  );
};

export default Register;

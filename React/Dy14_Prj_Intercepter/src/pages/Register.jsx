import React from "react";
import { useAuth } from "../hooks/useAuth";

const Register = () => {
  let { navigate, register, handleSubmit, errors, registerFormData } =
    useAuth();

    
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-gray-800 rounded-2xl shadow-xl border border-gray-700 p-8">
        <h1 className="text-3xl font-bold text-center text-white">
          Create Account 🚀
        </h1>

        <p className="text-gray-400 text-center mt-2">
          Join us and start shopping today
        </p>

        <form
          onSubmit={handleSubmit(registerFormData)}
          className="mt-8 flex flex-col gap-5"
        >
          <div>
            <label className="block text-gray-300 mb-2">Name</label>

            <input
              type="text"
              placeholder="Enter your name"
              className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-gray-700 text-white outline-none focus:border-indigo-500 transition"
              {...register("name", {
                required: "Name is required",
              })}
            />
          </div>
          {errors.name && <p className="text-red-700">{errors.name.message}</p>}
          <div>
            <label className="block text-gray-300 mb-2">Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-gray-700 text-white outline-none focus:border-indigo-500 transition"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Enter Valid Email",
                },
              })}
            />
          </div>
          {errors.email && (
            <p className="text-red-700">{errors.email.message}</p>
          )}
          <div>
            <label className="block text-gray-300 mb-2">Password</label>

            <input
              type="password"
              placeholder="Create a password"
              className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-gray-700 text-white outline-none focus:border-indigo-500 transition"
              {...register("password", {
                required: "Password is required",
                validate: (value) => {
                  if (value.trim() === "")
                    return "Password cannot contain only spaces";
                  if (value.length < 6) return "Minimum 6 characters required";
                  return true;
                },
              })}
            />
          </div>
          {errors.password && (
            <p className="text-red-700">{errors.password.message}</p>
          )}
          <button className="mt-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 rounded-xl transition">
            Register
          </button>
        </form>

        <p className="text-center text-gray-400 mt-6">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/")}
            className="text-indigo-400 hover:text-indigo-300 cursor-pointer font-semibold"
          >
            Login Here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;

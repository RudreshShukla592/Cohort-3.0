import React from "react";
import { useAuth } from "../../hooks/useAuthHook";

const LoginPage = () => {
  let { navigate, register, handleSubmit, errors, loginForm } = useAuth();

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-gray-800 rounded-2xl shadow-xl border border-gray-700 p-8">
        <h1 className="text-3xl font-bold text-center text-white">
          Welcome Back 👋
        </h1>

        <p className="text-gray-400 text-center mt-2">
          Login to continue shopping
        </p>

        <form
          onSubmit={handleSubmit(loginForm)}
          className="mt-8 flex flex-col gap-5"
        >
          <div>
            <label className="block text-gray-300 mb-2">Username</label>

            <input
              type="text"
              placeholder="Enter your username"
              className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-gray-700 text-white outline-none focus:border-indigo-500 transition"
              {...register("username", {
                required: "Username is required",
              })}
            />
          </div>
          {errors.username && (
            <p className="text-red-700">{errors.username.message}</p>
          )}
          <div>
            <label className="block text-gray-300 mb-2">Password</label>

            <input
              type="password"
              placeholder="Enter your password"
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
            Login
          </button>
        </form>

        <p className="text-center text-gray-400 mt-6">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-indigo-400 hover:text-indigo-300 cursor-pointer font-semibold"
          >
            Register Here
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

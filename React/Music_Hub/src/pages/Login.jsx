import React, { useState } from "react";
import { Mail, Lock, Music2, ArrowRight, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";

const Login = () => {
  let navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  let {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  return (
    <div className="min-h-screen bg-[#0d0d0d] flex items-center justify-center px-6 overflow-hidden relative">
      {/* Background Glow */}
      <div className="absolute w-[500px] h-[500px] bg-violet-700/20 blur-[180px] rounded-full -top-40 -left-32"></div>
      <div className="absolute w-[400px] h-[400px] bg-purple-500/10 blur-[180px] rounded-full bottom-0 right-0"></div>

      <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-16 items-center relative z-10">
        {/* Left Section */}
        <div className="hidden lg:flex flex-col items-center justify-center">
          <Music2 size={42} className="text-violet-400 mb-12 rotate-12" />

          <img
            src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=700"
            alt="Music"
            className="w-[430px] rounded-xl object-cover shadow-2xl"
          />

          <h1 className="text-6xl font-bold mt-10 bg-gradient-to-r from-violet-300 to-purple-500 bg-clip-text text-transparent">
            MusicHub
          </h1>

          <p className="text-gray-400 text-center mt-5 text-xl leading-relaxed">
            Experience high-fidelity sound
            <br />
            tailored to your soul.
          </p>
        </div>

        {/* Right Section */}
        <div className="max-w-md w-full mx-auto bg-[#1b1b1b]/90 border border-white/5 rounded-2xl p-8 shadow-2xl">
          <h2 className="text-4xl font-bold text-white">Welcome Back</h2>

          <p className="text-gray-400 mt-2 mb-10">
            Sign in to continue your journey.
          </p>

          <form className="space-y-6">
            {/* Email */}
            <div>
              <label className="text-xs uppercase tracking-[2px] text-gray-400 font-semibold">
                Email Address
              </label>

              <div className="mt-2 flex items-center h-12 border border-white/10 rounded-lg px-4 bg-[#1d1d1d]">
                <Mail size={18} className="text-gray-500" />

                <input
                  {...register("email")}
                  type="email"
                  placeholder="name@example.com"
                  className="bg-transparent outline-none px-3 w-full text-white placeholder:text-gray-500"
                />
              </div>

              {errors.email && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="text-xs uppercase tracking-[2px] text-gray-400 font-semibold">
                Password
              </label>

              <div className="mt-2 flex items-center h-12 border border-white/10 rounded-lg px-4 bg-[#1d1d1d]">
                <Lock size={18} className="text-gray-500" />

                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="bg-transparent outline-none px-3 w-full text-white placeholder:text-gray-500"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff
                      size={18}
                      className="text-gray-500 hover:text-white"
                    />
                  ) : (
                    <Eye size={18} className="text-gray-500 hover:text-white" />
                  )}
                </button>
              </div>
            </div>

            {errors.password && (
              <p className="text-red-400 text-sm mt-1">
                {errors.password.message}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="w-full h-12 rounded-lg bg-gradient-to-r from-violet-500 to-purple-600 text-white font-semibold flex items-center justify-center gap-2 hover:scale-[1.02] transition shadow-lg shadow-violet-500/30"
            >
              Login
              <ArrowRight size={18} />
            </button>

            <p className="text-center text-gray-400">
              Don't have an account?{" "}
              <span
                onClick={() => navigate("/register")}
                className="text-violet-300 font-semibold cursor-pointer hover:text-violet-200"
              >
                Register
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

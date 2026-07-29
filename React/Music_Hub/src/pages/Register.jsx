import React, { useState } from "react";
import {
  User,
  AtSign,
  Mail,
  Lock,
  Music2,
  MicVocal,
  ArrowRight,
  Speaker,
  Headphones,
  Radio,
  Eye,
  EyeOff,
} from "lucide-react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";

const Register = () => {
  const navigate = useNavigate();

  const [role, setRole] = useState("listener");
  const [showPassword, setShowPassword] = useState(false);

  let {
      register,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm();
  

  return (
    <div className="min-h-screen bg-[#0f0b18] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute w-[500px] h-[500px] bg-purple-700/20 blur-[180px] rounded-full top-0 right-0"></div>
      <div className="absolute w-[450px] h-[450px] bg-violet-500/10 blur-[180px] rounded-full bottom-0 left-0"></div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-300 to-purple-500 bg-clip-text text-transparent">
            MusicHub
          </h1>

          <p className="text-gray-400 text-sm mt-2">
            Join the sound revolution.
          </p>
        </div>

        {/* Card */}
        <div className="bg-[#181818]/90 border border-white/5 rounded-2xl p-7 shadow-2xl backdrop-blur-lg">
          <form className="space-y-4">
            {/* Role Selection */}
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setRole("listener")}
                className={`rounded-xl py-6 flex flex-col items-center gap-2 transition ${
                  role === "listener"
                    ? "border border-violet-500 bg-violet-500/10 text-violet-300 shadow-lg shadow-violet-600/20"
                    : "border border-white/10 text-gray-400 hover:border-violet-500"
                }`}
              >
                <Music2 size={26} />
                <span className="text-xs tracking-[3px] font-semibold">
                  LISTENER
                </span>
              </button>

              <button
                type="button"
                onClick={() => setRole("artist")}
                className={`rounded-xl py-6 flex flex-col items-center gap-2 transition ${
                  role === "artist"
                    ? "border border-violet-500 bg-violet-500/10 text-violet-300 shadow-lg shadow-violet-600/20"
                    : "border border-white/10 text-gray-400 hover:border-violet-500"
                }`}
              >
                <MicVocal size={26} />
                <span className="text-xs tracking-[3px] font-semibold">
                  ARTIST
                </span>
              </button>
            </div>

            {/* Full Name */}
            <div className="flex items-center bg-[#0d0d0f] border border-white/10 rounded-full px-4 h-12">
              <User className="text-gray-500" size={18} />

              <input
                type="text"
                placeholder="Full Name"
                className="bg-transparent outline-none px-3 w-full text-white placeholder:text-gray-500"
              />
            </div>

            {/* Username / Artist Name */}
            <div className="flex items-center bg-[#0d0d0f] border border-white/10 rounded-full px-4 h-12">
              <AtSign className="text-gray-500" size={18} />

              <input
                type="text"
                placeholder={role === "listener" ? "Username" : "Artist Name"}
                className="bg-transparent outline-none px-3 w-full text-white placeholder:text-gray-500"
              />
            </div>

            {/* Artist Genre */}
            {role === "artist" && (
              <div className="flex items-center bg-[#0d0d0f] border border-white/10 rounded-full px-4 h-12">
                <Music2 className="text-gray-500" size={18} />

                <input
                  type="text"
                  placeholder="Genre (Pop, Rock, Hip-Hop...)"
                  className="bg-transparent outline-none px-3 w-full text-white placeholder:text-gray-500"
                />
              </div>
            )}

            {/* Email */}
            <div className="flex items-center bg-[#0d0d0f] border border-white/10 rounded-full px-4 h-12">
              <Mail className="text-gray-500" size={18} />

              <input
                type="email"
                placeholder="Email Address"
                className="bg-transparent outline-none px-3 w-full text-white placeholder:text-gray-500"
              />
            </div>

            {/* Password */}
            <div className="flex items-center bg-[#0d0d0f] border border-white/10 rounded-full px-4 h-12">
              <Lock className="text-gray-500" size={18} />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
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

            {/* Submit */}
            <button
              type="submit"
              className="w-full h-12 rounded-full bg-gradient-to-r from-violet-300 to-purple-600 text-[#2f1255] font-semibold flex items-center justify-center gap-2 shadow-lg shadow-violet-500/40 hover:scale-[1.02] transition"
            >
              Register
              <ArrowRight size={18} />
            </button>

            {/* Login */}
            <p className="text-center text-gray-400 text-sm">
              Already have an account?{" "}
              <span
                onClick={() => navigate("/")}
                className="text-violet-300 font-semibold cursor-pointer hover:text-violet-200"
              >
                Login
              </span>
            </p>
          </form>
        </div>

        {/* Bottom Icons */}
        <div className="flex justify-center gap-8 mt-8 text-gray-600">
          <Speaker />
          <Headphones />
          <Radio />
        </div>
      </div>
    </div>
  );
};

export default Register;

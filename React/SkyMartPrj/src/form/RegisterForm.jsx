import { User, Mail, Lock, Eye, ArrowRight, Zap } from "lucide-react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { MyShop } from "../context/MyContext";

const RegisterForm = () => {
  let { users, setUsers } = useContext(MyShop);

  const [showPassword, setShowPassword] = useState(false);
  const [emailToggle, setEmailToggle] = useState(false);

  let navigate = useNavigate();

  let {
    register,
    reset,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    mode: "onChange",
  });

  let formData = (data) => {
    const existingUser = users.find((user) => user.email === data.email);
    if (existingUser) {
      setEmailToggle(true);
      return;
    }
    const { confirmPassword, ...userData } = data;
    let arr = [...users, userData];
    setUsers(arr);
    console.log(arr);
    localStorage.setItem("users", JSON.stringify(arr));
    reset();
    navigate("/login");
  };

  const password = watch("password");

  return (
    <section className="min-h-screen flex items-center justify-center bg-[#0d0d0d] px-5">
      <div className="w-full max-w-[480px]">
        {/* Logo */}

        <div className="mb-8 flex items-center justify-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-lime-400 text-black">
            <Zap size={22} strokeWidth={3} />
          </div>

          <h1 className="text-4xl font-bold text-white">
            Sky<span className="text-lime-400">Mart</span>
          </h1>
        </div>

        {/* Card */}

        <div className="rounded-[30px] border border-zinc-800 bg-[#131313] p-10 shadow-[0_0_40px_rgba(0,0,0,0.35)]">
          <h2 className="text-4xl font-bold text-white">Create account</h2>

          <p className="mt-2 mb-2 text-zinc-500">Join SkyMart and start shopping</p>

          {emailToggle && (
            <div className="mb-6 mt-3 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3">
              <p className="text-sm font-medium text-red-400">
                An account with this email already exists.
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit(formData)} className="mt-8 space-y-5">
            {/* Name */}

            <div className="relative">
              <User
                size={18}
                className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500"
              />

              <input
                type="text"
                placeholder="Full name"
                className="h-14 w-full rounded-2xl border border-zinc-700 bg-[#1C1C1C] pl-14 pr-5 text-white placeholder:text-zinc-500 outline-none transition-all duration-300 focus:border-lime-400 focus:ring-2 focus:ring-lime-400/20"
                {...register("fullName", {
                  required: "Name is required",
                  validate: (value) =>
                    value.trim() !== "" || "Name cannot contain only spaces",
                })}
              />
            </div>
            {errors.fullName && (
              <p className="text-red-700">{errors.fullName.message}</p>
            )}
            {/* Email */}

            <div className="relative">
              <Mail
                size={18}
                className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500"
              />

              <input
                type="email"
                placeholder="Email address"
                className="h-14 w-full rounded-2xl border border-zinc-700 bg-[#1C1C1C] pl-14 pr-5 text-white placeholder:text-zinc-500 outline-none transition-all duration-300 focus:border-lime-400 focus:ring-2 focus:ring-lime-400/20"
  
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Enter Valid Email",
                  },
                  onChange: () => setEmailToggle(false),
                })}
              />
            </div>
            {errors.email && (
              <p className="text-red-700">{errors.email.message}</p>
            )}
            {/* Password */}

            <div className="relative">
              <Lock
                size={18}
                className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500"
              />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password (min 6 chars)"
                className="h-14 w-full rounded-2xl border border-zinc-700 bg-[#1C1C1C] pl-14 pr-14 text-white placeholder:text-zinc-500 outline-none transition-all duration-300 focus:border-lime-400 focus:ring-2 focus:ring-lime-400/20"
                {...register("password", {
                  required: "Password is required",
                  validate: (value) => {
                    if (value.trim() === "")
                      return "Password cannot contain only spaces";
                    if (value.length < 6)
                      return "Minimum 6 characters required";
                    return true;
                  },
                })}
              />

              <Eye
                size={18}
                className="absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer text-zinc-500 hover:text-white transition"
                onClick={() => setShowPassword((prev) => !prev)}
              />
            </div>
            {errors.password && (
              <p className="text-red-700">{errors.password.message}</p>
            )}
            {/* Confirm Password */}

            <div className="relative">
              <Lock
                size={18}
                className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500"
              />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm password"
                className="h-14 w-full rounded-2xl border border-zinc-700 bg-[#1C1C1C] pl-14 pr-5 text-white placeholder:text-zinc-500 outline-none transition-all duration-300 focus:border-lime-400 focus:ring-2 focus:ring-lime-400/20"
                {...register("confirmPassword", {
                  required: "Confirming Password is required",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
              />
            </div>
            {errors.confirmPassword && (
              <p className="text-red-700">{errors.confirmPassword.message}</p>
            )}
            {/* Button */}

            <button className="flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-lime-400 text-lg font-semibold text-black transition-all duration-300 hover:scale-[1.02] hover:bg-lime-300 active:scale-[0.98]">
              Create Account
              <ArrowRight size={20} />
            </button>
          </form>

          <p className="mt-8 text-center text-zinc-500">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="cursor-pointer font-semibold text-lime-400 hover:underline"
            >
              Sign in
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default RegisterForm;

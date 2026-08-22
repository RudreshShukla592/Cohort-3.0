import { useState } from "react";
import { User, Mail, LockKeyhole, Sparkles, Network } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);

  let { register, handleSubmit, errors, watch, onRegisterSubmit ,  navigate} = useAuth();

  const password = watch("password", "");

  // Password strength
  const getPasswordStrength = () => {
    if (!password) return 0;

    let strength = 0;

    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password) || /[^A-Za-z0-9]/.test(password)) strength++;

    return strength;
  };

  const passwordStrength = getPasswordStrength();

  return (
    <div className="min-h-screen bg-[#121015] text-white flex">
      {/* ================= RIGHT PANEL ================= */}
      <section className="flex-1 min-h-screen flex justify-center">
        <div className="w-full max-w-[520px] px-10 py-14">
          {/* Heading */}
          <div className="mb-8">
            <h1 className="text-[30px] font-bold tracking-tight">
              Create your account
            </h1>

            <p className="mt-2 text-[13px] text-purple-200">
              Experience the future of collaborative data intelligence.
            </p>
          </div>

          {/* ================= FORM ================= */}
          <form onSubmit={handleSubmit(onRegisterSubmit)} className="space-y-6">
            {/* ================= FULL NAME ================= */}
            <div>
              <label className="block text-[11px] font-semibold text-purple-200 mb-2">
                Full Name
              </label>

              <div className="relative">
                <User
                  size={17}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#615d68]"
                />

                <input
                  type="text"
                  placeholder="Enter your full name"
                  {...register("fullName", {
                    required: "Full name is required",
                    minLength: {
                      value: 2,
                      message: "Enter your full name",
                    },
                  })}
                  className={`w-full h-[50px] rounded-[6px] bg-[#1b191e] border ${
                    errors.fullName ? "border-red-500" : "border-[#39363f]"
                  } pl-12 pr-4 text-[14px] text-white placeholder:text-[#625e68] outline-none focus:border-purple-400 transition`}
                />
              </div>

              {errors.fullName && (
                <p className="text-[10px] text-red-400 mt-1.5">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            {/* ================= EMAIL ================= */}
            <div>
              <label className="block text-[11px] font-semibold text-purple-200 mb-2">
                Email Address
              </label>

              <div className="relative">
                <Mail
                  size={17}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#615d68]"
                />

                <input
                  type="email"
                  placeholder="name@company.com"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Enter a valid email",
                    },
                  })}
                  className={`w-full h-[50px] rounded-[6px] bg-[#1b191e] border ${
                    errors.email ? "border-red-500" : "border-[#39363f]"
                  } pl-12 pr-4 text-[14px] text-white placeholder:text-[#625e68] outline-none focus:border-purple-400 transition`}
                />
              </div>

              {errors.email && (
                <p className="text-[10px] text-red-400 mt-1.5">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* ================= PASSWORD ================= */}
            <div>
              <label className="block text-[11px] font-semibold text-purple-200 mb-2">
                Password
              </label>

              <div className="relative">
                <LockKeyhole
                  size={17}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#615d68]"
                />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                    validate: (value) =>
                      (/[A-Z]/.test(value) &&
                        /[0-9]/.test(value) &&
                        /[^A-Za-z0-9]/.test(value)) ||
                      "Use uppercase, number and special character",
                  })}
                  className={`w-full h-[50px] rounded-[6px] bg-[#1b191e] border ${
                    errors.password ? "border-red-500" : "border-[#39363f]"
                  } pl-12 pr-4 text-[14px] text-white placeholder:text-[#625e68] outline-none focus:border-purple-400 transition`}
                />
              </div>

              {/* Password Strength */}
              <div className="mt-2">
                <div className="flex gap-2 h-[4px]">
                  {[1, 2, 3].map((level) => (
                    <div
                      key={level}
                      className={`flex-1 rounded-full transition ${
                        passwordStrength >= level
                          ? "bg-purple-300"
                          : "bg-[#29272d]"
                      }`}
                    />
                  ))}
                </div>

                {password && (
                  <p
                    className={`text-[10px] mt-1.5 ${
                      passwordStrength === 3
                        ? "text-purple-300"
                        : "text-gray-500"
                    }`}
                  >
                    {passwordStrength === 3
                      ? "Strong password"
                      : passwordStrength === 2
                        ? "Good password"
                        : "Weak password"}
                  </p>
                )}
              </div>

              {errors.password && (
                <p className="text-[10px] text-red-400 mt-1.5">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* ================= TERMS ================= */}
            <div>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  {...register("terms", {
                    required: "You must accept the terms",
                  })}
                  className="mt-[2px] appearance-none w-[16px] h-[16px] rounded-[3px] border border-[#3d3945] bg-[#1b191e] checked:bg-purple-500 checked:border-purple-500 cursor-pointer"
                />

                <span className="text-[11px] leading-5 text-gray-300">
                  I agree to the{" "}
                  <span className="text-purple-300">Terms of Service</span> and{" "}
                  <span className="text-purple-300">Privacy Policy.</span>
                </span>
              </label>

              {errors.terms && (
                <p className="text-[10px] text-red-400 mt-1.5">
                  {errors.terms.message}
                </p>
              )}
            </div>

            {/* ================= CREATE BUTTON ================= */}
            <button
              type="submit"
              className="w-full h-[50px] rounded-[6px] bg-gradient-to-r from-[#7250b5] to-[#c5a9ff] text-[#100b18] text-[13px] font-semibold hover:brightness-110 active:scale-[0.99] transition"
            >
              Create Account
            </button>
          </form>

          {/* ================= DIVIDER ================= */}
          <div className="flex items-center gap-4 my-9">
            <div className="h-px flex-1 bg-[#29262d]" />

            <span className="text-[10px] text-[#625d68]">OR CONTINUE WITH</span>

            <div className="h-px flex-1 bg-[#29262d]" />
          </div>

          {/* ================= LOGIN ================= */}
          <p className="text-center text-[11px] text-gray-300 mt-10">
            Already have an account?{" "}
            <button
            onClick={()=>  navigate("/")}
              type="button"
              className="text-purple-300 font-semibold hover:text-purple-200"
            >
              Log In
            </button>
          </p>
        </div>
      </section>
    </div>
  );
};

export default Register;

import React from "react";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShoppingBag,
} from "lucide-react";
import { useAuth } from "../hooks/useAuthForm";

const Register = () => {
  const {
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    navigate,
    register,
    handleSubmit,
    errors,
    watch,
    onRegisterSubmit,
  } = useAuth();

  const password = watch("password");

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] flex items-center justify-center px-4 py-10 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-[-180px] left-1/2 -translate-x-1/2 w-[500px] h-[350px] bg-[var(--primary)]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative w-full max-w-[480px]">
        {/* Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-[var(--primary)] text-black font-bold text-lg mb-5 shadow-[0_0_30px_rgba(199,243,107,0.12)]">
            N
          </div>

          <h1 className="font-['Space_Grotesk'] text-3xl sm:text-4xl font-bold tracking-tight">
            Create your account
          </h1>

          <p className="text-sm text-[var(--muted)] mt-2">
            Start building your product collection.
          </p>
        </div>

        {/* Card */}
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 sm:p-8 shadow-2xl shadow-black/20">
          <form onSubmit={handleSubmit(onRegisterSubmit)} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-[var(--text)] mb-2">
                Full Name
              </label>

              <div className="relative">
                <User
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted)]"
                />

                <input
                  type="text"
                  placeholder="John Doe"
                  {...register("name", {
                    required: "Name is required",
                    minLength: {
                      value: 2,
                      message: "Name must be at least 2 characters",
                    },
                  })}
                  className={`w-full h-12 rounded-xl bg-[var(--bg)] border ${
                    errors.name
                      ? "border-[var(--danger)]"
                      : "border-[var(--border)]"
                  } pl-12 pr-4 text-sm text-[var(--text)] placeholder:text-[#59615D] outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/10 transition-all`}
                />
              </div>

              {errors.name && (
                <p className="text-xs text-[var(--danger)] mt-1.5">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-[var(--text)] mb-2">
                Email Address
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted)]"
                />

                <input
                  type="email"
                  placeholder="john@example.com"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Enter a valid email",
                    },
                  })}
                  className={`w-full h-12 rounded-xl bg-[var(--bg)] border ${
                    errors.email
                      ? "border-[var(--danger)]"
                      : "border-[var(--border)]"
                  } pl-12 pr-4 text-sm text-[var(--text)] placeholder:text-[#59615D] outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/10 transition-all`}
                />
              </div>

              {errors.email && (
                <p className="text-xs text-[var(--danger)] mt-1.5">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-[var(--text)] mb-2">
                Password
              </label>

              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted)]"
                />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                  })}
                  className={`w-full h-12 rounded-xl bg-[var(--bg)] border ${
                    errors.password
                      ? "border-[var(--danger)]"
                      : "border-[var(--border)]"
                  } pl-12 pr-12 text-sm text-[var(--text)] placeholder:text-[#59615D] outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/10 transition-all`}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--muted)] hover:text-[var(--primary)] transition"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {errors.password && (
                <p className="text-xs text-[var(--danger)] mt-1.5">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-[var(--text)] mb-2">
                Confirm Password
              </label>

              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted)]"
                />

                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Repeat your password"
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                  className={`w-full h-12 rounded-xl bg-[var(--bg)] border ${
                    errors.confirmPassword
                      ? "border-[var(--danger)]"
                      : "border-[var(--border)]"
                  } pl-12 pr-12 text-sm text-[var(--text)] placeholder:text-[#59615D] outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/10 transition-all`}
                />

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--muted)] hover:text-[var(--primary)] transition"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>

              {errors.confirmPassword && (
                <p className="text-xs text-[var(--danger)] mt-1.5">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full h-12 mt-2 rounded-xl bg-[var(--primary)] text-black font-semibold flex items-center justify-center gap-2 hover:bg-[var(--primary-hover)] transition-all active:scale-[0.98] shadow-[0_0_25px_rgba(199,243,107,0.08)]"
            >
              Create Account
              <ArrowRight size={18} />
            </button>
          </form>

          {/* Login link */}
          <p className="text-center text-sm text-[var(--muted)] mt-7">
            Already have an account?{" "}
            <button
              type="button"
              className="text-[var(--primary)] hover:text-[var(--primary-hover)] font-medium transition"
              onClick={() => navigate("/login")}
            >
              Log in
            </button>
          </p>
        </div>

        <p className="text-center text-xs text-[#59615D] mt-6">
          NEXA · Your products, organized.
        </p>
      </div>
    </div>
  );
};

export default Register;

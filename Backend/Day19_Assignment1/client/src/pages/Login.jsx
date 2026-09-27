import React from "react";
import { Mail, Lock, Eye, EyeOff, ArrowRight, ShoppingBag } from "lucide-react";
import { useAuth } from "../hooks/useAuthForm";

const Login = () => {
  const {
    showPassword,
    setShowPassword,
    navigate,
    register,
    handleSubmit,
    errors,
    onLoginSubmit,
  } = useAuth();

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
            Welcome back
          </h1>

          <p className="text-sm text-[var(--muted)] mt-2">
            Sign in to continue to your products.
          </p>
        </div>

        {/* Card */}
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 sm:p-8 shadow-2xl shadow-black/20">
          <form onSubmit={handleSubmit(onLoginSubmit)} className="space-y-5">
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
                  placeholder="Enter your password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
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

            {/* Submit */}
            <button
              type="submit"
              className="w-full h-12 rounded-xl bg-[var(--primary)] text-black font-semibold flex items-center justify-center gap-2 hover:bg-[var(--primary-hover)] transition-all active:scale-[0.98] shadow-[0_0_25px_rgba(199,243,107,0.08)]"
            >
              Sign In
              <ArrowRight size={18} />
            </button>
          </form>

          {/* Register link */}
          <p className="text-center text-sm text-[var(--muted)] mt-7">
            Don't have an account?{" "}
            <button
              type="button"
              className="text-[var(--primary)] hover:text-[var(--primary-hover)] font-medium transition"
              onClick={() => navigate("/")}
            >
              Create account
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

export default Login;

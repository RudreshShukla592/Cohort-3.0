import { User, Mail, Lock, Eye, ArrowRight, Zap } from "lucide-react";

const RegisterForm = () => {
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

          <p className="mt-2 text-zinc-500">Join SkyMart and start shopping</p>

          <form className="mt-8 space-y-5">
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
              />
            </div>

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
              />
            </div>

            {/* Password */}

            <div className="relative">
              <Lock
                size={18}
                className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500"
              />

              <input
                type="password"
                placeholder="Password (min 6 chars)"
                className="h-14 w-full rounded-2xl border border-zinc-700 bg-[#1C1C1C] pl-14 pr-14 text-white placeholder:text-zinc-500 outline-none transition-all duration-300 focus:border-lime-400 focus:ring-2 focus:ring-lime-400/20"
              />

              <Eye
                size={18}
                className="absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer text-zinc-500 hover:text-white transition"
              />
            </div>

            {/* Confirm Password */}

            <div className="relative">
              <Lock
                size={18}
                className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500"
              />

              <input
                type="password"
                placeholder="Confirm password"
                className="h-14 w-full rounded-2xl border border-zinc-700 bg-[#1C1C1C] pl-14 pr-5 text-white placeholder:text-zinc-500 outline-none transition-all duration-300 focus:border-lime-400 focus:ring-2 focus:ring-lime-400/20"
              />
            </div>

            {/* Button */}

            <button className="flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-lime-400 text-lg font-semibold text-black transition-all duration-300 hover:scale-[1.02] hover:bg-lime-300 active:scale-[0.98]">
              Create Account
              <ArrowRight size={20} />
            </button>
          </form>

          <p className="mt-8 text-center text-zinc-500">
            Already have an account?{" "}
            <span className="cursor-pointer font-semibold text-lime-400 hover:underline">
              Sign in
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default RegisterForm;

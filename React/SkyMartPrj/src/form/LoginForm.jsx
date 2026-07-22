import { Mail, Lock, ArrowRight, Eye } from "lucide-react";

const LoginForm = () => {
  return (
    <div className="w-full max-w-[480px] rounded-[30px] border border-zinc-800 bg-[#131313] p-10 shadow-[0_0_40px_rgba(0,0,0,0.35)]">
      <h2 className="text-4xl font-bold text-white">Sign in</h2>

      <p className="mt-2 text-zinc-500">Enter your credentials to continue</p>

      <form className="mt-8 space-y-5">
        <div className="relative">
          <Mail
            className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500"
            size={18}
          />

          <input
            type="email"
            placeholder="Email address"
            className="h-14 w-full rounded-2xl border border-zinc-700 bg-[#1C1C1C] pl-14 pr-5 text-white placeholder:text-zinc-500 outline-none transition-all duration-300 focus:border-lime-400 focus:ring-2 focus:ring-lime-400/20"
          />
        </div>

        <div className="relative">
          <Lock
            className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500"
            size={18}
          />

          <input
            type="password"
            placeholder="Password"
            className="h-14 w-full rounded-2xl border border-zinc-700 bg-[#1C1C1C] pl-14 pr-14 text-white placeholder:text-zinc-500 outline-none transition-all duration-300 focus:border-lime-400 focus:ring-2 focus:ring-lime-400/20"
          />

          <Eye
            className="absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer text-zinc-500 hover:text-white transition"
            size={18}
          />
        </div>

        <button className="flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-lime-400 text-lg font-semibold text-black transition-all duration-300 hover:scale-[1.02] hover:bg-lime-300 active:scale-[0.98]">
          Sign in
          <ArrowRight
            size={20}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </button>
      </form>

      <p className="mt-8 text-center text-zinc-500">
        Don't have an account?{" "}
        <span className="cursor-pointer font-semibold text-lime-400 hover:underline">
          Create one
        </span>
      </p>
    </div>
  );
};

export default LoginForm;

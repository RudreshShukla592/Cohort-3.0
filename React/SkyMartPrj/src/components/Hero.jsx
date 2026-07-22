import { Zap } from "lucide-react";

const Hero = () => {
  return (
    <section className="hidden md:flex flex-col  justify-between border-r border-zinc-700 p-12">
      {/* Logo */}

      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-lime-400 text-black">
          <Zap size={22} strokeWidth={3} />
        </div>

        <h1 className="text-4xl font-bold">
          Sky<span className="text-lime-400">Mart</span>
        </h1>
      </div>

      {/* Content */}

      <div className="max-w-xl">
        <p className="mb-5 text-lg font-semibold tracking-widest text-lime-400 uppercase">
          Welcome Back
        </p>

        <h2 className="text-7xl font-bold leading-tight">Shop the future.</h2>

        <h2 className="mb-8 text-7xl font-bold text-lime-400">Today.</h2>

        <p className="max-w-lg text-xl leading-9 text-zinc-500">
          Thousands of products, lightning-fast delivery, and prices that make
          your wallet happy.
        </p>
      </div>

      {/* Stats */}

      <div className="grid grid-cols-3 gap-5">
        <div className="rounded-2xl border border-zinc-700 bg-zinc-900/30 py-8 text-center transition hover:-translate-y-1 hover:border-lime-400">
          <h3 className="text-4xl font-bold text-lime-400">20K+</h3>

          <p className="mt-2 text-zinc-400">Products</p>
        </div>

        <div className="rounded-2xl border border-zinc-700 bg-zinc-900/30 py-8 text-center transition hover:-translate-y-1 hover:border-lime-400">
          <h3 className="text-4xl font-bold text-lime-400">50K+</h3>

          <p className="mt-2 text-zinc-400">Users</p>
        </div>

        <div className="rounded-2xl border border-zinc-700 bg-zinc-900/30 py-8 text-center transition hover:-translate-y-1 hover:border-lime-400">
          <h3 className="text-4xl font-bold text-lime-400">4.9★</h3>

          <p className="mt-2 text-zinc-400">Rating</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;

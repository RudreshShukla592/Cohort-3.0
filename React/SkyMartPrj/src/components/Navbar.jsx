import { useState } from "react";
import { ShoppingCart, LogOut, User, Zap, Menu, X } from "lucide-react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-zinc-800 bg-[#0d0d0d]/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-5">
          {/* Logo */}

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-lime-400 text-black font-bold">
              <Zap size={22} strokeWidth={3} />
            </div>

            <h1 className="text-3xl font-bold text-white">
              Sky<span className="text-lime-400">Mart</span>
            </h1>
          </div>

          {/* Nav Links */}

          <ul className="hidden items-center gap-10 font-medium md:flex">
            <li className="cursor-pointer text-lime-400 transition hover:text-lime-300">
              Home
            </li>

            <li className="cursor-pointer text-zinc-400 transition hover:text-white">
              Shop
            </li>

            <li className="cursor-pointer text-zinc-400 transition hover:text-white">
              About
            </li>
          </ul>

          {/* Right */}

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 rounded-xl border border-zinc-700 bg-[#151515] px-4 py-2 md:flex">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-lime-400 font-semibold text-black">
                A
              </div>

              <span className="text-sm text-white">Aryan Shukla</span>
            </div>

            <button className="rounded-xl border border-zinc-700 p-3 text-white transition hover:border-lime-400 hover:text-lime-400">
              <ShoppingCart size={20} />
            </button>

            <button className="rounded-xl border border-zinc-700 p-3 text-white transition hover:border-red-500 hover:text-red-500">
              <LogOut size={20} />
            </button>

            {/* Mobile Menu */}

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="rounded-xl border border-zinc-700 p-3 text-white transition hover:border-lime-400 md:hidden"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        <div
          className={`overflow-hidden border-t border-zinc-800 bg-[#111111] transition-all duration-300 md:hidden ${
            menuOpen ? "max-h-64" : "max-h-0 border-none"
          }`}
        >
          <ul className="flex flex-col px-8 py-5">
            <li className="rounded-xl px-4 py-3 text-lime-400 hover:bg-zinc-800">
              Home
            </li>

            <li className="mt-2 rounded-xl px-4 py-3 text-zinc-300 hover:bg-zinc-800 hover:text-white">
              Shop
            </li>

            <li className="mt-2 rounded-xl px-4 py-3 text-zinc-300 hover:bg-zinc-800 hover:text-white">
              About
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

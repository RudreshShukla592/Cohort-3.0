import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="mt-16 border-t border-zinc-800 bg-[#0d0d0d]">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 text-center md:flex-row">
        {/* Logo */}

        <h2 className="text-2xl font-bold text-white">
          Sky<span className="text-lime-400">Mart</span>
        </h2>

        {/* Copyright */}

        <p className="flex items-center gap-2 text-zinc-500">
          Made with
          <Heart size={16} className="fill-red-500 text-red-500" />
          by SkyMart Team
        </p>

        {/* Links */}

        <div className="flex gap-6 text-zinc-400">
          <span className="cursor-pointer transition hover:text-lime-400">
            Privacy
          </span>

          <span className="cursor-pointer transition hover:text-lime-400">
            Terms
          </span>

          <span className="cursor-pointer transition hover:text-lime-400">
            Contact
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

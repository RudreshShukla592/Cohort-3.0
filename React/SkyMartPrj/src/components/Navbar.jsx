import { useContext, useState } from "react";
import { ShoppingCart, LogOut, User, Zap, Menu, X } from "lucide-react";
import { useNavigate } from "react-router";
import { MyShop } from "../context/MyContext";

const Navbar = () => {
  let navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  let { currentUser, setCurrentUser, cartItems } = useContext(MyShop);

  let logOutLogic = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    navigate("/login");
  };

  const totalCartItem = cartItems
    .reduce((acc, item) => acc +  item.quantity, 0)

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
            <li
              onClick={() => navigate("/home")}
              className="cursor-pointer text-zinc-400 transition hover:text-white"
            >
              Home
            </li>

            <li
              onClick={() => navigate("/shop")}
              className="cursor-pointer text-zinc-400 transition hover:text-white"
            >
              Shop
            </li>

            <li
              onClick={() => navigate("/about")}
              className="cursor-pointer text-zinc-400 transition hover:text-white"
            >
              About
            </li>
          </ul>

          {/* Right */}

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 rounded-xl border border-zinc-700 bg-[#151515] px-4 py-2 md:flex">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-lime-400 font-semibold text-black">
                {currentUser.fullName[0].toUpperCase()}
              </div>

              <span className="text-sm text-white">{currentUser.fullName}</span>
            </div>

            <button
              onClick={() => navigate("/cart")}
              className="relative rounded-xl border border-zinc-700 p-3 text-white transition hover:border-lime-400 hover:text-lime-400"
            >
              <ShoppingCart size={20} />

              {cartItems.length > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-yellow-400 text-[10px] font-bold text-black">
                  {totalCartItem>9 ? "9+" : totalCartItem}
                </span>
              )}
            </button>

            <button
              onClick={logOutLogic}
              className="rounded-xl border border-zinc-700 p-3 text-white transition hover:border-red-500 hover:text-red-500"
            >
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
            <li
              onClick={() => navigate("/home")}
              className="rounded-xl px-4 py-3 text-zinc-300 hover:bg-zinc-800 hover:text-white"
            >
              Home
            </li>

            <li
              onClick={() => navigate("/shop")}
              className="mt-2 rounded-xl px-4 py-3 text-zinc-300 hover:bg-zinc-800 hover:text-white"
            >
              Shop
            </li>

            <li
              onClick={() => navigate("/about")}
              className="mt-2 rounded-xl px-4 py-3 text-zinc-300 hover:bg-zinc-800 hover:text-white"
            >
              About
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

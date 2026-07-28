import { ShoppingCart, Search } from "lucide-react";
import { useContext } from "react";
import { MyShop } from "../context/RecipeContext";

function Navbar({ onCartClick }) {



  

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto h-20 px-6 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer">
          <span className="text-3xl">🍽️</span>

          <h1 className="text-2xl font-bold text-orange-500">RecipeHub</h1>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 mx-10 max-w-lg">
          <div className="relative w-full">
            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search recipes..."
              className="w-full pl-12 pr-4 py-3 rounded-full border focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-5">
          {/* Cart */}

          <button type="button" onClick={onCartClick} className="relative">
            <ShoppingCart
              size={26}
              className="text-gray-700 hover:text-orange-500"
            />

            <span className="absolute -top-2 -right-2 bg-orange-500 text-white h-5 w-5 rounded-full flex items-center justify-center text-xs">
              3
            </span>
          </button>

          {/* Profile */}

          <img
            src="https://i.pravatar.cc/150?img=12"
            alt="profile"
            className="w-11 h-11 rounded-full object-cover"
          />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

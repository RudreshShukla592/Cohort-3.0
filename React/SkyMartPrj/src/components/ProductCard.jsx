import { ShoppingCart, Star, Check } from "lucide-react";
import { useContext } from "react";
import { useNavigate } from "react-router";
import { MyShop } from "../context/MyContext";

const ProductCard = ({ product, isInCart }) => {
  let { setCartItems } = useContext(MyShop);
  let navigate = useNavigate();

  return (
    <div className="group overflow-hidden  rounded-2xl border border-zinc-800 bg-[#151515] transition-all duration-300 hover:-translate-y-1 hover:border-lime-400 hover:shadow-[0_0_25px_rgba(163,230,53,0.08)]">
      {/* Image */}

      <div
        onClick={() => navigate(`/detail/${product.id}`)}
        className="relative cursor-pointer flex h-64 items-center justify-center overflow-hidden bg-white p-6"
      >
        <span className="absolute left-4 top-4 z-10 rounded-full bg-black/80 px-3 py-1 text-xs font-medium capitalize text-white backdrop-blur">
          {product.category}
        </span>

        <img
          src={product.thumbnail}
          alt={product.title}
          className="max-h-full max-w-full object-contain transition duration-300 group-hover:scale-105"
        />
      </div>

      {/* Content */}

      <div className="space-y-3 p-5">
        <p className="text-xs uppercase tracking-wide text-zinc-500">
          {product.brand}
        </p>

        <h2 className="line-clamp-2 min-h-[56px] text-lg font-semibold text-white">
          {product.title}
        </h2>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Star size={16} className="fill-yellow-400 text-yellow-400" />

            <span className="text-sm font-medium text-zinc-300">
              {product.rating}
            </span>
          </div>

          <span className="text-sm text-zinc-500">{product.stock} left</span>
        </div>

        <div className="flex items-center justify-between pt-2">
          <h3 className="text-2xl font-bold text-lime-400">${product.price}</h3>

          {isInCart ? (
            <button
              disabled
              className="flex cursor-default items-center gap-2 rounded-xl bg-green-500 px-4 py-2 text-sm font-semibold text-white"
            >
              <Check size={16} />
              Added
            </button>
          ) : (
            <button
              onClick={() =>
                setCartItems((prev) => [...prev, { ...product, quantity: 1 }])
              }
              className="flex items-center gap-2 rounded-xl bg-lime-400 px-4 py-2 text-sm font-semibold text-black transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <ShoppingCart size={16} />
              Add
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

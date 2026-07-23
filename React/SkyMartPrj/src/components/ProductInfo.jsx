import {
  ShoppingCart,
  Heart,
  Star,
  Truck,
  ShieldCheck,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  
} from "lucide-react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { MyShop } from "../context/MyContext";

const ProductInfo = ({ singleProductData, id, isInCart }) => {
  let navigate = useNavigate();
  let { setCartItems, incrementQuantity, decrementQuantity, removeFromCart } =
    useContext(MyShop);

  const currentId = Number(id);

  let prevProduct = () => {
    if (currentId > 1) {
      navigate(`/detail/${currentId - 1}`);
    }
  };

  let nextProduct = () => {
    if (currentId < 50) {
      navigate(`/detail/${currentId + 1}`);
    }
  };

  const [likedProduct, setLikedProduct] = useState(false);

  return (
    <section className="grid gap-12 lg:grid-cols-2">
    
   {/* Image */}

      <div className="overflow-hidden rounded-3xl bg-white p-10">
        <img
          src={singleProductData.thumbnail}
          alt={singleProductData.title}
          className="mx-auto h-[500px] object-contain"
        />
      </div>

      {/* Right */}

      <div>
        <span className="rounded-full bg-lime-400/10 px-4 py-2 text-sm capitalize text-lime-400">
          {singleProductData.category}
        </span>

        <h1 className="mt-5 text-5xl font-bold leading-tight">
          {singleProductData.title}
        </h1>

        <div className="mt-6 flex items-center gap-2">
          <Star className="fill-yellow-400 text-yellow-400" size={18} />
          <Star className="fill-yellow-400 text-yellow-400" size={18} />
          <Star className="fill-yellow-400 text-yellow-400" size={18} />
          <Star className="fill-yellow-400 text-yellow-400" size={18} />
          <Star className="fill-yellow-400 text-yellow-400" size={18} />

          <span className="text-zinc-400">{singleProductData.rating}</span>

          <span className="text-zinc-500">
            ({singleProductData.stock} in stock)
          </span>
        </div>

        <h2 className="mt-8 text-5xl font-bold text-lime-400">
          ${singleProductData.price}
        </h2>

        <p className="mt-8 leading-8 text-zinc-400">
          {singleProductData.description}
        </p>

        <div className="mt-10 flex gap-4">
          {isInCart ? (
            <div className="flex flex-1 items-center justify-center rounded-2xl border border-zinc-700">
              <button
                onClick={() => {
                  if (isInCart.quantity < 2) removeFromCart(isInCart.id);
                  decrementQuantity(isInCart.id);
                }}
                className="px-6 py-4 text-white transition hover:text-lime-400"
              >
                <Minus size={18} />
              </button>

              <span className="px-8 text-lg font-semibold">
                {isInCart.quantity}
              </span>

              <button
                onClick={() => incrementQuantity(isInCart.id)}
                className="px-6 py-4 text-white transition hover:text-lime-400"
              >
                <Plus size={18} />
              </button>
            </div>
          ) : (
            <button
              onClick={() =>
                setCartItems((prev) => [
                  ...prev,
                  { ...singleProductData, quantity: 1 },
                ])
              }
              className="flex flex-1 items-center justify-center gap-3 rounded-2xl bg-lime-400 py-4 text-lg font-semibold text-black transition hover:scale-[1.02]"
            >
              <ShoppingCart size={20} />
              Add To Cart
            </button>
          )}

          <button
            onClick={() => setLikedProduct((prev) => !prev)}
            className={`rounded-2xl border p-4 transition-all duration-300 ${
              likedProduct
                ? "border-red-500 bg-red-500/10"
                : "border-zinc-700 hover:border-red-500"
            }`}
          >
            <Heart
              size={22}
              className={`transition-all duration-300 ${
                likedProduct
                  ? "fill-red-500 text-red-500 scale-110"
                  : "text-zinc-400"
              }`}
            />
          </button>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-zinc-700 p-5 text-center">
            <Truck className="mx-auto mb-3 text-lime-400" />
            <p>Free Delivery</p>
          </div>

          <div className="rounded-2xl border border-zinc-700 p-5 text-center">
            <ShieldCheck className="mx-auto mb-3 text-lime-400" />
            <p>Secure Pay</p>
          </div>

          <div className="rounded-2xl border border-zinc-700 p-5 text-center">
            <RotateCcw className="mx-auto mb-3 text-lime-400" />
            <p>Easy Return</p>
          </div>
        </div>

        <div className="mt-10 flex gap-4">
          <button
            onClick={prevProduct}
            className="flex-1 rounded-xl bg-zinc-800 py-4 transition hover:bg-zinc-700"
          >
            <ChevronLeft className="mr-2 inline" />
            Previous
          </button>

          <button
            onClick={nextProduct}
            className="flex-1 rounded-xl bg-lime-400 py-4 font-semibold text-black transition hover:bg-lime-300"
          >
            Next
            <ChevronRight className="ml-2 inline" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductInfo;

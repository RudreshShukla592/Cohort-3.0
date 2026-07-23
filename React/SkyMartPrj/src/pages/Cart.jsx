import { Minus, Plus, Trash2, ShoppingBag, PackageOpen } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useContext } from "react";
import { MyShop } from "../context/MyContext";
import { useNavigate } from "react-router";
import OrderSuccess from "../components/OrderSuccess";

const Cart = () => {
  let navigate = useNavigate();
  let {
    cartItems,
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
    clearCart,
    setOrderPlaced,
    orderPlaced,
  } = useContext(MyShop);

  const placeOrder = () => {
    if (cartItems.length === 0) return;

    setOrderPlaced(true);

    setTimeout(() => {
      clearCart();
      setOrderPlaced(false);
      navigate("/home"); // optional
    }, 2000);
  };

  const totalCartValue = cartItems
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2);

  const totalCartItem = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white">
      <Navbar />

      {orderPlaced && <OrderSuccess />}

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="mb-10 text-4xl font-bold">
          Shopping <span className="text-lime-400">Cart</span>
        </h1>

        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          {/* Cart Items */}

          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center">
              <PackageOpen
                size={80}
                strokeWidth={1.5}
                className="mb-5 text-gray-500"
                opacity={0.5}
              />

              <h2 className="text-3xl font-semibold text-white">
                Your cart is empty
              </h2>

              <p className="mt-2 text-gray-400">
                Looks like you haven't added anything yet.
              </p>

              <button
                onClick={() => navigate("/shop")}
                className="mt-8 rounded-xl bg-lime-400 px-6 py-3 font-semibold text-black transition-all duration-200 hover:scale-105 hover: bg-lime-400 active:scale-95"
              >
                Browse Products
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col gap-5 rounded-3xl border border-zinc-800 bg-[#151515] p-5 sm:flex-row sm:items-center"
                >
                  <div className="flex h-36 w-full items-center justify-center rounded-2xl bg-white p-4 sm:w-36">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="max-h-full object-contain"
                    />
                  </div>

                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <h2 className="text-xl font-semibold">{item.title}</h2>

                      <p className="mt-2 text-2xl font-bold text-lime-400">
                        ${item.price}
                      </p>
                    </div>

                    <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center rounded-xl border border-zinc-700">
                        <button
                          onClick={() => {
                            if (item.quantity < 2) removeFromCart(item.id);
                            decrementQuantity(item.id);
                          }}
                          className="p-3 hover:text-lime-400"
                        >
                          <Minus size={18} />
                        </button>

                        <span className="px-5 font-semibold">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() => incrementQuantity(item.id)}
                          className="p-3 hover:text-lime-400"
                        >
                          <Plus size={18} />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="rounded-xl border border-red-500/40 p-3 text-red-400 transition hover:bg-red-500/10"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Summary */}

          <div className="sticky top-28 h-fit rounded-3xl border border-zinc-800 bg-[#151515] p-7">
            <div className="mb-6 flex items-center gap-3">
              <ShoppingBag className="text-lime-400" />

              <h2 className="text-2xl font-bold">Order Summary</h2>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between text-zinc-400">
                <span>Items</span>

                <span>{totalCartItem}</span>
              </div>

              <div className="flex justify-between text-zinc-400">
                <span>Shipping</span>

                <span>Free</span>
              </div>

              <div className="border-t border-zinc-700 pt-5">
                <div className="flex justify-between">
                  <span className="text-xl font-semibold">Total</span>

                  <span className="text-3xl font-bold text-lime-400">
                    ${totalCartValue}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={placeOrder}
              className="mt-8 w-full rounded-2xl bg-lime-400 py-4 text-lg font-bold text-black transition hover:scale-[1.02] active:scale-95"
            >
              Place Order
            </button>

            <button
              onClick={clearCart}
              className="mt-4 w-full rounded-2xl border border-red-500 py-4 font-semibold text-red-400 transition hover:bg-red-500/10"
            >
              Clear Cart
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Cart;

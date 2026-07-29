import { useContext, useState } from "react";
import CartContent from "./CartContent";
import { MyShop } from "../context/RecipeContext";
import { CheckCircle2 } from "lucide-react";

function CartDrawer({ isOpen, onClose }) {
  if (!isOpen) {
    return null;
  }

  let { cartItems, clearCart } = useContext(MyShop);
  const [orderedPlaced, setOrderedPlaced] = useState(false);

  let checkout = () => {
    if (cartItems.length === 0) return;

    setOrderedPlaced(true);

    setTimeout(() => {
      clearCart();
      setOrderedPlaced(false);
    }, 2000);
  };

  let totalPrice = cartItems
    .reduce((acc, val) => acc + Number(val.price) * val.quantity, 0)
    .toFixed(2);

  return (
    <div className="fixed inset-0 z-50">
      <button
        type="button"
        aria-label="Close cart drawer"
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      <aside className="absolute right-0 top-0 flex h-screen w-full flex-col bg-white shadow-2xl sm:w-96">
        {/* Header */}

        <div className="flex items-center justify-between border-b p-5">
          <h2 className="text-2xl font-bold">Your Cart</h2>

          <button
            type="button"
            onClick={onClose}
            className="text-3xl font-bold"
            aria-label="Close cart drawer"
          >
            ×
          </button>
        </div>

        {/* Cart Items */}

        <div className="flex-1 overflow-y-auto p-5">
          {orderedPlaced ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <CheckCircle2
                size={80}
                className="text-green-500 animate-bounce"
              />

              <h2 className="mt-6 text-2xl font-bold text-gray-800">
                Order Placed!
              </h2>

              <p className="mt-2 text-gray-500">
                Your delicious food recipies are here. 🍽️
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              {cartItems.map((recipe) => (
                <CartContent key={recipe.id} recipe={recipe} />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}

        <div className="border-t p-5">
          <div className="mb-4 flex justify-between text-lg">
            <span>Total</span>

            <span className="font-bold text-orange-500">${totalPrice}</span>
          </div>

          <button
            onClick={checkout}
            className="w-full rounded-lg bg-orange-500 py-3 text-white transition hover:bg-orange-600"
            type="button"
          >
            Checkout
          </button>
        </div>
      </aside>
    </div>
  );
}

export default CartDrawer;

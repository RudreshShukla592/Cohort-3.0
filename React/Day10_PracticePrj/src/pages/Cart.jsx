import React, { useContext } from "react";
import { MyStore } from "../context/MyContext";

const Cart = () => {

  let { cartItems } = useContext(MyStore)
  return (
    <div className="min-h-screen bg-gray-800 text-white p-4">
      <h1 className="text-3xl font-bold mb-6">🛒 My Cart</h1>

      {cartItems.length === 0 ? (
        <div className="flex justify-center items-center h-96">
          <h2 className="text-2xl text-gray-400">Your cart is empty.</h2>
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="bg-gray-900 rounded-xl p-4 flex items-center justify-between border border-gray-700 hover:border-indigo-500 transition"
            >
              {/* Left */}
              <div className="flex items-center gap-5">
                <div className="bg-white rounded-lg p-2 w-28 h-28 flex justify-center items-center">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full object-contain"
                  />
                </div>

                <div>
                  <h2 className="font-semibold text-lg max-w-md line-clamp-2">
                    {item.title}
                  </h2>

                  <p className="text-gray-400 mt-1 capitalize">
                    {item.category}
                  </p>

                  <p className="text-yellow-400 mt-2">
                    ⭐ {item.rating.rate} ({item.rating.count})
                  </p>
                </div>
              </div>

              {/* Right */}
              <div className="flex flex-col items-end gap-3">
                <p className="text-3xl font-bold text-green-400">
                  ${item.price}
                </p>

                <div className="flex items-center bg-gray-800 rounded-lg overflow-hidden border border-gray-600">
                  <button className="w-10 h-10 flex items-center justify-center text-xl hover:bg-red-500 transition">
                    −
                  </button>

                  <span className="w-12 text-center font-semibold">1</span>

                  <button className="w-10 h-10 flex items-center justify-center text-xl hover:bg-green-500 transition">
                    +
                  </button>
                </div>

                <button className="w-full bg-red-500 hover:bg-red-600 py-2 rounded-lg transition">
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;

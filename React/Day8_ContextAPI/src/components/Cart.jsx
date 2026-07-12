import React, { useContext } from "react";
import { MyShop } from "../context/MyWebsite";

const Cart = () => {

  let {cardItems}=useContext(MyShop)

  return (
    <div className="min-h-screen bg-gray-800 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">🛒 My Cart</h1>

      {cardItems.length === 0 ? (
        <div className="flex justify-center items-center h-96">
          <h2 className="text-2xl text-gray-400">Your cart is empty.</h2>
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          {cardItems.map((item) => (
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
                <p className="text-2xl font-bold text-green-400">
                  ${item.price}
                </p>

                <p className="bg-gray-700 px-3 py-1 rounded-md">
                  Qty : 1
                </p>

                <button className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition">
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
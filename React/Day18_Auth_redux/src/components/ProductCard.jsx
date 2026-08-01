import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:border-indigo-500 transition-all duration-300">
      {/* Product Image */}
      <div className="h-64 bg-gray-800 flex items-center justify-center p-5">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="h-full object-contain hover:scale-105 transition duration-300"
        />
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col gap-3">
        {/* Category + Stock */}
        <div className="flex justify-between items-center">
          <span className="bg-indigo-600/20 text-indigo-400 text-xs px-3 py-1 rounded-full capitalize">
            {product.category}
          </span>

          <span
            className={`text-xs font-medium px-3 py-1 rounded-full ${
              product.stock > 0
                ? "bg-green-500/20 text-green-400"
                : "bg-red-500/20 text-red-400"
            }`}
          >
            {product.availabilityStatus}
          </span>
        </div>

        {/* Title */}
        <h2 className="text-lg font-bold text-white line-clamp-2">
          {product.title}
        </h2>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <span className="text-yellow-400">⭐</span>
          <span className="text-gray-300">{product.rating}</span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mt-2">
          <div>
            <p className="text-3xl font-bold text-green-400">
              ${product.price}
            </p>

            <p className="text-sm text-gray-400">{product.stock} left</p>
          </div>

          <button className="bg-indigo-600 hover:bg-indigo-500 active:scale-95 px-5 py-3 rounded-xl font-semibold transition">
            🛒 Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

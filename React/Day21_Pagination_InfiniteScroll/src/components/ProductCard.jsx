import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:border-indigo-500 hover:-translate-y-1 transition-all duration-300">

      {/* Image */}
      <div className="h-64 bg-gray-800 flex items-center justify-center p-5">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="h-full w-full object-contain hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col gap-4">

        {/* Category + Stock */}
        <div className="flex items-center justify-between gap-2">
          <span className="bg-indigo-500/15 text-indigo-400 px-3 py-1 rounded-full text-xs font-medium capitalize">
            {product.category}
          </span>

          <span className="text-xs text-green-400 bg-green-500/10 px-3 py-1 rounded-full">
            {product.availabilityStatus}
          </span>
        </div>

        {/* Title */}
        <h2 className="text-lg font-semibold text-white line-clamp-2 min-h-14">
          {product.title}
        </h2>

        {/* Rating */}
        <div className="flex items-center gap-2 text-sm">
          <span className="text-yellow-400">
            ⭐ {product.rating}
          </span>

          <span className="text-gray-500">
            ({product.reviews?.length || 0} reviews)
          </span>
        </div>

        {/* Price + Cart */}
        <div className="flex items-center justify-between gap-3 pt-2">
          <div>
            <p className="text-2xl font-bold text-green-400">
              ${product.price}
            </p>

            <p className="text-xs text-gray-500 mt-1">
              {product.stock} left
            </p>
          </div>

          <button className="bg-indigo-600 hover:bg-indigo-500 active:scale-95 px-5 py-3 rounded-xl text-white font-semibold transition-all duration-200">
            🛒 Add to Cart
          </button>
        </div>

      </div>
    </div>
  );
};

export default ProductCard;
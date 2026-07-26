import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">

      {/* Product Image */}
      <div className="h-64 bg-gray-50 p-6 flex items-center justify-center">
        <img
          src={product.image}
          alt={product.title}
          className="h-full object-contain hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content */}
      <div className="p-5">

        {/* Category */}
        <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-indigo-100 text-indigo-700 capitalize">
          {product.category}
        </span>

        {/* Title */}
        <h2 className="mt-4 text-lg font-bold text-gray-800 line-clamp-2">
          {product.title}
        </h2>

        {/* Description */}
        <p className="mt-2 text-sm text-gray-500 line-clamp-3">
          {product.description}
        </p>

        {/* Rating */}
        <div className="flex items-center justify-between mt-5">
          <div className="flex items-center gap-2">
            <span className="text-yellow-500">⭐</span>
            <span className="font-medium text-gray-700">
              {product.rating.rate}
            </span>
            <span className="text-gray-400 text-sm">
              ({product.rating.count})
            </span>
          </div>

          <p className="text-2xl font-bold text-indigo-600">
            ${product.price}
          </p>
        </div>

        {/* Button */}
        <button className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition-colors">
          Add to Cart
        </button>

      </div>
    </div>
  );
};

export default ProductCard;
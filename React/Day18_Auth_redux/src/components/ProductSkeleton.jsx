import React from "react";

const ProductSkeleton = () => {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden animate-pulse">
      {/* Image */}
      <div className="h-64 bg-gray-800"></div>

      {/* Content */}
      <div className="p-5 space-y-4">
        {/* Category & Stock */}
        <div className="flex justify-between">
          <div className="h-6 w-20 rounded-full bg-gray-700"></div>
          <div className="h-6 w-24 rounded-full bg-gray-700"></div>
        </div>

        {/* Title */}
        <div className="space-y-2">
          <div className="h-5 bg-gray-700 rounded w-full"></div>
          <div className="h-5 bg-gray-700 rounded w-3/4"></div>
        </div>

        {/* Rating */}
        <div className="h-4 w-24 bg-gray-700 rounded"></div>

        {/* Price & Button */}
        <div className="flex items-center justify-between pt-3">
          <div>
            <div className="h-8 w-20 bg-gray-700 rounded"></div>
            <div className="h-4 w-14 bg-gray-700 rounded mt-2"></div>
          </div>

          <div className="h-12 w-28 bg-gray-700 rounded-xl"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductSkeleton;

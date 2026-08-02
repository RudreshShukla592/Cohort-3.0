import React from "react";
import { useProductAPI } from "../hooks/productHooks";

const Filter = () => {

  let { filterProducts } =  useProductAPI()

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 flex flex-col md:flex-row items-center gap-4">
      {/* Search */}
      <div className="flex w-full gap-3">
        <input
          onChange={(e)=>  filterProducts(e.target.value)}
          type="text"
          placeholder="🔍 Search products..."
          className="flex-1 px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-400 outline-none focus:border-indigo-500 transition"
        />

        <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-semibold transition">
          Search
        </button>
      </div>

      {/* Category */}
      <select className="w-full md:w-60 px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white outline-none focus:border-indigo-500 transition">
        <option value="">All Categories</option>
        <option value="groceries">Groceries</option>
        <option value="beauty">Beauty</option>
        <option value="furniture">Furniture</option>
      </select>
    </div>
  );
};

export default Filter;

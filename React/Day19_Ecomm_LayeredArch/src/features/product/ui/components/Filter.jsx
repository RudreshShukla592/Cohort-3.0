import React from "react";
import { useAllCategories } from "../../hooks/useProductsHook";

const Filter = ({ seacrh, setSeacrh, category,setCategory }) => {
  let { data, isPending, errors } = useAllCategories();

  if (isPending) return <h1>Loading..</h1>;

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 flex flex-col md:flex-row items-center gap-4">
      {/* Search */}
      <div className="flex w-full gap-3">
        <input
          value={seacrh}
          onChange={(e) => setSeacrh(e.target.value)}
          type="text"
          placeholder="🔍 Search products..."
          className="flex-1 px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-400 outline-none focus:border-indigo-500 transition"
        />
      </div>

      {/* Category */}
      <select value={category} onChange={(e)=> setCategory(e.target.value)} className="w-full md:w-60 px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white outline-none focus:border-indigo-500 transition">
        <option value="">All Categories</option>
        {data.map((item) => (
          <option value={item.slug} key={item.slug}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filter;

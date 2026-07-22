import React, { useContext, useEffect, useState } from "react";
import { Search } from "lucide-react";
import { MyShop } from "../context/MyContext";


const ShopFilter = () => {
  const { allProducts, setproductsData, search, setSearch , selectedCategory, setSelectedCategory} =
    useContext(MyShop);
  
  useEffect(() => {
    let filtered = allProducts;

    if (selectedCategory !== "") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory,
      );
    }

    if (search.trim() !== "") {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase()),
      );
    }

    setproductsData(filtered);
     window.scrollTo(0, 0);
  }, [selectedCategory, search, allProducts]);

  return (
    <div className="mb-10 flex flex-col gap-4 rounded-2xl border border-zinc-800 bg-[#151515] p-5 lg:flex-row">
      <div className="relative flex-1">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
        />

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
          className="h-12 w-full rounded-xl border border-zinc-700 bg-[#1c1c1c] pl-12 pr-4 outline-none transition focus:border-lime-400"
        />
      </div>

      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="h-12 rounded-xl border border-zinc-700 bg-[#1c1c1c] px-5 text-zinc-300 outline-none focus:border-lime-400"
      >
        <option value="">All Categories</option>
        <option value="beauty">Beauty</option>
        <option value="fragrances">Fragrances</option>
        <option value="furniture">Furniture</option>
        <option value="groceries">Groceries</option>
        <option value="home-decoration">Home Decoration</option>
        <option value="kitchen-accessories">Kitchen Accessories</option>
      </select>
    </div>
  );
};

export default ShopFilter;

import React from "react";
import ProductCard from "../components/ProductCard";
import ProductSkeleton from "../components/ProductSkeleton";
import { useProductAPI } from "../hooks/productHooks";
import Filter from "../components/Filter";

const ShopPage = () => {
  let { data, isPending, filteredProducts } = useProductAPI();

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Shop</h1>

        <Filter />

        <div className="grid grid-cols-1 mt-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {isPending
            ? Array.from({ length: 8 }).map((_, index) => (
                <ProductSkeleton key={index} />
              ))
            : filteredProducts?.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
        </div>
      </div>
    </div>
  );
};

export default ShopPage;

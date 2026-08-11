import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import { getAllProducts } from "./api/productAPI";
import ProductCard from "./components/ProductCard";

const Infinite = () => {
  let limit = 10;

  let { data, isPending, fetchNextPage, isFetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["product"],
      queryFn: ({ pageParam }) => getAllProducts(limit, pageParam),
      initialPageParam: 0,
      getNextPageParam: (lastPage, allPage) => {
        let loadedData = allPage.length * limit;
        if (loadedData < lastPage.total) return loadedData;
        return undefined;
      },
    });

  if (isPending) return "Loading...";
  console.log(data);

  let allProducts = data?.pages?.flatMap((val) => val.products) ?? [];

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-5">
        {allProducts.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
      {hasNextPage && (
        <button
          onClick={() => fetchNextPage()}
          className="px-5 py-2 rounded-lg bg-gray-800 border border-gray-700 hover:bg-indigo-600 transition"
        >
          {isFetchNextPage ? "Loading..." : "Load more"}
        </button>
      )}
    </div>
  );
};

export default Infinite;

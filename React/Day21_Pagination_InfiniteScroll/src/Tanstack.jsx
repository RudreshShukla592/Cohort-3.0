import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getAllProducts } from "./api/productAPI";
import ProductCard from "./components/ProductCard";

const Tanstack = () => {
  let limit = 10;
  const [page, setPage] = useState(1);

  let { data, isPending, error, isPlaceholderData } = useQuery({
    queryKey: ["products", page],
    queryFn: () => getAllProducts(limit, page),
    placeholderData: keepPreviousData,
  });

  let totalPages = Math.ceil(data?.total / limit);

  if (isPending) return "Loading...";
  if (error) return "Something went wrong!";

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Products */}
      <div
        style={{ opacity: isPlaceholderData ? 0.3 : 1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-5"
      >
        {data.products?.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-4 py-8">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="px-5 py-2 rounded-lg bg-gray-800 border border-gray-700 hover:bg-indigo-600 disabled:opacity-40 disabled:cursor-not-allowed transition"
        >
          ← Prev
        </button>

        <span className="px-5 py-2 rounded-lg bg-indigo-600 font-semibold">
          Page {page} of {totalPages}
        </span>

        <button
          onClick={() => setPage(page + 1)}
          disabled={page >= totalPages - 1}
          className="px-5 py-2 rounded-lg bg-gray-800 border border-gray-700 hover:bg-indigo-600 transition"
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default Tanstack;

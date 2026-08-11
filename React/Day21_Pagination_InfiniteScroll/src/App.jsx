import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./components/ProductCard";
const App = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  let limit = 10;

  const getAllProducts = async () => {
    try {
      let res = await axios.get(
        `https://dummyjson.com/products?limit=${limit}&skip=${page * limit}`,
      );
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  let totalPages = Math.ceil(products?.total / limit)

  useEffect(() => {
    getAllProducts();
      // window.scrollTo(0, 0);
  }, [page]);

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-5">
        {products.products?.map((product) => (
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
          disabled={page >= totalPages-1}
          className="px-5 py-2 rounded-lg bg-gray-800 border border-gray-700 hover:bg-indigo-600 transition"
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default App;

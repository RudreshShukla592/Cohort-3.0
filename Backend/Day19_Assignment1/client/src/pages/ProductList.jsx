import React, { useContext, useEffect, useState } from "react";
import { LoaderCircle, PackageOpen } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import useApi from "../api/useApi";
import ProductCard from "./ProductCard";

const ProductList = () => {
  const { user } = useContext(AuthContext);

  const api = useApi();

  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    limit: 10,
    totalItems: 0,
    totalPages: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getAllProducts = async (page = 1) => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get(`/products?page=${page}&limit=10`);

      setProducts(response.data.data);
      setPagination(response.data.pagination);
    } catch (error) {
      console.log(error);

      setError(error.response?.data?.message || "Failed to load products.");
    } finally {
      setLoading(false);
    }
  };
 
  useEffect(() => {
    getAllProducts(1);
  }, []);

  const handleDelete = async (productId) => {
    try {
      await api.delete(`/products/${productId}`);

      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== productId),
      );
    } catch (error) {
      console.log(error);

      setError(error.response?.data?.message || "Failed to delete product.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <LoaderCircle
          size={28}
          className="text-[var(--primary)] animate-spin"
        />
      </div>
    );
  }

  return (
    <section>
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
        <div>
          <p className="text-sm text-[var(--primary)] font-medium mb-2">
            Marketplace
          </p>

          <h1 className="font-['Space_Grotesk'] text-3xl sm:text-4xl font-bold tracking-tight">
            All Products
          </h1>

          <p className="text-sm text-[var(--muted)] mt-2">
            Explore products created by the NEXA community.
          </p>
        </div>

        <div className="text-sm text-[var(--muted)]">
          {pagination.totalItems}{" "}
          {pagination.totalItems === 1 ? "product" : "products"}
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-xl border border-[var(--danger)]/20 bg-[var(--danger)]/5 text-sm text-[var(--danger)]">
          {error}
        </div>
      )}

      {products.length === 0 ? (
        <div className="min-h-[350px] rounded-2xl border border-dashed border-[var(--border)] flex flex-col items-center justify-center text-center px-6">
          <div className="w-14 h-14 rounded-2xl bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center mb-4">
            <PackageOpen size={25} className="text-[var(--muted)]" />
          </div>

          <h2 className="font-['Space_Grotesk'] text-xl font-semibold">
            No products yet
          </h2>

          <p className="text-sm text-[var(--muted)] mt-2">
            Be the first one to create a product.
          </p>
        </div>
      ) : (
        <>
       
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                user={user}
                onDelete={handleDelete}
              />
            ))}
          </div>

          {pagination.totalPages > 1 && (
            <div className="flex items-center justify-center gap-3 mt-10">
              <button
                disabled={pagination.currentPage === 1}
                onClick={() => getAllProducts(pagination.currentPage - 1)}
                className="px-4 py-2 rounded-lg border border-[var(--border)] text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:border-[var(--primary)] transition"
              >
                Previous
              </button>

              <span className="px-4 py-2 text-sm text-[var(--muted)]">
                Page {pagination.currentPage} of {pagination.totalPages}
              </span>

              <button
                disabled={pagination.currentPage === pagination.totalPages}
                onClick={() => getAllProducts(pagination.currentPage + 1)}
                className="px-4 py-2 rounded-lg border border-[var(--border)] text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:border-[var(--primary)] transition"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default ProductList;

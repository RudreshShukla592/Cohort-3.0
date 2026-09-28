import React from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { X, Save } from "lucide-react";
import useApi from "../api/useApi";

const EditProductModal = ({ product, onClose, onUpdated }) => {
  const api = useApi();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  // Fill form with existing product data
  useEffect(() => {
    if (product) {
      reset({
        title: product.title,
        description: product.description,
        price: product.price,
        stock: product.stock,
      });
    }
  }, [product, reset]);

  const onSubmit = async (data) => {
    try {
      const response = await api.put(`/products/${product._id}`, {
        title: data.title,
        description: data.description,
        price: Number(data.price),
        stock: Number(data.stock),
      });

      // Send updated product back to ProductList
      onUpdated(response.data.data);

      onClose();
    } catch (error) {
      console.log(error);

      console.log(error.response?.data?.message || "Failed to update product.");
    }
  };

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-[2px] px-4">
      {/* Modal */}
      <div className="w-full max-w-md bg-[var(--surface)] border border-[var(--border)] rounded-2xl shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border)]">
          <div>
            <h2 className="font-['Space_Grotesk'] text-lg font-semibold">
              Edit Product
            </h2>

            <p className="text-xs text-[var(--muted)] mt-0.5">
              Update your product details
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[var(--muted)] hover:bg-[var(--background)] hover:text-white transition"
          >
            <X size={17} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-5 space-y-4">
          {/* Title */}
          <div>
            <label className="block text-xs font-medium mb-1.5">Title</label>

            <input
              type="text"
              {...register("title", {
                required: "Title is required",
                minLength: {
                  value: 2,
                  message: "Minimum 2 characters",
                },
                maxLength: {
                  value: 100,
                  message: "Maximum 100 characters",
                },
              })}
              className={`w-full h-10 rounded-lg bg-[var(--background)] border ${
                errors.title ? "border-red-500" : "border-[var(--border)]"
              } px-3 text-sm outline-none focus:border-[var(--primary)]`}
            />

            {errors.title && (
              <p className="text-xs text-red-400 mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-medium mb-1.5">
              Description
            </label>

            <textarea
              rows={3}
              {...register("description", {
                required: "Description is required",
                minLength: {
                  value: 20,
                  message: "Minimum 20 characters",
                },
                maxLength: {
                  value: 500,
                  message: "Maximum 500 characters",
                },
              })}
              className={`w-full rounded-lg bg-[var(--background)] border ${
                errors.description ? "border-red-500" : "border-[var(--border)]"
              } px-3 py-2 text-sm outline-none focus:border-[var(--primary)] resize-none`}
            />

            {errors.description && (
              <p className="text-xs text-red-400 mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Price + Stock */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium mb-1.5">Price</label>

              <input
                type="number"
                min="0"
                step="0.01"
                {...register("price", {
                  required: "Price is required",
                  valueAsNumber: true,
                  min: {
                    value: 0,
                    message: "Cannot be negative",
                  },
                })}
                className={`w-full h-10 rounded-lg bg-[var(--background)] border ${
                  errors.price ? "border-red-500" : "border-[var(--border)]"
                } px-3 text-sm outline-none focus:border-[var(--primary)]`}
              />

              {errors.price && (
                <p className="text-xs text-red-400 mt-1">
                  {errors.price.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium mb-1.5">Stock</label>

              <input
                type="number"
                min="0"
                {...register("stock", {
                  required: "Stock is required",
                  valueAsNumber: true,
                  min: {
                    value: 0,
                    message: "Cannot be negative",
                  },
                })}
                className={`w-full h-10 rounded-lg bg-[var(--background)] border ${
                  errors.stock ? "border-red-500" : "border-[var(--border)]"
                } px-3 text-sm outline-none focus:border-[var(--primary)]`}
              />

              {errors.stock && (
                <p className="text-xs text-red-400 mt-1">
                  {errors.stock.message}
                </p>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 h-9 rounded-lg border border-[var(--border)] text-sm text-[var(--muted)] hover:text-white hover:bg-[var(--background)] transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 h-9 rounded-lg bg-[var(--primary)] text-black text-sm font-semibold flex items-center gap-2 hover:opacity-90 transition disabled:opacity-50"
            >
              <Save size={15} />

              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductModal;

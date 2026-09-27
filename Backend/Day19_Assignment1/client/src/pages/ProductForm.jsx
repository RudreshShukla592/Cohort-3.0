import React from "react";
import { useForm } from "react-hook-form";
import {
  Package,
  FileText,
  IndianRupee,
  Boxes,
  ArrowRight,
} from "lucide-react";
import useApi from "../api/useApi";
import { useNavigate } from "react-router";

const ProductForm = () => {
  const api = useApi();

  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      price: "",
      stock: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const productData = {
        title: data.title,
        description: data.description,
        price: Number(data.price),
        stock: Number(data.stock),
      };

      const response = await api.post("/products", productData);

      reset();

      // Later we can navigate to My Products here
      navigate("/my-products");
    } catch (error) {
      console.log(error);

      console.log(error.response?.data?.message || "Failed to create product");
    }
  };

  return (
    <section className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <p className="text-sm text-[var(--primary)] font-medium mb-2">
          New Listing
        </p>

        <h1 className="font-['Space_Grotesk'] text-3xl sm:text-4xl font-bold tracking-tight">
          Create Product
        </h1>

        <p className="text-sm text-[var(--muted)] mt-2">
          Add something new to the NEXA marketplace.
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 sm:p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Product Title
            </label>

            <div className="relative">
              <Package
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted)]"
              />

              <input
                type="text"
                placeholder="e.g. Wireless Headphones"
                {...register("title", {
                  required: "Product title is required",
                  minLength: {
                    value: 2,
                    message: "Title must be at least 2 characters",
                  },
                  maxLength: {
                    value: 100,
                    message: "Title cannot exceed 100 characters",
                  },
                })}
                className={`w-full h-12 rounded-xl bg-[var(--background)] border ${
                  errors.title ? "border-red-500" : "border-[var(--border)]"
                } pl-12 pr-4 text-sm outline-none focus:border-[var(--primary)] transition`}
              />
            </div>

            {errors.title && (
              <p className="text-xs text-red-400 mt-1.5">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Description
            </label>

            <div className="relative">
              <FileText
                size={18}
                className="absolute left-4 top-4 text-[var(--muted)]"
              />

              <textarea
                rows={5}
                placeholder="Describe your product..."
                {...register("description", {
                  required: "Product description is required",
                  minLength: {
                    value: 20,
                    message: "Description must be at least 20 characters",
                  },
                  maxLength: {
                    value: 500,
                    message: "Description cannot exceed 500 characters",
                  },
                })}
                className={`w-full rounded-xl bg-[var(--background)] border ${
                  errors.description
                    ? "border-red-500"
                    : "border-[var(--border)]"
                } pl-12 pr-4 py-3 text-sm outline-none focus:border-[var(--primary)] transition resize-none`}
              />
            </div>

            {errors.description && (
              <p className="text-xs text-red-400 mt-1.5">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Price + Stock */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Price */}
            <div>
              <label className="block text-sm font-medium mb-2">Price</label>

              <div className="relative">
                <IndianRupee
                  size={17}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted)]"
                />

                <input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  {...register("price", {
                    required: "Price is required",
                    valueAsNumber: true,
                    min: {
                      value: 0,
                      message: "Price cannot be negative",
                    },
                  })}
                  className={`w-full h-12 rounded-xl bg-[var(--background)] border ${
                    errors.price ? "border-red-500" : "border-[var(--border)]"
                  } pl-12 pr-4 text-sm outline-none focus:border-[var(--primary)] transition`}
                />
              </div>

              {errors.price && (
                <p className="text-xs text-red-400 mt-1.5">
                  {errors.price.message}
                </p>
              )}
            </div>

            {/* Stock */}
            <div>
              <label className="block text-sm font-medium mb-2">Stock</label>

              <div className="relative">
                <Boxes
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted)]"
                />

                <input
                  type="number"
                  min="0"
                  step="1"
                  placeholder="0"
                  {...register("stock", {
                    required: "Stock is required",
                    valueAsNumber: true,
                    min: {
                      value: 0,
                      message: "Stock cannot be negative",
                    },
                  })}
                  className={`w-full h-12 rounded-xl bg-[var(--background)] border ${
                    errors.stock ? "border-red-500" : "border-[var(--border)]"
                  } pl-12 pr-4 text-sm outline-none focus:border-[var(--primary)] transition`}
                />
              </div>

              {errors.stock && (
                <p className="text-xs text-red-400 mt-1.5">
                  {errors.stock.message}
                </p>
              )}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-12 rounded-xl bg-[var(--primary)] text-black font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              "Creating Product..."
            ) : (
              <>
                Create Product
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ProductForm;

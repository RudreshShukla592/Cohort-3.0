import React from "react";
import { Edit3, Trash2, Package } from "lucide-react";
import { useNavigate } from "react-router";

const ProductCard = ({ product, user, onDelete }) => {
  const navigate = useNavigate();

  const isOwner = user && String(product.createdBy) === String(user.id);

  const handleEdit = () => {
    navigate(`/products/edit/${product._id}`);
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      onDelete(product._id);
    }
  };

  return (
    <article className="group bg-[var(--surface)] border border-[var(--border)] rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-[#3a4240]">
      {/* Product visual */}
      <div className="h-44 bg-[var(--surface-elevated)] flex items-center justify-center border-b border-[var(--border)]">
        <div className="w-14 h-14 rounded-2xl bg-[var(--primary)]/10 border border-[var(--primary)]/20 flex items-center justify-center">
          <Package size={26} className="text-[var(--primary)]" />
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Title + price */}
        <div className="flex items-start justify-between gap-4">
          <h2 className="font-['Space_Grotesk'] text-lg font-semibold text-[var(--text)] line-clamp-1">
            {product.title}
          </h2>

          <span className="shrink-0 text-[var(--primary)] font-semibold">
            ₹{product.price}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-[var(--muted)] mt-2 line-clamp-2 min-h-[40px]">
          {product.description}
        </p>

        {/* Stock */}
        <div className="flex items-center justify-between mt-5 pt-4 border-t border-[var(--border)]">
          <div>
            <p className="text-xs text-[var(--muted)]">Stock</p>

            <p
              className={`text-sm font-medium mt-0.5 ${
                product.stock > 0
                  ? "text-[var(--success)]"
                  : "text-[var(--danger)]"
              }`}
            >
              {product.stock > 0
                ? `${product.stock} available`
                : "Out of stock"}
            </p>
          </div>

          {/* Owner actions */}
          {isOwner && (
            <div className="flex items-center gap-2">
              <button
                onClick={handleEdit}
                className="w-9 h-9 rounded-lg border border-[var(--border)] flex items-center justify-center text-[var(--muted)] hover:text-[var(--primary)] hover:border-[var(--primary)]/30 hover:bg-[var(--primary)]/5 transition-all"
                title="Edit product"
              >
                <Edit3 size={16} />
              </button>

              <button
                onClick={handleDelete}
                className="w-9 h-9 rounded-lg border border-[var(--border)] flex items-center justify-center text-[var(--muted)] hover:text-[var(--danger)] hover:border-[var(--danger)]/30 hover:bg-[var(--danger)]/5 transition-all"
                title="Delete product"
              >
                <Trash2 size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProductCard;

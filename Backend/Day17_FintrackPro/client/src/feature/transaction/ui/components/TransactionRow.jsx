import React from "react";
import { Pencil, Trash2 } from "lucide-react";

const TransactionRow = ({ transaction }) => {
  const isIncome = transaction.type === "income";

  return (
    <div className="grid grid-cols-4 sm:grid-cols-5 gap-3 items-center px-4 py-4 border-t border-[#edf0f4]">
      
      <div className="text-sm text-[#63708a]">
        {new Date(transaction.createdAt).toLocaleDateString("en-IN")}
      </div>

      <div className="text-sm font-semibold truncate">
        {transaction.description}
      </div>

      <div className="hidden sm:block">
        <span className="inline-flex px-3 py-1 rounded-lg bg-[#edf2f7] text-xs text-[#526079]">
          {transaction.category}
        </span>
      </div>

      <div
        className={`text-sm font-bold ${
          isIncome ? "text-[#16b979]" : "text-[#ef4444]"
        }`}
      >
        {isIncome ? "+" : "-"}₹
        {transaction.amount.toLocaleString("en-IN")}
      </div>

      <div className="flex gap-2">
        <button className="text-[#4f7fc4] hover:text-[#101b32] transition">
          <Pencil size={16} />
        </button>

        <button className="text-[#ef4444] hover:text-red-700 transition">
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

export default TransactionRow;
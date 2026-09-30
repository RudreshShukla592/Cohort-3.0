import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { X, Plus } from "lucide-react";

const TransactionForm = () => {
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      type: "expense",
      description: "",
      amount: "",
      date: "",
      category: "Shopping",
    },
  });

  const onSubmit = (data) => {
    console.log(data);

    // API call will go here
    // await api.post("/transactions/create", data);

    reset();
    setIsOpen(false);
  };

  const closeForm = () => {
    reset();
    setIsOpen(false);
  };

  return (
    <>
      {/* Add Transaction Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 bg-[#111827] text-white px-5 py-3 rounded-xl font-medium hover:bg-[#1f2937] transition"
      >
        <Plus size={18} />
        Add Transaction
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          {/* Background */}
          <div
            onClick={closeForm}
            className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"
          />

          {/* Form */}
          <div className="relative z-10 w-full max-w-lg bg-white rounded-2xl shadow-2xl p-7">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-[#111827]">
                Add Transaction
              </h2>

              <button
                type="button"
                onClick={closeForm}
                className="text-[#64748b] hover:text-[#111827] transition"
              >
                <X size={23} />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Type */}
              <div>
                <label className="block text-sm font-medium mb-2">Type</label>

                <select
                  {...register("type", {
                    required: "Transaction type is required",
                  })}
                  className="w-full h-12 px-4 rounded-xl border border-[#dbe2ea] bg-[#f8fafc] outline-none focus:border-[#4f7fc4]"
                >
                  <option value="expense">Expense</option>
                  <option value="income">Income</option>
                </select>

                {errors.type && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.type.message}
                  </p>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Description
                </label>

                <input
                  type="text"
                  placeholder="e.g. Grocery shopping"
                  {...register("description", {
                    required: "Description is required",
                    minLength: {
                      value: 2,
                      message: "Description must be at least 2 characters",
                    },
                  })}
                  className="w-full h-12 px-4 rounded-xl border border-[#dbe2ea] bg-[#f8fafc] outline-none focus:border-[#4f7fc4]"
                />

                {errors.description && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.description.message}
                  </p>
                )}
              </div>

              {/* Amount + Date */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Amount
                  </label>

                  <input
                    type="number"
                    placeholder="₹ 0"
                    {...register("amount", {
                      required: "Amount is required",
                      valueAsNumber: true,
                      min: {
                        value: 1,
                        message: "Amount must be greater than 0",
                      },
                    })}
                    className="w-full h-12 px-4 rounded-xl border border-[#dbe2ea] bg-[#f8fafc] outline-none focus:border-[#4f7fc4]"
                  />

                  {errors.amount && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.amount.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Date</label>

                  <input
                    type="date"
                    {...register("date", {
                      required: "Date is required",
                    })}
                    className="w-full h-12 px-4 rounded-xl border border-[#dbe2ea] bg-[#f8fafc] outline-none focus:border-[#4f7fc4]"
                  />

                  {errors.date && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.date.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Category
                </label>

                <select
                  {...register("category", {
                    required: "Category is required",
                  })}
                  className="w-full h-12 px-4 rounded-xl border border-[#dbe2ea] bg-[#f8fafc] outline-none focus:border-[#4f7fc4]"
                >
                  <option value="Shopping">Shopping</option>
                  <option value="Food">Food</option>
                  <option value="Transport">Transport</option>
                  <option value="Bills">Bills</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Salary">Salary</option>
                  <option value="Investment">Investment</option>
                  <option value="Other">Other</option>
                </select>

                {errors.category && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.category.message}
                  </p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full h-12 bg-[#111827] text-white rounded-xl font-semibold hover:bg-[#1f2937] transition"
              >
                Save Transaction
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default TransactionForm;

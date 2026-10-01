import transactionModel from "../models/transaction.model.js";

export const createTransactionController = async (req, res) => {
  try {
    const { title, amount, type, category, date } = req.body;

    const transaction = await transactionModel.create({
      userId: req.user._id,
      title,
      amount,
      type,
      category,
      date,
    });

    res.status(201).json({
      message: "Transaction Created!!!",
      data: transaction,
    });
  } catch (error) {
    return res.status(500).json({
      error: `The error is ${error}`,
    });
  }
};

export const getAllTransactionController = async (req, res) => {
  try {
    const transactions = await transactionModel.find({ userId: req.user._id });

    res.status(200).json({
      message: "Transactions fetched successfully",
      data: transactions,
    });
  } catch (error) {
    return res.status(500).json({
      error: `The error is ${error}`,
    });
  }
};

export const deleteTransactionController = async (req, res) => {
  try {
    const { id } = req.params;

    const transaction = await transactionModel.findOneAndDelete({
      _id: id,
      userId: req.user._id,
    });

    if (!transaction) {
      return res.status(404).json({
        message: "Transaction not found",
      });
    }

    res.status(200).json({
      message: "Transaction Deleted!",
    });
  } catch (error) {
    return res.status(500).json({
      error: `The error is ${error}`,
    });
  }
};

export const updateTransactionController = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, amount, type, category, date } = req.body;

    const updatedTransaction = await transactionModel.findOneAndUpdate(
      {
        _id: id,
        userId: req.user._id,
      },
      { title, amount, type, category, date },
      {
        new: true,
      },
    );

    if (!updatedTransaction) {
      return res.status(404).json({
        message: "Transaction not found",
      });
    }

    res.status(200).json({
      message: "Note Updated!",
      data: updatedTransaction,
    });
  } catch (error) {
    return res.status(500).json({
      error: `The error is ${error}`,
    });
  }
};

export const searchTransactionController = async (req, res) => {
  try {
    const input = req.query.query;

    if (!input) {
      return res.status(400).json({
        message: "Search query is required",
      });
    }

    let searchTransaction = await transactionModel.find({
      userId: req.user._id,
      $or: [
        { title: { $regex: input, $options: "i" } },
        { category: { $regex: input, $options: "i" } },
        { type: { $regex: input, $options: "i" } },
      ],
    });

    res.status(200).json({
      message: "Transaction Fetched!",
      data: searchTransaction,
    });
  } catch (error) {
    return res.status(500).json({
      error: `The error is ${error}`,
    });
  }
};

export const filterTransactionController = async (req, res) => {
  try {
    const { category, type } = req.query;

    const filter = {
      userId: req.user._id,
    };

    if (category) {
      filter.category = category;
    }

    if (type) {
      filter.type = type;
    }

    const transactions = await transactionModel
      .find(filter)
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "Transactions filtered successfully",
      data: transactions,
    });
  } catch (error) {
    return res.status(500).json({
      error: `The error is ${error}`,
    });
  }
};

export const getDashboardController = async (req, res) => {
  try {
    const userId = req.user._id;

    const result = await transactionModel.aggregate([
      {
        $match: {
          userId: userId,
        },
      },
      {
        $group: {
          _id: "$type",
          total: { $sum: "$amount" },
          count: { $sum: 1 },
        },
      },
    ]);

    let totalIncome = 0;
    let totalExpense = 0;
    let incomeCount = 0;
    let expenseCount = 0;

    result.forEach((item) => {
      if (item._id === "income") {
        totalIncome = item.total;
        incomeCount = item.count;
      }

      if (item._id === "expense") {
        totalExpense = item.total;
        expenseCount = item.count;
      }
    });

    res.status(200).json({
      message: "Dashboard data fetched",
      data: {
        totalIncome,
        totalExpense,
        currentBalance: totalIncome - totalExpense,
        totalTransactions: incomeCount + expenseCount,

        graph: {
          income: totalIncome,
          expense: totalExpense,
        },
      },
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};
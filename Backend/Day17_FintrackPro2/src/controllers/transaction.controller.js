import transactionModel from "../models/transaction.model.js";

export const createTransactionController = async (req, res) => {
  try {
    const { title, amount, type, category, date } = req.body;

    const transaction = await transactionModel.create({
      userId: req.user.id,
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
    return res.status(401).json({
      error: `The error is ${error}`,
    });
  }
};

export const getAllTransactionController = async (req, res) => {
  try {
    const transactions = await transactionModel.find({ userId: req.user.id });

    res.status(200).json({
      message: "Transactions fetched successfully",
      data: transactions,
    });
  } catch (error) {
    return res.status(401).json({
      error: `The error is ${error}`,
    });
  }
};

export const deleteTransactionController = async (req, res) => {
  try {
    const { id } = req.params;

    const transaction = await transactionModel.findByIdAndDelete({
      _id: id,
      userId: req.user.id,
    });

    if (!transaction) {
      return res.status(404).json({
        message: "Transaction not found",
      });
    }

    res.status(200).json({
      message: "Note Deleted!",
    });
  } catch (error) {
    return res.status(401).json({
      error: `The error is ${error}`,
    });
  }
};

export const updateTransactionController = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;

    const updatedTransaction = await transactionModel.findByIdAndUpdate(
      {
        _id: id,
        userId: req.user._id,
      },
      body,
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
    return res.status(401).json({
      error: `The error is ${error}`,
    });
  }
};

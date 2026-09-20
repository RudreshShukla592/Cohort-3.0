import express from "express";
import {
  createTransactionController,
  deleteTransactionController,
  getAllTransactionController,
  searchTransactionController,
  updateTransactionController,
} from "../controllers/transaction.controller.js";
import { transactionValidator } from "../validators/transactionValidator.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/create",authenticate, transactionValidator, createTransactionController);
router.get("/getAll",authenticate, getAllTransactionController);
router.delete("/:id",authenticate, deleteTransactionController);
router.put("/:id",authenticate, transactionValidator, updateTransactionController);
router.get("/search", authenticate, searchTransactionController);

export default router;

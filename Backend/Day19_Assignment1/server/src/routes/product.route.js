import express from "express";
import { autheticate } from "../middlewares/auth.middleware.js";
import {
  idValidator,
  paginationValidator,
  productValidator,
} from "../validators/product.validator.js";
import {
  createProductController,
  deleteProductController,
  getAllProductsController,
  getMyProductsController,
  getProductByIdController,
  updateProductController,
} from "../controllers/product.controller.js";

const router = express.Router();

router.post("/", autheticate, productValidator, createProductController);
router.get("/", paginationValidator, getAllProductsController);
router.get("/my", autheticate, paginationValidator, getMyProductsController);
router.get("/:id", idValidator, getProductByIdController);
router.put(
  "/:id",
  autheticate,
  idValidator,
  productValidator,
  updateProductController,
);
router.delete("/:id", autheticate, idValidator, deleteProductController);

export default router;

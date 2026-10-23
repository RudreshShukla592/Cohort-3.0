import express from "express";
import {
  authenticate,
  authenticateSeller,
} from "../middlewares/auth.middleware.js";
import { productValidator } from "../validators/product.validator.js";
import multer from "multer";
import { createProduct } from "../controllers/product.controller.js";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    // Max. no. of files
    files: 5,
    // ~1MB for each image!
    fileSize: 1 * 1024 * 1024,
  },
});

const router = express.Router();

router.post(
  "/",
  authenticate,
  authenticateSeller,
  upload.array("images"),
  (req, res, next) => {
    req.body?.price &&
      (req.body.price = {
        amount: Number(req.body["price.amount"]),
        currency: req.body["price.currency"],
      });
    req.body?.sizes && (req.body.sizes = JSON.parse(req.body.sizes));
    next();
  },
  productValidator,
  createProduct,
);

export default router;

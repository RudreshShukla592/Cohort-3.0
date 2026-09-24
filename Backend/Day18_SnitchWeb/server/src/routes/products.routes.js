import express from "express";
import { productValidator } from "../validators/product.validator.js";
import { authenticate } from "../middleware/auth.middleware.js";
import multer from "multer";
import { createProduct } from "../controllers/product.controller.js";

const upload = multer({ 
    storage: multer.memoryStorage(),
    limits:{
        // Max. no. of files
        files:5,
        // ~1MB for each image!
        fileSize: 1 * 1024 * 1024  
    }
});

const router = express.Router();

router.post(
  "/",
  authenticate,
  (req, res, next) => {
    if (req.user.role !== "seller") {
      return res.status(403).json({
        message: "User is not authorized to create products",
      });
    }
    next();
  },
  upload.array("images"),
  (req, res, next) => {
    req.body.price = {
      amount: Number(req.body["price.amount"]),
      currency: req.body["price.currency"],
    };
    req.body.sizes = JSON.parse(req.body.sizes);
    next();
  },
  createProduct,
);

export default router;

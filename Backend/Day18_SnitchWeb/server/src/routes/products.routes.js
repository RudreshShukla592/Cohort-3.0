import express from "express";
import {
  idValidator,
  productValidator,
} from "../validators/product.validator.js";
import {
  authenticate,
  authenticateSeller,
} from "../middleware/auth.middleware.js";
import multer from "multer";
import {
  createProduct,
  getAllProductsControllers,
  getAllProductsForSellerController,
  listProductController,
  unListProductController,
} from "../controllers/product.controller.js";

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

router.get("/", authenticate, getAllProductsControllers);

router.get("/seller",authenticate,authenticateSeller,getAllProductsForSellerController)

router.patch("/unlist/:id", authenticate, authenticateSeller, idValidator, unListProductController);
router.patch("/list/:id",authenticate,authenticateSeller, idValidator,listProductController)

export default router;

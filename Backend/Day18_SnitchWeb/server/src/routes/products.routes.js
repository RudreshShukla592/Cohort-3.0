import express from "express";
import { productValidator } from "../validators/product.validator.js";

const router = express.Router();

router.post("/", productValidator);
export default router;
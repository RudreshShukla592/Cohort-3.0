import express from "express";
import {
  loginValidator,
  registerVlidator,
} from "../validators/auth.validatos.js";
import {
  getMeController,
  loginController,
  refreshController,
  registerController,
} from "../controllers/auth.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", registerVlidator, registerController);
router.post("/login", loginValidator, loginController);
router.post("/refresh", refreshController);
router.get("/me", authenticate, getMeController);

export default router;

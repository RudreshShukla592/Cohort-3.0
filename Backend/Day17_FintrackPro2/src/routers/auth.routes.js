import express from "express";
import {
  getMeController,
  loginController,
  logoutController,
  refreshAllTokenController,
  registerController,
} from "../controllers/auth.controller.js";
import { registerValidator } from "../validators/auth.validator.js";

const router = express.Router();

router.post("/register", registerValidator, registerController);
router.post("/refresh", refreshAllTokenController);
router.get("/me", getMeController);
router.post("/login", registerValidator, loginController);
router.post("/logout", logoutController);

export default router;

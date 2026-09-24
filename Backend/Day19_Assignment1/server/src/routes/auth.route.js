import express from "express";
import {
  loginValidator,
  registerValidator,
} from "../validators/auth.validator.js";
import {
  getMeController,
  loginController,
  logoutController,
  refreshController,
  registerController,
} from "../controllers/auth.controller.js";
import { autheticate } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", registerValidator, registerController);
router.post("/login", loginValidator, loginController);
router.post("/refresh", refreshController);
router.get("/getMe", autheticate, getMeController);
router.post("/logout", autheticate, logoutController);

export default router;

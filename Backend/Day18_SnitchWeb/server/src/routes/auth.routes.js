import express from "express"
import { loginValidator, registerValidator } from "../validators/auth.validator.js"
import { getMeController, loginController, refreshController, registerController } from "../controllers/auth.controller.js"
import { authenticate } from "../middleware/auth.middleware.js"

const router = express.Router()

router.post("/register",registerValidator,registerController)
router.post("/login",loginValidator,loginController)
router.get("/refresh",refreshController)
router.get("/me",authenticate,getMeController)

export default router
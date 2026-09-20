import express from "express"
import { loginValidator, registerValidator } from "../validators/auth.validator.js"
import { loginController, registerController } from "../controllers/auth.controller.js"

const router = express.Router()

router.post("/register",registerValidator,registerController)
router.post("/login",loginValidator,loginController)

export default router
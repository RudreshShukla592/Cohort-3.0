import express from "express"
import { registerValidator } from "../validators/auth.validator.js"
import { registerController } from "../controllers/auth.controller.js"

const router = express.Router()

router.post("/register",registerValidator,registerController)

export default router
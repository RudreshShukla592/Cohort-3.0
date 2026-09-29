import express from "express"
import { authenticate } from "../middleware/auth.middleware.js"
import { addToCartValidator } from "../validators/cart.validator.js"
import { addToCartController } from "../controllers/cart.controller.js"

const router = express.Router()

/*
req.body = {productId,quantity,size}
*/
router.post("/",authenticate,addToCartValidator,addToCartController) 

export default router
import { body, validationResult } from "express-validator";

export const addToCartValidator = [
  body("productId")
    .exists()
    .withMessage("ID is required")
    .bail()
    .isMongoId()
    .withMessage("Invalid product id"),
  body("quantity")
    .exists()
    .withMessage("Quantity is required")
    .bail()
    .isInt({ min: 1 })
    .withMessage("Quantity must be integer greater than 0"),
  body("size")
    .exists()
    .withMessage("Size is required")
    .bail()
    .isString()
    .withMessage("Size must be a String")
    .bail()
    .isIn(["XS", "S", "M", "L", "XL"])
    .withMessage("size must be between XS-XL"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Invalid Request",
        errors: errors.array(),
      });
    }
    next();
  },
];

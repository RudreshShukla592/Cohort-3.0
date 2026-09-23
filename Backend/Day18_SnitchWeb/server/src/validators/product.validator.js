import { body, validationResult } from "express-validator";

export const productValidator = [
  body("title")
    .exists()
    .withMessage("Title is required")
    .bail()
    .isString()
    .withMessage("Title must be string")
    .bail()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("Title length should be between 2 to 100 characters")
    .bail()
    .isAlpha("en-US", { ignore: " -" })
    .withMessage(
      "Title can only have english small and capital case character",
    ),
  body("description")
    .exists()
    .withMessage("Description is required")
    .bail()
    .isString()
    .withMessage("Description must be string")
    .bail()
    .trim()
    .isLength({ min: 20, max: 500 })
    .withMessage("DEscription length should be between 20 to 500 characters")
    .bail(),
  //   body("images").exists().withMessage("Images is required").bail(),
  body("price.amount")
    .exists()
    .withMessage("Price amount is required")
    .bail()
    .isFloat({ min: 0 })
    .withMessage(
      "Price amount must be a floating number and must be greater than 0",
    )
    .bail(),
  body("price.currency")
    .exists()
    .withMessage("Price currency is required")
    .bail()
    .isString()
    .withMessage("Price currency must be string")
    .bail()
    .isIn(["INR", "USD"])
    .withMessage("price currency either be INR or USD"),
  body("sizes")
    .exists()
    .withMessage("Sizes are required")
    .bail()
    .isArray()
    .withMessage("Sizes must be an array of objects"),
  body("sizes.*.size")
    .exists()
    .withMessage("Size must be present in every entry of sizes array")
    .bail()
    .isString()
    .withMessage("size must be string")
    .bail()
    .trim()
    .isIn(["XS", "S", "M", "L", "XL"])
    .withMessage("size must be between XS-XL"),
  body("sizes.*.stock")
    .exists()
    .withMessage("Stock is required")
    .bail()
    .isInt({ min: 0 })
    .withMessage("Stock must be a integer value and must be greater than 0"),

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

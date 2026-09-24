import { body, param, validationResult } from "express-validator";

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Invalid Request",
      errors: errors.array(),
    });
  }

  next();
};

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
    .withMessage("Title length should be between 2 to 100 characters"),
  body("description")
    .exists()
    .withMessage("Description is required")
    .bail()
    .isString()
    .withMessage("Description must be string")
    .bail()
    .trim()
    .isLength({ min: 20, max: 500 })
    .withMessage("DEscription length should be between 20 to 500 characters"),
  body("price")
    .exists()
    .withMessage("Price amount is required")
    .bail()
    .isFloat({ min: 0 })
    .withMessage(
      "Price amount must be a floating number and must be greater than 0",
    ),
  body("stock")
    .exists()
    .withMessage("Stock is required")
    .bail()
    .isInt({ min: 0 })
    .withMessage("Stock must be a integer value and must be greater than 0"),

  handleValidationErrors,
];

export const idValidator = [
  param("id").isMongoId().withMessage("Invalid product id"),
  handleValidationErrors,
];

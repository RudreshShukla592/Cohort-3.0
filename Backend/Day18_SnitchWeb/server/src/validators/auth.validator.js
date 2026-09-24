import { body, validationResult } from "express-validator";

export const registerValidator = [
  body("email")
    .exists()
    .withMessage("Email is Required")
    .bail()
    .isEmail()
    .withMessage("Invalid Email address"),
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .bail()
    .isString()
    .withMessage("Name must be string")
    .bail()
    .isLength({ min: 2, max: 50 })
    .withMessage("Name must be 2–50 characters long"),
  body("passwordHash")
    .exists()
    .withMessage("Password is required")
    .bail()
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password atleast 6 Characters long"),

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

export const loginValidator = [
  body("email")
    .exists()
    .withMessage("Email is Required")
    .bail()
    .isEmail()
    .withMessage("Invalid Email address"),
  body("password")
    .exists()
    .withMessage("Password is required")
    .bail()
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password atleast 6 Characters long"),

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

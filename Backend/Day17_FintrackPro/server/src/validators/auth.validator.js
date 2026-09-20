import { body, validationResult } from "express-validator";

export const registerValidator = [
  body("email")
    .exists()
    .withMessage("Email is Required")
    .isEmail()
    .withMessage("Invalid Email address"),
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("Name must be 2–50 characters long"),
  body("password")
    .exists()
    .withMessage("Password is required")
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

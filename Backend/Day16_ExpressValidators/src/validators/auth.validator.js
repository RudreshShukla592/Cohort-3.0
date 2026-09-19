import { body, validationResult } from "express-validator";

export const registerValidator = [
  body("email")
    .exists()
    .withMessage("Email is Required")
    .isEmail()
    .withMessage("Invalid Email address"),
  body("phone")
    .exists()
    .withMessage("Phone is required")
    .isMobilePhone("en-IN")
    .withMessage("Invalid Mobile Number"),
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

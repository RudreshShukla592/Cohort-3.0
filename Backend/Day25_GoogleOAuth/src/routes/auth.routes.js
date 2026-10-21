import express from "express";
import passport from "../config/passport.js";
import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

const router = express.Router();

/*
Initiate the google OAuth flow(redirects to google) 
*/
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
    session: false,
  }),
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: `/`,
  }),
  async (req, res) => {
    const user = req.user;
    const email = user.emails[0].value;

    const isAlreadyInDb = await userModel.find({ email });

    // handle Login
    if (isAlreadyInDb) {
      const token = jwt.sign(
        {
          id: isAlreadyInDb._id,
        },
        config.JWT_SECRET,
        { expiresIn: "1h" },
      );

      return res.status(200).json({
        token,
      });
    }

    // handle register
    const createdUser = await userModel.create({
      name: user.displayName,
      email,
      googleId: user.id,
    });

    const token = jwt.sign(
      {
        id: isAlreadyInDb._id,
      },
      config.JWT_SECRET,
      { expiresIn: "1h" },
    );

    res.json({
      token,
    });
  },
);

export default router;

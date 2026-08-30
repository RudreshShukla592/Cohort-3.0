const express = require("express");
const router = express.Router()
const { createController} = require("../controllers/user.controller");
const upload = require("../config/multer.config");

router.post("/create",upload.single("profilePic"), createController)

module.exports = router
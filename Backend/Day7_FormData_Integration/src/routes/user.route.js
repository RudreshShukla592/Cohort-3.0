const express = require("express");
const router = express.Router()
const { createController} = require("../controllers/user.controller")

router.post("/create", createController)

module.exports = router
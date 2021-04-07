const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

const router = express.Router();

router.route("/").get().post();

router.route("/:id").get();

router.route("").get();

module.exports = router;

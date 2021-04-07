const express = require("express");

const commentController = require("../controllers/commentController");
const authController = require("../controllers/authController");

const router = express.Router({ mergeParams: true });

router.route("/").get().post();

router.route("/:id").get().delete();

module.exports = router;

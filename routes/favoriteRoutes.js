const express = require("express");

const favoriteController = require("../controllers/favoriteController");
const authController = require("../controllers/authController");

const router = express.Router({ mergeParams: true });

router.route("/").get().post().delete();

router.route("/:id").delete();

module.exports = router;

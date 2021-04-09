const express = require("express");

const favoriteController = require("../controllers/favoriteController");
const userAuthController = require("../controllers/userAuthController");

const router = express.Router({ mergeParams: true });

router
    .route("/")
    .get(favoriteController.getAllFavorites)
    .post(favoriteController.addFavorite);

router
    .route("/:id")
    .get(favoriteController.getFavorite)
    .delete(favoriteController.removeFavorite);

module.exports = router;

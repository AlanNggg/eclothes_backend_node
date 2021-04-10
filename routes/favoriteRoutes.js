const express = require("express");

const favoriteController = require("../controllers/favoriteController");
const userAuthController = require("../controllers/userAuthController");

const router = express.Router({ mergeParams: true });

router
    .route("/")
    .get(favoriteController.getAllFavorites)
    .post(
        userAuthController.authorization,
        favoriteController.setUserId,
        favoriteController.addFavorite
    );

router
    .route("/:id")
    .get(favoriteController.getFavorite)
    .delete(
        userAuthController.authorization,
        favoriteController.removeFavorite
    );

module.exports = router;

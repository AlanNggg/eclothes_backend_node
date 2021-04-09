const express = require("express");
const regionController = require("../controllers/regionController");
const userAuthController = require("../controllers/userAuthController");

const router = express.Router();

router
    .route("/")
    .get(regionController.getAllRegions)
    .post(
        userAuthController.authorization,
        userAuthController.allow("admin"),
        regionController.createRegion
    );

router
    .route("/:id")
    .delete(
        userAuthController.authorization,
        userAuthController.allow("admin"),
        regionController.deleteRegionById
    );

router
    .route("/by/name/:name")
    .delete(
        userAuthController.authorization,
        userAuthController.allow("admin"),
        regionController.deleteRegionByName
    );

module.exports = router;

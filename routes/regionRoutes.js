const express = require("express");
const regionController = require("../controllers/regionController");
const authController = require("../controllers/authController");

const router = express.Router();

router
    .route("/")
    .get(regionController.getAllRegions)
    .post(regionController.createRegion);

router.route("/:id").delete(regionController.deleteRegionById);

router.route("/by/name/:name").delete(regionController.deleteRegionByName);

module.exports = router;

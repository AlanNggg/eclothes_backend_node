const express = require("express");
const districtController = require("../controllers/districtController");
const userAuthController = require("../controllers/userAuthController");

const router = express.Router();

router
    .route("/")
    .get(districtController.getAllDistricts)
    .post(
        userAuthController.authorization,
        userAuthController.allow("admin"),
        districtController.createDistrict
    );

router
    .route("/:id")
    .delete(
        userAuthController.authorization,
        userAuthController.allow("admin"),
        districtController.deleteDistrictById
    );

router
    .route("/by/name/:name")
    .delete(
        userAuthController.authorization,
        userAuthController.allow("admin"),
        districtController.deleteDistrictByName
    );

module.exports = router;

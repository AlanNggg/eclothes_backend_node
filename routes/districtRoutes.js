const express = require("express");
const districtController = require("../controllers/districtController");
const authController = require("../controllers/authController");

const router = express.Router();

router
    .route("/")
    .get(districtController.getAllDistricts)
    .post(districtController.createDistrict);

router.route("/:id").delete(districtController.deleteDistrictById);

router.route("/by/name/:name").delete(districtController.deleteDistrictByName);

module.exports = router;

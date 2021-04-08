const express = require("express");
const merchantController = require("../controllers/merchantController");
const authController = require("../controllers/authController");

const router = express.Router();

router.route("/").get(merchantController.getAllMerchants);

router.route("/:id").get(merchantController.getMerchantById);

router
    .route("/by/username/:name")
    .get(merchantController.getMerchantByUsername);

router
    .route("'/by/shopname/:name'")
    .get(merchantController.getMerchantByShopName);

module.exports = router;

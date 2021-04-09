const express = require("express");
const merchantController = require("../controllers/merchantController");
const merchantAuthController = require("../controllers/merchantAuthController");

const router = express.Router();

router.post("/register", merchantAuthController.register);
router.post("/login", merchantAuthController.login);

router.route("/").get(merchantController.getAllMerchants);

router
    .route("/:id")
    .get(merchantController.getMerchantById)
    .patch(merchantController.updateMerchant)
    .delete(merchantController.deleteMerchant);

router
    .route("/by/username/:name")
    .get(merchantController.getMerchantByUsername);

router
    .route("/by/shopname/:shopname")
    .get(merchantController.getMerchantByShopName);

module.exports = router;

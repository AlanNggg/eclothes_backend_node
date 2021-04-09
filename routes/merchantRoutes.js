const express = require("express");
const merchantController = require("../controllers/merchantController");
const merchantAuthController = require("../controllers/merchantAuthController");
const userAuthController = require("../controllers/userAuthController");

const router = express.Router();

router.post("/register", merchantAuthController.register);
router.post("/login", merchantAuthController.login);

router.patch(
    "/me/update-password",
    merchantAuthController.authorization,
    merchantAuthController.updatePassword
);

router
    .patch(
        "/me",
        merchantAuthController.authorization,
        merchantController.updateCurrentMerchant
    )
    .delete(
        merchantAuthController.authorization,
        merchantController.deleteCurrentMerchant
    );

router.route("/").get(merchantController.getAllMerchants);

router
    .route("/:id")
    .get(merchantController.getMerchantById)
    .patch(
        userAuthController.authorization,
        userAuthController.allow("admin"),
        merchantController.updateMerchant
    )
    .delete(
        userAuthController.authorization,
        userAuthController.allow("admin"),
        merchantController.deleteMerchant
    );

router
    .route("/by/username/:name")
    .get(merchantController.getMerchantByUsername);

router
    .route("/by/shopname/:shopname")
    .get(merchantController.getMerchantByShopName);

module.exports = router;

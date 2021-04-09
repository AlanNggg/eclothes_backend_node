const express = require("express");
const productController = require("../controllers/productController");
const merchantAuthController = require("../controllers/merchantAuthController");
const userAuthController = require("../controllers/userAuthController");
const userController = require("../controllers/userController");

const router = express.Router();

router
    .route("/")
    .get(productController.getAllProducts)
    .post(
        userAuthController.authorization,
        userAuthController.allow("admin"),
        productController.createProduct
    );

router
    .route("/:id")
    .get(productController.getProductById)
    .patch(
        userAuthController.authorization,
        userAuthController.allow("admin"),
        productController.updateProduct
    )
    .delete(
        userAuthController.authorization,
        userAuthController.allow("admin"),
        productController.deleteProduct
    );

module.exports = router;

const express = require("express");
const productController = require("../controllers/productController");
const userAuthController = require("../controllers/userAuthController");
const userController = require("../controllers/userController");

const router = express.Router();

router
    .route("/")
    .get(productController.getAllProducts)
    .post(productController.createProduct);

router
    .route("/:id")
    .get(productController.getProductById)
    .patch(productController.updateProduct)
    .delete(productController.deleteProduct);

module.exports = router;

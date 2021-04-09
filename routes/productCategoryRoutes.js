const express = require("express");
const productCategoryController = require("../controllers/productCategoryController");
const userAuthController = require("../controllers/userAuthController");

const router = express.Router();

router
    .route("/")
    .get(productCategoryController.getAllCategories)
    .post(
        userAuthController.authorization,
        userAuthController.allow("admin"),
        productCategoryController.createCategory
    );

router
    .route("/:id")
    .delete(
        userAuthController.authorization,
        userAuthController.allow("admin"),
        productCategoryController.deleteCategoryById
    );

router
    .route("/by/name/:name")
    .delete(
        userAuthController.authorization,
        userAuthController.allow("admin"),
        productCategoryController.deleteCategoryByName
    );

module.exports = router;

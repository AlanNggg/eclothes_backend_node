const express = require("express");
const productCategoryController = require("../controllers/productCategoryController");

const router = express.Router();

router
    .route("/")
    .get(productCategoryController.getAllCategories)
    .post(productCategoryController.createCategory);

router.route("/:id").delete(productCategoryController.deleteCategoryById);

router
    .route("/by/name/:name")
    .delete(productCategoryController.deleteCategoryByName);

module.exports = router;

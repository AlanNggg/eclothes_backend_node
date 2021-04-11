const ProductCategory = require("../models/productCategoryModel");
const catchError = require("../lib/catchError");
const controllerFactory = require("./controllerFactory");
const API = require("../lib/API");

exports.deleteCategoryByName = catchError(async (req, res, next) => {
    await ProductCategory.findOneAndDelete({ category: req.params.name });

    res.status(200).json({
        status: "success",
        data: {
            category: null,
        },
    });
});

exports.getAllCategories = controllerFactory.getAll(ProductCategory);

exports.createCategory = controllerFactory.createOne(ProductCategory);

exports.deleteCategoryById = controllerFactory.deleteOne(ProductCategory);

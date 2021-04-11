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

exports.getAllCategories = catchError(async (req, res, next) => {
    const api = new API(ProductCategory.find(), req.query)
        .filter()
        .sort()
        .select()
        .paginate();

    const data = await api.query;

    res.status(200).json({
        data,
    });
});

exports.createCategory = controllerFactory.createOne(ProductCategory);

exports.deleteCategoryById = controllerFactory.deleteOne(ProductCategory);

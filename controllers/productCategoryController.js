const ProductCategory = require("../models/productCategoryModel");

const catchError = require("../lib/catchError");

exports.getAllCategories = catchError(async (req, res, next) => {
    const categories = await ProductCategory.find();

    res.status(200).json({
        status: "success",
        data: {
            categories,
        },
    });
});

exports.createCategory = catchError(async (req, res, next) => {
    const newCategory = await ProductCategory.create({
        category: req.body.category,
    });

    res.status(200).json({
        status: "success",
        data: {
            category: newCategory,
        },
    });
});

exports.deleteCategoryById = catchError(async (req, res, next) => {
    await ProductCategory.findByIdAndDelete(req.params.id);
    res.status(200).json({
        status: "success",
        data: {
            category: null,
        },
    });
});

exports.deleteCategoryByName = catchError(async (req, res, next) => {
    await ProductCategory.findOneAndDelete({ category: req.params.name });

    res.status(200).json({
        status: "success",
        data: {
            category: null,
        },
    });
});

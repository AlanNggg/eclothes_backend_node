const ProductCategory = require("../models/productCategoryModel");

exports.getAllCategories = async (req, res, next) => {
    try {
        const categories = await ProductCategory.find();

        res.status(200).json({
            status: "success",
            data: {
                categories,
            },
        });
    } catch (err) {
        next(err);
    }
};

exports.createCategory = async (req, res, next) => {
    try {
        const newCategory = await ProductCategory.create({
            category: req.body.category,
        });

        res.status(200).json({
            status: "success",
            data: {
                category: newCategory,
            },
        });
    } catch (err) {
        next(err);
    }
};

exports.deleteCategoryById = async (req, res, next) => {
    try {
        await ProductCategory.findByIdAndDelete(req.params.id);
        res.status(200).json({
            status: "success",
            data: {
                category: null,
            },
        });
    } catch (err) {
        next(err);
    }
};

exports.deleteCategoryByName = async (req, res, next) => {
    try {
        await ProductCategory.findOneAndDelete({ category: req.params.name });

        res.status(200).json({
            status: "success",
            data: {
                category: null,
            },
        });
    } catch (err) {
        next(err);
    }
};

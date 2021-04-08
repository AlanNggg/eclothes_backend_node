const Product = require("../models/productModel");

// public
exports.getAllProducts = async (req, res, next) => {
    try {
        const products = await Product.find();

        res.status(200).json({
            status: "success",
            data: {
                products,
            },
        });
    } catch (err) {
        next(err);
    }
};

exports.getProductById = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);

        res.status(200).json({
            status: "success",
            data: {
                product,
            },
        });
    } catch (err) {
        next(err);
    }
};

// merchant
exports.createProduct = async (req, res, next) => {
    try {
        const newProduct = await Product.create(req.body);

        res.status(200).json({
            status: "success",
            data: {
                product: newProduct,
            },
        });
    } catch (err) {
        next(err);
    }
};

exports.deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        res.status(200).json({
            status: "success",
            data: {
                product: null,
            },
        });
    } catch (err) {
        next(err);
    }
};

exports.updateProduct = async (req, res, next) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        res.status(200).json({
            status: "success",
            data: {
                product: updatedProduct,
            },
        });
    } catch (err) {
        next(err);
    }
};

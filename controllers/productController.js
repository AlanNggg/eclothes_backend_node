const Product = require("../models/productModel");
const API = require("../lib/API");

const catchError = require("../lib/catchError");

// public
exports.getAllProducts = catchError(async (req, res, next) => {
    const api = new API(Product.find(), req.query)
        .filter()
        .sort()
        .select()
        .paginate();
    const products = await api.query;

    res.status(200).json({
        status: "success",
        results: products.length,
        data: {
            products,
        },
    });
});

exports.getProductById = catchError(async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    res.status(200).json({
        status: "success",
        data: {
            product,
        },
    });
});

// merchant
exports.createProduct = catchError(async (req, res, next) => {
    const newProduct = await Product.create(req.body);

    res.status(200).json({
        status: "success",
        data: {
            product: newProduct,
        },
    });
});

exports.deleteProduct = catchError(async (req, res, next) => {
    const product = await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({
        status: "success",
        data: {
            product: null,
        },
    });
});

exports.updateProduct = catchError(async (req, res, next) => {
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
});

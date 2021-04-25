const path = require("path");
const multer = require("multer");
const sharp = require("sharp");
const Product = require("../models/productModel");
const API = require("../lib/API");
const { multerFilter } = require("../lib/imageHandler");
const { createDirectory } = require("../lib/directoryHandler");
const catchError = require("../lib/catchError");
const controllerFactory = require("./controllerFactory");

const multerStorage = multer.memoryStorage();

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
});

exports.uploadProductPhotos = upload.array("photos", 3);

exports.resizeProductPhotos = catchError(async (req, res, next) => {
    if (!req.files) return next();

    req.body.photos = [];

    console.log(req.files);
    await Promise.all(
        req.files.map(async (file, i) => {
            const filename = `product-${req.params.id}-${Date.now()}-${
                i + 1
            }.jpeg`;

            await sharp(file.buffer)
                .toFormat("jpeg")
                .jpeg({ quality: 90 })
                .toFile(
                    `public/photo/merchants/${req.user.id}/products/${req.params.id}/${filename}`
                );

            req.body.photos.push(filename);
        })
    );

    next();
});

// POST /merchants/:merchantId/products
// POST /products
exports.setMerchantId = (req, res, next) => {
    if (!req.body.merchant) req.body.merchant = req.user.id;
    if (!req.body.merchant) req.body.merchant = req.params.id;

    next();
};

exports.createProduct = catchError(async (req, res, next) => {
    const data = await Product.create(JSON.parse(JSON.stringify(req.body)));

    createDirectory(req.user.id, "merchants", `products/${data._id}`);

    res.status(200).json(data);
});

// public
exports.getAllProducts = controllerFactory.getAll(Product);

exports.getProductById = controllerFactory.getOne(Product);

exports.deleteProduct = controllerFactory.deleteOne(Product);

exports.updateProduct = controllerFactory.updateOne(Product);

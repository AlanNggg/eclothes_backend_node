const sharp = require("sharp");
const Merchant = require("../models/merchantModel");
const catchError = require("../lib/catchError");
const controllerFactory = require("./controllerFactory");
const { filterObject } = require("../lib/obj-lib");
const upload = require("../lib/imageHandler");

exports.uploadMerchantPhoto = upload.single("photo");

exports.resizeMerchantPhoto = catchError(async (req, res, next) => {
    if (!req.file) return next();

    req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

    await sharp(req.file.buffer)
        .resize(500, 500)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(`public/photo/merchants/${req.user.id}/${req.file.filename}`);

    next();
});

exports.getMerchantByUsername = catchError(async (req, res, next) => {
    console.log(req.params.name);
    const merchant = await Merchant.findOne({
        username: req.params.name,
    });

    res.status(200).json(merchant);
});

exports.getMerchantByShopName = catchError(async (req, res, next) => {
    console.log(req.params.shopname);
    const merchant = await Merchant.findOne({
        shopName: req.params.shopname,
    });

    res.status(200).json(merchant);
});

exports.updateCurrentMerchant = catchError(async (req, res, next) => {
    if (req.body.password || req.body.passwordConfirm) {
        return ErrorResponse(
            "This route is not for updating password. Please use /reset-password"
        );
    }

    const filteredBody = filterObject(
        req.body,
        "photo",
        "firstName",
        "lastName",
        "username",
        "shopName",
        "description",
        "location",
        "email",
        "phone"
    );

    if (req.file) filteredBody.photo = req.file.filename;

    const updatedMerchant = await Merchant.findByIdAndUpdate(
        req.user.id,
        filteredBody,
        {
            new: true,
            runValidators: true,
        }
    );

    res.status(200).json(updatedMerchant);
});

exports.deleteCurrentMerchant = catchError(async (req, res, next) => {
    await Merchant.findByIdAndUpdate(req.user.id, { active: false });

    res.status(204).json({
        status: "success",
        data: null,
    });
});

exports.getAllMerchants = controllerFactory.getAll(Merchant);

exports.getMerchantById = controllerFactory.getOne(Merchant);

// admin
exports.createMerchant = controllerFactory.createOne(Merchant);

exports.deleteMerchant = controllerFactory.deleteOne(Merchant);

exports.updateMerchant = controllerFactory.updateOne(Merchant);

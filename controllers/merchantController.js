const Merchant = require("../models/merchantModel");

const catchError = require("../lib/catchError");

const { filterObject } = require("../lib/obj-lib");

exports.getAllMerchants = catchError(async (req, res, next) => {
    const merchants = await Merchant.find();

    res.status(200).json({
        status: "success",
        data: {
            merchants,
        },
    });
});

exports.getMerchantById = catchError(async (req, res, next) => {
    const merchant = await Merchant.findById(req.params.id);

    res.status(200).json({
        status: "success",
        data: {
            merchant,
        },
    });
});

exports.getMerchantByUsername = catchError(async (req, res, next) => {
    console.log(req.params.name);
    const merchant = await Merchant.findOne({
        username: req.params.name,
    });

    res.status(200).json({
        status: "success",
        data: {
            merchant,
        },
    });
});

exports.getMerchantByShopName = catchError(async (req, res, next) => {
    console.log(req.params.shopname);
    const merchant = await Merchant.findOne({
        shopName: req.params.shopname,
    });

    res.status(200).json({
        status: "success",
        data: {
            merchant,
        },
    });
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
        "shopName",
        "description",
        "location",
        "email",
        "phone"
    );

    const updatedMerchant = await User.findByIdAndUpdate(
        req.user.id,
        filteredBody,
        {
            new: true,
            runValidators: true,
        }
    );

    res.status(200).json({
        status: "success",
        data: {
            merchant: updatedMerchant,
        },
    });
});

exports.deleteCurrentMerchant = catchError(async (req, res, next) => {
    await Merchant.findByIdAndUpdate(req.user.id, { active: false });

    res.status(204).json({
        status: "success",
        data: null,
    });
});

// admin
exports.deleteMerchant = catchError(async (req, res, next) => {
    const merchant = await Merchant.findByIdAndDelete(req.params.id);

    res.status(200).json({
        status: "success",
        data: {
            merchant: null,
        },
    });
});

exports.updateMerchant = catchError(async (req, res, next) => {
    const updatedMerchant = await Merchant.findByIdAndUpdate(
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
            merchant: updatedMerchant,
        },
    });
});

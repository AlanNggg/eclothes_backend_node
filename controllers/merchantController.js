const Merchant = require("../models/merchantModel");

const catchError = require("../lib/catchError");

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

exports.deleteMerchant = async (req, res, next) => {};

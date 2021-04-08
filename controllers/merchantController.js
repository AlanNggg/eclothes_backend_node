const Merchant = require("../models/merchantModel");

exports.getAllMerchants = async (req, res, next) => {
    try {
        const merchants = await Merchant.find();

        res.status(200).json({
            status: "success",
            data: {
                merchants,
            },
        });
    } catch (err) {
        next(err);
    }
};

exports.getMerchantById = async (req, res, next) => {
    try {
        const merchant = await Merchant.findById(req.params.id);

        res.status(200).json({
            status: "success",
            data: {
                merchant,
            },
        });
    } catch (err) {
        next(err);
    }
};

exports.getMerchantByUsername = async (req, res, next) => {
    try {
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
    } catch (err) {
        next(err);
    }
};

exports.getMerchantByShopName = async (req, res, next) => {
    try {
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
    } catch (err) {
        next(err);
    }
};

// admin
exports.deleteMerchant = async (req, res, next) => {
    try {
        const merchant = await Merchant.findByIdAndDelete(req.params.id);

        res.status(200).json({
            status: "success",
            data: {
                merchant: null,
            },
        });
    } catch (err) {
        next(err);
    }
};

exports.updateMerchant = async (req, res, next) => {
    try {
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
    } catch (err) {
        next(err);
    }
};

exports.deleteMerchant = async (req, res, next) => {};

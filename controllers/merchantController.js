const Merchant = require("../models/merchantModel");

exports.getAllMerchants = async (req, res, next) => {
    try {
        const merchants = Merchant.find();

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

exports.deleteMerchant = async (req, res, next) => {
    try {
        const merchants = await Merchant.findByIdAndDelete(req.params.id);

        res.status(200).json({
            status: "success",
            data: {
                merchants: null,
            },
        });
    } catch (err) {
        next(err);
    }
};

exports.UpdateMerchant = async (req, res, next) => {
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

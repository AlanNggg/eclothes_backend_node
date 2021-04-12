const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const Merchant = require("../models/merchantModel");
const authController = require("../controllers/authController");
const ErrorResponse = require("../lib/ErrorResponse");
const catchError = require("../lib/catchError");
const { createDirectory } = require("../lib/directoryHandler");

exports.register = catchError(async (req, res, next) => {
    const newMerchant = await Merchant.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        shopName: req.body.shopName,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
    });

    createDirectory(newMerchant._id, "merchants");
    authController.sendToken(newMerchant, 201, req, res);
});

exports.login = authController.login(Merchant);

exports.authorization = authController.authorization(Merchant);

exports.resetPassword = authController.resetPassword(Merchant);

exports.updatePassword = authController.updatePassword(Merchant);

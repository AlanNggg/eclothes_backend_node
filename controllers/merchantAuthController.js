const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const Merchant = require("../models/merchantModel");
const authController = require("../controllers/authController");
const ErrorResponse = require("../lib/ErrorResponse");
const catchError = require("../lib/catchError");

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};
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

    const token = createToken(newMerchant._id);

    res.status(201).json({
        status: "success",
        token,
        data: {
            user: newMerchant,
        },
    });
});

exports.login = authController.login(Merchant);

exports.authorization = authController.authorization(Merchant);

exports.resetPassword = authController.resetPassword(Merchant);

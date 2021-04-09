const jwt = require("jsonwebtoken");
const Merchant = require("../models/merchantModel");

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};
exports.register = async (req, res, next) => {
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
};

exports.login = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        next(new Error("Please provide email and password"));
    }

    const merchant = await Merchant.findOne({ email }).select("+password");

    if (
        !merchant ||
        !(await merchant.comparePassword(password, merchant.password))
    ) {
        return next(new Error("Incorrect email or password"));
    }

    const token = createToken(merchant._id);

    res.status(200).json({
        status: "success",
        token,
        data: {
            merchant,
        },
    });
};

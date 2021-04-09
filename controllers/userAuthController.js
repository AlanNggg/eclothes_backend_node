const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};
exports.register = async (req, res, next) => {
    const newUser = await User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
    });

    const token = createToken(newUser._id);

    res.status(201).json({
        status: "success",
        token,
        data: {
            user: newUser,
        },
    });
};

exports.login = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        next(new Error("Please provide email and password"));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.comparePassword(password, user.password))) {
        return next(new Error("Incorrect email or password"));
    }

    const token = createToken(user._id);

    res.status(200).json({
        status: "success",
        token,
        data: {
            user,
        },
    });
};

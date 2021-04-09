const User = require("../models/userModel");

const catchError = require("../lib/catchError");

exports.getAllUsers = catchError(async (req, res, next) => {
    const users = await User.find();

    res.status(200).json({
        status: "success",
        data: {
            users,
        },
    });
});

exports.getUserById = catchError(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    res.status(200).json({
        status: "success",
        data: {
            user,
        },
    });
});

exports.getUserByUsername = catchError(async (req, res, next) => {
    const user = await User.findOne({
        username: req.params.name,
    });

    res.status(200).json({
        status: "success",
        data: {
            user,
        },
    });
});

// admin
exports.deleteUser = catchError(async (req, res, next) => {
    const merchant = await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
        status: "success",
        data: {
            user: null,
        },
    });
});

exports.updateUser = catchError(async (req, res, next) => {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    res.status(200).json({
        status: "success",
        data: {
            merchant: updatedUser,
        },
    });
});

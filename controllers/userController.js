const User = require("../models/userModel");

const catchError = require("../lib/catchError");

const ErrorResponse = require("../lib/ErrorResponse");

const { filterObject } = require("../lib/obj-lib");

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

exports.updateCurrentUser = catchError(async (req, res, next) => {
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
        "email",
        "phone"
    );

    const updatedUser = await User.findByIdAndUpdate(
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
            user: updatedUser,
        },
    });
});

exports.deleteCurrentUser = catchError(async (req, res, next) => {
    await User.findByIdAndUpdate(req.user.id, { active: false });

    res.status(204).json({
        status: "success",
        data: null,
    });
});

// admin
exports.createUser = catchError(async (req, res, next) => {
    const newUser = await User.create(req.body);

    res.status(200).json({
        status: "success",
        data: {
            user: newUser,
        },
    });
});

exports.deleteUser = catchError(async (req, res, next) => {
    const user = await User.findByIdAndDelete(req.params.id);

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
